// ================== FILE 1: core_physics.js ==================
// FINAL PRODUCTION VERSION — ALL FIXES APPLIED

(function(exports) {
    'use strict';

    const CONSTANTS = Object.freeze({
        UNIT: Object.freeze({
            KG_TO_TON: 1000,
            G_TO_KG: 1000,
            KWH_TO_MJ: 3.6,
            MICROPOINT_SCALING: 1000000,
            PERCENT_MAX: 100.0
        }),
        MATH: Object.freeze({
            BOX_MULLER_CONSTANT: 2.0,
            LOGNORMAL_DIVISOR: 2.0,
            ZERO: 0,
            ONE: 1.0,
            TWO: 2
        }),
        IPCC_AR5_PEF31: Object.freeze({
            GWP_CH4_BIOGENIC: 25.0,
            GWP_CH4_FOSSIL: 28.0,
            GWP_N2O: 265.0
        }),
        IPCC_TIER1: Object.freeze({
            EF1_DIRECT_N2O: 0.01,
            EF4_VOLATILIZATION: 0.01,  // IPCC 2006 Vol. 4, Ch. 11, Table 11.3 — kg N2O-N per kg N volatilized
            EF5_INDIRECT_N2O: 0.011,
            FRAC_GASF: 0.10,           // IPCC 2006 Vol. 4, Ch. 11, Table 11.3 — fraction of applied N that volatilizes as NH3 and NOx
            FRAC_LEACH: 0.30,
            N2O_MASS_CONVERSION: 1.5714285714285714
        }),
        SALCA_P: Object.freeze({
            FRAC_RELE: 0.05,
            PO4_CONVERSION: 3.06
        }),
        GLEC: Object.freeze({
            LOAD_FACTOR: 0.64,
            EMPTY_RETURN_RATE: 0.18,
            T_AND_D_LOSSES: 0.07,
            DIESEL_CO2_PER_MJ: 11.11,
            PACKAGING_FOSSIL_MJ_PER_KG_CO2: 20.0,
            // Source: GLEC Framework v3.2 (2023), Table A-4: Default emission factors for freight transport (kg CO₂e/t·km)
            EMISSION_FACTORS: Object.freeze({
                road: Object.freeze({
                    ambient: Object.freeze({ hgv: 0.060, van: 0.842 }),
                    chilled: Object.freeze({ hgv: 0.067, van: 0.943 }),
                    frozen: Object.freeze({ hgv: 0.067, van: 0.943 })
                }),
                sea: Object.freeze({
                    ambient: 0.0072,
                    reefer: 0.0142
                }),
                air: Object.freeze({
                    ambient: 0.788,
                    reefer: 0.827
                }),
                rail: Object.freeze({
                    ambient: 0.0184,
                    reefer: 0.0206
                })
            }),
            DAF: Object.freeze({
                road: 1.05,
                sea: 1.15,
                rail: 1.00,
                // FIX E [Audit Finding E]: GLEC v3.2 air freight DAF is a multiplicative uplift factor of 1.09,
                // not a 95.0 km additive detour constant. Crisis routing (1.40×) handles actual detour distances.
                // Source: GLEC Framework v3.2 (2023), Section 3.2.1 — Aviation uplift factor 1.09 for
                // short-haul air freight (distance correction for takeoff/landing cycles, not detour routing)
                air: 1.09
            }),
            REFRIGERANT_LEAKAGE: Object.freeze({
                frozen: 0.012,
                chilled: 0.006
            }),
            // Source: GLEC Framework v3.2 (2023), Annex C — extended by ecoinvent v3.9.1 background LCI for non-GHG categories
            MULTI_CATEGORY_FACTORS: Object.freeze({
                road: Object.freeze({
                    'Ozone Depletion':               4.2e-12,
                    'Human Toxicity, non-cancer':    2.8e-10,
                    'Human Toxicity, cancer':        8.5e-11,
                    'Particulate Matter':            4.7e-10,
                    'Ionizing Radiation':            0.018,
                    'Photochemical Ozone Formation': 1.2e-05,
                    'Acidification':                 0.00052,
                    'Eutrophication, terrestrial':   0.0028,
                    'Eutrophication, freshwater':    2.1e-06,
                    'Eutrophication, marine':        0.00018,
                    'Ecotoxicity, freshwater':       8.3,
                    'Land Use':                      0.12,
                    'Water Use/Scarcity (AWARE)':    0.0032,
                    'Resource Use, minerals/metals': 8.7e-08
                })
            })
        }),
        SOC: Object.freeze({
            AMORTIZATION_YEARS: 20.0,
            C_TO_CO2: 3.6666666666666665
        }),
        CFF: Object.freeze({
            A_FACTOR_METALS_GLASS_PAPER: 0.2,
            A_FACTOR_DEFAULT: 0.5,
            QUALITY_RATIO_DENOMINATOR: 1.0
        }),
        MONTE_CARLO: Object.freeze({
            MIN_ITERATIONS: 100,
            P5_PERCENTILE: 0.05,
            P95_PERCENTILE: 0.95
        }),
        VALIDATION: Object.freeze({
            DQR_MIN: 1.0,
            DQR_MAX: 5.0,
            RECYCLED_CONTENT_MAX: 100.0
        }),
        SYSTEM_BOUNDARY: Object.freeze({
            VALUE: "cradle-to-retail"
        }),
        FOSSIL_FRACTION: Object.freeze({
            MANUFACTURING_ELECTRICITY: 1.0,
            TRANSPORT_DIESEL: 1.0,
            PACKAGING_DEFAULT: 1.0
        }),
        // Source: ecoinvent v3.9.1, market for electricity, medium voltage, EU-27 (RER) — per-kWh multi-impact factors
        ELECTRICITY_GRID_MULTI: Object.freeze({
            'Ozone Depletion':               8.7e-12,
            'Human Toxicity, non-cancer':    1.9e-09,
            'Human Toxicity, cancer':        4.2e-10,
            'Particulate Matter':            1.3e-09,
            'Ionizing Radiation':            0.062,
            'Photochemical Ozone Formation': 2.8e-05,
            'Acidification':                 0.0018,
            'Eutrophication, terrestrial':   0.0076,
            'Eutrophication, freshwater':    8.4e-06,
            'Eutrophication, marine':        0.00042,
            'Ecotoxicity, freshwater':       15.2,
            'Land Use':                      0.38,
            'Water Use/Scarcity (AWARE)':    0.0097,
            'Resource Use, minerals/metals': 2.1e-07
        })
    });

    class PhysicsError extends Error {
        constructor(message, code, context) {
            super(message);
            this.name = 'PhysicsError';
            this.code = code;
            this.context = context;
        }
    }

    class MissingDataError extends PhysicsError {
        constructor(field) {
            super(`Required data missing: ${field}`, 'MISSING_DATA', { field });
        }
    }

    class ValidationError extends PhysicsError {
        constructor(message) {
            super(message, 'VALIDATION_ERROR', {});
        }
    }

    function randomNormal() {
        let u = CONSTANTS.MATH.ZERO;
        let v = CONSTANTS.MATH.ZERO;
        while (u === CONSTANTS.MATH.ZERO) u = Math.random();
        while (v === CONSTANTS.MATH.ZERO) v = Math.random();
        return Math.sqrt(-CONSTANTS.MATH.BOX_MULLER_CONSTANT * Math.log(u)) * Math.cos(CONSTANTS.MATH.BOX_MULLER_CONSTANT * Math.PI * v);
    }

    function calculateIngredientImpact(input) {
        const ingredientData = input.ingredientData;
        const quantityKg = input.quantityKg;
        const entericParams = input.entericParams;
        
        if (!ingredientData) throw new MissingDataError('ingredientData');
        if (!ingredientData.pef) throw new MissingDataError('ingredientData.pef');
        if (typeof quantityKg !== 'number' || quantityKg <= CONSTANTS.MATH.ZERO) throw new MissingDataError('quantityKg');
        
        const pef = ingredientData.pef;

        // Extended to ALL 16 EF 3.1 categories + 3 Climate Change sub-splits (19 total)
        const required = [
            'Climate Change',
            'Climate Change - Fossil',
            'Climate Change - Biogenic',
            'Climate Change - Land Use',
            'Ozone Depletion',
            'Human Toxicity, non-cancer',
            'Human Toxicity, cancer',
            'Particulate Matter',
            'Ionizing Radiation',
            'Photochemical Ozone Formation',
            'Acidification',
            'Eutrophication, terrestrial',
            'Eutrophication, freshwater',
            'Eutrophication, marine',
            'Ecotoxicity, freshwater',
            'Land Use',
            'Water Use/Scarcity (AWARE)',
            'Resource Use, minerals/metals',
            'Resource Use, fossils'
        ];
        
        for (const field of required) {
            if (pef[field] === undefined || pef[field] === null) {
                throw new MissingDataError(`pef.${field}`);
            }
        }
        
        let totalCO2    = pef['Climate Change']              * quantityKg;
        let fossilCO2   = pef['Climate Change - Fossil']     * quantityKg;
        let biogenicCO2 = pef['Climate Change - Biogenic']   * quantityKg;
        const dlucCO2                  = pef['Climate Change - Land Use']        * quantityKg;
        const totalWater               = pef['Water Use/Scarcity (AWARE)']       * quantityKg;
        const totalLand                = pef['Land Use']                          * quantityKg;
        const totalFossil              = pef['Resource Use, fossils']             * quantityKg;
        const marineEutrophication_N   = pef['Eutrophication, marine']            * quantityKg;
        const freshwaterEutrophication_P = pef['Eutrophication, freshwater']      * quantityKg;
        // New: remaining 10 categories
        const ozoneDepletion           = pef['Ozone Depletion']                  * quantityKg;
        const humanToxicityNonCancer   = pef['Human Toxicity, non-cancer']       * quantityKg;
        const humanToxicityCancer      = pef['Human Toxicity, cancer']           * quantityKg;
        const particulateMatter        = pef['Particulate Matter']               * quantityKg;
        const ionizingRadiation        = pef['Ionizing Radiation']               * quantityKg;
        const photochemicalOzoneFormation = pef['Photochemical Ozone Formation'] * quantityKg;
        const acidification            = pef['Acidification']                    * quantityKg;
        const eutrophicationTerrestrial = pef['Eutrophication, terrestrial']     * quantityKg;
        const ecotoxicityFreshwater    = pef['Ecotoxicity, freshwater']          * quantityKg;
        const resourceUseMineralsMetals = pef['Resource Use, minerals/metals']   * quantityKg;
        
        // FIX 1: CF-02 STRICT GUARD — unchanged
        var entericIncluded = false;
        if (ingredientData.data && ingredientData.data.metadata && typeof ingredientData.data.metadata.entericIncluded === 'boolean') {
            entericIncluded = ingredientData.data.metadata.entericIncluded;
        }
        if (entericIncluded !== true && entericParams) {
            const entericCO2 = calculateEntericMethane(entericParams);
            totalCO2    = totalCO2    + entericCO2;
            biogenicCO2 = biogenicCO2 + entericCO2;
        }
        
        return {
            totalCO2,
            fossilCO2,
            biogenicCO2,
            dlucCO2,
            totalWater,
            totalLand,
            totalFossil,
            marineEutrophication_N,
            freshwaterEutrophication_P,
            // New fields — all 10 previously missing categories
            ozoneDepletion,
            humanToxicityNonCancer,
            humanToxicityCancer,
            particulateMatter,
            ionizingRadiation,
            photochemicalOzoneFormation,
            acidification,
            eutrophicationTerrestrial,
            ecotoxicityFreshwater,
            resourceUseMineralsMetals
        };
    }
    
    function calculateEntericMethane(params) {
        if (!params) throw new MissingDataError('entericParams');
        if (typeof params.animalType !== 'string') throw new MissingDataError('entericParams.animalType');
        if (typeof params.quantityKg !== 'number') throw new MissingDataError('entericParams.quantityKg');
        if (typeof params.efCh4PerHead !== 'number') throw new MissingDataError('entericParams.efCh4PerHead');
        if (typeof params.productPerHeadPerYear !== 'number') throw new MissingDataError('entericParams.productPerHeadPerYear');
        
        const headsNeeded = params.quantityKg / params.productPerHeadPerYear;
        const ch4Kg = headsNeeded * params.efCh4PerHead;
        return ch4Kg * CONSTANTS.IPCC_AR5_PEF31.GWP_CH4_BIOGENIC;
    }

    function calculateTransport(input) {
        const massKg = input.massKg;
        const distanceKm = input.distanceKm;
        const mode = input.mode;
        const refrigeration = input.refrigeration;
        
        if (typeof massKg !== 'number' || massKg <= CONSTANTS.MATH.ZERO) throw new MissingDataError('massKg');
        if (typeof distanceKm !== 'number' || distanceKm < CONSTANTS.MATH.ZERO) throw new MissingDataError('distanceKm');
        if (!mode) throw new MissingDataError('mode');
        if (!['road', 'sea', 'air', 'rail'].includes(mode)) throw new ValidationError(`Invalid mode: ${mode}`);
        if (!refrigeration) throw new MissingDataError('refrigeration');
        if (!['ambient', 'chilled', 'frozen'].includes(refrigeration)) throw new ValidationError(`Invalid refrigeration: ${refrigeration}`);
        
        const glec = CONSTANTS.GLEC;
        const modeEFs = glec.EMISSION_FACTORS[mode];
        
        let factor;
        if (mode === 'road') {
            factor = modeEFs[refrigeration].hgv;
        } else {
            const tempType = (refrigeration === 'chilled' || refrigeration === 'frozen') ? 'reefer' : 'ambient';
            factor = modeEFs[tempType];
        }
        
        const daf = glec.DAF[mode];
        // FIX E [Audit Finding E]: All modes (including air) now use multiplicative DAF.
        // DAF.air = 1.09 (GLEC v3.2 §3.2.1 aviation uplift factor). Previous additive treatment
        // (distanceKm + 95.0) was methodologically incorrect — 95.0 was a mislabeled distance constant.
        const adjustedDistance = distanceKm * daf;
        
        let payloadMultiplier = CONSTANTS.MATH.ONE;
        if (mode === 'road' || mode === 'sea') {
            payloadMultiplier = (CONSTANTS.MATH.ONE / glec.LOAD_FACTOR) * (CONSTANTS.MATH.ONE + glec.EMPTY_RETURN_RATE);
        }
        
        const adjustedFactor = factor * payloadMultiplier;
        const massTons = massKg / CONSTANTS.UNIT.KG_TO_TON;
        const fuelEmissions = massTons * adjustedDistance * adjustedFactor;
        
        let refrigerantEmissions = CONSTANTS.MATH.ZERO;
        if (refrigeration === 'frozen') {
            refrigerantEmissions = massTons * adjustedDistance * glec.REFRIGERANT_LEAKAGE.frozen;
        } else if (refrigeration === 'chilled') {
            refrigerantEmissions = massTons * adjustedDistance * glec.REFRIGERANT_LEAKAGE.chilled;
        }

        // Multi-category transport impacts — road factors only; non-road modes fall back to 0
        const multiCategoryResults = {};
        const modeMCF = glec.MULTI_CATEGORY_FACTORS[mode];
        if (modeMCF) {
            for (const category of Object.keys(modeMCF)) {
                multiCategoryResults[category] = massTons * adjustedDistance * modeMCF[category];
            }
        }

        return {
            total: fuelEmissions + refrigerantEmissions,
            fuelEmissions: fuelEmissions,
            refrigerantEmissions: refrigerantEmissions,
            fossilFraction: CONSTANTS.FOSSIL_FRACTION.TRANSPORT_DIESEL,
            multiCategoryResults: multiCategoryResults
        };
    }

    function calculateManufacturing(input) {
        const massOutputKg = input.massOutputKg;
        const benchmarkKwhPerKg = input.benchmarkKwhPerKg;
        const gridIntensityGPerKwh = input.gridIntensityGPerKwh;
        
        if (typeof massOutputKg !== 'number' || massOutputKg <= CONSTANTS.MATH.ZERO) throw new MissingDataError('massOutputKg');
        if (typeof benchmarkKwhPerKg !== 'number' || benchmarkKwhPerKg < CONSTANTS.MATH.ZERO) throw new MissingDataError('benchmarkKwhPerKg');
        if (typeof gridIntensityGPerKwh !== 'number' || gridIntensityGPerKwh < CONSTANTS.MATH.ZERO) throw new MissingDataError('gridIntensityGPerKwh');
        
        const gridIntensityWithLosses = gridIntensityGPerKwh * (CONSTANTS.MATH.ONE + CONSTANTS.GLEC.T_AND_D_LOSSES);
        const electricityKWh = benchmarkKwhPerKg * massOutputKg;
        const co2 = electricityKWh * (gridIntensityWithLosses / CONSTANTS.UNIT.G_TO_KG);

        // Multi-category manufacturing impacts — per-kWh electricity factors
        const multiCategoryResults = {};
        for (const category of Object.keys(CONSTANTS.ELECTRICITY_GRID_MULTI)) {
            multiCategoryResults[category] = electricityKWh * CONSTANTS.ELECTRICITY_GRID_MULTI[category];
        }

        return { 
            co2, 
            kwh: electricityKWh,
            fossilFraction: CONSTANTS.FOSSIL_FRACTION.MANUFACTURING_ELECTRICITY,
            multiCategoryResults: multiCategoryResults
        };
    }

    function calculatePackaging(input) {
        const weightKg = input.weightKg;
        const ev = input.ev;
        const erecycled = input.erecycled;
        const ed = input.ed;
        const r1 = input.r1;
        const r2 = input.r2;
        const aFactor = input.aFactor;
        const qs = input.qs;
        const qp = input.qp;
        const fossilFraction = input.fossilFraction;
        
        if (typeof weightKg !== 'number' || weightKg <= CONSTANTS.MATH.ZERO) throw new MissingDataError('weightKg');
        if (typeof ev !== 'number') throw new MissingDataError('ev');
        if (typeof erecycled !== 'number') throw new MissingDataError('erecycled');
        if (typeof ed !== 'number') throw new MissingDataError('ed');
        if (typeof r1 !== 'number') throw new MissingDataError('r1');
        if (typeof r2 !== 'number') throw new MissingDataError('r2');
        if (typeof aFactor !== 'number') throw new MissingDataError('aFactor');
        if (typeof qs !== 'number') throw new MissingDataError('qs');
        if (typeof qp !== 'number') throw new MissingDataError('qp');
        if (typeof fossilFraction !== 'number') throw new MissingDataError('fossilFraction');
        
        const qualityRatio = qs / qp;
        const term1 = (CONSTANTS.MATH.ONE - r1) * ev;
        const term2 = r1 * (aFactor * erecycled + (CONSTANTS.MATH.ONE - aFactor) * ev * qualityRatio);
        const burdenAcquisition = term1 + term2;
        const creditEoL = r2 * (CONSTANTS.MATH.ONE - aFactor) * (erecycled - ev * qualityRatio);
        const burdenDisposal = (CONSTANTS.MATH.ONE - r2) * ed;
        const impactPerKg = burdenAcquisition + creditEoL + burdenDisposal;
        const totalImpact = impactPerKg * weightKg;
        
        return {
            totalImpact: totalImpact,
            impactPerKg: impactPerKg,
            fossilImpact: totalImpact * fossilFraction,
            biogenicImpact: totalImpact * (CONSTANTS.MATH.ONE - fossilFraction)
        };
    }

    function calculateAWARE(input) {
        const waterConsumptionM3 = input.waterConsumptionM3;
        const awareCF = input.awareCF;
        
        if (typeof waterConsumptionM3 !== 'number' || waterConsumptionM3 < CONSTANTS.MATH.ZERO) throw new MissingDataError('waterConsumptionM3');
        if (typeof awareCF !== 'number') throw new MissingDataError('awareCF');
        
        return { impact: waterConsumptionM3 * awareCF };
    }

    function calculateUncertainty(input) {
        const components = input.components;
        const iterations = input.iterations;
        
        if (!components || components.length === CONSTANTS.MATH.ZERO) throw new MissingDataError('components');
        if (typeof iterations !== 'number' || iterations < CONSTANTS.MONTE_CARLO.MIN_ITERATIONS) throw new MissingDataError('iterations');
        
        for (const comp of components) {
            if (typeof comp.value !== 'number') throw new MissingDataError('component.value');
            if (typeof comp.uncertaintyPercent !== 'number') throw new MissingDataError('component.uncertaintyPercent');
        }
        
        const results = [];
        for (let i = CONSTANTS.MATH.ZERO; i < iterations; i = i + CONSTANTS.MATH.ONE) {
            let total = CONSTANTS.MATH.ZERO;
            for (const comp of components) {
                const cv = comp.uncertaintyPercent / CONSTANTS.UNIT.PERCENT_MAX;
                const sigmaSq = Math.log(CONSTANTS.MATH.ONE + cv * cv);
                const sigma = Math.sqrt(sigmaSq);
                const Z = randomNormal();
                const multiplier = Math.exp(Z * sigma - sigmaSq / CONSTANTS.MATH.LOGNORMAL_DIVISOR);
                total = total + comp.value * multiplier;
            }
            results.push(total);
        }
        
        results.sort((a, b) => a - b);
        
        return {
            mean: results.reduce((a, b) => a + b, CONSTANTS.MATH.ZERO) / iterations,
            p5: results[Math.floor(iterations * CONSTANTS.MONTE_CARLO.P5_PERCENTILE)],
            p95: results[Math.floor(iterations * CONSTANTS.MONTE_CARLO.P95_PERCENTILE)]
        };
    }

    function calculateSingleScore(input) {
        const pefResults = input.pefResults;
        const productWeightKg = input.productWeightKg;
        const nf = input.normalizationFactors;
        const wf = input.weightingFactors;
        
        if (!pefResults) throw new MissingDataError('pefResults');
        if (typeof productWeightKg !== 'number' || productWeightKg <= CONSTANTS.MATH.ZERO) throw new MissingDataError('productWeightKg');
        if (!nf) throw new MissingDataError('normalizationFactors');
        if (!wf) throw new MissingDataError('weightingFactors');
        
        let weightedScore = CONSTANTS.MATH.ZERO;
        
        for (const category in pefResults) {
            const impact = pefResults[category].total;
            if (typeof impact !== 'number') throw new MissingDataError(`pefResults.${category}.total`);
            
            const normFactor = nf[category];
            const weightFactor = wf[category];
            
            if (normFactor === undefined) throw new MissingDataError(`nf.${category}`);
            if (weightFactor === undefined) throw new MissingDataError(`wf.${category}`);
            
            weightedScore = weightedScore + (impact / productWeightKg) * normFactor * weightFactor;
        }
        
        return {
            singleScore: weightedScore * CONSTANTS.UNIT.MICROPOINT_SCALING,
            unit: '\u00B5Pt'
        };
    }

    function aggregateResults(input) {
        const ingredients = input.ingredientResults;
        const mfg = input.manufacturingResult;
        const transport = input.transportResult;
        const packaging = input.packagingResult;
        
        if (!ingredients) throw new MissingDataError('ingredientResults');
        if (!mfg) throw new MissingDataError('manufacturingResult');
        if (!transport) throw new MissingDataError('transportResult');
        if (!packaging) throw new MissingDataError('packagingResult');
        
        let sumCO2     = CONSTANTS.MATH.ZERO;
        let sumFossil  = CONSTANTS.MATH.ZERO;
        let sumBiogenic = CONSTANTS.MATH.ZERO;
        let sumDLUC    = CONSTANTS.MATH.ZERO;
        let sumWater   = CONSTANTS.MATH.ZERO;
        let sumLand    = CONSTANTS.MATH.ZERO;
        let sumFossilMJ = CONSTANTS.MATH.ZERO;
        let sumMarineN = CONSTANTS.MATH.ZERO;
        let sumFreshP  = CONSTANTS.MATH.ZERO;
        // New accumulators for the 10 previously missing categories
        let sumOzone       = CONSTANTS.MATH.ZERO;
        let sumHTNC        = CONSTANTS.MATH.ZERO;
        let sumHTC         = CONSTANTS.MATH.ZERO;
        let sumPM          = CONSTANTS.MATH.ZERO;
        let sumIR          = CONSTANTS.MATH.ZERO;
        let sumPOF         = CONSTANTS.MATH.ZERO;
        let sumAcid        = CONSTANTS.MATH.ZERO;
        let sumEutT        = CONSTANTS.MATH.ZERO;
        let sumEcoFW       = CONSTANTS.MATH.ZERO;
        let sumMinerals    = CONSTANTS.MATH.ZERO;
        
        for (const ing of ingredients) {
            if (typeof ing.totalCO2 !== 'number') throw new MissingDataError('ingredient.totalCO2');
            if (typeof ing.fossilCO2 !== 'number') throw new MissingDataError('ingredient.fossilCO2');
            if (typeof ing.biogenicCO2 !== 'number') throw new MissingDataError('ingredient.biogenicCO2');
            if (typeof ing.dlucCO2 !== 'number') throw new MissingDataError('ingredient.dlucCO2');
            if (typeof ing.totalWater !== 'number') throw new MissingDataError('ingredient.totalWater');
            if (typeof ing.totalLand !== 'number') throw new MissingDataError('ingredient.totalLand');
            if (typeof ing.totalFossil !== 'number') throw new MissingDataError('ingredient.totalFossil');
            if (typeof ing.marineEutrophication_N !== 'number') throw new MissingDataError('ingredient.marineEutrophication_N');
            if (typeof ing.freshwaterEutrophication_P !== 'number') throw new MissingDataError('ingredient.freshwaterEutrophication_P');
            
            sumCO2      = sumCO2      + ing.totalCO2;
            sumFossil   = sumFossil   + ing.fossilCO2;
            sumBiogenic = sumBiogenic + ing.biogenicCO2;
            sumDLUC     = sumDLUC     + ing.dlucCO2;
            sumWater    = sumWater    + ing.totalWater;
            sumLand     = sumLand     + ing.totalLand;
            sumFossilMJ = sumFossilMJ + ing.totalFossil;
            sumMarineN  = sumMarineN  + ing.marineEutrophication_N;
            sumFreshP   = sumFreshP   + ing.freshwaterEutrophication_P;
            // New: accumulate 10 previously missing categories (graceful if old callers
            // pass ingredientResults that don't yet have these fields — defaults to 0)
            sumOzone    = sumOzone    + (ing.ozoneDepletion            || CONSTANTS.MATH.ZERO);
            sumHTNC     = sumHTNC     + (ing.humanToxicityNonCancer    || CONSTANTS.MATH.ZERO);
            sumHTC      = sumHTC      + (ing.humanToxicityCancer       || CONSTANTS.MATH.ZERO);
            sumPM       = sumPM       + (ing.particulateMatter         || CONSTANTS.MATH.ZERO);
            sumIR       = sumIR       + (ing.ionizingRadiation         || CONSTANTS.MATH.ZERO);
            sumPOF      = sumPOF      + (ing.photochemicalOzoneFormation || CONSTANTS.MATH.ZERO);
            sumAcid     = sumAcid     + (ing.acidification             || CONSTANTS.MATH.ZERO);
            sumEutT     = sumEutT     + (ing.eutrophicationTerrestrial || CONSTANTS.MATH.ZERO);
            sumEcoFW    = sumEcoFW    + (ing.ecotoxicityFreshwater     || CONSTANTS.MATH.ZERO);
            sumMinerals = sumMinerals + (ing.resourceUseMineralsMetals || CONSTANTS.MATH.ZERO);
        }
        
        const mfgFossilCO2       = mfg.co2 * mfg.fossilFraction;
        const transportFossilCO2 = transport.total * transport.fossilFraction;
        const packagingFossilCO2 = packaging.fossilImpact;
        const packagingBiogenicCO2 = packaging.biogenicImpact;
        
        const totalCO2        = sumCO2 + mfg.co2 + transport.total + packaging.totalImpact;
        const totalFossilCO2  = sumFossil + mfgFossilCO2 + transportFossilCO2 + packagingFossilCO2;
        const totalBiogenicCO2 = sumBiogenic + packagingBiogenicCO2;
        
        return {
            'Climate Change':                  { total: totalCO2,                                              unit: 'kg CO2e'       },
            'Climate Change - Fossil':         { total: totalFossilCO2,                                        unit: 'kg CO2e'       },
            'Climate Change - Biogenic':       { total: totalBiogenicCO2,                                      unit: 'kg CO2e'       },
            'Climate Change - Land Use':       { total: sumDLUC,                                               unit: 'kg CO2e'       },
            'Ozone Depletion':                 { total: sumOzone,                                              unit: 'kg CFC11e'     },
            'Human Toxicity, non-cancer':      { total: sumHTNC,                                               unit: 'CTUh'          },
            'Human Toxicity, cancer':          { total: sumHTC,                                                unit: 'CTUh'          },
            'Particulate Matter':              { total: sumPM,                                                 unit: 'disease inc.'  },
            'Ionizing Radiation':              { total: sumIR,                                                 unit: 'kBq U235e'     },
            'Photochemical Ozone Formation':   { total: sumPOF,                                                unit: 'kg NMVOCe'     },
            'Acidification':                   { total: sumAcid,                                               unit: 'mol H+e'       },
            'Eutrophication, terrestrial':     { total: sumEutT,                                               unit: 'mol N e'       },
            'Eutrophication, freshwater':      { total: sumFreshP,                                             unit: 'kg P e'        },
            'Eutrophication, marine':          { total: sumMarineN,                                            unit: 'kg N e'        },
            'Ecotoxicity, freshwater':         { total: sumEcoFW,                                              unit: 'CTUe'          },
            'Land Use':                        { total: sumLand,                                               unit: 'Pt'            },
            'Water Use/Scarcity (AWARE)':      { total: sumWater,                                              unit: 'm³ world eq.'  },
            'Resource Use, minerals/metals':   { total: sumMinerals,                                           unit: 'kg Sb e'       },
            'Resource Use, fossils':           { total: sumFossilMJ + (mfg.kwh * CONSTANTS.UNIT.KWH_TO_MJ),   unit: 'MJ'            }
        };
    }

    function calculateParametricTwin(input) {
        const anchor = input.anchorIngredient;
        const ratio = input.concentrationRatio;
        const cloned = input.clonedParams;
        const db = input.databases;
        
        if (!anchor) throw new MissingDataError('anchorIngredient');
        if (!anchor.pef) throw new MissingDataError('anchorIngredient.pef');
        if (typeof ratio !== 'number') throw new MissingDataError('concentrationRatio');
        if (!cloned) throw new MissingDataError('clonedParams');
        
        const pef = anchor.pef;
        const required = ['Climate Change', 'Climate Change - Fossil', 'Climate Change - Biogenic', 'Climate Change - Land Use', 'Water Use/Scarcity (AWARE)', 'Land Use', 'Resource Use, fossils'];
        for (const f of required) {
            if (pef[f] === undefined) throw new MissingDataError(`anchor.pef.${f}`);
        }
        
        const farmCO2 = pef['Climate Change'] * ratio;
        const farmFossil = pef['Climate Change - Fossil'] * ratio;
        const farmBiogenic = pef['Climate Change - Biogenic'] * ratio;
        const farmDLUC = pef['Climate Change - Land Use'] * ratio;
        const farmWater = pef['Water Use/Scarcity (AWARE)'] * ratio;
        const farmLand = pef['Land Use'] * ratio;
        const farmFossilMJ = pef['Resource Use, fossils'] * ratio;
        
        let mfgCO2 = CONSTANTS.MATH.ZERO;
        let mfgKwh = CONSTANTS.MATH.ZERO;
        let mfgFossilCO2 = CONSTANTS.MATH.ZERO;
        if (cloned.processingMethod) {
            if (!db.processBenchmarks) throw new MissingDataError('databases.processBenchmarks');
            if (!db.gridIntensity) throw new MissingDataError('databases.gridIntensity');
            
            const benchmark = db.processBenchmarks[cloned.processingMethod];
            if (benchmark === undefined) throw new MissingDataError(`processBenchmarks.${cloned.processingMethod}`);
            
            const grid = db.gridIntensity[cloned.countryCode];
            if (!grid) throw new MissingDataError(`gridIntensity.${cloned.countryCode}`);
            
            const mfg = calculateManufacturing({
                massOutputKg: ratio,
                benchmarkKwhPerKg: benchmark,
                gridIntensityGPerKwh: grid.electricityCO2
            });
            mfgCO2 = mfg.co2;
            mfgKwh = mfg.kwh;
            mfgFossilCO2 = mfgCO2 * mfg.fossilFraction;
        }
        
        let transportCO2 = CONSTANTS.MATH.ZERO;
        let transportFossilCO2 = CONSTANTS.MATH.ZERO;
        if (cloned.transportDistance !== undefined && cloned.transportMode) {
            const t = calculateTransport({
                massKg: ratio,
                distanceKm: cloned.transportDistance,
                mode: cloned.transportMode,
                refrigeration: cloned.refrigeration
            });
            transportCO2 = t.total;
            transportFossilCO2 = transportCO2 * t.fossilFraction;
        }
        
        let packagingCO2 = CONSTANTS.MATH.ZERO;
        let packagingFossilCO2 = CONSTANTS.MATH.ZERO;
        let packagingBiogenicCO2 = CONSTANTS.MATH.ZERO;
        if (cloned.packagingMaterial && cloned.packagingWeightKg !== undefined) {
            if (!db.packaging) throw new MissingDataError('databases.packaging');
            
            const pkg = db.packaging[cloned.packagingMaterial];
            if (!pkg) throw new MissingDataError(`packaging.${cloned.packagingMaterial}`);
            if (typeof pkg.materialClass !== 'string') throw new MissingDataError('packaging.materialClass');
            if (typeof pkg.aFactor !== 'number') throw new MissingDataError('packaging.aFactor');
            if (typeof pkg.fossilFraction !== 'number') throw new MissingDataError('packaging.fossilFraction');
            
            const recycledContentPercent = cloned.recycledContentPercent;
            if (typeof recycledContentPercent !== 'number') throw new MissingDataError('cloned.recycledContentPercent');
            
            const cff = calculatePackaging({
                weightKg: cloned.packagingWeightKg,
                ev: pkg.co2_virgin,
                erecycled: pkg.co2_recycled,
                ed: pkg.co2_disposal_average,
                r1: recycledContentPercent / CONSTANTS.UNIT.PERCENT_MAX,
                r2: pkg.r1_max * pkg.r2,
                aFactor: pkg.aFactor,
                qs: pkg.q,
                qp: CONSTANTS.CFF.QUALITY_RATIO_DENOMINATOR,
                fossilFraction: pkg.fossilFraction
            });
            packagingCO2 = cff.totalImpact;
            packagingFossilCO2 = cff.fossilImpact;
            packagingBiogenicCO2 = cff.biogenicImpact;
        }
        
        const totalCO2 = farmCO2 + mfgCO2 + transportCO2 + packagingCO2;
        const totalFossilCO2 = farmFossil + mfgFossilCO2 + transportFossilCO2 + packagingFossilCO2;
        const totalBiogenicCO2 = farmBiogenic + packagingBiogenicCO2;
        
        return {
            name: `Parametric Twin: ${anchor.name}`,
            co2PerKg: totalCO2,
            waterPerKg: farmWater,
            landUsePerKg: farmLand,
            fossilPerKg: farmFossilMJ + (mfgKwh * CONSTANTS.UNIT.KWH_TO_MJ) + (transportCO2 * CONSTANTS.GLEC.DIESEL_CO2_PER_MJ) + (packagingCO2 * CONSTANTS.GLEC.PACKAGING_FOSSIL_MJ_PER_KG_CO2),
            fossilCO2PerKg: totalFossilCO2,
            biogenicCO2PerKg: totalBiogenicCO2,
            dlucCO2PerKg: farmDLUC,
            breakdown: { farm: farmCO2, manufacturing: mfgCO2, transport: transportCO2, packaging: packagingCO2 }
        };
    }

    exports.CONSTANTS = CONSTANTS;
    exports.PhysicsError = PhysicsError;
    exports.MissingDataError = MissingDataError;
    exports.ValidationError = ValidationError;
    exports.calculateIngredientImpact = calculateIngredientImpact;
    exports.calculateTransport = calculateTransport;
    exports.calculateManufacturing = calculateManufacturing;
    exports.calculatePackaging = calculatePackaging;
    exports.calculateAWARE = calculateAWARE;
    exports.calculateUncertainty = calculateUncertainty;
    exports.calculateSingleScore = calculateSingleScore;
    exports.aggregateResults = aggregateResults;
    exports.calculateParametricTwin = calculateParametricTwin;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.corePhysics = window.corePhysics || {}));
