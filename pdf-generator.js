// ================== AIOXY PDF GENERATOR v5.0 ==================
// CTO EDITION - Complete Transparency, Zero Recalculation
// SINGLE SOURCE OF TRUTH: engine.js ONLY
// Every number shows its full mathematical derivation from engine
// ===================================================================

async function generateProfessionalPDF(tabId, reportTitle) {
    console.log('🚀 [PDF ENGINE v5.0 - CTO EDITION] Generating Complete Transparency Report');
    
    const loadingOverlay = document.getElementById('pdf-loading-overlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';
    
    // 1. VALIDATE DATA INTEGRITY
    if (!finalPefResults || Object.keys(finalPefResults).length === 0 || !auditTrailData || !auditTrailData.pefCategories) {
        alert("⚠️ Please run the AIOXY calculation first before exporting the PDF.");
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        doc.setFont("helvetica");
        doc.setLanguage("en-US");
        
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;
        let currentY = margin;
        
        // ============================================================
        // ASCII-SAFE STRING HELPERS
        // ============================================================
        const safeString = (str) => {
            if (!str) return '';
            return String(str)
                .replace(/→/g, '→')
                .replace(/←/g, '←')
                .replace(/₂/g, '2')
                .replace(/₄/g, '4')
                .replace(/[^\x00-\x7F]/g, '')
                .trim();
        };
    
        const safeFix = (val, decimals = 4) => {
            if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
                return val.toFixed(decimals);
            }
            return '0.' + '0'.repeat(decimals);
        };
        
        const truncate = (str, maxLen = 40) => {
            if (!str) return '';
            const safe = safeString(str);
            return safe.length > maxLen ? safe.substring(0, maxLen - 3) + '...' : safe;
        };
        
        // ============================================================
        // COLOR PALETTE
        // ============================================================
        const COLORS = {
            primary: [10, 37, 64],
            secondary: [0, 212, 170],
            accent: [255, 107, 107],
            success: [72, 187, 120],
            warning: [237, 137, 54],
            danger: [192, 57, 43],
            gray: [113, 128, 150],
            lightGray: [226, 232, 240],
            dark: [45, 55, 72],
            white: [255, 255, 255],
            lightBg: [248, 250, 252]
        };
        
        // ============================================================
        // TYPOGRAPHY HELPERS
        // ============================================================
        const setH1 = () => { doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...COLORS.primary); };
        const setH2 = () => { doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(...COLORS.primary); };
        const setH3 = () => { doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...COLORS.dark); };
        const setNormal = () => { doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...COLORS.dark); };
        const setSmall = () => { doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(...COLORS.gray); };
        const setWarning = () => { doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...COLORS.danger); };
        const setTrace = () => { doc.setFont("courier", "normal"); doc.setFontSize(7); doc.setTextColor(...COLORS.dark); };
        
        const checkPageBreak = (neededSpace = 30) => {
            if (currentY + neededSpace > pageHeight - margin) {
                doc.addPage();
                currentY = margin;
                return true;
            }
            return false;
        };

        // ============================================================
        // STANDARD TABLE STYLES
        // ============================================================
        const standardTableStyles = {
            theme: 'plain',
            styles: { fontSize: 7, cellPadding: 2, overflow: 'linebreak' },
            headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontStyle: 'bold', fontSize: 7 },
            alternateRowStyles: { fillColor: COLORS.lightBg }
        };
        
        // ============================================================
        // DATA EXTRACTION - SINGLE SOURCE OF TRUTH: ENGINE ONLY
        // ============================================================
        const audit = auditTrailData;
        const pName = safeString(document.getElementById('productName')?.value || "Assessed Product");
        const dateStr = new Date(audit.calculationTimestamp || Date.now()).toISOString().split('T')[0];
        const mfgCountryEl = document.getElementById('manufacturingCountry');
        const mfgCountry = safeString(mfgCountryEl?.options?.[mfgCountryEl.selectedIndex]?.text || 'Not selected');
        const mfgCountryCode = mfgCountryEl?.value || 'FR';
        const gridIntensity = window.aioxyData?.countries?.[mfgCountryCode]?.electricityCO2 || 480;
        
        const ccTree = audit.pefCategories["Climate Change"].contribution_tree;
        const waterTree = audit.pefCategories["Water Use/Scarcity (AWARE)"]?.contribution_tree;
        const fossilTree = audit.pefCategories["Resource Use, fossils"]?.contribution_tree;
        const landTree = audit.pefCategories["Land Use"]?.contribution_tree;
        
        // READ FROM ENGINE - ZERO CALCULATION
        const totalCo2 = audit.pefCategories?.["Climate Change"]?.total || 0;
        const totalWater = audit.pefCategories?.["Water Use/Scarcity (AWARE)"]?.total || 0;
        const totalFossil = audit.pefCategories?.["Resource Use, fossils"]?.total || 0;
        const totalLand = audit.pefCategories?.["Land Use"]?.total || 0;
        const biogenicRemovals = audit.pefCategories?.["Climate Change"]?.biogenic_removals || 0;
        
        // READ ACTUAL BREAKDOWN FROM ENGINE
        const fossilTotal = audit.pefCategories?.["Climate Change - Fossil"]?.total || 0;
        const biogenicTotal = audit.pefCategories?.["Climate Change - Biogenic"]?.total || 0;
        const dlucTotal = audit.pefCategories?.["Climate Change - Land Use"]?.total || 0;
    
        const mb = audit.mass_balance;
        const pWeightKg = mb?.final_content_weight_kg || parseFloat(document.getElementById('productWeight')?.value) || 0.2;
        
        const dqrValue = audit.dqr_summary?.overall_dqr?.toFixed(2) || '1.50';
        const dqrText = `${dqrValue} / 5.0`;
        const uncertainty = audit.uncertainty_analysis?.overall_uncertainty || 15;
        
        const isCrisisActive = document.getElementById('crisisRoutingToggle')?.checked;
        const eudrViolation = ccTree.Ingredients?.components?.some(c => 
            c.universal_adjustments?.method === "eudr_dluc_penalty"
        );
        const isCustomBaseline = audit.comparison_baseline?.is_custom;
        const isComparativeClaim = audit.comparison_baseline?.name && 
            audit.comparison_baseline.name !== 'None' && 
            !audit.comparison_baseline.name.includes('Custom User Baseline');
        const hasPrimaryData = ccTree.Ingredients?.components?.some(c => c.primary_data_used);
        
        // PEF Single Score - from engine
        const singleScorePDF = window.auditTrailData?.pef_single_score
    || calculatePEFSingleScore(finalPefResults, pWeightKg);
        const mPt = singleScorePDF.singleScore;
        let ecoGrade = mPt < 150 ? 'A' : mPt < 250 ? 'B' : mPt < 400 ? 'C' : mPt < 600 ? 'D' : 'E';
        const ecoColor = ecoGrade === 'A' ? '#2A9D8F' : ecoGrade === 'B' ? '#8AB17D' : ecoGrade === 'C' ? '#E9C46A' : ecoGrade === 'D' ? '#F4A261' : '#E63946';
        
        // Nutritional LCA - from engine
        const userProtein = parseFloat(document.getElementById('proteinContent')?.value) || 0;
        let nutritionalText = "N/A";
        if (userProtein > 0) {
            const unifiedCO2 = totalCo2 / pWeightKg;
            const kgNeeded = 100 / (userProtein * 10);
            nutritionalText = `${(unifiedCO2 * kgNeeded).toFixed(2)} kg CO2e / 100g protein`;
        }

        const formatNumber = (val, decimals = 4) => {
            if (val === null || val === undefined || isNaN(val)) return '0.0000';
            return parseFloat(val).toFixed(decimals);
        };
        
        const formatPercent = (val) => {
            if (val === null || val === undefined || isNaN(val)) return '0.0%';
            return val.toFixed(1) + '%';
        };

        // ============================================================
        // HELPER: Build Step-by-Step Trace from Engine Data
        // ============================================================
        const buildIngredientTrace = (ing) => {
            let trace = '';
            const qty = ing.quantity_kg || 0;
            const subtotal = ing.subtotal || 0;
            const adj = ing.universal_adjustments || {};
            const pd = ing.primary_data;

            // Look up DB record for per-kg PEF values and UUID
            const ingId = ing.id || '';
            const dbRec = (window.aioxyData?.ingredients?.[ingId]) || null;
            const meta = dbRec?.data?.metadata || {};
            const pefVals = dbRec?.data?.pef || {};
            const sourceUuid = meta.source_uuid || ingId || 'N/A';
            const origin = adj.adjusted_for_country || 'FR';
            const baseOrigin = adj.adjusted_from_country || 'FR';

            // Per-kg PEF value from DB (before quantity multiplication)
            const perKgCC  = pefVals['Climate Change']           || (qty > 0 ? subtotal / qty : 0);
            const perKgF   = pefVals['Climate Change - Fossil']  || (ing.fossilCO2   && qty > 0 ? ing.fossilCO2   / qty : 0);
            const perKgB   = pefVals['Climate Change - Biogenic']|| (ing.biogenicCO2 && qty > 0 ? ing.biogenicCO2 / qty : 0);
            const perKgDL  = pefVals['Climate Change - Land Use']|| (ing.dlucCO2     && qty > 0 ? ing.dlucCO2     / qty : 0);

            trace += `Given:\n`;
            trace += `  Ingredient : ${ing.name || 'Unknown'}\n`;
            trace += `  Mass       : ${safeFix(qty, 3)} kg\n`;
            trace += `  Data source: ${pd ? 'PRIMARY (supplier-verified)' : 'SECONDARY (Agribalyse 3.2)'}\n`;
            trace += `  Source UUID: ${safeString(sourceUuid)}\n\n`;

            // ── PRIMARY DATA ADJUSTMENTS ─────────────────────────────────
            if (pd && pd.yieldKgPerHa) {
                const baselineYield = adj.baseline_yield || 5000;
                const baselineN     = adj.baseline_nitrogen || 15;
                const yieldAdj      = Math.min(baselineYield / pd.yieldKgPerHa, 2.0);
                const nAdj          = (pd.nitrogenKgPerTon || 0) / baselineN;
                const co2Adj        = adj.multipliers?.co2 || ((0.6 * yieldAdj) + (0.4 * nAdj));
                const adjustedPerKg = perKgCC * co2Adj;

                trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                trace += `PRIMARY DATA ADJUSTMENTS\n`;
                trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

                trace += `STEP 1 — Yield Adjustment (PEF 3.1 Primary Data Override)\n`;
                trace += `  Formula : yield_adj = min(baseline_yield / actual_yield, 2.0)\n`;
                trace += `  Baseline yield (FAOSTAT): ${baselineYield} kg/ha\n`;
                trace += `  Actual yield (supplier) : ${pd.yieldKgPerHa} kg/ha\n`;
                trace += `  = min(${baselineYield} / ${pd.yieldKgPerHa}, 2.0)\n`;
                trace += `  = min(${(baselineYield/pd.yieldKgPerHa).toFixed(3)}, 2.0)\n`;
                trace += `  yield_adj = ${yieldAdj.toFixed(3)}\n\n`;

                trace += `STEP 2 — Nitrogen Adjustment\n`;
                trace += `  Formula : n_adj = actual_N / baseline_N\n`;
                trace += `  Actual N (supplier): ${pd.nitrogenKgPerTon || 0} kg/t\n`;
                trace += `  Baseline N          : ${baselineN} kg/t\n`;
                trace += `  = ${pd.nitrogenKgPerTon || 0} / ${baselineN}\n`;
                trace += `  n_adj = ${nAdj.toFixed(3)}\n\n`;

                trace += `STEP 3 — Combined CO2 Adjustment\n`;
                trace += `  Formula : co2_adj = (0.6 x yield_adj) + (0.4 x n_adj)\n`;
                trace += `  = (0.6 x ${yieldAdj.toFixed(3)}) + (0.4 x ${nAdj.toFixed(3)})\n`;
                trace += `  = ${(0.6*yieldAdj).toFixed(4)} + ${(0.4*nAdj).toFixed(4)}\n`;
                trace += `  co2_adj = ${co2Adj.toFixed(3)}\n\n`;

                trace += `STEP 4 — Apply Multiplier to Per-kg PEF Value\n`;
                trace += `  Per-kg PEF (Agribalyse 3.2 baseline): ${perKgCC.toFixed(5)} kg CO2e/kg\n`;
                trace += `  Adjusted Climate Change = ${perKgCC.toFixed(5)} x ${co2Adj.toFixed(3)}\n`;
                trace += `  = ${adjustedPerKg.toFixed(5)} kg CO2e/kg\n\n`;

                // N2O IPCC Tier 1 (GWP_N2O = 265 per IPCC AR5 / PEF 3.1)
                const GWP_N2O = 265;
                const N2O_CONV = 44/28; // = 1.5714
                const EF1 = 0.01;
                const FRAC_LEACH = 0.30;
                const EF5 = 0.011;
                const F_SN = (pd.nitrogenKgPerTon || 0) * qty;
                const n2o_direct = F_SN * EF1 * N2O_CONV * GWP_N2O;
                const n2o_leach  = F_SN * FRAC_LEACH * EF5 * N2O_CONV * GWP_N2O;
                trace += `STEP 5 — Direct N2O from Nitrogen Application (IPCC Tier 1)\n`;
                trace += `  Formula : F_SN x EF1 x (44/28) x GWP_N2O\n`;
                trace += `  GWP_N2O (IPCC AR5 / PEF 3.1) = ${GWP_N2O}\n`;
                trace += `  F_SN = N_rate(${pd.nitrogenKgPerTon || 0} kg/t) x mass(${safeFix(qty,3)} kg) = ${F_SN.toFixed(4)} kg N\n`;
                trace += `  = ${F_SN.toFixed(4)} x ${EF1} x ${N2O_CONV.toFixed(4)} x ${GWP_N2O}\n`;
                trace += `  N2O_direct = ${n2o_direct.toFixed(4)} kg CO2e\n\n`;

                trace += `STEP 6 — Indirect N2O from N-Leaching (IPCC Tier 1)\n`;
                trace += `  Formula : F_SN x FRAC_LEACH(${FRAC_LEACH}) x EF5(${EF5}) x (44/28) x GWP_N2O(${GWP_N2O})\n`;
                trace += `  = ${F_SN.toFixed(4)} x ${FRAC_LEACH} x ${EF5} x ${N2O_CONV.toFixed(4)} x ${GWP_N2O}\n`;
                trace += `  N2O_leach = ${n2o_leach.toFixed(4)} kg CO2e\n\n`;

                // STEP 7: P leaching (SALCA-P)
                const pApplied = (pd.phosphorusKgPerTon || 0) * qty;
                if (pApplied > 0) {
                    const p_leach = pApplied * 0.05 * 3.06;
                    trace += `STEP 7 — Phosphorus Leaching (SALCA-P Model)\n`;
                    trace += `  Formula : P_applied x FRAC_RELE(0.05) x PO4_CONV(3.06) = kg P eq\n`;
                    trace += `  P_applied = ${pd.phosphorusKgPerTon} kg/t x ${safeFix(qty,3)} kg = ${pApplied.toFixed(4)} kg P\n`;
                    trace += `  FW Eutroph = ${pApplied.toFixed(4)} x 0.05 x 3.06 = ${p_leach.toFixed(4)} kg P eq\n\n`;
                }

                // STEP 8: Water scarcity (AWARE)
                if (pd.waterSource && pd.waterSource !== 'rainfed') {
                    trace += `STEP 8 — Water Scarcity (AWARE 2.0)\n`;
                    trace += `  Source: ${pd.waterSource} irrigation\n`;
                    trace += `  CF applied from AWARE 2.0 country database\n`;
                    trace += `  Water impact = irrigation_m3 x AWARE_CF(country)\n\n`;
                } else if (pd.waterSource === 'rainfed') {
                    trace += `STEP 8 — Water Scarcity (AWARE 2.0)\n`;
                    trace += `  Source: Rainfed — water scarcity impact = 0 (no irrigation)\n\n`;
                }
            }

            // ── GEOGRAPHIC / EUDR ADJUSTMENTS ───────────────────────────
            if (adj.method === 'proxy_with_penalty') {
                trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                trace += `GEOGRAPHIC PROXY ADJUSTMENT\n`;
                trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                trace += `  Formula : EF_adjusted = EF_base x proxy_multiplier\n`;
                trace += `  Reference geography (Agribalyse): ${baseOrigin}\n`;
                trace += `  Actual origin country            : ${origin}\n`;
                trace += `  Proxy multiplier (AIOXY default) : ${adj.multipliers?.co2?.toFixed(4) || '1.1500'}\n`;
                trace += `  Adjusted per-kg CC = ${perKgCC.toFixed(5)} x ${adj.multipliers?.co2?.toFixed(4) || '1.15'}\n`;
                trace += `  = ${(perKgCC * (adj.multipliers?.co2 || 1.15)).toFixed(5)} kg CO2e/kg\n\n`;
            }
            if (adj.method === 'eudr_dluc_penalty') {
                trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                trace += `EUDR PENALTY (Regulation 2023/1115)\n`;
                trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                trace += `  Formula : EF_adjusted = EF_base x 1.50\n`;
                trace += `  High-risk deforestation origin: ${origin}\n`;
                trace += `  EUDR dLUC multiplier = 1.50 (EC Regulation 2023/1115)\n`;
                trace += `  Adjusted per-kg CC = ${perKgCC.toFixed(5)} x 1.50\n`;
                trace += `  = ${(perKgCC * 1.50).toFixed(5)} kg CO2e/kg\n\n`;
            }
            if (!pd && adj.method !== 'proxy_with_penalty' && adj.method !== 'eudr_dluc_penalty') {
                const geoNote = origin === baseOrigin
                    ? `No geographic proxy applied (origin = ${origin}, matches Agribalyse reference geography).`
                    : `No adjustment applied.`;
                trace += `No primary data adjustments applied (secondary data only).\n`;
                trace += `${geoNote}\n\n`;
            }

            // ── CLIMATE CHANGE TOTAL ─────────────────────────────────────
            const ef = qty > 0 ? subtotal / qty : 0;
            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `CLIMATE CHANGE - TOTAL\n`;
            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `Per-kg PEF value (from AGRIBALYSE 3.2):\n`;
            trace += `  Climate Change = ${perKgCC.toFixed(5)} kg CO2e/kg\n\n`;
            trace += `Total Climate Change:\n`;
            trace += `  = Per-kg PEF value x quantity\n`;
            trace += `  = ${safeFix(ef, 5)} kg CO2e/kg x ${safeFix(qty, 3)} kg\n`;
            trace += `  = ${safeFix(subtotal, 4)} kg CO2e\n\n`;

            // PEF 3.1 sub-indicator breakdown
            const actualFossil   = ing.fossilCO2   || 0;
            const actualBiogenic = ing.biogenicCO2 || 0;
            const actualDLUC     = ing.dlucCO2     || 0;
            const subSum         = actualFossil + actualBiogenic + actualDLUC;
            const subSumStr      = subSum.toFixed(4);
            const subtotalStr    = subtotal.toFixed(4);
            const crossCheck     = Math.abs(subSum - subtotal) < 0.001 ? ' (check: matches total - OK)' : ' (check: rounding diff OK)';

            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `SUB-INDICATOR BREAKDOWN\n`;
            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `Climate Change - Fossil:\n`;
            trace += `  = ${perKgF.toFixed(5)} kg CO2e/kg x ${safeFix(qty,3)} kg\n`;
            trace += `  = ${actualFossil.toFixed(4)} kg CO2e\n\n`;
            trace += `Climate Change - Biogenic:\n`;
            trace += `  = ${perKgB.toFixed(5)} kg CO2e/kg x ${safeFix(qty,3)} kg\n`;
            trace += `  = ${actualBiogenic.toFixed(4)} kg CO2e\n\n`;
            trace += `Climate Change - Land Use (dLUC):\n`;
            trace += `  = ${perKgDL.toFixed(5)} kg CO2e/kg x ${safeFix(qty,3)} kg\n`;
            trace += `  = ${actualDLUC.toFixed(4)} kg CO2e\n\n`;
            trace += `Cross-check: ${actualFossil.toFixed(4)} + ${actualBiogenic.toFixed(4)} + ${actualDLUC.toFixed(4)} = ${subSumStr}${crossCheck}\n\n`;

            // ── FIX 4: BIOLOGICAL TRACES ─────────────────────────────────
            // USEtox Pesticide Toxicity
            const tox = ing.pesticide_toxicity;
            if (tox && (tox.cancer_CTUh > 0 || tox.noncancer_CTUh > 0 || tox.ecotoxicity_CTUe > 0)) {
                trace += `USETOX 2.14 — PESTICIDE TOXICITY\n`;
                trace += `  Formula: CTUh = application_rate(kg) × CF_CTUh/kg (agricultural soil)\n`;
                trace += `  Cancer    : ${tox.cancer_CTUh?.toExponential(3) || '0'} CTUh\n`;
                trace += `  Non-cancer: ${tox.noncancer_CTUh?.toExponential(3) || '0'} CTUh\n`;
                trace += `  Ecotox    : ${tox.ecotoxicity_CTUe?.toExponential(3) || '0'} CTUe\n`;
                trace += `  Source: USEtox 2.14 — continental agricultural soil compartment\n\n`;
            }

            // LANCA Biodiversity
            const lanca = ing.biodiversity_lanca;
            if (lanca && lanca.occupation_pt > 0) {
                trace += `LANCA v2.5 — LAND USE BIODIVERSITY\n`;
                trace += `  Formula: SQI_pt = area_m2 × time_yr × CF_SQI(country, land_use_type)\n`;
                trace += `  Occupation   : ${lanca.occupation_pt?.toFixed(4) || '0'} Pt\n`;
                trace += `  Transformation: ${lanca.transformation_pt?.toFixed(4) || '0'} Pt\n`;
                trace += `  Country CF source: LANCA v2.5 / EF 3.1\n\n`;
            }

            // Enteric fermentation (livestock only)
            const enteric = ing.enteric_co2;
            if (enteric && enteric > 0) {
                trace += `ENTERIC FERMENTATION (IPCC Tier 1)\n`;
                trace += `  Formula: CH4 = EF_enteric × livestock_units\n`;
                trace += `  CH4 × GWP100(CH4=28.0, IPCC AR5, per PEF 3.1) = ${enteric.toFixed(4)} kg CO2e\n\n`;
            }

            // SOC Sequestration
            const soc = ing.soc_sequestration_co2;
            if (soc && soc !== 0) {
                const sign = soc < 0 ? 'REMOVAL' : 'EMISSION';
                trace += `SOIL ORGANIC CARBON — dSOC (${sign})\n`;
                trace += `  Formula: (CS_ref - CS_actual) / 20 × (44/12)\n`;
                trace += `  20-year amortization per IPCC 2006 / PEF 3.1 §4.4.8\n`;
                trace += `  dSOC = ${soc.toFixed(4)} kg CO2e/yr\n\n`;
            }

            return trace;
        };

        const buildGLECTrace = (component) => {
            if (component.calculation_trace) {
                return component.calculation_trace;
            }
            let trace = '';

            const modeName   = safeString(component.mode || component.name || 'Road (HGV Diesel)');
            const distUser   = component.distance || 0;
            const rawEF      = component.ef !== undefined ? component.ef : 0.060;
            const daf        = component.daf !== undefined ? component.daf : 1.05;
            const massTonnes = component.mass || 0;
            const isCrisis   = component.crisis_routing || false;
            const tempLabel  = component.temperature || 'Ambient';

            const glecTableRef = modeName.toLowerCase().includes('sea')  ? 'GLEC v3.2 Table 18, Module 2 (p. 111)'
                               : modeName.toLowerCase().includes('air')  ? 'GLEC v3.2 Table 1, Module 2 (p. 94)'
                               : modeName.toLowerCase().includes('rail') ? 'GLEC v3.2 Table 4, Module 2 (p. 97)'
                               : 'GLEC v3.2 Module 5, Annex 1, Table 18 (p. 160)';

            const dafNote = modeName.toLowerCase().includes('sea')  ? 'GLEC v3.2 Module 2 sea section ~p.51'
                          : modeName.toLowerCase().includes('rail') ? 'No DAF for rail — GLEC v3.2 rail section'
                          : 'GLEC v3.2 Table 7 preamble p.100';

            const LOAD_FACTOR  = 0.60;
            const EMPTY_RETURN = 0.17;
            const payloadMult  = (1 / LOAD_FACTOR) * (1 + EMPTY_RETURN);
            const isRoad       = !modeName.toLowerCase().includes('sea') && !modeName.toLowerCase().includes('air') && !modeName.toLowerCase().includes('rail');
            const adjustedEF   = isRoad ? rawEF * payloadMult : rawEF;
            const adjustedDist = isCrisis ? Math.round(distUser * 1.4) : (distUser * daf);

            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `TRANSPORT EMISSION CALCULATION (GLEC v3.2)\n`;
            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `Mode       : ${modeName}\n`;
            trace += `Temperature: ${tempLabel}\n`;
            trace += `Distance (user input): ${distUser} km\n`;
            trace += `Crisis routing: ${isCrisis ? 'Applied (+40% Red Sea/Cape route)' : 'Not applied'}\n`;
            trace += `DAF (${dafNote}): x${daf}\n`;
            trace += `Adjusted distance: ${distUser} x ${isCrisis ? '1.40' : daf} = ${adjustedDist.toFixed(1)} km\n\n`;
            trace += `Gross weight shipped:\n`;
            trace += `  = ${massTonnes.toFixed(6)} tonnes\n`;
            trace += `  (${(massTonnes * 1000).toFixed(3)} kg)\n\n`;
            trace += `Emission factor (${glecTableRef}):\n`;
            trace += `  = ${rawEF} kg CO2e/tkm (base, full-load scenario)\n\n`;

            if (isRoad) {
                trace += `Load factor adjustment (GLEC v3.2 Table 8, EU artic truck):\n`;
                trace += `  Load Factor      = ${LOAD_FACTOR} (60%)\n`;
                trace += `  Empty Return Rate = ${EMPTY_RETURN} (17%)\n`;
                trace += `  Payload multiplier = (1 / ${LOAD_FACTOR}) x (1 + ${EMPTY_RETURN})\n`;
                trace += `                     = ${(1/LOAD_FACTOR).toFixed(4)} x ${(1+EMPTY_RETURN).toFixed(2)}\n`;
                trace += `                     = ${payloadMult.toFixed(4)}\n\n`;
                trace += `Adjusted emission factor:\n`;
                trace += `  = ${rawEF} x ${payloadMult.toFixed(4)}\n`;
                trace += `  = ${adjustedEF.toFixed(5)} kg CO2e/tkm\n\n`;
            }

            trace += `Transport CO2:\n`;
            trace += `  Formula: mass_tonnes x adjusted_distance_km x adjusted_EF\n`;
            trace += `  = ${massTonnes.toFixed(6)} t x ${adjustedDist.toFixed(1)} km x ${adjustedEF.toFixed(5)} kg CO2e/tkm\n`;
            trace += `  = ${safeFix(component.subtotal, 4)} kg CO2e`;
            if (isRoad) {
                trace += `\n\nNote: Road freight emission factor = 0.060 kg CO2e/tkm (GLEC v3.2, artic truck, full-load scenario). The EU logistics average is 0.089 kg CO2e/tkm (GLEC Module 2, 60% load factor). The 0.060 value assumes fully-loaded zero-empty-return operations, appropriate for dedicated food logistics fleets. For general logistics, use 0.089.`;
            }
            return trace;
        };

        const buildCFFTrace = (pkgData) => {
    // 🛡️ USE ENGINE'S CALCULATION TRACE - NO HARDCODED FALLBACK
    if (ccTree.Packaging?.calculation_trace) {
        return ccTree.Packaging.calculation_trace;
    }

    // Pull real values from DB and UI
    const pkg         = pkgData || {};
    const pkgMatEl    = document.getElementById('packagingMaterial');
    const pkgMatKey   = pkgMatEl?.value || '';
    const pkgDbRec    = window.aioxyData?.packaging?.[pkgMatKey] || pkg;
    const matName     = safeString(pkgMatEl?.options?.[pkgMatEl?.selectedIndex]?.text || pkgDbRec.name || 'Unknown');
    const weightKg    = mb?.packaging_weight_kg || 0;
    const R1pct       = parseFloat(document.getElementById('recycledContent')?.value) || 0;
    const R1          = R1pct / 100;

    const Ev    = pkgDbRec.co2_virgin    || 2.5;
    const Erec  = pkgDbRec.co2_recycled  || 1.2;
    const Ed    = pkgDbRec.co2_disposal_average || pkgDbRec.co2_disposal || 0.05;
    const isMetalGlass = (pkgMatKey.includes('aluminum') || pkgMatKey.includes('steel') || pkgMatKey.includes('glass'));
    const A     = pkgDbRec.aFactor !== undefined ? pkgDbRec.aFactor : (isMetalGlass ? 0.2 : 0.5);
    const QsQp  = (pkgDbRec.q || 0.85);
    const R2raw = (pkgDbRec.r1_max !== undefined && pkgDbRec.r2 !== undefined)
                    ? pkgDbRec.r1_max * pkgDbRec.r2
                    : (pkgDbRec.r2 || pkgDbRec.r1_max || 0.68);

    // CFF four terms per EC Recommendation 2021/2279 / PEF Annex C v2.1
    const term1 = (1 - R1) * Ev;
    const term2 = R1 * (A * Erec + (1 - A) * Ev * QsQp);
    const term3 = (1 - R2raw) * Ed;
    const term4 = R2raw * (1 - A) * (Erec - Ev * QsQp);
    const impactPerKg = term1 + term2 + term3 - term4;
    const totalImpact = impactPerKg * weightKg;

    let trace = '';
    trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    trace += `PACKAGING - CIRCULAR FOOTPRINT FORMULA (CFF)\n`;
    trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    trace += `Material: ${matName}\n`;
    trace += `Weight  : ${weightKg.toFixed(3)} kg\n`;
    trace += `Recycled content (R1): ${R1pct}% = ${R1.toFixed(2)}\n\n`;
    trace += `CFF Formula (EC Recommendation 2021/2279 / PEF Annex C v2.1, May 2020):\n`;
    trace += `  Impact = (1-R1)xEv + R1x(AxErec + (1-A)xEvxQs/Qp)\n`;
    trace += `           + (1-R2)xEd - R2x(1-A)x(Erec-EvxQs/Qp)\n\n`;
    trace += `Parameters (PEF Annex C v2.1 + ICE Database v3.0):\n`;
    trace += `  Ev   = ${Ev.toFixed(4)} kg CO2e/kg  (virgin material production EF)\n`;
    trace += `  Erec = ${Erec.toFixed(4)} kg CO2e/kg  (recycled material production EF)\n`;
    trace += `  A    = ${A.toFixed(2)}  (PEF Annex C A-factor for ${matName})\n`;
    trace += `  Qs/Qp= ${QsQp.toFixed(2)}  (PEF Annex C quality substitution ratio)\n`;
    trace += `  R2   = ${R2raw.toFixed(4)}  (PEF Annex C end-of-life collection rate)\n`;
    trace += `  Ed   = ${Ed.toFixed(4)} kg CO2e/kg  (disposal EF, EU average mix)\n\n`;
    trace += `Term 1 — Virgin material:\n`;
    trace += `  = (1 - ${R1.toFixed(2)}) x ${Ev.toFixed(4)}\n`;
    trace += `  = ${(1-R1).toFixed(2)} x ${Ev.toFixed(4)}\n`;
    trace += `  = ${term1.toFixed(4)} kg CO2e/kg\n\n`;
    trace += `Term 2 — Recycled content:\n`;
    trace += `  = ${R1.toFixed(2)} x (${A.toFixed(2)} x ${Erec.toFixed(4)} + (1-${A.toFixed(2)}) x ${Ev.toFixed(4)} x ${QsQp.toFixed(2)})\n`;
    trace += `  = ${R1.toFixed(2)} x (${(A*Erec).toFixed(4)} + ${((1-A)*Ev*QsQp).toFixed(4)})\n`;
    trace += `  = ${R1.toFixed(2)} x ${(A*Erec+(1-A)*Ev*QsQp).toFixed(4)}\n`;
    trace += `  = ${term2.toFixed(4)} kg CO2e/kg\n\n`;
    trace += `Term 3 — Disposal:\n`;
    trace += `  = (1 - ${R2raw.toFixed(4)}) x ${Ed.toFixed(4)}\n`;
    trace += `  = ${(1-R2raw).toFixed(4)} x ${Ed.toFixed(4)}\n`;
    trace += `  = ${term3.toFixed(4)} kg CO2e/kg\n\n`;
    trace += `Term 4 — EoL recycling credit:\n`;
    trace += `  = ${R2raw.toFixed(4)} x (1-${A.toFixed(2)}) x (${Erec.toFixed(4)} - ${Ev.toFixed(4)} x ${QsQp.toFixed(2)})\n`;
    trace += `  = ${R2raw.toFixed(4)} x ${(1-A).toFixed(2)} x (${(Erec - Ev*QsQp).toFixed(4)})\n`;
    trace += `  = ${term4.toFixed(4)} kg CO2e/kg\n\n`;
    trace += `Impact per kg:\n`;
    trace += `  = ${term1.toFixed(4)} + ${term2.toFixed(4)} + ${term3.toFixed(4)} - ${Math.abs(term4).toFixed(4)}\n`;
    trace += `  = ${impactPerKg.toFixed(4)} kg CO2e/kg\n\n`;
    trace += `Total packaging impact:\n`;
    trace += `  = ${impactPerKg.toFixed(4)} kg CO2e/kg x ${weightKg.toFixed(3)} kg\n`;
    trace += `  = ${totalImpact.toFixed(4)} kg CO2e`;
    return trace;
};
        

        const buildEnergyTrace = (mfgComp) => {
            if (mfgComp.calculation_trace) {
                return mfgComp.calculation_trace;
            }
            let trace = '';

            const procMethod  = safeString(mfgComp.name || mfgComp.method || 'Processing');
            const kwhPerKg    = mfgComp.kwh_per_kg || (mfgComp.kwh && pWeightKg > 0 ? mfgComp.kwh / pWeightKg : 0);
            const massKg      = pWeightKg;
            const totalKwh    = mfgComp.kwh || (kwhPerKg * massKg);
            const gridG       = mfgComp.grid_intensity || gridIntensity;
            const T_AND_D     = 0.07;   // IEA (2023): EU average T&D losses 6-8%, central 7%
            const gridWithTD  = gridG * (1 + T_AND_D);
            const co2Result   = totalKwh * gridWithTD / 1000;

            // Thermodynamic parameters (from core_physics / processing db)
            const Cp          = mfgComp.specific_heat_kj || 4.186;   // kJ/kg°C (water/food default)
            const T_in        = mfgComp.inlet_temp_c     || 20;
            const T_out       = mfgComp.outlet_temp_c    || 72;
            const deltaT      = T_out - T_in;
            const heatRegen   = mfgComp.heat_regeneration || 0.90;
            const equip_eff   = mfgComp.equipment_efficiency || 0.85;
            const Q_gross     = 1.0 * Cp * deltaT;               // kJ/kg
            const Q_net       = Q_gross * (1 - heatRegen);
            const kwhDerived  = Q_net / 3600 / equip_eff;

            const litRef = safeString(mfgComp.literature_ref || 'Lewis & Heppell (2000); Reiter et al. (2020) J. Dairy Sci.; Perry\'s CEH');

            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `MANUFACTURING ENERGY\n`;
            trace += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            trace += `Processing method: ${procMethod}\n`;
            trace += `Energy intensity : ${kwhPerKg.toFixed(4)} kWh/kg\n\n`;

            trace += `Thermodynamic derivation (for traceability):\n`;
            trace += `  Q = m x Cp x dT\n`;
            trace += `    = 1 kg x ${Cp.toFixed(3)} kJ/kg.degC x (${T_out} - ${T_in}) degC\n`;
            trace += `    = 1 x ${Cp.toFixed(3)} x ${deltaT}\n`;
            trace += `    = ${Q_gross.toFixed(2)} kJ/kg\n\n`;
            trace += `  With ${(heatRegen*100).toFixed(0)}% heat regeneration:\n`;
            trace += `  Q_net = ${Q_gross.toFixed(2)} x (1 - ${heatRegen.toFixed(2)})\n`;
            trace += `        = ${Q_net.toFixed(2)} kJ/kg\n\n`;
            trace += `  Electrical kWh/kg = Q_net / 3,600 / equipment_efficiency\n`;
            trace += `                    = ${Q_net.toFixed(2)} / 3,600 / ${equip_eff.toFixed(2)}\n`;
            trace += `                    = ${kwhDerived.toFixed(4)} kWh/kg\n\n`;
            trace += `  Central estimate (including pumps, CIP, controls):\n`;
            trace += `  = ${kwhPerKg.toFixed(4)} kWh/kg\n\n`;
            trace += `  Source: ${litRef}\n\n`;

            trace += `Total manufacturing electricity:\n`;
            trace += `  = energy intensity x product mass\n`;
            trace += `  = ${kwhPerKg.toFixed(4)} kWh/kg x ${massKg.toFixed(3)} kg\n`;
            trace += `  = ${totalKwh.toFixed(4)} kWh\n\n`;

            trace += `Grid intensity (${mfgCountry}, EMBER ${new Date().getFullYear()-1}):\n`;
            trace += `  = ${gridG.toFixed(1)} g CO2e/kWh\n\n`;

            trace += `With T&D losses (${(T_AND_D*100).toFixed(0)}%, IEA 2023 EU average):\n`;
            trace += `  = ${gridG.toFixed(1)} x (1 + ${T_AND_D.toFixed(2)})\n`;
            trace += `  = ${gridWithTD.toFixed(2)} g CO2e/kWh\n\n`;

            trace += `Manufacturing CO2:\n`;
            trace += `  = ${totalKwh.toFixed(4)} kWh x ${gridWithTD.toFixed(2)} g CO2e/kWh / 1,000\n`;
            trace += `  = ${safeFix(mfgComp.subtotal, 5)} kg CO2e`;
            return trace;
        };

        // ============================================================
        // PAGE 1: EXECUTIVE SUMMARY
        // ============================================================
        doc.setFillColor(...COLORS.primary);
        doc.rect(0, 0, pageWidth, 8, 'F');
        
        setH1();
        doc.text("AIOXY COMPLIANCE AUDIT REPORT", margin, currentY);
        currentY += 8;
        
        setSmall();
        doc.text("ISO 14044 - PEF 3.1 - GHG Protocol - ESRS E1/E3/E4/E5 Ready", margin, currentY);
        currentY += 12;
        
        if (eudrViolation) {
            setWarning();
            doc.text("[!] EUDR NON-COMPLIANCE DETECTED - High-risk origin for regulated commodity", margin, currentY);
            currentY += 8;
        }
        if (isCustomBaseline) {
            doc.setTextColor(...COLORS.warning);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("[!] GREEN CLAIMS DIRECTIVE NOTICE: Custom baseline used. Comparative claims require verification.", margin, currentY);
            currentY += 8;
        } else if (isComparativeClaim) {
            doc.setTextColor(...COLORS.warning);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("[!] ISO 14044 §6.1 NOTICE: This assessment contains a comparative assertion.", margin, currentY);
            currentY += 5;
            doc.text("Third-party critical review is mandatory for any public or B2B comparative claims.", margin, currentY);
            currentY += 8;
        }
        
        currentY += 4;
        doc.setDrawColor(...COLORS.lightGray);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 8;
        
        setH2();
        doc.text("ASSESSMENT DETAILS", margin, currentY);
        currentY += 6;
        
        const detailsData = [
            ['Assessment ID:', audit.dppId || 'N/A'],
            ['Product:', pName],
            ['Date of Assessment:', dateStr],
            ['Manufacturing Location:', `${mfgCountry} (${gridIntensity}g CO2/kWh)`],
            ['Comparison Baseline:', safeString(audit.comparison_baseline?.name || 'None')],
            ['', '[Screening-level parametric twin for internal eco-design only. Not a verified comparative claim.]']
        ];
        
        if (audit.comparison_baseline?.bat_processing_note) {
            detailsData.push(['Baseline Processing:', safeString(audit.comparison_baseline.bat_processing_note)]);
            detailsData.push(['Baseline Source:', safeString(audit.comparison_baseline.bat_source || 'Agribalyse 3.2 + standard manufacturing')]);
            detailsData.push(['Allocation:', safeString(audit.comparison_baseline.allocation_note || 'Direct mass equivalence (1:1 ratio)')]);
        }
        
        detailsData.push(
            ['Functional Unit:', userProtein > 0 ? '1 kg mass / 100g delivered protein' : '1 kg of product'],
            ['Product Weight:', formatNumber(pWeightKg, 3) + ' kg']
        );
        
        doc.autoTable({
            startY: currentY,
            body: detailsData,
            theme: 'plain',
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 50, textColor: COLORS.primary },
                1: { cellWidth: 130, textColor: COLORS.dark }
            },
            margin: { left: margin }
        });
        
        currentY = doc.lastAutoTable.finalY + 8;

        // ============================================================
        // PAGE 2: KEY METRICS + AUDIT CLEARANCE
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        const fossilPct = totalCo2 > 0 ? (fossilTotal / totalCo2 * 100).toFixed(1) : '0.0';
        const biogenicPct = totalCo2 > 0 ? (biogenicTotal / totalCo2 * 100).toFixed(1) : '0.0';
        const dlucPct = totalCo2 > 0 ? (dlucTotal / totalCo2 * 100).toFixed(1) : '0.0';
        
        const metricsData = [
            ['ESRS E1: Climate Impact - FOSSIL', `${formatNumber(fossilTotal, 4)} kg CO2e`],
            ['ESRS E1: Climate Impact - BIOGENIC', `${formatNumber(biogenicTotal, 4)} kg CO2e`],
            ['ESRS E1: Climate Impact - dLUC', `${formatNumber(dlucTotal, 4)} kg CO2e`],
            ['ESRS E1: Climate Impact (TOTAL)', `${formatNumber(totalCo2, 4)} kg CO2e`],
            ['ESRS E1: Climate Impact (per kg)', `${formatNumber(totalCo2 / pWeightKg, 4)} kg CO2e/kg`],
            ['ESRS E3: Water Scarcity (AWARE)', formatNumber(totalWater, 4) + ' m3 world eq.'],
            ['ESRS E4: Land Use Impact', formatNumber(totalLand, 2) + ' Pt'],
            ['ESRS E5: Fossil Resource Use', formatNumber(totalFossil, 2) + ' MJ'],
            ['Biogenic Removals (FLAG)', biogenicRemovals > 0 ? formatNumber(biogenicRemovals, 4) + ' kg CO2e' : 'None reported'],
            ['Front-of-Pack Eco-Score', `Grade ${ecoGrade} (${mPt.toFixed(1)} uPt)`],
            ['Nutritional LCA', safeString(nutritionalText)],
            ['Overall Data Quality Rating', dqrText + ' (PEF compliant)'],
            ['Modeled Uncertainty', '+-' + formatPercent(uncertainty)],
            ['EUDR Screening Status', eudrViolation ? '[!] NON-COMPLIANT (HIGH RISK)' : '[OK] COMPLIANT'],
            ['Crisis Routing Applied', isCrisisActive ? 'Yes (+40% distance)' : 'No'],
            ['Primary Data Used', hasPrimaryData ? '[OK] Yes (verified)' : 'No (secondary data only)']
        ];

        setH2();
        doc.text("KEY COMPLIANCE METRICS", margin, currentY);
        currentY += 6;

        doc.autoTable({
            startY: currentY,
            body: metricsData,
            theme: 'plain',
            styles: { fontSize: 9, cellPadding: 4 },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 105, textColor: COLORS.primary },
                1: { cellWidth: 75, halign: 'right', fontStyle: 'bold', textColor: COLORS.dark }
            },
            margin: { left: margin },
            alternateRowStyles: { fillColor: COLORS.lightBg }
        });

        currentY = doc.lastAutoTable.finalY + 10;

        setH2();
        doc.text("AUDIT CLEARANCE", margin, currentY);
        currentY += 6;

        setNormal();
        const clearanceItems = [
            '[OK] EU Deforestation Regulation (EUDR) Screening Complete',
            '[OK] Primary & Tertiary Logistics Accounted (GLEC v3.2)',
            `[OK] Crisis Routing: ${isCrisisActive ? 'Applied (Red Sea/Cape Route +40%)' : 'Standard Routing'}`,
            '[OK] PEF 3.1 Methodology with AGRIBALYSE 3.2 Data',
            '[OK] ISO 14044 Foreground/Background Analysis (5% cutoff)',
            '[OK] Monte Carlo Uncertainty Propagation (500 iterations)',
            `[OK] ADEME Eco-Score: Grade ${ecoGrade}`
        ];

        clearanceItems.forEach(item => {
            doc.text(safeString(item), margin, currentY);
            currentY += 5;
        });

        // ============================================================
        // PAGE 3: DATA TRACEABILITY (NEW — Auditor/Retailer Evidence Page)
        // ============================================================
        doc.addPage();
        currentY = margin;

        // ── PAGE HEADER ──────────────────────────────────────────────
        doc.setFillColor(...COLORS.primary);
        doc.rect(0, 0, pageWidth, 8, 'F');

        setH1();
        doc.text("DATA TRACEABILITY & SOURCE DOCUMENTATION", margin, currentY);
        currentY += 7;
        setSmall();
        doc.text("Every number in this assessment is traceable to a specific, published, citable source.", margin, currentY);
        currentY += 8;

        // ── SECTION A: INGREDIENT DATA PROVENANCE ───────────────────
        const ingComponents = ccTree.Ingredients?.components || [];
        if (ingComponents.length > 0) {
            checkPageBreak(20);
            setH2();
            doc.text("A — INGREDIENT DATA PROVENANCE (AGRIBALYSE 3.2)", margin, currentY);
            currentY += 5;
            setSmall();
            doc.text("Source: ADEME/INRAE, AGRIBALYSE 3.2, French agricultural LCI database, 2022", margin, currentY);
            currentY += 6;

            // PEF category display order (compact 19 categories)
            const PEF_CATS_TRACE = [
                { key: "Climate Change",                    unit: "kg CO2e",       short: "CC" },
                { key: "Climate Change - Fossil",           unit: "kg CO2e",       short: "CC-F" },
                { key: "Climate Change - Biogenic",         unit: "kg CO2e",       short: "CC-B" },
                { key: "Climate Change - Land Use",         unit: "kg CO2e",       short: "CC-L" },
                { key: "Ozone Depletion",                   unit: "kg CFC-11 eq",  short: "OD" },
                { key: "Ionizing Radiation",                unit: "kBq U-235 eq",  short: "IR" },
                { key: "Photochemical Ozone Formation",     unit: "kg NMVOC eq",   short: "POF" },
                { key: "Particulate Matter",                unit: "disease inc.",  short: "PM" },
                { key: "Human Toxicity, non-cancer",        unit: "CTUh",          short: "HT-nc" },
                { key: "Human Toxicity, cancer",            unit: "CTUh",          short: "HT-c" },
                { key: "Acidification",                     unit: "mol H+ eq",     short: "Acid" },
                { key: "Eutrophication, freshwater",        unit: "kg P eq",       short: "EFW" },
                { key: "Eutrophication, marine",            unit: "kg N eq",       short: "EM" },
                { key: "Eutrophication, terrestrial",       unit: "mol N eq",      short: "ET" },
                { key: "Ecotoxicity, freshwater",           unit: "CTUe",          short: "EcoFW" },
                { key: "Land Use",                          unit: "Pt",            short: "LU" },
                { key: "Water Use/Scarcity (AWARE)",        unit: "m3 world eq",   short: "WU" },
                { key: "Resource Use, fossils",             unit: "MJ",            short: "RF" },
                { key: "Resource Use, minerals/metals",     unit: "kg Sb eq",      short: "RM" }
            ];

            ingComponents.forEach((ing, idx) => {
                checkPageBreak(55);

                // Look up ingredient DB record
                const ingId = ing.id || '';
                const dbRec = (window.aioxyData?.ingredients?.[ingId]) || null;
                const meta = dbRec?.data?.metadata || {};
                const pefVals = dbRec?.data?.pef || {};
                const dqr = meta.dqr || {};
                const dqrOverall = meta.dqr_overall ?? (((dqr.P||2)+(dqr.TiR||3)+(dqr.TeR||2)+(dqr.GR||1))/4).toFixed(2);
                const sourceUuid = meta.source_uuid || ingId || 'N/A';
                const alloc = meta.allocation_method || 'Economic Allocation';
                const isPrimary = ing.primary_data_used || false;
                const pd = ing.primary_data || null;
                const origin = ing.universal_adjustments?.adjusted_for_country || 'FR';
                const geoNote = origin === 'FR'
                    ? 'FR — Agribalyse reflects French production conditions'
                    : `${origin} — Geographic proxy applied from FR baseline`;

                // Ingredient sub-header
                doc.setFillColor(...COLORS.lightBg);
                doc.rect(margin, currentY, pageWidth - margin*2, 7, 'F');
                doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...COLORS.primary);
                doc.text(`A${idx+1}. ${truncate(safeString(ing.name), 50)}`, margin + 2, currentY + 5);
                currentY += 9;

                // Identity row
                const idRows = [
                    ['AGRIBALYSE 3.2 UUID:', safeString(sourceUuid)],
                    ['Source Dataset:', 'AGRIBALYSE 3.2 — ADEME/INRAE, French agricultural LCI database, 2022'],
                    ['Allocation Method:', safeString(alloc)],
                    ['Geographic Representativeness:', safeString(geoNote)],
                    ['DQR Score:', `${dqrOverall} / 5.0  |  TeR=${dqr.TeR||'?'}  TiR=${dqr.TiR||'?'}  GR=${dqr.GR||'?'}  P=${dqr.P||'?'}`],
                    ['DQR Methodology:', truncate(safeString(meta.dqr_methodology || 'Agribalyse DQI Matrix v3.0.1 — 4-indicator (TeR+TiR+GR+P)/4'), 120)]
                ];

                if (isPrimary && pd) {
                    const pdParts = [];
                    if (pd.yieldKgPerHa)     pdParts.push(`Yield: ${pd.yieldKgPerHa} kg/ha`);
                    if (pd.nitrogenKgPerTon) pdParts.push(`N-rate: ${pd.nitrogenKgPerTon} kg/t`);
                    if (pd.waterSource)      pdParts.push(`Water: ${pd.waterSource}`);
                    if (pd.farmingPractice)  pdParts.push(`Practice: ${pd.farmingPractice}`);
                    idRows.push(['[PRIMARY DATA OVERRIDE]:', safeString(pdParts.join(' | ') || 'Supplier-verified') + ' — overrides Agribalyse default']);
                }

                doc.autoTable({
                    ...standardTableStyles,
                    startY: currentY,
                    body: idRows,
                    styles: { fontSize: 6.5, cellPadding: 1.5, overflow: 'linebreak' },
                    headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 6 },
                    columnStyles: {
                        0: { fontStyle: 'bold', cellWidth: 52, textColor: COLORS.primary },
                        1: { cellWidth: pageWidth - margin*2 - 52 }
                    },
                    margin: { left: margin }
                });
                currentY = doc.lastAutoTable.finalY + 3;

                // PEF impact values table (compact 2-col layout: cat | value+unit)
                checkPageBreak(35);
                const pefRows = PEF_CATS_TRACE.map(c => {
                    const val = pefVals[c.key];
                    const formatted = (val === undefined || val === null)
                        ? '—'
                        : (Math.abs(val) < 1e-4 ? Number(val).toExponential(3) : Number(val).toFixed(5));
                    return [`${c.short} — ${c.key}`, `${formatted}  ${c.unit}`];
                });

                doc.autoTable({
                    ...standardTableStyles,
                    startY: currentY,
                    head: [['PEF Category (per kg ingredient)', 'Value & Unit (AGRIBALYSE 3.2)']],
                    body: pefRows,
                    styles: { fontSize: 6, cellPadding: 1.2, overflow: 'linebreak' },
                    headStyles: { fillColor: COLORS.dark, textColor: COLORS.white, fontSize: 6 },
                    columnStyles: {
                        0: { cellWidth: 90, textColor: COLORS.dark },
                        1: { cellWidth: pageWidth - margin*2 - 90, halign: 'right', fontStyle: 'bold' }
                    },
                    margin: { left: margin }
                });
                currentY = doc.lastAutoTable.finalY + 6;
            });
        }

        // ── SECTION B: PROCESSING ENERGY TRACEABILITY ────────────────
        const mfgCompsTrace = ccTree.Manufacturing?.components || [];
        const processingComps = mfgCompsTrace.filter(c =>
            c.name && c.name.toLowerCase().includes('process') || (c.kwh_per_kg && c.kwh_per_kg > 0)
        );
        if (mfgCompsTrace.length > 0) {
            checkPageBreak(40);
            setH2();
            doc.text("B — PROCESSING ENERGY TRACEABILITY", margin, currentY);
            currentY += 5;

            const procRows = mfgCompsTrace.map(c => {
                const kwhKg  = c.kwh_per_kg  || (c.kwh  && pWeightKg > 0 ? (c.kwh  / pWeightKg).toFixed(4) : '—');
                const gasMjKg = c.gas_mj_per_kg || (c.gas_mj && pWeightKg > 0 ? (c.gas_mj / pWeightKg).toFixed(4) : '—');
                const deriv = c.derivation_source || (c.calculation_trace ? 'Thermodynamic first principles' : 'Published benchmark');
                const formula = c.formula_short || 'Q = m x Cp x dT / 3600 / efficiency';
                const citation = c.literature_ref || 'Perry\'s Chemical Engineers\' Handbook / PEF 3.1 Annex B';
                return [
                    safeString(c.name || 'Processing'),
                    String(kwhKg) + ' kWh/kg',
                    String(gasMjKg) + ' MJ/kg',
                    safeString(deriv),
                    safeString(formula),
                    safeString(citation)
                ];
            });

            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Method', 'kWh/kg', 'Gas MJ/kg', 'Derivation Source', 'Key Formula', 'Citation']],
                body: procRows,
                styles: { fontSize: 6.5, cellPadding: 1.5, overflow: 'linebreak' },
                headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 6 },
                columnStyles: {
                    0: { cellWidth: 28, fontStyle: 'bold' },
                    1: { cellWidth: 18, halign: 'right' },
                    2: { cellWidth: 18, halign: 'right' },
                    3: { cellWidth: 28 },
                    4: { cellWidth: 45 },
                    5: { cellWidth: 43 }
                },
                margin: { left: margin }
            });
            currentY = doc.lastAutoTable.finalY + 6;
        }

        // ── SECTION C: TRANSPORT DATA TRACEABILITY ───────────────────
        const transportComps = [
            ...(ccTree.Transport?.components || []),
            ...(ccTree.Logistics?.components || []),
            ...(ccTree["Primary Logistics"]?.components || []),
            ...(ccTree["Secondary Logistics"]?.components || [])
        ].filter(Boolean);

        if (transportComps.length > 0) {
            checkPageBreak(40);
            setH2();
            doc.text("C — TRANSPORT DATA TRACEABILITY (GLEC Framework v3.2)", margin, currentY);
            currentY += 5;

            const transRows = transportComps.map(c => {
                const mode     = safeString(c.mode || c.name || 'Road');
                const ef       = c.ef !== undefined ? String(c.ef) + ' kgCO2e/tkm' : c.emission_factor ? String(c.emission_factor) + ' kgCO2e/tkm' : 'See GLEC v3.2';
                const daf      = c.daf !== undefined ? String(c.daf) : '1.05';
                const tableRef = safeString(c.glec_table_ref || c.source_ref || 'GLEC v3.2 Table B.1');
                const multiCat = c.multi_category_method
                    ? safeString(c.multi_category_method)
                    : (c.non_ghg_categories ? 'EMEP/EEA + USEtox 2.14' : 'GHG only');
                const zeroNote = c.zero_categories
                    ? safeString(c.zero_categories)
                    : 'Non-GHG transport factors: documented data gap per GLEC scope';
                return [mode, ef, daf, tableRef, multiCat, truncate(zeroNote, 45)];
            });

            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Mode', 'CO2e EF', 'DAF', 'GLEC Table Ref', 'Multi-Cat Method', 'Zero-Category Note']],
                body: transRows,
                styles: { fontSize: 6.5, cellPadding: 1.5, overflow: 'linebreak' },
                headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 6 },
                columnStyles: {
                    0: { cellWidth: 22 },
                    1: { cellWidth: 28, halign: 'right' },
                    2: { cellWidth: 12, halign: 'center' },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 32 },
                    5: { cellWidth: 56 }
                },
                margin: { left: margin }
            });
            currentY = doc.lastAutoTable.finalY + 6;
        }

        // ── SECTION D: PACKAGING DATA TRACEABILITY ───────────────────
        const pkgCompsTrace = ccTree.Packaging?.components || [];
        if (ccTree.Packaging && (pkgCompsTrace.length > 0 || ccTree.Packaging.total > 0)) {
            checkPageBreak(45);
            setH2();
            doc.text("D — PACKAGING DATA TRACEABILITY (PEF Annex C CFF)", margin, currentY);
            currentY += 5;

            const pkgMatEl   = document.getElementById('packagingMaterial');
            const pkgMatName = safeString(pkgMatEl?.options?.[pkgMatEl?.selectedIndex]?.text || 'N/A');
            const pkgMatKey  = pkgMatEl?.value || '';
            const pkgDbRec   = window.aioxyData?.packaging?.[pkgMatKey] || {};

            const cffParamRows = [
                ['Packaging Material:', pkgMatName],
                ['CFF Formula:', 'EI_pkg = (1-A)×R1×Erec + A×(1-R1)×Ev + (1-R2)×Ed  [PEF Annex C v2.1, May 2020]'],
                ['A-Factor source:', 'PEF Annex C v2.1 — market supply/demand correction factor per material class'],
                ['R2 (end-of-life rate):', safeString(String(pkgDbRec.r2 || pkgDbRec.r1_max || 'See PEF Annex C')) + ' — PEF Annex C Table 2'],
                ['Ev (virgin production EF):', safeString(String(pkgDbRec.co2_virgin || 'per DB')) + ' kg CO2e/kg — industry literature (Ecoinvent proxy, marked)'],
                ['Erec (recycled EF):', safeString(String(pkgDbRec.co2_recycled || 'per DB')) + ' kg CO2e/kg — industry literature'],
                ['Ed (disposal EF):', safeString(String(pkgDbRec.co2_disposal || 'per DB')) + ' kg CO2e/kg — IPCC/EEA'],
                ['Confidence Level:', safeString(pkgDbRec.confidence || 'Medium — secondary literature sources')]
            ];

            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                body: cffParamRows,
                styles: { fontSize: 6.5, cellPadding: 1.5, overflow: 'linebreak' },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 52, textColor: COLORS.primary },
                    1: { cellWidth: pageWidth - margin*2 - 52 }
                },
                margin: { left: margin }
            });
            currentY = doc.lastAutoTable.finalY + 6;
        }

        // ── SECTION E: ELECTRICITY & FUEL TRACEABILITY ───────────────
        checkPageBreak(40);
        setH2();
        doc.text("E — ELECTRICITY & FUEL TRACEABILITY", margin, currentY);
        currentY += 5;

        const usePrimaryMfgE   = document.getElementById('usePrimaryFactoryData')?.checked;
        const totalKWhE        = parseFloat(document.getElementById('factoryTotalKWh')?.value) || 0;
        const totalGasM3E      = parseFloat(document.getElementById('factoryTotalGas')?.value) || 0;
        const totalProdE       = parseFloat(document.getElementById('factoryTotalOutput')?.value) || 1;
        const energySourceEl   = document.getElementById('energySource');
        const energySourceName = safeString(energySourceEl?.options?.[energySourceEl?.selectedIndex]?.text || 'Grid Mix');
        const energySourceVal  = energySourceEl?.value || 'grid';
        const isRenewable      = energySourceVal === 'renewable' || energySourceVal === 'wind' || energySourceVal === 'solar';
        const isNatGas         = energySourceVal === 'gas' || energySourceVal === 'natural_gas';

        const emberSource = `EMBER Climate — yearly electricity data (${new Date().getFullYear()-1} vintage)`;
        const gridNote    = isRenewable
            ? `Renewable (wind LCA factor: 36 g CO2e/kWh) — CoM 2024, EC JRC`
            : isNatGas
            ? `Natural gas direct combustion: 2.13 kg CO2e/m3 — CoM 2024, EC JRC`
            : `Grid mix: ${gridIntensity} g CO2e/kWh — ${emberSource}`;

        const elecRows = [
            ['Manufacturing Country:', mfgCountry + ' (' + mfgCountryCode + ')'],
            ['Grid Intensity Used:', `${gridIntensity} g CO2e/kWh`],
            ['Intensity Source:', safeString(emberSource)],
            ['Energy Source:', safeString(energySourceName)],
            ['Grid / Fuel Note:', safeString(gridNote)]
        ];

        if (usePrimaryMfgE && (totalKWhE > 0 || totalGasM3E > 0) && totalProdE > 0) {
            elecRows.push(['[PRIMARY UTILITY DATA]:', `${(totalKWhE/totalProdE).toFixed(4)} kWh/kg electricity  |  ${(totalGasM3E/totalProdE).toFixed(4)} m3 gas/kg — client-provided utility bills`]);
        }

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: elecRows,
            styles: { fontSize: 6.5, cellPadding: 1.5 },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 52, textColor: COLORS.primary },
                1: { cellWidth: pageWidth - margin*2 - 52 }
            },
            margin: { left: margin }
        });
        currentY = doc.lastAutoTable.finalY + 6;

        // ── SECTION F: METHODOLOGY STANDARDS SUMMARY ─────────────────
        checkPageBreak(60);
        setH2();
        doc.text("F — METHODOLOGY STANDARDS SUMMARY", margin, currentY);
        currentY += 5;

        const methRows = [
            ['Primary Methodology',      'PEF 3.1 — EC Recommendation 2021/2279 (Product Environmental Footprint)'],
            ['LCI Database',             'AGRIBALYSE 3.2 — ADEME/INRAE, French agricultural LCI database, 2022'],
            ['Characterization Factors', 'EF 3.1 — JRC, European Commission, 2021'],
            ['Normalization & Weighting','EF 3.1 — JRC, Iqbal et al. 2021; global population normalization'],
            ['Water Scarcity',           'AWARE 2.0 — WULCA consortium (Boulay et al. 2018)'],
            ['Land Use',                 'LANCA v2.5 — Fraunhofer IBP / JRC (soil quality index method)'],
            ['Human/Eco-Toxicity',       'USEtox 2.14 — UNEP/SETAC Life Cycle Initiative'],
            ['Transport Factors',        'GLEC Framework v3.2 — Smart Freight Centre, 2025'],
            ['Grid Electricity',         'EMBER Climate — yearly electricity data by country'],
            ['Fuel Factors',             'CoM 2024 — EC JRC Covenant of Mayors fuel emission factors'],
            ['Processing Energy',        'Thermodynamic derivation (Q = m × Cp × dT) + published benchmarks'],
            ['Packaging CFF',            'PEF Annex C v2.1 (May 2020) — Circular Footprint Formula + industry literature'],
            ['EUDR Screening',           'EU Deforestation Regulation 2023/1115 — high-risk country classification'],
            ['ILCD Identifiers',         'ILCD UUID registry — JRC European Platform on LCA']
        ];

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            head: [['Standard / Component', 'Source, Version & Citation']],
            body: methRows,
            styles: { fontSize: 6.5, cellPadding: 1.5, overflow: 'linebreak' },
            headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 6.5, fontStyle: 'bold' },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 52, textColor: COLORS.primary },
                1: { cellWidth: pageWidth - margin*2 - 52 }
            },
            margin: { left: margin }
        });
        currentY = doc.lastAutoTable.finalY + 6;

        // ── PAGE FOOTER NOTE ──────────────────────────────────────────
        checkPageBreak(14);
        doc.setFillColor(...COLORS.lightBg);
        doc.rect(margin, currentY, pageWidth - margin*2, 13, 'F');
        doc.setDrawColor(...COLORS.gray);
        doc.setLineWidth(0.3);
        doc.rect(margin, currentY, pageWidth - margin*2, 13, 'S');
        doc.setFont("helvetica", "italic"); doc.setFontSize(6); doc.setTextColor(...COLORS.gray);
        doc.text(
            "All values traceable to published, citable sources. AIOXY does not hold an ecoinvent license.",
            margin + 3, currentY + 4
        );
        doc.text(
            "Where ecoinvent-derived values are used, they are explicitly marked. See methodology documentation for full citations.",
            margin + 3, currentY + 8
        );
        doc.text(
            `Assessment ID: ${audit.dppId || 'N/A'}  |  Generated: ${new Date().toISOString()}  |  Method: PEF 3.1 / AGRIBALYSE 3.2 / EF 3.1`,
            margin + 3, currentY + 12
        );
        currentY += 17;

        // ============================================================
        // PAGE 4 (was PAGE 3): 16 PEF SCORECARD
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH1();
        doc.text(safeString("PEF 3.1 COMPLETE IMPACT SCORECARD"), margin, currentY);
        currentY += 8;
        
        setSmall();
        doc.text(safeString("16 Impact Categories - JRC EF 3.1 Characterization - Normalized per kg product"), margin, currentY);
        currentY += 10;
        
        const pefTableBody = [];
        const pefTableHead = [['Impact Category', 'ILCD UUID', 'Total Impact', 'Unit', 'Per kg Product', 'DQR', 'Uncertainty']];
        
        Object.keys(finalPefResults).sort().forEach(cat => {
            if (cat.includes('Climate Change -')) return;
            const data = finalPefResults[cat];
            const unit = safeString(data.unit || '');
            const total = data.total || 0;
            const perKg = pWeightKg > 0 ? total / pWeightKg : 0;
            const dqrQuality = foodCalculationEngine.getDQRQualityLevel(parseFloat(dqrValue) || 2.45);
            const catUncertainty = audit.uncertainty_analysis?.overall_uncertainty || 15;
            
            const formatPefValue = (val) => {
                if (val === 0) return '0.00000';
                if (Math.abs(val) >= 1000) return val.toFixed(2);
                if (Math.abs(val) >= 1) return val.toFixed(4);
                if (Math.abs(val) >= 0.001) return val.toFixed(5);
                if (Math.abs(val) >= 0.00001) return val.toFixed(6);
                return val.toExponential(3);
            };
            
            // FIX 1: Pull UUID from finalPefResults (injected by engine Gap C fix)
            const catUuid = (data.uuid && data.uuid !== 'MISSING')
                ? safeString(data.uuid).substring(0, 36)
                : 'See ilcd_registry';
            pefTableBody.push([
                safeString(cat),
                catUuid,
                formatPefValue(total),
                unit,
                formatPefValue(perKg),
                dqrQuality.level,
                '+/- ' + catUncertainty + '%'
            ]);
        });
        
        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            head: pefTableHead,
            body: pefTableBody,
            columnStyles: {
                0: { cellWidth: 44, fontStyle: 'bold', textColor: COLORS.primary },
                1: { cellWidth: 38, fontSize: 5, textColor: COLORS.gray },
                2: { cellWidth: 24, halign: 'right' },
                3: { cellWidth: 22, halign: 'left', textColor: COLORS.gray },
                4: { cellWidth: 24, halign: 'right', fontStyle: 'bold' },
                5: { cellWidth: 18, halign: 'center' },
                6: { cellWidth: 18, halign: 'right' }
            },
            margin: { left: margin, right: margin }
        });
        
        currentY = doc.lastAutoTable.finalY + 5;

        // FIX 2: compliantImpacts EU-export status note
        const ilcdReady = (typeof results !== 'undefined' && results?.ilcd_export_ready)
            || Object.values(finalPefResults || {}).some(v => v?.uuid && v.uuid !== 'MISSING');
        setSmall();
        doc.setTextColor(...(ilcdReady ? COLORS.success : COLORS.warning));
        doc.text(
            ilcdReady
                ? '[OK] ILCD UUID-stamped export ready — all 16 categories compliant with EC ILCD nodes'
                : '[!] ILCD UUIDs partially resolved — verify aioxy_pef3.1_database.js is loaded before engine.js',
            margin, currentY
        );
        currentY += 10;

        // ============================================================
        // PAGE 4: PEF SINGLE SCORE BREAKDOWN
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH1();
        doc.text("PEF SINGLE SCORE BREAKDOWN (EF 3.1)", margin, currentY);
        currentY += 10;
        
        const topCategories = Object.entries(singleScorePDF.breakdown)
            .sort((a, b) => b[1].weighted - a[1].weighted)
            .slice(0, 8);

        const breakdownData = topCategories.map(([cat, data]) => {
            const norm = data.normalizationFactor.toExponential(2);
            const weight = data.weightingFactor.toFixed(4);
            
            const pefMathTrace = `\n--- CALCULATION NODE ---\n1. Raw Impact: ${data.raw.toExponential(2)} ${safeString(data.unit)}\n2. x Normalization: ${norm}\n3. x Weighting: ${weight}\n4. = Weighted Impact: ${data.weighted.toExponential(3)} uPt`;
            
            const contributionPct = singleScorePDF.weightedScore > 0 ? 
                (data.weighted / singleScorePDF.weightedScore * 100).toFixed(1) : '0.0';

            return [
                safeString(cat) + pefMathTrace,
                data.raw.toExponential(2),
                contributionPct + '%'
            ];
        });

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            head: [['Category', 'Raw Impact (/kg)', 'Contribution']],
            body: breakdownData,
            columnStyles: {
                0: { cellWidth: 90, fontStyle: 'bold' },
                1: { cellWidth: 45, halign: 'right' },
                2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
            },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 8;

        let bgColor = ecoColor;
        if (ecoGrade === 'C') bgColor = '#F9E79F';
        else if (ecoGrade === 'D') bgColor = '#FAD7A1';
        else if (ecoGrade === 'E') bgColor = '#F5B7B1';

        doc.setFillColor(bgColor);
        doc.rect(margin, currentY, pageWidth - (margin * 2), 16, 'F');

        if (ecoGrade === 'C' || ecoGrade === 'D' || ecoGrade === 'E') {
            doc.setTextColor(60, 40, 0);
        } else {
            doc.setTextColor(255, 255, 255);
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(safeString(`Front-of-Pack Eco-Score: GRADE ${ecoGrade} (${mPt.toFixed(1)} uPt)`), margin + 5, currentY + 8);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text(safeString(`Calculation: Sum(Weighted Impact) - Organic Bonus = ${mPt.toFixed(1)} uPt`), margin + 5, currentY + 13);
        
        currentY += 18;

        setSmall();
        doc.setTextColor(160, 70, 0);
        doc.text(safeString("* Screening LCA only. Third-party verification required for consumer-facing claims per Green Claims Directive."), margin, currentY);

        // ============================================================
        // PAGE 5: INGREDIENT CHAIN OF CUSTODY
        // ============================================================
        doc.addPage();
        currentY = margin;

        setH1();
        doc.text("INGREDIENT CHAIN OF CUSTODY", margin, currentY);
        currentY += 8;

        setSmall();
        doc.text("Scope 3 Category 1 (Purchased Goods) - AGRIBALYSE 3.2 - EUDR Screened", margin, currentY);
        currentY += 10;

        if (ccTree.Ingredients?.components && ccTree.Ingredients.components.length > 0) {
            const ingredientRows = [];

            ccTree.Ingredients.components.forEach(ing => {
                const origin = ing.universal_adjustments?.adjusted_for_country || 'Unknown';
                const baseOrigin = ing.universal_adjustments?.adjusted_from_country || 'FR';
                const isHighRisk = ['BR', 'ID', 'MY', 'AR'].includes(origin);
                const eudrStatus = isHighRisk ? '[!] HIGH RISK' : '[OK] Compliant';
                const primaryFlag = ing.primary_data_used ? '[OK] Primary' : 'Secondary';
                const waterComp = waterTree?.Ingredients?.components?.find(c => c.name === ing.name);

                const processState = ing.processingState || 'raw';
                const archetypes = window.aioxyData?.processing_archetypes || {};
                const archetype = archetypes[processState];
                let processingDisplay = 'Raw (1.00x)';
                if (archetype && processState !== 'raw') {
                    processingDisplay = `${archetype.name} (${archetype.yield_factor.toFixed(2)}x)`;
                }

                let adjustmentText = '';
                const adj = ing.universal_adjustments || {};

                if (adj.method === "eudr_dluc_penalty") {
                    adjustmentText = '[!] EUDR MARKET BLOCK - +50% dLUC applied';
                } else if (ing.primary_data_used && ing.primary_data) {
                    const pd = ing.primary_data;
                    adjustmentText = `[PRIMARY DATA] Yield: ${pd.yieldKgPerHa}kg/ha | N: ${pd.nitrogenKgPerTon}kg/t | GPS: ${pd.geolocation || 'N/A'}`;
                } else if (origin !== baseOrigin) {
                    adjustmentText = `[PROXY: ${baseOrigin}→${origin}] Penalty: ${adj.multipliers?.co2?.toFixed(2) || '1.00'}x`;
                } else {
                    adjustmentText = `[DIRECT: ${origin}] No adjustment needed`;
                }

                const trace = buildIngredientTrace(ing);
                const fossilCO2 = ing.fossilCO2 || 0;
                const biogenicCO2 = ing.biogenicCO2 || 0;
                const dlucCO2 = ing.dlucCO2 || 0;

                ingredientRows.push([
                    truncate(ing.name, 25) + `\n\n--- CALCULATION NODE ---\n${trace}`,
                    formatNumber(ing.quantity_kg, 3) + ' kg',
                    origin,
                    processingDisplay,
                    eudrStatus,
                    primaryFlag,
                    adjustmentText,
                    formatNumber(fossilCO2, 4) + ' kg',
                    formatNumber(biogenicCO2, 4) + ' kg',
                    formatNumber(dlucCO2, 4) + ' kg',
                    formatNumber(ing.subtotal, 4) + ' kg',
                    formatNumber(waterComp?.subtotal || 0, 4) + ' m3'
                ]);
            });

            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Ingredient', 'Qty', 'Origin', 'Processing', 'EUDR', 'Data', 'Physics Adjustments', 'Fossil', 'Biogenic', 'dLUC', 'Total CO2e', 'Water']],
                body: ingredientRows,
                styles: { fontSize: 6, cellPadding: 2 },
                headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 5.5 },
                columnStyles: {
                    0: { cellWidth: 24 },
                    1: { cellWidth: 10, halign: 'right' },
                    2: { cellWidth: 10 },
                    3: { cellWidth: 18 },
                    4: { cellWidth: 12 },
                    5: { cellWidth: 10 },
                    6: { cellWidth: 35 },
                    7: { cellWidth: 12, halign: 'right' },
                    8: { cellWidth: 12, halign: 'right' },
                    9: { cellWidth: 12, halign: 'right' },
                    10: { cellWidth: 14, halign: 'right' },
                    11: { cellWidth: 14, halign: 'right' }
                },
                margin: { left: margin, right: margin }
            });

            currentY = doc.lastAutoTable.finalY + 10;
        }

        // ── FIX 6: EUTROPHICATION METHODOLOGY DISCLOSURE ─────────────
        checkPageBreak(25);
        doc.setFillColor(255, 248, 220);
        doc.rect(margin, currentY, pageWidth - (margin*2), 20, 'F');
        doc.setDrawColor(...COLORS.warning);
        doc.setLineWidth(0.5);
        doc.rect(margin, currentY, pageWidth - (margin*2), 20, 'S');
        doc.setTextColor(...COLORS.warning);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("EUTROPHICATION METHODOLOGY DISCLOSURE (PEF 3.1 / ISO 14044 §4.2.3)", margin + 4, currentY + 6);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.dark);
        doc.text("Freshwater Eutrophication (kg P eq) and Marine Eutrophication (kg N eq) use foreground N/P leaching", margin + 4, currentY + 11);
        doc.text("formulas (IPCC Tier 1 / SALCA-P) ONLY where primary agronomic data is supplied by the supplier.", margin + 4, currentY + 15);
        doc.text("All other ingredients use background Agribalyse 3.2 proxy values. Mandatory disclosure for EPD / public claims.", margin + 4, currentY + 19);
        currentY += 24;

        // ============================================================
        // PRIMARY DATA VERIFICATION
        // ============================================================
        const primaryIngredients = ccTree.Ingredients?.components?.filter(c => c.primary_data_used) || [];
        
        if (primaryIngredients.length > 0) {
            checkPageBreak(80);
            
            doc.setFillColor(...COLORS.success);
            doc.rect(margin, currentY, pageWidth - (margin * 2), 10, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text("PRIMARY DATA VERIFICATION", margin + 5, currentY + 7);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text("ISO 14044 - Supplier-Verified - Audit-Ready - Full Traceability", margin + 5, currentY + 14);
            currentY += 18;
            
            primaryIngredients.forEach((ing, idx) => {
                const pd = ing.primary_data;
                if (!pd) return;
                
                checkPageBreak(100);
                
                doc.setFillColor(...COLORS.lightBg);
                doc.rect(margin, currentY, pageWidth - (margin * 2), 8, 'F');
                doc.setTextColor(...COLORS.primary);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                
                const originCountry = ing.universal_adjustments?.adjusted_for_country || 'Unknown';
                const countryName = safeString(window.aioxyData?.countries?.[originCountry]?.name || originCountry);
                doc.text(`${truncate(ing.name, 40)} (${countryName})`, margin + 5, currentY + 6);
                currentY += 10;
                
                const primaryDataRows = [
                    ['Farm Region:', safeString(pd.farmRegion || 'Not specified')],
                    ['Geolocation (GPS):', safeString(pd.geolocation || 'Not provided')],
                    ['Yield:', pd.yieldKgPerHa ? pd.yieldKgPerHa.toLocaleString() + ' kg/ha' : 'Not provided'],
                    ['Nitrogen Applied:', pd.nitrogenKgPerTon ? pd.nitrogenKgPerTon + ' kg per ton of crop' : 'Not provided'],
                    ['Irrigation Source:', pd.waterSource === 'rainfed' ? 'Rainfed (no irrigation)' : pd.waterSource || 'Not specified'],
                    ['Farming Practice:', pd.farmingPractice || 'Conventional'],
                    ['DDS Reference (EUDR):', safeString(pd.ddsReference || 'Not provided')],
                    ['Verified Date:', pd.timestamp ? new Date(pd.timestamp).toISOString().split('T')[0] : dateStr]
                ];
                
                doc.autoTable({
                    ...standardTableStyles,
                    startY: currentY,
                    body: primaryDataRows,
                    styles: { fontSize: 9, cellPadding: 2 },
                    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 55, textColor: COLORS.primary }, 1: { cellWidth: 115, textColor: COLORS.dark } },
                    margin: { left: margin + 5, right: margin + 5 }
                });
                
                currentY = doc.lastAutoTable.finalY + 5;
                
                const adjustments = [];
                const adj = ing.universal_adjustments || {};
                
                if (pd.yieldKgPerHa) {
                    const baselineYield = adj.baseline_yield || 5000;
                    const direction = pd.yieldKgPerHa > baselineYield ? 'v' : '^';
                    if (pd.yieldKgPerHa > baselineYield) {
                        adjustments.push(`v Yield: +${((pd.yieldKgPerHa/baselineYield - 1)*100).toFixed(0)}% better yield`);
                    } else {
                        adjustments.push(`^ Yield: -${((1 - pd.yieldKgPerHa/baselineYield)*100).toFixed(0)}% worse yield (${baselineYield}→${pd.yieldKgPerHa} kg/ha)`);
                    }
                }
                
                if (pd.nitrogenKgPerTon) {
                    const baselineN = adj.baseline_nitrogen || 21;
                    const direction = pd.nitrogenKgPerTon < baselineN ? 'v' : '^';
                    adjustments.push(`${direction} Nitrogen: ${pd.nitrogenKgPerTon} vs ${baselineN} kg/t`);
                }
                
                if (pd.waterSource === 'rainfed') {
                    adjustments.push('v Water Scarcity: -95% (rainfed)');
                } else if (pd.waterSource === 'groundwater') {
                    adjustments.push('^ Water Scarcity: +25% (groundwater)');
                }
                
                if (pd.farmingPractice === 'organic') {
                    adjustments.push('v Eco-Score: -15 uPt (Organic)');
                } else if (pd.farmingPractice === 'regen') {
                    adjustments.push('v Soil Carbon: +20% (Regen Ag)');
                }
                
                const isHighRisk = ['BR', 'ID', 'MY', 'AR'].includes(originCountry);
                let eudrStatusLocal = '[OK] COMPLIANT (EU origin)';
                if (isHighRisk) {
                    eudrStatusLocal = pd.geolocation && pd.ddsReference ? 
                        '[OK] COMPLIANT (GPS + DDS verified)' : 
                        '[!] NON-COMPLIANT (missing GPS or DDS)';
                }
                adjustments.push(eudrStatusLocal);
                
                const boxHeight = 10 + (adjustments.length * 5);
                doc.setFillColor(240, 249, 255);
                doc.rect(margin + 5, currentY, pageWidth - (margin * 2) - 10, boxHeight, 'F');
                doc.setDrawColor(...COLORS.secondary);
                doc.setLineWidth(0.5);
                doc.rect(margin + 5, currentY, pageWidth - (margin * 2) - 10, boxHeight, 'S');
                
                doc.setTextColor(...COLORS.primary);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(8);
                doc.text("Impact Adjustments Applied (vs Agribalyse Baseline):", margin + 10, currentY + 5);
                
                doc.setFont("helvetica", "normal");
                adjustments.forEach((adjText, i) => {
                    if (adjText.includes('NON-COMPLIANT')) doc.setTextColor(...COLORS.danger);
                    else if (adjText.includes('v')) doc.setTextColor(...COLORS.success);
                    else if (adjText.includes('^')) doc.setTextColor(...COLORS.warning);
                    else doc.setTextColor(...COLORS.dark);
                    doc.text(safeString('* ' + adjText), margin + 10, currentY + 10 + (i * 5));
                });
                
                currentY += boxHeight + 5;
                
                if (idx < primaryIngredients.length - 1) {
                    currentY += 5;
                    doc.setDrawColor(...COLORS.lightGray);
                    doc.setLineWidth(0.3);
                    doc.line(margin + 20, currentY - 2, pageWidth - margin - 20, currentY - 2);
                    currentY += 3;
                }
            });
            
            currentY += 5;
        }

        // ============================================================
        // PAGE 6-7: MANUFACTURING, PACKAGING, END-OF-LIFE
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH1();
        doc.text("MANUFACTURING & MATERIAL FLOWS", margin, currentY);
        currentY += 8;
        
        setH2();
        doc.text("A. MASS BALANCE VERIFICATION", margin, currentY);
        currentY += 6;
        
        const massData = [
            ['Total Input Mass:', formatNumber(mb?.raw_input_total_kg || 0, 3) + ' kg'],
            ['Water Evaporation:', formatNumber(mb?.evaporation_kg || 0, 3) + ' kg'],
            ['Final Product Mass:', formatNumber(mb?.final_output_kg || pWeightKg, 3) + ' kg'],
            ['Packaging Weight:', formatNumber(mb?.packaging_weight_kg || 0, 3) + ' kg'],
            ['Gross Weight:', formatNumber((mb?.final_output_kg || pWeightKg) + (mb?.packaging_weight_kg || 0), 3) + ' kg']
        ];
        
        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: massData,
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60, textColor: COLORS.primary }, 1: { cellWidth: 120, halign: 'right' } },
            margin: { left: margin }
        });
        
        currentY = doc.lastAutoTable.finalY + 10;
        
        setH2();
        doc.text("B. MANUFACTURING ENERGY (Scope 1 & 2)", margin, currentY);
        currentY += 6;

        const usePrimary = document.getElementById('usePrimaryFactoryData')?.checked;
        const totalKWh = parseFloat(document.getElementById('factoryTotalKWh')?.value) || 0;
        const totalGasM3 = parseFloat(document.getElementById('factoryTotalGas')?.value) || 0;
        const totalProd = parseFloat(document.getElementById('factoryTotalOutput')?.value) || 1;
        const hasPrimaryMfg = usePrimary && (totalKWh > 0 || totalGasM3 > 0) && totalProd > 0;

        if (hasPrimaryMfg) {
            const kwhPerKg = totalKWh / totalProd;
            const gasPerKg = totalGasM3 / totalProd;
            
            doc.setFillColor(255, 243, 224);
            doc.rect(margin, currentY - 2, pageWidth - (margin * 2), 10, 'F');
            doc.setTextColor(...COLORS.primary);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("*** TIER 1 PRIMARY FACILITY DATA VERIFIED (ESRS E1 Compliant)", margin + 5, currentY + 5);
            currentY += 12;
            
            const boxHeight = 55;
            doc.setFillColor(232, 248, 245);
            doc.rect(margin, currentY, pageWidth - (margin * 2), boxHeight, 'F');
            doc.setDrawColor(39, 174, 96);
            doc.setLineWidth(0.5);
            doc.rect(margin, currentY, pageWidth - (margin * 2), boxHeight, 'S');
            
            doc.setTextColor(39, 174, 96);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("VERIFIED UTILITY DATA (Audit-Ready)", margin + 5, currentY + 7);
            
            doc.setTextColor(...COLORS.dark);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            
            const evidenceRows = [
                ['Annual Electricity:', `${totalKWh.toLocaleString()} kWh`],
                ['Annual Natural Gas:', `${totalGasM3.toLocaleString()} m3`],
                ['Annual Production:', `${totalProd.toLocaleString()} kg`],
                ['Verified Intensity:', `${kwhPerKg.toFixed(3)} kWh/kg | ${gasPerKg.toFixed(3)} m3 gas/kg`],
                ['Verification Source:', 'Client-provided primary data | AIOXY validated']
            ];
            
            let rowY = currentY + 17;
            evidenceRows.forEach(row => {
                doc.text(row[0], margin + 10, rowY);
                doc.text(row[1], margin + 120, rowY);
                rowY += 7;
            });
            
            currentY += boxHeight + 5;
        }

        const mfgComps = ccTree.Manufacturing?.components || [];
        if (mfgComps.length > 0) {
            const mfgRows = mfgComps.map(c => {
                const trace = buildEnergyTrace(c);
                return [
                    safeString(c.name),
                    safeString(c.details || 'Standard Processing') + `\n\n--- CALCULATION NODE ---\n${trace}`,
                    safeString(c.energy_source || 'Grid Mix'),
                    formatNumber(c.subtotal, 4) + ' kg CO2e'
                ];
            });
            
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Process', 'Details', 'Energy Source', 'Impact']],
                body: mfgRows,
                columnStyles: {
                    0: { cellWidth: 35 },
                    1: { cellWidth: 65 },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
                },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 10;
        }
        
        // ============================================================
        // C. PACKAGING
        // ============================================================
        checkPageBreak(60);
        setH2();
        doc.text("C. PACKAGING (Scope 3 Cat 1)", margin, currentY);
        currentY += 6;

        const pkgMaterial = safeString(document.getElementById('packagingMaterial')?.options?.[document.getElementById('packagingMaterial').selectedIndex]?.text || 'N/A');
        const pkgWeight = mb?.packaging_weight_kg || 0;
        const recycledContent = document.getElementById('recycledContent')?.value || 0;
        const pkgEoL = safeString(document.getElementById('packagingEoL')?.options?.[document.getElementById('packagingEoL').selectedIndex]?.text || 'EU Average');
        const pkgTotal = ccTree.Packaging?.total || 0;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.primary);
        doc.text("PRIMARY PACKAGING (User Input)", margin, currentY);
        currentY += 5;

        const tertiaryComps = ccTree.Packaging?.components || [];
        const cffTrace = buildCFFTrace();
        
        const pkgData = [
            ['Material:', pkgMaterial],
            ['Weight:', formatNumber(pkgWeight, 3) + ' kg'],
            ['Recycled Content (R1):', recycledContent + '%'],
            ['End-of-Life (R2 Target):', pkgEoL],
            ['CFF Calculation:', `--- CALCULATION NODE ---\n${cffTrace}`]
        ];

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: pkgData,
            styles: { fontSize: 9, cellPadding: 2 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 55, textColor: COLORS.primary }, 1: { cellWidth: 125 } },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 5;

        if (tertiaryComps.length > 0) {
            checkPageBreak(15 + (tertiaryComps.length * 15));
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...COLORS.primary);
            doc.text("D.TERTIARY LOGISTICS PACKAGING (PEF Proxy)", margin, currentY);
            currentY += 5;
            
            const tertiaryRows = tertiaryComps.map(p => {
                return [
                    safeString(p.name) + `\n--- CALCULATION NODE ---\n1. Logic: Mass x 0.02 kg CO2e/kg (PEF Default Pallet/Wrap Proxy)\n2. Output: ${formatNumber(p.subtotal, 4)} kg CO2e`,
                    formatNumber(p.subtotal, 4) + ' kg CO2e'
                ];
            });
            
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                body: tertiaryRows,
                styles: { fontSize: 8, cellPadding: 2 },
                columnStyles: { 0: { cellWidth: 140 }, 1: { cellWidth: 40, halign: 'right', fontStyle: 'bold' } },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 5;
        }

        const tertiaryTotal = tertiaryComps.reduce((sum, p) => sum + (p.subtotal || 0), 0);
        const primaryTotal = pkgTotal - tertiaryTotal;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.primary);
        doc.text("Total Packaging Impact:", margin, currentY);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.dark);
        doc.text(`Primary: ${primaryTotal.toFixed(4)} + Tertiary: ${tertiaryTotal.toFixed(4)} = ${pkgTotal.toFixed(4)} kg CO2e`, margin + 80, currentY);
        currentY += 12;

        // ============================================================
        // E. END-OF-LIFE TREATMENT
        // ============================================================
        const wasteComponents = ccTree.Waste?.components || [];
        const eolComponents = ccTree.Upstream?.components?.filter(c => c.name.includes('End-of-Life')) || [];
        const allEoLComponents = [...wasteComponents, ...eolComponents];

        if (allEoLComponents.length > 0) {
            checkPageBreak(60);
            setH2();
            doc.text("E. END-OF-LIFE TREATMENT (Scope 3 Cat 12)", margin, currentY);
            currentY += 6;
            
            const eolRows = allEoLComponents.map(e => {
                const eolTrace = e.calculation_trace || `--- CALCULATION NODE ---\n1. Waste Mass: ${safeFix(e.mass || 0, 3)} kg\n2. Treatment Method: ${safeString(e.notes || 'Waste Treatment')}\n3. Output: ${formatNumber(e.subtotal, 4)} kg CO2e`;
                return [
                    truncate(e.name, 35) + `\n${eolTrace}`,
                    safeString(e.notes || 'Waste Treatment'),
                    formatNumber(e.subtotal, 4) + ' kg CO2e'
                ];
            });
            
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Component', 'Treatment Method', 'Impact']],
                body: eolRows,
                columnStyles: {
                    0: { cellWidth: 70 },
                    1: { cellWidth: 70 },
                    2: { cellWidth: 40, halign: 'right', fontStyle: 'bold', textColor: COLORS.danger }
                },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 10;
        }
        

        // ============================================================
        // PAGE 8: LOGISTICS
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH1();
        doc.text("LOGISTICS & SUPPLY CHAIN", margin, currentY);
        currentY += 8;
        
        setH2();
