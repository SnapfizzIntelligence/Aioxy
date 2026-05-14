// ================== AIOXY TWIN MODULE v2.0 ==================
// Parametric Twin — Full UI, Apple-to-Apple & What-If modes,
// Results display, PDF bridge
//
// Depends on:  main.js  (twinSelectedIngredients, buildTwinInput,
//                         copyMainToTwin, calculateImpact)
//              ui.js    (loaded before this file)
//              window.aioxyData  (ingredient/country database)
//
// Exposes to window:
//   setupTwinIngredientSearch()
//   populateTwinCountrySelects()
//   addTwinIngredient()
//   removeTwinIngredient(i)
//   updateTwinIngredientList()
//   updateTwinIngredientQuantity(i,v)
//   updateTwinIngredientOrigin(i,v)
//   updateTwinIngredientProcessing(i,v)
//   selectTwinIngredient(id,name)
//   renderTwinResults(mainResult, twinResult)
//   clearTwinResults()
//   buildTwinPDFSection(doc, helpers)
// ====================================================================

(function () {

// ====================================================================
// 1. TWIN INGREDIENT SEARCH
// ====================================================================
function setupTwinIngredientSearch() {
    var searchInput  = document.getElementById('twinIngredientSearch');
    var dropdown     = document.getElementById('twinIngredientDropdown');
    var hiddenSelect = document.getElementById('twinIngredientSelect');

    if (!searchInput || !dropdown) {
        console.warn('[TwinModule] twinIngredientSearch or dropdown not found');
        return;
    }

    var ingredients = (window.aioxyData && window.aioxyData.ingredients) || {};
    var searchIndex = Object.entries(ingredients).map(function (e) {
        return {
            id:      e[0],
            name:    e[1].name     || 'Unknown',
            name_fr: e[1].name_fr  || '',
            dqr:     (e[1].data && e[1].data.metadata && e[1].data.metadata.dqr_overall) || 2.5,
            co2:     (e[1].data && e[1].data.pef && e[1].data.pef['Climate Change'])     || 0
        };
    });

    console.log('[TwinModule] Indexed ' + searchIndex.length + ' ingredients');

    searchInput.addEventListener('input', function (e) {
        var q = e.target.value.toLowerCase().trim();
        if (q.length < 2) { dropdown.classList.add('hidden'); return; }

        var matches = searchIndex.filter(function (item) {
            return (item.name || '').toLowerCase().includes(q) ||
                   (item.name_fr || '').toLowerCase().includes(q);
        }).slice(0, 15);

        dropdown.innerHTML = matches.length === 0
            ? '<li class="no-results">No ingredients found</li>'
            : matches.map(function (item) {
                var s = (item.name || 'Unknown').replace(/'/g, "\\'");
                return '<li onclick="selectTwinIngredient(\'' + item.id + '\',\'' + s + '\')">' +
                    '<div class="ingredient-name">' + (item.name || 'Unknown') + '</div>' +
                    '<div class="ingredient-meta">DQR: ' + item.dqr.toFixed(1) +
                    ' | CO\u2082e: ' + item.co2.toFixed(3) + ' kg/kg' +
                    (item.name_fr ? ' | ' + item.name_fr.substring(0, 38) : '') + '</div>' +
                    '</li>';
              }).join('');

        dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target))
            dropdown.classList.add('hidden');
    });

    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
            searchInput.value = '';
            if (hiddenSelect) hiddenSelect.value = '';
        }
    });
}

window.selectTwinIngredient = function (id, name) {
    var s = document.getElementById('twinIngredientSelect');
    var i = document.getElementById('twinIngredientSearch');
    var d = document.getElementById('twinIngredientDropdown');
    if (s) s.value = id;
    if (i) i.value = name || 'Unknown';
    if (d) d.classList.add('hidden');
};

// ====================================================================
// 2. POPULATE TWIN COUNTRY SELECTS
// ====================================================================
function populateTwinCountrySelects() {
    if (!window.aioxyData || !window.aioxyData.countries) return;
    var countries = window.aioxyData.countries;
    var sorted = Object.keys(countries).sort(function (a, b) {
        return countries[a].name.localeCompare(countries[b].name);
    });

    function flag(code) {
        try { return String.fromCodePoint.apply(null,
            code.toUpperCase().split('').map(function (c) { return 127397 + c.charCodeAt(0); })); }
        catch (e) { return ''; }
    }

    var orSel = document.getElementById('twinIngredientOriginSelect');
    if (orSel && orSel.options.length <= 1) {
        sorted.filter(function (c) { return c !== 'FR'; }).forEach(function (code) {
            var o = document.createElement('option');
            o.value = code;
            o.textContent = flag(code) + ' ' + countries[code].name;
            orSel.appendChild(o);
        });
    }

    var mfgSel = document.getElementById('twinManufacturingCountry');
    if (mfgSel && mfgSel.options.length <= 1) {
        sorted.forEach(function (code) {
            var o = document.createElement('option');
            o.value = code;
            o.textContent = flag(code) + ' ' + countries[code].name;
            if (code === 'FR') o.selected = true;
            mfgSel.appendChild(o);
        });
    }

    console.log('[TwinModule] Country selects populated');
}

// ====================================================================
// 3. ADD / REMOVE / UPDATE TWIN INGREDIENTS
// ====================================================================
window.addTwinIngredient = function () {
    var idEl  = document.getElementById('twinIngredientSelect');
    var qtyEl = document.getElementById('twinIngredientQuantity');
    var orEl  = document.getElementById('twinIngredientOriginSelect');
    var srEl  = document.getElementById('twinIngredientSearch');

    var id  = idEl  ? idEl.value : '';
    var qty = parseFloat(qtyEl ? qtyEl.value : '0');
    var or  = orEl  ? orEl.value : 'FR';

    if (!id)                    { alert('Search and select an ingredient first.'); return; }
    if (isNaN(qty) || qty <= 0) { alert('Enter a valid quantity (kg).'); return; }

    var db = window.aioxyData && window.aioxyData.ingredients;
    if (!db || !db[id]) { alert('Ingredient not found in database.'); return; }

    window.twinSelectedIngredients = window.twinSelectedIngredients || [];
    window.twinSelectedIngredients.push({
        id: id, name: db[id].name || 'Unknown',
        quantity: qty, originCountry: or,
        processingState: 'raw', physics_note: ''
    });
    twinSelectedIngredients = window.twinSelectedIngredients;

    updateTwinIngredientList();
    calculateImpact();

    if (idEl)  idEl.value  = '';
    if (srEl)  srEl.value  = '';
    if (qtyEl) qtyEl.value = '0.150';
    if (orEl)  orEl.value  = 'FR';
};

