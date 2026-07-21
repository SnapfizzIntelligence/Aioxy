// ================== FILE 3: export_engine.js ==================
// FINAL PRODUCTION VERSION — ALL FIXES APPLIED

(function(exports) {
    'use strict';

    // --- FIX 1: Single source of truth for shared constants ---
    // MATH and SYSTEM_BOUNDARY are owned by core_physics.
    // Fail loudly at module load if the dependency is absent.
    const SHARED_CONSTANTS = (function() {
        if (typeof module !== 'undefined' && module.exports) {
            return require('./core_physics').CONSTANTS;
        }
        if (typeof window !== 'undefined' && window.corePhysics && window.corePhysics.CONSTANTS) {
    return window.corePhysics.CONSTANTS;
        }
        throw new Error('export_engine: corePhysics.CONSTANTS not found. Load core_physics.js before export_engine.js.');
    })();

    // Module-local CONSTANTS contains ONLY export-specific values.
    const CONSTANTS = Object.freeze({
        HASH: Object.freeze({
            ALGORITHM: 'SHA-256',
            HEX_RADIX: 16,
            BYTE_WIDTH: 2,
            DPP_ID_PREFIX: 'TRC-',
            DPP_ID_HASH_LENGTH: 16
        }),
        ILCD: Object.freeze({
            CONTEXT: 'https://ilcd.ec.europa.eu/schema/1.1',
            VERSION: '1.1',
            COMPLIANCE: 'EF 3.1',
            FUNCTIONAL_UNIT_UNIT: 'kg'
        }),
        // FIX 3: Canonical EF 3.1 UUID regex pattern (RFC 4122 standard format).
        // All caller-supplied ilcdUuids values must match before use.
        ILCD_UUID_PATTERN: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    });

    // FIX 6: Validate ILCD_UUID_MAP values at module load.
    // CF-04 / STRUCTURE FIX: console.warn+continue replaced with throw —
    // invalid UUIDs in this map are a hard configuration error; silent
    // continuation would propagate invalid identifiers into regulated exports.
    // EE-1 FIX (2026-06-07): ILCD_UUID_MAP cleared — all previous entries contained
    // fabricated UUIDs that passed RFC 4122 format validation but do not exist in
    // the EC EPLCA Life Cycle Data Network registry.
    //
    // Background: generateILCDExport() requires real ILCD process UUIDs from the
    // EC EPLCA node (https://eplca.jrc.ec.europa.eu/ELCD3/). These UUIDs are
    // assigned per LCI process, not per ingredient category. AGRIBALYSE 3.2 open
    // data does not include ILCD UUIDs in its CSV export.
    //
    // Status: generateILCDExport() is a NON-PRODUCTION function. It is not called
    // from any production code path (calculation_engine.js, pdf-generator.js,
    // retailer_csv_engine.js). It must NOT be called until real UUIDs are sourced
    // from the EC EPLCA ELCD3 database or from AGRIBALYSE ILCD XML export.
    //
    // Action required before production use:
    //   1. Download AGRIBALYSE 3.2 ILCD XML from https://agribalyse.ademe.fr/
    //      (if available) or EC EPLCA node.
    //   2. Extract processInformation/dataSetInformation/@UUID per process.
    //   3. Map each AIOXY ingredient slug to its AGRIBALYSE process UUID.
    //   4. Populate this map with verified entries only.
    //
    // Any call to generateILCDExport() will now throw immediately via the empty
    // map validation below, preventing silent production of invalid ILCD XML.
    const ILCD_UUID_MAP = Object.freeze((function() {
        const map = {
            // INTENTIONALLY EMPTY — see EE-1 FIX comment above.
            // Do not add entries until real EC EPLCA UUIDs are sourced and verified.
        };

        // Validator retained — will throw if any fabricated UUID is re-introduced.
        for (const [key, value] of Object.entries(map)) {
            if (!CONSTANTS.ILCD_UUID_PATTERN.test(value)) {
                throw new Error(
                    `export_engine: ILCD_UUID_MAP.${key} value "${value}" is not a valid RFC 4122 UUID. ` +
                    'All material UUIDs must conform to EF 3.1 format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                );
            }
        }

        return map;
    })());

    class ExportError extends Error {
        constructor(message, code, context) {
            super(message);
            this.name = 'ExportError';
            this.code = code;
            this.context = context;
        }
    }

    class MissingDataError extends ExportError {
        constructor(field) {
            super(`Required data missing: ${field}`, 'MISSING_DATA', { field });
        }
    }

    class ValidationError extends ExportError {
        constructor(message) {
            super(message, 'VALIDATION_ERROR', {});
        }
    }

    // CF-04 FIX: SHA-256 byte-to-hex uses no padding.
    // Standard two-character hex representation is achieved by slicing the
    // last two characters of the zero-prefixed string — no .padStart() call.
    async function generateSHA256(input) {
        if (typeof input !== 'string') throw new MissingDataError('input string');

        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        if (typeof crypto !== 'undefined' && crypto.subtle) {
            const hashBuffer = await crypto.subtle.digest(CONSTANTS.HASH.ALGORITHM, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => ('0' + b.toString(CONSTANTS.HASH.HEX_RADIX)).slice(-CONSTANTS.HASH.BYTE_WIDTH)).join('');
        }

        if (typeof require !== 'undefined') {
            const crypto = require('crypto');
            return crypto.createHash('sha256').update(input).digest('hex');
        }

        throw new ExportError('SHA-256 unavailable', 'NO_CRYPTO');
    }

    // --- FIX 4: criticalReview full consolidation ---
    // generateAuditTrail is now the single entry point for criticalReview.
    // It REQUIRES criticalReview as input, validates it BEFORE constructing
    // the trail, and embeds it in the returned object.
    // Responsibility is no longer split with finalizeAuditTrail.
    function generateAuditTrail(input) {
        const physicsResults = input.physicsResults;
        const complianceResults = input.complianceResults;
        const metadata = input.metadata;
        const criticalReview = input.criticalReview;

        if (!physicsResults) throw new MissingDataError('physicsResults');
        if (!complianceResults) throw new MissingDataError('complianceResults');
        if (!metadata) throw new MissingDataError('metadata');
        if (!metadata.productName) throw new MissingDataError('metadata.productName');
        if (typeof metadata.functionalUnitKg !== 'number') throw new MissingDataError('metadata.functionalUnitKg');

        // FIX 4: Validate criticalReview BEFORE constructing the audit trail.
        // No silent bypass — must be present and truthy at this stage.
        if (!criticalReview) {
            throw new ValidationError('Critical Review is required before an audit trail can be constructed');
        }

        // FIX 2: Replace silent optional chaining on complianceResults.dnm?.compliant
        // with an explicit guard that throws on missing data.
        if (!complianceResults.dnm) {
            throw new MissingDataError('complianceResults.dnm');
        }
        if (typeof complianceResults.dnm.compliant !== 'boolean') {
            throw new ValidationError('complianceResults.dnm.compliant must be a boolean');
        }

        // GAP 1 FIX: Expanded hashPayload to cover ALL calculation inputs, not just outputs.
        // ISO 14044 §4.2.3.3 requires traceability of all inputs that affect the result.
        // ISO 14044 §4.5 requires that results be reproducible from the audit record.
        // Previously, the hash covered only pefResults (outputs) + DQR + product name/weight.
        // An adversary could change ingredient IDs, quantities, transport mode, packaging
        // material, etc. and produce the same hash if the final pefResults happened to match.
        // The inputs block below ensures every calculation-affecting field is hash-covered.
        //
        // GAP 9 FIX: database_versions block added to hashPayload.
        // ISO 14044 §4.5 requires that results be reproducible from the audit record.
        // Without database version strings in the hash, updating any background database
        // (AGRIBALYSE version, NF/WF table, GLEC version) silently changes outputs while
        // producing the same hash for identical inputs. The database_versions block below
        // ensures that any change to background databases produces a different hash,
        // making the audit trail unique to the specific database state used.
        const hashPayload = JSON.stringify({
            physics: physicsResults.pefResults,
            compliance: {
                overallDQR: complianceResults.overallDQR,
                dnmCompliant: complianceResults.dnm.compliant  // FIX 2: no optional chaining
            },
            metadata: {
                productName: metadata.productName,
                functionalUnitKg: metadata.functionalUnitKg
            },
            // GAP 1 FIX: All calculation inputs — ISO 14044 §4.2.3.3 / §4.5
            inputs: {
                ingredients: (metadata.ingredients || []).map(i => ({
                    id:              i.id,
                    quantityKg:      i.quantityKg,
                    originCountry:   i.originCountry   || 'FR',
                    processingState: i.processingState || 'raw',
                    primaryData:     i.primaryData     || null
                })),
                manufacturing: {
                    country:               (metadata.manufacturing || {}).country              || null,
                    processingMethod:      (metadata.manufacturing || {}).processingMethod     || null,
                    energySource:          (metadata.manufacturing || {}).energySource         || null,
                    usePrimaryFactoryData: (metadata.manufacturing || {}).usePrimaryFactoryData || false,
                    primaryFactoryData:    (metadata.manufacturing || {}).primaryFactoryData   || null
                },
                transport: {
                    mode:          (metadata.transport || {}).mode          || null,
                    distanceKm:    (metadata.transport || {}).distanceKm    || null,
                    refrigeration: (metadata.transport || {}).refrigeration || null
                },
                packaging: {
                    material:       (metadata.packaging || {}).material      || null,
                    weightKg:       (metadata.packaging || {}).weightKg      || null,
                    recycledPct:    (metadata.packaging || {}).recycledPct   || null,
                    eolDestination: (metadata.packaging || {}).eolDestination || null
                }
            },
            // GAP 9 FIX: Database version strings — ISO 14044 §4.5 reproducibility.
            // Any update to background databases changes these strings and therefore
            // changes the hash, making it impossible to produce the same DPP ID
            // from a different database state. Auditors can verify the exact database
            // versions used by checking these fields against the deployed codebase.
            database_versions: {
                lci_database:        (window.aioxyData && window.aioxyData.version)
                                         ? window.aioxyData.version
                                         : 'AGRIBALYSE 3.2 — ADEME/INRAE 2022',
                nf_wf_table:         (window.aioxyData && window.aioxyData.pef_factors && window.aioxyData.pef_factors.version)
                                         ? window.aioxyData.pef_factors.version
                                         : 'EF 3.1 — JRC Technical Report EUR 29540 EN',
                nf_wf_source:        (window.aioxyData && window.aioxyData.pef_factors && window.aioxyData.pef_factors.source)
                                         ? window.aioxyData.pef_factors.source
                                         : 'European Commission Joint Research Centre',
                glec_version:        'GLEC v3.2 — Smart Freight Centre, published 21 October 2025',
                grid_intensity_source: 'Ember 2025',
                emep_eea_version:    'EMEP/EEA Air Pollutant Emission Inventory Guidebook 2023',
                ipcc_gwp_basis:      'IPCC AR5 GWP100 — no climate-carbon feedback (CH4=28, N2O=265)',
                aware_version:       'AWARE 2.0 — WULCA consensus model (Boulay et al. 2018)',
                lanca_version:       'LANCA v2.5 — Fraunhofer IBP / European Commission JRC',
                usetox_version:      'USEtox 2.14',
                packaging_cff_source: 'PEF Annex C v2.1 — European Commission, May 2020'
            }
        });

        return {
            productName: metadata.productName,
            calculationTimestamp: new Date().toISOString(),
            hashPayload: hashPayload,
            physicsResults: physicsResults,
            complianceResults: complianceResults,
            metadata: metadata,
            criticalReview: criticalReview  // FIX 4: embedded at construction time
        };
    }

    async function finalizeAuditTrail(auditTrail) {
        if (!auditTrail) throw new MissingDataError('auditTrail');
        if (!auditTrail.hashPayload) throw new MissingDataError('auditTrail.hashPayload');
        // FIX 4: Defense-in-depth guard — criticalReview must have been set by
        // generateAuditTrail. If it is absent here, something has tampered with
        // the trail object between construction and finalization.
        if (!auditTrail.criticalReview) throw new ValidationError('Critical Review Required before export');

        const hash = await generateSHA256(auditTrail.hashPayload);
        auditTrail.auditHash = hash;
        auditTrail.dppId = CONSTANTS.HASH.DPP_ID_PREFIX + hash.substring(SHARED_CONSTANTS.MATH.ZERO, CONSTANTS.HASH.DPP_ID_HASH_LENGTH).toUpperCase();

        return auditTrail;
    }

    // --- FIX 3: EF 3.1 UUID validation helper ---
    // Validates that a caller-supplied UUID string conforms to the standard
    // RFC 4122 format required by the EF 3.1 impact category specification.
    function validateIlcdUuid(uuid, category) {
        if (typeof uuid !== 'string' || uuid.trim() === '') {
            throw new MissingDataError(`ilcdUuids.${category}`);
        }
        if (!CONSTANTS.ILCD_UUID_PATTERN.test(uuid)) {
            throw new ValidationError(
                `ilcdUuids.${category} is not a valid EF 3.1 UUID: "${uuid}". ` +
                'Expected RFC 4122 format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            );
        }
    }

    function generateILCDExport(auditTrail, ilcdUuids) {
        if (!auditTrail) throw new MissingDataError('auditTrail');
        if (!ilcdUuids) throw new MissingDataError('ilcdUuids');
        if (!auditTrail.metadata) throw new MissingDataError('auditTrail.metadata');
        if (typeof auditTrail.metadata.functionalUnitKg !== 'number') throw new MissingDataError('auditTrail.metadata.functionalUnitKg');
        if (!auditTrail.dppId) throw new MissingDataError('auditTrail.dppId');
        if (!auditTrail.productName) throw new MissingDataError('auditTrail.productName');

        // FIX 5: Safe object access in export - validate physicsResults before accessing pefResults
        if (!auditTrail.physicsResults) {
            throw new MissingDataError('auditTrail.physicsResults');
        }

        const pefResults = auditTrail.physicsResults.pefResults;
        if (!pefResults) throw new MissingDataError('auditTrail.physicsResults.pefResults');

        const categories = [];
        for (const category in pefResults) {
            const uuid = ilcdUuids[category];
            if (!uuid) throw new MissingDataError(`ilcdUuids.${category}`);

            // FIX 3: Validate UUID format before use — throw if not a valid EF 3.1 UUID
            validateIlcdUuid(uuid, category);

            const data = pefResults[category];
            if (typeof data.total !== 'number') throw new MissingDataError(`pefResults.${category}.total`);
            if (!data.unit) throw new MissingDataError(`pefResults.${category}.unit`);

            categories.push({ name: category, uuid: uuid, total: data.total, unit: data.unit });
        }

        if (categories.length === SHARED_CONSTANTS.MATH.ZERO) throw new ValidationError('No impact categories');

        // FIX 5: Validate ingredients before access
        if (!auditTrail.physicsResults.ingredients) {
            throw new MissingDataError('auditTrail.physicsResults.ingredients');
        }

        const inputs = [];
        for (const ing of auditTrail.physicsResults.ingredients) {
            const materialId = ing.id;
            const materialUuid = ILCD_UUID_MAP[materialId];
            if (!materialUuid) {
                throw new MissingDataError(`ILCD_UUID_MAP.${materialId}`);
            }

            inputs.push({
                '@id': `input-${materialId}`,
                'ilcd:flow': {
                    'name': ing.name,
                    'uuid': materialUuid,
                    'category': 'Raw Material'
                },
                'quantity': {
                    'value': ing.quantityKg,
                    'unit': 'kg'
                }
            });
        }

        if (inputs.length === SHARED_CONSTANTS.MATH.ZERO) {
            throw new ValidationError('No material inputs in ILCD export');
        }

        if (auditTrail.physicsResults.packaging) {
            const packagingMaterial = auditTrail.metadata.packagingMaterial;
            if (!packagingMaterial) throw new MissingDataError('auditTrail.metadata.packagingMaterial');
            {
                const packagingUuid = ILCD_UUID_MAP[packagingMaterial];
                if (!packagingUuid) {
                    throw new MissingDataError(`ILCD_UUID_MAP.${packagingMaterial}`);
                }

                inputs.push({
                    '@id': 'input-packaging',
                    'ilcd:flow': {
                        'name': packagingMaterial,
                        'uuid': packagingUuid,
                        'category': 'Packaging'
                    },
                    'quantity': {
                        'value': auditTrail.metadata.packagingWeightKg,
                        'unit': 'kg'
                    }
                });
            }
        }

        return {
            '@context': CONSTANTS.ILCD.CONTEXT,
            '@id': auditTrail.dppId,
            'ilcd:version': CONSTANTS.ILCD.VERSION,
            'ilcd:compliance': CONSTANTS.ILCD.COMPLIANCE,
            'processInformation': {
                name: auditTrail.productName,
                functionalUnit: { quantity: auditTrail.metadata.functionalUnitKg, unit: CONSTANTS.ILCD.FUNCTIONAL_UNIT_UNIT }
            },
            'inputs': inputs,
            'impactAssessment': { method: CONSTANTS.ILCD.COMPLIANCE, categories: categories },
            'dataQuality': { overallDQR: auditTrail.complianceResults.overallDQR }
        };
    }

    // STRUCTURE FIX: Added explicit null guard on auditTrail.physicsResults
    // before accessing .pefResults — prevents undefined propagation on
    // missing physicsResults instead of throwing a typed error.
    // EE-2 FIX (2026-06-07): generateCSVExport() marked INTERNAL ONLY.
    // This is a legacy 4-column summary (Category, Total, Unit, PerKg) that predates
    // the full retailer_csv_engine.js. It is NOT the same as the retailer CSV output
    // and must NOT be presented to users or retailers as an environmental disclosure.
    //
    // DO NOT call this function from any production UI path. It exists only for:
    //   - Internal debugging of pefResults structure
    //   - Unit testing of audit trail data shape
    //
    // For retailer-ready CSV: use retailer_csv_engine.js / generateRetailerCSV().
    // For full CSRD disclosure: use exportCSRDMatrix() in audit-trail.js.
    //
    // A guard throw is added below. Remove it ONLY if deliberately using this
    // function for internal debug purposes in a dev/test environment.
    // ITEM #34 DEAD-CODE AUDIT (confirmed): zero call sites anywhere in the codebase.
    // CSV generation is actually handled independently by audit-trail.js (glass-box audit
    // CSV, Item #30) and retailer_csv_engine.js (13-retailer formats, Item #29), each with
    // their own separate, actively-used logic. This function is not part of either path.
    function generateCSVExport(auditTrail) {
        throw new Error(
            '[AIOXY] generateCSVExport() is an INTERNAL DEBUG function (EE-2 FIX). ' +
            'It produces a legacy 4-column CSV incompatible with retailer submissions. ' +
            'Use generateRetailerCSV() (retailer_csv_engine.js) for production CSV output. ' +
            'Remove this throw only in a deliberate dev/test context.'
        );
        // eslint-disable-next-line no-unreachable
        if (!auditTrail) throw new MissingDataError('auditTrail');
        if (!auditTrail.metadata) throw new MissingDataError('auditTrail.metadata');
        if (typeof auditTrail.metadata.functionalUnitKg !== 'number') throw new MissingDataError('auditTrail.metadata.functionalUnitKg');
        if (auditTrail.metadata.functionalUnitKg <= 0) throw new ValidationError('metadata.functionalUnitKg must be greater than zero');
        if (!auditTrail.auditHash) throw new MissingDataError('auditTrail.auditHash');
        if (!auditTrail.dppId) throw new MissingDataError('auditTrail.dppId');
        if (!auditTrail.physicsResults) throw new MissingDataError('auditTrail.physicsResults');

        const pefResults = auditTrail.physicsResults.pefResults;
        if (!pefResults) throw new MissingDataError('auditTrail.physicsResults.pefResults');

        const rows = ['Category,Total,Unit,PerKg'];
        const weight = auditTrail.metadata.functionalUnitKg;

        for (const category in pefResults) {
            const data = pefResults[category];
            rows.push(`${category},${data.total},${data.unit},${data.total / weight}`);
        }

        rows.push('');
        rows.push(`DPP ID,${auditTrail.dppId}`);
        rows.push(`Product,${auditTrail.productName}`);
        rows.push(`Timestamp,${auditTrail.calculationTimestamp}`);
        rows.push(`Audit Hash,${auditTrail.auditHash}`);

        return rows.join('\n');
    }

    exports.CONSTANTS = CONSTANTS;
    exports.SHARED_CONSTANTS = SHARED_CONSTANTS;
    exports.ILCD_UUID_MAP = ILCD_UUID_MAP;
    exports.ExportError = ExportError;
    exports.MissingDataError = MissingDataError;
    exports.ValidationError = ValidationError;
    exports.generateSHA256 = generateSHA256;
    exports.generateAuditTrail = generateAuditTrail;
    exports.finalizeAuditTrail = finalizeAuditTrail;
    exports.generateILCDExport = generateILCDExport;
    exports.generateCSVExport = generateCSVExport;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.exportEngine = window.exportEngine || {}));
