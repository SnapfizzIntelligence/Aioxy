
// ================== AIOXY MAIN CONTROLLER v3.0 ==================
// Global State, Initialization, and Core Application Flow
// ===================================================================

// ================== GLOBAL VARIABLES ==================
var selectedIngredients = [];
var conventionalBaselineIngredients = []; // Conventional baseline recipe (full recipe swap)
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

// ── 1. PHYSICS_CONSTANTS — AR5 values, consistent with core_physics ──────
// AR6 GWP values (ch4: 27.9) removed. Use core_physics IPCC_AR5_PEF31
// constants directly. Only equivalency-display constants retained here.
var PHYSICS_CONSTANTS = {
    TREE_ABSORPTION_KG_YEAR:  22.0,
    CAR_EMISSIONS_KG_PER_KM:  0.150,
    HOUSEHOLD_ELEC_KG_DAY:    2.58,
    WATER_BOTTLE_LITERS:      0.5,
    SHADOW_PRICE_EUR_TON:     85.0
    // gwp block removed — use window.corePhysics.CONSTANTS.IPCC_AR5_PEF31
};

// ── 2. pefCategories — unit labels and icons used by ui.js ──────────────
// Unchanged: ui.js reads pefCategories[category].unit for display labels.
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

// ── 3. ANCHOR_DATASETS — comparison baseline anchors, used by ui.js ─────
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

// ── 4. calculatePEFSingleScore — reads from window.auditTrailData ────────
// Shadow recalculation removed. This wrapper now reads the pre-computed
// result from auditTrailData so ui.js, audit-trail.js, and pdf-generator.js
// get a consistent number without recomputing.
function calculatePEFSingleScore(pefResults, productWeightKg) {
    // Primary path: return pre-computed result from the engine
    if (window.auditTrailData && window.auditTrailData.pef_single_score) {
        const ps = window.auditTrailData.pef_single_score;
        return {
            singleScore:            ps.singleScore        || 0,
            normalizedScore:        ps.normalizedScore    || 0,
            weightedScore:          ps.weightedScore      || 0,
            breakdown:              ps.breakdown          || {},
            unit:                   'µPt'
        };
    }
    // Fallback (first render before engine result is ready): return zeros
    return {
        singleScore: 0, normalizedScore: 0, weightedScore: 0,
        breakdown: {}, unit: 'µPt'
    };
}

