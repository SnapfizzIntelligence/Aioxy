// ================== FILE: claims_check_engine.js ==================
// NEW MODULE (this session, cofounder-directed): EmpCo Claims Pre-Flight Checker.
//
// WHAT THIS IS FOR: Directive (EU) 2024/825 ("EmpCo" / "ECGT") applies from
// 27 September 2026, with NO transition period -- it covers claims already
// printed and already on shelf, not just new launches. For several banned
// categories, a violation is automatic once the claim is made; no case-by-case
// proof of consumer harm is required. This module lets a brand paste in a
// candidate or EXISTING claim (packaging copy, web copy, ad copy) and get a
// verdict grounded in what AIOXY has actually computed for that product --
// not a guess, not a lawyer, a first-pass filter using real project data.
//
// WHAT THIS IS NOT (read before wiring this into anything client-facing):
//   1. NOT LEGAL ADVICE. Every Annex I point number below is a best-evidence
//      citation from secondary legal commentary gathered this session
//      (law-firm client alerts, compliance vendors), NOT cross-checked
//      against the official consolidated text of Directive 2005/29/EC as
//      amended by 2024/825. Treat point numbers as "likely correct,
//      unconfirmed" the same way ENGINE_VERSION carries a CONFIRMED flag
//      elsewhere in this codebase. Get real legal review before this gates
//      an export or blocks a client deliverable.
//   2. NOT WIRED into ui.js, pdf-generator.js, or audit-trail.js yet. This
//      is a standalone, tested module only. Wiring it into the UI (a claims
//      text box + batch upload for auditing an existing packaging catalog)
//      is the next step, not done here -- flagging that explicitly rather
//      than silently shipping a partial integration.
//   3. Two of the six EmpCo blacklist categories are NOT automatable from
//      text alone and are intentionally left as manual-review flags, not
//      verdicts -- see NOT_AUTOMATABLE_CATEGORIES below. Pretending to
//      detect a self-created logo from a text string would be exactly the
//      kind of invented confidence this whole codebase works to avoid.
//
// SOURCES (gathered via web search this session, not from training data --
// this area of law moves fast and training data is not reliable here):
//   - Application date 27 Sept 2026, no transition period, covers products
//     already on the market: empcodirective.eu; insideenergyandenvironment.com
//   - Per-se ("automatic") violation for blacklisted practices, no
//     case-by-case consumer-harm test required: greenwashing-checker.com;
//     contenthub.packa.com
//   - Micro-enterprise exemption (<10 employees AND <EUR2m turnover):
//     regonance.com
//   - Penalty: minimum 4% of turnover, or EUR2m if turnover can't be
//     established: ecoclaim.eu
//   - Annex I point references (2, 2a, 4, 4a) for generic claims,
//     self-created labels, future-performance claims, and offset-based
//     neutrality claims respectively: ecoclaim.eu ("Is Greenwashing Still
//     Illegal in the EU? 2026 Rules, Deadlines & Fines")
//   - Article 6(2)(d) requirements for a valid future-performance claim
//     (clear, objective, publicly available, verifiable commitment with a
//     detailed realistic implementation plan and regular independent
//     verification): empcora.com
//   - Whole-product/whole-business scope overstatement prohibition, with
//     examples ("made with recycled material" when only packaging is):
//     boehmert.de -- no specific Annex point number found for this one,
//     cited as general prohibition only.

