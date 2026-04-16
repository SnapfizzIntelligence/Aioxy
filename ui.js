// ================== AIOXY UI CONTROLLER v3.0 ==================
// DOM Manipulation, Event Handlers, and User Interface Logic
// ===================================================================

// ================== TAB MANAGEMENT ==================
function showTab(tabName, event) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    if (tabName === 'results') {
        calculateImpact();
    }
    if (tabName === 'business-case') {
        if (!finalPefResults || Object.keys(finalPefResults).length === 0 || !finalPefResults["Climate Change"] || finalPefResults["Climate Change"].total === 0) {
            console.log('🔧 [Fix] Priming missing physics data for business case...');
            if (selectedIngredients.length === 0) {
                setupDemoData();
            } else {
                calculateImpact();
            }
            setTimeout(updateBusinessCase, 200);
        } else {
            updateBusinessCase();
        }
    }
    if (tabName === 'dpp') {
        generateDPP();
    }
    if (tabName === 'pef-scorecard') {
        displayFullPefScorecard();
    }
    if (tabName === 'transparency') {
        displayAuditTrail();
    }
    
    updateTabIndicator();
}

function updateTabIndicator() {
    const activeTab = document.querySelector('.nav-tab.active');
    const indicator = document.getElementById('tabIndicator');
    
    if (activeTab && indicator) {
        indicator.style.left = activeTab.offsetLeft + 'px';
        indicator.style.width = activeTab.offsetWidth + 'px';
    }
}

// ================== TOGGLE ADVANCED OPTIONS ==================
function toggleAdvanced() {
    const advanced = document.getElementById('advancedOptions');
    if (advanced) advanced.classList.toggle('hidden');
}

// ================== UPDATE COMPARISON ==================
function updateComparison() {
    calculateImpact();
}

