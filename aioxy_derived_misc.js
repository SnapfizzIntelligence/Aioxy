// AIOXY DERIVED DATABASE — MISC (split from aioxy_derived_db.js)
// Contains: aquaculture_feeds | commodity_prices
// Sources: Tacon & Metian (2008) Aquaculture 285:146-158; Fry et al. (2018) Environ. Res. Lett. 13:024017
//          World Bank CMO Annual Prices (Nominal), 2024/2026
// Split performed 2026-08-21.
// ======================================================

window.aioxyData = window.aioxyData || {};

// ─── NAMESPACE 2: aquaculture_feeds ──────────────────────────
window.aioxyData.aquaculture_feeds = {
  "farmed_fish": {
    "fcr": 1.9,
    "fish_oil_pct": 8.0,
    "fishmeal_pct": 32.0,
    "source": "Default marine fish proxy (Tacon & Metian 2008, Table 3 global avg). Fixed 2026-08-22 (verification pass): previous values (1.7 / 2.0 / 20.0) were shrimp's Table 3 global average, copied in error. Correct marine finfish global average is fcr 0.9-3.0 (1.9), fish meal 7-70% (32%), fish oil 1-15% (8%)."
  },
  "salmon": {
    "fcr": 1.25,
    "fish_oil_pct": 20.0,
    "fishmeal_pct": 30.0,
    "source": "Tacon & Metian 2008, Table 3 (Salmo salar global avg 2006); FCR also Fry 2018, Table 1"
  },
  "sea_bass": {
    "fcr": 2.1,
    "fish_oil_pct": 14.0,
    "fishmeal_pct": 32.0,
    "source": "Tacon & Metian 2008, Table 3 (Dicentrarchus labrax cross-country mean FR/GR/TR/ES); UNCERTAIN"
  },
  "sea_bream": {
    "fcr": 1.9,
    "fish_oil_pct": 11.0,
    "fishmeal_pct": 27.0,
    "source": "Tacon & Metian 2008, Table 3 (Sparus aurata cross-country mean FR/GR/TR/ES); UNCERTAIN"
  },
  "shrimp": {
    "fcr": 1.7,
    "fish_oil_pct": 2.0,
    "fishmeal_pct": 20.0,
    "source": "Tacon & Metian 2008, Table 3 (Penaeus spp. global avg 2006); FCR also Fry 2018, Table 1"
  },
  "trout": {
    "fcr": 1.25,
    "fish_oil_pct": 15.0,
    "fishmeal_pct": 30.0,
    "source": "Tacon & Metian 2008, Table 3 (Oncorhynchus mykiss global avg 2006); FCR also Fry 2018, Table 1"
  }
};

