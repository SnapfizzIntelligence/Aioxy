
// ================== AIOXY MAIN CONTROLLER v3.2 ==================
// Global State, Initialization, and Core Application Flow
// Twin Calculation Engine — Dual Product Parallel Analysis
// BUG-01 FIX: Stale twin/baseline globals reset at start of calculateImpact()
// ===================================================================

// ================== GLOBAL VARIABLES ==================
var selectedIngredients = [];
var conventionalBaselineIngredients = [];
var currentChart = null;
var currentDPPId = null;
var finalPefResults = {};
var massBalanceData = {};
var auditTrailData = {};
var currentComparisonBaseline = null;
var currentAnnualVolume = 10000;

// ── TWIN GLOBALS ─────────────────────────────────────────────────────────────
// Mirrors selectedIngredients / auditTrailData for the parametric twin product.
// Populated only when the twin form has at least one ingredient.
var twinSelectedIngredients = [];
var twinResult = null;
var twinFinalPefResults = {};
var twinAuditTrailData = {};
// ─────────────────────────────────────────────────────────────────────────────

// Physics-based scenarios (7 total)
let activeScenarios = {
    renewables: false,
    local: false,
    lightweight: false,
    regen_ag: false,
    no_waste: false,
    bulk: false,
    circular_pkg: false
};

// Hydration suggestion state
let currentHydrationSuggestion = null;

// ================== COMPATIBILITY BRIDGE ==================
// PHYSICS_CONSTANTS — Environmental Equivalence Factors
// Used exclusively in the Environmental Impact Story section to translate
// kg CO2e savings into human-scale equivalences. These are illustration
// factors only; the underlying PEF calculation is independent of these values.
//
// All constants are sourced from official published sources.
// Last reviewed: June 2026. Review annually — grid intensity in particular
// declines as EU renewable penetration increases.
// ─────────────────────────────────────────────────────────────────────────────
var PHYSICS_CONSTANTS = {

    // ── CAR_EMISSIONS_KG_PER_KM ─────────────────────────────────────────────
    // 0.1700 kg CO2e per vehicle-km (lifecycle, Well-to-Wheel)
    // Represents the EU average passenger car fleet, all fuel types combined,
    // including Well-to-Tank (fuel production + transport) and Tank-to-Wheel
    // (tailpipe combustion) emissions. All GHGs included (CO2, CH4, N2O).
    // Source: UK Department for Energy Security and Net Zero (DESNZ),
    //   "Greenhouse Gas Conversion Factors for Company Reporting 2025",
    //   Table: "Passenger vehicles — average car", WTT+TTW combined,
    //   published June 2025.
    //   URL: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2025
    // Cross-check: EEA (2024) new EU car fleet average 107 g CO2/km (WLTP,
    //   tailpipe only) + ~28% WTT uplift ≈ 0.137 kg CO2e/km for new cars only.
    //   DESNZ 0.170 represents the full in-use fleet including older vehicles,
    //   which is the correct basis for an EU food brand audience.
    // Confidence: HIGH. Annual update recommended.
    CAR_EMISSIONS_KG_PER_KM: 0.1700,

    // ── TREE_ABSORPTION_KG_YEAR ──────────────────────────────────────────────
    // 21.77 kg CO2 absorbed per mature tree per year (temperate broadleaf)
    // NOTE: AIOXY does not surface this constant in the environmental story
    // (tree equivalences are flagged as greenwashing risk per EmpCo guidance —
    // trees are not a permanent sequestration equal to avoided fossil emissions).
    // Retained here for internal reference only. Do not use in consumer outputs.
    // Source: US Forest Service, "Carbon Sequestration in Urban Trees" (2018);
    //   Smith et al. (2006) USDA Forest Service Research Paper NE-343.
    //   Range: 10–48 kg CO2/tree/year depending on species and age.
    //   21.77 is the urban broadleaf temperate mean.
    // Confidence: MEDIUM. Do not expose in UI.
    TREE_ABSORPTION_KG_YEAR: 21.77,

    // ── HOUSEHOLD_ELEC_KG_DAY ────────────────────────────────────────────────
    // 2.3375 kg CO2e per household per day (EU average electricity use)
    // Not currently surfaced in environmental story UI.
    // Retained for potential future use.
    // Source: Eurostat (2023) "Energy consumption in households", EU average
    //   household electricity ~3,500 kWh/year = 9.59 kWh/day.
    //   EU grid intensity 2022 (0.244 kg CO2/kWh, IEA Emission Factors 2024)
    //   → 9.59 × 0.244 ≈ 2.34 kg CO2e/day.
    // Confidence: MEDIUM. Grid intensity updated annually.
    HOUSEHOLD_ELEC_KG_DAY: 2.3375,

    // ── SMARTPHONE_CHARGES_PER_KG_CO2 ───────────────────────────────────────
    // 344 full smartphone charges equivalent to 1 kg CO2e avoided
    // Derivation:
    //   Step 1 — Charge energy: 12 Wh (0.012 kWh) per full charge.
    //     Basis: average smartphone battery 3,800 mAh at 3.7 V nominal
    //     = 14.06 Wh stored; charger round-trip efficiency ~85% →
    //     wall draw = 14.06 / 0.85 = 16.5 Wh. Conservative central estimate
    //     12 Wh used (accounts for partial charges and modern fast-charger
    //     efficiency). Range in literature: 10–17 Wh/charge.
    //     Source: European Commission Ecodesign Impact Accounting Overview
    //     Report 2024 (smartphones & tablets section); IEA (2022)
    //     "The Role of Critical Minerals in Clean Energy Transitions".
    //   Step 2 — EU grid intensity: 0.242 kg CO2e/kWh (EU-27 average, 2023)
    //     Source: Ember (2024) "European Electricity Review 2024",
    //     Table: EU average carbon intensity of electricity generation 2023.
    //     URL: https://ember-energy.org/latest-insights/european-electricity-review-2024/
    //     Cross-check: IEA "Emission Factors 2024" — EU 2023 grid: 242 g CO2/kWh.
    //     URL: https://www.iea.org/data-and-statistics/data-product/emissions-factors-2024
    //   Step 3 — CO2 per charge: 0.012 kWh × 0.242 kg CO2/kWh = 0.002904 kg CO2
    //   Step 4 — Charges per kg CO2: 1 / 0.002904 = 344.3 → rounded to 344
    // Note: prior value was 440.7, implying EU grid ~189 g CO2/kWh (~2020 level).
    //   Updated to 2023 grid intensity. Update annually with Ember EU review.
    // Confidence: HIGH (derivation fully reproducible from cited sources).
    SMARTPHONE_CHARGES_PER_KG_CO2: 344,

    // ── FLIGHT_KM_PER_KG_CO2 ────────────────────────────────────────────────
    // 8.33 km of economy-class flight equivalent to 1 kg CO2 avoided
    // = 0.120 kg CO2 per passenger-km (economy class, CO2 only)
    // Source: ICAO Carbon Emissions Calculator, Methodology v13.1 (August 2024).
    //   URL: https://icec.icao.int/Documents/Methodology%20ICAO%20Carbon%20Emissions%20Calculator_v13_Final.pdf
    //   Basis: weighted average of scheduled aircraft types worldwide,
    //   economy class seat factor (Yseat = 1.0), passenger load factor per
    //   IATA 2023 statistics, fuel burn converted at 3.16 kg CO2/kg jet fuel
    //   (ICAO CORSIA). Medium-haul (500–3500 km) economy: ~0.110–0.130 kg CO2/pax-km.
    //   Central value 0.120 kg CO2/pax-km = 8.33 km/kg CO2.
    // METHODOLOGICAL NOTE — Radiative Forcing (RF) excluded:
    //   Aviation at altitude produces non-CO2 warming effects (contrails, NOx,
    //   H2O). RF multiplier estimates range from 1.7× to 2.5× (IPCC AR6 WG1,
    //   Ch.6; Lee et al. 2021, Atmospheric Environment). ICAO's own calculator
    //   deliberately excludes RF because scientific consensus on magnitude is
    //   still forming. AIOXY follows ICAO methodology: CO2-only basis.
    //   If RF-inclusive basis is preferred: use 0.228 kg CO2e/pax-km (RF=1.9×)
    //   → 4.4 km/kg CO2e. This is disclosed in the environmental story disclaimer.
    // Confidence: HIGH for CO2-only. RF exclusion is explicit and citable.
    FLIGHT_KM_PER_KG_CO2: 8.33,

    // ── LED_HOURS_PER_KG_CO2 ─────────────────────────────────────────────────
    // 413 hours of 10W LED lighting equivalent to 1 kg CO2e avoided
    // Derivation:
    //   Step 1 — LED power: 10 W (standard EU household LED, 806–1000 lm output)
    //     Basis: EU Ecodesign Regulation (EU) 2019/2020 on light sources.
    //     10W LED replaces 60W incandescent (same lumen output class).
    //     Source: European Commission, "Light Sources — Ecodesign",
    //     URL: https://energy-efficient-products.ec.europa.eu/product-list/light-sources_en
    //   Step 2 — Energy per hour: 10 W × 1 h = 0.010 kWh
    //   Step 3 — EU grid intensity: 0.242 kg CO2e/kWh (EU-27 average, 2023)
    //     Source: Ember (2024) "European Electricity Review 2024" (same source
    //     as SMARTPHONE_CHARGES_PER_KG_CO2 above).
    //   Step 4 — CO2 per hour: 0.010 kWh × 0.242 kg CO2/kWh = 0.002420 kg CO2
    //   Step 5 — Hours per kg CO2: 1 / 0.002420 = 413.2 → rounded to 413
    // Note: prior value was 363.6, implying EU grid ~275 g CO2/kWh (~2022 level).
    //   Updated to 2023 grid intensity. Update annually with Ember EU review.
    // Confidence: HIGH (derivation fully reproducible from cited sources).
    LED_HOURS_PER_KG_CO2: 413,

    // ── WATER_BOTTLE_LITERS ──────────────────────────────────────────────────
    // 0.5 litres per standard single-serve water bottle (EU standard)
    // Used for water scarcity equivalence display.
    // Source: EU Regulation (EU) 2021/2035 on packaged waters — standard
    //   single-serve PET bottle nominal volume 500 mL.
    // Confidence: HIGH (statutory definition).
    WATER_BOTTLE_LITERS: 0.5,

    // ── SHADOW_PRICE_EUR_TON ─────────────────────────────────────────────────
    // 85.0 EUR per tonne CO2e — EU ETS carbon shadow price for business case
    // Source: EU Emissions Trading System (EU ETS) — European Energy Exchange
    //   (EEX) spot price, annual average 2023: ~85 EUR/tonne CO2.
    //   URL: https://www.eex.com/en/market-data/environmental-markets
    //   Cross-check: European Commission Impact Assessment Guidelines (2021)
    //   recommend EUR 50–100/tonne for policy appraisal at 2030 horizon.
    // Note: EU ETS price is volatile (range 2023: 55–100 EUR/tonne).
    //   85 EUR/tonne represents the 2023 annual average. Update annually.
    // Confidence: MEDIUM (market price, subject to annual change).
    SHADOW_PRICE_EUR_TON: 85.0

};

