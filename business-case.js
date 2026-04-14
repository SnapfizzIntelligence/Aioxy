// ================== AIOXY BUSINESS CASE v3.0 ==================
// ROI Analysis, Financial Math, and Scenario Modeling
// ===================================================================

// ================== FINANCIAL ROI ENGINE (AUDIT-SAFE) ==================
function calculateHardFinancialMath(results, volume, scenarios) {
    console.log("💰 [Financial Engine] Starting ROI Audit for volume:", volume);

    // 1. DATA INTEGRITY: Use Unified Metrics (Single Source of Truth)
    const unified = getUnifiedMetrics(results?.finalPefResults || finalPefResults, massBalanceData);
    const productWeightKg = unified.weightUsed;
    const currentCo2PerKg = unified.co2PerKg;
    const currentFossilPerKg = unified.fossilPerKg;

    // 2. REGULATOR FIX: STRICT BASELINE MATCHING
    let baselineCo2PerKg, baselineFossilPerKg;

    if (currentComparisonBaseline && currentComparisonBaseline.co2PerKg > 0) {
        baselineCo2PerKg = currentComparisonBaseline.co2PerKg;
        baselineFossilPerKg = currentComparisonBaseline.fossilPerKg || (baselineCo2PerKg * 0.7);
    } else {
        console.warn("⚠️ [Compliance] No Baseline Selected. Comparing to Self (Zero Savings) to avoid false claims.");
        baselineCo2PerKg = currentCo2PerKg;
        baselineFossilPerKg = currentFossilPerKg;
    }

    // 3. CALCULATE SAVINGS (No Negative Savings)
    const co2SavedPerKg = Math.max(0, baselineCo2PerKg - currentCo2PerKg);
    const fossilSavedPerKg = Math.max(0, baselineFossilPerKg - currentFossilPerKg);

    // REGULATOR FIX: Extract Biogenic Removals for separate financial valuation (Insetting)
    const removalsPerKg = (results?.finalPefResults?.["Climate Change"]?.biogenic_removals || 0) / productWeightKg;

    const totalCo2SavedKg = co2SavedPerKg * volume * productWeightKg;
    const totalFossilSavedMJ = fossilSavedPerKg * volume * productWeightKg;
    const totalRemovalsKg = removalsPerKg * volume * productWeightKg;

    // 4. DEFENSIBLE FINANCIAL CONSTANTS (2025/2026 AUDIT VALUES)
    const COST_CONSTANTS = {
        CARBON_PRICE_EUR_TON: 85.00,
        ENERGY_PRICE_EUR_MJ: 0.04,
        DIESEL_PRICE_EUR_LITER: 1.75
    };

    const moneyCarbon = ((totalCo2SavedKg + totalRemovalsKg) / 1000) * COST_CONSTANTS.CARBON_PRICE_EUR_TON;
    const moneyEnergy = totalFossilSavedMJ * COST_CONSTANTS.ENERGY_PRICE_EUR_MJ;

    // 5. LOGISTICS AUDIT (GLEC FRAMEWORK SIMPLIFIED)
    const transportMode = document.getElementById('transportMode')?.value || 'road';
    const isLocal = scenarios && scenarios.local;
    const isLightweight = scenarios && scenarios.lightweight;

    const userDistance = parseFloat(document.getElementById('transportDistance')?.value) || 300;
    const distanceBaseline = userDistance;
    const distanceOptimized = isLocal ? 50 : userDistance;

    const packagingWeight = parseFloat(document.getElementById('packagingWeight')?.value) || 0.05;
    const pkgWeightOptimized = isLightweight ? packagingWeight * 0.8 : packagingWeight;

    const massBaselineTon = (productWeightKg + packagingWeight) / 1000;
    const massOptimizedTon = (productWeightKg + pkgWeightOptimized) / 1000;

    const tonKmBaseline = massBaselineTon * distanceBaseline * volume;
    const tonKmOptimized = massOptimizedTon * distanceOptimized * volume;

    let fuelEfficiency = 0.03;
    if (transportMode === 'sea') fuelEfficiency = 0.004;
    else if (transportMode === 'rail') fuelEfficiency = 0.008;

    const dieselLitersSaved = Math.max(0, (tonKmBaseline - tonKmOptimized) * fuelEfficiency);
    const moneyFuel = dieselLitersSaved * COST_CONSTANTS.DIESEL_PRICE_EUR_LITER;
    const totalMoney = moneyEnergy + moneyFuel;

    console.log(`✅ [ROI Calculated] Total: €${totalMoney.toFixed(2)} (C: €${moneyCarbon} | E: €${moneyEnergy} | F: €${moneyFuel})`);

    return {
        moneyCarbon,
        moneyEnergy,
        moneyFuel,
        total: totalMoney,
        metrics: {
            totalTonsCo2Saved: totalCo2SavedKg / 1000,
            totalMJSaved: totalFossilSavedMJ,
            fuelLitersSaved: dieselLitersSaved,
            co2SavedPerKg,
            fossilSavedPerKg,
            baselineUsed: baselineCo2PerKg.toFixed(2),
            totalRemovalsKg: totalRemovalsKg
        }
    };
}

