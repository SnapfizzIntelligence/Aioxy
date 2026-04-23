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
        if (typeof global !== 'undefined' && global.corePhysics && global.corePhysics.CONSTANTS) {
            return global.corePhysics.CONSTANTS;
        }
        throw new Error('compliance_engine: corePhysics.CONSTANTS not found. Load core_physics.js before compliance_engine.js.');
    })();

    // Module-local CONSTANTS contains ONLY compliance-specific values.
    // All references to MATH, SYSTEM_BOUNDARY, and UNIT.PERCENT_MAX
    // use SHARED_CONSTANTS to preserve a single source of truth.
    const CONSTANTS = Object.freeze({
        DQR: Object.freeze({
            INDICATOR_COUNT: 5.0,
            MIN: 1.0,
            MAX: 5.0,
            EXCELLENT: 1.6,
            VERY_GOOD: 2.0,
            GOOD: 3.0
        }),
        DNM: Object.freeze({
            CONTRIBUTION_THRESHOLD: 0.10,
            PRIMARY_DQR_MAX: 2.0,
            SECONDARY_DQR_MAX: 3.0
        }),
        HOTSPOT: Object.freeze({
            CUMULATIVE_THRESHOLD: 0.80
        }),
        ALLOCATION: Object.freeze({
            WASTE_VALUE_THRESHOLD: 0.01,
            SENSITIVITY_THRESHOLD: 0.25,
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
            if (typeof value !== 'number' || value < CONSTANTS.DQR.MIN || value > CONSTANTS.DQR.MAX) {
                throw new ValidationError(`Invalid ${name}: ${value}`);
            }
        }
        
        const dqr = (TeR + TiR + GeR + CoR + RR) / CONSTANTS.DQR.INDICATOR_COUNT;
        
        const qualityLevel = 
            dqr <= CONSTANTS.DQR.EXCELLENT ? 'EXCELLENT' :
            dqr <= CONSTANTS.DQR.VERY_GOOD ? 'VERY_GOOD' :
            dqr <= CONSTANTS.DQR.GOOD ? 'GOOD' : 'FAIR';
        
        return { dqr, qualityLevel };
    }

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
        if (!product) throw new MissingDataError('product');
        if (!product.calculatedImpact) throw new MissingDataError('product.calculatedImpact');
        if (typeof product.materialType !== 'string') throw new MissingDataError('product.materialType');
        
        const referenceValues = CONSTANTS.JRC.REFERENCE_VALUES[product.materialType];
        
        if (!referenceValues) {
            return true;
        }
        
        for (const category in referenceValues) {
            const calculated = product.calculatedImpact[category];
            const reference = referenceValues[category];
            
            if (typeof calculated !== 'number') {
                throw new ValidationError(`JRC validation failed: missing calculated impact for ${category}`);
            }
            
            const deviation = Math.abs(calculated - reference) / reference;
            // FIX 7: Use CONSTANTS for formatting values
            if (deviation > CONSTANTS.JRC.ERROR_MARGIN) {
                throw new ValidationError(
                    `JRC validation failed: ${category} deviation ` +
                    `${(deviation * SHARED_CONSTANTS.UNIT.PERCENT_MAX).toFixed(CONSTANTS.FORMAT.PERCENT_DECIMALS)}% exceeds ` +
                    `${(CONSTANTS.JRC.ERROR_MARGIN * SHARED_CONSTANTS.UNIT.PERCENT_MAX).toFixed(CONSTANTS.FORMAT.PERCENT_DECIMALS)}%`
                );
            }
        }
        
        return true;
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

})(typeof module !== 'undefined' && module.exports ? module.exports : (global.complianceEngine = {}));
