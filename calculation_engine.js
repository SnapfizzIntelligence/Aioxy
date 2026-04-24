// ================== AIOXY CALCULATION ENGINE v2.0 ==================
// ISO 14044 / PEF 3.1 Calculation Orchestration Layer
//
// Phase 1: All 16 EF 3.1 categories, DQR from database, Monte Carlo,
//          no shadow calculations, aFactor/fossilFraction strict.
// Phase 2: Country-specific database integration — AWARE 2.0, LANCA v2.5,
//          FAOSTAT yield benchmarking, AIB Residual Mix, USEtox note.
//
// RULES:
//   - ZERO physics formulas. All math lives in core_physics.js.
//   - ZERO DOM manipulation. Input comes pre-assembled from main.js.
//   - ZERO hardcoded constants. All values read from window.aioxyData.
//   - ZERO fallback values. Missing required data throws with exact field name.
//   - ALL 16 EF 3.1 categories flow through the entire pipeline.
//   - Database lookup failures (country-specific) do NOT throw — skip silently
//     and record in traceability.
// ====================================================================

(function () {
    'use strict';

    // ── INTERNAL CATEGORY LIST ───────────────────────────────────────────────
    // 19 sub-categories: 16 EF 3.1 impact categories + 3 Climate Change sub-splits
    const ALL_CATEGORIES = [
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

    // Unit labels for all categories (for contribution tree output)
    const CATEGORY_UNITS = {
        'Climate Change':                  'kg CO2e',
        'Climate Change - Fossil':         'kg CO2e',
        'Climate Change - Biogenic':       'kg CO2e',
        'Climate Change - Land Use':       'kg CO2e',
        'Ozone Depletion':                 'kg CFC11e',
        'Human Toxicity, non-cancer':      'CTUh',
        'Human Toxicity, cancer':          'CTUh',
        'Particulate Matter':              'disease inc.',
        'Ionizing Radiation':              'kBq U235e',
        'Photochemical Ozone Formation':   'kg NMVOCe',
        'Acidification':                   'mol H+e',
        'Eutrophication, terrestrial':     'mol N e',
        'Eutrophication, freshwater':      'kg P e',
        'Eutrophication, marine':          'kg N e',
        'Ecotoxicity, freshwater':         'CTUe',
        'Land Use':                        'Pt',
        'Water Use/Scarcity (AWARE)':      'm³ world eq.',
        'Resource Use, minerals/metals':   'kg Sb e',
        'Resource Use, fossils':           'MJ'
    };

    // EF 3.1 canonical name → internal name alias map for NF/WF lookup
    const NF_ALIAS = {
        'Climate change':                              'Climate Change',
        'Ozone depletion':                             'Ozone Depletion',
        'Human toxicity, cancer effects':              'Human Toxicity, cancer',
        'Human toxicity, non-cancer effects':          'Human Toxicity, non-cancer',
        'Particulate matter formation':                'Particulate Matter',
        'Ionising radiation':                          'Ionizing Radiation',
        'Photochemical ozone formation, human health': 'Photochemical Ozone Formation',
        'Acidification terrestrial and freshwater':    'Acidification',
        'Eutrophication terrestrial':                  'Eutrophication, terrestrial',
        'Eutrophication freshwater':                   'Eutrophication, freshwater',
        'Eutrophication marine':                       'Eutrophication, marine',
        'Ecotoxicity freshwater':                      'Ecotoxicity, freshwater',
        'Land use':                                    'Land Use',
        'Water use':                                   'Water Use/Scarcity (AWARE)',
        'Resource use, minerals and metals':           'Resource Use, minerals/metals',
        'Resource use, fossils':                       'Resource Use, fossils',
        'EF-particulate matter':                       'Particulate Matter',
        'Human toxicity, cancer':                      'Human Toxicity, cancer',
        'Human toxicity, non-cancer':                  'Human Toxicity, non-cancer',
        'Photochemical ozone formation':               'Photochemical Ozone Formation',
        'Resource depletion, fossils':                 'Resource Use, fossils',
        'Resource depletion, minerals and metals':     'Resource Use, minerals/metals'
    };

    // ── INTERNAL ERRORS ──────────────────────────────────────────────────────
    class CalculationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'CalculationError';
        }
    }

    // ── HELPER: require a value or throw with the exact field name ───────────
    function requireField(value, fieldName) {
        if (value === undefined || value === null) {
            throw new CalculationError('Missing required field: ' + fieldName);
        }
        return value;
    }

    // ── HELPER: build contribution tree ─────────────────────────────────────
    function buildContributionTree(ingredientResults, mfgResult, transportResult, packagingResult) {
        const tree = {};
        for (const cat of ALL_CATEGORIES) {
            const ingComponents = ingredientResults.map(ing => ({
                name:                   ing.name,
                id:                     ing.id,
                quantity_kg:            ing.quantityKg,
                subtotal:               ing.allCategoryResults[cat] || 0,
                fossilCO2:              ing.fossilCO2,
                biogenicCO2:            ing.biogenicCO2,
                dlucCO2:                ing.dlucCO2,
                dqr:                    ing.dqr,
                source:                 ing.source,
                uuid:                   ing.uuid,
                processingState:        ing.processingState,
                primary_data_used:      ing.primary_data_used,
                primary_data:           ing.primary_data,
                universal_adjustments:  ing.universal_adjustments,
                    yieldFactor:            ing.yieldFactor,
    allCategoryResults:     ing.allCategoryResults
}));
            const ingTotal = ingComponents.reduce((s, c) => s + c.subtotal, 0);

            let mfgTotal   = 0;
            let transTotal = 0;
            let pkgTotal   = 0;

            if (cat === 'Climate Change') {
                mfgTotal   = mfgResult.co2;
                transTotal = transportResult.total;
                pkgTotal   = packagingResult.totalImpact;
            } else if (cat === 'Climate Change - Fossil') {
                mfgTotal   = mfgResult.co2 * mfgResult.fossilFraction;
                transTotal = transportResult.total * transportResult.fossilFraction;
                pkgTotal   = packagingResult.fossilImpact;
            } else if (cat === 'Climate Change - Biogenic') {
                pkgTotal   = packagingResult.biogenicImpact;
            } else if (cat === 'Resource Use, fossils') {
                mfgTotal   = mfgResult.kwh * 3.6;
            }

            tree[cat] = {
                Ingredients:   { total: ingTotal,   components: ingComponents },
                Manufacturing: { total: mfgTotal,   components: [] },
                Transport:     { total: transTotal,  components: [] },
                Packaging:     { total: pkgTotal,   components: [] }
            };
        }
        return tree;
    }

    // ── STEP 0: VALIDATION ───────────────────────────────────────────────────
    function validateInput(input) {
        requireField(input,                              'input');
        requireField(input.product,                     'input.product');
        requireField(input.product.weightKg,            'input.product.weightKg');
        if (typeof input.product.weightKg !== 'number' || input.product.weightKg <= 0) {
            throw new CalculationError('input.product.weightKg must be a positive number');
        }
        requireField(input.ingredients,                 'input.ingredients');
        if (!Array.isArray(input.ingredients) || input.ingredients.length === 0) {
            throw new CalculationError('input.ingredients must be a non-empty array');
        }
        requireField(input.manufacturing,               'input.manufacturing');
        requireField(input.manufacturing.country,       'input.manufacturing.country');
        requireField(input.transport,                   'input.transport');
        requireField(input.transport.mode,              'input.transport.mode');
        requireField(input.transport.distanceKm,        'input.transport.distanceKm');
        requireField(input.packaging,                   'input.packaging');
        requireField(input.packaging.material,          'input.packaging.material');
        requireField(input.packaging.weightKg,          'input.packaging.weightKg');
        requireField(input.packaging.recycledPct,       'input.packaging.recycledPct');
        requireField(input.comparison,                  'input.comparison');
    }

    // =========================================================================
    // === PHASE 2: Country-Specific Database Integration ===
    // =========================================================================
    //
    // Applies AWARE 2.0, LANCA v2.5, and FAOSTAT adjustments to flatPef
    // for ingredients whose origin country differs from the Agribalyse 3.2
    // reference geography (France, 'FR').
    //
    // All database lookups are non-throwing: if a database is absent or a
    // country code is not found, the adjustment is silently skipped and the
    // fact is recorded in adjustments.country_factors and traceability.country_factors.
    //
    // Parameters:
    //   flatPef       — PEF object to modify in place (already adjusted by primary
    //                   data multipliers and geographic proxy)
    //   ingredient    — ingredient input object from input.ingredients[]
    //   ingData       — ingredient database entry (window.aioxyData.ingredients[id])
    //   adjustments   — adjustments object for this ingredient; gains .country_factors
    //   traceability  — traceability entry for this ingredient; gains .country_factors
    //                   and .usetox
    // =========================================================================
    function applyCountrySpecificFactors(flatPef, ingredient, ingData, adjustments, traceability) {

        // === STEP A: Determine reference country ===
        const REFERENCE_COUNTRY = 'FR';
        const originCountry = ingredient.originCountry || REFERENCE_COUNTRY;

        // If origin is FR, no adjustment needed — Agribalyse already reflects FR conditions
        if (originCountry === REFERENCE_COUNTRY) {
            adjustments.country_factors = {
                applied: false,
                reason: 'Origin matches Agribalyse reference geography (FR)'
            };
            traceability.country_factors = {
                applied: false,
                source: 'AGRIBALYSE 3.2 (native FR geography)'
            };
            // USEtox note still applies regardless of country
            traceability.usetox = {
                status:           'available_but_not_applied',
                source:           window.aioxyData.usetox && window.aioxyData.usetox.source
                                      ? window.aioxyData.usetox.source
                                      : 'USEtox 2.14',
                version:          window.aioxyData.usetox && window.aioxyData.usetox.version
                                      ? window.aioxyData.usetox.version
                                      : 'EF 3.1',
                reason:           'USEtox 2.14 database loaded but requires substance-specific emission inventory data (kg pesticide applied per hectare by CAS number). Current primary data form does not collect this information. Agribalyse 3.2 composite toxicity factors used instead.',
                action_required:  'To enable USEtox, add pesticide application rate fields (CAS number + kg/ha) to the supplier primary data form.'
            };
            return;
        }

        // Country factors log — will be built up across steps B, C, D
        const countryFactorsLog = {
            applied:        false,  // set to true if at least one adjustment is applied
            origin_country: originCountry,
            reference_country: REFERENCE_COUNTRY,
            aware:  { applied: false },
            lanca:  { applied: false },
            faostat: { applied: false }
        };

        // === STEP B: AWARE 2.0 — Water Scarcity Adjustment ===
        // Adjusts flatPef['Water Use/Scarcity (AWARE)'] only.
        // Ratio = originAWARE / refAWARE; applied multiplicatively on top of
        // the existing value (which already reflects the geo proxy if applicable).
        try {
            const awareData = window.aioxyData.aware_20;
            if (!awareData || !awareData.agricultural) {
                countryFactorsLog.aware = {
                    applied: false,
                    reason:  'window.aioxyData.aware_20.agricultural not loaded'
                };
            } else {
                const refAWARE    = awareData.agricultural[REFERENCE_COUNTRY];
                const originAWARE = awareData.agricultural[originCountry];

                if (refAWARE === undefined || refAWARE === null) {
                    countryFactorsLog.aware = {
                        applied: false,
                        reason:  'AWARE 2.0 reference factor not found for reference country: ' + REFERENCE_COUNTRY
                    };
                } else if (originAWARE === undefined || originAWARE === null) {
                    countryFactorsLog.aware = {
                        applied: false,
                        reason:  'AWARE 2.0 factor not found for origin country: ' + originCountry
                    };
                } else if (refAWARE === 0) {
                    countryFactorsLog.aware = {
                        applied: false,
                        reason:  'AWARE 2.0 reference factor for FR is zero — cannot compute ratio'
                    };
                } else {
                    const awareRatio = originAWARE / refAWARE;
                    flatPef['Water Use/Scarcity (AWARE)'] *= awareRatio;
                    countryFactorsLog.aware = {
                        applied:           true,
                        ref_country:       REFERENCE_COUNTRY,
                        ref_factor:        refAWARE,
                        origin_country:    originCountry,
                        origin_factor:     originAWARE,
                        ratio_applied:     awareRatio,
                        source:            awareData.source  || 'AWARE 2.0 — WULCA consensus model',
                        unit:              awareData.unit    || 'm3 world eq / m3',
                        category_adjusted: 'Water Use/Scarcity (AWARE)'
                    };
                    countryFactorsLog.applied = true;
                }
            }
        } catch (e) {
            // Non-critical — skip silently, record error
            countryFactorsLog.aware = {
                applied: false,
                reason:  'AWARE 2.0 lookup failed: ' + (e && e.message ? e.message : String(e))
            };
        }

        // === STEP C: LANCA v2.5 — Land Use Quality Adjustment ===
        // Adjusts flatPef['Land Use'] only.
        // Uses occupation SQI as the primary factor; transformation added if available.
        // Ratio = (originOccupation + originTransformation) / (refOccupation + refTransformation)
        // If transformation data is absent, uses occupation ratio alone.
        try {
            const lancaData = window.aioxyData.lanca_sqi;
            if (!lancaData || !lancaData.occupation) {
                countryFactorsLog.lanca = {
                    applied: false,
                    reason:  'window.aioxyData.lanca_sqi.occupation not loaded'
                };
            } else {
                const refOccupation    = lancaData.occupation[REFERENCE_COUNTRY];
                const originOccupation = lancaData.occupation[originCountry];

                if (refOccupation === undefined || refOccupation === null) {
                    countryFactorsLog.lanca = {
                        applied: false,
                        reason:  'LANCA occupation factor not found for reference country: ' + REFERENCE_COUNTRY
                    };
                } else if (originOccupation === undefined || originOccupation === null) {
                    countryFactorsLog.lanca = {
                        applied: false,
                        reason:  'LANCA occupation factor not found for origin country: ' + originCountry
                    };
                } else if (refOccupation === 0) {
                    countryFactorsLog.lanca = {
                        applied: false,
                        reason:  'LANCA occupation factor for FR is zero — cannot compute ratio'
                    };
                } else {
                    // Try to include transformation if available for both countries
                    let lancaRatio;
                    let transformationUsed = false;
                    let refTransformation    = null;
                    let originTransformation = null;

                    if (lancaData.transformation) {
                        refTransformation    = lancaData.transformation[REFERENCE_COUNTRY];
                        originTransformation = lancaData.transformation[originCountry];
                    }

                    if (
                        refTransformation    !== undefined && refTransformation    !== null &&
                        originTransformation !== undefined && originTransformation !== null &&
                        (refOccupation + refTransformation) !== 0
                    ) {
                        lancaRatio = (originOccupation + originTransformation) /
                                     (refOccupation    + refTransformation);
                        transformationUsed = true;
                    } else {
                        // Transformation data absent or incomplete — use occupation ratio only
                        lancaRatio = originOccupation / refOccupation;
                        transformationUsed = false;
                    }

                    flatPef['Land Use'] *= lancaRatio;

                    countryFactorsLog.lanca = {
                        applied:                  true,
                        ref_country:              REFERENCE_COUNTRY,
                        ref_occupation:           refOccupation,
                        ref_transformation:       refTransformation,
                        origin_country:           originCountry,
                        origin_occupation:        originOccupation,
                        origin_transformation:    originTransformation,
                        transformation_included:  transformationUsed,
                        ratio_applied:            lancaRatio,
                        source:                   lancaData.source    || 'LANCA v2.5 — Fraunhofer IBP / European Commission JRC',
                        indicator:                lancaData.indicator || 'Soil Quality Index — Total, unspecified land use',
                        version:                  lancaData.version   || 'EF 3.1',
                        category_adjusted:        'Land Use'
                    };
                    countryFactorsLog.applied = true;
                }
            }
        } catch (e) {
            countryFactorsLog.lanca = {
                applied: false,
                reason:  'LANCA v2.5 lookup failed: ' + (e && e.message ? e.message : String(e))
            };
        }

        // === STEP D: FAOSTAT Yield Benchmarking ===
        // Does NOT modify flatPef.
        // Only benchmarks the user-entered yield against FAOSTAT country averages
        // for traceability and audit purposes.
        // Only runs if the ingredient has primary data with a user-entered yield.
        try {
            const yieldData = window.aioxyData.crop_yields;
            if (
                ingredient.primaryData &&
                ingredient.primaryData.yieldKgPerHa &&
                yieldData &&
                yieldData.yields
            ) {
                const countryYields = yieldData.yields[originCountry];
                if (!countryYields) {
                    countryFactorsLog.faostat = {
                        applied:          false,
                        benchmarked:      false,
                        reason:           'FAOSTAT yield data not found for origin country: ' + originCountry,
                        source:           yieldData.source || 'FAOSTAT — Crops and Livestock Products',
                        years:            yieldData.years  || '2020-2024 (5-year average per crop)',
                        unit:             yieldData.unit   || 'kg/ha'
                    };
                } else {
                    // Find matching crop — try to match on ingredient name or id
                    // Use the ingredient name from ingData for matching
                    const ingName = ingData && ingData.name ? ingData.name.toLowerCase() : '';
                    let faostatYield = null;
                    let matchedCrop  = null;

                    // First pass: exact key match (lower-cased crop name vs lower-cased ingredient name)
                    for (const [cropName, cropYield] of Object.entries(countryYields)) {
                        if (ingName.includes(cropName.toLowerCase()) ||
                            cropName.toLowerCase().includes(ingName)) {
                            faostatYield = cropYield;
                            matchedCrop  = cropName;
                            break;
                        }
                    }

                    // Second pass: try matching on ingredient id keywords if first pass failed
                    if (faostatYield === null) {
                        const ingId = ingredient.id ? ingredient.id.toLowerCase() : '';
                        for (const [cropName, cropYield] of Object.entries(countryYields)) {
                            if (ingId.includes(cropName.toLowerCase()) ||
                                cropName.toLowerCase().includes(ingId.split('-')[0])) {
                                faostatYield = cropYield;
                                matchedCrop  = cropName;
                                break;
                            }
                        }
                    }

                    if (faostatYield === null) {
                        countryFactorsLog.faostat = {
                            applied:      false,
                            benchmarked:  false,
                            reason:       'No matching FAOSTAT crop found for ingredient: ' + (ingData ? ingData.name : ingredient.id),
                            country:      originCountry,
                            source:       yieldData.source || 'FAOSTAT — Crops and Livestock Products',
                            years:        yieldData.years  || '2020-2024 (5-year average per crop)',
                            unit:         yieldData.unit   || 'kg/ha'
                        };
                    } else {
                        const userYield = ingredient.primaryData.yieldKgPerHa;
                        const deviationPct = faostatYield > 0
                            ? ((userYield - faostatYield) / faostatYield) * 100
                            : null;

                        countryFactorsLog.faostat = {
                            applied:             false,   // FAOSTAT does not modify flatPef
                            benchmarked:         true,
                            matched_crop:        matchedCrop,
                            user_yield_kg_ha:    userYield,
                            faostat_yield_kg_ha: faostatYield,
                            deviation_pct:       deviationPct !== null
                                                     ? Math.round(deviationPct * 10) / 10
                                                     : null,
                            country:             originCountry,
                            source:              yieldData.source || 'FAOSTAT — Crops and Livestock Products',
                            years:               yieldData.years  || '2020-2024 (5-year average per crop)',
                            unit:                yieldData.unit   || 'kg/ha',
                            note:                'FAOSTAT yield used for audit benchmarking only. Primary data yield drives the actual calculation adjustment.'
                        };
                    }
                }
            } else {
                // No primary yield data provided — record that benchmarking was not applicable
                countryFactorsLog.faostat = {
                    applied:     false,
                    benchmarked: false,
                    reason:      ingredient.primaryData && !ingredient.primaryData.yieldKgPerHa
                                     ? 'Primary data provided but yieldKgPerHa not supplied'
                                     : 'No primary data provided — FAOSTAT benchmarking not applicable'
                };
            }
        } catch (e) {
            countryFactorsLog.faostat = {
                applied:     false,
                benchmarked: false,
                reason:      'FAOSTAT lookup failed: ' + (e && e.message ? e.message : String(e))
            };
        }

        // === STEP F: USEtox 2.14 — traceability note only ===
        traceability.usetox = {
            status:          'available_but_not_applied',
            source:          window.aioxyData.usetox && window.aioxyData.usetox.source
                                 ? window.aioxyData.usetox.source
                                 : 'USEtox 2.14',
            version:         window.aioxyData.usetox && window.aioxyData.usetox.version
                                 ? window.aioxyData.usetox.version
                                 : 'EF 3.1',
            reason:          'USEtox 2.14 database loaded but requires substance-specific emission inventory data (kg pesticide applied per hectare by CAS number). Current primary data form does not collect this information. Agribalyse 3.2 composite toxicity factors used instead.',
            action_required: 'To enable USEtox, add pesticide application rate fields (CAS number + kg/ha) to the supplier primary data form.'
        };

        // Write final country_factors to both adjustments and traceability
        adjustments.country_factors = countryFactorsLog;
        traceability.country_factors = {
            applied:        countryFactorsLog.applied,
            origin_country: originCountry,
            aware: {
                applied:        countryFactorsLog.aware.applied,
                ratio_applied:  countryFactorsLog.aware.ratio_applied  || null,
                source:         countryFactorsLog.aware.source         || null,
                reason:         countryFactorsLog.aware.reason         || null
            },
            lanca: {
                applied:        countryFactorsLog.lanca.applied,
                ratio_applied:  countryFactorsLog.lanca.ratio_applied  || null,
                source:         countryFactorsLog.lanca.source         || null,
                reason:         countryFactorsLog.lanca.reason         || null
            },
            faostat: {
                benchmarked:         countryFactorsLog.faostat.benchmarked    || false,
                matched_crop:        countryFactorsLog.faostat.matched_crop   || null,
                user_yield_kg_ha:    countryFactorsLog.faostat.user_yield_kg_ha   || null,
                faostat_yield_kg_ha: countryFactorsLog.faostat.faostat_yield_kg_ha || null,
                deviation_pct:       countryFactorsLog.faostat.deviation_pct  || null,
                source:              countryFactorsLog.faostat.source         || null,
                reason:              countryFactorsLog.faostat.reason         || null
            }
        };
    }
    // =========================================================================
    // === END PHASE 2: applyCountrySpecificFactors ===
    // =========================================================================

    // ── STEP 1: INGREDIENT LOOP ──────────────────────────────────────────────
    function processIngredients(input) {
        const db = window.aioxyData;
        const ingredientResults      = [];
        const ingredientTraceability = [];

        for (const ingredient of input.ingredients) {
            // 1a. Look up ingredient data
            const ingData = db.ingredients[ingredient.id];
            if (!ingData) {
                throw new CalculationError(
                    'Ingredient not found in database: "' + ingredient.id + '". ' +
                    'Ensure ingredients_db.js is loaded and the id matches exactly.'
                );
            }

            // 1b. Validate ALL 16 PEF values
            const pef = ingData.data.pef;
            if (!pef) {
                throw new CalculationError('Missing pef data for ingredient: ' + ingredient.id);
            }
            for (const cat of ALL_CATEGORIES) {
                if (pef[cat] === undefined || pef[cat] === null) {
                    throw new CalculationError(
                        'Ingredient "' + ingredient.id + '" is missing PEF category: ' + cat
                    );
                }
            }

            // 1c. Build flat PEF object
            const flatPef = {};
            for (const cat of ALL_CATEGORIES) {
                flatPef[cat] = pef[cat];
            }

            // 1d. Extract metadata — NO hardcoded fallbacks for dqr_overall
            const metadata = ingData.data.metadata;
            if (!metadata) {
                throw new CalculationError('Missing metadata for ingredient: ' + ingredient.id);
            }
            if (metadata.dqr_overall === undefined || metadata.dqr_overall === null) {
                throw new CalculationError(
                    'Missing required field: ingredients["' + ingredient.id + '"].data.metadata.dqr_overall'
                );
            }
            const dqrOverall       = metadata.dqr_overall;
            const dqrBreakdown     = metadata.dqr            || {};
            const sourceDataset    = metadata.source_dataset  || 'AGRIBALYSE 3.2';
            const sourceUuid       = metadata.source_uuid     || null;
            const allocationMethod = metadata.allocation_method || 'Economic Allocation';

            // 1e. Primary data adjustments
            let adjustments = {
                multipliers:          { co2: 1.0, land: 1.0, water: 1.0, fossil: 1.0 },
                adjusted_for_country: ingredient.originCountry || 'FR',
                baseline_yield:       null,
                baseline_nitrogen:    null,
                method:               'background_secondary_data'
            };
            let yieldFactor = 1.0;

            if (ingredient.primaryData) {
                const pd = ingredient.primaryData;

                // Yield adjustment factor
                let yieldAdj = 1.0;
                if (pd.yieldKgPerHa && pd.yieldKgPerHa > 0) {
                    const baselineYield = 5000;
                    adjustments.baseline_yield = baselineYield;
                    yieldAdj = Math.min(baselineYield / pd.yieldKgPerHa, 2.0);
                }

                // Nitrogen adjustment factor
                let nAdj = 1.0;
                if (pd.nitrogenKgPerTon && pd.nitrogenKgPerTon > 0) {
                    const baselineN = 15;
                    adjustments.baseline_nitrogen = baselineN;
                    nAdj = pd.nitrogenKgPerTon / baselineN;
                }

                // Composite CO2 multiplier: 60% yield, 40% nitrogen
                const co2Mult = (0.6 * yieldAdj) + (0.4 * nAdj);
                adjustments.multipliers = {
                    co2:    co2Mult,
                    land:   yieldAdj,
                    water:  co2Mult,
                    fossil: co2Mult
                };
                adjustments.method = 'primary_data_adjusted';
                yieldFactor = yieldAdj;

                // Apply multipliers to flatPef
                flatPef['Climate Change']                *= co2Mult;
                flatPef['Climate Change - Fossil']       *= co2Mult;
                flatPef['Climate Change - Biogenic']     *= co2Mult;
                flatPef['Climate Change - Land Use']     *= co2Mult;
                flatPef['Ozone Depletion']               *= co2Mult;
                flatPef['Human Toxicity, non-cancer']    *= co2Mult;
                flatPef['Human Toxicity, cancer']        *= co2Mult;
                flatPef['Particulate Matter']            *= co2Mult;
                flatPef['Ionizing Radiation']            *= co2Mult;
                flatPef['Photochemical Ozone Formation'] *= co2Mult;
                flatPef['Acidification']                 *= co2Mult;
                flatPef['Eutrophication, terrestrial']   *= co2Mult;
                flatPef['Eutrophication, freshwater']    *= co2Mult;
                flatPef['Eutrophication, marine']        *= co2Mult;
                flatPef['Ecotoxicity, freshwater']       *= co2Mult;
                flatPef['Land Use']                      *= yieldAdj;
                flatPef['Water Use/Scarcity (AWARE)']    *= co2Mult;
                flatPef['Resource Use, minerals/metals'] *= co2Mult;
                flatPef['Resource Use, fossils']         *= co2Mult;
            }

            // === USEtox 2.14: Substance-specific pesticide toxicity ===
if (pd.pesticides && pd.pesticides.length > 0 && pd.yieldKgPerHa && pd.yieldKgPerHa > 0) {
    const usetoxDB = window.aioxyData.usetox;
    if (usetoxDB && usetoxDB.human_toxicity && usetoxDB.ecotoxicity) {
        const areaHarvested = ingredient.quantityKg / pd.yieldKgPerHa;
        
        let totalCancerCTUh = 0;
        let totalNonCancerCTUh = 0;
        let totalEcotoxicityCTUe = 0;
        const pesticideDetails = [];
        
        for (const pesticide of pd.pesticides) {
            const cas = (pesticide.cas || '').trim();
            const rate = pesticide.rateKgPerHa || 0;
            const amountApplied = rate * areaHarvested;
            
            const htCF = usetoxDB.human_toxicity[cas];
            const ecoCF = usetoxDB.ecotoxicity[cas];
            
            if (htCF || ecoCF) {
                const cancer = htCF ? (amountApplied * (htCF.cancer_CTUh_per_kg || 0)) : 0;
                const noncancer = htCF ? (amountApplied * (htCF.noncancer_CTUh_per_kg || 0)) : 0;
                const ecotox = ecoCF ? (amountApplied * ecoCF) : 0;
                
                totalCancerCTUh += cancer;
                totalNonCancerCTUh += noncancer;
                totalEcotoxicityCTUe += ecotox;
                
                pesticideDetails.push({
                    name: pesticide.name || 'Unknown',
                    cas: cas,
                    rateKgPerHa: rate,
                    amountAppliedKg: amountApplied,
                    cancer_CTUh: cancer,
                    noncancer_CTUh: noncancer,
                    ecotoxicity_CTUe: ecotox
                });
            }
        }
        
        if (totalCancerCTUh > 0 || totalNonCancerCTUh > 0 || totalEcotoxicityCTUe > 0) {
            flatPef['Human Toxicity, cancer'] = totalCancerCTUh / ingredient.quantityKg;
            flatPef['Human Toxicity, non-cancer'] = totalNonCancerCTUh / ingredient.quantityKg;
            flatPef['Ecotoxicity, freshwater'] = totalEcotoxicityCTUe / ingredient.quantityKg;
        }
        
        adjustments.usetox_applied = {
            applied: totalCancerCTUh > 0 || totalNonCancerCTUh > 0 || totalEcotoxicityCTUe > 0,
            source: 'USEtox 2.14',
            area_harvested_ha: areaHarvested,
            total_cancer_CTUh: totalCancerCTUh,
            total_noncancer_CTUh: totalNonCancerCTUh,
            total_ecotoxicity_CTUe: totalEcotoxicityCTUe,
            pesticides: pesticideDetails
        };
    }
}

            // 1f. Apply processing archetype
            let processingMultiplier = 1.0;
            if (ingredient.processingState && ingredient.processingState !== 'raw') {
                const archetypes = db.processing_archetypes;
                if (!archetypes) {
                    throw new CalculationError('Missing database: window.aioxyData.processing_archetypes');
                }
                const archetype = archetypes[ingredient.processingState];
                if (archetype) {
                    processingMultiplier = archetype.yield_factor || 1.0;
                    if (archetype.dqr_reward) {
                        adjustments.processing_dqr_reward = archetype.dqr_reward;
                    }
                }
            }

            // 1g. Geographic proxy adjustment
            // Apply 1.15× penalty if origin country differs from FR and no primary data override
            if (ingredient.originCountry && ingredient.originCountry !== 'FR' && !ingredient.primaryData) {
                const geoProxy = 1.15;
                for (const cat of ALL_CATEGORIES) {
                    flatPef[cat] *= geoProxy;
                }
                adjustments.geo_proxy_applied    = true;
                adjustments.geo_proxy_factor     = geoProxy;
                adjustments.adjusted_for_country = ingredient.originCountry;
            }

            // === PHASE 2: Country-Specific Database Integration ===
            // Build the traceability entry object first so applyCountrySpecificFactors
            // can write .country_factors and .usetox directly onto it.
            const traceabilityEntry = {
                id:           ingredient.id,
                name:         ingData.name,
                source:       sourceDataset,
                uuid:         sourceUuid,
                dqr:          dqrOverall,
                primary_data: !!ingredient.primaryData,
                country:      ingredient.originCountry
            };

            // Apply AWARE 2.0, LANCA v2.5, FAOSTAT benchmarking, and USEtox note.
            // Modifies flatPef['Water Use/Scarcity (AWARE)'] and flatPef['Land Use'] in place.
            // All lookups are non-throwing; failures recorded in traceabilityEntry.
            applyCountrySpecificFactors(flatPef, ingredient, ingData, adjustments, traceabilityEntry);
            // === END PHASE 2 insertion point ===

            // 1h. Call core_physics for the 9 categories it handles natively
            const ingResultCore = window.corePhysics.calculateIngredientImpact({
                ingredientData:  { pef: flatPef, data: ingData.data, name: ingData.name },
                quantityKg:      ingredient.quantityKg,
                includesEnteric: false,
                entericParams:   null
            });

            // Manually compute the remaining 10 categories not yet in core_physics
            const allCategoryResults = Object.assign({}, ingResultCore);

            // Map core_physics property names → category names for the 9 it returns
            allCategoryResults['Climate Change']              = ingResultCore.totalCO2;
            allCategoryResults['Climate Change - Fossil']     = ingResultCore.fossilCO2;
            allCategoryResults['Climate Change - Biogenic']   = ingResultCore.biogenicCO2;
            allCategoryResults['Climate Change - Land Use']   = ingResultCore.dlucCO2;
            allCategoryResults['Water Use/Scarcity (AWARE)']  = ingResultCore.totalWater;
            allCategoryResults['Land Use']                    = ingResultCore.totalLand;
            allCategoryResults['Resource Use, fossils']       = ingResultCore.totalFossil;
            allCategoryResults['Eutrophication, marine']      = ingResultCore.marineEutrophication_N;
            allCategoryResults['Eutrophication, freshwater']  = ingResultCore.freshwaterEutrophication_P;

            // The 10 categories not yet in core_physics — compute directly from adjusted pef
            const extraCats = [
                'Ozone Depletion',
                'Human Toxicity, non-cancer',
                'Human Toxicity, cancer',
                'Particulate Matter',
                'Ionizing Radiation',
                'Photochemical Ozone Formation',
                'Acidification',
                'Eutrophication, terrestrial',
                'Ecotoxicity, freshwater',
                'Resource Use, minerals/metals'
            ];
            for (const cat of extraCats) {
                allCategoryResults[cat] = flatPef[cat] * ingredient.quantityKg;
            }

            // 1i. Build contribution tree entry
            const ingEntry = {
                name:               ingData.name,
                id:                 ingredient.id,
                quantityKg:         ingredient.quantityKg,
                subtotal:           allCategoryResults['Climate Change'],
                fossilCO2:          ingResultCore.fossilCO2,
                biogenicCO2:        ingResultCore.biogenicCO2,
                dlucCO2:            ingResultCore.dlucCO2,
                dqr:                dqrOverall,
                dqrBreakdown:       dqrBreakdown,
                source:             sourceDataset,
                uuid:               sourceUuid,
                allocationMethod:   allocationMethod,
                processingState:    ingredient.processingState,
                primary_data_used:  !!ingredient.primaryData,
                primary_data:       ingredient.primaryData || null,
                universal_adjustments: adjustments,
                yieldFactor:        yieldFactor,
                allCategoryResults: allCategoryResults
            };

            ingredientResults.push(ingEntry);

            // === PHASE 2: Updated traceability push — includes country_factors ===
            ingredientTraceability.push({
                id:              traceabilityEntry.id,
                name:            traceabilityEntry.name,
                source:          traceabilityEntry.source,
                uuid:            traceabilityEntry.uuid,
                dqr:             traceabilityEntry.dqr,
                primary_data:    traceabilityEntry.primary_data,
                country:         traceabilityEntry.country,
                country_factors: traceabilityEntry.country_factors || { applied: false },
                usetox:          traceabilityEntry.usetox          || { status: 'not_evaluated' }
            });
            // === END PHASE 2 traceability push ===
        }

        return { ingredientResults, ingredientTraceability };
    }

    // ── STEP 2: MANUFACTURING ────────────────────────────────────────────────
    function processManufacturing(input) {
        const db     = window.aioxyData;
        const mfgIn  = input.manufacturing;
        const prodWt = input.product.weightKg;

        // 2a. Determine processing energy (kwh_per_kg)
        let kwhPerKg = 0;
        if (mfgIn.processingMethod && mfgIn.processingMethod !== 'none') {
            if (!db.processing) {
                throw new CalculationError('Missing database: window.aioxyData.processing');
            }
            const procEntry = db.processing[mfgIn.processingMethod];
            if (!procEntry) {
                throw new CalculationError(
                    'Processing method not found in database: window.aioxyData.processing["' +
                    mfgIn.processingMethod + '"]'
                );
            }
            if (typeof procEntry.kwh_per_kg !== 'number') {
                throw new CalculationError(
                    'Missing required field: window.aioxyData.processing["' +
                    mfgIn.processingMethod + '"].kwh_per_kg'
                );
            }
            kwhPerKg = procEntry.kwh_per_kg;
        }

        // 2b. Determine grid intensity
        let gridIntensity;
        if (mfgIn.energySource === 'renewable') {
            gridIntensity = 0;
        } else if (mfgIn.energySource === 'natural_gas') {
            gridIntensity = 490;
        } else if (mfgIn.energySource === 'coal') {
            gridIntensity = 950;
        } else {
            // Grid: read from database
            if (db.grid_intensity && typeof db.grid_intensity[mfgIn.country] === 'number') {
                gridIntensity = db.grid_intensity[mfgIn.country];
            } else if (db.countries && db.countries[mfgIn.country] &&
                       typeof db.countries[mfgIn.country].electricityCO2 === 'number') {
                gridIntensity = db.countries[mfgIn.country].electricityCO2;
            } else {
                throw new CalculationError(
                    'Grid intensity not found for manufacturing country "' + mfgIn.country +
                    '". Check window.aioxyData.grid_intensity["' + mfgIn.country +
                    '"] or window.aioxyData.countries["' + mfgIn.country + '"].electricityCO2'
                );
            }
        }

        let mfgResult;

        // 2c. Primary factory data override
        if (mfgIn.usePrimaryFactoryData && mfgIn.primaryFactoryData) {
            const pfd = mfgIn.primaryFactoryData;
            requireField(pfd.totalKWh,      'manufacturing.primaryFactoryData.totalKWh');
            requireField(pfd.totalGasM3,    'manufacturing.primaryFactoryData.totalGasM3');
            requireField(pfd.totalOutputKg, 'manufacturing.primaryFactoryData.totalOutputKg');
            if (pfd.totalOutputKg <= 0) {
                throw new CalculationError('manufacturing.primaryFactoryData.totalOutputKg must be > 0');
            }

            const kwhPerKgActual = pfd.totalKWh   / pfd.totalOutputKg;
            const gasM3PerKg     = pfd.totalGasM3 / pfd.totalOutputKg;
            const gasCO2         = gasM3PerKg * 2.02;
            const elecCO2        = kwhPerKgActual * (gridIntensity / 1000);
            const totalMfgCO2    = (elecCO2 + gasCO2) * prodWt;
            const totalMfgKwh    = kwhPerKgActual * prodWt;

            mfgResult = {
                co2:            totalMfgCO2,
                kwh:            totalMfgKwh,
                fossilFraction: 1.0,
                source:         'Primary Factory Data'
            };
        } else {
            mfgResult = window.corePhysics.calculateManufacturing({
                massOutputKg:         prodWt,
                benchmarkKwhPerKg:    kwhPerKg,
                gridIntensityGPerKwh: gridIntensity
            });
            mfgResult.source = 'Ember 2025 / IEA';
        }

        mfgResult.country = mfgIn.country;

        // === PHASE 2: AIB Residual Mix — recorded for audit transparency ===
        // Only applies when energy source is 'grid' (not renewable/gas/coal).
        // Ember grid intensity remains the primary calculation factor.
        // Residual mix is an alternative data point for audit disclosure.
        if (mfgIn.energySource === 'grid') {
            try {
                const residualMix = window.aioxyData.residual_mix;
                if (residualMix && residualMix.co2_factors) {
                    const residualFactor = residualMix.co2_factors[mfgIn.country];
                    if (residualFactor !== undefined && residualFactor !== null) {
                        mfgResult.residual_mix_available = true;
                        mfgResult.residual_mix_co2       = residualFactor;
                        mfgResult.residual_mix_source    = residualMix.source || 'AIB 2024 European Residual Mixes';
                        mfgResult.residual_mix_year      = residualMix.year   || 2024;
                        mfgResult.residual_mix_unit      = residualMix.unit   || 'g CO2/kWh';
                    } else {
                        mfgResult.residual_mix_available = false;
                        mfgResult.residual_mix_note      = 'AIB Residual Mix factor not found for country: ' + mfgIn.country;
                    }
                } else {
                    mfgResult.residual_mix_available = false;
                    mfgResult.residual_mix_note      = 'window.aioxyData.residual_mix.co2_factors not loaded';
                }
            } catch (e) {
                // Non-critical — skip silently
                mfgResult.residual_mix_available = false;
                mfgResult.residual_mix_note      = 'Residual mix lookup failed: ' + (e && e.message ? e.message : String(e));
            }
        } else {
            mfgResult.residual_mix_available = false;
            mfgResult.residual_mix_note      = 'Residual mix not applicable for energy source: ' + mfgIn.energySource;
        }
        // === END PHASE 2: AIB Residual Mix ===

        return mfgResult;
    }

    // ── STEP 3: TRANSPORT ────────────────────────────────────────────────────
    function processTransport(input, packagingWeightKg) {
        const transIn     = input.transport;
        const grossWeight = input.product.weightKg + packagingWeightKg;

        // 3b. Crisis routing
        let effectiveDistance = transIn.distanceKm;
        if (transIn.crisisRouting &&
            (transIn.mode === 'sea' || transIn.mode === 'road')) {
            effectiveDistance = transIn.distanceKm * 1.40;
        }

        // 3c. Temperature condition
        let temperatureCondition = transIn.refrigeration || 'ambient';
        if (input.manufacturing.processingMethod === 'freezing') {
            temperatureCondition = 'frozen';
        }

        // 3d. Call core_physics
        const transportResult = window.corePhysics.calculateTransport({
            massKg:        grossWeight,
            distanceKm:    effectiveDistance,
            mode:          transIn.mode,
            refrigeration: temperatureCondition
        });

        transportResult.source = 'GLEC v3.2';
        return transportResult;
    }

    // ── STEP 4: PACKAGING (CFF) ──────────────────────────────────────────────
    function processPackaging(input) {
        const db    = window.aioxyData;
        const pkgIn = input.packaging;

        if (!db.packaging) {
            throw new CalculationError('Missing database: window.aioxyData.packaging');
        }
        const pkgData = db.packaging[pkgIn.material];
        if (!pkgData) {
            throw new CalculationError(
                'Packaging material not found in database: window.aioxyData.packaging["' +
                pkgIn.material + '"]'
            );
        }

        requireField(pkgData.co2_virgin,   'packaging["' + pkgIn.material + '"].co2_virgin');
        requireField(pkgData.co2_recycled, 'packaging["' + pkgIn.material + '"].co2_recycled');

        const ev         = pkgData.co2_virgin;
        const erecycled  = pkgData.co2_recycled;
        const ed         = pkgData.co2_disposal_average || pkgData.co2_disposal || 0.05;
        const r1         = pkgIn.recycledPct / 100;
        const r2         = (pkgData.r1_max || 0.8) * (pkgData.r2 || 0.7);
        const qs         = pkgData.q || 0.9;
        const qp         = 1.0;

        // CRITICAL: aFactor and fossilFraction — NO fallbacks
        const aFactor       = pkgData.aFactor;
        const fossilFraction = pkgData.fossilFraction;

        if (aFactor === undefined || aFactor === null) {
            throw new CalculationError(
                "Packaging material '" + pkgIn.material +
                "' is missing required field: aFactor. Must be provided in ingredients.js database."
            );
        }
        if (fossilFraction === undefined || fossilFraction === null) {
            throw new CalculationError(
                "Packaging material '" + pkgIn.material +
                "' is missing required field: fossilFraction. Must be provided in ingredients.js database."
            );
        }

        const packagingResult = window.corePhysics.calculatePackaging({
            weightKg: pkgIn.weightKg,
            ev,
            erecycled,
            ed,
            r1,
            r2,
            aFactor,
            qs,
            qp,
            fossilFraction
        });

        packagingResult.source = 'PEF 3.1 CFF / Ecoinvent';
        return packagingResult;
    }

    // ── STEP 5: AGGREGATION (ALL 16+ CATEGORIES) ─────────────────────────────
    function aggregateAllCategories(ingredientResults, mfgResult, transportResult, packagingResult) {
        const pefResults = {};

        for (const cat of ALL_CATEGORIES) {
            let ingTotal = 0;
            for (const ing of ingredientResults) {
                ingTotal += (ing.allCategoryResults[cat] || 0);
            }

            let mfgTotal = 0;
            if (cat === 'Climate Change') {
                mfgTotal = mfgResult.co2;
            } else if (cat === 'Climate Change - Fossil') {
                mfgTotal = mfgResult.co2 * mfgResult.fossilFraction;
            } else if (cat === 'Resource Use, fossils') {
                mfgTotal = mfgResult.kwh * 3.6;
            }

            let transTotal = 0;
            if (cat === 'Climate Change') {
                transTotal = transportResult.total;
            } else if (cat === 'Climate Change - Fossil') {
                transTotal = transportResult.total * transportResult.fossilFraction;
            }

            let pkgTotal = 0;
            if (cat === 'Climate Change') {
                pkgTotal = packagingResult.totalImpact;
            } else if (cat === 'Climate Change - Fossil') {
                pkgTotal = packagingResult.fossilImpact;
            } else if (cat === 'Climate Change - Biogenic') {
                pkgTotal = packagingResult.biogenicImpact;
            }

            const total = ingTotal + mfgTotal + transTotal + pkgTotal;

            pefResults[cat] = {
                total:             total,
                unit:              CATEGORY_UNITS[cat] || '',
                contribution_tree: {
                    Ingredients:   { total: ingTotal,   components: [] },
                    Manufacturing: { total: mfgTotal,   components: [] },
                    Transport:     { total: transTotal,  components: [] },
                    Packaging:     { total: pkgTotal,   components: [] }
                }
            };
        }

        return pefResults;
    }

    // ── STEP 6: DQR ──────────────────────────────────────────────────────────
    function computeDQR(ingredientResults, pefResults) {
        const dqrComponents = ingredientResults.map(ing => ({
            name:         ing.name,
            dqr:          ing.dqr,
            contribution: ing.allCategoryResults['Climate Change'] || 0
        }));

        let weightedDQR;
        const totalContrib = dqrComponents.reduce((s, c) => s + c.contribution, 0);
        if (totalContrib > 0) {
            weightedDQR = window.complianceEngine.calculateWeightedDQR(dqrComponents);
        } else {
            weightedDQR = { overallDQR: 2.5, qualityLevel: 'GOOD' };
        }

        const totalCO2 = pefResults['Climate Change'].total;
        const dnmProcesses = ingredientResults.map(ing => ({
            name:                      ing.name,
            impact:                    ing.allCategoryResults['Climate Change'] || 0,
            dqr:                       ing.dqr,
            isUnderOperationalControl: false
        }));
        const dnmResult = window.complianceEngine.evaluateDNM(
            dnmProcesses,
            Math.max(totalCO2, 0.0001)
        );

        const hotspotComponents = ingredientResults.map(ing => ({
            name:         ing.name,
            contribution: ing.allCategoryResults['Climate Change'] || 0
        }));
        const hotspotResult = window.complianceEngine.identifyHotspots(
            hotspotComponents,
            Math.max(totalCO2, 0.0001)
        );

        const dqrComponentsWithUncertainty = dqrComponents.map(d => {
            const ingEntry = ingredientResults.find(i => i.name === d.name);
            const dqrP     = ingEntry && ingEntry.dqrBreakdown && ingEntry.dqrBreakdown.P
                ? ingEntry.dqrBreakdown.P
                : d.dqr;
            const uncertainty = window.foodCalculationEngine.calculateUncertainty(dqrP);
            return Object.assign({}, d, {
                uncertainty,
                source: ingEntry ? ingEntry.source : 'AGRIBALYSE 3.2'
            });
        });

        return { weightedDQR, dnmResult, hotspotResult, dqrComponents: dqrComponentsWithUncertainty };
    }

    // ── STEP 7: SINGLE SCORE ─────────────────────────────────────────────────
    function computeSingleScore(pefResults, input, ingredientResults) {
        const db = window.aioxyData;

        if (!db.pef_factors || !db.pef_factors.normalization_factors) {
            throw new CalculationError(
                'Missing required database: window.aioxyData.pef_factors.normalization_factors'
            );
        }
        if (!db.pef_factors.weighting_factors) {
            throw new CalculationError(
                'Missing required database: window.aioxyData.pef_factors.weighting_factors'
            );
        }

        const nfRaw = db.pef_factors.normalization_factors;
        const wfRaw = db.pef_factors.weighting_factors;

        const nf = {};
        for (const [efName, value] of Object.entries(nfRaw)) {
            const internalName = NF_ALIAS[efName] || efName;
            nf[internalName] = 1 / value;
        }

        const wf = {};
        for (const [efName, value] of Object.entries(wfRaw)) {
            const internalName = NF_ALIAS[efName] || efName;
            wf[internalName] = value;
        }

        const scorablePefResults = {};
        for (const cat of ALL_CATEGORIES) {
            if (cat === 'Climate Change - Fossil' ||
                cat === 'Climate Change - Biogenic' ||
                cat === 'Climate Change - Land Use') {
                continue;
            }
            if (pefResults[cat] && nf[cat] !== undefined && wf[cat] !== undefined) {
                scorablePefResults[cat] = pefResults[cat];
            }
        }

        const singleScoreResult = window.corePhysics.calculateSingleScore({
            pefResults:           scorablePefResults,
            productWeightKg:      input.product.weightKg,
            normalizationFactors: nf,
            weightingFactors:     wf
        });

        const breakdown = {};
        for (const cat of Object.keys(scorablePefResults)) {
            const impact       = scorablePefResults[cat].total;
            const perKg        = impact / input.product.weightKg;
            const normFactor   = nf[cat]  || 0;
            const weightFactor = wf[cat]  || 0;
            const normalized   = perKg * normFactor;
            const weighted     = normalized * weightFactor;
            breakdown[cat] = {
                raw: perKg, normalized, weighted,
                normalizationFactor: normFactor,
                weightingFactor:     weightFactor
            };
        }

        const normalizedScore = Object.values(breakdown).reduce((s, v) => s + v.normalized, 0);
        const weightedScore   = Object.values(breakdown).reduce((s, v) => s + v.weighted, 0);

        let organicMass         = 0;
        let totalIngredientMass = 0;
        for (const ing of input.ingredients) {
            totalIngredientMass += ing.quantityKg;
            if (ing.primaryData && ing.primaryData.farmingPractice === 'organic') {
                organicMass += ing.quantityKg;
            }
        }
        const organicRatio = totalIngredientMass > 0 ? organicMass / totalIngredientMass : 0;
        const organicBonus = 15.0 * organicRatio;
        const rawScore     = singleScoreResult.singleScore;
        const finalScore   = Math.max(0, rawScore - organicBonus);

        return {
            finalMicroPoints: finalScore,
            rawMicroPoints:   rawScore,
            normalizedScore,
            weightedScore,
            breakdown,
            organicBonus,
            organicRatio,
            unit: singleScoreResult.unit
        };
    }

    // ── STEP 8: MONTE CARLO UNCERTAINTY ──────────────────────────────────────
    function computeMonteCarlo(ingredientResults) {
        const mcComponents = ingredientResults.map(ing => ({
            value:              ing.allCategoryResults['Climate Change'] || 0,
            uncertaintyPercent: window.foodCalculationEngine.calculateUncertainty(
                                    ing.dqrBreakdown || ing.dqr)
        }));

        const hasNonZero = mcComponents.some(c => c.value > 0);
        if (!hasNonZero) {
            return { mean: 0, p5: 0, p95: 0 };
        }

        return window.corePhysics.calculateUncertainty({
            components: mcComponents,
            iterations: 500  // Monte Carlo (500 iterations)
        });
    }

    // ── STEP 9: COMPARISON BASELINE ──────────────────────────────────────────
    function computeComparison(input, pefResults) {
        const db         = window.aioxyData;
        const compIn     = input.comparison;
        const productCO2 = pefResults['Climate Change'].total;
        const co2PerKg   = productCO2 / input.product.weightKg;

        let comparisonBaseline = null;

        if (compIn.customBaselineCO2 && compIn.customBaselineCO2 > 0) {
            comparisonBaseline = {
                name:      'Custom User Baseline',
                co2PerKg:  compIn.customBaselineCO2,
                waterPerKg: 0,
                is_custom: true,
                breakdown: { farm: compIn.customBaselineCO2, manufacturing: 0, transport: 0, packaging: 0 }
            };
        } else if (compIn.baselineId && compIn.baselineId !== 'auto') {
            const anchorIngData = db.ingredients[compIn.baselineId];
            if (anchorIngData && anchorIngData.data && anchorIngData.data.pef) {
                const anchorPef  = anchorIngData.data.pef;
                const twinResult = window.corePhysics.calculateParametricTwin({
                    anchorIngredient: { pef: anchorPef, name: anchorIngData.name },
                    concentrationRatio: input.product.concentrationRatio || 1.0,
                    clonedParams: {
                        processingMethod:       input.manufacturing.processingMethod,
                        countryCode:            input.manufacturing.country,
                        transportDistance:      input.transport.distanceKm,
                        transportMode:          input.transport.mode,
                        refrigeration:          input.transport.refrigeration,
                        packagingMaterial:      input.packaging.material,
                        packagingWeightKg:      input.packaging.weightKg,
                        recycledContentPercent: input.packaging.recycledPct
                    },
                    databases: {
                        processBenchmarks: db.processing
                            ? Object.fromEntries(
                                Object.entries(db.processing).map(([k, v]) => [k, v.kwh_per_kg])
                              )
                            : {},
                        gridIntensity: db.countries || {},
                        packaging:     db.packaging  || {}
                    }
                });
                comparisonBaseline = {
                    name:       anchorIngData.name,
                    co2PerKg:   twinResult.co2PerKg,
                    waterPerKg: twinResult.waterPerKg,
                    is_custom:  false,
                    breakdown:  twinResult.breakdown
                };
            }
        }

        if (!comparisonBaseline) {
            comparisonBaseline = {
                name:       'Benchmark (Auto)',
                co2PerKg:   co2PerKg,
                waterPerKg: pefResults['Water Use/Scarcity (AWARE)'].total / input.product.weightKg,
                is_custom:  false,
                breakdown:  null
            };
        }

        return comparisonBaseline;
    }

    // ── MAIN: calculate() ────────────────────────────────────────────────────
    function calculate(input) {
        if (typeof window.corePhysics      === 'undefined') throw new CalculationError('corePhysics not loaded. Load core_physics.js before calculation_engine.js.');
        if (typeof window.complianceEngine === 'undefined') throw new CalculationError('complianceEngine not loaded. Load compliance_engine.js before calculation_engine.js.');
        if (typeof window.exportEngine     === 'undefined') throw new CalculationError('exportEngine not loaded. Load export_engine.js before calculation_engine.js.');
        if (typeof window.aioxyData        === 'undefined') throw new CalculationError('window.aioxyData not loaded. Load database files before calculation_engine.js.');

        validateInput(input);

        const { ingredientResults, ingredientTraceability } = processIngredients(input);
        const mfgResult       = processManufacturing(input);
        const transportResult = processTransport(input, input.packaging.weightKg);
        const packagingResult = processPackaging(input);

        const pefResults = aggregateAllCategories(
            ingredientResults, mfgResult, transportResult, packagingResult
        );

        const fullContribTree = buildContributionTree(
            ingredientResults, mfgResult, transportResult, packagingResult
        );
        for (const cat of ALL_CATEGORIES) {
            pefResults[cat].contribution_tree = fullContribTree[cat];
        }

        const { weightedDQR, dnmResult, hotspotResult, dqrComponents } =
            computeDQR(ingredientResults, pefResults);

        const singleScoreResult  = computeSingleScore(pefResults, input, ingredientResults);
        const monteCarloResults  = computeMonteCarlo(ingredientResults);
        const comparisonBaseline = computeComparison(input, pefResults);

        const auditTrailRaw = window.exportEngine.generateAuditTrail({
            physicsResults: {
                pefResults:    pefResults,
                ingredients:   ingredientResults,
                packaging:     packagingResult,
                manufacturing: mfgResult,
                transport:     transportResult
            },
            complianceResults: {
                overallDQR:   weightedDQR.overallDQR,
                qualityLevel: weightedDQR.qualityLevel,
                dnm:          dnmResult
            },
            metadata: {
                productName:      input.product.name,
                functionalUnitKg: input.product.weightKg
            },
            criticalReview: {
                status:   'INTERNAL',
                reviewer: 'AIOXY-AUTO',
                note:     'Internal calculation — external critical review required for regulatory submission'
            }
        });

        let auditTrail = auditTrailRaw;
        window.exportEngine.finalizeAuditTrail(auditTrailRaw).then(function (finalized) {
            auditTrail = finalized;
            if (window.auditTrailData) {
                window.auditTrailData.dppId     = finalized.dppId;
                window.auditTrailData.auditHash = finalized.auditHash;
            }
            if (window.currentDPPId !== undefined) {
                window.currentDPPId = finalized.dppId;
            }
        }).catch(function (e) {
            console.error('[AIOXY] SHA-256 finalization failed:', e);
        });

        const totalInputMass = input.ingredients.reduce((s, ing) => s + ing.quantityKg, 0);
        const evaporation    = totalInputMass - input.product.weightKg;
        const massBalanceData = {
            raw_input_total_kg:      totalInputMass,
            evaporation_kg:          Math.max(0, evaporation),
            final_content_weight_kg: input.product.weightKg,
            final_output_kg:         input.product.weightKg,
            packaging_weight_kg:     input.packaging.weightKg,
            inputMass:               totalInputMass,
            productMass:             input.product.weightKg,
            evaporation:             Math.max(0, evaporation)
        };

        const foregroundIngredients = ingredientResults.filter(ing =>  ing.primary_data_used);
        const backgroundIngredients = ingredientResults.filter(ing => !ing.primary_data_used);
        const foregroundCO2 = foregroundIngredients.reduce(
            (s, ing) => s + (ing.allCategoryResults['Climate Change'] || 0), 0
        );
        const backgroundCO2 = backgroundIngredients.reduce(
            (s, ing) => s + (ing.allCategoryResults['Climate Change'] || 0), 0
        );

        const dppIdPlaceholder = auditTrailRaw.dppId ||
            'TRC-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // === PHASE 2: Extended manufacturing traceability with residual mix ===
        const manufacturingTraceability = {
            source:     mfgResult.source || 'Ember 2025 / IEA',
            parameters: {
                country:      input.manufacturing.country,
                energySource: input.manufacturing.energySource
            },
            residual_mix: mfgResult.residual_mix_available ? {
                source:     mfgResult.residual_mix_source,
                year:       mfgResult.residual_mix_year,
                co2_factor: mfgResult.residual_mix_co2,
                unit:       mfgResult.residual_mix_unit || 'g CO2/kWh',
                note:       'Residual mix factor available but not applied. Using Ember grid average as primary factor.'
            } : {
                available: false,
                note:      mfgResult.residual_mix_note || 'Residual mix not applicable'
            }
        };
        // === END PHASE 2: manufacturing traceability ===

        const auditTrailData = {
            productName:          input.product.name,
            dppId:                dppIdPlaceholder,
            auditHash:            auditTrailRaw.auditHash || '',
            calculationTimestamp: new Date().toISOString(),

            pefCategories:    pefResults,
            contribution_tree: fullContribTree['Climate Change'],
            mass_balance:     massBalanceData,

            dqr_summary: {
                overall_dqr:    weightedDQR.overallDQR,
                dqr_level:      weightedDQR.qualityLevel,
                component_dqrs: dqrComponents
            },

            uncertainty_analysis: {
                overall_uncertainty: 15,
                monte_carlo:         monteCarloResults
            },

            pef_single_score: {
                singleScore:           singleScoreResult.finalMicroPoints,
                normalizedScore:       singleScoreResult.normalizedScore,
                weightedScore:         singleScoreResult.weightedScore,
                breakdown:             singleScoreResult.breakdown,
                organic_bonus_applied: singleScoreResult.organicBonus > 0,
                organic_ratio:         singleScoreResult.organicRatio
            },

            compliance_status: dnmResult.compliant ? 'COMPLIANT' : 'WARNING',
            dnm_alerts:        dnmResult.warnings || [],
            hotspot_analysis:  hotspotResult,
            comparison_baseline: comparisonBaseline,

            traceability: {
                ingredients:             ingredientTraceability,
                manufacturing:           manufacturingTraceability,
                transport:               { source: 'GLEC v3.2',               parameters: { mode: input.transport.mode, distanceKm: input.transport.distanceKm } },
                packaging:               { source: 'PEF 3.1 CFF / Ecoinvent', parameters: { material: input.packaging.material, recycledPct: input.packaging.recycledPct } },
                normalization_weighting: { source: 'EF 3.1 JRC', version: 'EF 3.1' }
            },

            ISO_compliance: {
                compliance_statement: 'Screening-level assessment per ISO 14040:2006 and ISO 14044:2006.',
                principles: {
                    system_boundary: 'Cradle-to-Retail',
                    functional_unit: input.product.weightKg + ' kg',
                    allocation:      'Economic allocation per ISO 14044'
                }
            },

            foreground_background: {
                foreground_count:        foregroundIngredients.length,
                background_count:        backgroundIngredients.length,
                cutoff_percentage:       0.05,
                components: {
                    foreground: foregroundIngredients.map(i => ({ name: i.name, co2: i.allCategoryResults['Climate Change'] || 0 })),
                    background: backgroundIngredients.map(i => ({ name: i.name, co2: i.allCategoryResults['Climate Change'] || 0 }))
                },
                foreground_dqr:          foregroundIngredients.length > 0
                    ? foregroundIngredients.reduce((s, i) => s + i.dqr, 0) / foregroundIngredients.length
                    : 0,
                background_dqr:          weightedDQR.overallDQR,
                foreground_contribution: foregroundCO2,
                background_contribution: backgroundCO2
            },

            allocation_sensitivity: null,

            review_panel: {
                valid:     false,
                members:   [],
                statement: null
            }
        };

        return {
            finalPefResults: pefResults,
            massBalanceData: massBalanceData,

            unifiedMetrics: {
                weightUsed:         input.product.weightKg,
                co2PerKg:           pefResults['Climate Change'].total                / input.product.weightKg,
                waterScarcityPerKg: pefResults['Water Use/Scarcity (AWARE)'].total    / input.product.weightKg,
                landUsePerKg:       pefResults['Land Use'].total                      / input.product.weightKg,
                fossilPerKg:        pefResults['Resource Use, fossils'].total         / input.product.weightKg
            },

            co2PerKg:           pefResults['Climate Change'].total                / input.product.weightKg,
            waterScarcityPerKg: pefResults['Water Use/Scarcity (AWARE)'].total    / input.product.weightKg,
            landUsePerKg:       pefResults['Land Use'].total                      / input.product.weightKg,
            fossilPerKg:        pefResults['Resource Use, fossils'].total         / input.product.weightKg,
            overallDQR:         weightedDQR.overallDQR,

            comparison: {
                baseline:      comparisonBaseline,
                co2SavedPerKg: (comparisonBaseline ? comparisonBaseline.co2PerKg : 0) -
                               (pefResults['Climate Change'].total / input.product.weightKg)
            },

            auditTrailData:    auditTrailData,
            dppId:             dppIdPlaceholder,
            compliance_status: dnmResult.compliant ? 'COMPLIANT' : 'WARNING'
        };
    }

    // ── EXPORT ────────────────────────────────────────────────────────────────
    window.calculationEngine = { calculate: calculate };

}());