window.removeTwinIngredient = function (index) {
    window.twinSelectedIngredients = window.twinSelectedIngredients || [];
    window.twinSelectedIngredients.splice(index, 1);
    twinSelectedIngredients = window.twinSelectedIngredients;
    updateTwinIngredientList();
    calculateImpact();
};

window.updateTwinIngredientQuantity = function (index, val) {
    window.twinSelectedIngredients = window.twinSelectedIngredients || [];
    if (window.twinSelectedIngredients[index]) {
        window.twinSelectedIngredients[index].quantity = parseFloat(val) || 0;
        twinSelectedIngredients = window.twinSelectedIngredients;
        calculateImpact();
    }
};

window.updateTwinIngredientOrigin = function (index, val) {
    window.twinSelectedIngredients = window.twinSelectedIngredients || [];
    if (window.twinSelectedIngredients[index]) {
        window.twinSelectedIngredients[index].originCountry = val;
        twinSelectedIngredients = window.twinSelectedIngredients;
        calculateImpact();
    }
};

window.updateTwinIngredientProcessing = function (index, val) {
    window.twinSelectedIngredients = window.twinSelectedIngredients || [];
    if (window.twinSelectedIngredients[index]) {
        window.twinSelectedIngredients[index].processingState = val;
        twinSelectedIngredients = window.twinSelectedIngredients;
        calculateImpact();
    }
};

// ====================================================================
// 4. RENDER TWIN BOM LIST
// ====================================================================
function updateTwinIngredientList() {
    var list = document.getElementById('twinIngredientList');
    if (!list) return;

    var ings = window.twinSelectedIngredients || [];

    if (ings.length === 0) {
        list.innerHTML =
            '<div style="text-align:center;padding:1.25rem;color:var(--gray);font-size:0.85rem;">' +
            '<i class="fas fa-flask" style="font-size:1.5rem;margin-bottom:0.5rem;display:block;opacity:0.35;"></i>' +
            'No twin ingredients yet \u2014 add them above or use <strong>Copy from Main</strong></div>';
        return;
    }

    function buildOriginOptions(cur) {
        var ctrs = (window.aioxyData && window.aioxyData.countries) || {};
        var keys = Object.keys(ctrs).sort(function (a, b) { return ctrs[a].name.localeCompare(ctrs[b].name); });
        var frFirst = keys.filter(function (c) { return c === 'FR'; });
        var rest    = keys.filter(function (c) { return c !== 'FR'; });
        return [].concat(frFirst, rest).map(function (code) {
            var sel = (code === (cur || 'FR')) ? 'selected' : '';
            var f = '';
            try { f = String.fromCodePoint.apply(null, code.toUpperCase().split('').map(function (c) { return 127397 + c.charCodeAt(0); })); } catch(e) {}
            return '<option value="' + code + '" ' + sel + '>' + f + ' ' + (ctrs[code] && ctrs[code].name ? ctrs[code].name : code) + '</option>';
        }).join('');
    }

    list.innerHTML = ings.map(function (ing, i) {
        var db   = window.aioxyData && window.aioxyData.ingredients;
        var data = db && db[ing.id] ? db[ing.id] : null;
        var co2  = (data && data.data && data.data.pef && data.data.pef['Climate Change']) || 0;
        var dqr  = (data && data.data && data.data.metadata && data.data.metadata.dqr_overall) || 2.5;
        var src  = (data && data.data && data.data.metadata && data.data.metadata.source_dataset) || 'AGRIBALYSE 3.2';
        var dqrC = dqr <= 1.6 ? 'dqr-excellent' : dqr <= 2.0 ? 'dqr-very-good' : dqr <= 3.0 ? 'dqr-good' : 'dqr-poor';
        var dqrL = dqr <= 1.6 ? 'Excellent'     : dqr <= 2.0 ? 'Very Good'      : dqr <= 3.0 ? 'Good'     : 'Fair/Poor';
        var ps   = ing.processingState || 'raw';

        return '<div class="ingredient-item" style="border-bottom:1px solid #B2DFDB;padding:0.9rem 1rem;">' +
            '<div class="ingredient-info" style="flex:1;">' +
                '<div class="ingredient-name" style="color:#2C7A7B;font-weight:700;">' + ing.name + '</div>' +
                '<div class="ingredient-stats" style="font-size:0.78rem;color:var(--gray);margin-top:0.2rem;">' +
                    co2.toFixed(3) + ' kg CO\u2082e/kg' +
                    ' <span class="dqr-badge ' + dqrC + '" style="margin-left:0.4rem;font-size:0.7rem;">DQR: ' + dqrL + '</span>' +
                    ' <span class="source-badge" style="margin-left:0.4rem;">' + src + '</span>' +
                '</div>' +
                '<div style="margin-top:0.5rem;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">' +
                    '<div><span style="font-size:0.7rem;font-weight:bold;color:var(--primary);">Processing:</span>' +
                    '<select style="font-size:0.7rem;padding:0.2rem 0.4rem;margin-left:0.2rem;border-radius:4px;border:1px solid var(--border);" onchange="updateTwinIngredientProcessing(' + i + ',this.value)">' +
                        '<option value="raw"           ' + (ps==='raw'           ?'selected':'') + '>Raw (Farm Gate)</option>' +
                        '<option value="dry_milled"    ' + (ps==='dry_milled'    ?'selected':'') + '>Dry Milled (Flour)</option>' +
                        '<option value="wet_extracted" ' + (ps==='wet_extracted' ?'selected':'') + '>Wet Extracted</option>' +
                        '<option value="isolated"      ' + (ps==='isolated'      ?'selected':'') + '>Isolated (Protein Isolate)</option>' +
                        '<option value="fermentation"  ' + (ps==='fermentation'  ?'selected':'') + '>Precision Fermentation</option>' +
                    '</select></div>' +
                    '<div><span style="font-size:0.7rem;font-weight:bold;color:var(--primary);">Origin:</span>' +
                    '<select style="font-size:0.7rem;padding:0.2rem 0.4rem;margin-left:0.2rem;border-radius:4px;border:1px solid var(--border);" onchange="updateTwinIngredientOrigin(' + i + ',this.value)">' +
                        buildOriginOptions(ing.originCountry) +
                    '</select></div>' +
                '</div>' +
            '</div>' +
            '<div class="ingredient-actions" style="align-items:center;gap:0.5rem;">' +
                '<input type="number" class="quantity-input" value="' + ing.quantity + '" step="0.001" min="0" style="width:85px;" onchange="updateTwinIngredientQuantity(' + i + ',this.value)">' +
                '<button class="remove-btn" onclick="removeTwinIngredient(' + i + ')" title="Remove"><i class="fas fa-times"></i></button>' +
            '</div>' +
        '</div>';
    }).join('');
}