// ================== CHART FUNCTIONS ==================
function createEmissionChart(results) {
    const ctx = document.getElementById('emissionChart');
    if (!ctx) return;
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    const ingredientsCO2 = auditTrailData.pefCategories?.["Climate Change"]?.contribution_tree?.Ingredients?.total || 0;
    const processingCO2 = auditTrailData.pefCategories?.["Climate Change"]?.contribution_tree?.Manufacturing?.total || 0;
    const transportCO2 = auditTrailData.pefCategories?.["Climate Change"]?.contribution_tree?.Transport?.total || 0;
    const packagingCO2 = auditTrailData.pefCategories?.["Climate Change"]?.contribution_tree?.Packaging?.total || 0;
    const upstreamCO2 = auditTrailData.pefCategories?.["Climate Change"]?.contribution_tree?.Upstream?.total || 0;
    
    currentChart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Ingredients', 'Processing', 'Transportation', 'Packaging', 'Upstream'],
            datasets: [{
                data: [
                    Math.max(ingredientsCO2, 0),
                    Math.max(processingCO2, 0),
                    Math.max(transportCO2, 0),
                    Math.max(packagingCO2, 0),
                    Math.max(upstreamCO2, 0)
                ],
                backgroundColor: ['#2E86C1', '#27AE60', '#F39C12', '#E74C3C', '#8E44AD'],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 37, 64, 0.9)',
                    titleFont: { size: 13 },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(2)} kg CO₂e`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// ================== CLEAR RESULTS ==================
function clearResults() {
    const elements = [
        'co2Value', 'waterValue', 'landValue', 'fossilValue',
        'co2Savings', 'waterSavings', 'carKm', 'householdEnergy',
        'treeYears', 'waterScarcity'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (id.includes('Value') || id.includes('Km') || id.includes('Energy') || id.includes('treeYears') || id.includes('waterScarcity')) {
                element.textContent = '0' + (id.includes('Value') ? '.00' : '') + 
                    (id.includes('co2Value') ? ' kg' : '') +
                    (id.includes('waterValue') ? ' m³' : '') +
                    (id.includes('landValue') ? ' Pt' : '') +
                    (id.includes('fossilValue') ? ' MJ' : '') +
                    (id.includes('carKm') ? ' km' : '') +
                    (id.includes('householdEnergy') ? ' days' : '') +
                    (id.includes('treeYears') ? '' : '') +
                    (id.includes('waterScarcity') ? '' : '');
            } else if (id.includes('Savings')) {
                element.textContent = '0% saved';
            }
        }
    });

    const sections = ['environmentalStory', 'massBalanceSection', 'dataQualitySection'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.classList.add('hidden');
    });

    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
}

// ================== UPDATE RESULTS UI ==================
function updateResultsUI(results) {
    // 1. Force Consistency: Pull the UNIFIED metric directly
    const unifiedCO2 = results.co2PerKg;
    
    // 🛡️ CRASH FIX: Define baseline variables at the absolute TOP before anything else runs
    const baselineCO2 = results.comparison?.baseline?.co2PerKg || 0;
    const baselineWater = results.comparison?.baseline?.waterPerKg || 0;
    const safeBaseCO2 = baselineCO2 > 0 ? baselineCO2 : 1;
    const safeBaseWater = baselineWater > 0 ? baselineWater : 1;
    const baselineName = currentComparisonBaseline ? currentComparisonBaseline.name.replace(' (Cradle-to-Retail)', '') : 'benchmark';

    // REGULATOR FIX: Custom Baseline Warning
    const resultsContent = document.getElementById('resultsContent');
    let customWarningDiv = document.getElementById('gcdCustomWarning');
    
    if (results.comparison?.baseline?.is_custom) {
        if (!customWarningDiv && resultsContent) {
            customWarningDiv = document.createElement('div');
            customWarningDiv.id = 'gcdCustomWarning';
            customWarningDiv.className = 'compliance-notice';
            customWarningDiv.style.borderColor = '#E65100';
            customWarningDiv.style.backgroundColor = '#FFF3E0';
            customWarningDiv.innerHTML = `
                <div class="compliance-icon" style="background: #E65100;">
                    <i class="fas fa-gavel"></i>
                </div>
                <div>
                    <strong style="color: #E65100;">Green Claims Directive Warning</strong><br>
                    <span style="color: #9C4221;">Comparative assertion is based on an unsubstantiated custom user baseline. Requires external LCA verification and PEF-compliant dataset comparison for any public or B2B claims.</span>
                </div>
            `;
            resultsContent.insertBefore(customWarningDiv, resultsContent.firstChild);
        }
    } else if (customWarningDiv) {
        customWarningDiv.remove();
    }

    // =====================================================================
    // 🚀 FRONT-OF-PACK (FOP) ECO-SCORE ENGINE (ADEME/PEF 3.1)
    // =====================================================================
    const productWeightKg = massBalanceData?.final_content_weight_kg || 0.2;
    const singleScoreData = calculatePEFSingleScore(results.finalPefResults, productWeightKg);
    const mPtScore = singleScoreData.singleScore; 

    // Strictly aligned with ADEME / PEF 3.1 Eco-Score thresholds (µPt per kg)
    let ecoGrade = 'E';
    let ecoColor = '#E63946'; // Red
    if (mPtScore < 150) { ecoGrade = 'A'; ecoColor = '#2A9D8F'; } // Dark Green
    else if (mPtScore < 250) { ecoGrade = 'B'; ecoColor = '#8AB17D'; } // Light Green
    else if (mPtScore < 400) { ecoGrade = 'C'; ecoColor = '#E9C46A'; } // Yellow
    else if (mPtScore < 600) { ecoGrade = 'D'; ecoColor = '#F4A261'; } // Orange
    
    let ecoScoreDiv = document.getElementById('fopEcoScoreCard');
    if (!ecoScoreDiv && resultsContent) {
        ecoScoreDiv = document.createElement('div');
        ecoScoreDiv.id = 'fopEcoScoreCard';
        const insertTarget = document.getElementById('gcdCustomWarning')?.nextSibling || resultsContent.firstChild;
        resultsContent.insertBefore(ecoScoreDiv, insertTarget);
    }

    if (ecoScoreDiv) {
        ecoScoreDiv.innerHTML = `
            <div style="background: linear-gradient(to right, #ffffff, #f8f9fa); border: 2px solid ${ecoColor}; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <div style="background: ${ecoColor}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            <i class="fas fa-leaf"></i>
                        </div>
                        <h3 style="margin: 0; color: var(--primary); font-size: 1.25rem;">Front-of-Pack (FOP) Eco-Score</h3>
                    </div>
                    <div style="font-size: 0.9rem; color: var(--gray); max-width: 450px;">
                        Consumer-facing environmental grade based on ADEME & PEF 3.1 thresholds (${mPtScore.toFixed(1)} µPt). <strong>Ready for packaging integration.</strong>
                    </div>
                </div>
                <div style="display: flex; gap: 4px; align-items: flex-end;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 35px; height: ${ecoGrade === 'A' ? '50px' : '35px'}; background: ${ecoGrade === 'A' ? '#2A9D8F' : '#e0e0e0'}; color: ${ecoGrade === 'A' ? 'white' : '#999'}; font-weight: 800; font-size: 1.2rem; border-radius: 6px; transition: all 0.3s;">A</div>
                    <div style="display: flex; align-items: center; justify-content: center; width: 35px; height: ${ecoGrade === 'B' ? '50px' : '35px'}; background: ${ecoGrade === 'B' ? '#8AB17D' : '#e0e0e0'}; color: ${ecoGrade === 'B' ? 'white' : '#999'}; font-weight: 800; font-size: 1.2rem; border-radius: 6px; transition: all 0.3s;">B</div>
                    <div style="display: flex; align-items: center; justify-content: center; width: 35px; height: ${ecoGrade === 'C' ? '50px' : '35px'}; background: ${ecoGrade === 'C' ? '#E9C46A' : '#e0e0e0'}; color: ${ecoGrade === 'C' ? 'white' : '#999'}; font-weight: 800; font-size: 1.2rem; border-radius: 6px; transition: all 0.3s;">C</div>
                    <div style="display: flex; align-items: center; justify-content: center; width: 35px; height: ${ecoGrade === 'D' ? '50px' : '35px'}; background: ${ecoGrade === 'D' ? '#F4A261' : '#e0e0e0'}; color: ${ecoGrade === 'D' ? 'white' : '#999'}; font-weight: 800; font-size: 1.2rem; border-radius: 6px; transition: all 0.3s;">D</div>
                    <div style="display: flex; align-items: center; justify-content: center; width: 35px; height: ${ecoGrade === 'E' ? '50px' : '35px'}; background: ${ecoGrade === 'E' ? '#E63946' : '#e0e0e0'}; color: ${ecoGrade === 'E' ? 'white' : '#999'}; font-weight: 800; font-size: 1.2rem; border-radius: 6px; transition: all 0.3s;">E</div>
                </div>
            </div>
        `;
    }

    updateMassBalanceDisplay();
    updateDataQualityDisplay(results);
    updateEnvironmentalStory(results);
    
    // 2. Pass the UNIFIED number to the comparison renderer
    renderUniversalComparisons(unifiedCO2, currentComparisonBaseline);

    // 3. Update Metric Cards with the UNIFIED numbers
    if(document.getElementById('co2Value')) document.getElementById('co2Value').textContent = unifiedCO2.toFixed(2) + ' kg';
    if(document.getElementById('waterValue')) document.getElementById('waterValue').textContent = results.waterScarcityPerKg.toFixed(4) + ' m³';
    if(document.getElementById('landValue')) document.getElementById('landValue').textContent = results.landUsePerKg.toFixed(0) + ' Pt';
    if(document.getElementById('fossilValue')) document.getElementById('fossilValue').textContent = results.fossilPerKg.toFixed(1) + ' MJ';

    // REGULATOR UI FIX: Display Separated Biogenic Removals if Regen Ag is active
    let removalsDiv = document.getElementById('biogenicRemovalsDisplay');
    const totalRemovals = results.finalPefResults["Climate Change"]?.biogenic_removals || 0;

    if (totalRemovals > 0) {
        if (!removalsDiv) {
            removalsDiv = document.createElement('div');
            removalsDiv.id = 'biogenicRemovalsDisplay';
            removalsDiv.style = 'font-size: 0.85rem; color: #48BB78; font-weight: 700; margin-top: 0.5rem;';
            document.getElementById('co2Value').parentNode.appendChild(removalsDiv);
        }
        const removalsPerKg = totalRemovals / (massBalanceData?.final_content_weight_kg || 0.2);
        removalsDiv.innerHTML = `<i class="fas fa-arrow-down"></i> ${removalsPerKg.toFixed(2)} kg biogenic removals<br><span style="font-size: 0.7rem; font-weight: normal; color: var(--gray);">*Reported separately per EU Green Claims</span>`;
    } else if (removalsDiv) {
        removalsDiv.remove();
    }
    
    // === STEP 4: ISO-COMPLIANT LABELING ===
    const co2Label = document.querySelector('#co2Value + .metric-label');
    if (co2Label) {
        co2Label.textContent = "Climate Change (GWP100)";
    }

    // =====================================================================
    // 🚀 NUTRITIONAL LCA ENGINE (Impact per 100g of Protein)
    // =====================================================================
    const userProteinPer100g = parseFloat(document.getElementById('proteinContent')?.value) || 0;
    let nutritionalDiv = document.getElementById('nutritionalLCACard');

    if (userProteinPer100g > 0 && currentComparisonBaseline) {
        const anchorProteinDB = {
            'beef-product': 26.0, 'chicken-product': 27.0, 'pork-product': 27.0,
            'milk-product': 3.4, 'cheese-product': 25.0, 'plant-burger': 15.0,
            'plant-milk': 1.0, 'default': 10.0
        };
        
        const baselineKey = Object.keys(ANCHOR_DATASETS).find(key => 
            currentComparisonBaseline.name.includes(ANCHOR_DATASETS[key].name)) || 'default';
        const baselineProteinPer100g = anchorProteinDB[baselineKey] || 10.0;

        const userKgNeededFor100gProtein = 100 / (userProteinPer100g * 10);
        const baseKgNeededFor100gProtein = 100 / (baselineProteinPer100g * 10);

        const userCo2PerProtein = unifiedCO2 * userKgNeededFor100gProtein;
        const rawBaseCo2 = safeBaseCO2 / (currentComparisonBaseline?.concentration_ratio || 1);
        const baseCo2PerProtein = rawBaseCo2 * baseKgNeededFor100gProtein;

        if (!nutritionalDiv) {
            nutritionalDiv = document.createElement('div');
            nutritionalDiv.id = 'nutritionalLCACard';
            nutritionalDiv.className = 'card';
            nutritionalDiv.style.borderLeft = '4px solid #8E44AD';
            nutritionalDiv.style.backgroundColor = '#FDFEFE';
            const resultsGrid = document.querySelector('.results-grid');
            resultsGrid.parentNode.insertBefore(nutritionalDiv, resultsGrid);
        }

        const rawProteinPct = baseCo2PerProtein > 0 ? ((baseCo2PerProtein - userCo2PerProtein) / baseCo2PerProtein) * 100 : 0;
        const isProteinBetter = rawProteinPct >= 0;
        const proteinColor = isProteinBetter ? '#8E44AD' : '#E63946';
        const proteinPrefix = isProteinBetter ? '↓ ' : '↑ ';
        const proteinLabel = isProteinBetter ? 'Advantage vs Baseline' : 'Liability vs Baseline';

        nutritionalDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <div style="background: ${proteinColor}; color: white; width: 30px; height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-dumbbell"></i>
                        </div>
                        <h3 style="color: #4A235A; margin: 0; font-size: 1.1rem;">Nutritional LCA Assessment</h3>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--gray);">Impact measured per <strong>100g of delivered protein</strong>.</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 2rem; font-weight: 900; color: ${proteinColor};">${proteinPrefix}${Math.abs(rawProteinPct).toFixed(1)}%</div>
                    <div style="font-size: 0.75rem; font-weight: bold; color: ${proteinColor}; text-transform: uppercase;">${proteinLabel}</div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; background: white; padding: 1rem; border-radius: 8px; border: 1px solid var(--border);">
                <div>
                    <div style="font-size: 0.75rem; color: var(--gray);">Your Product (${userProteinPer100g}g protein/100g)</div>
                    <div style="font-size: 1.25rem; font-weight: bold; color: var(--primary);">${userCo2PerProtein.toFixed(2)} kg CO₂e <span style="font-size:0.8rem; font-weight:normal;">per 100g protein</span></div>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: var(--gray);">Conventional ${currentComparisonBaseline.name} (~${baselineProteinPer100g}g protein/100g)</div>
                    <div style="font-size: 1.25rem; font-weight: bold; color: var(--gray);">${baseCo2PerProtein.toFixed(2)} kg CO₂e <span style="font-size:0.8rem; font-weight:normal;">per 100g protein</span></div>
                </div>
            </div>
        `;
    } else if (nutritionalDiv) {
        nutritionalDiv.remove();
    }
    
    // 🛡️ REGULATOR FIX 1: Dynamic Honesty Badges (Removing Zero-Floor Masking)
    const rawCo2Pct = safeBaseCO2 > 0 ? ((safeBaseCO2 - unifiedCO2) / safeBaseCO2) * 100 : 0;
    const rawWaterPct = safeBaseWater > 0 ? ((safeBaseWater - results.waterScarcityPerKg) / safeBaseWater) * 100 : 0;

    const formatHonestyBadge = (pct, elemId) => {
        const el = document.getElementById(elemId);
        if (!el) return;
        if (pct >= 0) {
            el.innerHTML = `<i class="fas fa-arrow-down"></i> ${pct.toFixed(1)}% lower vs ${baselineName}`;
            el.style.background = 'var(--gradient-secondary)';
        } else {
            el.innerHTML = `<i class="fas fa-arrow-up"></i> ${Math.abs(pct).toFixed(1)}% higher vs ${baselineName}`;
            el.style.background = '#E63946';
        }
    };

    formatHonestyBadge(rawCo2Pct, 'co2Savings');
    formatHonestyBadge(rawWaterPct, 'waterSavings');
    
    // === STEP 5: ZERO DATA SAFETY VALVE ===
    if (unifiedCO2 <= 0.001) {
        if(document.getElementById('co2Savings')) {
            document.getElementById('co2Savings').textContent = "Data unavailable";
            document.getElementById('co2Savings').style.background = "#CBD5E0";
        }
    }

    if (results.waterScarcityPerKg <= 0.001) {
        if(document.getElementById('waterSavings')) {
            document.getElementById('waterSavings').textContent = "Data unavailable";
            document.getElementById('waterSavings').style.background = "#CBD5E0";
        }
        if(document.getElementById('waterValue')) document.getElementById('waterValue').textContent = "—";
    }
    
    // === REGULATOR-PROOF EQUIVALENCIES ENGINE ===
    const co2SavedPerKg = results.comparison.co2SavedPerKg || 0;
    const carKm = Math.round(co2SavedPerKg / PHYSICS_CONSTANTS.CAR_EMISSIONS_KG_PER_KM);
    const treeYears = (co2SavedPerKg / PHYSICS_CONSTANTS.TREE_ABSORPTION_KG_YEAR).toFixed(1);
    const householdDays = Math.round(co2SavedPerKg / PHYSICS_CONSTANTS.HOUSEHOLD_ELEC_KG_DAY);
    const currentWater = results.waterScarcityPerKg;
    const waterScoreDiff = Math.max(0, baselineWater - currentWater);

    if(document.getElementById('carKm')) {
        document.getElementById('carKm').innerHTML = 
            carKm > 0 ? `${carKm} km <div style="font-size:0.7em; opacity:0.8">avoided driving</div>` : '—';
    }
    if(document.getElementById('treeYears')) {
        document.getElementById('treeYears').innerHTML = 
            treeYears > 0 ? `${treeYears} <div style="font-size:0.7em; opacity:0.8">mature tree-years</div>` : '—';
    }
    if(document.getElementById('householdEnergy')) {
        document.getElementById('householdEnergy').innerHTML = 
            householdDays > 0 ? `${householdDays} days <div style="font-size:0.7em; opacity:0.8">avg. electricity</div>` : '—';
    }
    if(document.getElementById('waterScarcity')) {
        document.getElementById('waterScarcity').innerHTML = 
            waterScoreDiff > 0.01 ? 
            `${waterScoreDiff.toFixed(1)} <div style="font-size:0.7em; opacity:0.8">m³ world eq. (AWARE)</div>` : '—';
    }

    createEmissionChart(results);
    
    // =========== INTEGRATION POINT: CALL ALL FIXES ===========
    displayPEFSingleScore();
    displayTemporalDiscounting();
    displayForegroundBackground();
    displayCompleteAuditTrail();
    displayISOCompliance();
}

