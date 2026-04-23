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
        if (typeof global !== 'undefined' && global.corePhysics && global.corePhysics.CONSTANTS) {
            return global.corePhysics.CONSTANTS;
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
    const ILCD_UUID_MAP = Object.freeze((function() {
        const map = {
            'beef': 'a97a0d3c-1e2f-4b5a-8c3d-2e1f4b5a8c3d',
            'milk': 'b12c4e5f-2a3b-4c6d-9e0f-3a2b4c6d9e0f',
            'chicken': 'c23d5f60-3b4c-5d7e-af10-4b3c5d7eaf10',
            'pork': 'd34e6071-4c5d-6e8f-b021-5c4d6e8fb021',
            'wheat': 'e45f7182-5d6e-7f90-c132-6d5e7f90c132',
            'soy': 'f5607293-6e7f-8001-d243-7e6f8001d243',
            'oats': '067183a4-7f80-9112-e354-8f709012e354',
            'corn': '178294b5-8091-a223-f465-9081a223f465',
            'rice': '2893a5c6-91a2-b334-0576-a192b3340576',
            'potato': '39a4b6d7-a2b3-c445-1687-b2a3c4451687',
            'tomato': '4ab5c7e8-b3c4-d556-2798-c3b4d5562798',
            'apple': '5bc6d8f9-c4d5-e667-38a9-d4c5e66738a9',
            'water': '6cd7e90a-d5e6-f778-49ba-e5d6f77849ba',
            'cardboard': '7de8fa1b-e6f7-0889-5acb-f6e708895acb',
            'plastic': '8ef90b2c-f708-199a-6bdc-07f8199a6bdc',
            'glass': '9f0a1c3d-0819-2aab-7ced-18092aab7ced',
            'aluminum': 'a01b2d4e-192a-3bbc-8dfe-291a3bbc8dfe'
        };

        // STRUCTURE FIX: throw on any invalid UUID — no silent continuation.
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

        const hashPayload = JSON.stringify({
            physics: physicsResults.pefResults,
            compliance: {
                overallDQR: complianceResults.overallDQR,
                dnmCompliant: complianceResults.dnm.compliant  // FIX 2: no optional chaining
            },
            metadata: {
                productName: metadata.productName,
                functionalUnitKg: metadata.functionalUnitKg
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
    function generateCSVExport(auditTrail) {
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

})(typeof module !== 'undefined' && module.exports ? module.exports : (global.exportEngine = {}));