var pefCategories = {
    "Climate Change":                { unit: "kg CO₂e",      icon: "smog"         },
    "Ozone Depletion":               { unit: "kg CFC11e",     icon: "sun"          },
    "Human Toxicity, non-cancer":    { unit: "CTUh",          icon: "user-slash"   },
    "Human Toxicity, cancer":        { unit: "CTUh",          icon: "user-injured" },
    "Particulate Matter":            { unit: "disease inc.",  icon: "lungs"        },
    "Ionizing Radiation":            { unit: "kBq U235e",     icon: "radiation"    },
    "Photochemical Ozone Formation": { unit: "kg NMVOCe",     icon: "cloud-sun"    },
    "Acidification":                 { unit: "mol H+e",       icon: "tint"         },
    "Eutrophication, terrestrial":   { unit: "mol N e",       icon: "leaf"         },
    "Eutrophication, freshwater":    { unit: "kg P e",        icon: "water"        },
    "Eutrophication, marine":        { unit: "kg N e",        icon: "fish"         },
    "Ecotoxicity, freshwater":       { unit: "CTUe",          icon: "bug"          },
    "Land Use":                      { unit: "Pt",            icon: "mountain"     },
    "Water Use/Scarcity (AWARE)":    { unit: "m³ world eq.",  icon: "tint"         },
    "Resource Use, minerals/metals": { unit: "kg Sb e",       icon: "gem"          },
    "Resource Use, fossils":         { unit: "MJ",            icon: "oil-can"      }
};

