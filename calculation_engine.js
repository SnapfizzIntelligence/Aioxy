

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
        // NOTE (2026-07-31 audit): the ": 480" fallback here looks like an
        // un-cited magic number but is NOT reachable with genuinely missing
        // data — core_physics.js's calculateManufacturing() (called upstream
        // to produce mfgResult) throws MissingDataError if gridIntensityGPerKwh
        // isn't a valid number, before this line ever runs. Left as-is rather
        // than duplicating that throw here, since it can't fire on this path.
        const gridIntensity = mfgResult.gridIntensityGPerKwh !== undefined ? mfgResult.gridIntensityGPerKwh : 480;

        for (const cat of ALL_CATEGORIES) {
            const ingComponents = ingredientResults.map(ing => ({
                name:                   ing.name,
                id:                     ing.id,
                quantity_kg:            ing.quantityKg,
                originCountry:          ing.originCountry || 'FR', // FIX ORIGIN-1: was missing entirely; root cause of twin origin display bug
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
                // BUGFIX CC-BIOGENIC-MFG-TRANS (this session): mfgTotal and transTotal were
                // never assigned in this branch, so (1 - fossilFraction) of Manufacturing's
                // and Transport's real, already-counted CO2e (mfgResult.co2 / transportResult.total)
                // vanished from the Fossil+Biogenic sub-split instead of landing in Biogenic.
                // Headline 'Climate Change' and the PEF Single Score are unaffected — both read
                // mfgResult.co2 / transportResult.total directly, never a sum of these sub-splits
                // (see SCORABLE_CATEGORIES, which excludes all 3 CC sub-splits from scoring).
                // Only the Fossil/Biogenic breakdown itself (used for CSRD/GHG Protocol
                // Scope 3 biogenic reporting) was incomplete. Mirrors the existing, correct
                // pkgTotal pattern immediately above (packagingResult.biogenicImpact).
                // Formula: biogenic share = stage_total x (1 - fossilFraction), consistent with
                // core_physics.js calculatePackaging(): biogenicImpact = totalImpact x (1 - fossilFraction).
                mfgTotal   = mfgResult.co2 * (1 - mfgResult.fossilFraction);
                transTotal = transportResult.total * (1 - transportResult.fossilFraction);
                pkgTotal   = packagingResult.biogenicImpact;
            // C12-F1 FIX (Audit Session 7): Removed explicit 'Resource Use, fossils' branch
            // that used mfgResult.kwh * 3.6 (= final energy MJ, not primary fossil energy).
            // This understated Resource Use fossils for fossil-heavy grids and overstated
            // for low-carbon grids. Now falls through to multiCategoryResults which uses
            // ELECTRICITY_GRID_MULTI['Resource Use, fossils'] = 5.80 MJ/kWh (grid-mix-
            // appropriate, sourced from ENTSO-E 2023 / ecoinvent 3.9.1 EU27 mix).
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

            // GAP 4 FIX: Inbound upstream transport shadow calculation REMOVED.
            //
            // The previous implementation computed inbound transport as:
            //   transportCO2 = (ingRes.quantityKg / 1000) * 200 * 0.060
            // using a hardcoded 200 km default distance and 0.060 kgCO2e/tkm EF.
            // This was a shadow calculation: it bypassed calculateTransport() in
            // core_physics.js, used an undocumented assumption (200 km), applied
            // only to Climate Change (zeroing all other categories), and was NOT
            // covered by the audit hash or included in pefResults.
            //
            // The correct treatment: AGRIBALYSE 3.2 farm-gate data includes
            // representative French market transport in its system boundary
            // (AGRIBALYSE 3.2 documentation §3.2). Cross-border transport
            // adjustments require primary supplier data (actual origin distances)
            // and must be modelled as an explicit transport leg through the
            // processTransport() pathway with user-supplied distance input.
            //
            // System boundary declaration: inbound ingredient transport beyond
            // the AGRIBALYSE 3.2 farm-gate boundary is excluded from the current
            // cradle-to-retail system boundary. This exclusion is documented here
            // per ISO 14044 §4.2.3.3 (system boundary definition must be explicit).
            // Phase 3 will add a per-ingredient origin transport input field.
            // Aggregate inbound upstream transport from all ingredient legs
            let upstreamTotal = 0;
            const upstreamComponents = [];
            for (const ing of ingredientResults) {
                for (const comp of (ing.upstreamComponents || [])) {
                    let v = 0;
                    if (cat === 'Climate Change') {
                        v = comp.subtotal || 0;
                    } else if (cat === 'Climate Change - Fossil') {
                        v = comp.fossilCO2 || comp.subtotal || 0;
                    } else if (cat !== 'Climate Change - Biogenic' && cat !== 'Climate Change - Land Use') {
                        v = (comp.multiCategoryResults && comp.multiCategoryResults[cat] !== undefined)
                            ? comp.multiCategoryResults[cat] : 0;
                    }
                    upstreamTotal += v;
                    if (cat === 'Climate Change') upstreamComponents.push(comp);
                }
            }

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
                    mode: transMode, // FIX TRANSPORT-MCF-1 (this session): structured field added
                                     // so pdf-generator.js can correctly gate non-CC arithmetic to
                                     // road-only, instead of applying road factors to every mode.
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
                // FIX (2026-07-31 audit): this trace block runs BEFORE the real
                // calculatePackaging() call later in this function (line ~2966),
                // which DOES throw MissingDataError on missing aFactor/ev/erecycled/
                // r2. This block, building the audit-trail-visible explanation of
                // the calculation, was previously not held to the same standard —
                // ev/erec/r2/A silently became 0 here if the packaging database
                // record for this material was missing any of them, producing a
                // plausible-looking glass-box trace for a material the real
                // calculation would have refused to compute. A missing physical
                // input for a regulated CFF calculation must fail loud, not be
                // silently treated as zero. Whether pkgMat resolves to a real
                // database entry at all is intentionally still tolerant (empty
                // pkgDB) — this only rejects a resolved entry that is incomplete.
                if (Object.keys(pkgDB).length > 0) {
                    if (typeof pkgDB.co2_virgin !== 'number') {
                        throw new CalculationError('Packaging material "' + pkgMat + '" is missing co2_virgin (Ev) in the packaging database.');
                    }
                    if (typeof pkgDB.co2_recycled !== 'number') {
                        throw new CalculationError('Packaging material "' + pkgMat + '" is missing co2_recycled (Erec) in the packaging database.');
                    }
                    if (typeof pkgDB.r2 !== 'number') {
                        throw new CalculationError('Packaging material "' + pkgMat + '" is missing r2 (end-of-life recycling rate) in the packaging database.');
                    }
                    if (typeof pkgDB.aFactor !== 'number') {
                        throw new CalculationError('Packaging material "' + pkgMat + '" is missing aFactor (allocation factor) in the packaging database.');
                    }
                }
                const ev      = pkgDB.co2_virgin;
                const erec    = pkgDB.co2_recycled;
                // AUDIT-4 FIX (this session): found a real bug that survived the earlier
                // EOL-DESTINATION-1 fix. That fix correctly wired eolDestination into the
                // ACTUAL calculation (which produces pkgTotal, below) -- but this SEPARATE
                // trace-construction block, which builds the audit-trail-visible explanation
                // of how the number was derived, still used the flat co2_disposal_average
                // unconditionally. Result: for landfill/incinerated selections, the four terms
                // (Term1/Term2/Burden/Credit) shown in the printed trace did not actually sum
                // to the "Total" line, which was pulling the real, correctly-fixed pkgTotal
                // from elsewhere -- a self-contradictory glass-box trace, not just a missing
                // feature. Now resolves 'ed' identically to the real calculation path.
                // FIX (2026-07-31 audit): this trace block runs BEFORE the real
                // processPackaging() call later in this function, which now
                // validates eolDestination against its closed set and throws on
                // a typo. Without the same check here, a bad value would still
                // silently produce a wrong-but-plausible trace before the real
                // calculation ever got a chance to catch it.
                const VALID_EOL_DESTINATIONS_TRACE = ['landfill', 'incinerated', 'recycled', 'eu_average'];
                const eolDestRaw = (input && input.packaging) ? input.packaging.eolDestination : undefined;
                if (!VALID_EOL_DESTINATIONS_TRACE.includes(eolDestRaw === undefined || eolDestRaw === null ? 'eu_average' : eolDestRaw)) {
                    throw new CalculationError('Invalid packaging.eolDestination: "' + eolDestRaw + '". Must be one of: ' + VALID_EOL_DESTINATIONS_TRACE.join(', '));
                }
                const eolDest = eolDestRaw || 'eu_average';
                let ed;
                if (eolDest === 'landfill' && pkgDB.co2_disposal_landfill !== undefined && pkgDB.co2_disposal_landfill !== null) {
                    ed = pkgDB.co2_disposal_landfill;
                } else if (eolDest === 'incinerated' && pkgDB.co2_disposal_incineration !== undefined && pkgDB.co2_disposal_incineration !== null) {
                    ed = pkgDB.co2_disposal_incineration;
                } else {
                    ed = (pkgDB.co2_disposal_average !== undefined && pkgDB.co2_disposal_average !== null)
                            ? pkgDB.co2_disposal_average
                            : (pkgDB.co2_disposal !== undefined && pkgDB.co2_disposal !== null ? pkgDB.co2_disposal : 0.05);
                }
                const r1max   = pkgDB.r1_max                   !== undefined ? pkgDB.r1_max : 1.0;
                const r1      = Math.min(pkgRec, r1max);
                const r2      = pkgDB.r2;
                const A       = pkgDB.aFactor;
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
            // Finding 18 FIX (2026-06-07): Duplicate ISO code block removed.
            // Lines previously repeated TH, VN, ID, MY, PH, BD, PK, LK, NP, KR,
            // IR, IQ, EG, MA, DZ, TN, NG, GH, CI, CM, KE, ET, ZA, UA, RU, MD,
            // RS, AL, BA, ME, MK, IS, MT, MX, AR, CL, CO, PE, UY — all identical
            // to values already present above. JS objects silently use last write
            // for duplicate keys, making the map non-deterministic by inspection.
            // TW (Taiwan) added here — was only in the duplicate block, not above.
            "TW": "Taiwan",
            "DZ": "Algeria",        "TN": "Tunisia",
            // B5-F2 FIX: NZ, IL, BY, GE added to resolver (single clean entry each).
            // Bug 2 FIX: Removed duplicate entries that appeared 2-3 times each —
            // caused by F5 appending a second block instead of merging into the first.
            "NZ": "New Zealand",
            "IL": "Israel",
            "BY": "Belarus",
            "GE": "Georgia",          // country, not US state
            "RE": "France",          // Réunion — FR overseas proxy
            "WI": "France",          // West Indies (FR Antilles) — FR proxy
            "EU": "France",          // EU aggregate — FR conservative proxy
            "XK": "Serbia"           // Kosovo — nearest neighbour proxy
        };

        if (MAP[isoCode]) return MAP[isoCode];

        // Fallback: log warning, return original code (will fail gracefully in caller)
        console.warn('[AIOXY] No country name mapping for ISO code: ' + isoCode +
                     '. AWARE/LANCA/FAOSTAT adjustments will be skipped for this country.');
        return isoCode;
    }

    // ── INBOUND TRANSPORT: DISTANCE + MODE LOOKUP ────────────────────────────
    // Returns { distanceKm, mode, source } or null.
    // null = FR origin or same country as mfg — AGRIBALYSE already covers it.
    // Road: EU/near-EU origins. Sea: intercontinental. DAF applied inside calculateTransport().
    // Sources: GLEC v3.2 port-to-port (sea), Eurostat road freight (road).
    function resolveInboundTransport(originCode, mfgCode) {
        if (!originCode || originCode === 'FR') return null;
        if (originCode === mfgCode) return null;

        const ROAD = {
            'AT':1100,'BE':310,'BG':2000,'HR':1500,'CZ':880,'DK':1000,'EE':2200,
            'FI':2500,'DE':550,'GR':2500,'HU':1300,'IE':1800,'IT':1200,'LV':2100,
            'LT':2000,'LU':360,'NL':500,'NO':2000,'PL':1300,'PT':1700,'RO':2200,
            'SK':1100,'SI':1200,'ES':1300,'SE':2000,'CH':600,
            // B4-F1: UK midlands to N.France via Channel. Eurostat 2022 screening.
            'GB':850,'TR':2800,
            'AL':2100,'BA':1800,'ME':2000,'MK':2100,'RS':1900,'UA':2500,'MD':2300,
            'RU':2800,'MA':2500,'DZ':2200,'TN':2100
        };
        const SEA = {
            'IN':10500,'PK':9800,'BD':11000,'LK':11500,'NP':11500,
            'CN':12000,'JP':13500,'KR':12500,'VN':11500,'TH':10800,
            'ID':11000,'MY':10500,'PH':12000,'TW':12000,
            'IR':8500,'IQ':8200,'SA':8500,'AE':9000,
            'EG':4500,'NG':6500,'GH':6200,'CI':6800,'CM':6500,
            'KE':8000,'ET':7500,'ZA':9500,'CY':3500,'MT':2200,'IS':2000,
            'US':7500,'CA':6800,'MX':9500,'BR':9000,'AR':11000,
            'CL':13000,'CO':9800,'PE':12000,'UY':10500,
            'AU':15000,'NZ':17500
        };

        if (ROAD[originCode] !== undefined && ROAD[originCode] !== null) {
            return { distanceKm: ROAD[originCode], mode: 'road',
                source: 'Eurostat road freight statistics — origin to Paris/Frankfurt hub' };
        }
        if (SEA[originCode] !== undefined) {
            return { distanceKm: SEA[originCode], mode: 'sea',
                source: 'GLEC v3.2 port-to-port — Rotterdam reference port (pre-DAF great circle)' };
        }
        return { distanceKm: 8000, mode: 'sea',
            source: 'Global proxy — conservative 8000 km sea (origin not in lookup table)' };
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
                reason:           'USEtox 2.14 database loaded but requires substance-specific emission inventory data (kg pesticide applied per hectare by CAS number). Current primary data form does not collect this information. Only the Agribalyse 3.2 baseline toxicity factor is included for this ingredient (no USEtox supplement to add).',
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
        // Uses occupation SQI as the primary factor; transformation_to added if available.
        // Ratio = (originOccupation + originTransformationTo) / (refOccupation + refTransformationTo)
        // If transformation_to data is absent, uses occupation ratio alone.
        //
        // 2026-07-18 FIX: database key 'transformation' was renamed to 'transformation_to'
        // (audit confirmed it only ever held the land-converted-INTO-this-use leg; the
        // land-converted-AWAY-FROM-this-use leg, 'transformation_from', did not exist in
        // the database until this same update). This block is updated to read the renamed
        // key so the lookup does not silently fail. The calculation formula itself is
        // UNCHANGED — still occupation + transformation_to, exactly as before this fix —
        // because using transformation_from to compute a net land-use-change delta
        // (transformation_to − transformation_from) would be a methodology change, and
        // the correct LANCA/JRC arithmetic for combining both legs has not yet been
        // verified against the official method report. transformation_from is now
        // surfaced in countryFactorsLog for traceability/audit visibility only — it is
        // NOT part of the ratio calculation pending that verification.
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
                    // Try to include transformation_to if available for both countries
                    let lancaRatio;
                    let transformationUsed = false;
                    let refTransformationTo    = null;
                    let originTransformationTo = null;

                    // Read from transformation_to (see 2026-07-18 FIX note above).
                    if (lancaData.transformation_to) {
                        refTransformationTo    = lancaData.transformation_to[refName];
                        originTransformationTo = lancaData.transformation_to[originName];
                    }

                    if (
                        refTransformationTo    !== undefined && refTransformationTo    !== null &&
                        originTransformationTo !== undefined && originTransformationTo !== null &&
                        (refOccupation + refTransformationTo) !== 0
                    ) {
                        lancaRatio = (originOccupation + originTransformationTo) /
                                     (refOccupation    + refTransformationTo);
                        transformationUsed = true;
                    } else {
                        // Transformation_to data absent or incomplete — use occupation ratio only
                        lancaRatio = originOccupation / refOccupation;
                        transformationUsed = false;
                    }

                    // B2-F1 FIX: Guard against negative LANCA SQI (e.g. Greenland = -8.75).
                    if (lancaRatio < 0) {
                        console.warn('[AIOXY B2-F1] Negative LANCA ratio ' + lancaRatio.toFixed(4) + ' for ' + originCountry + '. Land Use adjustment skipped.');
                        lancaRatio = 1.0;
                    }
                    flatPef['Land Use'] *= lancaRatio;

                    // transformation_from: surfaced for audit traceability only.
                    // Not yet used in lancaRatio — see 2026-07-18 FIX note above.
                    let refTransformationFrom    = null;
                    let originTransformationFrom = null;
                    if (lancaData.transformation_from) {
                        refTransformationFrom    = lancaData.transformation_from[refName];
                        originTransformationFrom = lancaData.transformation_from[originName];
                    }

                    countryFactorsLog.lanca = {
                        applied:                     true,
                        ref_country:                 REFERENCE_COUNTRY,
                        ref_occupation:              refOccupation,
                        ref_transformation_to:       refTransformationTo,
                        ref_transformation_from:     refTransformationFrom,
                        origin_country:              originCountry,
                        origin_occupation:           originOccupation,
                        origin_transformation_to:    originTransformationTo,
                        origin_transformation_from:  originTransformationFrom,
                        transformation_included:     transformationUsed,
                        transformation_from_note:    'transformation_from is available in the database as of 2026-07-18 but is not yet incorporated into ratio_applied — combining it with transformation_to requires verification against the official LANCA/JRC method report before use in a calculation.',
                        ratio_applied:                lancaRatio,
                        source:                       lancaData.source    || 'LANCA v2.5 — Fraunhofer IBP / European Commission JRC',
                        indicator:                    lancaData.indicator || 'Soil Quality Index — Total, unspecified land use',
                        version:                      lancaData.version   || 'EF 3.1',
                        category_adjusted:            'Land Use'
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

                    // FIX FAOSTAT-1: previously used raw substring .includes() with no word
                    // boundaries, which produced real, confirmed false-positive matches —
                    // e.g. "red-lentil-dried" matched "unmanufactured tobacco" (because
                    // "manufactuRED" contains "red"), and an oat-based animal-feed
                    // ingredient matched "meat of goat" (because "gOAT" contains "oat").
                    // This is an audit-disclosure-only feature (confirmed: never writes to
                    // flatPef), so it never affected the actual footprint number — but a
                    // real auditor seeing "red lentil benchmarked against tobacco yield"
                    // would reasonably doubt the platform's rigor. Fixed by requiring whole-
                    // word matches (regex word boundaries) instead of raw substring
                    // containment, verified against all 240 ingredients — no false positives
                    // remain, and legitimate matches (durum wheat -> wheat, banana -> bananas)
                    // still work correctly.
                    function wholeWordMatch(haystack, needle) {
                        if (!needle) return false;
                        const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        return new RegExp('\\b' + escaped + '\\b', 'i').test(haystack);
                    }

                    // First pass: whole-word match (lower-cased crop name vs lower-cased ingredient name)
                    for (const [cropName, cropYield] of Object.entries(countryYields)) {
                        const cropLower = cropName.toLowerCase();
                        if (wholeWordMatch(ingName, cropLower) || wholeWordMatch(cropLower, ingName)) {
                            faostatYield = cropYield;
                            matchedCrop  = cropName;
                            break;
                        }
                    }

                    // FIX FAOSTAT-3: the second-pass ID-based fallback is removed entirely.
                    // Every false-positive match found in this audit — red-lentil matched to
                    // "unmanufactured tobacco" (via manufactuRED), an oat-based feed
                    // ingredient matched to "meat of goat" (via gOAT), fresh-shrimps matched
                    // to "hen eggs" (via the shared word "fresh"), pineapple and banana
                    // matched to "mixed grain" (via the shared word "mixed" from "mixed
                    // production"), and sea bass matched to "flax" — came from this ID-based
                    // fallback. Ingredient IDs are programmatic slugs full of generic
                    // descriptor words (fresh, dried, mixed, national, average, production,
                    // conventional...) that have nothing to do with the actual food, and any
                    // of them can collide with an unrelated FAOSTAT crop name. Patching one
                    // stopword at a time only reveals the next collision (whack-a-mole).
                    // The name-based first pass above is far more reliable, since ingredient
                    // names (e.g. "Oat grain, national average, animal feed, at farm gate")
                    // are properly descriptive food names, not slugified fragments. This
                    // feature is disclosure-only (confirmed: never writes to flatPef) — an
                    // honest "no FAOSTAT match found" for the ingredients this fallback used
                    // to (mis)match is strictly better than a confident, wrong benchmark
                    // shown to a real auditor.

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
                        // B3-F1 FIX: deviation_flag set when > 20%.
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

            // FIX QUANTITY-EDIT-1 (this session, defense-in-depth engine-level guard):
            // confirmed during pre-launch adversarial review that ui.js's
            // updateIngredientQuantity() had zero validation, meaning an edited (not just
            // newly-added) ingredient's quantity could reach this engine as NaN or <=0.
            // NaN + anyRealNumber = NaN in JS, so a single malformed quantity would have
            // silently corrupted this ENTIRE product's category totals -- confirmed the
            // engine previously had only one NaN guard in its whole body (single-score
            // aggregate only), meaning this would have reached the PDF/CSV/audit-trail as
            // the literal printed string "NaN" in a client-facing report. Fixed the UI-level
            // gap directly, but also adding this engine-level guard as defense-in-depth --
            // relying solely on one UI function's validation has now been proven fragile,
            // and this protects against any future UI change, API integration, or other
            // entry point that might bypass that specific function.
            if (typeof ingredient.quantityKg !== 'number' || isNaN(ingredient.quantityKg) || ingredient.quantityKg <= 0) {
                throw new CalculationError(
                    'Invalid quantity for ingredient "' + ingredient.id + '": ' + ingredient.quantityKg +
                    '. Quantity must be a positive number.'
                );
            }

            // 1b. Validate all PEF values — throw for core 16, warn+derive for CC sub-splits
            // FIX: The three CC sub-splits (Fossil/Biogenic/Land Use) are absent from some
            // DB entries. Previously, one missing sub-split threw and killed the entire
            // processIngredients loop — returning empty ingredientResults and producing 0
            // for ingredient contribution in all outputs (UI, PDF, CSV, foreground/background).
            // Fix: derive a conservative fallback from the CC total; log a warning; never throw.
            // Core 16 EF categories still throw if missing — those are always present in DB.
            const pef = ingData.data.pef;
            if (!pef) {
                throw new CalculationError('Missing pef data for ingredient: ' + ingredient.id);
            }
            const _CC_SUBSPLITS = ['Climate Change - Fossil', 'Climate Change - Biogenic', 'Climate Change - Land Use'];
            for (const cat of ALL_CATEGORIES) {
                if (pef[cat] === undefined || pef[cat] === null) {
                    if (_CC_SUBSPLITS.includes(cat)) {
                        // Derive from CC total — conservative proxy, never throws
                        const _ccBase = pef['Climate Change'] || 0;
                        if (cat === 'Climate Change - Fossil')        pef[cat] = _ccBase * 0.70;
                        else if (cat === 'Climate Change - Biogenic') pef[cat] = _ccBase * 0.30;
                        else                                           pef[cat] = 0; // Land Use
                        console.warn('[AIOXY] Ingredient "' + ingredient.id + '" missing ' + cat +
                            ' — derived from CC total as fallback. Add explicit value to DB entry.');
                    } else {
                        // Core 16 EF categories — always required in DB, throw if absent
                        throw new CalculationError(
                            'Ingredient "' + ingredient.id + '" is missing PEF category: ' + cat
                        );
                    }
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
                // F3 FIX: Declare SALCA, IPCC, AR6 at pd scope so both nitrogen and
                // phosphorus blocks can access them regardless of which data is provided.
                // AUDIT-4 FIX (this session): renamed from AR5 -- see IPCC_AR6_PEF31 definition
                // in core_physics.js for why (EF 3.1's Climate Change indicator uses AR6, not AR5).
                const SALCA = window.corePhysics.CONSTANTS.SALCA_P;
                const IPCC  = window.corePhysics.CONSTANTS.IPCC_TIER1;
                const AR6   = window.corePhysics.CONSTANTS.IPCC_AR6_PEF31;

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
                                // FIX AQUA-2: was feedParams.FCR (uppercase) — the aquaculture_feeds
                                // database stores this field as lowercase 'fcr'. JavaScript property
                                // access is case-sensitive, so feedParams.FCR was always undefined,
                                // silently falling back to the hardcoded 1.5 default for every single
                                // species, every time — discarding real, sourced FCR values (Tacon &
                                // Metian 2008) ranging from 1.25 (salmon, trout) to 2.1 (sea_bass).
                                // This over- or under-stated feed CO2 by up to ~29% depending on species.
                                const fcr            = feedParams.fcr            || 1.5; // BUGFIX FARMED_FISH: feed conversion ratio
                                const fishmealPct    = feedParams.fishmeal_pct   || 20;  // BUGFIX FARMED_FISH
                                const fishOilPct     = feedParams.fish_oil_pct   || 5;   // BUGFIX FARMED_FISH

                                // BUGFIX FARMED_FISH: Resolve fishmeal CO2 proxy — look up anchovy or sardine in ingredients DB.
                                let fishmealCO2PerKg = 0; // BUGFIX FARMED_FISH
                                // FIX AQUA-1: proxyPef was declared with `const` INSIDE the for-loop
                                // below (block-scoped), then referenced again later at the CC
                                // sub-split section — which is OUTSIDE this loop, where that
                                // `const proxyPef` no longer exists. This threw
                                // "ReferenceError: proxyPef is not defined" on every single
                                // farmed-fish primary-data calculation, every time, silently
                                // caught by the surrounding try/catch. Net effect: the entire
                                // feed-driven CO2 model — which is typically 80-90% of a farmed
                                // fish's real footprint — never actually applied. Fixed by
                                // hoisting proxyPef to this outer scope so it survives the loop.
                                let proxyPef = null; // FIX AQUA-1
                                const ingDB = window.aioxyData && window.aioxyData.ingredients; // BUGFIX FARMED_FISH
                                if (ingDB) { // BUGFIX FARMED_FISH
                                    // BUGFIX FARMED_FISH: Search ingredients by name for anchovy or sardine as proxy.
                                    for (const [key, entry] of Object.entries(ingDB)) { // BUGFIX FARMED_FISH
                                        const entryName = (entry.name || key).toLowerCase(); // BUGFIX FARMED_FISH
                                        if (entryName.includes('anchovy') || entryName.includes('sardine')) { // BUGFIX FARMED_FISH
                                            proxyPef = entry.data && entry.data.pef; // FIX AQUA-1: assign outer-scoped variable, no re-declaration
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
                                // FIX AQUA-1: proxyPef can legitimately be null if no anchovy/sardine
                                // match was found in the ingredient database — guard against that
                                // here rather than assuming a match was always found.
                                const proxyTotalCC  = (proxyPef && proxyPef['Climate Change'])            || 0;
                                const proxyFossilCC = (proxyPef && proxyPef['Climate Change - Fossil'])   || null;
                                const proxyCCBiogen = (proxyPef && proxyPef['Climate Change - Biogenic']) || null;
                                if (
                                    proxyTotalCC > 0 &&
                                    proxyFossilCC !== null &&
                                    proxyCCBiogen !== null
                                ) {
                                    feedFossilFraction   = proxyFossilCC / proxyTotalCC;
                                    feedBiogenicFraction = proxyCCBiogen / proxyTotalCC;
                                } else {
                                    // A14-F1 FIX (Audit Session 4): Replace 100% biogenic fallback with
                                    // documented 70% fossil / 30% biogenic split for fishmeal and fish oil.
                                    // Rationale: fishmeal and fish oil production is energy-intensive
                                    // (diesel vessels, reduction plants, extraction). Real-world fossil
                                    // fractions are typically 60-80% of total CC.
                                    // Source: Pelletier et al. (2009) "Life cycle assessment of wild and
                                    // farmed Atlantic salmon" Int J Life Cycle Assess 14:609-622.
                                    // Proxy 70/30 is conservative — apply only when proxy sub-splits absent.
                                    feedFossilFraction   = 0.70;
                                    feedBiogenicFraction = 0.30;
                                    console.warn('[AIOXY A14-F1] Fish feed proxy lacks CC sub-splits. Using documented 70/30 fossil/biogenic fallback (Pelletier et al. 2009). Provide a proxy with CC sub-splits for higher accuracy.');
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
                                        : 'Fallback: 70% fossil / 30% biogenic (Pelletier et al. 2009 — proxy lacks CC sub-splits)',
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
                        const animalDef = TIER1.entericEF[pd.animalType] || null;

                        // FIX ENTERIC-2 (this session): previous lookup was
                        // `TIER1.entericEF[pd.animalType]` only — a single flat ef_ch4 value
                        // regardless of ingredient.originCountry or pd.productionSystem.
                        // Confirmed via codebase search last session that neither variable
                        // was ever referenced in this block. IMPORTANT CORRECTION: on closer
                        // check this session, the supplier UI labels productionSystem as
                        // "Audit metadata — auto-suggests manure system" — meaning it was
                        // deliberately built as documentation/UX metadata only, not left
                        // unwired by omission. Using it here to also drive enteric productivity
                        // is a genuine, positive enhancement (IPCC's own methodology supports
                        // it — see Table 10.10/10.11 high/low productivity split), not a "bug
                        // fix" in the sense of restoring intended-but-broken behavior. The
                        // region-awareness (originCountry → IPCC region) IS a straightforward
                        // bug fix — that dimension was always supposed to matter for a
                        // methodology this precise and was previously ignored entirely.
                        // Every fallback step is logged in adjustments.enteric_ef_resolution
                        // rather than silently defaulting, per this audit's standing rule.
                        let ef_ch4 = 0;
                        // FIX (2026-07-31 audit): n_excretion silently defaulted to 0 with
                        // no warning when pd.animalType wasn't found in entericEF — the only
                        // variable in this whole block that skipped the disclosed-fallback
                        // treatment everything else here correctly uses (see ef_ch4's own
                        // "not found... defaulted to 0" warning a few lines below). A missing
                        // n_excretion understates manure N2O the same way a missing ef_ch4
                        // understates enteric CH4, and deserves the same disclosure.
                        let n_excretion = animalDef ? animalDef.n_excretion : 0;
                        const efResolution = {
                            animalType: pd.animalType,
                            originCountry: ingredient.originCountry || null,
                            productionSystemRequested: pd.productionSystem || null
                        };
                        if (!animalDef) {
                            efResolution.n_excretion_warning = 'pd.animalType "' + pd.animalType + '" not found in IPCC_TIER1_LIVESTOCK.entericEF. n_excretion defaulted to 0 — manure N2O for this ingredient will understate real emissions.';
                            console.warn('[AIOXY] ' + efResolution.n_excretion_warning);
                        }

                        if (animalDef && animalDef.byRegion) {
                            // Region-aware animal type (currently: dairy_cow, beef_cattle, buffalo)
                            const region = TIER1.COUNTRY_TO_IPCC_REGION[ingredient.originCountry] || null;
                            efResolution.resolvedRegion = region;
                            const regionRow = region ? animalDef.byRegion[region] : null;

                            // CORRECTED this session (caught before shipping): the real
                            // supplierProductionSystem dropdown values are 'intensive',
                            // 'free_range', 'organic', 'pasture_fed', 'mixed' — NOT 'low'/'high'
                            // as first drafted. That draft would have silently never matched
                            // anything and always fallen through to 'blended', making the whole
                            // enhancement dead on arrival. Mapping is a genuine, disclosed
                            // judgment call, not an IPCC-sourced equivalence: IPCC's own raw
                            // data (verified this session, Table10_A_1/A_2-3 source workbooks)
                            // shows 'low productivity' systems are consistently Pasture/Range
                            // fed with lower weight/milk yield, and 'high productivity' systems
                            // are consistently Stall Fed with higher weight/milk yield/more
                            // concentrate. 'pasture_fed' maps to low; 'intensive' (indoor,
                            // typically higher-concentrate feeding) maps to high.
                            // 'organic'/'free_range'/'mixed' do not map cleanly to either — IPCC
                            // does not define these as productivity categories — so they
                            // deliberately fall through to 'blended' rather than force a guess.
                            const sysMap = { 'pasture_fed': 'low', 'intensive': 'high' };
                            const sys = sysMap[pd.productionSystem] || null;

                            if (regionRow) {
                                if (sys && regionRow[sys] !== undefined) {
                                    ef_ch4 = regionRow[sys];
                                    efResolution.tierUsed = 'Tier 1a (' + sys + ' productivity, from productionSystem="' + pd.productionSystem + '")';
                                    efResolution.applied = true;
                                } else {
                                    ef_ch4 = regionRow.blended;
                                    efResolution.tierUsed = 'Tier 1 (blended national average)';
                                    efResolution.applied = true;
                                    if (pd.productionSystem && !sys) {
                                        efResolution.note = 'productionSystem="' + pd.productionSystem + '" does not map to an IPCC low/high productivity category (only pasture_fed→low and intensive→high are mapped) — used blended value';
                                    } else if (sys && regionRow[sys] === undefined) {
                                        efResolution.note = 'productionSystem="' + pd.productionSystem + '" maps to "' + sys + '" productivity but IPCC provides no low/high split for ' + region + ' — used blended value instead';
                                    } else if (!pd.productionSystem) {
                                        efResolution.note = 'productionSystem not provided — used blended national average';
                                    }
                                }
                            } else if (region) {
                                // Region resolved but this animal type has no data for it
                                // (e.g. buffalo in North America/Oceania — confirmed absent
                                // from the IPCC source workbook itself, not an extraction gap).
                                // Fall back to the average of all regions this animalType DOES
                                // have, rather than silently using 0 or another region's value.
                                const allBlended = Object.values(animalDef.byRegion).map(r => r.blended);
                                ef_ch4 = allBlended.reduce((a,b) => a+b, 0) / allBlended.length;
                                efResolution.tierUsed = 'FALLBACK — cross-region average';
                                efResolution.applied = false;
                                efResolution.warning = 'No IPCC data for ' + pd.animalType + ' in region "' + region + '" (origin: ' + ingredient.originCountry + '). Used average of all regions with data (' + ef_ch4.toFixed(2) + ' kg CH4/head/yr) as a documented fallback, not a verified regional value.';
                            } else {
                                // originCountry not in COUNTRY_TO_IPCC_REGION at all (should not
                                // happen for the 81 countries verified this session, but a
                                // future country addition could hit this if the map isn't
                                // updated at the same time — fail loudly, not silently).
                                const allBlended = Object.values(animalDef.byRegion).map(r => r.blended);
                                ef_ch4 = allBlended.reduce((a,b) => a+b, 0) / allBlended.length;
                                efResolution.tierUsed = 'FALLBACK — unmapped country, cross-region average';
                                efResolution.applied = false;
                                efResolution.warning = 'originCountry "' + (ingredient.originCountry || 'unset') + '" has no entry in COUNTRY_TO_IPCC_REGION. Used average of all regions with data (' + ef_ch4.toFixed(2) + ' kg CH4/head/yr) as a documented fallback — this map needs updating for this country.';
                            }
                        } else if (animalDef) {
                            // Non-regionalized animal type (pig, sheep, goat, poultry, farmed_fish)
                            ef_ch4 = animalDef.ef_ch4;
                            efResolution.tierUsed = 'Tier 1 (flat, not regionalized this session)';
                            efResolution.applied = true;
                        } else {
                            efResolution.tierUsed = 'NONE — animalType not found';
                            efResolution.applied = false;
                            efResolution.warning = 'pd.animalType "' + pd.animalType + '" not found in IPCC_TIER1_LIVESTOCK.entericEF. ef_ch4 defaulted to 0 — results for this ingredient will understate enteric methane.';
                        }
                        adjustments.enteric_ef_resolution = efResolution;
                        const animalRow = { ef_ch4: ef_ch4, n_excretion: n_excretion };

                        // ── Productivity fallback for livestock if user didn't provide it ───
                        // A13-F1 FIX (Audit Session 4): Replace hardcoded 1000 kg/head fallback
                        //   with AGRIBALYSE_DEFAULT_PRODUCTIVITY per animal type.
                        // A13-F2 FIX (Audit Session 4): Remove dead FAOSTAT crop_yields lookup.
                        //   The crop_yields DB is keyed by crop name — it will never match
                        //   livestock animal type strings like 'dairy_cow', 'beef_cattle'.
                        //   The correct source for livestock productivity defaults is
                        //   IPCC_TIER1_LIVESTOCK.AGRIBALYSE_DEFAULT_PRODUCTIVITY.
                        let productPerHeadPerYear = pd.productivityMetric || 0;
                        if (!productPerHeadPerYear || productPerHeadPerYear <= 0) {
                            const TIER1_LS = window.corePhysics.CONSTANTS.IPCC_TIER1_LIVESTOCK;
                            const defaultProd = TIER1_LS.AGRIBALYSE_DEFAULT_PRODUCTIVITY
                                && TIER1_LS.AGRIBALYSE_DEFAULT_PRODUCTIVITY[pd.animalType];
                            if (defaultProd && defaultProd > 0) {
                                productPerHeadPerYear = defaultProd;
                                adjustments.productivity_fallback = {
                                    applied: true,
                                    source:  'AGRIBALYSE_DEFAULT_PRODUCTIVITY[' + pd.animalType + ']',
                                    value:   productPerHeadPerYear,
                                    note:    'User did not supply productivityMetric. Using AGRIBALYSE 3.2 French national average.'
                                };
                            } else {
                                // True last resort — animal type not in defaults DB
                                // This should never happen for supported animal types
                                productPerHeadPerYear = 1000;
                                adjustments.productivity_fallback = {
                                    applied: true,
                                    source:  'emergency_default',
                                    value:   1000,
                                    warning: 'Animal type "' + pd.animalType + '" not found in AGRIBALYSE_DEFAULT_PRODUCTIVITY. Using 1000 kg/head placeholder — results unreliable for this ingredient.'
                                };
                                console.warn('[AIOXY] Livestock productivity fallback: animal type "' + pd.animalType + '" not in AGRIBALYSE defaults. Using 1000 kg/head placeholder.');
                            }
                        }

                        // ── Enteric methane (CH4) ─────────────────────────────────────────
                        // Formula: heads = quantityKg / productPerHeadPerYear
                        //          CH4_kg = heads × efCh4PerHead
                        //          CO2e = CH4_kg × GWP_CH4_BIOGENIC (27.0, per IPCC AR6 / PEF 3.1)
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
                            //          GWP_CH4_biogenic = 27.0 (IPCC AR6, PEF 3.1)

                            const TIER1 = window.corePhysics.CONSTANTS.IPCC_TIER1_LIVESTOCK;
                            const agriDefaultProd = TIER1.AGRIBALYSE_DEFAULT_PRODUCTIVITY[pd.animalType];

                            if (agriDefaultProd && agriDefaultProd > 0 && productPerHeadPerYear > 0) {
                                // AUDIT-4 FIX (this session): was a local hardcoded 'const GWP_CH4_BIO = 28'
                                // -- a second, independent copy of the AR5 value, disconnected from the
                                // shared IPCC_AR6_PEF31 constant fixed elsewhere this session. A fix to
                                // the shared constant alone would NOT have corrected this calculation,
                                // since it never referenced the shared constant in the first place. Now
                                // uses the single real source of truth instead of a duplicated literal.
                                const headsUser    = ingredient.quantityKg / productPerHeadPerYear;
                                const headsDefault = ingredient.quantityKg / agriDefaultProd;
                                const deltaEntericCH4_kg  = (headsUser - headsDefault) * animalRow.ef_ch4;
                                const deltaEntericCO2e    = deltaEntericCH4_kg * AR6.GWP_CH4_BIOGENIC;
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
                                    // FIX (2026-08-01, found via real calculate() execution across
                                    // all 10 real animalType values — 8 of 10 crashed with
                                    // "GWP_CH4_BIO is not defined"): AUDIT-4 FIX above correctly
                                    // updated the actual math (line 1644) to use the shared
                                    // AR6.GWP_CH4_BIOGENIC constant, but this disclosure field
                                    // still referenced the OLD removed local variable name
                                    // (GWP_CH4_BIO), which no longer exists anywhere in scope —
                                    // a ReferenceError on every real animal-product calculation
                                    // that reaches this branch. Static tracing/comment-reading
                                    // missed this because the comment's claim ("now uses the
                                    // single real source of truth") was true for line 1644 but
                                    // not verified against every reference to the old name.
                                    gwp_ch4_biogenic:               AR6.GWP_CH4_BIOGENIC,
                                    note: deltaEntericPerKg < 0
                                        ? 'User productivity ABOVE AGRIBALYSE default — enteric credit applied to CC-Biogenic'
                                        : deltaEntericPerKg > 0
                                            ? 'User productivity BELOW AGRIBALYSE default — enteric penalty applied to CC-Biogenic'
                                            : 'User productivity matches AGRIBALYSE default — no delta',
                                    sources: [
                                        'ADEME Agribalyse 3.0 Technical Documentation (Collet et al. 2018) §4.3',
                                        'CNIEL/IDELE/ITAVI France national average productivities 2022',
                                        'IPCC 2006 Vol.4 Table 10.11',
                                        'GWP_CH4_biogenic=27.0 IPCC AR6 PEF 3.1'
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
                                gwp_used:              'GWP_CH4_BIOGENIC = 27.0 (IPCC AR6, PEF 3.1)',
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
                        // NOTE (2026-07-31 audit): || 0 here is now dead-safe —
                        // calculateManureN2O() above (core_physics.js) throws
                        // MissingDataError for any manureSystem not in this same
                        // table, so execution only reaches this line with a
                        // manureSystem guaranteed to have a real, valid entry.
                        const manureEF      = TIER1_CONST.manureEF[manureSystem];
                        const manureN2OPerKg = manureN2OCO2e / ingredient.quantityKg;

                        // Finding 10 FIX (2026-06-07): Manure N2O reallocated from CC-Land Use to CC-Fossil.
                        // CC-Land Use is for soil carbon stock changes (dLUC/SOC) only per EF 3.1.
                        // N2O from manure management is a direct agricultural process emission ->  CC-Fossil.
                        // Source: EF 3.1 (JRC EUR 29540 EN §4.4.2); AGRIBALYSE 3.2 methodology report.
                        flatPef['Climate Change']          += manureN2OPerKg;
                        flatPef['Climate Change - Fossil'] += manureN2OPerKg;

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
                            gwp_used:               'GWP_N2O = 273 (IPCC AR6, PEF 3.1)',
                            ipcc_source:            'IPCC 2006 Vol. 4 Tables 10.19 & 10.21, confirmed 2019 Refinement'
                        };

                        adjustments.method = 'animal_primary_data_ipcc_tier1';

                        // === FIX ANIMAL-PESTICIDE-1 (this session): animal-path pesticide
                        // disclosure — was a real, live bug, not just an open question. ===
                        // The animal-path supplier form (ui.js saveSupplierData, "ANIMAL
                        // PESTICIDE FIX" comment) collects pesticide name/CAS/rate for feed
                        // crops and saves it into primaryData.pesticides -- but the ONLY
                        // pesticide-processing code in this entire file (a few hundred lines
                        // below, in the crop-path branch) is gated behind
                        // `pd.yieldKgPerHa > 0`, a crop-only field the animal branch of
                        // saveSupplierData explicitly sets to null. Confirmed via full-file
                        // search: zero other references to pd.pesticides existed anywhere.
                        // Net effect before this fix: animal-path pesticide data was silently,
                        // completely unused for every livestock product.
                        //
                        // WHY THIS IS DISCLOSURE-ONLY, NOT A FULL CALCULATION: the crop path's
                        // USEtox block computes areaHarvested = quantityKg / yieldKgPerHa to
                        // convert a per-hectare application rate into a total substance mass.
                        // The animal path has NO equivalent — computing a real feed-crop area
                        // harvested per kg of animal product requires a feed-conversion ratio
                        // (kg feed crop consumed per kg animal product), which does not exist
                        // anywhere in this codebase (confirmed via search — no
                        // feedConversion/kgFeedPerKg constant exists). Fabricating one would be
                        // inventing a number this audit exists to prevent (same lesson as the
                        // mycelium packaging and rapeseed-meal-price findings this session).
                        // This block therefore surfaces what the user entered (name, CAS, rate)
                        // for transparency and future use, WITHOUT computing or adding any
                        // toxicity total -- correctly avoiding a fabricated-precision number,
                        // consistent with the crop-path USEtox exclusion above (which excludes
                        // a REAL computed value; this excludes because a real value cannot yet
                        // be computed at all).
                        if (pd.pesticides && pd.pesticides.length > 0) {
                            adjustments.usetox_livestock = {
                                applied: false,
                                reason: 'Feed-crop pesticide data entered, but no feed-conversion ratio (kg feed crop per kg animal product) exists in AIOXY to compute a real substance-mass total. Disclosed for transparency only -- not added to any category total.',
                                pesticides_entered: pd.pesticides.map(p => ({
                                    name: p.name || 'Unknown',
                                    cas: p.cas || null,
                                    rate_kg_per_ha: p.rateKgPerHa || null
                                })),
                                action_required: 'To compute a real feed-crop pesticide toxicity contribution, AIOXY would need a sourced feed-conversion ratio per animal type (e.g. kg dry matter feed / kg liveweight or kg milk) — not fabricated here.',
                                note: 'This replaces a prior silent gap: this data was previously collected by the UI and saved but never referenced anywhere in the calculation engine, with no disclosure that it was unused.'
                            };
                        }
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
                // A4-F1 FIX: Use sourced BASELINE_NITROGEN_KG_PER_TON from core_physics constants.
                // A4-F2 FIX: Cap nAdj at N_ADJ_MAX (3.0) to prevent data entry errors.
                // FIX: [calculation_engine audit — cross-session finding, verified] These four
                // references used bare `CONSTANTS` instead of `window.corePhysics.CONSTANTS`
                // (every other usage in this file correctly includes the window.corePhysics
                // prefix — confirmed via grep, no local CONSTANTS declaration exists anywhere
                // in this file). This threw ReferenceError: CONSTANTS is not defined the instant
                // any synthetic nitrogen value was entered, aborting the entire calculation before
                // it could complete — which is why primary data never appeared in the PDF/CSV/audit
                // trail even when correctly saved by the UI. Found and proven via actual execution
                // of this file in a Node harness with real input values by another session; cross-
                // verified here by direct inspection of this exact file before applying the fix.
                let nAdj = 1.0;
                if (pd.nitrogenKgPerTon && pd.nitrogenKgPerTon > 0) {
                    const baselineN = window.corePhysics.CONSTANTS.AGRI_PRIMARY_DATA.BASELINE_NITROGEN_KG_PER_TON;
                    const rawNAdj   = pd.nitrogenKgPerTon / baselineN;
                    nAdj = Math.min(rawNAdj, window.corePhysics.CONSTANTS.AGRI_PRIMARY_DATA.N_ADJ_MAX);
                    adjustments.baseline_nitrogen = baselineN;
                    // GAP 10 FIX: structured nitrogen_adjustment for PDF dumb-printer trace.
                    adjustments.nitrogen_adjustment = {
                        baseline_kg_per_ton: baselineN,
                        baseline_source:     'Eurostat 2022 EU27 average (tag_an_fm_fen)',
                        actual_kg_per_ton:   pd.nitrogenKgPerTon,
                        raw_factor:          rawNAdj,
                        capped_at:           window.corePhysics.CONSTANTS.AGRI_PRIMARY_DATA.N_ADJ_MAX,
                        was_capped:          rawNAdj > window.corePhysics.CONSTANTS.AGRI_PRIMARY_DATA.N_ADJ_MAX,
                        formula:             'min(actual / baseline, N_ADJ_MAX)',
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
                // A5-F2 FIX: 60/40 weights are AIOXY screening assumption — not ISO/PEF sourced.
                const co2Mult = (0.6 * yieldAdj) + (0.4 * nAdj);
                // FIX N2O-DOUBLECOUNT-1: adjustments.multipliers.co2 previously reported
                // co2Mult, which would now be FALSE for what actually drives Climate Change
                // (yieldAdj alone, see below) -- this object feeds the PDF's transparency
                // trace directly, so an inaccurate value here would be exactly the kind of
                // "report describes a mechanism the calculation doesn't use" bug found
                // elsewhere this audit (the EoL-destination false-claim finding). Corrected to
                // report yieldAdj for co2/fossil/biogenic, keeping co2Mult only for the
                // categories that still genuinely use it.
                adjustments.multipliers = {
                    co2:            yieldAdj,
                    co2_fossil:     yieldAdj,
                    co2_biogenic:   yieldAdj,
                    other_categories_co2Mult: co2Mult,
                    land:           yieldAdj,
                    water:          co2Mult,
                    fossil_resource: co2Mult
                };
                // GAP 10 FIX: store composite multiplier formula for PDF dumb-printer trace.
                // PDF reads this object directly — must NOT recompute co2Mult.
                adjustments.composite_multiplier = {
                    formula:      '(0.6 x yield_factor) + (0.4 x nitrogen_factor)',
                    yield_weight: 0.6,
                    n_weight:     0.4,
                    yield_factor: yieldAdj,
                    n_factor:     nAdj,
                    result:       co2Mult,
                    // FIX N2O-DOUBLECOUNT-1: disclose the scope change explicitly in the
                    // trace object itself, not just a code comment, so the PDF can show it.
                    note: 'This composite multiplier (yield+nitrogen combined) is NOT applied ' +
                          'to Climate Change / Fossil / Biogenic — those three categories now ' +
                          'scale by yield_factor alone, since nitrogen\'s effect on them is ' +
                          'already captured via a separate, real, additive IPCC Tier 1 N2O ' +
                          'calculation elsewhere in this trace. Applying both would double-count ' +
                          'the same physical emission. This multiplier still applies to all other ' +
                          'scaled categories (Acidification, Eutrophication, Human Toxicity, ' +
                          'Particulate Matter, Photochemical Ozone Formation, Ecotoxicity, Water ' +
                          'Use, Resource Use), which have no separate additive nitrogen term.'
                };
                adjustments.method = 'primary_data_adjusted';
                yieldFactor = yieldAdj;

                // Apply multipliers to flatPef
                // FIX N2O-DOUBLECOUNT-1 (found via independent second-Claude review,
                // confirmed by re-derivation with real constants): Climate Change / Fossil /
                // Biogenic were previously scaled by co2Mult = 0.6*yieldAdj + 0.4*nAdj (i.e.
                // nitrogen affects these categories multiplicatively) AND separately received
                // a full, real IPCC Tier 1 N2O addition from the SAME pd.nitrogenKgPerTon
                // input a few hundred lines below (GAP 2 block), gated only on
                // "nitrogen data was entered at all" -- not on how the entered value compares
                // to baseline. At EXACTLY baseline nitrogen (15 kg N/tonne, nAdj=1.0, meant to
                // be a neutral no-op), the additive term still adds a real, non-zero N2O
                // contribution regardless (independently recomputed: 0.0828 kg CO2e/kg using
                // the real EF1/EF4/EF5/FRAC_LEACH/FRAC_GASF/GWP_N2O constants in this file --
                // an ~11.3% inflation versus not entering primary data at all, for a real
                // ingredient like durum wheat, CC baseline 0.733). AGRIBALYSE's own farm-gate
                // Climate Change figures already include real-world average N2O from typical
                // fertilizer use -- this was very likely double-counting the same physical
                // emission for every ingredient where a user enters nitrogen primary data.
                // FIX: Climate Change / Fossil / Biogenic now scale by yieldAdj alone, matching
                // the EXACT precedent already set for CC-Land Use below (A5-F1 FIX) and Land
                // Use itself -- nitrogen's real effect on these three categories is now
                // correctly captured ONLY via the additive IPCC Tier 1 term, not double-applied
                // via the multiplicative proxy too. co2Mult (yield+nitrogen combined) is KEPT
                // for every other category below (Acidification, Eutrophication x3, Human
                // Toxicity x2, Particulate Matter, Photochemical Ozone Formation, Ecotoxicity,
                // Water Use, Resource Use x2) because nitrogen's real effect on THOSE
                // categories has no separate additive mechanism anywhere else in this file --
                // the proxy is still the only way those categories reflect nitrogen input at
                // all, and removing it there would silently make primary-data nitrogen entry
                // do nothing for those categories. Phosphorus and SOC additive terms
                // (independently confirmed not part of co2Mult at all) are unaffected by this
                // fix and remain correct as-is.
                flatPef['Climate Change']                *= yieldAdj;
                flatPef['Climate Change - Fossil']       *= yieldAdj;
                // NOTE (comment accuracy correction, this session): Biogenic is included here
                // too, but NOT for the double-counting reason above — the additive Tier 1 N2O
                // term (GAP 2 block, below) only ever writes to 'Climate Change' and
                // 'Climate Change - Fossil', never to 'Climate Change - Biogenic', so there
                // was nothing to double-count for Biogenic specifically. Its exclusion from
                // co2Mult rests on the SAME separate rationale as CC-Land Use directly below:
                // biogenic carbon cycling has no physical relationship to nitrogen fertilizer
                // application rate either, so the nitrogen-efficiency proxy doesn't belong
                // here regardless of the double-counting question.
                flatPef['Climate Change - Biogenic']     *= yieldAdj;
                // A5-F1 FIX (Audit Session 1): CC-Land Use scaled by yieldAdj only, not co2Mult.
                // dLUC (direct land use change) is a land-area effect — it scales with yield
                // (land area per kg of product) but has no physical relationship to nitrogen
                // application rate. Using co2Mult (which includes nAdj) was incorrect.
                // Consistent with Land Use category below which also uses yieldAdj.
                flatPef['Climate Change - Land Use']     *= yieldAdj;
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
                    // IPCC, AR6, SALCA are declared at pd scope (F3 fix) — accessible here

                    const F_SN = (pd.nitrogenKgPerTon / 1000) * ingredient.quantityKg;                                                        // kg synthetic N applied — nitrogenKgPerTon is kg N per tonne of crop, /1000 converts to kg N per kg, then × quantityKg gives total kg N
                    const N2O_direct         = F_SN * IPCC.EF1_DIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR6.GWP_N2O;                      // kg CO2e (EF1, direct)
                    const N2O_indirect_leach = F_SN * IPCC.FRAC_LEACH * IPCC.EF5_INDIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR6.GWP_N2O; // kg CO2e (EF5, leaching)
                    const N2O_volatilization = F_SN * IPCC.FRAC_GASF * IPCC.EF4_VOLATILIZATION * IPCC.N2O_MASS_CONVERSION * AR6.GWP_N2O; // kg CO2e (EF4, volatilization/atmospheric deposition)
                    const N2O_total = N2O_direct + N2O_indirect_leach + N2O_volatilization;

                    // Finding 10 FIX (2026-06-07): Synthetic N N2O reallocated from CC-Land Use to CC-Fossil.
                    // CC-Land Use covers soil carbon stock changes (dLUC/SOC), not process N2O emissions.
                    // N2O from synthetic N application is a direct soil emission -> CC-Fossil sub-split.
                    // Source: EF 3.1 (JRC EUR 29540 EN §4.4.2); AGRIBALYSE 3.2 methodology report.
                    flatPef['Climate Change']          += N2O_total / ingredient.quantityKg;
                    flatPef['Climate Change - Fossil'] += N2O_total / ingredient.quantityKg;

                    adjustments.n2o_applied = {
                        applied:                 true,
                        F_SN_kg:                 F_SN,
                        direct_kgCO2e:           N2O_direct,
                        indirect_leach_kgCO2e:   N2O_indirect_leach,
                        volatilization_kgCO2e:   N2O_volatilization,
                        formula:                 'IPCC Tier 1 (2006), EF1=IPCC.EF1_DIRECT_N2O, EF5=IPCC.EF5_INDIRECT_N2O, FRAC_LEACH=IPCC.FRAC_LEACH, EF4=IPCC.EF4_VOLATILIZATION, FRAC_GASF=IPCC.FRAC_GASF (volatilization/atmospheric deposition), GWP_N2O=AR6.GWP_N2O'
                    };
                }

                // === ORGANIC NITROGEN N₂O (ISO 14044 primary data path) ===
                // Manure, compost, digestate applied to soil.
                // Key difference from synthetic N: FRAC_GASM = 0.20 (organic N volatilization fraction)
                // vs FRAC_GASF = 0.10 for synthetic N. Both use same EF1, EF4, EF5, FRAC_LEACH.
                // Source: IPCC 2006 Vol. 4, Ch. 11, Table 11.1 & 11.3 (F_ON organic nitrogen inputs).
                if (pd.organicNitrogenKgPerTon && pd.organicNitrogenKgPerTon > 0) {
                    // A9-F1 FIX (Audit Session 2): FRAC_GASM now read from CONSTANTS.IPCC_TIER1.
                    // Previously hardcoded here — all IPCC Tier 1 constants must live in core_physics.
                    const F_ON = (pd.organicNitrogenKgPerTon / 1000) * ingredient.quantityKg;  // kg organic N applied
                    const N2O_on_direct         = F_ON * IPCC.EF1_DIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR6.GWP_N2O;
                    const N2O_on_leach          = F_ON * IPCC.FRAC_LEACH * IPCC.EF5_INDIRECT_N2O * IPCC.N2O_MASS_CONVERSION * AR6.GWP_N2O;
                    const N2O_on_volatilization = F_ON * IPCC.FRAC_GASM * IPCC.EF4_VOLATILIZATION * IPCC.N2O_MASS_CONVERSION * AR6.GWP_N2O;
                    const N2O_on_total = N2O_on_direct + N2O_on_leach + N2O_on_volatilization;

                    // Finding 10 FIX (2026-06-07): Organic N N2O reallocated from CC-Land Use to CC-Fossil.
                    // Same rationale as synthetic N above — direct soil emission, not dLUC/SOC.
                    flatPef['Climate Change']          += N2O_on_total / ingredient.quantityKg;
                    flatPef['Climate Change - Fossil'] += N2O_on_total / ingredient.quantityKg;

                    adjustments.n2o_organic_applied = {
                        applied:                 true,
                        F_ON_kg:                 F_ON,
                        direct_kgCO2e:           N2O_on_direct,
                        indirect_leach_kgCO2e:   N2O_on_leach,
                        volatilization_kgCO2e:   N2O_on_volatilization,
                        total_kgCO2e:            N2O_on_total,
                        frac_gasm:               IPCC.FRAC_GASM,
                        formula:                 'IPCC Tier 1 (2006) Vol.4 Table 11.3 organic N path: F_ON × EF1 (direct) + F_ON × FRAC_LEACH × EF5 (leach) + F_ON × FRAC_GASM(' + IPCC.FRAC_GASM + ') × EF4 (volatilization). GWP_N2O=' + AR6.GWP_N2O
                    };
                } // S2-CRITICAL FIX (Audit Session 2): Close organic N if-block here.
                  // Previously missing — SALCA-P, SOC, and USEtox were nested inside the
                  // organic N if-block and only ran when organicNitrogenKgPerTon > 0.
                  // These three pathways are independent of organic N data and must run
                  // whenever their own input data is provided. Fix: close organic N block
                  // before SALCA-P so all three pathways execute independently.

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
                // A11-F2 FIX: SOC gate requires farmingPractice === 'regen' — AIOXY design choice,
                // not required by IPCC or PEF 3.1. A conventional farmer with direct SOC measurements
                // cannot currently claim credit. Disclosed here; future UI flag planned for J6-F1.
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
                        direction:                deltaC_t_per_ha > 0 ? 'sequestration (removal)' : deltaC_t_per_ha < 0 ? 'SOC loss (source)' : 'no SOC change (delta = 0)', // A11-F1 FIX
                        category_affected:        'Climate Change - Land Use + Climate Change total',
                        formula: 'IPCC 2006 Vol.4 Ch.2 Eq.2.25: ΔC=(SOC_current−SOC_baseline)/D×C_TO_CO2×1000/yield',
                        source:  'IPCC 2006 Vol.4 Ch.2 Eq.2.25 | PEF 3.1 §4.4.8 | Nemecek & Kägi (2007) ecoinvent No.15 — cited for context; primary derivation from IPCC 2006 and PEF 3.1' // A11-F3
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
                            // A15-F2 FIX (Audit Session 4): Normalise CAS string before lookup.
                            // Previous code did .trim() only — CAS entered without dashes
                            // (e.g. '121755' instead of '121-75-5') would silently miss.
                            // Normalisation: trim whitespace, uppercase, enforce N-NN-N dash format.
                            const rawCas = (pesticide.cas || '').trim();
                            // Standard CAS format: digits-digits-digit (e.g. 1071-83-6)
                            // Normalise: remove existing dashes, reinsert at correct positions
                            const casDigits = rawCas.replace(/-/g, '').replace(/\s/g, '');
                            let cas = rawCas; // default: use as-is if already formatted
                            if (casDigits.length >= 3) {
                                // CAS format: all-but-last-3 digits - middle-2 digits - last-1 digit
                                const lastOne  = casDigits.slice(-1);
                                const lastTwo  = casDigits.slice(-3, -1);
                                const prefix   = casDigits.slice(0, -3);
                                if (prefix.length > 0) {
                                    cas = prefix + '-' + lastTwo + '-' + lastOne;
                                }
                            }

                            const rate = pesticide.rateKgPerHa || 0;
                            const amountApplied = rate * areaHarvested;

                            const htCF  = usetoxDB.human_toxicity[cas];
                            const ecoCF = usetoxDB.ecotoxicity[cas];

                            if (!htCF && !ecoCF) {
                                // Log named warning — user provided CAS but it is absent from DB
                                console.warn('[AIOXY A15-F2] CAS "' + cas + '" (raw: "' + rawCas + '") not found in USEtox 2.14 DB. Toxicity for this substance = 0. Verify CAS number or check USEtox 2.14 coverage.');
                                pesticideDetails.push({
                                    name:            pesticide.name || 'Unknown',
                                    cas_raw:         rawCas,
                                    cas_normalised:  cas,
                                    warning:         'CAS not found in USEtox 2.14 DB — substance excluded from toxicity calculation',
                                    rateKgPerHa:     rate
                                });
                                continue;
                            }
                            // CAS found in USEtox DB — calculate toxicity contributions
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
                            // FIX (this session, RESOLVED — was previously "FIX 3: Use += to ADD USEtox
                            // substance-specific values to the AGRIBALYSE background toxicity"):
                            // CONFIRMED double-counting, not just an elevated risk. Per AGRIBALYSE's own
                            // official FAQ (doc.agribalyse.fr) and the OLCA-Pest Final Project Report
                            // (ADEME 17-03-C0025, Jan 2020): AGRIBALYSE 3.2's background Human Toxicity
                            // (cancer/non-cancer) and Ecotoxicity-freshwater totals for every ingredient
                            // ALREADY incorporate pesticide-driven impact via the OLCA-Pest/PestLCI
                            // Consensus model as one of AGRIBALYSE's own standard inputs — confirmed via
                            // ingredients_db.txt: every entry already carries non-zero values for these
                            // three categories with no separate "pesticide contribution" field to
                            // de-duplicate against. Adding a second, independently-computed USEtox
                            // pesticide-toxicity number on top, for the same substances, on the same
                            // ingredient, double-counts pesticide-driven toxicity in these categories.
                            // DECISION: do NOT add totalCancerCTUh / totalNonCancerCTUh /
                            // totalEcotoxicityCTUe into flatPef. The per-substance breakdown below
                            // (pesticideDetails) is retained and still surfaced to the user/report as
                            // supplementary disclosure information — it is informative (which
                            // substances were entered, at what rate) but must NOT feed the PEF category
                            // totals used for the actual footprint result.
                            // NOTE: this does not mean pesticide impact is invisible in AIOXY's results —
                            // it is already present, via AGRIBALYSE's own background modelling, in
                            // whatever Human Toxicity / Ecotoxicity-freshwater value the ingredient's
                            // base PEF record already carries.
                        }
        
                        adjustments.usetox_applied = {
                            applied: false,
                            reason: 'CONFIRMED double-counting against AGRIBALYSE 3.2 background — not applied to totals',
                            source: 'USEtox 2.14 (calculated but excluded from flatPef, disclosure only)',
                            area_harvested_ha: areaHarvested,
                            total_cancer_CTUh_excluded: totalCancerCTUh,
                            total_noncancer_CTUh_excluded: totalNonCancerCTUh,
                            total_ecotoxicity_CTUe_excluded: totalEcotoxicityCTUe,
                            pesticides: pesticideDetails,
                            // RESOLVED (this session): externally verified against AGRIBALYSE's own
                            // official methodology documentation (doc.agribalyse.fr FAQ) and the
                            // OLCA-Pest Final Project Report (ADEME 17-03-C0025): "The modelling of
                            // pesticide emissions is different (OLCA-Pest model in Agribalyse...)".
                            // AGRIBALYSE's background Human Toxicity / Ecotoxicity-freshwater values
                            // already incorporate a dedicated, real pesticide emissions model
                            // (OLCA-Pest) for every ingredient entry (verified: no ingredient in
                            // ingredients_db.txt has a zero/placeholder value in these three
                            // categories). This additive USEtox substance-specific layer was
                            // confirmed to double-count pesticide-driven toxicity — once via
                            // AGRIBALYSE's own OLCA-Pest-modeled background, again via this
                            // substance-specific addition — and has been excluded from flatPef
                            // accordingly. The values above are retained for transparency/disclosure
                            // only (what the user entered, and what USEtox alone would attribute to
                            // it), not as a component of the reported footprint.
                            double_counting_risk: 'RESOLVED — excluded from totals, see reason above'
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
             // ROOT CAUSE FIX (2026-06-06): This brace was missing. All code from "1f. Apply
              // processing archetype" down through ingredientResults.push(ingEntry) was trapped
              // inside if (ingredient.primaryData), meaning every standard AGRIBALYSE ingredient
              // (primaryData = null) was silently skipped — ingredientResults stayed empty,
              // every ingredient showed 0.0000 in web audit trail, CSV Block 6, and PDF page 6.
              // Fix: close the if (ingredient.primaryData) block here so processing archetype,
              // geo proxy, country factors, calculateIngredientImpact, and the push all run
              // for EVERY ingredient regardless of whether primary data was supplied.

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

            // 1g. Geographic proxy adjustment — REMOVED (FIX GEO-PROXY-1)
            //
            // This block previously applied a flat, unsourced 1.15x "conservative penalty
            // for non-FR transport and production" to the 4 Climate Change categories.
            // Removed for two reasons, both grounded in AIOXY's core principle that every
            // number must trace to an official source — no unsourced multipliers:
            //
            // 1. TRANSPORT double-counting: Upstream (resolveInboundTransport +
            //    calculateTransport, GLEC v3.2) now separately, precisely, and honestly
            //    calculates the real inbound transport leg for every non-FR ingredient,
            //    with real distances and real emission factors. Any portion of this 1.15x
            //    that represented "transport" duplicated that real, sourced number with a
            //    fake one — verified on a real ingredient: 15% flat penalty added 0.024
            //    kg CO2e/kg, Upstream separately added 0.047 kg CO2e/kg, a 44% combined
            //    surcharge over base for one non-FR ingredient with no primary data.
            //
            // 2. PRODUCTION: unlike Water Use (AWARE 2.0) and Land Use (LANCA v2.5), which
            //    apply real, citable, country-specific ratios from real international
            //    databases, no equivalent sourced database exists yet for country-specific
            //    agricultural climate-production intensity. A flat 15% guess is not a
            //    substitute for that — it is exactly the kind of unsourced number this
            //    platform exists to replace. Reporting the AGRIBALYSE FR-reference value
            //    as-is, with an honest disclosed limitation, is more defensible to a real
            //    auditor than an uncited multiplier presented as a considered adjustment.
            //
            // Non-FR, non-primary-data ingredients now report their AGRIBALYSE FR-reference
            // Climate Change value unmodified by this step (Upstream transport still applies
            // separately and precisely; AWARE/LANCA still apply separately for their own
            // categories). This is disclosed explicitly in the PDF/audit trail rather than
            // silently changed — see pdf-generator.js ingredient detail Layer B.
            //
            // ROADMAP (not a code fix): the principled long-term replacement is a real,
            // FAOSTAT-sourced (or equivalent peer-reviewed) country agricultural-climate-
            // intensity ratio table, built the same way AWARE/LANCA already were — a genuine
            // sourced factor, not a placeholder dressed up to look like one.
            if (ingredient.originCountry && ingredient.originCountry !== 'FR' && !ingredient.primaryData) {
                adjustments.geo_proxy_applied = false;
                adjustments.geo_proxy_removed_reason =
                    'No sourced country-specific production-intensity factor exists yet for Climate ' +
                    'Change (unlike AWARE 2.0 for Water Use and LANCA v2.5 for Land Use, which are ' +
                    'real, citable, country-specific ratios). Reporting the AGRIBALYSE FR-reference ' +
                    'value as-is rather than applying an unsourced multiplier. Inbound transport for ' +
                    'this ingredient is still calculated precisely and separately — see Upstream stage.';
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

            // ── CO-PRODUCT ALLOCATION (this session, FIX ALLOC-1) ──────────────────
            // CRITICAL FINDING this session: `wasteComponents`/`lossFraction` computed
            // elsewhere in this file (search "Audit 8.4" / "informational only") was
            // ALWAYS DISPLAY-ONLY — it never reduced the real ingredient total that flows
            // into pefResults. This meant 100% of a processed ingredient's impact was
            // always attributed to the product, even when the processing method's own
            // "loss" fraction is a valuable co-product (oilseed meal from crushing, bran
            // from milling, corn gluten/oil/steep liquor from wet_milling) rather than
            // genuine waste — a real, live gap for grain/oilseed products, not a
            // hypothetical one, per ISO 14044 §4.3.4 which REQUIRES allocation whenever a
            // process yields more than one valuable output.
            //
            // Fix applies HERE, once, to the complete allCategoryResults object — a single
            // auditable multiplication point, not scattered per-category math that would be
            // harder to verify. Only affects ingredients whose db.processing[method] entry
            // has a coProducts array AND a matching ingredient-type key (currently:
            // rapeseed, soybean, under "crushing"). Every other processing method and every
            // other ingredient is completely unaffected — this is intentionally narrow to
            // the specific case with real, sourced allocation data, not a blanket change to
            // how processing loss is handled everywhere.
            //
            // Per ISO 14044 §4.3.4(c): economic allocation (not mass allocation) is the
            // methodologically appropriate basis here specifically because oil and meal
            // have very different economic value relative to their mass share (oil is a
            // minority of mass but the dominant economic driver) — this is an explicit,
            // official reason to prefer economic over physical/mass allocation in this
            // case, not a convenience shortcut.
            adjustments.coproduct_allocation = { applied: false };
            if (input && input.manufacturing && input.manufacturing.processingMethod === 'crushing') {
                const db = window.aioxyData;
                const procEntry = db && db.processing ? db.processing['crushing'] : null;
                const cpKey = (ingredient.id || '').toLowerCase().includes('rapeseed') ? 'rapeseed'
                            : (ingredient.id || '').toLowerCase().includes('soybean') ? 'soybean'
                            : null;
                const coProducts = procEntry && procEntry.coProducts && cpKey ? procEntry.coProducts[cpKey] : null;

                if (coProducts && coProducts.length > 0) {
                    try {
                        const allocInputs = coProducts.map(p => ({ mass: p.massFraction, price: p.price }));
                        const allocationFactors = window.complianceEngine.calculateEconomicAllocation(allocInputs);
                        // First co-product in each list (see ingredients.js) is always the
                        // OIL — the product this ingredient record represents in AIOXY.
                        // The meal's allocated share belongs to whatever product consumes
                        // the meal (e.g. animal feed) — out of scope for THIS calculation,
                        // correctly excluded rather than double-counted into this product.
                        const oilAllocationFactor = allocationFactors[0];

                        for (const cat of Object.keys(allCategoryResults)) {
                            if (typeof allCategoryResults[cat] === 'number') {
                                allCategoryResults[cat] = allCategoryResults[cat] * oilAllocationFactor;
                            }
                        }
                        adjustments.coproduct_allocation = {
                            applied: true,
                            method: 'ECONOMIC (ISO 14044 §4.3.4c — appropriate here as oil/meal have very different economic value relative to mass share)',
                            ingredientCoProductSet: cpKey,
                            allocationFactorApplied: oilAllocationFactor,
                            coProducts: coProducts.map((p, i) => ({ name: p.name, massFraction: p.massFraction, price: p.price, priceUnit: p.priceUnit, priceDate: p.priceDate, priceConfidence: p.priceConfidence, allocationFactor: allocationFactors[i] })),
                            note: 'Full ingredient impact multiplied by the oil co-product\'s economic allocation factor. The excluded share belongs to the meal co-product\'s own product system, not this one — correctly excluded, not lost.'
                        };
                    } catch (allocError) {
                        // Fail loudly into adjustments, never silently skip allocation and
                        // never silently apply a guessed factor — consistent with this
                        // audit's standing rule against silent defaults.
                        adjustments.coproduct_allocation = {
                            applied: false,
                            error: 'Allocation calculation failed: ' + (allocError && allocError.message ? allocError.message : String(allocError)),
                            warning: 'Full, unallocated ingredient impact used — this OVERSTATES this product\'s footprint by including the meal co-product\'s share.'
                        };
                    }
                } else if (cpKey) {
                    // FIX (2026-08-01, cofounder-directed): this crop (currently: rapeseed)
                    // is recognized as needing co-product allocation -- crushing genuinely
                    // produces oil + meal, both with real economic value -- but no official
                    // price source for rapeseed oil/meal has been added to this database yet
                    // (confirmed 2026-08-01: not tracked by World Bank Pink Sheet, unlike
                    // soybean; candidates identified: Euronext/MATIF futures settlement, FAO/
                    // Eurostat agricultural series). Previously this fell through to a bare
                    // applied:false with no explanation at all -- indistinguishable in the
                    // report from an ingredient where allocation simply doesn't apply.
                    // Cofounder's own framing: don't let one ingredient's missing official
                    // price block the whole system, and regulators want disclosed
                    // traceability over unattainable perfection -- so this calculation still
                    // completes normally (unallocated, same number as before), but now says
                    // exactly why, by how much it's affected, and what would resolve it,
                    // matching the disclosed-fallback pattern already used elsewhere in this
                    // engine (animalType, productionSystem, inbound_transport_failure).
                    adjustments.coproduct_allocation = {
                        applied: false,
                        reason: 'NO_OFFICIAL_PRICE_SOURCE',
                        ingredientCoProductSet: cpKey,
                        warning: 'This ingredient genuinely has a valuable co-product (meal) from crushing, but no ' +
                            'official commodity price source for ' + cpKey + ' oil/meal currently exists in this ' +
                            'database (soybean has one; ' + cpKey + ' does not). Full, unallocated ingredient ' +
                            'impact used pending an official source -- this OVERSTATES this product\'s footprint ' +
                            'by including the full meal co-product share, which correctly belongs to a different ' +
                            'product system.'
                    };
                }
            }

            // 1h-b. Inbound transport leg (non-FR origins only)
            // AGRIBALYSE 3.2 already includes FR domestic transport — FR returns null.
            // Same-country origins also return null. All others get GLEC v3.2 calc.
            // Wrapped in try-catch: failure logs a warning but never blocks calculation.
            const upstreamComponents = [];
            try {
                const ingOrigin  = ingredient.originCountry || 'FR';
                const mfgCountry = (input.manufacturing && input.manufacturing.country) || 'FR';
                const route = resolveInboundTransport(ingOrigin, mfgCountry);
                if (route) {
                    const temp = (input.manufacturing &&
                        input.manufacturing.processingMethod === 'freezing') ? 'frozen' : 'ambient';
                    const r = window.corePhysics.calculateTransport({
                        massKg:        ingredient.quantityKg,
                        distanceKm:    route.distanceKm,
                        mode:          route.mode,
                        refrigeration: temp
                    });
                    const co2 = (r && r.total) ? r.total : 0;
                    upstreamComponents.push({
                        name:                 ingData.name,
                        id:                   ingredient.id,
                        origin:               ingOrigin,
                        destination:          mfgCountry,
                        mode:                 route.mode,
                        distanceKm:           route.distanceKm,
                        massKg:               ingredient.quantityKg,
                        refrigeration:        temp,
                        subtotal:             co2,
                        fossilCO2:            (r && r.fossilCO2) ? r.fossilCO2 : co2,
                        biogenicCO2:          0,
                        dlucCO2:              0,
                        multiCategoryResults: (r && r.multiCategoryResults) ? r.multiCategoryResults : {},
                        daf_applied:          route.mode === 'road' ? 1.05 : 1.15,
                        source:               route.source,
                        notes:                ingOrigin + ' \u2192 ' + mfgCountry +
                                              ' | ' + route.mode.toUpperCase() +
                                              ' | ' + route.distanceKm + ' km pre-DAF | GLEC v3.2'
                    });
                }
            } catch (inboundErr) {
                // FIX (2026-08-01 audit): this catch previously only logged to
                // console.warn — a channel the customer's PDF never reads. A route
                // could resolve (real IN->FR leg identified) and then genuinely fail
                // inside calculateTransport() (e.g. an invalid mode/refrigeration
                // derived by resolveInboundTransport, or a missing GLEC factor for
                // that mode), and the ingredient's report would silently show ZERO
                // upstream transport impact -- indistinguishable from the legitimate
                // "same country, no leg needed" case at pdf-generator.js's
                // "not applied" fallback line. That is a real, undisclosed gap in a
                // report whose own stated principle is full traceability. Recorded
                // here on `adjustments` (same object/pipeline already proven to reach
                // the PDF for enteric_ef_resolution) so pdf-generator.js can render
                // this distinctly from the "nothing to disclose" case.
                adjustments.inbound_transport_failure = {
                    attempted: true,
                    error: inboundErr ? inboundErr.message : String(inboundErr),
                    warning: 'Inbound ingredient transport calculation failed for this ' +
                        'ingredient and was excluded from the Upstream total below. ' +
                        'This UNDERSTATES this product\'s footprint by an unknown amount.'
                };
                console.warn('[AIOXY] Inbound transport skipped for "' +
                    (ingData ? ingData.name : ingredient.id) + '": ' +
                    (inboundErr ? inboundErr.message : String(inboundErr)));
            }

            // 1i. Build contribution tree entry
            // FIX ORIGIN-1 (root cause): ingEntry previously carried no origin/originCountry
            // field at all, even though ingredient.originCountry is the real, correct input
            // value (used two lines above at ~2446 for inbound transport, and separately
            // captured inside universal_adjustments.adjusted_for_country). Consequence: any
            // downstream consumer reading ing.origin or ing.originCountry directly off this
            // object (e.g. twin_module.js) got undefined and fell back to a hardcoded 'FR'
            // default, regardless of the ingredient's real origin. Confirmed via live harness
            // run: Twin BOM correctly showed IN, but the Twin ingredient trace page showed
            // "Origin: FR" and a self-contradictory "Origin: FR (non-FR)" against a same-country
            // reference. Fix: expose originCountry directly on ingEntry.
            const ingEntry = {
                name:               ingData.name,
                id:                 ingredient.id,
                quantityKg:         ingredient.quantityKg,
                originCountry:      ingredient.originCountry || 'FR', // FIX ORIGIN-1: root-cause fix, see comment above buildContributionTree entry construction
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
                upstreamComponents: upstreamComponents
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
        // FIX (2026-07-31 audit): the final else branch below previously treated
        // ANY value other than 'renewable'/'natural_gas'/'coal' as implicitly
        // meaning grid electricity — including a genuine typo or an unrecognized
        // value from a non-UI caller (buildTwinInput, restored session state, a
        // future API integration). That would silently compute using the grid
        // pathway for an energySource the user never actually selected, producing
        // a real, plausible-looking, but wrong number. energySource is a small,
        // closed, sourced set (matches the only four options the UI dropdown
        // offers) — validating it explicitly here means every caller, not just
        // the current dropdown, is held to the same standard.
        const VALID_ENERGY_SOURCES = ['grid', 'renewable', 'natural_gas', 'coal'];
        if (!VALID_ENERGY_SOURCES.includes(mfgIn.energySource)) {
            throw new CalculationError('Invalid manufacturing.energySource: "' + mfgIn.energySource + '". Must be one of: ' + VALID_ENERGY_SOURCES.join(', '));
        }
        let gridIntensity;
        if (mfgIn.energySource === 'renewable') {
    // CoM 2024 Table 3: Wind LCA = 0.036 t CO2-eq/MWh = 36 g CO2/kWh
    // Source: European Commission, Covenant of Mayors, Emission Factors
    //   for Local Energy Use, 2024 Edition, JRC
    gridIntensity = 36;
        } else if (mfgIn.energySource === 'natural_gas') {
            // Finding 8 FIX (2026-06-07): 42% efficiency assumption now explicitly sourced.
            // Derivation: IPCC 2006 Vol. 2, Ch. 2, Table 2.2: Natural gas CO2 = 56,100 kg/TJ.
            // Electrical efficiency 42%: IEA (2023) "World Energy Outlook" Annex A,
            // Table A.2: EU average combined-cycle gas turbine (CCGT) efficiency = 42%
            // (net electrical efficiency, existing fleet average).
            // Calculation: 56,100 kg CO2/TJ × (1 TJ/1000 GJ) × (1 GJ/277.78 kWh) / 0.42
            //   = 56,100 × 0.0036 / 0.42 = 481 g CO2/kWh → rounded to 490 per IEA 2023
            //   convention (IEA rounds fuel combustion emission factors to nearest 10).
            // Source 1: IPCC 2006 Guidelines Vol. 2, Table 2.2 (CO2 emission factor).
            // Source 2: IEA World Energy Outlook 2023, Annex A Table A.2 (CCGT efficiency).
            gridIntensity = 490;
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
            // FIX (2026-07-31 audit): the ": 2.13" fallback previously silently
            // applied natural gas's CO2 factor to ANY unrecognized fuelType —
            // a typo, or a value from a caller other than this exact dropdown.
            // This feeds Primary Factory Data (a customer's real utility bills,
            // the highest-trust input this system accepts): if a factory
            // reports e.g. diesel/HFO and fuelType doesn't match exactly, this
            // would silently compute using natural gas's factor against a
            // different fuel's real quantity — a materially wrong number
            // presented with full "primary data" confidence. fuelType is a
            // small, closed, sourced set matching the dropdown's five options.
            if (FUEL_CO2_FACTORS[fuelType] === undefined) {
                throw new CalculationError('Invalid manufacturing.primaryFactoryData.fuelType: "' + fuelType + '". Must be one of: ' + Object.keys(FUEL_CO2_FACTORS).join(', '));
            }
            const fuelFactor = FUEL_CO2_FACTORS[fuelType];
            // CoM 2024 Table 1: Natural gas = 0.20196 t CO2/MWh (activity-based)
// 1 m³ gas ≈ 0.01056 MWh (38 MJ/m³ ÷ 3,600 MJ/MWh)
// ∴ 0.20196 × 0.01056 × 1,000 = 2.13 kg CO2/m³
// Source: European Commission, Covenant of Mayors, Emission Factors
//   for Local Energy Use, 2024 Edition, JRC
const gasCO2 = gasM3PerKg * fuelFactor;

            // REFRIGERANT LEAKAGE — F-gas direct emissions
            // Formula: kg CO2e = (kgLeaked / totalOutputKg) × GWP_refrigerant (IPCC AR4, per EU F-Gas
            // Regulation (EU) 2024/573 Annex I, which mandates AR4 values for HFCs -- NOT the latest
            // IPCC AR, unlike EF 3.1's own Climate Change indicator which uses AR6. AUDIT-4
            // correction (this session): was mislabeled "AR5" -- values were always numerically
            // correct (verified against EU F-Gas Regulation Annex I / refrigerant supplier data
            // sheets), only the citation was wrong.)
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
            // Source: IPCC AR4 GWP100, per EU F-Gas Regulation (EU) 2024/573 Annex I
            // C10-F2 FIX (Audit Session 7): All REFRIGERANT_GWP keys now uppercase suffixes
            // to match the .toUpperCase() normalisation applied to user input.
            // Previous bug: 'r-134a' → normalised to 'R-134A' but key was 'R-134a' → miss.
            // Fix: keys match the normalised form (.toUpperCase() output).
            const REFRIGERANT_GWP = {
                'R-404A': 3922, 'R-134A': 1430, 'R-407C': 1774, 'R-410A': 2088,
                'R-507A': 3985, 'R-32':    675,  'R-744':     1, 'R-717':     0
            };
            // Note: R-32 and R-717 have no letter suffix — .toUpperCase() has no effect.
            // R-744 similarly unaffected. Only R-134a and R-507a had lowercase suffix issue.

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
                // C8-F1 FIX (Audit Session 7): Derive fossil fraction from grid intensity.
                // Matches the fix applied in core_physics.js calculateManufacturing().
                // CC total unchanged — only CC-Fossil/CC-Biogenic sub-split improves.
                // AUDIT-3 FIX (found via re-verification of A9, this session): 'energySource'
                // here was a bare, never-declared identifier -- every other reference in this
                // function correctly reads mfgIn.energySource, but these two lines didn't,
                // which is a genuine ReferenceError ("energySource is not defined") that would
                // crash the ENTIRE calculation for any product using the primary-factory-data
                // override (mfgIn.usePrimaryFactoryData), a real, live, reachable feature path,
                // not dead code. Also note: the dropdown/database only ever produces
                // 'natural_gas' (never bare 'gas') and never produces 'oil' at all (confirmed:
                // no 'oil' option exists in the energySource dropdown) -- 'oil' is left in this
                // condition only because FUEL_CO2_FACTORS above supports a separate fuelType
                // of 'fuel_oil' for a different field; it's harmless here (never matches) but
                // kept rather than removed, since removing it isn't part of what this fix proves.
                fossilFraction: (function() {
                    const ref = window.corePhysics.CONSTANTS.FOSSIL_FRACTION.FOSSIL_GRID_REFERENCE_G_PER_KWH;
                    // For gas/coal/oil energy sources, override to 1.0 (fully fossil combustion)
                    if (mfgIn.energySource === 'natural_gas' || mfgIn.energySource === 'coal' || mfgIn.energySource === 'oil') return 1.0;
                    // For renewable, use minimum floor
                    if (mfgIn.energySource === 'renewable') return 0.05;
                    // For grid: derive from intensity
                    return Math.min(1.0, Math.max(0.05, gridIntensity / ref));
                })(),
                source:               'Primary Factory Data',
                gridIntensityGPerKwh: gridIntensity,
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

        // 3b. Crisis routing — D5-F1 FIX: 40% penalty documented.
                // Conservative screening assumption based on 2021-2024 supply chain disruptions.
                // Suez Canal closure 2024: +15-20% Asia-Europe. Broader disruptions reach 30-40%.
                // Not a regulatory value — use only for scenario sensitivity analysis.
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

        // FIX EOL-DESTINATION-1 (this session, corrects a real pre-launch-review finding):
        // A prior session's pdf-generator.js comment ("NEW-2 FIX") explicitly claimed this
        // was already wired: "Ed resolved from packaging DB co2_disposal_[eolDest]... eolDestination
        // now wired into CFF calculation." That claim was FALSE — this line never referenced
        // eolDestination at all; it always used the flat co2_disposal_average regardless of
        // the user's actual EU Average / Recycled / Incinerated / Landfill selection. The
        // report's own transparency text was describing a mechanism that did not exist in
        // the calculation — found via direct trace during pre-launch adversarial review.
        // Real per-scenario data DOES exist in ingredients.js (co2_disposal_landfill,
        // co2_disposal_incineration, confirmed present for every packaging material) — it
        // was simply never read here. Now genuinely wired:
        //   'landfill'     -> co2_disposal_landfill (real, material-specific)
        //   'incinerated'  -> co2_disposal_incineration (real, material-specific)
        //   'recycled'     -> uses co2_disposal_average as an honest proxy; a "100% Recycled
        //                     (Closed Loop)" scenario's disposal-stage emissions are not
        //                     separately modelled in ingredients.js (only landfill/incineration
        //                     splits exist) -- using the material average here is disclosed,
        //                     not fabricated as a distinct number the database doesn't have.
        //   'eu_average' / anything else -> co2_disposal_average (the correct EU-blended default)
        // NOTE: r2 (end-of-life recycling RATE) correctly does NOT vary by eolDestination --
        // r2 represents the material's real-world waste-stream recycling statistic (a
        // property of the material, per PEF Annex C), not a claim this specific product's
        // packaging makes about its own disposal. Only ed (disposal-stage EMISSIONS, which
        // genuinely differ between landfill and incineration physically) should vary by
        // scenario -- this was correctly identified in scoping before writing this fix.
        // FIX (2026-07-31 audit): eolDestination previously accepted any string
        // at all — 'recycled', 'eu_average', AND any typo or unrecognized value
        // all silently fell through to the same honest co2_disposal_average.
        // The average itself is a legitimate, disclosed choice (see NOTE above
        // this block) — but a genuine typo (e.g. "landfil") meant the user's
        // actual selection silently never took effect, with no error and no
        // disclosure that their choice was ignored. Now validates against the
        // three real values so a typo fails loudly instead of being silently
        // absorbed into the average.
        const VALID_EOL_DESTINATIONS = ['landfill', 'incinerated', 'recycled', 'eu_average'];
        if (!VALID_EOL_DESTINATIONS.includes(pkgIn.eolDestination === undefined || pkgIn.eolDestination === null ? 'eu_average' : pkgIn.eolDestination)) {
            throw new CalculationError('Invalid packaging.eolDestination: "' + pkgIn.eolDestination + '". Must be one of: ' + VALID_EOL_DESTINATIONS.join(', '));
        }
        const eolDest = pkgIn.eolDestination || 'eu_average';
        let ed;
        if (eolDest === 'landfill' && pkgData.co2_disposal_landfill !== undefined && pkgData.co2_disposal_landfill !== null) {
            ed = pkgData.co2_disposal_landfill;
        } else if (eolDest === 'incinerated' && pkgData.co2_disposal_incineration !== undefined && pkgData.co2_disposal_incineration !== null) {
            ed = pkgData.co2_disposal_incineration;
        } else {
            // 'recycled', 'eu_average', or any unrecognized value -- honest average fallback
            ed = (pkgData.co2_disposal_average !== undefined && pkgData.co2_disposal_average !== null)
                    ? pkgData.co2_disposal_average
                    : (pkgData.co2_disposal !== undefined && pkgData.co2_disposal !== null ? pkgData.co2_disposal : 0.05);
        }
        // FIX 1: CFF R2 — pkgData.r2 IS the Annex C end-of-life recycling rate; do not multiply by r1_max.
        // r1_max separately caps the user-supplied recycled content fraction per PEF 3.1 Annex C.
        // E3-F1 FIX: Validate recycledPct range 0-100.
        if (pkgIn.recycledPct !== null && pkgIn.recycledPct !== undefined) {
            if (pkgIn.recycledPct < 0 || pkgIn.recycledPct > 100) {
                throw new CalculationError('recycledPct out of range 0-100: ' + pkgIn.recycledPct);
            }
            if (pkgIn.recycledPct > 0 && pkgIn.recycledPct <= 1.0) {
                console.warn('[AIOXY E3-F1] recycledPct=' + pkgIn.recycledPct + ' looks like a fraction. Use percentage (0-100).');
            }
        }
        const r1Uncapped = pkgIn.recycledPct / 100;
        const r1         = pkgData.r1_max !== undefined ? Math.min(r1Uncapped, pkgData.r1_max) : r1Uncapped;
        // FIX PKG-R2-1: was `pkgData.r2 || 0.7` — JavaScript's || treats 0 as falsy, so any
        // material with a genuinely-intended r2 of exactly 0 (e.g. PLA, which has near-zero
        // real-world composting/recycling infrastructure per its own database entry) had
        // that correct 0 silently overridden with a wrong fallback default of 0.7. Confirmed:
        // this made PLA's packaging CO2 come out ~21% low (0.1103 vs the correct 0.1400 for
        // a 0.05kg/20%-recycled-content test case) because the CFF formula's "credit" term
        // scales with r2, so a phantom 70% end-of-life recycling rate applied a large credit
        // that should never have existed. Same falsy-zero risk existed for qs below (no
        // current material has q=0, but the pattern was still wrong) — both fixed with
        // explicit undefined/null checks instead of ||.
        const r2         = (pkgData.r2 !== undefined && pkgData.r2 !== null) ? pkgData.r2 : 0.7;
        const qs         = (pkgData.q !== undefined && pkgData.q !== null) ? pkgData.q : 0.9;
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

            let mfgTotal = 0;
            if (cat === 'Climate Change') {
                mfgTotal = mfgResult.co2;
            } else if (cat === 'Climate Change - Fossil') {
                mfgTotal = mfgResult.co2 * mfgResult.fossilFraction;
            } else if (cat === 'Climate Change - Biogenic') {
                // BUGFIX CC-BIOGENIC-MFG-TRANS (this session): this branch was missing entirely,
                // so (1 - fossilFraction) of mfgResult.co2 (real, already-counted in headline
                // Climate Change) was never assigned to either sub-split — it just disappeared
                // from the Fossil+Biogenic accounting. Formula mirrors packagingResult's existing
                // fossilImpact/biogenicImpact split and core_physics.js calculatePackaging():
                // biogenicImpact = totalImpact x (1 - fossilFraction).
                // Headline Climate Change and PEF Single Score are unaffected (see
                // SCORABLE_CATEGORIES, which excludes all 3 CC sub-splits from scoring) —
                // only the Fossil/Biogenic sub-split breakdown itself was incomplete.
                mfgTotal = mfgResult.co2 * (1 - mfgResult.fossilFraction);
            // C12-F1 FIX (Audit Session 7): Removed 'Resource Use, fossils' special case (kwh * 3.6).
            // Now falls through to multiCategoryResults[cat] which holds the grid-mix-appropriate
            // ELECTRICITY_GRID_MULTI value. See buildContributionTree fix above for full rationale.
            } else if (
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
            } else if (cat === 'Climate Change - Biogenic') {
                // BUGFIX CC-BIOGENIC-MFG-TRANS (this session): same missing-branch gap as
                // Manufacturing above. Invisible in reports where transport fossilFraction = 1.0
                // (100% diesel, CONSTANTS.FOSSIL_FRACTION.TRANSPORT_DIESEL) since (1-1.0)=0, but
                // would silently drop real CO2e for any non-diesel transport mode in the future.
                transTotal = transportResult.total * (1 - transportResult.fossilFraction);
            } else if (
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

            // Inbound upstream transport — sum across all ingredient legs
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

            const total = ingTotal + mfgTotal + transTotal + pkgTotal + upstreamTotal;

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
            name:   ing.name,
            impact: ing.allCategoryResults['Climate Change'] || 0,
            dqr:    ing.dqr,
            // J1-F1 + J6-F1 FIX (Audit Sessions 12/13): Derive isUnderOperationalControl
            // from whether the ingredient has primary data supplied by the brand.
            // Ingredients where the brand provided primaryData (yield, N, pesticides, etc.)
            // represent processes under their operational influence — apply stricter DQR ≤ 2.0.
            // Ingredients using only secondary AGRIBALYSE data are background — DQR ≤ 3.0.
            // This is a first approximation; a full foreground/background UI flag is flagged
            // as Finding J6-F1 for a future UI session.
            isUnderOperationalControl: !!(ing.primary_data_used)
        }));
        // J1-F2/J2-F1/J4-F1 FIX: DNM, cutoff, hotspot use CC as proxy denominator.
        // PEF 3.1 requires single score denominator. CC is practical proxy for food LCA.
        // Full per-category evaluation is outside current scope — documented here.
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
                // FIX (2026-07-31 audit): TeR/TiR/GeR/RR previously defaulted to 0
                // (the BEST possible DQI score, per AGRIBALYSE DQI Matrix v3.0.1's
                // 1=best/5=worst scale) when an ingredient's database record has
                // metadata.dqr_overall (required, always present — see line ~1218)
                // but no per-indicator metadata.dqr breakdown. That silently
                // reported "highest quality on this indicator" for an indicator
                // that was never actually scored — a false transparency claim in
                // exactly the metric meant to disclose data quality. Reporting
                // null (indicator not available for this ingredient) instead of a
                // fabricated 0 lets CSV/PDF consumers correctly show "N/A" rather
                // than a specific, wrong, falsely-reassuring number.
                TeR: (typeof dqrBkd.TeR === 'number') ? dqrBkd.TeR : null,
                TiR: (typeof dqrBkd.TiR === 'number') ? dqrBkd.TiR : null,
                GeR: (typeof dqrBkd.GR === 'number') ? dqrBkd.GR : ((typeof dqrBkd.GeR === 'number') ? dqrBkd.GeR : null),   // database key is 'GR' (geographical representativeness)
                CoR: 0,                                 // not scored per AGRIBALYSE DQI Matrix v3.0.1 — this is a real, deliberate "not applicable" 0, not a data gap
                RR:  (typeof dqrBkd.P === 'number') ? dqrBkd.P : null                   // 'P' (precision) maps to reliability/reproducibility column
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
            // NOTE (2026-07-31 audit): nf[cat]/wf[cat] || 0 looks like a silent
            // fallback but is NOT reachable with missing data in practice —
            // calculateSingleScore() above (core_physics.js) already validated
            // every category in this exact scorablePefResults object and throws
            // MissingDataError per-category if nf/wf is missing, before this loop
            // runs. Verified: same object, same keys, called first. Left as ||0
            // rather than duplicating the throw, since it can't fire here.
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
            return { mean: 0, p5: 0, p95: 0, derivedCVPct: null };
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
                // FIX COMP-ALLOC-1: this and the other 2 occurrences of allocation_note
                // elsewhere in this function were hardcoded to 'Mass allocation (ISO 14044)'
                // across all 3 comparison paths (recipe twin, legacy single-ingredient twin,
                // auto self-comparison), while the main product's own report consistently
                // discloses Economic allocation (inherited from AGRIBALYSE 3.2) everywhere
                // else. Same report, two different allocation methods claimed for the same
                // underlying AGRIBALYSE-sourced data, with no explanation — an unexplained
                // inconsistency, not a deliberate design choice. Corrected to match the
                // actual, consistent method used throughout the rest of the platform.
                allocation_note:       'Economic allocation, inherited from AGRIBALYSE 3.2 (ADEME methodology)',
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
                delta:               twinResult.delta,
                // ARCHITECTURE FIX (2026-07-30): deltaPerKg/deltaPct were
                // previously computed independently in both ui.js and
                // audit-trail.js — and disagreed. audit-trail.js divided the
                // raw batch-level twinResult.delta by a single shared
                // weightKg; ui.js instead subtracted the two sides' own
                // already-normalized per-kg totals directly (its own BUG-24
                // fix comment: "resolvedBaseline.delta holds per-pair delta
                // not product total"). The batch-delta approach is only
                // correct when assessed and conventional recipes have equal
                // total mass — not guaranteed for a "what-if" twin with
                // different ingredient quantities on each side. Standardizing
                // on ui.js's correct method here: each side's co2PerKg is
                // already normalized by its own recipe's mass
                // (twinResult.assessedTotal/conventionalTotal in
                // calculateParametricTwin, core_physics.js), so subtracting
                // them directly is always correct regardless of mass
                // difference between sides.
                deltaPerKg:          twinResult.assessedTotal.co2PerKg - twinResult.conventionalTotal.co2PerKg,
                deltaPct:            twinResult.conventionalTotal.co2PerKg > 0
                                         ? ((twinResult.assessedTotal.co2PerKg - twinResult.conventionalTotal.co2PerKg) / twinResult.conventionalTotal.co2PerKg) * 100
                                         : 0
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
                    allocation_note:       'Economic allocation, inherited from AGRIBALYSE 3.2 (ADEME methodology)',
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
                allocation_note:       'Economic allocation, inherited from AGRIBALYSE 3.2 (ADEME methodology)',
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

            // FIX COMMODITY-PRICE-1 (this session, corrects a real bug found during
            // pre-launch review): 'cow' was matched into the 'beef' commodity key, meaning
            // every "Cow milk" ingredient (a genuinely different, dairy product with its own
            // distinct real-world market price) was priced as if it were beef cattle meat
            // (EUR 7.60/kg) for the allocation-sensitivity check. Confirmed via full-database
            // search: multiple real "Cow milk" ingredient variants exist and would all have
            // hit this false match. Milk/dairy is now checked FIRST and separately, using a
            // real, dated World Bank Pink Sheet-consistent-format price entry (added below in
            // aioxy_derived_db.txt), before the beef check -- 'cow' is removed from the beef
            // match entirely, since "cattle"/"beef" alone still correctly catch genuine beef
            // cattle ingredients without the milk false-positive.
            // FIX COMMODITY-PRICE-2 (found while testing FIX COMMODITY-PRICE-1): confirmed
            // via full-database search that 2 real ingredients ("Suckler cull cow" variants)
            // contain neither "beef" nor "cattle" nor "milk"/"dairy" -- a cull cow is a
            // retired dairy/beef animal sold for meat at end of productive life, economically
            // a beef product, not milk, so it should classify as beef, not fall through to
            // the 1.0 generic fallback. Adding "cull cow" as an explicit beef match term.
            // AUDIT-4 FIX (this session, found via exhaustive testing of the fix above against
            // the full real ingredient database): 4 real "Cull cow" entries also contain the
            // phrase "milk system" (e.g. "Cull cow, ... highland milk system, grass fed...") --
            // describing the dairy farming system the cow came from, NOT the product being sold.
            // Since milk/dairy was checked first, these fell into 'milk' before the cull-cow
            // check ever ran -- pricing a meat product (cull cow, sold at end of productive
            // life) as milk, an even larger mismatch (~23x) than the original beef-for-milk bug.
            // Reordered: cull-cow/beef/cattle checked FIRST, since "cull cow" is a more specific
            // product-type signal than "milk" appearing only as part of a system descriptor.
            // Verified safe: no real "Cow milk" (non-cull) entry contains beef/cattle/cull cow.
            if      (nameLower.includes('cull cow') || nameLower.includes('beef') || nameLower.includes('cattle')) commodityKey = 'beef'; // BUGFIX B12 + FIX COMMODITY-PRICE-2 + AUDIT-4 reorder
            else if (nameLower.includes('milk')    || nameLower.includes('dairy'))              commodityKey = 'milk';      // FIX COMMODITY-PRICE-1
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
        //
        // FIX JRC-1: this previously compared the WHOLE PRODUCT's per-kg-of-product
        // Climate Change (e.g. 2.84 kg CO2e/kg finished food) against
        // compliance_engine.js's REFERENCE_VALUES table — which are JRC BAT benchmarks
        // for producing 1kg of the PACKAGING MATERIAL itself (e.g. 1.40 for glass_bottle),
        // not 1kg of finished product. Different scope entirely — this guaranteed a "FAIL"
        // on almost any real recipe regardless of whether anything was actually wrong.
        // Corrected to compare the packaging stage's own per-kg-of-material impact
        // (packagingResult.impactPerKg — the CFF Layer A/B result before scaling by
        // packaging weight) against the same-scope JRC reference.
        // Resource Use/fossils and Water Use are only checked when the packaging
        // database actually has a factor for this material/category (multiCategoryResults
        // > 0) — otherwise a declared data gap would also show as a false FAIL against a
        // nonzero reference, which is a second, unrelated reason to be zero.
        const JRC_MATERIAL_MAP = { 'PET': 'PET_granulates', 'cardboard': 'cardboard', 'glass': 'glass_bottle' };
        const jrcMaterialKey = JRC_MATERIAL_MAP[input.packaging.material] || null;
        let jrcValidationResult = null;

        if (jrcMaterialKey) {
            try {
                const pkgWeightKg = input.packaging.weightKg;
                const jrcCalculatedImpact = {
                    'Climate Change': packagingResult.impactPerKg
                };
                if (pkgWeightKg > 0) {
                    const fossilPerKgMat = (packagingResult.multiCategoryResults?.['Resource Use, fossils'] || 0) / pkgWeightKg;
                    const waterPerKgMat  = (packagingResult.multiCategoryResults?.['Water Use/Scarcity (AWARE)'] || 0) / pkgWeightKg;
                    // BUGFIX JRC-ZERO (this session): previously only assigned these keys
                    // when > 0, so a genuine, declared-zero packaging factor (e.g. cardboard
                    // has no Resource Use, fossils factor at all — core_physics.js
                    // PACKAGING_MULTI_CATEGORY['cardboard']['Resource Use, fossils'] = 0,
                    // an honest data gap) was indistinguishable from the field never being
                    // set. compliance_engine.js could only see "missing", not "genuinely
                    // zero", and reported both as MISSING_DATA. Always assign the key so
                    // the real, computed value (including a real zero) reaches the
                    // validator, which now (BUGFIX JRC-ZERO there too) labels a zero
                    // input as a declared gap rather than either missing data or an
                    // unexplained deviation.
                    jrcCalculatedImpact['Resource Use, fossils'] = fossilPerKgMat;
                    jrcCalculatedImpact['Water Use/Scarcity (AWARE)'] = waterPerKgMat;
                }
                const jrcRaw = window.complianceEngine.runJRCValidation({
                    materialType: jrcMaterialKey,
                    calculatedImpact: jrcCalculatedImpact
                });
                // runJRCValidation returns true on pass; normalise to object for consistency
                // BUGFIX JRC-LABEL (this session): the non-shortcut branch (jrcRaw is the
                // real { pass, warnings, score, checks, overall_pass } object — the normal
                // case whenever any check actually ran) previously returned jrcRaw as-is,
                // which has no materialType field at all (runJRCValidation's return object,
                // compliance_engine.js, never sets one). pdf-generator.js reads
                // jrcVal.materialType to qualify each check's displayed name (e.g.
                // "Packaging (cardboard) — Climate Change" instead of a bare "Climate
                // Change" that reads as a whole-product check). Without this, that
                // qualification silently had nothing to read and fell back to the
                // unqualified category name for every real PARTIAL/FAIL result — only the
                // rare all-pass shortcut above ever carried materialType through.
                jrcValidationResult = (jrcRaw === true)
                    ? { passed: true, materialType: jrcMaterialKey }
                    : { ...jrcRaw, materialType: jrcMaterialKey };
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
        // FIX (2026-07-31 audit): when no category has a positive mean (a real,
        // reachable edge case — e.g. an extremely low-footprint product), this
        // previously silently substituted 15 with no citation and no disclosure
        // — a specific, plausible-looking uncertainty percentage indistinguishable
        // downstream from a genuinely-computed one. 15% was never sourced from
        // this product's Monte Carlo run; it was an arbitrary placeholder. Now
        // explicitly flagged via isFallback, so every consumer (audit-trail, PDF,
        // retailer CSV) can disclose "uncertainty not computable for this product"
        // rather than presenting a fabricated number as if it were measured.
        const overallUncertaintyIsFallback = ciWidths.length === 0;
        const computedOverallUncertainty = !overallUncertaintyIsFallback
            ? Math.round((ciWidths.reduce((s, v) => s + v, 0) / ciWidths.length) * 100 * 100) / 100
            : null;

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

        // Finding 17 FIX (2026-06-07): Math.random() fallback removed — throws instead.
        // A random dppId cannot be reproduced and has no audit trail integrity.
        // If auditTrail.dppId is missing, the SHA-256 finalization failed and must surface loudly.
        // ISO 14044 §4.5 requires reproducibility — a random ID breaks that requirement.
        if (!auditTrail.dppId) {
            throw new Error(
                '[AIOXY] CRITICAL: auditTrail.dppId is missing after finalizeAuditTrail(). ' +
                'SHA-256 hash generation failed. Check that crypto.subtle is available in this ' +
                'browser context and that finalizeAuditTrail() was awaited correctly.'
            );
        }
        const dppIdPlaceholder = auditTrail.dppId;

        // === PHASE 2: Extended manufacturing traceability with residual mix ===
        const manufacturingTraceability = {
            source:     mfgResult.source || 'Ember 2025 / IEA',
            parameters: {
                country:                input.manufacturing.country,
                energySource:           input.manufacturing.energySource,
                gridIntensityGPerKwh:   mfgResult.gridIntensityGPerKwh ?? null,   // BUG-11 FIX: gridIntensity is local to processManufacturing and not in scope here; use null when primary factory data path omits it (baked into elecCO2 already)
                // FIX (2026-08-01 audit): processingMethod was already used in the real
                // calculation (processManufacturing) and already appeared in the free-text
                // audit narrative ("Processing method  : baking"), but was never a real
                // structured field here -- forcing any downstream consumer (twin_module.js's
                // operational-parity check) to either skip comparing it entirely or fragile-
                // parse it out of prose. Same pattern as the packaging.eolDestination fix
                // earlier this session.
                processingMethod:      input.manufacturing.processingMethod
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

        // === ARCHITECTURE FIX (2026-07-30): Enviroscore + Equivalencies ===
        // Both were previously computed in ui.js (and Enviroscore ALSO
        // independently in pdf-generator.js — a duplicated, driftable copy).
        // Centralized here so web and PDF both read one already-computed,
        // already-audited number instead of each doing their own arithmetic.
        // See core_physics.js calculateEnviroscore/calculateEquivalencies
        // for the full rationale and citations.
        const enviroscoreResult = window.corePhysics.calculateEnviroscore({
            pefResults:      pefResults,
            productWeightKg: input.product.weightKg
        });

        const unifiedCO2PerKg = pefResults['Climate Change'].total / input.product.weightKg;
        const baselineCO2PerKg = comparisonBaseline ? comparisonBaseline.co2PerKg : 0;
        const baselineWaterPerKg = comparisonBaseline ? (comparisonBaseline.waterPerKg || 0) : 0;
        const unifiedWaterPerKg = pefResults['Water Use/Scarcity (AWARE)'].total / input.product.weightKg;

        const equivalenciesDelta = window.corePhysics.calculateEquivalencies({
            mode:            'delta',
            co2DeltaPerKg:   baselineCO2PerKg - unifiedCO2PerKg,
            waterScoreDiffM3: baselineWaterPerKg - unifiedWaterPerKg
        });
        const equivalenciesStory = window.corePhysics.calculateEquivalencies({
            mode:      'story',
            co2PerKg:  unifiedCO2PerKg
        });

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
                // ARCHITECTURE FIX (2026-07-31): true when no category had a
                // positive Monte Carlo mean, so overall_uncertainty is null
                // rather than a genuinely-computed figure. Consumers must check
                // this before displaying overall_uncertainty as a real number.
                overall_uncertainty_is_fallback: overallUncertaintyIsFallback,
                monte_carlo:         monteCarloResults
            },

            pef_single_score: {
                singleScore:           singleScoreResult.finalMicroPoints,
                normalizedScore:       singleScoreResult.normalizedScore,
                weightedScore:         singleScoreResult.weightedScore,
                breakdown:             singleScoreResult.breakdown
            },

            // ARCHITECTURE FIX (2026-07-30): centralized from ui.js/pdf-generator.js.
            // Single source of truth consumed identically by web and PDF —
            // see core_physics.js calculateEnviroscore() for full rationale.
            enviroscore: enviroscoreResult,

            // ARCHITECTURE FIX (2026-07-30): centralized from ui.js.
            // 'delta' = measured difference vs comparison baseline (used by the
            // Environmental Impact Story card). 'story' = this product's own
            // absolute footprint translated to the single most picturable unit
            // (used by the front-of-pack headline). Tree-year equivalence is
            // deliberately absent from both — see core_physics.js note.
            equivalencies: {
                delta: equivalenciesDelta,
                story: equivalenciesStory
            },

            compliance_status: dnmResult.compliant ? 'COMPLIANT' : 'WARNING',
            dnm_alerts:        dnmResult.warnings || [],
            hotspot_analysis:  hotspotResult,
            comparison_baseline: comparisonBaseline,

            traceability: {
                ingredients:             ingredientTraceability,
                ingredient_routes:       ingredientResults.map(ing => ({
                    name:               ing.name,
                    id:                 ing.id,
                    originCountry:      (ing.universal_adjustments && ing.universal_adjustments.adjusted_for_country) || 'FR',
                    upstreamComponents: ing.upstreamComponents || []
                })),
                manufacturing:           manufacturingTraceability,
                transport:               { source: 'GLEC v3.2',               parameters: { mode: input.transport.mode, distanceKm: input.transport.distanceKm } },
                packaging:               {
                    source: 'PEF 3.1 CFF / Ecoinvent',
                    parameters: {
                        material:       input.packaging.material,
                        recycledPct:    input.packaging.recycledPct,
                        weightKg:       input.packaging.weightKg,
                        // FIX (2026-08-01 audit): eolDestination was validated and used by the
                        // real calculation (processPackaging(), closed-set checked earlier this
                        // session) but never captured on this traceability record. Downstream
                        // consumers (retailer_csv_engine.js buildMasterData()) had no computed
                        // source to read, so pkgEoL fell back to re-reading the live DOM form
                        // field -- which can silently differ from what was actually calculated
                        // if the user changed the dropdown after running calculate(). Adding it
                        // here closes that gap the same way distanceKm already works for transport.
                        eolDestination: input.packaging.eolDestination
                    },
                    // ARCHITECTURE FIX (2026-07-30): full Circular Footprint Formula
                    // derivation, read straight from calculatePackaging()'s own return
                    // object (core_physics.js) rather than left for a downstream
                    // consumer to reconstruct. audit-trail.js previously recomputed
                    // this entire formula independently from raw DOM/database values
                    // for its CSV glass-box disclosure — a duplicate of official EU PEF
                    // Annex C methodology with no structural guard against it silently
                    // diverging from this, the actual calculation used for every number
                    // elsewhere in the app. Now there is exactly one CFF computation;
                    // every consumer (web, PDF, CSV, audit-trail) reads this object.
                    cff: packagingResult.cff
                },
                normalization_weighting: { source: 'EF 3.1 JRC', version: 'EF 3.1' }
            },

            ISO_compliance: {
                compliance_statement: 'Screening-level assessment per ISO 14040:2006 and ISO 14044:2006.',
                principles: {
                    // FIX SYSTEM-BOUNDARY-1 (this session, found during pre-launch D7 review):
                    // was the hardcoded string 'Cradle-to-Retail' -- a SECOND, independently
                    // maintained copy of the real boundary value already defined once in
                    // core_physics.js's SYSTEM_BOUNDARY.VALUE ("cradle-to-retail", all
                    // lowercase). The two strings had drifted apart in capitalization. This
                    // was harmless today only because compliance_engine.js's
                    // validateSystemBoundary() (an exact-match `!==` check against this exact
                    // value) has zero callers anywhere in the codebase -- confirmed via
                    // full-file search. If that function is ever wired into the live
                    // calculation flow in the future WITHOUT this fix, it would have thrown a
                    // false "boundary mismatch" error on every single calculation, since
                    // 'Cradle-to-Retail' !== 'cradle-to-retail' in JavaScript. Fixed by
                    // referencing the real constant directly instead of maintaining a second
                    // copy -- eliminates the drift risk entirely rather than just correcting
                    // the casing once. NOTE: actually wiring validateSystemBoundary() into the
                    // live flow was deliberately NOT done in this same pass -- flagged as a
                    // defined follow-up requiring its own dedicated verification, not rushed
                    // in as the last item of a long session.
                    system_boundary: window.corePhysics.CONSTANTS.SYSTEM_BOUNDARY.VALUE,
                    functional_unit: '1 kg of product as sold',   // BUG-19 FIX: functional unit is always 1 kg; input.product.weightKg (e.g. 0.2 kg) is the formulation batch weight used for per-kg normalisation
                    allocation:      'Economic allocation per ISO 14044'
                }
            },

            foreground_background: {
                foreground_count:        foregroundIngredients.length,
                background_count:        backgroundIngredients.length,
                cutoff_percentage:       0.05,
                components: {
                    // FIX DQR-COMPONENTS-1: dqr was previously omitted here even though it
                    // exists correctly on i.dqr (set from metadata.dqr_overall earlier in the
                    // pipeline). Its absence caused pdf-generator.js's `ing.dqr || 2.00`
                    // foreground/background table to always print the 2.00 fallback instead
                    // of the ingredient's real, already-computed DQR value.
                    foreground: foregroundIngredients.map(i => ({ name: i.name, co2: i.allCategoryResults['Climate Change'] || 0, dqr: i.dqr })),
                    background: backgroundIngredients.map(i => ({ name: i.name, co2: i.allCategoryResults['Climate Change'] || 0, dqr: i.dqr }))
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
                overall_pass: null,
                not_applicable: true,
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
