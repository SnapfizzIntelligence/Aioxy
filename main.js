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
    renewables: false,      // Renewable Energy
    local: false,          // Local Sourcing
    lightweight: false,    // Lightweight Packaging
    regen_ag: false,       // Regenerative Agriculture
    no_waste: false,       // Zero Waste Manufacturing
    bulk: false,           // Bulk Shipping
    circular_pkg: false    // Circular Packaging
};

// Hydration suggestion state
let currentHydrationSuggestion = null;

// ================== FACTORY PRIMARY DATA TOGGLE ==================
function toggleFactoryInputs() {
    const isChecked = document.getElementById('usePrimaryFactoryData').checked;
    const inputs = document.getElementById('factoryDataInputs');
    if (isChecked) {
        inputs.classList.remove('hidden');
    } else {
        inputs.classList.add('hidden');
    }
}

// ================== LANGUAGE COMPLIANCE ENGINE ==================
function makeRegulatorSafe(text, isComparative = true) {
    if (!text || typeof text !== 'string') return text || '';
    
    const replacements = [
        // ABSOLUTE CLAIMS → MODELED/POTENTIAL CLAIMS
        {bad: /\bsaves\b/gi, good: 'shows potential reduction of'},
        {bad: /\bsaved\b/gi, good: 'indicates potential reduction of'},
        {bad: /\breduction of\b/gi, good: 'modeled reduction of'},
        {bad: /\breduces\b/gi, good: 'models reduction of'},
        {bad: /\bimproves\b/gi, good: 'shows improvement potential for'},
        
        // COMPARATIVE LANGUAGE → NEUTRAL LANGUAGE
        {bad: /\bbetter than\b/gi, good: 'lower impact than'},
        {bad: /\bbest\b/gi, good: 'improved'},
        {bad: /\bworst\b/gi, good: 'higher impact'},
        
        // GREENWASHING TERMS → NEUTRAL TERMS
        {bad: /\beco-friendly\b/gi, good: 'with reduced environmental footprint'},
        {bad: /\bgreen\b/gi, good: 'with improved environmental profile'},
        {bad: /\bsustainable\b/gi, good: 'with enhanced sustainability characteristics'},
        {bad: /\bnet zero\b/gi, good: 'reduced carbon footprint'},
        {bad: /\bclimate positive\b/gi, good: 'climate impact reduction'},
        {bad: /\bcarbon neutral\b/gi, good: 'carbon footprint management'},
        
        // CERTAINTY → UNCERTAINTY
        {bad: /\bwill save\b/gi, good: 'may reduce'},
        {bad: /\bguarantees\b/gi, good: 'suggests'},
        {bad: /\bensures\b/gi, good: 'supports'},
        
        // PERSONAL CLAIMS → GENERAL CLAIMS
        {bad: /\byou saved\b/gi, good: 'analysis suggests potential saving of'},
        {bad: /\byour impact\b/gi, good: 'the modeled impact'},
        {bad: /\byou reduced\b/gi, good: 'modeling indicates reduction of'},
        
        // SPECIFIC ENVIRONMENTAL TERMS
        {bad: /\bwater saved\b/gi, good: 'lower water scarcity impact'},
        {bad: /\bcarbon reduction\b/gi, good: 'modeled carbon impact reduction'},
        {bad: /\bfootprint reduction\b/gi, good: 'reduced environmental footprint'},
    ];
    
    let safeText = text;
    
    // Apply all replacements
    replacements.forEach(({bad, good}) => {
        safeText = safeText.replace(bad, good);
    });
    
    // Add uncertainty indicators for comparative claims
    if (isComparative) {
        // Add ~ before percentages (but not if already there)
        safeText = safeText.replace(/(\b)(\d+\.?\d*)%(?!~)/g, '$1~$2%');
        // Add "approximately" before kg amounts
        safeText = safeText.replace(/(\b)(\d+\.?\d*)\s*kg\s*CO₂e/gi, '$1approximately $2 kg CO₂e');
        safeText = safeText.replace(/(\b)(\d+\.?\d*)\s*kg/gi, '$1approximately $2 kg');
    }
    
    return safeText;
}