var ANCHOR_DATASETS = {
    'beef-product':    { id: 'beef-cattle-conventional-national-average-at-farm-gate-fr',  factor: 1.0,  name: 'Beef' },
    'chicken-product': { id: 'broiler-conventional-at-farm-gate-fr',                       factor: 1.0,  name: 'Chicken' },
    'pork-product':    { id: 'pig-conventional-national-average-at-farm-gate-fr',          factor: 1.0,  name: 'Pork' },
    'milk-product':    { id: 'cow-milk-conventional-national-average-at-farm-gate-fr',     factor: 1.0,  name: 'Cow Milk' },
    'cheese-product':  { id: 'cow-milk-conventional-national-average-at-farm-gate-fr',     factor: 10.0, name: 'Cheese' },
    'plant-burger':    { id: 'soybean-national-average-animal-feed-at-farm-gate-fr',       factor: 0.3,  name: 'Plant-Based Patty' },
    'plant-milk':      { id: 'oat-grain-national-average-animal-feed-at-farm-gate-fr',     factor: 0.1,  name: 'Oat/Plant Milk' },
    'default':         { id: 'beef-cattle-conventional-national-average-at-farm-gate-fr',  factor: 1.0,  name: 'Conventional Product' }
};

function calculatePEFSingleScore(pefResults, productWeightKg) {
    if (window.auditTrailData && window.auditTrailData.pef_single_score) {
        const ps = window.auditTrailData.pef_single_score;
        return {
            singleScore:     ps.singleScore     || 0,
            normalizedScore: ps.normalizedScore || 0,
            weightedScore:   ps.weightedScore   || 0,
            breakdown:       ps.breakdown       || {},
            unit:            'µPt'
        };
    }
    return { singleScore: 0, normalizedScore: 0, weightedScore: 0, breakdown: {}, unit: 'µPt' };
}

function getUnifiedMetrics(pefResults, massData) {
    const weightKg = (massData && massData.final_content_weight_kg) || 0.2;
    if (!pefResults || !pefResults['Climate Change']) {
        return { weightUsed: weightKg, co2PerKg: 0, waterScarcityPerKg: 0, landUsePerKg: 0, fossilPerKg: 0 };
    }
    return {
        weightUsed:         weightKg,
        co2PerKg:           (pefResults['Climate Change'].total                || 0) / weightKg,
        waterScarcityPerKg: (pefResults['Water Use/Scarcity (AWARE)']?.total   || 0) / weightKg,
        landUsePerKg:       (pefResults['Land Use']?.total                     || 0) / weightKg,
        fossilPerKg:        (pefResults['Resource Use, fossils']?.total        || 0) / weightKg
    };
}

// ================== FACTORY PRIMARY DATA TOGGLE ==================
function toggleFactoryInputs() {
    const isChecked = document.getElementById('usePrimaryFactoryData').checked;
    const inputs = document.getElementById('factoryDataInputs');
    if (isChecked) { inputs.classList.remove('hidden'); } else { inputs.classList.add('hidden'); }
}

// ================== LANGUAGE COMPLIANCE ENGINE ==================
function makeRegulatorSafe(text, isComparative = true) {
    if (!text || typeof text !== 'string') return text || '';
    const replacements = [
        {bad: /\bsaves\b/gi,            good: 'shows potential reduction of'},
        {bad: /\bsaved\b/gi,            good: 'indicates potential reduction of'},
        {bad: /\breduction of\b/gi,     good: 'modeled reduction of'},
        {bad: /\breduces\b/gi,          good: 'models reduction of'},
        {bad: /\bimproves\b/gi,         good: 'shows improvement potential for'},
        {bad: /\bbetter than\b/gi,      good: 'lower impact than'},
        {bad: /\bbest\b/gi,             good: 'improved'},
        {bad: /\bworst\b/gi,            good: 'higher impact'},
        {bad: /\beco-friendly\b/gi,     good: 'with reduced environmental footprint'},
        {bad: /\bgreen\b/gi,            good: 'with improved environmental profile'},
        {bad: /\bsustainable\b/gi,      good: 'with enhanced sustainability characteristics'},
        {bad: /\bnet zero\b/gi,         good: 'reduced carbon footprint'},
        {bad: /\bclimate positive\b/gi, good: 'climate impact reduction'},
        {bad: /\bcarbon neutral\b/gi,   good: 'carbon footprint management'},
        {bad: /\bwill save\b/gi,        good: 'may reduce'},
        {bad: /\bguarantees\b/gi,       good: 'suggests'},
        {bad: /\bensures\b/gi,          good: 'supports'},
        {bad: /\byou saved\b/gi,        good: 'analysis suggests potential saving of'},
        {bad: /\byour impact\b/gi,      good: 'the modeled impact'},
        {bad: /\byou reduced\b/gi,      good: 'modeling indicates reduction of'},
        {bad: /\bwater saved\b/gi,      good: 'lower water scarcity impact'},
        {bad: /\bcarbon reduction\b/gi, good: 'modeled carbon impact reduction'},
        {bad: /\bfootprint reduction\b/gi, good: 'reduced environmental footprint'},
    ];
    let safeText = text;
    replacements.forEach(({bad, good}) => { safeText = safeText.replace(bad, good); });
    if (isComparative) {
        safeText = safeText.replace(/(\b)(\d+\.?\d*)%(?!~)/g, '$1~$2%');
        safeText = safeText.replace(/(\b)(\d+\.?\d*)\s*kg\s*CO₂e/gi, '$1approximately $2 kg CO₂e');
        safeText = safeText.replace(/(\b)(\d+\.?\d*)\s*kg/gi, '$1approximately $2 kg');
    }
    return safeText;
}

window.testLanguageCompliance = function() {
    const tests = ['Saves 2.4 kg CO₂e','80% better than beef','Carbon reduction of 3.5 kg',
        'You saved 10 liters of water','Eco-friendly product','Net zero emissions','Guaranteed footprint reduction'];
    tests.forEach(test => { console.log(`Original: "${test}"\nFixed:    "${makeRegulatorSafe(test)}"\n---`); });
};