// ─── NAMESPACE 3: commodity_prices ───────────────────────────
// UPDATED (post-34-item-audit follow-up): refreshed from World Bank Commodities Price
// Data ("The Pink Sheet"), April 2026 edition, reporting March 2026 monthly prices --
// fetched directly from thedocs.worldbank.org, the primary source, not a secondary
// aggregator. EUR figures use the same implied EUR/USD rate (0.9259) already present in
// the prior version of this file, for consistency rather than introducing a new,
// separately-sourced exchange rate under time pressure.
//
// HONEST LIMITATION: this free monthly source tracks soybean meal directly, but does NOT
// track rapeseed meal, sunflower meal, or wheat bran specifically -- these co-products
// relevant to Item #12/#34's crushing/wet_milling allocation gap would need a separate,
// more specialized source (e.g. USDA National Feedstuffs Market Review, which is also
// free but reports irregularly and isn't structured as a clean monthly time series).
// Not fabricated here rather than guessed.
window.aioxyData.commodity_prices = {
  "beef": {
    "price_eur_per_kg": 7.6036,
    "price_usd_per_kg": 8.21,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, New Zealand 90% chemical lean, cif US imported)"
  },
  "chicken": {
    "price_eur_per_kg": 1.5370,
    "price_usd_per_kg": 1.66,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, Brazil Sao Paulo wholesale frozen)"
  },
  "fish_meal": {
    "price_eur_per_kg": 1.7009,
    "price_usd_per_kg": 1.837,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, German fishmeal, Danish 64% pro, FOB Bremen)"
  },
  "maize": {
    "price_eur_per_kg": 0.1970,
    "price_usd_per_kg": 0.2127,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, U.S. no. 2 yellow, fob US Gulf)"
  },
  "palm_oil": {
    "price_eur_per_kg": 1.0215,
    "price_usd_per_kg": 1.103,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, Malaysia crude, DAP)"
  },
  "milk": {
    "price_eur_per_kg": 0.3274,
    "price_usd_per_kg": 0.3558,
    "year": 2026,
    "source": "USDA (via Trading Economics benchmark tracker), farm milk price, USD 16.14/CWT, March 20, 2026 -- converted CWT (100 lb) to kg using 1 lb = 0.453592 kg, then USD to EUR at an approximate ~0.92 rate (not a precise same-day FX quote -- flagged for refinement if exact-date FX matters for a specific use). ADDED (this session, FIX COMMODITY-PRICE-1) to correct a real bug: previously, 'cow' matched into the 'beef' commodityKey, meaning every dairy/Cow-milk ingredient was priced as beef cattle meat for the allocation-sensitivity check, a genuine economic mismatch. Note: World Bank Pink Sheet (the source for all other entries in this file) does not track a farm-gate raw milk series, so this entry uses a different, real, dated, disclosed source rather than force-fitting an inapplicable one."
  },
  "soybean_meal": {
    "price_eur_per_kg": 0.3741,
    "price_usd_per_kg": 0.404,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, U.S. Soybean Meal 48% protein, FOB Rotterdam)"
  },
  "soybean_oil": {
    "price_eur_per_kg": 1.3725,
    "price_usd_per_kg": 1.482,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, U.S. Soybean Oil Crude Degummed, FOB U.S. Gulf). ADDED (2026-08-01, cofounder-directed) specifically to unblock the crushing co-product economic allocation for soybean (calculation_engine.js, adjustments.coproduct_allocation) -- soybean_meal and soybeans already existed in this table but the OIL price (the actual co-product output, not the raw bean) was missing, so the allocation path had no real price to compute against for soybean and silently fell to applied:false. EUR conversion uses the same ~0.9261 USD->EUR rate implied by every other entry in this table (e.g. beef: 7.6036/8.21, palm_oil: 1.0215/1.103) for consistency, not a fresh same-day FX quote."
  },
  "soybeans": {
    "price_eur_per_kg": 0.4380,
    "price_usd_per_kg": 0.473,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, U.S. Soybeans, FOB US Gulf)"
  },
  "wheat": {
    "price_eur_per_kg": 0.2291,
    "price_usd_per_kg": 0.2474,
    "year": 2026,
    "source": "World Bank Pink Sheet, April 2026 edition (March 2026 price, U.S. no. 2 soft red winter, delivered US Gulf)"
  },
  "_rapeseed_note": "NOT ADDED (2026-08-01, cofounder-directed sourcing check): rapeseed/canola oil and meal are NOT tracked in the World Bank Pink Sheet at all -- confirmed against the live April 2026 edition's full commodity list (thedocs.worldbank.org), which covers Soybean meal/oil/beans but no rapeseed series of any kind. This is a real, disclosed gap, not an oversight: the crushing co-product allocation for rapeseed (calculation_engine.js, cpKey === 'rapeseed') will correctly continue to fall through to applied:false with the honest overstatement warning already in place, until an official-grade rapeseed oil/meal price source is identified and added the same way soybean_oil was above. Candidates worth evaluating: Euronext/MATIF rapeseed futures settlement (exchange-official, not a CFD tracker), or FAO/Eurostat agricultural price series -- do not substitute a CFD/trading-platform quote (e.g. Trading Economics) for this table, as those aren't primary official sources and don't match this table's sourcing standard."
};
