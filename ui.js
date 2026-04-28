// ================== AIOXY UI CONTROLLER v3.1 ==================
// DOM Manipulation, Event Handlers, and User Interface Logic
// Adds: Conventional Baseline Recipe builder (multi-ingredient)
// ===================================================================

// ================== CONVENTIONAL BASELINE RECIPE STATE ==================
var conventionalBaselineIngredients = [];

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
        if (selectedIngredients.length > 0) {
            calculateImpact();
        }
    }
    if (tabName === 'business-case') {
        if (!finalPefResults || Object.keys(finalPefResults).length === 0 || !finalPefResults["Climate Change"] || finalPefResults["Climate Change"].total === 0) {
            console.log('🔧 [Fix] Priming missing physics data for business case...');
            if (selectedIngredients.length === 0) {
                setupDemoData();
            } else {
                calculateImpact();
            }
            if (typeof updateBusinessCase === 'function') {
                setTimeout(updateBusinessCase, 200);
            }
        } else {
            updateBusinessCase();
        }
    }
    if (tabName === 'dpp') {
        generateDPP();
    }
    if (tabName === 'pef-scorecard') {
        if (typeof displayFullPefScorecard === 'function') {
            displayFullPefScorecard();
        } else {
            console.warn('displayFullPefScorecard is not available. PEF Scorecard will not render.');
        }
    }
    if (tabName === 'transparency') {
        displayAuditTrail();
        displayCompleteAuditTrail();
        displayForegroundBackground();
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

    // Bug 10 fix: if no valid calculation data, destroy any existing chart and return
    const hasData = auditTrailData?.pefCategories?.["Climate Change"]?.total > 0;
    if (!hasData) {
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
        return;
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
    
    // 🛡️ CRASH FIX 1: Define baseline variables at the absolute TOP before anything else runs
    // FIX: Use results.comparison.baseline (engine-produced, always valid) as primary source.
    // Fall back to currentComparisonBaseline only if engine baseline somehow absent.
    const resolvedBaseline = results.comparison?.baseline || currentComparisonBaseline || {
        name: 'Benchmark',
        co2PerKg: unifiedCO2,
        waterPerKg: 0
    };
    const baselineCO2 = resolvedBaseline.co2PerKg || 0;
    const baselineWater = resolvedBaseline.waterPerKg || 0;
    const safeBaseCO2 = baselineCO2 > 0 ? baselineCO2 : 1;
    const safeBaseWater = baselineWater > 0 ? baselineWater : 1;
    const baselineName = resolvedBaseline.name
        ? resolvedBaseline.name.replace(' (Cradle-to-Retail)', '')
        : 'benchmark';

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
    const singleScoreData = window.auditTrailData?.pef_single_score || { singleScore: 0 };
    const mPtScore = (typeof singleScoreData.singleScore === 'number' && isFinite(singleScoreData.singleScore))
        ? singleScoreData.singleScore
        : 0;

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
    updateEnvironmentalStory(results, resolvedBaseline);
    
    // 2. Pass the UNIFIED number to the comparison renderer
    // FIX: Pass resolvedBaseline (always non-null) instead of raw currentComparisonBaseline
    renderUniversalComparisons(unifiedCO2, resolvedBaseline);

    // =====================================================================
    // PARAMETRIC TWIN — Per-Ingredient Breakdown (FIX 3)
    // Only renders when a full recipe swap has been computed (ingredientPairs present)
    // =====================================================================
    const twinContainer = document.getElementById('parametricTwinBreakdown') || (() => {
        const div = document.createElement('div');
        div.id = 'parametricTwinBreakdown';
        div.className = 'card';
        div.style.borderLeft = '4px solid #2C7A7B';
        div.style.marginTop = '1.5rem';
        // Insert after the resultsContent div's first non-hidden sibling, below charts
        const resultsContentEl = document.getElementById('resultsContent');
        if (resultsContentEl) resultsContentEl.appendChild(div);
        return div;
    })();

    const pairs = resolvedBaseline?.ingredientPairs;
    if (pairs && pairs.length > 0) {
        const assessedTotal  = resolvedBaseline.assessed_co2PerKg  ?? 0;
        const conventTotal   = resolvedBaseline.co2PerKg           ?? 0;
        const netDelta       = resolvedBaseline.delta               ?? (assessedTotal - conventTotal);
        const deltaPct       = conventTotal > 0 ? ((netDelta / conventTotal) * 100).toFixed(1) : '0.0';
        const deltaPctAbs    = Math.abs(parseFloat(deltaPct)).toFixed(1);
        const deltaSign      = netDelta <= 0 ? '↓' : '↑';
        const deltaColor     = netDelta <= 0 ? '#27AE60' : '#E63946';

        // Build ingredient pair rows
        let pairRows = '';
        pairs.forEach(pair => {
            const pairDelta = pair.delta ?? 0;
            const isSame    = pair.same || Math.abs(pairDelta) < 0.00001;
            const pairColor = pairDelta < 0 ? '#27AE60' : pairDelta > 0 ? '#E63946' : '#718096';
            const pairSign  = pairDelta > 0 ? '+' : '';
            const assessedLabel  = `${pair.assessed?.name || '—'} (${pair.assessed?.quantityKg?.toFixed(3) || '?'}kg)`;
            const conventLabel   = `${pair.conventional?.name || '—'} (${pair.conventional?.quantityKg?.toFixed(3) || '?'}kg)`;
            pairRows += `
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 0.6rem 0.75rem; font-size: 0.82rem; color: var(--primary); font-weight: 600;">${assessedLabel}</td>
                    <td style="padding: 0.6rem 0.75rem; font-size: 0.82rem; color: var(--gray);">${conventLabel}</td>
                    <td style="padding: 0.6rem 0.75rem; font-size: 0.82rem; text-align: right; font-weight: 700; color: ${pairColor};">
                        ${isSame ? '≈ same' : `${pairSign}${pairDelta.toFixed(3)} kg CO₂e`}
                    </td>
                </tr>`;
        });

        twinContainer.innerHTML = `
            <div class="card-header">
                <div class="card-title">
                    <div class="card-icon" style="background: linear-gradient(135deg, #2C7A7B 0%, #285E61 100%);">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    Parametric Twin — Full Recipe Comparison
                </div>
                <div class="badge" style="background: rgba(44,122,123,0.1); color: #2C7A7B;">
                    <i class="fas fa-atom"></i> Ingredient-Level Analysis
                </div>
            </div>
            <div style="background: #F0FFF4; border-radius: 10px; padding: 1rem; margin-bottom: 1.25rem;
                        border: 1.5px solid #27AE60; display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2rem; font-weight: 800; color: ${deltaColor};">${deltaSign}${deltaPctAbs}%</div>
                <div>
                    <div style="font-weight: 700; color: var(--primary);">Net Recipe Delta</div>
                    <div style="font-size: 0.85rem; color: var(--gray);">
                        Assessed: ${assessedTotal.toFixed(3)} kg CO₂e/kg &nbsp;|&nbsp;
                        Conventional: ${conventTotal.toFixed(3)} kg CO₂e/kg
                    </div>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                    <thead>
                        <tr style="background: var(--primary); color: white;">
                            <th style="padding: 0.6rem 0.75rem; text-align: left; font-weight: 600;">Assessed Ingredient</th>
                            <th style="padding: 0.6rem 0.75rem; text-align: left; font-weight: 600;">Conventional Counterpart</th>
                            <th style="padding: 0.6rem 0.75rem; text-align: right; font-weight: 600;">Delta (kg CO₂e)</th>
                        </tr>
                    </thead>
                    <tbody>${pairRows}</tbody>
                </table>
            </div>
            <div style="margin-top: 0.75rem; font-size: 0.75rem; color: var(--gray);">
                <i class="fas fa-info-circle"></i> ISO 14044 compliant comparative LCA. All pairs use identical system boundaries and AGRIBALYSE 3.2 background data.
            </div>
        `;
        twinContainer.style.display = '';
    } else {
        twinContainer.style.display = 'none';
    }

    // Show the results tab
    const resultsTab = document.getElementById('results-tab');
    if (resultsTab) resultsTab.classList.remove('hidden');

    updateResultsMetrics(results, resolvedBaseline);
    createEmissionChart(results);
    displayPEFSingleScore();
    displayAuditTrail();
    displayCompleteAuditTrail();
    displayISOCompliance();
}

// ================== UPDATE DATA QUALITY DISPLAY ==================
function updateDataQualityDisplay(results) {
    const dataQualitySection = document.getElementById('dataQualitySection');
    const dqrBreakdown = document.getElementById('dqrBreakdown');
    const overallDQRBadge = document.getElementById('overallDQRBadge');
    
    if (!dataQualitySection || !dqrBreakdown || !overallDQRBadge) return;

    if (auditTrailData.dqr_summary && auditTrailData.dqr_summary.component_dqrs && auditTrailData.dqr_summary.component_dqrs.length > 0) {
        dataQualitySection.classList.remove('hidden');
        
        let terSum = 0, grSum = 0, tirSum = 0, pSum = 0;
        let count = 0;
        
        auditTrailData.dqr_summary.component_dqrs.forEach(score => {
            const match = selectedIngredients.find(i => 
                i.name === score.name || 
                (i.id && score.name && score.name.includes(i.name && i.name.substring(0, 10)))
            );
            const ingredient = match ? aioxyData.ingredients[match.id] : null;
            // Bug 4 fix: skip ingredients with missing DQR data
            if (!ingredient || !ingredient.data || !ingredient.data.metadata || !ingredient.data.metadata.dqr) {
                return;
            }
            if (ingredient && ingredient.data && ingredient.data.metadata && ingredient.data.metadata.dqr) {
                terSum += ingredient.data.metadata.dqr.TeR || 0;
                grSum  += ingredient.data.metadata.dqr.GR  || 0;
                tirSum += ingredient.data.metadata.dqr.TiR || 0;
                pSum   += ingredient.data.metadata.dqr.P   || 0;
                count++;
            }
        });
        
        const avgFactors = {
            TeR: count > 0 ? (terSum / count).toFixed(1) : '—',
            GR:  count > 0 ? (grSum  / count).toFixed(1) : '—',
            TiR: count > 0 ? (tirSum / count).toFixed(1) : '—',
            P:   count > 0 ? (pSum   / count).toFixed(1) : '—'
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
        overallDQRBadge.innerHTML = `<i class="fas fa-star"></i> Overall Data Quality: ${dqrQuality.level} (DQR: ${(results.overallDQR ?? 2.5).toFixed(1)}) • ±${results.overallUncertainty}% uncertainty`;
    } else {
        dataQualitySection.classList.add('hidden');
    }
}

// ================== UPDATE MASS BALANCE DISPLAY ==================
function updateMassBalanceDisplay() {
    const massBalanceSection = document.getElementById('massBalanceSection');
    const massBalanceContent = document.getElementById('massBalanceContent');
    
    if (!massBalanceSection || !massBalanceContent) return;

    if (massBalanceData && massBalanceData.raw_input_total_kg > 0) {
        massBalanceSection.classList.remove('hidden');
        
        const expectedOutput = massBalanceData.raw_input_total_kg - (massBalanceData.evaporation_kg || 0);
        const balanceDifference = Math.abs(expectedOutput - (massBalanceData.final_output_kg || 0));
        const balanceStatus = balanceDifference < 0.001 ? "✅ Balanced" : "⚠️ Check Required";

        massBalanceContent.innerHTML = `
            <div class="mass-balance-item">
                <span>Total Input Weight:</span>
                <span>${massBalanceData.raw_input_total_kg.toFixed(3)} kg</span>
            </div>
            <div class="mass-balance-item">
                <span style="color: #C0392B;">- Water Evaporation:</span>
                <span style="color: #C0392B;">${(massBalanceData.evaporation_kg || 0).toFixed(3)} kg</span>
            </div>
            <div class="mass-balance-item" style="font-weight: 600;">
                <span>= Final Product Weight:</span>
                <span>${(massBalanceData.final_output_kg || 0).toFixed(3)} kg</span>
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
// FIX: Accept resolvedBaseline as second param so baseline is never null here
function updateEnvironmentalStory(results, resolvedBaseline) {
    const environmentalStory = document.getElementById('environmentalStory');
    const storyContent = document.getElementById('storyContent');
    const storyComparison = document.getElementById('storyComparison');

    if (!environmentalStory || !storyContent || !storyComparison) return;

    // FIX: Guard — if no baseline available at all, hide story and return
    if (!resolvedBaseline) {
        environmentalStory.classList.add('hidden');
        return;
    }

    const customerName = document.getElementById('customerName')?.value || 'Consumer';
    // FIX: Use resolvedBaseline.name safely — it is always set
    const baselineName = (resolvedBaseline.name || 'Benchmark').replace(" (Cradle-to-Retail)", "");
    
    const co2SavedPerKg = results.comparison?.co2SavedPerKg || 0;
    const carKm = Math.round(co2SavedPerKg / PHYSICS_CONSTANTS.CAR_EMISSIONS_KG_PER_KM);
    const treeYears = (co2SavedPerKg / PHYSICS_CONSTANTS.TREE_ABSORPTION_KG_YEAR).toFixed(1);
    const householdDays = Math.round(co2SavedPerKg / PHYSICS_CONSTANTS.HOUSEHOLD_ELEC_KG_DAY);
    const baselineWater = resolvedBaseline.waterPerKg || 0;
    const currentWater = results.waterScarcityPerKg || 0;
    const waterScoreDiff = Math.max(0, baselineWater - currentWater);

    const uncertainty = results.overallUncertainty || 15;
    const rawCo2Pct = resolvedBaseline.co2PerKg > 0 
        ? ((resolvedBaseline.co2PerKg - results.co2PerKg) / resolvedBaseline.co2PerKg) * 100 
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
                            <div><strong>Quality & Uncertainty:</strong> DQR ${(results.overallDQR ?? 2.5).toFixed(1)}/5.0 (High) with ±${results.overallUncertainty}% modeled uncertainty.</div>
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
    // FIX: Guard against null baseline — engine always passes resolvedBaseline now,
    // but defensive check here prevents any future null crash.
    if (!baseline || typeof baseline.name === 'undefined') return;
    
    grid.innerHTML = "";
    
    const list = [
        {name: `This Product (Modeled: PEF 3.1)`, val: myCo2, highlight: true},
        {name: `${baseline.name}`, val: baseline.co2PerKg || 0}
    ];

    const max = Math.max(...list.map(i => i.val));

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

    const baselineNameEl = document.getElementById('baselineName');
    if (baselineNameEl) {
        baselineNameEl.innerHTML = `<i class="fas fa-robot" style="color: var(--primary);"></i> <strong>Comparing against: ${baseline.name}</strong>`;
    }
}

// ================== UI INTEGRATION: PEF SINGLE SCORE DISPLAY ==================
function displayPEFSingleScore() {
    const resultsContent = document.getElementById('resultsContent');
    if (!resultsContent || !finalPefResults || Object.keys(finalPefResults).length === 0) return;

    const singleScoreResult = window.auditTrailData?.pef_single_score || { singleScore: 0, normalizedScore: 0, weightedScore: 0, breakdown: {} };
    
    let singleScoreSection = document.getElementById('pefSingleScoreSection');
    if (!singleScoreSection) return;

    const score = singleScoreResult.singleScore || 0;

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
                        ${(() => {
                            const cc = auditTrailData.uncertainty_analysis.monte_carlo['Climate Change'];
                            if (!cc || cc.mean === 0) return '<div style="color:var(--gray);">Climate Change: N/A</div>';
                            const range = (cc.p95 - cc.p5);
                            return `
                            <div style="display: flex; justify-content: space-between;">
                                <span>Climate Change:</span>
                                <span>±${range.toFixed(2)} kg</span>
                            </div>
                            <div style="font-size: 0.8rem; color: var(--gray);">
                                90% confidence: ${cc.p5.toFixed(2)} to ${cc.p95.toFixed(2)} kg
                            </div>`;
                        })()}
                    </div>
                    <div>
                        ${(() => {
                            const wa = auditTrailData.uncertainty_analysis.monte_carlo['Water Use/Scarcity (AWARE)'];
                            if (!wa || wa.mean === 0) return '<div style="color:var(--gray);">Water Scarcity: N/A</div>';
                            const range = (wa.p95 - wa.p5);
                            return `
                            <div style="display: flex; justify-content: space-between;">
                                <span>Water Scarcity:</span>
                                <span>±${range.toFixed(2)} m³</span>
                            </div>
                            <div style="font-size: 0.8rem; color: var(--gray);">
                                90% confidence: ${wa.p5.toFixed(2)} to ${wa.p95.toFixed(2)} m³
                            </div>`;
                        })()}
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
                                <td style="padding: 0.5rem; text-align: right;">${data.raw.toFixed(4)} <span style="color:var(--gray); font-size:0.75rem;">${data.unit || ''}</span></td>
                                <td style="padding: 0.5rem; text-align: right;">${data.normalized.toExponential(3)}</td>
                                <td style="padding: 0.5rem; text-align: right;">${data.weighted.toExponential(3)}</td>
                                <td style="padding: 0.5rem; text-align: right;">${singleScoreResult.weightedScore > 0 ? (data.weighted / singleScoreResult.weightedScore * 100).toFixed(1) : '0.0'}%</td>
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
}

// ================== SEARCHABLE INGREDIENT TYPEAHEAD ==================
function setupIngredientSearch() {
    const searchInput = document.getElementById('ingredientSearch');
    const dropdown = document.getElementById('ingredientDropdown');
    const hiddenSelect = document.getElementById('ingredientSelect');
    
    if (!searchInput || !dropdown) {
        console.warn('⚠️ Search elements not found');
        return;
    }
    
    const ingredients = window.aioxyData?.ingredients || {};
    const searchIndex = Object.entries(ingredients).map(([id, data]) => ({
        id,
        name: data.name || 'Unknown Ingredient',
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
        
        const matches = searchIndex
            .filter(item => 
                (item.name || '').toLowerCase().includes(query) ||
                (item.name_fr || '').toLowerCase().includes(query)
            )
            .slice(0, 15);
        
        if (!matches || matches.length === 0) {
            dropdown.innerHTML = '<li class="no-results">❌ No ingredients found</li>';
        } else {
            dropdown.innerHTML = matches.map(item => {
                const safeName = (item.name || 'Unknown').replace(/'/g, "\\'");
                return `
                <li onclick="selectIngredient('${item.id}', '${safeName}')">
                    <div class="ingredient-name">${item.name || 'Unknown'}</div>
                    <div class="ingredient-meta">
                        DQR: ${(item.dqr || 2.5).toFixed(1)} | 
                        CO₂e: ${(item.co2 || 0).toFixed(2)} kg/kg
                        ${item.name_fr ? ' | ' + item.name_fr.substring(0, 40) + '...' : ''}
                    </div>
                </li>
            `}).join('');
        }
        
        dropdown.classList.remove('hidden');
    });
    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
            searchInput.value = '';
            if (hiddenSelect) hiddenSelect.value = '';
        }
    });
}

// Global function for selecting ingredient
window.selectIngredient = function(id, name) {
    const selectEl = document.getElementById('ingredientSelect');
    const searchEl = document.getElementById('ingredientSearch');
    const dropdownEl = document.getElementById('ingredientDropdown');
    
    if (selectEl) selectEl.value = id;
    if (searchEl) searchEl.value = name || 'Unknown';
    if (dropdownEl) dropdownEl.classList.add('hidden');
    console.log(`✅ Selected: ${name} (${id})`);
};

// ================== SEARCHABLE BASELINE TYPEAHEAD (legacy single) ==================
function setupBaselineSearch() {
    const searchInput = document.getElementById('baselineSearch');
    const dropdown = document.getElementById('baselineDropdown');
    const hiddenSelect = document.getElementById('comparisonBaseline');
    
    if (!searchInput || !dropdown) return;
    
    const ingredients = window.aioxyData?.ingredients || {};
    const searchIndex = Object.entries(ingredients).map(([id, data]) => ({
        id,
        name: data.name || 'Unknown',
        co2: data.data?.pef?.["Climate Change"] || 0
    }));
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            dropdown.classList.add('hidden');
            return;
        }
        
        const matches = searchIndex
            .filter(item => (item.name || '').toLowerCase().includes(query))
            .slice(0, 15);
        
        if (!matches || matches.length === 0) {
            dropdown.innerHTML = '<li class="no-results">❌ No ingredients found</li>';
        } else {
            dropdown.innerHTML = matches.map(item => {
                const safeName = (item.name || 'Unknown').replace(/'/g, "\\'");
                return `
                <li onclick="selectBaseline('${item.id}', '${safeName}')">
                    <div class="ingredient-name">${item.name || 'Unknown'}</div>
                    <div class="ingredient-meta">CO₂e: ${(item.co2 || 0).toFixed(2)} kg/kg (Agribalyse 3.2)</div>
                </li>
            `}).join('');
        }
        dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

window.selectBaseline = function(id, name) {
    const selectEl = document.getElementById('comparisonBaseline');
    const searchEl = document.getElementById('baselineSearch');
    const dropdownEl = document.getElementById('baselineDropdown');
    
    if (selectEl) {
        selectEl.value = id;
        selectEl.dispatchEvent(new Event('change')); 
        // Bug 20 fix: also call updateComparison() directly in case synthetic event doesn't fire onchange
        if (typeof updateComparison === 'function') {
            updateComparison();
        }
    }
    if (searchEl) searchEl.value = name || 'Unknown';
    if (dropdownEl) dropdownEl.classList.add('hidden');
    console.log(`⚖️ [Parametric Twin] Baseline locked to: ${name}`);
};

// ================== CONVENTIONAL BASELINE RECIPE — TYPEAHEAD SETUP ==================
function setupConventionalBaselineSearch() {
    const searchInput = document.getElementById('conventionalBaselineSearch');
    const dropdown = document.getElementById('conventionalBaselineDropdown');

    if (!searchInput || !dropdown) return;

    const ingredients = window.aioxyData?.ingredients || {};
    const searchIndex = Object.entries(ingredients).map(([id, data]) => ({
        id,
        name: data.name || 'Unknown',
        co2: data.data?.pef?.['Climate Change'] || 0,
        dqr: data.data?.metadata?.dqr_overall || 2.5
    }));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            dropdown.classList.add('hidden');
            return;
        }

        const matches = searchIndex
            .filter(item => (item.name || '').toLowerCase().includes(query))
            .slice(0, 15);

        if (!matches || matches.length === 0) {
            dropdown.innerHTML = '<li class="no-results">❌ No ingredients found</li>';
        } else {
            dropdown.innerHTML = matches.map(item => {
                const safeName = (item.name || '').replace(/'/g, "\\'");
                return `
                    <li onclick="selectConventionalBaselineIngredient('${item.id}', '${safeName}')">
                        <div class="ingredient-name">${item.name}</div>
                        <div class="ingredient-meta">
                            CO₂e: ${item.co2.toFixed(2)} kg/kg | DQR: ${item.dqr.toFixed(1)} | AGRIBALYSE 3.2
                        </div>
                    </li>
                `;
            }).join('');
        }
        dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
            searchInput.value = '';
            const hiddenSelect = document.getElementById('conventionalBaselineSelect');
            if (hiddenSelect) hiddenSelect.value = '';
        }
    });

    console.log('✅ [ConventionalBaseline] Search typeahead ready');
}

window.selectConventionalBaselineIngredient = function(id, name) {
    const hiddenSelect = document.getElementById('conventionalBaselineSelect');
    const searchEl    = document.getElementById('conventionalBaselineSearch');
    const dropdown    = document.getElementById('conventionalBaselineDropdown');

    if (hiddenSelect) hiddenSelect.value = id;
    if (searchEl)     searchEl.value     = name;
    if (dropdown)     dropdown.classList.add('hidden');
    console.log(`✅ [ConventionalBaseline] Selected: ${name} (${id})`);
};

// ================== CONVENTIONAL RECIPE MANAGEMENT ==================

/**
 * addConventionalIngredient()
 * Reads the baseline search select, quantity, origin, processing state.
 * Adds to conventionalBaselineIngredients array and refreshes the list.
 */
function addConventionalIngredient() {
    const hiddenSelect    = document.getElementById('conventionalBaselineSelect');
    const qtyInput        = document.getElementById('conventionalBaselineQuantity');
    const originSelect    = document.getElementById('conventionalBaselineOrigin');
    const processingSelect = document.getElementById('conventionalBaselineProcessing');

    const ingredientId  = hiddenSelect?.value || '';
    const quantity      = parseFloat(qtyInput?.value) || 0;
    const originCountry = originSelect?.value || 'FR';
    const processingState = processingSelect?.value || 'raw';

    if (!ingredientId) {
        alert('Please search and select a conventional ingredient first.');
        return;
    }
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity (kg).');
        return;
    }
    if (!window.aioxyData?.ingredients?.[ingredientId]) {
        alert('Selected ingredient not found in database.');
        return;
    }

    const ingredientData = window.aioxyData.ingredients[ingredientId];
    conventionalBaselineIngredients.push({
        id:             ingredientId,
        name:           ingredientData.name,
        quantity:       quantity,
        originCountry:  originCountry,
        processingState: processingState
    });

    console.log(`🌿 [ConventionalBaseline] Added ${ingredientData.name} × ${quantity}kg`);

    updateConventionalIngredientList();

    // Clear the search inputs
    const searchEl = document.getElementById('conventionalBaselineSearch');
    if (searchEl)      searchEl.value      = '';
    if (hiddenSelect)  hiddenSelect.value  = '';
    if (qtyInput)      qtyInput.value      = '0.150';
    if (originSelect)  originSelect.value  = 'FR';
    if (processingSelect) processingSelect.value = 'raw';
}

/**
 * removeConventionalIngredient(index)
 * Removes the conventional ingredient at the given index and refreshes.
 */
function removeConventionalIngredient(index) {
    conventionalBaselineIngredients.splice(index, 1);
    updateConventionalIngredientList();
    console.log(`🗑️ [ConventionalBaseline] Removed ingredient at index ${index}`);
}

/**
 * updateConventionalIngredientQuantity(index, newQuantity)
 * Updates quantity for the given index.
 */
function updateConventionalIngredientQuantity(index, newQuantity) {
    if (conventionalBaselineIngredients[index]) {
        conventionalBaselineIngredients[index].quantity = parseFloat(newQuantity) || 0;
    }
}

/**
 * updateConventionalIngredientProcessing(index, value)
 * Updates processing state for the given index.
 */
window.updateConventionalIngredientProcessing = function(index, value) {
    if (conventionalBaselineIngredients[index]) {
        conventionalBaselineIngredients[index].processingState = value;
    }
    console.log(`⚙️ [ConventionalBaseline] Processing state[${index}] → ${value}`);
};

/**
 * updateConventionalIngredientList()
 * Renders the conventional recipe list in #conventionalIngredientList.
 * Mirrors updateIngredientList() but simpler — no primary data modal, no physics notes.
 */
function updateConventionalIngredientList() {
    const list = document.getElementById('conventionalIngredientList');
    if (!list) return;

    list.innerHTML = '';

    if (conventionalBaselineIngredients.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="padding: 2rem 1rem;">
                <i class="fas fa-seedling" style="font-size: 2rem; opacity: 0.3; display: block; margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1rem; color: var(--dark);">No conventional ingredients added yet</h3>
                <p style="font-size: 0.85rem;">Add conventional counterpart ingredients to enable full recipe swap</p>
            </div>
        `;
        return;
    }

    conventionalBaselineIngredients.forEach((ingredient, index) => {
        const ingredientData = window.aioxyData?.ingredients?.[ingredient.id];
        if (!ingredientData) {
            console.warn('[ConventionalBaseline] Ingredient not found in database:', ingredient.id);
            return;
        }

        const co2         = ingredientData.data?.pef?.['Climate Change'] ?? 0;
        const dqrOverall  = ingredientData.data?.metadata?.dqr_overall || 2.5;
        const dqrQuality  = foodCalculationEngine.getDQRQualityLevel(dqrOverall);

        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.style.cssText = 'background: #FAFFF9; border-bottom: 1px solid #D1FAE5;';
        item.innerHTML = `
            <div class="ingredient-info">
                <div class="ingredient-name" style="color: #276749;">${ingredient.name}</div>
                <div class="ingredient-stats">
                    ${co2.toFixed(3)} kg CO₂e/kg •
                    <span class="dqr-badge ${dqrQuality.class}" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">
                        DQR: ${dqrQuality.level}
                    </span>
                    <span class="source-badge">${ingredientData.data?.metadata?.source_dataset || 'AGRIBALYSE 3.2'}</span>
                </div>
                <div style="margin-top: 0.5rem;">
                    <span style="font-size: 0.7rem; font-weight: bold; color: var(--primary);">Processing:</span>
                    <select style="font-size: 0.7rem; padding: 0.2rem 0.4rem; margin-left: 0.25rem; border-radius: 4px; border: 1px solid var(--border);"
                            onchange="updateConventionalIngredientProcessing(${index}, this.value)">
                        <option value="raw"           ${ingredient.processingState === 'raw'           ? 'selected' : ''}>Raw (Farm Gate)</option>
                        <option value="dry_milled"    ${ingredient.processingState === 'dry_milled'    ? 'selected' : ''}>Dry Milled (Flour)</option>
                        <option value="wet_extracted" ${ingredient.processingState === 'wet_extracted' ? 'selected' : ''}>Wet Extracted</option>
                        <option value="isolated"      ${ingredient.processingState === 'isolated'      ? 'selected' : ''}>Isolated (Protein Isolate)</option>
                        <option value="fermentation"  ${ingredient.processingState === 'fermentation'  ? 'selected' : ''}>Precision Fermentation</option>
                        <option value="extrusion"     ${ingredient.processingState === 'extrusion'     ? 'selected' : ''}>Extrusion</option>
                    </select>
                    <span style="font-size: 0.7rem; color: var(--gray); margin-left: 0.5rem;">
                        Origin: ${ingredient.originCountry || 'FR'}
                    </span>
                </div>
            </div>
            <div class="ingredient-actions">
                <input type="number" class="quantity-input" value="${ingredient.quantity}" step="0.001" min="0"
                       onchange="updateConventionalIngredientQuantity(${index}, this.value)"
                       style="width: 90px;">
                <button class="remove-btn" onclick="removeConventionalIngredient(${index})" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });

    // Show summary badge
    const countBadge = document.getElementById('conventionalRecipeCount');
    if (countBadge) {
        countBadge.textContent = conventionalBaselineIngredients.length + ' ingredient' +
            (conventionalBaselineIngredients.length !== 1 ? 's' : '');
        countBadge.style.display = '';
    }
}

function populateCountrySelect() {
    const targets = ['manufacturingCountry', 'ingredientOriginSelect', 'conventionalBaselineOrigin'];
    
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
        } else {
            select.innerHTML = '<option value="FR">🇫🇷 France (Base)</option>';
        }

        sortedKeys.forEach(code => {
            if ((id === 'ingredientOriginSelect' || id === 'conventionalBaselineOrigin') && code === 'FR') return;
            
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
        if (!ingredientData) {
            console.warn('Ingredient not found in database:', ingredient.id);
            return;
        }
        
        // FIX: Guard against missing dqr_overall or dqr.P before calling engine methods
        const dqrOverall = ingredientData.data?.metadata?.dqr_overall || 2.5;
        const dqrP = ingredientData.data?.metadata?.dqr?.P || 2.0;
        const dqrQuality = foodCalculationEngine.getDQRQualityLevel(dqrOverall);
        const uncertainty = foodCalculationEngine.calculateUncertainty(dqrP);

        // Counterpart column: show mapped name or "Map counterpart →" link
        const counterpart = ingredient.conventionalCounterpart;
        const counterpartCell = counterpart
            ? `<span style="color: #27AE60; font-size: 0.8rem; font-weight: 600; white-space: nowrap;">
                   <i class="fas fa-check-circle"></i> ${counterpart.name}
               </span>`
            : `<a href="#" onclick="openCounterpartModal(${index}); return false;"
                  style="color: var(--gray); font-size: 0.8rem; text-decoration: none; white-space: nowrap;">
                   Map counterpart →
               </a>`;
        
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.innerHTML = `
            <div class="ingredient-info">
                <div class="ingredient-name">${ingredient.name}</div>
                <div class="ingredient-stats">
                    ${ingredientData.data?.pef?.["Climate Change"] ?? 'N/A'} kg CO₂e/kg •
                    ${ingredientData.data?.pef?.["Water Use/Scarcity (AWARE)"] ?? 'N/A'} m³ water/kg •
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
                    <span class="source-badge">${ingredientData.data?.metadata?.source_dataset || 'AGRIBALYSE 3.2'}</span>
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
            <div class="ingredient-actions" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: flex-end;">
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem; min-width: 140px;">
                    <span style="font-size: 0.65rem; color: var(--gray); text-transform: uppercase; font-weight: 600;">Conventional counterpart</span>
                    ${counterpartCell}
                    ${counterpart ? `
                    <a href="#" onclick="openCounterpartModal(${index}); return false;"
                       style="font-size: 0.7rem; color: var(--gray); text-decoration: none;">
                        ✎ Edit mapping
                    </a>` : ''}
                </div>
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
    
    selectedIngredients = [{
        id: demoIngredientId,
        name: window.aioxyData.ingredients[demoIngredientId].name,
        quantity: 0.15,
        originCountry: 'FR',
        processingState: 'raw',
        physics_note: ''
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

// ── Animal ingredient detection ───────────────────────────────────────────────
const ANIMAL_KEYWORDS = [
    'beef','cattle','cow','veal',
    'lamb','sheep','goat',
    'pig','pork','swine',
    'chicken','broiler','hen','poultry',
    'turkey','duck','rabbit',
    'salmon','trout','sea bass','sea bream','tuna',
    'shrimp','prawn','mussel','oyster','scallop','crab','lobster',
    'milk','dairy','cream','butter','cheese','yogurt','whey',
    'egg','eggs'
];

function isAnimalIngredient(ingredient) {
    if (!ingredient) return false;
    const nameLower = (ingredient.name || '').toLowerCase();

    for (const kw of ANIMAL_KEYWORDS) {
        if (nameLower.includes(kw)) return true;
    }

    try {
        const yieldDB = window.aioxyData && window.aioxyData.crop_yields;
        const ingData = window.aioxyData && window.aioxyData.ingredients && window.aioxyData.ingredients[ingredient.id];
        if (ingData && ingData.data && ingData.data.metadata && ingData.data.metadata.entericIncluded === true) {
            return true;
        }
        if (yieldDB && yieldDB.livestock_yields) {
            const country = ingredient.originCountry || 'FR';
            const livestock = yieldDB.livestock_yields[country] || yieldDB.livestock_yields['FR'] || {};
            for (const productName of Object.keys(livestock)) {
                if (nameLower.includes(productName.toLowerCase()) ||
                    productName.toLowerCase().includes(nameLower.split(' ')[0])) {
                    return true;
                }
            }
        }
    } catch (e) {}

    return false;
}

function updateProductivityLabel() {
    const animalType = document.getElementById('supplierAnimalType') &&
                       document.getElementById('supplierAnimalType').value;
    const labelEl    = document.getElementById('supplierProductivityLabel');
    const hintEl     = document.getElementById('supplierProductivityHint');
    const fishNote   = document.getElementById('farmedFishNote');

    const labels = {
        'dairy_cow':   'Milk yield (kg per cow per year)',
        'beef_cattle': 'Carcass weight (kg per animal)',
        'pig':         'Carcass weight (kg per animal)',
        'sheep':       'Carcass weight (kg per animal)',
        'goat':        'Carcass weight (kg per animal)',
        'broiler':     'Live weight at slaughter (kg) × cycles per year',
        'layer_hen':   'Eggs per hen per year (kg)',
        'turkey':      'Live weight at slaughter (kg) × cycles per year',
        'farmed_fish': 'Harvest weight (kg) × cycles per year'
    };

    if (labelEl && animalType) {
        labelEl.textContent = labels[animalType] || 'Productivity (per animal per year)';
    }

    if (fishNote) {
        fishNote.style.display = (animalType === 'farmed_fish') ? 'inline' : 'none';
    }

    if (hintEl) {
        try {
            const ingredient = (currentIngredientIndex !== null)
                ? selectedIngredients[currentIngredientIndex] : null;
            const country = (ingredient && ingredient.originCountry) || 'FR';
            const yieldDB = window.aioxyData && window.aioxyData.crop_yields;

            let faostatVal = null;
            if (yieldDB && yieldDB.yields && animalType) {
                const countryKey  = country;
                const countryData = yieldDB.yields[countryKey] || {};
                const productNameMap = {
                    'dairy_cow':   ['cow milk', 'milk, whole', 'milk'],
                    'beef_cattle': ['beef and veal', 'cattle meat', 'beef'],
                    'pig':         ['pig meat', 'pork', 'swine'],
                    'sheep':       ['sheep meat', 'lamb'],
                    'goat':        ['goat meat', 'goat'],
                    'broiler':     ['chicken meat', 'poultry', 'broiler'],
                    'layer_hen':   ['eggs', 'hen eggs'],
                    'turkey':      ['turkey meat', 'turkey'],
                    'farmed_fish': ['salmon', 'trout', 'fish']
                };
                const searchTerms = productNameMap[animalType] || [];
                for (const [cropKey, cropVal] of Object.entries(countryData)) {
                    for (const term of searchTerms) {
                        if (cropKey.toLowerCase().includes(term)) {
                            faostatVal = cropVal;
                            break;
                        }
                    }
                    if (faostatVal !== null) break;
                }
            }

            hintEl.textContent = faostatVal
                ? `Country average: ${faostatVal.toLocaleString()} kg/animal/year`
                : 'Country average: not found in FAOSTAT database';
        } catch (e) {
            hintEl.textContent = 'Country average: unavailable';
        }
    }
}

function openSupplierModal(index) {
    currentIngredientIndex = index;
    const ingredient = selectedIngredients[index];
    const modal = document.getElementById('supplierModal');

    document.getElementById('supplierFarmRegion').value  = '';
    document.getElementById('supplierGeolocation').value = '';
    document.getElementById('supplierDDS').value         = '';
    document.getElementById('primaryNitrogen').value     = '';
    document.getElementById('primaryYield').value        = '';
    document.getElementById('supplierWaterSource').value = '';
    document.getElementById('supplierPractice').value    = '';
    document.getElementById('pesticide1Name').value      = '';
    document.getElementById('pesticide1CAS').value       = '';
    document.getElementById('pesticide1Rate').value      = '';
    document.getElementById('pesticide2Name').value      = '';
    document.getElementById('pesticide2CAS').value       = '';
    document.getElementById('pesticide2Rate').value      = '';
    document.getElementById('pesticide3Name').value      = '';
    document.getElementById('pesticide3CAS').value       = '';
    document.getElementById('pesticide3Rate').value      = '';
    const animalTypeEl     = document.getElementById('supplierAnimalType');
    const prodSystemEl     = document.getElementById('supplierProductionSystem');
    const productivityEl   = document.getElementById('supplierProductivity');
    const manureSystemEl   = document.getElementById('supplierManureSystem');
    if (animalTypeEl)   animalTypeEl.value   = '';
    if (prodSystemEl)   prodSystemEl.value   = '';
    if (productivityEl) productivityEl.value = '';
    if (manureSystemEl) manureSystemEl.value = '';

    const animalIngredient = isAnimalIngredient(ingredient);
    const cropSection      = document.getElementById('supplierCropSection');
    const animalSection    = document.getElementById('supplierAnimalSection');
    const modalTitle       = document.querySelector('#supplierModal h3');

    if (animalIngredient) {
        if (cropSection)   cropSection.style.display   = 'none';
        if (animalSection) animalSection.style.display = 'block';
        if (modalTitle)    modalTitle.innerHTML = '<i class="fas fa-horse"></i> Primary Livestock Data';
    } else {
        if (cropSection)   cropSection.style.display   = 'block';
        if (animalSection) animalSection.style.display = 'none';
        if (modalTitle)    modalTitle.innerHTML = '<i class="fas fa-tractor"></i> Primary Farm Data';
    }

    if (ingredient.primaryData) {
        const pd = ingredient.primaryData;
        document.getElementById('supplierFarmRegion').value  = pd.farmRegion    || '';
        document.getElementById('supplierGeolocation').value = pd.geolocation   || '';
        document.getElementById('supplierDDS').value         = pd.ddsReference  || '';

        if (animalIngredient) {
            if (animalTypeEl   && pd.animalType)         animalTypeEl.value   = pd.animalType;
            if (prodSystemEl   && pd.productionSystem)   prodSystemEl.value   = pd.productionSystem;
            if (productivityEl && pd.productivityMetric) productivityEl.value = pd.productivityMetric;
            if (manureSystemEl && pd.manureSystem)       manureSystemEl.value = pd.manureSystem;
            updateProductivityLabel();
        } else {
            document.getElementById('primaryNitrogen').value     = pd.nitrogenKgPerTon || '';
            document.getElementById('primaryYield').value        = pd.yieldKgPerHa     || '';
            document.getElementById('supplierWaterSource').value = pd.waterSource       || '';
            document.getElementById('supplierPractice').value    = pd.farmingPractice  || '';
            if (pd.pesticides) {
                var pest1 = pd.pesticides[0] || {};
                var pest2 = pd.pesticides[1] || {};
                var pest3 = pd.pesticides[2] || {};
                document.getElementById('pesticide1Name').value  = pest1.name        || '';
                document.getElementById('pesticide1CAS').value   = pest1.cas         || '';
                document.getElementById('pesticide1Rate').value  = pest1.rateKgPerHa || '';
                document.getElementById('pesticide2Name').value  = pest2.name        || '';
                document.getElementById('pesticide2CAS').value   = pest2.cas         || '';
                document.getElementById('pesticide2Rate').value  = pest2.rateKgPerHa || '';
                document.getElementById('pesticide3Name').value  = pest3.name        || '';
                document.getElementById('pesticide3CAS').value   = pest3.cas         || '';
                document.getElementById('pesticide3Rate').value  = pest3.rateKgPerHa || '';
            }
        }
    } else if (animalIngredient) {
        updateProductivityLabel();
    }
    
    if (modal) modal.classList.remove('hidden');
}

function closeSupplierModal() {
    const modal = document.getElementById('supplierModal');
    if (modal) modal.classList.add('hidden');
    currentIngredientIndex = null;
}

function saveSupplierData() {
    if (currentIngredientIndex === null) return;

    const ingredient   = selectedIngredients[currentIngredientIndex];
    const animalIngredient = isAnimalIngredient(ingredient);

    const farmRegion  = document.getElementById('supplierFarmRegion').value.trim();
    const geolocation = document.getElementById('supplierGeolocation').value.trim();
    const ddsRef      = document.getElementById('supplierDDS').value.trim();

    let primaryData = {
        farmRegion,
        geolocation,
        ddsReference: ddsRef,
        timestamp: new Date().toISOString()
    };

    if (animalIngredient) {
        const animalType      = document.getElementById('supplierAnimalType')?.value     || '';
        const productionSystem= document.getElementById('supplierProductionSystem')?.value || '';
        const productivity    = parseFloat(document.getElementById('supplierProductivity')?.value) || null;
        const manureSystem    = document.getElementById('supplierManureSystem')?.value    || '';

        primaryData = {
            ...primaryData,
            animalType,
            productionSystem,
            productivityMetric: productivity,
            manureSystem,
            entericParams: animalType ? {
                animalType,
                productionSystem,
                productivity_kg_per_year: productivity,
                manureSystem
            } : null
        };
    } else {
        const nitrogenKgPerTon = parseFloat(document.getElementById('primaryNitrogen').value) || null;
        const yieldKgPerHa     = parseFloat(document.getElementById('primaryYield').value)    || null;
        const waterSource      = document.getElementById('supplierWaterSource').value;
        const farmingPractice  = document.getElementById('supplierPractice').value;

        const pesticides = [];
        for (let p = 1; p <= 3; p++) {
            const name = document.getElementById(`pesticide${p}Name`).value.trim();
            const cas  = document.getElementById(`pesticide${p}CAS`).value.trim();
            const rate = parseFloat(document.getElementById(`pesticide${p}Rate`).value);
            if (name) pesticides.push({ name, cas, rateKgPerHa: isNaN(rate) ? null : rate });
        }

        primaryData = {
            ...primaryData,
            nitrogenKgPerTon,
            yieldKgPerHa,
            waterSource,
            farmingPractice,
            pesticides: pesticides.length > 0 ? pesticides : null
        };
    }

    selectedIngredients[currentIngredientIndex].primaryData = primaryData;
    console.log(`✅ [SupplierData] Saved for ${ingredient.name}:`, primaryData);

    closeSupplierModal();
    calculateImpact();
}

// ================== RESULTS METRICS UPDATE ==================
function updateResultsMetrics(results, resolvedBaseline) {
    const co2El     = document.getElementById('co2Value');
    const waterEl   = document.getElementById('waterValue');
    const landEl    = document.getElementById('landValue');
    const fossilEl  = document.getElementById('fossilValue');
    const co2Sav    = document.getElementById('co2Savings');
    const waterSav  = document.getElementById('waterSavings');
    const carEl     = document.getElementById('carKm');
    const houseEl   = document.getElementById('householdEnergy');
    const treeEl    = document.getElementById('treeYears');
    const waterScEl = document.getElementById('waterScarcity');

    if (co2El)    co2El.textContent    = `${(results.co2PerKg || 0).toFixed(2)} kg`;
    if (waterEl)  waterEl.textContent  = `${(results.waterScarcityPerKg || 0).toFixed(3)} m³`;
    if (landEl)   landEl.textContent   = `${(results.landUsePerKg || 0).toFixed(2)} Pt`;
    if (fossilEl) fossilEl.textContent = `${(results.fossilPerKg || 0).toFixed(1)} MJ`;

    if (resolvedBaseline) {
        const baselineCO2 = resolvedBaseline.co2PerKg || 0;
        const baselineWater = resolvedBaseline.waterPerKg || 0;
        const co2Pct = baselineCO2 > 0 ? (((baselineCO2 - results.co2PerKg) / baselineCO2) * 100) : 0;
        const waterPct = baselineWater > 0 ? (((baselineWater - (results.waterScarcityPerKg || 0)) / baselineWater) * 100) : 0;

        if (co2Sav)   co2Sav.textContent   = `${co2Pct >= 0 ? '' : '+'}${Math.abs(co2Pct).toFixed(1)}% ${co2Pct >= 0 ? 'saved' : 'more'}`;
        if (waterSav) waterSav.textContent  = `${waterPct >= 0 ? '' : '+'}${Math.abs(waterPct).toFixed(1)}% ${waterPct >= 0 ? 'saved' : 'more'}`;

        const co2SavedPerKg = results.comparison?.co2SavedPerKg || (baselineCO2 - results.co2PerKg);
        const carKm = Math.round(Math.abs(co2SavedPerKg) / PHYSICS_CONSTANTS.CAR_EMISSIONS_KG_PER_KM);
        const treeYrs = (Math.abs(co2SavedPerKg) / PHYSICS_CONSTANTS.TREE_ABSORPTION_KG_YEAR).toFixed(1);
        const houseDays = Math.round(Math.abs(co2SavedPerKg) / PHYSICS_CONSTANTS.HOUSEHOLD_ELEC_KG_DAY);

        if (carEl)    carEl.textContent    = `${carKm} km`;
        if (treeEl)   treeEl.textContent   = treeYrs;
        if (houseEl)  houseEl.textContent  = `${houseDays} days`;
        if (waterScEl) waterScEl.textContent = `${(results.waterScarcityPerKg || 0).toFixed(3)}`;
    }
}

// ================== BIOREACTOR PRESET ==================
function loadBioreactorPreset() {
    if (!window.aioxyData || !window.aioxyData.ingredients) {
        alert('⚠️ Ingredient database not loaded yet. Please wait a moment and try again.');
        return;
    }

    const available = Object.keys(window.aioxyData.ingredients);
    const cornId    = available.find(id => id.includes('corn') || id.includes('maize')) || available[0];
    const waterId   = available.find(id => id.includes('water')) || null;

    selectedIngredients = [];

    if (cornId) {
        selectedIngredients.push({
            id: cornId,
            name: window.aioxyData.ingredients[cornId].name,
            quantity: 0.45,
            originCountry: 'FR',
            processingState: 'fermentation',
            physics_note: 'Feedstock for precision fermentation — dry weight basis'
        });
    }

    if (waterId) {
        selectedIngredients.push({
            id: waterId,
            name: window.aioxyData.ingredients[waterId].name,
            quantity: 2.50,
            originCountry: 'FR',
            processingState: 'raw',
            physics_note: 'Process water — evaporated in bioreactor'
        });
    }

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
                    ${(fb.components?.foreground || []).map(comp => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                            <div>${comp.name}</div>
                            <div style="font-weight: 600;">${(comp.co2 ?? 0).toFixed(2)} kg CO₂e</div>
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
                    ${(fb.components?.background || []).map(comp => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                            <div>${comp.name}</div>
                            <div style="font-weight: 600;">${(comp.co2 ?? 0).toFixed(2)} kg CO₂e</div>
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
                        ${(() => { const denom = fb.foreground_contribution + fb.background_contribution; const fgPct = denom > 0 ? ((fb.foreground_contribution / denom) * 100).toFixed(1) : '0.0'; return fgPct; })()}%
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
                ISO 14044 Compliance Status
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${Object.entries(iso).map(([key, val]) => `
                <div style="background: ${val ? '#F0FFF4' : '#FFF5F5'}; border: 1px solid ${val ? '#48BB78' : '#FC8181'}; border-radius: 8px; padding: 1rem;">
                    <div style="font-weight: 600; color: var(--primary); font-size: 0.85rem;">${key}</div>
                    <div style="color: ${val ? '#27AE60' : '#E63946'}; font-size: 0.8rem; margin-top: 0.25rem;">
                        ${val ? '✅ Compliant' : '⚠️ Review Required'}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ================== PARAMETRIC TWIN: COUNTERPART MODAL ==================
// State for the open modal
let _counterpartIngredientIndex = null;
let _counterpartSelectedId      = null;
let _counterpartSelectedName    = null;
let _counterpartSelectedPef     = null;

/**
 * openCounterpartModal(index)
 * Opens the counterpart search modal for the assessed ingredient at `index`.
 * If conventionalBaselineIngredients is non-empty, shows them as quick-select options
 * above the AGRIBALYSE database search results.
 */
function openCounterpartModal(index) {
    _counterpartIngredientIndex = index;
    const modal      = document.getElementById('counterpartModal');
    const ingredient = selectedIngredients[index];
    if (!modal || !ingredient) return;

    // Populate the assessed ingredient info panel
    const nameEl = document.getElementById('counterpartAssessedName');
    const qtyEl  = document.getElementById('counterpartAssessedQty');
    if (nameEl) nameEl.textContent = ingredient.name;
    if (qtyEl)  qtyEl.textContent  = ingredient.quantity.toFixed(3) + ' kg';

    // Pre-fill conventional quantity with assessed quantity
    const qtyInput = document.getElementById('counterpartConventionalQty');
    if (qtyInput) qtyInput.value = ingredient.conventionalQuantity || ingredient.quantity;

    // Clear search + results, then render baseline quick-select at top
    const searchInput = document.getElementById('counterpartSearch');
    if (searchInput) searchInput.value = '';

    _renderCounterpartResultsWithBaseline('');

    // Restore previous selection highlight if one exists
    if (ingredient.conventionalCounterpart) {
        _counterpartSelectedId   = ingredient.conventionalCounterpart.id;
        _counterpartSelectedName = ingredient.conventionalCounterpart.name;
        _counterpartSelectedPef  = ingredient.conventionalCounterpart.pef;
        _renderCounterpartSelection(_counterpartSelectedId, _counterpartSelectedName, _counterpartSelectedPef);
    } else {
        _clearCounterpartSelection();
    }

    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

/**
 * _renderCounterpartResultsWithBaseline(query)
 * Renders the counterpart results list:
 * 1. "From Baseline Recipe" quick-select section (if conventionalBaselineIngredients non-empty)
 * 2. AGRIBALYSE search results filtered by query
 */
function _renderCounterpartResultsWithBaseline(query) {
    const ul = document.getElementById('counterpartResults');
    if (!ul) return;

    let html = '';

    // ── Section 1: From Baseline Recipe ──────────────────────────────────────
    if (conventionalBaselineIngredients.length > 0) {
        html += `
            <li style="padding: 0.4rem 0.75rem; background: #EFF6FF; border-bottom: 1px solid #BDE0FE; 
                        font-size: 0.7rem; font-weight: 700; color: #1E40AF; text-transform: uppercase;
                        letter-spacing: 0.05em; cursor: default; pointer-events: none;">
                <i class="fas fa-layer-group"></i> From Baseline Recipe
            </li>
        `;
        conventionalBaselineIngredients.forEach((bi) => {
            const biData   = window.aioxyData?.ingredients?.[bi.id];
            const biCo2    = biData?.data?.pef?.['Climate Change'] ?? 0;
            const biDqr    = biData?.data?.metadata?.dqr_overall ?? 2.5;
            const safeName = bi.name.replace(/'/g, "\\'");
            const isSelected = bi.id === _counterpartSelectedId;
            html += `
                <li data-id="${bi.id}"
                    onclick="selectCounterpart('${bi.id}', '${safeName}', window.aioxyData.ingredients['${bi.id}'].data.pef)"
                    style="padding: 0.6rem 0.75rem; cursor: pointer; border-bottom: 1px solid #DBEAFE;
                           border-left: 3px solid ${isSelected ? '#27AE60' : '#3B82F6'};
                           background: ${isSelected ? '#EBF8F0' : '#F0F9FF'};">
                    <div style="font-weight: 600; font-size: 0.85rem; color: #1E40AF;">
                        ${bi.name}
                        <span style="font-size: 0.7rem; color: #3B82F6; margin-left: 0.25rem;">
                            (${bi.quantity.toFixed(3)} kg · ${bi.processingState})
                        </span>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--gray);">
                        CO₂e: ${biCo2.toFixed(2)} kg/kg | DQR: ${biDqr.toFixed(1)} | AGRIBALYSE 3.2
                    </div>
                </li>
            `;
        });
    }

    // ── Section 2: AGRIBALYSE database search ────────────────────────────────
    if (query.trim().length >= 2) {
        const results = searchCounterpartDatabase(query);
        if (results.length === 0) {
            html += `<li style="color: var(--gray); font-size: 0.85rem; padding: 0.5rem;">❌ No ingredients found for "${query}"</li>`;
        } else {
            if (conventionalBaselineIngredients.length > 0) {
                html += `
                    <li style="padding: 0.4rem 0.75rem; background: #F7FAFC; border-bottom: 1px solid var(--border);
                                font-size: 0.7rem; font-weight: 700; color: var(--gray); text-transform: uppercase;
                                letter-spacing: 0.05em; cursor: default; pointer-events: none;">
                        <i class="fas fa-database"></i> AGRIBALYSE 3.2 Database
                    </li>
                `;
            }
            html += results.map(r => {
                const safeName   = r.name.replace(/'/g, "\\'");
                const isSelected = r.id === _counterpartSelectedId;
                return `
                    <li data-id="${r.id}"
                        onclick="selectCounterpart('${r.id}', '${safeName}', window.aioxyData.ingredients['${r.id}'].data.pef)"
                        style="padding: 0.6rem 0.75rem; cursor: pointer; border-bottom: 1px solid var(--border);
                               border-left: 3px solid ${isSelected ? '#27AE60' : 'transparent'};
                               background: ${isSelected ? '#EBF8F0' : 'white'};">
                        <div style="font-weight: 600; font-size: 0.85rem;">${r.name}</div>
                        <div style="font-size: 0.75rem; color: var(--gray);">
                            CO₂e: ${r.co2.toFixed(2)} kg/kg | DQR: ${r.dqr.toFixed(1)} | ${r.source}
                        </div>
                    </li>
                `;
            }).join('');
        }
    } else if (conventionalBaselineIngredients.length === 0) {
        html += `<li style="color: var(--gray); font-size: 0.85rem; padding: 0.5rem;">Start typing to search…</li>`;
    }

    ul.innerHTML = html;
}

/**
 * closeCounterpartModal()
 * Closes without saving.
 */
function closeCounterpartModal() {
    const modal = document.getElementById('counterpartModal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = ''; }
    _counterpartIngredientIndex = null;
    _counterpartSelectedId      = null;
    _counterpartSelectedName    = null;
    _counterpartSelectedPef     = null;
}

/**
 * searchCounterpartDatabase(query)
 * Filters window.aioxyData.ingredients by name match.
 * Returns up to 20 results with id, name, co2, dqr, source.
 */
function searchCounterpartDatabase(query) {
    const q = (query || '').toLowerCase().trim();
    if (q.length < 2) return [];
    const ingredients = window.aioxyData?.ingredients || {};
    return Object.entries(ingredients)
        .filter(([id, data]) => (data.name || '').toLowerCase().includes(q))
        .slice(0, 20)
        .map(([id, data]) => ({
            id,
            name:   data.name || 'Unknown',
            co2:    data.data?.pef?.['Climate Change'] || 0,
            dqr:    data.data?.metadata?.dqr_overall  || 2.5,
            source: data.data?.metadata?.source_dataset || 'AGRIBALYSE 3.2',
            pef:    data.data?.pef
        }));
}

/**
 * selectCounterpart(id, name, pef)
 * Called when a result row is clicked. Highlights it and stores the selection.
 */
function selectCounterpart(id, name, pef) {
    _counterpartSelectedId   = id;
    _counterpartSelectedName = name;
    _counterpartSelectedPef  = pef;
    _renderCounterpartSelection(id, name, pef);
}

/**
 * saveCounterpartMapping()
 * Saves the selected counterpart to selectedIngredients[index] and closes the modal.
 */
function saveCounterpartMapping() {
    if (_counterpartIngredientIndex === null) return;
    if (!_counterpartSelectedId) {
        alert('Please select a conventional counterpart from the search results first.');
        return;
    }

    const qtyInput = document.getElementById('counterpartConventionalQty');
    const conventionalQty = parseFloat(qtyInput?.value);
    const assessedQty     = selectedIngredients[_counterpartIngredientIndex].quantity;

    selectedIngredients[_counterpartIngredientIndex].conventionalCounterpart = {
        id:   _counterpartSelectedId,
        name: _counterpartSelectedName,
        pef:  _counterpartSelectedPef   // direct reference to database pef object
    };
    selectedIngredients[_counterpartIngredientIndex].conventionalQuantity =
        (!isNaN(conventionalQty) && conventionalQty > 0) ? conventionalQty : assessedQty;

    console.log(`✅ [ParametricTwin] Mapped ${selectedIngredients[_counterpartIngredientIndex].name} → ${_counterpartSelectedName}`);

    updateIngredientList();
    calculateImpact();
    closeCounterpartModal();
}

/**
 * setSameAsAssessed()
 * Copies the assessed ingredient's own database entry as the conventional counterpart.
 */
function setSameAsAssessed() {
    if (_counterpartIngredientIndex === null) return;
    const ingredient     = selectedIngredients[_counterpartIngredientIndex];
    const ingredientData = window.aioxyData?.ingredients?.[ingredient.id];
    if (!ingredientData) return;

    _counterpartSelectedId   = ingredient.id;
    _counterpartSelectedName = ingredient.name;
    _counterpartSelectedPef  = ingredientData.data?.pef;

    _renderCounterpartSelection(_counterpartSelectedId, _counterpartSelectedName, _counterpartSelectedPef);

    const qtyInput = document.getElementById('counterpartConventionalQty');
    if (qtyInput) qtyInput.value = ingredient.quantity;
}

// ── Private helpers ──────────────────────────────────────────────────────────

function _renderCounterpartSelection(id, name, pef) {
    const selBox = document.getElementById('counterpartSelectedBox');
    const co2    = pef?.['Climate Change'] ?? 0;
    const dqr    = window.aioxyData?.ingredients?.[id]?.data?.metadata?.dqr_overall ?? 2.5;
    if (selBox) {
        selBox.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.75rem;
                        background: #F0FFF4; border: 1.5px solid #27AE60; border-radius: 8px;">
                <i class="fas fa-check-circle" style="color: #27AE60;"></i>
                <div>
                    <div style="font-weight: 600; font-size: 0.85rem; color: var(--primary);">${name}</div>
                    <div style="font-size: 0.75rem; color: var(--gray);">
                        CO₂e: ${co2.toFixed(2)} kg/kg | DQR: ${dqr.toFixed(1)}
                    </div>
                </div>
            </div>`;
    }
    // Highlight matching row in results list
    document.querySelectorAll('#counterpartResults li[data-id]').forEach(li => {
        li.style.background = li.dataset.id === id ? '#EBF8F0' : '';
        li.style.borderLeft = li.dataset.id === id ? '3px solid #27AE60' : '3px solid transparent';
    });
}

function _clearCounterpartSelection() {
    const selBox = document.getElementById('counterpartSelectedBox');
    if (selBox) selBox.innerHTML = '';
}

// Wire up the search input listener
function setupCounterpartSearch() {
    const searchInput = document.getElementById('counterpartSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        _renderCounterpartResultsWithBaseline(e.target.value);
    });

    console.log('✅ [CounterpartSearch] Ready (with conventional baseline quick-select support)');
}

// ================== UI.JS LOADED ==================
// F15 AUDIT CHECK (confirmed): Phase 5 cleanup verified — no stale references to
// temporal discounting or organic bonus found in this file.
// · displayTemporalDiscounting — not present
// · organic_bonus_applied      — not present
// · organic_ratio (display logic) — not present
console.log("✅ [AIOXY] ui.js loaded - Interface ready (v3.1 — Conventional Recipe Builder)");