// ================== DATA INTEGRITY VALIDATION ==================
function validateDataIntegrity() {
    const issues = [], warnings = [], successes = [];
    if (!aioxyData) { issues.push("❌ CRITICAL: aioxyData not found"); }
    else if (!aioxyData.ingredients) { issues.push("❌ CRITICAL: ingredients database missing"); }
    else if (Object.keys(aioxyData.ingredients).length === 0) { warnings.push("⚠️ Ingredients database is empty"); }
    else { successes.push("✅ Ingredients: " + Object.keys(aioxyData.ingredients).length + " items"); }

    if (aioxyData && aioxyData.processing && Object.keys(aioxyData.processing).length > 0)
        successes.push("✅ Processing: " + Object.keys(aioxyData.processing).length + " methods");
    else warnings.push("⚠️ Processing data missing");

    if (aioxyData && aioxyData.packaging && Object.keys(aioxyData.packaging).length > 0)
        successes.push("✅ Packaging: " + Object.keys(aioxyData.packaging).length + " materials");
    else warnings.push("⚠️ Packaging data missing");

    if (finalPefResults && Object.keys(finalPefResults).length > 0) {
        successes.push("✅ Results: " + Object.keys(finalPefResults).length + " categories");
        ["Climate Change","Water Use/Scarcity (AWARE)","Land Use"].forEach(cat => {
            if (finalPefResults[cat]) successes.push(`✅ ${cat}: ${finalPefResults[cat].total?.toFixed(3)||0}`);
            else warnings.push(`⚠️ ${cat}: missing`);
        });
    } else warnings.push("⚠️ No calculation results yet");

    if (currentComparisonBaseline) successes.push(`✅ Baseline: ${currentComparisonBaseline.name}`);
    else warnings.push("⚠️ No comparison baseline set");

    console.group("📊 Data Integrity Report");
    if (issues.length)   { console.error("❌ CRITICAL:"); issues.forEach(i => console.error(i)); }
    if (warnings.length) { console.warn("⚠️ WARNINGS:"); warnings.forEach(w => console.warn(w)); }
    if (successes.length){ console.log("✅ OK:");        successes.forEach(s => console.log(s)); }
    console.groupEnd();
    return { hasCriticalIssues: issues.length > 0, hasWarnings: warnings.length > 0, issues, warnings, successes,
             overallStatus: issues.length > 0 ? "CRITICAL" : warnings.length > 0 ? "WARNING" : "HEALTHY" };
}

function debugCurrentState() {
    console.group("🐛 Current Application State");
    console.log("📦 Ingredients:", { count: selectedIngredients.length, items: selectedIngredients.map(i => `${i.name}: ${i.quantity}kg`) });
    console.log("🔬 Twin Ingredients:", { count: twinSelectedIngredients.length, items: twinSelectedIngredients.map(i => `${i.name}: ${i.quantity}kg`) });
    console.log("📊 PEF Results:", { categories: finalPefResults ? Object.keys(finalPefResults).length : 0, climateChange: finalPefResults?.["Climate Change"]?.total || 0 });
    console.log("💰 Business:", { baseline: currentComparisonBaseline?.name, volume: currentAnnualVolume });
    console.log("⚖️ Mass Balance:", massBalanceData || "Not calculated");
    console.groupEnd();
    validateDataIntegrity();
    return "Debug complete";
}
window.debugAIOXY = debugCurrentState;

// ================== HYDRATION SUGGESTION FUNCTIONS ==================
function showHydrationSuggestion(suggestion, currentHydration) {
    currentHydrationSuggestion = suggestion;
    const card = document.getElementById('hydrationSuggestionCard');
    const message = document.getElementById('hydrationMessage');
    const targetHydration = window.currentPhysicsProfile ? window.currentPhysicsProfile.target_hydration : 0;
    if (card && message) {
        message.innerHTML = `
            <div style="background:#E3F2FD;padding:1rem;border-radius:8px;margin-bottom:1rem;">
                <i class="fas fa-flask"></i> <strong>Physics Engine Suggestion</strong><br>
                ${suggestion.message}<br><strong>${suggestion.suggestion}</strong>
            </div>
            <div style="font-size:0.9rem;color:var(--gray);">
                Current: ${(currentHydration*100).toFixed(0)}% water • Target: ${(targetHydration*100).toFixed(0)}% water
            </div>`;
        card.classList.remove('hidden');
    }
}

function applyHydrationSuggestion() {
    if (currentHydrationSuggestion) {
        window.userConfirmedHydration  = true;
        window.confirmedHydrationKey   = currentHydrationSuggestion.key;
        const card = document.getElementById('hydrationSuggestionCard');
        if (card) card.classList.add('hidden');
        calculateImpact();
    }
}

function dismissHydrationSuggestion() {
    window.userConfirmedHydration = false;
    const card = document.getElementById('hydrationSuggestionCard');
    if (card) card.classList.add('hidden');
}

// ================== ENGINE BRIDGE ==================
window.foodCalculationEngine = {
    getDQRQualityLevel: function(dqr) {
        if (dqr <= 1.6) return { level: 'Excellent',  class: 'dqr-excellent' };
        if (dqr <= 2.0) return { level: 'Very Good',  class: 'dqr-very-good' };
        if (dqr <= 3.0) return { level: 'Good',       class: 'dqr-good' };
        return           { level: 'Fair/Poor',         class: 'dqr-poor' };
    },
    calculateUncertainty: function(dqr) {
        var score = typeof dqr === 'object' ? (dqr.P || 2.0) : (dqr || 2.0);
        if (score <= 1) return 10;
        if (score <= 2) return Math.round((10 + 15 * (score - 1)) * 10) / 10;
        return Math.round((25 + 25 * (score - 2)) * 10) / 10;
    }
};

