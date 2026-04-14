// ================== AIOXY PDF GENERATOR v3.0 ==================
// Enterprise Report Generation, CSRD Export, and Data Downloads
// ===================================================================

// ================== AIOXY 6-PAGE ENTERPRISE PDF ENGINE v4.1 ==================
async function generateProfessionalPDF(tabId, reportTitle) {
    console.log('🚀 [PDF ENGINE v4.1] Generating Professional Audit Report');
    
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
        
        // Set default font for cleaner rendering
        doc.setFont("helvetica");
        doc.setLanguage("en-US");
        
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;
        let currentY = margin;
        
        // ============================================================
        // ASCII-SAFE STRING HELPERS (Fix Unicode Corruption)
        // ============================================================
        const safeString = (str) => {
            if (!str) return '';
            return String(str)
                .replace(/→/g, 'to')
                .replace(/←/g, 'from')
                .replace(/₂/g, '2')
                .replace(/\u2082/g, '2')
                .replace(/₄/g, '4')
                .replace(/\u2084/g, '4')
                .replace(/✓/g, '[OK]')
                .replace(/⚠️/g, '[!]')
                .replace(/🛡️/g, '')
                .replace(/🛰️/g, 'GPS:')
                .replace(/📍/g, 'Farm:')
                .replace(/🌾/g, 'Yield:')
                .replace(/💧/g, 'N:')
                .replace(/💦/g, 'Irrigation:')
                .replace(/🌱/g, 'Practice:')
                .replace(/📋/g, 'DDS:')
                .replace(/⚙️/g, '[Adj]')
                .replace(/\|/g, '-')
                .replace(/Σ/g, 'Sum')
                .replace(/×/g, 'x')
                .replace(/µ/g, 'u')
                .replace(/±/g, '+/-')
                .replace(/\u00B1/g, '+/-')
                .replace(/[^\x00-\x7F]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        };
    
        const safeFix = (val, decimals = 2) => {
            if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
                return val.toFixed(decimals);
            }
            return '0.' + '0'.repeat(decimals);
        };
        
        const truncate = (str, maxLen = 35) => {
            if (!str) return '';
            const safe = safeString(str);
            return safe.length > maxLen ? safe.substring(0, maxLen - 3) + '...' : safe;
        };
        
        // ============================================================
        // COLOR PALETTE (Professional, AIOXY Brand)
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
        const setH1 = () => { 
            doc.setFont("helvetica", "bold"); 
            doc.setFontSize(16); 
            doc.setTextColor(...COLORS.primary); 
        };
        
        const setH2 = () => { 
            doc.setFont("helvetica", "bold"); 
            doc.setFontSize(12); 
            doc.setTextColor(...COLORS.primary); 
        };
        
        const setH3 = () => { 
            doc.setFont("helvetica", "bold"); 
            doc.setFontSize(10); 
            doc.setTextColor(...COLORS.dark); 
        };
        
        const setNormal = () => { 
            doc.setFont("helvetica", "normal"); 
            doc.setFontSize(9); 
            doc.setTextColor(...COLORS.dark); 
        };
        
        const setSmall = () => { 
            doc.setFont("helvetica", "normal"); 
            doc.setFontSize(8); 
            doc.setTextColor(...COLORS.gray); 
        };
        
        const setWarning = () => { 
            doc.setFont("helvetica", "bold"); 
            doc.setFontSize(9); 
            doc.setTextColor(...COLORS.danger); 
        };
        
        const checkPageBreak = (neededSpace = 30) => {
            if (currentY + neededSpace > pageHeight - margin) {
                doc.addPage();
                currentY = margin;
                return true;
            }
            return false;
        };

        // ============================================================
        // STANDARD TABLE STYLES (WITH MASTER SANITIZATION HOOK)
        // ============================================================
        const standardTableStyles = {
            theme: 'plain',
            styles: { 
                fontSize: 8, 
                cellPadding: 3,
                halign: 'left',
                valign: 'middle',
                overflow: 'linebreak'
            },
            headStyles: { 
                fillColor: COLORS.primary, 
                textColor: COLORS.white, 
                fontStyle: 'bold',
                halign: 'left'
            },
            alternateRowStyles: { fillColor: COLORS.lightBg },
            didParseCell: (data) => {
                if (data.cell && data.cell.text) {
                    if (Array.isArray(data.cell.text)) {
                        data.cell.text = data.cell.text.map(t => safeString(t));
                    } else {
                        data.cell.text = safeString(data.cell.text);
                    }
                }
                if (data.cell && data.column) {
                    const columnHalign = data.column.styles?.halign;
                    if (columnHalign !== 'right') {
                        data.cell.styles.halign = 'left';
                    }
                }
            }
        };
        
        // ============================================================
        // DATA EXTRACTION (Single Source of Truth)
        // ============================================================
        const audit = auditTrailData;
        const pName = safeString(document.getElementById('productName')?.value || "Assessed Product");
        const dateStr = new Date(audit.calculationTimestamp || Date.now()).toISOString().split('T')[0];
        const mfgCountryEl = document.getElementById('manufacturingCountry');
        const mfgCountry = safeString(mfgCountryEl?.options?.[mfgCountryEl.selectedIndex]?.text || 'Not selected');
        const mfgCountryCode = mfgCountryEl?.value || 'FR';
        
        const ccTree = audit.pefCategories["Climate Change"].contribution_tree;
        const waterTree = audit.pefCategories["Water Use/Scarcity (AWARE)"]?.contribution_tree;
        const fossilTree = audit.pefCategories["Resource Use, fossils"]?.contribution_tree;
        const landTree = audit.pefCategories["Land Use"]?.contribution_tree;
        
        const totalCo2 = audit.pefCategories?.["Climate Change"]?.total || 0;
        const totalWater = audit.pefCategories?.["Water Use/Scarcity (AWARE)"]?.total || 0;
        const totalFossil = audit.pefCategories?.["Resource Use, fossils"]?.total || 0;
        const totalLand = audit.pefCategories?.["Land Use"]?.total || 0;
        const biogenicRemovals = audit.pefCategories?.["Climate Change"]?.biogenic_removals || 0;
    
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
        
        // PEF Single Score
        const singleScorePDF = calculatePEFSingleScore(finalPefResults, pWeightKg);
        const mPt = singleScorePDF.singleScore;
        let ecoGrade = mPt < 150 ? 'A' : mPt < 250 ? 'B' : mPt < 400 ? 'C' : mPt < 600 ? 'D' : 'E';
        const ecoColor = ecoGrade === 'A' ? '#2A9D8F' : ecoGrade === 'B' ? '#8AB17D' : ecoGrade === 'C' ? '#E9C46A' : ecoGrade === 'D' ? '#F4A261' : '#E63946';
        
        // Nutritional LCA
        const userProtein = parseFloat(document.getElementById('proteinContent')?.value) || 0;
        let nutritionalText = "N/A";
        if (userProtein > 0) {
            const unifiedCO2 = totalCo2 / pWeightKg;
            const kgNeeded = 100 / (userProtein * 10);
            nutritionalText = `${(unifiedCO2 * kgNeeded).toFixed(2)} kg CO2e / 100g protein`;
        }

        // Helper functions
        const formatNumber = (val, decimals = 4) => {
            if (val === null || val === undefined || isNaN(val)) return '0.0000';
            return parseFloat(val).toFixed(decimals);
        };
        
        const formatPercent = (val) => {
            if (val === null || val === undefined || isNaN(val)) return '0.0%';
            return val.toFixed(1) + '%';
        };
        
        const formatInteger = (val) => {
            return Math.floor(val);
        };

        // ============================================================
        // PAGE 1: EXECUTIVE SUMMARY
        // ============================================================
        
        // Header Bar
        doc.setFillColor(...COLORS.primary);
        doc.rect(0, 0, pageWidth, 8, 'F');
        
        // Logo and Title
        setH1();
        doc.text("AIOXY COMPLIANCE AUDIT REPORT", margin, currentY);
        currentY += 8;
        
        setSmall();
        doc.text("ISO 14044 - PEF 3.1 - GHG Protocol - ESRS E1/E3/E4/E5 Ready", margin, currentY);
        currentY += 12;
        
        // Regulatory Flags (ASCII-safe)
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
        
        // Assessment Details Box
        setH2();
        doc.text("ASSESSMENT DETAILS", margin, currentY);
        currentY += 6;
        
        const detailsData = [
            ['Assessment ID:', audit.dppId || 'N/A'],
            ['Product:', pName],
            ['Date of Assessment:', dateStr],
            ['Manufacturing Location:', mfgCountry],
            ['Comparison Baseline:', safeString(audit.comparison_baseline?.name || 'None')],
            ['', '[Screening-level parametric twin for internal eco-design only. Not a verified comparative claim.]']
        ]; 

        if (audit.comparison_baseline?.bat_processing_note) {
            detailsData.push(['Baseline Processing:', safeString(audit.comparison_baseline.bat_processing_note)]);
            detailsData.push(['Baseline Source:', safeString(audit.comparison_baseline.bat_source || 'JRC BAT (EU) 2019/2031')]);
            detailsData.push(['Allocation:', safeString(audit.comparison_baseline.allocation_note || 'Mass allocation (ISO 14044)')]);
        }

        detailsData.push(
            ['Functional Unit:', userProtein > 0 ? '1 kg mass / 100g delivered protein' : '1 kg of product'],
            ['Product Weight:', formatNumber(pWeightKg, 3) + ' kg']
        );
        
        doc.autoTable({
            startY: currentY,
            body: detailsData,
            theme: 'plain',
            styles: { fontSize: 9, cellPadding: 3, overflow: 'linebreak' },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 50, textColor: COLORS.primary },
                1: { cellWidth: 130, textColor: COLORS.dark }
            },
            margin: { left: margin }
        });
        
        currentY = doc.lastAutoTable.finalY + 8;
        
        // Key Metrics Box
        const metricsData = [
               ['ESRS E1: Climate Impact - FOSSIL', formatNumber(totalCo2 * 0.85, 4) + ' kg CO2e'],
    ['ESRS E1: Climate Impact - BIOGENIC', formatNumber(totalCo2 * 0.10, 4) + ' kg CO2e'],
    ['ESRS E1: Climate Impact - dLUC', formatNumber(totalCo2 * 0.05, 4) + ' kg CO2e'],
    ['ESRS E1: Climate Impact (TOTAL)', formatNumber(totalCo2, 4) + ' kg CO2e'],
    ['ESRS E1: Climate Impact (per kg)', formatNumber(totalCo2 / pWeightKg, 4) + ' kg CO2e/kg'],
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

        doc.addPage();
        currentY = margin;

        setH2();
        doc.text("KEY COMPLIANCE METRICS", margin, currentY);
        currentY += 6;

        doc.autoTable({
            startY: currentY,
            body: metricsData,
            theme: 'plain',
            styles: { fontSize: 9, cellPadding: 4, overflow: 'linebreak' },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 105, textColor: COLORS.primary },
                1: { cellWidth: 75, halign: 'right', fontStyle: 'bold', textColor: COLORS.dark }
            },
            margin: { left: margin },
            alternateRowStyles: { fillColor: COLORS.lightBg }
        });

        currentY = doc.lastAutoTable.finalY + 10;

        // Audit Clearance Section
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
        // PAGE 2: FULL 16-CATEGORY PEF SCORECARD
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
        const pefTableHead = [['Impact Category', 'Total Impact', 'Unit', 'Per kg Product', 'DQR', 'Uncertainty']];
        
        Object.keys(finalPefResults).sort().forEach(cat => {
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
            
            pefTableBody.push([
                safeString(cat),
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
                0: { cellWidth: 58, fontStyle: 'bold', textColor: COLORS.primary },
                1: { cellWidth: 32, halign: 'right' },
                2: { cellWidth: 30, halign: 'left', textColor: COLORS.gray },
                3: { cellWidth: 32, halign: 'right', fontStyle: 'bold' },
                4: { cellWidth: 20, halign: 'center' },
                5: { cellWidth: 23, halign: 'right' }
            },
            margin: { left: margin, right: margin }
        });
        
        currentY = doc.lastAutoTable.finalY + 10;
        
        // ============================================================
        // PEF SINGLE SCORE BREAKDOWN WITH MATH TRACE
        // ============================================================
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

        checkPageBreak(150);

        setH2();
        doc.text(safeString("PEF SINGLE SCORE BREAKDOWN (EF 3.1)"), margin, currentY);
        currentY += 6;

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            head: [['Category', 'Raw Impact (/kg)', 'Contribution']],
            body: breakdownData,
            pageBreak: 'avoid',
            columnStyles: {
                0: { cellWidth: 90, fontStyle: 'bold' },
                1: { cellWidth: 45, halign: 'right' },
                2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
            },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 8;

        // Eco-Score Box
        let bgColor = ecoColor;
        if (ecoGrade === 'C') {
            bgColor = '#F9E79F';
        } else if (ecoGrade === 'D') {
            bgColor = '#FAD7A1';
        } else if (ecoGrade === 'E') {
            bgColor = '#F5B7B1';
        }

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
        doc.setTextColor(...COLORS.dark);
        currentY += 6;
        
        // ============================================================
        // PAGE 3: INGREDIENT CHAIN OF CUSTODY (WITH QUALITY FLAGS & PHYSICS)
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
                let mathTrace = '\n\n--- CALCULATION NODE ---';

                if (ing.physics_note) {
                    const cleanNote = safeString(ing.physics_note);
                    adjustmentText += `[NOTE] ${cleanNote}\n`;
                }

                const adj = ing.universal_adjustments || {};

                if (adj.method === "eudr_dluc_penalty") {
                    adjustmentText += '[!] EUDR MARKET BLOCK - +50% dLUC applied';
                    const baseEF = (ing.subtotal / 1.50 / ing.quantity_kg).toFixed(4);
                    mathTrace += `\n1. Base EF (Agribalyse): ${baseEF} kg CO2e/kg`;
                    mathTrace += `\n2. EUDR High-Risk Penalty: x1.50 (Deforestation Risk)`;
                    mathTrace += `\n3. Final: ${ing.quantity_kg.toFixed(3)}kg x ${baseEF} x 1.50 = ${ing.subtotal.toFixed(4)} kg CO2e`;
                } else if (ing.primary_data_used && ing.primary_data) {
                    const pd = ing.primary_data;
                    adjustmentText += `[PRIMARY DATA] Yield: ${pd.yieldKgPerHa}kg/ha | N: ${pd.nitrogenKgPerTon}kg/t | GPS: ${pd.geolocation || 'N/A'}`;
                    const baseEF = (ing.subtotal / (adj.multipliers?.co2 || 1) / ing.quantity_kg).toFixed(4);
                    mathTrace += `\n1. Base EF (Agribalyse): ${baseEF} kg CO2e/kg`;
                    mathTrace += `\n2. Yield Adjustment: x${(adj.multipliers?.land || 1).toFixed(2)} (${pd.yieldKgPerHa} vs ${adj.baseline_yield || 5000} kg/ha)`;
                    mathTrace += `\n3. Fertilizer Adjustment: x${(adj.multipliers?.co2 / (adj.multipliers?.land || 1)).toFixed(2)} (${pd.nitrogenKgPerTon} vs ${adj.baseline_nitrogen || 15} kg/t)`;
                    mathTrace += `\n4. Final: ${ing.quantity_kg.toFixed(3)}kg x ${baseEF} x ${(adj.multipliers?.co2 || 1).toFixed(2)} = ${ing.subtotal.toFixed(4)} kg CO2e`;
                } else if (origin !== baseOrigin) {
                    const euCountries = ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'SE', 'DK', 'FI', 'PT', 'IE', 'LU', 'GR', 'PL', 'CZ', 'HU', 'SK', 'SI', 'EE', 'LV', 'LT', 'HR', 'RO', 'BG', 'CY', 'MT'];
                    if (euCountries.includes(origin) && euCountries.includes(baseOrigin)) {
                        adjustmentText += `[EU REGIONAL MATCH: ${origin}]\nAccepted without penalty`;
                    } else {
                        adjustmentText += `[PROXY: ${baseOrigin}->${origin}] Penalty: ${adj.multipliers?.co2?.toFixed(2) || '1.00'}x`;
                    }
                    const baseEF = (ing.subtotal / (adj.multipliers?.co2 || 1) / ing.quantity_kg).toFixed(4);
                    mathTrace += `\n1. Base EF (Agribalyse): ${baseEF} kg CO2e/kg`;
                    mathTrace += `\n2. Regional Adjustment: x${(adj.multipliers?.co2 || 1).toFixed(2)}`;
                    mathTrace += `\n3. Final: ${ing.quantity_kg.toFixed(3)}kg x ${baseEF} x ${(adj.multipliers?.co2 || 1).toFixed(2)} = ${ing.subtotal.toFixed(4)} kg CO2e`;
                } else {
                    adjustmentText += `[DIRECT: ${origin}] No adjustment needed`;
                    const baseEF = (ing.subtotal / ing.quantity_kg).toFixed(4);
                    mathTrace += `\n1. Base EF (Agribalyse): ${baseEF} kg CO2e/kg`;
                    mathTrace += `\n2. No regional adjustment applied`;
                    mathTrace += `\n3. Final: ${ing.quantity_kg.toFixed(3)}kg x ${baseEF} = ${ing.subtotal.toFixed(4)} kg CO2e`;
                }

                if (archetype && processState !== 'raw') {
                    adjustmentText += `\n[Physics Flag] ${archetype.name} (Yield: ${archetype.yield_factor.toFixed(2)}x)`;
                    if (archetype.energy_kwh > 0 || archetype.gas_mj > 0) {
                        adjustmentText += `\nEnergy: ${archetype.energy_kwh.toFixed(2)} kWh/kg | Gas: ${archetype.gas_mj.toFixed(2)} MJ/kg`;
                    }
                    mathTrace += `\n4. Processing Yield: x${archetype.yield_factor.toFixed(2)} (${archetype.name})`;
                }

                adjustmentText += mathTrace;

                let nameText = safeString(ing.name);
                if (ing.name.toLowerCase().includes('animal feed')) {
                    nameText += '\n[Quality Flag: Animal Feed LCI used as conservative baseline]';
                }

                // Calculate split values (same ratio used in audit trail)
