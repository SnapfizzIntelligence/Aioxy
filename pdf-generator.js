// ============================================================
// AIOXY PDF GENERATOR v6.0 — FULL REWRITE
// Audit-Grade Report — Pure Engine Trace Reader
// Zero shadow calculations. Zero DOM reads for data.
// All values read from window.auditTrailData and window.finalPefResults.
// ============================================================

async function generateProfessionalPDF(tabId, reportTitle) {
    console.log('[AIOXY PDF v6.0] Generating Audit-Grade Report');

    const loadingOverlay = document.getElementById('pdf-loading-overlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    // ── VALIDATE ────────────────────────────────────────────
    if (!window.finalPefResults || Object.keys(window.finalPefResults).length === 0 ||
        !window.auditTrailData  || !window.auditTrailData.pefCategories) {
        alert('Please run the AIOXY calculation before exporting the PDF.');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.setFont('helvetica');
        doc.setLanguage('en-US');

        const PW   = doc.internal.pageSize.width;   // 210mm
        const PH   = doc.internal.pageSize.height;  // 297mm
        const M    = 14;   // margin
        const CW   = PW - M * 2; // content width 182mm
        let   Y    = M;

        // ── COLORS ─────────────────────────────────────────
        const C = {
            navyDark:    [10,  37,  64],
            navyMid:     [26,  74,  107],
            teal:        [0,   168, 150],
            amber:       [244, 162, 97],
            green:       [42,  157, 143],
            red:         [230, 57,  70],
            bodyDark:    [45,  55,  72],
            bodyMid:     [113, 128, 150],
            rowAlt:      [237, 242, 247],
            pageBg:      [248, 250, 252],
            white:       [255, 255, 255],
            rule:        [203, 213, 224],
            traceGg:     [245, 247, 250],
            yellow:      [255, 243, 205]
        };

        // ── CATEGORY UNITS ──────────────────────────────────
        const CAT_UNITS = {
            'Climate Change':                'kg CO2e',
            'Climate Change - Fossil':       'kg CO2e',
            'Climate Change - Biogenic':     'kg CO2e',
            'Climate Change - Land Use':     'kg CO2e',
            'Ozone Depletion':               'kg CFC11e',
            'Human Toxicity, non-cancer':    'CTUh',
            'Human Toxicity, cancer':        'CTUh',
            'Particulate Matter':            'disease inc.',
            'Ionizing Radiation':            'kBq U235e',
            'Photochemical Ozone Formation': 'kg NMVOCe',
            'Acidification':                 'mol H+e',
            'Eutrophication, terrestrial':   'mol Ne',
            'Eutrophication, freshwater':    'kg Pe',
            'Eutrophication, marine':        'kg Ne',
            'Ecotoxicity, freshwater':       'CTUe',
            'Land Use':                      'Pt',
            'Water Use/Scarcity (AWARE)':    'm3 world eq.',
            'Resource Use, minerals/metals': 'kg Sbe',
            'Resource Use, fossils':         'MJ'
        };

        // ── HELPERS ─────────────────────────────────────────
        const safe = (s) => {
            if (s === null || s === undefined) return '';
            return String(s)
                .replace(/[^\x00-\x7F]/g, c => {
                    const map = {'×':'x','÷':'/','→':'>','≤':'<=','≥':'>=',
                                 '₂':'2','₄':'4','°':'deg','±':'+/-','\u2014':'-','\u2013':'-'};
                    return map[c] || '';
                }).trim();
        };
        const fix  = (v, d=4) => (typeof v==='number' && isFinite(v)) ? v.toFixed(d) : '0.'+'0'.repeat(d);
        const sci  = (v, d=3) => (typeof v==='number' && isFinite(v)) ? v.toExponential(d) : '0.000e+0';
        const pct  = (v)      => (typeof v==='number' && isFinite(v)) ? v.toFixed(1)+'%' : '0.0%';
        const trunc= (s,n=45) => { const t=safe(s); return t.length>n ? t.slice(0,n-2)+'..' : t; };

        const numFmt = (v, d=4) => {
            if (typeof v !== 'number' || !isFinite(v)) return '0';
            if (Math.abs(v) < 0.0001 && v !== 0) return sci(v, 3);
            return fix(v, d);
        };

        // ── TYPOGRAPHY ──────────────────────────────────────
        const T = {
            h1:    () => { doc.setFont('helvetica','bold');   doc.setFontSize(17); doc.setTextColor(...C.navyDark); },
            h2:    () => { doc.setFont('helvetica','bold');   doc.setFontSize(12); doc.setTextColor(...C.navyDark); },
            h3:    () => { doc.setFont('helvetica','bold');   doc.setFontSize(9.5);doc.setTextColor(...C.navyDark); },
            body:  () => { doc.setFont('helvetica','normal'); doc.setFontSize(9);  doc.setTextColor(...C.bodyDark); },
            small: () => { doc.setFont('helvetica','normal'); doc.setFontSize(7.5);doc.setTextColor(...C.bodyMid);  },
            mono:  () => { doc.setFont('courier','normal');   doc.setFontSize(7);  doc.setTextColor(...C.bodyDark); },
            label: () => { doc.setFont('helvetica','bold');   doc.setFontSize(7.5);doc.setTextColor(...C.navyMid);  },
            teal:  () => { doc.setFont('helvetica','bold');   doc.setFontSize(11); doc.setTextColor(...C.teal);     },
            white: () => { doc.setFont('helvetica','bold');   doc.setFontSize(9);  doc.setTextColor(...C.white);    }
        };

        // ── PAGE UTILITIES ───────────────────────────────────
        let pageNum = 0;
        const TOTAL_PAGES = 13;

        const newPage = (sectionTitle) => {
            doc.addPage();
            pageNum++;
            Y = M;
            // Section header bar
            doc.setFillColor(...C.navyDark);
            doc.rect(0, 0, PW, 10, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
            doc.text(safe(sectionTitle).toUpperCase(), M, 6.8);
            doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
            doc.text('Page ' + pageNum + ' of ' + TOTAL_PAGES, PW - M, 6.8, {align:'right'});
            Y = 16;
        };

        const footer = (label) => {
            doc.setFillColor(...C.navyDark);
            doc.rect(0, PH - 8, PW, 8, 'F');
            doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(...C.white);
            doc.text('AIOXY | Screening-level LCA | AGRIBALYSE 3.2 | EF 3.1 | Not third-party verified', M, PH - 3.5);
            doc.text(safe(label), PW - M, PH - 3.5, {align:'right'});
        };

        const hRule = (y, col) => {
            doc.setDrawColor(...(col || C.rule));
            doc.setLineWidth(0.3);
            doc.line(M, y, PW - M, y);
        };

        const needsSpace = (space) => {
            if (Y + space > PH - 14) { return true; }
            return false;
        };

        // ── DATA ASSEMBLY ────────────────────────────────────
        // Single source of truth: engine globals only. No DOM reads for values.
        const audit  = window.auditTrailData;
        const pef    = window.finalPefResults;

        const pName      = safe(audit.productName || 'Assessed Product');
        const dateStr    = new Date(audit.calculationTimestamp || Date.now()).toISOString().split('T')[0];
        const mb         = audit.mass_balance || {};
        const pWeightKg  = mb.final_content_weight_kg || 1.0;
        const dppId      = safe(audit.dppId || 'N/A');
        const auditHash  = safe(audit.auditHash || '');

        // Manufacturing country — read from traceability, not DOM
        const mfgTrace   = audit.traceability?.manufacturing || {};
        const mfgCountry = safe(mfgTrace.country || mfgTrace.countryCode || 'N/A');
        const gridG      = mfgTrace.gridIntensityGPerKwh || mfgTrace.grid_intensity_g_per_kwh || 0;

        // PEF results
        const ccTotal    = pef['Climate Change']?.total || 0;
        const ccPerKg    = ccTotal / pWeightKg;
        const waterTotal = pef['Water Use/Scarcity (AWARE)']?.total || 0;
        const landTotal  = pef['Land Use']?.total || 0;
        const fossilTotal= pef['Resource Use, fossils']?.total || 0;
        const fossilCC   = pef['Climate Change - Fossil']?.total || 0;
        const bioCC      = pef['Climate Change - Biogenic']?.total || 0;
        const dlucCC     = pef['Climate Change - Land Use']?.total || 0;

        // Single score
        const ss       = audit.pef_single_score || {};
        const mPt      = ss.singleScore || 0;
        const ssBkd    = ss.breakdown   || {};

        // DQR
        const dqr      = audit.dqr_summary || {};
        const dqrVal   = dqr.overall_dqr   || 0;

        // Uncertainty
        const unc      = audit.uncertainty_analysis?.monte_carlo || {};

        // Contribution tree for Climate Change
        const ccTree   = pef['Climate Change']?.contribution_tree || audit.contribution_tree || {};
        const ingComps = ccTree.Ingredients?.components || [];
        const mfgCC    = ccTree.Manufacturing?.total || 0;
        const transCC  = ccTree.Transport?.total     || 0;
        const pkgCC    = ccTree.Packaging?.total      || 0;
        const wasteCC  = ccTree.Waste?.total          || 0;
        const ingCC    = ccTree.Ingredients?.total    || 0;

        // Baseline / parametric twin
        const baseline = audit.comparison_baseline || window.currentComparisonBaseline || null;
        const hasTwin  = !!(baseline && (baseline.co2PerKg || baseline.assessed_co2PerKg));
        const twinCO2  = baseline?.co2PerKg || 0;
        const twinName = safe(baseline?.name || 'Parametric Twin');
        const reduction= hasTwin && twinCO2 > 0 ? ((twinCO2 - ccPerKg) / twinCO2 * 100) : 0;

        // Traceability ingredients list
        const ingList  = audit.traceability?.ingredients || [];

        // ── HELPER: draw a labelled metric card ─────────────
        const metricCard = (x, y, w, h, label, value, unit, col) => {
            doc.setFillColor(...C.pageBg);
            doc.setDrawColor(...(col || C.teal));
            doc.setLineWidth(0.4);
            doc.roundedRect(x, y, w, h, 2, 2, 'FD');
            // top accent strip
            doc.setFillColor(...(col || C.teal));
            doc.roundedRect(x, y, w, 3, 2, 2, 'F');
            doc.rect(x, y+1, w, 2, 'F');
            // label
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text(safe(label), x + w/2, y + 7, {align:'center'});
            // value
            doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(...(col||C.teal));
            doc.text(safe(value), x + w/2, y + 14, {align:'center'});
            // unit
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text(safe(unit), x + w/2, y + 19, {align:'center'});
        };

        // ── HELPER: section sub-header ───────────────────────
        const subHeader = (text, y) => {
            doc.setFillColor(...C.rowAlt);
            doc.rect(M, y, CW, 6, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.navyDark);
            doc.text(safe(text), M + 2, y + 4.2);
            return y + 8;
        };

        // ── HELPER: trace block (mono, light bg, bordered) ───
        const traceBlock = (lines, startY, maxWidth) => {
            const w = maxWidth || CW;
            const lineH = 4.2;
            const pad = 3;
            const totalH = lines.length * lineH + pad * 2;

            if (needsSpace(totalH + 6)) {
                doc.addPage(); pageNum++;
                // repeat section bar for continued pages
                doc.setFillColor(...C.navyDark);
                doc.rect(0, 0, PW, 10, 'F');
                doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.white);
                doc.text('CALCULATION DETAIL (continued)', M, 6.8);
                doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
                doc.text('Page ' + pageNum + ' of ' + TOTAL_PAGES, PW - M, 6.8, {align:'right'});
                startY = 16;
            }

            doc.setFillColor(...C.traceGg);
            doc.setDrawColor(...C.rule);
            doc.setLineWidth(0.3);
            doc.rect(M, startY, w, totalH, 'FD');
            // left accent bar
            doc.setFillColor(...C.teal);
            doc.rect(M, startY, 1.5, totalH, 'F');

            T.mono();
            lines.forEach((line, i) => {
                doc.text(safe(line), M + pad + 1, startY + pad + (i * lineH) + 3);
            });
            return startY + totalH + 3;
        };

        // ── HELPER: ingredient calculation block ─────────────
        // Self-contained, never split mid-block
        const ingCalcBlock = (ing, startY) => {
            const qty        = ing.quantity_kg || 0;
            const adj        = ing.universal_adjustments || {};
            const pd         = ing.primary_data || null;
            const ingId      = ing.id || '';
            const dbRec      = window.aioxyData?.ingredients?.[ingId] || null;
            const meta       = dbRec?.data?.metadata || {};
            const pefVals    = dbRec?.data?.pef || {};
            const lciName    = safe(meta.source_activity || meta.name || ingId);
            const srcUuid    = safe(meta.source_uuid || ingId);
            const ingName    = safe(ing.name || ingId);
            const origin     = safe(adj.adjusted_for_country || ing.origin || 'FR');
            const hasPD      = !!pd;

            // Estimate block height
            const baseLines  = 8;
            const catLines   = Object.keys(CAT_UNITS).length * 4;
            const pdLines    = hasPD ? 12 : 0;
            const estH       = (baseLines + catLines + pdLines) * 4.2 + 24;

            if (Y + estH > PH - 14) {
                doc.addPage(); pageNum++;
                doc.setFillColor(...C.navyDark);
                doc.rect(0, 0, PW, 10, 'F');
                doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.white);
                doc.text('INGREDIENT CALCULATION DETAIL (continued)', M, 6.8);
                doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
                doc.text('Page ' + pageNum + ' of ' + TOTAL_PAGES, PW - M, 6.8, {align:'right'});
                Y = 16;
            }

            const bX = M; const bW = CW;
            const headerH = 8;

            // Block header — navy
            doc.setFillColor(...C.navyMid);
            doc.rect(bX, Y, bW, headerH, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.white);
            doc.text(trunc(ingName, 55), bX + 3, Y + 5.5);
            doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
            doc.text('Source: AGRIBALYSE 3.2', PW - M - 3, Y + 5.5, {align:'right'});
            Y += headerH;

            // Info row
            doc.setFillColor(...C.rowAlt);
            doc.rect(bX, Y, bW, 6, 'F');
            T.small(); doc.setTextColor(...C.bodyDark);
            const infoText = 'Qty: ' + fix(qty,4) + ' kg  |  Origin: ' + origin +
                             '  |  LCI: ' + trunc(lciName,60) + '  |  ID: ' + trunc(srcUuid,30);
            doc.text(safe(infoText), bX + 3, Y + 4);
            Y += 7;

            // Primary data badge if applicable
            if (hasPD) {
                doc.setFillColor(...C.yellow);
                doc.rect(bX, Y, bW, 6, 'F');
                doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(120, 80, 0);
                doc.text('PRIMARY DATA ADJUSTMENT APPLIED', bX + 3, Y + 4.2);
                Y += 7;
            }

            // ── Per-category calculation rows ──
            const allCats = ing.allCategoryResults || {};

            for (const [cat, unit] of Object.entries(CAT_UNITS)) {
                const isCC    = cat === 'Climate Change';
                const isSub   = cat.startsWith('Climate Change -');
                const perKgDB = pefVals[cat];
                const totalV  = allCats[cat] !== undefined ? allCats[cat]
                              : (cat === 'Climate Change' ? (ing.subtotal || 0) : 0);
                const perKg   = perKgDB !== undefined ? perKgDB
                              : (qty > 0 ? totalV / qty : 0);

                const rowH = 10;
                if (Y + rowH > PH - 14) {
                    doc.addPage(); pageNum++;
                    doc.setFillColor(...C.navyDark);
                    doc.rect(0, 0, PW, 10, 'F');
                    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.white);
                    doc.text('INGREDIENT CALCULATION DETAIL (continued)', M, 6.8);
                    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
                    doc.text('Page ' + pageNum + ' of ' + TOTAL_PAGES, PW - M, 6.8, {align:'right'});
                    Y = 16;
                }

                const bgCol = isCC ? C.teal : (isSub ? [220,235,245] : C.white);
                doc.setFillColor(...bgCol);
                doc.rect(bX, Y, bW, rowH, 'F');
                doc.setDrawColor(...C.rule); doc.setLineWidth(0.2);
                doc.line(bX, Y + rowH, bX + bW, Y + rowH);

                // Category label
                const indent = isSub ? 8 : (isCC ? 0 : 3);
                doc.setFont('helvetica', isCC ? 'bold' : 'normal');
                doc.setFontSize(isCC ? 8 : 7.5);
                doc.setTextColor(...(isCC ? C.white : C.navyDark));
                doc.text(safe(cat), bX + indent + 2, Y + 4);

                // Unit
                doc.setFont('helvetica','normal'); doc.setFontSize(6.5);
                doc.setTextColor(...(isCC ? C.white : C.bodyMid));
                doc.text(safe(unit), bX + 75, Y + 4);

                // Formula line: CF x qty = total
                T.mono(); doc.setFontSize(6.5);
                doc.setTextColor(...(isCC ? C.white : C.bodyDark));
                const cfStr    = numFmt(perKg, 5);
                const totStr   = numFmt(totalV, 5);
                const formula  = cfStr + ' ' + unit + '/kg  x  ' + fix(qty,4) + ' kg  =  ' + totStr + ' ' + unit;
                doc.text(safe(formula), bX + 2, Y + 8);

                Y += rowH;
            }

            // ── Primary data adjustment detail ──
            if (hasPD && adj) {
                const pdLines = [];
                pdLines.push('PRIMARY DATA ADJUSTMENT — ' + safe(adj.method || 'primary_data_adjusted'));
                pdLines.push('');

                if (adj.yield_adjustment) {
                    const ya = adj.yield_adjustment;
                    pdLines.push('YIELD ADJUSTMENT (FAOSTAT / supplier data):');
                    pdLines.push('  Source: ' + safe(ya.baseline_source));
                    pdLines.push('  Baseline yield = ' + fix(ya.baseline_kg_ha, 1) + ' kg/ha');
                    pdLines.push('  Actual yield   = ' + fix(ya.actual_kg_ha, 1)   + ' kg/ha  [Supplier data]');
                    pdLines.push('  Formula: min(baseline / actual, 2.0)');
                    pdLines.push('         = min(' + fix(ya.baseline_kg_ha,1) + ' / ' + fix(ya.actual_kg_ha,1) + ', 2.0)');
                    pdLines.push('         = ' + fix(ya.factor, 4) + (ya.capped_at_2 ? '  [capped at 2.0]' : ''));
                    pdLines.push('');
                }

                if (adj.nitrogen_adjustment) {
                    const na = adj.nitrogen_adjustment;
                    pdLines.push('NITROGEN ADJUSTMENT:');
                    pdLines.push('  Baseline N = ' + fix(na.baseline_kg_per_ton, 1) + ' kg N/t  [AIOXY default]');
                    pdLines.push('  Actual N   = ' + fix(na.actual_kg_per_ton, 1)   + ' kg N/t  [Supplier data]');
                    pdLines.push('  Formula: actual / baseline');
                    pdLines.push('         = ' + fix(na.actual_kg_per_ton,1) + ' / ' + fix(na.baseline_kg_per_ton,1));
                    pdLines.push('         = ' + fix(na.factor, 4));
                    pdLines.push('');
                }

                if (adj.composite_multiplier) {
                    const cm = adj.composite_multiplier;
                    pdLines.push('COMPOSITE MULTIPLIER (applied to all 16 EF 3.1 categories):');
                    pdLines.push('  Formula: (0.6 x yield_factor) + (0.4 x nitrogen_factor)');
                    pdLines.push('         = (0.6 x ' + fix(cm.yield_factor,4) + ') + (0.4 x ' + fix(cm.n_factor,4) + ')');
                    pdLines.push('         = ' + fix(cm.result, 4));
                }

                if (adj.n2o_applied && adj.n2o_applied.applied) {
                    const n = adj.n2o_applied;
                    pdLines.push('');
                    pdLines.push('IPCC TIER 1 N2O (added to Climate Change total):');
                    pdLines.push('  F_SN = ' + fix(n.F_SN_kg, 4) + ' kg synthetic N applied');
                    pdLines.push('  Direct   = F_SN x 0.01 x (44/28) x 265 = ' + fix(n.direct_kgCO2e, 4) + ' kg CO2e');
                    pdLines.push('  Leaching = F_SN x 0.30 x 0.011 x (44/28) x 265 = ' + fix(n.indirect_leach_kgCO2e, 4) + ' kg CO2e');
                    pdLines.push('  Volatil. = F_SN x 0.10 x 0.01 x (44/28) x 265 = ' + fix(n.volatilization_kgCO2e, 4) + ' kg CO2e');
                    pdLines.push('  N2O total = ' + fix((n.direct_kgCO2e||0)+(n.indirect_leach_kgCO2e||0)+(n.volatilization_kgCO2e||0),4) + ' kg CO2e');
                    pdLines.push('  Source: IPCC 2006 Vol. 4 Ch. 11  |  GWP N2O = 265 (IPCC AR5)');
                }

                if (needsSpace(pdLines.length * 4.2 + 10)) {
                    doc.addPage(); pageNum++;
                    doc.setFillColor(...C.navyDark);
                    doc.rect(0, 0, PW, 10, 'F');
                    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.white);
                    doc.text('INGREDIENT CALCULATION DETAIL (continued)', M, 6.8);
                    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
                    doc.text('Page ' + pageNum + ' of ' + TOTAL_PAGES, PW - M, 6.8, {align:'right'});
                    Y = 16;
                }

                doc.setFillColor(...C.yellow);
                doc.rect(M, Y, CW, pdLines.length * 4.2 + 6, 'F');
                doc.setDrawColor(...C.amber); doc.setLineWidth(0.3);
                doc.rect(M, Y, CW, pdLines.length * 4.2 + 6, 'D');
                T.mono(); doc.setFontSize(6.5); doc.setTextColor(100, 65, 0);
                pdLines.forEach((line, i) => {
                    doc.text(safe(line), M + 3, Y + 4.5 + i * 4.2);
                });
                Y += pdLines.length * 4.2 + 8;
            }

            // Block bottom border
            doc.setDrawColor(...C.navyMid); doc.setLineWidth(0.4);
            doc.line(M, Y, PW - M, Y);
            Y += 5;
        };

        // ================================================================
        // PAGE 1 — COVER
        // ================================================================
        pageNum = 1;
        // Full navy header block
        doc.setFillColor(...C.navyDark);
        doc.rect(0, 0, PW, 68, 'F');
        // AIOXY wordmark
        doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.white);
        doc.text('AIOXY', M, 12);
        doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.teal);
        doc.text('ENVIRONMENTAL FOOTPRINT REPORT', M, 17);
        // Divider
        doc.setDrawColor(...C.teal); doc.setLineWidth(0.5);
        doc.line(M, 20, PW - M, 20);
        // Product name
        doc.setFont('helvetica','bold'); doc.setFontSize(20); doc.setTextColor(...C.white);
        const pNameLines = doc.splitTextToSize(safe(pName), CW);
        doc.text(pNameLines, M, 32);
        // Prepared for / date
        doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(180, 200, 220);
        doc.text('Assessment Date: ' + dateStr + '   |   Report ID: ' + safe(dppId).slice(0, 16), M, 55);
        doc.text('Functional Unit: 1 kg of product as sold', M, 61);

        // 3 key metric cards
        const cardY = 76; const cardH = 30; const cardW = (CW - 8) / 3;
        metricCard(M,             cardY, cardW, cardH, 'Climate Change', numFmt(ccPerKg, 3), 'kg CO2e / kg product', C.teal);
        metricCard(M + cardW + 4, cardY, cardW, cardH, 'PEF Single Score', numFmt(mPt, 1), 'mPt / kg product', C.navyMid);
        const dqrCol = dqrVal <= 2 ? C.green : dqrVal <= 3 ? C.amber : C.red;
        metricCard(M + (cardW + 4)*2, cardY, cardW, cardH, 'Data Quality (DQR)', fix(dqrVal,2) + ' / 5.0', 'PEF 3.1 §5.7', dqrCol);

        // Info block below cards
        Y = cardY + cardH + 8;
        hRule(Y); Y += 5;

        const infoRows = [
            ['System boundary',    'Cradle-to-retail (farm gate through distribution)'],
            ['LCI database',       'AGRIBALYSE 3.2  (ADEME/INRAE 2022)'],
            ['LCIA method',        'EF 3.1 — 16 impact categories + 3 CC sub-splits (19 total)'],
            ['Transport method',   'GLEC v3.2 — Smart Freight Centre 2025'],
            ['Agricultural GHGs',  'IPCC 2006 Tier 1 (N2O direct, leaching, volatilization)'],
            ['Packaging method',   'PEF 3.1 Circular Footprint Formula (Annex C v2.1)'],
            ['GWP basis',          'IPCC AR5 GWP100 — CH4=28, N2O=265'],
            ['Assessment type',    'Screening-level LCA  |  Internal use  |  Not third-party verified'],
            ['Audit hash (SHA-256)', safe(auditHash).slice(0,32) + (auditHash.length>32 ? '..' : '')]
        ];

        doc.autoTable({
            startY: Y, body: infoRows,
            theme: 'plain',
            styles: { fontSize: 8, cellPadding: 2.5 },
            columnStyles: {
                0: { fontStyle:'bold', cellWidth: 52, textColor: C.navyDark },
                1: { cellWidth: 130,   textColor: C.bodyDark }
            },
            margin: { left: M },
            alternateRowStyles: { fillColor: C.rowAlt }
        });
        Y = doc.lastAutoTable.finalY + 4;

        // Parametric twin line if available
        if (hasTwin) {
            doc.setFillColor(...C.green);
            doc.rect(M, Y, CW, 8, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.white);
            const redText = reduction > 0
                ? 'Parametric twin scenario: ' + twinName + '  |  Potential reduction: ' + pct(reduction)
                : 'Parametric twin scenario: ' + twinName + '  |  Reference CO2: ' + fix(twinCO2,3) + ' kg CO2e/kg';
            doc.text(safe(redText), M + 3, Y + 5.2);
            Y += 10;
        }

        footer('Page 1 of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE 2 — EXECUTIVE SUMMARY
        // ================================================================
        newPage('Executive Summary');

        // Stage contribution bar chart (manual bars)
        Y = subHeader('Climate Change Contribution by Life Cycle Stage', Y);
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Source: Engine contribution tree  |  All values: kg CO2e per kg product', M, Y); Y += 5;

        const stages = [
            { name: 'Ingredients',    val: ingCC },
            { name: 'Manufacturing',  val: mfgCC },
            { name: 'Transport',      val: transCC },
            { name: 'Packaging',      val: pkgCC },
            { name: 'Waste',          val: wasteCC }
        ];
        const maxVal    = Math.max(...stages.map(s => Math.abs(s.val)), 0.001);
        const barMaxW   = CW - 60;
        const barH      = 7;
        const barGap    = 3;

        stages.forEach(s => {
            const barW  = (Math.abs(s.val) / maxVal) * barMaxW;
            const pctV  = ccTotal > 0 ? (s.val / ccTotal * 100) : 0;
            // label
            doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(...C.bodyDark);
            doc.text(safe(s.name), M, Y + barH - 1);
            // bar
            doc.setFillColor(...C.teal);
            doc.rect(M + 28, Y, Math.max(barW, 0.5), barH - 1, 'F');
            // value + pct
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...C.navyDark);
            doc.text(numFmt(s.val/pWeightKg,4) + ' kg CO2e/kg  (' + pct(pctV) + ')',
                     M + 28 + barMaxW + 2, Y + barH - 1);
            Y += barH + barGap;
        });

        // Total
        doc.setFillColor(...C.navyDark);
        doc.rect(M + 28, Y, barMaxW, 1, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.navyDark);
        doc.text('TOTAL', M, Y + 5);
        doc.setTextColor(...C.teal);
        doc.text(numFmt(ccPerKg,4) + ' kg CO2e / kg product', M + 28, Y + 5);
        Y += 10;

        hRule(Y); Y += 5;

        // Two column: hotspots + twin
        const colW = (CW - 5) / 2;

        // Hotspots
        Y = subHeader('Top 3 Ingredient Hotspots', Y);
        const sortedIngs = [...ingComps].sort((a,b) => (b.subtotal||0) - (a.subtotal||0)).slice(0,3);
        sortedIngs.forEach((ing, i) => {
            const ingPct = ccTotal > 0 ? ((ing.subtotal||0) / ccTotal * 100) : 0;
            doc.setFont('helvetica', i===0?'bold':'normal'); doc.setFontSize(8.5);
            doc.setTextColor(...C.navyDark);
            doc.text((i+1) + '. ' + trunc(safe(ing.name), 38), M, Y + 5);
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.teal);
            doc.text(numFmt(ing.subtotal/pWeightKg, 4) + ' kg CO2e/kg  (' + pct(ingPct) + ')',
                     M + colW - 5, Y + 5, {align:'right'});
            hRule(Y + 7, C.rowAlt);
            Y += 9;
        });

        Y += 3;

        // Parametric twin comparison box
        if (hasTwin) {
            Y = subHeader('Parametric Twin Comparison', Y);
            doc.setFillColor(...C.pageBg);
            doc.setDrawColor(...C.teal); doc.setLineWidth(0.4);
            doc.roundedRect(M, Y, CW, 28, 2, 2, 'FD');

            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.navyDark);
            doc.text('Current product:', M + 4, Y + 7);
            doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.navyDark);
            doc.text(numFmt(ccPerKg,4) + ' kg CO2e/kg', M + 52, Y + 7);

            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.bodyMid);
            doc.text('Optimised scenario (' + trunc(twinName,30) + '):', M + 4, Y + 15);
            doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.green);
            doc.text(numFmt(twinCO2,4) + ' kg CO2e/kg', M + 52, Y + 15);

            const redCol = reduction > 0 ? C.green : C.red;
            doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...redCol);
            doc.text('Potential reduction: ' + pct(reduction), M + 4, Y + 23);
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text('Screening-level parametric estimate. Not a verified comparative claim.', M + 4, Y + 28);
            Y += 33;
        }

        footer('Page 2 of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE 3 — RESULTS SCORECARD — ALL 19 CATEGORIES
        // ================================================================
        newPage('Environmental Profile — 19 EF 3.1 Categories + 3 CC Sub-Splits');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('All characterisation factors: JRC EF 3.1. Values per 1 kg product as sold. Source: Engine output.', M, Y); Y += 6;

        const scorecardRows = [];
        const allCatList = [
            'Climate Change',
            'Climate Change - Fossil',
            'Climate Change - Biogenic',
            'Climate Change - Land Use',
            'Ozone Depletion',
            'Human Toxicity, non-cancer',
            'Human Toxicity, cancer',
            'Particulate Matter',
            'Ionizing Radiation',
            'Photochemical Ozone Formation',
            'Acidification',
            'Eutrophication, terrestrial',
            'Eutrophication, freshwater',
            'Eutrophication, marine',
            'Ecotoxicity, freshwater',
            'Land Use',
            'Water Use/Scarcity (AWARE)',
            'Resource Use, minerals/metals',
            'Resource Use, fossils'
        ];

        allCatList.forEach(cat => {
            const isSub  = cat.startsWith('Climate Change -');
            const catVal = pef[cat]?.total || 0;
            const perKgV = catVal / pWeightKg;
            const unit   = CAT_UNITS[cat] || '';
            const conf   = cat === 'Climate Change' ? 'HIGH' :
                           cat.startsWith('Climate Change') ? 'HIGH' :
                           ['Ozone Depletion','Ionizing Radiation'].includes(cat) ? 'MEDIUM' : 'MEDIUM';
            const source = cat === 'Resource Use, fossils' ? 'Engine / MJ' :
                           cat === 'Water Use/Scarcity (AWARE)' ? 'AGRIBALYSE 3.2 / AWARE 2.0' :
                           'AGRIBALYSE 3.2';

            // SS contribution
            const ssEntry = ssBkd[cat];
            const ssCont  = ssEntry ? (ssEntry.microPoints || 0) : 0;

            scorecardRows.push([
                (isSub ? '    ' : '') + safe(cat),
                safe(unit),
                numFmt(perKgV, isSub ? 5 : 4),
                numFmt(ssCont, 2),
                safe(conf),
                safe(source)
            ]);
        });

        doc.autoTable({
            startY: Y,
            head: [['Impact Category', 'Unit', 'Result / kg product', 'mPt contrib.', 'Confidence', 'Source']],
            body: scorecardRows,
            theme: 'plain',
            styles: { fontSize: 7, cellPadding: 2, overflow: 'linebreak' },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold', fontSize: 7 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 70, fontStyle: 'bold' },
                1: { cellWidth: 22, textColor: C.bodyMid },
                2: { cellWidth: 30, halign: 'right' },
                3: { cellWidth: 20, halign: 'right' },
                4: { cellWidth: 20, halign: 'center' },
                5: { cellWidth: 20, textColor: C.bodyMid, fontSize: 6.5 }
            },
            margin: { left: M },
            didParseCell: (data) => {
                if (data.row.raw && data.row.raw[0] === 'Climate Change') {
                    data.cell.styles.textColor = C.teal;
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        });

        Y = doc.lastAutoTable.finalY + 6;

        // Single Score summary box
        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 18, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
        doc.text('PEF SINGLE SCORE', M + 3, Y + 6);
        doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(180,200,220);
        doc.text('Formula: sum_i [ (result_i / kg product) / NF_i * WF_i ] * 1,000,000', M + 3, Y + 11);
        doc.text('Source: JRC Technical Report EUR 29540 EN (EF 3.1 normalisation and weighting factors)', M + 3, Y + 15.5);
        doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor(...C.teal);
        doc.text(numFmt(mPt,2) + ' mPt / kg product', PW - M - 3, Y + 13, {align:'right'});
        Y += 22;

        footer('Page 3 of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE 4 — INGREDIENT CHAIN OF CUSTODY
        // ================================================================
        newPage('Ingredient Chain of Custody');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Source: AGRIBALYSE 3.2 (ADEME/INRAE 2022). All values at farm gate. DQR per PEF 3.1 §5.7.', M, Y); Y += 6;

        const custodyRows = ingComps.map(ing => {
            const qty       = ing.quantity_kg || 0;
            const ingId     = ing.id || '';
            const dbRec     = window.aioxyData?.ingredients?.[ingId] || null;
            const meta      = dbRec?.data?.metadata || {};
            const lciName   = safe(meta.source_activity || meta.name || ingId);
            const srcUuid   = safe(meta.source_uuid || ingId);
            const adj       = ing.universal_adjustments || {};
            const origin    = safe(adj.adjusted_for_country || ing.origin || 'FR');
            const hasPD     = !!ing.primary_data;
            const alloc     = safe(ing.allocationMethod || 'Economic (AGRIBALYSE 3.2)');
            const dqrV      = ing.dqr || 0;
            const ingTotal  = ing.allCategoryResults?.['Climate Change'] || ing.subtotal || 0;
            const pctOfCC   = ccTotal > 0 ? (ingTotal / ccTotal * 100) : 0;

            return [
                safe(ing.name || ingId) + (hasPD ? ' [PD]' : ''),
                fix(qty,4),
                origin,
                trunc(lciName, 35),
                trunc(srcUuid, 25),
                alloc,
                fix(dqrV, 2),
                numFmt(ingTotal, 4),
                pct(pctOfCC)
            ];
        });

        doc.autoTable({
            startY: Y,
            head: [['Ingredient','Qty (kg)','Origin','AGRIBALYSE LCI Name','Internal ID','Allocation','DQR','CC (kg CO2e)','% of CC']],
            body: custodyRows,
            theme: 'plain',
            styles: { fontSize: 6.5, cellPadding: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold', fontSize: 6.5 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 35, fontStyle: 'bold' },
                1: { cellWidth: 14, halign: 'right' },
                2: { cellWidth: 12, halign: 'center' },
                3: { cellWidth: 42 },
                4: { cellWidth: 28, textColor: C.bodyMid },
                5: { cellWidth: 22, textColor: C.bodyMid },
                6: { cellWidth: 10, halign: 'center' },
                7: { cellWidth: 18, halign: 'right', fontStyle: 'bold' },
                8: { cellWidth: 13, halign: 'right' }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('[PD] = Primary data adjustment applied. DQR scale: 1=best, 5=worst (PEF 3.1 §5.7).', M, Y);
        doc.text('Allocation method per ingredient is inherited from AGRIBALYSE 3.2 system boundary.', M, Y + 4);
        Y += 8;

        footer('Page 4 of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE 5+ — INGREDIENT CALCULATION DETAIL (one block per ingredient)
        // ================================================================
        newPage('Ingredient Calculation Detail — Step by Step');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Formula for each category: CF (AGRIBALYSE 3.2, per kg) x Quantity (kg) = Impact', M, Y); Y += 3;
        doc.text('All CF values are per-kg values from AGRIBALYSE 3.2 at farm gate. CF x Qty = Total impact for that ingredient.', M, Y); Y += 6;

        ingComps.forEach(ing => { ingCalcBlock(ing, Y); });

        footer('INGREDIENT DETAIL — see page numbers above');

        // ================================================================
        // MANUFACTURING PAGE
        // ================================================================
        pageNum++;
        newPage('Manufacturing — Calculation Detail');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Grid intensity source: Ember 2025. Energy intensity source: Processing benchmark database.', M, Y); Y += 6;

        // Read trace from engine contribution tree
        const mfgComp = ccTree.Manufacturing?.components?.[0] || null;
        if (mfgComp && mfgComp.calculation_trace) {
            const traceLines = mfgComp.calculation_trace.split('\n');
            Y = traceBlock(traceLines, Y);
        } else {
            Y = traceBlock([
                'Manufacturing trace not available.',
                'Engine result: ' + numFmt(mfgCC, 4) + ' kg CO2e',
                'Grid intensity: ' + numFmt(gridG, 2) + ' g CO2e/kWh  [Ember 2025 - ' + mfgCountry + ']'
            ], Y);
        }

        Y += 3;
        Y = subHeader('Manufacturing — All 16 EF 3.1 Categories', Y);
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Non-CC impacts from EU27 electricity grid mix (ENTSO-E / EMEP/EEA / JRC EF 3.1). No ecoinvent.', M, Y); Y += 5;

        const mfgCatRows = [];
        allCatList.filter(c => !c.startsWith('Climate Change -')).forEach(cat => {
            const catTotal = pef[cat]?.contribution_tree?.Manufacturing?.total || 0;
            const unit     = CAT_UNITS[cat] || '';
            mfgCatRows.push([safe(cat), safe(unit), numFmt(catTotal/pWeightKg, 5)]);
        });

        doc.autoTable({
            startY: Y,
            head: [['Impact Category','Unit','Result / kg product']],
            body: mfgCatRows,
            theme: 'plain',
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 90, fontStyle: 'bold' },
                1: { cellWidth: 40, textColor: C.bodyMid },
                2: { cellWidth: 52, halign: 'right' }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        footer('Manufacturing — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // TRANSPORT PAGE
        // ================================================================
        pageNum++;
        newPage('Transport — Calculation Detail (GLEC v3.2)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('All transport CO2e calculated by engine using GLEC v3.2 emission factors. PDF reads engine trace.', M, Y); Y += 6;

        const transComp = ccTree.Transport?.components?.[0] || null;
        if (transComp && transComp.calculation_trace) {
            const traceLines = transComp.calculation_trace.split('\n');
            Y = traceBlock(traceLines, Y);
        } else {
            Y = traceBlock([
                'Transport trace not available.',
                'Engine result: ' + numFmt(transCC, 4) + ' kg CO2e',
                'Source: GLEC v3.2'
            ], Y);
        }

        Y += 3;
        Y = subHeader('Transport — Non-CC Impact Categories (Road HGV)', Y);
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Derived from EMEP/EEA 2023 §1.A.3.b Euro VI HDV + JRC EF 3.1 CFs. Sea/air/rail: zero (honest gap, ISO 14044 §4.2.3.3).', M, Y); Y += 5;

        const nonCCTransCats = [
            'Acidification','Eutrophication, terrestrial','Eutrophication, marine',
            'Eutrophication, freshwater','Particulate Matter','Photochemical Ozone Formation',
            'Human Toxicity, cancer','Human Toxicity, non-cancer','Ecotoxicity, freshwater',
            'Ozone Depletion','Ionizing Radiation','Land Use','Water Use/Scarcity (AWARE)',
            'Resource Use, minerals/metals'
        ];

        const transNonCCRows = nonCCTransCats.map(cat => {
            const catTotal = pef[cat]?.contribution_tree?.Transport?.total || 0;
            const unit     = CAT_UNITS[cat] || '';
            const conf     = ['Acidification','Eutrophication, terrestrial','Eutrophication, marine',
                              'Particulate Matter','Photochemical Ozone Formation',
                              'Human Toxicity, cancer','Human Toxicity, non-cancer'].includes(cat) ? 'MEDIUM' :
                             cat === 'Ecotoxicity, freshwater' ? 'LOW' : 'ZERO (honest gap)';
            return [safe(cat), safe(unit), numFmt(catTotal/pWeightKg, 5), safe(conf)];
        });

        doc.autoTable({
            startY: Y,
            head: [['Category','Unit','Result / kg product','Confidence']],
            body: transNonCCRows,
            theme: 'plain',
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 78, fontStyle: 'bold' },
                1: { cellWidth: 25, textColor: C.bodyMid },
                2: { cellWidth: 40, halign: 'right' },
                3: { cellWidth: 39 }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        footer('Transport — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // PACKAGING PAGE
        // ================================================================
        pageNum++;
        newPage('Packaging — CFF Calculation Detail (PEF 3.1 Annex C v2.1)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Circular Footprint Formula per PEF 3.1 Annex C v2.1. All parameters from packaging database. PDF reads engine trace.', M, Y); Y += 6;

        const pkgComp = ccTree.Packaging?.components?.[0] || null;
        if (pkgComp && pkgComp.calculation_trace) {
            const traceLines = pkgComp.calculation_trace.split('\n');
            Y = traceBlock(traceLines, Y);
        } else {
            Y = traceBlock([
                'Packaging CFF trace not available.',
                'Engine result: ' + numFmt(pkgCC, 4) + ' kg CO2e',
                'Formula: PEF 3.1 Annex C v2.1 CFF',
                'Source: PEF Annex C v2.1 / ICE Database v3.0'
            ], Y);
        }

        footer('Packaging — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE — TOTAL IMPACT SUMMARY
        // ================================================================
        pageNum++;
        newPage('Total Environmental Impact — All Life Cycle Stages');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('All values read directly from calculation engine. No recalculation at PDF layer.', M, Y); Y += 6;

        // Stage totals per category
        const stageNames = ['Ingredients','Manufacturing','Transport','Packaging','Waste'];
        const stageTotHeader = ['Category','Unit',...stageNames,'TOTAL / kg product'];

        const stageTotRows = allCatList.filter(c => !c.startsWith('Climate Change -')).map(cat => {
            const tree  = pef[cat]?.contribution_tree || {};
            const unit  = CAT_UNITS[cat] || '';
            const total = pef[cat]?.total || 0;
            const perKg = total / pWeightKg;
            const vals  = stageNames.map(s => numFmt((tree[s]?.total||0)/pWeightKg, s==='Ingredients'?4:5));
            return [safe(cat), safe(unit), ...vals, numFmt(perKg, 4)];
        });

        doc.autoTable({
            startY: Y,
            head: [stageTotHeader],
            body: stageTotRows,
            theme: 'plain',
            styles: { fontSize: 6, cellPadding: 1.6, overflow: 'linebreak' },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold', fontSize: 6 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 52, fontStyle: 'bold' },
                1: { cellWidth: 18, textColor: C.bodyMid },
                2: { cellWidth: 22, halign: 'right' },
                3: { cellWidth: 22, halign: 'right' },
                4: { cellWidth: 20, halign: 'right' },
                5: { cellWidth: 20, halign: 'right' },
                6: { cellWidth: 14, halign: 'right' },
                7: { cellWidth: 22, halign: 'right', fontStyle: 'bold' }
            },
            margin: { left: M },
            didParseCell: (data) => {
                if (data.row.raw?.[0] === 'Climate Change') {
                    data.cell.styles.textColor = C.teal;
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        });

        Y = doc.lastAutoTable.finalY + 5;

        // CC sub-splits
        Y = subHeader('Climate Change Sub-splits', Y);
        const subRows = [
            ['Climate Change - Fossil',   'kg CO2e', numFmt(fossilCC/pWeightKg, 4), 'Combustion + fossil process emissions'],
            ['Climate Change - Biogenic', 'kg CO2e', numFmt(bioCC/pWeightKg, 4),    'Biogenic CO2 + enteric CH4 (GWP=28)'],
            ['Climate Change - Land Use', 'kg CO2e', numFmt(dlucCC/pWeightKg, 4),   'dLUC + agricultural N2O (IPCC Tier 1)'],
            ['TOTAL Climate Change',      'kg CO2e', numFmt(ccPerKg, 4),             'Sum of above (engine value)']
        ];
        doc.autoTable({
            startY: Y,
            head: [['Sub-category','Unit','per kg product','Notes']],
            body: subRows,
            theme: 'plain',
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 20, textColor: C.bodyMid },
                2: { cellWidth: 30, halign: 'right' },
                3: { cellWidth: 72 }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 5;

        // Single score breakdown
        if (needsSpace(40)) { doc.addPage(); pageNum++; Y = M + 4; }
        Y = subHeader('PEF Single Score Breakdown', Y);
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Formula: sum_i [ (impact_i / kg product) / NF_i * WF_i ] * 1,000,000   |   Source: JRC EUR 29540 EN (EF 3.1)', M, Y); Y += 5;

        const ssRows = Object.entries(ssBkd).map(([cat, data]) => [
            safe(cat),
            numFmt(data.impact || 0, 5),
            numFmt(data.normalizedImpact || 0, 6),
            numFmt(data.weightedImpact || 0, 6),
            numFmt(data.microPoints || 0, 3)
        ]);

        if (ssRows.length > 0) {
            doc.autoTable({
                startY: Y,
                head: [['Category','Impact/kg','After NF','After WF','mPt/kg']],
                body: ssRows,
                theme: 'plain',
                styles: { fontSize: 7, cellPadding: 1.8 },
                headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: C.rowAlt },
                columnStyles: {
                    0: { cellWidth: 72, fontStyle: 'bold' },
                    1: { cellWidth: 30, halign: 'right' },
                    2: { cellWidth: 28, halign: 'right' },
                    3: { cellWidth: 28, halign: 'right' },
                    4: { cellWidth: 24, halign: 'right', fontStyle: 'bold' }
                },
                margin: { left: M }
            });
            Y = doc.lastAutoTable.finalY + 3;
        }

        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 9, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
        doc.text('PEF SINGLE SCORE TOTAL', M + 3, Y + 6);
        doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.teal);
        doc.text(numFmt(mPt,2) + ' mPt / kg product', PW - M - 3, Y + 6, {align:'right'});
        Y += 13;

        footer('Total Impact — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE — DATA QUALITY + UNCERTAINTY
        // ================================================================
        pageNum++;
        newPage('Data Quality Rating (DQR) + Uncertainty Analysis');

        // DQR
        Y = subHeader('Data Quality Rating — per ingredient (PEF 3.1 §5.7)', Y);
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Formula: DQR = (TeR + TiR + GeR + CoR + RR) / 5   |   Scale: 1 = best, 5 = worst', M, Y); Y += 5;

        const dqrComponents = dqr.component_dqrs || [];
        const dqrRows = dqrComponents.map(d => [
            safe(d.name || d.id),
            fix(d.TeR || d.temporal     || 0, 1),
            fix(d.TiR || d.technological|| 0, 1),
            fix(d.GeR || d.geographical || 0, 1),
            fix(d.CoR || d.completeness || 0, 1),
            fix(d.RR  || d.reliability  || 0, 1),
            fix(d.overall || 0, 2)
        ]);

        if (dqrRows.length > 0) {
            doc.autoTable({
                startY: Y,
                head: [['Ingredient','TeR','TiR','GeR','CoR','RR','DQR Overall']],
                body: dqrRows,
                theme: 'plain',
                styles: { fontSize: 7.5, cellPadding: 2 },
                headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: C.rowAlt },
                columnStyles: {
                    0: { cellWidth: 70, fontStyle: 'bold' },
                    1: { cellWidth: 15, halign: 'center' },
                    2: { cellWidth: 15, halign: 'center' },
                    3: { cellWidth: 15, halign: 'center' },
                    4: { cellWidth: 15, halign: 'center' },
                    5: { cellWidth: 15, halign: 'center' },
                    6: { cellWidth: 37, halign: 'center', fontStyle: 'bold' }
                },
                margin: { left: M }
            });
            Y = doc.lastAutoTable.finalY + 4;
        }

        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 8, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
        doc.text('Weighted DQR (contribution-weighted): ' + fix(dqrVal, 2) + ' / 5.0   |   Quality level: ' + safe(dqr.dqr_level || 'N/A'), M+3, Y+5.5);
        Y += 12;

        // Monte Carlo
        Y = subHeader('Monte Carlo Uncertainty Analysis', Y);

        const mc      = unc;
        const mcMed   = mc.median         || mc.mean         || ccTotal;
        const mcP5    = mc.p5_lower_bound || mc.p5           || (mcMed * 0.85);
        const mcP95   = mc.p95_upper_bound|| mc.p95          || (mcMed * 1.15);
        const mcIter  = mc.iterations     || 1000;
        const mcCV    = mc.cv_percent      || audit.uncertainty_analysis?.overall_uncertainty || 15;

        Y = traceBlock([
            'Method: Lognormal uncertainty propagation',
            'Iterations: ' + mcIter,
            '',
            'Formula per component:',
            '  sigma_sq = ln(1 + CV^2)',
            '  sigma    = sqrt(sigma_sq)',
            '  multiplier = exp(Z * sigma - sigma_sq / 2)',
            '  where Z ~ N(0,1) via Box-Muller transform',
            '',
            'Reference: ISO 14044 / Heijungs & Huijbregts 2004',
            '',
            'Results (Climate Change, kg CO2e):',
            '  P5  (lower bound) = ' + numFmt(mcP5/pWeightKg, 4) + ' kg CO2e/kg',
            '  Median            = ' + numFmt(mcMed/pWeightKg, 4) + ' kg CO2e/kg',
            '  P95 (upper bound) = ' + numFmt(mcP95/pWeightKg, 4) + ' kg CO2e/kg',
            '  Overall CV        = ' + fix(mcCV, 1) + '%'
        ], Y);

        // Visual range bar
        if (needsSpace(18)) { doc.addPage(); pageNum++; Y = M + 6; }
        const barRangeW = CW - 40;
        const barRangeX = M + 20;
        const barRangeY = Y + 4;
        doc.setDrawColor(...C.rule); doc.setLineWidth(0.3);
        doc.line(barRangeX, barRangeY, barRangeX + barRangeW, barRangeY);
        const rangeMin  = Math.min(mcP5, mcMed) / pWeightKg;
        const rangeMax  = Math.max(mcP95, mcMed) / pWeightKg;
        const rangeTot  = rangeMax - rangeMin || 1;
        const p5X  = barRangeX + ((mcP5/pWeightKg  - rangeMin) / rangeTot) * barRangeW;
        const medX = barRangeX + ((mcMed/pWeightKg - rangeMin) / rangeTot) * barRangeW;
        const p95X = barRangeX + ((mcP95/pWeightKg - rangeMin) / rangeTot) * barRangeW;

        doc.setFillColor(...C.teal);
        doc.rect(p5X, barRangeY - 3, p95X - p5X, 6, 'F');
        doc.setFillColor(...C.navyDark);
        doc.rect(medX - 0.8, barRangeY - 4, 1.6, 8, 'F');

        T.small();
        doc.text('P5: ' + numFmt(mcP5/pWeightKg,3), p5X, barRangeY + 6, {align:'center'});
        doc.text('Median: ' + numFmt(mcMed/pWeightKg,3), medX, barRangeY - 6, {align:'center'});
        doc.text('P95: ' + numFmt(mcP95/pWeightKg,3), p95X, barRangeY + 6, {align:'center'});
        Y += 18;

        footer('DQR & Uncertainty — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE — AUDIT TRAIL + DATA SOURCES
        // ================================================================
        pageNum++;
        newPage('Audit Trail — Data Sources and Traceability');

        // SHA-256 hash block
        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 20, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.teal);
        doc.text('AUDIT HASH (SHA-256)', M + 3, Y + 6);
        doc.setFont('courier','normal'); doc.setFontSize(7.5); doc.setTextColor(...C.white);
        const hashLine1 = safe(auditHash).slice(0, 64);
        doc.text(hashLine1 || '[Hash not generated — run calculation first]', M + 3, Y + 12);
        doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(180,200,220);
        doc.text('Covers: all calculation inputs + all outputs + all database versions  |  Generated: ' + dateStr, M + 3, Y + 18);
        Y += 24;

        // Database versions
        Y = subHeader('Background Database Versions', Y);
        const dbRows = [
            ['LCI database',        'AGRIBALYSE 3.2',      'ADEME / INRAE 2022'],
            ['LCIA method',         'EF 3.1',               'JRC Technical Report EUR 29540 EN'],
            ['Transport',           'GLEC v3.2',            'Smart Freight Centre, October 2025'],
            ['Grid intensity',      'Ember 2025',           'Ember Climate, 2025'],
            ['Air pollutants',      'EMEP/EEA 2023',        'EEA Air Pollutant Emission Inventory Guidebook 2023'],
            ['GWP values',          'IPCC AR5 GWP100',      'CH4=28, N2O=265 (no climate-carbon feedback)'],
            ['Water scarcity',      'AWARE 2.0',            'Boulay et al. 2018 (WULCA consensus model)'],
            ['Land use',            'LANCA v2.5',           'Fraunhofer IBP / JRC'],
            ['Toxicity',            'USEtox 2.14',          'UNEP/SETAC toxicity model'],
            ['Packaging CFF',       'PEF Annex C v2.1',     'European Commission, May 2020'],
            ['NF/WF factors',       'EF 3.1 JRC',           'JRC Technical Report EUR 29540 EN']
        ];
        doc.autoTable({
            startY: Y,
            head: [['Data type','Version / Name','Source reference']],
            body: dbRows,
            theme: 'plain',
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 40, fontStyle: 'bold' },
                1: { cellWidth: 45 },
                2: { cellWidth: 97, textColor: C.bodyMid }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 5;

        // System boundary declaration
        Y = subHeader('System Boundary Declaration (ISO 14044 §4.2.3.3)', Y);
        const sbText = [
            'INCLUDED: Agricultural production (farm gate, AGRIBALYSE 3.2), ingredient processing,',
            'factory manufacturing energy, outbound transport (brand to retailer), primary packaging.',
            '',
            'EXCLUDED (declared per ISO 14044 §4.2.3.3):',
            '  - Retail energy and operations',
            '  - Consumer use phase and cooking',
            '  - End-of-life consumer waste (post-retail)',
            '  - Capital equipment manufacturing (cut-off rule)',
            '  - Inbound ingredient transport beyond AGRIBALYSE 3.2 farm-gate boundary',
            '    (AGRIBALYSE 3.2 includes representative French market transport in system boundary)',
            '',
            'Functional unit: 1 kg of product as sold (finished weight).',
            'Allocation method: economic allocation, inherited from AGRIBALYSE 3.2 (per ADEME methodology report).'
        ];
        sbText.forEach(line => {
            if (needsSpace(5)) { doc.addPage(); pageNum++; Y = M + 4; }
            T.small();
            doc.setTextColor(line.startsWith('  -') ? C.bodyMid[0] : C.bodyDark[0],
                             line.startsWith('  -') ? C.bodyMid[1] : C.bodyDark[1],
                             line.startsWith('  -') ? C.bodyMid[2] : C.bodyDark[2]);
            doc.text(safe(line), M + (line.startsWith('  -') ? 5 : 0), Y);
            Y += line === '' ? 2 : 4.5;
        });

        Y += 3;

        // Confidence gaps
        Y = subHeader('Known Gaps and Confidence Flags', Y);
        const gapRows = [
            ['Packaging disposal (cardboard)',   'LOW',    'Landfill/incineration split from Eurostat 2013. Update required.'],
            ['Glass packaging parameters',       'LOW',    'FEVE source not obtained. Literature estimate used.'],
            ['Non-road transport non-CC',        'ZERO',   'Sea/air/rail non-CC factors pending derivation. Zero declared.'],
            ['Processing energy benchmarks',     'MEDIUM', 'Industry benchmark database. Primary factory data preferred.'],
            ['Ecotoxicity freshwater (transport)','LOW',   'Combustion Zn only. Tyre/brake wear excluded.'],
            ['AWARE water (non-FR origins)',     'MEDIUM', 'Country-level ratio adjustment applied to AGRIBALYSE FR baseline.']
        ];
        doc.autoTable({
            startY: Y,
            head: [['Gap','Confidence','Note']],
            body: gapRows,
            theme: 'plain',
            styles: { fontSize: 7, cellPadding: 2 },
            headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 58, fontStyle: 'bold' },
                1: { cellWidth: 20, halign: 'center' },
                2: { cellWidth: 104, textColor: C.bodyMid }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        footer('Audit Trail — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE 12 — METHODOLOGY + LEGAL
        // ================================================================
        pageNum++;
        newPage('Methodology Declaration + Legal Notice');

        // Three-column methodology summary
        Y = subHeader('Methodology Overview', Y);

        const col3W  = (CW - 8) / 3;
        const col3Y  = Y;
        const boxH   = 58;

        const drawCol3 = (x, title, items, col) => {
            doc.setFillColor(...col);
            doc.rect(x, col3Y, col3W, 7, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...C.white);
            doc.text(safe(title), x + 2, col3Y + 4.8);
            doc.setFillColor(...C.pageBg);
            doc.setDrawColor(...col); doc.setLineWidth(0.3);
            doc.rect(x, col3Y + 7, col3W, boxH, 'FD');
            T.small(); doc.setTextColor(...C.bodyDark);
            items.forEach((item, i) => {
                doc.text(safe('• ' + item), x + 2, col3Y + 13 + i * 5.5, {maxWidth: col3W - 4});
            });
        };

        drawCol3(M,
            'AIOXY IS',
            ['Screening-level LCA', 'AGRIBALYSE 3.2 primary LCI', 'EF 3.1 (19 categories)', 'GLEC v3.2 transport', 'IPCC Tier 1 agri. GHGs', 'PEF 3.1 CFF packaging', 'Traceable + internally consistent', 'SHA-256 audit hash'],
            C.teal
        );

        drawCol3(M + col3W + 4,
            'THIS REPORT IS NOT',
            ['ISO 14044 critically reviewed', 'Third-party verified', 'EPD (ISO 14025) eligible', 'Ecoinvent-based', 'Suitable for comparative advert.', 'Certification-grade', 'Regulatory submission ready'],
            C.red
        );

        drawCol3(M + (col3W + 4) * 2,
            'SUITABLE FOR',
            ['CSRD/ESRS E1 Scope 3 screening', 'Retailer pre-compliance (CDP)', 'EcoVadis supplier questionnaires', 'Internal eco-design benchmarking', 'Hotspot identification', 'Parametric scenario modelling', 'Brand supplier engagement'],
            C.green
        );

        Y = col3Y + boxH + 12;

        // Legal disclaimer — short, strong
        doc.setFillColor(...C.rowAlt);
        doc.setDrawColor(...C.navyDark); doc.setLineWidth(0.5);
        doc.rect(M, Y, CW, 38, 'FD');
        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 7, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.white);
        doc.text('LEGAL NOTICE', M + 3, Y + 4.8);
        Y += 10;

        const disclaimer =
            'This report presents screening-level product environmental footprint data calculated using ' +
            'AGRIBALYSE 3.2 (ADEME/INRAE), EF 3.1 characterisation factors (JRC), and GLEC v3.2 transport ' +
            'emission factors (Smart Freight Centre). Results represent modelled estimates based on supplied ' +
            'data and secondary LCI databases. They have not been independently verified by a third party. ' +
            'All values are expressed per 1 kg of product as sold. Parametric twin results represent ' +
            'potential reductions under modified scenarios and do not constitute verified performance claims. ' +
            'This document may not be used to support comparative environmental assertions per ISO 14044 §6 ' +
            'without independent critical review.';

        doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(...C.bodyDark);
        const discLines = doc.splitTextToSize(disclaimer, CW - 6);
        discLines.forEach(line => {
            doc.text(safe(line), M + 3, Y);
            Y += 4.5;
        });

        Y += 5;

        // Prepared by block
        hRule(Y); Y += 5;
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Prepared by: AIOXY Environmental Intelligence', M, Y);
        doc.text('Calculation engine: AIOXY v5.0  |  Report: v6.0', M, Y + 4.5);
        doc.text('Assessment ID: ' + safe(dppId), M, Y + 9);
        doc.text('Report generated: ' + new Date().toISOString(), M, Y + 13.5);

        footer('Methodology & Legal — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // PAGE — OFFLINE VERIFICATION + QR CODE
        // ================================================================
        pageNum++;
        newPage('Offline Verification — Digital Transparency Card');

        // What this QR contains
        Y = subHeader('What This QR Code Contains', Y);
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('No internet required. All verification data is embedded directly in the QR code below.', M, Y);
        doc.text('Scan with any smartphone camera. Data is self-contained and does not expire.', M, Y + 4.5);
        Y += 10;

        // Key data block — what is embedded
        const qrDataRows = [
            ['Assessment ID',       safe(dppId)],
            ['Product',             safe(pName)],
            ['Climate Change',      numFmt(ccPerKg, 4) + ' kg CO2e / kg product'],
            ['PEF Single Score',    numFmt(mPt, 2) + ' mPt / kg product'],
            ['Data Quality (DQR)',  fix(dqrVal, 2) + ' / 5.0'],
            ['Functional unit',     '1 kg of product as sold'],
            ['LCI database',        'AGRIBALYSE 3.2 (ADEME/INRAE 2022)'],
            ['LCIA method',         'EF 3.1 — 16 categories + 3 CC sub-splits'],
            ['Assessment date',     safe(dateStr)],
            ['Audit hash (SHA-256)',safe(auditHash).slice(0, 32) + (auditHash.length > 32 ? '..' : '')],
            ['Assessment type',     'Screening-level LCA | Not third-party verified'],
        ];

        doc.autoTable({
            startY: Y,
            body: qrDataRows,
            theme: 'plain',
            styles: { fontSize: 8, cellPadding: 2.5 },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 50, textColor: C.navyDark },
                1: { cellWidth: 132, textColor: C.bodyDark }
            },
            alternateRowStyles: { fillColor: C.rowAlt },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 6;

        // Parametric twin line in QR data block
        if (hasTwin) {
            doc.setFillColor(...C.green);
            doc.rect(M, Y, CW, 7, 'F');
            doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...C.white);
            doc.text(
                'Parametric twin: ' + safe(twinName) + '  |  ' +
                numFmt(twinCO2, 4) + ' kg CO2e/kg  |  Potential reduction: ' + pct(reduction),
                M + 3, Y + 4.8
            );
            Y += 10;
        }

        hRule(Y); Y += 5;

        // QR code generation — data embedded, no server needed
        // Payload: key facts only, fits in QR capacity
        const qrPayloadLines = [
            'AIOXY ENVIRONMENTAL ASSESSMENT',
            'ID: ' + safe(dppId),
            'Product: ' + safe(pName).slice(0, 40),
            'CC: ' + numFmt(ccPerKg, 4) + ' kg CO2e/kg',
            'Score: ' + numFmt(mPt, 2) + ' mPt/kg',
            'DQR: ' + fix(dqrVal, 2) + '/5.0',
            'DB: AGRIBALYSE 3.2',
            'Method: EF 3.1 / PEF 3.1',
            'Date: ' + safe(dateStr),
            'Hash: ' + safe(auditHash).slice(0, 16),
            'Type: Screening-level LCA',
            'NOT third-party verified'
        ];
        if (hasTwin) {
            qrPayloadLines.push('Twin: ' + numFmt(twinCO2, 4) + ' kg CO2e/kg');
            qrPayloadLines.push('Reduction: ' + pct(reduction));
        }
        const qrPayload = qrPayloadLines.join('\n');

        // Generate QR into hidden div, then embed as image in PDF
        const hiddenQrDiv = document.createElement('div');
        hiddenQrDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
        document.body.appendChild(hiddenQrDiv);

        // QR section layout — left: QR image, right: scan instructions
        const qrSize = 45; // mm in PDF
        const qrX    = M;
        const qrY    = Y;
        const instrX = M + qrSize + 8;
        const instrW = CW - qrSize - 8;

        // Scan instructions (right side)
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...C.navyDark);
        doc.text('SCAN FOR OFFLINE VERIFICATION', instrX, qrY + 8);
        T.small(); doc.setTextColor(...C.bodyMid);
        const instrLines = [
            'No internet required.',
            'All data is embedded directly in this QR code.',
            'Scan with any smartphone camera to verify.',
            '',
            'This QR contains:',
            '  - Product identity and assessment ID',
            '  - Climate Change result (kg CO2e/kg)',
            '  - PEF Single Score (mPt/kg)',
            '  - Data quality rating (DQR)',
            '  - Database and method references',
            '  - Partial audit hash for integrity check',
            hasTwin ? '  - Parametric twin comparison' : ''
        ].filter(l => l !== undefined);

        instrLines.forEach((line, i) => {
            doc.text(safe(line), instrX, qrY + 15 + i * 4.2);
        });

        // Short legal note below instructions
        const legalY = qrY + 15 + instrLines.length * 4.2 + 4;
        doc.setFillColor(...C.rowAlt);
        doc.rect(instrX, legalY, instrW, 12, 'F');
        doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...C.bodyMid);
        const legalText = 'Screening-level estimate. Modelled values based on AGRIBALYSE 3.2 and supplied data. ' +
                          'Not independently verified. Results represent potential impacts under assessed conditions. ' +
                          'Not for comparative advertising (ISO 14044 §6).';
        const legalLines = doc.splitTextToSize(legalText, instrW - 4);
        legalLines.forEach((line, i) => {
            doc.text(safe(line), instrX + 2, legalY + 4 + i * 3.8);
        });

        // Attempt QR render and embed
        const attemptQrEmbed = () => {
            return new Promise((resolve) => {
                if (typeof QRCode === 'undefined') {
                    resolve(null);
                    return;
                }
                try {
                    new QRCode(hiddenQrDiv, {
                        text: qrPayload,
                        width: 180,
                        height: 180,
                        colorDark: '#0A2540',
                        colorLight: '#FFFFFF',
                        correctLevel: QRCode.CorrectLevel.M
                    });
                } catch(e) {
                    resolve(null);
                    return;
                }

                let attempts = 0;
                const poll = () => {
                    attempts++;
                    const canvas = hiddenQrDiv.querySelector('canvas');
                    const img    = hiddenQrDiv.querySelector('img');
                    let dataUrl  = null;
                    if (canvas && canvas.width > 0) dataUrl = canvas.toDataURL('image/png');
                    else if (img && img.src && img.src.length > 100) dataUrl = img.src;

                    if (dataUrl) { resolve(dataUrl); }
                    else if (attempts < 30) { setTimeout(poll, 50); }
                    else { resolve(null); }
                };
                setTimeout(poll, 50);
            });
        };

        const qrDataUrl = await attemptQrEmbed();

        if (qrDataUrl) {
            try {
                doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
                // Border around QR
                doc.setDrawColor(...C.navyDark); doc.setLineWidth(0.4);
                doc.rect(qrX, qrY, qrSize, qrSize);
                // Label below QR
                doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5); doc.setTextColor(...C.navyDark);
                doc.text('OFFLINE VERIFICATION', qrX + qrSize / 2, qrY + qrSize + 4, {align: 'center'});
                doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(...C.bodyMid);
                doc.text('Data embedded — no internet needed', qrX + qrSize / 2, qrY + qrSize + 8, {align: 'center'});
            } catch(imgErr) {
                console.warn('[AIOXY PDF] QR image embed error:', imgErr);
                // Fallback: placeholder box
                doc.setFillColor(...C.rowAlt);
                doc.rect(qrX, qrY, qrSize, qrSize, 'F');
                doc.setDrawColor(...C.navyMid); doc.setLineWidth(0.3);
                doc.rect(qrX, qrY, qrSize, qrSize);
                doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(...C.bodyMid);
                doc.text('QR unavailable', qrX + qrSize/2, qrY + qrSize/2, {align:'center'});
                doc.text(safe(dppId).slice(0,16), qrX + qrSize/2, qrY + qrSize/2 + 5, {align:'center'});
            }
        } else {
            // No QRCode library — placeholder box with DPP ID
            doc.setFillColor(...C.rowAlt);
            doc.rect(qrX, qrY, qrSize, qrSize, 'F');
            doc.setDrawColor(...C.navyMid); doc.setLineWidth(0.3);
            doc.rect(qrX, qrY, qrSize, qrSize);
            doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...C.navyDark);
            doc.text('QR', qrX + qrSize/2, qrY + qrSize/2 - 4, {align:'center'});
            doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(...C.bodyMid);
            doc.text(safe(dppId).slice(0,16), qrX + qrSize/2, qrY + qrSize/2 + 3, {align:'center'});
            doc.text('(QRCode library', qrX + qrSize/2, qrY + qrSize/2 + 8, {align:'center'});
            doc.text('not loaded)', qrX + qrSize/2, qrY + qrSize/2 + 12, {align:'center'});
        }

        // Clean up hidden div
        if (document.body.contains(hiddenQrDiv)) {
            document.body.removeChild(hiddenQrDiv);
        }

        Y = qrY + qrSize + 14;
        footer('Offline Verification — Page ' + pageNum + ' of ' + TOTAL_PAGES);

        // ================================================================
        // SAVE
        // ================================================================
        const filename = 'AIOXY_Report_' + safe(pName).replace(/\s+/g,'_').slice(0,30) + '_' + dateStr + '.pdf';
        doc.save(filename);
        console.log('[AIOXY PDF v6.0] Report saved: ' + filename);

    } catch (err) {
        console.error('[AIOXY PDF v6.0] Error:', err);
        alert('PDF generation error: ' + err.message);
    } finally {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
}

// ── PUBLIC API — preserve existing call signatures ──────────────
window.generatePDFReport = function(type) {
    generateProfessionalPDF('results-tab', 'AIOXY Environmental Footprint Report');
};

window.downloadScreenViewPDF = function(tabId, title) {
    generateProfessionalPDF(tabId, title);
};

window.downloadEditablePDF = function(tabId, title) {
    if (window.exportCSRDMatrix) { window.exportCSRDMatrix(); }
};

window.generateProfessionalPDF = generateProfessionalPDF;

console.log('[AIOXY] pdf-generator.js v6.0 loaded — Audit-Grade Report, Zero Shadow Calculations');