// ====================================================================
// 5. RENDER TWIN RESULTS IN RESULTS TAB
// ====================================================================
function renderTwinResults(mainResult, twinCalcResult) {
    var resultsContent = document.getElementById('resultsContent');
    if (!resultsContent) return;

    var card = document.getElementById('twinResultsCard');
    if (!card) {
        card = document.createElement('div');
        card.id        = 'twinResultsCard';
        card.className = 'card';
        card.style.cssText = 'border-left:4px solid #2C7A7B;margin-top:1.5rem;';
        resultsContent.appendChild(card);
    }

    if (!twinCalcResult || !twinCalcResult.finalPefResults) {
        card.style.display = 'none';
        return;
    }

    card.style.display = '';

    var mainPef   = mainResult.finalPefResults  || {};
    var twinPef   = twinCalcResult.finalPefResults || {};
    var mainAudit = mainResult.auditTrailData   || {};
    var twinAudit = twinCalcResult.auditTrailData || {};

    var mainMass = (mainAudit.mass_balance && mainAudit.mass_balance.final_content_weight_kg) || 0.2;
    var twinMass = (twinAudit.mass_balance && twinAudit.mass_balance.final_content_weight_kg) || 0.2;

    function perKg(pef, cat, mass) { return ((pef[cat] && pef[cat].total) || 0) / mass; }

    var mainCO2   = perKg(mainPef, 'Climate Change',             mainMass);
    var twinCO2   = perKg(twinPef, 'Climate Change',             twinMass);
    var mainWater = perKg(mainPef, 'Water Use/Scarcity (AWARE)', mainMass);
    var twinWater = perKg(twinPef, 'Water Use/Scarcity (AWARE)', twinMass);
    var mainLand  = perKg(mainPef, 'Land Use',                   mainMass);
    var twinLand  = perKg(twinPef, 'Land Use',                   twinMass);
    var mainFoss  = perKg(mainPef, 'Resource Use, fossils',      mainMass);
    var twinFoss  = perKg(twinPef, 'Resource Use, fossils',      twinMass);
    var mainPt    = (mainAudit.pef_single_score && mainAudit.pef_single_score.singleScore) || 0;
    var twinPt    = (twinAudit.pef_single_score && twinAudit.pef_single_score.singleScore) || 0;

    var mainName  = mainAudit.productName || 'Main Product';
    var twinName  = twinAudit.productName || 'Parametric Twin';

    var mainIngs = window.selectedIngredients        || [];
    var twinIngs = window.twinSelectedIngredients    || [];
    var modeLabel = (twinIngs.length === mainIngs.length) ? 'Apple-to-Apple' : 'What-If Scenario';
    var modeColor = (twinIngs.length === mainIngs.length) ? '#2C7A7B'        : '#8E44AD';
    var modeIcon  = (twinIngs.length === mainIngs.length) ? 'fa-exchange-alt': 'fa-flask';

    var co2Delta    = twinCO2 - mainCO2;
    var co2DeltaPct = mainCO2 !== 0 ? (co2Delta / Math.abs(mainCO2)) * 100 : 0;
    var isBetter    = co2Delta < 0;
    var summaryCol  = Math.abs(co2Delta) < 1e-8 ? '#718096' : (isBetter ? '#27AE60' : '#E63946');
    var summaryArrow= Math.abs(co2Delta) < 1e-8 ? 'fa-equals' : (isBetter ? 'fa-arrow-down' : 'fa-arrow-up');

    function fmtV(v, dec) {
        if (!isFinite(v)) return '\u2014';
        if (Math.abs(v) < 0.0001 && v !== 0) return v.toExponential(2);
        return v.toFixed(dec);
    }

    function deltaChip(main, twin, dec, unit) {
        var d   = twin - main;
        var pct = main !== 0 ? (d / Math.abs(main)) * 100 : 0;
        if (Math.abs(d) < 1e-9) return '<span style="color:#718096;font-size:0.75rem;">No change</span>';
        var col   = d < 0 ? '#27AE60' : '#E63946';
        var arrow = d < 0 ? '\u2193' : '\u2191';
        return '<span style="color:' + col + ';font-weight:700;font-size:0.8rem;">' +
               arrow + ' ' + Math.abs(pct).toFixed(1) + '%<br><span style="font-size:0.7rem;">(' +
               (d > 0 ? '+' : '') + d.toFixed(dec) + ' ' + unit + ')</span></span>';
    }

    // ── 16-category table ────────────────────────────────────────────
    var cats16 = [
        ['Climate Change',               'kg CO\u2082e',   4, true],
        ['Water Use/Scarcity (AWARE)',    'm\u00b3',        5, false],
        ['Land Use',                      'Pt',             2, false],
        ['Resource Use, fossils',         'MJ',             3, false],
        ['Eutrophication, terrestrial',   'mol Ne',         5, false],
        ['Eutrophication, freshwater',    'kg Pe',          6, false],
        ['Eutrophication, marine',        'kg Ne',          5, false],
        ['Acidification',                 'mol H+e',        5, false],
        ['Particulate Matter',            'disease inc.',   7, false],
        ['Photochemical Ozone Formation', 'kg NMVOCe',      5, false],
        ['Ozone Depletion',               'kg CFC11e',      8, false],
        ['Human Toxicity, non-cancer',    'CTUh',           8, false],
        ['Human Toxicity, cancer',        'CTUh',           9, false],
        ['Ecotoxicity, freshwater',       'CTUe',           3, false],
        ['Ionizing Radiation',            'kBq U235e',      4, false],
        ['Resource Use, minerals/metals', 'kg Sbe',         8, false]
    ];

    var catRows = cats16.map(function (row) {
        var cat = row[0]; var unit = row[1]; var dec = row[2]; var highlight = row[3];
        var mv  = perKg(mainPef, cat, mainMass);
        var tv  = perKg(twinPef, cat, twinMass);
        var d   = tv - mv;
        var same   = Math.abs(d) < 1e-10;
        var better = d < 0;
        var dCol   = same ? '#718096' : (better ? '#27AE60' : '#E63946');
        var dStr   = same ? '\u2014' : ((d > 0 ? '+' : '') + fmtV(d, dec));
        var dPct   = mv !== 0 ? ((d / Math.abs(mv)) * 100) : 0;
        var dPctStr= same ? '' : (' (' + (dPct > 0 ? '+' : '') + dPct.toFixed(1) + '%)');
        var rowBg  = highlight ? 'background:#E8F8F5;font-weight:700;' : '';
        return '<tr style="border-bottom:1px solid var(--border);' + rowBg + '">' +
            '<td style="padding:5px 8px;font-size:0.78rem;' + (highlight ? 'color:#2C7A7B;font-weight:700;' : '') + '">' + cat + '</td>' +
            '<td style="padding:5px 8px;font-size:0.72rem;color:var(--gray);">' + unit + '</td>' +
            '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;">' + fmtV(mv, dec) + '</td>' +
            '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;color:#2C7A7B;font-weight:600;">' + fmtV(tv, dec) + '</td>' +
            '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;color:' + dCol + ';font-weight:600;">' + dStr + dPctStr + '</td>' +
        '</tr>';
    }).join('');

    // ── Life cycle stage rows (CC) ────────────────────────────────────
    var stgRows = ['Ingredients','Manufacturing','Transport','Packaging'].map(function (s) {
        function stCC(pef, mass) {
            var tree = (pef['Climate Change'] && pef['Climate Change'].contribution_tree) || {};
            return ((tree[s] && tree[s].total) || 0) / mass;
        }
        var mv = stCC(mainPef, mainMass);
        var tv = stCC(twinPef, twinMass);
        var d  = tv - mv;
        var same = Math.abs(d) < 1e-9;
        var dCol = same ? '#718096' : (d < 0 ? '#27AE60' : '#E63946');
        return '<tr style="border-bottom:1px solid var(--border);">' +
            '<td style="padding:5px 8px;font-size:0.78rem;">' + s + '</td>' +
            '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;">' + fmtV(mv,4) + '</td>' +
            '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;color:#2C7A7B;font-weight:600;">' + fmtV(tv,4) + '</td>' +
            '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;color:' + dCol + ';font-weight:600;">' +
                (same ? '\u2014' : (d > 0 ? '+' : '') + fmtV(d,4)) + '</td>' +
        '</tr>';
    }).join('');

    // ── Operational params used ───────────────────────────────────────
    function gv(id) { return (document.getElementById(id) || {}).value || '—'; }
    var opParams = [
        ['Mfg Country', gv('twinManufacturingCountry')],
        ['Processing',  gv('twinProcessingMethod')],
        ['Energy',      gv('twinEnergySource')],
        ['Transport',   gv('twinTransportMode') + ' / ' + gv('twinTransportDistance') + ' km'],
        ['Packaging',   gv('twinPackagingMaterial') + ' ' + gv('twinPackagingWeight') + ' kg'],
        ['Recycled',    gv('twinRecycledContent') + '%']
    ].map(function (p) {
        return '<div><span style="font-weight:700;color:var(--primary);font-size:0.75rem;">' + p[0] + ':</span>' +
               ' <span style="font-size:0.75rem;">' + p[1] + '</span></div>';
    }).join('');

    // ── Twin BOM rows ─────────────────────────────────────────────────
    var bomRows = twinIngs.length === 0 ? '<tr><td colspan="4" style="padding:8px;color:var(--gray);font-size:0.78rem;">No ingredients</td></tr>'
        : twinIngs.map(function (ing) {
            return '<tr style="border-bottom:1px solid var(--border);">' +
                '<td style="padding:5px 8px;font-size:0.78rem;">' + _esc(ing.name) + '</td>' +
                '<td style="padding:5px 8px;font-size:0.78rem;text-align:right;">' + ing.quantity.toFixed(3) + ' kg</td>' +
                '<td style="padding:5px 8px;font-size:0.78rem;">' + (ing.originCountry || 'FR') + '</td>' +
                '<td style="padding:5px 8px;font-size:0.78rem;">' + (ing.processingState || 'raw') + '</td>' +
            '</tr>';
        }).join('');

    var verdictText = Math.abs(co2Delta) < 1e-8
        ? 'Identical climate footprint'
        : (isBetter
            ? 'Twin is ' + Math.abs(co2DeltaPct).toFixed(1) + '% lower CO\u2082e/kg (' + co2Delta.toFixed(4) + ' kg CO\u2082e/kg)'
            : 'Twin is ' + Math.abs(co2DeltaPct).toFixed(1) + '% higher CO\u2082e/kg (+' + co2Delta.toFixed(4) + ' kg CO\u2082e/kg)');

    var disclaimer = isBetter
        ? 'Modeled reduction only. Requires third-party verification for any public or B2B claims (EU Green Claims Directive 2024).'
        : 'Parametric twin shows higher or equal impact. For internal analysis only.';

    // ── BUILD CARD ────────────────────────────────────────────────────
    card.innerHTML =
        '<div style="padding:1.25rem 1.5rem;">' +

        // Header
        '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">' +
            '<div style="display:flex;align-items:center;gap:0.6rem;">' +
                '<div style="background:' + modeColor + ';color:white;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;">' +
                    '<i class="fas ' + modeIcon + '"></i></div>' +
                '<div>' +
                    '<h3 style="margin:0;color:' + modeColor + ';font-size:1.05rem;font-weight:800;">Parametric Twin Results \u2014 ' + modeLabel + '</h3>' +
                    '<div style="font-size:0.72rem;color:var(--gray);">Full PEF 3.1 dual calculation \u2014 all 16 impact categories \u2014 complete lifecycle</div>' +
                '</div>' +
            '</div>' +
            '<div style="background:' + summaryCol + ';color:white;padding:0.4rem 1rem;border-radius:20px;font-size:0.8rem;font-weight:700;">' +
                '<i class="fas ' + summaryArrow + '"></i> ' + Math.abs(co2DeltaPct).toFixed(1) + '% CO\u2082e' +
            '</div>' +
        '</div>' +

        // Verdict banner
        '<div style="background:' + summaryCol + '1A;border:1.5px solid ' + summaryCol + '55;border-radius:8px;padding:0.75rem 1rem;margin-bottom:1rem;">' +
            '<div style="font-weight:700;color:' + summaryCol + ';font-size:0.9rem;"><i class="fas ' + summaryArrow + '"></i> ' + verdictText + '</div>' +
            '<div style="font-size:0.72rem;color:var(--gray);margin-top:0.3rem;">' + disclaimer + '</div>' +
        '</div>' +

        // 4 metric cards
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-bottom:1.25rem;">' +
            _metricCard('Climate Change',  mainCO2.toFixed(3),  twinCO2.toFixed(3),  'kg CO\u2082e/kg', deltaChip(mainCO2,  twinCO2,  4, 'kg')) +
            _metricCard('Water Scarcity',  mainWater.toFixed(4),twinWater.toFixed(4), 'm\u00b3/kg',      deltaChip(mainWater,twinWater,4, 'm\u00b3')) +
            _metricCard('Land Use',        mainLand.toFixed(1), twinLand.toFixed(1),  'Pt/kg',           deltaChip(mainLand, twinLand, 2, 'Pt')) +
            _metricCard('PEF Score',       mainPt.toFixed(1),   twinPt.toFixed(1),    '\u00b5Pt',        deltaChip(mainPt,   twinPt,   1, '\u00b5Pt')) +
        '</div>' +

        // Operational params
        '<details style="margin-bottom:1rem;">' +
            '<summary style="cursor:pointer;font-weight:700;color:#2C7A7B;font-size:0.85rem;padding:0.4rem 0;user-select:none;list-style:none;">' +
                '<i class="fas fa-sliders-h"></i> Twin Operational Parameters</summary>' +
            '<div style="margin-top:0.5rem;background:#F0FDFA;border-radius:6px;padding:0.75rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0.5rem;">' +
                opParams +
            '</div>' +
        '</details>' +

        // Stage breakdown
        '<div style="margin-bottom:1rem;">' +
            '<div style="font-weight:700;color:var(--primary);font-size:0.85rem;margin-bottom:0.5rem;">' +
                '<i class="fas fa-layer-group"></i> Climate Change by Life Cycle Stage (kg CO\u2082e/kg)</div>' +
            '<table style="width:100%;border-collapse:collapse;font-size:0.82rem;border:1px solid var(--border);">' +
                '<thead style="background:#E8F8F5;">' +
                    '<tr>' +
                        '<th style="text-align:left;padding:6px 8px;color:#2C7A7B;">Stage</th>' +
                        '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">' + _esc(mainName) + '</th>' +
                        '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">' + _esc(twinName) + '</th>' +
                        '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">Delta</th>' +
                    '</tr>' +
                '</thead><tbody>' + stgRows + '</tbody>' +
            '</table>' +
        '</div>' +

        // Full 16-category table
        '<div style="margin-bottom:1rem;">' +
            '<div style="font-weight:700;color:var(--primary);font-size:0.85rem;margin-bottom:0.5rem;">' +
                '<i class="fas fa-table"></i> All 16 PEF 3.1 Categories (per kg product)</div>' +
            '<div style="max-height:340px;overflow-y:auto;border:1px solid var(--border);border-radius:6px;">' +
                '<table style="width:100%;border-collapse:collapse;font-size:0.78rem;">' +
                    '<thead style="background:#E8F8F5;position:sticky;top:0;">' +
                        '<tr>' +
                            '<th style="text-align:left;padding:6px 8px;color:#2C7A7B;">Category</th>' +
                            '<th style="text-align:left;padding:6px 8px;color:#2C7A7B;">Unit</th>' +
                            '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">' + _esc(mainName) + '</th>' +
                            '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">' + _esc(twinName) + '</th>' +
                            '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">Delta (%)</th>' +
                        '</tr>' +
                    '</thead><tbody>' + catRows + '</tbody>' +
                '</table>' +
            '</div>' +
        '</div>' +

        // Twin BOM table
        '<div style="margin-bottom:1rem;">' +
            '<div style="font-weight:700;color:var(--primary);font-size:0.85rem;margin-bottom:0.5rem;">' +
                '<i class="fas fa-list"></i> Twin Bill of Materials</div>' +
            '<table style="width:100%;border-collapse:collapse;font-size:0.78rem;border:1px solid var(--border);border-radius:6px;">' +
                '<thead style="background:#F0FDFA;">' +
                    '<tr>' +
                        '<th style="text-align:left;padding:6px 8px;color:#2C7A7B;">Ingredient</th>' +
                        '<th style="text-align:right;padding:6px 8px;color:#2C7A7B;">Quantity</th>' +
                        '<th style="text-align:left;padding:6px 8px;color:#2C7A7B;">Origin</th>' +
                        '<th style="text-align:left;padding:6px 8px;color:#2C7A7B;">Processing</th>' +
                    '</tr>' +
                '</thead><tbody>' + bomRows + '</tbody>' +
            '</table>' +
        '</div>' +

        // EU Green Claims disclaimer
        '<div style="background:#FFF9E6;border:1px solid #F6C358;border-radius:6px;padding:0.6rem 0.9rem;font-size:0.72rem;color:#7C4A00;">' +
            '<i class="fas fa-gavel"></i> <strong>EU Green Claims Directive (2024):</strong> ' +
            'Parametric comparison is a modeled screening-level estimate. ' +
            'Not a verified environmental claim. Third-party critical review required before any public communication.' +
        '</div>' +

        '</div>';

    // Store for PDF builder
    window._twinResultsForPDF = {
        mainName: mainName, twinName: twinName, modeLabel: modeLabel,
        mainCO2: mainCO2, twinCO2: twinCO2, co2Delta: co2Delta, co2DeltaPct: co2DeltaPct,
        mainWater: mainWater, twinWater: twinWater,
        mainLand: mainLand, twinLand: twinLand,
        mainFoss: mainFoss, twinFoss: twinFoss,
        mainPt: mainPt, twinPt: twinPt,
        mainPef: mainPef, twinPef: twinPef,
        mainMass: mainMass, twinMass: twinMass,
        twinIngs: twinIngs,
        mfgCountry: gv('twinManufacturingCountry'), process: gv('twinProcessingMethod'),
        energy: gv('twinEnergySource'), transMode: gv('twinTransportMode'),
        transDist: gv('twinTransportDistance'), pkgMat: gv('twinPackagingMaterial'),
        pkgWt: gv('twinPackagingWeight'), recycled: gv('twinRecycledContent')
    };
}

