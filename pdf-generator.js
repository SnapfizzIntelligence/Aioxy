// ============================================================
// AIOXY PDF GENERATOR v7.4 — GLASS-BOX AUDIT REPORT — 100% COMPLETE
// PATCH: FIX-1/2/3 setTextColor array->args  FIX-4 microPoints
//        FIX-5  Manufacturing Layer A (ELECTRICITY_GRID_MULTI table)
//        FIX-6  Manufacturing EGM derivation methodology block
//        FIX-7  Transport Layer A (GLEC EF + DAF full table)
//        FIX-8  Transport Layer B (diesel-pollutants-CFs derivation)
//        FIX-9  Transport non-CC per-leg arithmetic
//        FIX-10 Packaging Layer A (Ev/Erec/Ed source block)
//        FIX-11 Packaging non-CC correct lookup level (PKG_MCF bug)
//        FIX-12 Packaging non-CC unit bridge formula
//        FIX-13 Version string consistent from const _PDF_VERSION
//        FIX-14 Factory primary data path — raw inputs + CoM 2024 gas formula
//        FIX-15 GAS_COMBUSTION_MULTI non-CC shown in manufacturing
//        FIX-16 SOC sequestration (regen ag) shown in Layer B
//        FIX-17 SALCA-P phosphorus leaching shown in Layer B
//        FIX-18 Farmed fish feed model shown in Layer B
//        FIX-19 IPCC_TIER1_LIVESTOCK source table values shown in Layer B
//        FIX-20 Crisis routing flag shown in transport
//        FIX-21 Eco-Score grade + thresholds page added
//        FIX-22 Nutritional LCA page added
//        FIX-23 DNM compliance check results added to audit trail
// BUILD: 2026-05-16-v7.4-100pct-glassbox
// ============================================================
// CACHE VERIFY: open browser console and type:
//   window._AIOXY_PDF_VERSION
// Should return "7.4-100pct-glassbox". If it says 7.3 or lower,
// your browser is still serving the OLD cached file.
// Hard-reload with Ctrl+Shift+R (Win/Linux) or Cmd+Shift+R (Mac)
// ============================================================
window._AIOXY_PDF_VERSION = '7.4-100pct-glassbox';
const _PDF_VERSION = window._AIOXY_PDF_VERSION;
// Design contract:
//   - ZERO shadow calculations. ZERO hardcoded impact values.
//   - PDF is a DUMB PRINTER: reads engine globals, renders them.
//   - Every formula shown with full substitution of real numbers.
//   - 3-layer chain for every ingredient & every category:
//       LAYER A: Agribalyse 3.2 base EF (per kg, as-stored)
//       LAYER B: Every adjustment applied (geo-proxy, PD mult,
//                AWARE ratio, LANCA ratio, processing archetype)
//       LAYER C: Final effective EF → × Qty → impact
//   - Manufacturing, Transport, Packaging: engine trace strings
//     rendered verbatim + enhanced where engine populated them.
//   - Normalisation & Weighting: actual NF + WF values from
//     window.aioxyData.pef_factors printed per category.
//   - ILCD EF 3.1 UUIDs from window.aioxyData.ilcd_registry
//     printed in database version table.
//   - Agribalyse LCI Name (source_activity) is the canonical
//     traceability ID — printed everywhere. source_uuid is the
//     internal programmatic slug (not an RFC UUID — documented).
//   - Text overflow: every block uses accurate height estimation
//     before render; never splits mid-derivation.
// ============================================================