// ── 6. getUnifiedMetrics — reads from engine output ──────────────────────
function getUnifiedMetrics(pefResults, massData) {
    const weightKg = (massData && massData.final_content_weight_kg) || 0.2;
    if (!pefResults || !pefResults['Climate Change']) {
        return { weightUsed: weightKg, co2PerKg: 0, waterScarcityPerKg: 0, landUsePerKg: 0, fossilPerKg: 0 };
    }
    return {
        weightUsed:          weightKg,
        co2PerKg:            (pefResults['Climate Change'].total                || 0) / weightKg,
        waterScarcityPerKg:  (pefResults['Water Use/Scarcity (AWARE)']?.total   || 0) / weightKg,
        landUsePerKg:        (pefResults['Land Use']?.total                     || 0) / weightKg,
        fossilPerKg:         (pefResults['Resource Use, fossils']?.total        || 0) / weightKg
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
// Only utility functions retained here — called by calculation_engine.js and ui.js.
// The legacy calculateFoodImpact() dual path has been removed (GAP 1 / ISO 14044 audit).
// The sole calculation entry point is calculateImpact() → window.calculationEngine.calculate().
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

// ================== ENHANCED CALCULATION ENGINE ==================
async function calculateImpact() {
    if (selectedIngredients.length === 0) { clearResults(); return; }

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
                totalKWh:      parseFloat(document.getElementById('factoryTotalKWh')?.value)    || 0,
                totalGasM3:    parseFloat(document.getElementById('factoryTotalGas')?.value)    || 0,
                totalOutputKg: parseFloat(document.getElementById('factoryTotalOutput')?.value) || 1
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
            material:         document.getElementById('packagingMaterial')?.value             || 'cardboard',
            weightKg:         parseFloat(document.getElementById('packagingWeight')?.value)   || 0.050,
            recycledPct:      parseFloat(document.getElementById('recycledContent')?.value)   || 30,
            eolDestination:   document.getElementById('packagingEoL')?.value                  || 'eu_average'
        },
        comparison: (() => {
            // FIX 1: Auto-match conventionalBaselineIngredients to selectedIngredients by index
            for (let i = 0; i < selectedIngredients.length; i++) {
                const ing = selectedIngredients[i];
                if (!ing.conventionalCounterpart && conventionalBaselineIngredients[i]) {
                    const cbi = conventionalBaselineIngredients[i];
                    ing.conventionalCounterpart = {
                        id:   cbi.id,
                        name: cbi.name,
                        pef:  window.aioxyData.ingredients[cbi.id]?.data?.pef || null
                    };
                    ing.conventionalQuantity = cbi.quantity || ing.quantity;
                }
            }
            return {
            baselineId:        document.getElementById('comparisonBaseline')?.value           || 'auto',
            customBaselineCO2: parseFloat(document.getElementById('customBaseline')?.value)   || null,
            useJRCBAT:         document.getElementById('useJRCBAT')?.checked                  || false,

            // PARAMETRIC TWIN: build ingredientMappings from selectedIngredients
            ingredientMappings: selectedIngredients
                .filter(ing => ing.conventionalCounterpart !== undefined && ing.conventionalCounterpart !== null)
                .map(ing => ({
                    assessed: {
                        id:            ing.id,
                        name:          ing.name,
                        quantityKg:    ing.quantity,
                        pef:           window.aioxyData.ingredients[ing.id].data.pef,
                        entericParams: ing.entericParams || null
                    },
                    conventional: {
                        id:            ing.conventionalCounterpart.id,
                        name:          ing.conventionalCounterpart.name,
                        quantityKg:    ing.conventionalQuantity || ing.quantity,
                        pef:           ing.conventionalCounterpart.pef,
                        entericParams: null
                    }
                }))
            };
        })()
    };

    try {
        // F7 FIX: await the async calculate() so the SHA-256 DPP ID is resolved
        // before updateResultsUI() runs. Previously missing await caused placeholder ID in UI.
        const result = await window.calculationEngine.calculate(input);

        // Write globals — SINGLE SOURCE OF TRUTH, no shadow assembly
        window.finalPefResults           = result.finalPefResults;
        window.massBalanceData           = result.massBalanceData;
        window.auditTrailData            = result.auditTrailData;
        window.currentComparisonBaseline = result.comparison.baseline;
        window.currentDPPId              = result.auditTrailData.dppId;

        // Persist session state for business-case tab
        try {
            localStorage.setItem('aioxy_pitch_state', JSON.stringify({
                ingredients:                     selectedIngredients,
                conventionalBaselineIngredients: conventionalBaselineIngredients,
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
        } catch(e) { /* localStorage may be unavailable in some environments */ }

        updateResultsUI(result);

        // Update business-case if visible
        const businessTab = document.getElementById('business-case-tab');
        if (businessTab && !businessTab.classList.contains('hidden')) {
            if (typeof updateBusinessCase === 'function') updateBusinessCase();
        }

        return result;

    } catch (error) {
        console.error('💥 Calculation error:', error);
        alert('Calculation error: ' + error.message);
        throw error;
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
    selectedIngredients = []; currentDPPId = null; finalPefResults = {}; massBalanceData = {}; auditTrailData = {}; currentComparisonBaseline = null;

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

        // F11 FIX: was window.aioxyData.yield_benchmarks which does not exist.
        // Crop yield data is stored under window.aioxyData.crop_yields (aioxy_pef31_database.js).
        // The false condition always triggered the legacy mode warning and injected a banner.
        if (window.aioxyData.crop_yields && window.aioxyData.grid_intensity) {
            console.log('✅ Universal Physics Engine Ready:', {
                crops:         Object.keys(window.aioxyData.crop_yields).length,
                countries:     Object.keys(window.aioxyData.grid_intensity).length,
                // F13 FIX: was window.aioxyData.aware_factors (does not exist).
                // AWARE 2.0 data is stored under window.aioxyData.aware_20.agricultural.
                aware_factors: Object.keys(window.aioxyData.aware_20?.agricultural || {}).length
            });
        } else {
            console.warn('⚠️ Universal physics data not found (crop_yields or grid_intensity missing). Using legacy mode.');
            if (window.aioxyData.ingredients) {
                const w = document.createElement('div');
                w.style.cssText = 'background:#FFF3E0;padding:0.75rem;margin:0.5rem 0;border-radius:6px;border-left:4px solid #FF9800';
                w.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:#FF9800"></i> <strong>Universal Physics Data Missing</strong><br><small>Using legacy calculations. Ensure ingredients.js includes crop_yields, grid_intensity, aware_20.</small>';
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
        setupDemoData();
        updateTabIndicator();

        try {
            const savedState = localStorage.getItem('aioxy_pitch_state');
            if (savedState) {
                const p = JSON.parse(savedState);
                if (Date.now() - p.timestamp < 43200000) {
                    selectedIngredients = p.ingredients || [];
                    if (p.conventionalBaselineIngredients && p.conventionalBaselineIngredients.length > 0) {
                        conventionalBaselineIngredients = p.conventionalBaselineIngredients;
                        window.conventionalBaselineIngredients = conventionalBaselineIngredients;
                        if (typeof updateConventionalIngredientList === 'function') updateConventionalIngredientList();
                        console.log('✅ [ConvBaseline] Restored ' + conventionalBaselineIngredients.length + ' conventional ingredients');
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