function _metricCard(label, mainVal, twinVal, unit, chipHTML) {
    return '<div style="background:white;border:1px solid var(--border);border-radius:8px;padding:0.75rem;text-align:center;">' +
        '<div style="font-size:0.68rem;font-weight:700;color:var(--gray);text-transform:uppercase;margin-bottom:0.35rem;">' + label + '</div>' +
        '<div style="font-size:1rem;font-weight:800;color:var(--primary);">' + mainVal + '</div>' +
        '<div style="font-size:0.65rem;color:var(--gray);">Main</div>' +
        '<div style="margin:0.3rem 0;border-top:1px solid var(--border);"></div>' +
        '<div style="font-size:1rem;font-weight:800;color:#2C7A7B;">' + twinVal + '</div>' +
        '<div style="font-size:0.65rem;color:#2C7A7B;margin-bottom:0.3rem;">Twin</div>' +
        '<div style="font-size:0.62rem;color:var(--gray);margin-bottom:0.4rem;">' + unit + '</div>' +
        chipHTML +
    '</div>';
}

function _esc(s) {
    return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : '';
}

function gv(id) { return (document.getElementById(id) || {}).value || '—'; }

// ====================================================================
// 6. PATCH updateResultsUI TO ACCEPT TWIN RESULT
// ====================================================================
(function patchUpdateResultsUI() {
    function applyPatch(fn) {
        if (fn._twinPatched) return;
        window.updateResultsUI = function (mainResult, twinCalcResult) {
            fn(mainResult);
            if (twinCalcResult) {
                renderTwinResults(mainResult, twinCalcResult);
            } else {
                var c = document.getElementById('twinResultsCard');
                if (c) c.style.display = 'none';
            }
        };
        window.updateResultsUI._twinPatched = true;
        console.log('[TwinModule] updateResultsUI patched');
    }

    var fn = window.updateResultsUI;
    if (typeof fn === 'function') { applyPatch(fn); return; }

    // ui.js not yet evaluated — wait for it
    document.addEventListener('DOMContentLoaded', function () {
        var fn2 = window.updateResultsUI;
        if (typeof fn2 === 'function' && !fn2._twinPatched) applyPatch(fn2);
    });
})();