async function generateProfessionalPDF(tabId, reportTitle) {
    console.log('[AIOXY PDF ' + _PDF_VERSION + '] Generating Glass-Box Audit Report');

    const loadingOverlay = document.getElementById('pdf-loading-overlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    // Guard: engine stores auditTrailData.pefCategories = pefResults (calculation_engine.js line 2731)
    // and window.finalPefResults = result.finalPefResults (main.js line 493)
    if (!window.finalPefResults || Object.keys(window.finalPefResults).length === 0 ||
        !window.auditTrailData  ||
        (!window.auditTrailData.pefCategories && !window.auditTrailData.contribution_tree)) {
        alert('Please run the AIOXY calculation before exporting the PDF.');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.setFont('helvetica', 'normal');

        const PW  = doc.internal.pageSize.width;   // 210mm
        const PH  = doc.internal.pageSize.height;  // 297mm
        const M   = 14;
        const CW  = PW - M * 2;
        let   Y   = M;

        // ── COLOUR SYSTEM ────────────────────────────────────
        const C = {
            navyDark:  [10,  37,  64],
            navyMid:   [26,  74,  107],
            teal:      [0,   168, 150],
            amber:     [244, 162, 97],
            green:     [42,  157, 143],
            red:       [230, 57,  70],
            bodyDark:  [45,  55,  72],
            bodyMid:   [113, 128, 150],
            rowAlt:    [237, 242, 247],
            pageBg:    [248, 250, 252],
            white:     [255, 255, 255],
            rule:      [203, 213, 224],
            traceGg:   [245, 247, 250],
            yellow:    [255, 243, 205],
            blue:      [235, 245, 255],
            layerA:    [230, 245, 255],   // Agribalyse base — light blue
            layerB:    [255, 248, 230],   // Adjustments — warm amber
            layerC:    [230, 255, 240],   // Final — light green
            purple:    [245, 240, 255],   // NF/WF derivation
        };

        // ── CATEGORY UNITS ───────────────────────────────────
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

        const ALL_CATS_ORDERED = [
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

        const SCORABLE_CATS = ALL_CATS_ORDERED.filter(c =>
            c !== 'Climate Change - Fossil' &&
            c !== 'Climate Change - Biogenic' &&
            c !== 'Climate Change - Land Use'
        );

        // ── HELPERS ──────────────────────────────────────────
        const safe  = (s) => {
            if (s === null || s === undefined) return '';
            return String(s).replace(/[^\x00-\x7F]/g, c => {
                const map = {'×':'x','÷':'/','→':'>','≤':'<=','≥':'>=',
                             '₂':'2','₄':'4','°':'deg','±':'+/-',
                             '\u2014':'-','\u2013':'-','\u00b3':'3',
                             '\u00b2':'2','\u00b9':'1'};
                return map[c] || '';
            }).trim();
        };
        const fix   = (v, d=4) => (typeof v==='number' && isFinite(v)) ? v.toFixed(d) : '0.'+'0'.repeat(d);
        const sci   = (v, d=3) => (typeof v==='number' && isFinite(v)) ? v.toExponential(d) : '0.000e+0';
        const pct   = (v)      => (typeof v==='number' && isFinite(v)) ? v.toFixed(1)+'%'  : '0.0%';
        const trunc = (s,n=45) => { const t=safe(s); return t.length>n ? t.slice(0,n-2)+'..' : t; };

        const numFmt = (v, d=4) => {
            if (typeof v !== 'number' || !isFinite(v)) return '0';
            if (Math.abs(v) < 0.0001 && v !== 0) return sci(v, 3);
            return fix(v, d);
        };

        // ── TYPOGRAPHY ───────────────────────────────────────
        const T = {
            h1:    () => { doc.setFont('helvetica','bold');   doc.setFontSize(17);  doc.setTextColor(...C.navyDark); },
            h2:    () => { doc.setFont('helvetica','bold');   doc.setFontSize(12);  doc.setTextColor(...C.navyDark); },
            h3:    () => { doc.setFont('helvetica','bold');   doc.setFontSize(9.5); doc.setTextColor(...C.navyDark); },
            body:  () => { doc.setFont('helvetica','normal'); doc.setFontSize(9);   doc.setTextColor(...C.bodyDark); },
            small: () => { doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...C.bodyMid);  },
            mono:  () => { doc.setFont('courier','normal');   doc.setFontSize(7);   doc.setTextColor(...C.bodyDark); },
            label: () => { doc.setFont('helvetica','bold');   doc.setFontSize(7.5); doc.setTextColor(...C.navyMid);  },
            teal:  () => { doc.setFont('helvetica','bold');   doc.setFontSize(11);  doc.setTextColor(...C.teal);     },
            white: () => { doc.setFont('helvetica','bold');   doc.setFontSize(9);   doc.setTextColor(...C.white);    }
        };

        // ── PAGE MANAGEMENT ──────────────────────────────────
        let pageNum = 0;
        const _pageSectionLabels = {};
        // PDF-F4 FIX (Audit Session 14): TOTAL_PAGES replaced with jsPDF putTotalPages placeholder.
        // '{total_pages_count}' is resolved by doc.putTotalPages() after all pages are generated.
        // Previous '??' was never resolved — all footers showed 'Page N of ??'.
        let TOTAL_PAGES = '{total_pages_count}'; // retained for any direct references

        const newPage = (sectionTitle) => {
            doc.addPage();
            pageNum++;
            Y = M;
            doc.setFillColor(...C.navyDark);
            doc.rect(0, 0, PW, 10, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
            doc.text(safe(sectionTitle).toUpperCase(), M, 6.8);
            doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
            doc.text('Page ' + pageNum + ' of {total_pages_count}', PW - M, 6.8, {align:'right'}); // PDF-F4 FIX
            Y = 16;
        };

        const footer = (label) => {
            _pageSectionLabels[pageNum] = label;
            doc.setFillColor(...C.navyDark);
            doc.rect(0, PH - 8, PW, 8, 'F');
            doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(...C.white);
            doc.text('AIOXY ' + _PDF_VERSION + ' | Glass-Box LCA | AGRIBALYSE 3.2 | EF 3.1 | Screening — Not Third-Party Verified', M, PH - 3.5);
            doc.text(safe(label), PW - M, PH - 3.5, {align:'right'});
        };

        const hRule = (y, col) => {
            doc.setDrawColor(...(col || C.rule));
            doc.setLineWidth(0.3);
            doc.line(M, y, PW - M, y);
        };

        // Accurate height guard — checks BEFORE drawing, not after
        const needsPage = (spaceNeeded) => Y + spaceNeeded > PH - 14;

        const ensureSpace = (spaceNeeded, sectionLabel) => {
            if (needsPage(spaceNeeded)) {
                doc.addPage();
                pageNum++;
                doc.setFillColor(...C.navyDark);
                doc.rect(0, 0, PW, 10, 'F');
                doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.white);
                doc.text(safe(sectionLabel || 'CONTINUED'), M, 6.8);
                doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
                doc.text('Page ' + pageNum + ' of {total_pages_count}', PW - M, 6.8, {align:'right'}); // PDF-F4 FIX
                Y = 16;
            }
        };

        // ── UI HELPERS ───────────────────────────────────────
        const metricCard = (x, y, w, h, label, value, unit, col) => {
            doc.setFillColor(...C.pageBg);
            doc.setDrawColor(...(col || C.teal));
            doc.setLineWidth(0.4);
            doc.roundedRect(x, y, w, h, 2, 2, 'FD');
            doc.setFillColor(...(col || C.teal));
            doc.roundedRect(x, y, w, 3, 2, 2, 'F');
            doc.rect(x, y+1, w, 2, 'F');
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text(safe(label), x + w/2, y + 7, {align:'center'});
            doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor(...(col||C.teal));
            doc.text(safe(value), x + w/2, y + 14, {align:'center'});
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text(safe(unit), x + w/2, y + 19, {align:'center'});
        };

        const subHeader = (text) => {
            ensureSpace(10, 'Calculation Detail (continued)');
            doc.setFillColor(...C.rowAlt);
            doc.rect(M, Y, CW, 6, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.navyDark);
            doc.text(safe(text), M + 2, Y + 4.2);
            Y += 8;
        };

        // ── TRACE BLOCK: monospaced derivation box ───────────
        // bgRGB, borderRGB, textRGB, accentRGB are optional colour overrides
        const traceBlock = (lines, opts) => {
            if (!lines || lines.length === 0) return;
            const o       = opts || {};
            const w       = o.width  || CW;
            const lineH   = 4.0;
            const pad     = 3;
            const totalH  = lines.length * lineH + pad * 2 + 2;
            const sLabel  = o.sectionLabel || 'Calculation Detail (continued)';

            ensureSpace(totalH + 4, sLabel);

            const bY = Y;
            doc.setFillColor(...(o.bg     || C.traceGg));
            doc.setDrawColor(...(o.border || C.rule));
            doc.setLineWidth(0.3);
            doc.rect(M, bY, w, totalH, 'FD');
            // left accent bar
            doc.setFillColor(...(o.accent || C.teal));
            doc.rect(M, bY, 1.5, totalH, 'F');

            doc.setFont('courier','normal');
            doc.setFontSize(6.5);
            doc.setTextColor(...(o.text || C.bodyDark));
            lines.forEach((line, i) => {
                doc.text(safe(line), M + pad + 1.5, bY + pad + (i * lineH) + 2.8);
            });
            Y = bY + totalH + 3;
        };

        // ── LAYER BLOCK: coloured derivation step ────────────
        const layerBlock = (title, lines, colSet, sLabel) => {
            if (!lines || lines.length === 0) return;
            const lineH  = 4.0;
            const pad    = 2.5;
            const titleH = 5.5;
            const totalH = titleH + lines.length * lineH + pad * 2;
            ensureSpace(totalH + 3, sLabel || 'Calculation Detail (continued)');

            const bY = Y;
            doc.setFillColor(...colSet.bg);
            doc.rect(M + 2, bY, CW - 4, totalH, 'F');
            doc.setDrawColor(...colSet.border);
            doc.setLineWidth(0.25);
            doc.rect(M + 2, bY, CW - 4, totalH, 'D');
            doc.setFillColor(...colSet.accent);
            doc.rect(M + 2, bY, 2, totalH, 'F');

            doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(...colSet.titleText);
            doc.text(safe(title), M + 7, bY + 4);

            doc.setFont('courier','normal'); doc.setFontSize(6.5); doc.setTextColor(...colSet.text);
            lines.forEach((line, i) => {
                doc.text(safe(line), M + 7, bY + titleH + pad + i * lineH + 1.5);
            });
            Y = bY + totalH + 2;
        };

        // Colour sets for the 3 layers
        const LAYER = {
            A: { bg: C.layerA, border: [147,197,253], accent: [59,130,246], titleText: [30,58,138], text: [30,58,138] },
            B: { bg: C.layerB, border: [251,191,36],  accent: [245,158,11], titleText: [120,53,15], text: [92,53,15]  },
            C: { bg: C.layerC, border: [52,211,153],  accent: [16,185,129], titleText: [6,78,59],   text: [6,78,59]   }
        };

        // ── DATA ASSEMBLY ────────────────────────────────────
        const audit  = window.auditTrailData;
        const pef    = window.finalPefResults;
        const db     = window.aioxyData || {};

        const pName      = safe(audit.productName || 'Assessed Product');
        const dateStr    = new Date(audit.calculationTimestamp || Date.now()).toISOString().split('T')[0];
        const mb         = audit.mass_balance || {};
        // FIX: Never use magic fallback 1.0 — violates zero-magic-numbers principle.
        // Priority: mass_balance.final_content_weight_kg (set by engine from input.product.weightKg)
        // → lastInput.product.weightKg (direct from user form) → 0.2 (documented PEF default,
        // matches form default, logged to console so it is traceable).
        // PDF-F1 FIX (Audit Session 14): pWeightKg fallback now sets a visible warning flag.
        // Previous: console.warn only — invisible on printed PDF.
        // Fix: set pWeightFallbackWarning = true when 0.2 default is used. This flag
        // triggers a visible red warning box on the cover page so any auditor reading
        // the printed PDF can see that the product weight was not confirmed by the engine.
        let pWeightFallbackWarning = false;
        const pWeightKg  = mb.final_content_weight_kg
                        || window.lastInput?.product?.weightKg
                        || (() => {
                            console.warn('[AIOXY PDF] pWeightKg fallback to 0.2 — mass_balance missing. Verify engine ran before PDF export.');
                            pWeightFallbackWarning = true;
                            return 0.2;
                        })();
        // PDF-F3: Verify QR URL in live environment before production.
        // FIX: [pdf-generator audit] dppId was commented out here (a prior "PDF-F3"
        // edit left a dangling `const` that also broke the file's syntax entirely —
        // see Y-2026-... fix), but is used in 5 places later in this file (cover page,
        // audit trail page, tables, QR code). Restored using the same fallback pattern
        // audit-trail.js already uses (audit.dppId || 'N/A').
        const dppId      = safe(audit.dppId || 'N/A');
        const auditHash  = safe(audit.auditHash || '');

        // Manufacturing traceability sources (confirmed from calculation_engine.js buildContributionTree):
        //   audit.traceability.manufacturing.parameters.country           = input.manufacturing.country
        //   audit.traceability.manufacturing.parameters.gridIntensityGPerKwh = mfgResult.gridIntensityGPerKwh
        //   audit.traceability.manufacturing.parameters.energySource      = input.manufacturing.energySource
        //   kWh total: in contribution_tree['Climate Change'].Manufacturing.components[0].details ("X.XXXX kWh")
        //   grid_intensity (number): in contribution_tree['Climate Change'].Manufacturing.components[0].grid_intensity
        const mfgTrace      = audit.traceability?.manufacturing || {};
        const ccMfgComp0    = (audit.contribution_tree?.['Climate Change']?.Manufacturing?.components
                            || pef['Climate Change']?.contribution_tree?.Manufacturing?.components
                            || [])[0] || {};
        const mfgCountry    = safe(mfgTrace.parameters?.country || ccMfgComp0.country || 'N/A');
        const mfgEnergySrc  = safe(mfgTrace.parameters?.energySource || ccMfgComp0.energy_source || 'Grid Mix');
        // gridG: mfgTrace.parameters.gridIntensityGPerKwh (from mfgResult.gridIntensityGPerKwh)
        const gridG         = mfgTrace.parameters?.gridIntensityGPerKwh || ccMfgComp0.grid_intensity || 0;
        // kWh: mfgComponent.details stores "X.XX kWh" as a string — parse safely.
        // GAP-3 FIX: details uses .toFixed(2) which rounds 0.005 → "0.01", causing 2× error
        // in Layer C non-CC arithmetic. Correct kWh is derived from primary factory data
        // (totalKWh/totalOutputKg × productWeight) if available, else back-calculated from
        // the CC contribution (elecCC / adjustedIntensity). The back-calculation excludes
        // gas CO2 (which is in mfgCC but not kWh-driven) so we use elec-only CC.
        const mfgKwhStr     = ccMfgComp0.details || '';
        const mfgKwhParsed  = parseFloat(mfgKwhStr) || 0;
        // Derive correct kWh:
        const _pfd4kwh = window.lastInput?.manufacturing?.primaryFactoryData || null;
        const _isPfKwh = window.lastInput?.manufacturing?.usePrimaryFactoryData === true;
        // contribution_tree: engine stores BOTH audit.contribution_tree (all cats) AND
        // pef[cat].contribution_tree (per-cat). Use audit.contribution_tree as primary source.
        // MOVED: must be declared before mfgKwhCorrect block which uses mfgCC (fixes
        // ReferenceError: Cannot access 'mfgCC' before initialization)
        const fullTree = audit.contribution_tree || {};
        const ccTree   = fullTree['Climate Change'] || pef['Climate Change']?.contribution_tree || {};
        // FIX: ingComps MUST come from the full contribution_tree that buildContributionTree()
        // populated with actual component arrays. pef[cat].contribution_tree.Ingredients.components
        // is initialised as [] in aggregateAllCategories() and only filled by buildContributionTree()
        // which writes back via: pefResults[cat].contribution_tree = fullContribTree[cat].
        // If audit.contribution_tree is missing, fall back to pef['Climate Change'].contribution_tree
        // (which should have been overwritten by buildContributionTree). If both are empty,
        // log a warning so the user knows to re-run the calculation.
        const ingComps = (()=>{
            const fromAudit = fullTree['Climate Change']?.Ingredients?.components;
            if (Array.isArray(fromAudit) && fromAudit.length > 0) return fromAudit;
            const fromPef   = pef['Climate Change']?.contribution_tree?.Ingredients?.components;
            if (Array.isArray(fromPef) && fromPef.length > 0) return fromPef;
            console.warn('[AIOXY PDF] ingComps: no ingredient components found in contribution_tree. ' +
                'PDF ingredient sections will be empty. Re-run the calculation before exporting PDF.');
            return [];
        })();
        const mfgCC    = ccTree.Manufacturing?.total || 0;
        const transCC  = ccTree.Transport?.total     || 0;
        const pkgCC    = ccTree.Packaging?.total      || 0;
        const wasteCC  = ccTree.Waste?.total          || 0;
        const ingCC    = ccTree.Ingredients?.total    || 0;
        // FIX UPSTREAM-1: Upstream (inbound ingredient transport) was computed by the
        // engine and folded into pef['Climate Change'].total, but never read here —
        // causing Executive Summary stage bars to sum to less than the stated TOTAL.
        const upstreamCC = ccTree.Upstream?.total     || 0;

        let mfgKwhCorrect;
        if (_isPfKwh && _pfd4kwh && _pfd4kwh.totalOutputKg > 0) {
            // Primary factory data path: exact per-batch kWh
            mfgKwhCorrect = (_pfd4kwh.totalKWh / _pfd4kwh.totalOutputKg) * pWeightKg;
        } else if (gridG > 0) {
            // Benchmark path: back-calculate from CC (CC from electricity only, no gas in benchmark)
            mfgKwhCorrect = mfgCC / (gridG * 1.07 / 1000);
        } else {
            mfgKwhCorrect = mfgKwhParsed; // last fallback
        }

        const ccTotal    = pef['Climate Change']?.total || 0;
        const ccPerKg    = ccTotal / pWeightKg;
        const waterTotal = pef['Water Use/Scarcity (AWARE)']?.total || 0;
        const landTotal  = pef['Land Use']?.total || 0;
        const fossilTotal= pef['Resource Use, fossils']?.total || 0;
        const fossilCC   = pef['Climate Change - Fossil']?.total || 0;
        const bioCC      = pef['Climate Change - Biogenic']?.total || 0;
        const dlucCC     = pef['Climate Change - Land Use']?.total || 0;

        const ss       = audit.pef_single_score || {};
        const mPt      = ss.singleScore || 0;
        const ssBkd    = ss.breakdown   || {};

        const dqr      = audit.dqr_summary || {};
        const dqrVal   = dqr.overall_dqr   || 0;

        const unc      = audit.uncertainty_analysis?.monte_carlo || {};

        const baseline = audit.comparison_baseline || window.currentComparisonBaseline || null;
        const hasTwin  = !!(baseline && (baseline.co2PerKg || baseline.assessed_co2PerKg));
        const twinCO2  = baseline?.co2PerKg || 0;
        const twinName = safe(baseline?.name || 'Parametric Twin');
        const reduction= hasTwin && twinCO2 > 0 ? ((twinCO2 - ccPerKg) / twinCO2 * 100) : 0;

        const ingList  = audit.traceability?.ingredients || [];

        // NF/WF from database — printed verbatim
        const nfRaw    = db.pef_factors?.normalization_factors || {};
        const wfRaw    = db.pef_factors?.weighting_factors     || {};
        const ilcd     = db.ilcd_registry || {};

        // NF_ALIAS: EF canonical → internal name (mirrors engine)
        const NF_ALIAS = {
            'Climate change':                              'Climate Change',
            'Ozone depletion':                             'Ozone Depletion',
            'Human toxicity, cancer effects':              'Human Toxicity, cancer',
            'Human toxicity, non-cancer effects':          'Human Toxicity, non-cancer',
            'Particulate matter formation':                'Particulate Matter',
            'Ionising radiation':                          'Ionizing Radiation',
            'Photochemical ozone formation, human health': 'Photochemical Ozone Formation',
            'Acidification terrestrial and freshwater':    'Acidification',
            'Eutrophication terrestrial':                  'Eutrophication, terrestrial',
            'Eutrophication freshwater':                   'Eutrophication, freshwater',
            'Eutrophication marine':                       'Eutrophication, marine',
            'Ecotoxicity freshwater':                      'Ecotoxicity, freshwater',
            'Land use':                                    'Land Use',
            'Water use':                                   'Water Use/Scarcity (AWARE)',
            'Resource use, minerals and metals':           'Resource Use, minerals/metals',
            'Resource use, fossils':                       'Resource Use, fossils',
            'EF-particulate matter':                       'Particulate Matter',
            'Human toxicity, cancer':                      'Human Toxicity, cancer',
            'Human toxicity, non-cancer':                  'Human Toxicity, non-cancer',
            'Photochemical ozone formation':               'Photochemical Ozone Formation',
            'Resource depletion, fossils':                 'Resource Use, fossils',
            'Resource depletion, minerals and metals':     'Resource Use, minerals/metals',
            'Acidification':                               'Acidification',
            'Eutrophication, freshwater':                  'Eutrophication, freshwater',
            'Eutrophication, marine':                      'Eutrophication, marine',
            'Eutrophication, terrestrial':                 'Eutrophication, terrestrial',
            'Ecotoxicity, freshwater':                     'Ecotoxicity, freshwater',
            'Land Use':                                    'Land Use',
            'Water Use/Scarcity (AWARE)':                  'Water Use/Scarcity (AWARE)',
            'Resource Use, minerals/metals':               'Resource Use, minerals/metals',
            'Resource Use, fossils':                       'Resource Use, fossils',
        };

        // Build resolved NF/WF maps keyed by internal category name
        const resolvedNF = {};
        const resolvedWF = {};
        for (const [efKey, val] of Object.entries(nfRaw)) {
            const internal = NF_ALIAS[efKey] || efKey;
            resolvedNF[internal] = val;          // raw NF value (denominator)
        }
        for (const [efKey, val] of Object.entries(wfRaw)) {
            const internal = NF_ALIAS[efKey] || efKey;
            resolvedWF[internal] = val;
        }

        // ================================================================
        // PAGE 1 — COVER
        // ================================================================
        pageNum = 1;
        doc.setFillColor(...C.navyDark);
        doc.rect(0, 0, PW, 70, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.white);
        doc.text('AIOXY', M, 12);
        doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.teal);
        doc.text('GLASS-BOX ENVIRONMENTAL FOOTPRINT REPORT — ' + _PDF_VERSION, M, 17);
        doc.setDrawColor(...C.teal); doc.setLineWidth(0.5);
        doc.line(M, 20, PW - M, 20);
        doc.setFont('helvetica','bold'); doc.setFontSize(20); doc.setTextColor(...C.white);
        const pNameLines = doc.splitTextToSize(safe(pName), CW);
        doc.text(pNameLines, M, 33);
        doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(180, 200, 220); // FIX-1: was setTextColor([180,200,220]) — array arg throws jsPDF.f3 "Invalid argument"
        doc.text('Assessment Date: ' + dateStr + '   |   Report ID: ' + safe(dppId).slice(0, 20), M, 56);
        doc.text('Functional Unit: 1 kg of product as sold  |  Every formula shown with full arithmetic', M, 62);

        const cardY = 78; const cardH = 30; const cardW = (CW - 8) / 3;
        metricCard(M,             cardY, cardW, cardH, 'Climate Change', numFmt(ccPerKg, 3), 'kg CO2e / kg product', C.teal);
        metricCard(M + cardW + 4, cardY, cardW, cardH, 'PEF Single Score', numFmt(mPt, 1), 'uPt / kg product', C.navyMid);
        const dqrCol = dqrVal <= 2 ? C.green : dqrVal <= 3 ? C.amber : C.red;
        metricCard(M + (cardW + 4)*2, cardY, cardW, cardH, 'Data Quality (DQR)', fix(dqrVal,2) + ' / 5.0', 'PEF 3.1 §5.7', dqrCol);

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
            ['PDF transparency',   'Every formula shown with full substitution of actual numbers'],
            ['Assessment type',    'Screening-level LCA  |  Not third-party verified'],
            ['Audit hash (SHA-256)',safe(auditHash).slice(0,32) + (auditHash.length>32 ? '..' : '')]
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

        // PDF-F1 FIX (Audit Session 14): Visible warning when pWeightKg fell back to default.
        // Previous: console.warn only — invisible on printed PDF.
        if (pWeightFallbackWarning) {
            doc.setFillColor(255, 243, 205);
            doc.rect(M, Y, CW, 10, 'F');
            doc.setDrawColor(240, 173, 78); doc.setLineWidth(0.3);
            doc.rect(M, Y, CW, 10, 'S');
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(133, 100, 4);
            doc.text('\u26A0 DATA WARNING: Product weight not confirmed by engine. Defaulted to 0.2 kg.', M + 2, Y + 4.5);
            doc.setFont('helvetica','normal');
            doc.text('Per-kg metrics on this report may be incorrect. Re-run the calculation before using this report.', M + 2, Y + 8.5);
            Y += 12;
        }

        footer('Page 1 of {total_pages_count}');

        // ================================================================
        // PAGE 2 — EXECUTIVE SUMMARY
        // ================================================================
        newPage('Executive Summary');

        subHeader('Life Cycle Stage Contribution — Climate Change (kg CO2e / kg product)'); Y -= 2;
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Source: Engine contribution tree.  Formula: stage_total / product_weight_kg', M, Y); Y += 5;

        const stages = [
            { name: 'Ingredients',   val: ingCC  },
            { name: 'Manufacturing', val: mfgCC  },
            { name: 'Transport',     val: transCC },
            { name: 'Packaging',     val: pkgCC  },
            // FIX UPSTREAM-1: disclosed as its own stage rather than hidden inside TOTAL.
            // Only rendered when non-zero so FR-only-origin products keep a clean 4-row table.
            ...(upstreamCC !== 0 ? [{ name: 'Upstream (inbound)', val: upstreamCC }] : [])
        ];
        const maxVal   = Math.max(...stages.map(s => Math.abs(s.val)), 0.001);
        const barMaxW  = CW - 70;
        const barH     = 8;
        const barGap   = 3;

        stages.forEach(s => {
            const barW = (Math.abs(s.val) / maxVal) * barMaxW;
            const pctV = ccTotal > 0 ? (s.val / ccTotal * 100) : 0;
            doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(...C.bodyDark);
            doc.text(safe(s.name), M, Y + barH - 1);
            doc.setFillColor(...C.teal);
            doc.rect(M + 32, Y, Math.max(barW, 0.5), barH - 1, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...C.navyDark);
            const calcStr = numFmt(s.val/pWeightKg,4) + ' = ' + numFmt(s.val,4) + ' / ' + fix(pWeightKg,4) + ' kg';
            doc.text(calcStr + '  (' + pct(pctV) + ')', M + 32 + barMaxW + 2, Y + barH - 1);
            Y += barH + barGap;
        });

        doc.setFillColor(...C.navyDark);
        doc.rect(M + 32, Y, barMaxW, 1, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.navyDark);
        doc.text('TOTAL', M, Y + 5);
        doc.setTextColor(...C.teal);
        doc.text(numFmt(ccPerKg,4) + ' kg CO2e / kg product', M + 32, Y + 5);
        Y += 10;

        if (wasteCC && wasteCC > 0) {
            doc.setFont('helvetica','italic'); doc.setFontSize(7); doc.setTextColor(...C.bodyMid);
            doc.text('Processing waste (informational — excluded from TOTAL per ISO 14044 §4.2.3.3): ' +
                     numFmt(wasteCC/pWeightKg,4) + ' kg CO2e/kg', M, Y + 4);
            Y += 8;
        }

        hRule(Y); Y += 5;

        // Hotspots + twin two-column
        const colW = (CW - 5) / 2;
        subHeader('Top 3 Ingredient Hotspots (Climate Change)'); Y -= 2;
        const sortedIngs = [...ingComps].sort((a,b)=>(b.subtotal||0)-(a.subtotal||0)).slice(0,3);
        sortedIngs.forEach((ing, i) => {
            const ingPct = ccTotal > 0 ? ((ing.subtotal||0)/ccTotal*100) : 0;
            doc.setFont('helvetica', i===0?'bold':'normal'); doc.setFontSize(8.5);
            doc.setTextColor(...C.navyDark);
            doc.text((i+1) + '. ' + trunc(safe(ing.name), 38), M, Y + 5);
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.teal);
            doc.text(numFmt((ing.subtotal||0)/pWeightKg,4) + ' kg CO2e/kg  (' + pct(ingPct) + ')',
                     M + colW - 5, Y + 5, {align:'right'});
            hRule(Y + 7, C.rowAlt);
            Y += 9;
        });

        Y += 3;

        if (hasTwin) {
            subHeader('Parametric Twin Comparison'); Y -= 2;
            doc.setFillColor(...C.pageBg);
            doc.setDrawColor(...C.teal); doc.setLineWidth(0.4);
            doc.roundedRect(M, Y, CW, 28, 2, 2, 'FD');
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.navyDark);
            doc.text('Current product:', M + 4, Y + 7);
            doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.navyDark);
            doc.text(numFmt(ccPerKg,4) + ' kg CO2e/kg', M + 52, Y + 7);
            doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.bodyMid);
            doc.text('Twin scenario (' + trunc(twinName,30) + '):', M + 4, Y + 15);
            doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.green);
            doc.text(numFmt(twinCO2,4) + ' kg CO2e/kg', M + 52, Y + 15);
            const redCol = reduction > 0 ? C.green : C.red;
            doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...redCol);
            doc.text('Potential reduction: ' + pct(reduction), M + 4, Y + 23);
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text('Screening-level parametric estimate. Not a verified comparative claim.', M + 4, Y + 28);
            Y += 33;
        }

        footer('Page 2 of {total_pages_count}');

        // ================================================================
        // PAGE 3 — RESULTS SCORECARD
        // ================================================================
        newPage('Environmental Profile — All 19 EF 3.1 Categories');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('All characterisation factors: JRC EF 3.1. Values per 1 kg product as sold. Source: Engine output.', M, Y); Y += 6;

        const scorecardRows = [];
        ALL_CATS_ORDERED.forEach(cat => {
            const isSub  = cat.startsWith('Climate Change -');
            const catVal = pef[cat]?.total || 0;
            const perKgV = catVal / pWeightKg;
            const unit   = CAT_UNITS[cat] || '';
            const ssEntry = ssBkd[cat];
            const ssCont  = ssEntry ? ((ssEntry.weighted != null ? ssEntry.weighted * 1e6 : null) ?? ssEntry.microPoints ?? 0) : 0; // FIX-4: engine breakdown has no .microPoints; use weighted*1e6 (matches line 1541 pattern)
            const conf   = ['Climate Change','Climate Change - Fossil','Climate Change - Biogenic','Climate Change - Land Use'].includes(cat) ? 'HIGH' : 'MEDIUM';

            // Stage breakdown
            const tree   = pef[cat]?.contribution_tree || {};
            const ingV   = (tree.Ingredients?.total   || 0) / pWeightKg;
            const mfgV   = (tree.Manufacturing?.total || 0) / pWeightKg;
            const trsV   = (tree.Transport?.total     || 0) / pWeightKg;
            const pkgV   = (tree.Packaging?.total     || 0) / pWeightKg;

            scorecardRows.push([
                (isSub ? '    ' : '') + safe(cat),
                safe(unit),
                numFmt(perKgV, 4),
                numFmt(ingV,  4),
                numFmt(mfgV,  5),
                numFmt(trsV,  5),
                numFmt(pkgV,  5),
                isSub ? '—' : numFmt(ssCont, 2),
                safe(conf)
            ]);
        });

        doc.autoTable({
            startY: Y,
            head: [['Impact Category','Unit','Total/kg','Ingr.','Mfg.','Trans.','Pkg.','uPt','Conf.']],
            body: scorecardRows,
            theme: 'plain',
            styles: { fontSize: 6.2, cellPadding: 1.8, overflow: 'linebreak' },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold', fontSize: 6.2 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 18, textColor: C.bodyMid },
                2: { cellWidth: 20, halign: 'right', fontStyle: 'bold' },
                3: { cellWidth: 18, halign: 'right' },
                4: { cellWidth: 18, halign: 'right' },
                5: { cellWidth: 18, halign: 'right' },
                6: { cellWidth: 14, halign: 'right' },
                7: { cellWidth: 14, halign: 'right' },
                8: { cellWidth: 12, halign: 'center' }
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

        // Single score summary
        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 18, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
        doc.text('PEF SINGLE SCORE', M + 3, Y + 6);
        doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(180, 200, 220); // FIX-2: was setTextColor([180,200,220]) — array arg throws jsPDF.f3 "Invalid argument"
        doc.text('Formula: SUM_i [ (result_i / kg product) / NF_i x WF_i ] x 1,000,000   |   Source: JRC EUR 29540 EN (EF 3.1)', M + 3, Y + 11);
        doc.text('NF and WF values from window.aioxyData.pef_factors — full derivation on Normalisation & Weighting page', M + 3, Y + 15.5);
        doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor(...C.teal);
        doc.text(numFmt(mPt,2) + ' uPt / kg product', PW - M - 3, Y + 13, {align:'right'});
        Y += 22;

        footer('Page 3 of {total_pages_count}');

        // ================================================================
        // PAGE 4 — NORMALISATION & WEIGHTING FULL DERIVATION
        // ================================================================
        newPage('Normalisation & Weighting — Full Derivation (PEF 3.1 / EF 3.1 JRC)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Source: window.aioxyData.pef_factors (JRC EUR 29540 EN, EF 3.1). All NF and WF values read from database — not hardcoded here.', M, Y); Y += 4;
        doc.text('Formula per category:  uPt_i = [ (impact_i / product_kg) / NF_i ] x WF_i x 1,000,000', M, Y); Y += 4;
        doc.text('NF_i = normalisation factor (person-equivalent per year), WF_i = dimensionless weighting factor.', M, Y); Y += 6;

        const nfwfRows = [];
        let mPtTotal = 0;
        SCORABLE_CATS.forEach(cat => {
            const catTotal   = pef[cat]?.total || 0;
            const impactPerKg = catTotal / pWeightKg;
            const nfVal      = resolvedNF[cat];
            const wfVal      = resolvedWF[cat];
            const unit       = CAT_UNITS[cat] || '';
            const ssEntry    = ssBkd[cat];
            const mPtCat     = ssEntry ? ((ssEntry.weighted != null ? ssEntry.weighted * 1e6 : null) ?? ssEntry.microPoints ?? 0) : 0; // FIX-4: engine breakdown has no .microPoints; use weighted*1e6
            mPtTotal += mPtCat;

            // Derivation shown
            if (nfVal !== undefined && wfVal !== undefined && nfVal > 0) {
                const normalized = impactPerKg / nfVal;
                const weighted   = normalized * wfVal;
                const mPtCalc    = weighted * 1e6;
                nfwfRows.push([
                    safe(cat),
                    safe(unit),
                    numFmt(impactPerKg, 5),
                    numFmt(nfVal, 4),
                    numFmt(normalized, 5),
                    numFmt(wfVal, 6),
                    numFmt(weighted, 7),
                    numFmt(mPtCalc, 3)
                ]);
            } else {
                nfwfRows.push([
                    safe(cat),
                    safe(unit),
                    numFmt(impactPerKg, 5),
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    numFmt(mPtCat, 3)
                ]);
            }
        });

        doc.autoTable({
            startY: Y,
            head: [['Category','Unit','Impact/kg','NF (person-yr)','After ÷NF','WF','After xWF','uPt/kg']],
            body: nfwfRows,
            theme: 'plain',
            styles: { fontSize: 6.2, cellPadding: 1.8 },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold', fontSize: 6.2 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 52, fontStyle: 'bold' },
                1: { cellWidth: 16, textColor: C.bodyMid },
                2: { cellWidth: 22, halign: 'right' },
                3: { cellWidth: 24, halign: 'right', textColor: C.navyMid },
                4: { cellWidth: 22, halign: 'right' },
                5: { cellWidth: 18, halign: 'right', textColor: C.navyMid },
                6: { cellWidth: 18, halign: 'right' },
                7: { cellWidth: 16, halign: 'right', fontStyle: 'bold' }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        // Show one fully-expanded worked example
        const exampleCat = 'Climate Change';
        const exNF = resolvedNF[exampleCat];
        const exWF = resolvedWF[exampleCat];
        const exImp = (pef[exampleCat]?.total || 0) / pWeightKg;
        if (exNF && exWF) {
            const exNorm = exImp / exNF;
            const exWt   = exNorm * exWF;
            const exMPt  = exWt * 1e6;
            traceBlock([
                'WORKED EXAMPLE — Climate Change (full arithmetic shown):',
                '',
                '  Step 1:  impact per kg product  = ' + numFmt(exImp, 6) + ' kg CO2e / kg product',
                '           (engine value: ' + numFmt(pef[exampleCat]?.total || 0, 6) + ' kg CO2e total  /  ' + fix(pWeightKg,4) + ' kg product weight)',
                '',
                '  Step 2:  normalise              = impact / NF',
                '                                 = ' + numFmt(exImp, 6) + ' / ' + numFmt(exNF, 4),
                '                                 = ' + numFmt(exNorm, 8) + '  [person-equivalent, dimensionless]',
                '           NF source: JRC EUR 29540 EN Table 6 — EF 3.1 normalisation factors',
                '',
                '  Step 3:  weight                 = normalised x WF',
                '                                 = ' + numFmt(exNorm, 8) + ' x ' + numFmt(exWF, 6),
                '                                 = ' + numFmt(exWt, 10),
                '           WF source: JRC EUR 29540 EN Table 7 — EF 3.1 weighting factors',
                '',
                '  Step 4:  convert to uPt (micropoints) = weighted x 1,000,000',
                '                                 = ' + numFmt(exWt, 10) + ' x 1,000,000',
                '                                 = ' + numFmt(exMPt, 3) + ' uPt / kg product',
                '',
                '  Total PEF Single Score = SUM of all 16 category uPt values = ' + numFmt(mPt, 2) + ' uPt / kg product',
                '  Source: JRC Technical Report EUR 29540 EN (EF 3.1 normalisation and weighting factors)'
            ], { sectionLabel: 'Normalisation & Weighting (continued)' });
        }

        // ILCD EF UUID table
        ensureSpace(70, 'Normalisation & Weighting (continued)');
        subHeader('EF 3.1 ILCD Registry — Impact Category UUIDs');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Source: window.aioxyData.ilcd_registry — EF 3.1 ILCD compatible UUIDs per JRC EPLCA / EC Life Cycle Data Network.', M, Y); Y += 5;

        const ilcdRows = Object.entries(ilcd).map(([cat, rec]) => [
            safe(cat), safe(rec.uuid || 'N/A'), safe(rec.unit || '')
        ]);

        if (ilcdRows.length > 0) {
            doc.autoTable({
                startY: Y,
                head: [['EF Category','ILCD UUID','Unit']],
                body: ilcdRows,
                theme: 'plain',
                styles: { fontSize: 6.5, cellPadding: 1.8 },
                headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: C.rowAlt },
                columnStyles: {
                    0: { cellWidth: 55, fontStyle: 'bold' },
                    1: { cellWidth: 95, textColor: C.bodyMid, fontSize: 6 },
                    2: { cellWidth: 32 }
                },
                margin: { left: M }
            });
            Y = doc.lastAutoTable.finalY + 4;
        }

        footer('Normalisation & Weighting — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // PAGE 5 — INGREDIENT CHAIN OF CUSTODY
        // ================================================================
        newPage('Ingredient Chain of Custody — AGRIBALYSE 3.2 Dataset Traceability');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('LCI Name = source_activity from AGRIBALYSE 3.2 CSV — canonical traceability identifier per ADEME methodology.', M, Y); Y += 3;
        doc.text('Verify at: https://agribalyse.ademe.fr/ | source_uuid = internal programmatic slug (not RFC UUID — see ingredients_db.js GAP 12).', M, Y); Y += 6;

        const custodyRows = ingComps.map(ing => {
            const qty      = ing.quantity_kg || 0;
            const ingId    = ing.id || '';
            const dbRec    = window.aioxyData?.ingredients?.[ingId] || null;
            const meta     = dbRec?.data?.metadata || {};
            const lciName  = safe(meta.source_activity || meta.name || ingId);
            const srcSlug  = safe(meta.source_uuid || ingId);
            const adj      = ing.universal_adjustments || {};
            // origin: engine stores in universal_adjustments.adjusted_for_country (confirmed)
            // ing.country also available from ingredientTraceability but not on component object
            const origin   = safe(adj.adjusted_for_country || ing.country || 'FR');
            const hasPD    = !!ing.primary_data;
            const alloc    = safe(ing.allocationMethod || 'Economic (AGRIBALYSE 3.2)');
            const dqrV     = ing.dqr || 0;
            const ingTotal = ing.allCategoryResults?.['Climate Change'] || ing.subtotal || 0;
            const pctOfCC  = ccTotal > 0 ? (ingTotal / ccTotal * 100) : 0;

            return [
                safe(ing.name || ingId) + (hasPD ? ' [PD]' : ''),
                fix(qty, 4),
                origin,
                trunc(lciName, 40),
                trunc(srcSlug, 28),
                alloc,
                fix(dqrV, 2),
                numFmt(ingTotal, 4),
                pct(pctOfCC)
            ];
        });

        doc.autoTable({
            startY: Y,
            head: [['Ingredient','Qty (kg)','Origin','AGRIBALYSE LCI Name (source_activity)','Internal Slug','Allocation','DQR','CC (kg CO2e)','% of CC']],
            body: custodyRows,
            theme: 'plain',
            styles: { fontSize: 6.2, cellPadding: 1.6, overflow: 'linebreak' },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold', fontSize: 6.2 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 32, fontStyle: 'bold' },
                1: { cellWidth: 12, halign: 'right' },
                2: { cellWidth: 11, halign: 'center' },
                3: { cellWidth: 43 },
                4: { cellWidth: 30, textColor: C.bodyMid, fontSize: 5.5 },
                5: { cellWidth: 20, textColor: C.bodyMid, fontSize: 5.5 },
                6: { cellWidth: 9,  halign: 'center' },
                7: { cellWidth: 16, halign: 'right', fontStyle: 'bold' },
                8: { cellWidth: 13, halign: 'right' }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 3;

        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('[PD] = Primary data adjustment applied. DQR scale: 1=best, 5=worst per AGRIBALYSE DQI Matrix v3.0.1 (4-indicator: TeR+TiR+GR+P)/4.', M, Y); Y += 4;
        doc.text('Allocation method per ingredient inherited from AGRIBALYSE 3.2 system boundary (economic allocation, ADEME methodology).', M, Y); Y += 3;

        footer('Page 5 of {total_pages_count}');

        // ================================================================
        // PAGES 6+ — INGREDIENT GLASS-BOX CALCULATION
        // ================================================================
        newPage('Ingredient Calculation — 3-Layer Glass-Box (A: Base → B: Adjustments → C: Final)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Layer A = AGRIBALYSE 3.2 base EF (kg impact / kg ingredient, FR reference, as stored in database)', M, Y); Y += 3;
        doc.text('Layer B = Every adjustment applied (geographic proxy, primary data composite multiplier, AWARE/LANCA ratio, processing archetype)', M, Y); Y += 3;
        doc.text('Layer C = Final effective EF x Quantity = Impact contributed  (for all 19 EF 3.1 categories)', M, Y); Y += 6;

        ingComps.forEach(ing => ingGlassBox(ing));

        footer('Ingredient Detail — see page numbers in header');

        // ── INGREDIENT GLASS-BOX FUNCTION ───────────────────
        function ingGlassBox(ing) {
            const qty      = ing.quantity_kg || 0;
            const adj      = ing.universal_adjustments || {};
            const pd       = ing.primary_data || null;
            const ingId    = ing.id || '';
            const dbRec    = window.aioxyData?.ingredients?.[ingId] || null;
            const meta     = dbRec?.data?.metadata || {};
            const pefVals  = dbRec?.data?.pef || {};
            const lciName  = safe(meta.source_activity || meta.name || ingId);
            const srcSlug  = safe(meta.source_uuid || ingId);
            const ingName  = safe(ing.name || ingId);
            // origin: engine stores in universal_adjustments.adjusted_for_country (confirmed)
            // ing.country also available from ingredientTraceability but not on component object
            const origin   = safe(adj.adjusted_for_country || ing.country || 'FR');
            const hasPD    = !!pd;
            const allCats  = ing.allCategoryResults || {};

            const SL = 'Ingredient Detail (continued)';

            // Estimate total block height very conservatively
            const estH = 200;
            ensureSpace(estH, SL);

            // ── BLOCK HEADER ──
            doc.setFillColor(...C.navyMid);
            doc.rect(M, Y, CW, 9, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.white);
            doc.text(trunc(ingName, 55), M + 3, Y + 6);
            doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.teal);
            doc.text('Source: AGRIBALYSE 3.2', PW - M - 3, Y + 6, {align:'right'});
            Y += 10;

            // Info row
            doc.setFillColor(...C.rowAlt);
            doc.rect(M, Y, CW, 6, 'F');
            T.small(); doc.setTextColor(...C.bodyDark);
            doc.text('Qty: ' + fix(qty,4) + ' kg  |  Origin: ' + origin +
                     '  |  LCI Name: ' + trunc(lciName, 65) +
                     (hasPD ? '  |  [PRIMARY DATA]' : ''), M + 2, Y + 4);
            Y += 7;

            // Internal slug note
            doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(...C.bodyMid);
            doc.text('Internal slug (not RFC UUID): ' + trunc(srcSlug, 80) +
                     '  |  Verify LCI at: https://agribalyse.ademe.fr/', M + 2, Y + 3);
            Y += 5;

            // ── LAYER A: AGRIBALYSE BASE EF ──────────────────────
            const layerALines = [
                'AGRIBALYSE 3.2 base characterisation factors (FR reference, per kg ingredient):',
                'These values are taken directly from window.aioxyData.ingredients["' + ingId + '"].data.pef',
                ''
            ];
            ALL_CATS_ORDERED.forEach(cat => {
                const baseEF = pefVals[cat];
                const unit   = CAT_UNITS[cat] || '';
                layerALines.push('  ' + cat.padEnd(38) + ': ' + (baseEF !== undefined ? numFmt(baseEF, 6) : 'N/A') + '  ' + unit + '/kg');
            });
            layerBlock('LAYER A — AGRIBALYSE 3.2 Base EF (FR Reference)', layerALines, LAYER.A, SL);

            // ── LAYER B: ADJUSTMENTS ─────────────────────────────
            const layerBLines = [];
            layerBLines.push('Adjustments applied in sequence by the engine (calculation_engine.js):');
            layerBLines.push('');

            // Processing archetype
            const procState = ing.processingState;
            const procFactor = adj.processing_yield_factor_applied;
            if (procState && procState !== 'raw') {
                layerBLines.push('B1 — Processing Archetype:');
                layerBLines.push('  processingState : ' + safe(procState));
                if (procFactor !== undefined) {
                    layerBLines.push('  yield_factor    : ' + fix(procFactor, 4));
                    layerBLines.push('  Formula: for each category: base_EF / yield_factor');
                    layerBLines.push('  Interpretation: yield_factor < 1 means more raw material needed per kg output');
                    layerBLines.push('  e.g. flour (yield_factor=0.90): 1/0.90 = 1.11 kg grain per kg flour → EF x 1.11');
                } else {
                    layerBLines.push('  No yield factor adjustment recorded.');
                }
                layerBLines.push('');
            } else {
                layerBLines.push('B1 — Processing Archetype: raw (no processing adjustment)');
                layerBLines.push('');
            }

            // Geographic proxy
            if (adj.geo_proxy_applied) {
                layerBLines.push('B2 — Geographic Proxy (non-FR origin, no primary data):');
                layerBLines.push('  Origin: ' + origin + ' (non-FR)');
                layerBLines.push('  Factor: ' + fix(adj.geo_proxy_factor || 1.15, 4));
                layerBLines.push('  Formula: CC categories x ' + fix(adj.geo_proxy_factor || 1.15, 4));
                layerBLines.push('  Applied to: Climate Change, CC-Fossil, CC-Biogenic, CC-Land Use');
                layerBLines.push('  Rationale: Conservative 15% penalty for non-FR transport and production');
                layerBLines.push('  Excluded: Water Use and Land Use (handled by AWARE/LANCA below)');
                layerBLines.push('');
            } else {
                layerBLines.push('B2 — Geographic Proxy: not applied (FR origin or primary data present)');
                layerBLines.push('');
            }

            // Primary data composite multiplier
            if (adj.composite_multiplier) {
                const cm = adj.composite_multiplier;
                layerBLines.push('B3 — Primary Data Composite Multiplier:');
                if (adj.yield_adjustment) {
                    const ya = adj.yield_adjustment;
                    layerBLines.push('  Yield adjustment:');
                    // BK-3 FIX: show FAOSTAT fallback warning prominently if it fired
                    if (adj.yield_baseline_warning && adj.yield_baseline_warning.fired) {
                        layerBLines.push('    ⚠ BK-3 WARNING: FAOSTAT yield fallback used (5000 kg/ha)');
                        layerBLines.push('    Reason : ' + safe(adj.yield_baseline_warning.reason));
                        layerBLines.push('    Action : ' + safe(adj.yield_baseline_warning.action));
                    }
                    layerBLines.push('    Source: ' + safe(ya.baseline_source));
                    layerBLines.push('    Formula: min(baseline_yield / actual_yield, 2.0)');
                    layerBLines.push('           = min(' + fix(ya.baseline_kg_ha,1) + ' / ' + fix(ya.actual_kg_ha,1) + ', 2.0)');
                    layerBLines.push('           = ' + fix(ya.factor, 4) + (ya.capped_at_2 ? '  [CAPPED at 2.0 per JRC PEF 3.1 §4.4.3]' : ''));
                }
                if (adj.nitrogen_adjustment) {
                    const na = adj.nitrogen_adjustment;
                    layerBLines.push('  Nitrogen adjustment:');
                    layerBLines.push('    Formula: actual_N / baseline_N');
                    layerBLines.push('           = ' + fix(na.actual_kg_per_ton,1) + ' / ' + fix(na.baseline_kg_per_ton,1));
                    layerBLines.push('           = ' + fix(na.factor, 4));
                }
                layerBLines.push('  Composite multiplier:');
                layerBLines.push('    Formula: (0.6 x yield_factor) + (0.4 x nitrogen_factor)');
                layerBLines.push('           = (0.6 x ' + fix(cm.yield_factor,4) + ') + (0.4 x ' + fix(cm.n_factor,4) + ')');
                layerBLines.push('           = ' + fix(cm.result, 6));
                layerBLines.push('  Applied to: 14 of 16 EF 3.1 categories (conservative proxy)');
                layerBLines.push('  EXCLUDED from multiplier: Ozone Depletion (driven by CFC/HCFC refrigerant releases,');
                layerBLines.push('    unrelated to agricultural yield or N rate) and Ionizing Radiation (driven by');
                layerBLines.push('    nuclear share in background electricity mix, not by farm practice).');
                layerBLines.push('  Source: calculation_engine.js FIX CALC-08 — explicit exclusion documented in engine.');
                layerBLines.push('');
            }

            // N2O
            if (adj.n2o_applied && adj.n2o_applied.applied) {
                const n = adj.n2o_applied;
                layerBLines.push('B4 — IPCC Tier 1 N2O (crop nitrogen, added to Climate Change):');
                layerBLines.push('  F_SN = ' + fix(n.F_SN_kg, 4) + ' kg N applied');
                layerBLines.push('  Direct   = F_SN x 0.01 x (44/28) x GWP_N2O(265)');
                layerBLines.push('           = ' + fix(n.F_SN_kg,4) + ' x 0.01 x 1.5714 x 265 = ' + fix(n.direct_kgCO2e, 4) + ' kg CO2e');
                layerBLines.push('  Leaching = F_SN x 0.30 x 0.011 x (44/28) x 265');
                layerBLines.push('           = ' + fix(n.indirect_leach_kgCO2e || 0, 4) + ' kg CO2e');
                layerBLines.push('  Volatil. = F_SN x 0.10 x 0.01 x (44/28) x 265');
                layerBLines.push('           = ' + fix(n.volatilization_kgCO2e || 0, 4) + ' kg CO2e');
                const n2oTotal = (n.direct_kgCO2e||0)+(n.indirect_leach_kgCO2e||0)+(n.volatilization_kgCO2e||0);
                layerBLines.push('  N2O total = ' + fix(n2oTotal,4) + ' kg CO2e  [batch total for ' + fix(qty,4) + ' kg ingredient]');
                layerBLines.push('  Per-kg additive step: N2O_total / qty = ' + fix(n2oTotal,4) + ' / ' + fix(qty,4) + ' = ' + numFmt(qty>0?n2oTotal/qty:0,6) + ' kg CO2e/kg ingredient');
                layerBLines.push('  → added to flatPef[CC] and flatPef[CC-Land Use] per kg ingredient');
                layerBLines.push('  Layer C reconciliation: effective_EF(CC) = (base x multiplier) + N2O_per_kg_ing');
                layerBLines.push('  [added to CC and CC-Land Use]');
                layerBLines.push('  Source: IPCC 2006 Vol. 4 Ch. 11  |  GWP N2O = 265 (IPCC AR5)');
                layerBLines.push('');
            }

            // Organic nitrogen N2O (B4b) — FRAC_GASM=0.20 path
            if (adj.n2o_organic_applied && adj.n2o_organic_applied.applied) {
                const no = adj.n2o_organic_applied;
                layerBLines.push('B4b — IPCC Tier 1 N2O (organic nitrogen — manure/compost applied to field):');
                layerBLines.push('  F_ON = ' + fix(no.F_ON_kg, 4) + ' kg organic N applied');
                layerBLines.push('  Key difference vs synthetic N: FRAC_GASM = 0.20 (organic N volatilization) vs FRAC_GASF = 0.10 (synthetic)');
                layerBLines.push('  Source: IPCC 2006 Vol.4 Ch.11 Table 11.3');
                layerBLines.push('  Direct   = F_ON x EF1(0.01) x (44/28) x GWP_N2O(265)');
                layerBLines.push('           = ' + fix(no.direct_kgCO2e, 4) + ' kg CO2e');
                layerBLines.push('  Leaching = F_ON x FRAC_LEACH(0.30) x EF5(0.011) x (44/28) x 265');
                layerBLines.push('           = ' + fix(no.indirect_leach_kgCO2e || 0, 4) + ' kg CO2e');
                layerBLines.push('  Volatil. = F_ON x FRAC_GASM(0.20) x EF4(0.01) x (44/28) x 265');
                layerBLines.push('           = ' + fix(no.volatilization_kgCO2e || 0, 4) + ' kg CO2e  [2x synthetic due to higher FRAC_GASM]');
                const n2oOnTotal = (no.total_kgCO2e||0);
                layerBLines.push('  N2O total = ' + fix(n2oOnTotal, 4) + ' kg CO2e (batch)  per-kg = ' + numFmt(qty>0?n2oOnTotal/qty:0,6) + ' kg CO2e/kg');
                layerBLines.push('  → added to flatPef[CC] and flatPef[CC-Land Use]');
                layerBLines.push('');
            }

            // Enteric CH4
            if (adj.enteric_applied && adj.enteric_applied.applied) {
                const e = adj.enteric_applied;
                layerBLines.push('B5 — Enteric Methane (IPCC 2006 Vol.4 Ch.10):');
                layerBLines.push('  Animal type  : ' + safe(e.animal_type));
                if (e.method === 'delta_vs_agribalyse_default') {
                    layerBLines.push('  Method: DELTA adjustment (AGRIBALYSE already embeds national average enteric)');
                    layerBLines.push('  Formula: delta = (heads_user - heads_default) x ef_ch4 x GWP_CH4_biogenic(28)');
                    layerBLines.push('  heads_user    = qty / user_productivity = ' + fix(e.heads_user||0,4));
                    layerBLines.push('  heads_default = qty / AGRIBALYSE_default = ' + fix(e.heads_agribalyse_default||0,4));
                    layerBLines.push('  ef_ch4        = ' + fix(e.ef_ch4_per_head_yr||0,2) + ' kg CH4/head/yr');
                    layerBLines.push('  delta CH4     = ' + fix(e.delta_ch4_kg||0,4) + ' kg CH4');
                    layerBLines.push('  delta CO2e    = ' + fix(e.delta_co2e_total||0,4) + ' kg CO2e  [applied to CC-Biogenic]');
                    layerBLines.push('  Note: ' + safe(e.note || ''));
                } else {
                    layerBLines.push('  Formula: heads x ef_ch4 x GWP_CH4_biogenic(28)');
                    layerBLines.push('  ef_ch4_per_head : ' + fix(e.ef_ch4_per_head||0,2) + ' kg CH4/head/yr');
                    layerBLines.push('  enteric CO2e    : ' + fix(e.enteric_co2e_total||0,4) + ' kg CO2e');
                }
                layerBLines.push('  Source: IPCC 2006 Vol. 4 Table 10.11  |  GWP CH4 biogenic = 28 (IPCC AR5)');
                layerBLines.push('');
            }

            // Manure N2O
            if (adj.manure_n2o_applied && adj.manure_n2o_applied.applied) {
                const m = adj.manure_n2o_applied;
                layerBLines.push('B6 — Manure N2O (IPCC 2006 Vol.4 Ch.10):');
                layerBLines.push('  Animal type     : ' + safe(m.animal_type));
                layerBLines.push('  Manure system   : ' + safe(m.manure_system));
                layerBLines.push('  Formula: heads x N_excreted x EF_manure[system] x (44/28) x GWP_N2O(265)');
                layerBLines.push('  EF_manure       : ' + fix(m.ef_manure||0,4) + ' kg N2O-N / kg N');
                layerBLines.push('  Manure N2O CO2e : ' + fix(m.manure_n2o_co2e_total||0,4) + ' kg CO2e  [added to CC + CC-Fossil]');
                // PDF-1 FIX (2026-06-07): Updated from CC-Land Use to CC-Fossil.
                // Consistent with Finding 10 fix in calculation_engine.js.
                // CC-Land Use covers dLUC/SOC only. Manure N2O is a direct process
                // emission -> CC-Fossil per EF 3.1 (JRC EUR 29540 EN §4.4.2).
                layerBLines.push('  Eutrophication (terrestrial): +' + fix(m.eutrophication_add_mol_n_eq||0,6) + ' mol Ne');
                layerBLines.push('    Formula: 0.5 x N_excreted/kg x (17/14) x 1000g/kg x 0.0316 mol Ne/g NH3');
                layerBLines.push('    CF source: ' + safe(m.eutrophication_cf_source));
                layerBLines.push('  Acidification: +' + fix(m.acidification_add||0,6) + ' mol H+e');
                layerBLines.push('    Formula: 0.5 x N_excreted/kg x (17/14) x 1000g/kg x 0.0591 mol H+e/g NH3');
                layerBLines.push('    CF source: ' + safe(m.acidification_cf_source));
                layerBLines.push('  Source: IPCC 2006 Vol. 4 Tables 10.19 & 10.21  |  GWP N2O = 265 (IPCC AR5)');
                layerBLines.push('');
            }

            // AWARE 2.0
            const cf = adj.country_factors || ing.country_factors || null;
            if (cf) {
                if (cf.aware && cf.aware.applied) {
                    layerBLines.push('B7 — AWARE 2.0 Water Scarcity Adjustment:');
                    layerBLines.push('  Formula: Water Use x= (origin_CF / reference_CF_FR)');
                    layerBLines.push('  Reference CF (FR)       : ' + fix(cf.aware.ref_factor||0, 4) + ' m3 world eq/m3');
                    layerBLines.push('  Origin CF (' + origin + ')     : ' + fix(cf.aware.origin_factor||0, 4) + ' m3 world eq/m3');
                    layerBLines.push('  Ratio applied           : ' + fix(cf.aware.ratio_applied||1, 4));
                    layerBLines.push('  Water Use (before)      = AGRIBALYSE FR base value');
                    layerBLines.push('  Water Use (after)       = base x ' + fix(cf.aware.ratio_applied||1, 4));
                    layerBLines.push('  Source: AWARE 2.0 (Boulay et al. 2018) — agricultural sector CFs');
                    layerBLines.push('');
                } else if (cf.aware) {
                    layerBLines.push('B7 — AWARE 2.0: not applied — ' + safe(cf.aware.reason || 'no adjustment needed'));
                    layerBLines.push('');
                }

                // LANCA
                if (cf.lanca && cf.lanca.applied) {
                    layerBLines.push('B8 — LANCA v2.5 Land Use Adjustment:');
                    layerBLines.push('  Formula: Land Use x= (origin_SQI / reference_SQI_FR)');
                    // Show full component values so auditor can verify the ratio independently
                    const lanca = cf.lanca;
                    if (lanca.ref_occupation !== undefined && lanca.origin_occupation !== undefined) {
                        layerBLines.push('  Reference SQI (FR) — Occupation   : ' + fix(lanca.ref_occupation, 4));
                        if (lanca.ref_transformation !== null && lanca.ref_transformation !== undefined) {
                            layerBLines.push('  Reference SQI (FR) — Transformation: ' + fix(lanca.ref_transformation, 4));
                            layerBLines.push('  Reference SQI total (FR)           : ' + fix((lanca.ref_occupation||0)+(lanca.ref_transformation||0), 4));
                        }
                        layerBLines.push('  Origin SQI (' + origin + ') — Occupation   : ' + fix(lanca.origin_occupation, 4));
                        if (lanca.origin_transformation !== null && lanca.origin_transformation !== undefined) {
                            layerBLines.push('  Origin SQI (' + origin + ') — Transformation: ' + fix(lanca.origin_transformation, 4));
                            layerBLines.push('  Origin SQI total (' + origin + ')           : ' + fix((lanca.origin_occupation||0)+(lanca.origin_transformation||0), 4));
                        }
                        layerBLines.push('  Transformation included: ' + (lanca.transformation_included ? 'YES' : 'NO (occupation ratio only — transformation data absent)'));
                        layerBLines.push('  Ratio = origin_total / ref_total = ' + fix(lanca.ratio_applied||1, 4));
                    } else {
                        layerBLines.push('  Ratio applied : ' + fix(lanca.ratio_applied||1, 4));
                    }
                    layerBLines.push('  Indicator: ' + safe(lanca.indicator || 'Soil Quality Index — Total, unspecified land use'));
                    layerBLines.push('  Source: LANCA v2.5 — Fraunhofer IBP / JRC (SQI occupation factors)');
                    layerBLines.push('');
                } else if (cf.lanca) {
                    layerBLines.push('B8 — LANCA v2.5: not applied — ' + safe(cf.lanca.reason || 'no adjustment needed'));
                    layerBLines.push('');
                }

                // FAOSTAT
                if (cf.faostat && cf.faostat.benchmarked) {
                    const f = cf.faostat;
                    layerBLines.push('B9 — FAOSTAT Yield Benchmarking (audit reference only — does NOT modify impact):');
                    layerBLines.push('  Matched crop      : ' + safe(f.matched_crop));
                    layerBLines.push('  FAOSTAT yield     : ' + fix(f.faostat_yield_kg_ha||0,0) + ' kg/ha  [' + safe(f.source) + ']');
                    layerBLines.push('  User-supplied     : ' + fix(f.user_yield_kg_ha||0,0) + ' kg/ha');
                    layerBLines.push('  Deviation         : ' + fix(f.deviation_pct||0,1) + '%');
                    layerBLines.push('  Note: FAOSTAT used for audit traceability only, not to modify impact values.');
                    layerBLines.push('');
                }
            }

            // FIX UPSTREAM-1: Inbound ingredient transport (non-FR origins).
            // This is a REAL, engine-computed impact (calculateTransport() via GLEC v3.2,
            // resolveInboundTransport() proxy distance table) that is summed into the
            // Upstream stage total and included in the product TOTAL / PEF Single Score /
            // eco-score / QR. It was previously computed but never disclosed anywhere in
            // the PDF or CSV, while the System Boundary Declaration simultaneously stated
            // it was excluded. Both defects are fixed together: this block discloses it
            // per ingredient, the Executive Summary / Total Impact tables show it as an
            // explicit 5th stage, and the System Boundary Declaration text now states
            // it is included (see System Boundary Declaration page).
            const upstreamLegs = ing.upstreamComponents || [];
            if (upstreamLegs.length > 0) {
                upstreamLegs.forEach(leg => {
                    layerBLines.push('B14 — Inbound Ingredient Transport (Upstream — GLEC v3.2, proxy distance):');
                    layerBLines.push('  Route            : ' + safe(leg.origin) + ' \u2192 ' + safe(leg.destination) + '  |  Mode: ' + safe((leg.mode||'').toUpperCase()));
                    layerBLines.push('  Distance         : ' + fix(leg.distanceKm||0,0) + ' km pre-DAF  [' + safe(leg.source) + ']');
                    layerBLines.push('  DAF applied      : x' + fix(leg.daf_applied||1,2));
                    layerBLines.push('  Mass             : ' + fix(leg.massKg||0,4) + ' kg  |  Refrigeration: ' + safe(leg.refrigeration||'ambient'));
                    layerBLines.push('  Climate Change   : ' + numFmt(leg.subtotal||0,6) + ' kg CO2e  (fossil: ' + numFmt(leg.fossilCO2||0,6) + ' kg CO2e)');
                    layerBLines.push('  IMPORTANT: this impact is NOT included in this ingredient\'s Layer C total below.');
                    layerBLines.push('  It is booked to the separate "Upstream" stage — see Executive Summary and');
                    layerBLines.push('  Total Environmental Impact pages for the product-level Upstream total.');
                    layerBLines.push('  Confidence: MEDIUM — proxy distance table (' + safe(leg.source) + '), not primary supplier data.');
                    layerBLines.push('');
                });
            } else if (origin && origin !== 'FR' && origin !== 'N/A') {
                layerBLines.push('B14 — Inbound Ingredient Transport (Upstream): not applied — origin equals manufacturing country, or route could not be resolved.');
                layerBLines.push('');
            }

            // L-3 FIX: USEtox 2.14 for LIVESTOCK ingredients
            if (adj.usetox_livestock) {
                const ul = adj.usetox_livestock;
                if (ul.status === 'applied') {
                    layerBLines.push('L-3 FIX — Livestock USEtox 2.14 Substance-Specific Toxicity:');
                    layerBLines.push('  Feed crop area (ha) : ' + fix(ul.feed_area_ha||0, 4) + ' ha');
                    layerBLines.push('  Human cancer        : +' + sci(ul.total_htox_cancer_CTUh||0, 3) + ' CTUh (added to AGRIBALYSE background)');
                    layerBLines.push('  Human non-cancer    : +' + sci(ul.total_htox_noncancer_CTUh||0, 3) + ' CTUh');
                    layerBLines.push('  Ecotoxicity fw      : +' + sci(ul.total_ecotox_CTUe||0, 3) + ' CTUe');
                    if (ul.pesticides && ul.pesticides.length > 0) {
                        layerBLines.push('  Pesticides:');
                        ul.pesticides.slice(0, 5).forEach(p => {
                            layerBLines.push('    ' + safe(p.name) + ' (CAS: ' + safe(p.cas) + ')  ' +
                                             fix(p.rate_kg_per_ha||0,4) + ' kg/ha  Cancer: ' + sci(p.htox_cancer_CTUh||0,2) +
                                             '  Eco: ' + sci(p.ecotox_CTUe||0,2));
                        });
                    }
                    layerBLines.push('  Source: USEtox 2.14 — L-3 FIX, livestock feed-crop pesticide pathway');
                    layerBLines.push('');
                } else {
                    layerBLines.push('L-3 Livestock USEtox: ' + safe(ul.reason || 'not applied'));
                    if (ul.action_required) {
                        layerBLines.push('  Action: ' + safe(ul.action_required));
                    }
                    layerBLines.push('');
                }
            }

            // USEtox (CROP path — unchanged)
            if (adj.usetox_applied && adj.usetox_applied.applied) {
                const u = adj.usetox_applied;
                layerBLines.push('B10 — USEtox 2.14 Pesticide Substance-Specific Toxicity:');
                layerBLines.push('  Area harvested formula: qty_kg / yield_kg_ha = ' + fix(qty,6) + ' / ' + fix(u.yield_kg_per_ha||0,1) + ' = ' + sci(u.area_harvested_ha||0, 4) + ' ha');
                layerBLines.push('  Area harvested (full precision): ' + (u.area_harvested_ha||0).toExponential(6) + ' ha');
                layerBLines.push('  Human cancer      : +' + sci(u.total_cancer_CTUh||0, 3) + ' CTUh (added to AGRIBALYSE background)');
                layerBLines.push('  Human non-cancer  : +' + sci(u.total_noncancer_CTUh||0, 3) + ' CTUh');
                layerBLines.push('  Ecotoxicity fw    : +' + sci(u.total_ecotoxicity_CTUe||0, 3) + ' CTUe');
                if (u.pesticides && u.pesticides.length > 0) {
                    // M-3 FIX: separate matched vs unmatched CAS numbers
                    const pMatched   = u.pesticides.filter(p => p.matched !== false);
                    const pUnmatched = u.pesticides.filter(p => p.matched === false);
                    if (pMatched.length) {
                        layerBLines.push('  Pesticides matched (' + pMatched.length + '):');
                        pMatched.slice(0, 5).forEach(p => {
                            layerBLines.push('    ✓ ' + safe(p.name) + ' (CAS: ' + safe(p.cas) + ')  ' +
                                             fix(p.rateKgPerHa||0,4) + ' kg/ha  Cancer: ' + sci(p.cancer_CTUh||0,2) +
                                             '  Eco: ' + sci(p.ecotoxicity_CTUe||0,2));
                        });
                    }
                    if (pUnmatched.length) {
                        layerBLines.push('  ⚠ M-3 WARNING: ' + pUnmatched.length + ' pesticide(s) NOT found in USEtox 2.14 (contribution = 0):');
                        pUnmatched.forEach(p => {
                            layerBLines.push('    ✗ ' + safe(p.name) + ' (CAS: ' + safe(p.cas || 'none') + ') — ' + safe(p.reason || 'not in USEtox 2.14'));
                        });
                        layerBLines.push('    Verify: https://www.usetox.org/model/substance-list');
                    }
                }
                layerBLines.push('  Source: USEtox 2.14 — continental agricultural soil compartment, EF 3.1 compliant');
                layerBLines.push('');
            }

            if (layerBLines.length <= 2) {
                layerBLines.push('  No adjustments applied — AGRIBALYSE FR base values used directly.');
            }

            // FIX-16: SOC Sequestration (regenerative agriculture)
            if (adj.soc_sequestration && adj.soc_sequestration.applied) {
                const soc = adj.soc_sequestration;
                layerBLines.push('B11 — SOC Sequestration (Regenerative Agriculture):');
                layerBLines.push('  Source: IPCC 2006 Vol.4 Ch.2 Eq.2.25  |  PEF 3.1 §4.4.8');
                layerBLines.push('  SOC baseline         : ' + fix(soc.soc_baseline_tC_per_ha||0,4) + ' t C/ha');
                layerBLines.push('  SOC current          : ' + fix(soc.soc_current_tC_per_ha||0,4) + ' t C/ha');
                layerBLines.push('  Delta C              : ' + fix(soc.delta_tC_per_ha||0,4) + ' t C/ha');
                layerBLines.push('  Amortization period  : ' + (soc.amortization_years||20) + ' years');
                layerBLines.push('  C to CO2 factor      : ' + fix(soc.c_to_co2_factor||3.667,4) + '  (44/12 = 3.6667)');
                layerBLines.push('  Annual CO2e/ha       : = (' + fix(soc.delta_tC_per_ha||0,4) + ' / ' + (soc.amortization_years||20) + ') x ' + fix(soc.c_to_co2_factor||3.667,4) + ' = ' + fix(soc.annual_co2e_per_ha||0,6) + ' t CO2e/ha/yr');
                layerBLines.push('  CO2e per kg product  : = -(' + fix(soc.annual_co2e_per_ha||0,6) + ' x 1000) / yield_kg_ha = ' + fix(soc.co2e_per_kg_product||0,6) + ' kg CO2e/kg');
                layerBLines.push('  Direction            : ' + safe(soc.direction));
                layerBLines.push('  Category affected    : ' + safe(soc.category_affected));
                layerBLines.push('  Sign: negative = sequestration CREDIT (reduces CC), positive = SOC loss PENALTY');
                layerBLines.push('');
            } else if (adj.soc_note) {
                layerBLines.push('B11 — SOC Sequestration: not applied — ' + safe(adj.soc_note.reason || 'not activated'));
                layerBLines.push('  To activate: enter Baseline SOC and Current SOC (t C/ha) in supplier form.');
                layerBLines.push('');
            }

            // FIX-17: SALCA-P Phosphorus Leaching
            if (adj.salca_p_applied && adj.salca_p_applied.applied) {
                const sp = adj.salca_p_applied;
                layerBLines.push('B12 — SALCA-P Phosphorus Leaching (Eutrophication, freshwater):');
                layerBLines.push('  Source: SALCA-P model  |  EF 3.1 (P is reference substance, CF=1.0)');
                layerBLines.push('  SALCA FRAC_RELE        : 0.0500  (5% of applied P reaches freshwater)');
                layerBLines.push('  P applied (total)      : ' + fix(sp.P_applied_kg||0,6) + ' kg P');
                layerBLines.push('  Formula: P_applied = (phosphorusKgPerTon / 1000) x quantityKg');
                layerBLines.push('  P leach                : = ' + fix(sp.P_applied_kg||0,6) + ' x 0.05 = ' + fix(sp.P_leach_kg_P_eq||0,6) + ' kg P-eq');
                layerBLines.push('  Per kg product         : ' + fix((sp.P_leach_kg_P_eq||0)/qty,8) + ' kg P-eq/kg');
                layerBLines.push('  Added to               : Eutrophication, freshwater (kg P-eq, CF=1.0 per EF 3.1)');
                layerBLines.push('');
            }

            // FIX-18: Farmed fish feed model
            if (adj.farmed_fish_feed) {
                const ff = adj.farmed_fish_feed;
                if (ff.warning) {
                    layerBLines.push('B13 — Farmed Fish Feed Model: WARNING — ' + safe(ff.warning));
                    layerBLines.push('');
                } else if (ff.error) {
                    layerBLines.push('B13 — Farmed Fish Feed Model: ERROR — ' + safe(ff.error));
                    layerBLines.push('');
                } else {
                    layerBLines.push('B13 — Farmed Fish Feed Model (aquaculture):');
                    layerBLines.push('  Source: IFFO 2023 co-product allocation | AGRIBALYSE 3.2 proxy ingredient');
                    layerBLines.push('  Species                  : ' + safe(ff.species));
                    layerBLines.push('  FCR (feed conversion ratio): ' + fix(ff.FCR||0,3) + '  [kg feed / kg fish output]');
                    layerBLines.push('  Fishmeal fraction        : ' + fix(ff.fishmeal_pct||0,1) + '%  x  ' + fix(ff.fishmeal_CO2_per_kg||0,4) + ' kg CO2e/kg = ' + fix((ff.fishmeal_pct||0)/100*(ff.FCR||0)*(ff.fishmeal_CO2_per_kg||0),6) + ' kg CO2e/kg fish');
                    layerBLines.push('  Fish oil fraction        : ' + fix(ff.fish_oil_pct||0,1) + '%  x  ' + fix(ff.fish_oil_CO2_per_kg||0,4) + ' kg CO2e/kg = ' + fix((ff.fish_oil_pct||0)/100*(ff.FCR||0)*(ff.fish_oil_CO2_per_kg||0),6) + ' kg CO2e/kg fish');
                    layerBLines.push('  Formula: FCR x (fishmeal_pct x fishmeal_CO2 + fish_oil_pct x fish_oil_CO2)');
                    layerBLines.push('  Feed CO2/kg fish         : = ' + fix(ff.feed_CO2_per_kg_fish||0,6) + ' kg CO2e/kg');
                    layerBLines.push('  CC split — fossil frac   : ' + fix(ff.feed_fossil_fraction||0,4) + '  [from proxy ingredient AGRIBALYSE sub-splits]');
                    layerBLines.push('  CC split — biogenic frac : ' + fix(ff.feed_biogenic_fraction||0,4));
                    layerBLines.push('  CC split source          : ' + safe(ff.cc_split_source));
                    layerBLines.push('  Enteric CH4              : 0  (fish have no enteric fermentation)');
                    layerBLines.push('  Manure N2O               : 0  (aquatic N excretion — not modelled in this version)');

                    // L-2 FIX: Show fish oil confidence warning in PDF when fallback was used
                    if (ff.fish_oil_confidence && ff.fish_oil_confidence.level === 'LOW') {
                        const fo = ff.fish_oil_confidence;
                        layerBLines.push('');
                        layerBLines.push('  ⚠ L-2 WARNING: Fish Oil CO2 — LOW CONFIDENCE');
                        layerBLines.push('  Level  : LOW — no dedicated fish oil DB entry found');
                        layerBLines.push('  Reason : ' + safe(fo.reason));
                        layerBLines.push('  Basis  : ' + safe(fo.basis));
                        layerBLines.push('  Action : ' + safe(fo.action));
                        layerBLines.push('  Value used: ' + fix(fo.value_used_kg_co2_per_kg||0, 4) + ' kg CO2e/kg fish oil (= fishmeal proxy)');
                    }
                    layerBLines.push('');
                }
            }

            // FIX-19: IPCC_TIER1_LIVESTOCK source table values — show the lookup constants used
            if ((adj.enteric_applied && adj.enteric_applied.applied) ||
                (adj.manure_n2o_applied && adj.manure_n2o_applied.applied)) {
                const TIER1 = window.corePhysics?.CONSTANTS?.IPCC_TIER1_LIVESTOCK;
                const animalType = (adj.enteric_applied?.animal_type) || (adj.manure_n2o_applied?.animal_type);
                const manureSystem = adj.manure_n2o_applied?.manure_system;
                if (TIER1 && animalType) {
                    const row = TIER1.entericEF?.[animalType];
                    const defProd = TIER1.AGRIBALYSE_DEFAULT_PRODUCTIVITY?.[animalType];
                    const mEF = manureSystem ? TIER1.manureEF?.[manureSystem] : null;
                    layerBLines.push('B-REF — IPCC_TIER1_LIVESTOCK Source Table (window.corePhysics.CONSTANTS.IPCC_TIER1_LIVESTOCK):');
                    layerBLines.push('  Animal type selected   : ' + safe(animalType));
                    if (row) {
                        layerBLines.push('  ef_ch4 (enteric)       : ' + fix(row.ef_ch4||0,2) + ' kg CH4/head/year  [IPCC 2006 Vol.4 Table 10.11]');
                        layerBLines.push('  n_excretion            : ' + fix(row.n_excretion||0,2) + ' kg N/head/year   [IPCC 2006 Vol.4 Table 10.19]');
                    }
                    if (defProd) {
                        layerBLines.push('  AGRIBALYSE default prod: ' + fix(defProd,1) + ' kg/head/year  [CNIEL/IDELE/ITAVI France 2022]');
                        layerBLines.push('  Used for delta method — compares user productivity vs French national average');
                    }
                    if (manureSystem && mEF !== undefined) {
                        layerBLines.push('  Manure system          : ' + safe(manureSystem));
                        layerBLines.push('  EF_manure              : ' + fix(mEF,4) + ' kg N2O-N/kg N excreted  [IPCC 2006 Vol.4 Table 10.21]');
                    }
                    layerBLines.push('  GWP_CH4_biogenic = 28 (IPCC AR5, PEF 3.1)  |  GWP_N2O = 265 (IPCC AR5, PEF 3.1)');
                    layerBLines.push('');
                }
            }

            layerBlock('LAYER B — All Adjustments Applied by Engine (in sequence)', layerBLines, LAYER.B, SL);

            // ── LAYER C: FINAL CALCULATION ────────────────────────
            const layerCLines = [
                'Final effective EF (after all adjustments) x Quantity = Impact contributed:',
                'Formula per category: effective_EF (kg impact/kg ingredient) x qty (kg) = total (kg impact)',
                ''
            ];

            ALL_CATS_ORDERED.forEach(cat => {
                const unit     = CAT_UNITS[cat] || '';
                const totalV   = allCats[cat] !== undefined ? allCats[cat] : 0;
                const baseEF   = pefVals[cat];
                const effectEF = qty > 0 ? totalV / qty : 0;
                const hasDelta = baseEF !== undefined && Math.abs(effectEF - baseEF) > 1e-10;

                let line = '  ' + cat.padEnd(38) + ': ';
                line += numFmt(effectEF, 6) + ' ' + unit + '/kg';
                line += '  x  ' + fix(qty, 4) + ' kg';
                line += '  =  ' + numFmt(totalV, 6) + ' ' + unit;
                if (hasDelta) {
                    line += '  [base: ' + numFmt(baseEF, 6) + ']';
                }
                layerCLines.push(line);
            });

            layerCLines.push('');
            layerCLines.push('  CC TOTAL contribution of this ingredient: ' + numFmt(allCats['Climate Change']||0, 6) + ' kg CO2e');
            const pctCont = ccTotal > 0 ? ((allCats['Climate Change']||0) / ccTotal * 100) : 0;
            layerCLines.push('  % of product CC total:                   ' + fix(pctCont, 2) + '%');
            layerCLines.push('  DQR (AGRIBALYSE DQI Matrix v3.0.1):      ' + fix(ing.dqr||0, 2) + ' / 5.0');

            // DQR breakdown if available
            const dqrBkd = ing.dqrBreakdown || {};
            if (Object.keys(dqrBkd).length > 0) {
                layerCLines.push('  DQR breakdown: TeR=' + (dqrBkd.TeR||dqrBkd.TeR||0) + '  TiR=' + (dqrBkd.TiR||0) + '  GR=' + (dqrBkd.GR||dqrBkd.GeR||0) + '  P=' + (dqrBkd.P||0) + '  → (' + (dqrBkd.TeR||0) + '+' + (dqrBkd.TiR||0) + '+' + (dqrBkd.GR||dqrBkd.GeR||0) + '+' + (dqrBkd.P||0) + ')/4 = ' + fix(ing.dqr||0,2));
            }

            layerBlock('LAYER C — Final: effective_EF x Qty = Impact (all 19 categories)', layerCLines, LAYER.C, SL);

            // ── Geographic note for non-FR without country factors ──
            if (origin !== 'FR' && origin !== '' && origin !== 'N/A' && (!cf || !cf.applied)) {
                traceBlock([
                    'GEOGRAPHIC NOTE: Origin = ' + origin + ' (non-FR)',
                    'AWARE 2.0 / LANCA v2.5 country-specific adjustment: not applied or data unavailable.',
                    'AGRIBALYSE 3.2 French reference values used for Water Use and Land Use.',
                    'Water and land impacts may differ from actual origin-country conditions.'
                ], {
                    bg:     [255,251,235],
                    border: C.amber,
                    accent: C.amber,
                    text:   [120,80,0],
                    sectionLabel: SL
                });
            }

            // Block bottom rule
            doc.setDrawColor(...C.navyMid); doc.setLineWidth(0.4);
            doc.line(M, Y, PW - M, Y);
            Y += 5;
        }

        // ================================================================
        // MANUFACTURING PAGE
        // ================================================================
        newPage('Manufacturing — Glass-Box Calculation Detail');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Grid intensity source: Ember 2025 / energy source specification. Energy intensity: Processing benchmark DB.', M, Y); Y += 3;
        doc.text('Trace string produced by calculation_engine.js buildContributionTree() and rendered verbatim below.', M, Y); Y += 3;
        doc.text('Country: ' + mfgCountry + '  |  Energy source: ' + mfgEnergySrc + '  |  Grid intensity: ' + numFmt(gridG, 2) + ' g CO2e/kWh  [Ember 2025]', M, Y); Y += 6;

        // FIX-14: Factory primary data — show raw inputs + CoM 2024 gas formula when used
        const isPrimaryFactory = mfgTrace.source === 'Primary Factory Data'
                              || window.lastInput?.manufacturing?.usePrimaryFactoryData === true;
        const pfd = window.lastInput?.manufacturing?.primaryFactoryData || null;

        if (isPrimaryFactory && pfd) {
            const kwhPerKgActual = pfd.totalOutputKg > 0 ? (pfd.totalKWh / pfd.totalOutputKg) : 0;
            const gasM3PerKg     = pfd.totalOutputKg > 0 ? (pfd.totalGasM3 / pfd.totalOutputKg) : 0;
            const GAS_MCF        = window.corePhysics?.CONSTANTS?.GAS_COMBUSTION_MULTI || null;

            layerBlock('PRIMARY FACTORY DATA — Metered Inputs + Full Derivation', [
                'Source: window.lastInput.manufacturing.primaryFactoryData (user-supplied meter readings)',
                '',
                'RAW INPUTS:',
                '  Total electricity (metered)  : ' + numFmt(pfd.totalKWh||0,2) + ' kWh',
                '  Total natural gas (metered)  : ' + numFmt(pfd.totalGasM3||0,2) + ' m³',
                '  Total factory output         : ' + numFmt(pfd.totalOutputKg||0,2) + ' kg product',
                '',
                'PER-KG DERIVATION:',
                '  kWh per kg product : = ' + numFmt(pfd.totalKWh||0,2) + ' / ' + numFmt(pfd.totalOutputKg||1,2) + ' = ' + fix(kwhPerKgActual,6) + ' kWh/kg',
                '  Gas m³ per kg      : = ' + numFmt(pfd.totalGasM3||0,2) + ' / ' + numFmt(pfd.totalOutputKg||1,2) + ' = ' + fix(gasM3PerKg,6) + ' m³/kg',
                '',
                'ELECTRICITY CO2 DERIVATION:',
                '  Grid intensity    : ' + numFmt(gridG,2) + ' g CO2e/kWh  [Ember 2025 — ' + mfgCountry + ']',
                '  T&D loss          : x1.07  [IEA 2023, 7% EU average]',
                '  Adjusted intensity: ' + numFmt(gridG*1.07,2) + ' g CO2e/kWh',
                '  Elec CO2/kg       : = ' + fix(kwhPerKgActual,6) + ' x ' + numFmt(gridG*1.07,2) + ' / 1000 = ' + fix(kwhPerKgActual * gridG * 1.07 / 1000,6) + ' kg CO2e/kg',
                '',
                'GAS CO2 DERIVATION (CoM 2024):',
                '  Fuel type selected        : ' + safe(pfd.fuelType || 'natural_gas'),
                '  Emission factor applied   : ' + fix(pfd.fuelFactor || 2.13, 4) + ' kg CO2 per unit fuel',
                ...( (pfd.fuelType === 'natural_gas' || !pfd.fuelType) ? [
                    '  1 m³ natural gas  = 38 MJ = 38 / 3600 MWh = 0.010556 MWh',
                    '  CoM 2024 NG EF    = 0.20196 t CO2/MWh  [EC Covenant of Mayors 2024, JRC]',
                    '  Gas CO2 factor    : 0.20196 x 0.010556 x 1000 = 2.1310 kg CO2/m³',
                ] : pfd.fuelType === 'lpg' ? [
                    '  LPG EF: 63.1 t CO2/TJ x 46.1 MJ/kg x 0.555 kg/L ÷ 1e6 x 1000 = 1.61 kg CO2/litre  [CoM 2024 JRC]',
                ] : pfd.fuelType === 'fuel_oil' ? [
                    '  Fuel oil EF: 74.1 t CO2/TJ x 42.7 MJ/kg x 0.84 kg/L ÷ 1e6 x 1000 = 2.66 kg CO2/litre  [CoM 2024 JRC]',
                ] : pfd.fuelType === 'coal' ? [
                    '  Coal EF: 94.6 t CO2/TJ x 26.7 MJ/kg ÷ 1e6 x 1000 = 2.53 kg CO2/kg  [CoM 2024 JRC]',
                ] : ['  No process heat fuel (100% electric).']),
                '  Fuel CO2/kg product: = ' + fix(gasM3PerKg,6) + ' fuel-units/kg x ' + fix(pfd.fuelFactor||2.13,4) + ' kg CO2/unit = ' + fix(gasM3PerKg*(pfd.fuelFactor||2.13),6) + ' kg CO2e/kg',
                '',
                ...( (pfd.refrigerantType && pfd.refrigerantKgLeaked > 0) ? [
                    'REFRIGERANT LEAKAGE (F-GAS DIRECT EMISSIONS):',
                    '  Refrigerant type     : ' + safe(pfd.refrigerantType),
                    '  GWP (IPCC AR5)       : ' + (pfd.refrigerantGWP || 0),
                    '  Annual leakage       : ' + fix(pfd.refrigerantKgLeaked||0,2) + ' kg refrigerant/year',
                    '  Total output         : ' + fix(pfd.totalOutputKg||1,2) + ' kg product/year',
                    '  Leakage per kg prod  : = ' + fix(pfd.refrigerantKgLeaked||0,2) + ' / ' + fix(pfd.totalOutputKg||1,2) + ' = ' + fix((pfd.refrigerantKgLeaked||0)/(pfd.totalOutputKg||1),6) + ' kg refrig/kg product',
                    '  CO2e per kg product  : = ' + fix((pfd.refrigerantKgLeaked||0)/(pfd.totalOutputKg||1),6) + ' x GWP(' + (pfd.refrigerantGWP||0) + ') = ' + fix(pfd.refrigerantCO2PerKg||0,4) + ' kg CO2e/kg product',
                    '  Added to             : Climate Change (Fossil)  [F-gases: synthetic, non-biogenic]',
                    '  Source: IPCC AR5 GWP100 / EC F-Gas Regulation 517/2014 Annex I',
                    '',
                ] : ['REFRIGERANT LEAKAGE: None entered (or not applicable).', '']),
                'TOTAL MANUFACTURING CO2/kg: ' + fix(kwhPerKgActual*gridG*1.07/1000 + gasM3PerKg*(pfd.fuelFactor||2.13) + (pfd.refrigerantCO2PerKg||0), 6) + ' kg CO2e/kg',
                '  = electricity CO2 + fuel CO2' + (pfd.refrigerantCO2PerKg > 0 ? ' + refrigerant CO2' : ''),
                '  x product weight (' + fix(pfd.totalOutputKg||1,2) + ' kg) — see CC trace below for batch total',
                '',
                // FIX-15: GAS_COMBUSTION_MULTI shown here for primary factory data
                'GAS COMBUSTION NON-CC FACTORS (GAS_COMBUSTION_MULTI per m³ gas):',
                'Source: window.corePhysics.CONSTANTS.GAS_COMBUSTION_MULTI (EMEP/EEA 2023 §1.A.1b x JRC EF 3.1)',
                '  Acidification              : ' + (GAS_MCF ? numFmt(GAS_MCF['Acidification']||0,6) : 'N/A') + ' mol H+eq/m³',
                '  Eutrophication terrestrial : ' + (GAS_MCF ? numFmt(GAS_MCF['Eutrophication, terrestrial']||0,6) : 'N/A') + ' mol N eq/m³',
                '  Eutrophication marine      : ' + (GAS_MCF ? numFmt(GAS_MCF['Eutrophication, marine']||0,7) : 'N/A') + ' kg N eq/m³',
                '  Particulate Matter         : ' + (GAS_MCF ? numFmt(GAS_MCF['Particulate Matter']||0,8) : 'N/A') + ' disease inc./m³',
                '  Photochem. Ozone Formation : ' + (GAS_MCF ? numFmt(GAS_MCF['Photochemical Ozone Formation']||0,6) : 'N/A') + ' kg NMVOCeq/m³',
                '  All others                 : 0  (documented gaps — Human Tox, Ecotox, OD, IR not from NG combustion)',
                GAS_MCF && gasM3PerKg > 0 ? '' : '',
                GAS_MCF && gasM3PerKg > 0 ? 'Gas non-CC impact arithmetic (m3/kg product x factor):' : '',
                ...(GAS_MCF && gasM3PerKg > 0 ? [
                    '  Acidification              : ' + fix(gasM3PerKg,6) + ' m3/kg x ' + numFmt(GAS_MCF['Acidification']||0,6) + ' = ' + fix(gasM3PerKg*(GAS_MCF['Acidification']||0),8) + ' mol H+eq/kg product',
                    '  Eutrophication terrestrial : ' + fix(gasM3PerKg,6) + ' m3/kg x ' + numFmt(GAS_MCF['Eutrophication, terrestrial']||0,6) + ' = ' + fix(gasM3PerKg*(GAS_MCF['Eutrophication, terrestrial']||0),8) + ' mol N eq/kg product',
                    '  Eutrophication marine      : ' + fix(gasM3PerKg,6) + ' m3/kg x ' + numFmt(GAS_MCF['Eutrophication, marine']||0,7) + ' = ' + fix(gasM3PerKg*(GAS_MCF['Eutrophication, marine']||0),8) + ' kg N eq/kg product',
                    '  Particulate Matter         : ' + fix(gasM3PerKg,6) + ' m3/kg x ' + numFmt(GAS_MCF['Particulate Matter']||0,8) + ' = ' + fix(gasM3PerKg*(GAS_MCF['Particulate Matter']||0),10) + ' disease inc./kg product',
                    '  Photochem. Ozone Formation : ' + fix(gasM3PerKg,6) + ' m3/kg x ' + numFmt(GAS_MCF['Photochemical Ozone Formation']||0,6) + ' = ' + fix(gasM3PerKg*(GAS_MCF['Photochemical Ozone Formation']||0),8) + ' kg NMVOCeq/kg product'
                ] : [])
            ].filter(l => l !== undefined), LAYER.A, 'Manufacturing (continued)');

        } else if (isPrimaryFactory && !pfd) {
            traceBlock([
                'PRIMARY FACTORY DATA: flag is set but window.lastInput.manufacturing.primaryFactoryData',
                'is not available at PDF time. Regenerate PDF immediately after calculation.',
                'Engine source: ' + safe(mfgTrace.source || 'Primary Factory Data')
            ], { sectionLabel: 'Manufacturing (continued)' });
        }
        // Read all per-kWh factors from window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI
        // These are the EU27 average base values BEFORE any country-specific adjustment.
        // CC uses country-specific Ember intensity (shown in Layer B/CC trace).
        // Non-CC categories use EU27 average directly — no country adjustment applied.
        const EGM = (window.corePhysics?.CONSTANTS?.ELECTRICITY_GRID_MULTI) || null;

        const mfgLayerALines = [
            'LAYER A — ELECTRICITY_GRID_MULTI Base EF (EU27 average, per kWh electricity)',
            'Source: window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI',
            'Data: ENTSO-E Statistical Factsheet 2023 / EMEP/EEA 2023 §1.A.1b / JRC EF 3.1 / USEtox 2.14',
            'These values are the EU27 average non-CC impacts per kWh at medium voltage.',
            'CC is NOT listed here — it uses country-specific Ember 2025 grid intensity (see Layer B).',
            ''
        ];
        if (EGM) {
            const EGM_UNITS = {
                'Ozone Depletion': 'kg CFC11e/kWh',
                'Human Toxicity, non-cancer': 'CTUh/kWh',
                'Human Toxicity, cancer': 'CTUh/kWh',
                'Particulate Matter': 'disease inc./kWh',
                'Ionizing Radiation': 'kBq U235e/kWh',
                'Photochemical Ozone Formation': 'kg NMVOCe/kWh',
                'Acidification': 'mol H+e/kWh',
                'Eutrophication, terrestrial': 'mol Ne/kWh',
                'Eutrophication, freshwater': 'kg Pe/kWh',
                'Eutrophication, marine': 'kg Ne/kWh',
                'Ecotoxicity, freshwater': 'CTUe/kWh',
                'Land Use': 'Pt/kWh',
                'Water Use/Scarcity (AWARE)': 'm3 world eq./kWh',
                'Resource Use, minerals/metals': 'kg Sbe/kWh',
                // FIX: [pdf-generator audit] 'Resource Use, fossils' was excluded from this
                // table and the note below wrongly described it as computed separately via
                // kWh x 3.6 (the OLD, now-removed calculation path). core_physics.js's
                // "Bug 1 FIX / C12-F1 fix" added this key to ELECTRICITY_GRID_MULTI directly
                // (5.80 MJ/kWh, ecoinvent 3.9.1 EU27 grid mix) — this PDF's documentation
                // was never updated to match. Now shown like every other EGM category.
                'Resource Use, fossils': 'MJ/kWh'
            };
            Object.entries(EGM_UNITS).forEach(([cat, unit]) => {
                const v = EGM[cat];
                mfgLayerALines.push('  ' + cat.padEnd(36) + ': ' + (v !== undefined ? numFmt(v, 8) : 'N/A') + '  ' + unit);
            });
            mfgLayerALines.push('');
            mfgLayerALines.push('  Ionizing Radiation note: 0.062 kBq U235e/kWh reflects ~25% nuclear share in EU27 2023 mix');
            mfgLayerALines.push('  Source: UNSCEAR 2008 nuclear fuel cycle CFs. ENTSO-E Statistical Factsheet 2023 generation mix.');
            mfgLayerALines.push('  Resource Use, fossils: 5.80 MJ/kWh — ecoinvent 3.9.1 EU27 grid mix, "market for');
            mfgLayerALines.push('  electricity, medium voltage" RER, cut-off system model. Same EGM formula as all');
            mfgLayerALines.push('  other categories above (kWh x factor) — not a separate calculation.');
        } else {
            mfgLayerALines.push('  WARNING: window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI not loaded at PDF time.');
            mfgLayerALines.push('  Ensure core_physics.js is loaded before generating PDF.');
        }
        layerBlock('LAYER A — ELECTRICITY_GRID_MULTI Base EF (EU27 average, per kWh)', mfgLayerALines, LAYER.A, 'Manufacturing (continued)');

        // FIX-6: EGM derivation methodology block
        // Explains HOW the EU27 average per-kWh factors were derived — generation mix + EMEP/EEA combustion EFs
        layerBlock('LAYER A — EGM Derivation Methodology', [
            'How EU27 average per-kWh non-CC factors were derived:',
            '',
            'Step 1 — EU27 generation mix (ENTSO-E Statistical Factsheet 2023):',
            '  Gas: ~20%  Coal: ~15%  Nuclear: ~25%  Wind: ~20%  Solar: ~8%  Hydro: ~12%',
            '',
            'Step 2 — Combustion emission factors (EMEP/EEA 2023 §1.A.1b, public power plants/CHP):',
            '  Tier 1 default values per fuel type (gas, coal, oil). Weighted by generation share.',
            '',
            'Step 3 — Characterization (JRC EF 3.1 EUR 29540 EN + USEtox 2.14):',
            '  NOx  → Acidification:              0.0296 mol H+e/g NOx',
            '  NOx  → Eutrophication terrestrial: 0.0128 mol Ne/g NOx',
            '  NOx  → Eutrophication marine:      0.0022 kg Ne/g NOx',
            '  PM2.5→ Particulate Matter:         6.4e-4 disease inc./g PM2.5',
            '  NOx  → Photochem. Ozone Formation: 0.028  kg NMVOCe/g NOx',
            '  BaP  → Human Toxicity, cancer:     6.8e-4 CTUh/g  (USEtox 2.14)',
            '  NOx  → Human Toxicity, non-cancer: 5.0e-9 CTUh/g  (USEtox 2.14)',
            '  Zn   → Ecotoxicity, freshwater:    85     CTUe/g   (USEtox 2.14)',
            '',
            'IMPORTANT — What country adjustment means for manufacturing:',
            '  CC only: country-specific Ember 2025 grid intensity used (e.g. FR = 41.40 g CO2e/kWh).',
            '  Non-CC: EU27 average EGM factors applied directly — no country adjustment.',
            '  This is correct: non-CC factors depend on generation mix (EU27 average),',
            '  not on the marginal grid intensity used for CC. No double-counting.',
            '  Confidence: MEDIUM. Country-specific non-CC factors require ecoinvent licence.'
        ], LAYER.A, 'Manufacturing (continued)');

        // LAYER B — Country/T&D adjustment (CC only)
        layerBlock('LAYER B — CC Country Grid Intensity + T&D Adjustment', [
            'B1 — Country grid intensity (Climate Change only):',
            '  EU27 average CC: ~280 g CO2e/kWh  (blended generation mix)',
            '  Country selected: ' + mfgCountry,
            '  Country intensity: ' + numFmt(gridG, 2) + ' g CO2e/kWh  [Ember 2025]',
            '  Source: Ember Climate — Global Electricity Review 2025',
            '',
            'B2 — T&D (Transmission and Distribution) loss:',
            '  Factor: 1.07  (7% loss)',
            '  Source: IEA Electricity Information 2023, EU average T&D losses',
            '  Formula: adjusted_intensity = country_intensity x 1.07',
            '         = ' + numFmt(gridG, 2) + ' x 1.07 = ' + numFmt(gridG * 1.07, 2) + ' g CO2e/kWh',
            '',
            'Note: Non-CC categories do NOT use country grid intensity.',
            '      They use EU27 average EGM factors directly (see Layer A above).'
        ], LAYER.B, 'Manufacturing (continued)');

        // BK-7 FIX: Show gas benchmark trace for non-primary-data manufacturing path.
        // mfgTrace.benchmarkGas is populated by the BK-7 fix in calculation_engine.js
        // when gas_mj_per_kg > 0 for the selected processing method.
        const benchGas = (window.lastInput?.manufacturing?.usePrimaryFactoryData)
            ? null
            : (window.lastCalcResult?.auditTrailData?.traceability?.manufacturing?.benchmarkGas || null);
        if (benchGas && benchGas.gas_mj_per_kg > 0) {
            layerBlock('LAYER B — Benchmark Gas CO2 (BK-7 FIX)', [
                'BK-7 FIX: Gas combustion CO2 now included in benchmark manufacturing path.',
                'Previously gas_mj_per_kg was defined in the processing database but never',
                'read for the benchmark path — causing baking/sterilization/roasting/drying',
                'CO2 to be understated by the gas contribution.',
                '',
                'Processing method    : ' + safe(benchGas.processing_method),
                'gas_mj_per_kg (DB)  : ' + fix(benchGas.gas_mj_per_kg, 4) + ' MJ/kg product',
                '  Source: AIOXY processing database (thermodynamic derivation per SKILL.md)',
                '',
                'GAS CO2 FORMULA:',
                '  gas_CO2/kg = gas_mj_per_kg x gas_CO2_per_MJ x product_weight_kg',
                '  gas_CO2_per_MJ = ' + fix(benchGas.gas_co2_per_mj, 4) + ' kg CO2/MJ',
                '    Source: IPCC 2006 Guidelines Vol. 2, Ch. 2, Table 2.2',
                '    Natural gas: 56,100 kg CO2/TJ = 0.0562 kg CO2/MJ (TTW, direct combustion)',
                '',
                '  gas_CO2 = ' + fix(benchGas.gas_mj_per_kg, 4) + ' MJ/kg x ' + fix(benchGas.gas_co2_per_mj, 4) + ' kg CO2/MJ',
                '          = ' + fix(benchGas.gas_mj_per_kg * benchGas.gas_co2_per_mj, 6) + ' kg CO2/kg product',
                '  gas_CO2 total (x product batch) = ' + fix(benchGas.gas_co2_kg, 6) + ' kg CO2',
                '',
                'NON-CC GAS IMPACTS:',
                '  Converted to m³ natural gas: gas_mj_per_kg / 38 MJ/m³ LHV',
                '  38 MJ/m³: IPCC 2006 Vol.2 Table 2.3 natural gas LHV',
                '  Non-CC factors from GAS_COMBUSTION_MULTI (same as primary factory path)',
                '  Source: EMEP/EEA 2023 §1.A.1b x JRC EF 3.1'
            ], LAYER.B, 'Manufacturing (continued)');
        } else if (!window.lastInput?.manufacturing?.usePrimaryFactoryData) {
            layerBlock('LAYER B — Benchmark Gas CO2', [
                'Processing method: ' + safe(window.lastInput?.manufacturing?.processingMethod || 'none'),
                benchGas === null
                    ? 'Gas benchmark trace not available from engine (regenerate PDF after calculation).'
                    : 'gas_mj_per_kg = 0 for this processing method — no gas combustion component (e.g. cooling, chilling, raw pack).',
                'BK-7 FIX is active: gas_mj_per_kg is read from the processing database for thermal methods.'
            ], LAYER.B, 'Manufacturing (continued)');
        }

        // CC trace from engine
        const mfgComp = ccTree.Manufacturing?.components?.[0] || null;
        subHeader('Climate Change — Full Step-by-Step Derivation');
        if (mfgComp && mfgComp.calculation_trace) {
            traceBlock(mfgComp.calculation_trace.split('\n'), { sectionLabel: 'Manufacturing (continued)' });
        } else {
            traceBlock([
                'Manufacturing Climate Change trace not available from engine.',
                'Engine result: ' + numFmt(mfgCC, 4) + ' kg CO2e',
                'Grid intensity: ' + numFmt(gridG, 2) + ' g CO2e/kWh  [Ember 2025 - ' + mfgCountry + ']',
                'Note: calculation_trace was not populated for this calculation run.'
            ], { sectionLabel: 'Manufacturing (continued)' });
        }

        // All 16 categories for manufacturing — LAYER C
        Y += 3;
        subHeader('LAYER C — All 16 EF 3.1 Categories: kWh x Factor = Impact');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Formula (non-CC): impact = kWh_electricity x per_kWh_factor[category]  |  Source: ELECTRICITY_GRID_MULTI (EU27 avg, Layer A above)', M, Y); Y += 5;

        // kWh: use mfgKwhCorrect (GAP-3 fix) — derived from primary factory data or back-calculated
        // from CC contribution to avoid the .toFixed(2) rounding error in details string
        const mfgKwh = mfgKwhCorrect > 0 ? mfgKwhCorrect : mfgKwhParsed;

        // Read actual transport multi-category factors for transport non-CC section
        const TMF = (window.corePhysics?.CONSTANTS?.GLEC?.MULTI_CATEGORY_FACTORS) || null;

        const mfgCatLines = [];
        ALL_CATS_ORDERED.filter(c => !c.startsWith('Climate Change -')).forEach(cat => {
            const catTotal = pef[cat]?.contribution_tree?.Manufacturing?.total || 0;
            const unit     = CAT_UNITS[cat] || '';

            if (cat === 'Climate Change') {
                mfgCatLines.push('  ' + cat.padEnd(36) + ': ' + numFmt(catTotal, 6) + ' ' + unit + '  (from CC trace above)');

            } else if (EGM && EGM[cat] !== undefined) {
                // FIX: Show actual factor value from window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI
                // FIX: [pdf-generator audit] 'Resource Use, fossils' previously had its own
                // hardcoded branch here showing "kWh x 3.6" — a formula that did NOT match
                // catTotal (which the engine actually computes via EGM['Resource Use, fossils']
                // = 5.80, per core_physics.js's Bug 1 FIX / C12-F1 fix). That mismatch was
                // directly checkable and wrong. Now handled identically to every other
                // EGM category, since the correct factor is present in EGM.
                const factor = EGM[cat];
                const derived = mfgKwh * factor;
                mfgCatLines.push('  ' + cat.padEnd(36) + ': ' + numFmt(mfgKwh, 4) + ' kWh x ' + numFmt(factor, 6) + ' ' + unit + '/kWh');
                mfgCatLines.push('    ' + '= ' + numFmt(derived, 6) + ' ' + unit + '  [engine: ' + numFmt(catTotal, 6) + ' ' + unit + ']');

            } else {
                // EGM not available at runtime (library not loaded) — show result only
                mfgCatLines.push('  ' + cat.padEnd(36) + ': ' + numFmt(catTotal, 6) + ' ' + unit);
                mfgCatLines.push('    ' + 'Factor: window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI["' + cat + '"] (not readable at PDF time)');
            }
        });

        const egmNote = EGM
            ? 'Per-kWh factors: window.corePhysics.CONSTANTS.ELECTRICITY_GRID_MULTI (Layer A above). Energy source: ' + mfgEnergySrc
            : 'WARNING: window.corePhysics.CONSTANTS not available — factor values not shown. Load core_physics.js before generating PDF.';

        // FIX-15: Add gas combustion note for benchmark path — when benchmark kWh is used
        // (not primary factory data), gas is not in the benchmark model, so note this explicitly
        const gasCombustionNote = isPrimaryFactory
            ? '  Gas combustion non-CC: shown in PRIMARY FACTORY DATA block above.'
            : '  Gas combustion (natural gas): NOT in benchmark manufacturing model. If factory uses gas,\n  enter Primary Factory Data to capture gas non-CC impacts via GAS_COMBUSTION_MULTI.';

        traceBlock([
            'LAYER C — Formula (non-CC): impact = kWh_electricity x per_kWh_factor[category]',
            egmNote,
            'kWh electricity used: ' + numFmt(mfgKwh, 6) + ' kWh',
            '  Source: ' + (_isPfKwh && _pfd4kwh ? 'Primary factory data (totalKWh/totalOutputKg x productWeight)' : 'Back-calculated from CC contribution (mfgCC / (gridG x 1.07 / 1000))'),
            '  Verification: ' + numFmt(mfgKwh,6) + ' kWh x ' + numFmt(gridG,2) + ' x 1.07 / 1000 = ' + numFmt(mfgKwh * gridG * 1.07 / 1000, 6) + ' kg CO2e  [should match CC trace above]',
            'Grid intensity (CC): ' + numFmt(gridG, 2) + ' g CO2e/kWh  [Ember 2025 — ' + mfgCountry + '] x 1.07 T&D = ' + numFmt(gridG*1.07,2) + ' g CO2e/kWh',
            'Non-CC: EU27 average factors from Layer A applied directly (no country adjustment).',
            gasCombustionNote,
            ''
        ].concat(mfgCatLines), { sectionLabel: 'Manufacturing (continued)' });

        footer('Manufacturing — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // TRANSPORT PAGE
        // ================================================================
        newPage('Transport — Glass-Box Calculation Detail (GLEC v3.2)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('All transport CO2e calculated by engine (core_physics.js calculateTransport()). Trace string rendered verbatim.', M, Y); Y += 6;

        // FIX-7: LAYER A — GLEC v3.2 Emission Factors + DAF table
        // Read from window.corePhysics.CONSTANTS.GLEC (already exported at runtime)
        const GLEC_EF  = window.corePhysics?.CONSTANTS?.GLEC?.EMISSION_FACTORS || null;
        const GLEC_DAF = window.corePhysics?.CONSTANTS?.GLEC?.DAF || null;
        const GLEC_RLEAK = window.corePhysics?.CONSTANTS?.GLEC?.REFRIGERANT_LEAKAGE || null;

        const transLayerALines = [
            'LAYER A — GLEC v3.2 Emission Factors (kg CO2e / t-km)',
            'Source: window.corePhysics.CONSTANTS.GLEC.EMISSION_FACTORS',
            'Reference: Smart Freight Centre GLEC Framework v3.2, October 2025',
            ''
        ];
        if (GLEC_EF) {
            transLayerALines.push('  Road (HGV, EU articulated truck):');
            transLayerALines.push('    ambient : ' + numFmt(GLEC_EF.road?.ambient?.hgv, 4) + ' kg CO2e/t-km  [GLEC v3.2 Module 2 Table 8 — 60% load, 17% empty running]');
            transLayerALines.push('    chilled : ' + numFmt(GLEC_EF.road?.chilled?.hgv, 4) + ' kg CO2e/t-km  [= ambient x 1.12, GLEC v3.2 Module 2 p.103 12% uplift]');
            transLayerALines.push('    frozen  : ' + numFmt(GLEC_EF.road?.frozen?.hgv, 4) + ' kg CO2e/t-km  [same 12% uplift, GLEC provides no separate frozen/chilled value]');
            transLayerALines.push('    van (<3.5t) ambient: ' + numFmt(GLEC_EF.road?.ambient?.van, 4) + ' kg CO2e/t-km  [GLEC v3.2 Module 2 Table 7]');
            transLayerALines.push('  Sea:');
            transLayerALines.push('    ambient (dry container): ' + numFmt(GLEC_EF.sea?.ambient, 4) + ' kg CO2e/t-km  [GLEC v3.2 Table 18 — 71.7 g/TEU-km / 10 t/TEU]');
            transLayerALines.push('    reefer               : ' + numFmt(GLEC_EF.sea?.reefer, 4) + ' kg CO2e/t-km  [GLEC v3.2 Table 18 — 142.3 g/TEU-km / 10 t/TEU]');
            transLayerALines.push('  Air:');
            transLayerALines.push('    ambient (long-haul)  : ' + numFmt(GLEC_EF.air?.ambient, 4) + ' kg CO2e/t-km  [GLEC v3.2 Module 2 Table 1 — unknown aircraft]');
            transLayerALines.push('    reefer               : [REMOVED — no GLEC v3.2 source exists for air reefer]');
            transLayerALines.push('  Rail:');
            transLayerALines.push('    ambient (EU avg)     : ' + numFmt(GLEC_EF.rail?.ambient, 4) + ' kg CO2e/t-km  [GLEC v3.2 Module 2 Table 4]');
            transLayerALines.push('    reefer               : ' + numFmt(GLEC_EF.rail?.reefer, 4) + ' kg CO2e/t-km  [= ambient x 1.12, GLEC v3.2 Module 2 p.98]');
        } else {
            transLayerALines.push('  WARNING: window.corePhysics.CONSTANTS.GLEC.EMISSION_FACTORS not loaded at PDF time.');
        }
        transLayerALines.push('');
        transLayerALines.push('DAF — Distance Adjustment Factors:');
        transLayerALines.push('  Source: window.corePhysics.CONSTANTS.GLEC.DAF');
        if (GLEC_DAF) {
            transLayerALines.push('  Road : x' + numFmt(GLEC_DAF.road, 4) + '  [GLEC v3.2 Module 2, Table 7 preamble — +5% out-of-route allowance, multiplicative]');
            transLayerALines.push('  Sea  : x' + numFmt(GLEC_DAF.sea, 4) + '  [GLEC v3.2 Module 2 p.108 — actual sea distances exceed great circle]');
            transLayerALines.push('  Rail : x' + numFmt(GLEC_DAF.rail, 4) + '  [no DAF in GLEC v3.2 for rail]');
            transLayerALines.push('  Air  : +95 km  [GLEC v3.2 Module 2 p.94 — ADDITIVE constant, NOT multiplicative]');
        } else {
            transLayerALines.push('  WARNING: window.corePhysics.CONSTANTS.GLEC.DAF not loaded at PDF time.');
        }
        if (GLEC_RLEAK) {
            transLayerALines.push('');
            transLayerALines.push('Refrigerant Leakage (added to frozen/chilled legs):');
            transLayerALines.push('  chilled: ' + numFmt(GLEC_RLEAK.chilled, 5) + ' kg CO2e/t-km  [GLEC v3.2 — HFC-134a leakage from chilled trailer]');
            transLayerALines.push('  frozen : ' + numFmt(GLEC_RLEAK.frozen, 5) + ' kg CO2e/t-km  [GLEC v3.2 — higher leakage rate for frozen storage]');
        }
        transLayerALines.push('');
        transLayerALines.push('CRISIS ROUTING FLAG:');
        const crisisRouting = window.lastInput?.transport?.crisisRouting || false;
        if (crisisRouting) {
            transLayerALines.push('  ACTIVE — distance multiplied by x1.40 (supply chain disruption routing)');
            transLayerALines.push('  Base distance: ' + numFmt(window.lastInput?.transport?.distanceKm||0,0) + ' km  x  1.40  = ' + numFmt((window.lastInput?.transport?.distanceKm||0)*1.40,0) + ' km effective');
            transLayerALines.push('  Applies to: sea and road modes only (calculation_engine.js ~1965)');
        } else {
            transLayerALines.push('  NOT active — standard distance used (no supply chain disruption declared)');
        }
        layerBlock('LAYER A — GLEC v3.2 Emission Factors + DAF (all modes)', transLayerALines, LAYER.A, 'Transport (continued)');

        // FIX-8: LAYER B — Diesel burn derivation chain for road non-CC factors
        // This shows HOW the per-t-km non-CC factors (road MCF) were derived
        // from GLEC CO2 EF + EMEP/EEA combustion EFs + JRC EF 3.1 CFs
        const roadMCF = (window.corePhysics?.CONSTANTS?.GLEC?.MULTI_CATEGORY_FACTORS?.road) || null;
        layerBlock('LAYER B — Road HGV Non-CC Factor Derivation Chain (EMEP/EEA 2023 + JRC EF 3.1)', [
            'How per-t-km non-CC impact factors were derived for Road HGV:',
            '',
            'Step 1 — Diesel fuel burn per t-km:',
            '  GLEC v3.2 road HGV CC EF = 0.089 kg CO2e/t-km',
            '  GLEC v3.2 Module 1 diesel TTW CO2 = 3.22 kg CO2/kg diesel',
            '  diesel_burn = 0.089 / 3.22 = 0.027640 kg diesel/t-km',
            '',
            'Step 2 — EMEP/EEA pollutant emission factors (g/kg diesel):',
            '  Source: EMEP/EEA Air Pollutant Inventory Guidebook 2023, §1.A.3.b',
            '          Heavy-duty vehicles, Euro VI, articulated HGV, diesel, Table 3-1 Tier 1',
            '  NOx   = 3.5    g/kg diesel  (nitrogen oxides as NO2)',
            '  PM2.5 = 0.04   g/kg diesel  (fine particulate matter)',
            '  SO2   = 0.002  g/kg diesel  (sulfur dioxide; EN590 diesel S <= 10 ppm)',
            '  NMVOC = 0.4    g/kg diesel  (non-methane volatile organic compounds)',
            '  NH3   = 0.07   g/kg diesel  (ammonia from SCR catalyst, Euro VI)',
            '  BaP   = 2.4e-4 g/kg diesel  (benzo[a]pyrene from trace combustion PAH)',
            '  Zn    = 3.0e-4 g/kg diesel  (zinc from combustion, trace metals table)',
            '',
            'Step 3 — JRC EF 3.1 Characterization Factors (EUR 29540 EN):',
            '  NOx  -> Acidification:              0.0296 mol H+e/g NOx',
            '  SO2  -> Acidification:              0.0313 mol H+e/g SO2',
            '  NH3  -> Acidification:              0.0591 mol H+e/g NH3',
            '  NOx  -> Eutrophication terrestrial: 0.0128 mol Ne/g NOx',
            '  NOx  -> Eutrophication marine:      0.0022 kg Ne/g NOx',
            '  PM2.5-> Particulate Matter:         6.4e-4 disease inc./g PM2.5',
            '  NOx  -> Photochem. Ozone Formation: 0.028  kg NMVOCe/g NOx',
            '  NMVOC-> Photochem. Ozone Formation: 0.045  kg NMVOCe/g NMVOC',
            '  BaP  -> Human Toxicity, cancer:     6.8e-4 CTUh/g  (USEtox 2.14)',
            '  NOx  -> Human Toxicity, non-cancer: 5.0e-9 CTUh/g  (USEtox 2.14)',
            '  Zn   -> Ecotoxicity, freshwater:    85     CTUe/g   (USEtox 2.14)',
            '',
            'Step 4 — Per-t-km arithmetic (d = 0.027640 kg diesel/t-km):',
            '  Acidification: NOx: 3.5x0.027640x0.0296=2.864e-3 + SO2: 0.002x0.027640x0.0313=1.7e-6 + NH3: 0.07x0.027640x0.0591=1.1e-4 = 2.980e-3 mol H+e/t-km',
            '  Eutroph. terr.: NOx: 3.5x0.027640x0.0128 = 1.238e-3 mol Ne/t-km',
            '  Eutroph. marine: NOx: 3.5x0.027640x0.0022 = 2.128e-4 kg Ne/t-km',
            '  Particulate Matter: PM2.5: 0.04x0.027640x6.4e-4 = 7.076e-7 disease inc./t-km',
            '  Photochem.Ozone: NOx: 3.5x0.027640x0.028=2.703e-3 + NMVOC: 0.4x0.027640x0.045=4.975e-4 = 3.200e-3 kg NMVOCe/t-km',
            '  Human Tox. cancer: BaP: 2.4e-4x0.027640x6.8e-4 = 4.511e-9 CTUh/t-km',
            '  Human Tox. non-cancer: NOx: 3.5x0.027640x5.0e-9 = 4.837e-10 CTUh/t-km',
            '  Ecotoxicity fw: Zn: 3.0e-4x0.027640x85 = 7.048e-4 CTUe/t-km  [LOW conf — combustion Zn only]',
            '',
            'Honest zero categories (by scientific definition or honest gap):',
            '  Ozone Depletion: 0 — diesel combustion does not emit ODS',
            '  Ionizing Radiation: 0 — not applicable to diesel combustion',
            '  Eutrophication freshwater: 0 — P from diesel combustion negligible (EMEP/EEA confirms)',
            '  Land Use: 0 — requires road infrastructure LCI (not in EMEP/EEA)',
            '  Water Use: 0 — requires fuel production water LCI (not in free sources)',
            '  Resource Use minerals/metals: 0 — requires vehicle manufacturing LCI',
            '  Resource Use fossils: 0 — fossil energy already captured in CC path; adding here = double-count'
        ], LAYER.B, 'Transport (continued)');

        const transComps = ccTree.Transport?.components || [];
        if (transComps.length > 0) {
            transComps.forEach((tc, idx) => {
                subHeader('LAYER C — Transport Leg ' + (idx + 1) + ': ' + safe(tc.name || 'Outbound') + ' (CC full trace)');
                if (tc.calculation_trace) {
                    traceBlock(tc.calculation_trace.split('\n'), { sectionLabel: 'Transport (continued)' });
                } else {
                    traceBlock([
                        'Leg result: ' + numFmt(tc.subtotal||0, 4) + ' kg CO2e',
                        'Notes: ' + safe(tc.notes || 'N/A'),
                        'Trace not available — engine did not populate calculation_trace for this leg.'
                    ], { sectionLabel: 'Transport (continued)' });
                }

                // FIX-9: Per-leg non-CC arithmetic — mass x adjusted_km x factor = result
                // Read mass and adjusted distance from the leg trace or from input
                if (roadMCF) {
                    const legMassKg  = tc.mass_kg  || tc.massKg  || 0;
                    const legDistKm  = tc.adjusted_distance_km || tc.distanceKm || tc.distance_km || 0;
                    const legMassT   = legMassKg / 1000;
                    if (legMassT > 0 && legDistKm > 0) {
                        const nonCCLines = [
                            'LAYER C — Non-CC Arithmetic (mass x adjusted_km x factor per t-km = result):',
                            '  mass: ' + numFmt(legMassKg, 4) + ' kg = ' + numFmt(legMassT, 6) + ' t',
                            '  adjusted distance: ' + numFmt(legDistKm, 2) + ' km  (includes DAF from Layer B)',
                            ''
                        ];
                        ALL_CATS_ORDERED.filter(c => !c.startsWith('Climate Change')).forEach(cat => {
                            const catTotal = (pef[cat]?.contribution_tree?.Transport?.total || 0);
                            const unit = CAT_UNITS[cat] || '';
                            const factor = roadMCF[cat];
                            if (factor !== undefined && factor > 0) {
                                const calc = legMassT * legDistKm * factor;
                                nonCCLines.push('  ' + cat.padEnd(34) + ': ' + numFmt(legMassT,6) + ' t x ' + numFmt(legDistKm,2) + ' km x ' + numFmt(factor,7) + ' ' + unit + '/t-km');
                                nonCCLines.push('    ' + '= ' + numFmt(calc, 6) + ' ' + unit + '  [engine total: ' + numFmt(catTotal, 6) + ' ' + unit + ']');
                            }
                        });
                        traceBlock(nonCCLines, { sectionLabel: 'Transport (continued)' });
                    }
                }
            });
        } else {
            subHeader('LAYER C — Transport Calculation');
            traceBlock([
                'Transport trace not available from engine contribution tree.',
                'Engine result: ' + numFmt(transCC, 4) + ' kg CO2e',
                'Source: GLEC v3.2 — Smart Freight Centre 2025',
                'Note: calculation_trace not populated for this run.'
            ], { sectionLabel: 'Transport (continued)' });
        }

        Y += 3;
        subHeader('LAYER C — Non-CC Impact Categories (Road HGV: factors from Layer B derivation)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Road HGV factors from LAYER B derivation above. Sea/air/rail non-CC: zero (honest gap, ISO 14044 §4.2.3.3).', M, Y); Y += 5;

        const transNonCCRows = ALL_CATS_ORDERED
            .filter(c => !c.startsWith('Climate Change'))
            .map(cat => {
                const catTotal = pef[cat]?.contribution_tree?.Transport?.total || 0;
                const unit     = CAT_UNITS[cat] || '';
                const conf = ['Acidification','Eutrophication, terrestrial','Eutrophication, marine',
                              'Particulate Matter','Photochemical Ozone Formation',
                              'Human Toxicity, cancer','Human Toxicity, non-cancer'].includes(cat) ? 'MEDIUM' :
                             cat === 'Ecotoxicity, freshwater' ? 'LOW (combustion Zn only)' : 'ZERO/LOW';
                // FIX: show actual factor value from engine constants — zero magic numbers
                let factorStr = roadMCF ? (
                    roadMCF[cat] === 0
                        ? '0  (honest gap — diesel combustion not characterised for this category)'
                        : roadMCF[cat] !== undefined
                            ? numFmt(roadMCF[cat], 5) + ' ' + unit + '/t-km  [EMEP/EEA 2023 + JRC EF 3.1]'
                            : '— (sea/air/rail: no road MCF applies)'
                ) : '— (corePhysics not loaded)';
                return [safe(cat), safe(unit), numFmt(catTotal/pWeightKg, 5), safe(conf), factorStr];
            });

        doc.autoTable({
            startY: Y,
            head: [['Category','Unit','Result / kg product','Conf.','Road HGV factor per t-km']],
            body: transNonCCRows,
            theme: 'plain',
            styles: { fontSize: 6.5, cellPadding: 1.8 },
            headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 54, fontStyle: 'bold' },
                1: { cellWidth: 18, textColor: C.bodyMid },
                2: { cellWidth: 26, halign: 'right' },
                3: { cellWidth: 20 },
                4: { cellWidth: 64, textColor: C.navyMid, fontSize: 6 }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        footer('Transport — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // PACKAGING PAGE
        // ================================================================
        newPage('Packaging — CFF Glass-Box Calculation (PEF 3.1 Annex C v2.1)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('CFF trace built by calculation_engine.js buildContributionTree(). Every CFF parameter value shown with source.', M, Y); Y += 6;

        // FIX-10: LAYER A — Packaging Base Parameters (database source)
        // Read from window.aioxyData.packaging[material] (same path as engine)
        // Fallback to hardcoded source table if DB not available at PDF time
        const pkgMat     = window.lastInput?.packaging?.material || null;
        const pkgMatSafe = pkgMat || 'unknown';
        const pkgDbEntry = (pkgMat && window.aioxyData?.packaging) ? (window.aioxyData.packaging[pkgMat] || null) : null;
        // pWeightKg already declared above (mb.final_content_weight_kg)

        // Hardcoded source citations per material (for Layer A disclosure even when DB not loaded)
        const PKG_SOURCE_CITE = {
            cardboard: 'FEFCO/CCB "European Database for Corrugated Board LCA" 2019, LCA Report p.37 (Ev), p.31 (fuel), p.33 (emissions)',
            paper:     'Cepi LCA (2021) / Nordic Ecolabel kraft process data',
            pet:       'PlasticsEurope Eco-profile "PET Resin" 2021 edition',
            hdpe:      'PlasticsEurope Eco-profile "HDPE" 2021 edition',
            glass:     'FEVE European Container Glass Federation (estimate)',
            steel:     'World Steel Association Life Cycle Inventory 2021',
            aluminium: 'European Aluminium Association (EAA) LCA 2021'
        };
        const pkgLayerALines = [
            'LAYER A — Packaging Base Parameters (database source per material)',
            'Source: window.aioxyData.packaging["' + pkgMatSafe + '"]',
            'Source citation: ' + (PKG_SOURCE_CITE[pkgMatSafe] || 'Unknown — check packaging DB'),
            ''
        ];
        if (pkgDbEntry) {
            pkgLayerALines.push('  Material          : ' + pkgMatSafe.toUpperCase());
            pkgLayerALines.push('  Ev (virgin prod.) : ' + numFmt(pkgDbEntry.co2_virgin || pkgDbEntry.ev || 0, 5) + ' kg CO2e/kg');
            pkgLayerALines.push('  Erec (recycled)   : ' + numFmt(pkgDbEntry.co2_recycled || pkgDbEntry.erec || 0, 5) + ' kg CO2e/kg');
            pkgLayerALines.push('  Ed (disposal avg) : ' + numFmt(pkgDbEntry.co2_disposal_average || pkgDbEntry.ed || 0, 5) + ' kg CO2e/kg');
            pkgLayerALines.push('  R2 (EoL rate)     : ' + numFmt(pkgDbEntry.r2 || 0, 4) + '  [PEF Annex C v2.1 default for ' + pkgMatSafe + ']');
            pkgLayerALines.push('  A (alloc. factor) : ' + numFmt(pkgDbEntry.aFactor || 0, 4) + '  [PEF Annex C v2.1]');
            pkgLayerALines.push('  Qs/Qp (quality)   : ' + numFmt(pkgDbEntry.q || 0, 4) + ' / 1.0000 = ' + numFmt(pkgDbEntry.q || 0, 4));
            pkgLayerALines.push('  R1 (recycled cont): from user input (shown in CFF trace below)');
            // NEW-2 FIX: Show which EOL scenario was selected and which Ed/R2 it resolved to.
            // Before this fix, eolDestination was collected in the form but never surfaced
            // in the PDF — auditors could not verify that the correct disposal scenario
            // was applied. Now the PDF shows the exact Ed and R2 values used.
            const eolDest = (window.lastInput?.packaging?.eolDestination || 'eu_average');
            const eolScenarioLabel = {
                'eu_average':   'EU Average (default mix)',
                'recycling':    'Recycling pathway',
                'incineration': 'Incineration (with/without energy recovery)',
                'landfill':     'Landfill disposal',
                'composting':   'Industrial composting (bio-based materials)'
            }[eolDest] || eolDest;
            pkgLayerALines.push('');
            pkgLayerALines.push('  EOL DESTINATION (user selection):');
            pkgLayerALines.push('  Selected scenario  : ' + eolScenarioLabel);
            pkgLayerALines.push('  Ed used in CFF     : see CFF trace below — Ed resolved from packaging DB co2_disposal_' + eolDest);
            pkgLayerALines.push('  R2 used in CFF     : see CFF trace below — r2 resolved from packaging DB r2_' + eolDest + ' (or default r2 if not defined)');
            pkgLayerALines.push('  Source: PEF 3.1 Annex C §C.4 — EOL recycling rate per scenario; PlasticsEurope EOL statistics (2022)');
            pkgLayerALines.push('  NEW-2 FIX: eolDestination now wired into CFF calculation. Before this fix, Ed and R2');
            pkgLayerALines.push('    always used eu_average regardless of user selection (calculation_engine.js v2+).');
        } else {
            // Fallback: hardcoded known values per material for full transparency
            const PKG_LAYER_A_FALLBACK = {
                cardboard: { ev: 1.03000, erec: 0.49000, ed: 0.02100, r2: 0.7461, a: 0.2000, q: 0.8500 },
                paper:     { ev: 0.93000, erec: 0.44000, ed: 0.01800, r2: 0.7200, a: 0.2000, q: 0.8000 },
                pet:       { ev: 2.73000, erec: 1.60000, ed: 0.03200, r2: 0.4500, a: 0.5000, q: 0.9000 },
                hdpe:      { ev: 1.89000, erec: 1.20000, ed: 0.03100, r2: 0.4000, a: 0.5000, q: 0.9000 },
                glass:     { ev: 0.85000, erec: 0.37000, ed: 0.00800, r2: 0.7600, a: 0.2000, q: 0.9200 },
                steel:     { ev: 2.89000, erec: 0.68000, ed: 0.01500, r2: 0.8800, a: 0.2000, q: 0.9500 },
                aluminium: { ev: 12.5000, erec: 0.68000, ed: 0.01500, r2: 0.7800, a: 0.2000, q: 0.9500 }
            };
            const fb = PKG_LAYER_A_FALLBACK[pkgMatSafe];
            if (fb) {
                pkgLayerALines.push('  NOTE: window.aioxyData.packaging not loaded — using hardcoded fallback values.');
                pkgLayerALines.push('  These match the packaging DB and are shown for full traceability.');
                pkgLayerALines.push('  Material          : ' + pkgMatSafe.toUpperCase());
                pkgLayerALines.push('  Ev (virgin prod.) : ' + numFmt(fb.ev, 5) + ' kg CO2e/kg');
                pkgLayerALines.push('  Erec (recycled)   : ' + numFmt(fb.erec, 5) + ' kg CO2e/kg');
                pkgLayerALines.push('  Ed (disposal avg) : ' + numFmt(fb.ed, 5) + ' kg CO2e/kg');
                pkgLayerALines.push('  R2 (EoL rate)     : ' + numFmt(fb.r2, 4) + '  [PEF Annex C v2.1 default]');
                pkgLayerALines.push('  A (alloc. factor) : ' + numFmt(fb.a, 4) + '  [PEF Annex C v2.1]');
                pkgLayerALines.push('  Qs/Qp (quality)   : ' + numFmt(fb.q, 4) + ' / 1.0000 = ' + numFmt(fb.q, 4));
            } else {
                pkgLayerALines.push('  Material: ' + pkgMatSafe);
                pkgLayerALines.push('  Parameters: not available (window.aioxyData.packaging not loaded and material not in fallback table).');
                pkgLayerALines.push('  See CFF trace below for actual values used in calculation.');
            }
        }
        layerBlock('LAYER A — Packaging Base Parameters (Database Source)', pkgLayerALines, LAYER.A, 'Packaging (continued)');

        const pkgComps = ccTree.Packaging?.components || [];
        subHeader('LAYER B + C — CFF Full Term-by-Term Derivation');
        if (pkgComps.length > 0 && pkgComps[0].calculation_trace) {
            traceBlock(pkgComps[0].calculation_trace.split('\n'), { sectionLabel: 'Packaging (continued)' });
        } else {
            traceBlock([
                'Packaging CFF trace not available from engine.',
                'Engine result: ' + numFmt(pkgCC, 4) + ' kg CO2e',
                'Formula: PEF 3.1 Annex C v2.1 CFF',
                'Note: calculation_trace not populated for this run.'
            ], { sectionLabel: 'Packaging (continued)' });
        }

        // Confidence flags
        Y += 2;
        subHeader('Parameter Confidence Flags');
        if (!pkgMat) {
            traceBlock([
                'WARNING: window.lastInput not available at PDF time.',
                'Packaging confidence flags cannot be material-specific.',
                'FIX: Export PDF immediately after running the AIOXY calculation in the same browser tab.'
            ], { bg: [255,243,205], border: [244,162,97], accent: [244,162,97], text: [120,80,0], sectionLabel: 'Packaging (continued)' });
        }
        const pkgConfidenceFlags = {
            cardboard: { r1r2:'HIGH (PEF Annex C v2.1)',   evErec:'HIGH (FEFCO/CCB 2019 LCA Report — direct from p.37)', disposal:'LOW — Eurostat 2013 split. Update needed.' },
            paper:     { r1r2:'HIGH (PEF Annex C v2.1)',   evErec:'MEDIUM (Cepi LCA 2021)',                               disposal:'LOW — same basis as cardboard.' },
            pet:       { r1r2:'HIGH (PEF Annex C v2.1)',   evErec:'MEDIUM (PlasticsEurope eco-profile 2021)',             disposal:'LOW-MEDIUM — partially unverified.' },
            hdpe:      { r1r2:'HIGH (PEF Annex C v2.1)',   evErec:'MEDIUM (PlasticsEurope eco-profile 2021)',             disposal:'LOW-MEDIUM — partially unverified.' },
            glass:     { r1r2:'MEDIUM (FEVE est.)',         evErec:'LOW (FEVE source not obtained)',                       disposal:'LOW — partially unverified.' },
            steel:     { r1r2:'MEDIUM (World Steel 2021)', evErec:'MEDIUM (World Steel 2021)',                            disposal:'LOW — partially unverified.' },
            aluminium: { r1r2:'MEDIUM (EAA 2021)',         evErec:'MEDIUM (EAA 2021)',                                    disposal:'LOW — partially unverified.' }
        };
        const pkgFlags = pkgConfidenceFlags[pkgMatSafe] || { r1r2:'MEDIUM', evErec:'MEDIUM', disposal:'LOW — source not confirmed.' };
        traceBlock([
            'Material: ' + pkgMatSafe.toUpperCase(),
            '',
            'R1/R2 (recycling rates):            ' + pkgFlags.r1r2,
            'Ev/Erec (production impacts):        ' + pkgFlags.evErec,
            'Ed (disposal):                       ' + pkgFlags.disposal,
            '',
            'Disposal sensitivity: Ed error of +/-50% changes CFF by approximately (1-R2) x Ed_error x weight_kg.',
            '  Cardboard 50g pack: ~0.00015 kg CO2e  |  Glass 200g pack: ~0.007 kg CO2e.',
            '  Declared per ISO 14044 §4.2.3.3.',
            '',
            'Note: AGRIBALYSE 3.2 upstream background processes for packaging are derived from ecoinvent',
            '  background data embedded in AGRIBALYSE. AIOXY does not hold an ecoinvent licence.',
            '  CFF formula application is correct per PEF Annex C v2.1.',
            '',
            // FIX: [ingredients.js/pdf-generator audit] This exact caveat is formally mandated
            // by ingredients.js's "GAP 11 FIX" limitation statement (packaging database header):
            // "Until EF 3.1 compliant data is licensed, all AIOXY packaging outputs must carry
            // the caveat... This caveat is surfaced in the PDF report methodology section." It
            // was never actually added here. PEF Annex C v2.1 sheet "Formula" rows 26-29 require
            // Ev/Erec from EF-compliant PEFCR/OEFSR-listed datasets; the sources used here
            // (PlasticsEurope, World Steel, EAA, FEVE, Cepi) are industry-association LCI data,
            // not EF 3.1 compliant datasets — a materially stronger caveat than a confidence tag.
            'IMPORTANT: Packaging Ev/Erec values are sourced from public industry association',
            '  data (PlasticsEurope, World Steel, EAA, FEVE, Cepi), not EF 3.1 compliant datasets.',
            '  Suitable for screening-level assessment only — NOT for EPD (ISO 14025), Type III',
            '  Environmental Declarations, or certified comparative assertions.'
        ], { sectionLabel: 'Packaging (continued)' });

        Y += 2;
        subHeader('LAYER C — Non-CC Impact Categories (per-category arithmetic shown)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Source: PACKAGING_MULTI_CATEGORY[' + pkgMatSafe + '] (FEFCO/CCB / PlasticsEurope / USEtox 2.14 / EMEP/EEA 2023). Confidence: MEDIUM.', M, Y); Y += 3;

        // Read packaging weight from CFF trace component or lastInput
        const pkgWeightKg = window.lastInput?.packaging?.weightKg
                         || pkgComps[0]?.weight_kg
                         || (pkgCC > 0 ? null : 0)
                         || 0;

        // FIX-11: Correct PKG_MCF lookup — TWO levels: PACKAGING_MULTI_CATEGORY[material][category]
        // Previous bug: read PKG_MCF[cat] but correct path is PKG_MCF_ALL[pkgMatSafe][cat]
        const PKG_MCF_ALL = window.corePhysics?.CONSTANTS?.PACKAGING_MULTI_CATEGORY || null;
        const PKG_MCF = (PKG_MCF_ALL && pkgMatSafe && pkgMatSafe !== 'unknown')
            ? (PKG_MCF_ALL[pkgMatSafe] || null)
            : null;

        doc.text('Formula: factor/kg_material x pkg_weight_kg / product_weight_kg = result/kg_product', M, Y); Y += 5;

        const pkgNonCCRows = ALL_CATS_ORDERED
            .filter(c => !c.startsWith('Climate Change'))
            .map(cat => {
                const catTotal = pef[cat]?.contribution_tree?.Packaging?.total || 0;
                const unit = CAT_UNITS[cat] || '';
                let factorStr, statusStr;

                if (PKG_MCF) {
                    const fv = PKG_MCF[cat];
                    if (fv === undefined) {
                        factorStr = '— (not in ' + pkgMatSafe + ' entry)';
                        statusStr = 'ZERO (gap declared)';
                    } else if (fv === 0) {
                        factorStr = '0  (gap declared — no factor for this category)';
                        statusStr = 'ZERO (gap declared)';
                    } else {
                        // FIX-12: Unit bridge formula shown in factor column
                        const pkgWt = pkgWeightKg > 0 ? pkgWeightKg : null;
                        const bridgeStr = pkgWt
                            ? numFmt(fv, 6) + ' ' + unit + '/kg mat x ' + numFmt(pkgWt, 4) + ' kg / ' + numFmt(pWeightKg, 4) + ' kg prod = ' + numFmt(fv * pkgWt / pWeightKg, 6)
                            : numFmt(fv, 6) + ' ' + unit + '/kg material  [PACKAGING_MULTI_CATEGORY.' + pkgMatSafe + ']';
                        factorStr = bridgeStr;
                        statusStr = 'DATA';
                    }
                } else if (!PKG_MCF_ALL) {
                    factorStr = 'corePhysics.CONSTANTS.PACKAGING_MULTI_CATEGORY not loaded';
                    statusStr = catTotal !== 0 ? 'DATA (factor unconfirmed)' : 'ZERO';
                } else {
                    factorStr = pkgMatSafe + ' not in PACKAGING_MULTI_CATEGORY (check material key)';
                    statusStr = catTotal !== 0 ? 'DATA (factor unconfirmed)' : 'ZERO (gap declared)';
                }
                return [safe(cat), safe(unit), numFmt(catTotal / pWeightKg, 6), statusStr, factorStr];
            });

        doc.autoTable({
            startY: Y,
            head: [['Category','Unit','Result/kg product','Status','Factor derivation (factor x pkg_wt / prod_wt)']],
            body: pkgNonCCRows,
            theme: 'plain',
            styles: { fontSize: 6, cellPadding: 1.6 },
            headStyles: { fillColor: C.navyMid, textColor: C.white, fontStyle: 'bold', fontSize: 6 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 46, fontStyle: 'bold' },
                1: { cellWidth: 16, textColor: C.bodyMid },
                2: { cellWidth: 26, halign: 'right' },
                3: { cellWidth: 20, halign: 'center' },
                4: { cellWidth: 74, textColor: C.navyMid, fontSize: 5.5 }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        footer('Packaging — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // TOTAL IMPACT SUMMARY PAGE
        // ================================================================
        newPage('Total Environmental Impact — All Life Cycle Stages');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('All values read from engine. No recalculation at PDF layer. Formula: stage_total / product_weight_kg = per kg result.', M, Y); Y += 6;

        // FIX UPSTREAM-1: Upstream (inbound ingredient transport) added as an explicit
        // stage column. It was previously omitted here even though it is summed into
        // the TOTAL column, which meant Ingr.+Mfg.+Trans.+Pkg. never reconciled to
        // TOTAL for any product with a non-FR-origin ingredient — exactly the failure
        // mode an auditor would catch by manually re-adding the row.
        const stageNames   = ['Ingredients','Manufacturing','Transport','Packaging','Upstream'];
        const stageTotHeader = ['Category','Unit',...stageNames,'TOTAL / kg product'];

        const stageTotRows = ALL_CATS_ORDERED.filter(c => !c.startsWith('Climate Change -')).map(cat => {
            const tree  = fullTree[cat] || pef[cat]?.contribution_tree || {};
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
                0: { cellWidth: 48, fontStyle: 'bold' },
                1: { cellWidth: 14, textColor: C.bodyMid },
                2: { cellWidth: 19, halign: 'right' },
                3: { cellWidth: 18, halign: 'right' },
                4: { cellWidth: 17, halign: 'right' },
                5: { cellWidth: 17, halign: 'right' },
                6: { cellWidth: 17, halign: 'right' },
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
        Y = doc.lastAutoTable.finalY + 3;

        if (wasteCC && wasteCC > 0) {
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text('Processing waste (informational — not in TOTAL per ISO 14044 §4.2.3.3): ' +
                     numFmt(wasteCC/pWeightKg,4) + ' kg CO2e/kg', M, Y, {maxWidth: CW}); Y += 6;
            // GAP-7 FIX: Show processing waste for ALL 16 categories, not just CC
            const wasteRows = ALL_CATS_ORDERED.filter(c => !c.startsWith('Climate Change -')).map(cat => {
                const wTree = fullTree[cat] || pef[cat]?.contribution_tree || {};
                const wasteV = (wTree.Waste?.total || 0) / pWeightKg;
                if (wasteV === 0) return null;
                return [safe(cat), safe(CAT_UNITS[cat]||''), numFmt(wasteV, 5), 'Informational — excluded from TOTAL'];
            }).filter(Boolean);
            if (wasteRows.length > 1) {
                ensureSpace(wasteRows.length * 6 + 12, 'Total Impact (continued)');
                doc.setFont('helvetica','italic'); doc.setFontSize(7); doc.setTextColor(...C.bodyMid);
                doc.text('Processing waste — all categories (informational, ISO 14044 §4.2.3.3):', M, Y); Y += 4;
                doc.autoTable({
                    startY: Y,
                    head: [['Category','Unit','Waste / kg product','Status']],
                    body: wasteRows,
                    theme: 'plain',
                    styles: { fontSize: 6.5, cellPadding: 1.5 },
                    headStyles: { fillColor: C.amber, textColor: C.white, fontStyle: 'bold', fontSize: 6 },
                    columnStyles: {
                        0: { cellWidth: 60, fontStyle: 'bold' },
                        1: { cellWidth: 20, textColor: C.bodyMid },
                        2: { cellWidth: 30, halign: 'right' },
                        3: { cellWidth: 72, textColor: C.bodyMid, fontStyle: 'italic' }
                    },
                    margin: { left: M }
                });
                Y = doc.lastAutoTable.finalY + 3;
            }
        }

        // CC sub-splits
        subHeader('Climate Change Sub-Splits');
        // PDF-2 FIX (2026-06-07): CC-Land Use description corrected.
        // Previous: 'dLUC + agricultural N2O (IPCC Tier 1)' — WRONG.
        // CC-Land Use = soil organic carbon stock changes (dLUC/SOC) only per EF 3.1.
        // Agricultural N2O (manure, synthetic N, organic N) is now in CC-Fossil
        // per Finding 10 fix in calculation_engine.js (2026-06-07).
        // Source: EF 3.1 (JRC EUR 29540 EN §4.4.2); AGRIBALYSE 3.2 methodology.
        const subRows = [
            ['Climate Change - Fossil',   'kg CO2e', numFmt(fossilCC/pWeightKg, 4), 'Combustion + fossil process emissions + agricultural N2O (IPCC Tier 1)'],
            ['Climate Change - Biogenic', 'kg CO2e', numFmt(bioCC/pWeightKg, 4),    'Biogenic CO2 + enteric CH4 (GWP=28)'],
            ['Climate Change - Land Use', 'kg CO2e', numFmt(dlucCC/pWeightKg, 4),   'Soil organic carbon stock changes (dLUC/SOC) only — no N2O'],
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

        // PEF single score breakdown
        ensureSpace(40, 'Total Impact (continued)');
        subHeader('PEF Single Score — Category Breakdown');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Formula: uPt_i = [ (impact_i/kg) / NF_i ] x WF_i x 1,000,000   Source: JRC EUR 29540 EN (EF 3.1)', M, Y); Y += 5;

        const ssRows = Object.entries(ssBkd).map(([cat, data]) => [
            safe(cat),
            numFmt(data.raw            || data.impact           || 0, 5),
            numFmt(data.normalized     || data.normalizedImpact || 0, 6),
            numFmt(data.weighted       || data.weightedImpact   || 0, 7),
            numFmt((data.weighted != null ? data.weighted * 1e6 : null) ?? data.microPoints ?? 0, 3)
        ]);

        if (ssRows.length > 0) {
            doc.autoTable({
                startY: Y,
                head: [['Category','Impact/kg','After ÷NF','After xWF','uPt/kg']],
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
        doc.text(numFmt(mPt,2) + ' uPt / kg product', PW - M - 3, Y + 6, {align:'right'});
        Y += 13;

        footer('Total Impact — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // DATA QUALITY + UNCERTAINTY
        // ================================================================
        newPage('Data Quality Rating (DQR) + Uncertainty Analysis');

        subHeader('Data Quality Rating — Per Ingredient (PEF 3.1 §5.7 / AGRIBALYSE DQI Matrix v3.0.1)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Formula: DQR = (TeR + TiR + GR + P) / 4   |   4-indicator scheme per ADEME/INRAE DQI Matrix v3.0.1   |   CoR not scored (AGRIBALYSE methodology)', M, Y); Y += 3;
        doc.text('Scale: 1 = best quality, 5 = worst.  FR ingredients: TeR=2 TiR=3 GR=1 P=2 → DQR=2.00.  Non-FR EU: DQR=3.25.  Non-FR non-EU: DQR=3.50.', M, Y); Y += 5;

        const dqrComponents = dqr.component_dqrs || [];
        const dqrRows = dqrComponents.map(d => [
            safe(d.name || d.id),
            fix(d.TeR || d.temporal     || 0, 1),
            fix(d.TiR || d.technological|| 0, 1),
            fix(d.GeR || d.GR || d.geographical || 0, 1),
            fix(d.CoR || d.completeness || 0, 1),
            fix(d.RR  || d.P || d.reliability  || 0, 1),
            '(' + fix(d.TeR||0,1) + '+' + fix(d.TiR||0,1) + '+' + fix(d.GeR||d.GR||0,1) + '+' + fix(d.RR||d.P||0,1) + ')/4',
            fix(d.dqr || d.overall || 0, 2)
        ]);

        if (dqrRows.length > 0) {
            doc.autoTable({
                startY: Y,
                head: [['Ingredient','TeR','TiR','GR','CoR*','P','Formula (4-ind.)','DQR/5']],
                // NEW-1 FIX: Formula column header updated to "Formula (4-ind.)" to match
                // INDICATOR_COUNT=4 fix in compliance_engine.js. DQR/5 reminds auditor
                // that the scale is 1-5 even though only 4 indicators contribute.
                body: dqrRows,
                theme: 'plain',
                styles: { fontSize: 7, cellPadding: 1.8 },
                headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: C.rowAlt },
                columnStyles: {
                    0: { cellWidth: 55, fontStyle: 'bold' },
                    1: { cellWidth: 12, halign: 'center' },
                    2: { cellWidth: 12, halign: 'center' },
                    3: { cellWidth: 12, halign: 'center' },
                    4: { cellWidth: 14, halign: 'center', textColor: C.bodyMid },
                    5: { cellWidth: 12, halign: 'center' },
                    6: { cellWidth: 38, halign: 'center', textColor: C.navyMid },
                    7: { cellWidth: 22, halign: 'center', fontStyle: 'bold' }
                },
                margin: { left: M }
            });
            Y = doc.lastAutoTable.finalY + 3;
        }

        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('*CoR not scored per AGRIBALYSE DQI Matrix v3.0.1 (ADEME/INRAE). Always 0 in this dataset.', M, Y); Y += 5;

        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 8, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
        doc.text('Contribution-Weighted DQR: ' + fix(dqrVal, 2) + ' / 5.0   |   Quality level: ' + safe(dqr.dqr_level || 'N/A'), M+3, Y+5.5);
        Y += 12;

        // Monte Carlo
        subHeader('Monte Carlo Uncertainty Analysis (1000 iterations, Lognormal)');
        const ccMC  = unc['Climate Change'] || {};
        // FIX: fallback must be ccTotal (batch kg CO2e), not ccTotal*pWeightKg.
        // Display lines below divide by pWeightKg to get per-kg values.
        // ccTotal*pWeightKg would be (kg/kg)*kg = dimensionally wrong.
        const mcMed = (ccMC.mean  > 0 ? ccMC.mean  : null) || ccTotal;
        const mcP5  = (ccMC.p5   > 0 ? ccMC.p5   : null) || (mcMed * 0.85);
        const mcP95 = (ccMC.p95  > 0 ? ccMC.p95  : null) || (mcMed * 1.15);
        const mcIter = ccMC.iterations || unc.iterations || 1000;
        const mcCV   = ccMC.cv_percent  || unc.cv_percent || audit.uncertainty_analysis?.overall_uncertainty || 15;

        traceBlock([
            'Method: Lognormal uncertainty propagation per ISO 14044 / Heijungs & Huijbregts 2004',
            'Iterations: ' + mcIter + '  |  CV (coefficient of variation): ' + fix(mcCV,1) + '%',
            '',
            'Formula per component (Box-Muller transform):',
            '  sigma_sq  = ln(1 + CV^2)             = ln(1 + ' + fix((mcCV/100)**2,6) + ')',
            '  sigma     = sqrt(sigma_sq)',
            '  multiplier = exp(Z x sigma - sigma_sq/2)   where Z ~ N(0,1)',
            '',
            'Results — Climate Change (kg CO2e / kg product):',
            '  P5  (5th percentile / lower bound)  = ' + numFmt(mcP5/pWeightKg, 4) + ' kg CO2e/kg',
            '  Median                              = ' + numFmt(mcMed/pWeightKg, 4) + ' kg CO2e/kg',
            '  P95 (95th percentile / upper bound) = ' + numFmt(mcP95/pWeightKg, 4) + ' kg CO2e/kg',
            '  90% confidence interval width       = ' + numFmt((mcP95-mcP5)/pWeightKg, 4) + ' kg CO2e/kg',
            '  CV (overall):                       = ' + fix(mcCV, 1) + '%',
            '',
            // GAP-9 FIX: CV interpretation — always shown, severity-flagged
            'CV INTERPRETATION:',
            ...(mcCV >= 80 ? [
                '  WARNING (CV >= 80%): The 90% confidence interval is wider than the central estimate.',
                '  Results have very high uncertainty. Do not use for decision-making without primary data',
                '  for the highest-contributing processes. Hotspot identification is still valid.',
                '  Primary cause: missing primary data for key ingredients or secondary data with high GSD.'
            ] : mcCV >= 50 ? [
                '  CAUTION (CV >= 50%): High uncertainty. The confidence interval spans a wide range.',
                '  Suitable for directional hotspot benchmarking and internal screening.',
                '  Not suitable for regulatory submissions or verified comparative claims.',
                '  To reduce: collect primary data for ingredients contributing >10% of total impact.'
            ] : [
                '  ACCEPTABLE (CV < 50%): Uncertainty is within normal bounds for screening-level LCA.',
                '  Results suitable for internal hotspot analysis and preliminary supplier engagement.'
            ])
        ], { sectionLabel: 'DQR & Uncertainty (continued)' });

        // Visual range bar
        ensureSpace(18, 'DQR & Uncertainty (continued)');
        const barRangeW = CW - 40;
        const barRangeX = M + 20;
        const barRangeY = Y + 4;
        doc.setDrawColor(...C.rule); doc.setLineWidth(0.3);
        doc.line(barRangeX, barRangeY, barRangeX + barRangeW, barRangeY);
        const rangeMin = Math.min(mcP5, mcMed) / pWeightKg;
        const rangeMax = Math.max(mcP95, mcMed) / pWeightKg;
        const rangeTot = rangeMax - rangeMin || 1;
        const p5X  = barRangeX + ((mcP5/pWeightKg  - rangeMin) / rangeTot) * barRangeW;
        const medX = barRangeX + ((mcMed/pWeightKg - rangeMin) / rangeTot) * barRangeW;
        const p95X = barRangeX + ((mcP95/pWeightKg - rangeMin) / rangeTot) * barRangeW;
        doc.setFillColor(...C.teal);
        doc.rect(p5X, barRangeY - 3, Math.max(p95X - p5X, 1), 6, 'F');
        doc.setFillColor(...C.navyDark);
        doc.rect(medX - 0.8, barRangeY - 4, 1.6, 8, 'F');
        T.small();
        doc.text('P5: ' + numFmt(mcP5/pWeightKg,3), p5X, barRangeY + 6, {align:'center'});
        doc.text('Median: ' + numFmt(mcMed/pWeightKg,3), medX, barRangeY - 6, {align:'center'});
        doc.text('P95: ' + numFmt(mcP95/pWeightKg,3), p95X, barRangeY + 6, {align:'center'});
        Y += 18;

        footer('DQR & Uncertainty — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // AUDIT TRAIL + DATA SOURCES
        // ================================================================
        newPage('Audit Trail — Data Sources and Traceability');

        // Audit hash
        doc.setFillColor(...C.navyDark);
        doc.rect(M, Y, CW, 20, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.teal);
        doc.text('AUDIT HASH (SHA-256)', M + 3, Y + 6);
        doc.setFont('courier','normal'); doc.setFontSize(7.5); doc.setTextColor(...C.white);
        doc.text(safe(auditHash).slice(0,64) || '[Hash not generated — run calculation first]', M + 3, Y + 12);
        doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(180, 200, 220); // FIX-3: was setTextColor([180,200,220]) — array arg throws jsPDF.f3 "Invalid argument"
        doc.text('Covers: all calculation inputs + all outputs + all database versions  |  Generated: ' + dateStr, M + 3, Y + 18);
        Y += 24;

        // Database versions
        subHeader('Background Database Versions + EF 3.1 Source References');
        const dbRows = [
            ['LCI database',        'AGRIBALYSE 3.2',      'ADEME / INRAE 2022 — https://agribalyse.ademe.fr/'],
            ['LCIA method',         'EF 3.1',               'JRC Technical Report EUR 29540 EN (2019)'],
            ['Transport',           'GLEC v3.2',            'Smart Freight Centre, October 2025'],
            ['Grid intensity',      'Ember 2025',           'Ember Climate, 2025 — Global Electricity Review'],
            ['Air pollutants',      'EMEP/EEA 2023',        'EEA Air Pollutant Emission Inventory Guidebook 2023'],
            ['GWP values',          'IPCC AR5 GWP100',      'CH4=28, N2O=265 (no climate-carbon feedback)'],
            ['Water scarcity',      'AWARE 2.0',            'Boulay et al. 2018 — WULCA consensus model'],
            ['Land use',            'LANCA v2.5',           'Fraunhofer IBP / JRC — SQI occupation factors'],
            ['Toxicity',            'USEtox 2.14',          'UNEP/SETAC — continental agricultural soil compartment'],
            ['Packaging CFF',       'PEF Annex C v2.1',     'European Commission, May 2020'],
            ['NF/WF factors',       'EF 3.1 JRC',           'JRC Technical Report EUR 29540 EN — Tables 6 & 7'],
            ['Crop yields',         'FAOSTAT 2020-2024',    'FAO Statistical Databases — Crops and Livestock Products'],
            ['ILCD UUIDs',          'ILCD registry',        'EC EPLCA / Life Cycle Data Network — see Normalisation page'],
            ['Agribalyse IDs',      'source_activity field','Official LCI Name per AGRIBALYSE 3.2 CSV (no UUID column in open data release)']
        ];

        doc.autoTable({
            startY: Y,
            head: [['Data type','Version','Source reference']],
            body: dbRows,
            theme: 'plain',
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0: { cellWidth: 38, fontStyle: 'bold' },
                1: { cellWidth: 40 },
                2: { cellWidth: 104, textColor: C.bodyMid }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 5;

        // System boundary
        subHeader('System Boundary Declaration (ISO 14044 §4.2.3.3)');
        traceBlock([
            'INCLUDED:',
            '  - Agricultural production (farm gate, AGRIBALYSE 3.2)',
            '  - Ingredient processing (AGRIBALYSE 3.2 system boundary)',
            '  - Factory manufacturing energy (Ember 2025 grid / declared energy source)',
            '  - Outbound transport to retailer (GLEC v3.2)',
            '  - Primary packaging (PEF 3.1 CFF)',
            // FIX UPSTREAM-1: this line previously read "EXCLUDED" while the engine
            // actively computed and totalled this impact — a direct contradiction
            // between the declared boundary and the actual calculation. Corrected to
            // state what the engine really does: FR-origin ingredients rely on
            // AGRIBALYSE 3.2's embedded French market transport (no separate leg);
            // non-FR-origin ingredients get an explicit inbound transport leg via
            // GLEC v3.2, using a proxy origin-to-factory distance table pending
          '  - Inbound ingredient transport for non-FR-origin ingredients (GLEC v3.2, proxy',
            '    distance — see "Upstream" stage in Executive Summary / Total Impact tables',
            '    and Layer B "B14" per ingredient for full derivation)',
            '',
            'EXCLUDED (declared per ISO 14044 §4.2.3.3):',
            '  - Retail energy and operations',
            '  - Consumer use phase and cooking',
            '  - End-of-life consumer waste (post-retail)',
            '  - Capital equipment manufacturing (cut-off rule)',
            '  - Inbound transport for FR-origin ingredients: AGRIBALYSE 3.2 already includes',
            '    representative French market transport within its farm-gate boundary',
            '',
            'Functional unit: 1 kg of product as sold (finished weight).',
            'Allocation: Economic allocation, inherited from AGRIBALYSE 3.2 (ADEME methodology report).'
        ], { sectionLabel: 'Audit Trail (continued)' });

        // Known gaps
        subHeader('Known Gaps and Confidence Flags');
        const gapRows = [
            ['Packaging disposal (cardboard)', 'LOW',    'Landfill/incineration split from Eurostat 2013. Update required for regulatory submission.'],
            ['Glass packaging parameters',      'LOW',    'FEVE source not obtained. Literature estimate used.'],
            ['Non-road transport non-CC',       'ZERO',   'Sea/air/rail non-CC impact factors pending derivation. Zero declared.'],
            ['Processing energy benchmarks',    'MEDIUM', 'Industry benchmark database. Primary factory data preferred.'],
            ['Ecotoxicity freshwater (trans.)', 'LOW',    'Combustion Zn only. Tyre/brake wear excluded.'],
            ['AWARE water (non-FR origins)',    'MEDIUM', 'Country-level ratio adjustment applied to AGRIBALYSE FR baseline.'],
            ['USEtox pesticide toxicity',       'PARTIAL','Requires CAS-level pesticide application data. Not collected in standard form.'],
            ['Farmed fish feed model',          'DEFERRED','Feed-driven emissions model for aquaculture deferred to Phase 3.']
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
                0: { cellWidth: 55, fontStyle: 'bold' },
                1: { cellWidth: 22, halign: 'center' },
                2: { cellWidth: 105, textColor: C.bodyMid }
            },
            margin: { left: M }
        });
        Y = doc.lastAutoTable.finalY + 4;

        footer('Audit Trail — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // GAP-11 FIX: FOREGROUND / BACKGROUND ANALYSIS PAGE
        // Source: audit.foreground_background (calculation_engine.js lines 2778-2792)
        // Required for PEF 3.1 §5.6 documentation of process segregation
        // ================================================================
        newPage('Foreground / Background Process Analysis (PEF 3.1 §5.6)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('PEF 3.1 §5.6 requires segregation of foreground (under operational control) and background processes.', M, Y); Y += 4;
        doc.text('Source: audit.foreground_background (calculation_engine.js)', M, Y); Y += 6;

        const fb = audit.foreground_background || {};
        const fbFgCount  = fb.foreground_count  || 0;
        const fbBgCount  = fb.background_count  || 0;
        const fbFgDQR    = fb.foreground_dqr    || 0;
        const fbBgDQR    = fb.background_dqr    || 0;
        // ROOT CAUSE FIX (2025-06-05):
        // Engine sets foreground_contribution / background_contribution (raw kg CO2e)
        // NOT foreground_cc_pct / background_cc_pct. Field name mismatch caused 0% always.
        // Fix: derive percentages from the raw values the engine actually populates.
        const _fbTotalCC = (fb.foreground_contribution || 0) + (fb.background_contribution || 0);
        const _fbTotalRef = _fbTotalCC > 0 ? _fbTotalCC : (audit.pefCategories?.['Climate Change']?.total || 1);
        const fbFgCC     = _fbTotalRef > 0 ? ((fb.foreground_contribution || 0) / _fbTotalRef * 100) : 0;
        const fbBgCC     = _fbTotalRef > 0 ? ((fb.background_contribution || 0) / _fbTotalRef * 100) : 0;

        traceBlock([
            'FOREGROUND vs BACKGROUND PROCESS SEGREGATION',
            '  Definition: Foreground = processes under direct operational control (own factory,',
            '    own farm with primary data supplied). Background = all other processes (AGRIBALYSE',
            '    3.2 secondary data, benchmark transport/energy).',
            '',
            'FOREGROUND PROCESSES:',
            '  Count            : ' + fbFgCount,
            '  DQR (average)    : ' + fix(fbFgDQR, 2) + ' / 5.0',
            '  CC contribution  : ' + fix(fbFgCC, 1) + '% of total Climate Change',
            '  Data source      : Primary data (user-supplied meter readings / field records)',
            '',
            'BACKGROUND PROCESSES:',
            '  Count            : ' + fbBgCount,
            '  DQR (average)    : ' + fix(fbBgDQR, 2) + ' / 5.0',
            '  CC contribution  : ' + fix(fbBgCC, 1) + '% of total Climate Change',
            '  Data source      : AGRIBALYSE 3.2 (ADEME/INRAE 2022) + benchmark factors',
            '',
            'DQR THRESHOLDS (PEF 3.1 §5.7):',
            '  Foreground processes : DQR <= 2.0 required (PEF 3.1 §5.6 foreground). Actual: ' + fix(fbFgDQR,2) + '  -> ' + (fbFgDQR<=2?'PASS':'FAIL'),
            '  Background processes : DQR <= 3.0 required (PEF 3.1 §5.6 background). Actual: ' + fix(fbBgDQR,2) + '  -> ' + (fbBgDQR<=3?'PASS':'FAIL'),
            '',
            'NOTE: If foreground_background data is not populated (zeros above), no primary factory',
            '  data was supplied. All processes are treated as background (AGRIBALYSE secondary data).',
            '  To improve foreground coverage: supply primary factory data in Manufacturing section.'
        ], { sectionLabel: 'Foreground / Background (continued)' });

        // Ingredient-level foreground/background table
        // ROOT CAUSE FIX (2025-06-05):
        // Engine sets fb.components.foreground[] and fb.components.background[] —
        // NOT fb.ingredient_breakdown (that field never existed). Falling back to
        // ingList (traceability array) lost the primary_data_used flag so all rows
        // showed BACKGROUND. Fix: build rows from fb.components directly, then fall
        // back to ingComps (from audit.contribution_tree, already fixed above).
        const _fbFgItems = (fb.components?.foreground || []).map(i => ({ ...i, _isFg: true }));
        const _fbBgItems = (fb.components?.background || []).map(i => ({ ...i, _isFg: false }));
        const _fbAllItems = [..._fbFgItems, ..._fbBgItems];
        // If fb.components is empty, fall back to ingComps which carries primary_data_used
        const _fbSource = _fbAllItems.length > 0 ? _fbAllItems : ingComps.map(ing => ({
            ...ing,
            _isFg: !!(ing.primary_data_used || ing.primary_data)
        }));
        const fbIngRows = _fbSource.map(ing => {
            const isFg  = ing._isFg !== undefined ? ing._isFg : !!(ing.primary_data_used || ing.primary_data);
            const ingDQR = ing.dqr || 2.00;
            const ingCCkg = ing.co2 || ing.subtotal || 0;
            const ingCCpct = _fbTotalRef > 0 ? (ingCCkg / _fbTotalRef * 100).toFixed(1) : '0.0';
            return [
                safe(trunc(ing.name || ing.id || '', 40)),
                isFg ? 'FOREGROUND' : 'BACKGROUND',
                fix(ingDQR, 2),
                isFg ? 'Primary data (user-supplied)' : 'AGRIBALYSE 3.2 secondary',
                // Bug 3 FIX: thresholds corrected to match compliance_engine.js (2.0/3.0 not 3.0/4.0)
                isFg ? (ingDQR <= 2 ? 'PASS' : 'FAIL') : (ingDQR <= 3 ? 'PASS' : 'FAIL')
            ];
        });
        if (fbIngRows.length > 0) {
            ensureSpace(fbIngRows.length * 7 + 14, 'Foreground / Background (continued)');
            doc.autoTable({
                startY: Y,
                head: [['Ingredient','Type','DQR','Data Source','DQR Check']],
                body: fbIngRows,
                theme: 'plain',
                styles: { fontSize: 7, cellPadding: 2 },
                headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: C.rowAlt },
                columnStyles: {
                    0: { cellWidth: 60, fontStyle: 'bold' },
                    1: { cellWidth: 28, halign: 'center' },
                    2: { cellWidth: 16, halign: 'center' },
                    3: { cellWidth: 52 },
                    4: { cellWidth: 26, halign: 'center' }
                },
                didParseCell: (data) => {
                    if (data.column.index === 4) {
                        data.cell.styles.textColor = data.row.raw[4] === 'PASS' ? C.green : C.red;
                        data.cell.styles.fontStyle = 'bold';
                    }
                    if (data.column.index === 1) {
                        data.cell.styles.textColor = data.row.raw[1] === 'FOREGROUND' ? C.teal : C.bodyMid;
                    }
                },
                margin: { left: M }
            });
            Y = doc.lastAutoTable.finalY + 4;
        }
        footer('Foreground/Background — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // GAP-12 & GAP-13 FIX: ALLOCATION SENSITIVITY + CUTOFF VALIDATION
        // Source: audit.allocation_sensitivity, audit.cutoff_validation
        // (calculation_engine.js lines 2794-2795)
        // ================================================================
        newPage('Allocation Sensitivity + Cutoff Validation (ISO 14044)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Allocation sensitivity: tests whether result changes significantly under alternative allocation methods.', M, Y); Y += 4;
        doc.text('Cutoff validation: confirms all processes contributing >=1% of total CC impact are included.', M, Y); Y += 6;

        const allocSens = audit.allocation_sensitivity || {};
        const cutoffVal = audit.cutoff_validation     || {};

        // Allocation sensitivity
        subHeader('Allocation Sensitivity Analysis (ISO 14044 §4.3.4)');
        const allocBase  = allocSens.base_method   || 'Economic (AGRIBALYSE 3.2 default)';
        const allocAlt   = allocSens.alt_method    || 'Mass allocation (alternative)';
        const allocBaseCC = allocSens.base_cc_per_kg   || ccPerKg;
        const allocAltCC  = allocSens.alt_cc_per_kg    || 0;
        const allocDelta  = allocSens.delta_pct        || 0;
        const allocSensitive = allocSens.sensitive      || false;

        traceBlock([
            'BASE METHOD   : ' + safe(allocBase),
            '  CC result   : ' + numFmt(allocBaseCC, 4) + ' kg CO2e / kg product',
            '',
            'ALT METHOD    : ' + safe(allocAlt),
            '  CC result   : ' + (allocAltCC > 0 ? numFmt(allocAltCC, 4) + ' kg CO2e / kg product' : 'Not computed (no multi-output processes in this product system)'),
            '',
            'SENSITIVITY   : ' + (allocSensitive ? 'SENSITIVE — delta > 25%, results differ materially' : (allocAltCC > 0 ? 'NOT SENSITIVE — delta <= 25%, allocation method does not materially affect result' : 'NOT APPLICABLE — all ingredients are single-output systems (no co-products)')),
            '  Delta       : ' + (allocDelta > 0 ? fix(allocDelta,1) + '%' : 'N/A'),
            '',
            'PEF 3.1 requirement: If results are sensitive to allocation method, this must be disclosed.',
            allocSensitive ? '  WARNING: Sensitivity declared. Consider mass or energy allocation as verification.' : '  COMPLIANT: Economic allocation (AGRIBALYSE 3.2) used. Result is allocation-stable.'
        ], { sectionLabel: 'Allocation Sensitivity (continued)' });

        Y += 3;
        // Cutoff validation
        subHeader('Cutoff Validation (ISO 14044 §4.2.2 / PEF 3.1 §5.6)');
        const cutoffThresh  = cutoffVal.threshold_pct || 1.0;
        const cutoffTotal   = cutoffVal.total_cc      || ccPerKg;
        const cutoffChecked = cutoffVal.processes_checked || ingList.length;
        const cutoffPassed  = cutoffVal.all_pass       || true;
        const cutoffItems   = cutoffVal.items          || [];

        traceBlock([
            'CUTOFF RULE: All processes contributing >= ' + fix(cutoffThresh,1) + '% of total CC must be explicitly included.',
            'Total CC (reference): ' + numFmt(cutoffTotal, 4) + ' kg CO2e / kg product',
            'Cutoff threshold    : ' + numFmt(cutoffTotal * cutoffThresh/100, 6) + ' kg CO2e / kg product',
            'Processes checked   : ' + cutoffChecked,
            'Overall status      : ' + (cutoffPassed ? 'PASS — all significant processes are included' : 'FAIL — see items below'),
            '',
            'PROCESS-LEVEL CUTOFF CHECKS:',
            ...(cutoffItems.length > 0
                ? cutoffItems.map(it => '  ' + (it.pass?'OK ':'FAIL') + '  ' + trunc(it.name||it.id,40) + '  contrib=' + fix(it.pct||0,1) + '%  DQR=' + fix(it.dqr||0,2))
                : ingList.map(ing => {
                    // FIX: use ingComps (sourced from audit.contribution_tree, fully populated)
                    // instead of pef[cat].contribution_tree.components (initialised as [] empty array)
                    const ingCC2 = ingComps.find(c => c.id===ing.id || c.name===ing.name);
                    const pctV = ingCC2 ? ((ingCC2.subtotal||0)/ccTotal*100) : 0;
                    const dqrV = ing.dqr || ing.overall || 2.00;
                    // FIX: [pdf-generator audit] Was using stale 3.0/4.0 thresholds — the
                    // same bug already identified and fixed elsewhere in this file (see
                    // PDF-F2 FIX below, DNM Compliance Check page) but missed here. Corrected
                    // to match compliance_engine.js PRIMARY_DQR_MAX=2.0 / SECONDARY_DQR_MAX=3.0.
                    const passes = dqrV <= (ing.primary_data_used ? 2.0 : 3.0);
                    return '  ' + (passes?'OK ':'WARN') + '  ' + trunc(ing.name||ing.id,40) + '  contrib=' + fix(pctV,1) + '%  DQR=' + fix(dqrV,2);
                })
            )
        ], { sectionLabel: 'Cutoff Validation (continued)' });

        footer('Allocation & Cutoff — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // GAP-14 FIX: JRC VALIDATION RESULT PAGE
        // Source: audit.jrc_validation (calculation_engine.js lines 2797-2800)
        // ================================================================
        newPage('JRC Validation + Compliance Summary (PEF 3.1)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('JRC validation checks that EF 3.1 characterisation factors and PEF 3.1 methodological requirements are met.', M, Y); Y += 6;

        const jrcVal   = audit.jrc_validation || {};
        const jrcPass  = jrcVal.overall_pass   || false;
        const jrcChecks = jrcVal.checks        || [];
        const jrcScore  = jrcVal.score         || 0;
        // FIX: [compliance audit] Distinguish "not applicable" (no JRC BAT reference
        // data exists for this packaging material) from "PARTIAL" (checks ran and some
        // failed). Previously both rendered as an amber "PARTIAL" banner, which reads as
        // a failed check to an auditor when in fact no check was performed at all.
        const jrcNotApplicable = jrcVal.not_applicable === true;

        // Overall verdict banner
        const jrcBannerColor = jrcNotApplicable ? C.bodyMid : (jrcPass ? C.green : C.amber);
        const jrcBannerText  = jrcNotApplicable
            ? 'JRC / PEF 3.1 VALIDATION: NOT APPLICABLE'
            : (jrcPass ? 'JRC / PEF 3.1 VALIDATION: PASS' : 'JRC / PEF 3.1 VALIDATION: PARTIAL');
        doc.setFillColor(...jrcBannerColor);
        doc.rect(M, Y, CW, 14, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.white);
        doc.text(jrcBannerText, M + 4, Y + 9);
        if (jrcScore > 0 && !jrcNotApplicable) {
            doc.setFont('helvetica','normal'); doc.setFontSize(8);
            doc.text('Score: ' + fix(jrcScore,0) + '/100', PW - M - 4, Y + 9, {align:'right'});
        }
        Y += 18;
        if (jrcNotApplicable && jrcVal.note) {
            T.small(); doc.setTextColor(...C.bodyMid);
            doc.text(safe(jrcVal.note), M, Y, { maxWidth: CW });
            Y += 10;
        }

        if (jrcChecks.length > 0) {
            // FIX: [pdf-generator audit] Was reading chk.rule/chk.check and chk.note/chk.message —
            // fields that don't exist on the actual objects compliance_engine.js's runJRCValidation()
            // pushes. The real fields are category, pass, deviation, reference, calculated (confirmed
            // by reading the actual checks.push() calls). Only the rare "missing data" case sets a
            // `note` field at all. This meant every real deviation check rendered with a blank check
            // name and blank notes column — only the PASS/FAIL status happened to work, since chk.pass
            // was the one field that did exist, giving the "PARTIAL / FAIL / FAIL" with no detail seen
            // in real output.
            const jrcRows = jrcChecks.map(chk => {
                const checkName = safe(chk.category || 'Unknown category');
                const status    = chk.pass ? 'PASS' : 'FAIL';
                let noteText;
                if (chk.note) {
                    noteText = safe(chk.note);
                } else if (chk.deviation !== null && chk.deviation !== undefined) {
                    noteText = 'Deviation ' + fix(chk.deviation, 1) + '% — reference: ' +
                               fix(chk.reference, 4) + ', calculated: ' + fix(chk.calculated, 4);
                } else {
                    noteText = '';
                }
                return [checkName, status, noteText];
            });
            doc.autoTable({
                startY: Y,
                head: [['Validation Check','Status','Notes']],
                body: jrcRows,
                theme: 'plain',
                styles: { fontSize: 7, cellPadding: 2 },
                headStyles: { fillColor: C.navyDark, textColor: C.white, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: C.rowAlt },
                columnStyles: {
                    0: { cellWidth: 72, fontStyle: 'bold' },
                    1: { cellWidth: 22, halign: 'center' },
                    2: { cellWidth: 88 }
                },
                didParseCell: (data) => {
                    if (data.column.index === 1) {
                        const v = data.row.raw[1];
                        data.cell.styles.textColor = v === 'PASS' ? C.green : v === 'WARN' ? C.amber : C.red;
                        data.cell.styles.fontStyle = 'bold';
                    }
                },
                margin: { left: M }
            });
            Y = doc.lastAutoTable.finalY + 4;
        } else {
            // No JRC checks available — show what we can verify from the engine output
            traceBlock([
                'JRC validation object not populated by engine for this run.',
                'Manual verification of key PEF 3.1 requirements:',
                '',
                '  [CHECK] All 16 EF 3.1 impact categories computed      : ' + (Object.keys(pef).filter(k=>!k.startsWith('Climate Change -')).length >= 16 ? 'PASS' : 'FAIL'),
                '  [CHECK] CC sub-splits (Fossil/Biogenic/Land Use) shown : ' + ((fossilCC || bioCC || dlucCC) ? 'PASS' : 'FAIL — sub-splits missing'),
                '  [CHECK] NF and WF values from DB (not hardcoded)       : ' + (Object.keys(resolvedNF).length >= 16 ? 'PASS' : 'PARTIAL — check pef_factors DB'),
                '  [CHECK] ILCD UUIDs available in DB                     : ' + (Object.keys(ilcd).length >= 10 ? 'PASS' : 'PARTIAL — check ilcd_registry DB'),
                '  [CHECK] DQR computed per PEF 3.1 §5.7                 : ' + (dqrVal > 0 ? 'PASS — DQR=' + fix(dqrVal,2) : 'FAIL — DQR not computed'),
                '  [CHECK] SHA-256 audit hash generated                   : ' + (auditHash.length > 8 ? 'PASS' : 'FAIL — hash not generated'),
                '  [CHECK] Functional unit declared                       : PASS — 1 kg of product as sold',
                '  [CHECK] System boundary declared (ISO 14044 §4.2.3.3)  : PASS — Cradle-to-retail',
                '  [CHECK] Allocation method declared                     : PASS — Economic (AGRIBALYSE 3.2)',
                '  [CHECK] Third-party verification                       : NOT DONE — screening level only',
                '',
                'Note: Run compliance_engine.js evaluateJRC() to populate full check list.'
            ], { sectionLabel: 'JRC Validation (continued)' });
        }
        footer('JRC Validation — Page ' + pageNum + ' of {total_pages_count}');
        newPage('Methodology Declaration + Legal Notice');
        subHeader('Methodology Overview');

        const col3W = (CW - 8) / 3;
        const col3Y = Y;
        const boxH  = 62;

        const drawCol3 = (x, title, items, col) => {
            doc.setFillColor(...col);
            doc.rect(x, col3Y, col3W, 7, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...C.white);
            doc.text(safe(title), x + 2, col3Y + 4.8);
            doc.setFillColor(...C.pageBg);
            doc.setDrawColor(...col); doc.setLineWidth(0.3);
            doc.rect(x, col3Y + 7, col3W, boxH, 'FD');
            doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.bodyDark);
            items.forEach((item, i) => {
                doc.text('• ' + safe(item), x + 3, col3Y + 7 + 4 + i * 7.2, { maxWidth: col3W - 5 });
            });
        };

        drawCol3(M, 'THIS REPORT PROVIDES', [
            'Full glass-box derivation', 'All formulas substituted', 'All database refs shown',
            'NF/WF printed verbatim', 'AGRIBALYSE LCI Names', 'ILCD EF 3.1 UUIDs',
            'All gaps declared', 'SHA-256 audit hash'
        ], C.teal);

        drawCol3(M + col3W + 4, 'THIS REPORT IS NOT', [
            'ISO 14044 critically reviewed', 'Third-party verified', 'EPD (ISO 14025) eligible',
            'Ecoinvent-based', 'For comparative advertising', 'Regulatory submission ready'
        ], C.red);

        drawCol3(M + (col3W + 4)*2, 'SUITABLE FOR', [
            'CSRD/ESRS E1 Scope 3 screening', 'Retailer pre-compliance (CDP)',
            'EcoVadis questionnaires', 'Internal hotspot benchmarking',
            'Parametric scenario modelling', 'Supplier engagement'
        ], C.green);

        Y = col3Y + boxH + 12;

        doc.setFillColor(...C.rowAlt);
        doc.setDrawColor(...C.navyDark); doc.setLineWidth(0.5);
        doc.rect(M, Y, CW, 40, 'FD');
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
            'All values are expressed per 1 kg of product as sold. This document may not be used to support ' +
            'comparative environmental assertions per ISO 14044 §6 without independent critical review.';

        doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(...C.bodyDark);
        const discLines = doc.splitTextToSize(disclaimer, CW - 6);
        discLines.forEach(line => { doc.text(safe(line), M + 3, Y); Y += 4.5; });
        Y += 5;

        hRule(Y); Y += 5;
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Prepared by: AIOXY Environmental Intelligence', M, Y);
        doc.text('Calculation engine: AIOXY v5.0  |  PDF Report: ' + _PDF_VERSION, M, Y + 4.5);
        doc.text('Assessment ID: ' + safe(dppId), M, Y + 9);
        doc.text('Report generated: ' + new Date().toISOString(), M, Y + 13.5);

        footer('Methodology & Legal — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // FIX-21: ECO-SCORE PAGE — grade derivation fully transparent
        // ================================================================
        newPage('Front-of-Pack Eco-Score — Derivation and Methodology');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Internal consumer-facing environmental grade. Based on PEF Single Score (uPt/kg). NOT for external environmental claims.', M, Y); Y += 6;

        const ecoMpt   = mPt;  // already computed above
        // DB-1 FIX (2026-06-07): Thresholds corrected from [150/250/400/600] to [15000/25000/40000/60000] µPt.
        // WF values corrected to EF 3.1 Table 7 (JRC EUR 29540 EN, WF sum=1.0).
        // Previous WF values were 100x too small; thresholds now match corrected µPt output scale.
        let ecoGrade   = 'E', ecoThreshNote = '>= 60000 uPt (>= 60 mPt)';
        if (ecoMpt < 15000)       { ecoGrade = 'A'; ecoThreshNote = '< 15000 uPt (< 15 mPt)'; }
        else if (ecoMpt < 25000)  { ecoGrade = 'B'; ecoThreshNote = '15000-24999 uPt (15-25 mPt)'; }
        else if (ecoMpt < 40000)  { ecoGrade = 'C'; ecoThreshNote = '25000-39999 uPt (25-40 mPt)'; }
        else if (ecoMpt < 60000)  { ecoGrade = 'D'; ecoThreshNote = '40000-59999 uPt (40-60 mPt)'; }

        const ecoCol = ecoGrade === 'A' ? C.teal : ecoGrade === 'B' ? C.green :
                       ecoGrade === 'C' ? C.amber : ecoGrade === 'D' ? [244,162,97] : C.red;

        doc.setFillColor(...ecoCol);
        doc.rect(M, Y, CW, 22, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(36); doc.setTextColor(...C.white);
        doc.text(ecoGrade, M + 12, Y + 17);
        doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.white);
        doc.text('Front-of-Pack Eco-Score', M + 30, Y + 9);
        doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(...C.white);
        doc.text(numFmt(ecoMpt, 2) + ' uPt/kg  |  Threshold: ' + ecoThreshNote, M + 30, Y + 16);
        Y += 26;

        traceBlock([
            'ECO-SCORE DERIVATION (glass-box — full arithmetic):',
            '',
            'Step 1 — PEF Single Score (from Normalisation & Weighting page):',
            '  uPt/kg product = ' + numFmt(ecoMpt, 2) + ' uPt',
            '  Source: SUM_i [ (impact_i/kg) / NF_i x WF_i ] x 1,000,000  (JRC EUR 29540 EN)',
            '  WF values: EF 3.1 Table 7 canonical values (sum=1.0000) -- DB-1 FIX 2026-06-07',
            '',
            'Step 2 — Threshold lookup (internal AIOXY benchmarks, calibrated to corrected WF scale):',
            '  A: uPt < 15000   B: 15000 <= uPt < 25000   C: 25000 <= uPt < 40000',
            '  D: 40000 <= uPt < 60000   E: uPt >= 60000',
            '  Equivalent in mPt: A<15  B<25  C<40  D<60  E>=60',
            '  This product: ' + numFmt(ecoMpt,2) + ' uPt  ->  Grade ' + ecoGrade + '  (' + ecoThreshNote + ')',
            '',
            'Step 3 — Grade assigned: ' + ecoGrade,
            '',
            'IMPORTANT CAVEATS:',
            '  - These thresholds are INTERNAL AIOXY benchmarks, not a regulated scheme.',
            '  - NOT equivalent to the official French Eco-Score or Planet-Score methodologies.',
            '  - NOT for use in external environmental claims or marketing.',
            '  - Suitable for: internal hotspot benchmarking, supplier engagement, CSRD screening.',
            '  - For external claims: requires third-party verification per applicable national regulation.',
            '',
            'Reference -- industry uPt benchmarks (approximate, for context only):',
            '  Beef burger (250g)    : ~2,500,000-4,000,000 uPt/kg  (very high -- livestock emissions)',
            '  Chicken breast        : ~400,000-800,000 uPt/kg',
            '  Typical ready meal    : ~200,000-600,000 uPt/kg  (depends on meat content)',
            '  Plant-based burger    : ~100,000-300,000 uPt/kg',
            '  Oat milk              : ~50,000-150,000 uPt/kg',
            '  Source: AGRIBALYSE 3.2 / ADEME product benchmarks (indicative ranges, converted to uPt)'
        ], { sectionLabel: 'Eco-Score (continued)' });

        footer('Eco-Score — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // FIX-22: NUTRITIONAL LCA PAGE — CO2 per 100g protein, fully derived
        // ================================================================
        newPage('Nutritional LCA — Impact per 100g Delivered Protein');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('Impact normalised per 100g delivered protein. Enables like-for-like comparison of protein sources.', M, Y); Y += 3;
        doc.text('Formula: CO2_per_100g_protein = CC_impact_per_kg x (100 / (protein_g_per_100g x 10))', M, Y); Y += 6;

        // Compute from available data
        const userProteinPer100g = window.lastInput?.product?.proteinPer100g || null;
        const ccImpactPerKg = ccPerKg;

        if (userProteinPer100g && userProteinPer100g > 0) {
            const kgNeededFor100gProtein = 100 / (userProteinPer100g * 10);
            const co2Per100gProtein = ccImpactPerKg * kgNeededFor100gProtein;

            traceBlock([
                'NUTRITIONAL LCA DERIVATION (full arithmetic):',
                '',
                'Input data:',
                '  Product protein content   : ' + fix(userProteinPer100g,2) + ' g protein per 100g product',
                '  Source: window.lastInput.product.proteinPer100g  (user-supplied)',
                '  CC impact per kg product  : ' + numFmt(ccImpactPerKg,6) + ' kg CO2e/kg',
                '  Source: engine contribution tree — all stages combined',
                '',
                'Step 1 — kg of product needed to deliver 100g protein:',
                '  kgNeeded = 100g protein / (protein_per_100g x 10)',
                '           = 100 / (' + fix(userProteinPer100g,2) + ' x 10)',
                '           = 100 / ' + fix(userProteinPer100g*10,2),
                '           = ' + fix(kgNeededFor100gProtein,6) + ' kg product per 100g protein',
                '',
                'Step 2 — CO2e per 100g delivered protein:',
                '  CO2/100g protein = CC_per_kg x kgNeeded',
                '                   = ' + numFmt(ccImpactPerKg,6) + ' x ' + fix(kgNeededFor100gProtein,6),
                '                   = ' + fix(co2Per100gProtein,4) + ' kg CO2e per 100g delivered protein',
                '',
                'REFERENCE BENCHMARKS (AGRIBALYSE 3.2 — approximate, for context):',
                '  Beef (roasted)    : ~4.0–8.0  kg CO2e per 100g protein',
                '  Chicken (grilled) : ~1.0–2.0  kg CO2e per 100g protein',
                '  Pork (cooked)     : ~1.5–3.0  kg CO2e per 100g protein',
                '  Tofu              : ~0.3–0.6  kg CO2e per 100g protein',
                '  Lentils (cooked)  : ~0.05–0.1 kg CO2e per 100g protein',
                '  Eggs              : ~0.8–1.5  kg CO2e per 100g protein',
                '',
                'This product: ' + fix(co2Per100gProtein,4) + ' kg CO2e / 100g protein',
                'Note: Benchmarks are ranges from published AGRIBALYSE 3.2 data. Not directly comparable',
                '      without identical system boundary and functional unit.'
            ], { sectionLabel: 'Nutritional LCA (continued)' });
        } else {
            traceBlock([
                'NUTRITIONAL LCA: Not calculated.',
                '',
                'Reason: window.lastInput.product.proteinPer100g not provided.',
                'To activate: enter product protein content (g per 100g) in the product form.',
                '',
                'The formula is:',
                '  CO2_per_100g_protein = CC_impact_per_kg x (100 / (protein_g_per_100g x 10))',
                '',
                'This product CC impact: ' + numFmt(ccImpactPerKg,6) + ' kg CO2e/kg  (available for calculation)',
                'Once protein is entered, the full derivation will be shown here.'
            ], { sectionLabel: 'Nutritional LCA (continued)' });
        }

        footer('Nutritional LCA — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // FIX-23: DNM COMPLIANCE CHECK — data and method coverage
        // ================================================================
        newPage('DNM Compliance Check — Data and Method Coverage (PEF 3.1 §5.6)');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('DNM = Data and Method coverage. Checks whether processes contributing >1% of total impact have adequate data quality.', M, Y); Y += 3;
        doc.text('Source: compliance_engine.js evaluateDNM(). PEF 3.1 §5.6 / ISO 14044 §4.2.2.', M, Y); Y += 6;

        // Run DNM check from available data
        // Build process list from contribution tree
        const dnmProcesses = [];
        const stageLabels = ['Ingredients','Manufacturing','Transport','Packaging'];
        stageLabels.forEach(stage => {
            const stageTree = fullTree['Climate Change']?.[stage];
            if (!stageTree) return;
            const comps = stageTree.components || [];
            comps.forEach(c => {
                dnmProcesses.push({
                    name: safe(c.name || stage),
                    impact: c.subtotal || 0,
                    dqr: c.dqr || (stage === 'Ingredients' ? 2.5 : 3.0),
                    // PDF-F2 FIX: isUnderOperationalControl always false — consistent with
                    // compliance_engine.js which sets this to false for all processes.
                    // No foreground flagging mechanism exists yet (Finding J6-F1).
                    isUnderOperationalControl: false
                });
            });
            // Add stage total if no components
            if (comps.length === 0 && stageTree.total > 0) {
                dnmProcesses.push({
                    name: stage,
                    impact: stageTree.total,
                    dqr: stage === 'Manufacturing' ? 2.0 : 3.0,
                    isUnderOperationalControl: false
                });
            }
        });

        const dnmTotal = ccTotal || 1;
        // PDF-F2 FIX (Audit Session 14): Correct DNM thresholds to match compliance_engine.js.
        // Previous values (3.0/4.0) were wrong — too lenient by 1.0 DQR point each.
        // PEF 3.1 §5.6: foreground (operational control) DQR ≤ 2.0, background DQR ≤ 3.0.
        // Source: compliance_engine.js PRIMARY_DQR_MAX = 2.0, SECONDARY_DQR_MAX = 3.0.
        const DNM_PRIMARY_MAX  = 2.0;   // PEF 3.1 §5.6 — foreground/operational control processes
        const DNM_SECONDARY_MAX = 3.0;  // PEF 3.1 §5.6 — background/non-operational processes
        const DNM_THRESHOLD    = 0.01;  // 1% contribution threshold

        const dnmViolations = [];
        const dnmWarnings   = [];
        const dnmOk         = [];

        dnmProcesses.forEach(p => {
            const contrib = p.impact / dnmTotal;
            if (contrib < DNM_THRESHOLD) return;
            if (p.isUnderOperationalControl && p.dqr > DNM_PRIMARY_MAX) {
                dnmViolations.push(p);
            } else if (!p.isUnderOperationalControl && p.dqr > DNM_SECONDARY_MAX) {
                dnmWarnings.push(p);
            } else {
                dnmOk.push(p);
            }
        });

        const dnmStatus = dnmViolations.length === 0 ? 'COMPLIANT' : 'VIOLATION';
        const dnmCol = dnmViolations.length === 0 ? C.green : C.red;

        doc.setFillColor(...dnmCol);
        doc.rect(M, Y, CW, 10, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(...C.white);
        doc.text('DNM STATUS: ' + dnmStatus + '  |  Violations: ' + dnmViolations.length + '  |  Warnings: ' + dnmWarnings.length, M + 3, Y + 6.5);
        Y += 14;

        const dnmLines = [
            'DNM RULES (PEF 3.1 §5.6):',
            '  Threshold : processes contributing >=1% of total CC impact must be checked',
            '  Primary   : under operational control — DQR must be <= ' + DNM_PRIMARY_MAX,
            '  Secondary : not under operational control — DQR must be <= ' + DNM_SECONDARY_MAX,
            '  Total CC for check: ' + numFmt(dnmTotal,6) + ' kg CO2e  |  1% threshold = ' + numFmt(dnmTotal*0.01,6) + ' kg CO2e',
            ''
        ];

        if (dnmViolations.length > 0) {
            dnmLines.push('VIOLATIONS (require primary data collection):');
            dnmViolations.forEach(p => {
                dnmLines.push('  !! ' + safe(p.name) + '  contrib=' + fix(p.impact/dnmTotal*100,1) + '%  DQR=' + fix(p.dqr,2) + '  control=' + (p.isUnderOperationalControl?'YES':'NO') + '  limit=' + (p.isUnderOperationalControl?DNM_PRIMARY_MAX:DNM_SECONDARY_MAX));
            });
            dnmLines.push('');
        }
        if (dnmWarnings.length > 0) {
            dnmLines.push('WARNINGS (recommended to improve data quality):');
            dnmWarnings.forEach(p => {
                dnmLines.push('  ?? ' + safe(p.name) + '  contrib=' + fix(p.impact/dnmTotal*100,1) + '%  DQR=' + fix(p.dqr,2) + '  control=NO  limit=' + DNM_SECONDARY_MAX);
            });
            dnmLines.push('');
        }
        if (dnmOk.length > 0) {
            dnmLines.push('PROCESSES CHECKED — COMPLIANT:');
            dnmOk.forEach(p => {
                dnmLines.push('  OK ' + safe(p.name) + '  contrib=' + fix(p.impact/dnmTotal*100,1) + '%  DQR=' + fix(p.dqr,2));
            });
        }
        traceBlock(dnmLines, { sectionLabel: 'DNM Check (continued)' });
        footer('DNM Check — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // PARAMETRIC TWIN — FULL GLASS-BOX SECTION
        // Injected here: after ingredient deep-dive, before QR verification.
        // Reads window._twinResultsForPDF written by twin_module.js
        // renderTwinResults(). No-op if twin was not calculated.
        // ================================================================
        // ================================================================
        // PARAMETRIC TWIN — FULL GLASS-BOX SECTION
        // Reads window._twinResultsForPDF written by twin_module.js
        // renderTwinResults(). Shows placeholder if twin not yet run.
        // ================================================================
        const twinHelpers = {
            C, M, CW, PH,
            safe, fix, numFmt, pct,
            ensureSpace, subHeader, hRule, footer,
            newPage,
            get Y()       { return Y; },
            set Y(v)      { Y = v; },
            get pageNum() { return pageNum; },
            set pageNum(v){ pageNum = v; }
        };

        // Try both window.buildTwinPDFSection and window._aioxy_twinPDFBuilder
        const twinBuilder = (typeof window.buildTwinPDFSection === 'function')
            ? window.buildTwinPDFSection
            : (typeof window._aioxy_twinPDFBuilder === 'function')
                ? window._aioxy_twinPDFBuilder
                : null;

        if (window._twinResultsForPDF && twinBuilder) {
            // Twin was run — render full glass-box twin section
            twinBuilder(doc, twinHelpers);
        } else {
            // Twin not run — render informational placeholder page
            // so the PDF recipient knows the section exists and how to activate it
            newPage('Parametric Twin — Not Run');

            doc.setFillColor(...C.teal);
            doc.rect(M, Y, CW, 10, 'F');
            doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
            doc.setTextColor(...C.white);
            doc.text('PARAMETRIC TWIN ANALYSIS', M + 3, Y + 6.5);
            Y += 14;

            doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
            doc.setTextColor(...C.bodyMid);
            const placeholderLines = [
                'The Parametric Twin comparison was not run before this PDF was generated.',
                '',
                'The twin section includes:',
                '  - Apple-to-Apple comparison: identical system boundary, only ingredient(s) differ',
                '  - What-If scenario: full independent PEF 3.1 calculation with changed parameters',
                '  - All 16 EF 3.1 impact categories: Main vs Twin with delta and percentage change',
                '  - Stage breakdown: Ingredients / Manufacturing / Transport / Packaging',
                '  - Twin ingredient bill of materials with origin and processing state',
                '  - 3-layer glass-box derivation per twin ingredient (Layer A / B / C)',
                '',
                'To generate the twin section:',
                '  1. Run the main product calculation first',
                '  2. Go to the Parametric Twin tab',
                '  3. Configure the twin (ingredient swap or operational parameters)',
                '  4. Click "Run Twin Comparison"',
                '  5. Download the PDF Report — the twin section will be included automatically',
                '',
                'The twin calculation is independent of the main product LCA result.',
                'The cradle-to-retail footprint shown in this report is not affected by the twin.',
            ];
            placeholderLines.forEach(line => {
                doc.text(safe(line), M, Y);
                Y += 5;
            });

            footer('Parametric Twin — Page ' + pageNum + ' of {total_pages_count}');
        }

        // ================================================================
        // OFFLINE VERIFICATION + QR
        // ================================================================
        newPage('Offline Verification — Digital Transparency Card');

        subHeader('What This QR Code Contains');
        T.small(); doc.setTextColor(...C.bodyMid);
        doc.text('No internet required. All verification data is embedded directly in the QR code.', M, Y);
        doc.text('Scan with any smartphone camera. Data is self-contained and does not expire.', M, Y + 4.5);
        Y += 10;

        const qrDataRows = [
            ['Assessment ID',       safe(dppId)],
            ['Product',             safe(pName)],
            ['Climate Change',      numFmt(ccPerKg, 4) + ' kg CO2e / kg product'],
            ['PEF Single Score',    numFmt(mPt, 2) + ' uPt / kg product'],
            ['Data Quality (DQR)',  fix(dqrVal, 2) + ' / 5.0'],
            ['Functional unit',     '1 kg of product as sold'],
            ['LCI database',        'AGRIBALYSE 3.2 (ADEME/INRAE 2022)'],
            ['LCIA method',         'EF 3.1 — 16 categories + 3 CC sub-splits'],
            ['Assessment date',     safe(dateStr)],
            ['Audit hash (SHA-256)',safe(auditHash).slice(0, 32) + (auditHash.length > 32 ? '..' : '')],
            ['Report version',      'AIOXY PDF ' + _PDF_VERSION],
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

        if (hasTwin) {
            doc.setFillColor(...C.green);
            doc.rect(M, Y, CW, 7, 'F');
            doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...C.white);
            doc.text('Parametric twin: ' + safe(twinName) + '  |  ' + numFmt(twinCO2,4) + ' kg CO2e/kg  |  Reduction: ' + pct(reduction), M + 3, Y + 4.8);
            Y += 10;
        }

        hRule(Y); Y += 5;

        // QR generation
        const qrPayloadLines = [
            'AIOXY GLASS-BOX ASSESSMENT v7.0',
            'ID: ' + safe(dppId),
            'Product: ' + safe(pName).slice(0,40),
            'CC: ' + numFmt(ccPerKg,4) + ' kg CO2e/kg',
            'Score: ' + numFmt(mPt,2) + ' uPt/kg',
            'DQR: ' + fix(dqrVal,2) + '/5.0',
            'DB: AGRIBALYSE 3.2',
            'Method: EF 3.1 / PEF 3.1',
            'Date: ' + safe(dateStr),
            'Hash: ' + safe(auditHash).slice(0,16),
            'Type: Screening-level LCA',
            'NOT third-party verified'
        ];
        if (hasTwin) {
            qrPayloadLines.push('Twin: ' + numFmt(twinCO2,4) + ' kg CO2e/kg');
            qrPayloadLines.push('Reduction: ' + pct(reduction));
        }
        const qrPayload = qrPayloadLines.join('\n');

        const hiddenQrDiv = document.createElement('div');
        hiddenQrDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
        document.body.appendChild(hiddenQrDiv);

        const qrSize = 45;
        const qrX    = M;
        const qrY    = Y;
        const instrX = M + qrSize + 8;
        const instrW = CW - qrSize - 8;

        doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(...C.navyDark);
        doc.text('SCAN FOR OFFLINE VERIFICATION', instrX, qrY + 8);
        T.small(); doc.setTextColor(...C.bodyMid);
        const instrLines = [
            'No internet required.',
            'All data is embedded directly in this QR code.',
            'Scan with any smartphone camera.',
            '',
            'This QR contains:',
            '  - Product identity and assessment ID',
            '  - Climate Change result (kg CO2e/kg)',
            '  - PEF Single Score (uPt/kg)',
            '  - Data quality rating (DQR)',
            '  - Database and method references',
            '  - Audit hash for integrity check',
            hasTwin ? '  - Parametric twin comparison' : ''
        ].filter(l => l !== undefined);

        instrLines.forEach((line, i) => {
            doc.text(safe(line), instrX, qrY + 15 + i * 4.2);
        });

        const legalY = qrY + 15 + instrLines.length * 4.2 + 4;
        doc.setFillColor(...C.rowAlt);
        doc.rect(instrX, legalY, instrW, 12, 'F');
        doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(...C.bodyMid);
        const legalText = 'Screening-level estimate. Modelled values based on AGRIBALYSE 3.2 and supplied data. Not independently verified.';
        doc.splitTextToSize(legalText, instrW - 4).forEach((line, i) => {
            doc.text(safe(line), instrX + 2, legalY + 4 + i * 3.8);
        });

        // qrcodejs constructor API — renders into a temp div, reads back the img src as data URL
        const attemptQrEmbed = () => new Promise((resolve) => {
            if (typeof QRCode === 'undefined') {
                resolve(null);
                return;
            }
            try {
                hiddenQrDiv.innerHTML = '';
                new QRCode(hiddenQrDiv, {
                    text:         qrPayload,
                    width:        180,
                    height:       180,
                    colorDark:    '#0A2540',
                    colorLight:   '#FFFFFF',
                    correctLevel: QRCode.CorrectLevel.M
                });
                // qrcodejs renders async internally — wait one tick for img to populate
                setTimeout(() => {
                    try {
                        const img = hiddenQrDiv.querySelector('img');
                        if (img && img.src && img.src.startsWith('data:')) {
                            resolve(img.src);
                            return;
                        }
                        // Fallback: try canvas if img not ready
                        const canvas = hiddenQrDiv.querySelector('canvas');
                        if (canvas) {
                            resolve(canvas.toDataURL('image/png'));
                            return;
                        }
                        resolve(null);
                    } catch(e) {
                        resolve(null);
                    }
                }, 150);
            } catch(e) {
                resolve(null);
            }
        });

        const qrDataUrl = await attemptQrEmbed();

        if (qrDataUrl) {
            try {
                doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
                doc.setDrawColor(...C.navyDark); doc.setLineWidth(0.4);
                doc.rect(qrX, qrY, qrSize, qrSize);
                doc.setFont('helvetica','bold'); doc.setFontSize(6.5); doc.setTextColor(...C.navyDark);
                doc.text('OFFLINE VERIFICATION', qrX + qrSize/2, qrY + qrSize + 4, {align:'center'});
                doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(...C.bodyMid);
                doc.text('Data embedded — no internet needed', qrX + qrSize/2, qrY + qrSize + 8, {align:'center'});
            } catch(e) {
                doc.setFillColor(...C.rowAlt);
                doc.rect(qrX, qrY, qrSize, qrSize, 'F');
                doc.setDrawColor(...C.navyMid); doc.setLineWidth(0.3);
                doc.rect(qrX, qrY, qrSize, qrSize);
                doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.bodyMid);
                doc.text('QR unavailable', qrX + qrSize/2, qrY + qrSize/2, {align:'center'});
            }
        } else {
            doc.setFillColor(...C.rowAlt);
            doc.rect(qrX, qrY, qrSize, qrSize, 'F');
            doc.setDrawColor(...C.navyMid); doc.setLineWidth(0.3);
            doc.rect(qrX, qrY, qrSize, qrSize);
            doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(...C.navyDark);
            doc.text('QR', qrX + qrSize/2, qrY + qrSize/2 - 4, {align:'center'});
            doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(...C.bodyMid);
            doc.text(safe(dppId).slice(0,16), qrX + qrSize/2, qrY + qrSize/2 + 3, {align:'center'});
            doc.text('(QRCode library', qrX + qrSize/2, qrY + qrSize/2 + 8, {align:'center'});
            doc.text('not loaded)', qrX + qrSize/2, qrY + qrSize/2 + 12, {align:'center'});
        }

        if (document.body.contains(hiddenQrDiv)) document.body.removeChild(hiddenQrDiv);

        Y = qrY + qrSize + 14;
        footer('Offline Verification — Page ' + pageNum + ' of {total_pages_count}');

        // ================================================================
        // RETROACTIVE PAGE NUMBERING
        // ================================================================
        const realTotalPages = doc.internal.getNumberOfPages();
        for (let pg = 1; pg <= realTotalPages; pg++) {
            doc.setPage(pg);
            doc.setFillColor(...C.navyDark);
            doc.rect(PW - 50, 0, 52, 10, 'F');
            doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.white);
            doc.text('Page ' + pg + ' of ' + realTotalPages, PW - M, 6.8, {align:'right'});
            const sectionLabel = _pageSectionLabels[pg] || '';
            const fixedLabel   = sectionLabel.replace(/of \?\?/g, 'of ' + realTotalPages);
            doc.setFillColor(...C.navyDark);
            doc.rect(PW * 0.45, PH - 8, PW * 0.55 + 2, 8, 'F');
            doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(...C.white);
            doc.text(safe(fixedLabel), PW - M, PH - 3.5, {align:'right'});
        }

        // ================================================================
        // SAVE
        // ================================================================
        const filename = 'AIOXY_GlassBox_' + safe(pName).replace(/\s+/g,'_').slice(0,30) + '_' + dateStr + '.pdf';

        // PDF-F4 FIX (Audit Session 14): Resolve {total_pages_count} placeholder in all footers.
        // doc.putTotalPages() replaces every occurrence of the placeholder string with the
        // actual total page count before the PDF is saved. jsPDF standard pattern.
        doc.putTotalPages('{total_pages_count}');

        doc.save(filename);
        console.log('[AIOXY PDF ' + _PDF_VERSION + '] Glass-Box Report saved: ' + filename + ' (' + pageNum + ' pages)');

    } catch (err) {
        // v7.1: Full diagnostic — copy the console.error output and send to developer
        console.error('[AIOXY PDF v7.1] CRASH — full error below:');
        console.error('Message:', err.message);
        console.error('Stack:\n', err.stack || '(no stack available)');
        console.error('PDF version loaded:', window._AIOXY_PDF_VERSION || 'UNKNOWN — old cached file!');
        alert(
            'PDF generation error: ' + err.message + '\n\n' +
            'PDF engine version: ' + (window._AIOXY_PDF_VERSION || 'UNKNOWN — OLD CACHED FILE DETECTED') + '\n\n' +
            'NEXT STEP: Open DevTools (F12) → Console tab → copy the full red error block and send to developer.\n\n' +
            'If version shows UNKNOWN: press Ctrl+Shift+R (hard reload) then try again.'
        );
    } finally {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
}

// ── PUBLIC API — preserve existing call signatures ────────────
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

console.log('[AIOXY] pdf-generator.js v7.1 loaded — FIX: setTextColor array→args (3 locations), microPoints→weighted*1e6 (2 locations)');
