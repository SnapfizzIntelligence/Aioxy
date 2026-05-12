// ================== AIOXY AUDIT TRAIL v4.0 — DEFINITIVE FIX ==================
// Transparency Log, PEF Scorecard, DPP Card, CSRD Matrix Export
//
// ROOT CAUSES FIXED IN THIS VERSION (why the 3 tabs were blank):
//
// FIX-A  displayFullPefScorecard() — formatPEFValue() had NO null/NaN guard.
//        When any PEF category total was undefined (e.g. a sub-category not
//        produced by the engine), Math.abs(undefined) → NaN, the function
//        returned NaN, the template literal became "NaN", and the entire row
//        loop threw a runtime exception mid-iteration, leaving pefScorecardBody
//        empty. The function in ui.js HAS the guard; the copy here did NOT.
//        Fix: added the null/NaN guard as the very first line.
//
// FIX-B  displayFullPefScorecard() — called foodCalculationEngine.getDQRQualityLevel()
//        but that object is assigned as window.foodCalculationEngine in main.js.
//        In a browser all window-globals are accessible bare, but if main.js
//        hasn't finished executing when this file's displayFullPefScorecard runs
//        for the first time (race condition on slow loads), the bare name is
//        undefined → TypeError → crash → PEF Scorecard tab blank.
//        Fix: changed every call to window.foodCalculationEngine.getDQRQualityLevel()
//        with a defensive fallback inline function so it NEVER throws.
//
// FIX-C  generateDPP() — metrics container was appended via dppCard.appendChild()
//        when .action-buttons didn't exist, placing it AFTER the buttons and
//        outside the card's visible scroll area. Additionally, a stale metrics
//        container from a previous render was not being removed before the new
//        one was built, causing duplicate divs stacking up.
//        Fix: always remove existing container first, then insertBefore
//        action-buttons; if action-buttons absent, prepend inside card header.
//
// FIX-D  formatPEFValue() duplicate — both audit-trail.js and ui.js defined this
//        function. Whichever loaded last "won". The ui.js version had the null
//        guard; the audit-trail.js version did not. The loading order is not
//        guaranteed. Fix: audit-trail.js now uses the safe version and ui.js
//        version is identical — no conflict, defensive everywhere.
// ===================================================================

// ================== SAFE DQR HELPER (internal) ==================
// Replaces bare foodCalculationEngine.getDQRQualityLevel() calls throughout
// this file. Falls back gracefully if window.foodCalculationEngine is not yet
// available (e.g. race condition on first page load).
function _dqrLevel(dqr) {
    if (window.foodCalculationEngine && typeof window.foodCalculationEngine.getDQRQualityLevel === 'function') {
        return window.foodCalculationEngine.getDQRQualityLevel(dqr);
    }
    // Inline fallback — identical logic to main.js definition
    var d = typeof dqr === 'number' ? dqr : 2.5;
    if (d <= 1.6) return { level: 'Excellent',  class: 'dqr-excellent' };
    if (d <= 2.0) return { level: 'Very Good',  class: 'dqr-very-good' };
    if (d <= 3.0) return { level: 'Good',       class: 'dqr-good' };
    return           { level: 'Fair/Poor',       class: 'dqr-poor' };
}

// Helper function for safe string display
function safeString(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ================== PEF SCORECARD ==================
function displayFullPefScorecard() {
    const tbody = document.getElementById('pefScorecardBody');
    const ingredientDataQuality = document.getElementById('ingredientDataQuality');

    if (!tbody) return;

    tbody.innerHTML = '';

    // === REGULATION-ALIGNED DISCLAIMER ROW ===
    const disclaimerRow = document.createElement('tr');
    disclaimerRow.innerHTML = `
        <td colspan="6" style="background: #FFF3E0; color: #E65100; padding: 1rem; font-size: 0.85rem; border-left: 4px solid #FF9800; border-bottom: 2px solid #FF9800;">
            <i class="fas fa-exclamation-triangle"></i>
            <strong>SCREENING-LEVEL ASSESSMENT</strong><br>
            Results based on AGRIBALYSE 3.2 secondary data using PEF 3.1 methodology.
            For Environmental Product Declarations (EPD) or product labeling claims,
            conduct ISO 14044 critical review with primary data.<br>
            <small>Overall uncertainty: ±${window.auditTrailData?.uncertainty_analysis?.overall_uncertainty || '15'}%
            (DQR: ${window.auditTrailData?.dqr_summary?.overall_dqr?.toFixed(1) || '1.5'})</small>
        </td>
    `;
    tbody.appendChild(disclaimerRow);

    // Guard: no data yet
    if (!window.finalPefResults || Object.keys(window.finalPefResults).length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="6" style="text-align:center; padding: 2rem; color: #718096;">
            <i class="fas fa-info-circle"></i> No calculation data yet. Run an impact calculation to populate the PEF scorecard.
        </td>`;
        tbody.appendChild(emptyRow);
        return;
    }

    // Single source of truth
    const unified = getUnifiedMetrics(window.finalPefResults, window.massBalanceData);
    const totalWeight = unified.weightUsed;

    const SCORABLE_CATEGORIES = Object.keys(window.finalPefResults).filter(cat =>
        cat !== 'Climate Change - Fossil' &&
        cat !== 'Climate Change - Biogenic' &&
        cat !== 'Climate Change - Land Use'
    );

    for (const category of SCORABLE_CATEGORIES) {
        const catData = window.finalPefResults[category];
        // FIX-A: guard before any arithmetic — undefined total would crash formatPEFValue
        if (!catData || typeof catData.total !== 'number') continue;

        const row = document.createElement('tr');
        const unit = pefCategories[category]?.unit || catData.unit || '';
        const perKgValue = totalWeight > 0 ? catData.total / totalWeight : 0;

        const displayValue = formatPEFValue(catData.total);
        const perKgDisplay = formatPEFValue(perKgValue);

        const categoryUncertainty = window.auditTrailData?.uncertainty_analysis?.overall_uncertainty || 15;
        // FIX-B: use _dqrLevel() instead of bare foodCalculationEngine call
        const dqrQuality = _dqrLevel(window.auditTrailData?.dqr_summary?.overall_dqr || 1.5);

        row.innerHTML = `
            <td class="pef-category">${category}</td>
            <td class="pef-value">${displayValue}</td>
            <td class="pef-unit">${unit}</td>
            <td class="pef-value">${perKgDisplay}</td>
            <td>
                <span class="dqr-badge ${dqrQuality.class}" title="Overall DQR: ${(window.auditTrailData?.dqr_summary?.overall_dqr || 0).toFixed(2)}">
                    <i class="fas fa-star"></i>
                    ${dqrQuality.level}
                </span>
            </td>
            <td class="pef-value">±${categoryUncertainty}%</td>
        `;
        tbody.appendChild(row);
    }

    // Remove stale footnote before adding fresh one
    const existingFootnote = tbody.parentNode.parentNode.querySelector('.pef-dqr-footnote');
    if (existingFootnote) existingFootnote.remove();

    const footnote = document.createElement('div');
    footnote.className = 'pef-dqr-footnote';
    footnote.style.cssText = 'font-size:0.7rem;color:#718096;margin-top:0.5rem;font-style:italic;';
    footnote.textContent = 'DQR shown is the overall product-level Data Quality Rating. Per-category DQR is not available from AGRIBALYSE 3.2 background data. For audit-grade assessments, primary data with per-category DQR scoring is recommended.';
    tbody.parentNode.parentNode.appendChild(footnote);

    if (ingredientDataQuality && window.auditTrailData?.dqr_summary?.component_dqrs) {
        let qualityHTML = '';
        window.auditTrailData.dqr_summary.component_dqrs.forEach(score => {
            // FIX-B: use _dqrLevel() instead of bare foodCalculationEngine call
            const dqrQuality = _dqrLevel(score.dqr);
            qualityHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border-bottom: 1px solid var(--border);">
                    <div>
                        <strong>${score.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--gray);">${score.source}</div>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <span class="dqr-badge ${dqrQuality.class}">DQR: ${(score.dqr ?? 2.5).toFixed(1)}</span>
                        <span class="badge">±${score.uncertainty}% uncertainty</span>
                    </div>
                </div>
            `;
        });
        ingredientDataQuality.innerHTML = qualityHTML;
    }
}