// ====================================================================
// 7. CLEAR TWIN RESULTS
// ====================================================================
function clearTwinResults() {
    var card = document.getElementById('twinResultsCard');
    if (card) { card.style.display = 'none'; card.innerHTML = ''; }
    window._twinResultsForPDF = null;
    console.log('[TwinModule] Twin results cleared');
}

// ====================================================================
// 8. PDF BUILDER
//    Called from pdf-generator.js via window._aioxy_twinPDFBuilder(doc, h)
//    h must contain: C, M, CW, PH, Y (by ref via h.Y),
//    safe, fix, numFmt, pct, ensureSpace, subHeader, hRule, newPage,
//    footer, pageNum (number), doc (jsPDF instance)
// ====================================================================
function buildTwinPDFSection(doc, h) {
    var d = window._twinResultsForPDF;
    if (!d) return;

    var C = h.C; var M = h.M; var CW = h.CW;
    var safe = h.safe; var fix = h.fix; var numFmt = h.numFmt; var pct = h.pct;

    h.newPage('Parametric Twin \u2014 ' + safe(d.modeLabel));

    // Title band
    doc.setFillColor.apply(doc, C.teal);
    doc.rect(M, h.Y, CW, 8, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(9.5);
    doc.setTextColor.apply(doc, C.white);
    doc.text('PARAMETRIC TWIN ANALYSIS \u2014 ' + safe(d.modeLabel).toUpperCase(), M + 3, h.Y + 5.5);
    h.Y += 11;

    doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
    doc.setTextColor.apply(doc, C.bodyMid);
    var explainer = d.modeLabel === 'Apple-to-Apple'
        ? 'Identical system boundary and functional unit. Only ingredient(s) differ. Comparable on equal basis per ISO 14044.'
        : 'What-if scenario: operational parameters changed. Independent full PEF 3.1 calculation.';
    doc.text(safe(explainer), M, h.Y); h.Y += 6;

    // Verdict banner
    var isBetter = d.co2Delta < 0;
    var bannerC  = Math.abs(d.co2Delta) < 1e-8 ? C.bodyMid : (isBetter ? C.green : C.red);
    doc.setFillColor.apply(doc, bannerC);
    doc.rect(M, h.Y, CW, 9, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(8.5);
    doc.setTextColor.apply(doc, C.white);
    var vTxt = Math.abs(d.co2Delta) < 1e-8
        ? 'Identical climate footprint'
        : (isBetter
            ? 'Twin: ' + Math.abs(d.co2DeltaPct).toFixed(1) + '% lower  (' + d.co2Delta.toFixed(4) + ' kg CO2e/kg)'
            : 'Twin: ' + Math.abs(d.co2DeltaPct).toFixed(1) + '% higher  (+' + Math.abs(d.co2Delta).toFixed(4) + ' kg CO2e/kg)');
    doc.text(safe(vTxt), M + 3, h.Y + 5.8);
    h.Y += 12;

    // 4 metric cards
    h.ensureSpace(32, 'Parametric Twin (continued)');
    var cW4 = (CW - 9) / 4;
    var metrics = [
        { label:'Climate Change', mv:d.mainCO2,  tv:d.twinCO2,  unit:'kg CO2e/kg', dec:4 },
        { label:'Water Scarcity', mv:d.mainWater,tv:d.twinWater,unit:'m3 world eq/kg',dec:5 },
        { label:'Land Use',       mv:d.mainLand, tv:d.twinLand, unit:'Pt/kg',       dec:2 },
        { label:'PEF Score',      mv:d.mainPt,   tv:d.twinPt,   unit:'microPt',     dec:1 }
    ];
    metrics.forEach(function (m, i) {
        var x  = M + i * (cW4 + 3);
        var dv = m.tv - m.mv;
        var aC = Math.abs(dv) < 1e-9 ? C.bodyMid : (dv < 0 ? C.green : C.red);
        doc.setFillColor.apply(doc, C.pageBg);
        doc.setDrawColor.apply(doc, aC); doc.setLineWidth(0.4);
        doc.roundedRect(x, h.Y, cW4, 30, 2, 2, 'FD');
        doc.setFillColor.apply(doc, aC);
        doc.roundedRect(x, h.Y, cW4, 3, 2, 2, 'F'); doc.rect(x, h.Y+1, cW4, 2, 'F');
        doc.setFont('helvetica','bold'); doc.setFontSize(6.5);
        doc.setTextColor.apply(doc, C.bodyMid);
        doc.text(safe(m.label), x + cW4/2, h.Y + 7, {align:'center'});
        doc.setFont('helvetica','normal'); doc.setFontSize(6);
        doc.setTextColor.apply(doc, C.bodyMid);
        doc.text('Main:', x + 3, h.Y + 13);
        doc.setFont('helvetica','bold'); doc.setFontSize(7.5);
        doc.setTextColor.apply(doc, C.navyDark);
        doc.text(numFmt(m.mv, m.dec), x + cW4 - 2, h.Y + 13, {align:'right'});
        doc.setFont('helvetica','normal'); doc.setFontSize(6);
        doc.setTextColor.apply(doc, C.bodyMid);
        doc.text('Twin:', x + 3, h.Y + 19);
        doc.setFont('helvetica','bold'); doc.setFontSize(7.5);
        doc.setTextColor.apply(doc, C.teal);
        doc.text(numFmt(m.tv, m.dec), x + cW4 - 2, h.Y + 19, {align:'right'});
        doc.setFont('helvetica','bold'); doc.setFontSize(6.5);
        doc.setTextColor.apply(doc, aC);
        var ds = Math.abs(dv) < 1e-9 ? 'no change' : (dv > 0 ? '+' : '') + numFmt(dv, m.dec);
        doc.text(safe(ds), x + cW4/2, h.Y + 26, {align:'center'});
        doc.setFont('helvetica','normal'); doc.setFontSize(5.5);
        doc.setTextColor.apply(doc, C.bodyMid);
        doc.text(safe(m.unit), x + cW4/2, h.Y + 30, {align:'center'});
    });
    h.Y += 34;

    // Operational params
    h.ensureSpace(28, 'Parametric Twin (continued)');
    h.subHeader('Twin Operational Parameters'); h.Y -= 2;
    doc.autoTable({
        startY: h.Y,
        body: [
            ['Mfg Country', safe(d.mfgCountry), 'Processing', safe(d.process)],
            ['Energy Source', safe(d.energy), 'Transport', safe(d.transMode) + ' / ' + safe(d.transDist) + ' km'],
            ['Packaging', safe(d.pkgMat) + ' ' + safe(d.pkgWt) + ' kg', 'Recycled Content', safe(d.recycled) + '%']
        ],
        theme: 'plain',
        styles: { fontSize: 7.5, cellPadding: 2 },
        columnStyles: {
            0: { fontStyle:'bold', cellWidth:38, textColor:C.navyDark },
            1: { cellWidth:55, textColor:C.bodyDark },
            2: { fontStyle:'bold', cellWidth:38, textColor:C.navyDark },
            3: { cellWidth:51, textColor:C.bodyDark }
        },
        margin: { left: M },
        alternateRowStyles: { fillColor: C.rowAlt }
    });
    h.Y = doc.lastAutoTable.finalY + 5;

    // BOM table
    if (d.twinIngs && d.twinIngs.length > 0) {
        h.ensureSpace(20 + d.twinIngs.length * 8, 'Parametric Twin (continued)');
        h.subHeader('Twin Bill of Materials'); h.Y -= 2;
        doc.autoTable({
            startY: h.Y,
            head: [['Ingredient','Qty (kg)','Origin','Processing']],
            body: d.twinIngs.map(function (ing) {
                return [safe(ing.name), fix(ing.quantity,3), safe(ing.originCountry||'FR'), safe(ing.processingState||'raw')];
            }),
            theme: 'plain',
            styles: { fontSize: 7.5, cellPadding: 2 },
            headStyles: { fillColor: C.teal, textColor: C.white, fontStyle:'bold', fontSize:7 },
            alternateRowStyles: { fillColor: C.rowAlt },
            columnStyles: {
                0:{cellWidth:82}, 1:{cellWidth:22,halign:'right'},
                2:{cellWidth:30}, 3:{cellWidth:48}
            },
            margin: { left: M }
        });
        h.Y = doc.lastAutoTable.finalY + 5;
    }

    // Stage breakdown
    h.ensureSpace(38, 'Parametric Twin (continued)');
    h.subHeader('Climate Change by Life Cycle Stage'); h.Y -= 2;
    var stages = ['Ingredients','Manufacturing','Transport','Packaging'];
    function sCC(pef, s, mass) {
        var t = (pef['Climate Change'] && pef['Climate Change'].contribution_tree) || {};
        return ((t[s] && t[s].total) || 0) / mass;
    }
    doc.autoTable({
        startY: h.Y,
        head: [['Stage', safe(d.mainName).slice(0,16), safe(d.twinName).slice(0,16), 'Delta', 'Better?']],
        body: stages.map(function (s) {
            var mv = sCC(d.mainPef, s, d.mainMass);
            var tv = sCC(d.twinPef, s, d.twinMass);
            var dv = tv - mv;
            return [safe(s), numFmt(mv,4), numFmt(tv,4),
                    Math.abs(dv)<1e-8?'\u2014':(dv>0?'+':'')+numFmt(dv,4),
                    Math.abs(dv)<1e-9?'=':dv<0?'YES':'NO'];
        }),
        theme:'plain', styles:{fontSize:7.5,cellPadding:2},
        headStyles:{fillColor:C.navyDark,textColor:C.white,fontStyle:'bold',fontSize:7},
        alternateRowStyles:{fillColor:C.rowAlt},
        columnStyles:{
            0:{cellWidth:38,fontStyle:'bold'},1:{cellWidth:38,halign:'right'},
            2:{cellWidth:38,halign:'right',textColor:C.teal},
            3:{cellWidth:38,halign:'right'},4:{cellWidth:30,halign:'center'}
        },
        margin:{left:M},
        didParseCell: function(data) {
            if (data.column.index===4 && data.row.section==='body') {
                if (data.cell.raw==='YES') data.cell.styles.textColor=C.green;
                if (data.cell.raw==='NO')  data.cell.styles.textColor=C.red;
            }
        }
    });
    h.Y = doc.lastAutoTable.finalY + 5;

    // Full 16-category table (new page)
    h.newPage('Parametric Twin \u2014 Full 16-Category Comparison');
    h.subHeader(safe(d.mainName).slice(0,22) + '  vs  ' + safe(d.twinName).slice(0,22) + '  \u2014  All 16 PEF 3.1 Categories');
    h.Y -= 2;

    var U16 = {
        'Climate Change':'kg CO2e','Water Use/Scarcity (AWARE)':'m3 world eq.',
        'Land Use':'Pt','Resource Use, fossils':'MJ',
        'Eutrophication, terrestrial':'mol Ne','Eutrophication, freshwater':'kg Pe',
        'Eutrophication, marine':'kg Ne','Acidification':'mol H+e',
        'Particulate Matter':'disease inc.','Photochemical Ozone Formation':'kg NMVOCe',
        'Ozone Depletion':'kg CFC11e','Human Toxicity, non-cancer':'CTUh',
        'Human Toxicity, cancer':'CTUh','Ecotoxicity, freshwater':'CTUe',
        'Ionizing Radiation':'kBq U235e','Resource Use, minerals/metals':'kg Sbe'
    };
    var D16 = {
        'Climate Change':4,'Water Use/Scarcity (AWARE)':5,'Land Use':2,'Resource Use, fossils':3,
        'Eutrophication, terrestrial':5,'Eutrophication, freshwater':6,'Eutrophication, marine':5,
        'Acidification':5,'Particulate Matter':7,'Photochemical Ozone Formation':5,
        'Ozone Depletion':8,'Human Toxicity, non-cancer':8,'Human Toxicity, cancer':9,
        'Ecotoxicity, freshwater':3,'Ionizing Radiation':4,'Resource Use, minerals/metals':8
    };

    doc.autoTable({
        startY: h.Y,
        head: [['Impact Category','Unit',safe(d.mainName).slice(0,14),safe(d.twinName).slice(0,14),'Delta','\u0394%']],
        body: Object.keys(U16).map(function (cat) {
            var dec = D16[cat] || 4;
            var mv  = ((d.mainPef[cat] && d.mainPef[cat].total) || 0) / d.mainMass;
            var tv  = ((d.twinPef[cat] && d.twinPef[cat].total) || 0) / d.twinMass;
            var dv  = tv - mv;
            var dp  = mv !== 0 ? (dv / Math.abs(mv) * 100) : 0;
            return [safe(cat), safe(U16[cat]),
                    numFmt(mv,dec), numFmt(tv,dec),
                    Math.abs(dv)<1e-10?'\u2014':(dv>0?'+':'')+numFmt(dv,dec),
                    Math.abs(dp)<0.01?'\u2014':(dp>0?'+':'')+dp.toFixed(1)+'%'];
        }),
        theme:'plain', styles:{fontSize:6.5,cellPadding:1.8,overflow:'linebreak'},
        headStyles:{fillColor:C.navyDark,textColor:C.white,fontStyle:'bold',fontSize:6.5},
        alternateRowStyles:{fillColor:C.rowAlt},
        columnStyles:{
            0:{cellWidth:55,fontStyle:'bold'},1:{cellWidth:20,textColor:C.bodyMid},
            2:{cellWidth:25,halign:'right'},3:{cellWidth:25,halign:'right',textColor:C.teal},
            4:{cellWidth:25,halign:'right'},5:{cellWidth:20,halign:'right'}
        },
        margin:{left:M},
        didParseCell: function(data) {
            if (data.row.raw && data.row.raw[0]==='Climate Change') {
                data.cell.styles.textColor = C.teal;
                data.cell.styles.fontStyle = 'bold';
            }
        }
    });
    h.Y = doc.lastAutoTable.finalY + 5;

    // Disclaimer
    h.ensureSpace(16, 'Parametric Twin (continued)');
    doc.setFillColor(255,249,230);
    doc.setDrawColor(246,195,88); doc.setLineWidth(0.3);
    doc.roundedRect(M, h.Y, CW, 14, 2, 2, 'FD');
    doc.setFont('helvetica','bold'); doc.setFontSize(7);
    doc.setTextColor(124,74,0);
    doc.text('EU Green Claims Directive (2024) Notice:', M + 3, h.Y + 5);
    doc.setFont('helvetica','normal'); doc.setFontSize(6.5);
    doc.setTextColor(100,60,0);
    doc.text('Modeled screening-level estimate using AGRIBALYSE 3.2 + PEF 3.1. Not a verified comparative claim.', M + 3, h.Y + 9.5);
    doc.text('Third-party critical review required before any public communication (EU Green Claims Directive 2024).', M + 3, h.Y + 13.5);
    h.Y += 18;

    h.footer('Parametric Twin \u2014 Page ' + h.pageNum);
}

// ====================================================================
// 9. EXPOSE BUILDER FOR pdf-generator.js
// ====================================================================
window._aioxy_twinPDFBuilder = buildTwinPDFSection;

// ====================================================================
// 10. EXPOSE ALL PUBLIC FUNCTIONS
// ====================================================================
window.setupTwinIngredientSearch  = setupTwinIngredientSearch;
window.populateTwinCountrySelects = populateTwinCountrySelects;
window.updateTwinIngredientList   = updateTwinIngredientList;
window.renderTwinResults          = renderTwinResults;
window.clearTwinResults           = clearTwinResults;
window.buildTwinPDFSection        = buildTwinPDFSection;

console.log('[TwinModule] v2.0 loaded \u2014 search, BOM, results, PDF bridge ready');

})();
