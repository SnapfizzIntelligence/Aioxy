// COMPLIANCE GATE — item #2 of the AIOXY core-principle plan.
//
// Converts "reported-only" compliance checks into real gates, WITHOUT losing
// the legitimate reason they were made non-blocking in the first place
// (see PKG-F1 in compliance_engine.js — some deviations are expected and correct).
//
// Rule: a failing check blocks export UNLESS it matches a documented,
// pre-registered exception. Undocumented failures are not silently shown
// as a warning anymore — they stop the pipeline, loudly, by default.
//
// NOT every non-blocking check belongs behind this gate. Three different
// shapes exist in compliance_engine.js and they are NOT interchangeable:
//   1. True pass/fail checks   (JRC validation, DNM, cutoff)      -> THIS gate
//   2. Pure analysis, no verdict (identifyHotspots)               -> never gated,
//      there is no "compliant" state to check, it just ranks contributors.
//   3. Disclosure triggers (checkAllocationSensitivity)           -> different
//      treatment: does not block, but a `true` result must force the
//      allocation-sensitivity section to actually render in the PDF.
//      Wiring that correctly means touching pdf-generator.js, not this gate.
//      Flagged here as designed-but-not-yet-wired — not silently skipped.

(function (exports) {
    'use strict';

    // ── EXCEPTION REGISTRY ───────────────────────────────────────────────
    // Every entry here is a citation, not an opinion. Add new ones only with
    // a real, documented reason — this list is the only thing standing
    // between "known, expected, transparent" and "silently wrong."
    const DOCUMENTED_EXCEPTIONS = [
        {
            id: 'PKG-F1-PET-BOUNDARY',
            check: 'runJRCValidation',
            match: (product) => product.materialType === 'PET_granulates',
            category: 'Climate Change',
            // Real numbers, from the actual PKG-F1 comment in compliance_engine.js —
            // not invented for this example.
            maxDeviationPct: 60, // observed ~58%; small margin, not rounded up further
            reason: 'AIOXY value is feedstock-inclusive (3.40 kg CO2e/kg); JRC BAT ' +
                    'reference is granulate-only (2.15 kg CO2e/kg). Different system ' +
                    'boundaries, not a calculation error. Documented in PKG-F1.'
        },
        // PKG-F2 / PKG-F3 (this session): PET's two entries below are structurally
        // different from PKG-F1 above. PKG-F1 excuses a bounded DEVIATION (AIOXY's
        // real computed value differs from JRC's by up to ~58%, for a documented
        // system-boundary reason). PKG-F2/F3 excuse a declared ZERO -- AIOXY does not
        // attempt to model these two categories for PET packaging at all, and says so.
        // No maxDeviationPct field: it would misrepresent "not modeled, here is why"
        // as "modeled, but allowed to be off by up to X%", which is a different and
        // stronger claim than what is actually true. Both reason strings are copied
        // verbatim from core_physics.js's PACKAGING_MULTI_CATEGORY.PET block (lines
        // ~838-839 and ~845-847 as of this session) -- not written new for this file.
        // IMPORTANT: this exception is intentionally scoped to PET only. As of this
        // session, cardboard and glass have their own real derivations (see
        // PKG-DERIVE-1/2 below) — but the remaining 8 materials (paper, rPET, HDPE,
        // LDPE, PP, aluminum, steel, PLA) still show the exact same declared zeros
        // for these two categories with NO explanatory comment anywhere in
        // core_physics.js — confirmed this session by checking all 11 materials
        // directly, not assumed. Do NOT copy this pattern to those 8 without first
        // getting a real, material-specific reason from someone who can speak to the
        // packaging LCA methodology (the same way this reason, PKG-F1's, and
        // PKG-DERIVE-1/2's came from someone who actually understood the underlying
        // calculation) -- an invented reason here would be exactly the kind of
        // unverifiable claim this whole gate exists to prevent. Those 8 materials'
        // zeros remain correctly unclassified until then.
        {
            id: 'PKG-F2-PET-WATERUSE-NOT-MODELED',
            check: 'runJRCValidation',
            match: (product) => product.materialType === 'PET_granulates',
            category: 'Water Use/Scarcity (AWARE)',
            reason: 'Requires per-facility water inventory. Honest gap. N/A. ' +
                    '(core_physics.js, PACKAGING_MULTI_CATEGORY.PET)'
        },
        {
            id: 'PKG-F3-PET-FOSSILRESOURCE-DOUBLECOUNT-AVOIDANCE',
            check: 'runJRCValidation',
            match: (product) => product.materialType === 'PET_granulates',
            category: 'Resource Use, fossils',
            reason: 'Already handled by CFF fossil fraction mechanism. Not double-' +
                    'counted here. (core_physics.js, PACKAGING_MULTI_CATEGORY.PET, ' +
                    'see calculatePackaging()\'s fossilImpact field.)'
        },
        // PKG-DERIVE-1 / PKG-DERIVE-2 (this session): cardboard and glass's
        // Resource Use, fossils are now real, cited, derived values (not bare
        // zeros — see core_physics.js, PACKAGING_MULTI_CATEGORY.cardboard /
        // .glass for full derivations from CEPI 2023 and JRC BREF Table 3.21
        // respectively). Both remain WARN, not silently PASS: neither
        // derivation has been reconciled against this file's own JRC_REFERENCE
        // values (18.2 / 15.8 MJ/kg) — the gap is real, disclosed, and
        // unresolved, not a confirmed boundary match like PKG-F1. No
        // maxDeviationPct: that field would assert a bound this file has not
        // actually verified. An auditor reading this exception sees the real
        // derivation and the real open question, not a quiet excusal.
        //
        // UPDATE (this session, follow-up): two searches for JRC_REFERENCE's own
        // source (the origin of 18.2 / 15.8) did not locate it — it carries no
        // citation anywhere in this codebase. Both searches converged on a real
        // finding: EF-compliant PEFCR background datasets are generally built on
        // licensed data (Ecoinvent, Blonk, Sphera — purchased by the European
        // Commission for pilot studies), not free primary sources. This is the
        // LIKELY, not confirmed, explanation for the gap: 18.2 / 15.8 may trace to
        // licensed data this derivation cannot access, meaning the two sides may
        // be differently-scoped data lineages rather than one being an error. See
        // full discussion in core_physics.js's PKG-DERIVE-1/2 comments.
        {
            id: 'PKG-DERIVE-1-CARDBOARD-FOSSIL-DERIVED',
            check: 'runJRCValidation',
            match: (product) => product.materialType === 'cardboard',
            category: 'Resource Use, fossils',
            reason: 'DERIVED (not a gap): 4.75 MJ/kg from CEPI Key Statistics 2023 ' +
                    '(12.99 MJ/kg total primary energy x 36.6% fossil fuel share, ' +
                    '2022 EU figures). Covers direct mill-gate energy only per ' +
                    'CEPI\'s reporting boundary. NOT reconciled against this file\'s ' +
                    'JRC_REFERENCE value of 18.2 MJ/kg, which carries no citation in ' +
                    'this codebase and was not locatable via search; likely traces to ' +
                    'licensed PEFCR background data (Ecoinvent/Blonk/Sphera) this ' +
                    'derivation cannot access — gap may reflect that, or a genuine ' +
                    'upstream forestry/chemical-input scope difference, or an ' +
                    'incomplete derivation. Unresolved; flagged for a packaging LCA ' +
                    'practitioner with access to compare both data lineages. Full ' +
                    'derivation: core_physics.js, PACKAGING_MULTI_CATEGORY.cardboard, ' +
                    'comment PKG-DERIVE-1.'
        },
        {
            id: 'PKG-DERIVE-2-GLASS-FOSSIL-DERIVED',
            check: 'runJRCValidation',
            match: (product) => product.materialType === 'glass_bottle',
            category: 'Resource Use, fossils',
            reason: 'DERIVED (not a gap): 6.56 MJ/kg from JRC BAT Reference ' +
                    'Document for Manufacture of Glass (EUR 25786 EN, 2013), Table ' +
                    '3.21, p.114 (6.9 GJ/t mean direct plant energy, N=52 real EU ' +
                    'plants, FEVE 2009 survey) x 95% fossil share (melting-specific, ' +
                    'per same document\'s Ch.3 text on fuel oil/natural gas as ' +
                    'primary melting energy). NOT reconciled against this file\'s ' +
                    'JRC_REFERENCE value of 15.8 MJ/kg, which carries no citation in ' +
                    'this codebase and was not locatable via search; likely traces to ' +
                    'licensed PEFCR background data (Ecoinvent/Blonk/Sphera) this ' +
                    'derivation cannot access — gap may reflect that, or a genuine ' +
                    'upstream raw-material extraction/cullet-chain scope difference, ' +
                    'or an incomplete derivation. Unresolved; flagged for a packaging ' +
                    'LCA practitioner with access to compare both data lineages. Full ' +
                    'derivation: core_physics.js, PACKAGING_MULTI_CATEGORY.glass, ' +
                    'comment PKG-DERIVE-2.'
        }
        // Add more only with the same rigor: real check name, real match
        // condition, real cited reason, real bound. Anything without all
        // four is not a documented exception — it is an unclassified
        // deviation and belongs on the FAIL side, not in this list.
    ];

    function findException(checkName, context) {
        return DOCUMENTED_EXCEPTIONS.find(function (ex) {
            return ex.check === checkName && ex.match(context);
        }) || null;
    }

    // ── THE GATE ──────────────────────────────────────────────────────────
    // checkName : 'runJRCValidation' | 'evaluateDNM' | 'validateCutoff'
    // result    : the raw, unmodified return value of that function
    // context   : the input that was passed to that function (used for exception matching)
    // mode      : 'shadow' (default) logs what WOULD happen, never throws.
    //             'enforce' actually throws on an unclassified failure.
    //
    // Default is 'shadow' on purpose. Flipping the default to 'enforce'
    // should only happen after running shadow mode against real historical
    // AIOXY output and confirming zero unexpected false positives — the
    // exact process that would have caught the validateSystemBoundary
    // near-miss before it shipped. That historical corpus isn't in these
    // 15 files, so I can't certify that step is done. Don't skip it.
    //
    // runJRCValidation gets per-category treatment: its real result carries
    // a `checks` array with one pass/fail per impact category, and the one
    // real exception on file (PKG-F1) is category-specific. Gating on
    // result.pass alone would excuse or block an entire product on the
    // strength of one category — wrong either way. DNM and cutoff stay at
    // their natural single-verdict granularity below: there is no per-item
    // documented exception on file for either yet, so there is nothing to
    // excuse below the top level today. If one is ever added, it needs the
    // same per-item treatment JRC got here — noted, not silently skipped.
    function evaluateGate(checkName, result, context, mode) {
        mode = mode || 'shadow';

        if (checkName === 'runJRCValidation') {
            return evaluateJRCGate(result, context, mode);
        }

        const isCompliant = ('pass' in result) ? result.pass
                           : ('compliant' in result) ? result.compliant
                           : null;

        if (isCompliant === null) {
            throw new Error('evaluateGate: "' + checkName + '" result has neither ' +
                             '.pass nor .compliant — this check doesn\'t belong behind ' +
                             'this gate (see identifyHotspots note in the file header).');
        }

        if (isCompliant === true) {
            return { action: 'pass', checkName: checkName };
        }

        const exception = findException(checkName, context);

        if (exception) {
            return {
                action: 'warn',
                checkName: checkName,
                exceptionId: exception.id,
                reason: exception.reason
            };
        }

        const message = 'UNCLASSIFIED DEVIATION: "' + checkName + '" failed and does ' +
                         'not match any documented exception. ' +
                         JSON.stringify(result);

        if (mode === 'enforce') {
            throw new Error(message);
        }

        return { action: 'WOULD_HAVE_BLOCKED', checkName: checkName, message: message };
    }

    function evaluateJRCGate(result, product, mode) {
        // runJRCValidation has a genuine bare `return true;` shortcut path (confirmed
        // directly in compliance_engine.js) distinct from the { pass: true, checks: [] }
        // object it returns elsewhere. Without this explicit check, `result.checks`
        // on a literal `true` silently evaluates to `undefined` -> `[]` -> an empty
        // failingChecks loop -> a wrong "warn, no exceptions" verdict instead of a
        // clean pass. Caught by tracing the real function, not assumed safe.
        if (result === true) {
            return { action: 'pass', checkName: 'runJRCValidation' };
        }
        if (result.pass === true) {
            return { action: 'pass', checkName: 'runJRCValidation' };
        }

        const failingChecks = (result.checks || []).filter(function (c) { return c.pass === false; });
        const unclassified = [];
        const excused = [];

        for (const c of failingChecks) {
            const exception = DOCUMENTED_EXCEPTIONS.find(function (ex) {
                return ex.check === 'runJRCValidation' && ex.category === c.category && ex.match(product);
            });
            if (exception) {
                excused.push({ category: c.category, exceptionId: exception.id, reason: exception.reason });
            } else {
                unclassified.push(c);
            }
        }

        if (unclassified.length === 0) {
            return { action: 'warn', checkName: 'runJRCValidation', excused: excused };
        }

        const message = 'UNCLASSIFIED DEVIATION: runJRCValidation failed for ' +
                         unclassified.length + ' categor' + (unclassified.length === 1 ? 'y' : 'ies') +
                         ' with no matching documented exception: ' + JSON.stringify(unclassified);

        if (mode === 'enforce') {
            throw new Error(message);
        }

        return { action: 'WOULD_HAVE_BLOCKED', checkName: 'runJRCValidation', message: message, excused: excused, unclassified: unclassified };
    }

    exports.evaluateGate = evaluateGate;
    exports.DOCUMENTED_EXCEPTIONS = DOCUMENTED_EXCEPTIONS; // exposed for shadow-mode reporting/audits
    exports.findException = findException;

}(typeof module !== 'undefined' && module.exports ? module.exports : (window.complianceGate = window.complianceGate || {})));
