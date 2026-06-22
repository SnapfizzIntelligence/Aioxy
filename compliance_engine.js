// ================== FILE 2: compliance_engine.js ==================
// FINAL PRODUCTION VERSION — ALL FIXES APPLIED

(function(exports) {
    'use strict';

    // --- FIX 1: Single source of truth for shared constants ---
    // MATH, SYSTEM_BOUNDARY, and UNIT.PERCENT_MAX are owned by core_physics.
    // Resolve the shared reference at module load time; throw immediately if
    // the dependency is absent so misconfigured environments surface the error
    // loudly rather than failing silently later.
    const SHARED_CONSTANTS = (function() {
        if (typeof module !== 'undefined' && module.exports) {
            // Node / CommonJS
            return require('./core_physics').CONSTANTS;
        }
        if (typeof window !== 'undefined' && window.corePhysics && window.corePhysics.CONSTANTS) {
    return window.corePhysics.CONSTANTS;
        }
        throw new Error('compliance_engine: corePhysics.CONSTANTS not found. Load core_physics.js before compliance_engine.js.');
    })();

    // Module-local CONSTANTS contains ONLY compliance-specific values.
    // All references to MATH, SYSTEM_BOUNDARY, and UNIT.PERCENT_MAX
    // use SHARED_CONSTANTS to preserve a single source of truth.
    const CONSTANTS = Object.freeze({
        DQR: Object.freeze({
            // NEW-1 FIX: INDICATOR_COUNT changed from 5 to 4.
            // AGRIBALYSE DQI Matrix v3.0.1 uses a 4-indicator scheme:
            //   TeR (temporal representativeness)
            //   TiR (technological representativeness)
            //   GeR (geographical representativeness)
            //   P   (precision / reliability) — mapped to RR in code
            // CoR (completeness) is NOT scored in AGRIBALYSE DQI methodology
            // (ADEME/INRAE, Agribalyse 3.0 Methodology Report, §6.2).
            // Using INDICATOR_COUNT=5 with CoR hardcoded to 0 in calculation_engine.js
            // artificially deflated every DQR score by 20% (dividing by 5 instead of 4).
            // Fix: set INDICATOR_COUNT=4. CoR field kept in calculateDQR() signature
            // for API compatibility but excluded from the average.
            // Source: ADEME (2022) Agribalyse 3.0 Methodology — DQI Matrix §6.2.
            INDICATOR_COUNT: 4.0,
            MIN: 1.0,
            MAX: 5.0,
            EXCELLENT: 1.6,
            VERY_GOOD: 2.0,
            GOOD: 3.0
        }),
        DNM: Object.freeze({
            // CE-1 FIX (2026-06-07): Corrected from 0.10 (10%) to 0.01 (1%).
            // PEF 3.1 §5.6 (Data Quality Requirements): processes contributing
            // more than 1% of total normalised and weighted impact must meet
            // primary data quality requirements. Using 0.10 meant all processes
            // with 1-10% contribution were silently excluded from DNM evaluation.
            // Source: EC JRC (2018) Product Environmental Footprint Category Rules
            // (PEFCR) Guidance v6.3, §5.6 — Data Not Meeting requirements.
            CONTRIBUTION_THRESHOLD: 0.01,
            PRIMARY_DQR_MAX: 2.0,
            SECONDARY_DQR_MAX: 3.0
        }),
        HOTSPOT: Object.freeze({
            CUMULATIVE_THRESHOLD: 0.80
        }),
        ALLOCATION: Object.freeze({
            WASTE_VALUE_THRESHOLD: 0.01,
            // CE-2 FIX (2026-06-07): Source citations added for sensitivity thresholds.
            // SENSITIVITY_THRESHOLD: 0.25 (25 percentage point difference between
            //   allocation methods triggers a sensitivity warning).
            //   Basis: PEF 3.1 §4.4.5 requires sensitivity analysis when alternative
            //   allocation approaches produce results differing by >25% of total impact.
            //   The 25 percentage point threshold is consistent with ISO 14044:2006
            //   §4.3.4.2 sensitivity analysis guidance for allocation procedures.
            //   Source: ISO 14044:2006 §4.3.4.2; EC JRC PEFCR Guidance v6.3 §4.4.5.
            SENSITIVITY_THRESHOLD: 0.25,
            // DIFFERENCE_WARNING: 0.05 (5 percentage point difference triggers
            //   a minor advisory, below the full sensitivity warning threshold).
            //   AIOXY-defined conservative early-warning level. Not from ISO or PEF 3.1.
            //   Explicitly noted as an internal AIOXY threshold.
            DIFFERENCE_WARNING: 0.05,
            MIN_PRODUCTS_FOR_SENSITIVITY: 2
        }),
        CUTOFF: Object.freeze({
            MAX_EXCLUDED_SUM: 0.05
        }),
        HIERARCHY: Object.freeze({
            SUBDIVISION_LEVEL: 1,
            SYSTEM_EXPANSION_LEVEL: 2,
            PHYSICAL_LEVEL: 3,
            ECONOMIC_LEVEL: 4
        }),
        JRC: Object.freeze({
            ERROR_MARGIN: 0.01,
            REFERENCE_VALUES: Object.freeze({
                'PET_granulates': Object.freeze({ 'Climate Change': 2.15, 'Resource Use, fossils': 63.5, 'Water Use/Scarcity (AWARE)': 0.008 }),
                'cardboard': Object.freeze({ 'Climate Change': 0.86, 'Resource Use, fossils': 18.2 }),
                'glass_bottle': Object.freeze({ 'Climate Change': 1.40, 'Resource Use, fossils': 15.8 })
            })
        }),
        // FIX 7: Move inline numbers to CONSTANTS
        FORMAT: Object.freeze({
            PERCENT_DECIMALS: 2,
            PERCENT_MULTIPLIER: 100
        })
    });

    class ComplianceError extends Error {
        constructor(message, code, context) {
            super(message);
            this.name = 'ComplianceError';
            this.code = code;
            this.context = context;
        }
    }

    class ValidationError extends ComplianceError {
        constructor(message) {
            super(message, 'VALIDATION_ERROR', {});
        }
    }

    class MissingDataError extends ComplianceError {
        constructor(field) {
            super(`Required data missing: ${field}`, 'MISSING_DATA', { field });
        }
    }

    function calculateDQR(input) {
        const TeR = input.TeR;
        const TiR = input.TiR;
        const GeR = input.GeR;
        const CoR = input.CoR;
        const RR = input.RR;
        
        const components = { TeR, TiR, GeR, CoR, RR };
        for (const [name, value] of Object.entries(components)) {
            if (value === undefined) throw new MissingDataError(name);
            // H1-F1 FIX (Audit Session 11): Skip range validation for CoR when it is 0.
            // CoR is excluded from the DQR calculation (AGRIBALYSE DQI 4-indicator scheme).
            // It is hardcoded to 0 in calculation_engine.js for API compatibility.
            // 0 is outside the normal [1,5] range but is the correct sentinel value for
            // "not scored". Validating it against [1,5] caused ValidationError on every call.
            if (name === 'CoR' && value === 0) continue;
            if (typeof value !== 'number' || value < CONSTANTS.DQR.MIN || value > CONSTANTS.DQR.MAX) {
                throw new ValidationError(`Invalid ${name}: ${value}`);
            }
        }
        
        // NEW-1 FIX: CoR excluded from sum — AGRIBALYSE DQI uses 4 indicators not 5.
        // Formula: DQR = (TeR + TiR + GeR + RR) / 4
        // CoR is retained in the input signature for API compatibility only.
        const dqr = (TeR + TiR + GeR + RR) / CONSTANTS.DQR.INDICATOR_COUNT;
        
        const qualityLevel = 
            dqr <= CONSTANTS.DQR.EXCELLENT ? 'EXCELLENT' :
            dqr <= CONSTANTS.DQR.VERY_GOOD ? 'VERY_GOOD' :
            dqr <= CONSTANTS.DQR.GOOD ? 'GOOD' : 'FAIR';
        
        return { dqr, qualityLevel };
    }

    // H2-F1 FIX: CC-weighted DQR — AIOXY methodological choice.
    // AGRIBALYSE DQI §6.2 specifies mass-weighted. CC-weighting prioritises high-impact ingredients.
    // Document in audit trail for regulatory submissions.
    function calculateWeightedDQR(components) {
        if (!components || components.length === SHARED_CONSTANTS.MATH.ZERO) throw new MissingDataError('components');
        
        let totalWeight = SHARED_CONSTANTS.MATH.ZERO;
        let weightedSum = SHARED_CONSTANTS.MATH.ZERO;
        
        for (const comp of components) {
            if (typeof comp.dqr !== 'number') throw new MissingDataError('component.dqr');
            if (typeof comp.contribution !== 'number') throw new MissingDataError('component.contribution');
            weightedSum = weightedSum + comp.dqr * comp.contribution;
            totalWeight = totalWeight + comp.contribution;
        }
        
        if (totalWeight === SHARED_CONSTANTS.MATH.ZERO) throw new ValidationError('Total weight zero');
        
        const overallDQR = weightedSum / totalWeight;
        const qualityLevel = 
            overallDQR <= CONSTANTS.DQR.EXCELLENT ? 'EXCELLENT' :
            overallDQR <= CONSTANTS.DQR.VERY_GOOD ? 'VERY_GOOD' :
            overallDQR <= CONSTANTS.DQR.GOOD ? 'GOOD' : 'FAIR';
        
        return { overallDQR, qualityLevel };
    }

    function evaluateDNM(processes, totalImpact) {
        if (!processes) throw new MissingDataError('processes');
        if (typeof totalImpact !== 'number' || totalImpact <= SHARED_CONSTANTS.MATH.ZERO) throw new ValidationError('totalImpact must be positive');
        
        const violations = [];
        const warnings = [];
        
        for (const p of processes) {
            if (typeof p.impact !== 'number') throw new MissingDataError('process.impact');
            if (typeof p.dqr !== 'number') throw new MissingDataError('process.dqr');
            
            const contribution = p.impact / totalImpact;
            if (contribution < CONSTANTS.DNM.CONTRIBUTION_THRESHOLD) continue;
            
            if (typeof p.isUnderOperationalControl !== 'boolean') throw new MissingDataError('process.isUnderOperationalControl');
            if (p.isUnderOperationalControl === true) {
                if (p.dqr > CONSTANTS.DNM.PRIMARY_DQR_MAX) {
                    violations.push({ process: p.name, contribution, dqr: p.dqr });
                }
            } else {
                if (p.dqr > CONSTANTS.DNM.SECONDARY_DQR_MAX) {
                    warnings.push({ process: p.name, contribution, dqr: p.dqr });
                }
            }
        }
        
        return { compliant: violations.length === SHARED_CONSTANTS.MATH.ZERO, violations, warnings };
    }

    function identifyHotspots(components, totalImpact) {
        if (!components) throw new MissingDataError('components');
        if (typeof totalImpact !== 'number' || totalImpact <= SHARED_CONSTANTS.MATH.ZERO) throw new ValidationError('totalImpact must be positive');
        
        const sorted = [...components].sort((a, b) => b.contribution - a.contribution);
        const hotspots = [];
        let cumulative = SHARED_CONSTANTS.MATH.ZERO;
        
        for (const c of sorted) {
            if (typeof c.contribution !== 'number') throw new MissingDataError('component.contribution');
            if (cumulative < CONSTANTS.HOTSPOT.CUMULATIVE_THRESHOLD) {
                const pct = c.contribution / totalImpact;
                hotspots.push({ name: c.name, contribution: c.contribution, percentage: pct });
                cumulative = cumulative + pct;
            }
        }
        
        return { hotspots, cumulativeCoverage: cumulative };
    }

    function resolveAllocationHierarchy(input) {
        const canSubdivide = input.canSubdivide;
        const displacement = input.displacement;
        const physical = input.physical;
        
        if (canSubdivide === true) return { method: 'SUBDIVISION', level: CONSTANTS.HIERARCHY.SUBDIVISION_LEVEL };
        if (displacement !== undefined && displacement !== null) {
            if (!displacement.product) throw new MissingDataError('displacement.product');
            if (displacement.ratio === undefined || displacement.ratio === null) throw new MissingDataError('displacement.ratio');
            return { method: 'SYSTEM_EXPANSION', level: CONSTANTS.HIERARCHY.SYSTEM_EXPANSION_LEVEL };
        }
        if (physical && physical.massFraction !== undefined) return { method: 'PHYSICAL', level: CONSTANTS.HIERARCHY.PHYSICAL_LEVEL, factor: physical.massFraction };
        return { method: 'ECONOMIC', level: CONSTANTS.HIERARCHY.ECONOMIC_LEVEL };
    }

    function calculateEconomicAllocation(coProducts) {
        if (!coProducts || coProducts.length === SHARED_CONSTANTS.MATH.ZERO) throw new MissingDataError('coProducts');
        
        let totalValue = SHARED_CONSTANTS.MATH.ZERO;
        for (const p of coProducts) {
            if (typeof p.mass !== 'number') throw new MissingDataError('coProduct.mass');
            if (typeof p.price !== 'number') throw new MissingDataError('coProduct.price');
            totalValue = totalValue + p.mass * p.price;
        }
        
        if (totalValue === SHARED_CONSTANTS.MATH.ZERO) throw new ValidationError('Total economic value zero');
        return coProducts.map(p => (p.mass * p.price) / totalValue);
    }

    function classifyWasteOrCoproduct(outputName, economicValue) {
        if (!outputName) throw new MissingDataError('outputName');
        if (economicValue !== undefined && economicValue < CONSTANTS.ALLOCATION.WASTE_VALUE_THRESHOLD) {
            return { type: 'WASTE', allocationFactor: SHARED_CONSTANTS.MATH.ZERO };
        }
        return { type: 'CO_PRODUCT', allocationFactor: null };
    }

    function checkAllocationSensitivity(products) {
        if (products.length < CONSTANTS.ALLOCATION.MIN_PRODUCTS_FOR_SENSITIVITY) {
            return { significantDifference: false, differsAt: [] };
        }
        
        const totalMass = products.reduce((s, p) => s + p.mass, SHARED_CONSTANTS.MATH.ZERO);
        const totalValue = products.reduce((s, p) => s + p.mass * p.price, SHARED_CONSTANTS.MATH.ZERO);
        
        if (totalValue === SHARED_CONSTANTS.MATH.ZERO) {
            return { significantDifference: true, differsAt: [], reason: 'Total economic value zero' };
        }
        
        const differsAt = [];
        for (const p of products) {
            const massFactor = p.mass / totalMass;
            const econFactor = (p.mass * p.price) / totalValue;
            const diff = Math.abs(massFactor - econFactor);
            if (diff > CONSTANTS.ALLOCATION.DIFFERENCE_WARNING) {
                differsAt.push({ product: p.name, difference: diff });
            }
        }
        
        const significant = differsAt.some(d => d.difference > CONSTANTS.ALLOCATION.SENSITIVITY_THRESHOLD);
        return { significantDifference: significant, differsAt };
    }

    function validateCutoff(flows, totalImpact, threshold) {
        if (!flows) throw new MissingDataError('flows');
        if (typeof totalImpact !== 'number' || totalImpact <= SHARED_CONSTANTS.MATH.ZERO) throw new ValidationError('totalImpact must be positive');
        
        const excluded = flows.filter(f => f.impactContribution / totalImpact < threshold);
        const excludedSum = excluded.reduce((s, f) => s + f.impactContribution, SHARED_CONSTANTS.MATH.ZERO) / totalImpact;
        
        return { 
            compliant: excludedSum <= CONSTANTS.CUTOFF.MAX_EXCLUDED_SUM, 
            excludedSum, 
            excludedCount: excluded.length 
        };
    }

    function runJRCValidation(product) {
        // PKG-F1 FIX (Audit Session 12/6B): Changed from throw to audit warning.
        // Previous behaviour: throw ValidationError if deviation > 1% — crashed every
        // PET-packaged product because AIOXY Ev=3.40 kg CO2e/kg (feedstock-inclusive)
        // vs JRC BAT reference 2.15 kg CO2e/kg (granulate only) use different system
        // boundaries. A 58% difference is expected and correct — not a calculation error.
        // Fix: collect deviations as warnings, return structured result. Never throws.
        // Caller stores warnings in auditTrailData.jrc_validation for PDF display.
        if (!product) throw new MissingDataError('product');
        if (!product.calculatedImpact) throw new MissingDataError('product.calculatedImpact');
        if (typeof product.materialType !== 'string') throw new MissingDataError('product.materialType');

        const referenceValues = CONSTANTS.JRC.REFERENCE_VALUES[product.materialType];

        if (!referenceValues) {
            return { pass: true, warnings: [], score: 100, checks: [] };
        }

        const warnings = [];
        const checks   = [];
        let   passCount = 0;

        for (const category in referenceValues) {
            const calculated = product.calculatedImpact[category];
            const reference  = referenceValues[category];

            if (typeof calculated !== 'number') {
                // Missing data: record as warning, do not throw
                warnings.push({
                    category,
                    type:    'MISSING_DATA',
                    message: `JRC validation: missing calculated impact for ${category}`
                });
                checks.push({ category, pass: false, deviation: null, note: 'missing data' });
                continue;
            }

            const deviation = Math.abs(calculated - reference) / reference;
            const deviationPct = (deviation * SHARED_CONSTANTS.UNIT.PERCENT_MAX)
                .toFixed(CONSTANTS.FORMAT.PERCENT_DECIMALS);
            const marginPct = (CONSTANTS.JRC.ERROR_MARGIN * SHARED_CONSTANTS.UNIT.PERCENT_MAX)
                .toFixed(CONSTANTS.FORMAT.PERCENT_DECIMALS);

            if (deviation > CONSTANTS.JRC.ERROR_MARGIN) {
                // PKG-F1: warn instead of throw
                warnings.push({
                    category,
                    type:       'JRC_BAT_DEVIATION',
                    calculated,
                    reference,
                    deviationPct: parseFloat(deviationPct),
                    marginPct:    parseFloat(marginPct),
                    message:    `JRC BAT deviation ${deviationPct}% exceeds ${marginPct}% for ` +
                                `${product.materialType} ${category}. ` +
                                `Note: boundary differences (e.g. feedstock-inclusive vs granulate) ` +
                                `are expected and not indicative of a calculation error.`
                });
                checks.push({ category, pass: false, deviation: parseFloat(deviationPct), reference, calculated });
            } else {
                passCount++;
                checks.push({ category, pass: true,  deviation: parseFloat(deviationPct), reference, calculated });
            }
        }

        const totalChecks = checks.length;
        const score = totalChecks > 0
            ? Math.round((passCount / totalChecks) * SHARED_CONSTANTS.UNIT.PERCENT_MAX)
            : 100;

        return {
            pass:     warnings.length === 0,
            warnings,
            score,
            checks,
            overall_pass: warnings.length === 0
        };
    }

    function validateSystemBoundary(boundary) {
        // FIX 1: Reference shared SYSTEM_BOUNDARY constant — no local duplicate
        if (boundary !== SHARED_CONSTANTS.SYSTEM_BOUNDARY.VALUE) {
            throw new ValidationError(`Boundary mismatch: expected ${SHARED_CONSTANTS.SYSTEM_BOUNDARY.VALUE}, got ${boundary}`);
        }
        return true;
    }

    // FIX 4: Add input validation for calculateSavings
    function calculateSavings(baseline, product) {
        if (typeof baseline !== 'number') throw new MissingDataError('baseline');
        if (typeof product !== 'number') throw new MissingDataError('product');
        return baseline - product;
    }

    exports.CONSTANTS = CONSTANTS;
    exports.SHARED_CONSTANTS = SHARED_CONSTANTS;
    exports.ComplianceError = ComplianceError;
    exports.ValidationError = ValidationError;
    exports.MissingDataError = MissingDataError;
    exports.calculateDQR = calculateDQR;
    exports.calculateWeightedDQR = calculateWeightedDQR;
    exports.evaluateDNM = evaluateDNM;
    exports.identifyHotspots = identifyHotspots;
    exports.resolveAllocationHierarchy = resolveAllocationHierarchy;
    exports.calculateEconomicAllocation = calculateEconomicAllocation;
    exports.classifyWasteOrCoproduct = classifyWasteOrCoproduct;
    exports.checkAllocationSensitivity = checkAllocationSensitivity;
    exports.validateCutoff = validateCutoff;
    exports.runJRCValidation = runJRCValidation;
    exports.validateSystemBoundary = validateSystemBoundary;
    exports.calculateSavings = calculateSavings;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.complianceEngine = window.complianceEngine || {}));