// ================== TWIN INPUT BUILDER ==================
// Assembles a full calculation_engine input object from the twin form.
// Called by calculateImpact() when twinSelectedIngredients.length > 0.
function buildTwinInput() {
    const twinProductName   = document.getElementById('twinProductName')?.value || 'Parametric Twin';
    const twinProductWeight = parseFloat(document.getElementById('twinProductWeight')?.value) || 0.2;

    return {
        product: {
            name:               twinProductName,
            weightKg:           twinProductWeight,
            proteinContent:     0,
            concentrationRatio: 1.0
        },
        ingredients: twinSelectedIngredients.map(ing => ({
            id:              ing.id,
            quantityKg:      ing.quantity,
            originCountry:   ing.originCountry  || 'FR',
            processingState: ing.processingState || 'raw',
            physics_note:    ing.physics_note   || '',
            primaryData:     ing.primaryData    || null
        })),
        manufacturing: {
            country:              document.getElementById('twinManufacturingCountry')?.value || 'FR',
            processingMethod:     document.getElementById('twinProcessingMethod')?.value     || 'none',
            energySource:         document.getElementById('twinEnergySource')?.value         || 'grid',
            usePrimaryFactoryData: false,
            primaryFactoryData:   null
        },
        transport: {
            mode:          document.getElementById('twinTransportMode')?.value                   || 'road',
            distanceKm:    parseFloat(document.getElementById('twinTransportDistance')?.value)    || 300,
            refrigeration: document.getElementById('twinRefrigeratedTransport')?.value === 'yes' ? 'chilled'
                         : document.getElementById('twinProcessingMethod')?.value === 'freezing'  ? 'frozen'
                         : 'ambient',
            crisisRouting: false
        },
        packaging: {
            material:       document.getElementById('twinPackagingMaterial')?.value             || 'cardboard',
            weightKg:       parseFloat(document.getElementById('twinPackagingWeight')?.value)   || 0.050,
            recycledPct:    parseFloat(document.getElementById('twinRecycledContent')?.value)   || 30,
            eolDestination: document.getElementById('twinPackagingEoL')?.value                  || 'eu_average'
        },
        // Twin has its own auto self-comparison; inter-product comparison is handled
        // externally by renderTwinResults() comparing mainResult vs twinResult directly.
        comparison: {
            baselineId:        'auto',
            customBaselineCO2: null,
            useJRCBAT:         false,
            ingredientMappings: [],
            twinParams:        null
        }
    };
}

// ================== COPY MAIN → TWIN ==================
// Populates all twin form fields with current main product values.
// User can then tweak only the parameters they want to change.
function copyMainToTwin() {
    // Product basics
    const mainName = document.getElementById('productName')?.value;
    if (mainName) {
        const twinNameEl = document.getElementById('twinProductName');
        if (twinNameEl) twinNameEl.value = mainName + ' (Twin)';
    }
    const mainWeight = document.getElementById('productWeight')?.value;
    if (mainWeight) {
        const twEl = document.getElementById('twinProductWeight');
        if (twEl) twEl.value = mainWeight;
    }

    // Manufacturing
    _copyField('manufacturingCountry',  'twinManufacturingCountry');
    _copyField('processingMethod',      'twinProcessingMethod');
    _copyField('energySource',          'twinEnergySource');

    // Transport
    _copyField('transportMode',         'twinTransportMode');
    _copyField('transportDistance',     'twinTransportDistance');
    _copyField('refrigeratedTransport', 'twinRefrigeratedTransport');

    // Packaging
    _copyField('packagingMaterial',     'twinPackagingMaterial');
    _copyField('packagingWeight',       'twinPackagingWeight');
    _copyField('recycledContent',       'twinRecycledContent');
    _copyField('packagingEoL',          'twinPackagingEoL');

    // BOM — deep copy all main ingredients into twin
    twinSelectedIngredients = selectedIngredients.map(ing => Object.assign({}, ing));
    window.twinSelectedIngredients = twinSelectedIngredients;
    if (typeof updateTwinIngredientList === 'function') updateTwinIngredientList();

    console.log('[AIOXY Twin] Copied main product to twin (' + twinSelectedIngredients.length + ' ingredients)');
    showTwinCopyConfirmation();
}

function _copyField(fromId, toId) {
    const fromEl = document.getElementById(fromId);
    const toEl   = document.getElementById(toId);
    if (fromEl && toEl) toEl.value = fromEl.value;
}

function showTwinCopyConfirmation() {
    const btn = document.getElementById('copyMainToTwinBtn');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btn.style.background = '#27AE60';
    setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
    }, 2000);
}

