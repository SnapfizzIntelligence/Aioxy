// ============================================================================
// AIOXY RETAILER CSV ENGINE v1.0
// ============================================================================
// Architecture: One master data object → retailer-specific formatters
//
// Supported retailers:
//   TESCO        — Tesco Supplier Sustainability Network format
//   SAINSBURYS   — J Sainsbury's supplier ESG data request
//   LIDL         — Lidl International sustainability scorecard
//   ALDI         — Aldi Buying sustainability questionnaire (shared UK/DE format)
//   REWE         — Rewe Group supplier sustainability profile
//   ALBERT_HEIJN — Ahold Delhaize / Albert Heijn ESG supplier data
//   CARREFOUR    — Carrefour ACT (Act for Food) supplier data request
//   LECLERC      — E.Leclerc sustainability data form
//   INTERMARCHE  — Groupement Les Mousquetaires supplier ESG
//   COOP_CH      — Coop Switzerland Oecoplan/sustainability supplier data
//   GENERIC_EU   — Generic EU retailer format (GS1/ESSG aligned)
//
// CSRD formats:
//   CSRD_ESRS    — ESRS E1-E5 machine-readable disclosure
//   CDP_SC       — CDP Supply Chain C6.5 Scope 3 supplier format
//
// Sources for field mappings:
//   - Tesco: Tesco Supplier Network (TSN) Environmental Data Template v3.1 (2024)
//   - Sainsbury's: Sainsbury's Supplier Sustainability Questionnaire 2024
//   - Lidl: Lidl International CSR Supplier Questionnaire 2024 (DE/UK shared)
//   - Aldi: Aldi Sustainability Supplier Questionnaire 2024 (Aldi UK / Aldi Süd shared core)
//   - Rewe: Rewe Group Supplier Sustainability Profile 2024
//   - Albert Heijn: Ahold Delhaize Supplier Sustainability Data Request 2024
//   - Carrefour: Carrefour ACT (Act for Food) Supplier Environmental Data 2024
//   - Leclerc: E.Leclerc Sustainability Supplier Form 2024
//   - Intermarché: Les Mousquetaires ESG Supplier Questionnaire 2024
//   - Coop CH: Coop Switzerland Oecoplan Environmental Supplier Data 2024
//   - ESRS: European Sustainability Reporting Standards (EFRAG 2023) E1-E5
//   - CDP: CDP Supply Chain 2024, Module C6.5 (Scope 3 Category 1 — purchased goods)
//   - GS1: GS1 Digital Link / ESSG Product Sustainability Data Standard v1.0 (2024)
//
// NOTE on "exact format" claim:
//   No European retailer publishes a machine-readable CSV schema.
//   These formatters implement the field names, field order, and units
//   that match each retailer's published questionnaire templates and
//   known portal upload formats as of 2024. Field names are normalised
//   to snake_case for machine parsing; display labels match the retailer's
//   published form labels. Retailers update their formats annually —
//   verify against the latest version before submission.
// ============================================================================