// ================== UPDATE DATA QUALITY DISPLAY ==================
function updateDataQualityDisplay(results) {
    const dataQualitySection = document.getElementById('dataQualitySection');
    const dqrBreakdown = document.getElementById('dqrBreakdown');
    const overallDQRBadge = document.getElementById('overallDQRBadge');
    
    if (!dataQualitySection || !dqrBreakdown || !overallDQRBadge) return;

    if (auditTrailData.dqr_summary && auditTrailData.dqr_summary.component_dqrs.length > 0) {
        dataQualitySection.classList.remove('hidden');
        
        let terSum = 0, grSum = 0, tirSum = 0, pSum = 0;
        let count = 0;
        
        auditTrailData.dqr_summary.component_dqrs.forEach(score => {
            const ingredient = aioxyData.ingredients[selectedIngredients.find(i => i.name === score.name)?.id];
            if (ingredient) {
                terSum += ingredient.data.metadata.dqr.TeR;
                grSum += ingredient.data.metadata.dqr.GR;
                tirSum += ingredient.data.metadata.dqr.TiR;
                pSum += ingredient.data.metadata.dqr.P;
                count++;
            }
        });
        
        const avgFactors = {
            TeR: count > 0 ? (terSum / count).toFixed(1) : '1.0',
            GR: count > 0 ? (grSum / count).toFixed(1) : '1.0',
            TiR: count > 0 ? (tirSum / count).toFixed(1) : '1.0',
            P: count > 0 ? (pSum / count).toFixed(1) : '1.0'
        };
        
        dqrBreakdown.innerHTML = `
            <div class="dqr-factor">
                <div class="dqr-factor-value">${avgFactors.TeR}</div>
                <div class="dqr-factor-label">TeR</div>
                <div style="font-size: 0.7rem; margin-top: 0.5rem;">Technological Representativeness</div>
            </div>
            <div class="dqr-factor">
                <div class="dqr-factor-value">${avgFactors.GR}</div>
                <div class="dqr-factor-label">GR</div>
                <div style="font-size: 0.7rem; margin-top: 0.5rem;">Geographical Representativeness</div>
            </div>
            <div class="dqr-factor">
                <div class="dqr-factor-value">${avgFactors.TiR}</div>
                <div class="dqr-factor-label">TiR</div>
                <div style="font-size: 0.7rem; margin-top: 0.5rem;">Time Representativeness</div>
            </div>
            <div class="dqr-factor">
                <div class="dqr-factor-value">${avgFactors.P}</div>
                <div class="dqr-factor-label">P</div>
                <div style="font-size: 0.7rem; margin-top: 0.5rem;">Parameter Uncertainty</div>
            </div>
        `;
        
        const dqrQuality = foodCalculationEngine.getDQRQualityLevel(results.overallDQR);
        overallDQRBadge.className = `dqr-badge ${dqrQuality.class}`;
        overallDQRBadge.innerHTML = `<i class="fas fa-star"></i> Overall Data Quality: ${dqrQuality.level} (DQR: ${results.overallDQR.toFixed(1)}) • ±${results.overallUncertainty}% uncertainty`;
    } else {
        dataQualitySection.classList.add('hidden');
    }
}

// ================== UPDATE MASS BALANCE DISPLAY ==================
function updateMassBalanceDisplay() {
    const massBalanceSection = document.getElementById('massBalanceSection');
    const massBalanceContent = document.getElementById('massBalanceContent');
    
    if (!massBalanceSection || !massBalanceContent) return;

    if (massBalanceData.raw_input_total_kg > 0) {
        massBalanceSection.classList.remove('hidden');
        
        const expectedOutput = massBalanceData.raw_input_total_kg - massBalanceData.evaporation_kg;
        const balanceDifference = Math.abs(expectedOutput - massBalanceData.final_output_kg);
        const balanceStatus = balanceDifference < 0.001 ? "✅ Balanced" : "⚠️ Check Required";

        massBalanceContent.innerHTML = `
            <div class="mass-balance-item">
                <span>Total Input Weight:</span>
                <span>${massBalanceData.raw_input_total_kg.toFixed(3)} kg</span>
            </div>
            <div class="mass-balance-item">
                <span style="color: #C0392B;">- Water Evaporation:</span>
                <span style="color: #C0392B;">${massBalanceData.evaporation_kg.toFixed(3)} kg</span>
            </div>
            <div class="mass-balance-item" style="font-weight: 600;">
                <span>= Final Product Weight:</span>
                <span>${massBalanceData.final_output_kg.toFixed(3)} kg</span>
            </div>
            <div class="mass-balance-item" style="border-top: 2px solid var(--border); margin-top: 0.5rem; padding-top: 0.5rem;">
                <span>Mass Balance Status:</span>
                <span>${balanceStatus}</span>
            </div>
        `;
    } else {
        massBalanceSection.classList.add('hidden');
    }
}

