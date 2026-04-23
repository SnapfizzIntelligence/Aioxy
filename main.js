// ================== AIOXY MAIN CONTROLLER v3.0 ==================
// Global State, Initialization, and Core Application Flow
// ===================================================================

// ================== GLOBAL VARIABLES ==================
var selectedIngredients = [];
var currentChart = null;
var currentDPPId = null;
var finalPefResults = {};
var massBalanceData = {};
var auditTrailData = {};
var currentComparisonBaseline = null;
var currentAnnualVolume = 10000;

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
// Engine_3 exported these as globals. The 3 new engine files do NOT.
// ui.js, audit-trail.js and business-case.js still call them by name.
// We re-expose them here from the new engine modules so no other file needs to change.

// ── 1. PHYSICS_CONSTANTS ─────────────────────────────────────────────────────
// Engine_3 exported window.PHYSICS_CONSTANTS. Used by ui.js for equivalency
// displays (car-km, tree-years, household-days).
var PHYSICS_CONSTANTS = {
    TREE_ABSORPTION_KG_YEAR:  22.0,
    CAR_EMISSIONS_KG_PER_KM:  0.150,
    HOUSEHOLD_ELEC_KG_DAY:    2.58,
    WATER_BOTTLE_LITERS:      0.5,
    SHADOW_PRICE_EUR_TON:     85.0,
    gwp: { ch4: 27.9, n2o: 273, biogenic_discount: 0.0, ar6_dynamic: true }
};

// ── 2. pefCategories ─────────────────────────────────────────────────────────
// Engine_3 exported window.pefCategories. Used by ui.js for unit labels and
// icons in the single-score breakdown table.
var pefCategories = {
    "Climate Change":                { unit: "kg CO₂e",      icon: "smog" },
    "Ozone Depletion":               { unit: "kg CFC11e",     icon: "sun" },
    "Human Toxicity, non-cancer":    { unit: "CTUh",          icon: "user-slash" },
    "Human Toxicity, cancer":        { unit: "CTUh",          icon: "user-injured" },
    "Particulate Matter":            { unit: "disease inc.",  icon: "lungs" },
    "Ionizing Radiation":            { unit: "kBq U235e",     icon: "radiation" },
    "Photochemical Ozone Formation": { unit: "kg NMVOCe",     icon: "cloud-sun" },
    "Acidification":                 { unit: "mol H+e",       icon: "tint" },
    "Eutrophication, terrestrial":   { unit: "mol N e",       icon: "leaf" },
    "Eutrophication, freshwater":    { unit: "kg P e",        icon: "water" },
    "Eutrophication, marine":        { unit: "kg N e",        icon: "fish" },
    "Ecotoxicity, freshwater":       { unit: "CTUe",          icon: "bug" },
    "Land Use":                      { unit: "Pt",            icon: "mountain" },
    "Water Use/Scarcity (AWARE)":    { unit: "m³ world eq.", icon: "tint" },
    "Resource Use, minerals/metals": { unit: "kg Sb e",       icon: "gem" },
    "Resource Use, fossils":         { unit: "MJ",            icon: "oil-can" }
};

// ── 3. ANCHOR_DATASETS ───────────────────────────────────────────────────────
// Engine_3 exported window.ANCHOR_DATASETS. Used by ui.js for comparison
// baseline resolution.
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