// ================== ENHANCED CALCULATION ENGINE ==================
async function calculateImpact() {
    if (selectedIngredients.length === 0) { clearResults(); return; }

    // BUG-01 FIX: Reset all twin/baseline globals at the start of every new calculation run.
    // Without this, stale values from a prior session persist in window.currentComparisonBaseline
    // and window._twinResultsForPDF, causing pdf-generator.js to render the wrong twin on the
    // cover page, executive summary, and QR code even when a completely different twin (or no
    // twin at all) was computed in the current run.
    // These are set to their correct values below once the engine returns results.
    window.currentComparisonBaseline = null;
    window._twinResultsForPDF        = null;
    if (window.auditTrailData) {
        window.auditTrailData.comparison_baseline = null;
    }

    const loadingElement = document.getElementById('loadingResults');
    const resultsContent = document.getElementById('resultsContent');
    if (loadingElement) loadingElement.classList.remove('hidden');
    if (resultsContent)  resultsContent.classList.add('hidden');

    // Lift entericParams from primaryData so twin can access them
    selectedIngredients.forEach(ing => {
        if (ing.primaryData && ing.primaryData.entericParams && !ing.entericParams) {
            ing.entericParams = ing.primaryData.entericParams;
        }
    });

    // Sync conventionalBaselineIngredients from window global written by ui.js
    if (window.conventionalBaselineIngredients && window.conventionalBaselineIngredients.length > 0) {
        conventionalBaselineIngredients = window.conventionalBaselineIngredients;
    }

    // ── Build MAIN input ─────────────────────────────────────────────────────
    const input = {
        product: {
            name:               document.getElementById('productName')?.value || 'Unnamed Product',
            weightKg:           parseFloat(document.getElementById('productWeight')?.value) || 0.2,
            proteinContent:     parseFloat(document.getElementById('proteinContent')?.value) || 0,
            concentrationRatio: parseFloat(document.getElementById('concentrationRatio')?.value) || 1.0
        },
        ingredients: selectedIngredients.map(ing => ({
            id:              ing.id,
            quantityKg:      ing.quantity,
            originCountry:   ing.originCountry  || 'FR',
            processingState: ing.processingState || 'raw',
            physics_note:    ing.physics_note   || '',
            primaryData:     ing.primaryData    || null
        })),
        manufacturing: {
            country:              document.getElementById('manufacturingCountry')?.value || 'FR',
            processingMethod:     document.getElementById('processingMethod')?.value     || 'none',
            energySource:         document.getElementById('energySource')?.value         || 'grid',
            usePrimaryFactoryData: document.getElementById('usePrimaryFactoryData')?.checked || false,
            primaryFactoryData:   document.getElementById('usePrimaryFactoryData')?.checked ? {
                totalKWh:             parseFloat(document.getElementById('factoryTotalKWh')?.value)          || 0,
                totalGasM3:           parseFloat(document.getElementById('factoryTotalGas')?.value)          || 0,
                totalOutputKg:        parseFloat(document.getElementById('factoryTotalOutput')?.value)       || 1,
                // Fuel type: determines CO2 emission factor applied to totalGasM3
                // natural_gas: 2.13 kg CO2/m³ | lpg: 1.61 kg CO2/L | fuel_oil: 2.66 kg CO2/L | coal: 2.53 kg CO2/kg
                // Source: EC Covenant of Mayors Emission Factors 2024 Edition (JRC)
                fuelType:             document.getElementById('factoryFuelType')?.value                      || 'natural_gas',
                // Refrigerant leakage: F-gas GWP × kg_leaked → kg CO2e (IPCC AR5 / EC F-Gas Reg 517/2014)
                refrigerantType:      document.getElementById('factoryRefrigerantType')?.value               || '',
                refrigerantKgLeaked:  parseFloat(document.getElementById('factoryRefrigerantKgLeaked')?.value) || 0
            } : null
        },
        transport: {
            mode:          document.getElementById('transportMode')?.value                   || 'road',
            distanceKm:    parseFloat(document.getElementById('transportDistance')?.value)    || 300,
            refrigeration: document.getElementById('refrigeratedTransport')?.value === 'yes' ? 'chilled'
                         : document.getElementById('processingMethod')?.value === 'freezing'  ? 'frozen'
                         : 'ambient',
            crisisRouting: document.getElementById('crisisRoutingToggle')?.checked || false
        },
        packaging: {
            material:       document.getElementById('packagingMaterial')?.value             || 'cardboard',
            weightKg:       parseFloat(document.getElementById('packagingWeight')?.value)   || 0.050,
            recycledPct:    parseFloat(document.getElementById('recycledContent')?.value)   || 30,
            eolDestination: document.getElementById('packagingEoL')?.value                  || 'eu_average'
        },
        comparison: (() => {
            const cbiList = conventionalBaselineIngredients;
            const hasTwin = cbiList && cbiList.length > 0;

            const ingredientMappings = hasTwin
                ? selectedIngredients.map((ing, i) => {
                    const cbi = cbiList[i] || null;
                    const assessedPef = window.aioxyData.ingredients[ing.id]?.data?.pef || null;
                    if (cbi) {
                        const conventionalPef = window.aioxyData.ingredients[cbi.id]?.data?.pef || null;
                        return {
                            assessed:     { id: ing.id, name: ing.name, quantityKg: ing.quantity, pef: assessedPef, entericParams: ing.entericParams || null },
                            conventional: { id: cbi.id, name: cbi.name, quantityKg: cbi.quantity || ing.quantity, pef: conventionalPef, entericParams: null }
                        };
                    }
                    return {
                        assessed:     { id: ing.id, name: ing.name, quantityKg: ing.quantity, pef: assessedPef, entericParams: ing.entericParams || null },
                        conventional: null
                    };
                })
                : [];

            return {
                conventionalBaselineName: document.getElementById('conventionalBaselineName')?.value?.trim() || null,
                baselineId:        document.getElementById('comparisonBaseline')?.value           || 'auto',
                customBaselineCO2: parseFloat(document.getElementById('customBaseline')?.value)   || null,
                useJRCBAT:         document.getElementById('useJRCBAT')?.checked                  || false,
                ingredientMappings,
                twinParams: null   // parametric twin now runs as separate full calculation
            };
        })()
    };

    window.lastInput = input;

    // ── Build TWIN input (if twin has ingredients) ───────────────────────────
    const hasTwinIngredients = twinSelectedIngredients.length > 0;
    let twinInput = null;
    if (hasTwinIngredients) {
        twinInput = buildTwinInput();
        window.lastTwinInput = twinInput;
        console.log('[AIOXY Twin] Twin calculation active —', twinSelectedIngredients.length, 'ingredients');
    }

    try {
        let mainCalcResult, twinCalcResult = null;

        if (twinInput) {
            // ── Run both products simultaneously ──────────────────────────────
            [mainCalcResult, twinCalcResult] = await Promise.all([
                window.calculationEngine.calculate(input),
                window.calculationEngine.calculate(twinInput)
            ]);
            console.log('[AIOXY Twin] ✅ Dual calculation complete');
        } else {
            mainCalcResult = await window.calculationEngine.calculate(input);
        }

        // ── Write main globals ────────────────────────────────────────────────
        window.finalPefResults           = mainCalcResult.finalPefResults;
        window.massBalanceData           = mainCalcResult.massBalanceData;
        window.auditTrailData            = mainCalcResult.auditTrailData;
        window.currentComparisonBaseline = mainCalcResult.comparison.baseline;
        window.currentDPPId              = mainCalcResult.auditTrailData.dppId;

        // BUG-01 FIX: Write comparison_baseline directly into auditTrailData so
        // pdf-generator.js reads it via audit.comparison_baseline (its PRIMARY path)
        // and never falls through to the window.currentComparisonBaseline global.
        // This guarantees cover page, executive summary, and QR code always reflect
        // the current run — not any prior session value.
        if (window.auditTrailData) {
            window.auditTrailData.comparison_baseline = mainCalcResult.comparison.baseline || null;
        }

        // ── Write twin globals ────────────────────────────────────────────────
        window.twinResult           = twinCalcResult;
        window.twinFinalPefResults  = twinCalcResult ? twinCalcResult.finalPefResults  : null;
        window.twinAuditTrailData   = twinCalcResult ? twinCalcResult.auditTrailData   : null;

        // Persist session state
        try {
            localStorage.setItem('aioxy_pitch_state', JSON.stringify({
                ingredients:                     selectedIngredients,
                conventionalBaselineIngredients: conventionalBaselineIngredients,
                twinIngredients:                 twinSelectedIngredients,
                productName:                     input.product.name,
                volume:                          currentAnnualVolume,
                manufacturingCountry:            input.manufacturing.country,
                processingMethod:                input.manufacturing.processingMethod,
                transportMode:                   input.transport.mode,
                transportDistance:               input.transport.distanceKm,
                packagingMaterial:               input.packaging.material,
                energySource:                    input.manufacturing.energySource,
                usePrimaryFactoryData:           input.manufacturing.usePrimaryFactoryData,
                recycledContent:                 input.packaging.recycledPct,
                packagingEoL:                    input.packaging.eolDestination,
                crisisRoutingToggle:             input.transport.crisisRouting,
                timestamp:                       Date.now()
            }));
        } catch(e) { /* localStorage may be unavailable */ }

        // ── Update UI with both results ───────────────────────────────────────
        updateResultsUI(mainCalcResult, twinCalcResult);

        const businessTab = document.getElementById('business-case-tab');
        if (businessTab && !businessTab.classList.contains('hidden')) {
            if (typeof updateBusinessCase === 'function') updateBusinessCase();
        }

        return mainCalcResult;

    } catch (error) {
        console.error('💥 Calculation error:', error);
        // FIX: Do NOT rethrow. Rethrowing leaves window.finalPefResults / window.auditTrailData
        // as stale values from the previous session. The UI still shows ingredients (restored
        // from localStorage) but the PDF exports from old globals showing 0 for ingredients.
        // Show an inline banner instead — error is visible, app state stays consistent.
        const _rc = document.getElementById('resultsContent');
        let _eb = document.getElementById('calcErrorBanner');
        if (!_eb) {
            _eb = document.createElement('div');
            _eb.id = 'calcErrorBanner';
            _eb.style.cssText = 'background:#FFF3E0;border-left:4px solid #FF9800;padding:0.75rem 1rem;margin:0.5rem 0;border-radius:4px;font-size:0.85rem;color:#7B3F00;';
            if (_rc) _rc.prepend(_eb);
        }
        _eb.innerHTML = '<strong>⚠ Calculation error:</strong> ' + (error.message || String(error)) + ' — check browser console for details.';
        _eb.style.display = 'block';
    } finally {
        if (loadingElement) loadingElement.classList.add('hidden');
        if (resultsContent)  resultsContent.classList.remove('hidden');
    }
}