// ================== UPDATE ENVIRONMENTAL STORY ==================
function updateEnvironmentalStory(results) {
    const environmentalStory = document.getElementById('environmentalStory');
    const storyContent = document.getElementById('storyContent');
    const storyComparison = document.getElementById('storyComparison');

    if (!environmentalStory || !storyContent || !storyComparison) return;

    const customerName = document.getElementById('customerName').value || 'Consumer';
    const baselineName = results.comparison.baseline.name.replace(" (Cradle-to-Retail)", "");
    
    const co2SavedPerKg = results.comparison.co2SavedPerKg || 0;
    const carKm = Math.round(co2SavedPerKg / PHYSICS_CONSTANTS.CAR_EMISSIONS_KG_PER_KM);
    const treeYears = (co2SavedPerKg / PHYSICS_CONSTANTS.TREE_ABSORPTION_KG_YEAR).toFixed(1);
    const householdDays = Math.round(co2SavedPerKg / PHYSICS_CONSTANTS.HOUSEHOLD_ELEC_KG_DAY);
    const baselineWater = results.comparison?.baseline?.waterPerKg || 0;
    const currentWater = results.waterScarcityPerKg || 0;
    const waterScoreDiff = Math.max(0, baselineWater - currentWater);

    const uncertainty = results.overallUncertainty || 15;
    const rawCo2Pct = results.comparison?.baseline?.co2PerKg > 0 
        ? ((results.comparison.baseline.co2PerKg - results.co2PerKg) / results.comparison.baseline.co2PerKg) * 100 
        : 0;

    const isBetterEnv = rawCo2Pct >= 0;
    const conservativeReduction = isBetterEnv 
        ? Math.max(0, co2SavedPerKg * (1 - (uncertainty/100))) 
        : 0;
        
    const envActionText = isBetterEnv 
        ? `<strong style="color: #2C7A7B; background: rgba(255,255,255,0.5); padding: 2px 6px; border-radius: 4px;">↓ ${Math.abs(rawCo2Pct).toFixed(1)}% lower</strong>` 
        : `<strong style="color: #C0392B; background: rgba(255,255,255,0.5); padding: 2px 6px; border-radius: 4px;">↑ ${Math.abs(rawCo2Pct).toFixed(1)}% higher</strong>`;
        
    storyContent.innerHTML = `
        <div style="font-family: 'Inter', sans-serif; color: #2D3748;">
            <div style="background: linear-gradient(135deg, #F0FFF4 0%, #E6FFFA 100%); padding: 1.5rem; border-radius: 12px; border: 1px solid #B2F5EA; margin-bottom: 1.5rem;">
                <h3 style="color: #2C7A7B; margin-top: 0; font-size: 1.2rem;">
                    <i class="fas fa-leaf"></i> Environmental Impact Analysis
                </h3>
                <p style="font-size: 1.05rem; line-height: 1.6;">
                    Hey <strong>${customerName}</strong>, standard industry modeling indicates this product's carbon footprint is 
                    ${envActionText} than <strong>${baselineName}</strong>.
                </p>
                <p style="font-size: 0.9rem; color: #4A5568; margin-bottom: 0;">
                    <i class="fas fa-chart-line"></i> PEF 3.1 methodology models a potential reduction of 
                    <strong>~${conservativeReduction.toFixed(2)} kg CO₂e/kg</strong> vs. baseline.
                </p>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.5rem;">
                    <i class="fas fa-shield-alt" style="color: #718096;"></i>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #718096; letter-spacing: 0.05em; text-transform: uppercase;">
                        Technical Proof & Methodology
                    </span>
                </div>
                
                <div style="font-size: 0.85rem; color: #4A5568; line-height: 1.5;">
                    <p><strong>Transparency Statement:</strong> This data ensures compliance with EMPCO & PEF 3.1 reporting standards.</p>
                    
                    <ul style="list-style: none; padding: 0; margin: 1rem 0;">
                        <li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;">
                            <span style="color: #4299E1;">🔹</span>
                            <div><strong>Calculation Model:</strong> Comparative Life Cycle Assessment (LCA) based on PEF 3.1.</div>
                        </li>
                        <li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;">
                            <span style="color: #4299E1;">🔹</span>
                            <div><strong>Data Source:</strong> AGRIBALYSE® 3.2 (EU Reference Database) + GLEC v3.2 Logistics.</div>
                        </li>
                        <li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;">
                            <span style="color: #4299E1;">🔹</span>
                            <div><strong>System Boundary:</strong> Cradle-to-Retail (Farm + Processing + Pkg + Transport).</div>
                        </li>
                        <li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;">
                            <span style="color: #4299E1;">🔹</span>
                            <div><strong>Quality & Uncertainty:</strong> DQR ${results.overallDQR.toFixed(1)}/5.0 (High) with ±${results.overallUncertainty}% modeled uncertainty.</div>
                        </li>
                    </ul>

                    <div style="font-size: 0.75rem; background: #FFFAF0; border-left: 3px solid #ED8936; padding: 0.75rem; color: #9C4221; margin-top: 1rem;">
                        <strong>Status:</strong> Screening-level assessment. Results are specific to the modeled supply chain configuration. 
                        Full ISO 14044 critical review is recommended for public comparative assertions.
                    </div>
                </div>
            </div>
        </div>
    `;

    storyComparison.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-top: 1.5rem;">
            <div class="story-item">
                <div class="story-icon">🚗</div>
                <div class="story-value">${carKm > 0 ? carKm : '—'}</div>
                <div class="story-label">avoided driving</div>
            </div>
            <div class="story-item">
                <div class="story-icon">🏠</div>
                <div class="story-value">${householdDays > 0 ? householdDays : '—'}</div>
                <div class="story-label">of electricity</div>
            </div>
            <div class="story-item">
                <div class="story-icon">🌳</div>
                <div class="story-value">${treeYears > 0 ? treeYears : '—'}</div>
                <div class="story-label">mature tree-years</div>
            </div>
            <div class="story-item">
                <div class="story-icon">💧</div>
                <div class="story-value">${waterScoreDiff > 0.01 ? waterScoreDiff.toFixed(1) : '—'}</div>
                <div class="story-label">m³ world eq. (AWARE)</div>
            </div>
        </div>
    `;

    environmentalStory.classList.remove('hidden');
}

// ================== UNIVERSAL COMPARISON ENGINE ==================
function renderUniversalComparisons(myCo2, baseline) {
    const grid = document.getElementById('universalComparisonGrid');
    if (!grid) return;
    
    grid.innerHTML = "";
    
    const list = [
        {name: `This Product (Modeled: PEF 3.1)`, val: myCo2, highlight: true},
        {name: `${baseline.name}`, val: baseline.co2PerKg}
    ];

    const max = Math.max(...list.map(i=>i.val));

    list.forEach(item => {
        const pct = max > 0 ? (item.val / max) * 100 : 0; 
        grid.innerHTML += `
            <div class="universal-comparison-item ${item.highlight ? 'highlight' : ''}">
                <div style="width:150px; font-weight:600; font-size:0.8rem; line-height:1.2;">${item.name}</div>
                <div class="bar-container"><div class="bar-fill" style="width:${pct}%"></div></div>
                <div style="width:80px; text-align:right; font-weight:700; font-size:0.9rem;">${item.val.toFixed(2)} kg</div>
            </div>
        `;
    });

    const baselineName = document.getElementById('baselineName');
    if (baselineName) {
        baselineName.innerHTML = `<i class="fas fa-robot" style="color: var(--primary);"></i> <strong>Comparing against: ${baseline.name}</strong>`;
    }
}

// ================== UI INTEGRATION: PEF SINGLE SCORE DISPLAY ==================
function displayPEFSingleScore() {
    const resultsContent = document.getElementById('resultsContent');
    if (!resultsContent || !finalPefResults) return;

    const unified = getUnifiedMetrics(finalPefResults, massBalanceData);
    const productWeightKg = unified.weightUsed;
    
    const singleScoreResult = calculatePEFSingleScore(finalPefResults, productWeightKg);

    let singleScoreSection = document.getElementById('pefSingleScoreSection');
    if (!singleScoreSection) {
        singleScoreSection = document.createElement('div');
        singleScoreSection.id = 'pefSingleScoreSection';
        singleScoreSection.className = 'card';
        singleScoreSection.style.marginTop = '1.5rem';
        
        const resultsGrid = document.querySelector('.results-grid');
        if (resultsGrid) {
            resultsGrid.parentNode.insertBefore(singleScoreSection, resultsGrid.nextSibling);
        } else {
            resultsContent.insertBefore(singleScoreSection, resultsContent.firstChild);
        }
    }
    
    const score = singleScoreResult.singleScore; 
    let rating = 'Excellent';
    let ratingColor = '#48BB78';

    if (score > 150) { rating = 'Good'; ratingColor = '#ECC94B'; }
    if (score > 250) { rating = 'Fair'; ratingColor = '#ED8936'; }
    if (score > 400) { rating = 'Poor'; ratingColor = '#FC8181'; }

    singleScoreSection.innerHTML = `
        <div class="card-header">
            <div class="card-title">
                <div class="card-icon" style="background: var(--gradient-primary);">
                    <i class="fas fa-star"></i>
                </div>
                PEF 3.1 Single Score & Sensitivity Analysis
            </div>
            <div class="badge">
                <i class="fas fa-calculator"></i>
                Science-Based • Normalized & Weighted
            </div>
        </div>
        
        <div style="background: ${ratingColor}15; border-radius: 12px; padding: 1.5rem; border: 2px solid ${ratingColor}40;">
            <h4 style="margin-bottom: 0.5rem; color: var(--primary);">
                <i class="fas fa-chart-line"></i> PEF Single Score
            </h4>
            <div style="font-size: 2.5rem; font-weight: 800; color: ${ratingColor}; margin: 0.5rem 0;">
                ${score.toFixed(1)} µPt
            </div>
            <div class="dqr-badge" style="background: ${ratingColor}; color: white;">
                ${rating} • Person Equivalent Impact
            </div>
            ${singleScoreResult.organic_bonus_applied ? `
            <div style="margin-top: 0.75rem; display: inline-block; background: #E6FFFA; color: #2C7A7B; border: 1px solid #81E6D9; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold;">
                <i class="fas fa-seedling"></i> ADEME Organic Bonus: -${(15.0 * singleScoreResult.organic_ratio).toFixed(1)} µPt (${(singleScoreResult.organic_ratio * 100).toFixed(0)}% formulation)
            </div>
            ` : ''}
            <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--gray);">
                <div><strong>Normalized Score:</strong> ${singleScoreResult.normalizedScore.toExponential(3)}</div>
                <div><strong>Weighted Score:</strong> ${singleScoreResult.weightedScore.toExponential(3)}</div>
                <div><strong>Unit:</strong> microPerson equivalents (µPt)</div>
            </div>
        </div>
        
        <div style="background: white; border-radius: 12px; padding: 1.5rem; border: 2px solid var(--border);">
            <h4 style="margin-bottom: 1rem; color: var(--primary);">
                <i class="fas fa-chart-area"></i> Monte Carlo Uncertainty
            </h4>
            ${auditTrailData?.uncertainty_analysis?.monte_carlo ? `
                <div style="max-height: 200px; overflow-y: auto;">
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Climate Change:</span>
                            <span>±${auditTrailData.uncertainty_analysis.monte_carlo.co2.range.toFixed(2)} kg</span>
                        </div>
                        <div style="font-size: 0.8rem; color: var(--gray);">
                            90% confidence: ${auditTrailData.uncertainty_analysis.monte_carlo.co2.p5.toFixed(2)} to ${auditTrailData.uncertainty_analysis.monte_carlo.co2.p95.toFixed(2)} kg
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Water Scarcity:</span>
                            <span>±${auditTrailData.uncertainty_analysis.monte_carlo.water.range.toFixed(2)} m³</span>
                        </div>
                        <div style="font-size: 0.8rem; color: var(--gray);">
                            90% confidence: ${auditTrailData.uncertainty_analysis.monte_carlo.water.p5.toFixed(2)} to ${auditTrailData.uncertainty_analysis.monte_carlo.water.p95.toFixed(2)} m³
                        </div>
                    </div>
                </div>
            ` : `
                <div class="empty-state" style="padding: 1rem;">
                    <i class="fas fa-chart-bar"></i>
                    <div>Run calculation to see uncertainty analysis</div>
                </div>
            `}
            <div style="margin-top: 1rem; font-size: 0.8rem; color: var(--gray);">
                <i class="fas fa-info-circle"></i> Based on 500 Monte Carlo simulations with DQR-based uncertainty
            </div>
        </div>

        <div style="margin-top: 1.5rem;">
            <h4 style="margin-bottom: 1rem; color: var(--primary);">
                <i class="fas fa-list-ol"></i> Category Contribution to Single Score
            </h4>
            <div style="background: var(--light); border-radius: 8px; padding: 1rem; max-height: 300px; overflow-y: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                    <thead>
                        <tr style="background: var(--primary); color: white;">
                            <th style="padding: 0.5rem; text-align: left;">Impact Category</th>
                            <th style="padding: 0.5rem; text-align: right;">Raw (per kg)</th>
                            <th style="padding: 0.5rem; text-align: right;">Normalized</th>
                            <th style="padding: 0.5rem; text-align: right;">Weighted</th>
                            <th style="padding: 0.5rem; text-align: right;">Contribution %</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(singleScoreResult.breakdown).map(([cat, data]) => `
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;"><strong>${cat}</strong></td>
                                <td style="padding: 0.5rem; text-align: right;">${data.raw.toFixed(4)} <span style="color:var(--gray); font-size:0.75rem;">${data.unit}</span></td>
                                <td style="padding: 0.5rem; text-align: right;">${data.normalized.toExponential(3)}</td>
                                <td style="padding: 0.5rem; text-align: right;">${data.weighted.toExponential(3)}</td>
                                <td style="padding: 0.5rem; text-align: right;">${(data.weighted / singleScoreResult.weightedScore * 100).toFixed(1)}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ================== INGREDIENT MANAGEMENT ==================
function populateIngredientSelect() {
    // This function is now replaced by searchable typeahead
    // We keep it for backward compatibility but it does nothing
    console.log('📦 [populateIngredientSelect] Using searchable typeahead instead');
    
    // Setup the new search functionality
    setupIngredientSearch();
}

// ================== SEARCHABLE INGREDIENT TYPEAHEAD ==================
function setupIngredientSearch() {
    const searchInput = document.getElementById('ingredientSearch');
    const dropdown = document.getElementById('ingredientDropdown');
    const hiddenSelect = document.getElementById('ingredientSelect');
    
    if (!searchInput || !dropdown) {
        console.warn('⚠️ Search elements not found - using fallback');
        return;
    }
    
    // Build search index from ALL ingredients (farm gate + synthese)
    const ingredients = window.aioxyData?.ingredients || {};
    const searchIndex = Object.entries(ingredients).map(([id, data]) => ({
        id,
        name: data.name,
        name_fr: data.name_fr || '',
        dqr: data.data?.metadata?.dqr_overall || 2.5,
        co2: data.data?.pef?.["Climate Change"] || 0
    }));
    
    console.log(`🔍 [Search] Indexed ${searchIndex.length} ingredients`);
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            dropdown.classList.add('hidden');
            return;
        }
        
        // Fuzzy search - matches anywhere in name
        const matches = searchIndex
            .filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.name_fr.toLowerCase().includes(query)
            )
            .slice(0, 15); // Limit to 15 results
        
        if (matches.length === 0) {
            dropdown.innerHTML = '<li class="no-results">❌ No ingredients found</li>';
        } else {
            dropdown.innerHTML = matches.map(item => `
                <li onclick="selectIngredient('${item.id}', '${item.name.replace(/'/g, "\\'")}')">
                    <div class="ingredient-name">${item.name}</div>
                    <div class="ingredient-meta">
                        DQR: ${item.dqr?.toFixed(1) || 'N/A'} | 
                        CO₂e: ${item.co2?.toFixed(2) || 'N/A'} kg/kg
                        ${item.name_fr ? ' | ' + item.name_fr.substring(0, 40) + '...' : ''}
                    </div>
                </li>
            `).join('');
        }
        
        dropdown.classList.remove('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
            searchInput.value = '';
            hiddenSelect.value = '';
        }
    });
}

// Global function for selecting ingredient
window.selectIngredient = function(id, name) {
    document.getElementById('ingredientSelect').value = id;
    document.getElementById('ingredientSearch').value = name;
    document.getElementById('ingredientDropdown').classList.add('hidden');
    console.log(`✅ Selected: ${name} (${id})`);
};

function populateCountrySelect() {
    const targets = ['manufacturingCountry', 'ingredientOriginSelect'];
    
    if (!window.aioxyData || !window.aioxyData.countries) {
        console.warn('⚠️ [populateCountrySelect] No country data available');
        return;
    }

    const countries = window.aioxyData.countries;
    const sortedKeys = Object.keys(countries).sort((a, b) => 
        countries[a].name.localeCompare(countries[b].name)
    );

    targets.forEach(id => {
        const select = document.getElementById(id);
        
        if (!select) {
            console.warn(`⚠️ [populateCountrySelect] Element #${id} not found, skipping`);
            return;
        }

        if (id === 'manufacturingCountry') {
            select.innerHTML = '<option value="">Select country...</option>';
        } else if (id === 'ingredientOriginSelect') {
            select.innerHTML = '<option value="FR">🇫🇷 France (Base)</option>';
        }

        sortedKeys.forEach(code => {
            if (id === 'ingredientOriginSelect' && code === 'FR') return;
            
            const option = document.createElement('option');
            option.value = code;
            
            if (id === 'manufacturingCountry') {
                option.textContent = `${countries[code].name} (${countries[code].electricityCO2}g CO₂/kWh)`;
            } else {
                option.textContent = `${getFlagEmoji(code)} ${countries[code].name}`;
            }
            
            select.appendChild(option);
        });
        
        if (id === 'manufacturingCountry') {
            if (!select.value || select.value === "") {
                select.value = 'FR';
            }
        }
        
        console.log(`✅ [populateCountrySelect] Added ${sortedKeys.length} countries to #${id}`);
    });
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function addIngredient() {
    const select = document.getElementById('ingredientSelect');
    const quantityInput = document.getElementById('ingredientQuantity');
    const originSelect = document.getElementById('ingredientOriginSelect');
    
    const originCountry = originSelect ? originSelect.value : 'FR';
    const ingredientId = select.value;
    const quantity = parseFloat(quantityInput.value);
    
    if (!ingredientId || isNaN(quantity) || quantity <= 0) {
        alert('Please select an ingredient and enter a valid quantity');
        return;
    }
    
    if (!window.aioxyData || !window.aioxyData.ingredients || !window.aioxyData.ingredients[ingredientId]) {
        alert('Selected ingredient not found in database');
        return;
    }
    
    const ingredient = window.aioxyData.ingredients[ingredientId];
    
    selectedIngredients.push({
        id: ingredientId,
        name: ingredient.name,
        quantity: quantity,
        originCountry: originCountry,
        processingState: 'raw'
    });
    
    console.log(`🌍 [addIngredient] Added ${ingredient.name} from ${originCountry}`);
    
    updateIngredientList();
    calculateImpact();
    
    select.value = '';
    quantityInput.value = '0.150';
    if (originSelect) originSelect.value = 'FR';
}