// ================== UPDATE FINANCIAL LEDGER (CRASH FIX + AUDIT READY) ==================
function updateHardFinancialLedger(financialResults, volume) {
    const tbody = document.getElementById('ledgerBody');
    if (!tbody) return;

    const { moneyCarbon, moneyFuel, moneyEnergy, metrics } = financialResults;

    const realCashSavings = moneyEnergy + moneyFuel;

    tbody.innerHTML = `
    <tr>
        <td>
            <strong>🛡️ Scope 3 Liability Buffer</strong><br>
            <small>Internal Carbon Pricing / Shadow Cost (€85/t)</small>
        </td>
        <td>-${metrics.totalTonsCo2Saved.toFixed(1)} tons</td>
        <td class="money-positive" style="color: #2c3e50;">€${moneyCarbon.toFixed(2)}</td> 
    </tr>
    <tr>
        <td>
            <strong>⚡ Energy OPEX</strong><br>
            <small>Direct Fossil Fuel Reduction</small>
        </td>
        <td>-${Math.round(metrics.totalMJSaved).toLocaleString()} MJ</td>
        <td class="money-positive" style="font-weight:bold; color: #27ae60;">+€${moneyEnergy.toFixed(2)}</td>
    </tr>
    <tr>
        <td>
            <strong>🚚 Logistics Fuel</strong><br>
            <small>Transport Optimization Savings</small>
        </td>
        <td>-${Math.round(metrics.fuelLitersSaved).toLocaleString()} L Diesel</td>
        <td class="money-positive" style="font-weight:bold; color: #27ae60;">+€${moneyFuel.toFixed(2)}</td>
    </tr>
`;

    const totalBenefit = document.getElementById('totalBenefit');
    if (totalBenefit) {
        totalBenefit.innerHTML = `
            €${realCashSavings.toFixed(2)} 
            <div style="font-size: 0.8rem; color: var(--gray); font-weight: normal; margin-top: 0.25rem;">
                Direct OPEX savings • Excludes avoided carbon tax
            </div>
        `;
    }
}