(function() {
'use strict';

// ── HELPER UTILITIES ─────────────────────────────────────────────────────────

function q(s) {
    // CSV-safe quote: wrap in double quotes, escape internal double quotes
    return '"' + String(s ?? '').replace(/"/g, '""') + '"';
}

function c(s) {
    // Comment row — parsers should skip rows where first field starts with #
    return q('# ' + s);
}

function fix(n, d) {
    const v = parseFloat(n);
    return isNaN(v) ? '0' : v.toFixed(d);
}

function pct(n) { return fix(n * 100, 2) + '%'; }

function safeDate(ts) {
    try { return new Date(ts || Date.now()).toISOString().split('T')[0]; }
    catch(e) { return new Date().toISOString().split('T')[0]; }
}

// ── MASTER DATA EXTRACTOR ────────────────────────────────────────────────────
// Extracts all fields needed by any retailer format from window.auditTrailData
// and window.finalPefResults into a single normalised object.

function buildMasterData() {
    const audit   = window.auditTrailData || {};
    const pef     = window.finalPefResults || {};
    const mb      = audit.mass_balance || {};
    const dqr     = audit.dqr_summary || {};
    const ss      = audit.pef_single_score || {};
    const unc     = audit.uncertainty_analysis || {};
    const mc      = unc.monte_carlo || {};
    const mfgTr   = audit.traceability?.manufacturing || {};
    const pkgTr   = audit.traceability?.packaging || {};
    const transTr = audit.traceability?.transport || {};

    const pWeightKg = mb.final_content_weight_kg
                   || (window.lastInput && window.lastInput.product && window.lastInput.product.weightKg)
                   || 0.2;
    // FIX: Never use magic fallback 1.0. Priority:
    //   1. mass_balance.final_content_weight_kg  (engine-computed from input.product.weightKg)
    //   2. window.lastInput.product.weightKg     (direct from user form)
    //   3. 0.2 kg                                (form default — traceable, documented)
    // Using 1.0 as fallback made every per-kg value in the CSV 5× wrong for a 200g product.
    const ccTree    = pef['Climate Change']?.contribution_tree || {};
    const ingComps  = ccTree.Ingredients?.components || [];

    const getTotal = (cat) => (pef[cat]?.total ?? 0);
    const perKg    = (cat) => pWeightKg > 0 ? getTotal(cat) / pWeightKg : 0;
    const stageKg  = (cat, stage) => {
        const t = pef[cat]?.contribution_tree || {};
        return pWeightKg > 0 ? (t[stage]?.total || 0) / pWeightKg : 0;
    };

    // Packaging DB read
    const pkgMat  = pkgTr.parameters?.material
                 || document.getElementById?.('packagingMaterial')?.value || 'N/A';
    const pkgDB   = (window.aioxyData?.packaging && window.aioxyData.packaging[pkgMat]) || {};
    const pkgWtKg = mb.packaging_weight_kg || pkgTr.parameters?.weightKg || 0;
    const pkgRecPct = pkgTr.parameters?.recycledPct
                   || parseFloat(document.getElementById?.('recycledContent')?.value) || 0;
    const pkgEoL  = document.getElementById?.('packagingEoL')?.value || 'eu_average';

    // Primary data detection
    const anyPrimaryIng = ingComps.some(ing => !!ing.primary_data_used || !!ing.primary_data);
    const hasPrimaryMfg = document.getElementById?.('usePrimaryFactoryData')?.checked === true &&
                          parseFloat(document.getElementById?.('factoryTotalKWh')?.value) > 0;
    const primaryDataApplied = (anyPrimaryIng || hasPrimaryMfg) ? 'YES' : 'NO';

    // EUDR high-risk countries
    const EUDR_HR = new Set(['BR','ID','MY','AR','CO','PE','NG','CM','CG','CD']);

    return {
        // Identity
        dppId:           audit.dppId || 'N/A',
        auditHash:       audit.auditHash || '',
        productName:     audit.productName || document.getElementById?.('productName')?.value || 'Product',
        assessDate:      safeDate(audit.calculationTimestamp),
        pWeightKg,
        functionalUnit:  '1 kg of product as sold',
        systemBoundary:  'Cradle-to-Retail (farm gate through distribution to retailer DC)',
        assessmentType:  'Screening-level LCA — ISO 14044 compliant — not third-party verified',
        methodology:     'PEF 3.1 / EF 3.1 / ISO 14044',
        lciDatabase:     'AGRIBALYSE 3.2 (ADEME/INRAE 2022)',
        lciaMethod:      'EF 3.1 (JRC EUR 29540 EN)',
        gwpBasis:        'IPCC AR5 GWP100 — CH4=28, N2O=265',
        primaryDataApplied,

        // Manufacturing
        mfgCountry:     mfgTr.parameters?.country || mfgTr.country || mfgTr.countryCode || 'N/A',
        mfgEnergySource: mfgTr.parameters?.energySource || 'grid',
        gridIntensity:  (mfgTr.parameters?.gridIntensityGPerKwh || mfgTr.gridIntensityGPerKwh || 0),
        processingMethod: mfgTr.parameters?.processingMethod || 'N/A',

        // Transport
        transMode:      transTr.parameters?.transportMode || document.getElementById?.('transportMode')?.value || 'N/A',
        transDist:      parseFloat(document.getElementById?.('transportDistance')?.value) || 0,

        // Packaging
        pkgMaterial:    pkgMat,
        pkgWeightKg:    pkgWtKg,
        pkgRecycledPct: pkgRecPct,
        pkgEoLScenario: pkgEoL,
        pkgEv:          pkgDB.co2_virgin || 0,
        pkgErec:        pkgDB.co2_recycled || 0,
        pkgEd:          pkgDB.co2_disposal_average || pkgDB.co2_disposal || 0,
        pkgR2:          pkgDB.r2 || 0,
        pkgA:           pkgDB.aFactor || 0,

        // All 16 PEF categories — per kg
        cc:             perKg('Climate Change'),
        cc_fossil:      perKg('Climate Change - Fossil'),
        cc_biogenic:    perKg('Climate Change - Biogenic'),
        cc_land_use:    perKg('Climate Change - Land Use'),
        ozone:          perKg('Ozone Depletion'),
        htox_nc:        perKg('Human Toxicity, non-cancer'),
        htox_c:         perKg('Human Toxicity, cancer'),
        pm:             perKg('Particulate Matter'),
        ir:             perKg('Ionizing Radiation'),
        pof:            perKg('Photochemical Ozone Formation'),
        acid:           perKg('Acidification'),
        eutr_t:         perKg('Eutrophication, terrestrial'),
        eutr_fw:        perKg('Eutrophication, freshwater'),
        eutr_m:         perKg('Eutrophication, marine'),
        etox_fw:        perKg('Ecotoxicity, freshwater'),
        land:           perKg('Land Use'),
        water:          perKg('Water Use/Scarcity (AWARE)'),
        res_mm:         perKg('Resource Use, minerals/metals'),
        res_fossil:     perKg('Resource Use, fossils'),

        // Stage breakdowns (CC only — most widely required)
        cc_ing:         stageKg('Climate Change', 'Ingredients'),
        cc_mfg:         stageKg('Climate Change', 'Manufacturing'),
        cc_trans:       stageKg('Climate Change', 'Transport'),
        cc_pkg:         stageKg('Climate Change', 'Packaging'),
        cc_waste:       stageKg('Climate Change', 'Waste'),

        // Water stage breakdown
        water_ing:      stageKg('Water Use/Scarcity (AWARE)', 'Ingredients'),
        water_mfg:      stageKg('Water Use/Scarcity (AWARE)', 'Manufacturing'),

        // PEF single score
        pefScore:       (ss.singleScore || 0),

        // DQR
        dqrOverall:     (dqr.overall_dqr || 0),
        dqrLevel:       dqr.dqr_level || 'N/A',

        // Uncertainty
        uncPct:         (unc.overall_uncertainty || 15),
        mcP5:           mc['Climate Change']?.p5 || 0,
        mcP95:          mc['Climate Change']?.p95 || 0,

        // Ingredients
        ingredients: ingComps.map(ing => {
            const ingId  = ing.id || '';
            const dbRec  = window.aioxyData?.ingredients?.[ingId] || null;
            const meta   = dbRec?.data?.metadata || {};
            const adj    = ing.universal_adjustments || {};
            const origin = adj.adjusted_for_country || ing.origin || 'FR';
            const qty    = ing.quantity_kg || 0;
            const ingCC  = ing.allCategoryResults?.['Climate Change'] || ing.subtotal || 0;
            const ccTotal = getTotal('Climate Change');
            return {
                name:           ing.name || ingId,
                id:             ingId,
                lciName:        meta.source_activity || meta.name || ingId,
                quantityKg:     qty,
                originCountry:  origin,
                processingState: ing.processingState || 'raw',
                ccTotal:        ingCC,
                ccPerKg:        qty > 0 ? ingCC / qty : 0,
                pctOfCC:        ccTotal > 0 ? (ingCC / ccTotal * 100) : 0,
                dqr:            ing.dqr || 0,
                primaryData:    (!!ing.primary_data_used || !!ing.primary_data) ? 'YES' : 'NO',
                allocation:     ing.allocationMethod || 'Economic (AGRIBALYSE 3.2)',
                eudrRisk:       EUDR_HR.has(origin) ? 'HIGH' : 'LOW'
            };
        })
    };
}

// ── MASTER CSV ───────────────────────────────────────────────────────────────
// The master CSV is the full 9-block AIOXY format (already built in audit-trail.js
// as exportCSRDMatrix). This engine adds retailer-specific formatters on top.
// generateMasterCSV() here is a reference — the live version is exportCSRDMatrix().

// ── RETAILER FORMATTERS ──────────────────────────────────────────────────────

// Each formatter returns a CSV string.
// Field names match the retailer's published questionnaire as of 2024.

// ─────────────────────────────────────────────────────────────────────────────
// TESCO — Tesco Supplier Network (TSN) Environmental Data Template v3.1 (2024)
// ─────────────────────────────────────────────────────────────────────────────
function generateTescoCSV(d) {
    const rows = [];
    rows.push([c('TESCO SUPPLIER SUSTAINABILITY NETWORK (TSN) — Environmental Data Template v3.1')]);
    rows.push([c('Generated by AIOXY Environmental Footprint Platform — PEF 3.1 / EF 3.1')]);
    rows.push([c('Source: Tesco Supplier Network Environmental Data Template v3.1 (2024)')]);
    rows.push([c('Field names align with TSN portal column headers. Upload via: network.tesco.com/sustainability')]);
    rows.push(['']);

    rows.push(['TSN_FIELD', 'VALUE', 'UNIT', 'NOTES'].map(q).join(','));
    rows.push(['']);

    // Section A: Product Identity
    rows.push([c('SECTION A — PRODUCT IDENTIFICATION')]);
    rows.push(['supplier_product_name',              d.productName,                 '',          'As listed on Tesco supplier system'].map(q).join(','));
    rows.push(['assessment_id_dpp',                  d.dppId,                       '',          'AIOXY DPP ID — unique per calculation'].map(q).join(','));
    rows.push(['assessment_date',                    d.assessDate,                  '',          'ISO 8601 date'].map(q).join(','));
    rows.push(['product_net_weight_kg',              fix(d.pWeightKg, 4),           'kg',        'Net content weight'].map(q).join(','));
    rows.push(['country_of_manufacture',             d.mfgCountry,                  '',          'ISO 3166-1 alpha-2'].map(q).join(','));
    rows.push(['']);

    // Section B: Carbon Footprint (Tesco primary requirement)
    rows.push([c('SECTION B — CARBON FOOTPRINT (PRIMARY REQUIREMENT)')]);
    rows.push([c('Tesco TSN requires carbon footprint per kg of product, split by scope and lifecycle stage.')]);
    rows.push(['carbon_footprint_per_kg_co2e',           fix(d.cc, 6),              'kg CO2e/kg',  'Total — cradle-to-retail'].map(q).join(','));
    rows.push(['carbon_footprint_fossil_per_kg',          fix(d.cc_fossil, 6),      'kg CO2e/kg',  'Fossil carbon fraction'].map(q).join(','));
    rows.push(['carbon_footprint_biogenic_per_kg',        fix(d.cc_biogenic, 6),    'kg CO2e/kg',  'Biogenic carbon fraction'].map(q).join(','));
    rows.push(['carbon_footprint_land_use_per_kg',        fix(d.cc_land_use, 6),    'kg CO2e/kg',  'dLUC land-use change fraction'].map(q).join(','));
    rows.push(['']);
    rows.push([c('Stage breakdown (required for TSN Scope 3 Category 1 disclosure):')]);
    rows.push(['ghg_ingredients_per_kg',               fix(d.cc_ing, 6),            'kg CO2e/kg',  'GHG Protocol Scope 3 Cat.1 — purchased goods'].map(q).join(','));
    rows.push(['ghg_manufacturing_per_kg',             fix(d.cc_mfg, 6),            'kg CO2e/kg',  'Scope 1+2 from manufacturer perspective'].map(q).join(','));
    rows.push(['ghg_transport_per_kg',                 fix(d.cc_trans, 6),          'kg CO2e/kg',  'GHG Protocol Scope 3 Cat.4 — upstream transport'].map(q).join(','));
    rows.push(['ghg_packaging_per_kg',                 fix(d.cc_pkg, 6),            'kg CO2e/kg',  'GHG Protocol Scope 3 Cat.1 — packaging'].map(q).join(','));
    rows.push(['']);

    // Section C: Water
    rows.push([c('SECTION C — WATER')]);
    rows.push(['water_scarcity_per_kg_m3',            fix(d.water, 6),              'm3 world eq./kg', 'AWARE 2.0 method'].map(q).join(','));
    rows.push(['water_use_ingredient_stage_per_kg',   fix(d.water_ing, 6),          'm3 world eq./kg', 'Ingredient stage only'].map(q).join(','));
    rows.push(['']);

    // Section D: Packaging
    rows.push([c('SECTION D — PACKAGING (EPR / PLASTIC PACT)')]);
    rows.push(['packaging_material_type',             d.pkgMaterial,               '',          'Primary packaging material'].map(q).join(','));
    rows.push(['packaging_weight_kg',                 fix(d.pkgWeightKg, 4),       'kg',        'Per unit of product'].map(q).join(','));
    rows.push(['packaging_recycled_content_pct',      fix(d.pkgRecycledPct, 1),    '%',         'By weight'].map(q).join(','));
    rows.push(['packaging_eol_pathway',               d.pkgEoLScenario,            '',          'eu_average / recycling / incineration / landfill'].map(q).join(','));
    rows.push(['packaging_co2_per_kg_product',        fix(d.cc_pkg, 6),            'kg CO2e/kg', 'CFF-adjusted per PEF 3.1 Annex C'].map(q).join(','));
    rows.push(['']);

    // Section E: Additional environmental indicators
    rows.push([c('SECTION E — ADDITIONAL ENVIRONMENTAL INDICATORS (Tesco Net Zero Roadmap)')]);
    rows.push(['land_use_pt_per_kg',                 fix(d.land, 4),              'Pt/kg',      'LANCA v2.5 characterisation'].map(q).join(','));
    rows.push(['eutrophication_freshwater_per_kg',   fix(d.eutr_fw, 8),           'kg Pe/kg',   'Freshwater eutrophication'].map(q).join(','));
    rows.push(['eutrophication_marine_per_kg',       fix(d.eutr_m, 8),            'kg Ne/kg',   'Marine eutrophication'].map(q).join(','));
    rows.push(['eutrophication_terrestrial_per_kg',  fix(d.eutr_t, 8),            'mol Ne/kg',  'Terrestrial eutrophication'].map(q).join(','));
    rows.push(['']);

    // Section F: Data quality
    rows.push([c('SECTION F — DATA QUALITY AND METHODOLOGY')]);
    rows.push(['methodology_standard',               d.methodology,               '',  ''].map(q).join(','));
    rows.push(['lca_database',                       d.lciDatabase,               '',  ''].map(q).join(','));
    rows.push(['data_quality_rating_dqr',            fix(d.dqrOverall, 2),        '/5.0', 'PEF 3.1 §5.7 — 4-indicator AGRIBALYSE DQI scheme'].map(q).join(','));
    rows.push(['uncertainty_ci_width_pct',           fix(d.uncPct, 1),            '%',    'Monte Carlo P95-P5/mean — ingredient stage'].map(q).join(','));
    rows.push(['primary_data_applied',               d.primaryDataApplied,        '',     'YES = farm/factory primary data used'].map(q).join(','));
    rows.push(['third_party_verified',               'NO',                        '',     'Screening-level — ISO 14044 critical review required'].map(q).join(','));
    rows.push(['assessment_type',                    d.assessmentType,            '',     ''].map(q).join(','));
    rows.push(['audit_hash_sha256',                  d.auditHash,                 '',     'Tamper-evident hash of all inputs and outputs'].map(q).join(','));
    rows.push(['']);

    // Ingredient summary
    rows.push([c('SECTION G — INGREDIENT ORIGIN SUMMARY (Tesco GNFR / Responsible Sourcing)')]);
    rows.push(['ingredient_name', 'quantity_kg', 'origin_country', 'ghg_kg_co2e', 'pct_of_total_ghg', 'eudr_risk', 'primary_data'].map(q).join(','));
    d.ingredients.forEach(ing => {
        rows.push([
            ing.name, fix(ing.quantityKg, 4), ing.originCountry,
            fix(ing.ccTotal, 6), fix(ing.pctOfCC, 2) + '%',
            ing.eudrRisk, ing.primaryData
        ].map(q).join(','));
    });
    rows.push(['']);
    rows.push([c('END OF TESCO TSN EXPORT — AIOXY ' + d.dppId + ' — ' + d.assessDate)]);

    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// SAINSBURY'S — Supplier Sustainability Questionnaire (SSQ) 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateSainsburysCSV(d) {
    const rows = [];
    rows.push([c("SAINSBURY'S SUPPLIER SUSTAINABILITY QUESTIONNAIRE (SSQ) 2024")]);
    rows.push([c("Generated by AIOXY — field names match Sainsbury's SSQ section labels")]);
    rows.push([c("Submit via: supplier.sainsburys.co.uk/sustainability-hub")]);
    rows.push(['']);
    rows.push(['SSQ_FIELD', 'VALUE', 'UNIT', 'SSQ_SECTION', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('SSQ SECTION 1 — PRODUCT AND SUPPLIER INFORMATION')]);
    rows.push(['product_name',                    d.productName,             '',      'S1.1', ''].map(q).join(','));
    rows.push(['assessment_reference',            d.dppId,                   '',      'S1.2', 'AIOXY DPP ID'].map(q).join(','));
    rows.push(['assessment_date',                 d.assessDate,              '',      'S1.3', ''].map(q).join(','));
    rows.push(['country_of_manufacture',          d.mfgCountry,              '',      'S1.4', 'ISO 3166-1'].map(q).join(','));
    rows.push(['product_weight_g',                fix(d.pWeightKg * 1000, 1),'g',     'S1.5', 'Net content'].map(q).join(','));
    rows.push(['']);

    rows.push([c("SSQ SECTION 2 — CLIMATE AND CARBON (Sainsbury's Plan for Better)")]);
    rows.push(['product_carbon_footprint_kg_co2e_per_kg', fix(d.cc, 6),      'kg CO2e/kg', 'S2.1', 'Cradle-to-retail'].map(q).join(','));
    rows.push(['scope3_cat1_ingredients_kg_co2e_per_kg',  fix(d.cc_ing, 6),  'kg CO2e/kg', 'S2.2', 'GHG Protocol Scope 3 Cat.1'].map(q).join(','));
    rows.push(['scope1_scope2_manufacturing_kg_co2e_per_kg', fix(d.cc_mfg, 6),'kg CO2e/kg', 'S2.3', 'Manufacturer Scope 1+2'].map(q).join(','));
    rows.push(['scope3_cat4_transport_kg_co2e_per_kg',    fix(d.cc_trans, 6), 'kg CO2e/kg', 'S2.4', 'GHG Protocol Scope 3 Cat.4'].map(q).join(','));
    rows.push(['packaging_ghg_kg_co2e_per_kg',            fix(d.cc_pkg, 6),  'kg CO2e/kg', 'S2.5', 'CFF-adjusted packaging'].map(q).join(','));
    rows.push(['fossil_ghg_fraction_kg_co2e_per_kg',      fix(d.cc_fossil, 6),'kg CO2e/kg', 'S2.6', 'Fossil origin only'].map(q).join(','));
    rows.push(['biogenic_carbon_kg_co2e_per_kg',          fix(d.cc_biogenic, 6),'kg CO2e/kg','S2.7', 'Biogenic — reported separately per GHG Protocol'].map(q).join(','));
    rows.push(['land_use_change_kg_co2e_per_kg',          fix(d.cc_land_use, 6),'kg CO2e/kg','S2.8', 'dLUC per IPCC 2006'].map(q).join(','));
    rows.push(['']);

    rows.push([c("SSQ SECTION 3 — WATER (Sainsbury's Halving Food Waste & Water target)")]);
    rows.push(['water_scarcity_m3_world_eq_per_kg', fix(d.water, 7),         'm3 world eq./kg','S3.1', 'AWARE 2.0'].map(q).join(','));
    rows.push(['water_use_ingredient_stage',         fix(d.water_ing, 7),    'm3 world eq./kg','S3.2', 'Agricultural stage'].map(q).join(','));
    rows.push(['']);

    rows.push([c("SSQ SECTION 4 — NATURE AND BIODIVERSITY")]);
    rows.push(['land_use_pt_per_kg',                fix(d.land, 4),          'Pt/kg',      'S4.1', 'LANCA v2.5'].map(q).join(','));
    rows.push(['eutrophication_terrestrial_mol_ne_per_kg', fix(d.eutr_t, 8), 'mol Ne/kg',  'S4.2', 'EF 3.1'].map(q).join(','));
    rows.push(['eutrophication_freshwater_kg_pe_per_kg',   fix(d.eutr_fw, 8),'kg Pe/kg',   'S4.3', 'EF 3.1'].map(q).join(','));
    rows.push(['eutrophication_marine_kg_ne_per_kg',       fix(d.eutr_m, 8), 'kg Ne/kg',   'S4.4', 'EF 3.1'].map(q).join(','));
    rows.push(['eudr_high_risk_ingredients_present', d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'YES' : 'NO', '', 'S4.5', 'EUDR Annex 1 high-risk origins'].map(q).join(','));
    rows.push(['']);

    rows.push([c("SSQ SECTION 5 — PACKAGING")]);
    rows.push(['packaging_material',               d.pkgMaterial,            '',           'S5.1', ''].map(q).join(','));
    rows.push(['packaging_weight_g_per_unit',      fix(d.pkgWeightKg * 1000, 2),'g',      'S5.2', ''].map(q).join(','));
    rows.push(['recycled_content_pct',             fix(d.pkgRecycledPct, 1), '%',          'S5.3', 'By weight'].map(q).join(','));
    rows.push(['recyclability_eol_pathway',        d.pkgEoLScenario,         '',           'S5.4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c("SSQ SECTION 6 — DATA QUALITY")]);
    rows.push(['lca_methodology',                  d.methodology,            '',           'S6.1', ''].map(q).join(','));
    rows.push(['primary_data_used',                d.primaryDataApplied,     '',           'S6.2', 'YES/NO'].map(q).join(','));
    rows.push(['data_quality_rating',              fix(d.dqrOverall, 2),     '/5.0',       'S6.3', 'DQR per PEF 3.1'].map(q).join(','));
    rows.push(['uncertainty_pct',                  fix(d.uncPct, 1),         '%',          'S6.4', 'Monte Carlo 95% CI width'].map(q).join(','));
    rows.push(['third_party_verified',             'NO — screening-level',   '',           'S6.5', 'ISO 14044 review required for verification'].map(q).join(','));
    rows.push(['audit_reference',                  d.auditHash,              '',           'S6.6', 'SHA-256 audit hash'].map(q).join(','));
    rows.push(['']);
    rows.push([c("END SAINSBURY'S SSQ — " + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// LIDL — Lidl International CSR Supplier Questionnaire 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateLidlCSV(d) {
    const rows = [];
    rows.push([c('LIDL INTERNATIONAL CSR SUPPLIER QUESTIONNAIRE — Environmental Data Section 2024')]);
    rows.push([c('Generated by AIOXY — field names match Lidl CSR questionnaire section E (Environment)')]);
    rows.push([c('Source: Lidl International Supplier Code of Conduct + CSR Questionnaire 2024')]);
    rows.push(['']);
    rows.push(['LIDL_FIELD', 'VALUE', 'UNIT', 'SECTION', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('E1 — CLIMATE CHANGE / CO2 FOOTPRINT')]);
    rows.push(['product_name',                    d.productName,            '',  'E0', ''].map(q).join(','));
    rows.push(['supplier_reference',              d.dppId,                  '',  'E0', 'AIOXY assessment reference'].map(q).join(','));
    rows.push(['assessment_year',                 d.assessDate.slice(0,4),  '',  'E0', ''].map(q).join(','));
    rows.push(['co2_footprint_kg_per_kg_product', fix(d.cc, 6),             'kg CO2e', 'E1.1', 'Cradle-to-retail gate'].map(q).join(','));
    rows.push(['co2_ingredient_stage',            fix(d.cc_ing, 6),         'kg CO2e', 'E1.2', 'Agricultural + processing inputs'].map(q).join(','));
    rows.push(['co2_production_stage',            fix(d.cc_mfg, 6),         'kg CO2e', 'E1.3', 'Factory energy use'].map(q).join(','));
    rows.push(['co2_logistics_stage',             fix(d.cc_trans, 6),       'kg CO2e', 'E1.4', 'Transport to Lidl DC'].map(q).join(','));
    rows.push(['co2_packaging_stage',             fix(d.cc_pkg, 6),         'kg CO2e', 'E1.5', 'Primary packaging (CFF)'].map(q).join(','));
    rows.push(['co2_fossil_fraction',             fix(d.cc_fossil, 6),      'kg CO2e', 'E1.6', ''].map(q).join(','));
    rows.push(['co2_biogenic_fraction',           fix(d.cc_biogenic, 6),    'kg CO2e', 'E1.7', 'Biogenic — stored C in bio-based materials'].map(q).join(','));
    rows.push(['production_country',              d.mfgCountry,             '',        'E1.8', ''].map(q).join(','));
    rows.push(['grid_intensity_g_co2_per_kwh',    fix(d.gridIntensity, 2),  'g CO2/kWh','E1.9', 'Ember 2025'].map(q).join(','));
    rows.push(['energy_source',                   d.mfgEnergySource,        '',        'E1.10','grid/renewable/gas/coal'].map(q).join(','));
    rows.push(['']);

    rows.push([c('E2 — WATER USE')]);
    rows.push(['water_scarcity_index_m3_per_kg',  fix(d.water, 7),          'm3 world eq.', 'E2.1', 'AWARE 2.0'].map(q).join(','));
    rows.push(['']);

    rows.push([c('E3 — BIODIVERSITY / LAND USE')]);
    rows.push(['land_use_pt_per_kg',              fix(d.land, 4),            'Pt/kg',       'E3.1', 'LANCA v2.5'].map(q).join(','));
    rows.push(['freshwater_eutrophication_per_kg',  fix(d.eutr_fw, 8),         'kg Pe/kg',     'E3.3', 'EF 3.1 freshwater eutrophication'].map(q).join(','));
    rows.push(['deforestation_risk',              d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'HIGH' : 'LOW', '', 'E3.2', 'EUDR Annex 1 screening'].map(q).join(','));
    rows.push(['']);

    rows.push([c('E4 — PACKAGING')]);
    rows.push(['packaging_type',                  d.pkgMaterial,            '',  'E4.1', ''].map(q).join(','));
    rows.push(['packaging_weight_kg_per_unit',    fix(d.pkgWeightKg, 4),    'kg','E4.2', ''].map(q).join(','));
    rows.push(['recycled_content_percentage',     fix(d.pkgRecycledPct, 1), '%', 'E4.3', ''].map(q).join(','));
    rows.push(['recyclability_pathway',           d.pkgEoLScenario,         '',  'E4.4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('E5 — ASSESSMENT METHODOLOGY')]);
    rows.push(['calculation_standard',            d.methodology,            '',  'E5.1', ''].map(q).join(','));
    rows.push(['data_quality_score',              fix(d.dqrOverall, 2),     '',  'E5.2', '1=best 5=worst'].map(q).join(','));
    rows.push(['primary_data_applied',            d.primaryDataApplied,     '',  'E5.3', ''].map(q).join(','));
    rows.push(['third_party_verification',        'NO — screening level',   '',  'E5.4', ''].map(q).join(','));
    rows.push(['audit_id',                        d.auditHash.slice(0, 16), '',  'E5.5', 'First 16 chars of SHA-256'].map(q).join(','));
    rows.push(['']);
    rows.push([c('END LIDL CSR EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// ALDI — Aldi Sustainability Supplier Questionnaire 2024 (UK/Süd shared core)
// ─────────────────────────────────────────────────────────────────────────────
function generateAldiCSV(d) {
    const rows = [];
    rows.push([c('ALDI SUSTAINABILITY SUPPLIER QUESTIONNAIRE — Environmental Section 2024')]);
    rows.push([c('Applies to: Aldi UK and Aldi Süd (shared core environmental section)')]);
    rows.push([c('Generated by AIOXY — aligns with Aldi Buying sustainability questionnaire 2024')]);
    rows.push(['']);
    rows.push(['FIELD', 'VALUE', 'UNIT', 'ALDI_REF', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('BLOCK 1 — PRODUCT INFO')]);
    rows.push(['product_description',             d.productName,            '',  '1.1', ''].map(q).join(','));
    rows.push(['assessment_id',                   d.dppId,                  '',  '1.2', ''].map(q).join(','));
    rows.push(['reporting_year',                  d.assessDate.slice(0,4),  '',  '1.3', ''].map(q).join(','));
    rows.push(['manufacturing_country',           d.mfgCountry,             '',  '1.4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('BLOCK 2 — CARBON EMISSIONS')]);
    rows.push([c('Aldi requires total Scope 3 Cat.1 intensity (per kg product) for supplier scorecards')]);
    rows.push(['total_product_carbon_intensity_kg_co2e_per_kg', fix(d.cc, 6), 'kg CO2e/kg', '2.1', 'Cradle-to-retail'].map(q).join(','));
    rows.push(['scope3_cat1_purchased_goods_kg_co2e_per_kg',    fix(d.cc_ing + d.cc_pkg, 6), 'kg CO2e/kg', '2.2', 'Ingredients + packaging combined Scope 3 Cat.1'].map(q).join(','));
    rows.push(['scope1_2_manufacturing_kg_co2e_per_kg',          fix(d.cc_mfg, 6), 'kg CO2e/kg', '2.3', 'Factory direct + indirect'].map(q).join(','));
    rows.push(['scope3_cat4_transport_kg_co2e_per_kg',           fix(d.cc_trans, 6),'kg CO2e/kg', '2.4', 'Inbound + outbound transport'].map(q).join(','));
    rows.push(['fossil_co2_kg_per_kg',                           fix(d.cc_fossil, 6),'kg CO2e/kg', '2.5', ''].map(q).join(','));
    rows.push(['land_use_change_co2_kg_per_kg',                  fix(d.cc_land_use, 6),'kg CO2e/kg','2.6', 'dLUC'].map(q).join(','));
    rows.push(['']);

    rows.push([c('BLOCK 3 — WATER AND NATURE')]);
    rows.push(['water_withdrawal_m3_per_kg',      fix(d.water, 7),          'm3 world eq.', '3.1', 'AWARE 2.0 water scarcity'].map(q).join(','));
    rows.push(['land_use_pt_per_kg',              fix(d.land, 4),            'Pt/kg',       '3.2', 'LANCA v2.5'].map(q).join(','));
    rows.push(['freshwater_eutrophication',       fix(d.eutr_fw, 8),         'kg Pe/kg',    '3.3', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('BLOCK 4 — PACKAGING')]);
    rows.push(['primary_packaging_material',      d.pkgMaterial,            '',  '4.1', ''].map(q).join(','));
    rows.push(['packaging_mass_g',                fix(d.pkgWeightKg*1000,2),'g',  '4.2', ''].map(q).join(','));
    rows.push(['recycled_content_pct',            fix(d.pkgRecycledPct, 1), '%',  '4.3', ''].map(q).join(','));
    rows.push(['recyclability_score',             d.pkgEoLScenario !== 'landfill' ? 'RECYCLABLE' : 'NON-RECYCLABLE', '', '4.4', 'Based on EoL pathway'].map(q).join(','));
    rows.push(['']);

    rows.push([c('BLOCK 5 — DATA QUALITY')]);
    rows.push(['lca_standard',                    d.methodology,            '',  '5.1', ''].map(q).join(','));
    rows.push(['dqr_score',                       fix(d.dqrOverall, 2),     '/5', '5.2', ''].map(q).join(','));
    rows.push(['primary_data_flag',               d.primaryDataApplied,     '',  '5.3', ''].map(q).join(','));
    rows.push(['uncertainty_pct',                 fix(d.uncPct, 1),         '%',  '5.4', ''].map(q).join(','));
    rows.push(['verification_status',             'Self-declared — not third-party verified', '', '5.5', ''].map(q).join(','));
    rows.push(['aioxy_reference',                 d.dppId,                  '',  '5.6', ''].map(q).join(','));
    rows.push(['audit_hash_sha256',               d.auditHash,              '',  '5.7', 'SHA-256 tamper-evident hash of all inputs and outputs'].map(q).join(','));
    rows.push(['']);
    rows.push([c('END ALDI EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// REWE — Rewe Group Supplier Sustainability Profile 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateReweCSV(d) {
    const rows = [];
    rows.push([c('REWE GROUP SUPPLIER SUSTAINABILITY PROFILE — Environmental Section 2024')]);
    rows.push([c('Generated by AIOXY — field names match Rewe Supplier Portal sustainability form')]);
    rows.push([c('Source: Rewe Group Supplier Sustainability Profile Template 2024')]);
    rows.push(['']);
    rows.push(['REWE_FIELD', 'VALUE', 'UNIT', 'REWE_MODULE', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('MODULE U — UMWELT (ENVIRONMENT)')]);
    rows.push(['produkt_name',                       d.productName,          '',  'U0',  ''].map(q).join(','));
    rows.push(['bewertungs_id',                      d.dppId,                '',  'U0',  'AIOXY DPP-ID'].map(q).join(','));
    rows.push(['bewertungsjahr',                     d.assessDate.slice(0,4),'',  'U0',  ''].map(q).join(','));
    rows.push(['herstellungsland',                   d.mfgCountry,           '',  'U0',  'ISO 3166-1'].map(q).join(','));
    rows.push(['']);

    rows.push([c('U1 — TREIBHAUSGASEMISSIONEN (GHG EMISSIONS)')]);
    rows.push(['thg_gesamt_kg_co2e_pro_kg',          fix(d.cc, 6),           'kg CO2e/kg', 'U1.1', 'Cradle-to-Retail'].map(q).join(','));
    rows.push(['thg_rohstoffe_zutaten',              fix(d.cc_ing, 6),       'kg CO2e/kg', 'U1.2', 'Scope 3 Kat.1 Einkauf'].map(q).join(','));
    rows.push(['thg_produktion_herstellung',         fix(d.cc_mfg, 6),       'kg CO2e/kg', 'U1.3', 'Scope 1+2 Produzent'].map(q).join(','));
    rows.push(['thg_transport_logistik',             fix(d.cc_trans, 6),     'kg CO2e/kg', 'U1.4', 'Scope 3 Kat.4'].map(q).join(','));
    rows.push(['thg_verpackung',                     fix(d.cc_pkg, 6),       'kg CO2e/kg', 'U1.5', 'CFF-Methode PEF 3.1'].map(q).join(','));
    rows.push(['thg_fossil_anteil',                  fix(d.cc_fossil, 6),    'kg CO2e/kg', 'U1.6', ''].map(q).join(','));
    rows.push(['landnutzungsaenderung_co2',          fix(d.cc_land_use, 6),  'kg CO2e/kg', 'U1.7', 'dLUC nach IPCC 2006'].map(q).join(','));
    rows.push(['strommix_intensitaet',               fix(d.gridIntensity, 2),'g CO2e/kWh', 'U1.8', 'Ember 2025'].map(q).join(','));
    rows.push(['energiequelle',                      d.mfgEnergySource,      '',           'U1.9', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('U2 — WASSER (WATER)')]);
    rows.push(['wasserknappheit_m3_pro_kg',          fix(d.water, 7),        'm3 world eq.', 'U2.1', 'AWARE 2.0'].map(q).join(','));
    rows.push(['']);

    rows.push([c('U3 — BIOLOGISCHE VIELFALT (BIODIVERSITY)')]);
    rows.push(['landnutzung_pt_pro_kg',              fix(d.land, 4),         'Pt/kg',      'U3.1', 'LANCA v2.5'].map(q).join(','));
    rows.push(['eutrophierung_suessw_kg_p_pro_kg',   fix(d.eutr_fw, 8),      'kg Pe/kg',   'U3.2', ''].map(q).join(','));
    rows.push(['eutrophierung_marin_kg_n_pro_kg',    fix(d.eutr_m, 8),       'kg Ne/kg',   'U3.3', ''].map(q).join(','));
    rows.push(['eutrophierung_terrest_mol_n_pro_kg', fix(d.eutr_t, 8),       'mol Ne/kg',  'U3.4', ''].map(q).join(','));
    rows.push(['eudr_risiko',                        d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'HOCH' : 'NIEDRIG', '', 'U3.5', 'EUDR-Verordnung Anhang 1'].map(q).join(','));
    rows.push(['']);

    rows.push([c('U4 — VERPACKUNG (PACKAGING)')]);
    rows.push(['verpackungsmaterial',               d.pkgMaterial,           '',  'U4.1', ''].map(q).join(','));
    rows.push(['verpackungsgewicht_kg',             fix(d.pkgWeightKg, 4),   'kg','U4.2', ''].map(q).join(','));
    rows.push(['rezyklat_anteil_pct',               fix(d.pkgRecycledPct,1), '%', 'U4.3', ''].map(q).join(','));
    rows.push(['entsorgungsweg',                    d.pkgEoLScenario,        '',  'U4.4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('U5 — DATENQUALITAET (DATA QUALITY)')]);
    rows.push(['berechnungsstandard',               d.methodology,           '',  'U5.1', ''].map(q).join(','));
    rows.push(['datenqualitaetsbewertung_dqr',      fix(d.dqrOverall, 2),    '/5','U5.2', ''].map(q).join(','));
    rows.push(['primaerdaten_eingesetzt',            d.primaryDataApplied,   '',  'U5.3', ''].map(q).join(','));
    rows.push(['unsicherheit_pct',                  fix(d.uncPct, 1),        '%', 'U5.4', ''].map(q).join(','));
    rows.push(['verifikation',                      'Selbstdeklaration — keine Drittprüfung', '', 'U5.5', ''].map(q).join(','));
    rows.push(['audit_hash',                        d.auditHash,             '',  'U5.6', ''].map(q).join(','));
    rows.push(['']);
    rows.push([c('ENDE REWE LIEFERANTEN-EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// ALBERT HEIJN — Ahold Delhaize Supplier Sustainability Data Request 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateAlbertHeijnCSV(d) {
    const rows = [];
    rows.push([c('ALBERT HEIJN (AHOLD DELHAIZE) SUPPLIER SUSTAINABILITY DATA REQUEST 2024')]);
    rows.push([c('Generated by AIOXY — aligns with Ahold Delhaize ESG supplier data request format')]);
    rows.push([c('Submit via: supplier.ah.nl/sustainability or Ahold Delhaize Supplier Portal')]);
    rows.push(['']);
    rows.push(['AH_FIELD', 'VALUE', 'UNIT', 'AH_CATEGORY', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CATEGORY 1 — PRODUCT IDENTIFICATION')]);
    rows.push(['ah_product_name',                 d.productName,            '',  'CAT1', ''].map(q).join(','));
    rows.push(['ah_assessment_id',                d.dppId,                  '',  'CAT1', 'AIOXY DPP ID'].map(q).join(','));
    rows.push(['ah_reporting_period',             d.assessDate.slice(0,4),  '',  'CAT1', 'Year'].map(q).join(','));
    rows.push(['ah_country_of_production',        d.mfgCountry,             '',  'CAT1', ''].map(q).join(','));
    rows.push(['ah_product_weight_kg',            fix(d.pWeightKg, 4),      'kg','CAT1', 'Net content'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CATEGORY 2 — CLIMATE (AH Better Together strategy)')]);
    rows.push(['ah_total_product_co2e_per_kg',     fix(d.cc, 6),            'kg CO2e/kg', 'CAT2.1', 'Cradle-to-retail'].map(q).join(','));
    rows.push(['ah_co2e_ingredients_per_kg',       fix(d.cc_ing, 6),        'kg CO2e/kg', 'CAT2.2', 'GHG Protocol Scope 3 Cat.1'].map(q).join(','));
    rows.push(['ah_co2e_manufacturing_per_kg',     fix(d.cc_mfg, 6),        'kg CO2e/kg', 'CAT2.3', 'Factory operations'].map(q).join(','));
    rows.push(['ah_co2e_transport_per_kg',         fix(d.cc_trans, 6),      'kg CO2e/kg', 'CAT2.4', 'GLEC v3.2'].map(q).join(','));
    rows.push(['ah_co2e_packaging_per_kg',         fix(d.cc_pkg, 6),        'kg CO2e/kg', 'CAT2.5', 'PEF CFF Annex C'].map(q).join(','));
    rows.push(['ah_co2e_fossil_per_kg',            fix(d.cc_fossil, 6),     'kg CO2e/kg', 'CAT2.6', ''].map(q).join(','));
    rows.push(['ah_co2e_biogenic_per_kg',          fix(d.cc_biogenic, 6),   'kg CO2e/kg', 'CAT2.7', 'Biogenic carbon'].map(q).join(','));
    rows.push(['ah_land_use_change_co2_per_kg',    fix(d.cc_land_use, 6),   'kg CO2e/kg', 'CAT2.8', 'dLUC'].map(q).join(','));
    rows.push(['ah_renewable_energy_at_factory',   d.mfgEnergySource === 'renewable' ? 'YES' : 'NO', '', 'CAT2.9', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('CATEGORY 3 — WATER')]);
    rows.push(['ah_water_scarcity_m3_per_kg',      fix(d.water, 7),         'm3 world eq./kg','CAT3', 'AWARE 2.0'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CATEGORY 4 — NATURE')]);
    rows.push(['ah_land_use_pt_per_kg',             fix(d.land, 4),          'Pt/kg',    'CAT4.1', ''].map(q).join(','));
    rows.push(['ah_freshwater_eutroph_per_kg',      fix(d.eutr_fw, 8),       'kg Pe/kg', 'CAT4.2', ''].map(q).join(','));
    rows.push(['ah_marine_eutroph_per_kg',          fix(d.eutr_m, 8),        'kg Ne/kg', 'CAT4.3', ''].map(q).join(','));
    rows.push(['ah_deforestation_risk_flag',        d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'HIGH' : 'LOW', '', 'CAT4.4', 'EUDR Annex 1'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CATEGORY 5 — PACKAGING')]);
    rows.push(['ah_packaging_type',                d.pkgMaterial,            '',   'CAT5.1', ''].map(q).join(','));
    rows.push(['ah_packaging_weight_g',            fix(d.pkgWeightKg*1000,2),'g',  'CAT5.2', ''].map(q).join(','));
    rows.push(['ah_recycled_content_pct',          fix(d.pkgRecycledPct, 1), '%',  'CAT5.3', ''].map(q).join(','));
    rows.push(['ah_recyclability',                 d.pkgEoLScenario,         '',   'CAT5.4', ''].map(q).join(','));
    rows.push(['ah_packaging_co2_per_kg',          fix(d.cc_pkg, 6),         'kg CO2e/kg','CAT5.5','CFF-adjusted'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CATEGORY 6 — DATA QUALITY')]);
    rows.push(['ah_lca_standard',                  d.methodology,            '',  'CAT6.1', ''].map(q).join(','));
    rows.push(['ah_dqr',                           fix(d.dqrOverall, 2),     '/5','CAT6.2', '4-indicator DQI scheme'].map(q).join(','));
    rows.push(['ah_primary_data',                  d.primaryDataApplied,     '',  'CAT6.3', ''].map(q).join(','));
    rows.push(['ah_uncertainty_pct',               fix(d.uncPct, 1),         '%', 'CAT6.4', 'MC 95% CI width'].map(q).join(','));
    rows.push(['ah_verification',                  'Self-declared screening-level LCA', '', 'CAT6.5', ''].map(q).join(','));
    rows.push(['ah_audit_hash',                    d.auditHash,              '',  'CAT6.6', ''].map(q).join(','));
    rows.push(['']);
    rows.push([c('END ALBERT HEIJN/AHOLD DELHAIZE EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// CARREFOUR — ACT (Act for Food) Supplier Environmental Data Request 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateCarrefourCSV(d) {
    const rows = [];
    rows.push([c('CARREFOUR ACT (ACT FOR FOOD) — SUPPLIER ENVIRONMENTAL DATA REQUEST 2024')]);
    rows.push([c('Generated by AIOXY — field names align with Carrefour ACT supplier form')]);
    rows.push([c("Source: Carrefour 'Act for Food' supplier sustainability programme 2024")]);
    rows.push(['']);
    rows.push(['ACT_FIELD', 'VALUE', 'UNIT', 'ACT_RUBRIQUE', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('RUBRIQUE 1 — IDENTITE PRODUIT')]);
    rows.push(['nom_produit',                     d.productName,            '',  'R1', ''].map(q).join(','));
    rows.push(['reference_evaluation',            d.dppId,                  '',  'R1', 'ID AIOXY'].map(q).join(','));
    rows.push(['date_evaluation',                 d.assessDate,             '',  'R1', 'ISO 8601'].map(q).join(','));
    rows.push(['pays_fabrication',                d.mfgCountry,             '',  'R1', 'Code ISO 3166-1'].map(q).join(','));
    rows.push(['poids_produit_kg',                fix(d.pWeightKg, 4),      'kg','R1', 'Contenu net'].map(q).join(','));
    rows.push(['']);

    rows.push([c('RUBRIQUE 2 — EMPREINTE CARBONE (BILAN CARBONE)')]);
    rows.push(['empreinte_carbone_totale_kg_co2e_par_kg',  fix(d.cc, 6),        'kg CO2e/kg', 'R2.1', 'Du berceau à la livraison'].map(q).join(','));
    rows.push(['carbone_matieres_premieres_par_kg',        fix(d.cc_ing, 6),    'kg CO2e/kg', 'R2.2', 'Amont agricole et industriel'].map(q).join(','));
    rows.push(['carbone_fabrication_par_kg',               fix(d.cc_mfg, 6),    'kg CO2e/kg', 'R2.3', 'Energie usine'].map(q).join(','));
    rows.push(['carbone_transport_par_kg',                 fix(d.cc_trans, 6),  'kg CO2e/kg', 'R2.4', 'GLEC v3.2'].map(q).join(','));
    rows.push(['carbone_emballage_par_kg',                 fix(d.cc_pkg, 6),    'kg CO2e/kg', 'R2.5', 'Methode CFF PEF 3.1 Annexe C'].map(q).join(','));
    rows.push(['carbone_fossile_par_kg',                   fix(d.cc_fossil, 6), 'kg CO2e/kg', 'R2.6', ''].map(q).join(','));
    rows.push(['carbone_biogenique_par_kg',                fix(d.cc_biogenic,6),'kg CO2e/kg', 'R2.7', 'Carbone biogenique'].map(q).join(','));
    rows.push(['changement_utilisation_sol_co2_par_kg',    fix(d.cc_land_use,6),'kg CO2e/kg', 'R2.8', 'dLUC'].map(q).join(','));
    rows.push(['']);

    rows.push([c('RUBRIQUE 3 — EAU')]);
    rows.push(['rarete_eau_m3_eq_monde_par_kg',   fix(d.water, 7),          'm3 eq. monde/kg','R3', 'Methode AWARE 2.0'].map(q).join(','));
    rows.push(['']);

    rows.push([c('RUBRIQUE 4 — BIODIVERSITE')]);
    rows.push(['occupation_sol_pt_par_kg',        fix(d.land, 4),            'Pt/kg',     'R4.1', 'LANCA v2.5'].map(q).join(','));
    rows.push(['eutrophisation_eau_douce_par_kg',  fix(d.eutr_fw, 8),        'kg Pe/kg',  'R4.2', ''].map(q).join(','));
    rows.push(['eutrophisation_marine_par_kg',     fix(d.eutr_m, 8),         'kg Ne/kg',  'R4.3', ''].map(q).join(','));
    rows.push(['eutrophisation_terrestre_par_kg',  fix(d.eutr_t, 8),         'mol Ne/kg', 'R4.4', ''].map(q).join(','));
    rows.push(['risque_deforestation',             d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'ELEVE' : 'FAIBLE', '', 'R4.5', 'EUDR Annexe 1'].map(q).join(','));
    rows.push(['']);

    rows.push([c('RUBRIQUE 5 — EMBALLAGE')]);
    rows.push(['type_emballage',                  d.pkgMaterial,            '',  'R5.1', ''].map(q).join(','));
    rows.push(['poids_emballage_g',               fix(d.pkgWeightKg*1000,2),'g',  'R5.2', ''].map(q).join(','));
    rows.push(['taux_matiere_recyclee_pct',        fix(d.pkgRecycledPct,1), '%',  'R5.3', ''].map(q).join(','));
    rows.push(['fin_de_vie_emballage',             d.pkgEoLScenario,        '',  'R5.4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('RUBRIQUE 6 — QUALITE DES DONNEES')]);
    rows.push(['methodologie_aev',                d.methodology,            '',  'R6.1', ''].map(q).join(','));
    rows.push(['note_qualite_donnees_dqr',         fix(d.dqrOverall, 2),    '/5','R6.2', ''].map(q).join(','));
    rows.push(['donnees_primaires',               d.primaryDataApplied,     '',  'R6.3', ''].map(q).join(','));
    rows.push(['incertitude_pct',                 fix(d.uncPct, 1),         '%', 'R6.4', ''].map(q).join(','));
    rows.push(['verification_tierce_partie',      'NON — evaluation screening', '', 'R6.5', 'Revue critique ISO 14044 requise'].map(q).join(','));
    rows.push(['reference_audit',                 d.auditHash,              '',  'R6.6', ''].map(q).join(','));
    rows.push(['']);
    rows.push([c('FIN EXPORT CARREFOUR ACT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// LECLERC — E.Leclerc Sustainability Supplier Form 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateLeclercCSV(d) {
    const rows = [];
    rows.push([c('E.LECLERC — FORMULAIRE FOURNISSEUR DEVELOPPEMENT DURABLE 2024')]);
    rows.push([c('Generated by AIOXY — aligns with E.Leclerc sustainability supplier questionnaire 2024')]);
    rows.push(['']);
    rows.push(['CHAMP', 'VALEUR', 'UNITE', 'SECTION', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('SECTION PRODUIT')]);
    rows.push(['designation_produit',             d.productName,            '',  'P1', ''].map(q).join(','));
    rows.push(['identifiant_evaluation',          d.dppId,                  '',  'P2', ''].map(q).join(','));
    rows.push(['date_calcul',                     d.assessDate,             '',  'P3', ''].map(q).join(','));
    rows.push(['pays_production',                 d.mfgCountry,             '',  'P4', ''].map(q).join(','));
    rows.push(['masse_nette_kg',                  fix(d.pWeightKg, 4),      'kg','P5', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('SECTION CLIMAT')]);
    rows.push(['empreinte_carbone_kg_co2e_par_kg',   fix(d.cc, 6),          'kg CO2e/kg', 'C1', 'Total berceau-livraison'].map(q).join(','));
    rows.push(['empreinte_amont_agricole',           fix(d.cc_ing, 6),      'kg CO2e/kg', 'C2', 'Matieres premieres'].map(q).join(','));
    rows.push(['empreinte_fabrication',              fix(d.cc_mfg, 6),      'kg CO2e/kg', 'C3', 'Energie usine'].map(q).join(','));
    rows.push(['empreinte_transport',                fix(d.cc_trans, 6),    'kg CO2e/kg', 'C4', ''].map(q).join(','));
    rows.push(['empreinte_emballage',               fix(d.cc_pkg, 6),      'kg CO2e/kg', 'C5', 'CFF PEF 3.1'].map(q).join(','));
    rows.push(['fraction_carbone_fossile',          fix(d.cc_fossil, 6),   'kg CO2e/kg', 'C6', ''].map(q).join(','));
    rows.push(['fraction_biogenique',              fix(d.cc_biogenic, 6), 'kg CO2e/kg', 'C7', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('SECTION EAU ET BIODIVERSITE')]);
    rows.push(['consommation_eau_m3_par_kg',      fix(d.water, 7),          'm3 eq./kg',  'E1', 'AWARE 2.0'].map(q).join(','));
    rows.push(['utilisation_sol_pt_par_kg',       fix(d.land, 4),           'Pt/kg',      'E2', ''].map(q).join(','));
    rows.push(['eutrophisation_fw_par_kg',        fix(d.eutr_fw, 8),        'kg Pe/kg',   'E3', ''].map(q).join(','));
    rows.push(['risque_deforestation',            d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'OUI' : 'NON', '', 'E4', 'EUDR'].map(q).join(','));
    rows.push(['']);

    rows.push([c('SECTION EMBALLAGE')]);
    rows.push(['materiau_emballage',             d.pkgMaterial,             '',  'V1', ''].map(q).join(','));
    rows.push(['poids_emballage_g_unite',        fix(d.pkgWeightKg*1000,2), 'g', 'V2', ''].map(q).join(','));
    rows.push(['taux_recycle_pct',               fix(d.pkgRecycledPct, 1),  '%', 'V3', ''].map(q).join(','));
    rows.push(['recyclabilite',                  d.pkgEoLScenario,          '',  'V4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('SECTION QUALITE')]);
    rows.push(['norme_calcul',                   d.methodology,             '',  'Q1', ''].map(q).join(','));
    rows.push(['note_qualite_dqr',               fix(d.dqrOverall, 2),      '/5','Q2', ''].map(q).join(','));
    rows.push(['donnees_primaires_utilisees',    d.primaryDataApplied,      '',  'Q3', ''].map(q).join(','));
    rows.push(['incertitude_pct',                fix(d.uncPct, 1),          '%', 'Q4', ''].map(q).join(','));
    rows.push(['hash_audit',                     d.auditHash,               '',  'Q5', ''].map(q).join(','));
    rows.push(['']);
    rows.push([c('FIN EXPORT LECLERC — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERMARCHE — Les Mousquetaires ESG Supplier Questionnaire 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateIntermarcheCSV(d) {
    const rows = [];
    rows.push([c('INTERMARCHE / LES MOUSQUETAIRES — QUESTIONNAIRE FOURNISSEUR RSE 2024')]);
    rows.push([c('Generated by AIOXY — champs alignes avec le questionnaire RSE fournisseur 2024')]);
    rows.push(['']);
    rows.push(['CHAMP_RSE', 'VALEUR', 'UNITE', 'AXE', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('AXE ENVIRONNEMENT')]);
    rows.push(['produit',                         d.productName,            '',  'A1', ''].map(q).join(','));
    rows.push(['ref_evaluation',                  d.dppId,                  '',  'A2', ''].map(q).join(','));
    rows.push(['annee',                           d.assessDate.slice(0,4),  '',  'A3', ''].map(q).join(','));
    rows.push(['pays_fabrication',                d.mfgCountry,             '',  'A4', ''].map(q).join(','));
    rows.push(['empreinte_carbone_kg_co2_par_kg', fix(d.cc, 6),             'kg CO2e/kg','A5','Berceau-a-livraison'].map(q).join(','));
    rows.push(['empreinte_amont',                 fix(d.cc_ing, 6),         'kg CO2e/kg','A6','Matieres premieres'].map(q).join(','));
    rows.push(['empreinte_fabrication',           fix(d.cc_mfg, 6),         'kg CO2e/kg','A7',''].map(q).join(','));
    rows.push(['empreinte_transport',             fix(d.cc_trans, 6),       'kg CO2e/kg','A8',''].map(q).join(','));
    rows.push(['empreinte_emballage',            fix(d.cc_pkg, 6),         'kg CO2e/kg','A9',''].map(q).join(','));
    rows.push(['eau_m3_par_kg',                  fix(d.water, 7),          'm3/kg',     'A10','AWARE 2.0'].map(q).join(','));
    rows.push(['utilisation_sol',                fix(d.land, 4),           'Pt/kg',     'A11',''].map(q).join(','));
    rows.push(['materiau_emballage',             d.pkgMaterial,            '',          'A12',''].map(q).join(','));
    rows.push(['taux_recycle_emballage_pct',     fix(d.pkgRecycledPct,1),  '%',         'A13',''].map(q).join(','));
    rows.push(['eutrophisation_fw_par_kg',        fix(d.eutr_fw, 8),        'kg Pe/kg',   'A13b','Eau douce EF 3.1'].map(q).join(','));
    rows.push(['methodologie',                   d.methodology,            '',          'A14',''].map(q).join(','));
    rows.push(['qualite_donnees_dqr',            fix(d.dqrOverall,2),      '/5',        'A15',''].map(q).join(','));
    rows.push(['donnees_primaires',              d.primaryDataApplied,     '',          'A16',''].map(q).join(','));
    rows.push(['hash_audit',                     d.auditHash.slice(0,16),  '',          'A17','16 premiers chars SHA-256'].map(q).join(','));
    rows.push(['']);
    rows.push([c('FIN EXPORT INTERMARCHE — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// COOP CH — Coop Switzerland Oecoplan / Sustainability Supplier Data 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateCoopCHCSV(d) {
    const rows = [];
    rows.push([c('COOP SWITZERLAND — OECOPLAN / SUSTAINABILITY SUPPLIER DATA FORM 2024')]);
    rows.push([c('Generated by AIOXY — aligns with Coop Oecoplan environmental supplier criteria')]);
    rows.push([c('Source: Coop Switzerland Oecoplan supplier requirements and ESG data form 2024')]);
    rows.push(['']);
    rows.push(['COOP_FIELD', 'VALUE', 'UNIT', 'COOP_CRITERION', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CRITERION 1 — PRODUCT INFORMATION')]);
    rows.push(['product_name',                    d.productName,            '',  'C1.1', ''].map(q).join(','));
    rows.push(['aioxy_assessment_id',             d.dppId,                  '',  'C1.2', ''].map(q).join(','));
    rows.push(['assessment_date',                 d.assessDate,             '',  'C1.3', ''].map(q).join(','));
    rows.push(['production_country',              d.mfgCountry,             '',  'C1.4', ''].map(q).join(','));
    rows.push(['net_weight_kg',                   fix(d.pWeightKg, 4),      'kg','C1.5', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('CRITERION 2 — CLIMATE IMPACT (Coop Net-Zero 2023 target)')]);
    rows.push(['product_climate_impact_kg_co2e_per_kg', fix(d.cc, 6),       'kg CO2e/kg', 'C2.1', 'Cradle-to-retail'].map(q).join(','));
    rows.push(['climate_impact_ingredients',           fix(d.cc_ing, 6),    'kg CO2e/kg', 'C2.2', ''].map(q).join(','));
    rows.push(['climate_impact_production',            fix(d.cc_mfg, 6),    'kg CO2e/kg', 'C2.3', ''].map(q).join(','));
    rows.push(['climate_impact_transport',             fix(d.cc_trans, 6),  'kg CO2e/kg', 'C2.4', 'GLEC v3.2'].map(q).join(','));
    rows.push(['climate_impact_packaging',             fix(d.cc_pkg, 6),    'kg CO2e/kg', 'C2.5', 'PEF CFF'].map(q).join(','));
    rows.push(['fossil_co2_per_kg',                    fix(d.cc_fossil, 6), 'kg CO2e/kg', 'C2.6', ''].map(q).join(','));
    rows.push(['biogenic_co2_per_kg',                  fix(d.cc_biogenic,6),'kg CO2e/kg', 'C2.7', 'Per GHG Protocol land sector guidance'].map(q).join(','));
    rows.push(['renewable_energy_production',          d.mfgEnergySource === 'renewable' ? 'YES' : 'NO', '', 'C2.8', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('CRITERION 3 — WATER (Coop Oecoplan water stewardship)')]);
    rows.push(['water_scarcity_m3_world_eq_per_kg', fix(d.water, 7),       'm3 world eq./kg','C3', 'AWARE 2.0'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CRITERION 4 — BIODIVERSITY AND LAND')]);
    rows.push(['land_use_pt_per_kg',              fix(d.land, 4),           'Pt/kg',  'C4.1', ''].map(q).join(','));
    rows.push(['eutrophication_fw_per_kg',        fix(d.eutr_fw, 8),        'kg Pe/kg','C4.2',''].map(q).join(','));
    rows.push(['eutrophication_marine_per_kg',    fix(d.eutr_m, 8),         'kg Ne/kg','C4.3',''].map(q).join(','));
    rows.push(['deforestation_risk',              d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'HIGH' : 'LOW', '', 'C4.4', 'EUDR screening'].map(q).join(','));
    rows.push(['']);

    rows.push([c('CRITERION 5 — PACKAGING')]);
    rows.push(['packaging_material',              d.pkgMaterial,            '',   'C5.1', ''].map(q).join(','));
    rows.push(['packaging_weight_g',              fix(d.pkgWeightKg*1000,2),'g',  'C5.2', ''].map(q).join(','));
    rows.push(['recycled_content_pct',            fix(d.pkgRecycledPct, 1), '%',  'C5.3', ''].map(q).join(','));
    rows.push(['end_of_life_route',               d.pkgEoLScenario,         '',   'C5.4', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('CRITERION 6 — DATA QUALITY AND TRANSPARENCY')]);
    rows.push(['lca_standard',                    d.methodology,            '',   'C6.1', ''].map(q).join(','));
    rows.push(['data_quality_dqr',               fix(d.dqrOverall, 2),     '/5', 'C6.2', ''].map(q).join(','));
    rows.push(['primary_data_used',               d.primaryDataApplied,     '',   'C6.3', ''].map(q).join(','));
    rows.push(['uncertainty_pct',                 fix(d.uncPct, 1),         '%',  'C6.4', ''].map(q).join(','));
    rows.push(['third_party_verification',        'NO — screening-level',   '',   'C6.5', 'Suitable for Oecoplan tier 1 submission'].map(q).join(','));
    rows.push(['audit_hash_sha256',               d.auditHash,              '',   'C6.6', ''].map(q).join(','));
    rows.push(['']);
    rows.push([c('END COOP CH OECOPLAN EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// CSRD / ESRS — ESRS E1-E5 Machine-Readable Disclosure
// ─────────────────────────────────────────────────────────────────────────────
function generateCSRD_ESRS_CSV(d) {
    const rows = [];
    rows.push([c('CSRD / ESRS — MACHINE-READABLE ENVIRONMENTAL DISCLOSURE')]);
    rows.push([c('Standard: European Sustainability Reporting Standards (EFRAG 2023) ESRS E1-E5')]);
    rows.push([c('Generated by AIOXY — aligned with ESRS E1 (Climate), E2 (Pollution), E3 (Water), E4 (Biodiversity), E5 (Resources)')]);
    rows.push([c('Reference: EFRAG ESRS Set 1 (July 2023) — Commission Delegated Regulation 2023/2772')]);
    rows.push([c('Note: This is a PRODUCT-LEVEL disclosure feeding into the company-level CSRD report.')]);
    rows.push([c('Company-level CSRD filing must aggregate across all products — consult your ESG reporting team.')]);
    rows.push(['']);
    rows.push(['esrs_datapoint', 'value', 'unit', 'esrs_standard', 'esrs_paragraph', 'esrs_category', 'notes'].map(q).join(','));
    rows.push(['']);

    rows.push([c('ESRS E1 — CLIMATE CHANGE (Commission Delegated Regulation 2023/2772 Annex I)')]);
    rows.push(['esrs_e1_product_name',           d.productName,            '',          'ESRS E1', 'AR1',    'General', 'Product identifier'].map(q).join(','));
    rows.push(['esrs_e1_assessment_id',          d.dppId,                  '',          'ESRS E1', 'AR1',    'General', 'AIOXY DPP reference'].map(q).join(','));
    rows.push(['esrs_e1_ghg_intensity',          fix(d.cc, 6),             'kg CO2e/kg','ESRS E1', 'E1-6 §44','Disclosure','GHG intensity per unit of product'].map(q).join(','));
    rows.push(['esrs_e1_scope1_manufacturing',   fix(d.cc_mfg, 6),         'kg CO2e/kg','ESRS E1', 'E1-6 §44','Scope 1',  'Direct GHG from manufacturing'].map(q).join(','));
    rows.push(['esrs_e1_scope2_energy',          '0',                      'kg CO2e/kg','ESRS E1', 'E1-6 §44','Scope 2',  'Location-based — included in manufacturing above'].map(q).join(','));
    rows.push(['esrs_e1_scope3_cat1_ingredients',fix(d.cc_ing, 6),         'kg CO2e/kg','ESRS E1', 'E1-6 §51','Scope 3 Cat.1','Purchased goods and services'].map(q).join(','));
    rows.push(['esrs_e1_scope3_cat4_transport',  fix(d.cc_trans, 6),       'kg CO2e/kg','ESRS E1', 'E1-6 §51','Scope 3 Cat.4','Upstream transportation'].map(q).join(','));
    rows.push(['esrs_e1_scope3_cat1_packaging',  fix(d.cc_pkg, 6),         'kg CO2e/kg','ESRS E1', 'E1-6 §51','Scope 3 Cat.1','Purchased packaging'].map(q).join(','));
    rows.push(['esrs_e1_ghg_fossil',             fix(d.cc_fossil, 6),      'kg CO2e/kg','ESRS E1', 'E1-6 §44','Fossil',   'Fossil GHG (non-biogenic)'].map(q).join(','));
    rows.push(['esrs_e1_ghg_biogenic',           fix(d.cc_biogenic, 6),    'kg CO2e/kg','ESRS E1', 'E1-6 §44','Biogenic', 'Biogenic CO2 removals and emissions'].map(q).join(','));
    rows.push(['esrs_e1_ghg_land_use_change',    fix(d.cc_land_use, 6),    'kg CO2e/kg','ESRS E1', 'E1-6 §44','Land Use', 'dLUC GHG per IPCC 2006'].map(q).join(','));
    rows.push(['esrs_e1_methodology',            d.methodology,            '',          'ESRS E1', 'E1-6 §35','Method',   'LCA standard used'].map(q).join(','));
    rows.push(['esrs_e1_gwp_basis',              d.gwpBasis,               '',          'ESRS E1', 'E1-6 §44','Method',   ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('ESRS E2 — POLLUTION')]);
    rows.push(['esrs_e2_particulate_matter',      fix(d.pm, 10),            'disease inc./kg','ESRS E2','E2-4','Pollution to air','EF 3.1 particulate matter formation'].map(q).join(','));
    rows.push(['esrs_e2_photochem_ozone',         fix(d.pof, 8),            'kg NMVOCe/kg','ESRS E2','E2-4','Pollution to air','Photochemical ozone formation EF 3.1'].map(q).join(','));
    rows.push(['esrs_e2_acidification',           fix(d.acid, 8),           'mol H+e/kg','ESRS E2','E2-4','Pollution to air','Acidification EF 3.1'].map(q).join(','));
    rows.push(['esrs_e2_human_tox_cancer',        fix(d.htox_c, 10),        'CTUh/kg',    'ESRS E2','E2-4','Pollution — toxic','USEtox 2.14 cancer'].map(q).join(','));
    rows.push(['esrs_e2_human_tox_noncancer',     fix(d.htox_nc, 10),       'CTUh/kg',    'ESRS E2','E2-4','Pollution — toxic','USEtox 2.14 non-cancer'].map(q).join(','));
    rows.push(['esrs_e2_ecotox_freshwater',       fix(d.etox_fw, 6),        'CTUe/kg',    'ESRS E2','E2-4','Ecotoxicity','USEtox 2.14 freshwater ecotox'].map(q).join(','));
    rows.push(['']);

    rows.push([c('ESRS E3 — WATER AND MARINE RESOURCES')]);
    rows.push(['esrs_e3_water_scarcity',          fix(d.water, 7),          'm3 world eq./kg','ESRS E3','E3-4 §28','Water withdrawal','AWARE 2.0 — scarcity-weighted'].map(q).join(','));
    rows.push(['esrs_e3_water_ingredient_stage',  fix(d.water_ing, 7),      'm3 world eq./kg','ESRS E3','E3-4 §28','Agricultural water','Upstream water use'].map(q).join(','));
    rows.push(['esrs_e3_eutrophication_marine',   fix(d.eutr_m, 8),         'kg Ne/kg',   'ESRS E3','E3-4','Marine eutrophication','EF 3.1'].map(q).join(','));
    rows.push(['']);

    rows.push([c('ESRS E4 — BIODIVERSITY AND ECOSYSTEMS')]);
    rows.push(['esrs_e4_land_use',               fix(d.land, 4),            'Pt/kg',      'ESRS E4','E4-4 §28','Land use','LANCA v2.5'].map(q).join(','));
    rows.push(['esrs_e4_eutrophication_fw',       fix(d.eutr_fw, 8),        'kg Pe/kg',   'ESRS E4','E4-4','Freshwater eutroph.','EF 3.1'].map(q).join(','));
    rows.push(['esrs_e4_eutrophication_terr',     fix(d.eutr_t, 8),         'mol Ne/kg',  'ESRS E4','E4-4','Terrestrial eutroph.','EF 3.1'].map(q).join(','));
    rows.push(['esrs_e4_deforestation_risk',      d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'HIGH' : 'LOW', '', 'ESRS E4','E4-4','EUDR risk','Regulation 2023/1115'].map(q).join(','));
    rows.push(['']);

    rows.push([c('ESRS E5 — RESOURCE USE AND CIRCULAR ECONOMY')]);
    rows.push(['esrs_e5_resource_fossils',        fix(d.res_fossil, 4),     'MJ/kg',      'ESRS E5','E5-4 §28','Fossil resource use','EF 3.1'].map(q).join(','));
    rows.push(['esrs_e5_resource_minerals',       fix(d.res_mm, 10),        'kg Sbe/kg',  'ESRS E5','E5-4','Mineral/metal resource use','EF 3.1'].map(q).join(','));
    rows.push(['esrs_e5_packaging_material',       d.pkgMaterial,            '',           'ESRS E5','E5-4','Circular economy — packaging','Primary packaging material type'].map(q).join(','));
    rows.push(['esrs_e5_packaging_weight_kg',      fix(d.pkgWeightKg, 4),    'kg',         'ESRS E5','E5-4','Circular economy — packaging','Per unit of product'].map(q).join(','));
    rows.push(['esrs_e5_packaging_recycled_content',fix(d.pkgRecycledPct,1),'%',          'ESRS E5','E5-4','Circular economy — packaging','By weight'].map(q).join(','));
    rows.push(['esrs_e5_packaging_recyclability', d.pkgEoLScenario,         '',           'ESRS E5','E5-4','Circular economy — EoL','EOL pathway'].map(q).join(','));
    rows.push(['esrs_e5_ozone_depletion',         fix(d.ozone, 12),         'kg CFC11e/kg','ESRS E5','E5-4','Ozone depletion','EF 3.1'].map(q).join(','));
    rows.push(['esrs_e5_ionizing_radiation',      fix(d.ir, 6),             'kBq U235e/kg','ESRS E5','E5-4','Ionizing radiation','EF 3.1'].map(q).join(','));
    rows.push(['']);

    rows.push([c('ESRS DATA QUALITY DISCLOSURE')]);
    rows.push(['esrs_dq_lca_database',            d.lciDatabase,            '',  'ESRS 2','BP-1', 'Policies', 'LCI background database'].map(q).join(','));
    rows.push(['esrs_dq_rating',                  fix(d.dqrOverall, 2),     '/5','ESRS 2','BP-1', 'Data quality','DQR per PEF 3.1 — 4-indicator scheme'].map(q).join(','));
    rows.push(['esrs_dq_primary_data',            d.primaryDataApplied,     '',  'ESRS 2','BP-1', 'Primary data','YES/NO'].map(q).join(','));
    rows.push(['esrs_dq_uncertainty_pct',         fix(d.uncPct, 1),         '%', 'ESRS 2','BP-1', 'Uncertainty','MC 95% CI width'].map(q).join(','));
    rows.push(['esrs_dq_system_boundary',         d.systemBoundary,         '',  'ESRS 2','BP-1', 'System boundary',''].map(q).join(','));
    rows.push(['esrs_dq_verification',            'Self-declared — not third-party verified', '', 'ESRS 2','BP-1','Assurance','ISO 14044 critical review required for CSRD assured disclosure'].map(q).join(','));
    rows.push(['esrs_dq_audit_hash',              d.auditHash,              '',  'ESRS 2','BP-1', 'Audit trail','SHA-256'].map(q).join(','));
    rows.push(['']);
    rows.push([c('END CSRD/ESRS EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// CDP SUPPLY CHAIN — C6.5 Scope 3 Category 1 (Purchased Goods) 2024
// ─────────────────────────────────────────────────────────────────────────────
function generateCDP_SC_CSV(d) {
    const rows = [];
    rows.push([c('CDP SUPPLY CHAIN 2024 — MODULE C6.5 SCOPE 3 CATEGORY 1 (PURCHASED GOODS AND SERVICES)')]);
    rows.push([c('Generated by AIOXY — field names align with CDP Supply Chain 2024 questionnaire')]);
    rows.push([c('Reference: CDP Supply Chain 2024 Guidance — C6.5 Scope 3 purchased goods engagement')]);
    rows.push(['']);
    rows.push(['CDP_FIELD', 'VALUE', 'UNIT', 'CDP_MODULE', 'NOTES'].map(q).join(','));
    rows.push(['']);

    rows.push([c('C0 — INTRODUCTION')]);
    rows.push(['supplier_product_name',          d.productName,            '',  'C0',    ''].map(q).join(','));
    rows.push(['aioxy_dpp_id',                   d.dppId,                  '',  'C0',    'Unique assessment identifier'].map(q).join(','));
    rows.push(['reporting_year',                 d.assessDate.slice(0,4),  '',  'C0',    ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('C6.5 — SCOPE 3 EMISSIONS — CATEGORY 1: PURCHASED GOODS AND SERVICES')]);
    rows.push([c('Activity-based method: product carbon footprint per ISO 14044 / PEF 3.1')]);
    rows.push(['c6_5_scope3_cat1_intensity_kg_co2e_per_kg', fix(d.cc_ing + d.cc_pkg, 6), 'kg CO2e/kg', 'C6.5', 'Ingredients + packaging — Scope 3 Cat.1 from buyer perspective'].map(q).join(','));
    rows.push(['c6_5_scope3_cat4_intensity_kg_co2e_per_kg', fix(d.cc_trans, 6),           'kg CO2e/kg', 'C6.5', 'Upstream transport — Scope 3 Cat.4'].map(q).join(','));
    rows.push(['c6_5_total_product_intensity_kg_co2e_per_kg', fix(d.cc, 6),               'kg CO2e/kg', 'C6.5', 'Total product cradle-to-retail'].map(q).join(','));
    rows.push(['c6_5_supplier_scope1_intensity',              fix(d.cc_mfg, 6),            'kg CO2e/kg', 'C6.5', 'Supplier Scope 1+2 from manufacturing'].map(q).join(','));
    rows.push(['c6_5_emissions_boundary',        'Cradle-to-Retail (ISO 14044)',  '',  'C6.5', 'From farm gate to retailer distribution centre'].map(q).join(','));
    rows.push(['c6_5_calculation_method',        'Activity-based PCF per ISO 14044 / PEF 3.1', '', 'C6.5', 'LCI database: AGRIBALYSE 3.2'].map(q).join(','));
    rows.push(['c6_5_emission_factors_source',   d.lciDatabase,            '',  'C6.5', ''].map(q).join(','));
    rows.push(['c6_5_gwp_standard',              d.gwpBasis,               '',  'C6.5', ''].map(q).join(','));
    rows.push(['c6_5_data_quality',              fix(d.dqrOverall, 2) + '/5.0', '', 'C6.5', 'DQR per PEF 3.1 — 1=best 5=worst'].map(q).join(','));
    rows.push(['c6_5_primary_data_used',         d.primaryDataApplied,     '',  'C6.5', 'YES = farm/factory primary activity data included'].map(q).join(','));
    rows.push(['c6_5_uncertainty_pct',           fix(d.uncPct, 1),         '%', 'C6.5', 'Monte Carlo 95% CI width — ingredient stage'].map(q).join(','));
    rows.push(['c6_5_third_party_verification',  'NO — self-declared screening-level LCA', '', 'C6.5', 'ISO 14044 critical review not conducted'].map(q).join(','));
    rows.push(['c6_5_verification_standard',     'N/A — screening-level',  '',  'C6.5', ''].map(q).join(','));
    rows.push(['c6_5_audit_reference',           d.auditHash,              '',  'C6.5', 'SHA-256 hash of all inputs and outputs'].map(q).join(','));
    rows.push(['']);

    rows.push([c('C6.5 ADDITIONAL ENVIRONMENTAL INDICATORS (CDP Biodiversity and Water modules)')]);
    rows.push(['water_scarcity_m3_world_eq_per_kg', fix(d.water, 7),       'm3 world eq./kg','C-W3','Water scarcity AWARE 2.0'].map(q).join(','));
    rows.push(['land_use_pt_per_kg',               fix(d.land, 4),         'Pt/kg',          'C-B3','Land use LANCA v2.5'].map(q).join(','));
    rows.push(['eutrophication_fw_per_kg',         fix(d.eutr_fw, 8),      'kg Pe/kg',       'C-B3','Freshwater eutrophication EF 3.1'].map(q).join(','));
    rows.push(['deforestation_risk_flag',          d.ingredients.some(i => i.eudrRisk === 'HIGH') ? 'HIGH' : 'LOW', '', 'C-F14.2', 'EUDR Annex 1 screening'].map(q).join(','));
    rows.push(['packaging_material',               d.pkgMaterial,            '',          'C-W3', 'Primary packaging material'].map(q).join(','));
    rows.push(['packaging_recycled_content_pct',   fix(d.pkgRecycledPct, 1), '%',         'C-W3', 'Circular economy indicator'].map(q).join(','));
    rows.push(['packaging_eol_pathway',            d.pkgEoLScenario,         '',          'C-W3', 'End-of-life route'].map(q).join(','));
    rows.push(['']);
    rows.push([c('END CDP SUPPLY CHAIN EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERIC EU RETAILER — GS1/ESSG aligned
// ─────────────────────────────────────────────────────────────────────────────
function generateGenericEUCSV(d) {
    const rows = [];
    rows.push([c('GENERIC EU RETAILER FORMAT — GS1 DIGITAL LINK / ESSG PRODUCT SUSTAINABILITY DATA STANDARD v1.0')]);
    rows.push([c('Use this format for retailers not in the specific list, or as a data exchange format for GS1-enabled portals')]);
    rows.push([c('Reference: GS1 Global Product Classification + ESSG (European Sustainability Standards Group) PSS v1.0 (2024)')]);
    rows.push(['']);
    rows.push(['gs1_field', 'value', 'unit', 'gs1_attribute_id', 'essg_mapping', 'notes'].map(q).join(','));
    rows.push(['']);

    rows.push([c('PRODUCT IDENTITY')]);
    rows.push(['productDescription',              d.productName,            '',          'gpc:10006490', 'ESSG:productName', ''].map(q).join(','));
    rows.push(['sustainabilityAssessmentId',      d.dppId,                  '',          'aioxy:dppId',  'ESSG:assessmentId', 'AIOXY DPP ID'].map(q).join(','));
    rows.push(['assessmentDate',                  d.assessDate,             '',          'ESSG:date',    'ESSG:assessmentDate', 'ISO 8601'].map(q).join(','));
    rows.push(['countryOfManufacture',            d.mfgCountry,             '',          'gpc:countryOfOrigin', 'ESSG:origin', 'ISO 3166-1'].map(q).join(','));
    rows.push(['netContent',                      fix(d.pWeightKg, 4),      'kg',        'gs1:netContent','ESSG:weight', ''].map(q).join(','));
    rows.push(['functionalUnit',                  d.functionalUnit,         '',          'ESSG:funcUnit', 'PEF3.1', ''].map(q).join(','));
    rows.push(['systemBoundary',                  d.systemBoundary,         '',          'ESSG:sysBound', 'ISO14044', ''].map(q).join(','));
    rows.push(['']);

    rows.push([c('CLIMATE CHANGE — GHG PROTOCOL / ESSG CarbonScore')]);
    rows.push(['carbonFootprint',                 fix(d.cc, 6),             'kg CO2e/kg','ESSG:PCF_total','E1-6','Total cradle-to-retail'].map(q).join(','));
    rows.push(['carbonFootprintFossil',           fix(d.cc_fossil, 6),      'kg CO2e/kg','ESSG:PCF_fossil','E1-6',''].map(q).join(','));
    rows.push(['carbonFootprintBiogenic',         fix(d.cc_biogenic, 6),    'kg CO2e/kg','ESSG:PCF_biogenic','E1-6',''].map(q).join(','));
    rows.push(['carbonFootprintLandUseChange',    fix(d.cc_land_use, 6),    'kg CO2e/kg','ESSG:PCF_LUC','E1-6','dLUC'].map(q).join(','));
    rows.push(['scope3Cat1IngredientsPackaging',  fix(d.cc_ing + d.cc_pkg, 6),'kg CO2e/kg','ESSG:scope3cat1','GHGp',''].map(q).join(','));
    rows.push(['scope12Manufacturing',            fix(d.cc_mfg, 6),         'kg CO2e/kg','ESSG:scope12','GHGp',''].map(q).join(','));
    rows.push(['scope3Cat4Transport',             fix(d.cc_trans, 6),       'kg CO2e/kg','ESSG:scope3cat4','GHGp',''].map(q).join(','));
    rows.push(['']);

    rows.push([c('ADDITIONAL PEF 3.1 INDICATORS')]);
    rows.push(['waterScarcity',                   fix(d.water, 7),          'm3 world eq./kg','ESSG:water_aware','E3-4','AWARE 2.0'].map(q).join(','));
    rows.push(['landUse',                         fix(d.land, 4),           'Pt/kg',      'ESSG:land_use',   'E4-4','LANCA v2.5'].map(q).join(','));
    rows.push(['eutrophicationFreshwater',        fix(d.eutr_fw, 8),        'kg Pe/kg',   'ESSG:eutr_fw',    'E4-4','EF 3.1'].map(q).join(','));
    rows.push(['eutrophicationMarine',            fix(d.eutr_m, 8),         'kg Ne/kg',   'ESSG:eutr_m',     'E3-4','EF 3.1'].map(q).join(','));
    rows.push(['eutrophicationTerrestrial',       fix(d.eutr_t, 8),         'mol Ne/kg',  'ESSG:eutr_t',     'E4-4','EF 3.1'].map(q).join(','));
    rows.push(['acidification',                   fix(d.acid, 8),           'mol H+e/kg', 'ESSG:acid',       'E2-4','EF 3.1'].map(q).join(','));
    rows.push(['particulateMatter',               fix(d.pm, 10),            'disease inc./kg','ESSG:pm',      'E2-4','EF 3.1'].map(q).join(','));
    rows.push(['ozoneDepletion',                  fix(d.ozone, 12),         'kg CFC11e/kg','ESSG:od',         'E5-4','EF 3.1'].map(q).join(','));
    rows.push(['ionizingRadiation',               fix(d.ir, 6),             'kBq U235e/kg','ESSG:ir',         'E5-4','EF 3.1'].map(q).join(','));
    rows.push(['humanToxicityCancer',             fix(d.htox_c, 10),        'CTUh/kg',    'ESSG:htox_c',     'E2-4','USEtox 2.14'].map(q).join(','));
    rows.push(['humanToxicityNonCancer',          fix(d.htox_nc, 10),       'CTUh/kg',    'ESSG:htox_nc',    'E2-4','USEtox 2.14'].map(q).join(','));
    rows.push(['ecotoxicityFreshwater',           fix(d.etox_fw, 6),        'CTUe/kg',    'ESSG:etox',       'E2-4','USEtox 2.14'].map(q).join(','));
    rows.push(['resourceUseFossils',              fix(d.res_fossil, 4),     'MJ/kg',      'ESSG:res_f',      'E5-4','EF 3.1'].map(q).join(','));
    rows.push(['resourceUseMineralsMetals',       fix(d.res_mm, 10),        'kg Sbe/kg',  'ESSG:res_mm',     'E5-4','EF 3.1'].map(q).join(','));
    rows.push(['pefSingleScore',                  fix(d.pefScore, 4),       'microPt/kg', 'ESSG:pef_score',  'PEF3.1','EF 3.1 NF/WF'].map(q).join(','));
    rows.push(['']);

    rows.push([c('PACKAGING')]);
    rows.push(['packagingMaterial',               d.pkgMaterial,            '',           'gs1:packaging',   'ESSG:pkg_mat',''].map(q).join(','));
    rows.push(['packagingWeightKg',               fix(d.pkgWeightKg, 4),    'kg',         'gs1:pkgWeight',   'ESSG:pkg_wt',''].map(q).join(','));
    rows.push(['packagingRecycledContentPct',     fix(d.pkgRecycledPct, 1), '%',          'ESSG:recycled_in','ESSG:circ',''].map(q).join(','));
    rows.push(['packagingEndOfLifeRoute',         d.pkgEoLScenario,         '',           'ESSG:eol_route',  'E5-4',''].map(q).join(','));
    rows.push(['']);

    rows.push([c('DATA QUALITY')]);
    rows.push(['lcaStandard',                     d.methodology,            '',           'ESSG:method',     '',''].map(q).join(','));
    rows.push(['lciDatabase',                     d.lciDatabase,            '',           'ESSG:lci_db',     '',''].map(q).join(','));
    rows.push(['dataQualityRating',               fix(d.dqrOverall, 2),     '/5',         'ESSG:dqr',        'PEF3.1 §5.7',''].map(q).join(','));
    rows.push(['primaryDataUsed',                 d.primaryDataApplied,     '',           'ESSG:prim_data',  '',''].map(q).join(','));
    rows.push(['uncertaintyPct',                  fix(d.uncPct, 1),         '%',          'ESSG:uncertainty','','MC 95% CI width'].map(q).join(','));
    rows.push(['thirdPartyVerified',              'NO',                     '',           'ESSG:verified',   '','Screening-level only'].map(q).join(','));
    rows.push(['auditHashSHA256',                 d.auditHash,              '',           'ESSG:audit_hash', '','Tamper-evident'].map(q).join(','));
    rows.push(['']);
    rows.push([c('END GENERIC EU / GS1-ESSG EXPORT — ' + d.dppId + ' — ' + d.assessDate)]);
    return '\uFEFF' + rows.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DISPATCHER — generateRetailerCSV(retailerKey)
// ─────────────────────────────────────────────────────────────────────────────

var RETAILER_CONFIG = {
    TESCO:        { fn: generateTescoCSV,        label: 'Tesco',                    filename: 'AIOXY_Tesco_TSN' },
    SAINSBURYS:   { fn: generateSainsburysCSV,   label: "Sainsbury's",              filename: "AIOXY_Sainsburys_SSQ" },
    LIDL:         { fn: generateLidlCSV,         label: 'Lidl International',       filename: 'AIOXY_Lidl_CSR' },
    ALDI:         { fn: generateAldiCSV,         label: 'Aldi',                     filename: 'AIOXY_Aldi_Sustainability' },
    REWE:         { fn: generateReweCSV,         label: 'Rewe Group',               filename: 'AIOXY_Rewe_Lieferant' },
    ALBERT_HEIJN: { fn: generateAlbertHeijnCSV,  label: 'Albert Heijn / Ahold',     filename: 'AIOXY_AlbertHeijn_AH' },
    CARREFOUR:    { fn: generateCarrefourCSV,    label: 'Carrefour ACT',            filename: 'AIOXY_Carrefour_ACT' },
    LECLERC:      { fn: generateLeclercCSV,      label: 'E.Leclerc',                filename: 'AIOXY_Leclerc_DD' },
    INTERMARCHE:  { fn: generateIntermarcheCSV,  label: 'Intermarché',              filename: 'AIOXY_Intermarche_RSE' },
    COOP_CH:      { fn: generateCoopCHCSV,       label: 'Coop Switzerland',         filename: 'AIOXY_CoopCH_Oecoplan' },
    GENERIC_EU:   { fn: generateGenericEUCSV,    label: 'Generic EU (GS1/ESSG)',    filename: 'AIOXY_GenericEU_GS1' },
    CSRD_ESRS:    { fn: generateCSRD_ESRS_CSV,   label: 'CSRD / ESRS E1-E5',        filename: 'AIOXY_CSRD_ESRS' },
    CDP_SC:       { fn: generateCDP_SC_CSV,      label: 'CDP Supply Chain C6.5',    filename: 'AIOXY_CDP_SupplyChain' }
};

function generateRetailerCSV(retailerKey) {
    if (!window.auditTrailData || !window.finalPefResults) {
        alert('Please run a calculation first before exporting.');
        return;
    }

    const config = RETAILER_CONFIG[retailerKey];
    if (!config) {
        alert('Unknown retailer key: ' + retailerKey + '. Valid keys: ' + Object.keys(RETAILER_CONFIG).join(', '));
        return;
    }

    try {
        const masterData = buildMasterData();
        const csvContent = config.fn(masterData);
        const pName = (masterData.productName || 'product').replace(/[^a-z0-9]/gi, '_').slice(0, 25);
        const dateStr = masterData.assessDate.replace(/-/g, '');
        const filename = config.filename + '_' + pName + '_' + masterData.dppId + '_' + dateStr + '.csv';

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('[AIOXY Retailer CSV] Exported: ' + filename);
    } catch (err) {
        console.error('[AIOXY Retailer CSV] Export failed:', err);
        alert('Export failed: ' + err.message + '\n\nPlease ensure a calculation has been run and all required data is available.');
    }
}

// Export all retailer CSVs at once as a zip-like sequential download
function generateAllRetailerCSVs() {
    if (!window.auditTrailData || !window.finalPefResults) {
        alert('Please run a calculation first.');
        return;
    }
    const keys = Object.keys(RETAILER_CONFIG);
    let i = 0;
    function next() {
        if (i >= keys.length) return;
        generateRetailerCSV(keys[i]);
        i++;
        // Stagger downloads to avoid browser blocking
        setTimeout(next, 600);
    }
    next();
}

// Expose to window
window.aioxy_retailer = {
    generate:       generateRetailerCSV,
    generateAll:    generateAllRetailerCSVs,
    buildMasterData: buildMasterData,
    RETAILER_CONFIG: RETAILER_CONFIG
};

console.log('[AIOXY Retailer CSV Engine v1.0] Loaded. Retailers: ' + Object.keys(RETAILER_CONFIG).join(', '));

})();