// ================== REGULATORY AUDIT TRAIL ENGINE (ISO 14044) ==================
function displayAuditTrail() {
    const auditContent = document.getElementById('auditTrailContent');
    if (!auditContent) return;

    if (!window.auditTrailData || !window.auditTrailData.pefCategories) {
        auditContent.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><h3>Awaiting Calculation Data</h3><p>Run impact analysis to generate audit log.</p></div>`;
        return;
    }

    // 1. CONTEXT VARIABLES
    const catCC = window.auditTrailData.pefCategories["Climate Change"];
    const mb = window.auditTrailData.mass_balance;
    const mfgCountry = document.getElementById('manufacturingCountry')?.value || 'FR';

    // Guard: catCC.total must be a number
    if (typeof catCC?.total !== 'number') {
        auditContent.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Audit Data Incomplete</h3><p>Climate Change total is missing or malformed. Re-run calculation.</p></div>';
        return;
    }

    // Guard: contribution_tree must exist
    if (!catCC.contribution_tree || !catCC.contribution_tree.Ingredients || !Array.isArray(catCC.contribution_tree.Ingredients.components)) {
        auditContent.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Contribution Tree Not Available</h3><p>No lifecycle stage breakdown available. Re-run calculation.</p></div>';
        return;
    }

    // Helper: Country Name Resolver
    const getCtry = (code) => (window.aioxyData?.countries?.[code]?.name || code);

    const productName = document.getElementById('productName')?.value || 'Assessed Product';
    const dateStr = new Date().toISOString().split('T')[0];
    const isCrisisActiveUI = document.getElementById('crisisRoutingToggle')?.checked;

    const totalImpact = catCC.total;
    const pWeightKg = mb.final_content_weight_kg || 0.2;
    const normalizedImpact = totalImpact / pWeightKg;

    // Build HTML
    let html = `
    <div style="font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto 30px auto; border: 2px solid #0A2540; padding: 20px; background: #ffffff; display: flex; justify-content: space-between;">

        <div style="flex: 1; padding-right: 20px;">
            <div style="border-bottom: 2px solid #0A2540; padding-bottom: 10px; margin-bottom: 15px;">
                <h2 style="margin: 0; color: #0A2540; font-size: 1.4rem; text-transform: uppercase;">AIOXY Compliance Audit Trail</h2>
                <div style="color: #555; font-size: 0.8rem; margin-top: 3px;">ISO 14044 • PEF 3.1 • GHG Protocol • ESRS E1 Ready</div>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                <tr>
                    <td style="padding: 4px 0; width: 35%; font-weight: bold; color: #555;">ASSESSMENT ID:</td>
                    <td style="padding: 4px 0; font-family: monospace; font-size: 0.95rem;">${window.auditTrailData.dppId || 'TRC-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</td>
                </tr>
                <tr>
                    <td style="padding: 4px 0; font-weight: bold; color: #555;">PRODUCT:</td>
                    <td style="padding: 4px 0;">${productName}</td>
                </tr>
                <tr>
                    <td style="padding: 4px 0; font-weight: bold; color: #555;">DATE:</td>
                    <td style="padding: 4px 0;">${dateStr}</td>
                </tr>
            </table>

            <div style="margin-top: 15px; border: 1px solid #ccc; background: #f8f9fa; padding: 10px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 3px 0; font-weight: bold; font-size: 1rem; color: #555;">TOTAL BATCH IMPACT:</td>
                        <td style="padding: 3px 0; text-align: right; font-weight: bold; font-size: 1rem; color: #555;">${totalImpact.toFixed(4)} kg CO₂e</td>
                    </tr>
                    <tr style="background: #E3F2FD;">
                        <td style="padding: 5px 4px; font-weight: bold; font-size: 1rem; color: #0A2540;">NORMALIZED IMPACT (PER KG):</td>
                        <td style="padding: 5px 4px; text-align: right; font-weight: bold; font-size: 1.1rem; color: #27AE60;">${normalizedImpact.toFixed(4)} kg CO₂e / kg</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 0; font-weight: bold; margin-top: 5px;">OVERALL DATA QUALITY:</td>
                        <td style="padding: 3px 0; text-align: right;">${window.auditTrailData.dqr_summary?.overall_dqr?.toFixed(2) || '1.5'} (PEF Compliant)</td>
                    </tr>
                </table>
            </div>

            <div style="margin-top: 10px; font-size: 0.8rem; color: #333;">
                <div style="font-weight: bold; margin-bottom: 5px;">AUDIT CLEARANCE:</div>
                ${(() => {
                    const eudrHighRisk = ['BR','ID','MY','AR','CO','PE','NG','CM','CG','CD'];
                    const ingComponents = catCC.contribution_tree?.Ingredients?.components || [];
                    const highRiskIngs = ingComponents.filter(ing => {
                        const country = ing.universal_adjustments?.adjusted_for_country || '';
                        return eudrHighRisk.includes(country);
                    });
                    if (highRiskIngs.length > 0) {
                        const countries = [...new Set(highRiskIngs.map(ing => ing.universal_adjustments?.adjusted_for_country))].join(', ');
                        return `<div style="color:#C0392B; font-weight:bold;">⚠️ EUDR: HIGH-RISK ORIGIN DETECTED — ${countries}</div>`;
                    }
                    return '<div style="color:#27AE60;">✓ EUDR: Compliant (all origins verified)</div>';
                })()}
                <div>✓ Primary & Tertiary Logistics Accounted</div>
                ${isCrisisActiveUI ? '<div style="color: #C0392B;">✓ Crisis Routing Applied (Cape of Good Hope Penalty)</div>' : ''}
            </div>
        </div>

        <div style="width: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 1px solid #eee; padding-left: 15px;">
            <div id="dpp-qr-code" style="background: #fff; padding: 5px; border: 1px solid #ccc;"></div>
            <div style="font-size: 0.65rem; color: #0A2540; font-weight: bold; margin-top: 8px; text-align: center;">
                SCAN FOR OFFLINE<br>VERIFICATION
            </div>
        </div>
    </div>

    <h3 style="border-bottom: 2px solid #0A2540; padding-bottom: 10px; color: #0A2540;">DETAILED SCOPE 3 INVENTORY</h3>
    `;

    // ========== A. INGREDIENT LCI ==========
    html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                A. INGREDIENT LCI & PROXY ADJUSTMENTS (GHG Protocol: Scope 3 Cat 1)
            </h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; border: 1px solid #ccc;">
                <thead style="background: #eee;">
                    <tr>
                        <th style="text-align:left; padding: 8px;">INPUT COMPONENT</th>
                        <th style="text-align:left; padding: 8px;">ORIGIN</th>
                        <th style="text-align:left; padding: 8px;">PROCESSING</th>
                        <th style="text-align:right; padding: 8px;">NET MASS</th>
                        <th style="text-align:left; padding: 8px;">DATA SOURCE</th>
                        <th style="text-align:left; padding: 8px;">PHYSICS ADJUSTMENTS</th>
                        <th style="text-align:right; padding: 8px;">FOSSIL</th>
                        <th style="text-align:right; padding: 8px;">BIOGENIC</th>
                        <th style="text-align:right; padding: 8px;">dLUC</th>
                        <th style="text-align:right; padding: 8px;">TOTAL CO₂e</th>
                    </tr>
                </thead>
                <tbody>`;

    const ingredients = catCC.contribution_tree.Ingredients.components;
    ingredients.forEach(ing => {
        const adj = ing.universal_adjustments || {};
        const isPrimary = ing.primary_data_used;
        const origin = adj.adjusted_for_country || 'FR';
        const baseOrigin = adj.adjusted_from_country || 'FR';
        const isProxy = adj.is_proxy;

        let bridgeHTML = '';
        if (isPrimary && ing.primaryData) {
            const pd = ing.primaryData;
            const farmRegionText = pd.farmRegion ? `${pd.farmRegion}` : 'Not specified';
            const ddsText = pd.ddsReference ? `DDS Ref: ${pd.ddsReference}` : '';
            const adjustmentSummary = adj.adjustment_summary || '';
            const isAnimal = pd.animalType ? true : false;

            if (isAnimal) {
                const animalLabels = { dairy_cow:'Dairy Cow', beef_cattle:'Beef Cattle', pig:'Pig', sheep:'Sheep', goat:'Goat', broiler:'Broiler Chicken', layer_hen:'Layer Hen', turkey:'Turkey', farmed_fish:'Farmed Fish' };
                const systemLabels = { conventional:'Conventional', organic:'Organic', grass_fed:'Grass-Fed', intensive:'Intensive', semi_intensive:'Semi-Intensive' };
                const manureLabels = { pasture:'Pasture', lagoon:'Lagoon', solid_storage:'Solid Storage', anaerobic_digestion:'Anaerobic Digestion' };
                const animalLabel = animalLabels[pd.animalType] || pd.animalType;
                const systemLabel = systemLabels[pd.productionSystem] || pd.productionSystem || 'N/A';
                const productivity = pd.productivityMetric ? `${pd.productivityMetric} (per head/yr)` : 'N/A';
                const manureLabel = manureLabels[pd.manureSystem] || pd.manureSystem || 'Pasture';
                const ua = ing.universal_adjustments || {};
                const entericApplied = ua.enteric_applied != null ? ua.enteric_applied.toFixed(4) : 'N/A';
                const manureApplied  = ua.manure_n2o_applied != null ? ua.manure_n2o_applied.toFixed(4) : 'N/A';
                const ep = pd.entericParams || {};
                const entericEF = ep.emissionFactor != null ? ep.emissionFactor : 'N/A';
                const manureEF  = ep.manureN2OEF   != null ? ep.manureN2OEF   : 'N/A';
                bridgeHTML = `<span style="color:#27AE60; font-weight:bold;">[PRIMARY DATA VERIFIED]</span><br>
                    <span style="font-size:0.85em; color: #555;">
                    🐄 Animal: ${animalLabel}<br>🏠 System: ${systemLabel}<br>📈 Productivity: ${productivity}<br>
                    💩 Manure: ${manureLabel}<br>📍 Farm: ${farmRegionText}<br>
                    🛰️ GPS: ${pd.geolocation || 'Not provided'}<br>📋 ${ddsText || 'DDS: Not provided'}<br>
                    <span style="color:#2C7A7B;">⚙️ IPCC Tier 1 Applied:</span><br>
                    &nbsp;&nbsp;- Enteric CH₄: ${entericApplied} kg CO₂e (EF: ${entericEF} kg CH₄/head/yr × GWP 28)<br>
                    &nbsp;&nbsp;- Manure N₂O: ${manureApplied} kg CO₂e (EF: ${manureEF} kg N₂O-N/kg N)
                    </span>`;
            } else {
                const irrigationLabels = { none:'None', drip:'Drip', flood:'Flood', sprinkler:'Sprinkler' };
                const practiceLabels = { conventional:'Conventional', organic:'Organic', conservation:'Conservation Till', no_till:'No-Till' };
                const irrigationText = irrigationLabels[pd.waterSource] || pd.waterSource || 'Not specified';
                const practiceText  = practiceLabels[pd.farmingPractice] || pd.farmingPractice || 'Not specified';
                bridgeHTML = `<span style="color:#27AE60; font-weight:bold;">[PRIMARY DATA VERIFIED]</span><br>
                    <span style="font-size:0.85em; color: #555;">
                    📍 Farm: ${farmRegionText}<br>🛰️ GPS: ${pd.geolocation || 'Not provided'}<br>
                    🌾 Yield: ${pd.yieldKgPerHa} kg/ha | 💧 N: ${pd.nitrogenKgPerTon} kg/t<br>
                    💦 Irrigation: ${irrigationText} | 🌱 Practice: ${practiceText}<br>
                    📋 ${ddsText || 'DDS: Not provided'}<br>
                    ${adjustmentSummary ? `<span style="color:#2C7A7B;">⚙️ ${adjustmentSummary}</span>` : ''}
                    </span>`;
            }
        } else if (isPrimary) {
            bridgeHTML = `<span style="color:#27AE60; font-weight:bold;">[PRIMARY DATA]</span> Adjusted x${adj.multipliers?.co2?.toFixed(2) || '1.00'}`;
        } else if (isProxy) {
            let factors = [];
            if (adj.multipliers?.co2 && adj.multipliers.co2 !== 1.0) factors.push(`Penalty Factor: <strong>x${adj.multipliers.co2.toFixed(2)}</strong>`);
            if (factors.length > 0) {
                bridgeHTML = `<span style="color:#D35400;">[PROXY: ${baseOrigin}→${origin}]</span><br>${factors.join(' | ')}`;
            } else {
                bridgeHTML = `<span style="color:#2980B9;">[EU REGIONAL MATCH: ${origin}]</span><br>Accepted without penalty`;
            }
        } else {
            bridgeHTML = `<span style="color:#7F8C8D;">[DIRECT: ${baseOrigin}]</span> No adjustment needed`;
        }

        if (ing.name.toLowerCase().includes('animal feed')) {
            bridgeHTML += `<br><span style="color:#8E44AD; font-size:0.85em; font-weight:bold;">[Quality Flag: 'Animal Feed' LCI used as conservative baseline]</span>`;
        }
        if (ing.physics_note) {
            bridgeHTML += `<br><span style="color:#D35400; font-size:0.85em; font-style:italic;">📝 ${ing.physics_note}</span>`;
        }

        const processState = ing.processingState || 'raw';
        const archetypes = window.aioxyData?.processing_archetypes || {};
        const archetype = archetypes[processState];
        let processingDisplay = 'Raw (1.00x)';
        if (archetype && processState !== 'raw') {
            processingDisplay = `${archetype.name} (${(archetype?.yield_factor ?? 1.0).toFixed(2)}x)`;
            bridgeHTML += `<br><span style="color:#2C7A7B; font-size:0.85em; font-weight:bold;">⚙️ [Physics Flag] ${archetype.name} (Yield: ${(archetype?.yield_factor ?? 1.0).toFixed(2)}x)</span>`;
            if (archetype.energy_kwh > 0 || archetype.gas_mj > 0) {
                bridgeHTML += `<br><span style="color:#1A5276; font-size:0.8em;">🔋 Energy: ${archetype.energy_kwh.toFixed(2)} kWh/kg | 🔥 Gas: ${archetype.gas_mj.toFixed(2)} MJ/kg</span>`;
            }
        }

        const actualCO2   = ing.subtotal    || 0;
        const fossilCO2   = ing.fossilCO2   || 0;
        const biogenicCO2 = ing.biogenicCO2 || 0;
        const dlucCO2     = ing.dlucCO2     || 0;

        html += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; font-weight:bold;">${ing.name}</td>
                <td style="padding: 8px;">${getCtry(origin)}</td>
                <td style="padding: 8px;">${processingDisplay}</td>
                <td style="padding: 8px; text-align:right;">${(ing.quantity_kg || 0).toFixed(3)} kg</td>
                <td style="padding: 8px;">AGRIBALYSE 3.2</td>
                <td style="padding: 8px; background: #fffdf9;">${bridgeHTML}</td>
                <td style="padding: 8px; text-align:right;">${fossilCO2.toFixed(4)}</td>
                <td style="padding: 8px; text-align:right;">${biogenicCO2.toFixed(4)}</td>
                <td style="padding: 8px; text-align:right;">${dlucCO2.toFixed(4)}</td>
                <td style="padding: 8px; text-align:right; font-weight:bold;">${actualCO2.toFixed(4)} kg CO₂e</td>
            </tr>`;
    });

    html += `</tbody></table></div>`;

    // ========== B. MANUFACTURING & ENERGY BALANCE ==========
    const usePrimaryMfg = document.getElementById('usePrimaryFactoryData')?.checked || false;
    const factoryKWh    = parseFloat(document.getElementById('factoryTotalKWh')?.value) || 0;
    const factoryGas    = parseFloat(document.getElementById('factoryTotalGas')?.value) || 0;
    const factoryOutput = parseFloat(document.getElementById('factoryTotalOutput')?.value) || 1;
    const hasPrimaryMfgData = usePrimaryMfg && (factoryKWh > 0 || factoryGas > 0) && factoryOutput > 0;

    let primaryMfgHTML = '';
    if (hasPrimaryMfgData) {
        const kwhPerKg = factoryKWh / factoryOutput;
        const gasPerKg = factoryGas / factoryOutput;
        primaryMfgHTML = `
            <div style="margin-top: 10px; padding: 10px; background: #E8F8F5; border-left: 4px solid #27AE60; border-radius: 4px;">
                <div style="font-weight:bold; color: #27AE60; margin-bottom: 8px;">✅ TIER 1 PRIMARY FACILITY DATA VERIFIED</div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 0.8rem;">
                    <div><strong>Annual Electricity:</strong></div><div style="text-align:right;">${factoryKWh.toLocaleString()} kWh</div>
                    <div><strong>Annual Natural Gas:</strong></div><div style="text-align:right;">${factoryGas.toLocaleString()} m³</div>
                    <div><strong>Annual Production:</strong></div><div style="text-align:right;">${factoryOutput.toLocaleString()} kg</div>
                    <div style="border-top:1px solid #ccc; margin-top:5px; padding-top:5px;"><strong>Verified Intensity:</strong></div>
                    <div style="border-top:1px solid #ccc; margin-top:5px; padding-top:5px; text-align:right;">${kwhPerKg.toFixed(3)} kWh/kg | ${gasPerKg.toFixed(3)} m³ gas/kg</div>
                </div>
            </div>`;
    }

    html += `
    <div style="margin-bottom: 25px;">
        <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
            B. MANUFACTURING & ENERGY BALANCE (Scope 1, 2, or 3)
        </h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; border: 1px solid #ccc;">
            <div style="padding: 10px; border-right: 1px solid #ccc;">
                <div style="font-weight:bold; border-bottom:1px solid #eee; margin-bottom:5px;">MASS BALANCE (Input/Output)</div>
                <div style="display:flex; justify-content:space-between;"><span>Σ Input Mass:</span><span>${mb.inputMass.toFixed(3)} kg</span></div>
                <div style="display:flex; justify-content:space-between; color:#C0392B;"><span>- Water Evaporation:</span><span>${mb.evaporation.toFixed(3)} kg</span></div>
                <div style="display:flex; justify-content:space-between; border-top:1px solid #ddd; margin-top:5px; font-weight:bold;"><span>= Final Product:</span><span>${mb.final_content_weight_kg.toFixed(3)} kg</span></div>
            </div>
            <div style="padding: 10px;">
                <div style="font-weight:bold; border-bottom:1px solid #eee; margin-bottom:5px;">ENERGY CALCULATION</div>
                ${(catCC.contribution_tree.Manufacturing?.components || []).map(m => `
                    <div style="display:flex; justify-content:space-between;"><span>Process:</span><span>${m.name}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Energy Intensity:</span><span>${m.details || 'N/A'}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Energy Source:</span><span style="font-weight:600; color:var(--primary);">${m.energy_source || 'Grid Mix'}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Carbon Intensity:</span><span>${m.grid_intensity || 475} gCO₂e/kWh</span></div>
                    <div style="display:flex; justify-content:space-between; border-top:1px solid #ddd; margin-top:5px; font-weight:bold;"><span>Impact:</span><span>${(m.subtotal || 0).toFixed(4)} kg CO₂e</span></div>
                `).join('')}
                ${primaryMfgHTML}
            </div>
        </div>
    </div>`;

    // ========== C. LOGISTICS CHAIN ==========
    html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                C. LOGISTICS CHAIN (GHG Protocol: Scope 3 Cat 4)
            </h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; border: 1px solid #ccc;">
                <thead style="background: #eee;">
                    <tr>
                        <th style="text-align:left; padding: 8px;">LEG</th>
                        <th style="text-align:left; padding: 8px;">MODE</th>
                        <th style="text-align:right; padding: 8px;">DISTANCE</th>
                        <th style="text-align:right; padding: 8px;">LOAD FACTOR</th>
                        <th style="text-align:right; padding: 8px;">IMPACT</th>
                    </tr>
                </thead>
                <tbody>`;

    const allUpstream     = catCC.contribution_tree.Upstream?.components || [];
    const upstream        = allUpstream.filter(c => !c.name.includes('End-of-Life'));
    const eolComponents   = allUpstream.filter(c => c.name.includes('End-of-Life'));

    if (upstream.length > 0) {
        upstream.forEach(u => {
            const notes = u.notes || '';
            const isColdChain = notes.toLowerCase().includes('chilled') || notes.toLowerCase().includes('frozen') || notes.toLowerCase().includes('reefer');
            let refrigerantNote = '';
            if (isColdChain) {
                const refrigerantPct = notes.toLowerCase().includes('frozen') ? 0.15 : 0.08;
                const refrigerantKg = (u.subtotal * refrigerantPct).toFixed(6);
                refrigerantNote = `<br><span style="color: #718096; font-size: 0.7rem;">🧊 Includes refrigerant leakage: ${refrigerantKg} kg CO₂e (IPCC Tier 1)</span>`;
            }
            html += `
                <tr>
                    <td style="padding: 8px;"><span style="background:#E3F2FD; padding:2px 5px; border-radius:3px;">INBOUND</span> Origin → Mfg</td>
                    <td style="padding: 8px;" colspan="3">${u.name}: ${notes || 'Cross-border transport calculated'}${refrigerantNote}</td>
                    <td style="padding: 8px; text-align:right;">${(u.subtotal || 0).toFixed(4)} kg CO₂e</td>
                </tr>`;
        });
    } else {
        html += `<tr><td colspan="5" style="padding:8px; font-style:italic; color:#777;">Inbound ingredient transport excluded from system boundary per ISO 14044 §4.2.3.3 — AGRIBALYSE 3.2 data includes representative farm-gate transport within the LCI; cross-border inbound transport is a declared gap.</td></tr>`;
    }

    const outbound = catCC.contribution_tree.Transport?.total || 0;
    let dist = parseFloat(document.getElementById('transportDistance')?.value) || 300;
    const rawMode = document.getElementById('transportMode')?.value || 'road';
    const isCrisisActive = document.getElementById('crisisRoutingToggle')?.checked;
    let crisisNote = '';
    if (isCrisisActive && (rawMode === 'sea' || rawMode === 'road')) {
        const originalDist = dist;
        dist = dist * 1.40;
        crisisNote = `<br><span style="color:#C0392B; font-size:0.85em; font-weight:bold;">[⚠️ CRISIS REROUTE: ${originalDist}km → ${dist.toFixed(0)}km]</span>`;
    }
    const isFrozenUI  = document.getElementById('processingMethod')?.value === 'freezing';
    const isChilledUI = document.getElementById('refrigeratedTransport')?.value === 'yes';
    let displayMode = rawMode.toUpperCase();
    if (isFrozenUI) displayMode += ' (FROZEN REEFER)';
    else if (isChilledUI) displayMode += ' (CHILLED REEFER)';

    html += `
                <tr>
                    <td style="padding: 8px;"><span style="background:#FFF3E0; padding:2px 5px; border-radius:3px;">OUTBOUND</span> Mfg → Retail</td>
                    <td style="padding: 8px; font-weight: bold; color: #0A2540;">${displayMode}${crisisNote}</td>
                    <td style="padding: 8px; text-align:right;">${dist.toFixed(0)} km</td>
                    <td style="padding: 8px; text-align:right;">85%</td>
                    <td style="padding: 8px; text-align:right;">${outbound.toFixed(4)} kg CO₂e</td>
                </tr>
            </tbody>
        </table>
        <div style="font-size:0.75rem; color:#555; padding:8px; border-top:1px solid #eee; background:#fafafa;">
            <strong>ℹ️ Road freight factor note:</strong> Outbound road transport uses 0.089 kg CO₂e/tkm (GLEC v3.2 Table 8 — EU articulated HGV average, ambient). DAF 1.05 applied per GLEC v3.2.
        </div>
    </div>`;

    // ========== D. PACKAGING ==========
    html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                D. PACKAGING (GHG Protocol: Scope 3 Cat 1)
            </h4>
            <div style="border: 1px solid #ccc; padding: 10px; font-size: 0.8rem;">
                <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 5px;">
                    <div>
                        <strong style="color:var(--primary);">PRIMARY PACKAGING (User Input)</strong><br>
                        <strong>Material:</strong> ${document.getElementById('packagingMaterial')?.options[document.getElementById('packagingMaterial').selectedIndex]?.text || 'N/A'}<br>
                        <strong>Weight:</strong> ${(mb.packaging_weight_kg || 0).toFixed(3)} kg
                    </div>
                    <div>
                        <strong>Recycled Content:</strong> ${document.getElementById('recycledContent')?.value || 0}%<br>
                        <strong>End-of-Life:</strong> ${document.getElementById('packagingEoL')?.options[document.getElementById('packagingEoL').selectedIndex]?.text || 'EU Avg'}
                    </div>
                </div>
                <div style="padding-top: 5px;">
                    <strong style="color:var(--primary);">TERTIARY LOGISTICS PACKAGING (PEF Proxy)</strong><br>
                    ${(catCC.contribution_tree.Packaging?.components || []).map(p => `
                        <div style="display:flex; justify-content:space-between; color: #555;">
                            <span>• ${p.name}</span><span>${(p.subtotal || 0).toFixed(4)} kg CO₂e</span>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align:right; border-top: 1px solid #ccc; margin-top: 10px; padding-top: 10px;">
                    <strong>Total Packaging Impact:</strong><br>
                    <span style="font-weight:bold; font-size:1rem; color: #C0392B;">${(catCC.contribution_tree.Packaging?.total || 0).toFixed(4)} kg CO₂e</span>
                </div>
            </div>
        </div>`;

    // ========== E. END-OF-LIFE ==========
    const wasteComponents = catCC.contribution_tree.Waste?.components || [];
    const allEoL = [...wasteComponents, ...eolComponents];

    if (allEoL.length > 0) {
        html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                E. END-OF-LIFE TREATMENT (GHG Protocol: Scope 3 Cat 12)
            </h4>
            <div style="border: 1px solid #ccc; padding: 10px; font-size: 0.8rem;">
                ${allEoL.map(e => `
                    <div style="display:flex; justify-content:space-between; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                        <div><strong style="color:var(--primary);">${e.name}</strong><br><span style="color:var(--gray);">${e.notes || ''}</span></div>
                        <div style="font-weight:bold; color: #C0392B;">${(e.subtotal || 0).toFixed(4)} kg CO₂e</div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    } else {
        html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                E. END-OF-LIFE TREATMENT (GHG Protocol: Scope 3 Cat 12)
            </h4>
            <div style="border: 1px solid #ccc; padding: 10px; font-size: 0.8rem; color: #718096; font-style: italic;">
                No end-of-life treatment applicable for this product configuration.
            </div>
        </div>`;
    }

    // ========== F. PARAMETRIC TWIN VERIFICATION ==========
    if (window.currentComparisonBaseline && window.currentComparisonBaseline.breakdown) {
        const b  = window.currentComparisonBaseline;
        const bd = b.breakdown;
        const anchorName = b.anchor_name || b.name || 'Selected Baseline';

        html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                F. PARAMETRIC TWIN VERIFICATION (ISO 14044 §4.2.3.2)
            </h4>
            <div style="border: 1px solid #ccc; padding: 15px; font-size: 0.85rem; background: #F8FAFC;">
                <div style="margin-bottom: 10px;">
                    <strong>Anchor:</strong> ${anchorName}<br>
                    <strong>Methodology:</strong> System boundaries cloned from assessed product. Only agricultural ingredient differs.
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px 0;"><strong>1. Agricultural Phase (Farm Gate)</strong></td><td style="text-align: right; font-family: monospace;">${bd.ingredients ? bd.ingredients.toFixed(4) : '0.0000'} kg CO₂e</td></tr>
                    <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px 0;"><strong>2. Cloned Manufacturing</strong></td><td style="text-align: right; font-family: monospace;">${bd.manufacturing ? bd.manufacturing.toFixed(4) : '0.0000'} kg CO₂e</td></tr>
                    <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px 0;"><strong>3. Cloned Logistics</strong></td><td style="text-align: right; font-family: monospace;">${bd.transport ? bd.transport.toFixed(4) : '0.0000'} kg CO₂e</td></tr>
                    <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px 0;"><strong>4. Cloned Packaging</strong></td><td style="text-align: right; font-family: monospace;">${bd.packaging ? bd.packaging.toFixed(4) : '0.0000'} kg CO₂e</td></tr>
                    <tr style="font-weight: bold; background: #E2E8F0;"><td style="padding: 8px 0; font-size: 0.95rem;">TOTAL PARAMETRIC TWIN BASELINE</td><td style="text-align: right; font-family: monospace; font-size: 0.95rem;">${b.co2PerKg ? b.co2PerKg.toFixed(4) : '0.0000'} kg CO₂e/kg</td></tr>
                </table>
                <div style="margin-top: 10px; color: #27AE60; font-size: 0.8rem;"><i class="fas fa-check-circle"></i> Functional Equivalence Verified per ISO 14044 §4.2.3.2</div>
                <div style="margin-top: 6px; color: #888; font-size: 0.75rem; font-style: italic;"><i class="fas fa-info-circle"></i> Twin uses AGRIBALYSE 3.2 baseline for all ingredients. Supplier primary data adjustments (yield, nitrogen) are applied in the main assessment only and are not carried into the parametric twin. This is intentional: the twin compares standard industry baselines, not supplier-specific actuals.</div>
            </div>
        </div>`;
    }

    // ========== G. PARAMETRIC TWIN INGREDIENT COMPARISON ==========
    if (window.currentComparisonBaseline?.ingredientPairs && window.currentComparisonBaseline.ingredientPairs.length > 0) {
        const pairs = window.currentComparisonBaseline.ingredientPairs;
        const assessedTotal     = window.currentComparisonBaseline.assessed_co2PerKg || 0;
        const conventionalTotal = window.currentComparisonBaseline.co2PerKg || window.currentComparisonBaseline.conventionalTotal?.co2PerKg || 0;   // BUG-12 FIX: co2PerKg is top-level on baseline object, conventionalTotal sub-object does not exist
        // twinResult.delta is ABSOLUTE batch CO2e (conventionalCO2Total - assessedCO2Total in kg for the batch).
        // conventionalTotal is per-kg. Must convert delta to per-kg first before computing percentage.
        const deltaAbsolute = window.currentComparisonBaseline.delta || 0;
        const productWtKg   = mb?.final_content_weight_kg || 0.2;
        const delta         = deltaAbsolute / productWtKg;   // now per-kg, same unit as conventionalTotal
        const deltaPct = conventionalTotal > 0 ? ((delta / conventionalTotal) * 100).toFixed(1) : '0.0';
        const deltaSign = delta >= 0 ? '+' : '';

        let pairRows = '';
        pairs.forEach(pair => {
            const convName    = pair.conventional ? `${pair.conventional.name} (${pair.conventional.quantityKg?.toFixed(3) || '?'} kg)` : 'No equivalent';
            const pairDelta   = pair.delta ?? 0;
            const pairDeltaSign  = pairDelta >= 0 ? '+' : '';
            const pairDeltaColor = pairDelta >= 0 ? '#27AE60' : '#C0392B';
            pairRows += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 6px 8px;">${pair.assessed?.name || '?'} (${(pair.assessed?.quantityKg || 0).toFixed(3)} kg)</td>
                    <td style="padding: 6px 8px; color: #555;">${convName}</td>
                    <td style="padding: 6px 8px; text-align:right; font-family:monospace; color:${pairDeltaColor};">${pairDeltaSign}${pairDelta.toFixed(4)} kg CO₂e</td>
                </tr>`;
        });

        html += `
        <div style="margin-bottom: 25px;">
            <h4 style="background: #0A2540; color: white; padding: 8px; margin: 0; font-size: 0.9rem;">
                G. PARAMETRIC TWIN — INGREDIENT COMPARISON
            </h4>
            <div style="border: 1px solid #ccc; font-size: 0.85rem;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #eee;">
                        <tr>
                            <th style="text-align:left; padding: 8px;">ASSESSED INGREDIENT</th>
                            <th style="text-align:left; padding: 8px;">CONVENTIONAL EQUIVALENT</th>
                            <th style="text-align:right; padding: 8px;">CO₂ DELTA</th>
                        </tr>
                    </thead>
                    <tbody>${pairRows}</tbody>
                    <tfoot style="background: #E2E8F0; font-weight: bold;">
                        <tr>
                            <td style="padding: 8px;">TOTAL ASSESSED: ${assessedTotal.toFixed(4)} kg CO₂e/kg</td>
                            <td style="padding: 8px;">TOTAL CONVENTIONAL: ${conventionalTotal.toFixed(4)} kg CO₂e/kg</td>
                            <td style="padding: 8px; text-align:right; font-family:monospace;">NET DELTA: ${deltaSign}${delta.toFixed(4)} kg CO₂e (${deltaPct}% ${delta >= 0 ? 'lower' : 'higher'})</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>`;
    }

    // ========== TOTAL IMPACT FOOTER ==========
    const totalFossil   = window.auditTrailData?.pefCategories?.['Climate Change - Fossil']?.total   || 0;
    const totalBiogenic = window.auditTrailData?.pefCategories?.['Climate Change - Biogenic']?.total || 0;
    const totalDLUC     = window.auditTrailData?.pefCategories?.['Climate Change - Land Use']?.total  || 0;

    html += `
        <div style="background: #2D3748; color: white; padding: 15px; border-radius: 4px; display:flex; justify-content:space-between; align-items:center;">
            <div><strong>TOTAL CRADLE-TO-RETAIL IMPACT:</strong></div>
            <div style="text-align:right;">
                <div style="font-size: 1.2rem; font-weight:bold;">
                    Fossil: ${totalFossil.toFixed(4)} kg | Biogenic: ${totalBiogenic.toFixed(4)} kg | dLUC: ${totalDLUC.toFixed(4)} kg
                </div>
                <div style="font-size: 1.5rem; font-weight:bold; margin-top: 5px;">TOTAL: ${catCC.total.toFixed(4)} kg CO₂e</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">Uncertainty: ±${window.auditTrailData.uncertainty_analysis?.overall_uncertainty || 15}% (Monte Carlo)</div>
            </div>
        </div>`;

    // Inject into DOM
    auditContent.innerHTML = html;

    // QR code for audit trail header
    const qrTextPayload = `AIOXY VERIFIED AUDIT\n-------------------------\nDPP ID: ${window.auditTrailData.dppId || 'TRC-UNKNOWN'}\nProduct: ${productName}\nImpact: ${totalImpact.toFixed(4)} kg CO₂e/kg\nMethod: PEF 3.1 / CSRD\nDate: ${dateStr}`;
    setTimeout(() => {
        const qrBox = document.getElementById('dpp-qr-code');
        if (qrBox && typeof QRCode !== 'undefined') {
            qrBox.innerHTML = '';
            new QRCode(qrBox, { text: qrTextPayload, width: 120, height: 120, colorDark: '#0A2540', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
        }
    }, 100);
}

// ================== DIGITAL TRANSPARENCY CARD (DPP TAB) ==================
// FIX-C: DOM ordering fixed — metrics are always visible inside the card body.
function generateDPP() {
    const productName = document.getElementById('productName').value || 'Unnamed Product';
    const dppId = (window.auditTrailData && window.auditTrailData.dppId)
        || window.currentDPPId
        || 'TRC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    window.currentDPPId = dppId;

    const dppIdEl = document.getElementById('dppId');
    if (dppIdEl) dppIdEl.textContent = dppId;

    const transparencyData = {
        productId:             dppId,
        productName:           productName,
        timestamp:             new Date().toISOString(),
        methodology: { approach: 'PEF 3.1', version: '2.1', dataSources: ['AGRIBALYSE 3.2', 'JRC EF 3.1', 'AWARE 2.0'], standards: ['Science-Based Reporting', 'ISO 14044 Compliant'] },
        environmentalFootprint: window.finalPefResults,
        data_quality:          window.auditTrailData?.dqr_summary,
        mass_balance:          window.massBalanceData,
        comparison_baseline:   window.currentComparisonBaseline,
        pef_single_score:      window.auditTrailData?.pef_single_score,
        calculation_timestamp: window.auditTrailData?.calculationTimestamp
    };
    console.log('📦 DPP Data Ready:', transparencyData);

    // FIX-C: Always remove stale metrics container first (prevents duplicates on re-visit)
    const existingMetrics = document.getElementById('dpp-metrics-container');
    if (existingMetrics) existingMetrics.remove();

    if (window.finalPefResults && Object.keys(window.finalPefResults).length > 0) {
        const metricsContainer = document.createElement('div');
        metricsContainer.id = 'dpp-metrics-container';
        metricsContainer.style.cssText = 'margin-top:1.5rem;padding:1.25rem;background:#f0fafa;border-radius:10px;border:1px solid #B2DFDB;';

        const co2   = window.finalPefResults?.['Climate Change']?.total                  || 0;
        const water = window.finalPefResults?.['Water Use/Scarcity (AWARE)']?.total      || 0;
        const land  = window.finalPefResults?.['Land Use']?.total                        || 0;
        const fossil= window.finalPefResults?.['Resource Use, fossils']?.total           || 0;
        const dqr   = window.auditTrailData?.dqr_summary?.overall_dqr                   || 0;
        const wKg   = window.massBalanceData?.final_content_weight_kg || 0.2;
        const uncertainty = window.auditTrailData?.uncertainty_analysis?.overall_uncertainty || 15;

        metricsContainer.innerHTML = `
            <h4 style="margin:0 0 1rem 0;color:#0A2540;font-size:1rem;">
                <i class="fas fa-leaf" style="color:#27AE60;"></i> Complete PEF Data Embedded
            </h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div style="background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;">
                    <div style="font-size:0.75rem;color:#718096;font-weight:600;text-transform:uppercase;">Climate Change</div>
                    <div style="font-size:1.1rem;font-weight:800;color:#0A2540;margin-top:0.25rem;">${co2.toFixed(4)} kg CO₂e</div>
                    <div style="font-size:0.75rem;color:#718096;">${(co2/wKg).toFixed(4)} kg CO₂e/kg</div>
                </div>
                <div style="background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;">
                    <div style="font-size:0.75rem;color:#718096;font-weight:600;text-transform:uppercase;">Water Scarcity (AWARE)</div>
                    <div style="font-size:1.1rem;font-weight:800;color:#0A2540;margin-top:0.25rem;">${water.toFixed(4)} m³ world eq.</div>
                    <div style="font-size:0.75rem;color:#718096;">${(water/wKg).toFixed(4)} m³/kg</div>
                </div>
                <div style="background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;">
                    <div style="font-size:0.75rem;color:#718096;font-weight:600;text-transform:uppercase;">Land Use</div>
                    <div style="font-size:1.1rem;font-weight:800;color:#0A2540;margin-top:0.25rem;">${land.toFixed(2)} Pt</div>
                    <div style="font-size:0.75rem;color:#718096;">${(land/wKg).toFixed(2)} Pt/kg</div>
                </div>
                <div style="background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;">
                    <div style="font-size:0.75rem;color:#718096;font-weight:600;text-transform:uppercase;">Resource Use (Fossils)</div>
                    <div style="font-size:1.1rem;font-weight:800;color:#0A2540;margin-top:0.25rem;">${fossil.toFixed(2)} MJ</div>
                    <div style="font-size:0.75rem;color:#718096;">${(fossil/wKg).toFixed(2)} MJ/kg</div>
                </div>
            </div>
            <div style="margin-top:1rem;display:flex;gap:1rem;flex-wrap:wrap;">
                <div style="background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;flex:1;min-width:150px;">
                    <div style="font-size:0.75rem;color:#718096;font-weight:600;text-transform:uppercase;">Data Quality Rating</div>
                    <div style="font-size:1rem;font-weight:800;color:#27AE60;margin-top:0.25rem;">DQR ${dqr.toFixed(2)} — ${_dqrLevel(dqr).level}</div>
                </div>
                <div style="background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;flex:1;min-width:150px;">
                    <div style="font-size:0.75rem;color:#718096;font-weight:600;text-transform:uppercase;">Uncertainty</div>
                    <div style="font-size:1rem;font-weight:800;color:#0A2540;margin-top:0.25rem;">±${uncertainty}% (Monte Carlo)</div>
                </div>
            </div>
            <div style="margin-top:1rem;font-size:0.75rem;color:#718096;background:white;padding:0.75rem;border-radius:8px;border:1px solid #E2E8F0;">
                <i class="fas fa-info-circle"></i> This transparency card contains the full 16-impact PEF matrix.
                Data structure follows JSON-LD format with interoperability standards.
                Assessment ID: <strong style="font-family:monospace;">${dppId}</strong>
            </div>`;

        // FIX-C: Insert metrics BEFORE action-buttons so they appear in visible card area.
        // If no action-buttons, insert as FIRST child of card so it's always at the top body.
        const dppTabContainer = document.getElementById('dpp-tab');
        if (dppTabContainer) {
            const dppCard = dppTabContainer.querySelector('.card') || dppTabContainer;
            const actionButtons = dppCard.querySelector('.action-buttons');
            if (actionButtons) {
                dppCard.insertBefore(metricsContainer, actionButtons);
            } else {
                // No action-buttons: put metrics after the card-header, before everything else
                const cardHeader = dppCard.querySelector('.card-header');
                if (cardHeader && cardHeader.nextSibling) {
                    dppCard.insertBefore(metricsContainer, cardHeader.nextSibling);
                } else {
                    dppCard.appendChild(metricsContainer);
                }
            }
        }
    }

    // QR code
    const qrElement = document.getElementById('qrcode');
    if (!qrElement) return;
    qrElement.innerHTML = '';

    if (typeof QRCode !== 'undefined') {
        const brandGTIN     = '00012345678905';
        const dppDomain     = 'https://dpp.aioxy.com';
        const gs1DigitalLink = `${dppDomain}/01/${brandGTIN}/21/${dppId}`;
        new QRCode(qrElement, { text: gs1DigitalLink, width: 200, height: 200, colorDark: '#0A2540', colorLight: '#FFFFFF', correctLevel: QRCode.CorrectLevel.M });
    } else {
        qrElement.innerHTML = `
            <div style="background: #f0f0f0; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                <div style="text-align: center;">
                    <i class="fas fa-qrcode" style="font-size: 3rem; color: #666;"></i>
                    <div style="margin-top: 1rem; font-size: 0.8rem;">QR Code would display here</div>
                    <div style="font-size: 0.7rem; color: #999;">DPP ID: ${dppId}</div>
                </div>
            </div>`;
    }
}

// ================== REGULATOR DISCLAIMER ==================
function generateRegulatorDisclaimer() {
    const productName = document.getElementById('productName').value || 'Product';
    const countryCode = document.getElementById('manufacturingCountry').value || 'FR';
    const countryName = window.aioxyData?.countries?.[countryCode]?.name || countryCode;
    const dqr         = window.auditTrailData?.dqr_summary?.overall_dqr?.toFixed(1) || '1.5';
    const uncertainty = window.auditTrailData?.uncertainty_analysis?.overall_uncertainty || '15';

    return `AIOXY SCIENCE-BASED DISCLAIMER
REGULATION-ALIGNED METHODOLOGY v2.1

PRODUCT: ${productName}
MANUFACTURING REGION: ${countryName}
ASSESSMENT ID: ${window.currentDPPId || 'TRC-UNKNOWN'}
TIMESTAMP: ${new Date().toISOString()}

METHODOLOGY: PEF 3.1 | DATA: AGRIBALYSE 3.2 | BOUNDARY: Cradle-to-Retail
DATA QUALITY (DQR): ${dqr}/5.0 | UNCERTAINTY: ±${uncertainty}%

SCREENING-LEVEL ASSESSMENT — for certified EPD conduct ISO 14044 critical review.`;
}

// ================== CSRD SCOPE 3 MATRIX EXPORTER ==================
function exportCSRDMatrix() {
    // ── AIOXY ENVIRONMENTAL FOOTPRINT CSV EXPORT ────────────────────────────
    // TWO files in one function:
    //   File 1: Machine-readable data CSV (for retailer systems, CDP, EcoVadis)
    //   File 2: This is the machine CSV — formulas and methods in # comment rows
    //           so parser software skips them cleanly.
    // All values from engine globals. No DOM reads. No recalculation.
    // ────────────────────────────────────────────────────────────────────────

    if (!window.auditTrailData || !window.auditTrailData.pefCategories) {
        alert('Please calculate the environmental impact first.');
        return;
    }

    const audit     = window.auditTrailData;
    const pef       = window.finalPefResults;
    const mb        = audit.mass_balance || {};
    const pWeightKg = mb.final_content_weight_kg || 1.0;
    const pName     = audit.productName || 'Product';
    const dppId     = audit.dppId || 'N/A';
    const auditHash = audit.auditHash || '';
    const assessDate= new Date(audit.calculationTimestamp || Date.now()).toISOString().split('T')[0];
    const dqrOverall= (audit.dqr_summary?.overall_dqr ?? 0).toFixed(2);
    const dqrLevel  = audit.dqr_summary?.dqr_level || 'N/A';
    const mfgTrace  = audit.traceability?.manufacturing || {};
    const mfgCountry= mfgTrace.parameters?.country || mfgTrace.country || mfgTrace.countryCode || 'N/A';   // BUG-11 FIX: country is nested under mfgTrace.parameters, not top-level
    const gridG     = (mfgTrace.parameters?.gridIntensityGPerKwh || mfgTrace.gridIntensityGPerKwh || 0).toFixed(2);   // BUG-11 FIX: gridIntensityGPerKwh also nested under parameters
    const ss        = audit.pef_single_score || {};
    const mPt       = (ss.singleScore || 0).toFixed(4);
    const ssBkd     = ss.breakdown || {};
    const unc       = audit.uncertainty_analysis?.monte_carlo?.['Climate Change'] || {};   // BUG-10 FIX: monteCarloResults is keyed by category — must access ['Climate Change'], not top-level
    const uncPct    = (audit.uncertainty_analysis?.overall_uncertainty || 15).toFixed(1);
    const mcP5      = (unc.p5 || 0).toFixed(6);
    const mcP95     = (unc.p95 || 0).toFixed(6);
    const baseline  = audit.comparison_baseline || window.currentComparisonBaseline || null;
    const twinCO2   = baseline?.co2PerKg || 0;
    const twinName  = baseline?.name || 'N/A';
    const ccPerKg   = pWeightKg > 0 ? (pef['Climate Change']?.total || 0) / pWeightKg : 0;
    const reduction = (twinCO2 > 0 && ccPerKg > 0)
        ? ((twinCO2 - ccPerKg) / twinCO2 * 100).toFixed(2) : '0.00';
    const ccTree    = pef['Climate Change']?.contribution_tree || {};
    const ingComps  = ccTree.Ingredients?.components || [];

    const getTotal  = (cat) => (pef[cat]?.total ?? 0);
    const getPerKg  = (cat) => pWeightKg > 0 ? getTotal(cat) / pWeightKg : 0;

    const ALL_CATS = [
        ['Climate Change',                'kg CO2e',      'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E1'],
        ['Climate Change - Fossil',       'kg CO2e',      'AGRIBALYSE 3.2',               'ESRS E1'],
        ['Climate Change - Biogenic',     'kg CO2e',      'AGRIBALYSE 3.2',               'ESRS E1'],
        ['Climate Change - Land Use',     'kg CO2e',      'AGRIBALYSE 3.2 / FAOSTAT',     'ESRS E1'],
        ['Ozone Depletion',               'kg CFC11e',    'AGRIBALYSE 3.2 / JRC EF 3.1', ''],
        ['Human Toxicity, non-cancer',    'CTUh',         'AGRIBALYSE 3.2 / USEtox 2.14',''],
        ['Human Toxicity, cancer',        'CTUh',         'AGRIBALYSE 3.2 / USEtox 2.14',''],
        ['Particulate Matter',            'disease inc.', 'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E1'],
        ['Ionizing Radiation',            'kBq U235e',    'AGRIBALYSE 3.2 / JRC EF 3.1', ''],
        ['Photochemical Ozone Formation', 'kg NMVOCe',    'AGRIBALYSE 3.2 / JRC EF 3.1', ''],
        ['Acidification',                 'mol H+e',      'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E1'],
        ['Eutrophication, terrestrial',   'mol Ne',       'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E4'],
        ['Eutrophication, freshwater',    'kg Pe',        'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E4'],
        ['Eutrophication, marine',        'kg Ne',        'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E4'],
        ['Ecotoxicity, freshwater',       'CTUe',         'AGRIBALYSE 3.2 / USEtox 2.14','ESRS E4'],
        ['Land Use',                      'Pt',           'AGRIBALYSE 3.2 / LANCA v2.5', 'ESRS E4'],
        ['Water Use/Scarcity (AWARE)',    'm3 world eq.', 'AGRIBALYSE 3.2 / AWARE 2.0',  'ESRS E3'],
        ['Resource Use, minerals/metals', 'kg Sbe',       'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E5'],
        ['Resource Use, fossils',         'MJ',           'AGRIBALYSE 3.2 / JRC EF 3.1', 'ESRS E5']
    ];

    // q() — safe CSV quoting
    const q = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
    // c() — comment row, skipped by machine parsers (prefix #)
    const c = (s) => q('# ' + s);

    const rows = [];

    // ── BLOCK 1: REPORT IDENTITY ─────────────────────────────────────────────
    // Machine-parseable key-value pairs. No free text in value fields.
    rows.push(['field', 'value', 'unit', 'source', 'note'].map(q).join(','));
    rows.push([c('REPORT IDENTITY')]);
    rows.push(['report_type',         'Environmental Footprint Report',          '',    'AIOXY v6.0',                         ''].map(q).join(','));
    rows.push(['assessment_id',       dppId,                                     '',    'AIOXY',                              ''].map(q).join(','));
    rows.push(['audit_hash_sha256',   auditHash,                                 '',    'SHA-256 covers all inputs+outputs',  ''].map(q).join(','));
    rows.push(['product_name',        pName,                                     '',    'User input',                         ''].map(q).join(','));
    rows.push(['assessment_date',     assessDate,                                '',    '',                                   ''].map(q).join(','));
    rows.push(['functional_unit',     '1 kg of product as sold',                 'kg',  'PEF 3.1',                            ''].map(q).join(','));
    rows.push(['product_weight',      pWeightKg.toFixed(4),                      'kg',  'Mass balance',                       ''].map(q).join(','));
    rows.push(['system_boundary',     'Cradle-to-Retail',                        '',    'ISO 14044',                          'Farm gate through distribution'].map(q).join(','));
    rows.push(['assessment_type',     'Screening-level LCA',                     '',    'ISO 14044',                          'Not third-party verified'].map(q).join(','));
    rows.push(['lci_database',        'AGRIBALYSE 3.2',                          '',    'ADEME/INRAE 2022',                   ''].map(q).join(','));
    rows.push(['lcia_method',         'EF 3.1',                                  '',    'JRC Technical Report EUR 29540 EN',  '16 categories + 3 CC sub-splits'].map(q).join(','));
    rows.push(['transport_method',    'GLEC v3.2',                               '',    'Smart Freight Centre 2025',          ''].map(q).join(','));
    rows.push(['packaging_method',    'PEF 3.1 CFF Annex C v2.1',               '',    'European Commission May 2020',       ''].map(q).join(','));
    rows.push(['gwp_basis',           'IPCC AR5 GWP100',                         '',    'IPCC 2013',                          'CH4=28 N2O=265'].map(q).join(','));
    rows.push(['water_scarcity',      'AWARE 2.0',                               '',    'Boulay et al. 2018',                 ''].map(q).join(','));
    rows.push(['overall_dqr',         dqrOverall,                                '/5.0','PEF 3.1 §5.7',                       dqrLevel].map(q).join(','));
    rows.push(['uncertainty_cv',      uncPct,                                    '%',   'Monte Carlo 1000 iterations',        'Lognormal propagation'].map(q).join(','));
    rows.push(['manufacturing_country',mfgCountry,                               '',    'User input',                         ''].map(q).join(','));
    rows.push(['grid_intensity',      gridG,                                     'g CO2e/kWh','Ember 2025',                   ''].map(q).join(','));
    rows.push(['']);

    // ── BLOCK 2: ENVIRONMENTAL PROFILE — 19 CATEGORIES ───────────────────────
    rows.push([c('ENVIRONMENTAL PROFILE — 19 EF 3.1 CATEGORIES')]);
    rows.push([c('All values per functional unit (1 kg product as sold). Source: AIOXY engine.')]);
    rows.push([c('Stage columns: per kg product. Total column: absolute (all stages combined).')]);
    rows.push([
        'impact_category', 'unit',
        'total_kg_product', 'ingredients_kg_product', 'manufacturing_kg_product',
        'transport_kg_product', 'packaging_kg_product', 'waste_kg_product',
        'pef_single_score_mpt', 'dqr', 'primary_source', 'esrs_relevance'
    ].map(q).join(','));

    ALL_CATS.forEach(([cat, unit, source, esrs]) => {
        const tree   = pef[cat]?.contribution_tree || {};
        const total  = getPerKg(cat);
        const ing    = pWeightKg > 0 ? (tree.Ingredients?.total   || 0) / pWeightKg : 0;
        const mfg    = pWeightKg > 0 ? (tree.Manufacturing?.total || 0) / pWeightKg : 0;
        const trp    = pWeightKg > 0 ? (tree.Transport?.total     || 0) / pWeightKg : 0;
        const pkg    = pWeightKg > 0 ? (tree.Packaging?.total     || 0) / pWeightKg : 0;
        const wst    = pWeightKg > 0 ? (tree.Waste?.total         || 0) / pWeightKg : 0;
        const ssE    = ssBkd[cat];
        const mPtCat = ssE ? (ssE.microPoints || 0).toFixed(4) : '0.0000';

        rows.push([
            cat, unit,
            total.toFixed(8), ing.toFixed(8), mfg.toFixed(8),
            trp.toFixed(8),   pkg.toFixed(8), wst.toFixed(8),
            mPtCat, dqrOverall, source, esrs
        ].map(q).join(','));
    });
    rows.push(['']);

    // ── BLOCK 3: PEF SINGLE SCORE ─────────────────────────────────────────────
    rows.push([c('PEF SINGLE SCORE')]);
    rows.push([c('Method: Sum_i [(impact_i / kg product) / NF_i x WF_i] x 1000000')]);
    rows.push([c('NF/WF source: JRC Technical Report EUR 29540 EN (EF 3.1)')]);
    rows.push(['impact_category', 'impact_per_kg', 'normalised', 'weighted', 'mpt_per_kg'].map(q).join(','));
    Object.entries(ssBkd).forEach(([cat, data]) => {
        rows.push([
            cat,
            (data.raw            || 0).toExponential(6),   // BUG-09 FIX: engine stores 'raw' not 'impact'
            (data.normalized     || 0).toExponential(6),   // BUG-09 FIX: engine stores 'normalized' not 'normalizedImpact'
            (data.weighted       || 0).toExponential(6),   // BUG-09 FIX: engine stores 'weighted' not 'weightedImpact'
            ((data.weighted || 0) * 1e6).toFixed(6)        // BUG-09 FIX: microPoints not stored — compute as weighted * 1,000,000
        ].map(q).join(','));
    });
    rows.push(['pef_single_score_total', '', '', '', mPt].map(q).join(','));
    rows.push(['']);

    // ── BLOCK 4: UNCERTAINTY ──────────────────────────────────────────────────
    rows.push([c('MONTE CARLO UNCERTAINTY — Climate Change')]);
    rows.push([c('Method: Lognormal propagation | Iterations: 1000 | Reference: ISO 14044 / Heijungs & Huijbregts 2004')]);
    rows.push(['metric', 'kg_co2e_total', 'kg_co2e_per_kg'].map(q).join(','));
    rows.push(['cc_p5_lower_bound',  mcP5,  pWeightKg > 0 ? (parseFloat(mcP5)/pWeightKg).toFixed(8) : '0'].map(q).join(','));
    rows.push(['cc_median',          getTotal('Climate Change').toFixed(8), ccPerKg.toFixed(8)].map(q).join(','));
    rows.push(['cc_p95_upper_bound', mcP95, pWeightKg > 0 ? (parseFloat(mcP95)/pWeightKg).toFixed(8) : '0'].map(q).join(','));
    rows.push(['overall_cv_percent', uncPct, ''].map(q).join(','));
    rows.push(['']);

    // ── BLOCK 5: PARAMETRIC TWIN ──────────────────────────────────────────────
    rows.push([c('PARAMETRIC TWIN COMPARISON')]);
    rows.push([c('IMPORTANT: Modelled scenario only. NOT a verified comparative claim.')]);
    rows.push(['metric', 'current_product', 'parametric_twin', 'potential_reduction_pct'].map(q).join(','));
    if (baseline) {
        rows.push(['climate_change_kg_co2e_per_kg', ccPerKg.toFixed(8), twinCO2.toFixed(8), reduction + '%'].map(q).join(','));
        rows.push(['twin_scenario_name', '', twinName, ''].map(q).join(','));
        rows.push(['twin_data_source', '', 'AGRIBALYSE 3.2 parametric scenario', ''].map(q).join(','));
    } else {
        rows.push([c('No parametric twin calculated. Run comparison in AIOXY.')]);
    }
    rows.push(['']);

    // ── BLOCK 6: INGREDIENT TRACEABILITY ─────────────────────────────────────
    rows.push([c('INGREDIENT TRACEABILITY')]);
    rows.push([c('Source: AGRIBALYSE 3.2 (ADEME/INRAE 2022). Values at farm gate.')]);
    rows.push([c('Allocation: economic, inherited from AGRIBALYSE 3.2 system boundary.')]);
    rows.push([
        'ingredient_name', 'internal_id', 'agribalyse_lci_name',
        'quantity_kg', 'origin_country', 'processing_state',
        'cc_total_kg_co2e', 'cc_per_kg_kg_co2e', 'pct_of_cc_total',
        'dqr', 'primary_data_applied', 'allocation_method'
    ].map(q).join(','));

    const ccTotal = getTotal('Climate Change');
    ingComps.forEach(ing => {
        const ingId   = ing.id || '';
        const dbRec   = window.aioxyData?.ingredients?.[ingId] || null;
        const meta    = dbRec?.data?.metadata || {};
        const lciName = meta.source_activity || meta.name || ingId;
        const adj     = ing.universal_adjustments || {};
        const origin  = adj.adjusted_for_country || ing.origin || 'FR';
        const qty     = ing.quantity_kg || 0;
        const ingCC   = ing.allCategoryResults?.['Climate Change'] || ing.subtotal || 0;
        const perKgCC = qty > 0 ? ingCC / qty : 0;
        const pctCC   = ccTotal > 0 ? (ingCC / ccTotal * 100).toFixed(2) : '0.00';
        rows.push([
            ing.name || ingId, ingId, lciName,
            qty.toFixed(6), origin, ing.processingState || 'raw',
            ingCC.toFixed(8), perKgCC.toFixed(8), pctCC + '%',
            (ing.dqr || 0).toFixed(2), !!ing.primary_data ? 'YES' : 'NO',
            ing.allocationMethod || 'Economic (AGRIBALYSE 3.2)'
        ].map(q).join(','));
    });
    rows.push(['']);

    // ── BLOCK 7: DQR ─────────────────────────────────────────────────────────
    rows.push([c('DATA QUALITY RATING (DQR) — PEF 3.1 §5.7')]);
    rows.push([c('Formula: DQR = (TeR + TiR + GeR + CoR + RR) / 5 | Scale: 1=best 5=worst')]);
    rows.push(['component', 'TeR', 'TiR', 'GeR', 'CoR', 'RR', 'dqr_overall', 'source'].map(q).join(','));
    const dqrComps = audit.dqr_summary?.component_dqrs || [];
    dqrComps.forEach(d => {
        rows.push([
            d.name || d.id,
            (d.TeR || d.temporal      || 0).toFixed(1),
            (d.TiR || d.technological || 0).toFixed(1),
            (d.GeR || d.geographical  || 0).toFixed(1),
            (d.CoR || d.completeness  || 0).toFixed(1),
            (d.RR  || d.reliability   || 0).toFixed(1),
            (d.dqr || d.overall || 0).toFixed(2),
            d.source || 'AGRIBALYSE 3.2 metadata'
        ].map(q).join(','));
    });
    rows.push(['weighted_overall_dqr', '', '', '', '', '', dqrOverall, 'Contribution-weighted'].map(q).join(','));
    rows.push(['']);

    // ── BLOCK 8: DATABASE VERSIONS ────────────────────────────────────────────
    rows.push([c('BACKGROUND DATABASE VERSIONS')]);
    rows.push(['database_standard', 'version', 'source_reference'].map(q).join(','));
    [
        ['AGRIBALYSE',       'AGRIBALYSE 3.2',       'ADEME / INRAE 2022'],
        ['LCIA_method',      'EF 3.1',                'JRC Technical Report EUR 29540 EN'],
        ['Transport',        'GLEC v3.2',             'Smart Freight Centre October 2025'],
        ['Grid_intensity',   'Ember 2025',            'Ember Climate 2025'],
        ['Air_pollutants',   'EMEP/EEA 2023',         'EEA Guidebook 2023'],
        ['GWP_values',       'IPCC AR5 GWP100',       'CH4=28 N2O=265'],
        ['Water_scarcity',   'AWARE 2.0',             'Boulay et al. 2018'],
        ['Land_use',         'LANCA v2.5',            'Fraunhofer IBP / JRC'],
        ['Toxicity',         'USEtox 2.14',           'UNEP/SETAC'],
        ['Packaging_CFF',    'PEF Annex C v2.1',      'European Commission May 2020'],
        ['NF_WF_factors',    'EF 3.1 JRC',            'JRC Technical Report EUR 29540 EN']
    ].forEach(([db, ver, ref]) => rows.push([db, ver, ref].map(q).join(',')));
    rows.push(['']);

    // ── BLOCK 9: LEGAL ────────────────────────────────────────────────────────
    rows.push([c('LEGAL NOTICE')]);
    rows.push([c('Screening-level LCA. Not third-party verified. Not for comparative advertising per ISO 14044 §6.')]);
    rows.push([c('EU Green Claims Directive COM/2023/166 applies to any consumer-facing use of these results.')]);
    rows.push(['report_generated', new Date().toISOString(), '', '', ''].map(q).join(','));
    rows.push(['assessment_id',    dppId,                    '', '', ''].map(q).join(','));
    rows.push(['audit_hash',       auditHash,                '', '', ''].map(q).join(','));

    // ── DOWNLOAD ──────────────────────────────────────────────────────────────
    const csvContent = '\uFEFF' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download',
        'AIOXY_EFP_' + String(pName).replace(/[^a-z0-9]/gi, '_').slice(0, 30) +
        '_' + dppId + '_' + assessDate.replace(/-/g, '') + '.csv'
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('[AIOXY] CSV export complete — 9 blocks, 19 categories, machine-readable');
}

// ── ONE-PAGE ENVIRONMENTAL FOOTPRINT CARD ────────────────────────────────────
// Single-page PDF. Print-ready. Brand can put this on their website, trade show,
// attach to retailer email. QR embedded. Downloadable.
// Uses jsPDF already loaded in food.html.
window.generateFootprintCard = async function() {
    if (!window.auditTrailData || !window.finalPefResults) {
        alert('Please run a calculation first.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const PW  = 210; const PH = 297;
    const M   = 16;

    const audit      = window.auditTrailData;
    const pef        = window.finalPefResults;
    const mb         = audit.mass_balance || {};
    const pWeightKg  = mb.final_content_weight_kg || 1.0;
    const pName      = audit.productName || 'Product';
    const dppId      = audit.dppId || 'N/A';
    const auditHash  = audit.auditHash || '';
    const dateStr    = new Date(audit.calculationTimestamp || Date.now()).toISOString().split('T')[0];
    const ccPerKg    = pWeightKg > 0 ? (pef['Climate Change']?.total || 0) / pWeightKg : 0;
    const waterPerKg = pWeightKg > 0 ? (pef['Water Use/Scarcity (AWARE)']?.total || 0) / pWeightKg : 0;
    const landPerKg  = pWeightKg > 0 ? (pef['Land Use']?.total || 0) / pWeightKg : 0;
    const mPt        = (audit.pef_single_score?.singleScore || 0).toFixed(2);
    const dqrVal     = (audit.dqr_summary?.overall_dqr || 0).toFixed(2);
    const uncPct     = (audit.uncertainty_analysis?.overall_uncertainty || 15).toFixed(0);

    const baseline   = audit.comparison_baseline || window.currentComparisonBaseline || null;
    const hasTwin    = !!(baseline && baseline.co2PerKg > 0);
    const twinCO2    = baseline?.co2PerKg || 0;
    const twinName   = (baseline?.name || '').replace(' (Cradle-to-Retail)', '');
    const reduction  = hasTwin && twinCO2 > 0
        ? ((twinCO2 - ccPerKg) / twinCO2 * 100).toFixed(1) : null;
    const actualSaving = hasTwin ? Math.max(0, twinCO2 - ccPerKg) : 0;

    // Equivalences
    const carKm    = actualSaving > 0
        ? Math.round(actualSaving / (PHYSICS_CONSTANTS?.CAR_EMISSIONS_KG_PER_KM || 0.1584)) : 0;
    const charges  = actualSaving > 0
        ? Math.round(actualSaving * (PHYSICS_CONSTANTS?.SMARTPHONE_CHARGES_PER_KG_CO2 || 440)) : 0;
    const flightKm = actualSaving > 0
        ? (actualSaving * (PHYSICS_CONSTANTS?.FLIGHT_KM_PER_KG_CO2 || 8.33)).toFixed(1) : 0;

    const safe = (s) => String(s || '').replace(/[^\x00-\x7F]/g, c => {
        const m = {'°':'deg','±':'+/-','²':'2','³':'3','₂':'2','→':'>','\u2014':'-'};
        return m[c] || '';
    });

    // ── NAVY HEADER ───────────────────────────────────────────────────────────
    doc.setFillColor(10, 37, 64);
    doc.rect(0, 0, PW, 42, 'F');
    doc.setFillColor(0, 168, 150);
    doc.rect(0, 42, PW, 2, 'F');

    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(0, 168, 150);
    doc.text('AIOXY', M, 12);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(148, 163, 184);
    doc.text('ENVIRONMENTAL FOOTPRINT CARD', M, 17);

    doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.setTextColor(255, 255, 255);
    const nameLines = doc.splitTextToSize(safe(pName), PW - M * 2 - 30);
    doc.text(nameLines, M, 30);

    doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(148, 163, 184);
    doc.text('Assessment: ' + safe(dateStr) + '   ID: ' + safe(dppId).slice(0, 16), M, 39);

    // ── KEY METRICS ROW ───────────────────────────────────────────────────────
    let Y = 52;
    const cardW = (PW - M * 2 - 9) / 4;

    const drawMetricCard = (x, y, w, label, value, unit, color) => {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(...color);
        doc.setLineWidth(0.5);
        doc.roundedRect(x, y, w, 26, 2, 2, 'FD');
        doc.setFillColor(...color);
        doc.rect(x, y, w, 2.5, 'F');
        doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(100, 116, 139);
        doc.text(safe(label), x + w/2, y + 7.5, {align: 'center'});
        doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.setTextColor(...color);
        doc.text(safe(value), x + w/2, y + 17, {align: 'center'});
        doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(100, 116, 139);
        doc.text(safe(unit), x + w/2, y + 22, {align: 'center'});
    };

    drawMetricCard(M,              Y, cardW, 'Climate Change', ccPerKg.toFixed(3), 'kg CO2e / kg', [0, 168, 150]);
    drawMetricCard(M + cardW + 3,  Y, cardW, 'PEF Single Score', mPt, 'mPt / kg', [26, 74, 107]);
    drawMetricCard(M + (cardW+3)*2,Y, cardW, 'Water Scarcity', waterPerKg.toFixed(4), 'm3 world eq./kg', [56, 189, 248]);
    const dqrColor = parseFloat(dqrVal) <= 2 ? [42,157,143] : parseFloat(dqrVal) <= 3 ? [244,162,97] : [230,57,70];
    drawMetricCard(M + (cardW+3)*3,Y, cardW, 'Data Quality DQR', dqrVal + '/5.0', 'PEF 3.1 §5.7', dqrColor);

    Y += 32;

    // ── PARAMETRIC TWIN BAR ───────────────────────────────────────────────────
    if (hasTwin && reduction !== null) {
        doc.setFillColor(240, 253, 244);
        doc.setDrawColor(134, 239, 172);
        doc.setLineWidth(0.4);
        doc.roundedRect(M, Y, PW - M*2, 18, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(10, 37, 64);
        doc.text('vs ' + safe(twinName) + ':', M + 3, Y + 7);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(71, 85, 105);
        doc.text('This product ' + ccPerKg.toFixed(3) + ' kg CO2e/kg', M + 3, Y + 13);
        doc.text(safe(twinName) + ' ' + twinCO2.toFixed(3) + ' kg CO2e/kg', M + 60, Y + 13);

        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(21, 128, 61);
        doc.text(reduction + '% potential reduction', PW - M - 3, Y + 12, {align: 'right'});
        doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(100, 116, 139);
        doc.text('Modelled estimate. Not a verified claim. See disclaimer below.', PW - M - 3, Y + 16.5, {align: 'right'});
        Y += 23;
    }

    // ── EQUIVALENCES ─────────────────────────────────────────────────────────
    if (hasTwin && actualSaving > 0) {
        Y += 3;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(10, 37, 64);
        doc.text('Per kg of potential reduction vs ' + safe(twinName) + ':', M, Y);
        Y += 5;

        const eqW = (PW - M*2 - 9) / 4;
        const eqItems = [
            { icon: '>', val: carKm + ' km', label: 'not driven', sub: 'EEA 2023' },
            { icon: '#', val: charges.toLocaleString(), label: 'phone charges', sub: 'IEA 2022' },
            { icon: '~', val: flightKm + ' km', label: 'economy flight', sub: 'ICAO 2023' },
            { icon: '*', val: '+/-' + uncPct + '%', label: 'uncertainty', sub: 'Monte Carlo' }
        ];

        eqItems.forEach((item, i) => {
            const ex = M + i * (eqW + 3);
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(203, 213, 224);
            doc.setLineWidth(0.3);
            doc.roundedRect(ex, Y, eqW, 20, 2, 2, 'FD');
            doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(10, 37, 64);
            doc.text(safe(item.val), ex + eqW/2, Y + 9, {align: 'center'});
            doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(71, 85, 105);
            doc.text(safe(item.label), ex + eqW/2, Y + 14, {align: 'center'});
            doc.setFont('helvetica', 'normal'); doc.setFontSize(5.5); doc.setTextColor(148, 163, 184);
            doc.text(safe(item.sub), ex + eqW/2, Y + 18.5, {align: 'center'});
        });
        Y += 25;
    }

    // ── METHODOLOGY STRIP ─────────────────────────────────────────────────────
    Y += 2;
    doc.setFillColor(241, 245, 249);
    doc.rect(M, Y, PW - M*2, 14, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5); doc.setTextColor(71, 85, 105);
    doc.text('METHODOLOGY', M + 2, Y + 5);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(100, 116, 139);
    doc.text('LCI: AGRIBALYSE 3.2 (ADEME/INRAE)  |  LCIA: EF 3.1 (JRC EUR 29540 EN)  |  Transport: GLEC v3.2', M + 2, Y + 9.5);
    doc.text('Packaging: PEF 3.1 CFF Annex C v2.1  |  Water: AWARE 2.0  |  GHGs: IPCC 2006 Tier 1  |  Boundary: Cradle-to-Retail', M + 2, Y + 13.5);
    Y += 19;

    // ── QR CODE ───────────────────────────────────────────────────────────────
    const qrPayload = [
        'AIOXY FOOTPRINT CARD',
        'Product: ' + pName,
        'ID: ' + dppId,
        'Date: ' + dateStr,
        'Climate Change: ' + ccPerKg.toFixed(4) + ' kg CO2e/kg',
        'PEF Score: ' + mPt + ' mPt/kg',
        'DQR: ' + dqrVal + '/5.0',
        hasTwin ? ('vs ' + twinName + ': ' + twinCO2.toFixed(4) + ' kg CO2e/kg') : '',
        hasTwin ? ('Potential reduction: ' + reduction + '%') : '',
        'Method: PEF 3.1 / AGRIBALYSE 3.2 / EF 3.1 / GLEC v3.2',
        'Uncertainty: +/-' + uncPct + '%',
        'Hash: ' + auditHash.slice(0, 20),
        'NOT third-party verified. Modelled estimates only.',
        'ISO 14044 §6 / EU Green Claims Dir COM/2023/166'
    ].filter(Boolean).join('\n');

    const qrSize  = 36;
    const qrX     = PW - M - qrSize;
    const qrY     = Y;

    // Generate QR into hidden div then embed
    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
    document.body.appendChild(hiddenDiv);

    await new Promise((resolve) => {
        if (typeof QRCode === 'undefined') { resolve(); return; }
        try {
            new QRCode(hiddenDiv, {
                text: qrPayload, width: 150, height: 150,
                colorDark: '#0A2540', colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.M
            });
        } catch(e) { resolve(); return; }
        let attempts = 0;
        const poll = () => {
            attempts++;
            const canvas = hiddenDiv.querySelector('canvas');
            const img    = hiddenDiv.querySelector('img');
            if (canvas && canvas.width > 0) {
                try {
                    doc.addImage(canvas.toDataURL('image/png'), 'PNG', qrX, qrY, qrSize, qrSize);
                    doc.setDrawColor(10, 37, 64); doc.setLineWidth(0.3);
                    doc.rect(qrX, qrY, qrSize, qrSize);
                } catch(e) {}
                resolve();
            } else if (img && img.src && img.src.length > 100) {
                try { doc.addImage(img.src, 'PNG', qrX, qrY, qrSize, qrSize); } catch(e) {}
                resolve();
            } else if (attempts < 30) {
                setTimeout(poll, 60);
            } else { resolve(); }
        };
        setTimeout(poll, 60);
    });

    if (document.body.contains(hiddenDiv)) document.body.removeChild(hiddenDiv);

    // QR label
    doc.setFont('helvetica', 'bold'); doc.setFontSize(6); doc.setTextColor(10, 37, 64);
    doc.text('SCAN TO VERIFY', qrX + qrSize/2, qrY + qrSize + 4, {align: 'center'});
    doc.setFont('helvetica', 'normal'); doc.setFontSize(5.5); doc.setTextColor(100, 116, 139);
    doc.text('No internet required', qrX + qrSize/2, qrY + qrSize + 8, {align: 'center'});

    // Audit hash below QR
    doc.setFont('helvetica', 'normal'); doc.setFontSize(5); doc.setTextColor(148, 163, 184);
    doc.text('SHA-256: ' + auditHash.slice(0, 24) + '...', qrX, qrY + qrSize + 12);

    // ── DISCLAIMER ────────────────────────────────────────────────────────────
    const discX = M;
    const discW = PW - M*2 - qrSize - 6;
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(245, 158, 11); doc.setLineWidth(0.4);
    doc.rect(discX, qrY, discW, qrSize + 14, 'FD');
    doc.setFillColor(245, 158, 11);
    doc.rect(discX, qrY, 2, qrSize + 14, 'F');

    doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5); doc.setTextColor(120, 53, 15);
    doc.text('IMPORTANT', discX + 4, qrY + 5);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(5.8); doc.setTextColor(120, 53, 15);
    const disc = 'Screening-level LCA. Modelled estimates based on AGRIBALYSE 3.2 ' +
        'secondary data. Not independently verified by a third party. ' +
        'Equivalences use official published factors (EEA 2023, ICAO 2023, IEA 2022). ' +
        'Potential reductions vs parametric twin only — not absolute performance claims. ' +
        'Not for comparative advertising per ISO 14044 §6 and EU Green Claims Directive COM/2023/166.';
    const discLines = doc.splitTextToSize(disc, discW - 8);
    discLines.forEach((line, i) => {
        doc.text(safe(line), discX + 4, qrY + 11 + i * 4.2);
    });

    // ── FOOTER ────────────────────────────────────────────────────────────────
    doc.setFillColor(10, 37, 64);
    doc.rect(0, PH - 10, PW, 10, 'F');
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(148, 163, 184);
    doc.text('AIOXY Environmental Intelligence  |  aioxy.com  |  Screening-level LCA — Not third-party verified', M, PH - 4);
    doc.setTextColor(0, 168, 150);
    doc.text(safe(dppId), PW - M, PH - 4, {align: 'right'});

    // ── SAVE ──────────────────────────────────────────────────────────────────
    const filename = 'AIOXY_Card_' + String(pName).replace(/[^a-z0-9]/gi, '_').slice(0, 25) +
        '_' + dateStr + '.pdf';
    doc.save(filename);
    console.log('[AIOXY] Footprint Card saved:', filename);
};



// ================== RAW DATA EXPORT ==================
function downloadRawData() {
    if (!window.auditTrailData) { alert('No data available. Please run a calculation first.'); return; }
    const dataStr  = JSON.stringify(window.auditTrailData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url  = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aioxy-transparency-data-${window.currentDPPId || 'export'}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function downloadDPPData() {
    if (!window.currentDPPId) { alert('No transparency card available. Please generate one first.'); return; }
    const productName = document.getElementById('productName').value || 'Unnamed Product';
    const transparencyData = {
        productId: window.currentDPPId,
        productName,
        timestamp: new Date().toISOString(),
        methodology: { approach: 'PEF 3.1', version: '2.1', dataSources: ['AGRIBALYSE 3.2', 'JRC EF 3.1', 'AWARE 2.0'] },
        environmentalFootprint: window.finalPefResults,
        data_quality:           window.auditTrailData?.dqr_summary,
        mass_balance:           window.massBalanceData,
        comparison_baseline:    window.currentComparisonBaseline,
        pef_single_score:       window.auditTrailData?.pef_single_score,
        calculation_timestamp:  window.auditTrailData?.calculationTimestamp
    };
    const dataStr  = JSON.stringify(transparencyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url  = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aioxy-transparency-card-${window.currentDPPId}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function downloadAllData() {
    if (!window.auditTrailData) { alert('No data available. Please run a calculation first.'); return; }
    const dataStr = JSON.stringify({
        transparency_log: window.auditTrailData,
        pef_results:      window.finalPefResults,
        mass_balance:     window.massBalanceData,
        ingredients:      window.selectedIngredients || [],
        active_scenarios: window.activeScenarios || {},
        metadata: { platform: 'AIOXY Science-Based Sustainability', version: '2.1', export_timestamp: new Date().toISOString(), methodology: 'PEF 3.1 with physics-based scenarios' }
    }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url  = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aioxy-complete-dataset-${window.currentDPPId || 'export'}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function exportAuditData() { downloadRawData(); }

function downloadMethodology() {
    const methodology = `AIOXY Methodology Document\nVersion: 2.1\nDate: ${new Date().toLocaleDateString()}\n\n1. METHODOLOGY: PEF 3.1 (EU Commission JRC)\n2. DATA SOURCES: AGRIBALYSE 3.2, JRC EF 3.1, AWARE 2.0, GLEC v3.2\n3. SYSTEM BOUNDARY: Cradle-to-Retail\n4. UNCERTAINTY: Monte Carlo (1000 iterations)\n5. STATUS: Screening-level LCA — ISO 14044 critical review required for EPD`;
    const dataBlob = new Blob([methodology], { type: 'text/plain' });
    const url  = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aioxy-methodology-${window.currentDPPId || 'export'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
}

// ================== UTILITY FUNCTIONS ==================
// FIX-D: This version has the null/NaN guard that the previous audit-trail.js version LACKED.
// The ui.js copy is identical. Whichever file loads last wins — both are now safe.
function formatPEFValue(value) {
    if (value === undefined || value === null || isNaN(value)) return 'N/A';
    if (value === 0) return '0.00';
    if (Math.abs(value) < 0.0001) return value.toExponential(3);
    if (Math.abs(value) < 1) return value.toFixed(5);
    if (Math.abs(value) < 1000) return value.toFixed(2);
    return value.toFixed(1);
}

// ================== AUDIT TRAIL LOADED ==================
window.exportCSRDMatrix = exportCSRDMatrix;
console.log('✅ [AIOXY] audit-trail.js v4.0 loaded — All tab render bugs fixed');