// ================== UPDATE BUSINESS CASE (FIXED) ==================
function updateBusinessCase() {
    console.log("🔄 [UNIFIED] Business Case Update");

    if (!finalPefResults || Object.keys(finalPefResults).length === 0 ||
        !finalPefResults["Climate Change"] || finalPefResults["Climate Change"].total === 0) {

        console.log('⚠️ No valid physics data found, attempting to calculate...');

        if (selectedIngredients.length > 0) {
            calculateImpact();
            setTimeout(() => {
                console.log('🔄 Retrying business case after physics calculation...');
                updateBusinessCase();
            }, 500);
            return;
        } else {
            console.log('⚠️ No ingredients available, using demo data...');
            setupDemoData();
            setTimeout(() => {
                calculateImpact();
                setTimeout(updateBusinessCase, 800);
            }, 300);
            return;
        }
    }

    const unified = getUnifiedMetrics(finalPefResults, massBalanceData);
    const volume = currentAnnualVolume;

    const businessResults = {
        finalPefResults: finalPefResults,
        finalContentWeight: unified.weightUsed,
        co2PerKg: unified.co2PerKg,
        fossilPerKg: unified.fossilPerKg
    };

    let scenarioAdjustedResults = businessResults;
    if (Object.values(activeScenarios).some(v => v)) {
        console.log('🔧 Applying physics scenarios:', activeScenarios);
        scenarioAdjustedResults = {
            ...businessResults,
            finalPefResults: validateAndApplyScenarios({
                finalPefResults: finalPefResults,
                finalContentWeight: unified.weightUsed
            }, activeScenarios)
        };
        const scenarioUnified = getUnifiedMetrics(scenarioAdjustedResults.finalPefResults, massBalanceData);
        scenarioAdjustedResults.co2PerKg = scenarioUnified.co2PerKg;
        scenarioAdjustedResults.fossilPerKg = scenarioUnified.fossilPerKg;
    }

    const financialResults = calculateHardFinancialMath(scenarioAdjustedResults, volume, activeScenarios);
    console.log('💰 Financial results:', financialResults);

    const discountedROI = calculateDiscountedROI(financialResults, volume);
    const implementationCost = calculateImplementationCost(volume);

    document.getElementById('roiValue').textContent = discountedROI.npvROI + '% (NPV)';
    document.getElementById('roiBadge').textContent = 'Shadow Pricing @ €85/t';

    document.getElementById('savingsValue').textContent = "€" + formatLargeNumber(financialResults.total);
    document.getElementById('implementationCost').textContent = '€' + formatLargeNumber(implementationCost);

    document.getElementById('netReturnDisplay').textContent = '€' + discountedROI.totalDiscounted;
    document.getElementById('totalBenefitDisplay').textContent = '€' + discountedROI.totalDiscounted;
    document.getElementById('carbonReductionDisplay').textContent = formatLargeNumber(financialResults.metrics.totalTonsCo2Saved) + ' tons CO₂e';

    const currentCO2 = scenarioAdjustedResults.co2PerKg;
    const baselineCO2 = currentComparisonBaseline ? currentComparisonBaseline.co2PerKg : currentCO2;
    const rawCo2ReductionPercent = baselineCO2 > 0 ? ((baselineCO2 - currentCO2) / baselineCO2) * 100 : 0;

    const marketGrowthPct = Math.min(Math.max(0, rawCo2ReductionPercent) * 2, 40);
    const premiumPct = Math.min(Math.max(0, rawCo2ReductionPercent) * 1.5, 25);

    document.getElementById('premiumValue').textContent = premiumPct.toFixed(1) + "%";
    document.getElementById('marketValue').textContent = marketGrowthPct.toFixed(1) + "%";

    updateHardFinancialLedgerWithCredits(financialResults, volume);
    addCarbonCreditCard(discountedROI);
    updateBusinessStory(financialResults, parseFloat(discountedROI.npvROI), volume, rawCo2ReductionPercent);

    console.log('✅ [UNIFIED] Business case updated with discounted ROI & carbon credits');
}