// Test function for debugging
window.testLanguageCompliance = function() {
    console.log('🔍 Testing Language Compliance Engine:');
    const tests = [
        'Saves 2.4 kg CO₂e',
        '80% better than beef',
        'Carbon reduction of 3.5 kg',
        'You saved 10 liters of water',
        'Eco-friendly product',
        'Net zero emissions',
        'Guaranteed footprint reduction'
    ];
    
    tests.forEach(test => {
        console.log(`Original: "${test}"`);
        console.log(`Fixed:    "${makeRegulatorSafe(test)}"`);
        console.log('---');
    });
};

// ================== DATA INTEGRITY VALIDATION ==================
function validateDataIntegrity() {
    console.log("🔍 [Data Integrity Check] Starting validation...");
    
    const issues = [];
    const warnings = [];
    const successes = [];
    
    // 1. Check ingredient database
    if (!aioxyData) {
        issues.push("❌ CRITICAL: aioxyData object not found");
    } else if (!aioxyData.ingredients) {
        issues.push("❌ CRITICAL: ingredients database missing");
    } else if (Object.keys(aioxyData.ingredients).length === 0) {
        warnings.push("⚠️ WARNING: Ingredients database is empty");
    } else {
        successes.push("✅ Ingredients database: " + Object.keys(aioxyData.ingredients).length + " items");
    }
    
    // 2. Check processing data
    if (aioxyData && aioxyData.processing && Object.keys(aioxyData.processing).length > 0) {
        successes.push("✅ Processing methods: " + Object.keys(aioxyData.processing).length + " methods");
    } else {
        warnings.push("⚠️ WARNING: Processing data limited or missing");
    }
    
    // 3. Check packaging data
    if (aioxyData && aioxyData.packaging && Object.keys(aioxyData.packaging).length > 0) {
        successes.push("✅ Packaging materials: " + Object.keys(aioxyData.packaging).length + " materials");
    } else {
        warnings.push("⚠️ WARNING: Packaging data limited or missing");
    }
    
    // 4. Check calculation results
    if (finalPefResults && Object.keys(finalPefResults).length > 0) {
        successes.push("✅ Calculation results: " + Object.keys(finalPefResults).length + " categories");
        
        // Check specific key categories
        const requiredCategories = ["Climate Change", "Water Use/Scarcity (AWARE)", "Land Use"];
        requiredCategories.forEach(cat => {
            if (finalPefResults[cat]) {
                successes.push(`✅ ${cat}: ${finalPefResults[cat].total?.toFixed(3) || 0} ${finalPefResults[cat].unit}`);
            } else {
                warnings.push(`⚠️ ${cat}: Missing from results`);
            }
        });
    } else {
        warnings.push("⚠️ WARNING: No calculation results yet");
    }
    
    // 5. Check comparison baseline
    if (currentComparisonBaseline) {
        successes.push(`✅ Comparison baseline: ${currentComparisonBaseline.name}`);
    } else {
        warnings.push("⚠️ WARNING: No comparison baseline set");
    }
    
    // 6. Check active scenarios
    const activeScenarioCount = Object.values(activeScenarios).filter(v => v).length;
    if (activeScenarioCount > 0) {
        successes.push(`✅ Active scenarios: ${activeScenarioCount} applied`);
    }
    
    // Log results
    console.group("📊 Data Integrity Report");
    
    if (issues.length > 0) {
        console.error("❌ CRITICAL ISSUES:");
        issues.forEach(issue => console.error(issue));
    }
    
    if (warnings.length > 0) {
        console.warn("⚠️ WARNINGS:");
        warnings.forEach(warning => console.warn(warning));
    }
    
    if (successes.length > 0) {
        console.log("✅ SUCCESSES:");
        successes.forEach(success => console.log(success));
    }
    
    console.groupEnd();
    
    // Return summary
    return {
        hasCriticalIssues: issues.length > 0,
        hasWarnings: warnings.length > 0,
        issues,
        warnings,
        successes,
        overallStatus: issues.length > 0 ? "CRITICAL" : warnings.length > 0 ? "WARNING" : "HEALTHY"
    };
}