// ── 4. calculatePEFSingleScore ───────────────────────────────────────────────
// Engine_3 exported window.calculatePEFSingleScore(pefResults, productWeightKg).
// The new core_physics.js has corePhysics.calculateSingleScore({...}) with a
// different call signature and a reduced return shape.
//
// This wrapper:
//   a) Builds NF/WF tables from live db or hardcoded PEF 3.1 fallback
//   b) Computes the score manually (same math as Engine_3)
//   c) Returns the full object shape that ui.js expects:
//      { singleScore, normalizedScore, weightedScore, breakdown,
//        unit, organic_bonus_applied, organic_ratio }
//
function calculatePEFSingleScore(pefResults, productWeightKg) {

    // --- Normalization Factors (JRC EF 3.1) ---
    var pefNF = (function() {
        var live = (window.aioxyData && window.aioxyData.pef_factors)
            ? window.aioxyData.pef_factors.normalization_factors : null;
        if (live) {
            var nf = {};
            Object.keys(live).forEach(function(cat) { nf[cat] = 1 / live[cat]; });
            var ALIAS = {
                'Climate change': 'Climate Change',
                'Ozone depletion': 'Ozone Depletion',
                'Human toxicity, cancer effects': 'Human Toxicity, cancer',
                'Human toxicity, non-cancer effects': 'Human Toxicity, non-cancer',
                'Particulate matter formation': 'Particulate Matter',
                'Ionising radiation': 'Ionizing Radiation',
                'Photochemical ozone formation, human health': 'Photochemical Ozone Formation',
                'Land use': 'Land Use',
                'Water use': 'Water Use/Scarcity (AWARE)',
                'Resource use, minerals and metals': 'Resource Use, minerals/metals',
                'Resource use, fossils': 'Resource Use, fossils'
            };
            Object.keys(ALIAS).forEach(function(k) {
                if (nf[k] !== undefined) nf[ALIAS[k]] = nf[k];
            });
            return nf;
        }
        return {
            "Climate Change": 1/7553.08,       "Ozone Depletion": 1/0.0523,
            "Human Toxicity, cancer": 1/0.0000173, "Human Toxicity, non-cancer": 1/0.000129,
            "Particulate Matter": 1/0.000595,   "Ionizing Radiation": 1/4220.16,
            "Photochemical Ozone Formation": 1/40.86, "Acidification": 1/55.57,
            "Eutrophication, terrestrial": 1/176.75,  "Eutrophication, freshwater": 1/1.61,
            "Eutrophication, marine": 1/19.55,        "Ecotoxicity, freshwater": 1/56716.59,
            "Land Use": 1/819498.18, "Water Use/Scarcity (AWARE)": 1/11468.71,
            "Resource Use, minerals/metals": 1/0.0636, "Resource Use, fossils": 1/65004.26
        };
    })();

    // --- Weighting Factors (JRC EF 3.1) ---
    var pefWF = (function() {
        var live = (window.aioxyData && window.aioxyData.pef_factors)
            ? window.aioxyData.pef_factors.weighting_factors : null;
        if (live) {
            var wf = Object.assign({}, live);
            var ALIAS_WF = {
                'Climate change': 'Climate Change',
                'Ozone depletion': 'Ozone Depletion',
                'Human toxicity, cancer effects': 'Human Toxicity, cancer',
                'Human toxicity, non-cancer effects': 'Human Toxicity, non-cancer',
                'Particulate matter formation': 'Particulate Matter',
                'Ionising radiation': 'Ionizing Radiation',
                'Photochemical ozone formation, human health': 'Photochemical Ozone Formation',
                'Land use': 'Land Use',
                'Water use': 'Water Use/Scarcity (AWARE)',
                'Resource use, minerals and metals': 'Resource Use, minerals/metals',
                'Resource use, fossils': 'Resource Use, fossils'
            };
            Object.keys(ALIAS_WF).forEach(function(k) {
                if (wf[k] !== undefined) wf[ALIAS_WF[k]] = wf[k];
            });
            return wf;
        }
        return {
            "Climate Change": 0.2106,              "Ozone Depletion": 0.0631,
            "Human Toxicity, cancer": 0.0213,       "Human Toxicity, non-cancer": 0.0184,
            "Particulate Matter": 0.0896,            "Ionizing Radiation": 0.0501,
            "Photochemical Ozone Formation": 0.0478, "Acidification": 0.0620,
            "Eutrophication, terrestrial": 0.0371,   "Eutrophication, freshwater": 0.0280,
            "Eutrophication, marine": 0.0296,         "Ecotoxicity, freshwater": 0.0192,
            "Land Use": 0.0794, "Water Use/Scarcity (AWARE)": 0.0851,
            "Resource Use, minerals/metals": 0.0755,  "Resource Use, fossils": 0.0832
        };
    })();

    // --- Compute score ---
    var weightedScore = 0;
    var normalizedScore = 0;
    var singleScoreBreakdown = {};
    var safeWeight = (typeof productWeightKg === 'number' && productWeightKg > 0) ? productWeightKg : 0.2;

    Object.keys(pefResults).forEach(function(category) {
        var impact      = pefResults[category].total || 0;
        var perKg       = impact / safeWeight;
        var normFactor  = pefNF[category] || 0;
        var weightFactor= pefWF[category] || 0;
        var normalized  = perKg * normFactor;
        var weighted    = normalized * weightFactor;
        weightedScore  += weighted;
        normalizedScore += normalized;
        singleScoreBreakdown[category] = {
            raw: perKg, normalized: normalized, weighted: weighted,
            normalizationFactor: normFactor, weightingFactor: weightFactor,
            unit: (pefCategories[category] && pefCategories[category].unit) || ''
        };
    });

    // ADEME organic bonus (prorated by mass fraction of organic ingredients)
    var organicMass = 0, totalIngredientMass = 0;
    if (window.selectedIngredients && window.selectedIngredients.length > 0) {
        window.selectedIngredients.forEach(function(i) {
            totalIngredientMass += i.quantity;
            if (i.primaryData && i.primaryData.farmingPractice === 'organic') organicMass += i.quantity;
        });
    }
    var organicRatio  = totalIngredientMass > 0 ? (organicMass / totalIngredientMass) : 0;
    var organicBonus  = 15.0 * organicRatio;
    var finalMicroPoints = Math.max(0, (weightedScore * 1000000) - organicBonus);

    return {
        singleScore:          finalMicroPoints,
        normalizedScore:      normalizedScore,
        weightedScore:        weightedScore,
        breakdown:            singleScoreBreakdown,
        unit:                 'µPt',
        organic_bonus_applied: organicRatio > 0,
        organic_ratio:         organicRatio
    };
}