// ================== UPDATE BUSINESS STORY ==================
function updateBusinessStory(financialResults, roi, volume, co2ReductionPercent) {
    const businessStory = document.getElementById('businessStory');
    if (!businessStory) {
        console.log('❌ businessStory element not found!');
        return;
    }

    const safeReduction = co2ReductionPercent;
    const absReduction = Math.abs(safeReduction);
    const isBetter = safeReduction >= 0;

    const safeTotal = financialResults.total;
    const scale = getBusinessScale(volume);

    const performanceColor = isBetter ? "var(--secondary)" : "#E63946";
    const performanceText = isBetter ? `↓ ${absReduction.toFixed(1)}% lower` : `↑ ${absReduction.toFixed(1)}% higher`;
    const bgColor = isBetter ? "rgba(0, 212, 170, 0.1)" : "rgba(230, 57, 70, 0.1)";

    businessStory.innerHTML = `
    <div class="story-highlight" style="background: ${bgColor}; border-left-color: ${performanceColor};">
        <i class="fas fa-${getBusinessIcon(scale)}" style="color: ${performanceColor};"></i>
        <strong style="color: var(--primary);">${scale} Strategic Assessment - Modeled Performance Analysis</strong><br>
        PEF 3.1 modeling indicates a <strong style="color: ${performanceColor};">${performanceText}</strong> carbon footprint vs ${currentComparisonBaseline?.name || 'industry'} baseline.
        
        <div style="margin-top: 0.75rem; font-size: 0.9rem; background: rgba(255, 255, 255, 0.5); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(0,0,0,0.05);">
            <strong>Modeled Annual Financial Implications:</strong><br>
            • Scope 3 Liability Buffer: €${financialResults.moneyCarbon.toFixed(0)} (@€85/t shadow price)<br>
            • Operational Efficiency Potential: €${(financialResults.moneyEnergy + financialResults.moneyFuel).toFixed(0)}<br>
            • Total Modeled Value: €${formatLargeNumber(safeTotal)} at ${getVolumeTier(volume)} scale
        </div>
    </div> 
    <p style="margin: 1rem 0; line-height: 1.6;">
        <strong>📊 Modeled Value Driver Analysis:</strong><br>
        • <strong>Scope 3 Exposure Management:</strong> €${financialResults.moneyCarbon.toFixed(2)} (shadow pricing analysis @ €85/t CO₂e)<br>
        • <strong>Energy Efficiency Modeling:</strong> €${financialResults.moneyEnergy.toFixed(2)} via ${formatLargeNumber(financialResults.metrics.totalMJSaved)} MJ reduction potential<br>
        • <strong>Logistics Optimization Modeling:</strong> €${financialResults.moneyFuel.toFixed(2)} via ${formatLargeNumber(financialResults.metrics.fuelLitersSaved)} L diesel reduction potential<br>
        <br>
        <strong>📈 Investment Analysis:</strong> Modeled ROI of ${roi.toFixed(0)}% over 3 years—based on operational efficiency and compliance risk reduction modeling.
    </p>
    
    <div class="story-highlight" style="background: rgba(0, 212, 170, 0.1); border-left-color: var(--secondary);">
        <i class="fas fa-chart-line" style="color: var(--secondary);"></i>
        <strong>Market Positioning Analysis:</strong><br>
        Modeled ~${safeReduction.toFixed(1)}% lower footprint supports strategic positioning with retailers implementing Scope 3 emissions reporting.
    </div>
    
    <div class="story-highlight" style="background: rgba(10, 37, 64, 0.1); border-left-color: var(--primary);">
        <i class="fas fa-balance-scale" style="color: var(--primary);"></i>
        <strong>Compliance & Transparency Assessment:</strong><br>
        PEF 3.1 methodology provides structured data for stakeholder reporting. Transparent environmental assessment supports informed decision-making and risk management.
    </div>
    
    <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(255, 243, 224, 0.9); border-left: 4px solid #E65100; border-radius: 4px; font-size: 0.8rem; color: #5D4037;">
        <i class="fas fa-exclamation-triangle" style="color: #E65100;"></i>
        <strong style="color: #BF360C;">Methodology Note:</strong> Analysis based on PEF 3.1 methodology with AGRIBALYSE 3.2 secondary data. For certified claims or product labeling, conduct ISO 14044 critical review with primary data.
    </div>
    `;

    console.log('✅ Business Story updated: €' + safeTotal.toFixed(0) + ' modeled value, ~' + safeReduction + '% footprint reduction potential');
}