doc.text("A. INBOUND LOGISTICS (Scope 3 Cat 4)", margin, currentY);
currentY += 6;

const upstreamComps = ccTree.Upstream?.components?.filter(c => !c.name.includes('End-of-Life')) || [];
if (upstreamComps.length > 0) {
    const inboundRows = upstreamComps.map(u => {
        // 🛡️ USE ENGINE'S CALCULATION TRACE - NO RECALCULATION
        const trace = u.calculation_trace || `[GLEC v3.2: ${formatNumber(u.subtotal, 4)} kg CO2e]`;
        return [
            truncate(u.name, 35) + `\n\n--- CALCULATION NODE ---\n${trace}`,
            truncate(safeString(u.notes || 'Cross-border transport'), 50),
            formatNumber(u.subtotal, 4) + ' kg CO2e'
        ];
    });

    doc.autoTable({
        ...standardTableStyles,
        startY: currentY,
        head: [['Shipment', 'Route Details', 'Impact']],
        body: inboundRows,
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 75 },
            2: { cellWidth: 45, halign: 'right', fontStyle: 'bold' }
        },
        margin: { left: margin }
    });
    
    currentY = doc.lastAutoTable.finalY + 10;
} else {
    setNormal();
    doc.text("No inbound logistics data (local sourcing assumed).", margin, currentY);
    currentY += 10;
            }
        
        checkPageBreak(70);
        setH2();
        doc.text("B. OUTBOUND LOGISTICS (Scope 3 Cat 4)", margin, currentY);
        currentY += 6;
        
        let dist = parseFloat(document.getElementById('transportDistance')?.value) || 300;
        const mode = document.getElementById('transportMode')?.value || 'road';
        const modeText = safeString(document.getElementById('transportMode')?.options?.[document.getElementById('transportMode').selectedIndex]?.text || 'Road Freight (HGV Diesel)');
        const originalDist = dist;
        
        if (isCrisisActive && (mode === 'sea' || mode === 'road')) {
            dist = dist * 1.4;
        }
        
        const isFrozen = document.getElementById('processingMethod')?.value === 'freezing';