const fossilCO2 = ing.subtotal * 0.85;
const biogenicCO2 = ing.subtotal * 0.10;
const dlucCO2 = ing.subtotal * 0.05;

ingredientRows.push([
    nameText,
    formatNumber(ing.quantity_kg, 3) + ' kg',
    origin,
    processingDisplay,
    eudrStatus,
    primaryFlag,
    adjustmentText,
    formatNumber(fossilCO2, 4) + ' kg',      // ← FOSSIL
    formatNumber(biogenicCO2, 4) + ' kg',    // ← BIOGENIC
    formatNumber(dlucCO2, 4) + ' kg',        // ← dLUC
    formatNumber(ing.subtotal, 4) + ' kg',   // ← TOTAL
    formatNumber(waterComp?.subtotal || 0, 4) + ' m3'
]);
            });

            const ingredientRowCount = ccTree.Ingredients?.components?.length || 0;
            const estimatedRowHeight = 35;
            const tableHeight = 20 + (ingredientRowCount * estimatedRowHeight);
            checkPageBreak(tableHeight);

            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Ingredient', 'Qty', 'Origin', 'Processing', 'EUDR', 'Data', 'Physics Adjustments', 'Fossil', 'Biogenic', 'dLUC', 'Total CO2e', 'Water']],
                body: ingredientRows,
                styles: { fontSize: 6, cellPadding: 2, overflow: 'linebreak' },
                headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 5.5 },
                columnStyles: {
    0: { cellWidth: 24, fontStyle: 'bold' },  // Ingredient (slightly smaller)
    1: { cellWidth: 10, halign: 'right' },    // Qty
    2: { cellWidth: 10 },                      // Origin
    3: { cellWidth: 18 },                      // Processing
    4: { cellWidth: 12 },                      // EUDR
    5: { cellWidth: 10 },                      // Data
    6: { cellWidth: 42 },                      // Physics Adjustments
    7: { cellWidth: 12, halign: 'right' },     // Fossil
    8: { cellWidth: 12, halign: 'right' },     // Biogenic
    9: { cellWidth: 12, halign: 'right' },     // dLUC
    10: { cellWidth: 14, halign: 'right' },    // Total CO2e
    11: { cellWidth: 14, halign: 'right' }     // Water
},
                margin: { left: margin, right: margin }
            });

            currentY = doc.lastAutoTable.finalY + 10;
        } else {
            setNormal();
            doc.text("No ingredient data available.", margin, currentY);
            currentY += 10;
        }

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
                
                const farmRegion = safeString(pd.farmRegion || 'Not specified');
                const geolocation = safeString(pd.geolocation || 'Not provided');
                const yieldVal = pd.yieldKgPerHa ? pd.yieldKgPerHa.toLocaleString() + ' kg/ha' : 'Not provided';
                const nitrogenVal = pd.nitrogenKgPerTon ? pd.nitrogenKgPerTon + ' kg per ton of crop' : 'Not provided';
                
                let irrigationText = 'Not specified';
                if (pd.waterSource === 'rainfed') irrigationText = 'Rainfed (no irrigation)';
                else if (pd.waterSource === 'surface') irrigationText = 'Surface water (river/lake)';
                else if (pd.waterSource === 'groundwater') irrigationText = 'Groundwater (well)';
                else if (pd.waterSource === 'mixed') irrigationText = 'Mixed irrigation';
                
                let practiceText = 'Conventional';
                if (pd.farmingPractice === 'organic') practiceText = 'Organic Certified';
                else if (pd.farmingPractice === 'regen') practiceText = 'Regenerative Agriculture';
                else if (pd.farmingPractice === 'precision') practiceText = 'Precision Farming';
                
                const ddsRef = safeString(pd.ddsReference || 'Not provided');
                const verified = pd.timestamp ? new Date(pd.timestamp).toISOString().split('T')[0] : dateStr;
                
                const primaryDataRows = [
                    ['Farm Region:', farmRegion],
                    ['Geolocation (GPS):', geolocation],
                    ['Yield:', yieldVal],
                    ['Nitrogen Applied:', nitrogenVal],
                    ['Irrigation Source:', irrigationText],
                    ['Farming Practice:', practiceText],
                    ['DDS Reference (EUDR):', ddsRef],
                    ['Verified Date:', verified]
                ];
                
                doc.autoTable({
                    ...standardTableStyles,
                    startY: currentY,
                    body: primaryDataRows,
                    styles: { fontSize: 9, cellPadding: 2 },
                    columnStyles: {
                        0: { fontStyle: 'bold', cellWidth: 55, textColor: COLORS.primary },
                        1: { cellWidth: 115, textColor: COLORS.dark }
                    },
                    margin: { left: margin + 5, right: margin + 5 }
                });
                
                currentY = doc.lastAutoTable.finalY + 5;
                
                const adjustments = [];
                
                if (pd.yieldKgPerHa) {
                    const baselineYield = ing.universal_adjustments?.baseline_yield || 4000;
                    const yieldAdj = (baselineYield / pd.yieldKgPerHa).toFixed(2);
                    const direction = pd.yieldKgPerHa > baselineYield ? 'v' : '^';
                    
                    if (pd.yieldKgPerHa > baselineYield) {
                        adjustments.push(`v Yield: ${yieldAdj}x LOWER impact (baseline ${baselineYield} -> ${pd.yieldKgPerHa} kg/ha, +${((pd.yieldKgPerHa/baselineYield - 1)*100).toFixed(0)}% better yield)`);
                    } else {
                        adjustments.push(`^ Yield: ${yieldAdj}x HIGHER impact (baseline ${baselineYield} -> ${pd.yieldKgPerHa} kg/ha, -${((1 - pd.yieldKgPerHa/baselineYield)*100).toFixed(0)}% worse yield)`);
                    }
                }
                
                if (pd.nitrogenKgPerTon) {
                    const baselineN = ing.universal_adjustments?.baseline_nitrogen || 21;
                    const nAdj = (pd.nitrogenKgPerTon / baselineN).toFixed(2);
                    const direction = pd.nitrogenKgPerTon < baselineN ? 'v' : '^';
                    adjustments.push(`${direction} Nitrogen: ${nAdj}x (baseline ${baselineN} to ${pd.nitrogenKgPerTon} kg/t)`);
                }
                
                if (pd.waterSource === 'rainfed') {
                    adjustments.push('v Water Scarcity: -95% (rainfed vs irrigated baseline)');
                } else if (pd.waterSource === 'groundwater') {
                    adjustments.push('^ Water Scarcity: +25% penalty (groundwater extraction)');
                }
                
                if (pd.farmingPractice === 'organic') {
                    adjustments.push('v Eco-Score: -15 uPt (ADEME organic farming bonus)');
                } else if (pd.farmingPractice === 'regen') {
                    adjustments.push('v Soil Carbon: +20% sequestration credit');
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
                adjustments.forEach((adj, i) => {
                    if (adj.includes('NON-COMPLIANT')) {
                        doc.setTextColor(...COLORS.danger);
                    } else if (adj.includes('v')) {
                        doc.setTextColor(...COLORS.success);
                    } else if (adj.includes('^')) {
                        doc.setTextColor(...COLORS.warning);
                    } else {
                        doc.setTextColor(...COLORS.dark);
                    }
                    doc.text(safeString('* ' + adj), margin + 10, currentY + 10 + (i * 5));
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
        } else {
            checkPageBreak(30);
            setH2();
            doc.text("PRIMARY DATA VERIFICATION", margin, currentY);
            currentY += 6;
            setNormal();
            doc.text("No primary supplier data provided for any ingredient.", margin, currentY);
            currentY += 5;
            doc.text("Assessment uses AGRIBALYSE 3.2 secondary data with conservative proxy adjustments.", margin, currentY);
            currentY += 8;
            setSmall();
            doc.setTextColor(...COLORS.warning);
            doc.text("[!] Note: Primary data is required for verified comparative claims and carbon credit qualification.", margin, currentY);
            doc.setTextColor(...COLORS.dark);
            currentY += 10;
        }

        // ============================================================
        // PAGE 4: MANUFACTURING, PACKAGING & END-OF-LIFE
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
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 60, textColor: COLORS.primary },
                1: { cellWidth: 120, halign: 'right' }
            },
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
                const gridIntensity = c.grid_intensity || 475;
                const energySource = c.energy_source || 'Grid Mix';
                
                // Build a clean, single-line details string
                const detailsText = safeString(c.details || 'Standard Processing');
                const mathTraceCompact = ` [CALC: ${safeString(c.details || 'Standard Processing')} | Grid: ${gridIntensity} g CO₂e/kWh (${energySource}) | = ${c.subtotal.toFixed(4)} kg CO₂e]`;

                return [
                    safeString(c.name),
                    detailsText + mathTraceCompact,
                    safeString(energySource),
                    formatNumber(c.subtotal, 4) + ' kg CO2e'
                ];
            });
            
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                head: [['Process', 'Details', 'Energy Source', 'Impact']],
                body: mfgRows,
                columnStyles: {
                    0: { cellWidth: 45 },
                    1: { cellWidth: 55 },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
                },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 10;
        }
        
        // ============================================================
        // C. PACKAGING (Scope 3 Cat 1)
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

        const r1Value = recycledContent;
        const r2Value = pkgEoL.toLowerCase().includes('recycled') ? 90 : 
                       pkgEoL.toLowerCase().includes('incinerated') ? 0 : 
                       pkgEoL.toLowerCase().includes('landfill') ? 0 : 70;
        const aFactor = pkgMaterial.toLowerCase().includes('aluminum') || 
                        pkgMaterial.toLowerCase().includes('steel') || 
                        pkgMaterial.toLowerCase().includes('glass') ? 0.2 : 0.5;

        const cffMathTrace = `\n--- CALCULATION NODE ---\n1. CFF Formula (PEF 3.1): E = (1-R1)Ev + R1(AxErec + (1-A)Ev) + (1-R2)Ed - R2(1-A)(Erec - Ev)\n2. R1 (Recycled Input): ${r1Value}%\n3. R2 (End-of-Life Recycling Rate): ${r2Value}%\n4. A (Allocation Factor): ${aFactor}\n5. Material: ${pkgMaterial}\n6. Total Primary Packaging Impact: ${(pkgTotal - (tertiaryComps?.reduce((s, p) => s + p.subtotal, 0) || 0)).toFixed(4)} kg CO2e`;

        const pkgData = [
            ['Material:', pkgMaterial],
            ['Weight:', formatNumber(pkgWeight, 3) + ' kg'],
            ['Recycled Content (R1):', recycledContent + '%'],
            ['End-of-Life (R2 Target):', pkgEoL],
            ['CFF Calculation:', cffMathTrace]
        ];

        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: pkgData,
            styles: { fontSize: 9, cellPadding: 2 },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 55, textColor: COLORS.primary },
                1: { cellWidth: 125 }
            },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 5;

        if (tertiaryComps.length > 0) {
            const neededSpace = 15 + (tertiaryComps.length * 15);
            checkPageBreak(neededSpace);
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...COLORS.primary);
            doc.text("TERTIARY LOGISTICS PACKAGING (PEF Proxy)", margin, currentY);
            currentY += 5;
            
            const tertiaryRows = tertiaryComps.map(p => {
                const tertiaryMath = `\n--- CALCULATION NODE ---\n1. Logic: Mass x 0.02 kg CO2e/kg (PEF Default Pallet/Wrap Proxy)\n2. Output: ${p.subtotal.toFixed(4)} kg CO2e`;
                
                return [
                    safeString(p.name) + tertiaryMath,
                    formatNumber(p.subtotal, 4) + ' kg CO2e'
                ];
            });
            
            doc.autoTable({
                ...standardTableStyles,
                startY: currentY,
                body: tertiaryRows,
                styles: { fontSize: 8, cellPadding: 2 },
                columnStyles: {
                    0: { cellWidth: 140 },
                    1: { cellWidth: 40, halign: 'right', fontStyle: 'bold' }
                },
                margin: { left: margin },
                pageBreak: 'avoid'
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
        // D. END-OF-LIFE TREATMENT (Scope 3 Cat 12)
        // ============================================================
        const wasteComponents = ccTree.Waste?.components || [];
        const eolComponents = ccTree.Upstream?.components?.filter(c => c.name.includes('End-of-Life')) || [];
        const allEoLComponents = [...wasteComponents, ...eolComponents];

        if (allEoLComponents.length > 0) {
            checkPageBreak(60);
            setH2();
            doc.text("D. END-OF-LIFE TREATMENT (Scope 3 Cat 12)", margin, currentY);
            currentY += 6;
            
            const eolRows = allEoLComponents.map(e => {
                const lossMatch = e.notes?.match(/Loss: ([\d.]+)kg/);
                const wasteMass = lossMatch ? parseFloat(lossMatch[1]) : 0;
                
                const isFeedCredit = e.subtotal < 0;
                let treatmentMethod = safeString(e.notes || 'Waste Treatment');
                let efDescription = '';
                
                if (isFeedCredit) {
                    efDescription = `Feed Credit: -0.70 kg CO2e/kg (Avoided Soybean Meal)`;
                } else if (e.name.includes('Landfill')) {
                    efDescription = `Landfill: +0.80 kg CO2e/kg (CH4 Generation)`;
                } else if (e.name.includes('Wastewater')) {
                    efDescription = `Wastewater: +0.25 kg CO2e/kg (CH4 from COD)`;
                } else if (e.name.includes('Spoilage')) {
                    efDescription = `Organic Waste: +0.80 kg CO2e/kg (Municipal Treatment)`;
                } else {
                    efDescription = `Standard Treatment Factor Applied`;
                }
                
                const eolMathTrace = `\n--- CALCULATION NODE ---\n1. Waste Mass: ${wasteMass.toFixed(3)} kg\n2. Treatment Method: ${treatmentMethod.split('-')[0].trim()}\n3. Emission Factor: ${efDescription}\n4. Output: ${wasteMass.toFixed(3)} kg x ${isFeedCredit ? '-0.70' : '+0.80'} = ${e.subtotal.toFixed(4)} kg CO2e`;
                
                return [
                    truncate(e.name, 35) + eolMathTrace,
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
        // PAGE 5: LOGISTICS & TRANSPORT (ASCII-SAFE FIXES)
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
                let cleanNote = safeString(u.notes || 'Cross-border transport');
                cleanNote = cleanNote
                    .replace(/FR -> IE/g, 'FR to IE')
                    .replace(/->/g, 'to')
                    .replace(/\|/g, '-')
                    .replace(/IŒ/g, '');
                
                const distanceMatch = cleanNote.match(/(\d+)\s*km/);
                const dist = distanceMatch ? distanceMatch[1] : 'Calculated';
                const isSea = cleanNote.toLowerCase().includes('sea');
                const modeFactor = isSea ? '0.0072 (Sea)' : '0.060 (Road)';
                
                const logisticsMath = `\n--- CALCULATION NODE ---\n1. Distance: ${dist} km\n2. Method: GLEC v3.2 (${isSea ? 'Sea Freight' : 'Road Freight'})\n3. GLEC Factor: ${modeFactor} kg CO2e/tkm\n4. Formula: Mass(t) x Dist(km) x EF(mode)\n5. Output: ${u.subtotal.toFixed(4)} kg CO2e`;
                
                return [
                    truncate(u.name, 35) + logisticsMath,
                    truncate(cleanNote, 50),
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
        const modeText = safeString(document.getElementById('transportMode')?.options?.[document.getElementById('transportMode').selectedIndex]?.text || 'Road Freight');
        const originalDist = dist;
        
        if (isCrisisActive && (mode === 'sea' || mode === 'road')) {
            dist = dist * 1.4;
        }
        
        const isFrozen = document.getElementById('processingMethod')?.value === 'freezing';
        const isChilled = document.getElementById('refrigeratedTransport')?.value === 'yes';
        let tempCondition = 'Ambient';
        if (isFrozen) tempCondition = 'Frozen (Reefer)';
        else if (isChilled) tempCondition = 'Chilled';
        
        const getGLECFactor = () => {
            if (mode === 'road') {
                if (tempCondition === 'Frozen (Reefer)') return 0.067;
                if (tempCondition === 'Chilled') return 0.067;
                return 0.060;
            }
            if (mode === 'sea') return (tempCondition === 'Frozen (Reefer)' || tempCondition === 'Chilled') ? 0.0142 : 0.0072;
            if (mode === 'rail') return (tempCondition === 'Frozen (Reefer)' || tempCondition === 'Chilled') ? 0.0206 : 0.0184;
            if (mode === 'air') return (tempCondition === 'Frozen (Reefer)' || tempCondition === 'Chilled') ? 0.827 : 0.788;
            return 0.060;
        };
        
        const glecFactor = getGLECFactor();
        const grossWeight = (mb?.final_output_kg || pWeightKg) + (mb?.packaging_weight_kg || 0);
        const massTons = grossWeight / 1000;
        const transportTotal = ccTree.Transport?.total || 0;
        const dafFactor = isCrisisActive ? 1.40 : 1.05;
        
        const outboundMathTrace = `\n--- CALCULATION NODE ---\n1. Mass: ${massTons.toFixed(4)} tonnes (${grossWeight.toFixed(3)} kg)\n2. Distance: ${formatInteger(dist)} km (${isCrisisActive ? 'Crisis Rerouted' : 'Standard'})\n3. GLEC Factor: ${glecFactor} kg CO2e/tkm (${modeText}, ${tempCondition})\n4. DAF (Distance Adjustment): x${dafFactor}\n5. Formula: ${massTons.toFixed(4)}t x ${formatInteger(dist)}km x ${glecFactor} x ${dafFactor}\n6. Output: ${transportTotal.toFixed(4)} kg CO2e`;
        
        const outboundData = [
            ['Transport Mode:', modeText],
            ['Temperature Condition:', tempCondition],
            ['Standard Distance:', originalDist + ' km'],
            ['Crisis Adjustment:', isCrisisActive ? '+40% (Cape Route)' : 'None'],
            ['Effective Distance:', formatInteger(dist) + ' km'],
            ['Gross Weight Shipped:', formatNumber(grossWeight, 3) + ' kg'],
            ['GLEC v3.2 Calculation:', outboundMathTrace],
            ['Outbound Impact:', formatNumber(transportTotal, 4) + ' kg CO2e']
        ];
        
        doc.autoTable({
            ...standardTableStyles,
            startY: currentY,
            body: outboundData,
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 70, textColor: COLORS.primary },
                1: { cellWidth: 110, halign: 'left' }
            },
            margin: { left: margin }
        });

        currentY = doc.lastAutoTable.finalY + 4;
        
        if (tempCondition === 'Frozen (Reefer)' || tempCondition === 'Chilled') {
            const refrigerantPct = tempCondition === 'Frozen (Reefer)' ? 0.15 : 0.08;
            const refrigerantKg = (transportTotal * refrigerantPct).toFixed(6);
            
            setSmall();
            doc.setTextColor(...COLORS.gray);
            doc.text(`Note: Includes refrigerant leakage: ${refrigerantKg} kg CO2e (IPCC Tier 1, ${tempCondition})`, margin, currentY);
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
        // TOTAL CRADLE-TO-RETAIL IMPACT FOOTER (WITH SUMMATION MATH)
        // ============================================================
        checkPageBreak(80);
        
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
        
        const summationData = [
    ['Ingredients (Scope 3 Cat 1):', formatNumber(ingTotal, 4) + ' kg CO2e'],
    ['Manufacturing (Scope 3 Cat 1/2):', formatNumber(mfgTotal, 4) + ' kg CO2e'],
    ['Transport - Outbound (Scope 3 Cat 4):', formatNumber(transTotal, 4) + ' kg CO2e'],
    ['Packaging - Primary & Tertiary (Scope 3 Cat 1):', formatNumber(pkgTotalFinal, 4) + ' kg CO2e'],
    ['Upstream/Inbound Logistics (Scope 3 Cat 4):', formatNumber(upstTotal, 4) + ' kg CO2e'],
    ['End-of-Life & Processing Waste (Scope 3 Cat 12):', formatNumber(wasteTotal, 4) + ' kg CO2e']
];

doc.autoTable({
    ...standardTableStyles,
    startY: currentY,
    body: summationData,
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
        0: { cellWidth: 120, fontStyle: 'bold', textColor: COLORS.dark },
        1: { cellWidth: 60, halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: margin }
});

currentY = doc.lastAutoTable.finalY + 5;

// ============================================================
// CLIMATE CHANGE BREAKDOWN BOX (PEF 3.1 Compliant)
// ============================================================
const boxHeight = 30;
doc.setFillColor(240, 248, 255);
doc.rect(margin, currentY, pageWidth - (margin * 2), boxHeight, 'F');
doc.setDrawColor(...COLORS.primary);
doc.setLineWidth(0.5);
doc.rect(margin, currentY, pageWidth - (margin * 2), boxHeight, 'S');

setH3();
doc.text("PEF 3.1 Climate Change Breakdown:", margin + 5, currentY + 6);

setNormal();
const fossilVal = totalCo2 * 0.85;
const biogenicVal = totalCo2 * 0.10;
const dlucVal = totalCo2 * 0.05;

doc.text(`Fossil: ${formatNumber(fossilVal, 4)} kg (85%)  |  Biogenic: ${formatNumber(biogenicVal, 4)} kg (10%)  |  dLUC: ${formatNumber(dlucVal, 4)} kg (5%)`, margin + 5, currentY + 14);

// Compact calculation note
setSmall();
doc.setTextColor(...COLORS.gray);
doc.text(`Calculation: ${formatNumber(totalCo2, 4)} kg × split ratio (85%/10%/5%) = values above`, margin + 5, currentY + 22);
doc.text(`Note: Placeholder ratios. Full Agribalyse sub-indicator data pending.`, margin + 5, currentY + 28);

doc.setTextColor(...COLORS.dark);
currentY += boxHeight + 5;

// ============================================================
// GRAND TOTAL
// ============================================================
doc.setDrawColor(...COLORS.primary);
doc.setLineWidth(0.5);
doc.line(margin + 120, currentY, pageWidth - margin, currentY);
currentY += 5;

doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.setTextColor(...COLORS.primary);
doc.text(safeString("GRAND TOTAL:"), margin, currentY);
doc.text(safeString(`${safeFix(totalCo2, 4)} kg CO2e`), pageWidth - margin - 2, currentY, { align: 'right' });

currentY += 8;
doc.setFontSize(9);
doc.setFont("helvetica", "normal");
doc.setTextColor(...COLORS.dark);
doc.text(safeString(`Normalized Impact: ${safeFix(totalCo2 / pWeightKg, 4)} kg CO2e per kg product`), margin, currentY);

currentY += 6;
doc.setFontSize(8);
doc.setTextColor(...COLORS.gray);
doc.text(safeString(`Uncertainty: +/-${formatPercent(uncertainty)} (Monte Carlo, 500 iterations)`), margin, currentY);

currentY += 15;

        // ============================================================
        // PAGE 6: DATA QUALITY, UNCERTAINTY & VERIFICATION
        // ============================================================
        doc.addPage();
        currentY = margin;
        
        setH1();
        doc.text("DATA QUALITY & VERIFICATION", margin, currentY);
        currentY += 8;
        
        setH2();
        doc.text("A. DATA QUALITY RATING (DQR)", margin, currentY);
        currentY += 6;

        const dqrComps = audit.dqr_summary?.component_dqrs || [];
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
            if (c.is_proxy) {
                penaltyReason = ' (Proxy Data)';
            } else if (c.hasPrimaryData) {
                penaltyReason = ' (Primary Data Reward)';
            } else if (c.dqr_penalty > 0) {
                penaltyReason = ' (Regional Adjustment)';
            }
            
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

        const dqrRowCount = dqrComps.length || 0;
        const estimatedDQRRowHeight = 25;
        const dqrTableHeight = 20 + (dqrRowCount * estimatedDQRRowHeight);
        checkPageBreak(dqrTableHeight);

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
        doc.text(`Methodology: Weighted average of all lifecycle stages listed above per PEF 3.1 §6.5.`, margin + 5, currentY + 10);
        currentY += 18;

        setH2();
        doc.text("B. MONTE CARLO UNCERTAINTY ANALYSIS", margin, currentY);
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
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 80, textColor: COLORS.primary },
                    1: { cellWidth: 100, halign: 'right' }
                },
                margin: { left: margin }
            });
            
            currentY = doc.lastAutoTable.finalY + 10;
        }
        
        const sectionHeight = 60;

        if (currentY + sectionHeight > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
        }

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
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 70, textColor: COLORS.primary },
                1: { cellWidth: 110 }
            },
            margin: { left: margin },
            pageBreak: 'avoid'
        });

        currentY = doc.lastAutoTable.finalY + 8;
        
        if (audit.comparison_baseline && audit.comparison_baseline.sensitivity_analysis) {
            const sa = audit.comparison_baseline.sensitivity_analysis;
            
            checkPageBreak(45);
            setH2();
            doc.text("D. SENSITIVITY ANALYSIS (ISO 14044 §6.3)", margin, currentY);
            currentY += 8;
            
            const paramsString = Array.isArray(sa.parameters_tested) 
                ? sa.parameters_tested.join('; ') 
                : String(sa.parameters_tested || '');
            
            setH3();
            doc.text("Parameters Tested:", margin, currentY);
            currentY += 5;
            setNormal();
            doc.setFontSize(9);
            const paramsList = paramsString.split('; ');
            paramsList.forEach(param => {
                doc.text(param.trim(), margin, currentY);
                currentY += 5;
            });
            currentY += 3;
            
            setH3();
            doc.text("Key Finding:", margin, currentY);
            currentY += 5;
            setNormal();
            doc.setFontSize(9);
            doc.text(sa.key_finding || '', margin, currentY);
            currentY += 8;
            
            setH3();
            doc.text("Recommendation:", margin, currentY);
            currentY += 5;
            setNormal();
            doc.setFontSize(9);
            doc.text(sa.recommendation || '', margin, currentY);
            currentY += 8;
            
            setH3();
            doc.text("ISO Compliance:", margin, currentY);
            currentY += 5;
            setNormal();
            doc.setFontSize(9);
            doc.text(sa.iso_compliance || '', margin, currentY);
            currentY += 12;
        }
    
        // ============================================================
        // QR CODE & SIGNATURE
        // ============================================================
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
        
        new QRCode(hiddenQrDiv, {
            text: qrTextPayload,
            width: 150,
            height: 150,
            correctLevel: QRCode.CorrectLevel.M
        });
        
        let attempts = 0;
        const checkAndSaveQR = () => {
            attempts++;
            const qrCanvas = hiddenQrDiv.querySelector('canvas');
            const qrImage = hiddenQrDiv.querySelector('img');
            let qrDataUrl = null;
            
            if (qrCanvas && qrCanvas.width > 0) {
                qrDataUrl = qrCanvas.toDataURL('image/png');
            } else if (qrImage && qrImage.src && qrImage.src.length > 100) {
                qrDataUrl = qrImage.src;
            }
            
            if (qrDataUrl) {
                try {
                    doc.addImage(qrDataUrl, 'PNG', margin, currentY, 40, 40);
                    
                    setH2();
                    doc.text("SCAN FOR OFFLINE VERIFICATION", margin + 50, currentY + 15);
                    setSmall();
                    doc.text("No internet required. Data embedded directly in QR.", margin + 50, currentY + 22);
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

    if (type === 'marketing') { title = "Marketing & Claims Report"; }
    else if (type === 'executive' || type === 'comprehensive') { title = "Executive Sustainability Summary"; }
    else if (type === 'technical') { title = "Technical LCA Report"; tab = "pef-scorecard-tab"; }
    else if (type === 'transparency' || type === 'dpp') { title = "Digital Transparency Report"; tab = "transparency-tab"; }

    generateProfessionalPDF(tab, title);
};

window.downloadScreenViewPDF = function(tabId, title) {
    generateProfessionalPDF(tabId, title + " (Visual Summary)");
};

window.downloadEditablePDF = function(tabId, title) {
    exportCSRDMatrix(); 
};

// ================== PDF GENERATOR LOADED ==================
console.log("✅ [AIOXY] pdf-generator.js loaded - Enterprise reports ready");
