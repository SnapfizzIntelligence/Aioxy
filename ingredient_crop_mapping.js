// AIOXY ingredient → FAOSTAT GCE/QCL crop key mapping
// Hand-verified against window.aioxyData.faostat_gce_crop.crops keys.
// Deliberately excludes any ingredient that merely mentions a crop as a feed
// input (e.g. cow-milk...silage-maize...) rather than being that crop itself —
// applying a maize climate ratio to a dairy ingredient would be a real error,
// not a rounding one. 9 such entries were reviewed and excluded on this basis.
//
// rice, rye, millet have FAOSTAT factors available (see faostat_gce_crop.crops)
// but no matching raw-ingredient entry exists in the current 222-item database —
// left unmapped rather than guessed at. Add here if/when such ingredients are added.
window.aioxyData = window.aioxyData || {};
window.aioxyData.ingredientFaostatCropKey = {
    "durum-wheat-grain-conventional-national-average-at-farm-gate-fr-u-raw": "wheat",
    "soft-wheat-grain-basis-scenario-without-lever-at-farm-gate-fr-u-raw": "wheat",
    "soft-wheat-grain-conventional-breadmaking-quality-15-moisture-at-farm-gate-fr-u-raw": "wheat",
    "soft-wheat-grain-conventional-national-average-animal-feed-at-farm-gate-production-fr-u-raw": "wheat",
    "soft-wheat-grain-conventional-protein-improved-quality-15-moisture-at-farm-gate-fr-u-raw": "wheat",
    "soft-wheat-grain-protein-crop-scenario-at-farm-gate-fr-u-raw": "wheat",
    "soft-wheat-grain-systematic-cover-cropping-scenario-at-farm-gate-fr-u-raw": "wheat",
    "barley-feed-grain-conventional-national-average-animal-feed-at-farm-gate-fr-u-raw": "barley",
    "spring-barley-conventional-downgraded-quality-animal-feed-at-farm-gate-fr-u-raw": "barley",
    "spring-barley-conventional-malting-quality-animal-feed-at-farm-gate-fr-u-raw": "barley",
    "winter-barley-conventional-malting-quality-animal-feed-at-farm-gate-fr-u-raw": "barley",
    "grain-maize-basis-scenario-without-lever-at-farm-gate-fr-u-raw": "maize",
    "grain-maize-protein-crop-scenario-at-farm-gate-fr-u-raw": "maize",
    "grain-maize-systematic-cover-cropping-scenario-at-farm-gate-fr-u-raw": "maize",
    "maize-grain-conventional-28-moisture-national-average-animal-feed-at-farm-gate-fr-u-raw": "maize",
    "maize-grain-conventional-28-moisture-national-average-with-water-footprint-animal-feed-at-farm-gate--raw": "maize",
    "oat-grain-national-average-animal-feed-at-farm-gate-fr-u-raw": "oats",
    "silage-sorghum-national-average-animal-feed-at-farm-gate-fr-u-raw": "sorghum",
    "sorghum-grain-conventional-national-average-animal-feed-at-farm-gate-fr-u-raw": "sorghum",
    "soybean-cut-off-date-2008-br-market-for-soybean-without-transport-cut-off-u-adapted-from-ecoinvent-raw": "soybean",
    "soybean-cut-off-date-2020-br-market-for-soybean-without-transport-cut-off-u-adapted-from-ecoinvent-raw": "soybean",
    "soybean-national-average-animal-feed-at-farm-gate-fr-u-raw": "soybean",
    "soybean-not-associated-to-deforestation-br-market-for-soybean-without-transport-cut-off-u-adapted-fr-raw": "soybean",
    "starch-potato-conventional-national-average-at-farm-gate-fr-u-raw": "potatoes",
    "ware-potato-conventional-for-fresh-market-firm-flesh-varieties-at-farm-gate-fr-u-raw": "potatoes",
    "ware-potato-conventional-for-fresh-market-other-varieties-at-farm-gate-fr-u-raw": "potatoes",
    "ware-potato-conventional-for-industrial-use-at-farm-gate-fr-u-raw": "potatoes",
    "ware-potato-conventional-variety-mix-national-average-at-farm-gate-fr-u-raw": "potatoes"
};

// Applied at ingredient-load time — sets ingredient.faostatCropKey for STEP C2
// in calculation_engine.js to consume. Call once per ingredient after loading
// from ingredients_db.js, before calculateIngredientImpact() runs.
function applyFaostatCropKey(ingredient) {
    const key = window.aioxyData.ingredientFaostatCropKey[ingredient.id];
    if (key) ingredient.faostatCropKey = key;
    return ingredient;
}