// =========== FIX: DISCOUNTED ROI WITH VOLUME SCALING ===========
function calculateDiscountedROI(financialResults, volume, timeHorizon = 3) {
    console.log("💰 Calculating discounted ROI with physics...", {
        volume: volume,
        hasMetrics: !!financialResults.metrics,
        tonsSaved: financialResults.metrics?.totalTonsCo2Saved
    });

    if (!financialResults || !financialResults.total || !financialResults.metrics) {
        console.warn("⚠️ Missing financial results, using defaults");
        return {
            npvBenefit: "0",
            npvROI: "0",
            carbonCredits: "0",
            premiumScaled: "0",
            totalDiscounted: "0",
            discountRate: "3% (AR5 social rate)"
        };
    }

    const { total: annualBenefit, metrics } = financialResults;
    const implementationCost = calculateImplementationCost(volume);

    const discountRate = 0.03;
    let npvBenefit = 0;
    for (let year = 1; year <= timeHorizon; year++) {
        npvBenefit += annualBenefit * Math.pow(1 + discountRate, -year);
    }

    const npvROI = implementationCost > 0 ? (npvBenefit - implementationCost) / implementationCost * 100 : 0;

    const totalRemovalsTons = (metrics.totalRemovalsKg || 0) / 1000;
    const creditRevenue = ((metrics.totalTonsCo2Saved || 0) + totalRemovalsTons) * 85;

    const baselineUsed = parseFloat(metrics.baselineUsed) || 1;
    const dynamicReductionPct = baselineUsed > 0 ? (metrics.co2SavedPerKg / baselineUsed) * 100 : 0;
    const premiumMultiplier = 1 + Math.min(dynamicReductionPct / 100 * 1.67, 0.25);
    const discountedPremium = annualBenefit * premiumMultiplier;

    console.log("✅ Discounted ROI:", {
        volume: volume,
        annualBenefit: annualBenefit,
        tonsSavedTotal: metrics.totalTonsCo2Saved,
        creditRevenue: creditRevenue,
        npvBenefit: npvBenefit,
        creditRevenuePerTon: creditRevenue / (metrics.totalTonsCo2Saved || 1)
    });

    return {
        npvBenefit: npvBenefit.toFixed(0),
        npvROI: Math.max(npvROI, 0).toFixed(1),
        carbonCredits: Math.round(creditRevenue).toFixed(0),
        totalDiscounted: npvBenefit.toFixed(0),
        discountRate: `${(discountRate * 100).toFixed(1)}% (AR5 social rate)`
    };
}

// =========== FIX: LIABILITY CARD AUTO-UPDATE ===========
function addCarbonCreditCard(discountedROI) {
    const businessMetrics = document.querySelector('.business-metrics');
    if (!businessMetrics) return;

    let creditCard = document.getElementById('carbonCreditCard');

    if (!creditCard) {
        creditCard = document.createElement('div');
        creditCard.className = 'business-card';
        creditCard.id = 'carbonCreditCard';
        businessMetrics.appendChild(creditCard);
    }

    creditCard.innerHTML = `
        <i class="fas fa-shield-alt" style="font-size: 2rem; color: var(--secondary); margin-bottom: 1rem;"></i>
        <div class="business-value">€${formatLargeNumber(discountedROI.carbonCredits)}</div>
        <div class="business-label">Future Liability Buffer</div>
        <div class="roi-badge" style="margin-top: 0.5rem;">Shadow Pricing @ €85/t</div>
    `;
}

// =========== UPDATE HARD FINANCIAL LEDGER WITH CREDITS ===========
function updateHardFinancialLedgerWithCredits(financialResults, volume) {
    const tbody = document.getElementById('ledgerBody');
    if (!tbody) return;

    const { moneyCarbon, moneyFuel, moneyEnergy, metrics } = financialResults;

    const ledgerContainer = tbody.closest('.business-case') || tbody.parentNode.parentNode.parentNode;
    if (ledgerContainer && !document.getElementById('financeDisclaimer')) {
        const disclaimer = document.createElement('div');
        disclaimer.id = 'financeDisclaimer';
        disclaimer.style = "background: #FFF3E0; border-left: 4px solid #FF9800; padding: 1rem; margin: 1rem 0; border-radius: 8px; font-size: 0.85rem;";
        disclaimer.innerHTML = `<strong>⚠️ Carbon Pricing Note:</strong> Values shown are internal shadow pricing estimates (€85/t CO₂e proxy) representing potential future Scope 3 buyer liability or risk exposure. They do not represent guaranteed regulatory cash savings.`;
        tbody.parentNode.parentNode.insertBefore(disclaimer, tbody.parentNode.nextSibling);
    }

    tbody.innerHTML = `
    <tr style="background-color: #F0FFF4;">
        <td>
            <strong>⚡ Energy OPEX Efficiency</strong><br>
            <small>Direct cash savings via physics optimization</small>
        </td>
        <td>-${Math.round(metrics.totalMJSaved).toLocaleString()} MJ</td>
        <td class="money-positive" style="color: #276749;">+€${moneyEnergy.toFixed(2)}</td>
    </tr>
    <tr style="background-color: #F0FFF4;">
        <td>
            <strong>🚚 Logistics Fuel Efficiency</strong><br>
            <small>Transport optimization savings</small>
        </td>
        <td>-${Math.round(metrics.fuelLitersSaved).toLocaleString()} L Diesel</td>
        <td class="money-positive" style="color: #276749;">+€${moneyFuel.toFixed(2)}</td>
    </tr>
    <tr style="border-top: 2px solid #E2E8F0;">
        <td>
            <strong>🛡️ Carbon Liability Risk + Removals</strong><br>
            <small>Avoided tax exposure (€85/t) + Value of Biogenic Removals</small>
        </td>
        <td>-${((metrics.totalTonsCo2Saved || 0) + ((metrics.totalRemovalsKg || 0) / 1000)).toFixed(1)} tons</td>
        <td style="color: #718096; font-style: italic;">(€${moneyCarbon.toFixed(2)})</td>
    </tr>
    `;

    const totalBenefit = document.getElementById('totalBenefit');
    if (totalBenefit) {
        const realCashSavings = moneyEnergy + moneyFuel;
        totalBenefit.innerHTML = `
            €${realCashSavings.toFixed(2)} 
            <div style="font-size: 0.8rem; color: var(--gray); font-weight: normal; margin-top: 0.25rem;">
                Direct operational savings only
            </div>
        `;
    }
}