// ================== WORKFLOW: START NEW AUDIT ==================
function startNewAudit() {
    if (!confirm("Are you sure you want to start a new audit? This will clear all current data.")) return;
    localStorage.removeItem('aioxy_pitch_state');

    conventionalBaselineIngredients = [];
    window.conventionalBaselineIngredients = conventionalBaselineIngredients;
    if (typeof updateConventionalIngredientList === 'function') updateConventionalIngredientList();

    // Clear twin state
    twinSelectedIngredients = [];
    window.twinSelectedIngredients = twinSelectedIngredients;
    window.twinResult = null;
    window.twinFinalPefResults = null;
    window.twinAuditTrailData = null;
    if (typeof updateTwinIngredientList === 'function') updateTwinIngredientList();
    if (typeof clearTwinResults === 'function') clearTwinResults();

    selectedIngredients = []; currentDPPId = null; finalPefResults = {}; massBalanceData = {}; auditTrailData = {}; currentComparisonBaseline = null;

    const fields = [
        {id:'productName',val:'New Product'},{id:'productWeight',val:'0.200'},
        {id:'proteinContent',val:''},{id:'customBaseline',val:''},
        {id:'twinProductName',val:''},{id:'twinProductWeight',val:'0.200'}
    ];
    fields.forEach(f => { const el=document.getElementById(f.id); if(el) el.value=f.val; });

    const selects = [
        {id:'productCategory',val:'auto'},{id:'comparisonBaseline',val:'auto'},
        {id:'manufacturingCountry',val:'FR'},{id:'processingMethod',val:'none'},
        {id:'transportMode',val:'road'},{id:'transportDistance',val:'300'},
        {id:'packagingMaterial',val:'cardboard'},{id:'energySource',val:'grid'},
        {id:'packagingEoL',val:'eu_average'},
        // Twin operational selects
        {id:'twinManufacturingCountry',val:'FR'},{id:'twinProcessingMethod',val:'none'},
        {id:'twinEnergySource',val:'grid'},{id:'twinTransportMode',val:'road'},
        {id:'twinTransportDistance',val:'300'},{id:'twinPackagingMaterial',val:'cardboard'},
        {id:'twinPackagingWeight',val:'0.050'},{id:'twinRecycledContent',val:'30'},
        {id:'twinPackagingEoL',val:'eu_average'}
    ];
    selects.forEach(s => { const el=document.getElementById(s.id); if(el) el.value=s.val; });

    const pt = document.getElementById('usePrimaryFactoryData');
    if (pt) { pt.checked = false; if (typeof toggleFactoryInputs === 'function') toggleFactoryInputs(); }
    const ct = document.getElementById('crisisRoutingToggle');
    if (ct) ct.checked = false;

    updateIngredientList(); clearResults(); resetScenarios(); showTab('calculator');
    console.log('✅ [Workflow] System reset for new audit.');
}

// ================== SCENARIO TOGGLE ==================
function toggleScenario(key) {
    activeScenarios[key] = !activeScenarios[key];
    const btn = document.getElementById(`scenario-${key}`);
    if (btn) btn.classList.toggle('active');
    if (typeof updateBusinessCase === 'function') updateBusinessCase();
}

function resetScenarios() {
    activeScenarios = { renewables:false,local:false,lightweight:false,regen_ag:false,no_waste:false,bulk:false,circular_pkg:false };
    document.querySelectorAll('.scenario-btn').forEach(btn => btn.classList.remove('active'));
    if (typeof updateBusinessCase === 'function') updateBusinessCase();
}

// ================== VOLUME MANAGEMENT ==================
function setVolume(volume) {
    document.getElementById('salesVolume').value = volume;
    updateVolumeDisplay(volume);
    if (typeof updateBusinessCase === 'function') updateBusinessCase();
}

function updateVolumeDisplay(volume) {
    currentAnnualVolume = parseInt(volume);
    const display      = document.getElementById('volumeDisplay');
    const scaleDisplay = document.getElementById('businessScaleDisplay');
    const tierDisplay  = document.getElementById('volumeTierDisplay');
    if (!display || !scaleDisplay || !tierDisplay) return;
    if (volume >= 1000000) display.textContent = (volume/1000000).toFixed(volume>=10000000?0:1)+'M';
    else if (volume >= 1000) display.textContent = (volume/1000).toFixed(volume>=10000?0:1)+'K';
    else display.textContent = volume.toLocaleString();
    const bc = calculateScalableBusinessCase({ co2PerKg: 0 }, volume);
    scaleDisplay.textContent = bc.businessScale;
    tierDisplay.textContent  = bc.volumeTier;
}