(function (exports) {
    'use strict';

    // ── DEPENDENCY CHECK (matches compliance_engine.js's pattern) ─────────
    // This module does not need core_physics constants directly, but it DOES
    // need to be handed a real auditTrailData object shaped like the one
    // calculation_engine.js produces. It does not compute anything itself --
    // it only reads already-computed fields and never invents a number.
    var REQUIRED_AUDIT_FIELDS = ['pefCategories', 'dqr_summary', 'traceability'];

    function assertUsableAuditData(auditTrailData) {
        if (!auditTrailData || typeof auditTrailData !== 'object') {
            throw new Error('claims_check_engine: auditTrailData is required -- ' +
                'this checker verifies claims against real computed evidence, ' +
                'it does not run without it.');
        }
        var missing = REQUIRED_AUDIT_FIELDS.filter(function (f) {
            return !(f in auditTrailData);
        });
        if (missing.length > 0) {
            throw new Error('claims_check_engine: auditTrailData is missing expected ' +
                'field(s): ' + missing.join(', ') + '. Is this a real ' +
                'calculation_engine.js output object?');
        }
    }

    // ── VERDICT TYPES ───────────────────────────────────────────────────
    var VERDICT = Object.freeze({
        BLOCKED:           'BLOCKED',            // per-se prohibited; evidence cannot save it
        NEEDS_EVIDENCE:     'NEEDS_EVIDENCE',      // allowed IF substantiated; check below
        SUBSTANTIATED:      'SUBSTANTIATED',       // matched a real computed field that backs it
        MANUAL_REVIEW_ONLY: 'MANUAL_REVIEW_ONLY',  // category this module cannot check from text
        NO_MATCH:           'NO_MATCH'             // no recognized environmental-claim pattern found
    });

    // ── CATEGORY A: GENERIC UNSUBSTANTIATED CLAIMS ─────────────────────
    // Blocked unless the product carries a recognized third-party
    // certification (e.g. EU Ecolabel) demonstrating "recognised excellent
    // environmental performance." AIOXY does not currently model or check
    // for third-party certification marks anywhere in the engine -- so
    // today, this category is ALWAYS a block, never a pass, until that
    // capability exists. That is disclosed here, not hidden.
    var GENERIC_UNSUBSTANTIATED_TERMS = [
        'eco-friendly', 'eco friendly', 'environmentally friendly',
        'climate-friendly', 'climate friendly', 'planet-friendly',
        'kind to the planet', 'good for the planet', 'good for the environment',
        'green choice', 'sustainable', 'all natural', '100% natural',
        'natural choice'
    ];
    // 'natural' alone is deliberately NOT in the list above -- too many false
    // positives on ingredient-list language ("natural flavouring" is a
    // regulated food-labeling term, not an environmental claim). Flag it
    // separately, lower confidence, see checkClaim()'s FLAG_ONLY handling.
    var AMBIGUOUS_NATURAL_PATTERN = /\bnatural\b/i;

    // ── CATEGORY B: OFFSET-BASED NEUTRALITY CLAIMS ─────────────────────
    // Banned outright for products when the claim rests on buying offsets
    // rather than real in-value-chain reduction. AIOXY has no offset-tracking
    // field anywhere in its calculation model (correctly -- it measures
    // gross footprint, not net-of-offset), so it has no way to distinguish
    // "neutral via real reduction" from "neutral via offset" even if such a
    // claim were otherwise legal. Treated as an automatic block.
    var OFFSET_NEUTRALITY_TERMS = [
        'carbon neutral', 'co2 neutral', 'co2-neutral', 'climate neutral',
        'climate positive', 'climate compensated', 'net zero', 'net-zero',
        'net zero carbon', 'carbon negative'
    ];

    // ── CATEGORY D: FUTURE-PERFORMANCE CLAIMS ──────────────────────────
    // Allowed ONLY with a clear, objective, publicly available, verifiable
    // commitment, a detailed realistic implementation plan, and regular
    // independent verification (Article 6(2)(d), per empcora.com). AIOXY
    // has no field anywhere for "published roadmap URL" or "independent
    // verifier of record" -- so this always resolves to NEEDS_EVIDENCE, and
    // the evidence it needs is NOT something this engine currently computes.
    var FUTURE_CLAIM_PATTERNS = [
        /\bwill be\b/i, /\bby 20\d{2}\b.{0,40}\b(we|our)\b/i,
        /\bon our way to\b/i, /\bcommitted to becoming\b/i,
        /\bworking towards\b/i, /\bworking toward\b/i, /\bon track to\b/i,
        /\bour goal is to\b/i, /\bour roadmap\b/i
    ];

    // ── CATEGORY E: COMPARATIVE CLAIMS ─────────────────────────────────
    // This is the one category where AIOXY's OWN computed data can actually
    // substantiate a claim -- IF the comparison uses the same system
    // boundary, functional unit, and characterization method as the
    // baseline being compared against. This mirrors a safeguard already
    // live in ui.js (line ~450): unsubstantiated custom user baselines are
    // already flagged there as requiring "external LCA verification and
    // PEF-compliant dataset comparison." This module applies the same
    // logic to free-text marketing claims, not just the in-app comparison
    // widget.
    var COMPARATIVE_CLAIM_PATTERNS = [
        /\d+\s?%\s?(less|lower|fewer|reduced|reduction)/i,
        /(lower|less|reduced)\s+(carbon|co2|emissions|footprint)/i,
        /compared to/i, /than (the )?(average|typical|leading|standard)/i,
        /better for the (planet|environment) than/i
    ];

    // ── NOT AUTOMATABLE FROM TEXT ALONE ────────────────────────────────
    // Disclosed honestly rather than silently skipped. A human still has to
    // look at these.
    var NOT_AUTOMATABLE_CATEGORIES = [
        {
            id: 'SELF_CREATED_LABEL',
            description: 'A custom green leaf/seal/badge graphic on packaging ' +
                'that is not tied to a recognized public or EU-approved ' +
                'certification scheme (Annex I point 2a, per ecoclaim.eu). ' +
                'This module only reads text -- it cannot inspect packaging ' +
                'artwork. If the product uses any custom sustainability icon ' +
                'or seal, check it manually against a recognized scheme list.'
        },
        {
            id: 'WHOLE_PRODUCT_OVERSTATEMENT',
            description: 'A claim about the whole product/business that ' +
                'actually only relates to one aspect or a non-representative ' +
                'part (e.g. "made with recycled material" when only the ' +
                'packaging, not the product, uses recycled content) -- ' +
                'per boehmert.de. Detecting this reliably requires knowing ' +
                'what the claim is scoped to versus what AIOXY actually ' +
                'measured, which is a human judgment call this module does ' +
                'not attempt to automate.'
        }
    ];

    // ── CORE CHECK ──────────────────────────────────────────────────────
    function checkClaim(claimText, auditTrailData) {
        assertUsableAuditData(auditTrailData);
        if (typeof claimText !== 'string' || claimText.trim().length === 0) {
            throw new Error('claims_check_engine: claimText must be a non-empty string.');
        }
        var text = claimText.toLowerCase();
        var findings = [];

        // --- Category B first: offset-neutrality is the highest-confidence,
        // highest-penalty-risk block, check it before generic terms so a
        // claim like "our sustainable carbon neutral packaging" surfaces
        // both, with the harder violation listed first.
        //
        // TENSE CHECK (found by this module's own test harness, fixed same
        // session): "carbon neutral" as a present-tense product claim is a
        // flat Annex I 4a ban. "Working towards net zero by 2030" is a
        // FUTURE corporate goal -- a different EmpCo pathway (Article
        // 6(2)(d) / Annex I point 4), permitted if backed by a real,
        // published, independently verified roadmap. A bare keyword match
        // cannot reliably tell these apart, so when an offset term
        // co-occurs with a future-claim pattern, this downgrades to
        // NEEDS_EVIDENCE with both readings disclosed, rather than
        // confidently asserting the harsher one from a regex alone.
        var futureContextPresent = FUTURE_CLAIM_PATTERNS.some(function (p) { return p.test(text); });
        OFFSET_NEUTRALITY_TERMS.forEach(function (term) {
            if (text.indexOf(term) === -1) return;
            if (futureContextPresent) {
                findings.push({
                    verdict: VERDICT.NEEDS_EVIDENCE,
                    category: 'OFFSET_TERM_IN_FUTURE_CLAIM_CONTEXT',
                    matchedTerm: term,
                    legalBasis: 'Ambiguous between Directive (EU) 2024/825 Annex I ' +
                        'point 4a (flat ban, present-tense offset-based neutrality) ' +
                        'and Article 6(2)(d) / Annex I point 4 (future-performance ' +
                        'claim, permitted with a real roadmap) -- both best-evidence ' +
                        'citations, not legally confirmed, see file header.',
                    note: 'This text pairs an offset-neutrality term ("' + term + '") ' +
                        'with future-tense framing. If this describes the product ' +
                        'TODAY, it is a flat ban, evidence cannot save it. If it is ' +
                        'a genuine forward-looking corporate goal, it is allowed ' +
                        'ONLY with a clear, objective, publicly available, ' +
                        'verifiable commitment, a detailed realistic implementation ' +
                        'plan, and regular independent verification -- none of ' +
                        'which AIOXY has a field for. Tense-reading from text alone ' +
                        'is not reliable; a human needs to read this one.'
                });
            } else {
                findings.push({
                    verdict: VERDICT.BLOCKED,
                    category: 'OFFSET_BASED_NEUTRALITY_CLAIM',
                    matchedTerm: term,
                    legalBasis: 'Directive (EU) 2024/825, Annex I point 4a ' +
                        '(best-evidence citation, not legally confirmed -- see ' +
                        'file header). Banned outright when based on offsetting ' +
                        'rather than real in-value-chain reduction.',
                    note: 'AIOXY has no offset-tracking field in its calculation ' +
                        'model, so it cannot verify a "real reduction" basis even ' +
                        'if one existed. Evidence cannot rescue this claim as ' +
                        'currently worded -- it needs to be reworded, not proven.'
                });
            }
        });

        // --- Category A: generic unsubstantiated terms
        GENERIC_UNSUBSTANTIATED_TERMS.forEach(function (term) {
            if (text.indexOf(term) !== -1) {
                findings.push({
                    verdict: VERDICT.BLOCKED,
                    category: 'GENERIC_UNSUBSTANTIATED_CLAIM',
                    matchedTerm: term,
                    legalBasis: 'Directive (EU) 2024/825, Annex I point 2 ' +
                        '(best-evidence citation, not legally confirmed -- see ' +
                        'file header). Banned unless backed by recognized ' +
                        'excellent environmental performance (e.g. EU Ecolabel).',
                    note: 'AIOXY does not currently check for third-party ' +
                        'certification marks anywhere in the engine, so this ' +
                        'resolves to BLOCKED, not NEEDS_EVIDENCE, until that ' +
                        'capability exists. If the product genuinely holds a ' +
                        'recognized certification, that is a manual override, ' +
                        'not something this module can confirm.'
                });
            }
        });

        if (AMBIGUOUS_NATURAL_PATTERN.test(text) &&
            findings.filter(function (f) { return f.matchedTerm === 'natural choice' || f.matchedTerm === 'all natural' || f.matchedTerm === '100% natural'; }).length === 0) {
            findings.push({
                verdict: VERDICT.MANUAL_REVIEW_ONLY,
                category: 'AMBIGUOUS_NATURAL_USAGE',
                matchedTerm: 'natural',
                legalBasis: 'Directive (EU) 2024/825, Annex I point 2, per ' +
                    'ecoclaim.eu -- standalone "natural" as an environmental ' +
                    'or wellness claim is banned from 27 Sept 2026.',
                note: '"Natural" is ambiguous: it is a routine, legal food-' +
                    'labeling term when describing ingredients (e.g. "natural ' +
                    'flavouring"), and a banned environmental/wellness claim ' +
                    'when used to imply the product or packaging is better ' +
                    'for the environment. This module cannot tell which sense ' +
                    'is meant from a keyword match -- flagged for a human to ' +
                    'read in context, not auto-blocked.'
            });
        }

        // --- Category D: future-performance claims
        FUTURE_CLAIM_PATTERNS.forEach(function (pattern) {
            var match = text.match(pattern);
            if (match) {
                findings.push({
                    verdict: VERDICT.NEEDS_EVIDENCE,
                    category: 'FUTURE_PERFORMANCE_CLAIM',
                    matchedTerm: match[0],
                    legalBasis: 'Directive (EU) 2024/825, Article 6(2)(d) and ' +
                        'Annex I point 4 (best-evidence citation, not legally ' +
                        'confirmed -- see file header). Requires a clear, ' +
                        'objective, publicly available, verifiable commitment, ' +
                        'a detailed realistic implementation plan, and regular ' +
                        'independent verification.',
                    note: 'AIOXY has no field for "published roadmap URL" or ' +
                        '"independent verifier of record." This can only ever ' +
                        'resolve to NEEDS_EVIDENCE from this engine, never ' +
                        'SUBSTANTIATED -- the evidence a future claim needs ' +
                        'lives outside what a footprint calculation measures.'
                });
            }
        });

        // --- Category E: comparative claims, checked against REAL computed data
        var comparativeMatch = COMPARATIVE_CLAIM_PATTERNS.some(function (p) { return p.test(text); });
        if (comparativeMatch) {
            var cc = auditTrailData.pefCategories && auditTrailData.pefCategories['Climate Change'];
            var hasBoundaryDisclosure = !!(auditTrailData.comparability_disclosure &&
                auditTrailData.comparability_disclosure.system_boundary);
            if (typeof cc === 'number' && hasBoundaryDisclosure) {
                findings.push({
                    verdict: VERDICT.SUBSTANTIATED,
                    category: 'COMPARATIVE_CLAIM',
                    legalBasis: 'Comparative claims are permitted when they use ' +
                        'the same system boundary, functional unit, and ' +
                        'characterization method as the baseline (general ' +
                        'EmpCo substantiation principle; mirrors the existing ' +
                        'unsubstantiated-baseline warning in ui.js line ~450).',
                    evidenceField: 'auditTrailData.pefCategories["Climate Change"] = ' +
                        cc.toFixed(4) + ' kg CO2e/kg, computed under ' +
                        auditTrailData.comparability_disclosure.system_boundary +
                        ' boundary, ' +
                        auditTrailData.comparability_disclosure.characterization_method,
                    note: 'This confirms AIOXY has a real, sourced number behind ' +
                        'a comparative claim. It does NOT confirm the specific ' +
                        'baseline being compared against uses the same boundary ' +
                        '-- that is on whoever supplies the comparison figure, ' +
                        'same as the existing ui.js safeguard already requires.'
                });
            } else {
                findings.push({
                    verdict: VERDICT.NEEDS_EVIDENCE,
                    category: 'COMPARATIVE_CLAIM',
                    legalBasis: 'Comparative claims require a same-boundary, ' +
                        'same-methodology baseline to be substantiated.',
                    note: 'No usable computed Climate Change figure or ' +
                        'comparability_disclosure found on this auditTrailData ' +
                        'object -- this comparative claim cannot currently be ' +
                        'backed by AIOXY data. Run the calculation first, or ' +
                        'this claim should not ship as worded.'
                });
            }
        }

        if (findings.length === 0) {
            findings.push({
                verdict: VERDICT.NO_MATCH,
                category: null,
                note: 'No recognized EmpCo-relevant environmental-claim pattern ' +
                    'found in this text. This does NOT mean the claim is safe -- ' +
                    'it means this module, in its current v1 scope, found ' +
                    'nothing to flag. See NOT_AUTOMATABLE_CATEGORIES for what ' +
                    'this checker cannot see at all (logos, scope overstatement).'
            });
        }

        return {
            claimText: claimText,
            findings: findings,
            manualReviewReminders: NOT_AUTOMATABLE_CATEGORIES,
            worstVerdict: rankWorstVerdict(findings)
        };
    }

    function rankWorstVerdict(findings) {
        var order = [VERDICT.BLOCKED, VERDICT.NEEDS_EVIDENCE, VERDICT.MANUAL_REVIEW_ONLY, VERDICT.SUBSTANTIATED, VERDICT.NO_MATCH];
        var present = findings.map(function (f) { return f.verdict; });
        for (var i = 0; i < order.length; i++) {
            if (present.indexOf(order[i]) !== -1) return order[i];
        }
        return VERDICT.NO_MATCH;
    }

    // ── BATCH MODE: for auditing an existing packaging/marketing catalog ──
    // This is the actual Gap 2 use case -- a brand's EXISTING claims, not
    // just a new one being drafted. claims: array of {id, text}.
    function checkClaimsBatch(claims, auditTrailData) {
        if (!Array.isArray(claims)) {
            throw new Error('claims_check_engine: checkClaimsBatch requires an array of {id, text}.');
        }
        var results = claims.map(function (c) {
            return {
                id: c.id,
                text: c.text,
                result: checkClaim(c.text, auditTrailData)
            };
        });
        var summary = {
            total: results.length,
            blocked: results.filter(function (r) { return r.result.worstVerdict === VERDICT.BLOCKED; }).length,
            needsEvidence: results.filter(function (r) { return r.result.worstVerdict === VERDICT.NEEDS_EVIDENCE; }).length,
            substantiated: results.filter(function (r) { return r.result.worstVerdict === VERDICT.SUBSTANTIATED; }).length,
            manualReviewOnly: results.filter(function (r) { return r.result.worstVerdict === VERDICT.MANUAL_REVIEW_ONLY; }).length,
            noMatch: results.filter(function (r) { return r.result.worstVerdict === VERDICT.NO_MATCH; }).length
        };
        return { results: results, summary: summary };
    }

    exports.VERDICT = VERDICT;
    exports.checkClaim = checkClaim;
    exports.checkClaimsBatch = checkClaimsBatch;
    exports.NOT_AUTOMATABLE_CATEGORIES = NOT_AUTOMATABLE_CATEGORIES;
    exports.GENERIC_UNSUBSTANTIATED_TERMS = GENERIC_UNSUBSTANTIATED_TERMS;
    exports.OFFSET_NEUTRALITY_TERMS = OFFSET_NEUTRALITY_TERMS;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.claimsCheckEngine = window.claimsCheckEngine || {}));