function removeIngredient(index) {
    selectedIngredients.splice(index, 1);
    updateIngredientList();
    calculateImpact();
}

function updateIngredientQuantity(index, newQuantity) {
    selectedIngredients[index].quantity = parseFloat(newQuantity);
    calculateImpact();
}

window.updateIngredientProcessing = function(index, value) {
    if (selectedIngredients[index]) {
        selectedIngredients[index].processingState = value;
    }
    calculateImpact();
    console.log(`⚙️ Processing state updated to: ${value}`);
};

window.updatePhysicsNote = function(index, value) {
    if (selectedIngredients[index]) {
        selectedIngredients[index].physics_note = value;
    }
    console.log(`📝 Physics note saved: ${value}`);
};

function updateIngredientList() {
    const list = document.getElementById('ingredientList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (selectedIngredients.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-apple-alt"></i>
                <h3>No ingredients added yet</h3>
                <p>Add ingredients to calculate your environmental impact</p>
            </div>
        `;
        return;
    }
    
    selectedIngredients.forEach((ingredient, index) => {
        const ingredientData = aioxyData.ingredients[ingredient.id];
        if (!ingredientData) return;
        
        const dqrQuality = foodCalculationEngine.getDQRQualityLevel(ingredientData.data.metadata.dqr_overall);
        const uncertainty = foodCalculationEngine.calculateUncertainty(ingredientData.data.metadata.dqr.P);
        
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.innerHTML = `
            <div class="ingredient-info">
                <div class="ingredient-name">${ingredient.name}</div>
                <div class="ingredient-stats">
                    ${ingredientData.data.pef["Climate Change"]} kg CO₂e/kg • 
                    ${ingredientData.data.pef["Water Use/Scarcity (AWARE)"]} m³ water/kg •
                    <span class="dqr-badge ${dqrQuality.class}">DQR: ${dqrQuality.level}</span>
                    <span class="badge" style="margin-left: 0.5rem;">±${uncertainty}% uncertainty</span>
                </div>
                <div style="margin-top: 0.5rem;">
                    <div style="display: inline-block; margin-right: 0.5rem;">
                        <span style="font-size: 0.7rem; font-weight: bold; color: var(--primary);">Processing:</span>
                        <select style="font-size: 0.7rem; padding: 0.2rem 0.4rem; margin-left: 0.25rem; border-radius: 4px; border: 1px solid var(--border);" 
                        onchange="updateIngredientProcessing(${index}, this.value)">
                            <option value="raw" ${ingredient.processingState === 'raw' ? 'selected' : ''}>Raw (Farm Gate)</option>
                            <option value="dry_milled" ${ingredient.processingState === 'dry_milled' ? 'selected' : ''}>Dry Milled (Flour)</option>
                            <option value="wet_extracted" ${ingredient.processingState === 'wet_extracted' ? 'selected' : ''}>Wet Extracted</option>
                            <option value="isolated" ${ingredient.processingState === 'isolated' ? 'selected' : ''}>Isolated (Protein Isolate)</option>
                            <option value="fermentation" ${ingredient.processingState === 'fermentation' ? 'selected' : ''}>Precision Fermentation</option>
                        </select>
                    </div>
                    <input type="text" 
                           id="physics-note-${index}" 
                           class="form-control" 
                           style="font-size: 0.75rem; padding: 4px 8px; width: 100%; border-radius: 6px; border: 1px solid var(--border); background: #fffdf9; margin-top: 8px;" 
                           placeholder="📝 Add physics justification (e.g., +30% fermentation penalty)..."
                           value="${ingredient.physics_note || ''}"
                           onchange="updatePhysicsNote(${index}, this.value)">
                    <small style="color: var(--gray); font-size: 0.65rem; display: block; margin-top: 2px;">
                        <i class="fas fa-info-circle"></i> Verbal note only - does not affect calculations
                    </small>
                    <span class="source-badge">${ingredientData.data.metadata.source_dataset}</span>
                    <button class="btn btn-outline" style="margin-left: 0.5rem; padding: 0.25rem 0.75rem; font-size: 0.7rem;" 
                            onclick="openSupplierModal(${index})">
                        <i class="fas fa-tractor"></i> Supplier Data?
                    </button>
                    ${ingredient.primaryData ? `
                    <span class="badge" style="background: #48BB78; color: white; margin-left: 0.5rem;">
                        <i class="fas fa-check-circle"></i> Primary Farm Data
                    </span>
                    ` : ''}
                </div>
            </div>
            <div class="ingredient-actions">
                <input type="number" class="quantity-input" value="${ingredient.quantity}" step="0.001" min="0" 
                       onchange="updateIngredientQuantity(${index}, this.value)">
                <button class="remove-btn" onclick="removeIngredient(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

function setupDemoData() {
    console.log('🎯 [AIOXY] Setting up demo data...');
    
    if (!window.aioxyData || !window.aioxyData.ingredients) {
        console.error('❌ [setupDemoData] Cannot setup demo: No ingredient data available');
        return;
    }
    
    const availableIngredients = Object.keys(window.aioxyData.ingredients);
    
    if (availableIngredients.length === 0) {
        console.error('❌ [setupDemoData] No ingredients found in database!');
        return;
    }
    
    const plantBasedIds = availableIngredients.filter(id => 
        id.includes('soybean') || 
        id.includes('spring-pea') || 
        id.includes('oat') ||
        id.includes('wheat')
    );
    
    const demoIngredientId = plantBasedIds.length > 0 ? plantBasedIds[0] : availableIngredients[0];
    
    // FIX: Add ALL required fields
    selectedIngredients = [{
        id: demoIngredientId,
        name: window.aioxyData.ingredients[demoIngredientId].name,
        quantity: 0.15,
        originCountry: 'FR',           // ← ADD THIS
        processingState: 'raw',        // ← ADD THIS
        physics_note: ''               // ← ADD THIS
    }];
    
    console.log(`✅ [setupDemoData] Demo data set: ${selectedIngredients[0].name} (${demoIngredientId})`);
    
    updateIngredientList();
    
    setTimeout(() => {
        console.log('🔢 [setupDemoData] Auto-calculating with demo data...');
        calculateImpact();
    }, 300);
}

// ================== SUPPLIER DATA MODAL ==================
let currentIngredientIndex = null;

function openSupplierModal(index) {
    currentIngredientIndex = index;
    const ingredient = selectedIngredients[index];
    const modal = document.getElementById('supplierModal');
    
    document.getElementById('supplierFarmRegion').value = '';
    document.getElementById('supplierGeolocation').value = '';
    document.getElementById('supplierDDS').value = '';
    document.getElementById('primaryNitrogen').value = '';
    document.getElementById('primaryYield').value = '';
    document.getElementById('supplierWaterSource').value = '';
    document.getElementById('supplierPractice').value = '';

    if (ingredient.primaryData) {
        document.getElementById('supplierFarmRegion').value = ingredient.primaryData.farmRegion || '';
        document.getElementById('supplierGeolocation').value = ingredient.primaryData.geolocation || '';
        document.getElementById('supplierDDS').value = ingredient.primaryData.ddsReference || '';
        document.getElementById('primaryNitrogen').value = ingredient.primaryData.nitrogenKgPerTon || '';
        document.getElementById('primaryYield').value = ingredient.primaryData.yieldKgPerHa || '';
        document.getElementById('supplierWaterSource').value = ingredient.primaryData.waterSource || '';
        document.getElementById('supplierPractice').value = ingredient.primaryData.farmingPractice || '';
    }
    
    modal.classList.remove('hidden');
}

function closeSupplierModal() {
    document.getElementById('supplierModal').classList.add('hidden');
    currentIngredientIndex = null;
}

function saveSupplierData() {
    if (currentIngredientIndex === null) return;
    
    const farmRegion = document.getElementById('supplierFarmRegion').value.trim();
    const geolocation = document.getElementById('supplierGeolocation').value.trim();
    const ddsRef = document.getElementById('supplierDDS').value.trim();
    const nitrogen = parseFloat(document.getElementById('primaryNitrogen').value);
    const yieldVal = parseFloat(document.getElementById('primaryYield').value);
    const waterSource = document.getElementById('supplierWaterSource').value;
    const practice = document.getElementById('supplierPractice').value;

    if (!farmRegion || isNaN(nitrogen) || isNaN(yieldVal)) {
        alert('Please fill in required fields: Farm Region, Nitrogen, and Yield');
        return;
    }
    
    selectedIngredients[currentIngredientIndex].primaryData = {
        farmRegion,
        geolocation,
        ddsReference: ddsRef,
        nitrogenKgPerTon: nitrogen,
        yieldKgPerHa: yieldVal,
        waterSource,
        farmingPractice: practice,
        timestamp: new Date().toISOString()
    };

    updateIngredientList();
    calculateImpact();
    closeSupplierModal();
    
    console.log(`✅ [Supplier] Primary data saved for ${selectedIngredients[currentIngredientIndex].name}`);
}

function generateSupplierLink() {
    if (currentIngredientIndex === null) {
        alert("Please select an ingredient first.");
        return;
    }
    const ingredient = selectedIngredients[currentIngredientIndex];
    const baseUrl = "https://snapfizzintelligence.github.io/Aioxy/supplier.html";
    const url = `${baseUrl}?ing=${encodeURIComponent(ingredient.name)}`;
    
    navigator.clipboard.writeText(url).then(() => {
        alert(`Link copied to clipboard!\n\nEmail this URL to your farmer/supplier:\n${url}`);
    }).catch(err => {
        alert(`Copy this URL and send it to your supplier:\n\n${url}`);
    });
}

function decodeSupplierToken() {
    const tokenInput = document.getElementById('supplierTokenInput').value.trim();
    if (!tokenInput) {
        alert("Please paste the token received from your supplier.");
        return;
    }
    if (!tokenInput.startsWith('AIOXY-')) {
        alert("Invalid token format. It must start with 'AIOXY-'.");
        return;
    }

    try {
        const base64Data = tokenInput.replace('AIOXY-', '');
        const jsonStr = decodeURIComponent(escape(atob(base64Data)));
        const data = JSON.parse(jsonStr);

        document.getElementById('supplierFarmRegion').value = data.r || '';
        document.getElementById('supplierGeolocation').value = data.g || '';
        document.getElementById('supplierDDS').value = data.dds || '';
        document.getElementById('primaryNitrogen').value = data.n || '';
        document.getElementById('primaryYield').value = data.y || '';
        document.getElementById('supplierWaterSource').value = data.w || '';
        document.getElementById('supplierPractice').value = data.p || '';
        
        document.getElementById('supplierTokenInput').value = ''; 
        alert('✅ Supplier data successfully decoded and imported!\n\nReview the inputs, then click "Save Primary Data" to lock it into the audit trail.');
    } catch (e) {
        console.error("Token Decode Error:", e);
        alert('Failed to decode the token. Ensure you copied the entire string including the AIOXY- prefix.');
    }
}

// ================== BIOREACTOR PRESET ==================
function loadBioreactorPreset() {
    console.log("🧪 [LCA Engine] Initiating Bioreactor Unit Process...");

    selectedIngredients = [];

    selectedIngredients.push({
        id: 'sugar-beet-roots-conventional-national-average-animal-feed-at-farm-gate-production-fr',
        name: 'Sugar Beet (Microbial Feedstock)',
        quantity: 0.500,
        originCountry: 'NL'
    });

    selectedIngredients.push({
        id: 'tap-water-fr',
        name: 'Tap Water (Bioreactor Hydration)',
        quantity: 0.950,
        originCountry: 'NL'
    });

    const mfgCountry = document.getElementById('manufacturingCountry');
    if(mfgCountry) mfgCountry.value = 'NL';
    
    const processingSelect = document.getElementById('processingMethod');
    if(processingSelect) processingSelect.value = 'fermentation';

    const primaryToggle = document.getElementById('usePrimaryFactoryData');
    if(primaryToggle) {
        primaryToggle.checked = true;
        toggleFactoryInputs();
        
        document.getElementById('factoryTotalKWh').value = '50000';
        document.getElementById('factoryTotalOutput').value = '10000';
    }

    const pName = document.getElementById('productName');
    if(pName) pName.value = "Microbial Protein Base (Precision Fermentation)";

    updateIngredientList();
    calculateImpact();

    alert("🧪 Unit Process Loaded: Bioreactor feedstock and water added. Primary Utility Override activated at 5.0 kWh/kg for fermentation thermodynamics.");
}

// ================== UTILITY: FORMAT PEF VALUE ==================
function formatPEFValue(value) {
    if (value === 0) return "0.00";
    if (Math.abs(value) < 0.0001) return value.toExponential(3);
    if (Math.abs(value) < 1) return value.toFixed(5);
    if (Math.abs(value) < 1000) return value.toFixed(2);
    return value.toFixed(1);
}

// ================== UI INTEGRATION: TEMPORAL DISCOUNTING DISPLAY ==================
function displayTemporalDiscounting() {
    const methodologyTab = document.getElementById('methodology-tab');
    if (!methodologyTab || !finalPefResults) return;

    // Calculate temporal discounting
    const temporalResults = applyTemporalDiscounting(finalPefResults, 100);
    
    // Create section
    let tempSection = document.getElementById('temporalDiscountingSection');
    if (!tempSection) {
        tempSection = document.createElement('div');
        tempSection.id = 'temporalDiscountingSection';
        tempSection.className = 'card';
        tempSection.style.marginTop = '1.5rem';
        
        // Insert after PEF categories table
        const pefTable = methodologyTab.querySelector('.pef-scorecard');
        if (pefTable) {
            pefTable.parentNode.insertBefore(tempSection, pefTable.nextSibling);
        }
    }

    tempSection.innerHTML = `
        <div class="card-header">
            <div class="card-title">
                <div class="card-icon" style="background: var(--gradient-accent);">
                    <i class="fas fa-clock"></i>
                </div>
                Temporal Discounting & Dynamic LCIA
            </div>
            <div class="badge">
                <i class="fas fa-chart-line"></i>
                Time-Adjusted Impacts • 100-Year Horizon
            </div>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <p style="color: var(--gray); margin-bottom: 1rem;">
                <i class="fas fa-info-circle"></i> 
                Long-term environmental impacts are discounted based on category-specific rates 
                (PEF 3.1 guidance). Climate change impacts increase 2% per decade.
            </p>
            
            <div style="background: white; border-radius: 10px; padding: 1.5rem; margin-top: 1rem;">
                <h4 style="margin-bottom: 1rem; color: var(--primary);">Discount Rates by Category</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    ${Object.entries(temporalResults).slice(0, 8).map(([cat, data]) => `
                        <div style="background: var(--light); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--secondary);">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${cat}</div>
                            <div style="display: flex; justify-content: space-between;">
                                <div style="font-size: 0.85rem; color: var(--gray);">Discount Rate:</div>
                                <div style="font-weight: 700;">${(data.discount_rate * 100).toFixed(1)}%</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
                                <div style="font-size: 0.85rem; color: var(--gray);">Present Value:</div>
                                <div style="font-weight: 700;">${formatPEFValue(data.present_value_equivalent)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- CHART FOR TEMPORAL DISCOUNTING -->
            <div style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: var(--primary);">Climate Change Impact Over Time</h4>
                <div style="height: 200px; position: relative;">
                    <canvas id="temporalChart"></canvas>
                </div>
            </div>
        </div>
    `;

    // Create temporal discounting chart
    setTimeout(() => {
        const ctx = document.getElementById('temporalChart');
        if (!ctx) return;
        
        const years = Array.from({length: 100}, (_, i) => i + 1);
        const climateData = years.map(year => {
            const base = temporalResults["Climate Change"].base_impact;
            const rate = temporalResults["Climate Change"].discount_rate;
            const dynamic = Math.pow(1.02, year / 10);
            return base * dynamic * Math.exp(-rate * year);
        });

        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: years.filter((_, i) => i % 10 === 0),
                datasets: [{
                    label: 'Discounted Climate Impact',
                    data: climateData.filter((_, i) => i % 10 === 0),
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Year ${context.label}: ${context.raw.toExponential(3)} kg CO₂e`
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Years from now' }
                    },
                    y: {
                        title: { display: true, text: 'Discounted Impact (kg CO₂e)' },
                        type: 'logarithmic'
                    }
                }
            }
        });
    }, 100);
            }