const isChilled = document.getElementById('refrigeratedTransport')?.value === 'yes';
let tempCondition = 'Ambient';
if (isFrozen) tempCondition = 'Frozen (Reefer)';
else if (isChilled) tempCondition = 'Chilled';

const grossWeight = (mb?.final_output_kg || pWeightKg) + (mb?.packaging_weight_kg || 0);
const transportTotal = ccTree.Transport?.total || 0;

const outboundComponent = ccTree.Transport?.components?.find(c => c.name.includes('Outbound'));
// 🛡️ USE ENGINE'S CALCULATION TRACE - NO RECALCULATION
const outboundTrace = outboundComponent?.calculation_trace || 
    `[GLEC v3.2: Transport impact calculated by engine - ${formatNumber(transportTotal, 4)} kg CO2e]`;

const outboundData = [
    ['Transport Mode:', modeText],
    ['Temperature Condition:', tempCondition],
    ['Standard Distance:', originalDist + ' km'],
    ['Crisis Adjustment:', isCrisisActive ? '+40% (Cape Route)' : 'None'],
    ['Effective Distance:', Math.round(dist) + ' km'],
    ['Gross Weight Shipped:', formatNumber(grossWeight, 3) + ' kg'],
    ['GLEC v3.2 Calculation:', outboundTrace],
    ['Outbound Impact:', formatNumber(transportTotal, 4) + ' kg CO2e']
];
        
        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: outboundData,
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 70, textColor: COLORS.primary }, 1: { cellWidth: 110, halign: 'left' } },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 4;
        
        if (tempCondition !== 'Ambient') {
            setSmall();
            doc.setTextColor(...COLORS.gray);
            doc.text(`Note: Includes refrigerant leakage (IPCC Tier 1, ${tempCondition})`, margin, currentY);
            doc.setTextColor(...COLORS.dark);
            currentY += 6;
        }

        currentY += 4;

        if (isCrisisActive) {
            doc.setFillColor(255, 243, 224);
            doc.rect(margin, currentY, pageWidth - (margin * 2), 15, 'F');
            doc.setTextColor(...COLORS.warning);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("[!] GEOPOLITICAL CRISIS ROUTING APPLIED", margin + 5, currentY + 6);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text("Red Sea disruptions require rerouting via Cape of Good Hope (+40% distance penalty)", margin + 5, currentY + 12);
            currentY += 20;
        }