// ================== TROUBLESHOOTING HELPER ==================
function debugCurrentState() {
    console.group("🐛 DEBUG: Current Application State");
    
    console.log("📦 Ingredients:", {
        count: selectedIngredients.length,
        items: selectedIngredients.map(i => `${i.name}: ${i.quantity}kg`)
    });
    
    console.log("📊 PEF Results:", {
        hasResults: !!finalPefResults,
        categoryCount: finalPefResults ? Object.keys(finalPefResults).length : 0,
        climateChange: finalPefResults?.["Climate Change"]?.total || 0,
        waterScarcity: finalPefResults?.["Water Use/Scarcity (AWARE)"]?.total || 0
    });
    
    console.log("💰 Business Data:", {
        comparisonBaseline: currentComparisonBaseline?.name,
        annualVolume: currentAnnualVolume,
        activeScenarios: Object.entries(activeScenarios).filter(([_, v]) => v).map(([k]) => k)
    });
    
    console.log("⚖️ Mass Balance:", massBalanceData || "Not calculated");
    
    console.groupEnd();
    
    // Run validation too
    validateDataIntegrity();
    
    return "Debug complete - check console";
}

// Make it available in console for debugging
window.debugAIOXY = debugCurrentState;

// ================== HYDRATION SUGGESTION FUNCTIONS ==================
function showHydrationSuggestion(suggestion, currentHydration) {
    currentHydrationSuggestion = suggestion;
    const card = document.getElementById('hydrationSuggestionCard');
    const message = document.getElementById('hydrationMessage');
    
    // FIX: Scope safety - use global window variable
    const targetHydration = window.currentPhysicsProfile ? window.currentPhysicsProfile.target_hydration : 0;

    if (card && message) {
        message.innerHTML = `
            <div style="background: #E3F2FD; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <i class="fas fa-flask"></i>
                <strong>Physics Engine Suggestion</strong><br>
                ${suggestion.message}<br>
                <strong>${suggestion.suggestion}</strong>
            </div>
            <div style="font-size: 0.9rem; color: var(--gray);">
                <i class="fas fa-info-circle"></i>
                Current: ${(currentHydration*100).toFixed(0)}% water • Target: ${(targetHydration*100).toFixed(0)}% water
            </div>
        `;
        card.classList.remove('hidden');
    }
} 

function applyHydrationSuggestion() {
    if (currentHydrationSuggestion) {
        window.userConfirmedHydration = true;
        window.confirmedHydrationKey = currentHydrationSuggestion.key;
        
        const card = document.getElementById('hydrationSuggestionCard');
        if (card) card.classList.add('hidden');
        
        calculateImpact(); // Recalculate with water
    }
}

function dismissHydrationSuggestion() {
    window.userConfirmedHydration = false;
    const card = document.getElementById('hydrationSuggestionCard');
    if (card) card.classList.add('hidden');
}


// ================== ENGINE BRIDGE (REPLACES OLD engine.js) ==================
window.foodCalculationEngine = {
    calculateFoodImpact: function () {
        // Build input from UI/global state
        const input = {
            ingredients: selectedIngredients,
            productName: document.getElementById('productName')?.value,
            volume: currentAnnualVolume
        };

        // 1. Run physics
        const physicsResults = corePhysics.calculateProduct(input);

        // 2. Run compliance
        const complianceResults = complianceEngine.runCompliance(physicsResults);

        // 3. Run audit/export
        const auditResults = exportEngine.generateAuditTrail(
            physicsResults,
            complianceResults,
            input
        );

        return {
            physicsResults,
            complianceResults,
            auditResults
        };
    }
};
                                 