function calculateScalableBusinessCase(results, annualVolume) {
    if (annualVolume <= 1000)       return { businessScale:"Prototype / Small Batch", volumeTier:"1-1K" };
    if (annualVolume <= 10000)      return { businessScale:"Small Business",          volumeTier:"1K-10K" };
    if (annualVolume <= 100000)     return { businessScale:"Growing Business",        volumeTier:"10K-100K" };
    if (annualVolume <= 1000000)    return { businessScale:"Medium Enterprise",       volumeTier:"100K-1M" };
    if (annualVolume <= 10000000)   return { businessScale:"Large Enterprise",        volumeTier:"1M-10M" };
    if (annualVolume <= 100000000)  return { businessScale:"Major Corporation",       volumeTier:"10M-100M" };
    return { businessScale:"Global Corporation", volumeTier:"100M-1B" };
}

// ================== INITIALIZE APPLICATION ==================
function initApp() {
    console.log('🚀 [AIOXY] Initializing application...');

    const checkData = setInterval(() => {
        if (window.aioxyData && window.aioxyData.ingredients) {
            clearInterval(checkData);
            console.log('✅ [AIOXY] Data loaded. Proceeding...');
            proceedWithInitialization();
        } else {
            console.log('⏳ [AIOXY] Waiting for data...');
        }
    }, 100);

    setTimeout(() => {
        if (!window.aioxyData || !window.aioxyData.ingredients) {
            clearInterval(checkData);
            console.error('❌ [AIOXY] Data load timeout! Fallback demo mode.');
            alert('Data loading timed out. Running in demo mode with limited data.');
            proceedWithInitialization();
        }
    }, 5000);

    function proceedWithInitialization() {
        console.log('📊 [AIOXY] Starting full initialization...');

        if (window.aioxyData.crop_yields && window.aioxyData.grid_intensity) {
            console.log('✅ Universal Physics Engine Ready:', {
                crops:         Object.keys(window.aioxyData.crop_yields).length,
                countries:     Object.keys(window.aioxyData.grid_intensity).length,
                aware_factors: Object.keys(window.aioxyData.aware_20?.agricultural || {}).length
            });
        } else {
            console.warn('⚠️ Universal physics data not found. Using legacy mode.');
            if (window.aioxyData.ingredients) {
                const w = document.createElement('div');
                w.style.cssText = 'background:#FFF3E0;padding:0.75rem;margin:0.5rem 0;border-radius:6px;border-left:4px solid #FF9800';
                w.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:#FF9800"></i> <strong>Universal Physics Data Missing</strong>';
                const fc = document.querySelector('.card');
                if (fc) fc.parentNode.insertBefore(w, fc);
            }
        }

        console.log('   Available ingredients:', Object.keys(window.aioxyData.ingredients).length);
        populateIngredientSelect();
        populateCountrySelect();
        setupIngredientSearch();
        setupBaselineSearch();
        setupCounterpartSearch();
        if (typeof setupConventionalSearch === 'function') setupConventionalSearch();
        if (typeof populateConventionalCountrySelect === 'function') populateConventionalCountrySelect();

        // ── Twin UI setup ──────────────────────────────────────────────────
        if (typeof setupTwinIngredientSearch === 'function') setupTwinIngredientSearch();
        if (typeof populateTwinCountrySelects === 'function') populateTwinCountrySelects();
        // ──────────────────────────────────────────────────────────────────

        setupDemoData();
        updateTabIndicator();

        try {
            const savedState = localStorage.getItem('aioxy_pitch_state');
            if (savedState) {
                const p = JSON.parse(savedState);
                if (Date.now() - p.timestamp < 43200000) {
                    selectedIngredients = p.ingredients || [];

                    // Restore twin ingredients if present
                    if (p.twinIngredients && p.twinIngredients.length > 0) {
                        twinSelectedIngredients = p.twinIngredients;
                        window.twinSelectedIngredients = twinSelectedIngredients;
                        if (typeof updateTwinIngredientList === 'function') updateTwinIngredientList();
                        console.log('✅ [Twin] Restored ' + twinSelectedIngredients.length + ' twin ingredients');
                    }

                    if (p.conventionalBaselineIngredients && p.conventionalBaselineIngredients.length > 0) {
                        conventionalBaselineIngredients = p.conventionalBaselineIngredients;
                        window.conventionalBaselineIngredients = conventionalBaselineIngredients;
                        if (typeof updateConventionalIngredientList === 'function') updateConventionalIngredientList();
                    }
                    if (p.productName)           document.getElementById('productName').value           = p.productName;
                    if (p.manufacturingCountry)  document.getElementById('manufacturingCountry').value  = p.manufacturingCountry;
                    if (p.processingMethod)      document.getElementById('processingMethod').value      = p.processingMethod;
                    if (p.transportMode)         document.getElementById('transportMode').value         = p.transportMode;
                    if (p.transportDistance)     document.getElementById('transportDistance').value     = p.transportDistance;
                    if (p.packagingMaterial)     document.getElementById('packagingMaterial').value     = p.packagingMaterial;
                    if (p.volume)                setVolume(p.volume);
                    if (p.energySource)          document.getElementById('energySource').value          = p.energySource;
                    if (p.usePrimaryFactoryData !== undefined) {
                        const pt = document.getElementById('usePrimaryFactoryData');
                        if (pt) { pt.checked = p.usePrimaryFactoryData; if (typeof toggleFactoryInputs === 'function') toggleFactoryInputs(); }
                    }
                    if (p.recycledContent)    document.getElementById('recycledContent').value     = p.recycledContent;
                    if (p.packagingEoL)       document.getElementById('packagingEoL').value        = p.packagingEoL;
                    if (p.crisisRoutingToggle !== undefined) {
                        const ct = document.getElementById('crisisRoutingToggle');
                        if (ct) ct.checked = p.crisisRoutingToggle;
                    }
                    updateIngredientList();
                    console.log('✅ Recovered previous session state');
                }
            }
        } catch (e) { console.warn('Could not restore session state', e); }

        validateDataIntegrity();
        console.log('✅ [AIOXY] Initialization complete!');

        setTimeout(() => {
            if (selectedIngredients.length > 0) calculateImpact();
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', initApp);

console.log("✅ [AIOXY] main.js v3.2 loaded — BUG-01 FIX: stale twin globals reset on each calculateImpact() call");