// ================== SCENARIO TOGGLE (REGULATOR FIX: DECOUPLED FROM BASELINE) ==================
function toggleScenario(key) {
    activeScenarios[key] = !activeScenarios[key];

    const btn = document.getElementById(`scenario-${key}`);
    if (btn) btn.classList.toggle('active');

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

    const currentData = window.finalPefResults ? { co2PerKg: getUnifiedMetrics(window.finalPefResults, window.massBalanceData).co2PerKg } : { co2PerKg: 0 };
    const businessCase = calculateScalableBusinessCase(currentData, volume);

    scaleDisplay.textContent = businessCase.businessScale;
    tierDisplay.textContent = businessCase.volumeTier;
}

function calculateScalableBusinessCase(results, annualVolume) {
    const co2PerKg = results.co2PerKg || 0;
    const baselineCO2PerKg = currentComparisonBaseline ? currentComparisonBaseline.co2PerKg : co2PerKg;
    const co2Reduction = Math.max(baselineCO2PerKg - co2PerKg, 0);
    const reductionPercentage = baselineCO2PerKg > 0 ? (co2Reduction / baselineCO2PerKg) * 100 : 0;

    let implementationCost, carbonPrice, premiumPotential, marketGrowth;

    if (annualVolume <= 1000) {
        implementationCost = 1000;
        carbonPrice = 30;
        premiumPotential = reductionPercentage * 0.3;
        marketGrowth = Math.min(reductionPercentage * 1.5, 15);
    } else if (annualVolume <= 10000) {
        implementationCost = 5000;
        carbonPrice = 40;
        premiumPotential = reductionPercentage * 0.4;
        marketGrowth = Math.min(reductionPercentage * 1.8, 20);
    } else if (annualVolume <= 100000) {
        implementationCost = 20000;
        carbonPrice = 50;
        premiumPotential = reductionPercentage * 0.5;
        marketGrowth = Math.min(reductionPercentage * 2.0, 25);
    } else if (annualVolume <= 1000000) {
        implementationCost = 50000;
        carbonPrice = 60;
        premiumPotential = reductionPercentage * 0.6;
        marketGrowth = Math.min(reductionPercentage * 2.2, 30);
    } else if (annualVolume <= 10000000) {
        implementationCost = 200000;
        carbonPrice = 70;
        premiumPotential = reductionPercentage * 0.7;
        marketGrowth = Math.min(reductionPercentage * 2.5, 35);
    } else {
        implementationCost = 1000000;
        carbonPrice = 80;
        premiumPotential = reductionPercentage * 0.8;
        marketGrowth = Math.min(reductionPercentage * 3.0, 40);
    }

    const totalCarbonReduction = co2Reduction * annualVolume;
    const carbonSavings = (totalCarbonReduction * carbonPrice) / 1000;

    const priceInput = document.getElementById('wholesalePrice');
    const basePricePerKg = priceInput ? parseFloat(priceInput.value) || 10 : 10;

    const premiumRevenue = (premiumPotential / 100) * (annualVolume * basePricePerKg);
    const totalMarketSize = annualVolume * 10;
    const marketShareValue = (marketGrowth / 100) * totalMarketSize * basePricePerKg * 0.1;

    const totalAnnualBenefit = carbonSavings + premiumRevenue + marketShareValue;
    const roi = annualVolume > 0 ? ((totalAnnualBenefit * 3) - implementationCost) / implementationCost * 100 : 0;

    return {
        roi: Math.max(roi, -100),
        annualSavings: carbonSavings,
        premiumRevenue: premiumRevenue,
        marketShareValue: marketShareValue,
        totalAnnualBenefit: totalAnnualBenefit,
        carbonReduction: totalCarbonReduction,
        implementationCost: implementationCost,
        businessScale: getBusinessScale(annualVolume),
        volumeTier: getVolumeTier(annualVolume)
    };
}