// ================== ENHANCED CALCULATION ENGINE ==================
function calculateImpactEnhanced() {
    if (selectedIngredients.length === 0) {
        clearResults();
        return;
    }
    
    const loadingElement = document.getElementById('loadingResults');
    const resultsContent = document.getElementById('resultsContent');
    
    if (loadingElement) loadingElement.classList.remove('hidden');
    if (resultsContent) resultsContent.classList.add('hidden');

    setTimeout(() => {
        try {
            // 1. Calculate the STRICT, AUDITABLE baseline (No hypothetical scenarios allowed here)
            const finalResults = foodCalculationEngine.calculateFoodImpact();
            
            // 2. Feed the strict results to the UI and DPP generators
            updateResultsUI(finalResults);

            // 💾 PITCH-SAFE STATE PERSISTENCE (Full DOM capture)
            localStorage.setItem('aioxy_pitch_state', JSON.stringify({
                ingredients: selectedIngredients,
                productName: document.getElementById('productName')?.value,
                volume: currentAnnualVolume,
                manufacturingCountry: document.getElementById('manufacturingCountry')?.value,
                processingMethod: document.getElementById('processingMethod')?.value,
                transportMode: document.getElementById('transportMode')?.value,
                transportDistance: document.getElementById('transportDistance')?.value,
                packagingMaterial: document.getElementById('packagingMaterial')?.value,
                // 🛡️ FIX: Save all compliance toggles
                energySource: document.getElementById('energySource')?.value,
                usePrimaryFactoryData: document.getElementById('usePrimaryFactoryData')?.checked,
                factoryTotalKWh: document.getElementById('factoryTotalKWh')?.value,
                factoryTotalOutput: document.getElementById('factoryTotalOutput')?.value,
                recycledContent: document.getElementById('recycledContent')?.value,
                packagingEoL: document.getElementById('packagingEoL')?.value,
                crisisRoutingToggle: document.getElementById('crisisRoutingToggle')?.checked,
                timestamp: Date.now()
            }));

            // 3. Let the Business Case handle its own hypothetical scenario math internally
            const businessTab = document.getElementById('business-case-tab');
            if (businessTab && !businessTab.classList.contains('hidden')) {
                updateBusinessCase();
            }
            
        } catch (error) {
            console.error('💥 Calculation error:', error);
            alert('Calculation error: ' + error.message);
        } finally {
            if (loadingElement) loadingElement.classList.add('hidden');
            if (resultsContent) resultsContent.classList.remove('hidden');
        }
    }, 100);
}

function calculateImpact() {
    calculateImpactEnhanced();
}

// ================== WORKFLOW: START NEW AUDIT ==================
function startNewAudit() {
    const confirmReset = confirm("Are you sure you want to start a new audit? This will clear all current product data, ingredients, and settings.");
    if (!confirmReset) return;

    // 1. Purge the sticky state
    localStorage.removeItem('aioxy_pitch_state');
    
    // 2. Reset global variables
    selectedIngredients = [];
    currentDPPId = null;
    finalPefResults = {};
    massBalanceData = {};
    auditTrailData = {};
    
    // 3. Reset core UI inputs
    const pName = document.getElementById('productName');
    if(pName) pName.value = 'New Product';
    
    const pWeight = document.getElementById('productWeight');
    if(pWeight) pWeight.value = '0.200';
    
    const protein = document.getElementById('proteinContent');
    if(protein) protein.value = '';
    
    const customBase = document.getElementById('customBaseline');
    if(customBase) customBase.value = '';
    
    // 4. Reset dropdowns and toggles
    const selects = [
        {id: 'productCategory', val: 'auto'},
        {id: 'comparisonBaseline', val: 'auto'},
        {id: 'manufacturingCountry', val: 'FR'},
        {id: 'processingMethod', val: 'none'},
        {id: 'transportMode', val: 'road'},
        {id: 'transportDistance', val: '300'},
        {id: 'packagingMaterial', val: 'cardboard'},
        {id: 'energySource', val: 'grid'},
        {id: 'packagingEoL', val: 'eu_average'}
    ];
    
    selects.forEach(s => {
        const el = document.getElementById(s.id);
        if(el) el.value = s.val;
    });
    
    const primaryToggle = document.getElementById('usePrimaryFactoryData');
    if (primaryToggle) {
        primaryToggle.checked = false;
        if (typeof toggleFactoryInputs === 'function') toggleFactoryInputs();
    }
    
    const crisisToggle = document.getElementById('crisisRoutingToggle');
    if (crisisToggle) crisisToggle.checked = false;

    // 5. Clear the interface
    updateIngredientList();
    clearResults();
    resetScenarios();
    showTab('calculator');
    
    console.log('✅ [Workflow] System reset for new audit.');
}

// ================== SCENARIO TOGGLE (REGULATOR FIX: DECOUPLED FROM BASELINE) ==================
function toggleScenario(key) {
    activeScenarios[key] = !activeScenarios[key];
    
    const btn = document.getElementById(`scenario-${key}`);
    if (btn) btn.classList.toggle('active');
    
    // 🛡️ REGULATOR FIX: Do NOT call calculateImpact() here. 
    // Scenarios are hypotheticals for the Business Case only. They must not mutate the legal baseline.
    updateBusinessCase();
}