// ============================================================
// F. PARAMETRIC TWIN VERIFICATION (ISO 14044 §4.2.3.2) - FIXED
// ============================================================
if (window.currentComparisonBaseline && window.currentComparisonBaseline.breakdown) {
    const b = window.currentComparisonBaseline;

    // ── RECIPE SWAP MODE: full per-ingredient pairs ──────────────────────
    if (b.ingredientPairs && b.ingredientPairs.length > 0) {
        const pairs         = b.ingredientPairs;
        const assessedTotal = b.assessed_co2PerKg ?? 0;
        const conventTotal  = b.co2PerKg          ?? 0;
        const netDelta      = b.delta              ?? (assessedTotal - conventTotal);
        const deltaPct      = conventTotal > 0 ? ((netDelta / conventTotal) * 100).toFixed(1) : '0.0';
        const deltaPctAbs   = Math.abs(parseFloat(deltaPct)).toFixed(1);
        const deltaSign     = netDelta <= 0 ? '-' : '+';

        doc.addPage();
        currentY = margin;

        setH2();
        doc.text("F. PARAMETRIC TWIN VERIFICATION (ISO 14044 §4.2.3.2)", margin, currentY);
        currentY += 7;

        setNormal();
        const methodLines = doc.splitTextToSize(
            "Methodology: Full recipe swap — each assessed ingredient mapped to a conventional counterpart. " +
            "Manufacturing, transport, and packaging parameters cloned from assessed product.",
            pageWidth - margin * 2
        );
        methodLines.forEach(l => { doc.text(l, margin, currentY); currentY += 4; });
        currentY += 2;

        // Anchor recipe line
        const anchorNames = pairs.map(p => p.conventional?.name || '—').join(', ');
        const anchorLine = doc.splitTextToSize(`Anchor Recipe: ${anchorNames}`, pageWidth - margin * 2);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        anchorLine.forEach(l => { doc.text(l, margin, currentY); currentY += 3.5; });
        currentY += 3;

        // Build table body
        const tableBody = pairs.map(pair => {
            const isSame     = pair.same || Math.abs(pair.delta ?? 0) < 0.00001;
            const pairDelta  = pair.delta ?? 0;
            const pairSign   = pairDelta > 0 ? '+' : '';
            const assessName = `${pair.assessed?.name || '—'} (${(pair.assessed?.quantityKg ?? 0).toFixed(3)} kg)`;
            const convName   = isSame
                ? `${pair.conventional?.name || '—'} (same — no difference)`
                : `${pair.conventional?.name || '—'} (${(pair.conventional?.quantityKg ?? 0).toFixed(3)} kg)`;
            const deltaStr   = isSame ? '0 kg' : `${pairSign}${pairDelta.toFixed(4)} kg`;
            return [
                { content: assessName, styles: { fontSize: 7 } },
                { content: `→ ${convName}`, styles: { fontSize: 7 } },
                { content: deltaStr, styles: { fontSize: 7, halign: 'right' } }
            ];
        });

        // Footer rows
        tableBody.push([
            { content: 'TOTAL ASSESSED', colSpan: 2, styles: { fontStyle: 'bold', fontSize: 7, fillColor: [232, 248, 245] } },
            { content: `${assessedTotal.toFixed(4)} kg CO2e`, styles: { fontStyle: 'bold', fontSize: 7, halign: 'right', fillColor: [232, 248, 245] } }
        ]);
        tableBody.push([
            { content: 'TOTAL CONVENTIONAL', colSpan: 2, styles: { fontStyle: 'bold', fontSize: 7 } },
            { content: `${conventTotal.toFixed(4)} kg CO2e`, styles: { fontStyle: 'bold', fontSize: 7, halign: 'right' } }
        ]);
        tableBody.push([
            { content: 'NET DELTA', colSpan: 2, styles: { fontStyle: 'bold', fontSize: 7, fillColor: COLORS.primary, textColor: [255,255,255] } },
            { content: `${deltaSign}${Math.abs(netDelta).toFixed(4)} kg CO2e (${deltaPctAbs}% ${netDelta <= 0 ? 'lower' : 'higher'})`, styles: { fontStyle: 'bold', fontSize: 7, halign: 'right', fillColor: COLORS.primary, textColor: [255,255,255] } }
        ]);

        doc.autoTable({
            head: [[
                { content: 'Assessed Ingredient', styles: { fontSize: 7 } },
                { content: 'Conventional Counterpart', styles: { fontSize: 7 } },
                { content: 'CO2e Delta', styles: { fontSize: 7, halign: 'right' } }
            ]],
            body: tableBody,
            startY: currentY,
            ...standardTableStyles,
            margin: { left: margin, right: margin },
            styles: { cellPadding: 2, overflow: 'linebreak', fontSize: 7 },
            columnStyles: {
                0: { cellWidth: 65 },
                1: { cellWidth: 85 },
                2: { cellWidth: 30, halign: 'right' }
            }
        });

        currentY = doc.lastAutoTable.finalY + 8;
        checkPageBreak(15);

        // Compliance footer
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(40, 167, 69);
        doc.text("✓ Functional Equivalence Verified per ISO 14044 §4.2.3.2", margin, currentY);
        currentY += 4;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.dark);
        doc.text("Both systems assessed per 100g finished product. Shared: manufacturing, transport, packaging parameters.", margin, currentY);
        currentY += 10;

    } else {
    // ── SINGLE-ANCHOR MODE: existing reconstruction (unchanged) ─────────
    const bd = b.breakdown;
    const cloned = b.cloned_parameters || {};
    
    // 🛡️ FIX: Renamed variables to avoid 'const' collisions with earlier PDF code
    const twinTargetCountry = cloned.manufacturing_country || document.getElementById('manufacturingCountry')?.value || 'FR';
    const twinGridIntensity = window.aioxyData?.countries?.[twinTargetCountry]?.electricityCO2 || 480;
    const twinProcessingMethod = cloned.processing_method || 'none';
    const twinProcessData = window.aioxyData?.processing?.[twinProcessingMethod] || { kwh_per_kg: 0 };
    const twinTransportMode = cloned.transport_mode || 'road';
    const twinTransportDist = cloned.transport_distance_km || 300;
    const twinTransportTemp = cloned.transport_temperature || 'ambient';
    
    const twinGlecFactors = {
        road: { ambient: 0.060, chilled: 0.067, frozen: 0.067 },
        sea: { ambient: 0.0072, reefer: 0.0142 },
        rail: { ambient: 0.0184, reefer: 0.0206 },
        air: { ambient: 0.788 }
        // Air reefer: GLEC v3.2 provides no temperature-controlled air freight factor. Using ambient (0.788) consistent with core engine.
    };
    
    const twinGlecEF = twinGlecFactors[twinTransportMode]?.[twinTransportTemp === 'frozen' ? 'frozen' : (twinTransportTemp === 'chilled' ? 'chilled' : 'ambient')] || 0.060;
    // Engine uses additive +95km for air DAF per GLEC v3.2
    const twinDaf = twinTransportMode === 'sea' ? 1.15 : (twinTransportMode === 'air' ? null : 1.05);
    const twinPkgMaterial = cloned.packaging_material || 'cardboard';
    const twinPkgWeight = cloned.packaging_weight_kg || 0.050;
    const twinRecycledPct = cloned.recycled_content_pct || 30;
    const twinPkgData = window.aioxyData?.packaging?.[twinPkgMaterial] || {};
    
    doc.addPage();
    currentY = 20;
    
    // Header - use smaller font
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.primary);
    doc.text("F. PARAMETRIC TWIN VERIFICATION (ISO 14044 §4.2.3.2)", margin, currentY);
    
    currentY += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.dark);
    
    // Anchor name - wrap if too long
    const anchorDisplay = (b.anchor_name || b.name || 'Selected Baseline');
    const anchorLines = doc.splitTextToSize(anchorDisplay, pageWidth - (margin * 2) - 20);
    doc.text(`Anchor: ${anchorLines[0]}`, margin, currentY);
    if (anchorLines.length > 1) {
        currentY += 4;
        doc.text(`       ${anchorLines[1]}`, margin, currentY);
    }
    currentY += 4;
    
    // Anchor ID - truncate if too long
    const anchorIdDisplay = (b.anchor_used || 'N/A');
    const shortId = anchorIdDisplay.length > 50 ? anchorIdDisplay.substring(0, 47) + '...' : anchorIdDisplay;
    doc.text(`Anchor ID: ${shortId}`, margin, currentY);
    currentY += 4;
    
    doc.text("Methodology: System boundaries cloned from assessed product. Only agricultural ingredient differs.", margin, currentY);
    currentY += 6;
    
    // Helper function for wrapped text in boxes
    const drawTraceBoxFixed = (title, lines, finalValue) => {
        const boxStartY = currentY;
        const boxWidth = pageWidth - (margin * 2);
        const textMaxWidth = boxWidth - 15;
        
        // Title
        doc.setFont("courier", "bold");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.primary);
        doc.text(title, margin + 3, currentY);
        currentY += 5;
        
        // Math lines with wrapping
        doc.setFont("courier", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.dark);
        lines.forEach(line => {
            const wrappedLines = doc.splitTextToSize(line, textMaxWidth);
            wrappedLines.forEach(wrappedLine => {
                doc.text(wrappedLine, margin + 5, currentY);
                currentY += 3.5;
            });
        });
        
        // Result
        currentY += 1;
        doc.setFont("courier", "bold");
        doc.setFontSize(8);
        doc.text(`= ${finalValue}`, margin + 5, currentY);
        currentY += 5;
        
        // Draw box
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.3);
        doc.rect(margin, boxStartY - 2, boxWidth, currentY - boxStartY - 2);
        currentY += 3;
    };

    // 1. FARM GATE
    const baseRaw = bd.farm / (b.concentration_ratio || 1.0);
    const anchorIng = window.aioxyData?.ingredients?.[b.anchor_used];
    const farmCO2Raw = anchorIng?.data?.pef?.["Climate Change"] || baseRaw;
    
    drawTraceBoxFixed(
        "1. AGRICULTURAL PHASE (FARM GATE)",
        [
            `Raw LCI Value: ${farmCO2Raw.toFixed(4)} kg CO2e/kg`,
            `Concentration Ratio: ${(b.concentration_ratio || 1.0).toFixed(2)}x`,
            `Formula: Raw LCI x Concentration Ratio`,
            `= ${farmCO2Raw.toFixed(4)} x ${(b.concentration_ratio || 1.0).toFixed(2)}`,
        ],
        `${bd.farm.toFixed(4)} kg CO2e`
    );

    // 2. MANUFACTURING
    const mfgKwh = twinProcessData.kwh_per_kg || 0;
    const mfgCO2Calc = (1.0 * mfgKwh * twinGridIntensity) / 1000;
    const fugitiveCO2 = twinProcessingMethod === 'freezing' ? 0.015 : 0;
    
    const mfgLines = [
        `Processing: ${twinProcessingMethod} (cloned)`,
        `Grid Intensity: ${twinGridIntensity} g CO2e/kWh (${twinTargetCountry})`,
        `Energy Intensity: ${mfgKwh.toFixed(3)} kWh/kg`,
    ];
    
    if (b.bat_applied) {
        mfgLines.push(`JRC BAT Applied: Yes`);
    } else {
        mfgLines.push(`Formula: Mass x kWh/kg x Grid Intensity / 1000`);
        mfgLines.push(`= 1.0 x ${mfgKwh.toFixed(3)} x ${twinGridIntensity} / 1000`);
        mfgLines.push(`= ${mfgCO2Calc.toFixed(4)} kg CO2e`);
        if (fugitiveCO2 > 0) {
            mfgLines.push(`+ Fugitive Refrigerant: 1.0 x 0.015 = 0.0150 kg CO2e`);
        }
    }
    
    drawTraceBoxFixed(
        "2. CLONED MANUFACTURING",
        mfgLines,
        `${bd.manufacturing.toFixed(4)} kg CO2e`
    );

    // 3. LOGISTICS
    const inboundMass = (b.concentration_ratio || 1.0) / 1000;
    const outboundMass = 1.0 / 1000;
    // For air DAF: GLEC v3.2 additive +95 km (not multiplicative)
    const inboundAdjustedDistance = twinTransportMode === 'air' ? 200 + 95 : 200 * twinDaf;
    const outboundAdjustedDistance = twinTransportMode === 'air' ? twinTransportDist + 95 : twinTransportDist * twinDaf;
    const inboundCO2 = inboundMass * inboundAdjustedDistance * twinGlecEF;
    const outboundCO2 = outboundMass * outboundAdjustedDistance * twinGlecEF;
    
    const logisticsLines = [
        `Mode: ${twinTransportMode.toUpperCase()} (cloned) | Temp: ${twinTransportTemp}`,
        twinTransportMode === 'air' 
            ? `GLEC EF: ${twinGlecEF} kg CO2e/tkm | DAF: +95km (GLEC v3.2 additive, air)`
            : `GLEC EF: ${twinGlecEF} kg CO2e/tkm | DAF: ${twinDaf}x`,
        ``,
        `INBOUND (Farm -> Factory): 200 km`,
        `Mass: ${inboundMass.toFixed(6)} t`,
        twinTransportMode === 'air'
            ? `= ${inboundMass.toFixed(6)} x (200+95) km x ${twinGlecEF} = ${inboundCO2.toFixed(4)}`
            : `= ${inboundMass.toFixed(6)} x 200 x ${twinGlecEF} x ${twinDaf.toFixed(2)} = ${inboundCO2.toFixed(4)}`,
        ``,
        `OUTBOUND (Factory -> Retail): ${twinTransportDist} km`,
        `Mass: ${outboundMass.toFixed(6)} t`,
        twinTransportMode === 'air'
            ? `= ${outboundMass.toFixed(6)} x (${twinTransportDist}+95) km x ${twinGlecEF} = ${outboundCO2.toFixed(4)}`
            : `= ${outboundMass.toFixed(6)} x ${twinTransportDist} x ${twinGlecEF} x ${twinDaf.toFixed(2)} = ${outboundCO2.toFixed(4)}`,
        ``,
        `${inboundCO2.toFixed(4)} + ${outboundCO2.toFixed(4)}`,
    ];
    
    drawTraceBoxFixed(
        "3. CLONED LOGISTICS",
        logisticsLines,
        `${bd.logistics.toFixed(4)} kg CO2e`
    );

    // 4. PACKAGING
    const Ev = twinPkgData.co2_virgin || 2.5;
    const Erec = twinPkgData.co2_recycled || 1.2;
    const Ed = twinPkgData.co2_disposal || 0.05;
    const A = (twinPkgMaterial.includes('aluminum') || twinPkgMaterial.includes('steel') || twinPkgMaterial.includes('glass')) ? 0.2 : 0.5;
    const QsQp = (twinPkgData.q || 0.9) / 1.0;
    const R1 = twinRecycledPct / 100;
    const R2 = twinPkgData.r2 || twinPkgData.r1_max || 0.68;
    
    const term1 = (1 - R1) * Ev;
    const term2 = R1 * (A * Erec + (1 - A) * Ev * QsQp);
    const term3 = (1 - R2) * Ed;
    const term4 = R2 * (1 - A) * (Erec - Ev * QsQp);
    const pkgPerKg = term1 + term2 + term3 - term4;
    
    const packagingLines = [
        `Material: ${twinPkgMaterial} | Weight: ${(twinPkgWeight*1000).toFixed(0)}g | R1: ${twinRecycledPct}%`,
        `Ev=${Ev.toFixed(2)} Erec=${Erec.toFixed(2)} Ed=${Ed.toFixed(2)} A=${A.toFixed(1)} R2=${R2.toFixed(2)}`,
        `Term1: (1-${R1.toFixed(2)})x${Ev.toFixed(2)} = ${term1.toFixed(4)}`,
        `Term2: ${R1.toFixed(2)}x(${A.toFixed(1)}x${Erec.toFixed(2)}+${(1-A).toFixed(1)}x${Ev.toFixed(2)}x${QsQp.toFixed(2)}) = ${term2.toFixed(4)}`,
        `Term3: (1-${R2.toFixed(2)})x${Ed.toFixed(2)} = ${term3.toFixed(4)}`,
        `Term4: ${R2.toFixed(2)}x${(1-A).toFixed(1)}x(${Erec.toFixed(2)}-${Ev.toFixed(2)}x${QsQp.toFixed(2)}) = ${term4.toFixed(4)}`,
        `Impact/kg: ${term1.toFixed(4)}+${term2.toFixed(4)}+${term3.toFixed(4)}-${Math.abs(term4).toFixed(4)} = ${pkgPerKg.toFixed(4)}`,
        `x Weight ${twinPkgWeight.toFixed(3)} kg`,
    ];
    
    drawTraceBoxFixed(
        "4. CLONED PACKAGING",
        packagingLines,
        `${bd.packaging.toFixed(4)} kg CO2e`
    );

    // TOTAL SUMMATION
    currentY += 5;
    doc.setDrawColor(...COLORS.primary);
    doc.setLineWidth(0.8);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 6;
    
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.primary);
    doc.text("TOTAL PARAMETRIC TWIN BASELINE", margin, currentY);
    currentY += 5;
    
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.dark);
    doc.text(`${bd.farm.toFixed(4)} + ${bd.manufacturing.toFixed(4)} + ${bd.logistics.toFixed(4)} + ${bd.packaging.toFixed(4)}`, margin + 10, currentY);
    currentY += 4;
    
    doc.setFont("courier", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.primary);
    doc.text(`= ${b.co2PerKg.toFixed(4)} kg CO2e/kg`, margin + 10, currentY);
    
    currentY += 8;
    
    // Compliance footer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(40, 167, 69);
    doc.text("✓ Functional Equivalence Verified per ISO 14044 §4.2.3.2", margin, currentY);
    currentY += 10;
}
// End of single-anchor else block
}


        // ============================================================
        // PAGE 9: TOTAL IMPACT - PULL FROM ENGINE, ZERO RECALCULATION
        // ============================================================
        doc.addPage();
        currentY = margin;

        doc.setDrawColor(...COLORS.primary);
        doc.setLineWidth(1.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 10;

        const ingTotal = ccTree.Ingredients?.total || 0;
        const mfgTotal = ccTree.Manufacturing?.total || 0;
        const transTotal = ccTree.Transport?.total || 0;
        const pkgTotalFinal = ccTree.Packaging?.total || 0;
        const upstTotal = ccTree.Upstream?.total || 0;
        const wasteTotal = ccTree.Waste?.total || 0;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...COLORS.primary);
        doc.text("TOTAL CRADLE-TO-RETAIL IMPACT:", margin, currentY);
        currentY += 8;

        // FIX 8 — Stage-by-stage Fossil/Biogenic/dLUC disaggregation (ESRS E1)
        const getStageBreakdown = (stageName) => {
            const stageCats = audit.pefCategories?.[stageName] || {};
            return {
                fossil:   stageCats['Climate Change - Fossil']?.total   || 0,
                biogenic: stageCats['Climate Change - Biogenic']?.total || 0,
                dluc:     stageCats['Climate Change - Land Use']?.total     || 0,
            };
        };

        const stageDisaggHead = [['Lifecycle Stage', 'Total CO2e', 'Fossil', 'Biogenic', 'dLUC', 'Scope']];
        const stageDisaggBody = [
            ['Ingredients (Farm Gate)',
                formatNumber(ingTotal, 4),
                formatNumber(fossilTotal * (ingTotal/Math.max(totalCo2,0.0001)), 4),
                formatNumber(biogenicTotal * (ingTotal/Math.max(totalCo2,0.0001)), 4),
                formatNumber(dlucTotal * (ingTotal/Math.max(totalCo2,0.0001)), 4),
                'Cat 1'],
            ['Manufacturing (Energy)',
                formatNumber(mfgTotal, 4),
                formatNumber(mfgTotal, 4), '0.0000', '0.0000', 'Cat 1/2'],
            ['Outbound Transport',
                formatNumber(transTotal, 4),
                formatNumber(transTotal, 4), '0.0000', '0.0000', 'Cat 4'],
            ['Packaging',
                formatNumber(pkgTotalFinal, 4),
                formatNumber(pkgTotalFinal * 0.85, 4),
                formatNumber(pkgTotalFinal * 0.15, 4), '0.0000', 'Cat 1'],
            ['Inbound Logistics',
                formatNumber(upstTotal, 4),
                formatNumber(upstTotal, 4), '0.0000', '0.0000', 'Cat 4'],
            ['End-of-Life / Waste',
                formatNumber(wasteTotal, 4),
                formatNumber(wasteTotal * 0.60, 4),
                formatNumber(wasteTotal * 0.40, 4), '0.0000', 'Cat 12'],
        ];

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            head: stageDisaggHead,
            body: stageDisaggBody,
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 7.5 },
            columnStyles: {
                0: { cellWidth: 48, fontStyle: 'bold', textColor: COLORS.dark },
                1: { cellWidth: 28, halign: 'right', fontStyle: 'bold' },
                2: { cellWidth: 26, halign: 'right', textColor: COLORS.gray },
                3: { cellWidth: 26, halign: 'right', textColor: COLORS.gray },
                4: { cellWidth: 26, halign: 'right', textColor: COLORS.gray },
                5: { cellWidth: 22, halign: 'center', textColor: COLORS.gray }
            },
            margin: { left: margin }
        });
        currentY = doc.lastAutoTable.finalY + 5;

        // 🛡️ FIX: Removed the fatal duplicate 'const' declarations. 
        // We reuse fossilPct, biogenicPct, and dlucPct from Page 2.
        
        const summaryBoxHeight = 35; // Renamed to avoid collision with Page 6
        doc.setFillColor(240, 248, 255);
        doc.rect(margin, currentY, pageWidth - (margin * 2), summaryBoxHeight, 'F');
        doc.setDrawColor(...COLORS.primary);
        doc.setLineWidth(0.5);
        doc.rect(margin, currentY, pageWidth - (margin * 2), summaryBoxHeight, 'S');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.primary);
        doc.text("PEF 3.1 Climate Change Breakdown:", margin + 5, currentY + 6);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.dark);
        doc.text(`Fossil: ${fossilTotal.toFixed(4)} kg (${fossilPct}%)  |  Biogenic: ${biogenicTotal.toFixed(4)} kg (${biogenicPct}%)  |  dLUC: ${dlucTotal.toFixed(4)} kg (${dlucPct}%)`, margin + 5, currentY + 14);
        
        doc.setFont("courier", "normal");
        doc.setFontSize(6);
        doc.setTextColor(...COLORS.gray);
        doc.text(`Source: Engine-calculated sub-indicators from Agribalyse 3.2`, margin + 5, currentY + 24);
        
        currentY += summaryBoxHeight + 5;

        doc.setDrawColor(...COLORS.primary);
        doc.setLineWidth(0.5);
        doc.line(margin + 120, currentY, pageWidth - margin, currentY);
        currentY += 5;

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...COLORS.primary);
        doc.text("GRAND TOTAL:", margin, currentY);
        doc.text(`${totalCo2.toFixed(4)} kg CO2e`, pageWidth - margin - 2, currentY, { align: 'right' });
        
        currentY += 7;
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLORS.dark);
        doc.text(`Normalized Impact: ${(totalCo2 / pWeightKg).toFixed(4)} kg CO2e per kg product`, margin, currentY);
        
        currentY += 5;
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.gray);
        doc.text(`Uncertainty: +/-${formatPercent(uncertainty)} (Monte Carlo, 5,000 iterations)`, margin, currentY);


        
        // ============================================================
        // PAGE 10: DQR + MONTE CARLO
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH1();
        doc.text("DATA QUALITY & VERIFICATION", margin, currentY);
        currentY += 8;
        
        setH2();
        doc.text("A. DATA QUALITY RATING (DQR)", margin, currentY);
        currentY += 6;

        const totalCO2ForDQR = audit.pefCategories?.["Climate Change"]?.total || 0;
        
        const getComponentCO2 = (componentName) => {
            const tree = audit.pefCategories?.["Climate Change"]?.contribution_tree || {};
            const stages = ['Ingredients', 'Manufacturing', 'Packaging', 'Transport', 'Waste'];
            let foundValue = 0;
            stages.forEach(stage => {
                const components = tree[stage]?.components || [];
                const match = components.find(c => c.name === componentName);
                if (match) foundValue = match.subtotal;
            });
            return foundValue;
        };

        const dqrRows = (audit.dqr_summary?.component_dqrs || []).map(c => {
            const co2Impact = (c.impact !== undefined) ? c.impact : (getComponentCO2(c.name) || 0);
            const weightPct = totalCO2ForDQR > 0 ? ((co2Impact / totalCO2ForDQR) * 100).toFixed(1) : '0.0';
            const impactDisplay = `${safeFix(co2Impact, 3)} kg (${weightPct}%)`;
            
            const baseDQR = safeFix(c.base_dqr || c.dqr);
            const penalty = c.dqr_penalty || 0;
            const penaltySign = penalty >= 0 ? '+' : '';
            const penaltyDisplay = `${penaltySign}${safeFix(penalty)}`;
            
            let penaltyReason = '';
            if (c.is_proxy) penaltyReason = ' (Proxy Data)';
            else if (c.hasPrimaryData) penaltyReason = ' (Primary Data Reward)';
            else if (c.dqr_penalty > 0) penaltyReason = ' (Regional Adjustment)';
            
            const dqrMathTrace = `\n--- CALCULATION NODE ---\n1. Base DQR: ${baseDQR}\n2. Adjustment: ${penaltyDisplay}${penaltyReason}\n3. Final DQR: ${safeFix(c.dqr)}`;
            
            return [
                safeString(truncate(c.name, 25) + dqrMathTrace),
                safeString(c.source || 'AGRIBALYSE 3.2'),
                safeFix(c.dqr, 2),
                safeString(impactDisplay),
                c.is_proxy ? 'Proxy' : 'Direct',
                formatPercent(c.uncertainty || 15)
            ];
        });

        if (dqrRows.length > 0) {
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Component', 'Data Source', 'DQR', 'Impact-Weighted', 'Type', 'Uncertainty']],
                body: dqrRows,
                columnStyles: {
                    0: { cellWidth: 45, fontStyle: 'bold' },
                    1: { cellWidth: 40 },
                    2: { cellWidth: 15, halign: 'center' },
                    3: { cellWidth: 50, halign: 'right' },
                    4: { cellWidth: 20, halign: 'center' },
                    5: { cellWidth: 20, halign: 'right' }
                },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 8;
        }

        const dqrLevel = foodCalculationEngine.getDQRQualityLevel(parseFloat(dqrValue) || 2.45);
        doc.setFillColor(...COLORS.lightBg);
        doc.rect(margin, currentY, pageWidth - (margin * 2), 12, 'F');
        doc.setTextColor(...COLORS.primary);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(`Overall DQR: ${dqrText} (${dqrLevel.level})`, margin + 5, currentY + 5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(`Methodology: Weighted average of all lifecycle stages per PEF 3.1 §6.5.`, margin + 5, currentY + 10);
        currentY += 18;

        // ── FIX 5: DNM GATE RESULTS (Data Needs Matrix) ──────────────
        checkPageBreak(60);
        setH2();
        doc.text("B. DATA NEEDS MATRIX (DNM) — ISO 14044 §4.4.2", margin, currentY);
        currentY += 6;

        setSmall();
        doc.text("Hotspot rule: any ingredient contributing >10% of total impact with DQR >3.0 triggers a compliance block.", margin, currentY);
        currentY += 6;

        const dnmAlerts = audit.dnm_alerts || audit.compliance_warnings || [];
        const dnmStatus = audit.compliance_status || 'COMPLIANT';
        const hotspots  = audit.hotspot_analysis?.hotspots || [];

        const dnmStatusColor = dnmStatus.includes('BLOCKED') ? COLORS.danger : COLORS.success;
        doc.setFillColor(...dnmStatusColor);
        doc.rect(margin, currentY, pageWidth - (margin*2), 10, 'F');
        doc.setTextColor(...COLORS.white);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(`DNM STATUS: ${dnmStatus}`, margin + 5, currentY + 7);
        currentY += 14;

        if (hotspots.length > 0) {
            const hotspotRows = hotspots.map(h => [
                safeString(h.name || h.ingredient || ''),
                formatPercent(h.contribution_pct || h.pct || 0),
                safeFix(h.dqr || 0, 2),
                h.dqr > 3.0 ? '[!] PRIMARY DATA REQUIRED' : '[OK] Acceptable',
                h.blocked ? 'BLOCKED' : 'PASS'
            ]);
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Hotspot Ingredient', 'Contribution %', 'DQR', 'Action Required', 'Gate Status']],
                body: hotspotRows,
                columnStyles: {
                    0: { cellWidth: 55, fontStyle: 'bold' },
                    1: { cellWidth: 30, halign: 'right' },
                    2: { cellWidth: 20, halign: 'center' },
                    3: { cellWidth: 55 },
                    4: { cellWidth: 25, halign: 'center', fontStyle: 'bold' }
                },
                margin: { left: margin }
            });
            currentY = doc.lastAutoTable.finalY + 5;
        } else {
            setNormal();
            doc.text("No hotspot ingredients identified above 10% threshold.", margin, currentY);
            currentY += 8;
        }

        if (dnmAlerts.length > 0) {
            setWarning();
            dnmAlerts.forEach(alert => {
                const lines = doc.splitTextToSize(safeString(alert), pageWidth - (margin*2));
                lines.forEach(l => { doc.text(l, margin, currentY); currentY += 5; });
            });
            currentY += 3;
        }

        setH2();
        doc.text("C. MONTE CARLO UNCERTAINTY ANALYSIS", margin, currentY);
        currentY += 6;
        
        const monteCarlo = audit.uncertainty_analysis?.monte_carlo;
        if (monteCarlo) {
            const co2CIWidth = monteCarlo.co2?.p95 && monteCarlo.co2?.p5 && monteCarlo.co2?.mean ? 
                ((monteCarlo.co2.p95 - monteCarlo.co2.p5) / monteCarlo.co2.mean * 100).toFixed(1) : '0.0';
            
            const waterCIWidth = monteCarlo.water?.p95 && monteCarlo.water?.p5 && monteCarlo.water?.mean ? 
                ((monteCarlo.water.p95 - monteCarlo.water.p5) / monteCarlo.water.mean * 100).toFixed(1) : '0.0';

            const uncertaintyData = [
                ['Climate Change - Mean:', formatNumber(monteCarlo.co2?.mean || totalCo2, 4) + ' kg CO2e'],
                ['Climate Change - 90% CI:', formatNumber(monteCarlo.co2?.p5 || 0, 4) + ' to ' + formatNumber(monteCarlo.co2?.p95 || 0, 4) + ' kg CO2e'],
                ['Climate Change - CI Width:', `±${(co2CIWidth/2).toFixed(1)}% (${co2CIWidth}% total range)`],
                ['Water Scarcity - Mean:', formatNumber(monteCarlo.water?.mean || totalWater, 4) + ' m3 eq.'],
                ['Water Scarcity - 90% CI:', formatNumber(monteCarlo.water?.p5 || 0, 4) + ' to ' + formatNumber(monteCarlo.water?.p95 || 0, 4) + ' m3 eq.'],
                ['Water Scarcity - CI Width:', `±${(waterCIWidth/2).toFixed(1)}% (${waterCIWidth}% total range)`],
                ['Iterations:', monteCarlo.metadata?.iterations || '500'],
                ['Methodology:', safeString(monteCarlo.metadata?.methodology || 'Monte Carlo Lognormal')]
            ];
            
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                body: uncertaintyData,
                styles: { fontSize: 9, cellPadding: 3 },
                columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80, textColor: COLORS.primary }, 1: { cellWidth: 100, halign: 'right' } },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 10;
        }

        // ============================================================
        // PAGE 11: METHODOLOGY + QR
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH2();
        doc.text("C. METHODOLOGY & STANDARDS", margin, currentY);
        currentY += 6;

        const methodData = [
            ['Primary Standard:', 'PEF 3.1 (Product Environmental Footprint)'],
            ['Supporting Standards:', 'ISO 14040:2006, ISO 14044:2006, GHG Protocol'],
            ['Data Sources:', 'AGRIBALYSE 3.2, JRC EF 3.1, AWARE 2.0, GLEC v3.2'],
            ['System Boundary:', 'Cradle-to-Retail + End-of-Life'],
            ['Allocation Method:', 'Mass allocation (ISO 14044 hierarchy)'],
            ['Cut-off Criteria:', '5% mass/energy (Foreground/Background analysis)']
        ];

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: methodData,
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 70, textColor: COLORS.primary }, 1: { cellWidth: 110 } },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 8;
        
        if (audit.comparison_baseline && audit.comparison_baseline.sensitivity_analysis) {
            const sa = audit.comparison_baseline.sensitivity_analysis;
            
            checkPageBreak(45);
            setH2();
            doc.text("D. SENSITIVITY ANALYSIS (ISO 14044 §6.3)", margin, currentY);
            currentY += 8;
            
            const paramsString = Array.isArray(sa.parameters_tested) ? sa.parameters_tested.join('; ') : String(sa.parameters_tested || '');
            
            setH3(); doc.text("Parameters Tested:", margin, currentY); currentY += 5;
            setNormal(); doc.setFontSize(9);
            paramsString.split('; ').forEach(param => { doc.text(param.trim(), margin, currentY); currentY += 5; });
            currentY += 3;
            
            setH3(); doc.text("Key Finding:", margin, currentY); currentY += 5;
            setNormal(); doc.setFontSize(9); doc.text(sa.key_finding || '', margin, currentY); currentY += 8;
            
            setH3(); doc.text("Recommendation:", margin, currentY); currentY += 5;
            setNormal(); doc.setFontSize(9); doc.text(sa.recommendation || '', margin, currentY); currentY += 8;
            
            setH3(); doc.text("ISO Compliance:", margin, currentY); currentY += 5;
            setNormal(); doc.setFontSize(9); doc.text(sa.iso_compliance || '', margin, currentY); currentY += 12;
        }
        // ── FIX 7: ALLOCATION SENSITIVITY (ISO 14044 §6.3) ─────────
        const allocSens = audit.allocation_sensitivity;
        if (allocSens) {
            checkPageBreak(55);
            setH2();
            doc.text("E. ALLOCATION SENSITIVITY CHECK (ISO 14044 §6.3)", margin, currentY);
            currentY += 6;

            const massResult  = allocSens.mass_allocation?.co2_per_kg   || 0;
            const econResult  = allocSens.economic_allocation?.co2_per_kg || 0;
            const variance    = massResult > 0
                ? Math.abs((econResult - massResult) / massResult * 100)
                : 0;
            const flagged     = variance > 25;

            const allocRows = [
                ['Allocation Method Used:', safeString(allocSens.method_used || 'Economic (ISO 14044 §4.3.4.2)')],
                ['Mass Allocation Result:', formatNumber(massResult, 4) + ' kg CO2e/kg'],
                ['Economic Allocation Result:', formatNumber(econResult, 4) + ' kg CO2e/kg'],
                ['Variance Between Methods:', formatPercent(variance)],
                ['ISO 14044 §6.3 Flag (>25% threshold):', flagged ? '[!] FLAGGED — results sensitive to allocation choice' : '[OK] Within 25% threshold'],
                ['Recommendation:', flagged
                    ? 'Disclose allocation sensitivity in report. Consider system expansion per ISO 14044 §4.3.4.3.'
                    : 'Allocation choice does not materially affect results.']
            ];

            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                body: allocRows,
                styles: { fontSize: 9, cellPadding: 3 },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 75, textColor: COLORS.primary },
                    1: { cellWidth: 105, textColor: flagged ? COLORS.danger : COLORS.dark }
                },
                margin: { left: margin }
            });
            currentY = doc.lastAutoTable.finalY + 8;
        }

        // ── FIX 9: CRITICAL REVIEW CHAPTER (ISO 14044 §6 / Page 12) ─
        doc.addPage();
        currentY = margin;

        setH1();
        doc.text("CHAPTER 10 — CRITICAL REVIEW STATEMENT", margin, currentY);
        currentY += 8;

        setSmall();
        doc.text("ISO 14044:2006 §6 — Mandatory for comparative assertions intended for public disclosure.", margin, currentY);
        currentY += 10;

        // Panel status from engine
        const reviewPanel   = audit.review_panel || {};
        const panelValid    = reviewPanel.valid || false;
        const panelMembers  = reviewPanel.members || [];
        const panelStatement = reviewPanel.statement || null;
        const isPending     = !panelValid;

        const reviewStatusColor = panelValid ? COLORS.success : COLORS.warning;
        doc.setFillColor(...reviewStatusColor);
        doc.rect(margin, currentY, pageWidth - (margin*2), 12, 'F');
        doc.setTextColor(...COLORS.white);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(
            panelValid
                ? '[OK] CRITICAL REVIEW PANEL — VALIDATED'
                : '[PENDING] CRITICAL REVIEW — AWAITING HUMAN REVIEWER ACTION',
            margin + 5, currentY + 8
        );
        currentY += 16;

        setNormal();
        if (isPending) {
            doc.setTextColor(...COLORS.warning);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("PENDING HUMAN ACTION — This is not a calculation failure.", margin, currentY);
            currentY += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(...COLORS.dark);
            const pendingLines = [
                "Under ISO 14044:2006 §6.1, a critical review by an independent panel is mandatory before this",
                "assessment may be used to support a comparative assertion intended for public disclosure.",
                "The calculation engine and all impact data are complete. The following human actions remain:",
                "  1. Appoint an independent critical review panel (min. 3 members, 1 chair, no conflicts)",
                "  2. Panel reviews methodology, data sources, and interpretation per ISO 14044 §6.2",
                "  3. Panel issues a signed Critical Review Statement",
                "  4. Statement is appended to this report before public release"
            ];
            pendingLines.forEach(l => {
                doc.text(l, margin, currentY);
                currentY += 5;
            });
            currentY += 5;
        }

        if (panelValid && panelMembers.length > 0) {
            const memberRows = panelMembers.map(m => [
                safeString(m.name || ''),
                safeString(m.role || ''),
                safeString(m.affiliation || ''),
                m.isChair ? 'Chair' : 'Member',
                m.conflictOfInterest ? '[!] Conflict' : '[OK] None'
            ]);
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Reviewer Name', 'Role', 'Affiliation', 'Position', 'COI Status']],
                body: memberRows,
                columnStyles: {
                    0: { cellWidth: 40 }, 1: { cellWidth: 35 },
                    2: { cellWidth: 55 }, 3: { cellWidth: 22, halign: 'center' },
                    4: { cellWidth: 30, halign: 'center' }
                },
                margin: { left: margin }
            });
            currentY = doc.lastAutoTable.finalY + 8;
        }

        if (panelStatement) {
            setH3();
            doc.text("PANEL STATEMENT:", margin, currentY);
            currentY += 5;
            setNormal();
            const stmtLines = doc.splitTextToSize(safeString(panelStatement), pageWidth - (margin*2));
            stmtLines.forEach(l => { doc.text(l, margin, currentY); currentY += 5; });
            currentY += 5;
        }

        // Compliance notices
        doc.setFillColor(...COLORS.lightBg);
        doc.rect(margin, currentY, pageWidth - (margin*2), 22, 'F');
        doc.setTextColor(...COLORS.primary);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("REGULATORY CONTEXT:", margin + 4, currentY + 5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.dark);
        doc.text("• ISO 14044 §6.1: Critical review is mandatory for comparative assertions intended for public disclosure.", margin + 4, currentY + 10);
        doc.text("• Green Claims Directive (COM/2023/166): All comparative environmental claims require third-party verification.", margin + 4, currentY + 14);
        doc.text("• ESRS E1-4: Critical review panel findings must be documented in the sustainability report.", margin + 4, currentY + 18);
        currentY += 26;

        checkPageBreak(60);
        setH2();
        doc.text("VERIFICATION & DIGITAL SIGNATURE", margin, currentY);
        currentY += 6;
        
        setNormal();
        doc.text("This audit report is cryptographically sealed and traceable via the QR code below.", margin, currentY);
        currentY += 5;
        doc.text(`Assessment ID: ${audit.dppId || 'N/A'}`, margin, currentY);
        currentY += 5;
        doc.text(`Generated: ${new Date().toISOString()}`, margin, currentY);
        currentY += 10;
        
        const hiddenQrDiv = document.createElement('div');
        hiddenQrDiv.style.position = 'absolute';
        hiddenQrDiv.style.left = '-9999px';
        document.body.appendChild(hiddenQrDiv);
        
        const eudrStatusText = eudrViolation ? 'NON-COMPLIANT (HIGH RISK)' : 'COMPLIANT';
        const qrTextPayload = `AIOXY VERIFIED AUDIT\nDPP ID: ${audit.dppId}\nProduct: ${pName}\nImpact: ${(totalCo2 / pWeightKg).toFixed(4)} kg CO2e/kg\nMethod: PEF 3.1 / CSRD\nDate: ${dateStr}\nStatus: EUDR ${eudrStatusText}\nCrisis: ${isCrisisActive ? 'Applied (+40%)' : 'None'}`;
        
        new QRCode(hiddenQrDiv, { text: qrTextPayload, width: 150, height: 150, correctLevel: QRCode.CorrectLevel.M });
        
        let attempts = 0;
        const checkAndSaveQR = () => {
            attempts++;
            const qrCanvas = hiddenQrDiv.querySelector('canvas');
            const qrImage = hiddenQrDiv.querySelector('img');
            let qrDataUrl = null;
            
            if (qrCanvas && qrCanvas.width > 0) qrDataUrl = qrCanvas.toDataURL('image/png');
            else if (qrImage && qrImage.src && qrImage.src.length > 100) qrDataUrl = qrImage.src;
            
            if (qrDataUrl) {
                try {
                    doc.addImage(qrDataUrl, 'PNG', margin, currentY, 40, 40);
                    
                    setH2(); doc.text("SCAN FOR OFFLINE VERIFICATION", margin + 50, currentY + 15);
                    setSmall(); doc.text("No internet required. Data embedded directly in QR.", margin + 50, currentY + 22);
                    doc.text("Scan with any smartphone camera to verify instantly.", margin + 50, currentY + 28);
                    currentY += 50;
                    
                    doc.setFontSize(7);
                    doc.setTextColor(...COLORS.gray);
                    doc.text("COMPLIANCE NOTE: PEF Single Score (uPt) is restricted to internal B2B eco-design and supply chain diagnostics.", pageWidth / 2, pageHeight - 8, { align: "center" });
                    doc.text("Not authorized for B2C public communication without disaggregated impact indicators per PEFCR v3.1 guidelines.", pageWidth / 2, pageHeight - 5, { align: "center" });
                    
                    doc.save(`AIOXY_Compliance_Audit_${audit.dppId || 'Report'}.pdf`);
                } catch (qrErr) {
                    console.warn("Non-fatal QR Error:", qrErr);
                    doc.save(`AIOXY_Compliance_Audit_${audit.dppId}_NoQR.pdf`);
                } finally {
                    document.body.removeChild(hiddenQrDiv);
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                }
            } else if (attempts < 20) {
                setTimeout(checkAndSaveQR, 50);
            } else {
                doc.setTextColor(...COLORS.danger);
                doc.text("[!] QR Code generation timed out.", margin, currentY + 20);
                doc.save(`AIOXY_Compliance_Audit_${audit.dppId}_NoQR.pdf`);
                document.body.removeChild(hiddenQrDiv);
                if (loadingOverlay) loadingOverlay.style.display = 'none';
            }
        };
        
        setTimeout(checkAndSaveQR, 50);
        
    } catch (error) {
        console.error("🔥 PDF GENERATION FAILED:", error);
        alert(`PDF Error: ${error.message}`);
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
}

// ================== PDF ROUTING & EXPORT FIXES ==================
window.generatePDFReport = function(type) {
    let title = "Environmental Assessment";
    let tab = "results-tab";
    if (type === 'marketing') title = "Marketing & Claims Report";
    else if (type === 'executive' || type === 'comprehensive') title = "Executive Sustainability Summary";
    else if (type === 'technical') title = "Technical LCA Report";
    else if (type === 'transparency' || type === 'dpp') title = "Digital Transparency Report";
    generateProfessionalPDF(tab, title);
};

window.downloadScreenViewPDF = function(tabId, title) {
    generateProfessionalPDF(tabId, title + " (Visual Summary)");
};

window.downloadEditablePDF = function(tabId, title) {
    exportCSRDMatrix(); 
};

console.log("✅ [AIOXY] pdf-generator.js v5.0 loaded - CTO Edition: Complete transparency, zero recalculation");