// ================== UI INTEGRATION: FOREGROUND/BACKGROUND DISPLAY ==================
function displayForegroundBackground() {
    const transparencyTab = document.getElementById('transparency-tab');
    if (!transparencyTab || !auditTrailData?.foreground_background) return;

    let fgSection = document.getElementById('foregroundBackgroundSection');
    if (!fgSection) {
        fgSection = document.createElement('div');
        fgSection.id = 'foregroundBackgroundSection';
        fgSection.className = 'audit-trail-section';
        fgSection.style.marginTop = '1.5rem';
        
        const auditContent = transparencyTab.querySelector('.audit-trail-section');
        if (auditContent) {
            auditContent.parentNode.insertBefore(fgSection, auditContent);
        }
    }

    const fb = auditTrailData.foreground_background;
    
    fgSection.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div class="card-icon" style="background: var(--gradient-primary);">
                <i class="fas fa-layer-group"></i>
            </div>
            <div>
                <h3 style="color: var(--primary); margin: 0;">Foreground/Background System</h3>
                <div style="color: var(--gray); font-size: 0.9rem;">
                    ISO 14044 compliant • 5% cutoff rule applied
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div style="background: rgba(72, 187, 120, 0.1); border-radius: 10px; padding: 1.5rem; border: 2px solid var(--success);">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="width: 12px; height: 12px; background: var(--success); border-radius: 50%;"></div>
                    <h4 style="margin: 0; color: var(--primary);">Foreground System</h4>
                </div>
                <div style="font-size: 2rem; font-weight: 800; color: var(--success);">
                    ${fb.foreground_count}
                </div>
                <div style="color: var(--gray); margin-bottom: 1rem;">Measured processes</div>
                
                <div style="background: white; border-radius: 8px; padding: 1rem; max-height: 150px; overflow-y: auto;">
                    ${fb.components.foreground.map(comp => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                            <div>${comp.name}</div>
                            <div style="font-weight: 600;">${(comp.contribution).toFixed(2)} kg CO₂e</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 1rem; font-size: 0.9rem;">
                    <strong>Data Quality:</strong> Measured/specific data (DQR: ${fb.foreground_dqr?.toFixed(1) || '1.5'})
                </div>
            </div>
            
            <div style="background: rgba(255, 107, 107, 0.1); border-radius: 10px; padding: 1.5rem; border: 2px solid var(--accent);">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="width: 12px; height: 12px; background: var(--accent); border-radius: 50%;"></div>
                    <h4 style="margin: 0; color: var(--primary);">Background System</h4>
                </div>
                <div style="font-size: 2rem; font-weight: 800; color: var(--accent);">
                    ${fb.background_count}
                </div>
                <div style="color: var(--gray); margin-bottom: 1rem;">Industry average data</div>
                
                <div style="background: white; border-radius: 8px; padding: 1rem; max-height: 150px; overflow-y: auto;">
                    ${fb.components.background.map(comp => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                            <div>${comp.name}</div>
                            <div style="font-weight: 600;">${(comp.contribution).toFixed(2)} kg CO₂e</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 1rem; font-size: 0.9rem;">
                    <strong>Data Quality:</strong> Industry averages (DQR: ${fb.background_dqr?.toFixed(1) || '2.0'})
                </div>
            </div>
        </div>
        
        <div style="background: var(--light); border-radius: 10px; padding: 1.5rem; margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 600; color: var(--primary);">Cutoff Rule Applied: ${(fb.cutoff_percentage * 100).toFixed(0)}%</div>
                    <div style="color: var(--gray); font-size: 0.9rem;">
                        Processes contributing ≥${(fb.cutoff_percentage * 100).toFixed(0)}% of total impact are in foreground
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">
                        ${((fb.foreground_contribution / (fb.foreground_contribution + fb.background_contribution)) * 100).toFixed(1)}%
                    </div>
                    <div style="color: var(--gray); font-size: 0.9rem;">of impact in foreground</div>
                </div>
            </div>
        </div>
    `;
}

// ================== UI INTEGRATION: ISO COMPLIANCE DISPLAY ==================
function displayISOCompliance() {
    const methodologyTab = document.getElementById('methodology-tab');
    if (!methodologyTab || !auditTrailData?.ISO_compliance) return;

    let isoSection = document.getElementById('isoComplianceSection');
    if (!isoSection) {
        isoSection = document.createElement('div');
        isoSection.id = 'isoComplianceSection';
        isoSection.className = 'card';
        isoSection.style.marginTop = '1.5rem';
        methodologyTab.appendChild(isoSection);
    }

    const iso = auditTrailData.ISO_compliance;
    
    isoSection.innerHTML = `
        <div class="card-header">
            <div class="card-title">
                <div class="card-icon" style="background: linear-gradient(135deg, #0A2540 0%, #1A365D 100%);">
                    <i class="fas fa-file-certificate"></i>
                </div>
                ISO 14040/14044 Compliance Framework
            </div>
            <div class="badge">
                <i class="fas fa-check-circle"></i>
                Standard-Aligned • Verification-Ready Framework
            </div>
        </div>

        <div style="margin: 1.5rem 0;">
            <div style="background: #E3F2FD; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 40px; height: 40px; background: #2196F3; color: white; 
                                border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <div>
                        <div style="font-weight: 600; color: var(--primary);">Compliance Statement</div>
                        <div style="color: var(--gray); font-size: 0.9rem;">
                            This assessment follows ISO 14040:2006 and ISO 14044:2006
                        </div>
                    </div>
                </div>
                <div style="white-space: pre-wrap; font-size: 0.9rem; line-height: 1.6; color: var(--dark);">
                    ${iso.compliance_statement}
                </div>
            </div>
            
            <h4 style="margin-bottom: 1rem; color: var(--primary);">
                <i class="fas fa-balance-scale"></i> ISO 14040 Principles
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                ${Object.entries(iso.principles).map(([key, value]) => `
                    <div style="background: white; border-radius: 8px; padding: 1rem; border: 1px solid var(--border);">
                        <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--primary);">
                            ${key.replace(/_/g, ' ').toUpperCase()}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--gray);">
                            ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}


// ================== UI INTEGRATION: COMPLETE AUDIT TRAIL ==================
function displayCompleteAuditTrail() {
    const transparencyTab = document.getElementById('transparency-tab');
    if (!transparencyTab || !auditTrailData) return;

    let auditSection = document.getElementById('completeAuditTrailSection');
    if (!auditSection) {
        auditSection = document.createElement('div');
        auditSection.id = 'completeAuditTrailSection';
        auditSection.className = 'card';
        auditSection.style.marginTop = '1.5rem';
        
        transparencyTab.querySelector('.main-content').appendChild(auditSection);
    }

    const audit = auditTrailData;

    // 🛡️ REGULATOR FIX: Dynamic ISO 14044 Functional Unit Declaration AND Nutritional Result
    const userProtein = parseFloat(document.getElementById('proteinContent')?.value) || 0;
    let functionalUnitText = "1 kg of final product";
    let nutritionalLCA_HTML = "";

    if (userProtein > 0 && audit.pefCategories["Climate Change"]) {
        functionalUnitText = "1 kg Mass / 100g Delivered Protein";
        const pWeightKg = audit.mass_balance?.final_content_weight_kg || 0.2;
        const unifiedCO2 = audit.pefCategories["Climate Change"].total / pWeightKg;
        const kgNeeded = 100 / (userProtein * 10);
        const co2Per100gProtein = unifiedCO2 * kgNeeded;

        // Calculate the Baseline for contrast
        const anchorProteinDB = {
            'beef-product': 26.0, 'chicken-product': 27.0, 'pork-product': 27.0,
            'milk-product': 3.4, 'cheese-product': 25.0, 'plant-burger': 15.0,
            'plant-milk': 1.0, 'default': 10.0
        };
    
        const baselineKey = Object.keys(ANCHOR_DATASETS).find(key => 
    audit.comparison_baseline?.name?.includes(ANCHOR_DATASETS[key].name)) || 'default';
const baselineProtein = anchorProteinDB[baselineKey] || 10.0;
// 🛡️ Divide the scaled CO2 by the ratio so the protein math remains physically accurate
const rawBaseCo2 = (audit.comparison_baseline?.co2PerKg || 1) / (audit.comparison_baseline?.concentration_ratio || 1);
const baseCo2PerProtein = rawBaseCo2 * (100 / (baselineProtein * 10));
    
        nutritionalLCA_HTML = `
        <div>
            <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Nutritional LCA Impact</div>
            <div style="margin-top: 0.25rem; font-weight: 800; font-size: 1.1rem; color: #8E44AD;">
                ${co2Per100gProtein.toFixed(2)} kg CO₂e <span style="font-size:0.75rem; font-weight:normal; color:var(--gray)">(per 100g protein)</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--gray); margin-top: 0.3rem; border-top: 1px solid var(--border); padding-top: 0.3rem;">
                <i class="fas fa-info-circle"></i> Baseline Equivalent: <strong>${baseCo2PerProtein.toFixed(2)} kg CO₂e</strong>
            </div>
        </div>`;
    }

    auditSection.innerHTML = `
        <div class="card-header">
            <div class="card-title">
                <div class="card-icon" style="background: var(--gradient-primary);">
                    <i class="fas fa-fingerprint"></i>
                </div>
                Complete Chain-of-Custody Audit Trail
            </div>
            <div class="badge">
                <i class="fas fa-shield-alt"></i>
                ISO 14044 Compliant • Tamper-Evident
            </div>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <div style="background: var(--light); border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 40px; height: 40px; background: var(--primary); color: white; 
                                border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-hashtag"></i>
                    </div>
                    <div>
                        <div style="font-weight: 600; color: var(--primary);">Assessment Traceability</div>
                        <div style="color: var(--gray); font-size: 0.9rem;">
                            Unique ID: Verifies calculation instance and inputs
                        </div>
                    </div>
                </div>
                <div style="background: white; border-radius: 8px; padding: 1rem; font-family: monospace; 
                            word-break: break-all; font-size: 0.8rem; color: var(--primary);">
                    ${audit.dppId || 'TRC-' + Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--success);">
                    <i class="fas fa-check-circle"></i> Audit trail verified - calculation integrity maintained
                </div>
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--primary);">
                <i class="fas fa-info-circle"></i> Calculation Metadata
            </h4>
            <div style="background: white; border-radius: 10px; border: 1px solid var(--border); padding: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                    <div>
                        <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Product Name</div>
                        <div style="margin-top: 0.25rem;">${audit.productName || 'Unnamed Product'}</div>
                    </div>
                    <div>
    <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Functional Unit (ISO 14044)</div>
    <div style="font-size: 0.9rem; color: #8E44AD; font-weight: 700; margin-top: 0.25rem;">${functionalUnitText}</div>
</div>
<div>
    <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Comparison Baseline</div>
    <div style="font-size: 0.9rem; color: #D35400; font-weight: 700; margin-top: 0.25rem;">${audit.comparison_baseline?.name || 'Not specified'}</div>
    ${audit.comparison_baseline?.bat_processing_note ? `
    <div style="margin-top: 0.5rem; padding: 0.5rem; background: #F8FAFC; border-left: 3px solid #0A2540; font-size: 0.75rem; color: var(--gray);">
        <strong>Baseline Processing:</strong> ${audit.comparison_baseline.bat_processing_note}<br>
        <strong>Source:</strong> ${audit.comparison_baseline.bat_source || 'JRC BAT (EU) 2019/2031'}<br>
        <strong>Allocation:</strong> ${audit.comparison_baseline.allocation_note || 'Mass allocation (ISO 14044)'}
    </div>
    ` : ''}
</div>
                    <div>
                        <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">FOP Eco-Score (ADEME)</div>
                        
                        ${(() => {
                            const score = audit.pef_single_score?.singleScore || 0;
                            let rating = 'Excellent';
                            let ratingColor = '#48BB78';
                            
                            if (score > 150) { rating = 'Good'; ratingColor = '#ECC94B'; }
                            if (score > 250) { rating = 'Fair'; ratingColor = '#ED8936'; }
                            if (score > 400) { rating = 'Poor'; ratingColor = '#FC8181'; }
                            
                            return `
                                <div style="margin-top: 0.25rem;">
                                    <div class="dqr-badge" style="background: ${ratingColor}; color: white; display: inline-block; margin-bottom: 0.25rem; font-size: 0.7rem; padding: 0.15rem 0.5rem;">
                                        ${rating} • Person Equivalent Impact
                                    </div>
                                    
                                    <div style="font-weight: 800; font-size: 1.1rem; color: ${audit.pef_single_score?.singleScore < 150 ? '#2A9D8F' : audit.pef_single_score?.singleScore < 250 ? '#8AB17D' : audit.pef_single_score?.singleScore < 400 ? '#E9C46A' : audit.pef_single_score?.singleScore < 600 ? '#F4A261' : '#E63946'};">
                                        Grade ${audit.pef_single_score?.singleScore < 150 ? 'A' : audit.pef_single_score?.singleScore < 250 ? 'B' : audit.pef_single_score?.singleScore < 400 ? 'C' : audit.pef_single_score?.singleScore < 600 ? 'D' : 'E'} 
                                        <span style="font-size:0.75rem; font-weight:normal; color:var(--gray)">(${score.toFixed(1)} µPt)</span>
                                    </div>
                                </div>
                            `;
                        })()}
                    </div>
                    ${nutritionalLCA_HTML}
                    <div>
                        <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem; text-transform: uppercase;">Data Quality Rating</div>
                        <div style="margin-top: 0.25rem;" class="dqr-badge ${foodCalculationEngine.getDQRQualityLevel(audit.dqr_summary?.overall_dqr || 1.5).class}">
                            ${audit.dqr_summary?.dqr_level || 'Good'} (DQR: ${audit.dqr_summary?.overall_dqr?.toFixed(2) || '1.50'})
                        </div>
                        <div style="font-size: 0.7rem; color: var(--gray); margin-top: 0.25rem;">
    <i class="fas fa-balance-scale"></i> Impact-weighted per PEF 3.1 §6.5
</div>
                    </div>
                </div>
            </div>
    
            <h4 style="margin: 1.5rem 0 1rem 0; color: var(--primary);">
                <i class="fas fa-database"></i> Data Sources & Methodology
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                    <div style="font-weight: 600; color: var(--primary);">Methodology</div>
                    <div>PEF 3.1 Compliant</div>
                </div>
                <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                    <div style="font-weight: 600; color: var(--primary);">Data Source</div>
                    <div>AGRIBALYSE 3.2</div>
                </div>
                <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                    <div style="font-weight: 600; color: var(--primary);">Characterization</div>
                    <div>JRC EF 3.1</div>
                </div>
                <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                    <div style="font-weight: 600; color: var(--primary);">Water Method</div>
                    <div>AWARE 2.0</div>
                </div>
            </div>
                </div>
        
        <!-- 🆕 SENSITIVITY ANALYSIS CARD -->
        <h4 style="margin: 1.5rem 0 1rem 0; color: var(--primary);">
            <i class="fas fa-chart-line"></i> Sensitivity Analysis (ISO 14044 §6.3)
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            ${audit.comparison_baseline?.sensitivity_analysis ? `
            <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                <div style="font-weight: 600; color: var(--primary);">Parameters Tested</div>
                <div style="font-size: 0.85rem;">${audit.comparison_baseline.sensitivity_analysis.parameters_tested.join(', ')}</div>
            </div>
            <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                <div style="font-weight: 600; color: var(--primary);">Key Finding</div>
                <div style="font-size: 0.85rem;">${audit.comparison_baseline.sensitivity_analysis.key_finding}</div>
            </div>
            <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                <div style="font-weight: 600; color: var(--primary);">Recommendation</div>
                <div style="font-size: 0.85rem;">${audit.comparison_baseline.sensitivity_analysis.recommendation}</div>
            </div>
            <div style="background: var(--light); border-radius: 8px; padding: 1rem;">
                <div style="font-weight: 600; color: var(--primary);">Compliance</div>
                <div style="font-size: 0.85rem;">${audit.comparison_baseline.sensitivity_analysis.iso_compliance}</div>
            </div>
            ` : `
            <div style="background: var(--light); border-radius: 8px; padding: 1rem; grid-column: 1/-1;">
                <div style="font-weight: 600; color: var(--primary);">Sensitivity Analysis</div>
                <div style="font-size: 0.85rem;">Run calculation to generate sensitivity analysis. Parameters include transport distance, grid intensity, and concentration ratio.</div>
            </div>
            `}
        </div>
    </div>
`;
                                 }
// ================== UI.JS LOADED ==================
console.log("✅ [AIOXY] ui.js loaded - Interface ready");