function resetScenarios() {
    activeScenarios = {
        renewables: false,
        local: false,
        lightweight: false,
        regen_ag: false,
        no_waste: false,
        bulk: false,
        circular_pkg: false
    };
    
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 🛡️ REGULATOR FIX: Only reset the business case, preserve the baseline
    updateBusinessCase();
}

// ================== VOLUME MANAGEMENT ==================
function setVolume(volume) {
    document.getElementById('salesVolume').value = volume;
    updateVolumeDisplay(volume);
    updateBusinessCase();
}

function updateVolumeDisplay(volume) {
    currentAnnualVolume = parseInt(volume);
    const display = document.getElementById('volumeDisplay');
    const scaleDisplay = document.getElementById('businessScaleDisplay');
    const tierDisplay = document.getElementById('volumeTierDisplay');
    
    if (!display || !scaleDisplay || !tierDisplay) return;

    if (volume >= 1000000) {
        display.textContent = (volume / 1000000).toFixed(volume >= 10000000 ? 0 : 1) + 'M';
    } else if (volume >= 1000) {
        display.textContent = (volume / 1000).toFixed(volume >= 10000 ? 0 : 1) + 'K';
    } else {
        display.textContent = volume.toLocaleString();
    }
    
    const businessCase = calculateScalableBusinessCase({ co2PerKg: 0 }, volume);
    scaleDisplay.textContent = businessCase.businessScale;
    tierDisplay.textContent = businessCase.volumeTier;
}

function calculateScalableBusinessCase(results, annualVolume) {
    const co2PerKg = results.co2PerKg || 0;
    const baselineCO2PerKg = currentComparisonBaseline ? currentComparisonBaseline.co2PerKg : co2PerKg; 
    const co2Reduction = Math.max(baselineCO2PerKg - co2PerKg, 0);
    const reductionPercentage = baselineCO2PerKg > 0 ? (co2Reduction / baselineCO2PerKg) * 100 : 0;
    
    if (annualVolume <= 1000) return { businessScale: "Prototype / Small Batch", volumeTier: "1-1K" };
    if (annualVolume <= 10000) return { businessScale: "Small Business", volumeTier: "1K-10K" };
    if (annualVolume <= 100000) return { businessScale: "Growing Business", volumeTier: "10K-100K" };
    if (annualVolume <= 1000000) return { businessScale: "Medium Enterprise", volumeTier: "100K-1M" };
    if (annualVolume <= 10000000) return { businessScale: "Large Enterprise", volumeTier: "1M-10M" };
    if (annualVolume <= 100000000) return { businessScale: "Major Corporation", volumeTier: "10M-100M" };
    return { businessScale: "Global Corporation", volumeTier: "100M-1B" };
}

