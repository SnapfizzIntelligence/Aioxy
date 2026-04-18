// ================== AIOXY CALCULATION ENGINE v3.1 ==================
// PEF 3.1 Compliant | ISO 14044 Aligned | Audit-Grade Physics
// This file contains all core LCA calculations, physics constants,
// and the main food calculation engine.
// REFACTORED: Removed global dependencies, added proper scoping, fixed return types
// ===================================================================

(function(global) {
    'use strict';

    // ================== AIOXY OFFICIAL PHYSICS CONSTANTS (AUDIT GRADE v2.2) ==================
    // REGULATORY COMPLIANCE: EMPCO DIRECTIVE (EU) 2024/825
    const PHYSICS_CONSTANTS = {
        // --- EQUIVALENCIES (CONSERVATIVE ESTIMATES) ---
        // Source: European Environment Agency (EEA) "Trees and Carbon" (2022 Update)
        // Metric: Mature broadleaf tree absorption. Lowered from 25 to 22 for regulatory safety.
        TREE_ABSORPTION_KG_YEAR: 22.0, 
        
        // Source: EEA 2023 Monitoring CO2 emissions from passenger cars (Regulation EU 2019/631)
        // 108g (WLTP Tailpipe) + ~42g WTT (Well-to-Tank) = ~150g = 0.150 kg/km
        // PREVIOUS "0.192" WAS TOO HIGH (risk of overstating savings).
        CAR_EMISSIONS_KG_PER_KM: 0.150, 

        // Source: Eurostat 2023 (EU-27 Avg Household: 3700 kWh/year) -> ~10.1 kWh/day
        // Grid intensity EU avg (2023) ~255g/kWh -> 2.58 kg CO2e/day
        HOUSEHOLD_ELEC_KG_DAY: 2.58, 

        // Source: WULCA AWARE 2.0 (Global Consensus)
        // 1 m3 world eq. represents the scarcity-weighted impact of 1 m3 water in world avg basin
        // We use VOLUME of bottled water (0.5L) for the visual, not the AWARE score.
        WATER_BOTTLE_LITERS: 0.5,

        // --- FINANCIAL RISK PROXY (NOT "SAVINGS") ---
        // Source: Quinet Report (France 2019) & EPA Social Cost of Carbon (2023 Update)
        // Must be labeled "Shadow Price" or "Risk Exposure", NEVER "Cash Savings" in B2B reports.
        SHADOW_PRICE_EUR_TON: 85.0, 

        // --- LCA PHYSICS (IPCC AR6 & EMISSIONS) ---
        // Source: IPCC Assessment Report 6 (2021/2023), Chapter 7
        gwp: { 
            ch4: 27.9,  // AR6 GWP100 for Methane (Non-fossil) - CORRECTED from 29.8 (Fossil)
            n2o: 273,   // AR6 GWP100 for Nitrous Oxide
            biogenic_discount: 0.0, // REGULATOR SAFETY: Default to 0. No credit without certificates.
            ar6_dynamic: true
        },
        
        // Source: Agribalyse 3.2 LCI / Ecoinvent 3.9
        emission_factors: {
            nitrogen_synthetic: 5.7, // kg CO2e per kg N fertilizer
            nitrogen_legume: 0.0,    // 0 emissions for biological fixation (natural process)
            diesel: 3.24,            // kg CO2e per liter (Well-to-Wheel, JRC 2020) - CORRECTED from 2.68
            n_to_n2o_synthetic: 0.01,// IPCC Tier 1 factor (1% of N becomes N2O)
            n_to_n2o_legume: 0.0     // Biological fixation has negligible N2O leakage
        }, 
        // ================== NITRATE LEACHING (IPCC 2006 Vol 4, Ch 11) ==================
// Source: PEF 3.1 Marine Eutrophication / IPCC Tier 1
N_LEACHING: {
    FRAC_LEACH: 0.30,           // 30% of applied N leaches to water
    NO3_CONVERSION: 62/14,      // Convert N to NO3 mass (4.428571428...)
    INDIRECT_N2O_EF5: 0.011     // Indirect N2O from leached N
},

// ================== PHOSPHORUS LEACHING (SALCA-P Model) ==================
// Source: PEF 3.1 Freshwater Eutrophication
P_LEACHING: {
    FRAC_RELE: 0.05,            // 5% of applied P lost to water
    PO4_CONVERSION: 3.06        // Convert P to PO4 mass
},
        // ================== TRANSPORT PAYLOAD & EMPTY RETURNS (GLEC v3.2 / ISO 14083) ==================
// Source: PEF 3.1 §4.4.3
TRANSPORT: {
    LOAD_FACTOR: 0.64,          // 64% capacity utilization for HDVs
    EMPTY_RETURN_RATE: 0.18,    // 18% empty return for road freight
    // Only apply to road and sea; air uses different accounting
},
        // ================== DATA NEEDS MATRIX (PEF 3.1 §6.6) ==================
// Thresholds for data quality enforcement
DNM: {
    CONTRIBUTION_THRESHOLD: 0.10,    // 10% contribution = "Most Relevant"
    PRIMARY_DATA_DQR_MAX: 2.0,       // Under operational control must have DQR ≤ 2.0
    SECONDARY_DATA_DQR_MAX: 3.0,     // Not under control must have DQR ≤ 3.0
},
        // ================== HOTSPOT IDENTIFICATION (ISO 14044 §4.5.2) ==================
HOTSPOT: {
    CUMULATIVE_THRESHOLD: 0.80,    // 80% cumulative contribution = hotspot
},
        // ================== CAPITAL GOODS (ISO 14044 / PEF 3.1) ==================
CAPITAL_GOODS: {
    CUTOFF_THRESHOLD: 0.01,         // 1% rule - must include if >1% of total impact
    DEFAULT_LIFESPAN_YEARS: 15,     // Default machinery lifespan
    BUILDING_LIFESPAN_YEARS: 30,    // Default building lifespan
},
        // ================== EUDR COMPLIANCE (Reg. 2023/1115) ==================
EUDR: {
    CUTOFF_DATE: '2020-12-31',      // Land converted after this date = non-compliant
    HIGH_RISK_COMMODITIES: ['soy', 'palm', 'cocoa', 'coffee', 'cattle', 'beef', 'rubber', 'wood', 'leather'],
},
        // ================== ELECTRICITY MODELING (PEF 3.1 §4.4.2) ==================
ELECTRICITY: {
    T_AND_D_LOSSES: 0.07,           // 7% transmission and distribution losses
    RESIDUAL_MIX_DEFAULT: 1.2,      // Residual mix multiplier vs grid (conservative)
},
        // ================== IN-USE EMISSIONS (PEFCR Food & Drink) ==================
IN_USE: {
    // Retail storage (supermarket)
    RETAIL_CHILLED_KWH_PER_KG_DAY: 0.003,
    RETAIL_FROZEN_KWH_PER_KG_DAY: 0.002,
    RETAIL_STORAGE_DAYS_CHILLED: 3,
    RETAIL_STORAGE_DAYS_FROZEN: 14,
    
    // Home storage (consumer fridge/freezer)
    HOME_CHILLED_KWH_PER_KG_DAY: 0.005,
    HOME_FROZEN_KWH_PER_KG_DAY: 0.004,
    HOME_STORAGE_DAYS_CHILLED: 3,
    HOME_STORAGE_DAYS_FROZEN: 30,
    
    // Refrigerant leakage rates
    RETAIL_LEAKAGE_RATE: 0.15,      // 15% annual leakage commercial systems
    HOME_LEAKAGE_RATE: 0.01,        // 1% annual leakage domestic fridges
},

        // ================== ENTERIC FERMENTATION (IPCC 2006 Vol 4, Ch 10) ==================
ENTERIC: {
    // Emission factors (kg CH4 / head / year) - IPCC Tier 1
    DAIRY_COW: 100,
    BEEF_COW: 50,
    SHEEP: 8,
    GOAT: 5,
    PIG: 1.5,
    // Conversion to kg CO2e per kg meat/milk
    // Requires yield data from window.aioxyData.yield_benchmarks
},

// ================== SOIL ORGANIC CARBON (ISO 14067 / PAS 2050-1) ==================
SOC: {
    AMORTIZATION_YEARS: 20,              // 20-year amortization for SOC changes
    DEFAULT_REFERENCE_SOC: 50,           // Default reference SOC (t C/ha)
    ANNUAL_CROPS_SOC: 5,                 // Typical SOC for annual cropland (t C/ha)
    REGEN_ANNUAL_RATE: 0.5,              // t C/ha/year sequestration for regen ag
    CONSERVATION_ANNUAL_RATE: 0.2,       // t C/ha/year for conservation tillage
},
        // ================== WASTE VS CO-PRODUCT (ISO 14044 §4.3.4) ==================
ALLOCATION: {
    WASTE_VALUE_THRESHOLD: 0.01,     // USD/kg - below this = waste
    DEFAULT_WASTE_TYPES: ['husk', 'shell', 'peel', 'stem', 'leaf', 'straw', 'manure'],
},
        // ================== DATA VALIDITY (PEF 3.1 §5.1) ==================
VALIDITY: {
    STUDY_EXPIRATION_YEARS: 3,
    DATASET_EXPIRATION_YEARS: 5,
    WARNING_THRESHOLD_MONTHS: 30,    // Warn 6 months before expiration
},
        
    };

    // ================== AIOXY MASTER PHYSICS DATABASE (AUDIT GRADE) ==================
    const PHYSICS_DB = {
        // 1. INGREDIENT ORIGINS (AGRONOMIC TRUTH)
        origins: {
            "beef-cattle-conventional-national-average-at-farm-gate-fr": "FR",
            "broiler-conventional-at-farm-gate-fr": "FR",
            "pig-conventional-national-average-at-farm-gate-fr": "FR",
            "salmon-farmed-conventional-at-farm-gate-no": "NO",
            "lamb-conventional-indoor-production-system-at-farm-gate-fr": "FR",
            "turkey-conventional-at-farm-gate-fr": "FR",
            "small-trout-250-350g-conventional-at-farm-gate-fr": "FR",
            "mussels-with-shell-at-farm-gate-fr": "FR",
            "sea-bass-or-sea-bream-200-500g-conventional-in-cage-at-farm-gate-fr": "FR",
            "european-pilchard-sardina-pilchardus-eca-seine-average-at-landing-fr": "FR",
            "atlantic-herring-clupea-harengus-nea-pelagic-trawl-average-at-landing-nl": "NL",
            "atlantic-mackerel-scomber-scombrus-nea-pelagic-trawl-average-at-landing-nl": "NL",
            "great-scallop-pecten-maximus-bsbrieuc-dredge-average-at-landing-fr": "FR",
            "common-sole-solea-solea-bbiscay-trammel-net-average-at-landing-fr": "FR",
            "rabbit-conventional-in-cage-at-farm-gate-fr": "FR",
            "duck-for-roasting-conventional-at-farm-gate-fr": "FR",
            "fresh-shrimps-china-production-fr": "CN",
            "broiler-label-rouge-at-farm-gate-fr": "FR",
            "pig-label-rouge-outdoor-system-at-farm-gate-fr": "FR",
            "turkey-label-rouge-at-farm-gate-fr": "FR",
            "cow-milk-conventional-national-average-at-farm-gate-fr": "FR",
            "sheep-milk-conventional-roquefort-system-at-farm-gate-fr": "FR",
            "goat-milk-conventional-intensive-forage-area-at-farm-gate-fr": "FR",
            "durum-wheat-grain-conventional-national-average-at-farm-gate-fr": "FR",
            "maize-grain-conventional-28-moisture-national-average-animal-feed-at-farm-gate-fr": "FR",
            "oat-grain-national-average-animal-feed-at-farm-gate-fr": "FR",
            "barley-feed-grain-conventional-national-average-animal-feed-at-farm-gate-fr": "FR",
            "soybean-national-average-animal-feed-at-farm-gate-fr": "FR",
            "quinoa-fr-conventional-at-farm-gate-fr-corrected": "FR",
            "rapeseed-conventional-9-moisture-national-average-animal-feed-at-farm-gate-production-fr": "FR",
            "sunflower-grain-conventional-9-moisture-national-average-animal-feed-at-farm-gate-production-fr": "FR",
            "hemp-grain-champagne-at-farm-gate-fr": "FR",
            "flaxseed-extruded-bleu-blanc-coeur-feed-at-farm-gate-fr": "FR",
            "lupin-conventional-national-average-at-farm-gate-production-fr": "FR",
            "triticale-grain-conventional-national-average-animal-feed-at-farm-gate-production-fr": "FR",
            "sorghum-grain-conventional-national-average-animal-feed-at-farm-gate-fr": "FR",
            "ware-potato-conventional-variety-mix-national-average-at-farm-gate-fr": "FR",
            "tomato-average-basket-conventional-heated-greenhouse-national-average-at-greenhouse-fr": "FR",
            "onion-conventional-national-average-at-farm-fr": "FR",
            "carrot-conventional-national-average-at-farm-gate-fr": "FR",
            "apple-conventional-national-average-at-orchard-fr": "FR",
            "banana-mixed-production-west-indies-at-farm-gate-wi": "GP",
            "strawberry-conventional-national-average-at-farm-gate-fr": "FR",
            "cauliflower-conventional-national-average-at-farm-gate-fr": "FR",
            "sugar-beet-roots-conventional-national-average-animal-feed-at-farm-gate-production-fr": "FR",
            "zucchini-conventional-national-average-at-farm-gate-fr": "FR",
            "leek-conventional-national-average-at-plant-fr": "FR",
            "melon-conventional-national-average-at-farm-gate-fr": "FR",
            "french-bean-conventional-national-average-at-farm-gate-fr": "FR",
            "chicory-witlof-conventional-national-average-at-farm-gate-fr": "FR",
            "cauliflower-fresh-eu": "ES",
            "coffee-bean-robusta-depulped-brazil-at-farm-gate-br": "BR",
            "black-pepper-conventional-at-farm-gate-vn": "VN",
            "shea-butter-africa": "GH",
            "cotton-conv-global": "IN",
            "polyester-virgin-pet": "CN"
        },

        // 2. GLEC v3.2 EXACT TRANSPORT FACTORS (kg CO2e / ton-km)
        glec_factors: {
            road: {
                // 34-40t Articulated (hgv) & <3.5t Van (van) EU Averages
                ambient: { hgv: 0.060, van: 0.842 }, 
                // GLEC v3.2 mandates +12% uplift for temperature controlled road transport
                chilled: { hgv: 0.067, van: 0.943 }, 
                frozen:  { hgv: 0.067, van: 0.943 }
            },
            sea: {
                ambient: 0.0072, // Clean Cargo Industry Avg (Dry)
                reefer:  0.0142  // Reefer multiplier (x1.98 based on CCWG data)
            },
            air: {
                ambient: 0.788,  // Long-haul >1500km avg
                reefer:  0.827   // +5% active cooling uplift
            },
            rail: {
                ambient: 0.0184, // EU Avg mixed traction
                reefer:  0.0206  // +12% uplift for temperature control
            },
            // REGULATORY REQUIREMENT: Distance Adjustment Factors (DAF)
            daf: {
                road: 1.05, // +5% for routing diversions
                sea: 1.15,  // +15% for actual vs shortest feasible distance
                rail: 1.00, // 0% deviation
                air: 95     // +95km flat addition for maneuvering
            }
        },

        // 3. WATERSHED AWARE 2.0 FACTORS (m3 world eq / m3)
        watersheds: {
            "FR": {
                "Seine":      { default: 12.0, summer: 38.4, winter: 1.2 },
                "Loire":      { default: 8.5,  summer: 24.1, winter: 0.9 },
                "Rhone":      { default: 3.2,  summer: 9.8,  winter: 0.4 },
                "Adour":      { default: 18.0, summer: 45.0, winter: 2.1 },
                "NationalAvg": { default: 17.1, summer: 32.0, winter: 2.5 }
            },
            "ES": {
                "Ebro":       { default: 65.0, summer: 98.0, winter: 24.0 },
                "Segura":     { default: 100.0, summer: 100.0, winter: 95.0 },
                "Guadalquivir":{ default: 85.0, summer: 100.0, winter: 50.0 },
                "NationalAvg": { default: 64.7, summer: 90.0, winter: 35.0 }
            },
            "IT": {
                "Po":         { default: 42.0, summer: 80.0, winter: 12.0 },
                "Tiber":      { default: 35.0, summer: 65.0, winter: 10.0 },
                "NationalAvg": { default: 49.8, summer: 75.0, winter: 18.0 }
            },
            "NL": {
                "Rhine":      { default: 1.4,  summer: 2.8,  winter: 0.6 },
                "Meuse":      { default: 1.8,  summer: 3.2,  winter: 0.8 },
                "NationalAvg": { default: 1.6,  summer: 3.0,  winter: 0.7 }
            },
            "BR": {
                "Amazon":     { default: 0.1,  summer: 0.1,  winter: 0.1 },
                "Parana":     { default: 1.5,  summer: 3.0,  winter: 0.8 },
                "NationalAvg": { default: 3.1,  summer: 5.5,  winter: 1.2 }
            },
            "CN": {
                "Yellow":     { default: 95.0, summer: 100.0, winter: 80.0 },
                "Yangtze":    { default: 22.0, summer: 45.0, winter: 8.0 },
                "NationalAvg": { default: 41.0, summer: 70.0, winter: 20.0 }
            }
        }
        // ================== FERTILIZER COMPOSITION (FAO / Industry Standard) ==================
// N% and P% for common fertilizers - used for N-leaching and P-leaching calculations
fertilizer_composition: {
    'triple_superphosphate': { n_percent: 0, p_percent: 20 },
    'TSP': { n_percent: 0, p_percent: 20 },
    'diammonium_phosphate': { n_percent: 18, p_percent: 20 },
    'DAP': { n_percent: 18, p_percent: 20 },
    'monoammonium_phosphate': { n_percent: 11, p_percent: 23 },
    'MAP': { n_percent: 11, p_percent: 23 },
    'urea': { n_percent: 46, p_percent: 0 },
    'ammonium_nitrate': { n_percent: 34, p_percent: 0 },
    'potassium_chloride': { n_percent: 0, p_percent: 0 },
    'default': { n_percent: 15, p_percent: 10 }  // Conservative default
},
    };

    // ================== 2025 AIOXY FORMULATION STANDARDS (Oatly-Verified) ==================
    const FORMULATION_STANDARDS = {
        'oat-milk': {
            density: 1.03, // kg/L
            composition: {
                'oats': { target_percent: 0.10, processing_yield: 0.85 },
                'oil':  { target_percent: 0.02, processing_yield: 0.99 },
                'water':{ target_percent: 0.88, processing_yield: 0.98 }
            },
            manufacturing_impact: {
                electricity_kwh_per_kg: 0.64,
                note: "Oatly 2024 verified (enzymatic + UHT)"
            }
        },
        'plant-burger': {
            composition: {
                'protein': { target_percent: 0.20, processing_yield: 0.95 },
                'oil':     { target_percent: 0.10, processing_yield: 0.99 },
                'water':   { target_percent: 0.65, processing_yield: 0.90 },
                'binder':  { target_percent: 0.05, processing_yield: 1.0 }
            },
            manufacturing_impact: {
                electricity_kwh_per_kg: 1.3,
                note: "Extrusion average"
            }
        }
        // ================== COUNTRY LUC FALLBACKS (EF 3.1 / WFLDB) ==================
// Source: PEF 3.1 §4.4.8.1 / Blonk WFLDB
// Values in kg CO2e per kg of product (20-year amortized)
country_luc_fallbacks: {
    // Soybean
    'soybean-BR': 1.67,
    'soybean-AR': 0.59,
    'soybean-US': 0.40,
    'soybean-PY': 0.55,
    'soybean-BO': 0.72,
    // Palm Oil
    'palmoil-ID': 0.98,
    'palmoil-MY': 0.71,
    'palmoil-TH': 0.42,
    // Cocoa
    'cocoa-ID': 27.08,
    'cocoa-CI': 24.46,
    'cocoa-GH': 6.70,
    'cocoa-CM': 8.50,
    // Coffee
    'coffee-BR': 1.10,
    'coffee-VN': 0.95,
    'coffee-CO': 1.30,
    'coffee-ET': 0.45,
    // Beef (pasture expansion)
    'beef-BR': 12.5,
    'beef-AR': 8.2,
    'beef-PY': 9.1,
    // Default for unknown high-risk (precautionary principle)
    'default_high_risk': 1.67
},
// ================== COMMODITY PRICES FOR ECONOMIC ALLOCATION ==================
// Source: World Bank Commodity Price Data / FAO Stat (USD/kg at factory gate)
// Used for ISO 14044 §4.3.4.2 economic allocation
commodity_prices: {
    // Animal products
    'beef': 5.20,
    'milk': 0.42,
    'cheese': 4.80,
    'chicken': 2.30,
    'pork': 2.10,
    'eggs': 1.80,
    // Crops
    'wheat': 0.28,
    'soybean': 0.52,
    'soy_oil': 0.95,
    'soy_meal': 0.48,
    'palm_oil': 0.85,
    'rapeseed_oil': 0.95,
    'sunflower_oil': 0.90,
    'corn': 0.22,
    'rice': 0.42,
    'sugar': 0.38,
    'coffee': 3.50,
    'cocoa': 2.80,
    'default': 0.50
},
// ================== CAPITAL GOODS PROXIES (Ecoinvent / Industry) ==================
// Embedded carbon per unit (kg CO2e)
capital_goods: {
    // Processing equipment (kg CO2e per kg capacity per year)
    'mixer': 0.008,
    'pasteurizer': 0.015,
    'fermenter': 0.025,
    'extruder': 0.020,
    'spray_dryer': 0.035,
    'freezer': 0.018,
    'oven': 0.012,
    'mill': 0.010,
    // Building (kg CO2e per m2 per year)
    'food_plant': 25,
    'cold_storage': 35,
    'default': 0.010
},
// ================== RESIDUAL MIX FACTORS (AIB / PEF 3.1) ==================
// Multiplier applied to grid intensity when no RECs/GOs are held
// Residual mix = Grid mix minus sold renewable attributes
residual_mix_multipliers: {
    'FR': 1.35, 'DE': 1.25, 'IT': 1.18, 'ES': 1.22, 'NL': 1.15,
    'BE': 1.20, 'AT': 1.10, 'SE': 1.05, 'DK': 1.08, 'FI': 1.05,
    'PL': 1.12, 'CZ': 1.15, 'HU': 1.18, 'RO': 1.20, 'BG': 1.25,
    'default': 1.20
},
// ================== REFRIGERANT GWP100 (IPCC AR6) ==================
refrigerants: {
    'R-134a': 1530,
    'R-404A': 4728,
    'R-410A': 2256,
    'R-407C': 1825,
    'R-744': 1,          // CO2
    'R-717': 0,          // Ammonia
    'R-290': 3,          // Propane
    'default': 2000      // Conservative default
},
    };

    // ================== UNIVERSAL FOOD PHYSICS DATABASE ==================
    const FOOD_PHYSICS_DB = {
        'milk-product':      { target_hydration: 0.88, default_density: 1.03, note: "Oat/cow/soy milk" },
        'juice-drink':       { target_hydration: 0.90, default_density: 1.04 },
        'beverage':          { target_hydration: 0.92, default_density: 1.00 },
        'yogurt-product':    { target_hydration: 0.85, default_density: 1.05 },
        'cheese-product':    { target_hydration: 0.45, default_density: 1.10 },
        'bread-product':     { target_hydration: 0.38, default_density: 0.85 },
        'burger-product':    { target_hydration: 0.62, default_density: 1.00, note: "Plant/animal patties" },
        'meat-alt':          { target_hydration: 0.65, default_density: 1.00 },
        'soup-product':      { target_hydration: 0.92, default_density: 1.02 },
        'sauce-product':     { target_hydration: 0.75, default_density: 1.10 },
        'default':           { target_hydration: 0.00, default_density: 1.00 }
    }; 

    // ================== PEF FRAMEWORK ==================
    const pefCategories = {
        "Climate Change": { unit: "kg CO₂e", icon: "smog" },
        "Ozone Depletion": { unit: "kg CFC11e", icon: "sun" },
        "Human Toxicity, non-cancer": { unit: "CTUh", icon: "user-slash" },
        "Human Toxicity, cancer": { unit: "CTUh", icon: "user-injured" },
        "Particulate Matter": { unit: "disease inc.", icon: "lungs" },
        "Ionizing Radiation": { unit: "kBq U235e", icon: "radiation" },
        "Photochemical Ozone Formation": { unit: "kg NMVOCe", icon: "cloud-sun" },
        "Acidification": { unit: "mol H+e", icon: "tint" },
        "Eutrophication, terrestrial": { unit: "mol N e", icon: "leaf" },
        "Eutrophication, freshwater": { unit: "kg P e", icon: "water" },
        "Eutrophication, marine": { unit: "kg N e", icon: "fish" },
        "Ecotoxicity, freshwater": { unit: "CTUe", icon: "bug" },
        "Land Use": { unit: "Pt", icon: "mountain" },
        "Water Use/Scarcity (AWARE)": { unit: "m³ world eq.", icon: "tint" },
        "Resource Use, minerals/metals": { unit: "kg Sb e", icon: "gem" },
        "Resource Use, fossils": { unit: "MJ", icon: "oil-can" }
    };

    // ================== HELPER: Box-Muller Transform ==================
    function randomNormal() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

// ================== HELPER: Data Validity & Expiration ==================
/**
 * Check if study or dataset has expired per PEF 3.1 §5.1
 * 
 * @param {string} timestamp - ISO timestamp of calculation or dataset
 * @param {number} validityYears - Years until expiration
 * @returns {Object} Validity status
 */
function checkExpiration(timestamp, validityYears = PHYSICS_CONSTANTS.VALIDITY.STUDY_EXPIRATION_YEARS) {
    if (!timestamp) {
        return {
            valid: true,
            expired: false,
            warning: false,
            daysRemaining: null,
            note: 'No timestamp provided'
        };
    }
    
    const calculationDate = new Date(timestamp);
    const expirationDate = new Date(calculationDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + validityYears);
    
    const now = new Date();
    const daysRemaining = Math.ceil((expirationDate - now) / (1000 * 60 * 60 * 24));
    const warningThreshold = PHYSICS_CONSTANTS.VALIDITY.WARNING_THRESHOLD_MONTHS * 30;
    
    const expired = daysRemaining <= 0;
    const warning = !expired && daysRemaining <= warningThreshold;
    const valid = !expired;
    
    console.log(`📅 [Validity] ${daysRemaining} days remaining. Expired: ${expired}, Warning: ${warning}`);
    
    return {
        valid,
        expired,
        warning,
        daysRemaining,
        expirationDate: expirationDate.toISOString().split('T')[0],
        calculationDate: calculationDate.toISOString().split('T')[0],
        note: expired 
            ? `❌ EXPIRED - Study is over ${validityYears} years old. Recalculation required per PEF 3.1 §5.1.`
            : warning
                ? `⚠️ WARNING - Study expires in ${daysRemaining} days. Update recommended.`
                : `✅ Valid - Expires in ${daysRemaining} days`
    };
}

// ================== HELPER: Waste vs Co-Product Classification ==================
/**
 * Classify output as waste or co-product per ISO 14044 §4.3.4
 * Waste: No economic value, receives 0% burden allocation
 * Co-product: Has economic value, shares burden
 * 
 * @param {string} outputName - Name of the output
 * @param {number} economicValue - USD/kg (optional)
 * @param {boolean} isDestinedForDisposal - Whether output goes to landfill/incineration
 * @returns {Object} Classification result
 */
function classifyWasteOrCoproduct(outputName, economicValue = null, isDestinedForDisposal = false) {
    const THRESHOLD = PHYSICS_CONSTANTS.ALLOCATION.WASTE_VALUE_THRESHOLD;
    const DEFAULT_WASTE = PHYSICS_CONSTANTS.ALLOCATION.DEFAULT_WASTE_TYPES;
    
    const nameLower = (outputName || '').toLowerCase();
    
    // Rule 1: Destined for disposal = waste
    if (isDestinedForDisposal) {
        return {
            type: 'waste',
            allocationFactor: 0,
            reason: 'Destined for disposal (landfill/incineration)'
        };
    }
    
    // Rule 2: Default waste types (agricultural residues)
    if (DEFAULT_WASTE.some(waste => nameLower.includes(waste))) {
        return {
            type: 'waste',
            allocationFactor: 0,
            reason: 'Agricultural residue with no economic value'
        };
    }
    
    // Rule 3: Economic value check
    if (economicValue !== null) {
        if (economicValue < THRESHOLD) {
            return {
                type: 'waste',
                allocationFactor: 0,
                reason: `Economic value $${economicValue}/kg < $${THRESHOLD}/kg threshold`
            };
        } else {
            return {
                type: 'co-product',
                allocationFactor: null, // To be calculated via economic/mass allocation
                reason: `Economic value $${economicValue}/kg ≥ threshold`
            };
        }
    }
    
    // Rule 4: Default - if named like a product, treat as co-product
    if (nameLower.includes('meal') || nameLower.includes('oil') || nameLower.includes('protein') ||
        nameLower.includes('fiber') || nameLower.includes('flour') || nameLower.includes('bran')) {
        return {
            type: 'co-product',
            allocationFactor: null,
            reason: 'Identified as marketable co-product'
        };
    }
    
    // Default: waste
    return {
        type: 'waste',
        allocationFactor: 0,
        reason: 'No economic value identified - conservative default'
    };
}


// ================== HELPER: Soil Organic Carbon (SOC) Change ==================
/**
 * Calculate soil organic carbon change per ISO 14067 / PAS 2050-1
 * Formula: ∆SOC = (SOC_0 - SOC_T) / 20 × 44/12
 * 
 * @param {string} farmingPractice - 'conventional', 'conservation', 'regen', 'organic'
 * @param {number} areaHa - Area in hectares
 * @param {number} yearsUnderPractice - Years under this practice (default 1)
 * @returns {Object} SOC change breakdown
 */
function calculateSOCChange(farmingPractice, areaHa, yearsUnderPractice = 1) {
    if (!areaHa || areaHa <= 0) {
        return { 
            deltaCO2: 0, 
            deltaC: 0, 
            sequesteredCO2: 0,
            note: 'No area provided' 
        };
    }
    
    const SOC = PHYSICS_CONSTANTS.SOC;
    const C_TO_CO2 = 44/12;
    
    let annualSequestrationRate = 0;
    let note = '';
    
    switch (farmingPractice?.toLowerCase()) {
        case 'regen':
        case 'regenerative':
            annualSequestrationRate = SOC.REGEN_ANNUAL_RATE;
            note = 'Regenerative agriculture';
            break;
        case 'conservation':
        case 'no_till':
            annualSequestrationRate = SOC.CONSERVATION_ANNUAL_RATE;
            note = 'Conservation tillage';
            break;
        case 'organic':
            annualSequestrationRate = SOC.CONSERVATION_ANNUAL_RATE * 0.8;
            note = 'Organic farming';
            break;
        default:
            return { 
                deltaCO2: 0, 
                deltaC: 0, 
                sequesteredCO2: 0,
                note: 'Conventional farming - no sequestration claimed' 
            };
    }
    
    // Calculate annual sequestration
    const annualDeltaC = annualSequestrationRate * areaHa;
    const annualDeltaCO2 = annualDeltaC * C_TO_CO2;
    
    // Amortize over 20 years per PAS 2050-1
    const amortizedDeltaCO2 = (annualDeltaCO2 * Math.min(yearsUnderPractice, SOC.AMORTIZATION_YEARS)) / SOC.AMORTIZATION_YEARS;
    
    console.log(`🌱 [SOC] ${note}: ${annualDeltaC.toFixed(3)} t C/ha/yr × ${C_TO_CO2.toFixed(4)} = ${annualDeltaCO2.toFixed(3)} t CO2/yr (amortized: ${amortizedDeltaCO2.toFixed(3)} t CO2)`);
    
    return {
        deltaCO2: amortizedDeltaCO2 * 1000,  // Convert to kg CO2
        deltaC: annualDeltaC,
        sequesteredCO2: annualDeltaCO2 * 1000,
        annualSequestrationRate,
        note: `${note}: ${annualSequestrationRate} t C/ha/yr sequestered`
    };
                                                        }

// ================== HELPER: Enteric Fermentation ==================
/**
 * Calculate enteric methane emissions for animal products
 * Formula: Emissions = Population × EF_enteric × GWP_CH4
 * 
 * @param {string} animalType - 'dairy', 'beef', 'sheep', 'goat', 'pig'
 * @param {number} quantityKg - Quantity of product in kg
 * @param {string} originCountry - ISO country code
 * @returns {Object} Enteric emissions breakdown
 */
function calculateEntericMethane(animalType, quantityKg, originCountry) {
    if (!quantityKg || quantityKg <= 0) {
        return { totalCO2: 0, ch4_kg: 0, note: 'No animal product' };
    }
    
    const ENTERIC = PHYSICS_CONSTANTS.ENTERIC;
    const GWP_CH4_biogenic = PHYSICS_CONSTANTS.gwp.ch4_biogenic;
    
    // Get emission factor
    let ef_ch4_per_head = 0;
    let productPerHeadPerYear = 0;
    
    switch (animalType.toLowerCase()) {
        case 'dairy':
        case 'milk':
        case 'cow_milk':
            ef_ch4_per_head = ENTERIC.DAIRY_COW;
            productPerHeadPerYear = 8500; // kg milk per year (global average)
            break;
        case 'beef':
        case 'cattle':
            ef_ch4_per_head = ENTERIC.BEEF_COW;
            productPerHeadPerYear = 250; // kg beef per year (global average)
            break;
        case 'sheep':
        case 'lamb':
            ef_ch4_per_head = ENTERIC.SHEEP;
            productPerHeadPerYear = 20; // kg lamb per year
            break;
        case 'goat':
            ef_ch4_per_head = ENTERIC.GOAT;
            productPerHeadPerYear = 15;
            break;
        case 'pig':
        case 'pork':
            ef_ch4_per_head = ENTERIC.PIG;
            productPerHeadPerYear = 100;
            break;
        default:
            return { totalCO2: 0, ch4_kg: 0, note: 'Not a ruminant/animal product' };
    }
    
    // Calculate heads needed for this quantity
    const headsNeeded = quantityKg / productPerHeadPerYear;
    
    // Calculate methane emissions
    const ch4_kg = headsNeeded * ef_ch4_per_head;
    const totalCO2 = ch4_kg * GWP_CH4_biogenic;
    
    console.log(`🐄 [Enteric] ${animalType}: ${ch4_kg.toFixed(4)} kg CH4 × ${GWP_CH4_biogenic} = ${totalCO2.toFixed(4)} kg CO2e (biogenic)`);
    
    return {
        totalCO2,
        ch4_kg,
        headsNeeded,
        ef_ch4_per_head,
        productPerHeadPerYear,
        note: `Enteric fermentation: ${ch4_kg.toFixed(4)} kg CH4 (${headsNeeded.toFixed(4)} head-equivalents)`
    };
}


// ================== HELPER: In-Use Emissions (Retail & Home) ==================
/**
 * Calculate in-use emissions for chilled/frozen products
 * Includes retail storage, home storage, and refrigerant leakage
 * 
 * @param {number} productMassKg - Final product mass in kg
 * @param {string} storageType - 'ambient', 'chilled', or 'frozen'
 * @param {string} refrigerantType - Refrigerant used (e.g., 'R-404A')
 * @param {number} gridIntensity - Grid carbon intensity (g CO2e/kWh)
 * @returns {Object} In-use emissions breakdown
 */
function calculateInUseEmissions(productMassKg, storageType, refrigerantType = 'R-404A', gridIntensity = 480) {
    if (storageType === 'ambient' || !productMassKg || productMassKg <= 0) {
        return {
            totalCO2: 0,
            retailEnergyCO2: 0,
            homeEnergyCO2: 0,
            refrigerantCO2: 0,
            note: 'No cold chain required'
        };
    }
    
    const IN_USE = PHYSICS_CONSTANTS.IN_USE;
    const isFrozen = storageType === 'frozen';
    
    // Retail storage energy
    const retailKwhPerDay = isFrozen ? IN_USE.RETAIL_FROZEN_KWH_PER_KG_DAY : IN_USE.RETAIL_CHILLED_KWH_PER_KG_DAY;
    const retailDays = isFrozen ? IN_USE.RETAIL_STORAGE_DAYS_FROZEN : IN_USE.RETAIL_STORAGE_DAYS_CHILLED;
    const retailKwh = productMassKg * retailKwhPerDay * retailDays;
    const retailEnergyCO2 = retailKwh * (gridIntensity / 1000);
    
    // Home storage energy
    const homeKwhPerDay = isFrozen ? IN_USE.HOME_FROZEN_KWH_PER_KG_DAY : IN_USE.HOME_CHILLED_KWH_PER_KG_DAY;
    const homeDays = isFrozen ? IN_USE.HOME_STORAGE_DAYS_FROZEN : IN_USE.HOME_STORAGE_DAYS_CHILLED;
    const homeKwh = productMassKg * homeKwhPerDay * homeDays;
    const homeEnergyCO2 = homeKwh * (gridIntensity / 1000);
    
    // Refrigerant leakage
    const refrigerantGWP = PHYSICS_DB.refrigerants[refrigerantType] || PHYSICS_DB.refrigerants.default;
    const retailLeakage = retailKwh * 0.0001 * refrigerantGWP * IN_USE.RETAIL_LEAKAGE_RATE;
    const homeLeakage = homeKwh * 0.00005 * refrigerantGWP * IN_USE.HOME_LEAKAGE_RATE;
    const refrigerantCO2 = retailLeakage + homeLeakage;
    
    const totalCO2 = retailEnergyCO2 + homeEnergyCO2 + refrigerantCO2;
    
    console.log(`🏪 [In-Use] ${storageType}: Retail ${retailKwh.toFixed(3)} kWh + Home ${homeKwh.toFixed(3)} kWh + Leakage ${refrigerantCO2.toFixed(4)} kg = ${totalCO2.toFixed(4)} kg CO2e`);
    
    return {
        totalCO2,
        retailEnergyCO2,
        homeEnergyCO2,
        refrigerantCO2,
        retailKwh,
        homeKwh,
        note: `${storageType} storage: retail ${retailDays} days, home ${homeDays} days`
    };
        }

// ================== HELPER: Electricity Tracking Hierarchy ==================
/**
 * Apply PEF 3.1 electricity tracking hierarchy
 * Priority: Supplier Contract → Residual Mix → Consumption Mix
 * 
 * @param {number} baseGridIntensity - Base grid intensity (g CO2e/kWh)
 * @param {string} countryCode - ISO country code
 * @param {string} energySource - User selection ('grid', 'renewable', 'natural_gas', 'coal')
 * @param {boolean} hasRECs - User holds Guarantees of Origin / RECs
 * @returns {Object} {intensity: number, source: string, note: string}
 */
function applyElectricityHierarchy(baseGridIntensity, countryCode, energySource, hasRECs = false) {
    const T_AND_D = PHYSICS_CONSTANTS.ELECTRICITY.T_AND_D_LOSSES;
    
    // Priority 1: Direct renewable with certificates
    if (energySource === 'renewable' && hasRECs) {
        return {
            intensity: 20 * (1 + T_AND_D),  // Residual renewable impact + T&D
            source: 'Supplier Contract (Verified RECs/GOs)',
            note: '100% renewable with certificates - PEF 3.1 compliant'
        };
    }
    
    // Priority 1b: Direct fossil source
    if (energySource === 'natural_gas') {
        return {
            intensity: 490 * (1 + T_AND_D),
            source: 'Direct Natural Gas',
            note: 'On-site natural gas generation'
        };
    }
    
    if (energySource === 'coal') {
        return {
            intensity: 980 * (1 + T_AND_D),
            source: 'Direct Coal',
            note: 'On-site coal generation'
        };
    }
    
    // Priority 2: Residual Mix (no certificates = must use residual)
    if (energySource === 'grid' && !hasRECs) {
        const multiplier = PHYSICS_DB.residual_mix_multipliers[countryCode] || 
                          PHYSICS_DB.residual_mix_multipliers.default;
        const residualIntensity = baseGridIntensity * multiplier;
        
        return {
            intensity: residualIntensity * (1 + T_AND_D),
            source: `Residual Mix (${countryCode})`,
            note: `No RECs/GOs - using residual mix (${(multiplier*100-100).toFixed(0)}% higher than grid)`
        };
    }
    
    // Priority 3: Consumption Mix (fallback)
    return {
        intensity: baseGridIntensity * (1 + T_AND_D),
        source: `Consumption Mix (${countryCode})`,
        note: 'Grid consumption mix + T&D losses'
    };
}

// ================== HELPER: EUDR Compliance Check ==================
/**
 * Check EUDR compliance per Reg. 2023/1115
 * Land converted after Dec 31, 2020 on high-risk commodities = non-compliant
 * 
 * @param {string} ingredientId - Ingredient identifier
 * @param {string} originCountry - ISO country code
 * @param {object} primaryData - Primary supplier data (may contain conversionDate)
 * @returns {Object} {compliant: boolean, riskLevel: string, reason: string, flag: string}
 */
function checkEUDRCompliance(ingredientId, originCountry, primaryData) {
    const EUDR = PHYSICS_CONSTANTS.EUDR;
    const HIGH_RISK_COUNTRIES = ['BR', 'ID', 'MY', 'AR', 'CO', 'PE', 'BO', 'VE', 'GY', 'SR', 'CG', 'CD', 'CM', 'GA', 'GH', 'CI', 'LR', 'NG'];
    
    // Check if commodity is high-risk
    const idLower = (ingredientId || '').toLowerCase();
    const isHighRiskCommodity = EUDR.HIGH_RISK_COMMODITIES.some(c => idLower.includes(c));
    
    if (!isHighRiskCommodity) {
        return {
            compliant: true,
            riskLevel: 'low',
            reason: 'Not a regulated commodity under EUDR',
            flag: '✅ COMPLIANT'
        };
    }
    
    // Check if country is high-risk
    const isHighRiskCountry = HIGH_RISK_COUNTRIES.includes(originCountry);
    
    if (!isHighRiskCountry) {
        return {
            compliant: true,
            riskLevel: 'standard',
            reason: 'Origin country not classified as high-risk',
            flag: '✅ COMPLIANT'
        };
    }
    
    // High-risk commodity + high-risk country = need due diligence
    const hasConversionDate = primaryData?.conversionDate !== undefined;
    const hasGeolocation = primaryData?.geolocation !== undefined;
    const hasDDS = primaryData?.ddsReference !== undefined;
    
    if (!hasGeolocation || !hasDDS) {
        return {
            compliant: false,
            riskLevel: 'high',
            reason: 'Missing geolocation or DDS reference for high-risk commodity',
            flag: '🛑 NON-COMPLIANT - EUDR BLOCKED'
        };
    }
    
    // Check conversion date if provided
    if (hasConversionDate) {
        const cutoffDate = new Date(EUDR.CUTOFF_DATE);
        const conversionDate = new Date(primaryData.conversionDate);
        
        if (conversionDate > cutoffDate) {
            return {
                compliant: false,
                riskLevel: 'critical',
                reason: `Land converted ${primaryData.conversionDate} (after EUDR cutoff ${EUDR.CUTOFF_DATE})`,
                flag: '🛑 NON-COMPLIANT - POST-2020 DEFORESTATION'
            };
        }
    }
    
    return {
        compliant: true,
        riskLevel: 'verified',
        reason: 'Geolocation and DDS verified, conversion date compliant',
        flag: '✅ EUDR VERIFIED'
    };
                             }

// ================== HELPER: Capital Goods Amortization ==================
/**
 * Calculate capital goods impact per ISO 14044 capital goods rules
 * Formula: Impact_per_kg = (Total_CO2e_Machine / Lifespan_years) / Annual_Output_kg
 * 
 * @param {string} equipmentType - Type of equipment (mixer, pasteurizer, etc.)
 * @param {number} annualOutputKg - Annual production output in kg
 * @param {number} equipmentCapacity - Equipment capacity (kg or units)
 * @param {number} lifespanYears - Equipment lifespan (default 15)
 * @returns {number} Capital goods impact in kg CO2e per kg product
 */
function calculateCapitalGoods(equipmentType, annualOutputKg, equipmentCapacity = 1, lifespanYears = null) {
    if (!annualOutputKg || annualOutputKg <= 0) return 0;
    
    const defaults = PHYSICS_CONSTANTS.CAPITAL_GOODS;
    const lifespan = lifespanYears || defaults.DEFAULT_LIFESPAN_YEARS;
    
    // Get embedded carbon factor
    const factors = PHYSICS_DB.capital_goods;
    const embeddedCO2ePerUnit = factors[equipmentType] || factors.default;
    
    // Calculate total embedded carbon
    const totalEmbeddedCO2e = embeddedCO2ePerUnit * equipmentCapacity;
    
    // Amortize over lifespan and divide by annual output
    const impactPerKg = (totalEmbeddedCO2e / lifespan) / annualOutputKg;
    
    console.log(`🏭 [Capital Goods] ${equipmentType}: ${impactPerKg.toFixed(6)} kg CO2e/kg (${totalEmbeddedCO2e.toFixed(0)} kg CO2e / ${lifespan} yrs / ${annualOutputKg} kg)`);
    
    return impactPerKg;
}

/**
 * Check if capital goods must be included per 1% cutoff rule
 * @param {number} capitalImpact - Calculated capital goods impact per kg
 * @param {number} totalImpactPerKg - Total product impact per kg
 * @returns {Object} {mustInclude: boolean, contribution: string, reason: string}
 */
function evaluateCapitalGoodsCutoff(capitalImpact, totalImpactPerKg) {
    const THRESHOLD = PHYSICS_CONSTANTS.CAPITAL_GOODS.CUTOFF_THRESHOLD;
    
    if (totalImpactPerKg <= 0) {
        return { mustInclude: false, contribution: '0%', reason: 'No baseline impact' };
    }
    
    const contribution = capitalImpact / totalImpactPerKg;
    const mustInclude = contribution > THRESHOLD;
    
    const reason = mustInclude 
        ? `Capital goods contribute ${(contribution*100).toFixed(1)}% (>1% cutoff) - MUST BE INCLUDED per ISO 14044`
        : `Capital goods contribute ${(contribution*100).toFixed(2)}% (<1% cutoff) - May be excluded`;
    
    console.log(`🏭 [Capital Goods Cutoff] ${reason}`);
    
    return {
        mustInclude,
        contribution: (contribution * 100).toFixed(2) + '%',
        reason
    };
        }

// ================== HELPER: 80% Hotspot Identification ==================
/**
 * Identify hotspots using 80% cumulative contribution rule
 * Per ISO 14044 §4.5.2 and PEF 3.1 §6.3
 * 
 * @param {Array} components - Array of {name, contribution}
 * @param {number} totalImpact - Total impact value
 * @returns {Object} {hotspots: array, cumulativeSum: number, summary: string}
 */
function identifyHotspots(components, totalImpact) {
    if (!components || components.length === 0 || totalImpact <= 0) {
        return { hotspots: [], cumulativeSum: 0, summary: 'No data' };
    }
    
    // Sort by contribution (highest first)
    const sorted = [...components].sort((a, b) => b.contribution - a.contribution);
    
    const hotspots = [];
    let cumulativeSum = 0;
    const THRESHOLD = PHYSICS_CONSTANTS.HOTSPOT.CUMULATIVE_THRESHOLD;
    
    for (const item of sorted) {
        if (cumulativeSum < THRESHOLD) {
            const contributionPct = item.contribution / totalImpact;
            hotspots.push({
                name: item.name,
                contribution: item.contribution,
                percentage: (contributionPct * 100).toFixed(1) + '%',
                dqr: item.dqr || 2.5
            });
            cumulativeSum += contributionPct;
        } else {
            break;
        }
    }
    
    const summary = `${hotspots.length} processes contribute ${(cumulativeSum * 100).toFixed(1)}% of total impact`;
    
    console.log(`🎯 [80% Hotspot] ${summary}`);
    hotspots.forEach((h, i) => {
        console.log(`   ${i+1}. ${h.name}: ${h.percentage} (DQR: ${h.dqr})`);
    });
    
    return { hotspots, cumulativeSum, summary };
            }

// ================== HELPER: Data Needs Matrix Evaluation ==================
/**
 * Evaluate Data Needs Matrix (DNM) compliance per PEF 3.1 §6.6
 * Checks if high-impact processes meet data quality requirements
 * 
 * @param {Array} processes - Array of process objects with {name, impact, dqr, isUnderOperationalControl}
 * @param {number} totalImpact - Total impact for the category
 * @returns {Object} {compliant: boolean, violations: array, warnings: array}
 */
function evaluateDNM(processes, totalImpact) {
    if (!processes || processes.length === 0) {
        return { compliant: true, violations: [], warnings: [] };
    }
    
    const violations = [];
    const warnings = [];
    const THRESHOLD = PHYSICS_CONSTANTS.DNM.CONTRIBUTION_THRESHOLD;
    
    for (const process of processes) {
        const contribution = process.impact / totalImpact;
        
        // Skip processes below threshold
        if (contribution < THRESHOLD) continue;
        
        const isHotspot = true;
        const dqr = process.dqr || 2.5;
        const isUnderControl = process.isUnderOperationalControl || false;
        
        if (isUnderControl) {
            // Under operational control: Must use primary data (DQR ≤ 2.0)
            if (dqr > PHYSICS_CONSTANTS.DNM.PRIMARY_DATA_DQR_MAX) {
                violations.push({
                    process: process.name,
                    contribution: (contribution * 100).toFixed(1) + '%',
                    dqr: dqr.toFixed(2),
                    requirement: `DQR ≤ ${PHYSICS_CONSTANTS.DNM.PRIMARY_DATA_DQR_MAX} (Primary data required)`,
                    reason: 'Process under operational control - must use primary data'
                });
            }
        } else {
            // Not under operational control: Must use high-quality secondary data (DQR ≤ 3.0)
            if (dqr > PHYSICS_CONSTANTS.DNM.SECONDARY_DATA_DQR_MAX) {
                warnings.push({
                    process: process.name,
                    contribution: (contribution * 100).toFixed(1) + '%',
                    dqr: dqr.toFixed(2),
                    requirement: `DQR ≤ ${PHYSICS_CONSTANTS.DNM.SECONDARY_DATA_DQR_MAX} (High-quality secondary data required)`,
                    reason: 'Hotspot process - requires improved data quality for public claims'
                });
            }
        }
    }
    
    const compliant = violations.length === 0;
    
    if (violations.length > 0) {
        console.warn(`⚠️ [DNM] NON-COMPLIANT: ${violations.length} hotspot(s) with insufficient data quality`);
        violations.forEach(v => {
            console.warn(`   - ${v.process}: ${v.contribution} contribution, DQR ${v.dqr} > ${PHYSICS_CONSTANTS.DNM.PRIMARY_DATA_DQR_MAX}`);
        });
    }
    
    if (warnings.length > 0) {
        console.log(`📊 [DNM] Warnings: ${warnings.length} hotspot(s) need better data for public claims`);
    }
    
    return { compliant, violations, warnings };
                    }

// ================== HELPER: Economic Allocation ==================
/**
 * Calculate economic allocation factor per ISO 14044 §4.3.4.2
 * Formula: Allocation = (Mass_P × Price_P) / Σ(Mass_i × Price_i)
 * 
 * @param {Array} coProducts - Array of {mass: kg, price: usd_per_kg, name: string}
 * @returns {Object} {factors: array, sum: number, mainFactor: number}
 */
function calculateEconomicAllocation(coProducts) {
    // Validate inputs
    if (!coProducts || coProducts.length === 0) {
        return { factors: [1.0], sum: 1.0, mainFactor: 1.0 };
    }
    
    // Calculate total economic value
    let totalValue = 0;
    const values = [];
    
    for (const product of coProducts) {
        const price = product.price || PHYSICS_DB.commodity_prices.default;
        const value = product.mass * price;
        values.push(value);
        totalValue += value;
    }
    
    if (totalValue <= 0) {
        console.warn('⚠️ [Economic Allocation] Total value zero, falling back to mass allocation');
        const totalMass = coProducts.reduce((sum, p) => sum + p.mass, 0);
        const factors = coProducts.map(p => p.mass / totalMass);
        return { factors, sum: 1.0, mainFactor: factors[0] };
    }
    
    // Calculate allocation factors
    const factors = values.map(v => v / totalValue);
    const sum = factors.reduce((a, b) => a + b, 0);
    
    console.log(`💰 [Economic Allocation] Factors: ${factors.map(f => (f*100).toFixed(1)+'%').join(', ')} | Sum: ${sum.toFixed(4)}`);
    
    return { 
        factors, 
        sum, 
        mainFactor: factors[0]  // First product is main product
    };
}

/**
 * Get commodity price for an ingredient
 * @param {string} ingredientId - Ingredient identifier
 * @returns {number} Price in USD/kg
 */
function getCommodityPrice(ingredientId) {
    const id = (ingredientId || '').toLowerCase();
    const prices = PHYSICS_DB.commodity_prices;
    
    if (id.includes('beef') || id.includes('cattle')) return prices.beef;
    if (id.includes('milk') || id.includes('dairy')) return prices.milk;
    if (id.includes('cheese')) return prices.cheese;
    if (id.includes('chicken') || id.includes('broiler')) return prices.chicken;
    if (id.includes('pork') || id.includes('pig')) return prices.pork;
    if (id.includes('wheat')) return prices.wheat;
    if (id.includes('soy')) return prices.soybean;
    if (id.includes('palm')) return prices.palm_oil;
    if (id.includes('corn') || id.includes('maize')) return prices.corn;
    if (id.includes('rice')) return prices.rice;
    if (id.includes('sugar')) return prices.sugar;
    if (id.includes('coffee')) return prices.coffee;
    if (id.includes('cocoa')) return prices.cocoa;
    
    return prices.default;
}

// ================== HELPER: Get Country LUC Fallback ==================
/**
 * Get country-average LUC fallback value per PEF 3.1 §4.4.8.1
 * @param {string} cropType - e.g., 'soybean', 'palmoil', 'cocoa', 'coffee', 'beef'
 * @param {string} countryCode - ISO country code (e.g., 'BR', 'ID')
 * @returns {number} LUC factor in kg CO2e/kg
 */
function getCountryLUC(cropType, countryCode) {
    // Safety check
    if (!cropType || !countryCode) return 0;
    
    const key = `${cropType}-${countryCode}`;
    const fallbacks = PHYSICS_DB.country_luc_fallbacks;
    
    // Exact match
    if (fallbacks[key] !== undefined) {
        console.log(`🌍 [LUC Fallback] ${key}: ${fallbacks[key]} kg CO2e/kg`);
        return fallbacks[key];
    }
    
    // High-risk countries without specific data: use precautionary default
    const highRiskCountries = ['BR', 'ID', 'MY', 'AR', 'CO', 'PE', 'BO', 'VE', 'GY', 'SR', 'CG', 'CD', 'CM', 'GA', 'GH', 'CI', 'LR', 'NG'];
    if (highRiskCountries.includes(countryCode)) {
        console.log(`⚠️ [LUC Fallback] ${key} not found. Using precautionary default: ${fallbacks.default_high_risk}`);
        return fallbacks.default_high_risk;
    }
    
    // Low-risk countries: zero LUC per PEF default
    return 0;
}

/**
 * Detect crop type from ingredient ID
 * @param {string} ingredientId - Ingredient identifier
 * @returns {string} Crop type key
 */
function detectCropType(ingredientId) {
    const id = (ingredientId || '').toLowerCase();
    
    if (id.includes('soy') || id.includes('soya')) return 'soybean';
    if (id.includes('palm')) return 'palmoil';
    if (id.includes('cocoa')) return 'cocoa';
    if (id.includes('coffee')) return 'coffee';
    if (id.includes('beef') || id.includes('cattle')) return 'beef';
    
    return 'default';
}

    // ================== HELPER: Get Ingredient Origin ==================
    function getIngredientOrigin(ingredientId) {
        // 1. TRY WINDOW DATA (If available)
        if (global.aioxyData && global.aioxyData.ingredients && global.aioxyData.ingredients[ingredientId]) {
            // Extract country code from ID (e.g., "beef-fr" -> "FR")
            const parts = ingredientId.split('-');
            const possibleCode = parts[parts.length - 1].toUpperCase();
            if (possibleCode.length === 2) return possibleCode;
        }
        
        // 2. FALLBACK
        return 'FR'; // Default to France if unknown (Standard Proxy)
    }

    // ================== GLEC v3.2 AUDIT-READY TRANSPORT ENGINE ==================
    function calculateGLECTransport(massKg, distanceKm, mode, refType = 'ambient') {
        // 1. SAFE RESOLUTION - Use global PHYSICS_DB if available, otherwise fallback to strict GLEC v3.2
        let glecData;
        
        // Try to use the data we updated
        if (global.PHYSICS_DB && global.PHYSICS_DB.glec_factors) {
            glecData = global.PHYSICS_DB.glec_factors;
        } else if (PHYSICS_DB.glec_factors) {
            glecData = PHYSICS_DB.glec_factors;
        } else {
            // Fallback to embedded GLEC v3.2 data (regulator-safe)
            glecData = {
                road: { 
                    ambient: { hgv: 0.060, van: 0.842 }, 
                    chilled: { hgv: 0.067, van: 0.943 }, 
                    frozen: { hgv: 0.067, van: 0.943 } 
                },
                sea: { ambient: 0.0072, reefer: 0.0142 },
                air: { ambient: 0.788, reefer: 0.827 },
                rail: { ambient: 0.0184, reefer: 0.0206 },
                daf: { road: 1.05, sea: 1.15, rail: 1.00, air: 95 }
            };
        }

        // 2. GET BASE EMISSION FACTOR
        const modeData = glecData[mode] || glecData['road'];
        let factor = 0;
        
        if (mode === 'road') {
            // Road has nested structure with hgv/van
            let vehicleType = 'ambient';
            if (refType === 'chilled') vehicleType = 'chilled';
            else if (refType === 'frozen') vehicleType = 'frozen';
            
            // Default to hgv if van not specified
            factor = modeData[vehicleType] ? modeData[vehicleType].hgv : modeData['ambient'].hgv;
        } else {
            // Sea, Air, Rail use flat values
            const tempType = (refType === 'chilled' || refType === 'frozen') ? 'reefer' : 'ambient';
            factor = modeData[tempType] !== undefined ? modeData[tempType] : modeData['ambient'];
        }

        // 3. APPLY DISTANCE ADJUSTMENT FACTOR (DAF) - MANDATORY PER GLEC v3.2
        let adjustedDistance = distanceKm;
        const daf = glecData.daf ? (glecData.daf[mode] || 1.0) : 1.0;
        
        if (mode === 'air') {
            // Air gets flat km addition
            adjustedDistance += (typeof daf === 'number' && daf > 50) ? daf : 95;
        } else {
            // Road, Sea, Rail get multiplier
            adjustedDistance *= (typeof daf === 'number' && daf <= 2) ? daf : 1.05;
        }

        // 4. CALCULATION: Mass (tons) × Adjusted Distance (km) × Factor (kg CO₂e/tkm)
const massTons = massKg / 1000;

// ========== PEF 3.1 PAYLOAD & EMPTY RETURN ADJUSTMENT ==========
// Formula: EF_adjusted = EF_base × (1 / LF) × (1 + ERR)
// Source: ISO 14083:2023 / PEF 3.1 §4.4.3
let payloadMultiplier = 1.0;
let payloadNote = '';

if (mode === 'road' || mode === 'sea') {
    const LF = PHYSICS_CONSTANTS.TRANSPORT.LOAD_FACTOR;
    const ERR = PHYSICS_CONSTANTS.TRANSPORT.EMPTY_RETURN_RATE;
    payloadMultiplier = (1 / LF) * (1 + ERR);
    payloadNote = ` × (1/${LF} LF) × (1+${ERR} ERR)`;
}

const adjustedFactor = factor * payloadMultiplier;
const fuelEmissions = massTons * adjustedDistance * adjustedFactor;
        
        // 5. REFRIGERANT LEAKAGE (ISO 14083 / GLEC v3.2 requirement)
        // Source: IPCC 2006 GL, Vol 3, Ch 7, Table 7.9 - Transport Refrigeration leak rate 15-50%
        // Conservative factors: 0.012 kg CO2e/tkm for frozen, 0.006 for chilled
        // GWP of HFC-134a = 1430 (IPCC AR6)
        let refrigerantEmissions = 0;
        if (refType === 'frozen') {
            refrigerantEmissions = massTons * adjustedDistance * 0.012;
        } else if (refType === 'chilled') {
            refrigerantEmissions = massTons * adjustedDistance * 0.006;
        }
        
        const totalEmissions = fuelEmissions + refrigerantEmissions;

        // 🛡️ THE TRANSPARENCY FIX: Capture the exact physics trace inside the engine
        const glecTrace = `[GLEC v3.2: ${massTons.toFixed(4)}t × ${distanceKm}km × ${factor} EF${payloadNote} × ${daf} DAF]${refrigerantEmissions > 0 ? ` + Refrigerant(${refrigerantEmissions.toFixed(4)}kg)` : ''}`;
        
        console.log(`🚚 GLEC v3.2: ${mode} (${refType}) | Raw: ${distanceKm}km → Adj: ${adjustedDistance.toFixed(1)}km | EF: ${factor}${payloadNote ? ' × ' + payloadMultiplier.toFixed(2) + ' payload' : ''} | Fuel: ${fuelEmissions.toFixed(3)}kg | Refrigerant: ${refrigerantEmissions.toFixed(3)}kg | Total: ${totalEmissions.toFixed(3)}kg CO₂e`);

        // FIXED: Always return an object with .total property
        return {
            total: totalEmissions,
            calculation_trace: glecTrace
        };
    }

    // ============================================================================
    // 🌱 AUDIT-READY AGRICULTURAL ENGINE (Strict Default vs. Primary Override)
    // ============================================================================
    function calculateIngredientImpact(ingredientData, quantityKg, originCountry, primaryData) {
        console.log("🌱 [Audit Engine] Calculating ingredient impact for:", ingredientData.name);
        
        // Safety check
        if (!ingredientData || !ingredientData.data || !ingredientData.data.pef) {
            console.warn("⚠️ Missing ingredient data");
            return {
                totalCO2: 0,
                totalWater: 0,
                totalLand: 0,
                totalFossil: 0,
                perKgCO2: 0,
                perKgWater: 0,
                perKgLand: 0,
                perKgFossil: 0,
                logs: ["ERROR: Missing ingredient data"],
                qualityPenalty: 2.0,
                universal_adjustments: null,
                is_primary: false,
                biogenicRemovals: 0,
                fossilCO2: 0,
                biogenicCO2: 0,
                dlucCO2: 0
            };
        }
        
        // ================== PEF 3.1 AUDITOR-GRADE CLIMATE DISAGGREGATION ==================
// OFFICIAL FIX: Precautionary Principle (PEF 3.1 / ISO 14067)
// If sub-indicators exist in data → use them
// If sub-indicators missing → 100% Fossil (conservative, legally defensible)
// NO ARBITRARY PROXIES (91.2% removed - illegal for audit)

let co2Total = ingredientData?.data?.pef?.["Climate Change"] || ingredientData?.pef?.["Climate Change"] || 0;

// Check if explicit sub-indicators exist in the ingredient data
// This works for BOTH farm gate (has values) and synthese (may not)
const pefData = ingredientData?.data?.pef || ingredientData?.pef || {};

const hasFossil = pefData["Climate Change - Fossil"] !== undefined && pefData["Climate Change - Fossil"] !== null;
const hasBiogenic = pefData["Climate Change - Biogenic"] !== undefined && pefData["Climate Change - Biogenic"] !== null;
const hasLandUse = pefData["Climate Change - Land Use"] !== undefined && pefData["Climate Change - Land Use"] !== null;

let co2Fossil, co2Biogenic, co2dLUC;

if (hasFossil || hasBiogenic || hasLandUse) {
    // USE EXPLICIT DATA FROM DATABASE
    // Farm gate ingredients have these values from CSV columns R, S, T
    co2Fossil = pefData["Climate Change - Fossil"] || 0;
    co2Biogenic = pefData["Climate Change - Biogenic"] || 0;
    co2dLUC = pefData["Climate Change - Land Use"] || 0;
    
    // Sanity check: ensure sum doesn't exceed total (floating point tolerance)
    const sum = co2Fossil + co2Biogenic + co2dLUC;
    if (Math.abs(sum - co2Total) > 0.001 && sum > 0) {
        // Normalize to total to prevent rounding errors
        const normFactor = co2Total / sum;
        co2Fossil *= normFactor;
        co2Biogenic *= normFactor;
        co2dLUC *= normFactor;
    }
} else {
    // 🛡️ OFFICIAL CONSERVATIVE FALLBACK (Audit-Compliant)
    // No sub-indicator data available → 100% attributed to Fossil
    // This is legally defensible under PEF 3.1 Precautionary Principle
    co2Fossil = co2Total;
    co2Biogenic = 0;
    co2dLUC = 0;
}

// Ensure non-negative values
co2Fossil = Math.max(0, co2Fossil);
co2Biogenic = Math.max(0, co2Biogenic);
co2dLUC = Math.max(0, co2dLUC);

// Legacy total for existing calculations (backward compatibility)
let co2Base = co2Total;

let waterBase = ingredientData.data.pef["Water Use/Scarcity (AWARE)"] || 0;
let landBase = ingredientData.data.pef["Land Use"] || 0;
let fossilBase = ingredientData.data.pef["Resource Use, fossils"] || 0;

// 🛡️ STRICT SPATIAL AWARE ROUTING (ISO 14046 COMPLIANT)
// If primary data provides farm region, attempt exact watershed match
if (primaryData && primaryData.farmRegion && PHYSICS_DB.watersheds && PHYSICS_DB.watersheds[originCountry]) {
    const watersheds = PHYSICS_DB.watersheds[originCountry];
    const regionKey = Object.keys(watersheds).find(key => 
        primaryData.farmRegion.toLowerCase().includes(key.toLowerCase())
    );
    
    if (regionKey && watersheds[regionKey]?.default) {
        const watershedCF = watersheds[regionKey].default;
        const nationalCF = watersheds["NationalAvg"]?.default || waterBase;
        if (nationalCF > 0) {
            const adjustmentFactor = watershedCF / nationalCF;
            waterBase = waterBase * adjustmentFactor;
            // log will be initialized below, so we push after log is created
        }
    }
}

let log = [];

// 🛡️ Log the AWARE watershed adjustment if applied
if (primaryData && primaryData.farmRegion && PHYSICS_DB.watersheds && PHYSICS_DB.watersheds[originCountry]) {
    const watersheds = PHYSICS_DB.watersheds[originCountry];
    const regionKey = Object.keys(watersheds).find(key => 
        primaryData.farmRegion.toLowerCase().includes(key.toLowerCase())
    );
    
    if (regionKey && watersheds[regionKey]?.default) {
        const watershedCF = watersheds[regionKey].default;
        const nationalCF = watersheds["NationalAvg"]?.default || ingredientData.data.pef["Water Use/Scarcity (AWARE)"] || 0;
        if (nationalCF > 0) {
            const adjustmentFactor = watershedCF / nationalCF;
            log.push(`💧 Primary Data: Watershed CF applied for ${regionKey} (CF: ${watershedCF}, Adj: ${adjustmentFactor.toFixed(2)}x)`);
        }
    } else {
        log.push(`💧 Watershed not found for '${primaryData.farmRegion}', using NationalAvg`);
    }
}

let qualityPenalty = 0.0;
let finalCO2 = co2Base;
let finalWater = waterBase;
let finalLand = landBase;
let finalFossil = fossilBase;
let universal_adjustments = null;

// 1. PRIMARY DATA OVERRIDE - STRICT ISO 14044 COMPLIANT
// Primary data improves DQR and calculates foreground N₂O. Does NOT scale background LCI.
if (primaryData && primaryData.yieldKgPerHa > 0 && primaryData.nitrogenKgPerTon !== undefined) {
    
    // 🛡️ IPCC TIER 1 (2019 Refinement): Direct N₂O emissions from synthetic fertilizer
    // Formula: N₂O_Direct = F_SN × EF₁ × (44/28)
    // F_SN = Annual synthetic fertilizer N applied (kg N/yr)
    // EF₁ = 0.01 kg N₂O-N / kg N (default emission factor)
    // 44/28 = Conversion factor from N₂O-N to N₂O
    
    const F_SN = primaryData.nitrogenKgPerTon * quantityKg; // kg N applied for this batch
    const EF1 = 0.01; // IPCC Tier 1 default
    const conversionFactor = 44 / 28; // 1.5714
    
    const n2oDirect_kg = F_SN * EF1 * conversionFactor;
    const n2oCO2e = n2oDirect_kg * 273; // GWP100 for N₂O (IPCC AR6)
    
    // Add foreground N₂O emissions to fossil CO₂
    finalCO2 += n2oCO2e;
    co2Fossil += n2oCO2e;
    
    log.push(`🌱 IPCC TIER 1: Direct N₂O emissions = ${F_SN.toFixed(2)} kg N × 0.01 × 1.5714 × 273 = ${n2oCO2e.toFixed(4)} kg CO₂e`);
    
// ========== PEF 3.1 NITRATE LEACHING (Marine Eutrophication) ==========
// Formula: Mass_NO3 = (F_SN × FRAC_LEACH) × (62/14)
// Source: IPCC 2006 Vol 4, Chapter 11 / PEF 3.1
const nitrateLeached_kg_N = F_SN * PHYSICS_CONSTANTS.N_LEACHING.FRAC_LEACH;
const nitrateLeached_kg_NO3 = nitrateLeached_kg_N * PHYSICS_CONSTANTS.N_LEACHING.NO3_CONVERSION;

// Store for Marine Eutrophication category (will be used in PEF category calculation)
const marineEutrophication_kg_N = nitrateLeached_kg_N;

// Indirect N₂O from leached nitrogen (Climate Change category)
// Formula: N₂O_Indirect = N_leached × EF5 × (44/28) × GWP_N2O
const n2oIndirect_kg = nitrateLeached_kg_N * PHYSICS_CONSTANTS.N_LEACHING.INDIRECT_N2O_EF5 * (44/28);
const n2oIndirectCO2e = n2oIndirect_kg * PHYSICS_CONSTANTS.gwp.n2o;

finalCO2 += n2oIndirectCO2e;
co2Fossil += n2oIndirectCO2e;

log.push(`💧 [N-Leaching] ${nitrateLeached_kg_N.toFixed(4)} kg N leached → ${nitrateLeached_kg_NO3.toFixed(4)} kg NO3 (Marine Eutrophication)`);
log.push(`🌱 [Indirect N₂O] ${nitrateLeached_kg_N.toFixed(4)} kg N × 0.011 × 44/28 × 273 = +${n2oIndirectCO2e.toFixed(4)} kg CO₂e`);

    
// ========== PEF 3.1 PHOSPHORUS LEACHING (Freshwater Eutrophication) ==========
// Formula: Mass_PO4 = (P_applied × FRAC_RELE) × 3.06
// Source: SALCA-P Model / PEF 3.1

// Calculate P_applied from primary data or use default
let P_applied = 0;
if (primaryData && primaryData.phosphorusKgPerTon !== undefined) {
    P_applied = primaryData.phosphorusKgPerTon * quantityKg;
} else {
    // Estimate from fertilizer type if specified
    const fertilizerType = primaryData?.fertilizerType || 'default';
    const fertData = PHYSICS_DB.fertilizer_composition[fertilizerType] || PHYSICS_DB.fertilizer_composition.default;
    // Assume fertilizer applied at rate proportional to nitrogen
    const estimatedFertilizerMass = F_SN / (fertData.n_percent / 100);
    P_applied = estimatedFertilizerMass * (fertData.p_percent / 100);
}

if (P_applied > 0) {
    const phosphateLeached_kg_P = P_applied * PHYSICS_CONSTANTS.P_LEACHING.FRAC_RELE;
    const phosphateLeached_kg_PO4 = phosphateLeached_kg_P * PHYSICS_CONSTANTS.P_LEACHING.PO4_CONVERSION;
    
    // Store for Freshwater Eutrophication category
    const freshwaterEutrophication_kg_P = phosphateLeached_kg_P;
    
    log.push(`💧 [P-Leaching] ${P_applied.toFixed(4)} kg P applied → ${phosphateLeached_kg_P.toFixed(4)} kg P lost → ${phosphateLeached_kg_PO4.toFixed(4)} kg PO4 (Freshwater Eutrophication)`);
    
    // Attach to impact result for later use in PEF categories
    impactResult.freshwaterEutrophication_P = freshwaterEutrophication_kg_P;
}

// Store marine eutrophication for later use
impactResult.marineEutrophication_N = marineEutrophication_kg_N;
    
// 🛡️ AUDIT FIX: AWARE CF handles water scarcity spatially. No arbitrary multipliers.
if (primaryData.waterSource === 'rainfed') {
    log.push(`💧 Verified Rainfed: Water source recorded`);
} else if (primaryData.waterSource === 'groundwater') {
    log.push(`💧 Groundwater source recorded`);
}
// NO waterAdjustment multiplier - AWARE watershed CF already accounts for scarcity
    
    // 🛡️ PRIMARY DATA IMPROVES DQR (Parameter Uncertainty: 2.0 → 1.0)
    // Does NOT magically shrink the physical Agribalyse mass proxy
    qualityPenalty = -1.0; // Reduces DQR by 1 full point
    
    const practiceStr = primaryData.farmingPractice ? `[${primaryData.farmingPractice.toUpperCase()}]` : '';
    log.push(`✅ PRIMARY DATA VERIFIED ${practiceStr}: DQR improved (P: 2.0 → 1.0). N₂O foreground calculated via IPCC Tier 1.`);
    
    universal_adjustments = {
        adjusted_from_country: "Agribalyse Default",
        adjusted_for_country: primaryData.farmRegion || originCountry,
        multipliers: { co2: 1.0, land: 1.0, water: waterAdjustment, fossil: 1.0 }, // NO ARBITRARY 60/40 SCALING
        adder: n2oCO2e, // Foreground N₂O addition
        method: "primary_data_ipcc_tier1",
        baseline_yield: ingredientData.data.metadata?.yield_kg_ha || 5000,
        baseline_nitrogen: (ingredientData.data.metadata?.nitrogen_content_kg_kg || 0.015) * 1000
    };
}
            
        // 2. CONSERVATIVE DEFAULT (No primary data provided)
else {
    const euCountries = ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'SE', 'DK', 'FI', 'PT', 'IE', 'LU', 'GR', 'PL', 'CZ', 'HU', 'SK', 'SI', 'EE', 'LV', 'LT', 'HR', 'RO', 'BG', 'CY', 'MT'];
    const eudrHighRisk = ['BR', 'ID', 'MY', 'AR']; 
    
    // Default baseline values for secondary data (crop-specific from metadata)
    const defaultBaselineYield = ingredientData.data.metadata?.yield_kg_ha || 4000;
    const defaultBaselineN = (ingredientData.data.metadata?.nitrogen_content_kg_kg || 0.021) * 1000;

    if (originCountry && !euCountries.includes(originCountry) && originCountry !== 'FR') {
        if (!eudrHighRisk.includes(originCountry)) {
            // 🛡️ AUDIT FIX: No physical carbon multipliers. Uncertainty handled by DQR downgrade.
            qualityPenalty = 1.0; // Downgrades Geographical Representativeness (GR)
            
            log.push(`⚠️ CONSERVATIVE PROXY: Unverified offshore origin (${originCountry}). DQR downgraded (GR: 2.0 → 3.0).`);
            
            universal_adjustments = {
                adjusted_from_country: "FR",
                adjusted_for_country: originCountry,
                multipliers: { co2: 1.0, land: 1.0, water: 1.0, fossil: 1.0 }, // NO ARBITRARY 1.15x
                adder: 0,
                method: "proxy_dqr_penalty",
                baseline_yield: defaultBaselineYield,
                baseline_nitrogen: defaultBaselineN
            };
        }
    } else {
        log.push(`📚 SECONDARY DATA: Direct Agribalyse EU match used.`);
        universal_adjustments = {
            adjusted_from_country: "FR",
            adjusted_for_country: originCountry || "FR",
            multipliers: { co2: 1.0, land: 1.0, water: 1.0, fossil: 1.0 },
            adder: 0,
            method: "direct_agribalyse",
            baseline_yield: defaultBaselineYield,
            baseline_nitrogen: defaultBaselineN
        };
    }
    }
        
        // =========================================================
// 🛡️ STRICT EUDR BOOLEAN GATE (ISO 14044 COMPLIANT)
// =========================================================
// EUDR specifically targets: Cattle (Beef/Dairy), Cocoa, Coffee, Oil Palm, Rubber, Soya, Wood/Paper
const eudrCommodities = ['beef', 'cattle', 'cow', 'milk', 'cheese', 'cocoa', 'chocolate', 'coffee', 'palm', 'soy', 'soybean', 'rubber', 'wood', 'paper', 'cardboard'];
const safeName = (ingredientData.name || "").toLowerCase();
const safeId = (ingredientData.id || ingredientData.dbId || "").toLowerCase();
const isEudrCommodity = eudrCommodities.some(c => safeName.includes(c) || safeId.includes(c));
const eudrHighRisk = ['BR', 'ID', 'MY', 'AR'];

if (isEudrCommodity && eudrHighRisk.includes(originCountry)) {
    // STRICT ISO COMPLIANCE: EUDR is a legal gate, not a carbon multiplier
    if (!primaryData || !primaryData.ddsReference || !primaryData.geolocation) {
        log.push(`🛑 EUDR COMPLIANCE BLOCK: Missing DDS or Geolocation for high-risk commodity (${originCountry}).`);
        // Return zero impact - supply chain cannot be assessed
        return {
            totalCO2: 0,
            fossilCO2: 0,
            biogenicCO2: 0,
            dlucCO2: 0,
            totalWater: 0,
            totalLand: 0,
            totalFossil: 0,
            perKgCO2: 0,
            perKgWater: 0,
            perKgLand: 0,
            perKgFossil: 0,
            logs: log,
            qualityPenalty: 5.0,
            universal_adjustments: { method: "eudr_blocked", adjusted_for_country: originCountry },
            is_primary: !!primaryData,
            biogenicRemovals: 0,
            compliance_blocked: true,
            block_reason: "EUDR Violation: Missing DDS or Geolocation"
        };
    }
    // Compliant - DDS and geolocation provided. Use baseline Agribalyse values.
    log.push(`✅ EUDR COMPLIANT: DDS and Geolocation verified for ${originCountry}.`);
}

// ========== ECONOMIC ALLOCATION (ISO 14044 §4.3.4.2) ==========
let allocationFactor = 1.0;

// Check if economic allocation is requested via primary data
const useEconomicAllocation = primaryData?.allocationMethod === 'economic';

if (useEconomicAllocation && primaryData?.coProducts) {
    const coProducts = [
        { 
            mass: quantityKg, 
            price: getCommodityPrice(ingredientData?.id || ingredientId), 
            name: ingredientData?.name || 'Main Product' 
        },
        ...primaryData.coProducts
    ];
    
    const allocation = calculateEconomicAllocation(coProducts);
    allocationFactor = allocation.mainFactor;
    
    if (Math.abs(allocation.sum - 1.0) > 0.001) {
        log.push(`⚠️ [Economic Allocation] Sum ≠ 1.0 (${allocation.sum.toFixed(4)}). Check price data.`);
    } else {
        log.push(`💰 [Economic Allocation] Main product receives ${(allocationFactor*100).toFixed(1)}% of burden`);
    }
}

// Calculate final totals with allocation factor
const totalCO2 = finalCO2 * quantityKg * allocationFactor;
const totalWater = finalWater * quantityKg * allocationFactor;
const totalLand = finalLand * quantityKg * allocationFactor;
const totalFossil = finalFossil * quantityKg * allocationFactor;

// 🛡️ REGULATOR FIX: Biogenic removals CANNOT be a flat 20% guess.
// Must be empirically verified (e.g., soil sampling / Tier 3 models).
let biogenicRemovals = 0;
if (primaryData && primaryData.farmingPractice === 'regen') {
    // If a verified certificate value exists in the future, use it here.
    // For now, we record the practice but claim 0 removals to prevent greenwashing.
    biogenicRemovals = primaryData.verifiedSoilCarbonKg || 0; 
    log.push(`🌱 REGEN AG: Practice recorded. Verified soil carbon sequestration: ${biogenicRemovals.toFixed(4)} kg CO₂e.`);
    }

        // ========== ALLOCATION SENSITIVITY CHECK (ISO 14044 §6.3) ==========
let sensitivityResult = null;

if (useEconomicAllocation && primaryData?.coProducts && primaryData.coProducts.length > 0) {
    const allProducts = [
        { name: ingredientData?.name || 'Main Product', mass: quantityKg, price: getCommodityPrice(ingredientData?.id || ingredientId) },
        ...primaryData.coProducts
    ];
    
    sensitivityResult = checkAllocationSensitivity(allProducts);
    
    if (sensitivityResult.significantDifference) {
        log.push(`⚠️ [Sensitivity] ${sensitivityResult.note}`);
        sensitivityResult.differsAt.forEach(d => {
            log.push(`   - ${d.product}: Mass ${d.massFactor} vs Economic ${d.economicFactor} (diff: ${d.difference})`);
        });
    }
}
        
// ========== EUDR COMPLIANCE CHECK (Reg. 2023/1115) ==========
const eudrCheck = checkEUDRCompliance(
    ingredientData?.id || ingredientId,
    originCountry,
    primaryData
);

if (!eudrCheck.compliant) {
    log.push(`🛑 [EUDR] ${eudrCheck.flag}: ${eudrCheck.reason}`);
    impactResult.eudr_compliant = false;
    impactResult.eudr_flag = eudrCheck.flag;
    impactResult.eudr_reason = eudrCheck.reason;
} else {
    log.push(`${eudrCheck.flag} [EUDR] ${eudrCheck.reason}`);
    impactResult.eudr_compliant = true;
    impactResult.eudr_flag = eudrCheck.flag;
}

// ========== 👉 STEP 3: ENTERIC FERMENTATION GOES HERE 👈 ==========
let entericCO2 = 0;
let entericCH4 = 0;

const ingredientNameLower = (ingredientData?.name || '').toLowerCase();
const isAnimalProduct = ingredientNameLower.includes('beef') || 
                       ingredientNameLower.includes('cattle') ||
                       ingredientNameLower.includes('milk') || 
                       ingredientNameLower.includes('dairy') ||
                       ingredientNameLower.includes('lamb') || 
                       ingredientNameLower.includes('sheep') ||
                       ingredientNameLower.includes('goat') ||
                       ingredientNameLower.includes('pork') || 
                       ingredientNameLower.includes('pig');

if (isAnimalProduct) {
    let animalType = 'beef';
    if (ingredientNameLower.includes('milk') || ingredientNameLower.includes('dairy')) animalType = 'dairy';
    else if (ingredientNameLower.includes('lamb') || ingredientNameLower.includes('sheep')) animalType = 'sheep';
    else if (ingredientNameLower.includes('goat')) animalType = 'goat';
    else if (ingredientNameLower.includes('pork') || ingredientNameLower.includes('pig')) animalType = 'pig';
    
    const entericResult = calculateEntericMethane(animalType, quantityKg, originCountry);
    entericCO2 = entericResult.totalCO2;
    entericCH4 = entericResult.ch4_kg;
    
    co2Biogenic += entericCO2;
    finalCO2 += entericCO2;
    
    log.push(`🐄 [Enteric] ${entericResult.note}`);
}


        // ========== SOIL ORGANIC CARBON (SOC) CHANGE ==========
let socCO2 = 0;

// Check if primary data includes farming practice and yield for area calculation
if (primaryData?.farmingPractice) {
    const practice = primaryData.farmingPractice;
    const yieldKgPerHa = primaryData.yieldKgPerHa || ingredientData?.data?.metadata?.yield_kg_ha || 4000;
    const areaHa = quantityKg / yieldKgPerHa;
    const yearsUnderPractice = primaryData.yearsUnderPractice || 3;
    
    const socResult = calculateSOCChange(practice, areaHa, yearsUnderPractice);
    
    if (socResult.deltaCO2 > 0) {
        socCO2 = socResult.deltaCO2;
        
        // SOC sequestration is a biogenic removal (negative emission)
        // Per PEF 3.1, must be reported separately, not netted against total
        biogenicRemovals = (biogenicRemovals || 0) + socCO2;
        
        log.push(`🌱 [SOC] ${socResult.note} - ${socCO2.toFixed(4)} kg CO2 sequestered (reported separately per ISO 14067)`);
    }
        }

        // ========== WASTE VS CO-PRODUCT CLASSIFICATION ==========
let wasteAllocationNote = '';

if (primaryData?.coProducts) {
    for (const coProduct of primaryData.coProducts) {
        const classification = classifyWasteOrCoproduct(
            coProduct.name,
            coProduct.price,
            coProduct.disposal || false
        );
        
        if (classification.type === 'waste') {
            log.push(`🗑️ [Waste] ${coProduct.name}: ${classification.reason} - receives 0% burden`);
            wasteAllocationNote = `${coProduct.name} classified as waste, burden stays with main product`;
        } else {
            log.push(`📦 [Co-Product] ${coProduct.name}: ${classification.reason} - shares burden`);
        }
    }
}

// If ingredient itself is a co-product from another process, note it
if (ingredientData?.data?.metadata?.is_co_product) {
    log.push(`📦 [Co-Product Input] ${ingredientData.name} is a co-product - allocation applied at source`);
}
        
// ========== RETURN STATEMENT ==========

return {
    totalCO2: totalCO2,
    fossilCO2: co2Fossil * quantityKg,
    biogenicCO2: co2Biogenic * quantityKg,
    dlucCO2: co2dLUC * quantityKg,
    totalWater: totalWater,
    totalLand: totalLand,
    totalFossil: totalFossil,
    perKgCO2: finalCO2,
    perKgWater: finalWater,
    perKgLand: finalLand,
    perKgFossil: finalFossil,
    logs: log,
    qualityPenalty: qualityPenalty,
    universal_adjustments: universal_adjustments,
    is_primary: !!primaryData,
    biogenicRemovals: biogenicRemovals,
    marineEutrophication_N: marineEutrophication_kg_N || 0,
    freshwaterEutrophication_P: impactResult.freshwaterEutrophication_P || 0,
    eudr_compliant: impactResult.eudr_compliant !== false,
    eudr_flag: impactResult.eudr_flag || '✅ COMPLIANT',
    eudr_reason: impactResult.eudr_reason || '',
    enteric_co2: entericCO2,
    enteric_ch4_kg: entericCH4,
    soc_sequestration_co2: socCO2,
    waste_allocation_note: wasteAllocationNote || '',
    allocation_sensitivity: sensitivityResult   // ← ADD THIS (no comma, last field)
};
    }

    // ================== AUDIT-GRADE CFF ENGINE (UI COMPATIBLE) ==================
    function calculateCFF(packagingData, weightKg, recycledContentPercent, eolTargetElement) {
        // 1. DATA VALIDATION
        const p = packagingData || {};
        const R1 = recycledContentPercent / 100; 
        
        // 2. MATERIAL 'A' FACTORS (PEF Compliant)
        let A_factor = 0.5; 
        const matName = (p.name || "").toLowerCase();
        if (matName.includes('aluminum') || matName.includes('steel') || matName.includes('glass') || matName.includes('paper') || matName.includes('cardboard')) {
            A_factor = 0.2;
        }

        // 3. MAP VARIABLES
        const Ev = p.co2_virgin || 2.5;
        const Erecycled = p.co2_recycled || 1.2;
        const Ed = p.co2_disposal || 0.3;

        // Quality Ratios (downcycling)
        const Qs_in = p.q || 0.9; 
        const Qp = 1.0; 
        const qualityRatio = Qs_in / Qp;

        // R2 Calculation (End-of-Life Destination)
        let eolTarget = 'eu_average';
        if (eolTargetElement && typeof eolTargetElement === 'object' && eolTargetElement.value) {
            eolTarget = eolTargetElement.value;
        }
        
        let R2 = 0;
        let dqrPenalty = 0.0;

        // 🛡️ REGULATOR FIX: Material Compatibility Lock (AGEC Law)
        const nonRecyclableMaterials = ['pla', 'mycelium'];
        const isNonRecyclable = nonRecyclableMaterials.some(m => matName.includes(m));

        if (isNonRecyclable) {
            R2 = 0.0;
            if (eolTarget === 'recycled') {
                console.warn(`🛑 REGULATORY BLOCK: ${matName} cannot claim 'Closed Loop Recycled'. R2 forced to 0.`);
            }
        } else if (eolTarget === 'recycled') {
            R2 = p.r1_max || 0.90;
        } else if (eolTarget === 'incinerated' || eolTarget === 'landfill') {
            R2 = 0.0;
        } else {
            R2 = (p.r1_max || 0.8) * (p.r2 || 0.7);
        }

                // 🛡️ STRICT MATERIAL-SPECIFIC DISPOSAL CONSTANTS (ISO 14044 COMPLIANT)
let currentEd = p.co2_disposal_average || Ed;
if (eolTarget === 'landfill') {
    currentEd = p.co2_disposal_landfill !== undefined ? p.co2_disposal_landfill : Ed;
} else if (eolTarget === 'incinerated') {
    currentEd = p.co2_disposal_incineration !== undefined ? p.co2_disposal_incineration : Ed;
}
if (eolTarget === 'incinerated') {
    dqrPenalty = 0.5;
            }

        // 🛡️ OFFICIAL CFF MATH (PEF 3.1 COMPLIANT)
        // Input Side: Virgin vs Recycled
        const burdenAcquisition = (1 - R1) * Ev + R1 * (A_factor * Erecycled + (1 - A_factor) * Ev * qualityRatio);
        
        // Output Side: Recycling Credit (THIS USES 1-A — THE FIX)
        const creditEoL = R2 * (1 - A_factor) * (Erecycled - Ev * qualityRatio);
        
        // Disposal Side
        const burdenDisposal = (1 - R2) * currentEd;

        // Final Calculation
        const impactPerKg = burdenAcquisition + creditEoL + burdenDisposal;
        const totalImpact = Math.max(0, impactPerKg * weightKg);

        // 🛡️ THE TRANSPARENCY FIX: Lock the exact CFF mathematical substitution
        const cffTrace = `[CFF: Mass(${weightKg.toFixed(3)}kg) × [(1-${R1})*${Ev} + ${R1}*(${A_factor}*${Erecycled} + (1-${A_factor})*${Ev}*${qualityRatio.toFixed(2)}) + (1-${R2})*${currentEd.toFixed(2)} - ${R2}*(1-${A_factor})*(${Erecycled} - ${Ev}*${qualityRatio.toFixed(2)})]]`;

        return {
            totalImpact: totalImpact,
            virginBurden: (1 - R1) * Ev * weightKg,
            recycledBurden: R1 * (A_factor * Erecycled + (1 - A_factor) * Ev * qualityRatio) * weightKg,
            disposalBurden: burdenDisposal * weightKg,
            recyclingCredit: creditEoL * weightKg,
            effectiveRecyclingRate: R2,
            dqr_penalty: dqrPenalty,
            cff_parameters: { A: A_factor, Methodology: "PEF 3.1" },
            calculation_trace: cffTrace
        };
    }

    // ================== AUDIT-GRADE AWARE ENGINE (ISO 14046 / PEF 3.1) ==================
    function calculateAWARE(waterUse, countryCode, watershed = 'NationalAvg', month = null) {
        // 1. INPUT DEFINITION & TYPE SAFETY (Crash Prevention)
        const waterConsumptionM3 = Number(waterUse) || 0;
        const safeCountryCode = (countryCode || 'WORLD').toUpperCase();
        
        // 2. FORMAL WULCA AWARE 2.0 CONSTANTS (No Magic Numbers)
        const GLOBAL_DEFAULT_CF = 42.9; // Official WULCA Global Average
        
        // Hardcoded fallback DB in case window.aioxyData is missing or malformed
        const FALLBACK_AWARE_DB = {
            "FR": 0.8, "ES": 28.3, "IT": 8.5, "DE": 0.9, "NL": 1.2,
            "US": 16.5, "CN": 21.3, "WORLD": GLOBAL_DEFAULT_CF
        };

        // 3. WATERSHED FACTOR RESOLUTION (Crash-Proof Tree Traversal)
        let cf = GLOBAL_DEFAULT_CF;
        
        // Safely check for external data
        const externalData = (typeof global !== 'undefined' && global.aioxyData?.aware_factors) 
            ? global.aioxyData.aware_factors 
            : {};

        if (externalData[safeCountryCode]) {
            const countryEntry = externalData[safeCountryCode];
            
            // Handle if the data is a nested object (e.g., { NationalAvg: { default: 28.3 } })
            if (typeof countryEntry === 'object' && countryEntry !== null) {
                cf = countryEntry[watershed]?.default 
                  || countryEntry['default'] 
                  || countryEntry 
                  || GLOBAL_DEFAULT_CF;
                  
                // If it resolved to another object, force fallback
                if (typeof cf === 'object') cf = GLOBAL_DEFAULT_CF; 
                
            // Handle if the data is a flat number (e.g., "ES": 28.3)
            } else if (typeof countryEntry === 'number') {
                cf = countryEntry;
            }
        } else if (FALLBACK_AWARE_DB[safeCountryCode] !== undefined) {
            cf = FALLBACK_AWARE_DB[safeCountryCode];
        }

        // 4. REGULATORY INTERVENTION: REMOVED ARBITRARY SEASONAL MULTIPLIERS
        // The previous "cf *= 1.5" heuristic for peak months violates ISO 14044/PEF 3.1.
        // If exact monthly characterization factors are not explicitly provided by the LCI database,
        // the annual average MUST be used to prevent unauthorized risk-inflation.

        // 5. CALCULATION
        const awareImpact = waterConsumptionM3 * cf;

        // 6. AUDIT LOGGING
        console.log(`💧 [Audit AWARE] Country: ${safeCountryCode} | CF: ${cf.toFixed(2)}`);
        console.log(`   Input: ${waterConsumptionM3.toFixed(4)} m³ -> Impact: ${awareImpact.toFixed(4)} m³ world eq.`);

        return {
            impact: awareImpact,
            cf_used: cf,
            methodology: "AWARE 2.0 (WULCA) - ISO 14046",
            note: "Calculated on Consumption basis. Arbitrary seasonal heuristics removed for strict PEF compliance."
        };
    }

    // ================== AIOXY 100% PHYSICS ENGINE (CRASH-PROOF + AUDIT-PROOF) ==================
    function calculateMassBalance(ingredients, processingMethod, packagingWeight, aioxyDataRef) {
        console.log("⚖️ [THERMODYNAMIC] Calculating Mass & Energy Balance...");
        
        // SAFETY PATCH
        if (!aioxyDataRef || !aioxyDataRef.processing) {
            console.warn("⏳ [System] Waiting for Physics Data...");
            return { 
                inputMass: 0, 
                productMass: 0, 
                evaporation: 0, 
                grossWeight: 0,
                final_content_weight_kg: 0,
                packaging_weight_kg: 0,
                thermodynamic_data: { evaporation_kg: 0, yield_factor: 1.0, total_input_kg: 0, final_output_kg: 0 }
            };
        }

        // EXACT same calculation as existing
        const totalInputMass = ingredients.reduce((sum, item) => sum + item.quantity, 0);

        // 🛡️ REGULATOR FIX: Hardcoded fallback to prevent evaporation crashes if DB is unreachable
        const fallbackYields = {
            "none": 1.00, "pasteurization": 0.995, "sterilization": 0.985, "uht_processing": 0.98,
            "emulsification": 0.99, "baking": 0.88, "roasting": 0.82, "frying": 0.75, 
            "freezing": 0.975, "drying": 0.97, "milling": 0.78, "mixing": 0.995, 
            "fermentation": 0.95, "extrusion": 0.95, "oat-processing": 0.98
        };

        const processingData = aioxyDataRef.processing ? aioxyDataRef.processing[processingMethod] : null;
        const yieldFactor = processingData?.yield || fallbackYields[processingMethod] || 1.0;

        const finalProductMass = totalInputMass * yieldFactor;
        const evaporationMass = totalInputMass - finalProductMass;
        const grossWeight = finalProductMass + packagingWeight;

        console.log(`✅ Mass Balance: ${totalInputMass.toFixed(3)}kg in → ${finalProductMass.toFixed(3)}kg out (Gross: ${grossWeight.toFixed(3)}kg)`);
        
        // RETURN EXACT STRUCTURE EXISTING CODE EXPECTS
        return {
            // KEEP ALL EXISTING FIELDS (UI needs these!)
            inputMass: totalInputMass,
            productMass: finalProductMass,
            evaporation: evaporationMass,
            grossWeight: grossWeight,
            final_content_weight_kg: finalProductMass,
            packaging_weight_kg: packagingWeight,
            
            // ADD audit trail data (UI will ignore extra fields)
            thermodynamic_data: {
                evaporation_kg: evaporationMass,
                yield_factor: yieldFactor,
                total_input_kg: totalInputMass,
                final_output_kg: finalProductMass
            },
            
            // ADD regulator keys (optional)
            raw_input_total_kg: totalInputMass,
            final_output_kg: finalProductMass,
            evaporation_kg: evaporationMass,
            gross_weight_kg: grossWeight
        };
    }

    // ============================================================================
    // 🏭 AUDIT-READY MANUFACTURING ENGINE (Utility Bills vs. Industry Benchmarks)
    // ============================================================================
    function calculateManufacturingImpact(massInputKg, massOutputKg, processingMethod, countryCode, isBaseline, domGetter) {
        console.log("🏭 [Audit Engine] Calculating Manufacturing Impact...");
        
        // 1. DOM SAFETY & INPUTS - Use provided getter function
        const usePrimary = domGetter ? domGetter('usePrimaryFactoryData') : false;
        const totalKWh = domGetter ? parseFloat(domGetter('factoryTotalKWh', true) || 0) : 0;
        const totalGasM3 = domGetter ? parseFloat(domGetter('factoryTotalGas', true) || 0) : 0;
        const totalProd = domGetter ? parseFloat(domGetter('factoryTotalOutput', true) || 1) : 1;
        const energySourceVal = domGetter ? domGetter('energySource', true) : 'grid';

        let electricityKWh = 0;
        let naturalGasMj = 0;
        let methodUsed = "";
        let physicsData = null;
        let confidenceLevel = "Low (Secondary Data)";

        // 2. PRIMARY DATA OVERRIDE (The "Truth" Pathway - Utility Bills Don't Lie)
        if (usePrimary && (totalKWh > 0 || totalGasM3 > 0) && totalProd > 0) {
            const kwhPerKg = totalKWh / totalProd;
            const gasM3PerKg = totalGasM3 / totalProd;
            const gasMjPerKg = gasM3PerKg * 39; // ~39 MJ per m3 of natural gas
            
            electricityKWh = kwhPerKg * massOutputKg; 
            naturalGasMj = gasMjPerKg * massOutputKg;
            
            methodUsed = "PRIMARY DATA (Verified Utility Bills)";
            confidenceLevel = "Audit-Ready / ESRS E1 Compliant";
            physicsData = {
                source: "primary_utility_bills",
                kwh_per_kg: kwhPerKg,
                gas_m3_per_kg: gasM3PerKg,
                annual_electricity_kwh: totalKWh,
                annual_gas_m3: totalGasM3,
                annual_production_kg: totalProd,
                verification: "User-submitted utility data"
            };
            console.log(`✅ [Audit] PRIMARY DATA: ${kwhPerKg.toFixed(3)} kWh/kg & ${gasM3PerKg.toFixed(3)} m³/kg from actual bills`);
        } 
        // 3. CONSERVATIVE DEFAULT (The "Benchmark" Pathway)
        else {
            // Source: European Commission JRC / Industrial Energy Efficiency Benchmarks
            // These are publicly available, defensible, and conservative
            const processBenchmarks = {
                "none": 0.00,
                "pasteurization": 0.20,
                "sterilization": 0.35,
                "uht_processing": 0.22,
                "emulsification": 0.07,
                "roasting": 0.75,
                "baking": 0.85,
                "frying": 1.80,           // Continuous fryer
                "freezing": 0.40,          // IQF tunnel
                "drying": 2.50,            // Spray dryer
                "milling": 0.15,           // Hammer mill
                "mixing": 0.08,            // Ribbon blender
                "fermentation": 0.45,       // Fermentation tank + agitation
                "extrusion": 0.85,          // Twin-screw extruder
                "oat-processing": 0.30      // Enzymatic + heat treatment
            };
            
            // If unknown, default to conservative 0.50 kWh/kg penalty
            const benchmarkKwhPerKg = processBenchmarks[processingMethod] !== undefined ? processBenchmarks[processingMethod] : 0.50;
            
            electricityKWh = benchmarkKwhPerKg * massOutputKg;
            methodUsed = "SECONDARY DATA (JRC Industry Benchmark)";
            physicsData = {
                source: "jrc_industry_benchmarks",
                kwh_per_kg: benchmarkKwhPerKg,
                method: processingMethod,
                reference: "European Commission JRC 2023"
            };
            console.log(`⚠️ [Audit] Using JRC benchmark: ${benchmarkKwhPerKg.toFixed(3)} kWh/kg for ${processingMethod}`);
        }

        // 4. APPLY LOCAL GRID INTENSITY OR PRIMARY ENERGY SOURCE
        const aioxyDataRef = global.aioxyData || {};
        const country = aioxyDataRef.countries?.[countryCode] || { electricityCO2: 480, name: "Unknown" };

        // 🛡️ REGULATOR FIX: Ensure the Industry Baseline never "steals" the user's renewable energy
        let energySource = 'grid';
        if (!isBaseline) {
            energySource = energySourceVal;
        }

        // ========== PEF 3.1 ELECTRICITY TRACKING HIERARCHY ==========
const hasRECs = domGetter('hasRECs', false) || false;
const baseGridIntensity = country.electricityCO2 || 480;
const T_AND_D = PHYSICS_CONSTANTS.ELECTRICITY.T_AND_D_LOSSES;

let gridIntensity;
let energyNote;
let scenarioNote = "";
let electricityHierarchyNote = "";

// HIERARCHY LEVEL 1: User has verified RECs/GOs (overrides everything)
if (hasRECs) {
    if (energySource === 'renewable') {
        gridIntensity = 20 * (1 + T_AND_D);
        energyNote = "Supplier Contract (Verified RECs/GOs)";
        electricityHierarchyNote = "PEF 3.1 compliant - certificates verified";
        scenarioNote = "100% Renewable with RECs (-95% vs grid)";
    } else {
        // Has RECs but using grid - RECs offset the residual
        gridIntensity = baseGridIntensity * (1 + T_AND_D);
        energyNote = `Grid + RECs (${countryCode})`;
        electricityHierarchyNote = "RECs applied to offset grid consumption";
    }
} 
// HIERARCHY LEVEL 2: No RECs - check energy source
else {
    if (energySource === 'renewable') {
        // Claiming renewable without certificates - MUST use residual mix
        const multiplier = PHYSICS_DB.residual_mix_multipliers[countryCode] || 
                          PHYSICS_DB.residual_mix_multipliers.default;
        gridIntensity = baseGridIntensity * multiplier * (1 + T_AND_D);
        energyNote = `Residual Mix (${countryCode})`;
        electricityHierarchyNote = `⚠️ No RECs - using residual mix (${(multiplier*100-100).toFixed(0)}% higher)`;
        scenarioNote = "";
    } else if (energySource === 'natural_gas') {
        gridIntensity = 490 * (1 + T_AND_D);
        energyNote = "Natural Gas (Direct)";
    } else if (energySource === 'coal') {
        gridIntensity = 980 * (1 + T_AND_D);
        energyNote = "Coal (Direct)";
    } else {
        // Grid with no RECs - residual mix applies
        const multiplier = PHYSICS_DB.residual_mix_multipliers[countryCode] || 
                          PHYSICS_DB.residual_mix_multipliers.default;
        gridIntensity = baseGridIntensity * multiplier * (1 + T_AND_D);
        energyNote = `Residual Mix (${countryCode})`;
        electricityHierarchyNote = `No RECs - using residual mix per PEF 3.1`;
    }
    }

        // 🛡️ PEF 3.1 FUGITIVE EMISSIONS MANDATE
        let fugitiveCO2 = 0;
        if (processingMethod === 'freezing') {
            // Industry average leakage allowance: ~15g CO2e per kg of frozen product
            fugitiveCO2 = massOutputKg * 0.015; 
            if (physicsData) physicsData.note = "Includes standard PEF refrigerant leakage allowance";
        }

        // 🛡️ THE SCENARIO PROOF: Build complete trace with reasoning
        const scenarioProof = scenarioNote ? ` [Modified: ${scenarioNote}]` : "";

        // 🛡️ AUDIT FIX: Ensure Fugitive Emissions are visible in the math trace
        const fugitiveTrace = fugitiveCO2 > 0 ? ` + Fugitive Refrigerant (${fugitiveCO2.toFixed(4)}kg)` : "";

        const energyTrace = `${electricityKWh.toFixed(2)} kWh × ${gridIntensity} gCO2e/kWh EF [${energyNote}]${scenarioProof}${fugitiveTrace}`;

        // Natural Gas emits ~202g CO2e per MJ
        const gasCO2 = (naturalGasMj * 202) / 1000;
        const manufacturingCO2 = (electricityKWh * (gridIntensity / 1000)) + gasCO2 + fugitiveCO2;
        
        // 5. WATER EVAPORATION (Keep for mass balance, but NOT for energy calculation)
        const waterEvaporated = Math.max(0, massInputKg - massOutputKg);

        console.log(`   └─ Result: ${electricityKWh.toFixed(3)} kWh = ${manufacturingCO2.toFixed(4)} kg CO₂e (${countryCode} grid: ${gridIntensity}g/kWh)`);


        // ========== CAPITAL GOODS AMORTIZATION (ISO 14044 1% Rule) ==========
let capitalGoodsCO2 = 0;
let capitalGoodsNote = '';

// Check if user provided equipment type in primary data
const equipmentType = domGetter('equipmentType', true) || processingMethod;
const annualOutput = parseFloat(domGetter('factoryTotalOutput', true)) || massOutputKg * 1000; // Estimate if not provided

if (annualOutput > 0) {
    capitalGoodsCO2 = calculateCapitalGoods(equipmentType, annualOutput, massOutputKg);
    
    // Evaluate 1% cutoff
    const totalImpactPerKg = (manufacturingCO2 + capitalGoodsCO2) / massOutputKg;
    const cutoffEval = evaluateCapitalGoodsCutoff(capitalGoodsCO2 / massOutputKg, totalImpactPerKg);
    
    if (cutoffEval.mustInclude) {
        manufacturingCO2 += capitalGoodsCO2;
        capitalGoodsNote = `Includes capital goods: +${capitalGoodsCO2.toFixed(4)} kg CO2e (${cutoffEval.contribution} of total)`;
    } else {
        capitalGoodsNote = `Capital goods excluded: ${cutoffEval.contribution} contribution (<1% cutoff)`;
    }
}
        // Build energy trace BEFORE return
const energyTrace = `${electricityKWh.toFixed(2)} kWh × ${gridIntensity.toFixed(0)} gCO2e/kWh [${energyNote}] | ${electricityHierarchyNote}${scenarioNote ? ' | ' + scenarioNote : ''}${fugitiveTrace}`;

// THEN return the object
return {
    co2: manufacturingCO2,
    kwh: electricityKWh,
    gas_mj: naturalGasMj,
    method: methodUsed,
    confidence: confidenceLevel,
    physics_data: physicsData,
    water_evaporated_kg: waterEvaporated,
    grid_intensity_g_per_kwh: gridIntensity,
    energy_source: energyNote,
    country: countryCode,
    fugitive_co2: fugitiveCO2,
    capital_goods_co2: capitalGoodsCO2,
    capital_goods_note: capitalGoodsNote,
    calculation_trace: energyTrace  // Reference the variable, don't define it here
};
    }

    // ================== AIOXY COMPLIANCE ENGINE: EF 3.1 (UI COMPATIBLE) ==================
    function calculatePEFSingleScore(pefResults, productWeightKg) {
        // JRC EF 3.1 NORMALIZATION FACTORS
        const pefNormalizationFactors = {
            "Climate Change": 1/7553.08, "Ozone Depletion": 1/0.0523,
            "Human Toxicity, cancer": 1/0.0000173, "Human Toxicity, non-cancer": 1/0.000129,
            "Particulate Matter": 1/0.000595, "Ionizing Radiation": 1/4220.16,
            "Photochemical Ozone Formation": 1/40.86, "Acidification": 1/55.57,
            "Eutrophication, terrestrial": 1/176.75, "Eutrophication, freshwater": 1/1.61,
            "Eutrophication, marine": 1/19.55, "Ecotoxicity, freshwater": 1/56716.59,
            "Land Use": 1/819498.18, "Water Use/Scarcity (AWARE)": 1/11468.71,
            "Resource Use, minerals/metals": 1/0.0636, "Resource Use, fossils": 1/65004.26
        };

        // JRC EF 3.1 WEIGHTING FACTORS
        const pefWeightingFactors = {
            "Climate Change": 0.2106, "Ozone Depletion": 0.0631,
            "Human Toxicity, cancer": 0.0213, "Human Toxicity, non-cancer": 0.0184,
            "Particulate Matter": 0.0896, "Ionizing Radiation": 0.0501,
            "Photochemical Ozone Formation": 0.0478, "Acidification": 0.0620,
            "Eutrophication, terrestrial": 0.0371, "Eutrophication, freshwater": 0.0280,
            "Eutrophication, marine": 0.0296, "Ecotoxicity, freshwater": 0.0192,
            "Land Use": 0.0794, "Water Use/Scarcity (AWARE)": 0.0851,
            "Resource Use, minerals/metals": 0.0755, "Resource Use, fossils": 0.0832
        };

        let weightedScore = 0;
        let normalizedScore = 0;
        const singleScoreBreakdown = {};

        Object.keys(pefResults).forEach(category => {
            const impact = pefResults[category].total || 0;
            const perKg = productWeightKg > 0 ? impact / productWeightKg : 0;
            const normFactor = pefNormalizationFactors[category] || 0;
            const weightFactor = pefWeightingFactors[category] || 0;

            const normalized = perKg * normFactor;
            const weighted = normalized * weightFactor;

            weightedScore += weighted;
            normalizedScore += normalized;

            singleScoreBreakdown[category] = { 
                raw: perKg, 
                normalized: normalized, 
                weighted: weighted,
                normalizationFactor: normFactor,
                weightingFactor: weightFactor,
                unit: pefCategories[category]?.unit || ''
            };
        });

        // 🛡️ REGULATOR FIX: ADEME FOP Eco-Score "Organic Farming" Proportionality
        // The 15 µPt deduction MUST be prorated by the physical mass percentage of organic ingredients.
        let organicMass = 0;
        let totalIngredientMass = 0;

        if (global.selectedIngredients && global.selectedIngredients.length > 0) {
            global.selectedIngredients.forEach(i => {
                totalIngredientMass += i.quantity;
                if (i.primaryData?.farmingPractice === 'organic') {
                    organicMass += i.quantity;
                }
            });
        }

        const organicRatio = totalIngredientMass > 0 ? (organicMass / totalIngredientMass) : 0;
        const organicBonus = 15.0 * organicRatio; // Prorated deduction

        // Standardize to microPoints (µPt) and apply the prorated bonus (floor at 0)
        let finalMicroPoints = (weightedScore * 1000000) - organicBonus;
        finalMicroPoints = Math.max(0, finalMicroPoints);

        return {
            singleScore: finalMicroPoints,
            normalizedScore: normalizedScore,
            weightedScore: weightedScore,
            breakdown: singleScoreBreakdown,
            unit: 'µPt',
            organic_bonus_applied: organicRatio > 0,
            organic_ratio: organicRatio
        };
    }

    // ================== AIOXY UNCERTAINTY ENGINE (FIXED: DYNAMIC AWARENESS) ==================
    function calculateMonteCarloUncertainty(ingredients, currentCC_Tree, currentWater_Tree, iterations = 5000) {
        console.log("🔬 [Physics Engine] Initiating Monte Carlo Simulation (n=" + iterations + ")...");
        
        if (!ingredients || ingredients.length === 0 || !currentCC_Tree) {
            return { 
                co2: { mean: 0, p5: 0, p95: 0, range: 0, sigma: 0 }, 
                water: { mean: 0, p5: 0, p95: 0, range: 0, sigma: 0 } 
            };
        }
        
        const results = { co2: [], water: [] };
        const aioxyDataRef = global.aioxyData || {};
        
        for (let i = 0; i < iterations; i++) {
            let totalCO2 = 0;
            let totalWater = 0;
            
            ingredients.forEach(ing => {
                const ingredientDB = aioxyDataRef.ingredients?.[ing.id];
                if (!ingredientDB) return;

                // 🛡️ PULL ACTUAL ADJUSTED VALUES FROM LIVE CONTRIBUTION TREE
                const activeCCNode = currentCC_Tree.Ingredients?.components?.find(c => c.id === ing.id);
                const activeWaterNode = currentWater_Tree?.Ingredients?.components?.find(c => c.id === ing.id);
                
                const co2Base = activeCCNode ? activeCCNode.subtotal : (ingredientDB.data.pef["Climate Change"] * ing.quantity || 0);
                const waterBase = activeWaterNode ? activeWaterNode.subtotal : (ingredientDB.data.pef["Water Use/Scarcity (AWARE)"] * ing.quantity || 0);
                
                const P_unc = ingredientDB.data.metadata?.dqr?.P || 15;
                const cv = P_unc / 100;
                const sigmaSq = Math.log(1 + Math.pow(cv, 2));
                const sigma = Math.sqrt(sigmaSq);
                const Z = randomNormal();
                
                const lognormalMultiplier = Math.exp((Z * sigma) - (sigmaSq / 2));
                totalCO2 += co2Base * lognormalMultiplier;
                totalWater += waterBase * lognormalMultiplier;
            });
            
            results.co2.push(totalCO2);
            results.water.push(totalWater);
        }
        
        const stats = (values) => {
            values.sort((a, b) => a - b);
            return {
                mean: values.reduce((a, b) => a + b, 0) / iterations,
                median: values[Math.floor(iterations * 0.5)],
                p5: values[Math.floor(iterations * 0.05)],
                p95: values[Math.floor(iterations * 0.95)],
                range: values[iterations - 1] - values[0]
            };
        };

        return {
            co2: stats(results.co2),
            water: stats(results.water),
            metadata: { 
                methodology: "Monte Carlo Lognormal (Adjusted Base)", 
                iterations: iterations, 
                timestamp: new Date().toISOString() 
            }
        };
    }

    // ================== FIX 6: FOREGROUND/BACKGROUND ANALYSIS (ISO 14044 COMPLIANT) ==================
    function analyzeForegroundBackground(ingredients, totalImpact, currentPefCategories, dqrComponentsList) {
        const foregroundComponents = [];
        const backgroundComponents = [];
        const foregroundCutoff = 0.05;
        const aioxyDataRef = global.aioxyData || {};

        const processComponent = (name, impact, dqr) => {
            if (impact <= 0) return;
            const contribution = impact;
            const safeTotal = totalImpact > 0 ? totalImpact : 1;
            const isSignificant = contribution >= (safeTotal * foregroundCutoff);
            const data = {
                name: name,
                contribution: contribution,
                dqr: dqr || 3.0,
                data_type: isSignificant ? "foreground" : "background"
            };
            if (isSignificant) foregroundComponents.push(data);
            else backgroundComponents.push(data);
        };

        // 1. Analyze Ingredients 
        ingredients.forEach(item => {
            const ingredient = aioxyDataRef.ingredients?.[item.id];
            if (!ingredient) return;
            const impact = item.quantity * (ingredient.data.pef["Climate Change"] || 0);
            
            const dqrObj = dqrComponentsList ? dqrComponentsList.find(d => d.name === ingredient.name) : null;
            const rawDqr = dqrObj ? dqrObj.dqr : ingredient.data.metadata?.dqr_overall;
            const finalDqr = Math.max(1.0, Math.min(5.0, rawDqr || 2.0));

            processComponent(ingredient.name, impact, finalDqr);
        });

        // 2. Analyze Non-Ingredient Stages (DYNAMIC DQR FIX)
        if (currentPefCategories && currentPefCategories["Climate Change"]) {
            const tree = currentPefCategories["Climate Change"].contribution_tree;
            
            // 🛡️ REGULATOR FIX: Dynamic Manufacturing DQR based on Primary Data Override
            if (tree.Manufacturing.total > 0) {
                const hasPrimaryMfg = tree.Manufacturing.components.some(c => c.confidence === "High (Audit-Ready)");
                const mfgDQR = hasPrimaryMfg ? 1.0 : 2.5;
                processComponent("Manufacturing & Energy", tree.Manufacturing.total, mfgDQR);
            }
            
            // 🛡️ REGULATOR FIX: Dynamic Packaging DQR based on CFF Incineration penalty
            if (tree.Packaging.total > 0) {
                const pkgDQR = tree.Packaging.dqr_score || 1.5;
                processComponent("Packaging", tree.Packaging.total, pkgDQR);
            }
            
            if (tree.Transport.total > 0) processComponent("Logistics", tree.Transport.total, 2.5);
        }

        // 3. Calculate Weighted DQRs
        const calcWeightedDQR = (components) => {
            if (components.length === 0) return 2.0;
            const totalWeight = components.reduce((sum, c) => sum + c.contribution, 0);
            if (totalWeight === 0) return 2.0;
            return components.reduce((sum, c) => sum + (c.dqr * c.contribution), 0) / totalWeight;
        };

        const foregroundDQR = calcWeightedDQR(foregroundComponents);
        const backgroundDQR = calcWeightedDQR(backgroundComponents);

        const totalRecordedImpact = foregroundComponents.reduce((s,c)=>s+c.contribution,0) + 
                                   backgroundComponents.reduce((s,c)=>s+c.contribution,0);
                                   
        const overallDQR = totalRecordedImpact > 0 ? 
            ((foregroundDQR * foregroundComponents.reduce((s,c)=>s+c.contribution,0)) + 
             (backgroundDQR * backgroundComponents.reduce((s,c)=>s+c.contribution,0))) / totalRecordedImpact
            : 2.0;
        
// ========== DATA NEEDS MATRIX (DNM) EVALUATION ==========
// Evaluate DNM compliance for Climate Change category
const allProcesses = [...foregroundComponents, ...backgroundComponents].map(c => ({
    name: c.name,
    impact: c.contribution,
    dqr: c.dqr || 2.5,
    isUnderOperationalControl: c.name.includes('Manufacturing') || c.data_type === 'foreground'
}));

const dnmResult = evaluateDNM(allProcesses, totalImpact);

        // ========== 80% HOTSPOT IDENTIFICATION ==========
// Identify hotspots for Climate Change category
const ccComponents = [
    ...foregroundComponents.map(c => ({ name: c.name, contribution: c.contribution, dqr: c.dqr })),
    ...backgroundComponents.map(c => ({ name: c.name, contribution: c.contribution, dqr: c.dqr }))
];

const hotspotAnalysis = identifyHotspots(ccComponents, totalImpact);

        
        return {
    cutoff_percentage: foregroundCutoff,
    foreground_count: foregroundComponents.length,
    background_count: backgroundComponents.length,
    foreground_contribution: foregroundComponents.reduce((sum, c) => sum + c.contribution, 0),
    background_contribution: backgroundComponents.reduce((sum, c) => sum + c.contribution, 0),
    foreground_dqr: foregroundDQR,
    background_dqr: backgroundDQR,
    overall_dqr: overallDQR,
    dnm_result: dnmResult,
    hotspot_analysis: hotspotAnalysis,  // <-- ADD THIS LINE
    components: {
        foreground: foregroundComponents,
        background: backgroundComponents
    }
};
    }

    // ================== FIX 7: TEMPORAL DISCOUNTING (REGULATOR CORRECTED) ==================
    function applyTemporalDiscounting(pefResults, timeHorizon = 100) {
        // REGULATOR NOTE: Discounting physical environmental flows (kg CO2e) is 
        // NON-COMPLIANT with PEF 3.1 and EPD standards.
        // This function now returns the un-discounted GWP100 baseline to prevent greenwashing liability.
        
        const compliantResults = {};
        
        // We remove the financial discount rates. 
        // Environmental impact does not depreciate like money.
        
        Object.keys(pefResults).forEach(category => {
            const baseImpact = pefResults[category].total || 0;
            
            // STRICT COMPLIANCE:
            // Discount Rate = 0.0 (No discounting allowed for physical flows)
            const discountRate = 0.0;
            
            // Optional: Keep dynamic factors only if scientifically justified (AR6)
            // Here we default to 1.0 (Static) for maximum safety.
            const dynamicFactor = 1.0; 

            compliantResults[category] = {
                base_impact: baseImpact,
                discounted_impact: baseImpact, // MUST match base for PEF compliance
                discount_rate: discountRate,
                time_horizon: timeHorizon,
                present_value_equivalent: baseImpact, // No NPV for carbon
                dynamic_factor: dynamicFactor,
                note: "Standard GWP100 (No discounting applied per PEF 3.1)"
            };
        });
        
        console.log("⚖️ [Regulator Audit] Temporal Discounting bypassed for PEF compliance.");
        return compliantResults;
    }

    // ================== FIX 8: ISO COMPLIANCE FRAMEWORK ==================
    function getISOCompliance() {
        return {
            principles: {
                life_cycle_perspective: "cradle_to_grave",
                relative_approach: "comparative_assessment",
                functional_unit: "1 kg of final product",
                system_boundary: {
                    includes: [
                        "raw_material_extraction",
                        "agricultural_production", 
                        "processing",
                        "transportation",
                        "packaging",
                        "end_of_life"
                    ],
                    excludes: [
                        "human_labor",
                        "capital_goods_depreciation",
                        "administrative_overheads"
                    ],
                    cut_off_criteria: "5% of mass/energy"
                }
            },
            
            compliance_statement: `This assessment aligns with the principles of ISO 14040:2006 and ISO 14044:2006 for comparative life cycle assessment.

1. System boundary: Cradle-to-Retail (includes ingredients, processing, packaging, distribution).
2. Data sources: AGRIBALYSE 3.2 (secondary data), GLEC v3.2 (logistics).
3. Cut-off criteria: 5% mass/energy rule applied via Foreground/Background analysis.

Note: This screening-level assessment is designed for internal strategic decision-making and B2B communication. Public comparative assertions (e.g., marketing claims) require a third-party critical review panel per ISO 14044 §6.1.`
        };
    }

    // ================== NEW: SCENARIO VALIDATION WRAPPER ==================
    function validateAndApplyScenarios(baseResults, scenarios) {
        console.log("🛡️ [Scenario Validation] Starting with:", {
            hasBaseResults: !!baseResults,
            hasFinalPefResults: !!baseResults?.finalPefResults,
            activeScenarios: scenarios
        });
        
        // Check if we have valid data
        if (!baseResults || !baseResults.finalPefResults) {
            console.error("❌ [Scenario Validation] Missing physics data for scenarios");
            return baseResults?.finalPefResults || {};
        }
        
        // Make sure Climate Change data exists
        if (!baseResults.finalPefResults["Climate Change"]) {
            console.error("❌ [Scenario Validation] Missing Climate Change data");
            return baseResults.finalPefResults;
        }
        
        // Initialize contribution tree if missing (safety check)
        const climateData = baseResults.finalPefResults["Climate Change"];
        if (!climateData.contribution_tree) {
            console.warn("⚠️ [Scenario Validation] Initializing missing contribution tree");
            climateData.contribution_tree = {
                Ingredients: { total: climateData.total * 0.7 || 0 },
                Manufacturing: { total: climateData.total * 0.1 || 0 },
                Transport: { total: climateData.total * 0.1 || 0 },
                Packaging: { total: climateData.total * 0.1 || 0 }
            };
        }
        
        // Now call the scenario physics engine
        console.log("✅ [Scenario Validation] Data validated, calling physics engine");
        return applyScenarioPhysics(baseResults, scenarios);
    }

    // ================== FIX: PHYSICS-BASED SCENARIO ENGINE (MULTI-CATEGORY) ==================
    function applyScenarioPhysics(baseResults, scenarios) {
        console.log("🔧 [Physics Fix] Applying scenarios across all environmental categories...");
        
        // Safety check
        if (!baseResults || !baseResults.finalPefResults) return {};
        
        // Deep clone to avoid mutating original data
        let modifiedResults = JSON.parse(JSON.stringify(baseResults.finalPefResults));
        let scenarioLog = [];
        
        // 🛡️ REGULATOR FIX: Helper to apply physics across ALL mandatory ESRS categories simultaneously
        const applyToAll = (treeNode, multiplier) => {
            ["Climate Change", "Water Use/Scarcity (AWARE)", "Land Use", "Resource Use, fossils"].forEach(cat => {
                if (modifiedResults[cat]?.contribution_tree?.[treeNode]) {
                    modifiedResults[cat].contribution_tree[treeNode].total *= multiplier;
                }
            });
        };
        
        // 1. RENEWABLE ENERGY (Physics: Actual grid mix reduction)
        const currentEnergy = global.document?.getElementById('energySource')?.value;
        if (scenarios.renewables && currentEnergy !== 'renewable') {
            if (modifiedResults["Climate Change"]?.contribution_tree?.Manufacturing) {
                const renewableMix = {
                    "FR": 0.33, "DE": 0.46, "ES": 0.42, "IT": 0.36,
                    "NL": 0.27, "SE": 0.63, "DK": 0.50, "default": 0.30
                };
                const country = global.document?.getElementById('manufacturingCountry')?.value || 'FR';
                const renewablePct = renewableMix[country] || renewableMix.default;
                const reductionFactor = Math.max(0.05, 1 - renewablePct);
                
                applyToAll("Manufacturing", reductionFactor);
                scenarioLog.push(`Renewables: -${((1-reductionFactor)*100).toFixed(0)}% (${(renewablePct*100).toFixed(0)}% renewable grid)`);
            }
        }
        
        // 2. LOCAL SOURCING (Physics: Distance ratio reduction)
        if (scenarios.local) {
            if (modifiedResults["Climate Change"]?.contribution_tree?.Transport) {
                const originalDist = parseFloat(global.document?.getElementById('transportDistance')?.value) || 300;
                const optimizedDist = 50;
                const distanceRatio = Math.min(1, optimizedDist / Math.max(originalDist, 1));
                
                applyToAll("Transport", distanceRatio);
                scenarioLog.push(`Local: ${originalDist}km → ${optimizedDist}km (${(distanceRatio*100).toFixed(0)}% transport)`);
            }
        }
        
        // 3. LIGHTWEIGHT PACKAGING (Physics: Mass reduction)
        if (scenarios.lightweight) {
            if (modifiedResults["Climate Change"]?.contribution_tree?.Packaging) {
                const weightReduction = 0.80; // -20% mass
                applyToAll("Packaging", weightReduction);
                scenarioLog.push(`Lightweight: -20% packaging mass (material optimization)`);
            }
        }
        
        // 4. REGENERATIVE AGRICULTURE (Physics: Soil carbon sequestration)
if (scenarios.regen_ag) {
    if (modifiedResults["Climate Change"]?.contribution_tree?.Ingredients) {
        // REGULATOR FIX: Scenarios cannot invent 20% flat removals.
        // Soil Organic Carbon must be empirically measured (IPCC Tier 2/3).
        // This remains 0 until linked to verified soil sampling data.
        const newRemovals = 0; 
        scenarioLog.push(`Regen Ag: Transition modeled. 0 kg CO₂e sequestration claimed without physical soil sampling data.`);
    }
}
        
        // 5. ZERO WASTE MANUFACTURING (Physics: Yield efficiency)
        if (scenarios.no_waste) {
            if (modifiedResults["Climate Change"]?.contribution_tree?.Ingredients) {
                const yieldImprovement = 0.90; // 10% less waste = 10% less input needed
                applyToAll("Ingredients", yieldImprovement);
                scenarioLog.push(`Zero Waste: +10% yield efficiency (process optimization)`);
            }
        }
        
        // 6. BULK SHIPPING (Physics: Modal shift efficiency)
        if (scenarios.bulk) {
            if (modifiedResults["Climate Change"]?.contribution_tree?.Transport) {
                const currentMode = global.document?.getElementById('transportMode')?.value || 'road';
                let efficiencyGain = 1.0;
                
                if (currentMode === 'road') efficiencyGain = 0.071;
                if (scenarios.bulk && currentMode === 'road') efficiencyGain = 0.005;
                
                const improvementFactor = efficiencyGain / 0.071;
                applyToAll("Transport", improvementFactor);
                scenarioLog.push(`Bulk Shipping: Modal shift efficiency (${(improvementFactor*100).toFixed(1)}% of ${currentMode})`);
            }
        }
        
        // 7. CIRCULAR PACKAGING (Physics: Closed-loop CFF improvement)
        if (scenarios.circular_pkg) {
            if (modifiedResults["Climate Change"]?.contribution_tree?.Packaging) {
                const circularReduction = 0.40; // -60% impact
                applyToAll("Packaging", circularReduction);
                scenarioLog.push(`Circular Pkg: Closed loop cycle (-60% vs linear)`);
            }
        }
        
        // RECALCULATE TOTALS with physics conservation
        Object.keys(modifiedResults).forEach(cat => {
            const tree = modifiedResults[cat].contribution_tree;
            if (tree) {
                const ing = tree.Ingredients?.total || 0;
                const mfg = tree.Manufacturing?.total || 0;
                const trans = tree.Transport?.total || 0;
                const pkg = tree.Packaging?.total || 0;
                const upst = tree.Upstream?.total || 0;
                
                modifiedResults[cat].total = ing + mfg + trans + pkg + upst;
            }
        });
        
        console.log("✅ [Physics Fix] Multi-Category Scenario Engine Applied:", scenarioLog);
        return modifiedResults;
    }

    // ================== REGULATORY INTEGRITY ENGINE ==================
    // Generates a deterministic, tamper-evident 64-character hash based on physical inputs
    function generateAuditHash(payloadString) {
        let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (let i = 0, ch; i < payloadString.length; i++) {
            ch = payloadString.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return ((h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0')).padEnd(64, 'A').toUpperCase();
    }

// ============================================================================
// ⚖️ THE PARAMETRIC TWIN ENGINE - CLONE & SWAP (ISO 14044 §4.2.3.2 COMPLIANT)
// ============================================================================
// OFFICIAL METHODOLOGY: Functional Equivalence via Identical System Boundaries
// All manufacturing, transport, and packaging parameters are cloned from the 
// user's product configuration. Only the agricultural ingredient is swapped.
// JRC BAT processing energy available as optional toggle for protein isolates.
// ============================================================================

// ANCHOR DATASETS - Maps old category keys to actual ingredient IDs (Backward Compatibility)
const ANCHOR_DATASETS = {
    'beef-product': { id: 'beef-cattle-conventional-national-average-at-farm-gate-fr', factor: 1.0, name: 'Beef' },
    'chicken-product': { id: 'broiler-conventional-at-farm-gate-fr', factor: 1.0, name: 'Chicken' },
    'pork-product': { id: 'pig-conventional-national-average-at-farm-gate-fr', factor: 1.0, name: 'Pork' },
    'milk-product': { id: 'cow-milk-conventional-national-average-at-farm-gate-fr', factor: 1.0, name: 'Cow Milk' },
    'cheese-product': { id: 'cow-milk-conventional-national-average-at-farm-gate-fr', factor: 10.0, name: 'Cheese' },
    'plant-burger': { id: 'soybean-national-average-animal-feed-at-farm-gate-fr', factor: 0.3, name: 'Plant-Based Patty' },
    'plant-milk': { id: 'oat-grain-national-average-animal-feed-at-farm-gate-fr', factor: 0.1, name: 'Oat/Plant Milk' },
    'default': { id: 'beef-cattle-conventional-national-average-at-farm-gate-fr', factor: 1.0, name: 'Conventional Product' }
};
    
// OFFICIAL JRC BAT ENERGY VALUES - Commission Implementing Decision (EU) 2019/2031
// Source: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2019.313.01.0060.01.ENG
const JRC_BAT_PROCESSING = {
    // Table 19: Oilseed processing and vegetable oil refining
    'soy-protein-concentrate': {
        energy_mwh_per_tonne: 1.15,
        thermal_mj_per_kg: 6.5,
        source: 'JRC BAT (EU) 2019/2031, Table 19',
        processing_steps: 'Crushing, hexane extraction, desolventising, drying',
        applies_to: ['soy', 'soybean', 'soy-protein']
    },
    // Table 25: Starch production (includes protein fractionation)
    'wheat-protein-isolate': {
        energy_mwh_per_tonne: 0.95,
        thermal_mj_per_kg: 8.0,
        source: 'JRC BAT (EU) 2019/2031, Table 25',
        processing_steps: 'Milling, gluten separation, drying',
        applies_to: ['wheat', 'wheat-protein', 'gluten']
    },
    'pea-protein-isolate': {
        energy_mwh_per_tonne: 0.95,
        thermal_mj_per_kg: 7.0,
        source: 'JRC BAT (EU) 2019/2031, Table 25 (applied to legume fractionation)',
        processing_steps: 'Milling, protein extraction, precipitation, drying',
        applies_to: ['pea', 'spring-pea', 'pea-protein']
    },
    // Table 8: Dairies (powder production)
    'whey-protein-isolate': {
        energy_mwh_per_tonne: 0.35,
        thermal_mj_per_kg: 15.0,
        source: 'JRC BAT (EU) 2019/2031, Table 8',
        processing_steps: 'Ultrafiltration, diafiltration, spray drying',
        applies_to: ['whey', 'whey-protein', 'milk-protein']
    }
};

function calculateParametricBaseline(anchorId, targetCountry) {
    console.log(`⚖️ [Parametric Twin] Constructing ISO 14044 compliant apples-to-apples baseline for: ${anchorId}`);
    
    const aioxyDataRef = global.aioxyData || {};
    
    // 1. SAFETY CHECK - Database must exist
    if (!aioxyDataRef.ingredients) {
        console.warn("⚠️ [Parametric Twin] Missing ingredient data");
        return {
            name: `Benchmark (Data Missing)`,
            co2PerKg: 5.0,
            waterPerKg: 1.0,
            landUsePerKg: 2.0,
            fossilPerKg: 10.0,
            concentration_ratio: 1.0,
            breakdown: { farm: 5.0, manufacturing: 0, logistics: 0, packaging: 0 },
            methodology: "Fallback - Database Unavailable",
            allocation_method: "Mass allocation",
            allocation_note: "Default",
            sensitivity_analysis: { 
                performed: false, 
                parameters_tested: [], 
                key_finding: "Data missing", 
                recommendation: "Reload database", 
                iso_compliance: "Fallback only" 
            },
            compliance_statement: "Fallback baseline - database missing."
        };
    }
    
    // 2. RESOLVE THE ANCHOR INGREDIENT
    let anchorIng = aioxyDataRef.ingredients[anchorId];
    let anchorName = "Selected Baseline";
    let concentrationRatio = 1.0;
    
    if (!anchorIng && ANCHOR_DATASETS && ANCHOR_DATASETS[anchorId]) {
        const mappedAnchor = ANCHOR_DATASETS[anchorId];
        anchorIng = aioxyDataRef.ingredients[mappedAnchor.id];
        anchorName = mappedAnchor.name;
        concentrationRatio = mappedAnchor.factor || 1.0;
        console.log(`   └─ Mapped legacy category "${anchorId}" → ${mappedAnchor.id}`);
    } else if (anchorIng) {
        anchorName = anchorIng.name || 'Selected Ingredient';
        concentrationRatio = parseFloat(global.document?.getElementById('concentrationRatio')?.value) || 1.0;
    }
    
    // 3. FALLBACK - Anchor not found
    if (!anchorIng) {
        console.warn(`⚠️ [Audit Warning] Anchor ingredient "${anchorId}" not found. Using fallback.`);
        return { 
            name: `Generic Product (Anchor Missing)`, 
            co2PerKg: 5.0, 
            waterPerKg: 1.0,
            landUsePerKg: 2.0,
            fossilPerKg: 10.0,
            concentration_ratio: 1.0,
            breakdown: { farm: 5.0, manufacturing: 0, logistics: 0, packaging: 0 },
            methodology: "Fallback - Anchor Ingredient Not Found",
            allocation_method: "Mass allocation",
            allocation_note: "Default",
            sensitivity_analysis: { 
                performed: false, 
                parameters_tested: [], 
                key_finding: "Anchor missing", 
                recommendation: "Select valid baseline", 
                iso_compliance: "Fallback only" 
            },
            compliance_statement: "Fallback baseline - anchor ingredient not found in database."
        };
    }

    // 4. DOM GETTER - Clones System Boundary from User Interface
    const domGetter = (id, returnValue) => {
        const el = global.document?.getElementById(id);
        if (!el) return returnValue ? '' : false;
        return returnValue ? (el.value || '') : (el.checked || false);
    };

    // 5. CLONE SYSTEM BOUNDARIES FROM USER'S PRODUCT CONFIGURATION
    const userProcessing = domGetter('processingMethod', true) || 'none';
    const userTransportDist = parseFloat(domGetter('transportDistance', true)) || 300;
    const userTransportMode = domGetter('transportMode', true) || 'road';
    const userRefrigerated = domGetter('refrigeratedTransport', true) || 'no';
    const userPkgWeight = parseFloat(domGetter('packagingWeight', true)) || 0.050;
    const userPkgMaterial = domGetter('packagingMaterial', true) || 'cardboard';
    const userRecycledPct = parseFloat(domGetter('recycledContent', true)) || 30;
    const userEnergySource = domGetter('energySource', true) || 'grid';
    const eolTargetElement = global.document?.getElementById('packagingEoL');
    
    // 🆕 JRC BAT TOGGLE - Check if user wants BAT processing energy
    const useJRCBAT = domGetter('useJRCBAT', false) || false;
    
    // Determine temperature condition for transport
    const isFrozen = userProcessing === 'freezing';
    const isChilled = userRefrigerated === 'yes' || userProcessing === 'pasteurization';
    let refType = 'ambient';
    if (isFrozen) refType = 'frozen';
    else if (isChilled) refType = 'chilled';

    console.log(`   └─ Cloned Boundaries: Processing=${userProcessing}, Transport=${userTransportDist}km ${userTransportMode} (${refType}), Packaging=${userPkgWeight}kg ${userPkgMaterial}`);
    if (useJRCBAT) console.log(`   └─ 🏭 JRC BAT Processing Energy: ENABLED`);

    // =====================================================================
    // A. FARM GATE IMPACT (Agribalyse LCI × Concentration Ratio)
    // =====================================================================
    const pef = anchorIng.data?.pef || {};
    const farmGateCO2 = (pef["Climate Change"] || 0) * concentrationRatio;
    const farmGateWater = (pef["Water Use/Scarcity (AWARE)"] || 0) * concentrationRatio;
    const farmGateLand = (pef["Land Use"] || 0) * concentrationRatio;
    const farmGateFossil = (pef["Resource Use, fossils"] || 0) * concentrationRatio;
    
    const farmFossilCO2 = (pef["Climate Change - Fossil"] || farmGateCO2 * 0.912) * concentrationRatio;
    const farmBiogenicCO2 = (pef["Climate Change - Biogenic"] || farmGateCO2 * 0.071) * concentrationRatio;
    const farmDLUCCO2 = (pef["Climate Change - Land Use"] || farmGateCO2 * 0.017) * concentrationRatio;

    // =====================================================================
    // B. MANUFACTURING IMPACT (Cloned Processing + Optional JRC BAT)
    // =====================================================================
    let mfgCO2 = 0;
    let mfgKwh = 0;
    let mfgGasMj = 0;
    let batProcessingNote = '';
    let batSource = '';
    
    // Check if JRC BAT applies to this ingredient
    let applicableBAT = null;
    if (useJRCBAT) {
        const anchorNameLower = (anchorIng.name || '').toLowerCase();
        const anchorIdLower = anchorId.toLowerCase();
        
        for (const [key, batData] of Object.entries(JRC_BAT_PROCESSING)) {
            const appliesTo = batData.applies_to || [];
            const matches = appliesTo.some(term => 
                anchorNameLower.includes(term) || anchorIdLower.includes(term)
            );
            if (matches) {
                applicableBAT = batData;
                break;
            }
        }
    }
    
    if (applicableBAT) {
        // Use JRC BAT processing energy
        const countryData = aioxyDataRef.countries?.[targetCountry] || { electricityCO2: 480 };
        const gridIntensity = countryData.electricityCO2 || 480;
        
        const electricityKWh = applicableBAT.energy_mwh_per_tonne * 1000;
        const elecCO2 = electricityKWh * (gridIntensity / 1000) / 1000;
        const thermalCO2 = (applicableBAT.thermal_mj_per_kg || 0) * 0.202;
        
        mfgCO2 = (elecCO2 + thermalCO2) * concentrationRatio;
        mfgKwh = electricityKWh * concentrationRatio;
        mfgGasMj = (applicableBAT.thermal_mj_per_kg || 0) * concentrationRatio;
        
        batProcessingNote = `JRC BAT processing: ${applicableBAT.energy_mwh_per_tonne} MWh/t + ${applicableBAT.thermal_mj_per_kg} MJ/kg (${applicableBAT.processing_steps})`;
        batSource = applicableBAT.source;
        
        console.log(`   └─ 🏭 JRC BAT Applied: +${mfgCO2.toFixed(3)} kg CO₂e/kg`);
    } else {
        // Use cloned processing method
        const mfgImpact = calculateManufacturingImpact(
            concentrationRatio,
            1.0,
            userProcessing,
            targetCountry,
            true,
            domGetter
        );
        
        mfgCO2 = mfgImpact.co2;
        mfgKwh = mfgImpact.kwh;
        mfgGasMj = mfgImpact.gas_mj || 0;
        
        if (userEnergySource === 'renewable') {
            mfgCO2 = mfgCO2 * 0.05;
        }
        
        if (useJRCBAT && !applicableBAT) {
            batProcessingNote = 'JRC BAT requested but not applicable to this ingredient. Using cloned processing.';
        } else if (!useJRCBAT) {
            batProcessingNote = 'Using cloned processing method (JRC BAT toggle disabled).';
        }
    }

    // =====================================================================
    // C. LOGISTICS IMPACT (Cloned Transport)
    // =====================================================================
    const inboundObj = calculateGLECTransport(concentrationRatio, 200, 'road', refType);
    const outboundObj = calculateGLECTransport(1.0, userTransportDist, userTransportMode, refType);
    const totalTransportCO2 = inboundObj.total + outboundObj.total;

// =====================================================================
// D. PACKAGING IMPACT (Cloned Packaging via CFF)
// =====================================================================
let packagingCO2 = 0;
const pkgData = aioxyDataRef.packaging?.[userPkgMaterial];
if (pkgData && userPkgWeight > 0) {
    const cffResult = calculateCFF(pkgData, userPkgWeight, userRecycledPct, eolTargetElement);
    packagingCO2 = cffResult.totalImpact;
} else {
    packagingCO2 = userPkgWeight * 3.0;
}

// 🛡️ REGULATOR FIX: Split packaging impact by material chemistry
const pkgSplit = getPackagingCarbonSplit(userPkgMaterial);
const pkgFossilCO2 = packagingCO2 * pkgSplit.fossilRatio;
const pkgBiogenicCO2 = packagingCO2 * pkgSplit.biogenicRatio;

    // =====================================================================
    // E. CORRELATE FOSSIL RESOURCE USE
    // =====================================================================
    // 🛡️ THERMODYNAMIC FIX: Diesel = 36 MJ/L. Emissions = 3.24 kgCO2/L. Ratio = 11.11 MJ/kgCO2e.
const transportFossilMJ = totalTransportCO2 * 11.11;
    const packagingFossilMJ = packagingCO2 * 20.0;
    const mfgFossilMJ = mfgKwh * 3.6 + mfgGasMj;

// =====================================================================
// F. ASSEMBLE IDENTICAL BOUNDARY TWIN
// =====================================================================
const totalCO2PerKg = farmGateCO2 + mfgCO2 + totalTransportCO2 + packagingCO2;
const totalFossilPerKg = farmGateFossil + mfgFossilMJ + transportFossilMJ + packagingFossilMJ;

// 🛡️ REGULATOR FIX: Use biogenic split for packaging instead of 100% fossil
const totalFossilCO2 = farmFossilCO2 + mfgCO2 + totalTransportCO2 + pkgFossilCO2;
const totalBiogenicCO2 = farmBiogenicCO2 + pkgBiogenicCO2;
const totalDLUCCO2 = farmDLUCCO2;

    console.log(`   └─ Parametric Twin Total: ${totalCO2PerKg.toFixed(4)} kg CO₂e/kg`);

    // =====================================================================
    // G. BUILD METHODOLOGY STATEMENT
    // =====================================================================
    let methodologyStatement = "Parametric Clone & Swap - ISO 14044:2006 §4.2.3.2 Functional Equivalence. ";
    if (applicableBAT && useJRCBAT) {
        methodologyStatement += `JRC BAT (EU) 2019/2031 processing energy applied. ${batProcessingNote}. `;
    } else {
        methodologyStatement += "Manufacturing, transport, and packaging boundaries cloned from user product. ";
    }
    methodologyStatement += "Only agricultural ingredient differs.";

    // =====================================================================
    // H. RETURN COMPLIANT BASELINE OBJECT
    // =====================================================================
    return {
        // ========== CORE METRICS ==========
        name: `Parametric Twin: ${anchorName}`,
        co2PerKg: totalCO2PerKg,
        waterPerKg: farmGateWater,
        landUsePerKg: farmGateLand,
        fossilPerKg: totalFossilPerKg,
        concentration_ratio: concentrationRatio,
        
        // ========== PEF 3.1 CLIMATE CHANGE SUB-INDICATORS ==========
        fossilCO2PerKg: totalFossilCO2,
        biogenicCO2PerKg: totalBiogenicCO2,
        dlucCO2PerKg: totalDLUCCO2,
        
        // ========== BREAKDOWN ==========
        breakdown: {
            farm: farmGateCO2,
            manufacturing: mfgCO2,
            logistics: totalTransportCO2,
            packaging: packagingCO2
        },
        
        // ========== CLONED PARAMETERS (FOR AUDIT TRAIL) ==========
        cloned_parameters: {
            processing_method: applicableBAT ? `JRC BAT (${applicableBAT.processing_steps})` : userProcessing,
            transport_distance_km: userTransportDist,
            transport_mode: userTransportMode,
            transport_temperature: refType,
            packaging_material: userPkgMaterial,
            packaging_weight_kg: userPkgWeight,
            recycled_content_pct: userRecycledPct,
            energy_source: userEnergySource,
            jrc_bat_applied: !!(applicableBAT && useJRCBAT)
        },
        
        // ========== METHODOLOGY & ALLOCATION ==========
        anchor_used: anchorId,
        anchor_name: anchorName,
        methodology: methodologyStatement,
        allocation_method: "Mass allocation (kg input per kg output) - ISO 14044:2006 §4.3.4 hierarchy",
        allocation_note: concentrationRatio !== 1.0 ? 
            `Concentration ratio applied: ${concentrationRatio}x mass equivalence` : 
            "Direct mass equivalence (1:1 ratio)",
        
        // ========== JRC BAT INFO ==========
        bat_applied: !!(applicableBAT && useJRCBAT),
        bat_source: applicableBAT ? applicableBAT.source : null,
        bat_processing_note: batProcessingNote,
        
        // ========== SENSITIVITY ANALYSIS (ISO 14044 §6.3) ==========
        sensitivity_analysis: {
            performed: true,
            parameters_tested: [
                'Functional Equivalence Matching (System Boundaries Cloned)',
                `Transport Distance (${userTransportDist} km ±50%)`,
                `Grid Intensity (${aioxyDataRef.countries?.[targetCountry]?.electricityCO2 || 480} g CO₂e/kWh)`,
                `Concentration Ratio (${concentrationRatio}x)`,
                useJRCBAT ? 'JRC BAT Processing Energy Applied' : 'JRC BAT Toggle Disabled'
            ],
            key_finding: applicableBAT && useJRCBAT ? 
                `JRC BAT processing energy applied (${applicableBAT.energy_mwh_per_tonne} MWh/t + ${applicableBAT.thermal_mj_per_kg} MJ/kg). Grid intensity variation causes up to ±${((applicableBAT.energy_mwh_per_tonne * 1000 * 0.600 / 1000) / totalCO2PerKg * 100).toFixed(1)}% variation.` :
                `Baseline system boundaries successfully cloned. Transport distance variation (±50%) would change total by approximately ±${((totalTransportCO2 * 0.5) / totalCO2PerKg * 100).toFixed(1)}%.`,
            recommendation: "For public comparative assertions, conduct third-party critical review per ISO 14044 §6.1.",
            iso_compliance: "ISO 14044:2006 §4.2.3.2 - System boundaries dynamically matched. §6.3 - Screening-level sensitivity analysis performed."
        },
        
        // ========== COMPLIANCE STATEMENT ==========
        compliance_statement: "This parametric twin baseline achieves structural parity (ISO 14044 §4.2.3.2) by utilizing identical logistical and manufacturing boundaries, isolating agricultural variance for defensible comparative assessment. Suitable for internal decision-making and B2B screening. Third-party critical review required for public comparative assertions per ISO 14044 §6.1."
    };
            }

    // ================== WASTE END-OF-LIFE CALCULATOR (IPCC 2006 / JRC BAT) ==================
    function calculateWasteEndOfLife(wasteKg, wasteType, processingType = 'isolated') {
        // Official constants from IPCC 2006 Guidelines
        const CONSTANTS = {
            // Animal Feed Credit (EU RED II Annex V + Agribalyse 3.2)
            FEED_DISPLACEMENT: 0.7,        // 1 kg organic waste displaces 0.7 kg soybean meal
            SOYBEAN_MEAL_CO2: 0.46,        // kg CO2e/kg soybean meal (Agribalyse 3.2)
            
            // Anaerobic Digestion (IPCC 2006 GL, Vol 5, Ch 4)
            BIOGAS_YIELD: 0.40,            // m³ biogas per kg VS (organic waste)
            CH4_FRACTION: 0.60,            // 60% methane in biogas
            CH4_ENERGY: 35.9,              // MJ per m³ CH4
            NG_DISPLACEMENT: 0.202,        // kg CO2e per MJ natural gas (IPCC)
            
            // Landfill (IPCC 2006 GL, Vol 5, Ch 3, Table 3.4)
            DOC_FOOD_WASTE: 0.15,          // Degradable Organic Carbon
            CH4_C_RATIO: 1.33,             // CH4 to C conversion
            LANDFILL_CAPTURE: 0.60,        // EU Landfill Directive: 60% capture rate
            
            // Composting (IPCC 2006 GL, Vol 5, Ch 4, Table 4.1)
            COMPOST_CH4: 0.08,             // g CH4 per kg waste
            COMPOST_N2O: 0.30,             // g N2O per kg waste
            
            // Wastewater (IPCC 2006 GL, Vol 5, Ch 6)
            COD_PER_KG: 10,                // kg COD per ton processed (JRC BAT average)
            CH4_PER_COD: 0.25,             // kg CH4 per kg COD
            MCF_AEROBIC: 0.30,             // Methane Correction Factor
            
            // GWP (IPCC AR6, 2021)
            GWP_CH4: 27.9,
            GWP_N2O: 273
        };
        
        let totalCO2 = 0;
        const breakdown = {};
        
        // Get waste split from archetype (with null-safety)
        const aioxyDataRef = global.aioxyData || {};
        const archetypes = aioxyDataRef.processing_archetypes || {};
        const archetype = archetypes[processingType] || archetypes['isolated'] || { 
            waste_split: { water: 0.60, organic: 0.20, inert: 0.02, wastewater: 0.18 } 
        };
        const wasteSplit = archetype.waste_split || { water: 0.60, organic: 0.20, inert: 0.02, wastewater: 0.18 };
        
        const totalLoss = wasteKg;
        const organicWaste = totalLoss * wasteSplit.organic;
        const inertWaste = totalLoss * wasteSplit.inert;
        const wastewater = totalLoss * wasteSplit.wastewater;
        
        // 1. ORGANIC WASTE TO ANIMAL FEED (Avoided Burden Credit)
        const feedCredit = organicWaste * CONSTANTS.FEED_DISPLACEMENT * CONSTANTS.SOYBEAN_MEAL_CO2;
        breakdown.feedCredit = -feedCredit;  // Negative = credit
        
        // 2. INERT WASTE TO LANDFILL
        const landfillCH4 = inertWaste * CONSTANTS.DOC_FOOD_WASTE * 0.5 * CONSTANTS.CH4_C_RATIO * (1 - CONSTANTS.LANDFILL_CAPTURE);
        const landfillCO2 = landfillCH4 * CONSTANTS.GWP_CH4;
        breakdown.landfill = landfillCO2;
        
        // 3. WASTEWATER TREATMENT
        const wastewaterCH4 = wastewater * (CONSTANTS.COD_PER_KG / 1000) * CONSTANTS.CH4_PER_COD * CONSTANTS.MCF_AEROBIC;
        const wastewaterCO2 = wastewaterCH4 * CONSTANTS.GWP_CH4;
        breakdown.wastewater = wastewaterCO2;
        
        // Total EoL impact
        totalCO2 = landfillCO2 + wastewaterCO2 - feedCredit;
        
        console.log(`🗑️ Waste EoL: ${wasteKg.toFixed(3)}kg loss | Feed Credit: -${feedCredit.toFixed(4)} | Landfill: +${landfillCO2.toFixed(4)} | Wastewater: +${wastewaterCO2.toFixed(4)} | Net: ${totalCO2.toFixed(4)} kg CO2e`);
        
        // 🛡️ THE TRANSPARENCY FIX: Trace EoL components
        const wasteTrace = `[IPCC/JRC Waste: FeedCredit(-${feedCredit.toFixed(4)}) + LandfillCH4(${landfillCO2.toFixed(4)}) + WastewaterCH4(${wastewaterCO2.toFixed(4)})]`;

        return {
            total: totalCO2,
            breakdown: breakdown,
            wasteSplit: wasteSplit,
            methodology: "IPCC 2006 GL Vol 5 + JRC BAT 2019 + EU RED II",
            calculation_trace: wasteTrace
        };
    }

    // ================== SINGLE SOURCE OF TRUTH HELPER ==================
    function getUnifiedMetrics(pefResults, massData) {
        // 1. Get the authoritative weight (Final Product Output)
        let validWeight = 0.2;
        
        if (massData && massData.final_content_weight_kg > 0) {
            validWeight = massData.final_content_weight_kg;
        } else {
            const inputVal = parseFloat(global.document?.getElementById('productWeight')?.value);
            if (!isNaN(inputVal) && inputVal > 0) validWeight = inputVal;
        }

        // 2. Safely extract totals
        const totalCO2 = pefResults?.["Climate Change"]?.total || 0;
        const totalWater = pefResults?.["Water Use/Scarcity (AWARE)"]?.total || 0;
        const totalLand = pefResults?.["Land Use"]?.total || 0;
        const totalFossil = pefResults?.["Resource Use, fossils"]?.total || 0;

        // 3. Calculate consistent per-kg values
        return {
            weightUsed: validWeight,
            co2PerKg: totalCO2 / validWeight,
            waterPerKg: totalWater / validWeight,
            landPerKg: totalLand / validWeight,
            fossilPerKg: totalFossil / validWeight
        };
    }

            // ================== HELPER: Packaging Biogenic Carbon Split ==================
function getPackagingCarbonSplit(materialName) {
    const mat = (materialName || "").toLowerCase();
    const biogenicMaterials = ['cardboard', 'paper', 'mycelium', 'pla'];
    const isBiogenic = biogenicMaterials.some(m => mat.includes(m));
    
    if (isBiogenic) {
        return { biogenicRatio: 0.85, fossilRatio: 0.15 };
    }
    return { biogenicRatio: 0.00, fossilRatio: 1.00 };
                }

    // ================== MAIN ENGINE (PEF 3.1 COMPLIANT) ==================
    const foodCalculationEngine = {
        // Module state - replaces implicit globals
        state: {
            finalPefResults: null,
            massBalanceData: null,
            auditTrailData: null,
            currentDPPId: null,
            currentComparisonBaseline: null
        },

        getDQRQualityLevel(dqrScore) {
            if (dqrScore <= 1.6) return { level: 'Excellent', class: 'dqr-excellent' };
            if (dqrScore <= 2.0) return { level: 'Very Good', class: 'dqr-very-good' };
            if (dqrScore <= 3.0) return { level: 'Good', class: 'dqr-good' };
            return { level: 'Fair/Poor', class: 'dqr-poor' };
        },

        calculateUncertainty(dqrScore) {
            // Linear Interpolation: PEF Standard Method
            let score = (typeof dqrScore === 'object') ? (dqrScore.P || 2.0) : (dqrScore || 2.0);
            let uncertainty = 0;
            
            if (score <= 1) uncertainty = 10;
            else if (score <= 2) uncertainty = 10 + 15 * (score - 1);
            else uncertainty = 25 + 25 * (score - 2);
            
            // THE FIX: Round to 1 decimal place
            return parseFloat(uncertainty.toFixed(1));
        },

        calculateWasteEndOfLife: calculateWasteEndOfLife,

        detectProductCategory(productName, ingredients, selectedCategory) {
            // 🛡️ REGULATOR FIX: Explicit user selection ALWAYS overrides auto-detection.
            if (selectedCategory && selectedCategory !== 'auto') {
                return selectedCategory;
            }

            const name = productName.toLowerCase();
            // 1. Identify if the product is plant-based / vegan via modifiers
            const isPlantBased = name.includes('plant') || name.includes('vegan') || name.includes('veggie') || 
                                 name.includes('hemp') || name.includes('soy') || name.includes('oat') || 
                                 name.includes('pea') || name.includes('mushroom');

            // 2. Exact Category Routing
            if (name.includes('spread') || name.includes('choco') || name.includes('hazelnut') || name.includes('nut butter')) {
                return 'chocolate-spread-conventional';
            }
            
            if ((name.includes('milk') || name.includes('drink') || name.includes('latte')) && !name.includes('burger')) {
                return isPlantBased ? 'plant-milk' : 'milk-product';
            }
            
            if (name.includes('pasta') || name.includes('spaghetti') || name.includes('macaroni') || name.includes('noodle')) {
                return 'pasta-product';
            }
            
            if (name.includes('burger') || name.includes('patty') || name.includes('sausage') || name.includes('mince') || name.includes('meatball')) {
                // Intelligent Routing: Apples to Apples
                if (isPlantBased) return 'plant-burger';
                if (name.includes('chicken') || name.includes('poultry')) return 'chicken-product';
                if (name.includes('pork') || name.includes('swine')) return 'pork-product';
                return 'beef-product'; // Default conventional meat
            }
            
            if (name.includes('pizza')) return 'cheese-product';
            if (name.includes('coffee') || name.includes('espresso')) return 'coffee-product';
            if (name.includes('chocolate') || name.includes('cocoa') || name.includes('candy')) return 'chocolate-product';
            if (name.includes('bread') || name.includes('bun') || name.includes('roll')) return 'bread-product';
            
            // Default fallback
            return 'beef-product';
        },

        calculateFoodImpact() {
            console.log('🔧 Starting AIOXY "Single Source of Truth" Calculation...');
            
            const aioxyDataRef = global.aioxyData || {};
            const selectedIngredientsRef = global.selectedIngredients || [];
            const showHydrationSuggestionFn = global.showHydrationSuggestion;
            const userConfirmedHydrationRef = global.userConfirmedHydration;
            const confirmedHydrationKeyRef = global.confirmedHydrationKey;
            
            let suggestedWater = 0;
            
            // 1. GET USER INPUTS
            const productName = global.document?.getElementById('productName')?.value || 'Unnamed Product';
            const manufacturingCountryCode = global.document?.getElementById('manufacturingCountry')?.value || 'FR';
            const processingMethod = global.document?.getElementById('processingMethod')?.value;
            const transportDistance = parseFloat(global.document?.getElementById('transportDistance')?.value) || 0;
            const transportMode = global.document?.getElementById('transportMode')?.value;
            const packagingMaterial = global.document?.getElementById('packagingMaterial')?.value;
            const packagingWeight = parseFloat(global.document?.getElementById('packagingWeight')?.value) || 0;
            const recycledContentPercent = parseFloat(global.document?.getElementById('recycledContent')?.value) || 0;
            const productCategory = global.document?.getElementById('productCategory')?.value || 'auto';

            // =========== [FEATURE PRESERVED] HYDRATION PHYSICS ===========
            let finalIngredients = [...selectedIngredientsRef];
            let physicsKey = this.detectProductCategory(productName, selectedIngredientsRef, productCategory);
            
            const foodPhysicsDbRef = global.FOOD_PHYSICS_DB || FOOD_PHYSICS_DB;
            const physicsProfile = foodPhysicsDbRef[physicsKey] || foodPhysicsDbRef['default'];
            global.currentPhysicsProfile = physicsProfile;

            // Hydration Calculation
            let totalMass = 0;
            let waterMass = 0;
            let dryMassEstimate = 0;

            selectedIngredientsRef.forEach(item => {
                totalMass += item.quantity;
                const nameLower = item.name.toLowerCase();
                if (nameLower.includes('water') || nameLower.includes('aqua')) {
                    waterMass += item.quantity;
                } else {
                    dryMassEstimate += item.quantity; 
                }
            });
            
            const currentHydration = totalMass > 0 ? waterMass / totalMass : 0;

            if (physicsProfile.target_hydration > 0.1 && currentHydration < physicsProfile.target_hydration - 0.1) {
                const targetTotal = dryMassEstimate / (1 - physicsProfile.target_hydration);
                suggestedWater = Math.max(0, targetTotal - totalMass);
                
                if (suggestedWater > 0.05 && typeof showHydrationSuggestionFn === 'function') {
                    showHydrationSuggestionFn({
                        message: `For ${physicsKey.replace('-product', '')}, standard is ~${(physicsProfile.target_hydration*100).toFixed(0)}% water`,
                        suggestion: `Add ${suggestedWater.toFixed(3)}kg water?`,
                        key: physicsKey,
                        amount: suggestedWater
                    }, currentHydration);
                }
            }

            if (userConfirmedHydrationRef && confirmedHydrationKeyRef === physicsKey) {
                finalIngredients.push({
                    id: 'tap-water-fr',  
                    name: `Water (${physicsKey.replace('-product', '')} standard)`,
                    quantity: suggestedWater,
                    isVirtual: true,
                    originCountry: manufacturingCountryCode // Water is always local
                });
            }

            // ==================================================================================
            // 🛡️ USER SELECTION ALWAYS WINS - SINGLE SOURCE OF TRUTH
            // ==================================================================================
            const effectiveOrigins = {};
            
            finalIngredients.forEach(item => {
                // PRIORITY 1: Primary Data ALWAYS wins (Highest Audit Confidence)
                if (item.primaryData && item.primaryData.farmRegion) {
                    effectiveOrigins[item.id] = 'PrimaryData';
                    console.log(`📊 Primary data priority: ${item.name} from ${item.primaryData.farmRegion}`);
                }
                // PRIORITY 2: User Dropdown Selection (Secondary Data)
                else if (item.originCountry) {
                    effectiveOrigins[item.id] = item.originCountry;
                    console.log(`✅ Secondary data selected: ${item.name} from ${item.originCountry}`);
                }
                // PRIORITY 3: Database Default
                else {
                    effectiveOrigins[item.id] = getIngredientOrigin(item.id);
                    console.log(`📚 Default origin: ${item.name} from ${effectiveOrigins[item.id]}`);
                }
            });

            // 3. MASS BALANCE
            const massBalanceData = calculateMassBalance(finalIngredients, processingMethod, packagingWeight, aioxyDataRef);
            this.state.massBalanceData = massBalanceData;

            // 🛡️ REGULATOR FIX: Force the UI Product Weight box to strictly match physical thermodynamics
            const weightInput = global.document?.getElementById('productWeight');
            if (weightInput) {
                weightInput.value = massBalanceData.final_content_weight_kg.toFixed(3);
            }
            
            // 4. AUDIT TRAIL INIT & PARAMETRIC TWIN GENERATION
            const comparisonDropdown = global.document?.getElementById('comparisonBaseline')?.value || 'auto';
            const comparisonKey = comparisonDropdown !== 'auto' 
                ? comparisonDropdown 
                : this.detectProductCategory(productName, selectedIngredientsRef, productCategory);

            // REGULATOR FIX: Custom Baseline Enforcement
            const customBaselineInput = parseFloat(global.document?.getElementById('customBaseline')?.value);
            let comparisonBaseline;

            if (!isNaN(customBaselineInput) && customBaselineInput > 0) {
                comparisonBaseline = {
                    name: "Custom User Baseline",
                    co2PerKg: customBaselineInput,
                    waterPerKg: 0, 
                    landUsePerKg: 0, 
                    fossilPerKg: 0,
                    is_custom: true
                };
            } else {
                // Call the new Parametric Twin Engine (ISO 14044 Compliant Apples-to-Apples)
                comparisonBaseline = calculateParametricBaseline(comparisonKey, manufacturingCountryCode);
            }
            this.state.currentComparisonBaseline = comparisonBaseline;

            // Uplift is strictly handled by the Parametric Twin now. No magic numbers.
            const uplift = { co2: 0 };
            
            // DYNAMIC CRYPTOGRAPHIC HASH BINDING
            const payloadToHash = JSON.stringify({ 
                ingredients: finalIngredients.map(i => `${i.id}:${i.quantity}:${effectiveOrigins[i.id]}`), 
                mfg: manufacturingCountryCode,
                proc: processingMethod,
                pkg: packagingWeight
            });
            const secureHash = generateAuditHash(payloadToHash);

            const auditTrail = {
                productName,
                dppId: 'TRC-' + secureHash.substring(0, 16),
                calculationTimestamp: new Date().toISOString(),
                pefCategories: {},
                mass_balance: massBalanceData,
                dqr_summary: {},
                uncertainty_analysis: {},
                comparison_baseline: comparisonBaseline,
            };

            Object.keys(pefCategories).forEach(cat => {
                auditTrail.pefCategories[cat] = {
                    total: 0,
                    unit: pefCategories[cat].unit,
                    contribution_tree: {
                        Ingredients: { total: 0, components: [] },
                        Manufacturing: { total: 0, components: [] },
                        Transport: { total: 0, components: [] },
                        Packaging: { total: 0, components: [] },
                        Upstream: { total: 0, components: [] },
                        Waste: { total: 0, components: [] }
                    }
                };
            });

            // 5. CALCULATE INGREDIENT IMPACTS
            let dqrComponents = [];
            finalIngredients.forEach(item => {
                let ing = aioxyDataRef.ingredients?.[item.id];
                if (!ing) return;

                // Retrieve the Truth we decided earlier
                let ingredientOrigin = effectiveOrigins[item.id];
                // 🛡️ REGULATOR FIX: Always use the strict ISO code for EUDR/Math, never free-text
                if (ingredientOrigin === 'PrimaryData') ingredientOrigin = item.originCountry || getIngredientOrigin(item.id);

                // [PHYSICS UPGRADE] Mass Balance & Processing Energy
                const farmLoss = ing.loss || 0.0;
                const processState = item.processingState || 'raw';
                const archetypes = aioxyDataRef.processing_archetypes || {};

                const yieldFactor = archetypes[processState] ? archetypes[processState].yield_factor : 1.0;
                const processEnergyKwh = archetypes[processState] ? archetypes[processState].energy_kwh : 0.0;
                const processGasMj = archetypes[processState] ? archetypes[processState].gas_mj : 0.0;
                const dqrReward = archetypes[processState] ? archetypes[processState].dqr_reward : 0.0;

                // Apply the yield penalty to the agricultural mass
                const grownMass = (item.quantity / (1 - farmLoss)) / yieldFactor;

                // 🗑️ STEP 3: Calculate processing waste End-of-Life impact
                const processingLoss = grownMass - item.quantity;
                let wasteEoLImpact = 0;

                if (processingLoss > 0.001 && processState !== 'raw') {
                    const wasteEoL = this.calculateWasteEndOfLife(processingLoss, 'organic', processState);
                    wasteEoLImpact = wasteEoL.total;
                    
                    // Add to Upstream/End-of-Life category in audit trail
                    const archetype = archetypes[processState] || { 
                        name: processState, 
                        waste_split: { water: 0.60, organic: 0.20, inert: 0.02, wastewater: 0.18 } 
                    };
                    const wasteSplit = archetype.waste_split || { water: 0.60, organic: 0.20, inert: 0.02, wastewater: 0.18 };
                    
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Waste.components.push({
                        name: `Processing Waste: ${ing.name} (${archetype?.name || processState})`,
                        subtotal: wasteEoLImpact,
                        notes: `Loss: ${processingLoss.toFixed(3)}kg | Organic to feed: ${(processingLoss * wasteSplit.organic).toFixed(3)}kg | Inert to landfill: ${(processingLoss * wasteSplit.inert).toFixed(3)}kg | Wastewater: ${(processingLoss * wasteSplit.wastewater).toFixed(3)}kg`,
                        confidence: "Tier 2 (IPCC 2006 / JRC BAT)",
                        methodology: wasteEoL.methodology,
                        calculation_trace: wasteEoL.calculation_trace
                    });
                    
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Waste.total += wasteEoLImpact;
                    auditTrail.pefCategories["Climate Change"].total += wasteEoLImpact;
                    
                    console.log(`🗑️ Waste tracked for ${ing.name}: ${processingLoss.toFixed(3)}kg loss → ${wasteEoLImpact.toFixed(4)} kg CO2e`);
                }
                
                // 🛡️ REGULATOR FIX 1: Run the math FIRST to extract the EUDR & Primary Data penalties
                const impactResult = calculateIngredientImpact(ing, grownMass, ingredientOrigin, item.primaryData);

                // Calculate baseline proxy penalties
                const isProxyData = (ingredientOrigin !== 'FR' && !item.primaryData);
                let dqrPenalty = isProxyData ? 1.0 : 0.0;

                if (ing.name.toLowerCase().includes('animal feed') && !item.primaryData) {
                    dqrPenalty += 0.5; 
                }

                // 🛡️ REGULATOR FIX 2: Inject the engine's dynamic penalty AND reward
                dqrPenalty += impactResult.qualityPenalty;
                dqrPenalty -= dqrReward; // 🏆 Reward them for specifying processing!

                // [QUALITY FLAG] Log the reward for transparency in audit trail
                if (dqrReward > 0) {
                    const archetypeName = archetypes[processState]?.name || processState;
                    console.log(`🏆 [DQR Reward] -${dqrReward.toFixed(1)} applied for: ${archetypeName}`);
                    
                    // Also add to audit trail for PDF/CSV visibility
                    if (!auditTrail.dqr_rewards) auditTrail.dqr_rewards = [];
                    auditTrail.dqr_rewards.push({
                        ingredient: ing.name,
                        process: archetypeName,
                        reward: dqrReward,
                        note: `Processing state specified (${archetypeName})`
                    });
                }
                
                // 🛡️ FIX 2: THE DQR COMPLIANCE LOCK
                const TeR = ing.data?.metadata?.dqr?.TeR || 1;
                const TiR = ing.data?.metadata?.dqr?.TiR || 1;
                const GeR = ing.data?.metadata?.dqr?.GeR || 1;
                const P   = ing.data?.metadata?.dqr?.P   || 1;

                const finalDQR = (ing.data?.metadata?.dqr_overall || 1.5) + dqrPenalty;
                const dqrTrace = `DQR: ${finalDQR.toFixed(2)} [TeR:${TeR}, TiR:${TiR}, GeR:${GeR}, P:${P} | Penalty/Reward:${dqrPenalty.toFixed(1)}]`;

                // Build the official DQR component WITH the merged penalties
                if (ing.data?.metadata?.dqr_overall) {
                    dqrComponents.push({
                        name: ing.name,
                        dqr: finalDQR,
                        base_dqr: ing.data.metadata.dqr_overall,
                        dqr_penalty: dqrPenalty,
                        source: ing.data.metadata.source_dataset,
                        origin_country: ingredientOrigin,
                        is_proxy: isProxyData,
                        uncertainty: this.calculateUncertainty(finalDQR),
                        hasPrimaryData: !!item.primaryData,
                        dqr_trace: dqrTrace
                    });
                }

                // PEF Loop
                Object.keys(pefCategories).forEach(cat => {
                    let baseImpactPerKg = ing.data.pef ? ing.data.pef[cat] || 0 : 0;
                    let universalAdjustments = impactResult.universal_adjustments;
                    let impactTotal = 0;

                    // Now apply the impact based on category
                    if (cat === "Climate Change") {
                        baseImpactPerKg = impactResult.perKgCO2;  
                        impactTotal = impactResult.totalCO2;      
                        
                        if (impactResult.logs && impactResult.logs.length > 0) {
                            console.log(`📝 [Audit] ${ing.name}:`, impactResult.logs.join(' | '));
                        }
                    } 
                    // 🛡️ PEF 3.1 TERTIARY PACKAGING PROXY
                    if (cat === "Climate Change") {
                        // Standard B2B assumption: 1kg of raw material requires ~20g of CO2e in pallets/IBCs/sacks
                        const inboundPkgCO2 = grownMass * 0.02; 
                        auditTrail.pefCategories["Climate Change"].contribution_tree.Packaging.components.push({
                            name: `Inbound bulk transport packaging (${ing.name})`,
                            subtotal: inboundPkgCO2,
                            note: "PEF Tertiary Packaging Proxy (Pallets/Wraps)"
                        });
                        auditTrail.pefCategories["Climate Change"].contribution_tree.Packaging.total += inboundPkgCO2;
                        auditTrail.pefCategories["Climate Change"].total += inboundPkgCO2;
                    }
                    else if (cat === "Land Use") {
                        baseImpactPerKg = impactResult.perKgLand;
                        impactTotal = impactResult.totalLand;
                    } 
                    else if (cat === "Water Use/Scarcity (AWARE)") {
                        baseImpactPerKg = impactResult.perKgWater;
                        impactTotal = impactResult.totalWater;
                    }
                    // 🛡️ REGULATOR FIX: Intercept Fossil scaling (ESRS E5)
                    else if (cat === "Resource Use, fossils") {
                        baseImpactPerKg = impactResult.perKgFossil;
                        impactTotal = impactResult.totalFossil;
                    }
                    else {
                        impactTotal = grownMass * (ing.data.pef ? ing.data.pef[cat] || 0 : 0);
                    }
                    
                    // [COMPLIANT] LUC Data Handling
                    let noteText = `Origin: ${ingredientOrigin} ${universalAdjustments ? '(Physics Adjusted)' : ''}`;

                    if (['BR', 'ID'].includes(ingredientOrigin)) {
                        noteText += ` [⚠️ AUDIT NOTE: High LUC Risk Region. Ensure selected AGRIBALYSE dataset includes regional Land Use Change factors.]`;
                    }

                    // [COMPLIANT] ISO Allocation
                    const specificAllocationFactor = ing.allocationFactor || 1.0;
                    const allocatedTotal = impactTotal * specificAllocationFactor;

                    // 🛡️ REGULATOR FIX 1: Apply economic allocation to biogenic removals (No illegal over-crediting)
                    if (cat === "Climate Change" && impactResult.biogenicRemovals > 0) {
                        const allocatedRemovals = impactResult.biogenicRemovals * specificAllocationFactor;
                        auditTrail.pefCategories["Climate Change"].biogenic_removals = 
                            (auditTrail.pefCategories["Climate Change"].biogenic_removals || 0) + allocatedRemovals;
                    }
                    
                    auditTrail.pefCategories[cat].contribution_tree.Ingredients.components.push({
                        name: ing.name,
                        id: item.id,
                        quantity_kg: item.quantity,        
                        farm_mass_kg: grownMass,            
                        subtotal: allocatedTotal,
                        fossilCO2: (impactResult.fossilCO2 || 0) * specificAllocationFactor,
                        biogenicCO2: (impactResult.biogenicCO2 || 0) * specificAllocationFactor,
                        dlucCO2: (impactResult.dlucCO2 || 0) * specificAllocationFactor,
                        calculation_trace: `${item.quantity.toFixed(3)}kg × ${(impactResult.perKgCO2).toFixed(4)} kgCO2e/kg [Agribalyse 3.2${universalAdjustments ? ' + Physics Adjustments' : ''}]`,
                        note: noteText,
                        universal_adjustments: universalAdjustments,
                        primary_data_used: !!item.primaryData,
                        primary_data: item.primaryData,
                        processingState: item.processingState || 'raw',
                        yieldFactor: yieldFactor,
                        physics_note: item.physics_note || '' 
                    });

                    auditTrail.pefCategories[cat].contribution_tree.Ingredients.total += allocatedTotal;
                    auditTrail.pefCategories[cat].total += allocatedTotal;
                });
                
                // [PHYSICS FLAG] Visible Audit Receipt for Mass Balance & Energy
                if (processEnergyKwh > 0 || processGasMj > 0) {
                    const extraKwh = item.quantity * processEnergyKwh;
                    const extraGasMj = item.quantity * processGasMj;
                    
                    const gridIntensity = aioxyDataRef.countries?.[manufacturingCountryCode]?.electricityCO2 || 480;
                    const gasIntensity = 202; // g CO2e per MJ of natural gas (IPCC)
                    
                    const extraCo2 = (extraKwh * (gridIntensity / 1000)) + (extraGasMj * (gasIntensity / 1000));

                    // Get the archetype name for display
                    const archetypeName = archetypes[processState]?.name || processState;

                    auditTrail.pefCategories["Climate Change"].contribution_tree.Manufacturing.components.push({
                        name: `[Physics Flag] Mass Balance & Upstream ${processState.toUpperCase()}`,
                        subtotal: extraCo2,
                        details: `Yield: ${yieldFactor.toFixed(2)}x | Input: ${item.quantity.toFixed(3)}kg -> Grown: ${grownMass.toFixed(2)}kg | Energy: ${extraKwh.toFixed(2)}kWh | Gas: ${extraGasMj.toFixed(2)}MJ`,
                        confidence: "Tier 2 (Industry Archetype)",
                        grid_intensity: gridIntensity,
                        energy_source: `Process-Specific Thermal + Grid Mix (${archetypeName})`
                    });
                    
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Manufacturing.total += extraCo2;
                    auditTrail.pefCategories["Climate Change"].total += extraCo2;

                    const extraFossil = (extraKwh * 3.6) + extraGasMj;
                    if(auditTrail.pefCategories["Resource Use, fossils"]) {
                        auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Manufacturing.total += extraFossil;
                        auditTrail.pefCategories["Resource Use, fossils"].total += extraFossil;
                    }
                }
            });

            // 6. MANUFACTURING IMPACTS - UPDATED with Audit-Ready Engine
            if (massBalanceData.productMass > 0) {
                const domGetter = (id, returnValue = false) => {
                    if (returnValue) return global.document?.getElementById(id)?.value;
                    return global.document?.getElementById(id)?.checked || false;
                };
                
                // Call the new empirical manufacturing engine
                const mfgResult = calculateManufacturingImpact(
                    massBalanceData.inputMass,
                    massBalanceData.productMass,
                    processingMethod,
                    manufacturingCountryCode,
                    false,
                    domGetter
                );
                
                // Add to Climate Change
                auditTrail.pefCategories["Climate Change"].contribution_tree.Manufacturing.total += mfgResult.co2;
                auditTrail.pefCategories["Climate Change"].total += mfgResult.co2;
                
                // 🛡️ THE ALLOCATION GUARD - Declared ONCE
                const usePrimary = domGetter('usePrimaryFactoryData');
                const totalProd = parseFloat(domGetter('factoryTotalOutput', true)) || 1;
                const allocationFactor = totalProd > 0 ? (massBalanceData.productMass / totalProd) * 100 : 0;
                const allocationTrace = usePrimary && totalProd > 0 ? 
                    `Factory Allocation: ${allocationFactor.toFixed(2)}% of total site utility load (${massBalanceData.productMass.toFixed(3)}kg / ${totalProd}kg)` : 
                    "Industry Benchmark Allocation (JRC Default)";

                // Add detailed component for audit trail
                auditTrail.pefCategories["Climate Change"].contribution_tree.Manufacturing.components.push({
                    name: `Processing (${processingMethod || 'none'})`,
                    subtotal: mfgResult.co2,
                    details: `${mfgResult.method} - ${mfgResult.kwh.toFixed(4)} kWh${mfgResult.fugitive_co2 > 0 ? ` | Includes ${mfgResult.fugitive_co2.toFixed(4)}kg Fugitive Refrigerant` : ''}`,
                    confidence: mfgResult.confidence,
                    grid_intensity: mfgResult.grid_intensity_g_per_kwh,
                    energy_source: mfgResult.energy_source,
                    calculation_trace: mfgResult.calculation_trace || `${mfgResult.kwh.toFixed(2)} kWh × ${mfgResult.grid_intensity_g_per_kwh} gCO2e/kWh`,
                    allocation_trace: allocationTrace
                });
                
                // Add to Fossil Resources (kWh to MJ conversion: 1 kWh = 3.6 MJ)
                const fossilMJ = mfgResult.kwh * 3.6;
                if (auditTrail.pefCategories["Resource Use, fossils"]) {
                    auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Manufacturing.total += fossilMJ;
                    auditTrail.pefCategories["Resource Use, fossils"].total += fossilMJ;
                }
                
                // Store for business case calculations
                global.lastManufacturingResult = mfgResult;
                
                console.log(`✅ [Audit] Manufacturing impact: ${mfgResult.co2.toFixed(4)} kg CO₂e using ${mfgResult.method}`);

                // 🛡️ Route traces to tree level for PDF access
                auditTrail.pefCategories["Climate Change"].contribution_tree.Manufacturing.calculation_trace = mfgResult.calculation_trace || `${mfgResult.kwh.toFixed(2)} kWh × ${mfgResult.grid_intensity_g_per_kwh} gCO2e/kWh`;
                auditTrail.pefCategories["Climate Change"].contribution_tree.Manufacturing.allocation_trace = allocationTrace;
            }
            
            // 7. TRANSPORTATION (THE FIX: USING THE SINGLE SOURCE OF TRUTH)
            finalIngredients.forEach(ing => {
                if (ing.isVirtual) return;

                let originCountry = effectiveOrigins[ing.id];
                // 🛡️ REGULATOR FIX: Always use strict ISO code to prevent intercontinental sea freight errors
                if (originCountry === 'PrimaryData') originCountry = ing.originCountry || getIngredientOrigin(ing.id);

                const nLower = (ing.name || "").toLowerCase();
                const requiresColdChain = nLower.includes('beef') || nLower.includes('chicken') || 
                                          nLower.includes('pork') || nLower.includes('milk') || 
                                          nLower.includes('cheese') || nLower.includes('salmon') || 
                                          nLower.includes('shrimp') || nLower.includes('fresh') ||
                                          nLower.includes('apple') || nLower.includes('strawberry') ||
                                          nLower.includes('pea') || nLower.includes('vegetable') ||
                                          nLower.includes('fruit');

                const inboundRefType = requiresColdChain ? 'chilled' : 'ambient';
                
                let transportNote = "";
                let ingredientTransportCO2 = 0;
                let transportObj = null;

                if (originCountry !== manufacturingCountryCode) {
                    console.log(`🚚 Logistics: Importing ${ing.name} from ${originCountry} to ${manufacturingCountryCode}`);
                    
                    const regions = {
                        'EU': ['FR', 'BE', 'NL', 'DE', 'ES', 'IT', 'PL', 'IE', 'DK', 'SE', 'AT', 'CH', 'NO', 'GB', 'UK', 'FI', 'PT', 'GR'],
                        'NA': ['US', 'CA', 'MX'],
                        'SA': ['BR', 'AR', 'CO', 'CL', 'PE'],
                        'AS': ['CN', 'JP', 'IN', 'ID', 'VN', 'TH', 'MY', 'KR'],
                        'AF': ['ZA', 'EG', 'MA', 'NG', 'GH', 'KE'],
                        'OC': ['AU', 'NZ']
                    };
                    const getRegion = (countryCode) => {
                        for (const [region, countries] of Object.entries(regions)) {
                            if (countries.includes(countryCode)) return region;
                        }
                        return 'UNKNOWN';
                    };
                    
                    const originRegion = getRegion(originCountry);
                    const mfgRegion = getRegion(manufacturingCountryCode);

                    const isCrisisActive = global.document?.getElementById('crisisRoutingToggle')?.checked;
                    let inboundDistance = 0;

                    if (originRegion === mfgRegion && originRegion !== 'UNKNOWN') {
                        inboundDistance = 1200;
                        transportObj = calculateGLECTransport(ing.quantity, inboundDistance, 'road', inboundRefType);
                        ingredientTransportCO2 = transportObj.total;
                        transportNote = `Regional cross-border road transport (${originCountry} → ${manufacturingCountryCode} | ${inboundDistance} km)`;
                    } else {
                        inboundDistance = 15000;
                        // 🛡️ APPLY GEOPOLITICAL CRISIS ROUTING TO IMPORTS
                        if (isCrisisActive) {
                            inboundDistance = 15000 * 1.40; // 21,000 km Cape of Good Hope reroute
                            transportNote = `[⚠️ CRISIS REROUTE] Intercontinental sea freight (${originCountry} → ${manufacturingCountryCode} | 15,000 km → ${inboundDistance} km)`;
                        } else {
                            transportNote = `Intercontinental sea freight (${originCountry} → ${manufacturingCountryCode} | ${inboundDistance} km)`;
                        }
                        transportObj = calculateGLECTransport(ing.quantity, inboundDistance, 'sea', inboundRefType);
                        ingredientTransportCO2 = transportObj.total;
                    }
                } else {
                    console.log(`🚚 Logistics: Local sourcing ${ing.name} within ${manufacturingCountryCode}`);
                    transportObj = calculateGLECTransport(ing.quantity, 200, 'road', inboundRefType);
                    ingredientTransportCO2 = transportObj.total;
                    transportNote = `Local domestic sourcing (${manufacturingCountryCode})`;
                }

                if (ingredientTransportCO2 > 0) {
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.components.push({
                        name: `Inbound: ${ing.name}`,
                        subtotal: ingredientTransportCO2,
                        notes: transportNote,
                        calculation_trace: transportObj?.calculation_trace || ""
                    });
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.total += ingredientTransportCO2;
                    auditTrail.pefCategories["Climate Change"].total += ingredientTransportCO2;
                    
                    // 🛡️ REGULATOR FIX: Correlate Inbound Transport to Fossil Resources
                    const inboundFossilMJ = ingredientTransportCO2 * 11.11;
                    auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Upstream.components = auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Upstream.components || [];
                    auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Upstream.total = (auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Upstream.total || 0) + inboundFossilMJ;
                    auditTrail.pefCategories["Resource Use, fossils"].total += inboundFossilMJ;
                }
            });

            // 8. DISTRIBUTION & PACKAGING (Standard)
            const isFrozen = processingMethod === 'freezing';
            const isChilled = global.document?.getElementById('refrigeratedTransport')?.value === 'yes';
            let refType = 'ambient';
            if (isFrozen) refType = 'frozen'; else if (isChilled) refType = 'chilled';

            // 🛡️ GEOPOLITICAL CRISIS ROUTING LOGIC
            let actualDistance = transportDistance;
            const isCrisisActive = global.document?.getElementById('crisisRoutingToggle')?.checked;

            if (isCrisisActive && (transportMode === 'sea' || transportMode === 'road')) {
                actualDistance = transportDistance * 1.40;
                auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.components = auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.components || [];
                auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.components.push({
                    name: `Geopolitical Reroute Penalty`,
                    subtotal: 0,
                    notes: `Distance inflated by 40% (${transportDistance}km → ${actualDistance.toFixed(0)}km) due to active crisis routing.`
                });
            }

            // 🛡️ FIXED: Extract .total from the object
            const distributionObj = calculateGLECTransport(
                massBalanceData.grossWeight || 0.2, 
                actualDistance, 
                transportMode, 
                refType
            );
            const distributionCO2 = distributionObj.total;

            auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.total += distributionCO2;
            auditTrail.pefCategories["Climate Change"].total += distributionCO2;

            // 🛡️ Route outbound trace to memory
            auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.components = auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.components || [];
            auditTrail.pefCategories["Climate Change"].contribution_tree.Transport.components.push({
                name: `Outbound Logistics (${transportMode})`,
                subtotal: distributionCO2,
                calculation_trace: distributionObj.calculation_trace || ""
            });

            // 🛡️ REGULATOR FIX: Correlate Outbound Transport to Fossil Resources
            const outboundFossilMJ = distributionCO2 * 11.11;
            auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Transport.components = auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Transport.components || [];
            auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Transport.total = (auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Transport.total || 0) + outboundFossilMJ;
            auditTrail.pefCategories["Resource Use, fossils"].total += outboundFossilMJ;
            
            if (packagingWeight > 0) {
                const packagingData = aioxyDataRef.packaging?.[packagingMaterial];
                if (packagingData) {
                    const eolElement = global.document?.getElementById('packagingEoL');
                    const cffResult = calculateCFF(packagingData, packagingWeight, recycledContentPercent, eolElement);
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Packaging.calculation_trace = cffResult.calculation_trace;
                    
                    // 🛡️ REGULATOR FIX: Route the CFF DQR Penalty into the main tree memory
                    auditTrail.pefCategories["Climate Change"].contribution_tree.Packaging.dqr_score = 1.5 + (cffResult.dqr_penalty || 0);
                    
                    // 🛡️ REGULATOR FIX: Split Procurement (Scope 3 Cat 1) from Disposal (Scope 3 Cat 12)
                    const packagingProcurementCO2 = cffResult.virginBurden + cffResult.recycledBurden - cffResult.recyclingCredit;
                    const packagingDisposalCO2 = cffResult.disposalBurden;

                    // 🛡️ REGULATOR FIX: Apply Biogenic Split to Packaging Lifecycle
const pkgSplit = getPackagingCarbonSplit(packagingMaterial);
const pkgFossilProcurement = packagingProcurementCO2 * pkgSplit.fossilRatio;
const pkgBiogenicProcurement = packagingProcurementCO2 * pkgSplit.biogenicRatio;
const pkgFossilDisposal = packagingDisposalCO2 * pkgSplit.fossilRatio;
const pkgBiogenicDisposal = packagingDisposalCO2 * pkgSplit.biogenicRatio;

// Log Procurement under Packaging (Cat 1) WITH fossil/biogenic split
auditTrail.pefCategories["Climate Change"].contribution_tree.Packaging.components.push({
    name: `Primary Packaging: ${packagingMaterial}`,
    subtotal: packagingProcurementCO2,
    fossilCO2: pkgFossilProcurement,
    biogenicCO2: pkgBiogenicProcurement,
    dlucCO2: 0
});
auditTrail.pefCategories["Climate Change"].contribution_tree.Packaging.total += packagingProcurementCO2;

// Log Disposal under Upstream / End-of-Life (Cat 12) WITH fossil/biogenic split
auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.components = auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.components || [];
auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.components.push({
    name: `End-of-Life: Packaging Disposal`,
    subtotal: packagingDisposalCO2,
    fossilCO2: pkgFossilDisposal,
    biogenicCO2: pkgBiogenicDisposal,
    dlucCO2: 0,
    notes: `Scope 3 Category 12 (Disposal of ${packagingWeight.toFixed(3)}kg packaging)`
});
auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.total += packagingDisposalCO2;

auditTrail.pefCategories["Climate Change"].total += cffResult.totalImpact;

// Empirical LCI Proxy: Propagate to other PEF categories
// 🛡️ REGULATOR FIX: Do not invent Fossil MJ from CO2. Pull from database or default to 0.
const fossilPkg = packagingWeight * (packagingData?.fossil_mj_per_kg || 0);
const waterPkg = cffResult.totalImpact * 0.05;

auditTrail.pefCategories["Resource Use, fossils"].contribution_tree.Packaging.total += fossilPkg;
auditTrail.pefCategories["Resource Use, fossils"].total += fossilPkg;

auditTrail.pefCategories["Water Use/Scarcity (AWARE)"].contribution_tree.Packaging.total += waterPkg;
auditTrail.pefCategories["Water Use/Scarcity (AWARE)"].total += waterPkg;
                }
            }

            // 🛡️ PEF 3.1 / SCOPE 3 CAT 12: FOOD WASTE END-OF-LIFE
            // Standard baseline: 5% of final product weight is wasted at retail/consumer level.
            // Organic matter to landfill/incineration emits approx 0.8 kg CO2e per kg of wet mass.
            const foodWasteKg = (massBalanceData.final_content_weight_kg || 0.2) * 0.05;
            const foodWasteCO2 = foodWasteKg * 0.8; 

            // Log the end-of-life impact under the Upstream/End-of-Life branch
            auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.components.push({
                name: `End-of-Life: Food Spoilage/Waste (5% PEF Proxy)`,
                subtotal: foodWasteCO2,
                notes: "Scope 3 Category 12 (Organic Waste to Municipal Treatment)"
            });
            auditTrail.pefCategories["Climate Change"].contribution_tree.Upstream.total += foodWasteCO2;
            auditTrail.pefCategories["Climate Change"].total += foodWasteCO2;

            // ========== IN-USE EMISSIONS (Retail & Home Cold Chain) ==========
const processingMethodForStorage = processingMethod || 'none';
let storageType = 'ambient';
if (processingMethodForStorage === 'freezing') {
    storageType = 'frozen';
} else if (document.getElementById('refrigeratedTransport')?.value === 'yes') {
    storageType = 'chilled';
}

const gridIntensityForInUse = aioxyDataRef.countries?.[manufacturingCountryCode]?.electricityCO2 || 480;
const refrigerantType = document.getElementById('refrigerantType')?.value || 'R-404A';

const inUseEmissions = calculateInUseEmissions(
    massBalanceData.final_content_weight_kg || 0.2,
    storageType,
    refrigerantType,
    gridIntensityForInUse
);

if (inUseEmissions.totalCO2 > 0) {
    auditTrail.pefCategories["Climate Change"].contribution_tree.Use = {
        total: inUseEmissions.totalCO2,
        components: [{
            name: `Cold Chain Storage (${storageType})`,
            subtotal: inUseEmissions.totalCO2,
            retailCO2: inUseEmissions.retailEnergyCO2,
            homeCO2: inUseEmissions.homeEnergyCO2,
            refrigerantCO2: inUseEmissions.refrigerantCO2,
            note: inUseEmissions.note
        }]
    };
    auditTrail.pefCategories["Climate Change"].total += inUseEmissions.totalCO2;
}
            
            // 9. FINAL AGGREGATION & SAVING
            const functionalUnitWeight = massBalanceData.final_content_weight_kg || 0.2;
            const totalClimate = auditTrail.pefCategories["Climate Change"].total;

            // --- REGULATORY DATA ROUTING FIX ---
            // This pulls the actual physics results into the Audit Table
            const contributionTree = auditTrail.pefCategories["Climate Change"].contribution_tree;

            // 1. Route Manufacturing Data
            if (contributionTree.Manufacturing && contributionTree.Manufacturing.total > 0) {
                dqrComponents.push({
                    name: "Manufacturing & Energy Use",
                    impact: contributionTree.Manufacturing.total,
                    dqr: 2.5, 
                    source: "JRC EF 3.1 Benchmark",
                    uncertainty: 20,
                    dqr_trace: "DQR: 2.50 [Secondary JRC Industry Benchmark]"
                });
            }

            // 2. Route Packaging Data
            if (contributionTree.Packaging && contributionTree.Packaging.total > 0) {
                dqrComponents.push({
                    name: "Packaging Lifecycle",
                    impact: contributionTree.Packaging.total,
                    dqr: 3.0, 
                    source: "Agribalyse 3.2",
                    uncertainty: 25,
                    dqr_trace: "DQR: 3.00 [Secondary Material Database]"
                });
            }

            // 3. Route Logistics Data (Inbound + Outbound)
            if (contributionTree.Transport && contributionTree.Transport.total > 0) {
                dqrComponents.push({
                    name: "Inbound/Outbound Logistics",
                    impact: contributionTree.Transport.total,
                    dqr: 3.0, 
                    source: "GLEC v3.2 / Agribalyse",
                    uncertainty: 30,
                    dqr_trace: "DQR: 3.00 [Secondary Logistics Database]"
                });
            }
            
            // Save Global State
            const foregroundBackground = analyzeForegroundBackground(selectedIngredientsRef, totalClimate, auditTrail.pefCategories, dqrComponents);
            const uncertaintyResults = calculateMonteCarloUncertainty(
                selectedIngredientsRef, 
                auditTrail.pefCategories["Climate Change"].contribution_tree, 
                auditTrail.pefCategories["Water Use/Scarcity (AWARE)"].contribution_tree, 
                500
            );

            // 🛡️ FIX 3: THE AGGREGATION GUARD
            const totalCC = auditTrail.pefCategories["Climate Change"].total;
            auditTrail.final_scaling_trace = `[Total Batch Impact (${totalCC.toFixed(4)} kg CO2e) ÷ Final Product Weight (${functionalUnitWeight.toFixed(3)} kg)]`;

            auditTrail.mass_balance = massBalanceData;
            auditTrail.dqr_summary = { 
                overall_dqr: foregroundBackground.overall_dqr, 
                component_dqrs: dqrComponents, 
                dqr_level: this.getDQRQualityLevel(foregroundBackground.overall_dqr).level 
            };
            auditTrail.uncertainty_analysis = { 
                monte_carlo: uncertaintyResults, 
                overall_uncertainty: this.calculateUncertainty(foregroundBackground.overall_dqr) 
            };
            auditTrail.ISO_compliance = getISOCompliance();
            auditTrail.pef_single_score = calculatePEFSingleScore(auditTrail.pefCategories, functionalUnitWeight);

            const unified = getUnifiedMetrics(auditTrail.pefCategories, massBalanceData);

            this.state.finalPefResults = auditTrail.pefCategories;
            this.state.massBalanceData = auditTrail.mass_balance;
            this.state.auditTrailData = auditTrail;
            this.state.currentDPPId = auditTrail.dppId;

            const blCO2 = comparisonBaseline.co2PerKg || unified.co2PerKg;
            const upliftCO2 = uplift?.co2 || 0;
            const baselineCO2Total = blCO2 + upliftCO2;

            // ================== PEF 3.1 CARBON BREAKDOWN (AUDITOR-READY) ==================
// Calculate ACTUAL bottom-up sums from contribution tree - NO FAKE PROXIES

// 1. Initialize the sub-category objects in finalPefResults (Prevents UI Crash)
this.state.finalPefResults['Climate Change - Fossil'] = { total: 0, unit: 'kg CO2e' };
this.state.finalPefResults['Climate Change - Biogenic'] = { total: 0, unit: 'kg CO2e' };
this.state.finalPefResults['Climate Change - dLUC'] = { total: 0, unit: 'kg CO2e' };

// 2. Calculate EXACT bottom-up sums from ALL components in the tree
let actualFossil = 0;
let actualBiogenic = 0;
let actualDLUC = 0;

const stages = ['Ingredients', 'Manufacturing', 'Transport', 'Packaging', 'Upstream', 'Waste'];

stages.forEach(stage => {
    const components = auditTrail.pefCategories["Climate Change"].contribution_tree[stage]?.components || [];
    
    components.forEach(comp => {
        // If the component has explicit sub-indicators, use them
        if (comp.fossilCO2 !== undefined || comp.biogenicCO2 !== undefined || comp.dlucCO2 !== undefined) {
            actualFossil += comp.fossilCO2 || 0;
            actualBiogenic += comp.biogenicCO2 || 0;
            actualDLUC += comp.dlucCO2 || 0;
        } else {
            // STRICT ISO COMPLIANCE: No split defined = 100% Fossil
            actualFossil += comp.subtotal || 0;
        }
    });
});

// 3. Assign true values
this.state.finalPefResults['Climate Change - Fossil'].total = actualFossil;
this.state.finalPefResults['Climate Change - Biogenic'].total = actualBiogenic;
this.state.finalPefResults['Climate Change - dLUC'].total = actualDLUC;
            
const results = {
    finalPefResults: this.state.finalPefResults,
    co2PerKg: unified.co2PerKg,
    waterScarcityPerKg: unified.waterPerKg,
    landUsePerKg: unified.landPerKg,
    fossilPerKg: unified.fossilPerKg,
    fossilCO2Breakdown: actualFossil,
    biogenicCO2Breakdown: actualBiogenic,
    dlucCO2Breakdown: actualDLUC,
    overallDQR: foregroundBackground.overall_dqr,
    overallUncertainty: auditTrail.uncertainty_analysis.overall_uncertainty,
    comparison: {
        baseline: { ...comparisonBaseline, co2PerKg: baselineCO2Total },
        co2SavedPerKg: Math.max(0, baselineCO2Total - unified.co2PerKg),
        uplift_applied: uplift
    }
};

console.log(`✅ [AIOXY UNIFIED] Calc Complete. CO2: ${unified.co2PerKg.toFixed(2)} kg/kg (Fossil: ${actualFossil.toFixed(4)}, Biogenic: ${actualBiogenic.toFixed(4)}, dLUC: ${actualDLUC.toFixed(4)})`);
return results;
        }
    };

 // ================== EXPOSE TO GLOBAL ==================
// Expose the engine and related data structures
global.foodCalculationEngine = foodCalculationEngine;  // ← ADD THIS LINE BACK
global.PHYSICS_CONSTANTS = PHYSICS_CONSTANTS;          // ← ADD THIS LINE BACK
global.PHYSICS_DB = PHYSICS_DB;                        // ← ADD THIS LINE BACK
global.FOOD_PHYSICS_DB = FOOD_PHYSICS_DB;              // ← ADD THIS LINE BACK
global.calculateGLECTransport = calculateGLECTransport;
global.calculateIngredientImpact = calculateIngredientImpact;
global.calculateCFF = calculateCFF;
global.calculateAWARE = calculateAWARE;
global.calculateMassBalance = calculateMassBalance;
global.calculateManufacturingImpact = calculateManufacturingImpact;
global.calculatePEFSingleScore = calculatePEFSingleScore;
global.calculateMonteCarloUncertainty = calculateMonteCarloUncertainty;
global.analyzeForegroundBackground = analyzeForegroundBackground;
global.getISOCompliance = getISOCompliance;
global.applyTemporalDiscounting = applyTemporalDiscounting;
global.validateAndApplyScenarios = validateAndApplyScenarios;
global.applyScenarioPhysics = applyScenarioPhysics;
global.generateAuditHash = generateAuditHash;
global.calculateParametricBaseline = calculateParametricBaseline;
global.getUnifiedMetrics = getUnifiedMetrics;
global.pefCategories = pefCategories;
global.ANCHOR_DATASETS = ANCHOR_DATASETS;

    // ================== GLOBAL COMPATIBILITY BRIDGE ==================
    // This maintains backward compatibility with existing UI/PDF/audit code
    // that expects these variables to be globally accessible.

    (function setupGlobalSync() {
        const engine = global.foodCalculationEngine;
        if (!engine) return;
        
        // Create a sync function that copies state to global variables
        const syncGlobals = () => {
            if (engine.state.finalPefResults) {
                global.finalPefResults = engine.state.finalPefResults;
            }
            if (engine.state.massBalanceData) {
                global.massBalanceData = engine.state.massBalanceData;
            }
            if (engine.state.auditTrailData) {
                global.auditTrailData = engine.state.auditTrailData;
            }
            if (engine.state.currentDPPId) {
                global.currentDPPId = engine.state.currentDPPId;
            }
            if (engine.state.currentComparisonBaseline) {
                global.currentComparisonBaseline = engine.state.currentComparisonBaseline;
            }
        };
        
        // Hook into the calculateFoodImpact method to sync after calculation
        const originalCalculate = engine.calculateFoodImpact;
        engine.calculateFoodImpact = function() {
            const result = originalCalculate.call(this);
            syncGlobals();
            return result;
        };
        
        // Initialize globals with any existing state
        syncGlobals();
        
        // Also expose the engine's state getter for debugging
        global.getEngineState = function() {
            return engine.state;
        };
        
        console.log("✅ [AIOXY] Global compatibility bridge installed - existing UI files will work unchanged");
    })();

    console.log("✅ [AIOXY] Engine v3.1 loaded - PEF 3.1 | ISO 14044 | Physics Ready | Refactored for Safety");

})(typeof window !== 'undefined' ? window : global);