function calculateImplementationCost(volume) {
    if (volume <= 10000) return 3500;
    if (volume <= 100000) return 15000;
    if (volume <= 1000000) return 45000;
    if (volume <= 10000000) return 150000;
    if (volume <= 100000000) return 450000;
    return 1200000;
}

// ================== UTILITY FUNCTIONS ==================
function getBusinessScale(volume) {
    if (volume <= 1000) return "Prototype / Small Batch";
    if (volume <= 10000) return "Small Business";
    if (volume <= 100000) return "Growing Business";
    if (volume <= 1000000) return "Medium Enterprise";
    if (volume <= 10000000) return "Large Enterprise";
    if (volume <= 100000000) return "Major Corporation";
    return "Global Corporation";
}

function getVolumeTier(volume) {
    const tiers = [
        { max: 1000, label: "1-1K" },
        { max: 10000, label: "1K-10K" },
        { max: 100000, label: "10K-100K" },
        { max: 1000000, label: "100K-1M" },
        { max: 10000000, label: "1M-10M" },
        { max: 100000000, label: "10M-100M" },
        { max: 1000000000, label: "100M-1B" },
        { max: 10000000000, label: "1B+" }
    ];

    return tiers.find(tier => volume <= tier.max)?.label || "1B+";
}

function getBusinessIcon(scale) {
    const icons = {
        "Prototype / Small Batch": "flask",
        "Small Business": "store",
        "Growing Business": "seedling",
        "Medium Enterprise": "building",
        "Large Enterprise": "city",
        "Major Corporation": "globe-americas",
        "Global Corporation": "globe"
    };
    return icons[scale] || "chart-line";
}

function formatLargeNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return Math.round(num).toLocaleString();
    }
}

// ================== FIX: ROBUST PERCENTAGE CALCULATOR ==================
function calculateCO2ReductionPercent() {
    console.log('🔍 Calculating CO2 Reduction...');

    if (!currentComparisonBaseline) return 0;
    if (!finalPefResults || !finalPefResults["Climate Change"]) return 0;

    const productWeightKg = massBalanceData?.final_content_weight_kg || 0.2;
    if (productWeightKg <= 0) return 0;

    let currentTotal = finalPefResults["Climate Change"].total;
    if (isNaN(currentTotal)) currentTotal = 0;
    const currentCO2 = currentTotal / productWeightKg;

    const baselineCO2 = currentComparisonBaseline?.co2PerKg || currentCO2;

    console.log('CO2 Values:', {
        baselineCO2,
        currentCO2,
        productWeightKg
    });

    if (baselineCO2 <= 0) return 0;

    const reductionPercent = ((baselineCO2 - currentCO2) / baselineCO2 * 100);
    const safePercent = Math.max(0, Math.min(reductionPercent, 99.9));

    return safePercent;
}

// ================== BUSINESS CASE LOADED ==================
console.log("✅ [AIOXY] business-case.js loaded - ROI engine ready");