// ================== INITIALIZE APPLICATION ==================
function initApp() {
    console.log('🚀 [AIOXY] Initializing application...');
    
    // WAIT for data to be ready
    const checkData = setInterval(() => {
        if (window.aioxyData && window.aioxyData.ingredients) {
            clearInterval(checkData);
            console.log('✅ [AIOXY] Data confirmed loaded. Proceeding...');
            proceedWithInitialization();
        } else {
            console.log('⏳ [AIOXY] Waiting for data...');
        }
    }, 100); // Check every 100ms
    
    // Timeout after 5 seconds
    setTimeout(() => {
        if (!window.aioxyData || !window.aioxyData.ingredients) {
            clearInterval(checkData);
            console.error('❌ [AIOXY] Data load timeout! Using fallback demo mode.');
            alert('Data loading timed out. Running in demo mode with limited data.');
            proceedWithInitialization(); // Continue anyway
        }
    }, 5000);
    
    function proceedWithInitialization() {
        console.log('📊 [AIOXY] Starting full initialization...');
        
        // ========== UNIVERSAL PHYSICS ENGINE CHECK ==========
        if (window.aioxyData.yield_benchmarks && window.aioxyData.grid_intensity) {
            console.log('✅ Universal Physics Engine Ready:', {
                crops: Object.keys(window.aioxyData.yield_benchmarks).length,
                countries: Object.keys(window.aioxyData.grid_intensity).length,
                aware_factors: Object.keys(window.aioxyData.aware_factors).length,
                climate_zones: {
                    tropical: window.aioxyData.climate_zones.tropical.length,
                    arid: window.aioxyData.climate_zones.arid.length,
                    boreal: window.aioxyData.climate_zones.boreal.length
                }
            });
        } else {
            console.warn('⚠️ Universal physics data not found. Using legacy mode.');
            // Show notification but continue
            if (window.aioxyData.ingredients) {
                const warningDiv = document.createElement('div');
                warningDiv.style.background = '#FFF3E0';
                warningDiv.style.padding = '0.75rem';
                warningDiv.style.margin = '0.5rem 0';
                warningDiv.style.borderRadius = '6px';
                warningDiv.style.borderLeft = '4px solid #FF9800';
                warningDiv.innerHTML = `
                    <i class="fas fa-exclamation-triangle" style="color: #FF9800;"></i>
                    <strong> Universal Physics Data Missing</strong><br>
                    <small>Using legacy calculations. Please ensure ingredients.js includes yield_benchmarks, grid_intensity, and aware_factors.</small>
                `;
                
                const firstCard = document.querySelector('.card');
                if (firstCard) {
                    firstCard.parentNode.insertBefore(warningDiv, firstCard);
                }
            }
        }
        // ========== END UNIVERSAL PHYSICS CHECK ==========
        
        // Now we can safely access the data
console.log('   Available ingredients:', Object.keys(window.aioxyData.ingredients).length);

// Populate dropdowns
populateIngredientSelect();
populateCountrySelect();
setupIngredientSearch();     
setupBaselineSearch();        
        
        // Set up demo data
        setupDemoData();
        
        // Initialize UI
        updateTabIndicator();

        // 💾 RECOVER PREVIOUS PITCH STATE
        try {
            const savedState = localStorage.getItem('aioxy_pitch_state');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                if (Date.now() - parsedState.timestamp < 43200000) {
                    selectedIngredients = parsedState.ingredients || [];
                    if (parsedState.productName) document.getElementById('productName').value = parsedState.productName;
                    if (parsedState.manufacturingCountry) document.getElementById('manufacturingCountry').value = parsedState.manufacturingCountry;
                    if (parsedState.processingMethod) document.getElementById('processingMethod').value = parsedState.processingMethod;
                    if (parsedState.transportMode) document.getElementById('transportMode').value = parsedState.transportMode;
                    if (parsedState.transportDistance) document.getElementById('transportDistance').value = parsedState.transportDistance;
                    if (parsedState.packagingMaterial) document.getElementById('packagingMaterial').value = parsedState.packagingMaterial;
                    if (parsedState.volume) setVolume(parsedState.volume);
                    
                    // 🛡️ FIX: Restore all compliance toggles
                    if (parsedState.energySource) document.getElementById('energySource').value = parsedState.energySource;
                    if (parsedState.usePrimaryFactoryData !== undefined) {
                        const primaryToggle = document.getElementById('usePrimaryFactoryData');
                        if (primaryToggle) {
                            primaryToggle.checked = parsedState.usePrimaryFactoryData;
                            if (typeof toggleFactoryInputs === 'function') toggleFactoryInputs();
                        }
                    }
                    if (parsedState.factoryTotalKWh) document.getElementById('factoryTotalKWh').value = parsedState.factoryTotalKWh;
                    if (parsedState.factoryTotalOutput) document.getElementById('factoryTotalOutput').value = parsedState.factoryTotalOutput;
                    if (parsedState.recycledContent) document.getElementById('recycledContent').value = parsedState.recycledContent;
                    if (parsedState.packagingEoL) document.getElementById('packagingEoL').value = parsedState.packagingEoL;
                    if (parsedState.crisisRoutingToggle !== undefined) {
                        const crisisToggle = document.getElementById('crisisRoutingToggle');
                        if (crisisToggle) crisisToggle.checked = parsedState.crisisRoutingToggle;
                    }
                    
                    updateIngredientList();
                    console.log('✅ Recovered full previous pitch state');
                }
            }
        } catch (e) {
            console.warn('Could not restore session state', e);
        }

        // Validate data
        validateDataIntegrity();
        
        console.log('✅ [AIOXY] Initialization complete!');
        
        // Force a calculation to test
        setTimeout(() => {
            console.log('🧪 [AIOXY] Running test calculation...');
            if (selectedIngredients.length > 0) {
                calculateImpact();
            }
        }, 500);
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// ================== MAIN.JS LOADED ==================
console.log("✅ [AIOXY] main.js loaded - Global state ready");