// ── 5. applyTemporalDiscounting ───────────────────────────────────────────────
// Called by ui.js displayTemporalDiscounting(). PEF 3.1 compliant — returns
// un-discounted results (no financial discount rates on physical flows).
function applyTemporalDiscounting(pefResults, timeHorizon) {
    var horizon = timeHorizon || 100;
    var compliantResults = {};
    Object.keys(pefResults).forEach(function(category) {
        var baseImpact = pefResults[category].total || 0;
        compliantResults[category] = {
            base_impact: baseImpact, discounted_impact: baseImpact,
            discount_rate: 0.0, time_horizon: horizon,
            present_value_equivalent: baseImpact, dynamic_factor: 1.0,
            note: "Standard GWP100 (No discounting applied per PEF 3.1)"
        };
    });
    return compliantResults;
}

// ── 6. getUnifiedMetrics ──────────────────────────────────────────────────────
// Called by ui.js. Derives consistent per-kg values from pefResults + massData.
function getUnifiedMetrics(pefResults, massData) {
    var validWeight = 0.2;
    if (massData && massData.final_content_weight_kg > 0) {
        validWeight = massData.final_content_weight_kg;
    } else {
        var el = document.getElementById('productWeight');
        var inputVal = el ? parseFloat(el.value) : NaN;
        if (!isNaN(inputVal) && inputVal > 0) validWeight = inputVal;
    }
    var s = function(key) { return (pefResults && pefResults[key]) ? (pefResults[key].total || 0) : 0; };
    return {
        weightUsed:  validWeight,
        co2PerKg:    s("Climate Change")               / validWeight,
        waterPerKg:  s("Water Use/Scarcity (AWARE)")   / validWeight,
        landPerKg:   s("Land Use")                     / validWeight,
        fossilPerKg: s("Resource Use, fossils")        / validWeight
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
    if (issues.length)   { console.error("❌ CRITICAL:");  issues.forEach(i => console.error(i)); }
    if (warnings.length) { console.warn("⚠️ WARNINGS:");   warnings.forEach(w => console.warn(w)); }
    if (successes.length){ console.log("✅ OK:");          successes.forEach(s => console.log(s)); }
    console.groupEnd();
    return { hasCriticalIssues: issues.length > 0, hasWarnings: warnings.length > 0, issues, warnings, successes,
             overallStatus: issues.length > 0 ? "CRITICAL" : warnings.length > 0 ? "WARNING" : "HEALTHY" };
}

// ================== TROUBLESHOOTING HELPER ==================
function debugCurrentState() {
    console.group("🐛 Current Application State");
    console.log("📦 Ingredients:", { count: selectedIngredients.length, items: selectedIngredients.map(i => `${i.name}: ${i.quantity}kg`) });
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
    calculateFoodImpact: function() {
        const db          = window.aioxyData;
        const ingredients = window.selectedIngredients;

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return { finalPefResults:{}, co2PerKg:0, waterScarcityPerKg:0, landUsePerKg:0, fossilPerKg:0,
                     overallDQR:5, comparison:{ baseline:{co2PerKg:0,waterPerKg:0}, co2SavedPerKg:0 }, auditTrail:{} };
        }

        const productWeight     = parseFloat(document.getElementById('productWeight').value) || 0.2;
        const mfgCountry        = document.getElementById('manufacturingCountry').value;
        const processingMethod  = document.getElementById('processingMethod').value;
        const transportDistance = parseFloat(document.getElementById('transportDistance').value) || 300;
        const transportMode     = document.getElementById('transportMode').value;
        const pkgMaterial       = document.getElementById('packagingMaterial').value;
        const pkgWeight         = parseFloat(document.getElementById('packagingWeight').value) || 0.050;
        const recycledPct       = parseFloat(document.getElementById('recycledContent').value) || 30;
        const productName       = document.getElementById('productName').value;

        var refrigeration = 'ambient';
        try { if (document.getElementById('refrigeratedTransport').value === 'yes') refrigeration = 'chilled'; } catch(e) {}

        // ── INGREDIENT LOOP ──────────────────────────────────────────────────
        var ingredientResults = [];
        for (var i = 0; i < ingredients.length; i++) {
            var item    = ingredients[i];
            var ingData = db.ingredients[item.id];
            if (!ingData) continue;
            // pef lives at ingData.data.pef — flatten for core_physics
            var flatIngData = { pef: ingData.data.pef, data: ingData.data, name: ingData.name };
            var result = corePhysics.calculateIngredientImpact({
                ingredientData: flatIngData,
                quantityKg:     item.quantity,
                includesEnteric:false,
                entericParams:  null
            });
            result.name       = ingData.name;
            result.id         = item.id;
            result.quantityKg = item.quantity;
            ingredientResults.push(result);
        }

        // ── GRID INTENSITY FIX ───────────────────────────────────────────────
        // db.grid_intensity stores plain numbers: { "FR": 41.4, "DE": 329.6, ... }
        // NOT objects. Accessing .electricityCO2 on a number returns undefined.
        // core_physics.calculateManufacturing requires gridIntensityGPerKwh to be a number.
        var gridIntensityValue;
        if (db.grid_intensity && typeof db.grid_intensity[mfgCountry] === 'number') {
            gridIntensityValue = db.grid_intensity[mfgCountry];
        } else if (db.countries && db.countries[mfgCountry] && typeof db.countries[mfgCountry].electricityCO2 === 'number') {
            gridIntensityValue = db.countries[mfgCountry].electricityCO2;
        } else {
            gridIntensityValue = (db.grid_intensity && typeof db.grid_intensity['Global'] === 'number')
                ? db.grid_intensity['Global'] : 480;
            console.warn('[AIOXY] Grid intensity not found for "' + mfgCountry + '". Fallback: ' + gridIntensityValue + ' g/kWh');
        }

        // ── PROCESSING BENCHMARK FIX ─────────────────────────────────────────
        // db.processBenchmarks does NOT exist. The correct key is db.processing[X].kwh_per_kg
        var benchmark = (db.processing && db.processing[processingMethod] &&
                         typeof db.processing[processingMethod].kwh_per_kg === 'number')
            ? db.processing[processingMethod].kwh_per_kg
            : 0.08;

        // ── MANUFACTURING ────────────────────────────────────────────────────
        var mfgResult = corePhysics.calculateManufacturing({
            massOutputKg:         productWeight,
            benchmarkKwhPerKg:    benchmark,
            gridIntensityGPerKwh: gridIntensityValue   // always a number now
        });

        // ── TRANSPORT ────────────────────────────────────────────────────────
        var transportResult = corePhysics.calculateTransport({
            massKg:        productWeight + pkgWeight,
            distanceKm:    transportDistance,
            mode:          transportMode,
            refrigeration: refrigeration
        });

        // ── PACKAGING ────────────────────────────────────────────────────────
        var pkgData = db.packaging[pkgMaterial];
        var packagingResult = { totalImpact: 0, fossilImpact: 0, biogenicImpact: 0 };
        if (pkgData) {
            packagingResult = corePhysics.calculatePackaging({
                weightKg:      pkgWeight,
                ev:            pkgData.co2_virgin,
                erecycled:     pkgData.co2_recycled,
                ed:            pkgData.co2_disposal || pkgData.co2_disposal_average || 0.05,
                r1:            recycledPct / 100,
                r2:            (pkgData.r1_max || 0.8) * (pkgData.r2 || 0.7),
                aFactor:       pkgData.aFactor || 0.5,
                qs:            pkgData.q || 0.9,
                qp:            1.0,
                fossilFraction: pkgData.fossilFraction || 1.0
            });
        }

        // ── AGGREGATE PEF ────────────────────────────────────────────────────
        var pefResults = corePhysics.aggregateResults({
            ingredientResults:   ingredientResults,
            manufacturingResult: mfgResult,
            transportResult:     transportResult,
            packagingResult:     packagingResult
        });

        // ── DQR ──────────────────────────────────────────────────────────────
        var dqrComponents = ingredientResults.map(function(ing) {
            return { name: ing.name, dqr: 2.0, contribution: ing.totalCO2 };
        });

        // Guard: calculateWeightedDQR throws if totalWeight === 0
        var weightedDQR;
        var totalContrib = dqrComponents.reduce(function(s, c) { return s + c.contribution; }, 0);
        if (totalContrib > 0) {
            weightedDQR = complianceEngine.calculateWeightedDQR(dqrComponents);
        } else {
            weightedDQR = { overallDQR: 2.5, qualityLevel: 'GOOD' };
        }

        // ── DNM ──────────────────────────────────────────────────────────────
        var dnmResult = complianceEngine.evaluateDNM(
            dqrComponents.map(function(d) {
                return { name: d.name, impact: d.contribution, dqr: d.dqr, isUnderOperationalControl: false };
            }),
            Math.max(pefResults['Climate Change'].total, 0.0001)
        );

        // ── AUDIT TRAIL ──────────────────────────────────────────────────────
        // export_engine v3 requires criticalReview — throws ValidationError without it
        var auditTrail = exportEngine.generateAuditTrail({
            physicsResults: {
                pefResults:  pefResults,
                ingredients: ingredientResults,
                packaging:   packagingResult
            },
            complianceResults: {
                overallDQR:   weightedDQR.overallDQR,
                qualityLevel: weightedDQR.qualityLevel,
                dnm:          dnmResult
            },
            metadata: {
                productName:      productName,
                functionalUnitKg: productWeight
            },
            // REQUIRED — must be truthy or export_engine throws ValidationError
            criticalReview: {
                status:   'INTERNAL',
                reviewer: 'AIOXY-AUTO',
                note:     'Internal calculation — external critical review required for regulatory submission'
            }
        });

        // ── WRITE GLOBALS ────────────────────────────────────────────────────
        window.finalPefResults = pefResults;
        window.auditTrailData  = auditTrail;
        window.massBalanceData = {
            final_content_weight_kg: productWeight,
            inputMass:   productWeight, productMass: productWeight,
            evaporation: 0, packaging_weight_kg: pkgWeight, final_output_kg: productWeight
        };

        var totalCo2 = pefResults['Climate Change'].total;
        var baseline = window.currentComparisonBaseline || {
            name: 'Baseline', co2PerKg: totalCo2 / productWeight, waterPerKg: 0
        };

        return {
            finalPefResults:    pefResults,
            co2PerKg:           totalCo2 / productWeight,
            waterScarcityPerKg: (pefResults['Water Use/Scarcity (AWARE)'].total || 0) / productWeight,
            landUsePerKg:       (pefResults['Land Use'].total || 0) / productWeight,
            fossilPerKg:        (pefResults['Resource Use, fossils'].total || 0) / productWeight,
            overallDQR:         weightedDQR.overallDQR,
            overallUncertainty: 15,
            comparison: {
                baseline:       baseline,
                co2SavedPerKg:  baseline.co2PerKg - (totalCo2 / productWeight),
                uplift_applied: { co2: 0 }
            },
            auditTrail:        auditTrail,
            compliance_status: dnmResult.compliant ? 'COMPLIANT' : 'WARNING',
            dppId:             auditTrail.dppId
        };
    },

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

// ================== ENHANCED CALCULATION ENGINE ==================
function calculateImpactEnhanced() {
    if (selectedIngredients.length === 0) { clearResults(); return; }

    const loadingElement = document.getElementById('loadingResults');
    const resultsContent = document.getElementById('resultsContent');
    if (loadingElement) loadingElement.classList.remove('hidden');
    if (resultsContent)  resultsContent.classList.add('hidden');

    setTimeout(() => {
        try {
            const finalResults = foodCalculationEngine.calculateFoodImpact();
            updateResultsUI(finalResults);

            localStorage.setItem('aioxy_pitch_state', JSON.stringify({
                ingredients:           selectedIngredients,
                productName:           document.getElementById('productName')?.value,
                volume:                currentAnnualVolume,
                manufacturingCountry:  document.getElementById('manufacturingCountry')?.value,
                processingMethod:      document.getElementById('processingMethod')?.value,
                transportMode:         document.getElementById('transportMode')?.value,
                transportDistance:     document.getElementById('transportDistance')?.value,
                packagingMaterial:     document.getElementById('packagingMaterial')?.value,
                energySource:          document.getElementById('energySource')?.value,
                usePrimaryFactoryData: document.getElementById('usePrimaryFactoryData')?.checked,
                factoryTotalKWh:       document.getElementById('factoryTotalKWh')?.value,
                factoryTotalOutput:    document.getElementById('factoryTotalOutput')?.value,
                recycledContent:       document.getElementById('recycledContent')?.value,
                packagingEoL:          document.getElementById('packagingEoL')?.value,
                crisisRoutingToggle:   document.getElementById('crisisRoutingToggle')?.checked,
                timestamp:             Date.now()
            }));

            // Only call updateBusinessCase if business-case.js has loaded it
            const businessTab = document.getElementById('business-case-tab');
            if (businessTab && !businessTab.classList.contains('hidden')) {
                if (typeof updateBusinessCase === 'function') updateBusinessCase();
            }

        } catch (error) {
            console.error('💥 Calculation error:', error);
            alert('Calculation error: ' + error.message);
        } finally {
            if (loadingElement) loadingElement.classList.add('hidden');
            if (resultsContent)  resultsContent.classList.remove('hidden');
        }
    }, 100);
}

function calculateImpact() { calculateImpactEnhanced(); }

// ================== WORKFLOW: START NEW AUDIT ==================
function startNewAudit() {
    if (!confirm("Are you sure you want to start a new audit? This will clear all current data.")) return;
    localStorage.removeItem('aioxy_pitch_state');
    selectedIngredients = []; currentDPPId = null; finalPefResults = {}; massBalanceData = {}; auditTrailData = {};

    const fields = [
        {id:'productName',val:'New Product'},{id:'productWeight',val:'0.200'},
        {id:'proteinContent',val:''},{id:'customBaseline',val:''}
    ];
    fields.forEach(f => { const el=document.getElementById(f.id); if(el) el.value=f.val; });

    const selects = [
        {id:'productCategory',val:'auto'},{id:'comparisonBaseline',val:'auto'},
        {id:'manufacturingCountry',val:'FR'},{id:'processingMethod',val:'none'},
        {id:'transportMode',val:'road'},{id:'transportDistance',val:'300'},
        {id:'packagingMaterial',val:'cardboard'},{id:'energySource',val:'grid'},
        {id:'packagingEoL',val:'eu_average'}
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

        if (window.aioxyData.yield_benchmarks && window.aioxyData.grid_intensity) {
            console.log('✅ Universal Physics Engine Ready:', {
                crops:         Object.keys(window.aioxyData.yield_benchmarks).length,
                countries:     Object.keys(window.aioxyData.grid_intensity).length,
                aware_factors: Object.keys(window.aioxyData.aware_factors).length
            });
        } else {
            console.warn('⚠️ Universal physics data not found. Using legacy mode.');
            if (window.aioxyData.ingredients) {
                const w = document.createElement('div');
                w.style.cssText = 'background:#FFF3E0;padding:0.75rem;margin:0.5rem 0;border-radius:6px;border-left:4px solid #FF9800';
                w.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:#FF9800"></i> <strong>Universal Physics Data Missing</strong><br><small>Using legacy calculations. Ensure ingredients.js includes yield_benchmarks, grid_intensity, aware_factors.</small>';
                const fc = document.querySelector('.card');
                if (fc) fc.parentNode.insertBefore(w, fc);
            }
        }

        console.log('   Available ingredients:', Object.keys(window.aioxyData.ingredients).length);
        populateIngredientSelect();
        populateCountrySelect();
        setupIngredientSearch();
        setupBaselineSearch();
        setupDemoData();
        updateTabIndicator();

        try {
            const savedState = localStorage.getItem('aioxy_pitch_state');
            if (savedState) {
                const p = JSON.parse(savedState);
                if (Date.now() - p.timestamp < 43200000) {
                    selectedIngredients = p.ingredients || [];
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
                    if (p.factoryTotalKWh)    document.getElementById('factoryTotalKWh').value    = p.factoryTotalKWh;
                    if (p.factoryTotalOutput) document.getElementById('factoryTotalOutput').value  = p.factoryTotalOutput;
                    if (p.recycledContent)    document.getElementById('recycledContent').value     = p.recycledContent;
                    if (p.packagingEoL)       document.getElementById('packagingEoL').value        = p.packagingEoL;
                    if (p.crisisRoutingToggle !== undefined) {
                        const ct = document.getElementById('crisisRoutingToggle');
                        if (ct) ct.checked = p.crisisRoutingToggle;
                    }
                    updateIngredientList();
                    console.log('✅ Recovered previous pitch state');
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

// ================== MAIN.JS LOADED ==================
console.log("✅ [AIOXY] main.js loaded - Global state ready");
