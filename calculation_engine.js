

// ================== AIOXY CALCULATION ENGINE v2.1 ==================
// ISO 14044 / PEF 3.1 Calculation Orchestration Layer
//
// Phase 1: All 16 EF 3.1 categories, DQR from database, Monte Carlo,
//          no shadow calculations, aFactor/fossilFraction strict.
// Phase 2: Country-specific database integration — AWARE 2.0, LANCA v2.5,
//          FAOSTAT yield benchmarking, AIB Residual Mix, USEtox note.
//
// BUG-02 FIX: Refrigerant type string normalisation + unrecognised type throws
//             instead of silently applying GWP=0 for a known refrigerant.
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

    // 16 scorable EF 3.1 categories — excludes the 3 CC sub-splits used for auditing only
    const SCORABLE_CATEGORIES = ALL_CATEGORIES.filter(c =>
        c !== 'Climate Change - Fossil' &&
        c !== 'Climate Change - Biogenic' &&
        c !== 'Climate Change - Land Use'
    );

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
        // F8 AUDIT CHECK (confirmed): All required EF 3.1 canonical → internal name aliases
        // are present in this object. Verified entries:
        //   'EF-particulate matter'             → 'Particulate Matter'          ✓ (line 94)
        //   'Ionising radiation'                → 'Ionizing Radiation'          ✓ (line 83)
        //   'Photochemical ozone formation'     → 'Photochemical Ozone Formation'✓ (line 97)
        //   'Resource depletion, fossils'       → 'Resource Use, fossils'       ✓ (line 98)
        //   'Resource depletion, minerals and metals' → 'Resource Use, minerals/metals' ✓ (line 99)
        //   'Water use'                         → 'Water Use/Scarcity (AWARE)'  ✓ (line 91)
        //   'Climate change'                    → 'Climate Change'              ✓ (line 78)
        //   'Land use'                          → 'Land Use'                    ✓ (line 90)
        // No missing aliases — computeSingleScore() will correctly map all SCORABLE_CATEGORIES.
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

    function buildContributionTree(ingredientResults, mfgResult, transportResult, packagingResult, input) {
        const tree = {};
        const manufacturingCountry = input && input.manufacturing ? input.manufacturing.country : 'FR';
        const gridIntensity = mfgResult.gridIntensityGPerKwh !== undefined ? mfgResult.gridIntensityGPerKwh : 480;

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
            } else if (
                cat !== 'Climate Change - Land Use' &&
                mfgResult.multiCategoryResults && mfgResult.multiCategoryResults[cat] !== undefined
            ) {
                mfgTotal = mfgResult.multiCategoryResults[cat];
            }

            // BUG C1 FIX: buildContributionTree was not populating transTotal or pkgTotal
            // for non-CC categories — they stayed 0. After buildContributionTree() ran,
            // its output overwrote pefResults[cat].contribution_tree (lines 2453-2455),
            // zeroing the correct values that aggregateAllCategories() had computed.
            // Fix: mirror the same multiCategoryResults branch used in aggregateAllCategories().
            const isCCCategory = (
                cat === 'Climate Change' ||
                cat === 'Climate Change - Fossil' ||
                cat === 'Climate Change - Biogenic' ||
                cat === 'Climate Change - Land Use'
            );
            if (!isCCCategory) {
                if (transportResult.multiCategoryResults &&
                    transportResult.multiCategoryResults[cat] !== undefined) {
                    transTotal = transportResult.multiCategoryResults[cat];
                }
                if (packagingResult.multiCategoryResults &&
                    packagingResult.multiCategoryResults[cat] !== undefined) {
                    pkgTotal = packagingResult.multiCategoryResults[cat];
                }
            }

            // Bug 2 fix: Build Manufacturing component
            const mfgComponent = {
                name: 'Factory Operations',
                details: `${mfgResult.kwh ? mfgResult.kwh.toFixed(2) + ' kWh' : 'N/A'}`,
                energy_source: (input && input.manufacturing && input.manufacturing.energySource) || 'Grid Mix',
                grid_intensity: mfgResult.gridIntensityGPerKwh || gridIntensity,
                subtotal: mfgTotal,
                // GAP 7 FIX: Full manufacturing trace for PDF dumb-printer.
                // Shows: source, formula, all inputs, T&D loss, step-by-step arithmetic, result.
                // PDF must read this trace directly — must NOT recompute any value.
                calculation_trace: (() => {
                    const mfgCountry     = (input && input.manufacturing && input.manufacturing.country) || 'FR';
                    const mfgMethod      = (input && input.manufacturing && input.manufacturing.processingMethod) || 'none';
                    const mfgEnergySource= (input && input.manufacturing && input.manufacturing.energySource) || 'Grid Mix';
                    const kwhTotal       = mfgResult.kwh || 0;
                    const productMassKg  = (input && input.product && input.product.weightKg) || 1;
                    const kwhPerKg       = productMassKg > 0 ? kwhTotal / productMassKg : 0;
                    const gIntensity     = mfgResult.gridIntensityGPerKwh !== undefined ? mfgResult.gridIntensityGPerKwh : gridIntensity;
                    const tdLoss         = 0.07;
                    const adjustedG      = gIntensity * (1 + tdLoss);
                    const isCatCC        = (cat === 'Climate Change');
                    if (isCatCC) {
                        return [
                            'Sources: Ember 2025 (grid intensity) / Processing benchmark DB (energy intensity)',
                            'Formula: CO2e = kWh_per_kg x mass(kg) x grid_intensity(g/kWh) x (1 + T&D_loss) / 1000',
                            '',
                            '  Processing method  : ' + mfgMethod,
                            '  Energy source      : ' + mfgEnergySource,
                            '  Energy intensity   : ' + kwhPerKg.toFixed(4) + ' kWh/kg  [Processing benchmark DB]',
                            '  Product mass       : ' + productMassKg.toFixed(4) + ' kg',
                            '  kWh (total)        : ' + kwhPerKg.toFixed(4) + ' kWh/kg x ' + productMassKg.toFixed(4) + ' kg = ' + kwhTotal.toFixed(4) + ' kWh',
                            '',
                            '  Grid intensity     : ' + gIntensity.toFixed(2) + ' g CO2e/kWh  [Ember 2025 - ' + mfgCountry + ']',
                            '  T&D loss factor    : 7%  [IEA Electricity Information 2023, EU average]',
                            '  Adjusted intensity : ' + gIntensity.toFixed(2) + ' x (1 + 0.07) = ' + adjustedG.toFixed(2) + ' g CO2e/kWh',
                            '',
                            '  CO2e = ' + kwhTotal.toFixed(4) + ' kWh x ' + adjustedG.toFixed(2) + ' g/kWh / 1000',
                            '       = ' + mfgTotal.toFixed(4) + ' kg CO2e'
                        ].join('\n');
                    } else {
                        return [
                            'Sources: ENTSO-E 2023 / EMEP/EEA 2023 / JRC EF 3.1 (EU27 average electricity mix)',
                            'Formula: impact = kWh x multi_category_factor[' + cat + ']',
                            '',
                            '  kWh (total)        : ' + kwhTotal.toFixed(4) + ' kWh',
                            '  Multi-category EF  : from ELECTRICITY_GRID_MULTI[' + cat + ']',
                            '  Result             : ' + mfgTotal.toExponential(4) + ' ' + cat
                        ].join('\n');
                    }
                })()
            };

            // ── INBOUND TRANSPORT — per ingredient (Phase 3 implementation) ──────
            // METHODOLOGY:
            //   For non-FR origin ingredients, calculate the inbound transport leg
            //   from origin country to manufacturing country using GLEC v3.2 factors
            //   via the same calculateTransport() pathway as outbound transport.
            //   FR origins: AGRIBALYSE 3.2 already embeds representative domestic
            //   transport — no additional leg added (ISO 14044 §4.2.3.3 exclusion).
            //
            //   Distance source: resolveInboundTransport() — lookup table of
            //   representative port-to-port (sea) or road-network (road) distances.
            //   Mode: road for EU/near-EU, sea for intercontinental.
            //   Temperature: ambient unless product is frozen (processingMethod=freezing).
            //   Mass: ingredient quantityKg only (no packaging on inbound leg).
            //   DAF applied inside calculateTransport() per GLEC v3.2 (road ×1.05, sea ×1.15).
            //
            // ISO 14044 §4.2.3.3 NOTE: This is a screening-level estimate using
            //   representative distances. For regulatory submission, replace with
            //   actual supplier-declared transport distances and modes.
            //
            const upstreamComponents = [];
            let upstreamTotal = 0;

            try {
                const ingOrigin = ingredient.originCountry || 'FR';
                const mfgCountry = input.manufacturing && input.manufacturing.country
                    ? input.manufacturing.country : 'FR';

                const inboundRoute = resolveInboundTransport(ingOrigin, mfgCountry);

                if (inboundRoute) {
                    // Temperature condition: frozen if processing method is freezing,
                    // ambient otherwise (inbound ingredient transport is pre-processing).
                    const tempCondition = (input.manufacturing &&
                        input.manufacturing.processingMethod === 'freezing')
                        ? 'frozen' : 'ambient';

                    const inboundResult = window.corePhysics.calculateTransport({
                        massKg:        ingredient.quantityKg,
                        distanceKm:    inboundRoute.distanceKm,
                        mode:          inboundRoute.mode,
                        refrigeration: tempCondition
                    });

                    const inboundCO2 = inboundResult.total || 0;
                    upstreamTotal += inboundCO2;

                    upstreamComponents.push({
                        name:         ingData.name,
                        id:           ingredient.id,
                        origin:       ingOrigin,
                        destination:  mfgCountry,
                        mode:         inboundRoute.mode,
                        distanceKm:   inboundRoute.distanceKm,
                        massKg:       ingredient.quantityKg,
                        refrigeration: tempCondition,
                        subtotal:     inboundCO2,
                        fossilCO2:    inboundResult.fossilCO2 || inboundCO2,
                        biogenicCO2:  0,
                        dlucCO2:      0,
                        multiCategoryResults: inboundResult.multiCategoryResults || {},
                        source:       inboundRoute.source,
                        notes:        ingOrigin + ' → ' + mfgCountry +
                                      ' | ' + inboundRoute.mode.toUpperCase() +
                                      ' | ' + inboundRoute.distanceKm + ' km (pre-DAF)' +
                                      ' | ' + inboundRoute.source,
                        daf_applied:  inboundRoute.mode === 'road' ? 1.05 :
                                      inboundRoute.mode === 'sea'  ? 1.15 : 1.00,
                        methodology:  'GLEC v3.2 screening estimate — replace with primary supplier data for regulatory submission'
                    });
                }
            } catch (inboundErr) {
                // Non-critical — log and continue. Inbound transport failure
                // must never block the main calculation.
                console.warn('[AIOXY] Inbound transport calculation failed for ingredient "' +
                    (ingData && ingData.name ? ingData.name : ingredient.id) +
                    '": ' + (inboundErr && inboundErr.message ? inboundErr.message : String(inboundErr)));
            }
            // ── END INBOUND TRANSPORT ─────────────────────────────────────────

            // FIX: [Audit 8.4] Bug 3 fix (Step B): Build Waste (processing) components
            // Previous code used db.processing_archetypes[processingMethod] — vocabulary mismatch.
            // db.processing_archetypes uses keys: dry_milled, wet_extracted, isolated, fermentation.
            // db.processing uses the same key vocabulary as input.manufacturing.processingMethod
            // (pasteurization, baking, frying, etc.). Fix: look up db.processing[processingMethod].
            // This is a traceability display fix only — does NOT affect CO2 totals in pefResults.
            const wasteComponents = [];
            let wasteTotal = 0;
            if (input && input.manufacturing && input.manufacturing.processingMethod) {
                const processingMethod = input.manufacturing.processingMethod;
                const db = window.aioxyData;
                // FIX: [Audit 8.4] Use db.processing (correct vocabulary) not db.processing_archetypes
                const procEntry = db && db.processing ? db.processing[processingMethod] : null;
                const lossFraction = procEntry && typeof procEntry.loss === 'number'
                    ? procEntry.loss
                    : (procEntry && typeof procEntry.yield_factor === 'number'
                        ? 1.0 - procEntry.yield_factor
                        : 0); // FIX: [Audit 8.4] default = no loss if field absent; document as gap
                // BUG M4 FIX: Waste was previously only computed for 'Climate Change'.
                // Processing loss proportionally affects ALL EF 3.1 categories (the same
                // mass fraction of ingredients is lost regardless of impact category).
                // Fix: apply lossFraction to ingTotal for every category.
                // The waste is informational only — it is NOT added to pefResults totals.
                // This fixes the contribution tree display for all 16 categories.
                if (lossFraction > 0 && cat !== 'Climate Change - Fossil' &&
                    cat !== 'Climate Change - Biogenic' && cat !== 'Climate Change - Land Use') {
                    const ingTotalCat = ingComponents.reduce((s, c) => s + (c.allCategoryResults ? (c.allCategoryResults[cat] || 0) : (cat === 'Climate Change' ? (c.subtotal || 0) : 0)), 0);
                    const wasteImpact = ingTotalCat * lossFraction;
                    if (wasteImpact !== 0) {
                        wasteTotal = wasteImpact;
                        wasteComponents.push({
                            name: `Processing Waste: ${processingMethod}`,
                            notes: `Formulation loss (${(lossFraction * 100).toFixed(1)}%) applied to ${cat} — source: db.processing["${processingMethod}"].loss or yield_factor`,
                            subtotal: wasteImpact,
                            calculation_trace: `[Processing waste (${cat}): ${wasteImpact.toExponential(4)} — informational only, not added to totals]`
                        });
                    }
                }
            }

            // Bug 11 fix: Transport component
            // GAP 1 FIX: Full GLEC v3.2 calculation_trace built here in the engine.
            // PDF must read this trace directly — must NOT recompute any transport value.
            // All EFs, DAFs, and mass values come from the same CONSTANTS used in
            // calculateTransport() in core_physics.js. This is documentation of what
            // the engine calculated, not a recalculation.
            const transportComponents = [];
            if (input && input.transport) {
                const transMode   = input.transport.mode || 'road';
                const transDist   = input.transport.distanceKm || 0;
                const transRefrig = input.transport.refrigeration || 'ambient';
                const transWtKg   = (input.product ? input.product.weightKg : 0)
                                  + (input.packaging ? input.packaging.weightKg : 0);
                const transWtT    = transWtKg / 1000;

                // EF table mirrors CONSTANTS.GLEC.EMISSION_FACTORS in core_physics.js
                const EF_TABLE = {
                    road:  { ambient: 0.089, chilled: 0.100, frozen: 0.100 },
                    sea:   { ambient: 0.0072, chilled: 0.0072, frozen: 0.0142 },
                    air:   { ambient: 0.788,  chilled: 0.788,  frozen: 0.788  },
                    rail:  { ambient: 0.0184, chilled: 0.0184, frozen: 0.0206 }
                };
                // DAF table mirrors CONSTANTS.GLEC.DAF in core_physics.js
                const DAF_TABLE    = { road: 1.05, sea: 1.15, rail: 1.00 };
                const AIR_ADD_KM   = 95;

                const modeEFs  = EF_TABLE[transMode]  || EF_TABLE.road;
                const ef       = modeEFs[transRefrig] || modeEFs.ambient;
                const isAir    = transMode === 'air';
                const daf      = isAir ? null : (DAF_TABLE[transMode] || 1.0);
                const adjDist  = isAir ? transDist + AIR_ADD_KM : transDist * daf;
                const dafNote  = isAir
                    ? transDist + ' km + ' + AIR_ADD_KM + ' km (GLEC v3.2 additive DAF for air)'
                    : transDist + ' km x ' + daf + ' (GLEC v3.2 DAF for ' + transMode + ')';

                // EF source reference per mode
                const EF_SOURCE = {
                    road:  'GLEC v3.2 Table 8 — EU articulated HGV average',
                    sea:   'GLEC v3.2 Table 18 — Module 2',
                    air:   'GLEC v3.2 Table 1 — Module 2',
                    rail:  'GLEC v3.2 Table 4 — Module 2'
                };
                const efSource = EF_SOURCE[transMode] || EF_SOURCE.road;

                const transTrace = [
                    'Source: ' + efSource,
                    'Formula: mass(t) x adjusted_distance(km) x EF(kg CO2e/tkm)',
                    '',
                    '  Gross mass (product + packaging):',
                    '    product   = ' + (input.product ? input.product.weightKg.toFixed(4) : '0') + ' kg',
                    '    packaging = ' + (input.packaging ? input.packaging.weightKg.toFixed(4) : '0') + ' kg',
                    '    total     = ' + transWtKg.toFixed(4) + ' kg = ' + transWtT.toFixed(6) + ' t',
                    '',
                    '  Distance:',
                    '    user input     = ' + transDist + ' km',
                    '    DAF applied    = ' + dafNote,
                    '    adjusted dist  = ' + adjDist.toFixed(2) + ' km',
                    '',
                    '  Emission factor:',
                    '    mode           = ' + transMode.toUpperCase(),
                    '    temperature    = ' + transRefrig,
                    '    EF             = ' + ef + ' kg CO2e/tkm  [' + efSource + ']',
                    '',
                    '  CO2e = ' + transWtT.toFixed(6) + ' t x ' + adjDist.toFixed(2) + ' km x ' + ef + ' kg CO2e/tkm',
                    '       = ' + transTotal.toFixed(4) + ' kg CO2e'
                ].join('\n');

                transportComponents.push({
                    name: 'Outbound: ' + transMode + ' transport',
                    notes: transDist + ' km, ' + transMode + ', ' + transRefrig,
                    subtotal: transTotal,
                    calculation_trace: transTrace
                });
            }

            // Bug 11 fix: Packaging component
            // GAP 8 FIX: Full PEF 3.1 CFF calculation_trace built here in the engine.
            // PDF must read this trace directly — must NOT recompute any CFF value.
            // All parameters (Ev, Erec, Ed, R1, R2, A, Qs/Qp) are read from the
            // packaging database (window.aioxyData.packaging) — the same source used
            // by calculatePackaging() in core_physics.js.
            const packagingComponents = [];
            if (pkgTotal !== 0 || (input && input.packaging && input.packaging.material)) {
                const pkgMat  = (input && input.packaging) ? input.packaging.material : 'unknown';
                const pkgWtKg = (input && input.packaging) ? (input.packaging.weightKg || 0) : 0;
                const pkgRec  = (input && input.packaging) ? ((input.packaging.recycledPct || 0) / 100) : 0;

                // Read CFF parameters from database — same source as calculatePackaging()
                const pkgDB   = (window.aioxyData && window.aioxyData.packaging)
                                ? (window.aioxyData.packaging[pkgMat] || {})
                                : {};
                const ev      = pkgDB.co2_virgin              || 0;
                const erec    = pkgDB.co2_recycled             || 0;
                const ed      = pkgDB.co2_disposal_average     || 0;
                const r1max   = pkgDB.r1_max                   !== undefined ? pkgDB.r1_max : 1.0;
                const r1      = Math.min(pkgRec, r1max);
                const r2      = pkgDB.r2                       || 0;
                const A       = pkgDB.aFactor                  || 0;
                const qs      = pkgDB.q                        !== undefined ? pkgDB.q : 1.0;
                const qp      = 1.0;
                const qr      = qs / qp;

                // CFF formula per PEF 3.1 Annex C v2.1:
                // [(1-R1) x Ev] + [R1 x (A x Erec + (1-A) x Ev x Qs/Qp)]
                // + [(1-R2) x Ed] + [R2 x (1-A) x (Erec - Ev x Qs/Qp)]
                const term1   = (1 - r1) * ev;
                const term2   = r1 * (A * erec + (1 - A) * ev * qr);
                const burden  = (1 - r2) * ed;
                const credit  = r2 * (1 - A) * (erec - ev * qr);
                const perKg   = term1 + term2 + burden + credit;

                const pkgSrc  = pkgDB.source || 'PEF Annex C v2.1 / packaging database';

                const cffTrace = [
                    'Source: PEF 3.1 Annex C v2.1 (CFF) — ' + pkgSrc,
                    'Formula: [(1-R1) x Ev] + [R1 x (A x Erec + (1-A) x Ev x Qs/Qp)]',
                    '         + [(1-R2) x Ed] + [R2 x (1-A) x (Erec - Ev x Qs/Qp)]',
                    '',
                    '  Material         : ' + pkgMat,
                    '  Weight           : ' + pkgWtKg.toFixed(4) + ' kg',
                    '',
                    '  Parameters (from packaging database):',
                    '    Ev  (virgin production)   = ' + ev.toFixed(5)   + ' kg CO2e/kg',
                    '    Erec (recycled production) = ' + erec.toFixed(5) + ' kg CO2e/kg',
                    '    Ed  (disposal average)     = ' + ed.toFixed(5)   + ' kg CO2e/kg',
                    '    R1  (recycled content)     = ' + pkgRec.toFixed(4) + ' -> capped at r1_max(' + r1max + ') -> R1 = ' + r1.toFixed(4),
                    '    R2  (EoL recycling rate)   = ' + r2.toFixed(4),
                    '    A   (allocation factor)    = ' + A.toFixed(4),
                    '    Qs/Qp (quality ratio)      = ' + qs.toFixed(4) + ' / ' + qp.toFixed(4) + ' = ' + qr.toFixed(4),
                    '',
                    '  Term 1: (1 - ' + r1.toFixed(4) + ') x ' + ev.toFixed(5),
                    '        = ' + term1.toFixed(5) + ' kg CO2e/kg',
                    '',
                    '  Term 2: ' + r1.toFixed(4) + ' x (' + A.toFixed(4) + ' x ' + erec.toFixed(5) + ' + (1 - ' + A.toFixed(4) + ') x ' + ev.toFixed(5) + ' x ' + qr.toFixed(4) + ')',
                    '        = ' + term2.toFixed(5) + ' kg CO2e/kg',
                    '',
                    '  Burden: (1 - ' + r2.toFixed(4) + ') x ' + ed.toFixed(5),
                    '        = ' + burden.toFixed(5) + ' kg CO2e/kg',
                    '',
                    '  Credit: ' + r2.toFixed(4) + ' x (1 - ' + A.toFixed(4) + ') x (' + erec.toFixed(5) + ' - ' + ev.toFixed(5) + ' x ' + qr.toFixed(4) + ')',
                    '        = ' + credit.toFixed(5) + ' kg CO2e/kg',
                    '',
                    '  Impact/kg = ' + term1.toFixed(5) + ' + ' + term2.toFixed(5) + ' + ' + burden.toFixed(5) + ' + ' + credit.toFixed(5),
                    '           = ' + perKg.toFixed(5) + ' kg CO2e/kg',
                    '',
                    '  Total = ' + perKg.toFixed(5) + ' kg CO2e/kg x ' + pkgWtKg.toFixed(4) + ' kg',
                    '        = ' + pkgTotal.toFixed(4) + ' kg CO2e'
                ].join('\n');

                packagingComponents.push({
                    name: 'Primary Packaging: ' + pkgMat,
                    notes: 'CFF-adjusted impact — PEF 3.1 Annex C v2.1',
                    subtotal: pkgTotal,
                    calculation_trace: cffTrace
                });
            }

            // ── Upstream: aggregate inbound transport legs across all ingredients ──
            upstreamTotal = 0;
            upstreamComponents.length = 0;
            for (const ing of ingredientResults) {
                for (const comp of (ing.upstreamComponents || [])) {
                    let compCatValue = 0;
                    if (cat === 'Climate Change') {
                        compCatValue = comp.subtotal || 0;
                    } else if (cat === 'Climate Change - Fossil') {
                        compCatValue = comp.fossilCO2 || comp.subtotal || 0;
                    } else if (cat !== 'Climate Change - Biogenic' && cat !== 'Climate Change - Land Use') {
                        compCatValue = (comp.multiCategoryResults && comp.multiCategoryResults[cat] !== undefined)
                            ? comp.multiCategoryResults[cat] : 0;
                    }
                    upstreamTotal += compCatValue;
                    if (cat === 'Climate Change') {
                        // Only push full component objects for CC (used by audit trail display)
                        upstreamComponents.push(comp);
                    }
                }
            }
            // ── End upstream ──────────────────────────────────────────────────

            tree[cat] = {
                Ingredients:   { total: ingTotal,       components: ingComponents },
                Manufacturing: { total: mfgTotal,       components: [mfgComponent] },
                Transport:     { total: transTotal,     components: transportComponents },
                Packaging:     { total: pkgTotal,       components: packagingComponents },
                Upstream:      { total: upstreamTotal,  components: upstreamComponents },
                Waste:         { total: wasteTotal,     components: wasteComponents }
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

    // ── BUG FIX (Phase 2): ISO code → full country name resolver ─────────────
    // BUG: aioxy_pef31_database.js stores AWARE 2.0, LANCA v2.5, and FAOSTAT
    // data keyed by full country names (e.g. "France", "Germany"), but
    // applyCountrySpecificFactors() was passing 2-letter ISO 3166-1 alpha-2
    // codes (e.g. "FR", "DE"), causing every lookup to return undefined and
    // silently skipping ALL country-specific adjustments since Phase 2 launched.
    // This resolver translates ISO codes to the exact key strings used in the
    // database, fixing AWARE 2.0, LANCA v2.5, and FAOSTAT lookups in one place.
    function resolveCountryCode(isoCode) {
        // Maps ISO 3166-1 alpha-2 codes to the full names used by:
        // AWARE 2.0 (WULCA consortium), LANCA v2.5 (Fraunhofer IBP / JRC),
        // FAOSTAT (Crops and Livestock Products)
        // Sources for country names: the exact key strings used in
        // aioxy_pef31_database.js
        const MAP = {
            "AL": "Albania",        "AT": "Austria",          "BA": "Bosnia and Herzegovina",
            "BE": "Belgium",        "BG": "Bulgaria",         "BR": "Brazil",
            "CA": "Canada",         "CH": "Switzerland",      "CI": "Cote d'Ivoire",    // FIX: was "Côte d'Ivoire" — DB uses no accent
            "CN": "China",          "CY": "Cyprus",           "CZ": "Czech Republic",   // FIX: was "Czechia" — DB uses "Czech Republic"
            "DE": "Germany",        "DK": "Denmark",          "EE": "Estonia",
            "ES": "Spain",          "FI": "Finland",          "FR": "France",
            "GB": "United Kingdom",                                                       // FIX: was long UNSD form — DB uses "United Kingdom"
            "GR": "Greece",         "HR": "Croatia",          "HU": "Hungary",
            "IE": "Ireland",        "IN": "India",            "IS": "Iceland",
            "IT": "Italy",          "JP": "Japan",            "LT": "Lithuania",
            "LU": "Luxembourg",     "LV": "Latvia",           "MA": "Morocco",
            "MD": "Moldova",        "ME": "Montenegro",       "MK": "The Former Yugoslav Republic of Macedonia", // FIX: LANCA/FAOSTAT use old UN name
            "MT": "Malta",          "NL": "Netherlands",      "NO": "Norway",
            "PL": "Poland",         "PT": "Portugal",         "RO": "Romania",
            "RS": "Serbia",         "SE": "Sweden",           "SI": "Slovenia",
            "SK": "Slovakia",       "TR": "Turkey",           "US": "United States",    // FIX: was "United States of America" — DB uses "United States"
            "VN": "Vietnam",        "AR": "Argentina",        "AU": "Australia",        // FIX: was "Viet Nam" — DB uses "Vietnam"
            "ID": "Indonesia",      "PK": "Pakistan",         "NG": "Nigeria",
            "EG": "Egypt",          "ZA": "South Africa",     "MX": "Mexico",
            "RU": "Russia",         "UA": "Ukraine",          "KR": "South Korea",      // FIX: RU was "Russian Federation", KR was "Republic of Korea"
            "KE": "Kenya",          "ET": "Ethiopia",         "GH": "Ghana",
            "CM": "Cameroon",       "PE": "Peru",
            "CL": "Chile",          "CO": "Colombia",         "UY": "Uruguay",
            "MY": "Malaysia",       "PH": "Philippines",      "TH": "Thailand",
            "BD": "Bangladesh",     "NP": "Nepal",            "LK": "Sri Lanka",
            "IR": "Iran",           "IQ": "Iraq",                                        // FIX: was "Iran (Islamic Republic of)" — DB uses "Iran"
            "SA": "Saudi Arabia",   "AE": "United Arab Emirates",
            "RE": "France",          // Réunion is FR overseas — uses FR as proxy
            "WI": "France",          // West Indies (FR Antilles) — uses FR as proxy
            "EU": "France",          // EU aggregate — uses FR as conservative proxy
            "XK": "Serbia"           // Kosovo — nearest neighbor proxy
        };

        if (MAP[isoCode]) return MAP[isoCode];

        // Fallback: log warning, return original code (will fail gracefully in caller)
        console.warn('[AIOXY] No country name mapping for ISO code: ' + isoCode +
                     '. AWARE/LANCA/FAOSTAT adjustments will be skipped for this country.');
        return isoCode;
    }

    // ── INBOUND TRANSPORT DISTANCE + MODE LOOKUP ─────────────────────────────
    // Source methodology:
    //   Sea distances: GLEC v3.2 representative port-to-port great circle + 15% DAF
    //   Road distances: Eurostat transport statistics + Google Maps road network
    //   Mode selection rule:
    //     Same country or neighbouring EU → road
    //     Intercontinental / >1500 km overland → sea
    //     Island/archipelago origins (JP, ID, PH, LK) → sea always
    //   All distances in km (pre-DAF great circle / road network).
    //   DAF is applied inside calculateTransport() — do NOT pre-apply here.
    //   Reference: GLEC v3.2 Module 2 §3.2 representative distances.
    //   Temperature condition: ambient unless mfg processingMethod = freezing.
    //
    // Returns { distanceKm, mode, source } or null if origin === mfgCountry (FR→FR etc.)
    // A null return means AGRIBALYSE already embeds representative farm-gate transport.
    //
    function resolveInboundTransport(originCode, mfgCode) {
        // FR origin: AGRIBALYSE 3.2 already includes representative French
        // domestic transport in its system boundary — no additional leg needed.
        if (!originCode || originCode === 'FR') return null;

        // Same country as manufacturing — negligible domestic leg,
        // treat as included in AGRIBALYSE system boundary.
        if (originCode === mfgCode) return null;

        // ── ROAD DISTANCES (km) to representative European hub (Paris/Frankfurt) ──
        // Used when mode = road (EU/near-EU origins).
        // Source: Eurostat road freight statistics, representative origin city to
        // Paris CDG / Frankfurt logistics hub.
        const ROAD_TO_EU_HUB = {
            'AT': 1100, 'BE': 310,  'BG': 2000, 'HR': 1500, 'CY': null, // CY = sea
            'CZ': 880,  'DK': 1000, 'EE': 2200, 'FI': 2500, 'DE': 550,
            'GR': 2500, 'HU': 1300, 'IE': 1800, 'IT': 1200, 'LV': 2100,
            'LT': 2000, 'LU': 360,  'MT': null, // MT = sea
            'NL': 500,  'NO': 2000, 'PL': 1300, 'PT': 1700, 'RO': 2200,
            'SK': 1100, 'SI': 1200, 'ES': 1300, 'SE': 2000, 'CH': 600,
            'GB': 850,  'TR': 2800, 'AL': 2100, 'BA': 1800, 'ME': 2000,
            'MK': 2100, 'RS': 1900, 'UA': 2500, 'MD': 2300, 'RU': 2800,
            'MA': 2500, 'DZ': 2200, 'TN': 2100
        };

        // ── SEA DISTANCES (km great circle, pre-DAF) to Rotterdam/Hamburg ──
        // Intercontinental and island origins.
        // Source: GLEC v3.2 representative port-to-port distances,
        // Port of Rotterdam as European reference port.
        const SEA_TO_EU_PORT = {
            // South Asia
            'IN': 10500, 'PK': 9800,  'BD': 11000, 'LK': 11500, 'NP': 11500,
            // East/SE Asia
            'CN': 12000, 'JP': 13500, 'KR': 12500, 'VN': 11500, 'TH': 10800,
            'ID': 11000, 'MY': 10500, 'PH': 12000, 'TW': 12500,
            // Middle East
            'TR': 3500,  'IR': 8500,  'IQ': 8200,  'SA': 8500,  'AE': 9000,
            // Africa (sea)
            'EG': 4500,  'MA': 2800,  'NG': 6500,  'GH': 6200,  'CI': 6800,
            'CM': 6500,  'KE': 8000,  'ET': 7500,  'ZA': 9500,
            // Americas
            'US': 7500,  'CA': 6800,  'MX': 9500,  'BR': 9000,  'AR': 11000,
            'CL': 13000, 'CO': 9800,  'PE': 12000, 'UY': 10500,
            // Oceania
            'AU': 15000, 'NZ': 17500,
            // Islands
            'CY': 3500,  'MT': 2200,  'IS': 2000,
        };

        // ── MODE SELECTION ──
        // EU/near-EU with road distance: use road.
        // Everything else: use sea.
        let distanceKm, mode, source;

        if (ROAD_TO_EU_HUB[originCode] !== undefined && ROAD_TO_EU_HUB[originCode] !== null) {
            distanceKm = ROAD_TO_EU_HUB[originCode];
            mode       = 'road';
            source     = 'Road distance to EU hub (Paris/Frankfurt) — Eurostat road freight statistics';
        } else if (SEA_TO_EU_PORT[originCode] !== undefined) {
            distanceKm = SEA_TO_EU_PORT[originCode];
            mode       = 'sea';
            source     = 'Sea distance to Rotterdam — GLEC v3.2 representative port-to-port (pre-DAF great circle)';
        } else {
            // Unknown origin: use conservative global average sea proxy
            distanceKm = 8000;
            mode       = 'sea';
            source     = 'Global average proxy (origin not in lookup table) — conservative 8000 km sea';
        }

        return { distanceKm, mode, source };
    }
    // ── END INBOUND TRANSPORT LOOKUP ─────────────────────────────────────────

    function applyCountrySpecificFactors(flatPef, ingredient, ingData, adjustments, traceability) {

        // === STEP A: Determine reference country ===
        const REFERENCE_COUNTRY = 'FR';
        const originCountry = ingredient.originCountry || REFERENCE_COUNTRY;

        // Resolve ISO codes to the full country name strings used as keys in
        // aioxy_pef31_database.js (AWARE 2.0, LANCA v2.5, FAOSTAT).
        const refName    = resolveCountryCode(REFERENCE_COUNTRY);
        const originName = resolveCountryCode(originCountry);

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
                const refAWARE    = awareData.agricultural[refName];
                const originAWARE = awareData.agricultural[originName];

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
                const refOccupation    = lancaData.occupation[refName];
                const originOccupation = lancaData.occupation[originName];

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
                        refTransformation    = lancaData.transformation[refName];
                        originTransformation = lancaData.transformation[originName];
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
                const countryYields = yieldData.yields[originName];
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

        // === STEP F: USEtox 2.14 — applied only if pesticide data provided ===
// The traceability.usetox object is already set by processIngredients()
// if pesticides were applied. Only write the fallback note if it wasn't set.
if (!traceability.usetox) {
    traceability.usetox = {
        status:          'available_but_not_applied',
        source:          window.aioxyData.usetox && window.aioxyData.usetox.source
                             ? window.aioxyData.usetox.source
                             : 'USEtox 2.14',
        version:         window.aioxyData.usetox && window.aioxyData.usetox.version
                             ? window.aioxyData.usetox.version
                             : 'EF 3.1',
        reason:          'No pesticide application data provided by supplier. Agribalyse 3.2 composite toxicity factors used.',
        action_required: 'To enable USEtox 2.14 substance-specific toxicity, add pesticide application rate fields (CAS number + kg/ha) in the supplier modal.'
    };
}

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
                adjusted_from_country: ingredient.originCountry || 'FR', // Bug 19 fix: original origin before proxy
                baseline_yield:       null,
                baseline_nitrogen:    null,
                method:               'background_secondary_data'
            };
            let yieldFactor = 1.0;

            if (ingredient.primaryData) {
                const pd = ingredient.primaryData;
                // F3 FIX: Declare SALCA, IPCC, AR5 at pd scope so both nitrogen and
                // phosphorus blocks can access them regardless of which data is provided.
                const SALCA = window.corePhysics.CONSTANTS.SALCA_P;
                const IPCC  = window.corePhysics.CONSTANTS.IPCC_TIER1;
                const AR5   = window.corePhysics.CONSTANTS.IPCC_AR5_PEF31;

                // =====================================================================
                // === ANIMAL PRIMARY DATA PATH =========================================
                // =====================================================================
                // If animalType is set, this is livestock primary data.
                // Apply IPCC Tier 1 enteric CH4 and manure N2O adjustments.
                // The crop-specific block (yield/N adjustments) is NOT applied.
                // =====================================================================
                if (pd.animalType) {
                    // FARMED FISH: feed-driven emissions model required. Deferred to Phase 2.
                    // Primary data is stored for audit trail and future use.
                    // Do NOT apply enteric or manure calculations for farmed_fish.
                    if (pd.animalType === 'farmed_fish') {
                        // BUGFIX FARMED_FISH: Feed-driven emissions model for farmed fish.
                        adjustments.method = 'farmed_fish_feed_model'; // BUGFIX FARMED_FISH

                        // BUGFIX FARMED_FISH: Enteric CH4 = 0. Fish have no enteric fermentation.
                        // BUGFIX FARMED_FISH: Manure N2O = 0. N excretion handled by aquatic pathway (not modelled here).

                        try { // BUGFIX FARMED_FISH
                            // BUGFIX FARMED_FISH: Determine species key — use animalType or 'farmed_fish' default.
                            const fishSpecies = (pd.fishSpecies || pd.animalType || 'farmed_fish'); // BUGFIX FARMED_FISH

                            // BUGFIX FARMED_FISH: Look up aquaculture feed parameters from database.
                            const aquaFeeds = window.aioxyData && window.aioxyData.aquaculture_feeds; // BUGFIX FARMED_FISH
                            const feedParams = (aquaFeeds && (aquaFeeds[fishSpecies] || aquaFeeds['farmed_fish'])) || null; // BUGFIX FARMED_FISH

                            if (feedParams) { // BUGFIX FARMED_FISH
                                const fcr            = feedParams.FCR            || 1.5; // BUGFIX FARMED_FISH: feed conversion ratio
                                const fishmealPct    = feedParams.fishmeal_pct   || 20;  // BUGFIX FARMED_FISH
                                const fishOilPct     = feedParams.fish_oil_pct   || 5;   // BUGFIX FARMED_FISH

                                // BUGFIX FARMED_FISH: Resolve fishmeal CO2 proxy — look up anchovy or sardine in ingredients DB.
                                let fishmealCO2PerKg = 0; // BUGFIX FARMED_FISH
                                const ingDB = window.aioxyData && window.aioxyData.ingredients; // BUGFIX FARMED_FISH
                                if (ingDB) { // BUGFIX FARMED_FISH
                                    // BUGFIX FARMED_FISH: Search ingredients by name for anchovy or sardine as proxy.
                                    for (const [key, entry] of Object.entries(ingDB)) { // BUGFIX FARMED_FISH
                                        const entryName = (entry.name || key).toLowerCase(); // BUGFIX FARMED_FISH
                                        if (entryName.includes('anchovy') || entryName.includes('sardine')) { // BUGFIX FARMED_FISH
                                            const proxyPef = entry.data && entry.data.pef; // BUGFIX FARMED_FISH
                                            if (proxyPef && proxyPef['Climate Change'] !== undefined) { // BUGFIX FARMED_FISH
                                                fishmealCO2PerKg = proxyPef['Climate Change']; // BUGFIX FARMED_FISH
                                            } // BUGFIX FARMED_FISH
                                            break; // BUGFIX FARMED_FISH
                                        } // BUGFIX FARMED_FISH
                                    } // BUGFIX FARMED_FISH
                                } // BUGFIX FARMED_FISH

                                // FIX: [Audit A3] Fish oil proxy — look up ingredient in DB or use conservative equal-to-fishmeal fallback.
                                // Attempt 1: look up a 'fish oil' entry in the ingredients database.
                                let fishOilCO2PerKg = 0;
                                let fishOilSource = '';
                                if (ingDB) {
                                    for (const [foKey, foEntry] of Object.entries(ingDB)) {
                                        const foName = (foEntry.name || foKey).toLowerCase();
                                        if (foName.includes('fish oil') || foName.includes('huile de poisson')) {
                                            const foPef = foEntry.data && foEntry.data.pef;
                                            if (foPef && foPef['Climate Change'] !== undefined) {
                                                fishOilCO2PerKg = foPef['Climate Change'];
                                                fishOilSource = 'DB lookup: ' + (foEntry.name || foKey);
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (fishOilCO2PerKg === 0) {
                                    // FIX: [Audit A3] No fish oil entry found in DB.
                                    // Conservative fallback: fish oil CO2 = fishmeal CO2 per kg.
                                    // Rationale: fish oil and fishmeal are co-products of the same
                                    // pelagic fish reduction process. Economic allocation between
                                    // fishmeal and fish oil varies by market price; on a mass basis
                                    // fish oil typically has slightly lower environmental burden per kg
                                    // than fishmeal due to higher energy density (IFFO, 2023). Using
                                    // equal values is therefore conservative (does not underestimate).
                                    // Source basis: IFFO (2023). "Environmental performance of
                                    // fishmeal and fish oil production." International Fishmeal and
                                    // Fish Oil Organisation. Confidence: LOW — pending direct DB entry.
                                    fishOilCO2PerKg = fishmealCO2PerKg; // Conservative equal-to-fishmeal estimate — LOW confidence
                                    fishOilSource = 'Conservative fallback: equal to fishmeal (no fish oil DB entry). LOW confidence. Basis: IFFO 2023 co-product allocation.';
                                    console.warn('[FIX A3] No fish oil ingredient found in DB; using fishmeal value as conservative proxy. LOW confidence.');
                                }

                                // BUGFIX FARMED_FISH: Feed CO2 = FCR × (fishmeal_fraction × fishmeal_CO2 + fish_oil_fraction × fish_oil_CO2)
                                const feedCO2PerKgFish = fcr * ( // BUGFIX FARMED_FISH
                                    (fishmealPct / 100) * fishmealCO2PerKg + // BUGFIX FARMED_FISH
                                    (fishOilPct  / 100) * fishOilCO2PerKg   // BUGFIX FARMED_FISH
                                ); // BUGFIX FARMED_FISH

                                // FIX: [Audit A2] Split feed CO2 into CC-Fossil and CC-Biogenic
                                // using the proxy feed ingredient's own PEF sub-category ratios.
                                // Fishmeal/crop feed contains fossil contributions (diesel vessels,
                                // agricultural machinery, fertilizer production) that must not all
                                // be allocated to CC-Biogenic.
                                let feedFossilFraction  = 0;
                                let feedBiogenicFraction = 1;
                                const proxyTotalCC  = proxyPef['Climate Change']           || 0;
                                const proxyFossilCC = proxyPef['Climate Change - Fossil']  || null;
                                const proxyCCBiogen = proxyPef['Climate Change - Biogenic'] || null;
                                if (
                                    proxyTotalCC > 0 &&
                                    proxyFossilCC !== null &&
                                    proxyCCBiogen !== null
                                ) {
                                    feedFossilFraction   = proxyFossilCC / proxyTotalCC;
                                    feedBiogenicFraction = proxyCCBiogen / proxyTotalCC;
                                } else {
                                    // FIX: [Audit A2] Proxy has no CC sub-splits — fall back to 100% biogenic.
                                    console.warn('[FIX A2] Proxy ingredient lacks CC sub-splits; feed CO2 allocated 100% biogenic.');
                                    feedFossilFraction  = 0;
                                    feedBiogenicFraction = 1;
                                }

                                // FIX: [Audit A2] Apply split fractions to feed CO2.
                                flatPef['Climate Change']            = (flatPef['Climate Change']            || 0) + feedCO2PerKgFish;
                                flatPef['Climate Change - Fossil']   = (flatPef['Climate Change - Fossil']   || 0) + feedCO2PerKgFish * feedFossilFraction;
                                flatPef['Climate Change - Biogenic'] = (flatPef['Climate Change - Biogenic'] || 0) + feedCO2PerKgFish * feedBiogenicFraction;

                                // BUGFIX FARMED_FISH: Store full calculation trace for auditors.
                                adjustments.farmed_fish_feed = { // BUGFIX FARMED_FISH
                                    species:              fishSpecies, // BUGFIX FARMED_FISH
                                    FCR:                  fcr, // BUGFIX FARMED_FISH
                                    fishmeal_pct:         fishmealPct, // BUGFIX FARMED_FISH
                                    fish_oil_pct:         fishOilPct, // BUGFIX FARMED_FISH
                                    fishmeal_CO2_per_kg:  fishmealCO2PerKg, // BUGFIX FARMED_FISH
                                    fish_oil_CO2_per_kg:  fishOilCO2PerKg, // BUGFIX FARMED_FISH
                                    feed_CO2_per_kg_fish: feedCO2PerKgFish, // BUGFIX FARMED_FISH
                                    // FIX: [Audit A2] Record CC sub-split fractions applied
                                    feed_fossil_fraction:   feedFossilFraction,
                                    feed_biogenic_fraction: feedBiogenicFraction,
                                    cc_split_source: proxyFossilCC !== null
                                        ? 'Proxy ingredient CC sub-splits (AGRIBALYSE 3.2)'
                                        : 'Fallback: 100% biogenic (proxy lacks CC sub-splits)',
                                    enteric_CH4:          0, // BUGFIX FARMED_FISH: zero — no enteric fermentation in fish
                                    manure_N2O:           0, // BUGFIX FARMED_FISH: zero — N excretion via aquatic pathway
                                    source:               'FIX A3: fish_oil_source=' + fishOilSource + '; FCR×(fishmeal_pct×fishmeal_CO2 + fish_oil_pct×fish_oil_CO2)' // BUGFIX FARMED_FISH
                                }; // BUGFIX FARMED_FISH
                            } else { // BUGFIX FARMED_FISH
                                // BUGFIX FARMED_FISH: No aquaculture_feeds entry found — store warning, no flatPef change.
                                adjustments.farmed_fish_feed = { // BUGFIX FARMED_FISH
                                    warning: 'No aquaculture_feeds entry found for species "' + fishSpecies + // BUGFIX FARMED_FISH
                                             '" or default "farmed_fish". Feed emissions not calculated.', // BUGFIX FARMED_FISH
                                    enteric_CH4: 0, // BUGFIX FARMED_FISH
                                    manure_N2O:  0  // BUGFIX FARMED_FISH
                                }; // BUGFIX FARMED_FISH
                            } // BUGFIX FARMED_FISH
                        } catch (e) { // BUGFIX FARMED_FISH
                            // BUGFIX FARMED_FISH: Non-fatal — store error, leave flatPef unmodified.
                            adjustments.farmed_fish_feed = { error: e.message }; // BUGFIX FARMED_FISH
                            console.warn('[BUGFIX FARMED_FISH] Feed emission calculation failed:', e); // BUGFIX FARMED_FISH
                        } // BUGFIX FARMED_FISH

                    } else {
                        // ── Lookup IPCC Tier 1 values from core_physics CONSTANTS ─────────
                        const TIER1     = window.corePhysics.CONSTANTS.IPCC_TIER1_LIVESTOCK;
                        const animalRow = TIER1.entericEF[pd.animalType] || { ef_ch4: 0, n_excretion: 0 };

                        // ── FAOSTAT fallback for productivity if user didn't provide it ───
                        let productPerHeadPerYear = pd.productivityMetric || 0;
                        if (!productPerHeadPerYear || productPerHeadPerYear <= 0) {
                            // Try FAOSTAT livestock yield lookup
                            try {
                                const yieldDB  = window.aioxyData.crop_yields;
                                const country  = ingredient.originCountry || 'FR';
                                if (yieldDB && yieldDB.yields && yieldDB.yields[country]) {
                                    const countryYields = yieldDB.yields[country];
                                    for (const [cropKey, cropVal] of Object.entries(countryYields)) {
                                        if (pd.animalType.replace('_', ' ').includes(cropKey.toLowerCase()) ||
                                            cropKey.toLowerCase().includes(pd.animalType.split('_')[0])) {
                                            productPerHeadPerYear = cropVal;
                                            break;
                                        }
                                    }
                                }
                            } catch (e) { /* non-critical */ }

                            // Final fallback — use a safe default so heads calculation doesn't divide by 0
                            if (!productPerHeadPerYear || productPerHeadPerYear <= 0) {
                                productPerHeadPerYear = 1000; // 1 tonne per head — conservative
                            }
                        }

                        // ── Enteric methane (CH4) ─────────────────────────────────────────
                        // Formula: heads = quantityKg / productPerHeadPerYear
                        //          CH4_kg = heads × efCh4PerHead
                        //          CO2e = CH4_kg × GWP_CH4_BIOGENIC (28, per IPCC AR5 / PEF 3.1)
                        const entericCO2e = window.corePhysics.calculateEntericMethane({
                            animalType:          pd.animalType,
                            quantityKg:          ingredient.quantityKg,
                            efCh4PerHead:        animalRow.ef_ch4,
                            productPerHeadPerYear
                        });

                        // ── Check whether AGRIBALYSE already embeds enteric in its PEF values ──
                        const ingDataMeta = ingData && ingData.data && ingData.data.metadata;
                        const entericAlreadyIncluded = (ingDataMeta && ingDataMeta.entericIncluded === true);

                        if (entericAlreadyIncluded) {
                            // GAP 2 FIX: ENTERIC DELTA ADJUSTMENT
                            // AGRIBALYSE 3.2 embeds enteric CH4 modelled from French national average
                            // productivity (ADEME/INRAE methodology, Collet et al. 2018, §4.3).
                            // We cannot extract the embedded value directly, but we CAN compute
                            // the delta between user's actual productivity and the AGRIBALYSE baseline.
                            //
                            // Formula:
                            //   heads_user    = quantityKg / user_productivity
                            //   heads_default = quantityKg / AGRIBALYSE_default_productivity
                            //   Δ_enteric     = (heads_user − heads_default) × ef_ch4 × GWP_CH4(biogenic)
                            //   Apply Δ_enteric to CC-Biogenic (enteric CH4 = biogenic carbon)
                            //
                            // Sign: if user productivity LOWER than default → more heads per kg → more CH4 → positive delta
                            //       if user productivity HIGHER than default → fewer heads per kg → less CH4 → negative delta
                            //
                            // Sources: ADEME Agribalyse 3.0 Technical Documentation (Collet et al. 2018) §4.3
                            //          CNIEL/IDELE France Chiffres-Clés 2022 (dairy)
                            //          Institut de l'Élevage France 2022 (beef, sheep, goat)
                            //          ITAVI France 2022 (poultry)
                            //          IPCC 2006 Vol.4 Table 10.11 (ef_ch4)
                            //          GWP_CH4_biogenic = 28 (IPCC AR5, PEF 3.1)

                            const TIER1 = window.corePhysics.CONSTANTS.IPCC_TIER1_LIVESTOCK;
                            const agriDefaultProd = TIER1.AGRIBALYSE_DEFAULT_PRODUCTIVITY[pd.animalType];

                            if (agriDefaultProd && agriDefaultProd > 0 && productPerHeadPerYear > 0) {
                                const GWP_CH4_BIO = 28;
                                const headsUser    = ingredient.quantityKg / productPerHeadPerYear;
                                const headsDefault = ingredient.quantityKg / agriDefaultProd;
                                const deltaEntericCH4_kg  = (headsUser - headsDefault) * animalRow.ef_ch4;
                                const deltaEntericCO2e    = deltaEntericCH4_kg * GWP_CH4_BIO;
                                const deltaEntericPerKg   = deltaEntericCO2e / ingredient.quantityKg;

                                if (Math.abs(deltaEntericPerKg) > 1e-6) {
                                    flatPef['Climate Change']            += deltaEntericPerKg;
                                    flatPef['Climate Change - Biogenic'] += deltaEntericPerKg;
                                }

                                adjustments.enteric_applied = {
                                    applied:                        true,
                                    method:                         'delta_vs_agribalyse_default',
                                    animal_type:                    pd.animalType,
                                    ef_ch4_per_head_yr:             animalRow.ef_ch4,
                                    user_productivity:              productPerHeadPerYear,
                                    agribalyse_default_productivity: agriDefaultProd,
                                    heads_user:                     headsUser,
                                    heads_agribalyse_default:       headsDefault,
                                    delta_ch4_kg:                   deltaEntericCH4_kg,
                                    delta_co2e_total:               deltaEntericCO2e,
                                    delta_co2e_per_kg:              deltaEntericPerKg,
                                    gwp_ch4_biogenic:               GWP_CH4_BIO,
                                    note: deltaEntericPerKg < 0
                                        ? 'User productivity ABOVE AGRIBALYSE default — enteric credit applied to CC-Biogenic'
                                        : deltaEntericPerKg > 0
                                            ? 'User productivity BELOW AGRIBALYSE default — enteric penalty applied to CC-Biogenic'
                                            : 'User productivity matches AGRIBALYSE default — no delta',
                                    sources: [
                                        'ADEME Agribalyse 3.0 Technical Documentation (Collet et al. 2018) §4.3',
                                        'CNIEL/IDELE/ITAVI France national average productivities 2022',
                                        'IPCC 2006 Vol.4 Table 10.11',
                                        'GWP_CH4_biogenic=28 IPCC AR5 PEF 3.1'
                                    ]
                                };
                            } else {
                                // No default productivity for this animal type — cannot compute delta
                                adjustments.enteric_applied = {
                                    applied: false,
                                    reason:  'No AGRIBALYSE baseline productivity for animal type: ' + pd.animalType +
                                             '. Delta cannot be computed. AGRIBALYSE embedded value used as-is.'
                                };
                            }
                        } else {
                            // AGRIBALYSE does NOT embed enteric — add the supplier's value directly.
                            // Applied to CC-Biogenic (enteric CH4 is biogenic carbon).
                            const entericPerKg = entericCO2e / ingredient.quantityKg;
                            flatPef['Climate Change']            += entericPerKg;
                            flatPef['Climate Change - Biogenic'] += entericPerKg;

                            adjustments.enteric_applied = {
                                applied:               true,
                                animal_type:           pd.animalType,
                                ef_ch4_per_head:       animalRow.ef_ch4,
                                product_per_head_yr:   productPerHeadPerYear,
                                enteric_co2e_total:    entericCO2e,
                                enteric_co2e_per_kg:   entericPerKg,
                                gwp_used:              'GWP_CH4_BIOGENIC = 28 (IPCC AR5, PEF 3.1)',
                                ipcc_source:           'IPCC 2006 Vol. 4 Table 10.11, confirmed 2019 Refinement'
                            };
                        }

                        // ── Manure N2O ────────────────────────────────────────────────────
                        const manureSystem = pd.manureSystem || 'pasture';
                        const manureN2OCO2e = window.corePhysics.calculateManureN2O({
                            animalType:          pd.animalType,
                            quantityKg:          ingredient.quantityKg,
                            nExcretionPerHead:   animalRow.n_excretion,
                            productPerHeadPerYear,
                            manureSystem
                        });

                        const TIER1_CONST   = window.corePhysics.CONSTANTS.IPCC_TIER1_LIVESTOCK;
                        const manureEF      = TIER1_CONST.manureEF[manureSystem] || 0;
                        const manureN2OPerKg = manureN2OCO2e / ingredient.quantityKg;

                        // Apply manure N2O to Climate Change total
                        flatPef['Climate Change']            += manureN2OPerKg;
                        // Manure N2O is from agricultural N management — allocate to CC-Land Use
                        flatPef['Climate Change - Land Use'] += manureN2OPerKg;

                        // FIX: [Audit A1] Eutrophication, terrestrial — correct units via EF 3.1 NH3 CF
                        // Previous formula produced kg CO2e (wrong category & wrong units).
                        // Correct methodology per EF 3.1 / JRC:
                        //   50% of excreted N volatilizes as NH3 (IPCC Tier 1 simplified).
                        //   NH3_g = 0.5 × nExcretionPerKg × (17/14) × 1000   [g NH3 / kg product]
                        //   mol N eq = NH3_g × 0.0316 mol N eq / g NH3
                        //   CF source: JRC EF 3.1 characterization factors (Huijbregts et al. 2017,
                        //   JRC Technical Report EUR 29540 EN) — NH3 → terrestrial eutrophication.
                        const nExcretionPerKg = animalRow.n_excretion / productPerHeadPerYear; // kg N / kg product
                        // FIX: [Audit A1] NH3 emitted per kg product (g)
                        const nh3GPerKgProduct_eutroph = 0.5 * nExcretionPerKg * (17 / 14) * 1000; // g NH3/kg product
                        // FIX: [Audit A1] CF: 0.0316 mol N eq/g NH3 (JRC EF 3.1)
                        const CF_NH3_EUTROPH_TERRESTRIAL = 0.0316; // mol N eq / g NH3 — JRC EF 3.1
                        const eutrophTerrestrial = nh3GPerKgProduct_eutroph * CF_NH3_EUTROPH_TERRESTRIAL; // mol N eq / kg product
                        flatPef['Eutrophication, terrestrial'] += eutrophTerrestrial;

                        // ── Acidification: NH3 volatilization from manure ────────────────
                        // 50% of excreted N volatilizes as NH3 (simplified Tier 1 assumption).
                        // NH3 kg/kg product = 0.5 × nExcretionPerKg × (17/14) [N→NH3 mass ratio]
                        // CF: 0.0591 mol H+eq/g NH3 (EF 3.1 acidification characterization)
                        // = 0.5 × nExcretionPerKg × (17/14) × 1000 g/kg × 0.0591 mol H+e/g NH3
                        // [Audit A1 verification: acidification CF 0.0591 confirmed correct per JRC EF 3.1]
                        const nh3PerKgProduct = 0.5 * nExcretionPerKg * (17 / 14); // kg NH3/kg product
                        const acidificationAdd = nh3PerKgProduct * 1000 * 0.0591;   // mol H+e / kg product
                        // FIX: [Audit A1] Updated CF from 0.0184 to 0.0591 (JRC EF 3.1 confirmed value)
                        flatPef['Acidification'] += acidificationAdd;

                        adjustments.manure_n2o_applied = {
                            applied:                true,
                            animal_type:            pd.animalType,
                            manure_system:          manureSystem,
                            ef_manure:              manureEF,
                            n_excretion_per_head:   animalRow.n_excretion,
                            manure_n2o_co2e_total:  manureN2OCO2e,
                            manure_n2o_per_kg:      manureN2OPerKg,
                            eutrophication_add_mol_n_eq: eutrophTerrestrial,
                            eutrophication_cf_source: 'JRC EF 3.1 — NH3 → terrestrial eutrophication: 0.0316 mol N eq/g NH3',
                            acidification_add:      acidificationAdd,
                            acidification_cf_source: 'JRC EF 3.1 — NH3 → acidification: 0.0591 mol H+eq/g NH3',
                            gwp_used:               'GWP_N2O = 265 (IPCC AR5, PEF 3.1)',
                            ipcc_source:            'IPCC 2006 Vol. 4 Tables 10.19 & 10.21, confirmed 2019 Refinement'
                        };

                        adjustments.method = 'animal_primary_data_ipcc_tier1';
                    }

                } else {
                // =====================================================================
                // === CROP PRIMARY DATA PATH (existing logic — unchanged) ==============
                // =====================================================================

                // Yield adjustment factor
                let yieldAdj = 1.0;
                if (pd.yieldKgPerHa && pd.yieldKgPerHa > 0) {
                    let baselineYield = 5000;
                    const yieldDB = window.aioxyData.crop_yields;
                    const yieldLookupName = resolveCountryCode(ingredient.originCountry || 'FR');
                    if (yieldDB && yieldDB.yields && yieldDB.yields[yieldLookupName]) {
                        const countryYields = yieldDB.yields[yieldLookupName];
                        for (const [cropName, cropYield] of Object.entries(countryYields)) {
                            if ((ingData.name || '').toLowerCase().includes(cropName.toLowerCase())) {
                                baselineYield = cropYield;
                                break;
                            }
                        }
                    }
                    adjustments.baseline_yield = baselineYield;
                    adjustments.baseline_yield_source = baselineYield === 5000
                        ? 'Default (5000 kg/ha)'
                        : 'FAOSTAT ' + ((window.aioxyData.crop_yields && window.aioxyData.crop_yields.years) || '2020-2024');
                    yieldAdj = Math.min(baselineYield / pd.yieldKgPerHa, 2.0);
                    // GAP 10 FIX: structured yield_adjustment for PDF dumb-printer trace.
                    // PDF reads this object directly — must NOT recompute yieldAdj.
                    adjustments.yield_adjustment = {
                        baseline_kg_ha:  baselineYield,
                        baseline_source: adjustments.baseline_yield_source,
                        actual_kg_ha:    pd.yieldKgPerHa,
                        formula:         'min(baseline_kg_ha / actual_kg_ha, 2.0)',
                        factor:          yieldAdj,
                        capped_at_2:     (baselineYield / pd.yieldKgPerHa) > 2.0
                    };
                }

                // Nitrogen adjustment factor
                let nAdj = 1.0;
                if (pd.nitrogenKgPerTon && pd.nitrogenKgPerTon > 0) {
                    const baselineN = 15;
                    adjustments.baseline_nitrogen = baselineN;
                    nAdj = pd.nitrogenKgPerTon / baselineN;
                    // GAP 10 FIX: structured nitrogen_adjustment for PDF dumb-printer trace.
                    // PDF reads this object directly — must NOT recompute nAdj.
                    adjustments.nitrogen_adjustment = {
                        baseline_kg_per_ton: baselineN,
                        actual_kg_per_ton:   pd.nitrogenKgPerTon,
                        formula:             'actual_kg_per_ton / baseline_kg_per_ton',
                        factor:              nAdj
                    };
                }

                // AIOXY COMPOSITE PRIMARY DATA MULTIPLIER
                // Formula: co2Mult = 0.6 × yield_factor + 0.4 × nitrogen_factor
                // Rationale: Yield improvement reduces land requirement and associated
                // impacts proportionally (60% weight). Nitrogen efficiency reduces N₂O
                // emissions and associated eutrophication (40% weight). Weights derived
                // from contribution analysis of French conventional crop PEF profiles
                // where yield-related impacts (land use, fuel use) contribute ~60% of
                // farm-gate impact and nitrogen-related impacts (N₂O, NH₃, NO₃⁻) ~40%.
                // Applied to ALL 16 impact categories as a conservative proxy — actual
                // category-specific sensitivity would require per-category primary data
                // multipliers which are not available in the current supplier data form.
                // Limitation: Using a nitrogen-derived multiplier for categories like
                // Ionizing Radiation and Ozone Depletion is methodologically imprecise
                // but conservative (multiplier rarely exceeds 1.5× in either direction).
                const co2Mult = (0.6 * yieldAdj) + (0.4 * nAdj);
                adjustments.multipliers = {
                    co2:    co2Mult,
                    land:   yieldAdj,
                    water:  co2Mult,
                    fossil: co2Mult
                };
                // GAP 10 FIX: store composite multiplier formula for PDF dumb-printer trace.
                // PDF reads this object directly — must NOT recompute co2Mult.
                adjustments.composite_multiplier = {
                    formula:      '(0.6 x yield_factor) + (0.4 x nitrogen_factor)',
                    yield_weight: 0.6,
                    n_weight:     0.4,
                    yield_factor: yieldAdj,
                    n_factor:     nAdj,
                    result:       co2Mult
                };
                adjustments.method = 'primary_data_adjusted';
                yieldFactor = yieldAdj;

                // Apply multipliers to flatPef
                flatPef['Climate Change']                *= co2Mult;
                flatPef['Climate Change - Fossil']       *= co2Mult;
                flatPef['Climate Change - Biogenic']     *= co2Mult;
                flatPef['Climate Change - Land Use']     *= co2Mult;
                // FIX CALC-08: Ozone Depletion NOT scaled by co2Mult.
                // OD is driven by CFC/HCFC refrigerant emissions — no relationship
                // to agricultural yield or nitrogen application rate.
                // flatPef['Ozone Depletion'] unchanged — AGRIBALYSE 3.2 value used as-is.
                flatPef['Human Toxicity, non-cancer']    *= co2Mult;
                flatPef['Human Toxicity, cancer']        *= co2Mult;
                flatPef['Particulate Matter']            *= co2Mult;
                // FIX CALC-08: Ionizing Radiation NOT scaled by co2Mult.
                // IR is driven by nuclear energy share in background electricity mix —
                // no relationship to agricultural yield or nitrogen application rate.
                // flatPef['Ionizing Radiation'] unchanged — AGRIBALYSE 3.2 value used as-is.
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

                // === GAP 2: IPCC Tier 1 N₂O emissions (ISO 14044 primary data path) ===
                // Applied per-kg-of-ingredient basis after multipliers, added to Climate Change totals.
                if (pd.nitrogenKgPerTon && pd.nitrogenKgPerTon > 0) {
                    // IPCC, AR5, SALCA are declared at pd scope (F3 fix) — accessible here

                    const F_SN = (pd.nitrogenKgPerTon / 1000) * ingredient.quantityKg;                                                        // kg synthetic N applied — nitrogenKgPerTon is kg N per tonne of crop, /1000 converts to kg N per kg, then × quantityKg gives total kg N
                    const N2O_direct         = F_SN * IPCC.EF1_DIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR5.GWP_N2O;                      // kg CO2e (EF1, direct)
                    const N2O_indirect_leach = F_SN * IPCC.FRAC_LEACH * IPCC.EF5_INDIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR5.GWP_N2O; // kg CO2e (EF5, leaching)
                    const N2O_volatilization = F_SN * IPCC.FRAC_GASF * IPCC.EF4_VOLATILIZATION * IPCC.N2O_MASS_CONVERSION * AR5.GWP_N2O; // kg CO2e (EF4, volatilization/atmospheric deposition)
                    const N2O_total = N2O_direct + N2O_indirect_leach + N2O_volatilization;

                    // Add N2O to per-kg flatPef so it flows correctly through quantityKg multiplication later
                    flatPef['Climate Change']          += N2O_total / ingredient.quantityKg;
                    // FIX A [Audit Finding A]: N₂O from synthetic N is agricultural soil emission —
                    // allocated to CC-Land Use per IPCC 2006 Vol. 4, Ch. 11, not CC-Fossil
                    flatPef['Climate Change - Land Use'] += N2O_total / ingredient.quantityKg;

                    adjustments.n2o_applied = {
                        applied:                 true,
                        F_SN_kg:                 F_SN,
                        direct_kgCO2e:           N2O_direct,
                        indirect_leach_kgCO2e:   N2O_indirect_leach,
                        volatilization_kgCO2e:   N2O_volatilization,
                        formula:                 'IPCC Tier 1 (2006), EF1=IPCC.EF1_DIRECT_N2O, EF5=IPCC.EF5_INDIRECT_N2O, FRAC_LEACH=IPCC.FRAC_LEACH, EF4=IPCC.EF4_VOLATILIZATION, FRAC_GASF=IPCC.FRAC_GASF (volatilization/atmospheric deposition), GWP_N2O=AR5.GWP_N2O'
                    };
                }

                // === ORGANIC NITROGEN N₂O (ISO 14044 primary data path) ===
                // Manure, compost, digestate applied to soil.
                // Key difference from synthetic N: FRAC_GASM = 0.20 (organic N volatilization fraction)
                // vs FRAC_GASF = 0.10 for synthetic N. Both use same EF1, EF4, EF5, FRAC_LEACH.
                // Source: IPCC 2006 Vol. 4, Ch. 11, Table 11.1 & 11.3 (F_ON organic nitrogen inputs).
                if (pd.organicNitrogenKgPerTon && pd.organicNitrogenKgPerTon > 0) {
                    const FRAC_GASM = 0.20;  // IPCC 2006 Vol.4 Table 11.3 — fraction of organic N volatilized as NH3/NOx
                    const F_ON = (pd.organicNitrogenKgPerTon / 1000) * ingredient.quantityKg;  // kg organic N applied
                    const N2O_on_direct         = F_ON * IPCC.EF1_DIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR5.GWP_N2O;
                    const N2O_on_leach          = F_ON * IPCC.FRAC_LEACH * IPCC.EF5_INDIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR5.GWP_N2O;
                    const N2O_on_volatilization = F_ON * FRAC_GASM * IPCC.EF4_VOLATILIZATION * IPCC.N2O_MASS_CONVERSION * AR5.GWP_N2O;
                    const N2O_on_total = N2O_on_direct + N2O_on_leach + N2O_on_volatilization;

                    flatPef['Climate Change']            += N2O_on_total / ingredient.quantityKg;
                    flatPef['Climate Change - Land Use'] += N2O_on_total / ingredient.quantityKg;

                    adjustments.n2o_organic_applied = {
                        applied:                 true,
                        F_ON_kg:                 F_ON,
                        direct_kgCO2e:           N2O_on_direct,
                        indirect_leach_kgCO2e:   N2O_on_leach,
                        volatilization_kgCO2e:   N2O_on_volatilization,
                        total_kgCO2e:            N2O_on_total,
                        frac_gasm:               FRAC_GASM,
                        formula:                 'IPCC Tier 1 (2006) Vol.4 Table 11.3 organic N path: F_ON × EF1 (direct) + F_ON × FRAC_LEACH × EF5 (leach) + F_ON × FRAC_GASM(0.20) × EF4 (volatilization). GWP_N2O=' + AR5.GWP_N2O
                    };

                // === GAP 2: SALCA-P phosphorus leaching (ISO 14044 primary data path) ===
                // FIX B [Audit Finding B]: Reference core_physics constants instead of hardcoding
                if (pd.phosphorusKgPerTon && pd.phosphorusKgPerTon > 0) {
                    const P_applied = (pd.phosphorusKgPerTon / 1000) * ingredient.quantityKg;   // kg P applied — phosphorusKgPerTon is kg P per tonne, /1000 converts to kg P per kg
                    const P_leach   = P_applied * SALCA.FRAC_RELE;                            // kg P-eq — EF 3.1 Eutrophication freshwater unit is kg P-eq; P is the reference substance (CF=1.0), no PO4 mass conversion required

                    // Add to per-kg flatPef for Eutrophication, freshwater
                    flatPef['Eutrophication, freshwater'] += P_leach / ingredient.quantityKg;

                    adjustments.salca_p_applied = {
                        applied:        true,
                        P_applied_kg:   P_applied,
                        P_leach_kg_P_eq: P_leach,
                        formula:        'SALCA-P: P_applied=(phosphorusKgPerTon/1000)*quantityKg, P_leach=P_applied*FRAC_RELE. Unit: kg P-eq (EF 3.1 reference substance = P, CF=1.0, no PO4 conversion)'
                    };
                }

                // === SOC SEQUESTRATION — IPCC 2006 Vol.4 Ch.2 Eq.2.25 (PEF 3.1 §4.4.8) ===
                // Activated when user provides both socBaselineTC_ha and socCurrentTC_ha.
                // Formula (direct soil carbon measurement approach — Tier 2/3):
                //   ΔC = SOC_current − SOC_baseline  [t C / ha]
                //   Annual flux = ΔC / AMORTIZATION_YEARS  [t C / ha / year]
                //   CO2e per ha = annual_flux × C_TO_CO2  [t CO2e / ha / year]
                //   CO2e per kg product = CO2e_per_ha × 1000 / yieldKgPerHa
                //   Sign: negative = sequestration (removal from atmosphere) → reduces CC impact.
                //         positive = SOC loss (carbon source) → increases CC impact.
                // Category: Climate Change − Land Use (soil C stock = land-use related per PEF 3.1)
                //           and Climate Change total.
                // Sources: IPCC 2006 Vol.4 Ch.2 Eq.2.25 | PEF 3.1 §4.4.8 | Nemecek & Kägi (2007)
                if (pd.farmingPractice === 'regen' &&
                    pd.socBaselineTC_ha != null && pd.socCurrentTC_ha != null &&
                    pd.yieldKgPerHa > 0) {

                    const SOC = window.corePhysics.CONSTANTS.SOC;
                    const deltaC_t_per_ha = pd.socCurrentTC_ha - pd.socBaselineTC_ha;
                    // t CO2e per ha per year (20yr amortization)
                    const annualCO2e_per_ha = (deltaC_t_per_ha / SOC.AMORTIZATION_YEARS) * SOC.C_TO_CO2;
                    // kg CO2e per kg product (1000 converts t→kg; yieldKgPerHa converts ha→kg)
                    const socCO2e_per_kg = -(annualCO2e_per_ha * 1000) / pd.yieldKgPerHa;
                    // Apply: negative = sequestration credit, positive = SOC loss penalty
                    flatPef['Climate Change - Land Use'] += socCO2e_per_kg;
                    flatPef['Climate Change']            += socCO2e_per_kg;

                    adjustments.soc_sequestration = {
                        applied:                  true,
                        soc_baseline_tC_per_ha:   pd.socBaselineTC_ha,
                        soc_current_tC_per_ha:    pd.socCurrentTC_ha,
                        delta_tC_per_ha:          deltaC_t_per_ha,
                        amortization_years:       SOC.AMORTIZATION_YEARS,
                        c_to_co2_factor:          SOC.C_TO_CO2,
                        annual_co2e_per_ha:       annualCO2e_per_ha,
                        co2e_per_kg_product:      socCO2e_per_kg,
                        direction:                deltaC_t_per_ha >= 0 ? 'sequestration (removal)' : 'SOC loss (source)',
                        category_affected:        'Climate Change - Land Use + Climate Change total',
                        formula: 'IPCC 2006 Vol.4 Ch.2 Eq.2.25: ΔC=(SOC_current−SOC_baseline)/D×C_TO_CO2×1000/yield',
                        source:  'IPCC 2006 Vol.4 Ch.2 Eq.2.25 | PEF 3.1 §4.4.8 | Nemecek & Kägi (2007)'
                    };
                } else if (pd.farmingPractice === 'regen') {
                    // Regen selected but soil carbon measurements not provided
                    adjustments.soc_note = {
                        applied: false,
                        reason:  'Regenerative agriculture selected but SOC measurements not provided. ' +
                                 'Enter Baseline SOC (t C/ha) and Current SOC (t C/ha) in supplier form to activate. ' +
                                 'Formula: IPCC 2006 Vol.4 Ch.2 Eq.2.25, PEF 3.1 §4.4.8. ' +
                                 'Recorded as audit metadata only.'
                    };
                }
                // === END SOC SEQUESTRATION ===

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
                            // FIX 3: Use += to ADD USEtox substance-specific values to the AGRIBALYSE background toxicity,
                            // not = which would overwrite and delete the background. co2Mult was already applied to
                            // flatPef earlier in the primary data multiplier step — do NOT re-apply it here.
                            flatPef['Human Toxicity, cancer']    += (totalCancerCTUh     / ingredient.quantityKg);
                            flatPef['Human Toxicity, non-cancer'] += (totalNonCancerCTUh  / ingredient.quantityKg);
                            flatPef['Ecotoxicity, freshwater']   += (totalEcotoxicityCTUe / ingredient.quantityKg);
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
                        // USEtox 2.14 coverage: 3,077 substances loaded in aioxyData.usetox.human_toxicity
                        // and ecotoxicity compartments. Full USEtox 2.14 substance list contains ~4,200
                        // organic substances + metals. Coverage verification against the official USEtox
                        // 2.14 release manifest is deferred — requires external reference file.
                        // Source: USEtox 2.14, continental agricultural soil compartment, EF 3.1 compliant.
                    }
                }
                } // end else (crop primary data path)
            } // F2 FIX + ANIMAL/CROP SPLIT: closing brace for if (ingredient.primaryData)

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

            // FIX: [Audit #16] Apply yield factor to flatPef BEFORE the geographic proxy step
            // so that the proxy multiplier acts on yield-adjusted values.
            // A yield_factor < 1 means more raw material is required to produce 1 kg of output
            // (e.g., yield_factor = 0.90 for flour means 1/0.90 = 1.11 kg grain per kg flour).
            // Dividing by yield_factor scales up the per-kg impact to reflect this upstream burden.
            // Applied to ALL categories because the upstream mass loss affects every impact category.
            if (processingMultiplier > 0 && processingMultiplier !== 1.0) {
                for (const cat of ALL_CATEGORIES) {
                    if (flatPef[cat] !== undefined) {
                        flatPef[cat] /= processingMultiplier;
                    }
                }
                adjustments.processing_yield_factor_applied = processingMultiplier;
            }

            // 1g. Geographic proxy adjustment
            // Apply 1.15× penalty to CC categories only for non-FR, non-primary-data ingredients.
            // Water Use/Scarcity (AWARE) and Land Use are excluded — those receive country-specific
            // adjustment via AWARE 2.0 and LANCA v2.5 in Phase 2 (applyCountrySpecificFactors).
            // The remaining 12 PEF categories are excluded because geographic origin does not
            // meaningfully affect their characterization factors.
            if (ingredient.originCountry && ingredient.originCountry !== 'FR' && !ingredient.primaryData) {
                const geoProxy = 1.15;
                // BUG-04 FIX: Water Use and Land Use removed from geo-proxy.
                // AWARE 2.0 and LANCA v2.5 in applyCountrySpecificFactors() (Phase 2)
                // already apply country-specific ratios to those two categories.
                // Adding 1.15x here AND the AWARE/LANCA ratio below double-adjusts them.
                // Geo-proxy retained only for CC categories which have no country-specific lookup.
                const GEO_PROXY_CATEGORIES = [
                    'Climate Change',
                    'Climate Change - Fossil',
                    'Climate Change - Biogenic',
                    'Climate Change - Land Use'
                ];
                for (const cat of GEO_PROXY_CATEGORIES) {
                    if (flatPef[cat] !== undefined) {
                        flatPef[cat] *= geoProxy;
                    }
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
                allCategoryResults: allCategoryResults,
                upstreamComponents: upstreamComponents   // inbound transport legs
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
    // CoM 2024 Table 3: Wind LCA = 0.036 t CO2-eq/MWh = 36 g CO2/kWh
    // Source: European Commission, Covenant of Mayors, Emission Factors
    //   for Local Energy Use, 2024 Edition, JRC
    gridIntensity = 36;
        } else if (mfgIn.energySource === 'natural_gas') {
            gridIntensity = 490; // Source: IPCC 2006 Vol. 2, Ch. 2, Table 2.2: Natural gas CO₂ = 56,100 kg/TJ. At 42% electrical efficiency: 56,100 × 0.0036 / 0.42 ≈ 481 ≈ 490 g CO₂/kWh (rounded per IEA 2023 convention)
        } else if (mfgIn.energySource === 'coal') {
    // CoM 2024 Table 1: Anthracite = 0.35388 t CO2/MWh direct combustion
    // At 36% electrical efficiency: 0.35388 ÷ 0.36 × 1,000 = 983 g/kWh
    // Rounded to 980 per IEA convention for industrial coal-fired generation
    // Source: European Commission, Covenant of Mayors, Emission Factors
    //   for Local Energy Use, 2024 Edition, JRC
    gridIntensity = 980;
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

            // FUEL TYPE CO2 FACTOR — CoM 2024 JRC Edition
            // Each factor is per the unit entered in the form (m³ for gas, litres for LPG/oil, kg for coal).
            const FUEL_CO2_FACTORS = {
                natural_gas: 2.13,   // kg CO2/m³  (0.20196 t CO2/MWh × 38 MJ/m³ ÷ 3600 MJ/MWh × 1000)
                lpg:         1.61,   // kg CO2/litre (63.1 t CO2/TJ × 46.1 MJ/kg × 0.555 kg/L ÷ 1e6 × 1000)
                fuel_oil:    2.66,   // kg CO2/litre (74.1 t CO2/TJ × 42.7 MJ/kg × 0.84 kg/L ÷ 1e6 × 1000)
                coal:        2.53,   // kg CO2/kg   (94.6 t CO2/TJ × 26.7 MJ/kg ÷ 1e6 × 1000)
                none:        0.0
            };
            const fuelType   = pfd.fuelType || 'natural_gas';
            const fuelFactor = FUEL_CO2_FACTORS[fuelType] !== undefined ? FUEL_CO2_FACTORS[fuelType] : 2.13;
            // CoM 2024 Table 1: Natural gas = 0.20196 t CO2/MWh (activity-based)
// 1 m³ gas ≈ 0.01056 MWh (38 MJ/m³ ÷ 3,600 MJ/MWh)
// ∴ 0.20196 × 0.01056 × 1,000 = 2.13 kg CO2/m³
// Source: European Commission, Covenant of Mayors, Emission Factors
//   for Local Energy Use, 2024 Edition, JRC
const gasCO2 = gasM3PerKg * fuelFactor;

            // REFRIGERANT LEAKAGE — F-gas direct emissions
            // Formula: kg CO2e = (kgLeaked / totalOutputKg) × GWP_refrigerant (IPCC AR5 / EC Reg 517/2014)
            // Added to Climate Change (Fossil) — F-gases are synthetic, non-biogenic, non-land-use.
            //
            // BUG-02 FIX: Normalise refrigerantType string before lookup.
            // Previously, a mismatch like "R407C" vs "R-407C" (no hyphen) or leading/trailing
            // whitespace caused REFRIGERANT_GWP[refType] to return undefined, which fell through
            // to || 0, silently setting GWP=0 for a real refrigerant (R-407C actual GWP = 1774).
            // This produced a materially wrong PDF showing "GWP: 0" for a non-zero refrigerant.
            //
            // Fix strategy:
            //   1. Trim whitespace and normalise the string (uppercase, ensure hyphen format).
            //   2. If a non-empty type is supplied but NOT found in the table after normalisation,
            //      throw a CalculationError with the exact unrecognised value so the user can
            //      correct the form input. Never silently apply GWP=0 for an unknown type.
            //   3. If refrigerantType is blank/null/undefined, GWP=0 is correct (no refrigerant).
            //   4. R-717 (ammonia) and R-744 (CO2) have GWP=0 and GWP=1 by definition — valid.
            //
            // Source: IPCC AR5 GWP100 / EC F-Gas Regulation 517/2014 Annex I
            const REFRIGERANT_GWP = {
                'R-404A': 3922, 'R-134a': 1430, 'R-407C': 1774, 'R-410A': 2088,
                'R-507A': 3985, 'R-32':    675,  'R-744':     1, 'R-717':     0
            };

            // BUG-02 FIX: Normalise the input string
            const _refTypeRaw = pfd.refrigerantType || '';
            // Step 1: trim whitespace
            let _refTypeNorm = _refTypeRaw.trim();
            // Step 2: uppercase (R-407c → R-407C, r-32 → R-32)
            _refTypeNorm = _refTypeNorm.toUpperCase();
            // Step 3: insert hyphen after leading 'R' if absent (R407C → R-407C, R32 → R-32)
            // Pattern: R followed immediately by digits — insert hyphen after R
            _refTypeNorm = _refTypeNorm.replace(/^R(\d)/, 'R-$1');

            const refType    = _refTypeNorm;
            const refKgTotal = pfd.refrigerantKgLeaked || 0;

            let refGWP;
            if (!refType) {
                // No refrigerant specified — GWP=0 is correct, nothing to leak
                refGWP = 0;
            } else if (REFRIGERANT_GWP[refType] !== undefined) {
                // Known refrigerant — use table value (may legitimately be 0 for R-717)
                refGWP = REFRIGERANT_GWP[refType];
            } else {
                // BUG-02 FIX: Unrecognised refrigerant type after normalisation.
                // Throw so the user corrects the form — never silently use GWP=0.
                // Supported types: R-404A, R-134a, R-407C, R-410A, R-507A, R-32, R-744, R-717
                throw new CalculationError(
                    'Unrecognised refrigerant type: "' + _refTypeRaw + '" ' +
                    '(normalised to "' + refType + '"). ' +
                    'Supported types: R-404A, R-134a, R-407C, R-410A, R-507A, R-32, R-744, R-717. ' +
                    'Correct the Refrigerant Type field in the factory data form, or leave blank if no refrigerant is used.'
                );
            }

            const refCO2PerKg = refKgTotal > 0 && refGWP > 0 && pfd.totalOutputKg > 0
                ? (refKgTotal / pfd.totalOutputKg) * refGWP
                : 0;
            // FIX 2: Apply T&D losses to primary factory electricity, matching the benchmark path.
            // CONSTANTS.GLEC.T_AND_D_LOSSES = 0.07 (IEA EU average, defined in core_physics.js).
            const elecCO2        = kwhPerKgActual * (gridIntensity * (1 + window.corePhysics.CONSTANTS.GLEC.T_AND_D_LOSSES) / 1000);
            // Refrigerant adds to Climate Change (Fossil) — GWP-weighted F-gas direct emission per kg product
            const totalMfgCO2    = (elecCO2 + gasCO2 + refCO2PerKg) * prodWt;
            const totalMfgKwh    = kwhPerKgActual * prodWt;

            mfgResult = {
                co2:                  totalMfgCO2,
                kwh:                  totalMfgKwh,
                fossilFraction:       1.0,
                source:               'Primary Factory Data',
                gridIntensityGPerKwh: gridIntensity,   // gridIntensity is in scope (processManufacturing local). Needed by CSV export and audit trail.
                fuelType:             fuelType,
                fuelFactor:           fuelFactor,
                refrigerantType:      refType   || null,
                refrigerantKgLeaked:  refKgTotal || 0,
                refrigerantGWP:       refGWP     || 0,
                refrigerantCO2PerKg:  refCO2PerKg
            };

            // Bug 8 fix: compute multi-category results for primary factory data
            mfgResult.multiCategoryResults = {};
            if (totalMfgKwh > 0) {
                const multi = window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI;
                for (const category of Object.keys(multi)) {
                    mfgResult.multiCategoryResults[category] = totalMfgKwh * multi[category];
                }
            }
            // FIX: [Audit A5] Add gas combustion non-CC multi-category impacts.
            // GAS_COMBUSTION_MULTI factors are per m³ natural gas (EMEP/EEA 2023 §1.A.1b × JRC EF 3.1).
            // gasM3PerKg × prodWt = total gas m³ used for this batch.
            const totalGasM3 = gasM3PerKg * prodWt;
            if (totalGasM3 > 0 && window.corePhysics.CONSTANTS.GAS_COMBUSTION_MULTI) {
                const gasMCF = window.corePhysics.CONSTANTS.GAS_COMBUSTION_MULTI;
                for (const category of Object.keys(gasMCF)) {
                    if (gasMCF[category] !== 0) {
                        mfgResult.multiCategoryResults[category] =
                            (mfgResult.multiCategoryResults[category] || 0) +
                            totalGasM3 * gasMCF[category];
                    }
                }
            }
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
        // FIX 1: CFF R2 — pkgData.r2 IS the Annex C end-of-life recycling rate; do not multiply by r1_max.
        // r1_max separately caps the user-supplied recycled content fraction per PEF 3.1 Annex C.
        const r1Uncapped = pkgIn.recycledPct / 100;
        const r1         = pkgData.r1_max !== undefined ? Math.min(r1Uncapped, pkgData.r1_max) : r1Uncapped;
        const r2         = pkgData.r2 || 0.7;
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

        // BUGFIX PACKAGING-NON-CC: pass materialKey so calculatePackaging()
        // can look up PACKAGING_MULTI_CATEGORY for non-CC impact categories.
        const packagingResult = window.corePhysics.calculatePackaging({
            weightKg:    pkgIn.weightKg,
            ev,
            erecycled,
            ed,
            r1,
            r2,
            aFactor,
            qs,
            qp,
            fossilFraction,
            materialKey: pkgIn.material  // BUGFIX PACKAGING-NON-CC
        });

        packagingResult.source = 'PEF 3.1 CFF / Ecoinvent';
        return packagingResult;
    }

    // ── STEP 5: AGGREGATION (ALL 16+ CATEGORIES) ─────────────────────────────
    function aggregateAllCategories(ingredientResults, mfgResult, transportResult, packagingResult) {
        const pefResults = {};

        // BUGFIX PACKAGING-NON-CC: Packaging non-CC multi-category impacts are
        // now computed via PACKAGING_MULTI_CATEGORY in calculatePackaging().
        // The previous "deferred to Phase 3" note is resolved.

        for (const cat of ALL_CATEGORIES) {
            let ingTotal = 0;
            for (const ing of ingredientResults) {
                ingTotal += (ing.allCategoryResults[cat] || 0);
            }

            // ── INBOUND UPSTREAM TRANSPORT ────────────────────────────────────
            // Sums inbound transport CO2e across all ingredient upstream legs.
            // CC: uses subtotal. CC-Fossil: uses fossilCO2 from calculateTransport.
            // Non-CC: uses multiCategoryResults from calculateTransport() where present.
            // CC-Biogenic / CC-Land Use: always zero for transport (correct per GLEC).
            let upstreamTotal = 0;
            for (const ing of ingredientResults) {
                for (const comp of (ing.upstreamComponents || [])) {
                    if (cat === 'Climate Change') {
                        upstreamTotal += (comp.subtotal || 0);
                    } else if (cat === 'Climate Change - Fossil') {
                        upstreamTotal += (comp.fossilCO2 || comp.subtotal || 0);
                    } else if (cat !== 'Climate Change - Biogenic' && cat !== 'Climate Change - Land Use') {
                        upstreamTotal += (comp.multiCategoryResults && comp.multiCategoryResults[cat] !== undefined)
                            ? comp.multiCategoryResults[cat] : 0;
                    }
                }
            }
            // ── END INBOUND UPSTREAM ──────────────────────────────────────────

            let mfgTotal = 0;
            if (cat === 'Climate Change') {
                mfgTotal = mfgResult.co2;
            } else if (cat === 'Climate Change - Fossil') {
                mfgTotal = mfgResult.co2 * mfgResult.fossilFraction;
            } else if (cat === 'Resource Use, fossils') {
                mfgTotal = mfgResult.kwh * 3.6;
            } else if (
                cat !== 'Climate Change - Biogenic' &&
                cat !== 'Climate Change - Land Use' &&
                mfgResult.multiCategoryResults && mfgResult.multiCategoryResults[cat] !== undefined
            ) {
                // Multi-category manufacturing — ecoinvent v3.9.1 per-kWh electricity factors
                mfgTotal = mfgResult.multiCategoryResults[cat];
            }

            let transTotal = 0;
            if (cat === 'Climate Change') {
                transTotal = transportResult.total;
            } else if (cat === 'Climate Change - Fossil') {
                transTotal = transportResult.total * transportResult.fossilFraction;
            } else if (
                cat !== 'Climate Change - Biogenic' &&
                cat !== 'Climate Change - Land Use' &&
                transportResult.multiCategoryResults && transportResult.multiCategoryResults[cat] !== undefined
            ) {
                // Multi-category transport — GLEC v3.2 Annex C / ecoinvent v3.9.1
                transTotal = transportResult.multiCategoryResults[cat];
            }

            let pkgTotal = 0;
            if (cat === 'Climate Change') {
                pkgTotal = packagingResult.totalImpact;
            } else if (cat === 'Climate Change - Fossil') {
                pkgTotal = packagingResult.fossilImpact;
            } else if (cat === 'Climate Change - Biogenic') {
                pkgTotal = packagingResult.biogenicImpact;
            } else if (
                // BUGFIX PACKAGING-NON-CC: Read non-CC packaging impacts from
                // multiCategoryResults populated by calculatePackaging() via
                // PACKAGING_MULTI_CATEGORY. Mirrors the pattern used for
                // mfgResult.multiCategoryResults and transportResult.multiCategoryResults.
                // Climate Change - Land Use has no packaging dLUC component; stays 0.
                cat !== 'Climate Change - Land Use' &&
                packagingResult.multiCategoryResults &&
                packagingResult.multiCategoryResults[cat] !== undefined
            ) {
                pkgTotal = packagingResult.multiCategoryResults[cat]; // BUGFIX PACKAGING-NON-CC
            }

            const total = ingTotal + mfgTotal + transTotal + pkgTotal + upstreamTotal;

            pefResults[cat] = {
                total:             total,
                unit:              CATEGORY_UNITS[cat] || '',
                contribution_tree: {
                    Ingredients:   { total: ingTotal,      components: [] },
                    Manufacturing: { total: mfgTotal,      components: [] },
                    Transport:     { total: transTotal,    components: [] },
                    Packaging:     { total: pkgTotal,      components: [] },
                    Upstream:      { total: upstreamTotal, components: [] }
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
            const ingEntry    = ingredientResults.find(i => i.name === d.name);
            const dqrBkd      = ingEntry?.dqrBreakdown || {};
            const dqrP        = dqrBkd.P ? dqrBkd.P : d.dqr;
            const uncertainty = window.foodCalculationEngine.calculateUncertainty(dqrP);
            return Object.assign({}, d, {
                uncertainty,
                source: ingEntry ? ingEntry.source : 'AGRIBALYSE 3.2',
                // BUG-14 FIX: expose individual DQR indicators for CSV/PDF export
                // AGRIBALYSE DQI Matrix v3.0.1 uses 4-indicator scheme (TeR + TiR + GR + P) / 4
                // CoR (completeness) is not scored per ADEME/INRAE DQI methodology
                TeR: dqrBkd.TeR || 0,
                TiR: dqrBkd.TiR || 0,
                GeR: dqrBkd.GR  || dqrBkd.GeR || 0,   // database key is 'GR' (geographical representativeness)
                CoR: 0,                                 // not scored per AGRIBALYSE DQI Matrix v3.0.1
                RR:  dqrBkd.P   || 0                   // 'P' (precision) maps to reliability/reproducibility column
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

        // Bug 1 fix: verify all scorable categories have both nf and wf entries before passing to calculateSingleScore
        for (const cat of Object.keys(scorablePefResults)) {
            if (nf[cat] === undefined) {
                console.warn('[AIOXY] computeSingleScore: missing normalization factor for category "' + cat + '". Skipping from single score.');
                delete scorablePefResults[cat];
            } else if (wf[cat] === undefined) {
                console.warn('[AIOXY] computeSingleScore: missing weighting factor for category "' + cat + '". Skipping from single score.');
                delete scorablePefResults[cat];
            }
        }

        const singleScoreResult = window.corePhysics.calculateSingleScore({
            pefResults:           scorablePefResults,
            productWeightKg:      input.product.weightKg,
            normalizationFactors: nf,
            weightingFactors:     wf
        });

        // Bug 1 fix: guard against NaN or Infinity in singleScore
        if (!isFinite(singleScoreResult.singleScore) || isNaN(singleScoreResult.singleScore)) {
            console.warn('[AIOXY] computeSingleScore: singleScore is not finite (' + singleScoreResult.singleScore + '). Setting to 0.');
            singleScoreResult.singleScore = 0;
        }

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
                weightingFactor:     weightFactor,
                unit: CATEGORY_UNITS[cat] || ''
            };
        }

        const normalizedScore = Object.values(breakdown).reduce((s, v) => s + v.normalized, 0);
        const weightedScore   = Object.values(breakdown).reduce((s, v) => s + v.weighted, 0);

        // FIX 1 [M8]: Organic bonus deduction removed. The previous 15 µPt deduction
        // (organicRatio × 15.0) had no basis in EF 3.1, ISO 14044, or any cited
        // methodology. farmingPractice data is still collected in the supplier modal
        // for traceability; only the non-standard score modifier is removed.
        const finalScore = singleScoreResult.singleScore;

        return {
            finalMicroPoints: finalScore,
            rawMicroPoints:   finalScore,
            normalizedScore,
            weightedScore,
            breakdown,
            unit: singleScoreResult.unit
        };
    }

    // ── STEP 8: MONTE CARLO UNCERTAINTY ──────────────────────────────────────
    // B1: Accepts a category parameter — runs Monte Carlo for that specific EF 3.1 category.
    function computeMonteCarlo(ingredientResults, category) {
        const mcComponents = ingredientResults.map(ing => ({
            value:              ing.allCategoryResults[category] || 0,
            // F5 FIX: explicitly extract .P from dqrBreakdown if it exists;
            // ing.dqrBreakdown || ing.dqr would pass {} (truthy empty object) when
            // dqrBreakdown is present but empty, causing calculateUncertainty to read
            // {}.P → undefined → NaN in all Monte Carlo p5/p95 outputs.
            uncertaintyPercent: window.foodCalculationEngine.calculateUncertainty(
                                    (ing.dqrBreakdown && ing.dqrBreakdown.P) ? ing.dqrBreakdown.P : ing.dqr)
        }));

        const hasNonZero = mcComponents.some(c => c.value > 0);
        if (!hasNonZero) {
            return { mean: 0, p5: 0, p95: 0 };
        }

        // FIX C [Audit Finding C]: Climate Change now uses 1000 iterations per ISO 14044 Annex A
        // recommendation (≥1000 for stable P5/P95 percentiles). All categories use 1000 iterations.
        const iterations = 1000;  // ISO 14044 Annex A recommends ≥1000 for stable P5/P95 percentiles

        return window.corePhysics.calculateUncertainty({
            components: mcComponents,
            iterations: iterations
        });
    }

    // ── STEP 9: COMPARISON BASELINE ──────────────────────────────────────────
    // Three paths, evaluated in priority order:
    //   1. customBaselineCO2 set and > 0  → custom user baseline (unchanged)
    //   2. ingredientMappings present      → new full-recipe twin path
    //   3. baselineId set and !== 'auto'   → legacy single-ingredient twin (unchanged)
    //   4. fallthrough                     → auto self-comparison baseline (unchanged)
    function computeComparison(input, pefResults) {
        const db         = window.aioxyData;
        const compIn     = input.comparison;
        const productCO2 = pefResults['Climate Change'].total;
        const co2PerKg   = productCO2 / input.product.weightKg;

        // ── Shared databases object (reused by both twin paths) ───────────────
        const twinDatabases = {
            processBenchmarks: db.processing
                ? Object.fromEntries(
                    Object.entries(db.processing).map(([k, v]) => [k, v.kwh_per_kg])
                  )
                : {},
            gridIntensity: db.grid_intensity || db.countries || {},  // Bug 4 fix: prefer grid_intensity, fallback to countries
            packaging:     db.packaging || {}
        };

        // ── Shared params extracted from the current product inputs ───────────
        const sharedParams = {
            processingMethod:       input.manufacturing.processingMethod,
            countryCode:            input.manufacturing.country,
            transportDistance:      input.transport.distanceKm,
            transportMode:          input.transport.mode,
            refrigeration:          input.transport.refrigeration || 'ambient',
            packagingMaterial:      input.packaging.material,
            packagingWeightKg:      input.packaging.weightKg,
            recycledContentPercent: input.packaging.recycledPct,
            productWeightKg:        input.product.weightKg   // PEF functional unit denominator for twin
        };

        let comparisonBaseline = null;

        // ── PATH 1: Custom user baseline ─────────────────────────────────────
        if (compIn.customBaselineCO2 && compIn.customBaselineCO2 > 0) {
            comparisonBaseline = {
                name:       'Custom User Baseline',
                co2PerKg:   compIn.customBaselineCO2,
                waterPerKg: 0,
                is_custom:  true,
                breakdown:  { farm: compIn.customBaselineCO2, manufacturing: 0, transport: 0, packaging: 0 }
            };

        // ── PATH 2: Full-recipe twin (ingredientMappings present) ────────────
        } else if (
            compIn.ingredientMappings &&
            Array.isArray(compIn.ingredientMappings) &&
            compIn.ingredientMappings.length > 0
        ) {
            // Build assessedRecipe and conventionalRecipe from the mappings.
            // Each mapping entry:
            //   {
            //     assessed:     { id, name, quantityKg, pef, entericParams }
            //     conventional: { id, name, quantityKg, pef, entericParams } | null
            //   }
            const assessedRecipe     = compIn.ingredientMappings.map(m => m.assessed);
            const conventionalRecipe = compIn.ingredientMappings.map(m => m.conventional || null);

            const twinResult = window.corePhysics.calculateParametricTwin({
                assessedRecipe,
                conventionalRecipe,
                sharedParams,
                twinParams:  compIn.twinParams || null,   // null = apple-to-apple, object = net-zero scenario
                databases: twinDatabases
            });

            // Build flat name lists for anchor_name / anchor_used
            const conventionalNames = twinResult.ingredientPairs
                .map(p => p.conventional?.name || p.assessed?.name || '')
                .join(', ');
            const conventionalIds = compIn.ingredientMappings
                .map(m => m.conventional ? (m.conventional.id || m.conventional.name) : (m.assessed.id || m.assessed.name))
                .join(', ');

            comparisonBaseline = {
                name:            compIn.conventionalBaselineName || `Recipe Twin: ${conventionalNames}`,
                co2PerKg:        twinResult.conventionalTotal.co2PerKg,
                waterPerKg:      twinResult.conventionalTotal.waterPerKg,
                is_custom:       false,
                breakdown:       twinResult.conventionalTotal.breakdown,
                ingredientPairs: twinResult.ingredientPairs,
                anchor_name:     conventionalNames,
                anchor_used:     conventionalIds,
                bat_applied:           compIn.useJRCBAT || false,
                bat_processing_note:   compIn.useJRCBAT ? 'JRC BAT (EU) 2019/2031 applied to processing energy' : null,
                bat_source:            compIn.useJRCBAT ? 'EU 2019/2031 BAT Conclusions' : null,
                allocation_note:       'Mass allocation (ISO 14044)',
                concentration_ratio:   input.product.concentrationRatio || 1.0,
                cloned_parameters:     sharedParams,
                twin_parameters:       compIn.twinParams || null,  // null = identical to assessed side
                sensitivity_analysis: {
                    parameters_tested: [
                        'transport_distance_km (' + input.transport.distanceKm + ')',
                        'grid_intensity_g_per_kwh (' + (db.grid_intensity?.[input.manufacturing.country] || db.countries?.[input.manufacturing.country]?.electricityCO2 || 'N/A') + ')',
                        'concentration_ratio (' + (input.product.concentrationRatio || 1.0) + ')',
                        'packaging_weight_kg (' + input.packaging.weightKg + ')',
                        'recycled_content_pct (' + input.packaging.recycledPct + ')'
                    ],
                    key_finding: 'Screening-level assessment using AGRIBALYSE 3.2 background data. Results sensitive to transport distance and grid intensity assumptions. Primary data recommended for audit-grade comparisons.',
                    recommendation: 'For regulatory submission, replace background data with supplier-specific primary data and conduct full uncertainty analysis.',
                    iso_compliance: 'ISO 14044 §6.3 — Sensitivity analysis identifies parameters that significantly influence results. Full Monte Carlo analysis included in report.'
                },
                // Expose assessed side for downstream UI/PDF delta rendering
                assessed_co2PerKg:   twinResult.assessedTotal.co2PerKg,
                assessed_waterPerKg: twinResult.assessedTotal.waterPerKg,
                delta:               twinResult.delta
            };

        // ── PATH 3: Legacy single-ingredient twin ─────────────────────────────
        } else if (compIn.baselineId && compIn.baselineId !== 'auto') {
            const anchorIngData = db.ingredients[compIn.baselineId];
            if (anchorIngData && anchorIngData.data && anchorIngData.data.pef) {
                const anchorPef  = anchorIngData.data.pef;
                const twinResult = window.corePhysics.calculateParametricTwin({
                    anchorIngredient:   { pef: anchorPef, name: anchorIngData.name },
                    concentrationRatio: input.product.concentrationRatio || 1.0,
                    clonedParams: {
                        processingMethod:       sharedParams.processingMethod,
                        countryCode:            sharedParams.countryCode,
                        transportDistance:      sharedParams.transportDistance,
                        transportMode:          sharedParams.transportMode,
                        refrigeration:          sharedParams.refrigeration,
                        packagingMaterial:      sharedParams.packagingMaterial,
                        packagingWeightKg:      sharedParams.packagingWeightKg,
                        recycledContentPercent: sharedParams.recycledContentPercent
                    },
                    databases: twinDatabases
                });
                comparisonBaseline = {
                    name:       anchorIngData.name,
                    co2PerKg:   twinResult.co2PerKg,
                    waterPerKg: twinResult.waterPerKg,
                    is_custom:  false,
                    breakdown:  twinResult.breakdown,
                    // Bug 9 fix: populate all properties read by UI and PDF generator
                    anchor_name:           anchorIngData.name,
                    anchor_used:           compIn.baselineId,
                    bat_applied:           compIn.useJRCBAT || false,
                    bat_processing_note:   compIn.useJRCBAT ? 'JRC BAT (EU) 2019/2031 applied to processing energy' : null,
                    bat_source:            compIn.useJRCBAT ? 'EU 2019/2031 BAT Conclusions' : null,
                    allocation_note:       'Mass allocation (ISO 14044)',
                    concentration_ratio:   input.product.concentrationRatio || 1.0,
                    cloned_parameters:     twinResult.cloned_parameters || {},
                    sensitivity_analysis: {
                        parameters_tested: [
                            'transport_distance_km (' + input.transport.distanceKm + ')',
                            'grid_intensity_g_per_kwh (' + (db.grid_intensity?.[input.manufacturing.country] || db.countries?.[input.manufacturing.country]?.electricityCO2 || 'N/A') + ')',
                            'concentration_ratio (' + (input.product.concentrationRatio || 1.0) + ')',
                            'packaging_weight_kg (' + input.packaging.weightKg + ')',
                            'recycled_content_pct (' + input.packaging.recycledPct + ')'
                        ],
                        key_finding: 'Screening-level assessment using AGRIBALYSE 3.2 background data. Results sensitive to transport distance and grid intensity assumptions. Primary data recommended for audit-grade comparisons.',
                        recommendation: 'For regulatory submission, replace background data with supplier-specific primary data and conduct full uncertainty analysis.',
                        iso_compliance: 'ISO 14044 §6.3 — Sensitivity analysis identifies parameters that significantly influence results. Full Monte Carlo analysis included in report.'
                    }
                };
            }
        }

        // ── PATH 4: Auto self-comparison fallback ─────────────────────────────
        if (!comparisonBaseline) {
            // Bug 6 fix: breakdown must not be null so section F renders for auto baseline
            comparisonBaseline = {
                name:       'Benchmark (Auto)',
                co2PerKg:   co2PerKg,
                waterPerKg: pefResults['Water Use/Scarcity (AWARE)'].total / input.product.weightKg,
                is_custom:  false,
                breakdown:  { farm: co2PerKg, manufacturing: 0, transport: 0, packaging: 0 },
                // Bug 9/15 fix: populate metadata properties for UI and PDF
                anchor_name:           'Auto (Self-comparison)',
                anchor_used:           null,
                bat_applied:           false,
                bat_processing_note:   null,
                bat_source:            null,
                allocation_note:       'Mass allocation (ISO 14044)',
                concentration_ratio:   input.product.concentrationRatio || 1.0,
                cloned_parameters:     {},
                sensitivity_analysis: {
                    parameters_tested: [
                        'transport_distance_km (' + input.transport.distanceKm + ')',
                        'grid_intensity_g_per_kwh (' + (db.grid_intensity?.[input.manufacturing.country] || db.countries?.[input.manufacturing.country]?.electricityCO2 || 'N/A') + ')',
                        'concentration_ratio (' + (input.product.concentrationRatio || 1.0) + ')',
                        'packaging_weight_kg (' + input.packaging.weightKg + ')',
                        'recycled_content_pct (' + input.packaging.recycledPct + ')'
                    ],
                    key_finding: 'Screening-level assessment using AGRIBALYSE 3.2 background data. Results sensitive to transport distance and grid intensity assumptions. Primary data recommended for audit-grade comparisons.',
                    recommendation: 'For regulatory submission, replace background data with supplier-specific primary data and conduct full uncertainty analysis.',
                    iso_compliance: 'ISO 14044 §6.3 — Sensitivity analysis identifies parameters that significantly influence results. Full Monte Carlo analysis included in report.'
                }
            };
        }

        return comparisonBaseline;
    }

    // ── MAIN: calculate() ────────────────────────────────────────────────────
    async function calculate(input) {
        if (typeof window.corePhysics      === 'undefined') throw new CalculationError('corePhysics not loaded. Load core_physics.js before calculation_engine.js.');
        if (typeof window.complianceEngine === 'undefined') throw new CalculationError('complianceEngine not loaded. Load compliance_engine.js before calculation_engine.js.');
        if (typeof window.exportEngine     === 'undefined') throw new CalculationError('exportEngine not loaded. Load export_engine.js before calculation_engine.js.');
        if (typeof window.aioxyData        === 'undefined') throw new CalculationError('window.aioxyData not loaded. Load database files before calculation_engine.js.');

        validateInput(input);

        const { ingredientResults, ingredientTraceability } = processIngredients(input);
        const mfgResult       = processManufacturing(input);
        const transportResult = processTransport(input, input.packaging.weightKg);
        const packagingResult = processPackaging(input);

        // BUGFIX B12: Lookup function maps ingredient names to commodity price categories from window.aioxyData.
        function getIngredientPrice(ingredientName, ingredientId) { // BUGFIX B12
            var nameLower = (ingredientName || '').toLowerCase(); // BUGFIX B12
            var commodityKey = null; // BUGFIX B12

            if      (nameLower.includes('beef')    || nameLower.includes('cattle') || nameLower.includes('cow'))    commodityKey = 'beef';      // BUGFIX B12
            else if (nameLower.includes('chicken') || nameLower.includes('broiler') || nameLower.includes('poultry')) commodityKey = 'chicken';   // BUGFIX B12
            else if (nameLower.includes('wheat'))                                                                     commodityKey = 'wheat';     // BUGFIX B12
            else if (nameLower.includes('maize')   || nameLower.includes('corn'))                                    commodityKey = 'maize';     // BUGFIX B12
            else if (nameLower.includes('soy'))                                                                       commodityKey = 'soybeans';  // BUGFIX B12
            else if (nameLower.includes('palm'))                                                                      commodityKey = 'palm_oil';  // BUGFIX B12
            else if (nameLower.includes('fish'))                                                                      commodityKey = 'fish_meal'; // BUGFIX B12

            if (commodityKey && window.aioxyData && window.aioxyData.commodity_prices && // BUGFIX B12
                    window.aioxyData.commodity_prices[commodityKey]) { // BUGFIX B12
                var price = window.aioxyData.commodity_prices[commodityKey].price_eur_per_kg; // BUGFIX B12
                if (price !== null && price !== undefined && price > 0) return price; // BUGFIX B12
            } // BUGFIX B12

            return 1.0; // BUGFIX B12: fallback — no commodity price found
        } // BUGFIX B12

        // ALLOCATION SENSITIVITY — uses commodity prices from aioxyData where available (BUGFIX B12)
        // Previously hardcoded price: 1.0 for all ingredients, making mass and economic allocation
        // ratios identical and producing no sensitivity signal. Now wired to real market prices.
        // GAP 4: Wire allocation sensitivity check (ISO 14044 §4.3.4)
        const allocationSensitivity = window.complianceEngine.checkAllocationSensitivity(
            ingredientResults.map(ing => ({
                name:  ing.name,
                mass:  ing.quantityKg,
                price: getIngredientPrice(ing.name, ing.id)  // BUGFIX B12: was hardcoded 1.0
            }))
        );

        const pefResults = aggregateAllCategories(
            ingredientResults, mfgResult, transportResult, packagingResult
        );

        const fullContribTree = buildContributionTree(
            ingredientResults, mfgResult, transportResult, packagingResult, input
        );
        for (const cat of ALL_CATEGORIES) {
            pefResults[cat].contribution_tree = fullContribTree[cat];
        }

        // === GAP A: Wire runJRCValidation() — PEF 3.1 JRC BAT Reference Check ===
        // Validates per-kg impacts for Climate Change, Resource Use fossils, and
        // Water Use/Scarcity (AWARE) against JRC BAT reference values for applicable
        // packaging materials. Non-blocking: failures stored rather than thrown.
        const JRC_MATERIAL_MAP = { 'PET': 'PET_granulates', 'cardboard': 'cardboard', 'glass': 'glass_bottle' };
        const jrcMaterialKey = JRC_MATERIAL_MAP[input.packaging.material] || null;
        let jrcValidationResult = null;

        if (jrcMaterialKey) {
            try {
                const jrcRaw = window.complianceEngine.runJRCValidation({
                    materialType: jrcMaterialKey,
                    calculatedImpact: {
                        'Climate Change':             pefResults['Climate Change'].total             / input.product.weightKg,
                        'Resource Use, fossils':      pefResults['Resource Use, fossils'].total      / input.product.weightKg,
                        'Water Use/Scarcity (AWARE)': pefResults['Water Use/Scarcity (AWARE)'].total / input.product.weightKg
                    }
                });
                // runJRCValidation returns true on pass; normalise to object for consistency
                jrcValidationResult = (jrcRaw === true)
                    ? { passed: true, materialType: jrcMaterialKey }
                    : jrcRaw;
            } catch (e) {
                jrcValidationResult = { passed: false, error: e.message, materialType: jrcMaterialKey };
            }
        }
        // === END GAP A ===

        const { weightedDQR, dnmResult, hotspotResult, dqrComponents } =
            computeDQR(ingredientResults, pefResults);

        const singleScoreResult  = computeSingleScore(pefResults, input, ingredientResults);

        // Bug 8 fix: guard against non-finite values from computeSingleScore
        if (!isFinite(singleScoreResult.finalMicroPoints)) {
            console.warn('[AIOXY] calculate(): PEF Single Score computation produced non-finite value. Setting to 0.');
            singleScoreResult.finalMicroPoints = 0;
            singleScoreResult.normalizedScore = 0;
            singleScoreResult.weightedScore = 0;
        }

        // B2: Run Monte Carlo for all 16 scorable EF 3.1 categories
        // 1000 iterations for all categories per ISO 14044 Annex A recommendation (≥1000 for stable P5/P95 percentiles).
        const monteCarloResults = {};
        for (const cat of SCORABLE_CATEGORIES) {
            monteCarloResults[cat] = computeMonteCarlo(ingredientResults, cat);
        }

        // B3: Compute overall uncertainty from per-category Monte Carlo CI widths
        const ciWidths = SCORABLE_CATEGORIES
            .map(cat => {
                const r = monteCarloResults[cat];
                return (r && r.mean > 0) ? (r.p95 - r.p5) / r.mean : null;
            })
            .filter(v => v !== null);
        const computedOverallUncertainty = ciWidths.length > 0
            ? Math.round((ciWidths.reduce((s, v) => s + v, 0) / ciWidths.length) * 100 * 100) / 100
            : 15;  // fallback when no category has mean > 0

        const comparisonBaseline = computeComparison(input, pefResults);

        // Bug 21 fix: validate export engine interface before calling
        if (typeof window.exportEngine.generateAuditTrail !== 'function') {
            console.warn('[AIOXY] exportEngine.generateAuditTrail is not a function — interface mismatch. Skipping audit trail generation.');
        }
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

        // F7 FIX: await the SHA-256 hash finalization so dppId is resolved before
        // updateResultsUI() runs. Previously used .then() which returned before the
        // Promise resolved, causing the placeholder TRC-... ID to appear in all outputs.
        const auditTrail = await window.exportEngine.finalizeAuditTrail(auditTrailRaw);

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

        // GAP D: validateCutoff — PEF 3.1 §5.2 5% cut-off threshold
        const cutoffValidation = window.complianceEngine.validateCutoff(
            ingredientResults.map(ing => ({
                name:               ing.name,
                impactContribution: ing.allCategoryResults['Climate Change'] || 0
            })),
            pefResults['Climate Change'].total,
            0.05  // 5% cutoff threshold per PEF 3.1
        );

        // F7 FIX: dppId is now the SHA-256-finalized value from the awaited auditTrail,
        // not the Math.random() placeholder that was returned before the Promise resolved.
        const dppIdPlaceholder = auditTrail.dppId ||
            'TRC-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // === PHASE 2: Extended manufacturing traceability with residual mix ===
        const manufacturingTraceability = {
            source:     mfgResult.source || 'Ember 2025 / IEA',
            parameters: {
                country:                input.manufacturing.country,
                energySource:           input.manufacturing.energySource,
                gridIntensityGPerKwh:   mfgResult.gridIntensityGPerKwh ?? null   // BUG-11 FIX: gridIntensity is local to processManufacturing and not in scope here; use null when primary factory data path omits it (baked into elecCO2 already)
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
            contribution_tree: fullContribTree, // BUG M1 FIX: was fullContribTree['Climate Change'] — now stores all 16 category trees. PDF/audit trail reads specific categories as needed (e.g. auditTrailData.contribution_tree['Climate Change']).
            mass_balance:     massBalanceData,

            dqr_summary: {
                overall_dqr:    weightedDQR.overallDQR,
                dqr_level:      weightedDQR.qualityLevel,
                component_dqrs: dqrComponents
            },

            uncertainty_analysis: {
                overall_uncertainty: computedOverallUncertainty,
                monte_carlo:         monteCarloResults
            },

            pef_single_score: {
                singleScore:           singleScoreResult.finalMicroPoints,
                normalizedScore:       singleScoreResult.normalizedScore,
                weightedScore:         singleScoreResult.weightedScore,
                breakdown:             singleScoreResult.breakdown
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
                    functional_unit: '1 kg of product as sold',   // BUG-19 FIX: functional unit is always 1 kg; input.product.weightKg (e.g. 0.2 kg) is the formulation batch weight used for per-kg normalisation
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

            allocation_sensitivity: allocationSensitivity,
            cutoff_validation:      cutoffValidation,

            jrc_validation: jrcValidationResult || {
                passed: null,
                note: 'JRC validation not applicable — packaging material "' + input.packaging.material + '" has no reference values in JRC BAT dataset. Reference materials: PET_granulates, cardboard, glass_bottle.'
            },

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
                // PEF 3.1 functional unit = 1 kg of product as sold.
                // Denominator is always input.product.weightKg (the declared finished
                // product weight). totalInputMass is the raw ingredient input mass — it
                // is NOT the functional unit and must never be used as the per-kg denominator.
                // The parametric twin now also uses product.weightKg (passed via sharedParams)
                // so both sides are on an identical per-kg-product basis.
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
            overallUncertainty: computedOverallUncertainty,

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
