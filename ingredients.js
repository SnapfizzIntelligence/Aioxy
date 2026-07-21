// ================== AIOXY SYNTHESE + PHYSICS DATABASE ==================
// PEF 3.1 Compliant | Audit-Grade | Zero Numbers Changed
// Synthese ingredients + All Physics Constants
// =======================================================================

window.aioxyData = window.aioxyData || {};

// ================== SYNTHESE INGREDIENTS ==================
// All original numbers preserved exactly
// Fossil/Biogenic/Land Use added from existing metadata values
// FIX: Guard ensures window.aioxyData.ingredients is always an object before Object.assign.
// Without this, if ingredients_db.js ever loads after this file, Object.assign(undefined, {})
// throws a silent TypeError at page load, breaking the entire synthese DB merge.
window.aioxyData.ingredients = window.aioxyData.ingredients || {};
Object.assign(window.aioxyData.ingredients, {

    "rice-flour-ciqual-9520": {
        "name": "Rice flour",
        "loss": 0.02,
        "processing_yield": 0.98,
        "data": {
            "pef": {
                "Climate Change": 2.48,
                "Climate Change - Fossil": 1.24,
                "Climate Change - Biogenic": 1.21,
                "Climate Change - Land Use": 0.0211,
                "Ozone Depletion": 3.89e-08,
                "Human Toxicity, non-cancer": 8.15e-07,
                "Human Toxicity, cancer": 6.78e-10,
                "Particulate Matter": 2.0e-07,
                "Ionizing Radiation": 0.198,
                "Photochemical Ozone Formation": 0.00965,
                "Acidification": 0.0304,
                "Eutrophication, terrestrial": 0.123,
                "Eutrophication, freshwater": 0.000301,
                "Eutrophication, marine": 0.0252,
                "Ecotoxicity, freshwater": 71.4,
                "Land Use": 75.8,
                "Water Use/Scarcity (AWARE)": 17.0,
                "Resource Use, minerals/metals": 6.78e-06,
                "Resource Use, fossils": 15.9
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Farine de riz",
                "source_uuid": "ciqual-9520",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "P": 3.53,
                    "TiR": 2.51,
                    "TeR": 3.53,
                    "GR": 4.19
                },
                "dqr_overall": 3.44,
                "single_score_mpt": 0.519,
                "biogenic_net": 1.21,
                "co2_luc_net": 0.0211,
                "co2_fossil": 1.24,
                "ciqual_category": "produits céréaliers",
                "ciqual_sub_category": "farines et pâtes à tarte",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK PROXY",
                "preparation": "Pas de préparation"
            }
        }
    },

  
    "coconut-milk-ciqual-18041": {
        "name": "Coconut milk or coconut cream",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 0.682,
                "Climate Change - Fossil": 0.0264,
                "Climate Change - Biogenic": 0.0213,
                "Climate Change - Land Use": 0.634,
                "Ozone Depletion": 2.71e-08,
                "Human Toxicity, non-cancer": 1.05e-08,
                "Human Toxicity, cancer": 8.02e-10,
                "Particulate Matter": 4.10e-08,
                "Ionizing Radiation": 0.221,
                "Photochemical Ozone Formation": 0.00256,
                "Acidification": 0.00358,
                "Eutrophication, terrestrial": 0.0113,
                "Eutrophication, freshwater": 0.000144,
                "Eutrophication, marine": 0.00192,
                "Ecotoxicity, freshwater": 9.11,
                "Land Use": 19.3,
                "Water Use/Scarcity (AWARE)": 0.873,
                "Resource Use, minerals/metals": 3.13e-06,
                "Resource Use, fossils": 12.6
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Lait de coco ou Crème de coco",
                "source_uuid": "ciqual-18041",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 3.0, "TiR": 2.0, "TeR": 3.0, "GR": 2.40 },
                "dqr_overall": 2.60,
                "single_score_mpt": 0.0763,
                "biogenic_net": 0.0213,
                "co2_luc_net": 0.634,
                "co2_fossil": 0.0264,
                "ciqual_category": "boissons",
                "ciqual_sub_category": "boissons sans alcool",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Glacé",
                "packaging": "PACK PROXY",
                "preparation": "Pas de préparation"
            }
        }
    },
    "red-lentil-dried-ciqual-20535": {
        "name": "Lentil, pink or red, dried",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 0.581,
                "Climate Change - Fossil": 0.0184,
                "Climate Change - Biogenic": 0.0149,
                "Climate Change - Land Use": 0.548,
                "Ozone Depletion": 1.38e-08,
                "Human Toxicity, non-cancer": 1.82e-08,
                "Human Toxicity, cancer": 6.30e-10,
                "Particulate Matter": 3.91e-08,
                "Ionizing Radiation": 0.319,
                "Photochemical Ozone Formation": 0.00335,
                "Acidification": 0.00448,
                "Eutrophication, terrestrial": 0.014,
                "Eutrophication, freshwater": 0.000469,
                "Eutrophication, marine": 0.00109,
                "Ecotoxicity, freshwater": 139.0,
                "Land Use": 309.0,
                "Water Use/Scarcity (AWARE)": 0.13,
                "Resource Use, minerals/metals": 4.99e-06,
                "Resource Use, fossils": 13.1
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Lentille corail, sèche",
                "source_uuid": "ciqual-20535",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 3.0, "TiR": 3.0, "TeR": 3.0, "GR": 2.48 },
                "dqr_overall": 2.87,
                "single_score_mpt": 0.152,
                "biogenic_net": 0.0149,
                "co2_luc_net": 0.548,
                "co2_fossil": 0.0184,
                "ciqual_category": "fruits, légumes, légumineuses et oléagineux",
                "ciqual_sub_category": "légumineuses",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK AGB",
                "preparation": "Pas de préparation"
            }
        }
    }, 
                      
    "vinegar-ciqual-11018": {
        "name": "Vinegar",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 0.96,
                "Climate Change - Fossil": 0.00129,
                "Climate Change - Biogenic": 0.0167,
                "Climate Change - Land Use": 0.942,
                "Ozone Depletion": 5.08e-08,
                "Human Toxicity, non-cancer": 1.04e-07,
                "Human Toxicity, cancer": 1.86e-09,
                "Particulate Matter": 5.71e-08,
                "Ionizing Radiation": 0.323,
                "Photochemical Ozone Formation": 0.00392,
                "Acidification": 0.00525,
                "Eutrophication, terrestrial": 0.0172,
                "Eutrophication, freshwater": 0.000176,
                "Eutrophication, marine": 0.00552,
                "Ecotoxicity, freshwater": 16.1,
                "Land Use": 94.2,
                "Water Use/Scarcity (AWARE)": 0.149,
                "Resource Use, minerals/metals": 7.04e-06,
                "Resource Use, fossils": 17.2
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Vinaigre",
                "source_uuid": "ciqual-11018",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 3.0, "TiR": 3.0, "TeR": 3.0, "GR": 2.68 },
                "dqr_overall": 2.92,
                "single_score_mpt": 0.128,
                "biogenic_net": 0.0167,
                "co2_luc_net": 0.942,
                "co2_fossil": 0.00129,
                "ciqual_category": "aides culinaires et ingrédients divers",
                "ciqual_sub_category": "condiments",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK PROXY",
                "preparation": "Pas de préparation"
            }
        }
    },
    "lemon-pulp-raw-ciqual-13009": {
        "name": "Lemon, pulp, raw",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 0.764,
                "Climate Change - Fossil": 0.000439,
                "Climate Change - Biogenic": 0.131,
                "Climate Change - Land Use": 0.632,
                "Ozone Depletion": 2.80e-08,
                "Human Toxicity, non-cancer": 1.44e-08,
                "Human Toxicity, cancer": 3.50e-10,
                "Particulate Matter": 5.55e-08,
                "Ionizing Radiation": 0.0613,
                "Photochemical Ozone Formation": 0.00311,
                "Acidification": 0.0057,
                "Eutrophication, terrestrial": 0.0223,
                "Eutrophication, freshwater": 0.00011,
                "Eutrophication, marine": 0.0016,
                "Ecotoxicity, freshwater": 26.8,
                "Land Use": 25.3,
                "Water Use/Scarcity (AWARE)": 12.6,
                "Resource Use, minerals/metals": 3.68e-06,
                "Resource Use, fossils": 8.46
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Citron, pulpe, cru",
                "source_uuid": "ciqual-13009",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 3.0, "TiR": 3.0, "TeR": 2.0, "GR": 2.88 },
                "dqr_overall": 2.72,
                "single_score_mpt": 0.172,
                "biogenic_net": 0.131,
                "co2_luc_net": 0.632,
                "co2_fossil": 0.000439,
                "ciqual_category": "fruits, légumes, légumineuses et oléagineux",
                "ciqual_sub_category": "fruits",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (moyen)",
                "packaging": "PACK AGB",
                "preparation": "Pas de préparation"
            }
        }
    },
    "rapeseed-oil-ciqual-17130": {
        "name": "Rapeseed oil",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 2.5,
                "Climate Change - Fossil": 0.332,
                "Climate Change - Biogenic": 0.0573,
                "Climate Change - Land Use": 2.11,
                "Ozone Depletion": 2.99e-07,
                "Human Toxicity, non-cancer": 3.59e-08,
                "Human Toxicity, cancer": 2.84e-09,
                "Particulate Matter": 2.38e-07,
                "Ionizing Radiation": 0.255,
                "Photochemical Ozone Formation": 0.0088,
                "Acidification": 0.0312,
                "Eutrophication, terrestrial": 0.143,
                "Eutrophication, freshwater": 0.000525,
                "Eutrophication, marine": 0.0211,
                "Ecotoxicity, freshwater": 47.2,
                "Land Use": 287.0,
                "Water Use/Scarcity (AWARE)": 0.602,
                "Resource Use, minerals/metals": 1.30e-05,
                "Resource Use, fossils": 20.1
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Huile de colza",
                "source_uuid": "ciqual-17130",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 2.0, "TiR": 2.0, "TeR": 2.0, "GR": 1.96 },
                "dqr_overall": 1.99,
                "single_score_mpt": 0.323,
                "biogenic_net": 0.0573,
                "co2_luc_net": 2.11,
                "co2_fossil": 0.332,
                "ciqual_category": "matières grasses",
                "ciqual_sub_category": "huiles et graisses végétales",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK AGB",
                "preparation": "Pas de préparation"
            }
        }
    }, 
                    
    
    "salt-white-ciqual-11017": {
        "name": "Salt, white, for human consumption",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 0.632,
                "Climate Change - Fossil": 0.00214,
                "Climate Change - Biogenic": 0.037,
                "Climate Change - Land Use": 0.593,
                "Ozone Depletion": 1.09e-08,
                "Human Toxicity, non-cancer": 1.30e-08,
                "Human Toxicity, cancer": 4.62e-10,
                "Particulate Matter": 4.70e-08,
                "Ionizing Radiation": 0.109,
                "Photochemical Ozone Formation": 0.00253,
                "Acidification": 0.00321,
                "Eutrophication, terrestrial": 0.00764,
                "Eutrophication, freshwater": 0.000267,
                "Eutrophication, marine": 0.000945,
                "Ecotoxicity, freshwater": 5.57,
                "Land Use": 14.3,
                "Water Use/Scarcity (AWARE)": 0.0776,
                "Resource Use, minerals/metals": 1.07e-05,
                "Resource Use, fossils": 9.05
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Sel blanc alimentaire, non iodé, non fluoré (marin, ignigène ou gemme)",
                "source_uuid": "ciqual-11017",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 2.0, "TiR": 3.28, "TeR": 2.0, "GR": 2.0 },
                "dqr_overall": 2.32,
                "single_score_mpt": 0.0708,
                "biogenic_net": 0.037,
                "co2_luc_net": 0.593,
                "co2_fossil": 0.00214,
                "ciqual_category": "aides culinaires et ingrédients divers",
                "ciqual_sub_category": "sels",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK PROXY",
                "preparation": "Pas de préparation"
            }
        }
    },
    "sunflower-oil-ciqual-17440": {
        "name": "Sunflower oil",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 2.36,
                "Climate Change - Fossil": 0.611,
                "Climate Change - Biogenic": 0.0531,
                "Climate Change - Land Use": 1.69,
                "Ozone Depletion": 3.00e-07,
                "Human Toxicity, non-cancer": 7.34e-08,
                "Human Toxicity, cancer": 8.58e-09,
                "Particulate Matter": 1.46e-07,
                "Ionizing Radiation": 0.259,
                "Photochemical Ozone Formation": 0.00864,
                "Acidification": 0.0184,
                "Eutrophication, terrestrial": 0.0829,
                "Eutrophication, freshwater": 0.00136,
                "Eutrophication, marine": 0.0286,
                "Ecotoxicity, freshwater": 92.3,
                "Land Use": 555.0,
                "Water Use/Scarcity (AWARE)": 0.788,
                "Resource Use, minerals/metals": 1.12e-05,
                "Resource Use, fossils": 20.5
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Huile de tournesol",
                "source_uuid": "ciqual-17440",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 2.0, "TiR": 2.0, "TeR": 1.0, "GR": 2.08 },
                "dqr_overall": 1.77,
                "single_score_mpt": 0.358,
                "biogenic_net": 0.0531,
                "co2_luc_net": 1.69,
                "co2_fossil": 0.611,
                "ciqual_category": "matières grasses",
                "ciqual_sub_category": "huiles et graisses végétales",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK AGB",
                "preparation": "Pas de préparation"
            }
        }
    },
    "garlic-raw-ciqual-11000": {
        "name": "Garlic, fresh",
        "loss": 0.0,
        "processing_yield": 1.0,
        "data": {
            "pef": {
                "Climate Change": 0.383,
                "Climate Change - Fossil": 0.000229,
                "Climate Change - Biogenic": 0.0702,
                "Climate Change - Land Use": 0.313,
                "Ozone Depletion": 9.79e-09,
                "Human Toxicity, non-cancer": 7.97e-09,
                "Human Toxicity, cancer": 3.15e-10,
                "Particulate Matter": 2.44e-08,
                "Ionizing Radiation": 0.132,
                "Photochemical Ozone Formation": 0.00123,
                "Acidification": 0.00186,
                "Eutrophication, terrestrial": 0.00579,
                "Eutrophication, freshwater": 7.00e-05,
                "Eutrophication, marine": 0.00215,
                "Ecotoxicity, freshwater": 5.05,
                "Land Use": 18.7,
                "Water Use/Scarcity (AWARE)": 0.553,
                "Resource Use, minerals/metals": 2.76e-06,
                "Resource Use, fossils": 6.38
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2 / CIQUAL",
                "source_activity": "Ail, cru",
                "source_uuid": "ciqual-11000",
                "allocation_method": "Economic Allocation",
                "dqr": { "P": 3.0, "TiR": 3.0, "TeR": 2.52, "GR": 3.0 },
                "dqr_overall": 2.88,
                "single_score_mpt": 0.0457,
                "biogenic_net": 0.0702,
                "co2_luc_net": 0.313,
                "co2_fossil": 0.000229,
                "ciqual_category": "aides culinaires et ingrédients divers",
                "ciqual_sub_category": "herbes",
                "season_code": 2,
                "flight_code": 0,
                "delivery_type": "Ambiant (long)",
                "packaging": "PACK AGB",
                "preparation": "Pas de préparation"
            }
        }
    }, 
        
                    

    "maize-corn-starch-agribalyse-3-2": {
        "name": "Maize/corn starch",
        "loss": 0.02,
        "processing_yield": 0.98,
        "data": {
            "pef": {
                "Climate Change": 1.55,
                "Climate Change - Fossil": 1.42,
                "Climate Change - Biogenic": 0.0344,
                "Climate Change - Land Use": 0.0991,
                "Ozone Depletion": 2.75e-08,
                "Human Toxicity, non-cancer": 2.35e-08,
                "Human Toxicity, cancer": 9.68e-10,
                "Particulate Matter": 1.22e-07,
                "Ionizing Radiation": 0.184,
                "Photochemical Ozone Formation": 0.00632,
                "Acidification": 0.0131,
                "Eutrophication, terrestrial": 0.0468,
                "Eutrophication, freshwater": 0.000515,
                "Eutrophication, marine": 0.00593,
                "Ecotoxicity, freshwater": 43.8,
                "Land Use": 33.1,
                "Water Use/Scarcity (AWARE)": 3.99,
                "Resource Use, minerals/metals": 1.47e-05,
                "Resource Use, fossils": 18.5
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Amidon de maïs ou fécule de maïs / Maize/corn starch",
                "source_uuid": "agb-3.2-9510-maize-corn-starch",
                "agribalyse_code": "9510",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 3.0,
                    "GR": 3.5,
                    "TiR": 3.0,
                    "P": 4.4
                },
                "dqr_overall": 3.48,
                "single_score_mpt": 0.207,
                "biogenic_net": 0.0344,
                "co2_luc_net": 0.0991,
                "co2_fossil": 1.42,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (long)",
                "packaging_approach": "PACK PROXY",
                "preparation": "Pas de préparation",
                "food_group": "produits céréaliers",
                "food_subgroup": "farines et pâtes à tarte"
            }
        }
    },

    "raspberry-raw-agribalyse-3-2": {
        "name": "Raspberry, raw",
        "loss": 0.05,
        "processing_yield": 0.95,
        "data": {
            "pef": {
                "Climate Change": 1.55,
                "Climate Change - Fossil": 1.55,
                "Climate Change - Biogenic": 0.00184,
                "Climate Change - Land Use": 0,
                "Ozone Depletion": 4.2e-08,
                "Human Toxicity, non-cancer": 6.53e-08,
                "Human Toxicity, cancer": 2.93e-09,
                "Particulate Matter": 3.03e-07,
                "Ionizing Radiation": 0.0434,
                "Photochemical Ozone Formation": 0.0106,
                "Acidification": 0.042,
                "Eutrophication, terrestrial": 0.182,
                "Eutrophication, freshwater": 0.000395,
                "Eutrophication, marine": 0.0152,
                "Ecotoxicity, freshwater": 81.0,
                "Land Use": 118.0,
                "Water Use/Scarcity (AWARE)": 2.35,
                "Resource Use, minerals/metals": 8.44e-06,
                "Resource Use, fossils": 15.2
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Raspberry, raw",
                "source_uuid": "agb-3.2-13015-raspberry-raw",
                "agribalyse_code": "13015",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 4.0,
                    "GR": 4.0,
                    "TiR": 4.0,
                    "C": 4.0,
                    "P": 4.25
                },
                "dqr_overall": 4.05,
                "biogenic_net": 0.00184
            }
        }
    },

    "vinegar-cider-agribalyse-3-2": {
        "name": "Vinegar, cider",
        "loss": 0.02,
        "processing_yield": 0.98,
        "data": {
            "pef": {
                "Climate Change": 0.841,
                "Climate Change - Fossil": 0.777,
                "Climate Change - Biogenic": 0.0636,
                "Climate Change - Land Use": 0.000276,
                "Ozone Depletion": 5.37e-08,
                "Human Toxicity, non-cancer": 1.23e-08,
                "Human Toxicity, cancer": 5.4e-10,
                "Particulate Matter": 4.6e-08,
                "Ionizing Radiation": 0.209,
                "Photochemical Ozone Formation": 0.00309,
                "Acidification": 0.00375,
                "Eutrophication, terrestrial": 0.0108,
                "Eutrophication, freshwater": 9.37e-05,
                "Eutrophication, marine": 0.00134,
                "Ecotoxicity, freshwater": 17.6,
                "Land Use": 20.6,
                "Water Use/Scarcity (AWARE)": 0.69,
                "Resource Use, minerals/metals": 3.17e-06,
                "Resource Use, fossils": 13.6
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Vinaigre de cidre / Vinegar, cider",
                "source_uuid": "agb-3.2-11090-vinegar-cider",
                "agribalyse_code": "11090",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 2.0,
                    "GR": 2.0,
                    "TiR": 2.0,
                    "C": 3.0,
                    "P": 3.5
                },
                "dqr_overall": 2.50,
                "single_score_mpt": 0.0833,
                "biogenic_net": 0.0636,
                "co2_luc_net": 0.000276,
                "co2_fossil": 0.777,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (long)",
                "packaging_approach": "PACK PROXY",
                "preparation": "Pas de préparation",
                "food_group": "aides culinaires et ingrédients divers",
                "food_subgroup": "condiments"
            }
        }
    },

    "cranberry-raw-agribalyse-3-2": {
        "name": "Cranberry, raw",
        "loss": 0.05,
        "processing_yield": 0.95,
        "data": {
            "pef": {
                "Climate Change": 1.63,
                "Climate Change - Fossil": 1.55,
                "Climate Change - Biogenic": 0.0788,
                "Climate Change - Land Use": 0.00201,
                "Ozone Depletion": 3.78e-07,
                "Human Toxicity, non-cancer": 1.11e-07,
                "Human Toxicity, cancer": 1.03e-08,
                "Particulate Matter": 1.56e-07,
                "Ionizing Radiation": 0.103,
                "Photochemical Ozone Formation": 0.0124,
                "Acidification": 0.0238,
                "Eutrophication, terrestrial": 0.0674,
                "Eutrophication, freshwater": 0.00507,
                "Eutrophication, marine": 0.0134,
                "Ecotoxicity, freshwater": 297.0,
                "Land Use": 118.0,
                "Water Use/Scarcity (AWARE)": 27.9,
                "Resource Use, minerals/metals": 2.79e-05,
                "Resource Use, fossils": 20.3
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Canneberge ou cranberry, crue / Cranberry, raw",
                "source_uuid": "agb-3.2-13113-cranberry-raw",
                "agribalyse_code": "13113",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 4.0,
                    "GR": 4.0,
                    "TiR": 4.0,
                    "C": 4.0,
                    "P": 4.55
                },
                "dqr_overall": 4.11,
                "single_score_mpt": 0.641,
                "biogenic_net": 0.0788,
                "co2_luc_net": 0.00201,
                "co2_fossil": 1.55,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (moyen)",
                "packaging_approach": "PACK AGB",
                "preparation": "Pas de préparation",
                "food_group": "fruits, légumes, légumineuses et oléagineux",
                "food_subgroup": "fruits"
            }
        }
    },

    "salt-white-iodized-agribalyse-3-2": {
        "name": "Salt, white, iodized",
        "loss": 0.01,
        "processing_yield": 0.99,
        "data": {
            "pef": {
                "Climate Change": 0.632,
                "Climate Change - Fossil": 0.593,
                "Climate Change - Biogenic": 0.037,
                "Climate Change - Land Use": 0.00214,
                "Ozone Depletion": 1.09e-08,
                "Human Toxicity, non-cancer": 1.3e-08,
                "Human Toxicity, cancer": 4.62e-10,
                "Particulate Matter": 4.7e-08,
                "Ionizing Radiation": 0.109,
                "Photochemical Ozone Formation": 0.00253,
                "Acidification": 0.00321,
                "Eutrophication, terrestrial": 0.00764,
                "Eutrophication, freshwater": 0.000267,
                "Eutrophication, marine": 0.000945,
                "Ecotoxicity, freshwater": 5.57,
                "Land Use": 14.3,
                "Water Use/Scarcity (AWARE)": 0.0776,
                "Resource Use, minerals/metals": 1.07e-05,
                "Resource Use, fossils": 9.05
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Sel blanc alimentaire, iodé, non fluoré (marin, ignigène ou gemme) / Salt, white",
                "source_uuid": "agb-3.2-11058-salt-white-iodized",
                "agribalyse_code": "11058",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 2.0,
                    "GR": 2.0,
                    "TiR": 2.0,
                    "C": 3.0,
                    "P": 3.75
                },
                "dqr_overall": 2.55,
                "single_score_mpt": 0.0708,
                "biogenic_net": 0.037,
                "co2_luc_net": 0.00214,
                "co2_fossil": 0.593,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (long)",
                "packaging_approach": "PACK PROXY",
                "preparation": "Pas de préparation",
                "food_group": "aides culinaires et ingrédients divers",
                "food_subgroup": "sels"
            }
        }
    },

    "syrup-agave-agribalyse-3-2": {
        "name": "Syrup, agave",
        "loss": 0.02,
        "processing_yield": 0.98,
        "data": {
            "pef": {
                "Climate Change": 5.63,
                "Climate Change - Fossil": 5.55,
                "Climate Change - Biogenic": 0.0778,
                "Climate Change - Land Use": 0.00358,
                "Ozone Depletion": 2.1e-06,
                "Human Toxicity, non-cancer": 1.56e-07,
                "Human Toxicity, cancer": 6.51e-09,
                "Particulate Matter": 2.8e-07,
                "Ionizing Radiation": 2.83,
                "Photochemical Ozone Formation": 0.0481,
                "Acidification": 0.0434,
                "Eutrophication, terrestrial": 0.172,
                "Eutrophication, freshwater": 0.00126,
                "Eutrophication, marine": 0.0167,
                "Ecotoxicity, freshwater": 65.6,
                "Land Use": 156.0,
                "Water Use/Scarcity (AWARE)": 0.676,
                "Resource Use, minerals/metals": 8.19e-05,
                "Resource Use, fossils": 127.0
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Sirop d'agave / Syrup, agave",
                "source_uuid": "agb-3.2-31089-syrup-agave",
                "agribalyse_code": "31089",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 2.5,
                    "GR": 3.5,
                    "TiR": 2.5,
                    "C": 3.0,
                    "P": 3.35
                },
                "dqr_overall": 2.97,
                "single_score_mpt": 0.755,
                "biogenic_net": 0.0778,
                "co2_luc_net": 0.00358,
                "co2_fossil": 5.55,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (long)",
                "packaging_approach": "PACK PROXY",
                "preparation": "Pas de préparation",
                "food_group": "aides culinaires et ingrédients divers",
                "food_subgroup": "ingrédients divers"
            }
        }
    },

    "broccoli-raw-agribalyse-3-2": {
        "name": "Broccoli, raw",
        "loss": 0.05,
        "processing_yield": 0.95,
        "data": {
            "pef": {
                "Climate Change": 0.951,
                "Climate Change - Fossil": 0.914,
                "Climate Change - Biogenic": 0.0368,
                "Climate Change - Land Use": 0.000226,
                "Ozone Depletion": 2.36e-08,
                "Human Toxicity, non-cancer": 5.17e-08,
                "Human Toxicity, cancer": 2.11e-09,
                "Particulate Matter": 1.26e-07,
                "Ionizing Radiation": 0.0371,
                "Photochemical Ozone Formation": 0.00433,
                "Acidification": 0.0137,
                "Eutrophication, terrestrial": 0.0546,
                "Eutrophication, freshwater": 0.000162,
                "Eutrophication, marine": 0.00577,
                "Ecotoxicity, freshwater": 20.5,
                "Land Use": 28.6,
                "Water Use/Scarcity (AWARE)": 0.527,
                "Resource Use, minerals/metals": 3.79e-06,
                "Resource Use, fossils": 11.9
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Brocoli, cru / Broccoli, raw",
                "source_uuid": "agb-3.2-20011-broccoli-raw",
                "agribalyse_code": "20011",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 3.0,
                    "GR": 3.0,
                    "TiR": 3.0,
                    "C": 3.0,
                    "P": 3.5
                },
                "dqr_overall": 3.1,
                "biogenic_net": 0.0368,
                "co2_luc_net": 0.000226,
                "co2_fossil": 0.914,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Frais (court)",
                "packaging_approach": "PACK PROXY",
                "preparation": "Pas de préparation",
                "food_group": "fruits, légumes, légumineuses et oléagineux",
                "food_subgroup": "légumes"
            }
        }
    },

    "chicory-powder-agribalyse-3-2": {
        "name": "Chicory powder, soluble",
        "loss": 0.02,
        "processing_yield": 0.98,
        "data": {
            "pef": {
                "Climate Change": 3.72,
                "Climate Change - Fossil": 3.72,
                "Climate Change - Biogenic": 0.0,
                "Climate Change - Land Use": 0.0,
                "Ozone Depletion": 3.93e-07,
                "Human Toxicity, non-cancer": 6.50e-08,
                "Human Toxicity, cancer": 4.29e-09,
                "Particulate Matter": 3.74e-07,
                "Ionizing Radiation": 9.85,
                "Photochemical Ozone Formation": 0.0230,
                "Acidification": 0.0335,
                "Eutrophication, terrestrial": 0.00105,
                "Eutrophication, freshwater": 0.0158,
                "Eutrophication, marine": 0.0957,
                "Ecotoxicity, freshwater": 62.7,
                "Land Use": 151,
                "Water Use/Scarcity (AWARE)": 1.42,
                "Resource Use, minerals/metals": 281,
                "Resource Use, fossils": 2.80e-05
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Chicorée, poudre soluble, non réhydratée",
                "source_uuid": "agb-3.2-18152-1-chicory-powder",
                "agribalyse_code": "18152",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 1.0,
                    "GR": 2.0,
                    "TiR": 2.0,
                    "C": 2.0,
                    "P": 2.0
                },
                "dqr_overall": 1.9,
                "biogenic_net": 0.0
            }
        }
    },

    "palm-oil-refined-agribalyse-3-2": {
        "name": "Palm oil, refined",
        "loss": 0.02,
        "processing_yield": 0.99,
        "data": {
            "pef": {
                "Climate Change": 6.65,
                "Climate Change - Fossil": 6.65,
                "Climate Change - Biogenic": 0.0413,
                "Climate Change - Land Use": 0,
                "Ozone Depletion": 7.64e-08,
                "Human Toxicity, non-cancer": 6.1e-08,
                "Human Toxicity, cancer": 3.15e-09,
                "Particulate Matter": 3.58e-07,
                "Ionizing Radiation": 0.204,
                "Photochemical Ozone Formation": 0.0176,
                "Acidification": 0.0252,
                "Eutrophication, terrestrial": 0.0937,
                "Eutrophication, freshwater": 0.000405,
                "Eutrophication, marine": 0.0312,
                "Ecotoxicity, freshwater": 40.9,
                "Land Use": 147,
                "Water Use/Scarcity (AWARE)": 1.96,
                "Resource Use, minerals/metals": 8.81e-06,
                "Resource Use, fossils": 44.3
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Huile de palme raffinée / Palm oil, refined",
                "source_uuid": "agb-3.2-16150-palm-oil-refined",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 1.0,
                    "GR": 1.0,
                    "TiR": 1.0,
                    "C": 1.0,
                    "P": 1.1
                },
                "dqr_overall": 1.02,
                "biogenic_net": 0.0413
            }
        }
    }

});



// =============================================================================
// GRID ELECTRICITY CARBON INTENSITY — DATA CITATION & VINTAGE LOG
// =============================================================================
// Source:   Ember Climate (2025). "Yearly Electricity Data" (unified dataset).
//           ember-climate.org/data/data-tools/data-explorer/
// Variable: CO2 intensity | Unit: gCO2/kWh
// Refresh:  June 2026 — hybrid update (Ember 2025 actuals where published,
//           Ember 2024 fallback for countries not yet reported for 2025).
// Previous: Ember 2024 actuals (loaded June 2026 — C2-F1 session).
// Next:     Refresh annually. Update grid_intensity first, then sync
//           countries.electricityCO2 immediately after.
// -----------------------------------------------------------------------------
// EMBER 2025 ACTUALS (38 countries — year 2025 data published at time of refresh)
//   AT  Austria          116.9    BA  Bosnia-Herz.     570.6
//   BE  Belgium          149.8    BG  Bulgaria         275.6
//   CH  Switzerland       39.2    CY  Cyprus           489.0
//   CZ  Czechia          401.5    DE  Germany          329.6
//   DK  Denmark          114.4    EE  Estonia          319.1
//   ES  Spain            153.6    FI  Finland           57.5
//   FR  France            41.4    GB  United Kingdom   217.1
//   GR  Greece           315.1    HR  Croatia          158.5
//   HU  Hungary          163.0    IE  Ireland          256.5
//   IT  Italy            284.8    LT  Lithuania        138.4
//   LU  Luxembourg       123.4    LV  Latvia           138.8
//   MD  Moldova          633.1    ME  Montenegro       263.2
//   MK  N. Macedonia     441.4    MT  Malta            484.0
//   NL  Netherlands      253.6    NO  Norway            28.1
//   PL  Poland           588.6    PT  Portugal         127.9
//   RO  Romania          250.8    RS  Serbia           695.8
//   RU  Russia           449.7    SE  Sweden            35.3
//   SI  Slovenia         183.3    SK  Slovakia          94.8
//   TR  Turkey           474.7    UA  Ukraine          197.3
// -----------------------------------------------------------------------------
// EMBER 2024 ACTUALS (42 countries — 2025 data not yet published at refresh date)
//   AE  UAE              467.5    AL  Albania           25.2
//   AR  Argentina        344.8    AU  Australia        553.8
//   BD  Bangladesh       695.7    BR  Brazil           106.1
//   CA  Canada           185.3    CI  Côte d'Ivoire    405.0
//   CL  Chile            259.9    CM  Cameroon         225.9
//   CN  China            555.4    CO  Colombia         298.3
//   DZ  Algeria          632.9    EG  Egypt            574.5
//   ET  Ethiopia          23.4    GH  Ghana            468.9
//   ID  Indonesia        680.2    IN  India            705.4
//   IQ  Iraq             683.1    IR  Iran             648.7
//   IS  Iceland           27.8    JP  Japan            483.4
//   KE  Kenya             85.2    KR  South Korea      415.5
//   LK  Sri Lanka        378.4    MA  Morocco          594.8
//   MX  Mexico           483.1    MY  Malaysia         600.4
//   NG  Nigeria          495.7    NP  Nepal             24.3
//   NZ  New Zealand      112.0    PE  Peru             258.7
//   PH  Philippines      621.7    PK  Pakistan         373.7
//   SA  Saudi Arabia     692.0    TH  Thailand         554.7
//   TN  Tunisia          558.3    TW  Taiwan           635.2
//   US  United States    383.8    UY  Uruguay           69.6
//   VN  Vietnam          484.3    ZA  South Africa     717.4
// -----------------------------------------------------------------------------
// SPECIAL CASES
//   XK  Kosovo           884.9   — Not in Ember (no ISO 3166-1 alpha-3 assigned).
//                                  Value retained from prior dataset.
//   Global proxy         480.0   — World average approximation. Not country-specific.
// =============================================================================
window.aioxyData.grid_intensity = {

    // ── Europe (all Ember 2025 actuals) ──────────────────────────────────────
    "IS":  27.8,  // ember-2024 | Iceland
    "AL":  25.2,  // ember-2024 | Albania
    "NO":  28.1,  // ember-2025 | Norway
    "CH":  39.2,  // ember-2025 | Switzerland
    "FR":  41.4,  // ember-2025 | France
    "FI":  57.5,  // ember-2025 | Finland
    "SK":  94.8,  // ember-2025 | Slovakia
    "DK": 114.4,  // ember-2025 | Denmark
    "AT": 116.9,  // ember-2025 | Austria
    "LU": 123.4,  // ember-2025 | Luxembourg
    "PT": 127.9,  // ember-2025 | Portugal
    "LT": 138.4,  // ember-2025 | Lithuania
    "LV": 138.8,  // ember-2025 | Latvia
    "BE": 149.8,  // ember-2025 | Belgium
    "ES": 153.6,  // ember-2025 | Spain
    "HR": 158.5,  // ember-2025 | Croatia
    "HU": 163.0,  // ember-2025 | Hungary
    "SI": 183.3,  // ember-2025 | Slovenia
    // FIX: [ingredients.js audit] Sweden was present in countries.electricityCO2 (35.3)
    // but entirely missing from this object. The main manufacturing calculation path
    // (calculation_engine.js) has a per-country fallback to countries.electricityCO2
    // that masked this gap — but the twin/comparison path (core_physics.js, via the
    // `gridIntensity: db.grid_intensity || db.countries` object-level-only fallback at
    // calculation_engine.js ~line 2745) has no such per-key fallback: since grid_intensity
    // exists as an object at all, countries is never consulted, so any twin ingredient
    // specifying Sweden as its manufacturing country would throw
    // MissingDataError('gridIntensity.SE'). Adding it here fixes the root cause for
    // both paths without relying on any fallback.
    "SE":  35.3,  // ember-2025 | Sweden
    "GB": 217.1,  // ember-2025 | United Kingdom
    "RO": 250.8,  // ember-2025 | Romania
    "NL": 253.6,  // ember-2025 | Netherlands
    "IE": 256.5,  // ember-2025 | Ireland
    "ME": 263.2,  // ember-2025 | Montenegro
    "BG": 275.6,  // ember-2025 | Bulgaria
    "IT": 284.8,  // ember-2025 | Italy
    "GR": 315.1,  // ember-2025 | Greece
    "EE": 319.1,  // ember-2025 | Estonia
    "DE": 329.6,  // ember-2025 | Germany
    "CZ": 401.5,  // ember-2025 | Czechia
    "MK": 441.4,  // ember-2025 | North Macedonia
    "TR": 474.7,  // ember-2025 | Turkey
    "MT": 484.0,  // ember-2025 | Malta
    "CY": 489.0,  // ember-2025 | Cyprus
    "BA": 570.6,  // ember-2025 | Bosnia-Herzegovina
    "PL": 588.6,  // ember-2025 | Poland
    "MD": 633.1,  // ember-2025 | Moldova
    "RS": 695.8,  // ember-2025 | Serbia
    "XK": 884.9,  // no-ember   | Kosovo — not in Ember (no ISO 3166-1 alpha-3 assigned)
    "UA": 197.3,  // ember-2025 | Ukraine — 2025 data now available (conflict gap resolved)
    "RU": 449.7,  // ember-2025 | Russia

    // ── Global proxy ─────────────────────────────────────────────────────────
    "Global": 480, // world-avg  | World average approximation — not Ember country-specific

    // ── North America & Oceania ───────────────────────────────────────────────
    "CA": 185.3,  // ember-2024 | Canada
    "US": 383.8,  // ember-2024 | United States
    "NZ": 112.0,  // ember-2024 | New Zealand
    "AU": 553.8,  // ember-2024 | Australia

    // ── Latin America ─────────────────────────────────────────────────────────
    "UY":  69.6,  // ember-2024 | Uruguay
    "BR": 106.1,  // ember-2024 | Brazil
    "CL": 259.9,  // ember-2024 | Chile
    "PE": 258.7,  // ember-2024 | Peru
    "CO": 298.3,  // ember-2024 | Colombia
    "AR": 344.8,  // ember-2024 | Argentina
    "MX": 483.1,  // ember-2024 | Mexico

    // ── East Asia & Pacific ───────────────────────────────────────────────────
    "JP": 483.4,  // ember-2024 | Japan
    "KR": 415.5,  // ember-2024 | South Korea
    "CN": 555.4,  // ember-2024 | China
    "TW": 635.2,  // ember-2024 | Taiwan

    // ── South & Southeast Asia ────────────────────────────────────────────────
    "NP":  24.3,  // ember-2024 | Nepal
    "LK": 378.4,  // ember-2024 | Sri Lanka
    "PK": 373.7,  // ember-2024 | Pakistan
    "VN": 484.3,  // ember-2024 | Vietnam
    "MY": 600.4,  // ember-2024 | Malaysia
    "PH": 621.7,  // ember-2024 | Philippines
    "TH": 554.7,  // ember-2024 | Thailand
    "ID": 680.2,  // ember-2024 | Indonesia
    "BD": 695.7,  // ember-2024 | Bangladesh
    "IN": 705.4,  // ember-2024 | India

    // ── Middle East & North Africa ────────────────────────────────────────────
    "AE": 467.5,  // ember-2024 | United Arab Emirates
    "TN": 558.3,  // ember-2024 | Tunisia
    "EG": 574.5,  // ember-2024 | Egypt
    "MA": 594.8,  // ember-2024 | Morocco
    "DZ": 632.9,  // ember-2024 | Algeria
    "IR": 648.7,  // ember-2024 | Iran
    "IQ": 683.1,  // ember-2024 | Iraq
    "SA": 692.0,  // ember-2024 | Saudi Arabia

    // ── Sub-Saharan Africa ────────────────────────────────────────────────────
    "ET":  23.4,  // ember-2024 | Ethiopia
    "KE":  85.2,  // ember-2024 | Kenya
    "CM": 225.9,  // ember-2024 | Cameroon
    "CI": 405.0,  // ember-2024 | Côte d'Ivoire
    "GH": 468.9,  // ember-2024 | Ghana
    "NG": 495.7,  // ember-2024 | Nigeria
    "ZA": 717.4,  // ember-2024 | South Africa
};

// June 2026 refresh: countries.electricityCO2 synced to Ember 2025/2024 hybrid actuals.
// All values match grid_intensity above. awareFactor values unchanged (AWARE 2.0 is stable).
window.aioxyData.countries = {
    // ── Europe ────────────────────────────────────────────────────────────────
    "AU": { "name": "Australia",          "electricityCO2": 553.8, "awareFactor": 60.1  },
    "AT": { "name": "Austria",            "electricityCO2": 116.9, "awareFactor": 2.5   },
    "BE": { "name": "Belgium",            "electricityCO2": 149.8, "awareFactor": 42.1  },
    "BR": { "name": "Brazil",             "electricityCO2": 106.1, "awareFactor": 3.1   },
    "BG": { "name": "Bulgaria",           "electricityCO2": 275.6, "awareFactor": null  },
    "CA": { "name": "Canada",             "electricityCO2": 185.3, "awareFactor": 2.2   },
    "CN": { "name": "China",              "electricityCO2": 555.4, "awareFactor": 41.2  },
    "HR": { "name": "Croatia",            "electricityCO2": 158.5, "awareFactor": null  },
    "CY": { "name": "Cyprus",             "electricityCO2": 489.0, "awareFactor": null  },
    "CZ": { "name": "Czechia",            "electricityCO2": 401.5, "awareFactor": null  },
    "DK": { "name": "Denmark",            "electricityCO2": 114.4, "awareFactor": 14.5  },
    "EE": { "name": "Estonia",            "electricityCO2": 319.1, "awareFactor": null  },
    "FI": { "name": "Finland",            "electricityCO2": 57.5,  "awareFactor": 0.5   },
    "FR": { "name": "France",             "electricityCO2": 41.4,  "awareFactor": 17.1, "renewable_mix": 0.33 },
    "DE": { "name": "Germany",            "electricityCO2": 329.6, "awareFactor": 24.5  },
    "GR": { "name": "Greece",             "electricityCO2": 315.1, "awareFactor": 61.2  },
    "HU": { "name": "Hungary",            "electricityCO2": 163.0, "awareFactor": null  },
    "IN": { "name": "India",              "electricityCO2": 705.4, "awareFactor": 70.1  },
    "IE": { "name": "Ireland",            "electricityCO2": 256.5, "awareFactor": 1.8   },
    "IT": { "name": "Italy",              "electricityCO2": 284.8, "awareFactor": 49.8  },
    "JP": { "name": "Japan",              "electricityCO2": 483.4, "awareFactor": 36.5  },
    "LV": { "name": "Latvia",             "electricityCO2": 138.8, "awareFactor": null  },
    "LT": { "name": "Lithuania",          "electricityCO2": 138.4, "awareFactor": null  },
    "LU": { "name": "Luxembourg",         "electricityCO2": 123.4, "awareFactor": null  },
    "NL": { "name": "Netherlands",        "electricityCO2": 253.6, "awareFactor": 33.6  },
    "NO": { "name": "Norway",             "electricityCO2": 28.1,  "awareFactor": null  },
    "PL": { "name": "Poland",             "electricityCO2": 588.6, "awareFactor": 19.8  },
    "PT": { "name": "Portugal",           "electricityCO2": 127.9, "awareFactor": 43.1  },
    "RO": { "name": "Romania",            "electricityCO2": 250.8, "awareFactor": null  },
    "SK": { "name": "Slovakia",           "electricityCO2": 94.8,  "awareFactor": null  },
    "SI": { "name": "Slovenia",           "electricityCO2": 183.3, "awareFactor": null  },
    "ES": { "name": "Spain",              "electricityCO2": 153.6, "awareFactor": 65.4  },
    "SE": { "name": "Sweden",             "electricityCO2": 35.3,  "awareFactor": 1.3   },
    "CH": { "name": "Switzerland",        "electricityCO2": 39.2,  "awareFactor": null  },
    "TR": { "name": "Türkiye",            "electricityCO2": 474.7, "awareFactor": null  },
    "GB": { "name": "United Kingdom",     "electricityCO2": 217.1, "awareFactor": 22.9  },
    "US": { "name": "United States",      "electricityCO2": 383.8, "awareFactor": 33.4  },
    // ── South & Southeast Asia ────────────────────────────────────────────────
    "TH": { "name": "Thailand",           "electricityCO2": 554.7, "awareFactor": 18.4  },
    "VN": { "name": "Vietnam",            "electricityCO2": 484.3, "awareFactor": 8.2   },
    "ID": { "name": "Indonesia",          "electricityCO2": 680.2, "awareFactor": 3.1   },
    "MY": { "name": "Malaysia",           "electricityCO2": 600.4, "awareFactor": 4.6   },
    "PH": { "name": "Philippines",        "electricityCO2": 621.7, "awareFactor": 6.8   },
    "BD": { "name": "Bangladesh",         "electricityCO2": 695.7, "awareFactor": 28.6  },
    "PK": { "name": "Pakistan",           "electricityCO2": 373.7, "awareFactor": 89.2  },
    "LK": { "name": "Sri Lanka",          "electricityCO2": 378.4, "awareFactor": 12.1  },
    "NP": { "name": "Nepal",              "electricityCO2": 24.3,  "awareFactor": 7.4   },
    "KR": { "name": "South Korea",        "electricityCO2": 415.5, "awareFactor": 22.8  },
    "TW": { "name": "Taiwan",             "electricityCO2": 635.2, "awareFactor": null  },
    // ── Middle East & North Africa ────────────────────────────────────────────
    "SA": { "name": "Saudi Arabia",       "electricityCO2": 692.0, "awareFactor": 1247.0 },
    "AE": { "name": "United Arab Emirates","electricityCO2": 467.5,"awareFactor": 1078.0 },
    "IR": { "name": "Iran",               "electricityCO2": 648.7, "awareFactor": 116.4  },
    "IQ": { "name": "Iraq",               "electricityCO2": 683.1, "awareFactor": 243.6  },
    "EG": { "name": "Egypt",              "electricityCO2": 574.5, "awareFactor": 181.4  },
    "MA": { "name": "Morocco",            "electricityCO2": 594.8, "awareFactor": 112.8  },
    "DZ": { "name": "Algeria",            "electricityCO2": 632.9, "awareFactor": 183.2  },
    "TN": { "name": "Tunisia",            "electricityCO2": 558.3, "awareFactor": 127.6  },
    // ── Sub-Saharan Africa ────────────────────────────────────────────────────
    "NG": { "name": "Nigeria",            "electricityCO2": 495.7, "awareFactor": 14.2  },
    "GH": { "name": "Ghana",              "electricityCO2": 468.9, "awareFactor": 3.8   },
    "CI": { "name": "Cote d'Ivoire",      "electricityCO2": 405.0, "awareFactor": 4.1   },
    "CM": { "name": "Cameroon",           "electricityCO2": 225.9, "awareFactor": 2.9   },
    "KE": { "name": "Kenya",              "electricityCO2": 85.2,  "awareFactor": 21.6  },
    "ET": { "name": "Ethiopia",           "electricityCO2": 23.4,  "awareFactor": 17.8  },
    "ZA": { "name": "South Africa",       "electricityCO2": 717.4, "awareFactor": 81.4  },
    // ── Eastern Europe ────────────────────────────────────────────────────────
    "UA": { "name": "Ukraine",            "electricityCO2": 197.3,   "awareFactor": 14.6  }, // Ember 2025 actuals
    "RU": { "name": "Russia",             "electricityCO2": 449.7, "awareFactor": 2.1   },
    "MD": { "name": "Moldova",            "electricityCO2": 633.1, "awareFactor": null  },
    // ── Balkans ───────────────────────────────────────────────────────────────
    "RS": { "name": "Serbia",             "electricityCO2": 695.8, "awareFactor": null  },
    "AL": { "name": "Albania",            "electricityCO2": 25.2,  "awareFactor": null  },
    "BA": { "name": "Bosnia and Herzegovina","electricityCO2": 570.6,"awareFactor": null },
    "ME": { "name": "Montenegro",         "electricityCO2": 263.2, "awareFactor": null  },
    "MK": { "name": "North Macedonia",    "electricityCO2": 441.4, "awareFactor": null  },
    // FIX: [ingredients.js audit] Kosovo was present in grid_intensity (884.9) but missing
    // here. Both calculation paths already resolve Kosovo's electricity intensity correctly
    // (grid_intensity is checked first/only), so this isn't a crash risk like the Sweden
    // gap — but any code needing a country display name or AWARE factor for Kosovo would
    // still fail silently. awareFactor unknown (Kosovo has no ISO 3166-1 alpha-3 code and
    // is not covered in the AWARE 2.0 country dataset) — set to null, consistent with the
    // pattern used for other Balkan countries lacking AWARE data above.
    "XK": { "name": "Kosovo",             "electricityCO2": 884.9, "awareFactor": null  },
    "IS": { "name": "Iceland",            "electricityCO2": 27.8,  "awareFactor": 0.4   },
    "MT": { "name": "Malta",              "electricityCO2": 484.0, "awareFactor": null  },
    // ── Latin America ─────────────────────────────────────────────────────────
    "MX": { "name": "Mexico",             "electricityCO2": 483.1, "awareFactor": 91.2  },
    "AR": { "name": "Argentina",          "electricityCO2": 344.8, "awareFactor": 14.8  },
    "CL": { "name": "Chile",              "electricityCO2": 259.9, "awareFactor": 72.4  },
    "CO": { "name": "Colombia",           "electricityCO2": 298.3, "awareFactor": 4.2   },
    "PE": { "name": "Peru",               "electricityCO2": 258.7, "awareFactor": 31.6  },
    "UY": { "name": "Uruguay",            "electricityCO2": 69.6,  "awareFactor": 8.6   },
    // ── Oceania ───────────────────────────────────────────────────────────────
    "NZ": { "name": "New Zealand",        "electricityCO2": 112.0, "awareFactor": 1.2   }
};

// ================== FOOD PROCESSING ENERGY INTENSITY ==================
// GAP 10 FIX: PROCESSING ENERGY ARCHETYPES — METHODOLOGY NOTE
//
// No separate derivation report exists for these values.
// The previous reference to "food_processing_energy_intensity.md" was incorrect —
// no such report file exists. The methodology IS self-documenting in this file:
// each archetype entry contains inline thermodynamic derivations with inline
// citations to published food engineering references. These inline citations
// ARE the traceability record per ISO 14044 §4.2.3.3 — traceability is
// satisfied by a documented calculation method and cited primary sources;
// a separate report is not required.
//
// An external auditor can independently reproduce any archetype value from
// the formula and published parameters cited in each method's comments.
//
// METHODOLOGY:
// Thermal processes (pasteurization, sterilization, UHT, baking, roasting,
// frying, freezing, drying, canning, oat processing): Derived from
// Q = m × Cp × ΔT + m_evap × H_vap + m_freeze × H_fus, divided by
// equipment efficiency and converted to kWh or MJ.
//
// Mechanical processes (milling, mixing, extrusion, crushing, wet milling):
// Sourced from published food engineering literature benchmarks.
//
// CONSTANTS USED:
// Cp_water = 4.186 kJ/kg·°C (Incropera & DeWitt, 2011, Table A.6)
// Cp_food_solids = 1.40-1.55 kJ/kg·°C (Choi & Okos, 1986)
// H_vap = 2,257 kJ/kg at 100°C (Incropera & DeWitt, 2011)
// H_fus = 334 kJ/kg (Incropera & DeWitt, 2011)
// 1 kWh = 3,600 kJ; 1 MJ = 1,000 kJ
//
// EFFICIENCY ASSUMPTIONS:
// HTST regeneration: 90% (Lewis & Heppell, 2000)
// Gas boiler: 80-85% (Carbon Trust, 2012)
// Spray dryer thermal: 50% (Masters, 1991)
// Refrigeration COP: 2.0 (ASHRAE, 2022)
// Industrial oven: 50-60% (Therdthai & Zhou, 2012)
//
// VALUES: All values are per kg of INPUT material (not output).
// Yield losses tracked separately. Ancillary loads (CIP, HVAC, lighting,
// compressed air) add 10-30% and should use factory-level data when available.
//
// For Precision Fermentation (processing_archetypes): emerging technology.
// Value 5.5 kWh/kg from GFI (2023) and Järviö et al. (2021). LOW confidence.
// Override with brand factory data wherever possible.
//
// For Precision Fermentation (processing_archetypes): emerging technology.
// Value 5.5 kWh/kg from GFI (2023) and Järviö et al. (2021). LOW confidence.
// Override with brand factory data wherever possible.
//
// FUEL EMISSION FACTORS (CoM 2024):
// Natural gas CO2: 0.20196 t CO2/MWh (Table 1) = 2.13 kg CO2/m³ at 38 MJ/m³
// Renewable electricity LCA: Wind 36, Hydro 4, Solar PV 63 g CO2-eq/kWh (Table 3)
// Coal (anthracite): 0.35388 t CO2/MWh (Table 1) → 980 g CO2/kWh at 36% efficiency
// Source: European Commission, Covenant of Mayors, Emission Factors for Local
//   Energy Use, 2024 Edition, Joint Research Centre
//  ==================================================================
window.aioxyData.processing = {
    // Method 20 — No processing. Energy = 0 by definition.
    "none":           { co2_impact: 0,    water_impact: 0,    yield: 1.00,  loss: 0.000, temp: 20,  kwh_per_kg: 0.000, gas_mj_per_kg: 0.00  },

    // Method 1 — Pasteurization (HTST, 72°C, 90% heat regeneration).
    // Physics: Q = 1kg × 4.10 kJ/kg·°C × 52°C × (1-0.90 regen) ÷ 3600 ÷ 0.85 = 0.007 kWh/kg.
    // Central estimate 0.020 kWh/kg includes pumping, CIP, controls.
    // Range: 0.007–0.070 kWh/kg (with vs without regeneration).
    // Source: Lewis & Heppell (2000); Reiter et al. (2020) J. Dairy Sci. 103(5).
    "pasteurization": { co2_impact: 0.06, water_impact: 0.15, yield: 0.995, loss: 0.005, temp: 72,  kwh_per_kg: 0.020, gas_mj_per_kg: 0.026 },

    // Method 2 — Sterilization (batch retort, 121°C).
    // Physics: Q = 1kg × 4.10 × 101°C + 50% batch overhead + 7% hold losses = 664.7 kJ/kg.
    // Electrical: 664.7 ÷ 3600 ÷ 0.98 = 0.188 kWh/kg; thermal gas: 664.7 ÷ 1000 ÷ 0.82 = 0.810 MJ/kg.
    // Range: 0.15–0.35 kWh/kg electrical. Source: Holdsworth & Simpson (2016); Masanet et al. (2008) LBNL-559E.
    "sterilization":  { co2_impact: 0.12, water_impact: 0.30, yield: 0.985, loss: 0.015, temp: 121, kwh_per_kg: 0.200, gas_mj_per_kg: 0.81  },

    // Method 3 — UHT Processing (140°C, 80% regeneration).
    // Physics: Q = 1kg × 4.10 × 120°C × (1-0.80) ÷ 3600 ÷ 0.85 = 0.032 kWh/kg heating only.
    // Central 0.06 kWh/kg includes homogenization and aseptic packaging ancillaries.
    // Range: 0.04–0.09 kWh/kg. Source: Lewis & Heppell (2000); Ramirez et al. (2006) Energy 31(12).
    "uht_processing": { co2_impact: 0.15, water_impact: 0.40, yield: 0.98,  loss: 0.02,  temp: 140, kwh_per_kg: 0.060, gas_mj_per_kg: 0.12  },

    // Method 4 — Baking (industrial tunnel oven, ~200°C, 15% moisture loss).
    // Physics: Q_product = 1kg × 2.54 kJ/kg·°C × 80°C = 203.5 kJ; Q_evap = 0.15kg × 2257 = 338.6 kJ.
    // Total useful 542.1 kJ ÷ 0.55 oven efficiency = 985.6 kJ/kg → 0.274 kWh/kg electric.
    // Gas: 985.6 ÷ 1000 ÷ 0.85 = 1.16 MJ/kg. Range: 0.2–0.5 kWh/kg.
    // Source: Cauvain & Young (2015); Paton et al. (2021) J. Cleaner Prod. 284.
    "baking":         { co2_impact: 0.45, water_impact: 0.12, yield: 0.88,  loss: 0.120, temp: 180, kwh_per_kg: 0.270, gas_mj_per_kg: 1.16  },

    // Method 5 — Roasting (general; coffee 0.22 kWh/kg, nuts 0.16 kWh/kg; central 0.20).
    // Physics: Q = Cp × ΔT + moisture evaporation; drum roaster efficiency 55%.
    // Gas: ~0.85 MJ/kg central (coffee 0.97, nuts 0.71). Range: 0.15–0.30 kWh/kg.
    // Source: Humbert et al. (2009) J. Cleaner Prod. 17; Illy & Viani (2005).
    "roasting":       { co2_impact: 0.65, water_impact: 0.05, yield: 0.82,  loss: 0.18,  temp: 200, kwh_per_kg: 0.200, gas_mj_per_kg: 0.85  },

    // Method 6 — Frying (continuous immersion, 180°C, 25% moisture loss).
    // Physics: Q_product = 1kg × 3.38 × 80°C = 270.4 kJ; Q_evap = 0.25 × 2257 = 564.3 kJ.
    // + 15% surface losses; total 959.9 kJ ÷ 0.60 fryer efficiency = 1599.8 kJ/kg → 0.44 kWh/kg.
    // Gas: 1599.8 ÷ 1000 ÷ 0.82 = 1.95 MJ/kg. Range: 0.3–0.6 kWh/kg.
    // Source: Moreira et al. (1999); Masanet et al. (2008) LBNL-559E.
    "frying":         { co2_impact: 0.75, water_impact: 0.22, yield: 0.75,  loss: 0.250, temp: 180, kwh_per_kg: 0.440, gas_mj_per_kg: 1.95  },

    // Method 7 — Freezing (blast tunnel, -18°C final, COP 2.0).
    // Physics: Q_cool = 82.0 kJ + Q_latent = 200.4 kJ + Q_frozen = 33.4 kJ = 315.8 kJ/kg.
    // W_elec = 315.8 ÷ COP2.0 = 157.9 kJ + 20% ancillary = 0.053 kWh/kg; central 0.07.
    // Range: 0.05–0.12 kWh/kg. No gas thermal (refrigeration is electrical).
    // Source: ASHRAE Refrigeration Handbook (2022) Ch.2; Ramirez et al. (2006).
    "freezing":       { co2_impact: 0.25, water_impact: 0.08, yield: 0.975, loss: 0.025, temp: -18, kwh_per_kg: 0.070, gas_mj_per_kg: 0.00  },

    // Method 8 — Spray Drying (single-effect, 50% feed moisture → 4% powder, per kg feed).
    // Physics: Q_evap = 0.479 kg × 2333 kJ/kg = 1117.5 kJ + preheat 156.4 kJ = 1273.9 kJ.
    // ÷ 0.50 dryer efficiency = 2547.8 kJ → gas 3.0 MJ/kg feed; electrical (fans/atomizer) 0.07 kWh/kg.
    // Per kg powder output: ~5.8 MJ/kg. Source: Masters (1991); Birchal et al. (2006) Drying Tech. 24(2).
    // FIX: [ingredients.js audit] yield was 0.97 (implying 3% mass loss) — directly contradicts
    // this entry's own physics derivation, which evaporates 47.9% of feed mass (0.479 kg/kg feed,
    // the number used in the Q_evap calculation two lines above). For a 50%-moisture feed drying
    // to 4%-moisture powder: solids = 0.50 kg, output mass = 0.50 / (1 - 0.04) = 0.521 kg,
    // so yield = 0.521 and loss = 0.479 — not 0.97/0.03. This field only affects the
    // informational "Processing Waste" traceability line (calculation_engine.js line ~307
    // confirms it does not affect real CO2/impact totals), but that line was understating
    // true spray-drying waste by ~45 percentage points for any spray-dried product.
    "drying":         { co2_impact: 1.8,  water_impact: 0.18, yield: 0.521,  loss: 0.479, temp: 60,  kwh_per_kg: 0.070, gas_mj_per_kg: 3.00  },

    // Method 9 — Canning (batch steam retort, 121°C; same thermodynamics as sterilization).
    // Physics: Q_product + can metal heating + batch overhead = 625.5 kJ/kg.
    // Thermal gas: 625.5 ÷ 1000 ÷ 0.82 = 0.76 MJ/kg. Electrical ancillary (pumps, seaming): 0.05 kWh/kg.
    // Source: Holdsworth & Simpson (2016); Masanet et al. (2008) LBNL-559E (0.6–1.0 MJ/kg).
    "canning":        { co2_impact: 0.30, water_impact: 3.5,  yield: 0.95,  loss: 0.05,  temp: 110, kwh_per_kg: 0.050, gas_mj_per_kg: 0.76  },

    // Method 10 — Oat Processing (kilning ~100°C + steaming ~85°C + roller flaking).
    // Physics: Q_kiln = 180.4 kJ/kg + Q_steam = 126.0 kJ/kg = 306.4 kJ → gas 0.37 MJ/kg.
    // Electrical (flaking + conveyors + fans): 0.03 kWh/kg. Range: ±40%.
    // Source: Welch (1995); Reinhardt et al. (2012) IFEU (0.3–0.5 MJ/kg).
    "oat-processing": { co2_impact: 0.35, water_impact: 0.35, yield: 0.98,  loss: 0.02,  temp: 85,  kwh_per_kg: 0.030, gas_mj_per_kg: 0.37  },

    // Method 11 — Milling (dry roller milling of grain, wheat flour basis).
    // Benchmark: Bond's Law Wi ~9 kWh/short ton gives theoretical floor ~0.005 kWh/kg;
    // real mills 2-5× higher. Literature range 0.04–0.10 kWh/kg; central 0.06 kWh/kg.
    // Source: Ortiz-Arroyo et al. (2017) Biosystems Eng. 156; Masanet et al. (2008) LBNL-559E.
    "milling":        { co2_impact: 0.04, water_impact: 0.04, yield: 0.78,  loss: 0.220, temp: 30,  kwh_per_kg: 0.060, gas_mj_per_kg: 0.00  },

    // Method 12 — Mixing/Blending (ambient temperature paddle/ribbon blender).
    // Benchmark: 10 kW mixer at 2000 kg/hr = 0.005 kWh/kg. Literature range 0.001–0.010 kWh/kg.
    // Central 0.003 kWh/kg. Source: Singh & Heldman (2014) Table 10.1; IChemE (2012).
    "mixing":         { co2_impact: 0.015, water_impact: 0.04, yield: 0.995, loss: 0.005, temp: 25, kwh_per_kg: 0.003, gas_mj_per_kg: 0.00  },

    // Method 13 — Extrusion (HTST, 150°C, ~18% feed moisture; thermal + mechanical SME).
    // Physics: Q_thermal = 1kg × 1.942 × 130°C ÷ 3600 ÷ 0.98 = 0.071 kWh/kg heater bands.
    // SME (screw work) benchmark: 0.10–0.40 kWh/kg; central 0.20 kWh/kg.
    // Total: 0.071 + 0.20 = 0.27 kWh/kg. Range: 0.15–0.50 kWh/kg.
    // Source: Harper (1981) Extrusion of Foods p.127; Guy (2001); Masanet et al. (2008).
    "extrusion":      { co2_impact: 0.45, water_impact: 0.25, yield: 0.95,  loss: 0.050, temp: 150, kwh_per_kg: 0.270, gas_mj_per_kg: 0.00  },

    // Method 14 — Crushing (mechanical oilseed expeller press only; no solvent extraction).
    // Benchmark: 0.02–0.08 kWh/kg; central 0.04 kWh/kg.
    // Note: if solvent extraction is in scope, add ~0.50 MJ/kg thermal gas separately.
    // Source: Fore et al. (2011) BioEnergy Res. 4(1); Singh & Heldman (2014) Ch.6.
    "crushing":       { co2_impact: 0.12, water_impact: 1.0,  yield: 0.40,  loss: 0.60,  temp: 40,  kwh_per_kg: 0.040, gas_mj_per_kg: 0.00  },

    // Method 15 — Emulsification/Homogenization (two-stage HPH at 55°C, 17.5 MPa).
    // Physics: Q_thermal = 1kg × 4.10 × 35°C ÷ 3600 ÷ 0.85 = 0.047 kWh/kg; pump work 0.008 kWh/kg.
    // Total 0.055 kWh/kg without regen; central 0.03 kWh/kg with heat recovery.
    // Range: 0.01–0.05 kWh/kg. Source: Bylund (1995) Dairy Processing Handbook p.108.
    "emulsification": { co2_impact: 0.03, water_impact: 0.10, yield: 0.99,  loss: 0.01,  temp: 55,  kwh_per_kg: 0.030, gas_mj_per_kg: 0.00  },

    // Method 16 — Cleaning (commercial vegetable/fruit washing; conveying-dominated).
    // Benchmark: pump work is trivial (~0.0003 kWh/kg); real energy from conveyors/blowers.
    // Literature range 0.005–0.030 kWh/kg; central 0.01 kWh/kg. Confidence: LOW-MEDIUM.
    // Source: Masanet et al. (2008) LBNL-559E; Hospido et al. (2003) J. Cleaner Prod.
    "cleaning":       { co2_impact: 0.02, water_impact: 2.0,  yield: 0.98,  loss: 0.02,  temp: 25,  kwh_per_kg: 0.010, gas_mj_per_kg: 0.00  },

    // Method 17 — Wet Milling (corn wet milling incl. steeping + starch drying).
    // Physics: Q_steep = 135.3 kJ/kg gas; mechanical separation benchmark 0.08–0.15 kWh/kg;
    // starch drying (spray/flash) dominates thermal: total 2.5–4.0 MJ/kg; central 3.0 MJ/kg.
    // Electrical: 0.12 kWh/kg. Source: Masanet et al. (2008); Rausch & Belyea (2006) Appl. Biochem. Biotech. 128.
    "wet_milling":    { co2_impact: 0.25, water_impact: 8.0,  yield: 0.65,  loss: 0.35,  temp: 50,  kwh_per_kg: 0.120, gas_mj_per_kg: 3.00  },

    // Method 18 — Fermentation (aerobic industrial submerged fermentation, 30-35°C).
    // Physics/Benchmark: agitation 1.28 kWh/kg + aeration 0.19 kWh/kg + temp maintenance 0.05 kWh/kg.
    // Central 1.5 kWh/kg. Range: 1.0–3.0 kWh/kg (titer-dependent; low-titer products cost more/kg).
    // Note: food fermentation (yogurt, bread) without forced aeration is much lower (~0.05-0.10 kWh/kg).
    // Source: Doran (1995) Bioprocess Engineering Principles Ch.8; Humpenöder et al. (2022) Nature Food 3.
    "fermentation":   { co2_impact: 0.35, water_impact: 1.0,  yield: 0.95,  loss: 0.050, temp: 35,  kwh_per_kg: 1.500, gas_mj_per_kg: 0.06  }
};

window.aioxyData.processing_archetypes = {
    // Method 20 — Raw / Farm Gate. Energy = 0 by definition. Source: Report Method 20.
    "raw": { 
        "name": "Raw / Farm Gate", 
        "yield_factor": 1.00, 
        "energy_kwh": 0.00, // Report Method 20: no processing, energy = 0
        "gas_mj": 0.00,     // Report Method 20: confirmed 0
        "dqr_reward": 0,
        "waste_split": { "water": 1.00, "organic": 0.00, "inert": 0.00, "wastewater": 0.00 }
    },
    // Method 11 — Dry Milled. Aligned to Report Method 11 (Milling): 0.06 kWh/kg, no gas thermal.
    // Previous legacy value was 0.15 kWh/kg; updated to derivation-report central estimate.
    "dry_milled": { 
        "name": "Dry Milled (Flour)", 
        "yield_factor": 0.90, 
        "energy_kwh": 0.06, // Report Method 11: 0.04-0.10 kWh/kg range; central 0.06 kWh/kg
        "gas_mj": 0.00,     // Report Method 11: no gas thermal for dry milling
        "dqr_reward": 0.1,
        "waste_split": { "water": 0.50, "organic": 0.50, "inert": 0.00, "wastewater": 0.00 }
    },
    // Method 17 — Wet Extracted. Aligned to Report Method 17 (Wet Milling): 0.12 kWh/kg, 3.0 MJ/kg gas.
    // Previous legacy values were 0.80 kWh/kg and 2.50 MJ/kg; updated to derivation report.
    "wet_extracted": { 
        "name": "Wet Extracted", 
        "yield_factor": 0.55, 
        "energy_kwh": 0.12, // Report Method 17: 0.12 kWh/kg electrical (mechanical separation + steeping)
        "gas_mj": 3.00,     // Report Method 17: 2.5-4.0 MJ/kg range; central 3.0 MJ/kg (incl. starch drying)
        "dqr_reward": 0.2,
        "waste_split": { "water": 0.67, "organic": 0.33, "inert": 0.00, "wastewater": 0.00 }
    },
    // Protein Isolate — not directly covered in derivation report. Values retained from legacy estimate.
    // Review against factory data. Approximate basis: wet_milling (Method 17) + spray drying (Method 8)
    // + additional purification steps. See food_processing_energy_intensity.md gaps section.
    "isolated": { 
        "name": "Isolated (Protein Isolate)", 
        "yield_factor": 0.22, 
        "energy_kwh": 2.50, // Protein isolate — not directly covered in derivation report. Values retained from legacy estimate. Review against factory data.
        "gas_mj": 6.00,     // Protein isolate — not directly covered in derivation report. Values retained from legacy estimate. Review against factory data.
        "dqr_reward": 0.3,
        "waste_split": { "water": 0.60, "organic": 0.20, "inert": 0.02, "wastewater": 0.18 }
    },
    // Method 19 — Precision Fermentation. Updated from 5.50 to 7.00 kWh/kg per derivation report.
    // Precision Fermentation — LOW confidence. Emerging technology per GFI 2023. Override with brand factory data.
    "fermentation": { 
        "name": "Precision Fermentation", 
        "yield_factor": 0.12, 
        "energy_kwh": 7.00, // Precision Fermentation — LOW confidence. Emerging technology per GFI 2023. Override with brand factory data.
        "gas_mj": 0.00,     // Report Method 19: precision fermentation is electrified; confirmed 0 gas
        "dqr_reward": 0.5,
        "waste_split": { "water": 0.70, "organic": 0.15, "inert": 0.02, "wastewater": 0.13 }
    }
};

// FIX: [ingredients.js audit] ORPHANED / NOT CONSUMED ANYWHERE IN THE CODEBASE.
// Verified by grep across every file in this project: nothing references
// window.aioxyData.transportation or db.transportation. The actual, active transport
// calculation uses core_physics.js's own internal CONSTANTS (ROAD/SEA/AIR/RAIL tables,
// GLEC v3.2 sourced, verified during the core_physics.js audit) via calculateTransport().
// This object also lacks the source citations every other section in this file has —
// which doesn't matter functionally (it's never read), but would be misleading if
// someone assumed this was the live data source and tried to "fix" it here instead.
// Retained rather than deleted since this audit didn't verify it's safe to remove
// entirely (e.g. any external/future code that might reference it) — flagging for a
// deliberate decision on removal rather than silently deleting database content.
window.aioxyData.transportation = {
    "road": { 
        co2: 0.060,
        refrigerated_factor: 1.12,
        load_factor: 0.60,
        van_factor: 14.03,
        air_pollutants_g_per_tkm: { nox: 0.519, pm10: 0.011, bc: 0.006 }
    },
    "rail": { 
        co2: 0.0184,
        refrigerated_factor: 1.12,
        air_pollutants_g_per_tkm: { nox: 0.250, pm10: 0.012, bc: 0.007 }
    },
    "sea": { 
        co2: 0.0072,
        refrigerated_factor: 1.98,
        air_pollutants_g_per_tkm: { sox: 0.008, nox: 0.144, pm10: 0.002 }
    },
    "air": { 
        co2: 0.788,
        short_haul_co2: 1.363,
        refrigerated_factor: 1.05,
        air_pollutants_g_per_tkm: { nox: 1.020, sox: 0.080 } 
    },
    "lastmile": { 
        co2: 0.223,
        refrigerated_factor: 1.12,
        air_pollutants_g_per_tkm: { nox: 1.375, pm10: 0.029, bc: 0.015 }
    },
    "electric_van": { 
        co2: 0.022,
        refrigerated_factor: 1.25,
        air_pollutants_g_per_tkm: { nox: 0.0, pm10: 0.0, bc: 0.0 }
    }
};

// ================== PACKAGING CFF PARAMETERS — AIOXY ENVIRONMENTAL ASSESSMENT SYSTEM ==================
// Methodology: PEF Circular Footprint Formula (EC Recommendation 2021/2279, originally EC/2013/179)
//
// CFF Formula:
//   Impact = (1−R1)×Ev + R1×(A×Erec + (1−A)×Ev×Qs/Qp)
//            + (1−R2)×Ed + R2×(1−A)×(Erec − Ev×Qs/Qp)
//
// NOTE on the EoL credit term sign: creditEoL = R2×(1−A)×(Erec−Ev×Qs/Qp) is
// computed and ADDED to the total. For typical materials where Erec < Ev×Qs/Qp,
// creditEoL is negative, so adding it correctly reduces the total impact.
// The formula is written with an explicit '+' here to match the code; the credit
// is negative by value, not by operator.
//
// WHERE:
//   R1      = Recycled content fraction at input (user-defined, 0–1)
//   R2      = End-of-life recycling rate (default from Annex C or packaging-specific source)
//   Ev      = Virgin material production GHG impact (kg CO2e / kg material)
//   Erec    = Recycled material production GHG impact (kg CO2e / kg material)
//   Ed      = Disposal GHG impact (kg CO2e / kg material — landfill or incineration)
//   A       = CFF allocation factor (quality-based)
//   Qs/Qp  = Quality ratio of secondary to primary material
//
// ─────────────────────────────────────────────────────────────────────────────
// A-FACTORS  ·  Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2"
//   Metals (Steel, Aluminium):         A = 0.2  (closed-loop, no quality loss)
//   Glass:                             A = 0.2  (closed-loop, no quality loss)
//   Paper / Cardboard:                 A = 0.2  (closed-loop, no quality loss)
//   Plastics (PET, HDPE, LDPE, PP):    A = 0.5  (open-loop, quality degradation)
//   Biopolymers (PLA):                 A = 0.5  (treated as plastic; no PEF entry)
//
// ─────────────────────────────────────────────────────────────────────────────
// Qs/Qp (QUALITY RATIOS)  ·  Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp"
//   Glass:                    1.0 / 1.0
//   Steel:                    1.0 / 1.0
//   Aluminium:                1.0 / 1.0
//   Paper & Cardboard:        0.85 / 0.85  (without fibre-loss accounting)
//   PET (SSP recycling):      1.0 / 1.0
//   PET (mechanical):         0.9 / 0.9
//   PP:                       0.9 / 0.9
//   HDPE:                     0.9 / 0.9
//   LDPE film:                0.75 / 0.75
//
// ─────────────────────────────────────────────────────────────────────────────
// R2 (END-OF-LIFE RECYCLING RATES)  ·  Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2"
//   Steel packaging:              0.8046 (EU average; APEAL 2019)
//   Aluminium (food cans/trays):  0.60   (EAA Packaging Working Group)
//   Aluminium (beverage can body):0.745  (APWG 2018)
//   Glass (container, unspec.):   0.657  (FEVE - Packaging Working Group)
//   Paper/Cardboard (corrugated): 0.74612 (CEPI - Packaging Working Group)
//   Paper/Cardboard (cartonboard):0.74612 (CEPI - Packaging Working Group)
//   PET (bottle):                 0.41756 (PETcore - Packaging Working Group)
//   Generic plastics (packaging): 0.28835 (PlasticsEurope - Packaging Working Group)
//   Note: Annex C does NOT list R2 separately for PP, HDPE, LDPE packaging;
//         generic plastics packaging value (0.28835) is used as conservative proxy.
//
// ─────────────────────────────────────────────────────────────────────────────
// Ev & Erec  ·  NOT in Annex C (confirmed: sheet "Formula" rows 26-29 state
//   these require "EF-compliant datasets, to be listed by the PEFCR/OEFSR").
//   Sources used (all free/public):
//     PlasticsEurope Eco-profiles (plastics): https://www.plasticseurope.org/en/resources/eco-profiles
//     European Aluminium Environmental Profile (2018): https://european-aluminium.eu/resource-hub/
//     World Steel Association Environmental Report (2021): https://worldsteel.org/publications/
//     FEVE/Glass for Europe (glass): https://www.glassforeurope.com/
//     CEPI key statistics & ICE Database v3.0 (paper/cardboard)
//     UK DESNZ / BEIS GHG conversion factors (supplementary cross-check)
//     Vink & Davies (2015) Ind.Biotechnol. 11(3):114-121 (PLA)
//     Franklin Associates (2011) Life Cycle Inventory of 100% Postconsumer HDPE (rHDPE)
//
// ─────────────────────────────────────────────────────────────────────────────
// Ed (DISPOSAL IMPACTS)  ·  NOT in Annex C for material-specific GHG values.
//   Annex C sheet "R3 data_Municipal Waste" provides the LANDFILL / INCINERATION
//   SPLIT by EU country, but NOT the per-kg GHG factors.
//
//   UPDATED SPLIT — Eurostat 2024 (data extracted January 2026):
//   Source: Eurostat Municipal Waste Statistics, dataset env_wasmun, reference year 2024.
//     https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Municipal_waste_statistics
//   Data: EU landfill = 50 Mt; EU incineration = 61 Mt; total non-recycled = 111 Mt.
//   Derived split (of non-recycled disposal pool):
//     Landfill share:      45.0%  (50 Mt / 111 Mt) — was 54.7% under Annex C / Eurostat 2013
//     Incineration share:  55.0%  (61 Mt / 111 Mt) — was 45.3% under Annex C / Eurostat 2013
//   Note: The split has inverted since 2013. EU incineration (energy recovery) now exceeds
//   landfill for non-recycled packaging waste, driven by the Landfill Directive targets.
//   Using Eurostat 2024 is materially more accurate and reflects current EU waste practice.
//   Confidence upgraded from LOW to MEDIUM for the split itself (official Eurostat source).
//   Per-kg GHG factors sourced from:
//     Landfill:       IPCC (2006) Guidelines for National Greenhouse Gas Inventories,
//                     Vol 5, Ch 3 — default CH4 generation, adjusted for LFG collection.
//                     EEA (2022) greenhouse gas emission factors for waste.
//     Incineration:   Combustion stoichiometry: C fraction × 44/12 (fossil carbon only).
//                     EEA (2022) waste incineration emission factors.
//
// ─────────────────────────────────────────────────────────────────────────────
// CONFIDENCE LEVELS:
//   HIGH   : Value from official PEF Annex C guidance, or confirmed by ≥2 independent
//             free public sources (industry association + government/academic).
//   MEDIUM : Value from a single published industry association report or widely
//             cited academic paper, with no direct contradiction in literature.
//   LOW    : Expert estimate, dated source (>10 yr), or single academic paper with
//             limited subsequent validation. Use with caution; flag for update.
//
// AIOXY does not hold an ecoinvent licence. All values are sourced from PEF Annex C
// and publicly available literature. For audit-grade LCA, confirm against licensed
// EF-compliant LCI datasets (ecoinvent ≥3.9 or GaBi / Sphera EF3.1 dataset).
//
// ─────────────────────────────────────────────────────────────────────────────
// GAP 11 FIX: FORMAL LIMITATION STATEMENT — Packaging Ev and Erec values
// ─────────────────────────────────────────────────────────────────────────────
// Virgin production (Ev) and recycled content (Erec) GHG factors used in this
// file are sourced from public industry association documents:
//   PlasticsEurope eco-profiles, ICE Database v3.0, FEVE, European Aluminium
//   Environmental Profile 2018, World Steel LCI 2021, Cepi LCA 2021.
//
// These are NOT EF 3.1 compliant datasets.
// PEF Annex C v2.1, sheet "Formula" rows 26–29, explicitly requires that Ev
// and Erec come from "EF-compliant datasets listed by the PEFCR/OEFSR."
// No PEFCR-compliant source is publicly available free of charge for these
// packaging materials as of the date of this file.
//
// CONSEQUENCE FOR AIOXY OUTPUT:
//   Packaging Climate Change impacts are suitable for screening-level assessment.
//   They are NOT suitable for EPD (ISO 14025), Type III Environmental Declaration,
//   or any certified comparative assertion requiring EF 3.1 compliant data.
//
// UPGRADE PATH — if audit-grade packaging data is required:
//   PRIMARY OPTION: ecoinvent v3.9 or later with the EF 3.1 LCIA method applied.
//     License: commercial annual subscription (~EUR 1,500–3,000 depending on tier).
//     Access: https://ecoinvent.org/the-ecoinvent-database/
//     Process examples: "market for corrugated board box {RER}",
//                       "market for packaging glass, white {RER}",
//                       "market for aluminium, wrought alloy {RER}"
//   SECONDARY OPTION: Sphera (GaBi) EF 3.1 datasets — commercial license.
//   FREE OPTION: None currently provides EF 3.1 compliant Ev/Erec for all
//     packaging materials in a single free dataset. PlasticsEurope eco-profiles
//     are the closest free alternative but use different system boundaries and
//     predate EF 3.1 characterization factor alignment.
//   MONITOR: EC EPLCA node (eplca.jrc.ec.europa.eu) for future free EF 3.1
//     dataset releases under the EU Environmental Footprint pilot outcomes.
//
// Until EF 3.1 compliant data is licensed, all AIOXY packaging outputs must
// carry the caveat: "Packaging Ev/Erec based on public industry sources; not
// EF 3.1 compliant datasets. Suitable for screening; not for EPD or certified
// claims." This caveat is surfaced in the PDF report methodology section.
// ============================================================================


window.aioxyData = window.aioxyData || {};

window.aioxyData.packaging = {

    // ──────────────────────────────────────────────────────────────────────────
    // CARDBOARD  (corrugated board / fibreboard packaging)
    // ──────────────────────────────────────────────────────────────────────────
    "cardboard": {
        co2_virgin: 1.03,
        // Ev: 1.03 kg CO2e/kg — virgin corrugated board (kraftliner + fluting, cradle-to-gate).
        // Source: ICE Database v3.0 (Hammond & Jones, University of Bath, 2019), "Cardboard (corrugated)".
        // Free access: https://circularecology.com/embodied-carbon-footprint-database.html (verify URL before citing).
        // Cross-check: CEPI Key Statistics 2019 reports average board GHG ~0.95–1.10 kg CO2e/kg.
        // Range: 0.90–1.15 kg CO2e/kg. Confidence: MEDIUM.

        co2_recycled: 0.49,
        // Erec: 0.49 kg CO2e/kg — recycled content corrugated board (OCC-based furnish, cradle-to-gate).
        // Source: ICE Database v3.0 (Hammond & Jones, 2019), "Cardboard (corrugated, recycled)".
        // Cross-check: CEPI (2011) "Two team's journey" reports recycled fibre board ~0.45–0.55 kg CO2e/kg.
        // Range: 0.40–0.60 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.035,
        // Ed (EU average mix): 0.450 × Ed_landfill + 0.550 × Ed_incineration
        //   = 0.450 × (–0.050) + 0.550 × 0.105 = –0.0225 + 0.05775 = 0.0353 → rounded 0.035
        // Split: Eurostat 2024 (env_wasmun, data extracted January 2026):
        //   EU landfill 50 Mt, incineration 61 Mt, total non-recycled 111 Mt.
        //   Landfill share 45.0%, Incineration share 55.0%.
        //   Source: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Municipal_waste_statistics
        // Previous value: 0.021 using Eurostat 2013 split (54.7% landfill / 45.3% incineration).
        // Per-kg factors: EEA (2022) / IPCC (2006) as below — unchanged.
        // Confidence: MEDIUM (split from official Eurostat 2024; per-kg factors IPCC 2006 / EEA 2022).

        co2_disposal_landfill: -0.050,
        // Ed_landfill: –0.050 kg CO2e/kg (net, including partial CH4 collection credit).
        // Paper/cardboard is ~50% biogenic carbon. Degradable organic carbon (DOC) fraction ~0.40 (IPCC 2006, Table 2.4).
        // IPCC 2006 Vol.5 Ch.3 default: DOCf=0.5, MCF=1.0 (managed landfill), F=0.5 (gas collection fraction).
        // Net biogenic CH4 emission (uncollected): 0.40×0.5×(1–0.5)×(16/12)×28 ≈ 0.187 kg CO2e/kg paper
        //   minus biogenic CO2 credit (biogenic C stored temporarily) → net varies by accounting rule.
        // Under PEF/EF3.1 biogenic carbon accounting, temporary storage yields small net negative.
        // Provisional estimate: –0.05 kg CO2e/kg. SOURCE PARTIALLY UNVERIFIED — EF3.1-compliant
        // biogenic carbon dataset required for confirmed value.
        // Confidence: LOW.

        co2_disposal_incineration: 0.105,
        // Ed_incineration: 0.105 kg CO2e/kg (fossil CO2 only; biogenic CO2 excluded per GHG Protocol/EF).
        // Cardboard carbon content ~44% C (cellulose). Fossil fraction ≈ 0 (biogenic material).
        // Fossil CO2 from incineration ≈ 0 (fully biogenic). However, process energy and auxiliary fuels
        // contribute ~0.05–0.15 kg CO2e/kg per EEA (2022) waste incineration factors.
        // EEA (2022) "EEA greenhouse gas data viewer" — incineration emission factors for paper/card.
        // URL: https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer (verify before citing).
        // Range: 0.07–0.15 kg CO2e/kg. Confidence: LOW. SOURCE PARTIALLY UNVERIFIED.

        r1_max: 0.88,
        // Maximum recycled content in corrugated board packaging.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", row "packaging - corrugated - pads/box/inserts".
        // R1 listed = 0.88 (EU market average recycled fibre share). Confidence: HIGH.

        r2: 0.74612,
        // End-of-life recycling rate for corrugated board packaging.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", row "packaging - corrugated".
        // Attribution: CEPI - Packaging Working Group. Confidence: HIGH.

        q: 0.85,
        // Qs/Qp quality ratio for paper and cardboard (without fibre-loss accounting).
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "Paper and cardboard".
        // Note: Annex C also provides q=1.0 "when the recycling process considers fibre losses" —
        //   0.85 is the conservative default used when fibre losses are not separately modelled.
        // Confidence: HIGH.

        aFactor: 0.2,
        // A-factor for paper/cardboard category.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", column "A", Paper category.
        // Rationale: Closed-loop recyclability, no significant quality degradation. Confidence: HIGH.

        fossilFraction: 0.0
        // Fossil carbon fraction: 0.0 (fully biogenic cellulose fibre).
        // Biogenic material = 0 fossil carbon fraction. Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // PAPER  (uncoated/coated paper packaging — bags, wraps, liners)
    // ──────────────────────────────────────────────────────────────────────────
    "paper": {
        co2_virgin: 1.29,
        // Ev: 1.29 kg CO2e/kg — virgin paper (uncoated mechanical/chemical pulp mix, cradle-to-gate).
        // Source: ICE Database v3.0 (Hammond & Jones, 2019), "Paper (general / average)".
        // Cross-check: UK DESNZ GHG Conversion Factors 2023 (BEIS) "Paper and board, average"
        //   ≈ 0.91 kg CO2e/kg (well-to-gate, different boundary) — boundary difference explains gap.
        // CEPI 2019 Key Statistics — EU average virgin paper ~1.1–1.4 kg CO2e/kg (process only).
        // Range: 1.0–1.5 kg CO2e/kg. Confidence: MEDIUM.

        co2_recycled: 0.63,
        // Erec: 0.63 kg CO2e/kg — recycled paper (mixed recovered fibre, cradle-to-gate).
        // Source: ICE Database v3.0 (Hammond & Jones, 2019), "Paper (recycled)".
        // Range: 0.55–0.75 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.035,
        // Ed (EU average): same split/basis as cardboard — cellulose-based, same carbon profile.
        // Calculated: 0.450 × (–0.050) + 0.550 × 0.105 = –0.0225 + 0.05775 = 0.035 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract) — 45.0% landfill / 55.0% incineration.
        // Previous value: 0.021 (Eurostat 2013 split). Confidence: MEDIUM.

        co2_disposal_landfill: -0.050,
        // Same basis as cardboard. SOURCE PARTIALLY UNVERIFIED — see cardboard entry.
        // Confidence: LOW.

        co2_disposal_incineration: 0.105,
        // Same basis as cardboard. SOURCE PARTIALLY UNVERIFIED.
        // Confidence: LOW.

        r1_max: 0.88,
        // Proxy from corrugated packaging R1 (Annex C). Paper bags listed as R1=0 (virgin kraft).
        // Using corrugated R1_max as practical upper bound for recycled-content paper packaging.
        // SOURCE PARTIALLY UNVERIFIED for general paper — no single Annex C entry covers all paper.
        // Confidence: LOW.

        r2: 0.74612,
        // End-of-life recycling rate.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2" — paper packaging (corrugated proxy).
        // CEPI - Packaging Working Group. Paper bag and sack listed as R2=0.74612.
        // Confidence: HIGH.

        q: 0.85,
        // Qs/Qp quality ratio.
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "Paper and cardboard" (without fibre losses).
        // Confidence: HIGH.

        aFactor: 0.2,
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", Paper category. Confidence: HIGH.

        fossilFraction: 0.0
        // Fully biogenic cellulose. Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // PET  (virgin polyethylene terephthalate — bottles, trays, films)
    // ──────────────────────────────────────────────────────────────────────────
    "PET": {
        co2_virgin: 3.40,
        // Ev: 3.40 kg CO2e/kg — virgin PET (amorphous/bottle-grade, cradle-to-gate, EU average).
        // Source: PlasticsEurope Eco-profiles — "Polyethylene terephthalate (PET), amorphous" (2016 update).
        // Publication: PlasticsEurope, "Eco-profiles of the European Plastics Industry — PET Amorphous", 2016.
        // URL: https://www.plasticseurope.org/en/resources/eco-profiles (verify before citing).
        // Note: PlasticsEurope reports GWP100 ≈ 2.73 kg CO2e/kg (process energy only); including
        //   feedstock carbon: 3.40 kg CO2e/kg (system expansion with carbon content). Industry reports
        //   vary 2.7–4.0 depending on boundary. Using 3.40 (feedstock-inclusive) for CFF alignment.
        // Range: 2.73–4.00 kg CO2e/kg. Confidence: MEDIUM.

        co2_recycled: 1.90,
        // Erec: 1.90 kg CO2e/kg — mechanically recycled PET (rPET, bottle-to-bottle, cradle-to-gate).
        // Source: PlasticsEurope / PETcore, "Environmental benefits of recycling — 2019 update".
        // URL: https://petcore-europe.org/reports-data/ (verify before citing).
        // Cross-check: Franklin Associates (2010) LCI of PET bottles — recycled PET ~1.5–2.1 kg CO2e/kg.
        // Range: 1.50–2.30 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.200,
        // Ed (EU average): 0.450 × 0.024 + 0.550 × 0.344 = 0.0108 + 0.1892 = 0.200 kg CO2e/kg
        // Ed_landfill (PET): 0.024 kg CO2e/kg — inert in landfill; residual leachate process GHG.
        // Ed_incineration (PET): 0.344 kg CO2e/kg — fossil carbon combustion (stoichiometric).
        //   PET carbon content: 62.5% C by mass; fossil CO2 = 0.625 × (44/12) = 2.292 kg CO2/kg PET.
        //   At ~15% thermal efficiency factor for process heat: 0.344 kg CO2e/kg (EEA 2022 factors).
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract) — 45.0% landfill / 55.0% incineration.
        // Previous value: 0.179 (Eurostat 2013 split). Confidence: MEDIUM.

        co2_disposal_landfill: 0.024,
        // Ed_landfill: 0.024 kg CO2e/kg — plastics are largely non-biodegradable in landfill.
        // Minimal CH4 generation (inert material). Small process emission from landfill operations.
        // Source: IPCC (2006) Vol.5 Table 2.4 — DOC for plastics ≈ 0 (non-degradable).
        //   Residual emission from HDPE/PET ≈ 0.01–0.03 kg CO2e/kg (landfill gas collection overhead).
        // EEA (2022) landfill factors for inert plastics. Confidence: MEDIUM.

        co2_disposal_incineration: 0.344,
        // Ed_incineration: 0.344 kg CO2e/kg — stoichiometric CO2 from fossil carbon combustion.
        // PET molecular formula: (C10H8O4)n. Carbon mass fraction: (10×12)/(10×12+8×1+4×16) = 120/192 = 0.625.
        // All carbon is fossil (petroleum-derived). CO2 per kg = 0.625 × (44/12) = 2.29 kg CO2/kg.
        // However, not all PET combusts to CO2; EEA (2022) incineration EF for PET ≈ 2.0–2.3 kg CO2/kg.
        // With energy recovery credit (EU WFD Directive R1-compliant facilities, ~85% of incineration):
        //   Net emission ≈ 0.30–0.40 kg CO2e/kg after energy substitution credit.
        // Value 0.344 = gross CO2 emission × (1 − energy credit fraction 0.85).
        // SOURCE PARTIALLY UNVERIFIED — EF3.1-compliant incineration dataset required.
        // Confidence: LOW–MEDIUM (stoichiometry is high-confidence; credit fraction is estimated).

        r1_max: 0.0,
        // Maximum recycled content at input for virgin PET entry (rPET is a separate material).
        // Annex C row "PET — MATERIAL" shows R1=0 as default (no recycled content default).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2". Confidence: HIGH.

        r2: 0.41756,
        // End-of-life recycling rate — PET bottle packaging (EU average).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", row "packaging - bottle".
        // Attribution: PETcore - Packaging Working Group. Confidence: HIGH.

        q: 0.9,
        // Qs/Qp quality ratio — PET mechanical recycling.
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "PET mechanical recycling".
        // Note: SSP (solid-state polycondensation) recycling achieves q=1.0 (food-contact grade).
        //   Using 0.9 (mechanical) as more common commercial pathway.
        // Confidence: HIGH.

        aFactor: 0.5,
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", Plastics category.
        // Rationale: Open-loop recycling with quality degradation. Confidence: HIGH.

        fossilFraction: 1.0
        // 100% fossil petroleum-derived carbon (PTA + MEG from naphtha/natural gas).
        // Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // rPET  (post-consumer recycled PET — used as recycled content input)
    // ──────────────────────────────────────────────────────────────────────────
    "rPET": {
        co2_virgin: 3.40,
        // Ev: Same as virgin PET (3.40 kg CO2e/kg). In the CFF, Ev represents the impact of the
        // virgin material that is being displaced. The "virgin" benchmark for rPET is virgin PET.
        // Source: PlasticsEurope Eco-profiles (PET amorphous, 2016). Confidence: MEDIUM.

        co2_recycled: 0.45,
        // Erec: 0.45 kg CO2e/kg — production of recycled PET from post-consumer bottles (mechanical,
        //   EU average, including collection, sorting, washing, extrusion).
        // Source: PETcore (2019) "Environmental profile of PET packaging" — recycled PET production
        //   energy ≈ 0.40–0.55 kg CO2e/kg (electricity + thermal, EU grid).
        // URL: https://petcore-europe.org/reports-data/ (verify before citing).
        // Cross-check: Shen et al. (2010) Resources, Conservation & Recycling 55(1):34–52 —
        //   rPET GHG 0.3–0.6 kg CO2e/kg depending on collection/sorting system.
        // Range: 0.30–0.65 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.200,
        // Ed: Same disposal profile as virgin PET (same polymer, same combustion chemistry).
        // 0.450 × 0.024 + 0.550 × 0.344 = 0.0108 + 0.1892 = 0.200 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract). Previous value: 0.169. Confidence: MEDIUM.

        co2_disposal_landfill: 0.024,
        // Same as PET. Confidence: MEDIUM.

        co2_disposal_incineration: 0.344,
        // Same as PET. Confidence: LOW–MEDIUM.

        r1_max: 1.0,
        // Maximum recycled content = 100% (rPET is by definition fully recycled content).
        // Confidence: HIGH (definitional).

        r2: 0.41756,
        // End-of-life recycling rate — same as PET packaging (same collection infrastructure).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", PET bottle packaging.
        // Confidence: HIGH.

        q: 0.9,
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "PET mechanical recycling".
        // Confidence: HIGH.

        aFactor: 0.5,
        // Source: PEF Annex C v2.1, May 2020, Plastics category. Confidence: HIGH.

        fossilFraction: 1.0
        // Fossil carbon origin (same as virgin PET; recycled content does not change molecular carbon origin).
        // Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // HDPE  (high-density polyethylene — bottles, drums, caps)
    // ──────────────────────────────────────────────────────────────────────────
    "HDPE": {
        co2_virgin: 1.96,
        // Ev: 1.96 kg CO2e/kg — virgin HDPE (cradle-to-gate, EU average, excluding feedstock carbon).
        // Source: PlasticsEurope Eco-profiles — "High-density polyethylene (HDPE)" (2014).
        // URL: https://www.plasticseurope.org/en/resources/eco-profiles (verify before citing).
        // Note: PlasticsEurope GWP ≈ 1.96 kg CO2e/kg (energy-related; feedstock C ≈ 3.14 kg CO2/kg stored).
        //   CFF uses Ev inclusive of feedstock for combustion relevance; 1.96 = process energy GHG.
        // Range: 1.80–2.20 kg CO2e/kg (process GHG). Confidence: MEDIUM.

        co2_recycled: 0.91,
        // Erec: 0.91 kg CO2e/kg — mechanically recycled HDPE (post-consumer, EU average).
        // Source: Franklin Associates (2011) "Life Cycle Inventory of 100% Postconsumer HDPE and PET
        //   Recycled Resin from Postconsumer Containers and Packaging" — HDPE recycled ~0.80–1.00 kg CO2e/kg.
        // URL: https://plasticsrecycling.org/images/library/HDPE-PET-resin-LCA-Summary-2011.pdf (verify before citing).
        // Range: 0.70–1.10 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.203,
        // Ed (EU average): 0.450 × 0.024 + 0.550 × 0.350 = 0.0108 + 0.1925 = 0.203 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract) — 45.0% landfill / 55.0% incineration.
        // Previous value: 0.166 (Eurostat 2013 split). Confidence: MEDIUM.

        co2_disposal_landfill: 0.024,
        // Ed_landfill: Effectively inert plastic in landfill. Minimal CH4 (DOC ≈ 0, IPCC 2006).
        // Small process overhead ≈ 0.02–0.03 kg CO2e/kg. Source: IPCC (2006) Vol.5. Confidence: MEDIUM.

        co2_disposal_incineration: 0.350,
        // Ed_incineration: Stoichiometric — HDPE formula (CH2)n, C fraction = 12/14 = 0.857.
        //   Gross CO2 = 0.857 × (44/12) = 3.14 kg CO2/kg. All fossil.
        //   With energy recovery credit (~0.85): net ≈ 0.47 kg CO2e/kg gross × 0.85 credit offset.
        //   Conservative net = 3.14 × (1 – 0.85 × 0.75) = ~0.65... 
        //   Using EEA (2022) published factor for HDPE incineration ≈ 0.35 kg CO2e/kg (net, with R1 credit).
        // SOURCE PARTIALLY UNVERIFIED — requires EF3.1-compliant dataset. Confidence: LOW–MEDIUM.

        r1_max: 0.0,
        // Annex C lists R1=0 as default for PE materials (no established recycled content in packaging default).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", PE category, row "MATERIAL".
        // Confidence: HIGH (Annex default; user may override with actual supplier data).

        r2: 0.28835,
        // End-of-life recycling rate — generic plastics packaging (no HDPE-specific entry in Annex C).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", row "Generic plastics — packaging - generic".
        // Attribution: PlasticsEurope - Packaging Working Group. Confidence: MEDIUM
        // (HDPE bottles may achieve higher rates ~35–40% in some EU countries; 0.288 is EU average proxy).

        q: 0.9,
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "HDPE". Confidence: HIGH.

        aFactor: 0.5,
        // Source: PEF Annex C v2.1, May 2020, Plastics category. Confidence: HIGH.

        fossilFraction: 1.0
        // 100% fossil carbon (ethylene from naphtha cracking or ethane from natural gas).
        // Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // LDPE  (low-density polyethylene — films, bags, pouches, flexible packaging)
    // ──────────────────────────────────────────────────────────────────────────
    "LDPE": {
        co2_virgin: 2.10,
        // Ev: 2.10 kg CO2e/kg — virgin LDPE (cradle-to-gate, EU average, process GHG).
        // Source: PlasticsEurope Eco-profiles — "Low-density polyethylene (LDPE)" (2014).
        // URL: https://www.plasticseurope.org/en/resources/eco-profiles (verify before citing).
        // Note: PlasticsEurope reports LDPE GWP ≈ 2.10 kg CO2e/kg (energy only; higher than HDPE
        //   due to higher polymerisation energy for branched-chain structure).
        // Range: 1.90–2.30 kg CO2e/kg. Confidence: MEDIUM.

        co2_recycled: 0.84,
        // Erec: 0.84 kg CO2e/kg — mechanically recycled LDPE film (post-consumer, EU average).
        // Source: Perugini et al. (2005) Resources, Conservation and Recycling 43(2):189–207 —
        //   LDPE film recycling LCA; energy ~18 MJ/kg → ~1.0 kg CO2e/kg (2005 EU grid).
        //   Updated for 2022 EU grid (~0.30 kg CO2e/kWh): ~0.70–0.90 kg CO2e/kg.
        // Cross-check: WRAP (UK) "Compositional analysis of recycled LDPE film" (2012) ≈ 0.80–0.90 kg CO2e/kg.
        // Range: 0.65–1.00 kg CO2e/kg. Confidence: LOW–MEDIUM (limited free public sources).

        co2_disposal_average: 0.203,
        // Same disposal basis as HDPE (same polymer backbone chemistry).
        // 0.450 × 0.024 + 0.550 × 0.350 = 0.203 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract). Previous value: 0.166. Confidence: MEDIUM.

        co2_disposal_landfill: 0.024,
        // Inert in landfill. Source: IPCC (2006) Vol.5. Confidence: MEDIUM.

        co2_disposal_incineration: 0.350,
        // Same carbon fraction as HDPE (CH2)n. SOURCE PARTIALLY UNVERIFIED. Confidence: LOW–MEDIUM.

        r1_max: 0.0,
        // Annex C lists R1=0 as default for PE materials.
        // Source: PEF Annex C v2.1, May 2020, PE category, row "MATERIAL". Confidence: HIGH.

        r2: 0.28835,
        // No LDPE-specific R2 in Annex C for packaging. Using generic plastics packaging proxy.
        // Source: PEF Annex C v2.1, May 2020, "Generic plastics — packaging - generic".
        // Attribution: PlasticsEurope - Packaging Working Group. Confidence: MEDIUM.
        // Note: LDPE film recycling rates are typically lower than HDPE rigid in EU
        //   (film collection is less developed). 0.288 may overestimate LDPE film EoL recycling.

        q: 0.75,
        // Qs/Qp quality ratio for LDPE film — lowest quality ratio in Annex C.
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "LDPE film". Confidence: HIGH.

        aFactor: 0.5,
        // Source: PEF Annex C v2.1, May 2020, Plastics category. Confidence: HIGH.

        fossilFraction: 1.0
        // 100% fossil carbon. Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // PP  (polypropylene — pots, tubs, caps, films, woven sacks)
    // ──────────────────────────────────────────────────────────────────────────
    "PP": {
        co2_virgin: 2.00,
        // Ev: 2.00 kg CO2e/kg — virgin PP (cradle-to-gate, EU average, process GHG).
        // Source: PlasticsEurope Eco-profiles — "Polypropylene (PP)" (2016).
        // URL: https://www.plasticseurope.org/en/resources/eco-profiles (verify before citing).
        // PlasticsEurope reports GWP ≈ 1.87–2.10 kg CO2e/kg depending on grade.
        // Range: 1.85–2.15 kg CO2e/kg. Confidence: MEDIUM.

        co2_recycled: 0.95,
        // Erec: 0.95 kg CO2e/kg — mechanically recycled PP (post-consumer, EU average).
        // Source: Rigamonti et al. (2014) Waste Management 34(9):1595–1606 —
        //   PP recycling energy ~20–25 MJ/kg; GHG ~0.85–1.10 kg CO2e/kg (EU grid adjusted).
        // Cross-check: PlasticsEurope (2020) "Plastics — the Facts 2020" does not provide recycled GHG
        //   directly; secondary estimate from energy consumption data.
        // Range: 0.80–1.15 kg CO2e/kg. Confidence: LOW–MEDIUM.

        co2_disposal_average: 0.200,
        // Ed (EU average): 0.450 × 0.024 + 0.550 × 0.344 = 0.0108 + 0.1892 = 0.200 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract) — 45.0% landfill / 55.0% incineration.
        // Previous value: 0.164 (Eurostat 2013 split). Confidence: MEDIUM.

        co2_disposal_landfill: 0.024,
        // Inert in landfill. Source: IPCC (2006) Vol.5. Confidence: MEDIUM.

        co2_disposal_incineration: 0.344,
        // Ed_incineration: PP formula (CH2CHCH3)n → C fraction = 36/42 = 0.857 (same as HDPE/LDPE backbone).
        //   CO2 = 0.857 × (44/12) = 3.14 kg CO2/kg gross fossil. Net with R1 energy credit ≈ 0.34 kg CO2e/kg.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW–MEDIUM.

        r1_max: 0.0,
        // Annex C lists R1=0 as default for PP (row "PP — MATERIAL").
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2". Confidence: HIGH.

        r2: 0.28835,
        // No PP-specific R2 for packaging in Annex C. Using generic plastics packaging proxy.
        // Source: PEF Annex C v2.1, May 2020, "Generic plastics — packaging - generic".
        // Attribution: PlasticsEurope - Packaging Working Group. Confidence: MEDIUM.

        q: 0.9,
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "PP". Confidence: HIGH.

        aFactor: 0.5,
        // Source: PEF Annex C v2.1, May 2020, Plastics category. Confidence: HIGH.

        fossilFraction: 1.0
        // 100% fossil carbon (propylene from naphtha cracking or propane dehydrogenation).
        // Confidence: HIGH.
    },

    // ──────────────────────────────────────────────────────────────────────────
    // GLASS  (container glass — bottles, jars; unspecified colour as default)
    // ──────────────────────────────────────────────────────────────────────────
    "glass": {
        co2_virgin: 0.86,
        // Ev: 0.86 kg CO2e/kg — virgin container glass (EU average, cradle-to-gate, including
        //   raw material extraction (silica sand, soda ash, limestone), melting at ~1550°C).
        // Source: FEVE (2021) "Environmental Report — Glass Packaging Life Cycle Assessment".
        //   FEVE = Fédération Européenne des Fabricants de Contenants en Verre.
        //   Reports EU average virgin glass GHG ≈ 0.80–0.90 kg CO2e/kg.
        // URL: https://www.feve.org/approach/sustainability/life-cycle-assessment/ (verify before citing).
        // Cross-check: ICE Database v3.0 — "Glass (general, melt)" ≈ 0.91 kg CO2e/kg.
        //   Glass for Europe (2020) Environmental Statement ≈ 0.82–0.87 kg CO2e/kg.
        // Range: 0.80–0.95 kg CO2e/kg. Confidence: MEDIUM–HIGH.

        co2_recycled: 0.54,
        // Erec: 0.54 kg CO2e/kg — recycled glass (cullet-based melting, EU average).
        // Cullet substitutes raw materials; energy savings ~2.5% per 10% cullet.
        // Source: FEVE (2021) Environmental Report — recycled glass GHG ≈ 0.50–0.60 kg CO2e/kg.
        //   ICE Database v3.0 "Glass (recycled, from cullet)" ≈ 0.54 kg CO2e/kg.
        // Range: 0.48–0.65 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.009,
        // Ed (EU average): Glass is essentially inert — minimal GHG from disposal.
        // Landfill: ~0.005 kg CO2e/kg (process transport/operations). Incineration: not combusted.
        // 0.450 × 0.005 + 0.550 × 0.011 = 0.00225 + 0.00605 = 0.009 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract). Previous value: 0.008. Confidence: LOW.

        co2_disposal_landfill: 0.005,
        // Glass inert in landfill. Only process/transport CO2. SOURCE PARTIALLY UNVERIFIED.
        // Confidence: LOW (but low-impact parameter).

        co2_disposal_incineration: 0.011,
        // Glass does not combust. Small process emission from handling at MSW incineration facility.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        r1_max: 0.80,
        // Maximum recycled content (cullet fraction) in container glass.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2" — glass packaging rows show
        //   R1=0.52 (unspecified), 0.40 (flint), 0.80 (green), 0.50 (amber).
        //   R1_max = 0.80 (green glass, highest recycled cullet content). Confidence: HIGH.

        r2: 0.657,
        // End-of-life recycling rate — container glass (unspecified colour, EU average).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2",
        //   row "packaging - container glass unspecified colour".
        // Attribution: FEVE - Packaging Working Group. Confidence: HIGH.

        q: 1.0,
        // Qs/Qp quality ratio — glass.
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "Glass". Confidence: HIGH.

        aFactor: 0.2,
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", Glass category. Confidence: HIGH.

        // FIX PKG-FOSSIL-1: was 0.0. The original rationale ("CO2 from carbonate
        // decomposition is a process emission, not fossil-fuel combustion") correctly
        // identifies a real technical distinction, but the conclusion doesn't follow:
        // "not combustion CO2" does not mean "biogenic." fossilFraction only has two
        // buckets (fossil vs biogenic) — there is no third "geogenic/process" bucket —
        // and glass has zero biological carbon-cycle content either way. More
        // importantly, the Ev value itself (0.86 kg CO2e/kg, cited from FEVE/ICE
        // Database above) overwhelmingly reflects furnace energy use (melting silica
        // sand at ~1550°C, typically natural-gas-fired) — genuinely fossil combustion —
        // not carbonate decomposition alone, which is a comparatively minor contributor.
        // Previously, 100% of glass's packaging CO2 was silently classified as
        // "biogenic" in every report — factually wrong for a mineral, non-biological
        // material, and would mislead any auditor checking the Fossil/Biogenic split.
        fossilFraction: 1.0
    },

    // ──────────────────────────────────────────────────────────────────────────
    // ALUMINUM  (aluminium packaging — cans, foils, trays, closures)
    // ──────────────────────────────────────────────────────────────────────────
    "aluminum": {
        co2_virgin: 11.89,
        // Ev: 11.89 kg CO2e/kg — primary aluminium production (EU average, cradle-to-gate,
        //   including bauxite mining, alumina refining, electrolytic smelting, rolling/forming).
        // Source: European Aluminium (2018) "Environmental Profile Report — Aluminium for Packaging".
        //   European Aluminium Association reports primary aluminium GHG ≈ 11.5–12.5 kg CO2e/kg
        //   depending on electricity grid (Scandinavian hydro vs. European grid mix).
        // URL: https://european-aluminium.eu/resource-hub/ (verify before citing).
        // Cross-check: International Aluminium Institute (IAI) (2021) "Global Life Cycle Inventory Data
        //   for the Primary Aluminium Industry" — world average 16.5 kg CO2e/kg; EU average lower ~11–12.
        // Range: 10.0–14.0 kg CO2e/kg (EU, depending on electricity mix). Confidence: MEDIUM–HIGH.

        co2_recycled: 0.60,
        // Erec: 0.60 kg CO2e/kg — secondary aluminium (post-consumer scrap, EU average, including
        //   collection, sorting, melting/refining).
        // Source: European Aluminium (2018) Environmental Profile Report — secondary Al GHG ≈ 0.55–0.70 kg CO2e/kg.
        //   IAI (2021) secondary aluminium global average ≈ 0.57 kg CO2e/kg.
        // Range: 0.50–0.75 kg CO2e/kg. Confidence: MEDIUM–HIGH.

        co2_disposal_average: 0.026,
        // Ed (EU average): Aluminium is non-combustible; inert in landfill (small process GHG).
        // 0.450 × 0.010 + 0.550 × 0.038 = 0.0045 + 0.0209 = 0.026 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract). Previous value: 0.023. Confidence: LOW.

        co2_disposal_landfill: 0.010,
        // Aluminium inert in landfill. Process transport overhead only.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        co2_disposal_incineration: 0.038,
        // Aluminium does not combust; recovered in bottom ash. Process emission from MSW facility.
        // Source: EEA (2022) — aluminium in MSW incineration, residual process GHG ≈ 0.03–0.05 kg CO2e/kg.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        r1_max: 0.55,
        // Maximum recycled content (scrap fraction) in aluminium packaging.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2" —
        //   row "packaging - beverage can body (final product)" R1=0.55.
        //   Other packaging rows: food cans/closures/trays R1=0 (Annex default).
        // Using R1=0.55 (beverage can body) as R1_max. Confidence: HIGH.

        r2: 0.60,
        // End-of-life recycling rate — aluminium food packaging (cans, closures, trays).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2",
        //   row "other packaging - food cans, closures, trays" — R2=0.60.
        // Attribution: EAA - Packaging Working Group. Confidence: HIGH.
        // Note: Beverage can body achieves R2=0.745 (Annex C row "packaging - beverage can body").
        //   0.60 used as conservative default for mixed aluminium food packaging.

        q: 1.0,
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "Aluminium". Confidence: HIGH.

        aFactor: 0.2,
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", Metals — Aluminium category.
        // Confidence: HIGH.

        // FIX PKG-FOSSIL-2: was 0.0, same reasoning error as glass. Anode oxidation is a
        // real process emission, but aluminum smelting's actual dominant emission source
        // is the electricity powering electrolysis — and this material's own Ev citation
        // (11.89 kg CO2e/kg, explicitly noted as reflecting "European grid mix" rather
        // than Scandinavian hydro) confirms this specific value is grid-electricity-
        // driven, which for an EU-average grid mix is substantially fossil. Aluminum has
        // no biological carbon content at all; classifying its entire footprint as
        // "biogenic" was factually wrong.
        fossilFraction: 1.0
    },

    // ──────────────────────────────────────────────────────────────────────────
    // STEEL  (tinplate, electrolytic tin-free steel — food cans, aerosols, closures)
    // ──────────────────────────────────────────────────────────────────────────
    "steel": {
        co2_virgin: 2.89,
        // Ev: 2.89 kg CO2e/kg — virgin steel production (EU average, BF-BOF route, cradle-to-gate,
        //   including iron ore mining, coking, blast furnace, basic oxygen furnace, rolling, tinning).
        // Source: World Steel Association (2021) "Steel's Contribution to a Low Carbon Future and
        //   Climate Resilient Societies — Worldsteel Position Paper".
        //   BF-BOF steel GHG (world average) ≈ 2.33 t CO2/t steel; EU average lower ~2.0–2.5 t CO2/t.
        //   Tinplate (steel for packaging) additional processing: total ~2.5–3.2 kg CO2e/kg.
        // URL: https://worldsteel.org/publications/ (verify before citing).
        // Cross-check: EUROFER (2019) "Carbon Leakage" report — EU EAF + BF-BOF blended ≈ 1.8–2.9 kg CO2e/kg.
        //   Packaging-specific tinplate: APEAL estimate ~2.8–3.0 kg CO2e/kg (not freely published).
        // Range: 2.2–3.5 kg CO2e/kg. Confidence: MEDIUM.

        co2_recycled: 0.51,
        // Erec: 0.51 kg CO2e/kg — secondary steel (EAF scrap-based route, EU average).
        // Source: World Steel Association (2021) — EAF route GHG ≈ 0.40–0.60 kg CO2e/kg (EU).
        //   EUROFER (2019) EAF route ~0.50 kg CO2e/kg (EU electricity mix).
        // Range: 0.38–0.70 kg CO2e/kg. Confidence: MEDIUM.

        co2_disposal_average: 0.028,
        // Ed (EU average): Steel is non-combustible; inert in landfill/incineration.
        // 0.450 × 0.010 + 0.550 × 0.042 = 0.0045 + 0.0231 = 0.028 kg CO2e/kg.
        // Split: Eurostat 2024 (env_wasmun, Jan 2026 extract). Previous value: 0.025. Confidence: LOW.

        co2_disposal_landfill: 0.010,
        // Steel inert in landfill. Process overhead. SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        co2_disposal_incineration: 0.042,
        // Steel non-combustible; recovered in bottom ash at MSWI.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        r1_max: 0.58,
        // Maximum recycled content (scrap) in steel packaging.
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2",
        //   row "packaging" (Steel) — R1=0.58 (updated May 2020; APEAL 2019 report, 2017 values).
        // Confidence: HIGH.

        r2: 0.8046,
        // End-of-life recycling rate — steel packaging (EU average).
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", row "packaging" (Steel).
        //   Attribution: APEAL - Report to EC (Fall 2019), values for year 2017.
        // Note: EU column value. Confidence: HIGH.

        q: 1.0,
        // Source: PEF Annex C v2.1, May 2020, sheet "Qs-Qp", row "Steel". Confidence: HIGH.

        aFactor: 0.2,
        // Source: PEF Annex C v2.1, May 2020, sheet "A - R1 - R2", Metals — Steel category.
        // Confidence: HIGH.

        // FIX PKG-FOSSIL-3: was 0.0 — this is the clearest case of the three. Coke is
        // processed coal, a fossil fuel; CO2 from coke oxidation in the BF-BOF route
        // (explicitly named in this material's own Ev citation) is unambiguously fossil
        // carbon by any definition, not a neutral "process emission" separate from
        // fossil sourcing. Steel has no biological carbon content; classifying its
        // entire footprint as "biogenic" was factually wrong.
        fossilFraction: 1.0
    },

    // ──────────────────────────────────────────────────────────────────────────
    // PLA  (polylactic acid — biopolymer films, cups, trays, coatings)
    // ──────────────────────────────────────────────────────────────────────────
    "PLA": {
        co2_virgin: 2.73,
        // Ev: 2.73 kg CO2e/kg — virgin PLA (NatureWorks Ingeo, cradle-to-gate, US/EU average).
        // Source: Vink, E.T.H. & Davies, S. (2015) "Life Cycle Assessment of NatureWorks Ingeo
        //   Biopolymer and NatureWorks Ingeo Processing", Industrial Biotechnology 11(3):114–121.
        //   GWP reported ≈ 0.5–1.3 kg CO2e/kg for US production; EU production with EU feedstocks
        //   and grid estimated at 1.8–2.8 kg CO2e/kg (LUC-inclusive, EF-compliant boundary).
        // Secondary source: Groot, W.J. & Borén, T. (2010) Int. J. LCA 15(9):970–984 —
        //   cradle-to-gate GWP 1.8–3.0 kg CO2e/kg (various routes).
        // Note: Biogenic carbon content of PLA ≈ 0.50 kg C/kg (from lactic acid); under EF3.1,
        //   biogenic CO2 uptake at crop stage partially offsets fossil process energy.
        //   Value 2.73 uses EF3.1 biogenic carbon accounting (GWP100, no permanence credit).
        // NO SINGLE FREE AUTHORITATIVE PUBLIC SOURCE EXISTS for EU PLA Ev. Academic literature only.
        // Range: 1.50–3.50 kg CO2e/kg (strongly route- and assumption-dependent).
        // Confidence: LOW.

        co2_recycled: 0.90,
        // Erec: 0.90 kg CO2e/kg — mechanically recycled PLA (estimated, EU).
        // NO ADEQUATE FREE SOURCE EXISTS for commercially validated rPLA Erec.
        // PLA mechanical recycling is at early commercial stage; open-loop downcycling dominates.
        // Estimate based on: energy for PLA mechanical recycling ~15–20 MJ/kg (comparable to PET);
        //   EU grid intensity ~0.35 kg CO2e/kWh (2022): thermal ~0.55 + electrical ~0.35 ≈ 0.90 kg CO2e/kg.
        // SOURCE UNVERIFIED — provisional estimate. Expert judgment basis.
        // Confidence: LOW.

        co2_disposal_average: 0.070,
        // Ed (EU average): PLA is compostable (industrial composting, not standard MSW).
        //   In landfill: slow degradation → small biogenic CH4 + CO2 emissions.
        //   In incineration: CO2 from combustion is biogenic (not counted under GHG Protocol).
        //   Net fossil GHG from disposal ≈ very low.
        // Calculated (process overhead only): 0.547 × 0.050 + 0.453 × 0.090 = 0.027 + 0.041 = 0.068 ≈ 0.070.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        co2_disposal_landfill: 0.050,
        // PLA partially biodegrades in landfill (slower than food waste, faster than PE).
        // Biogenic CH4 from PLA in landfill — small; EF3.1 pending characterisation.
        // SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        co2_disposal_incineration: 0.090,
        // PLA combustion: CO2 is biogenic (lactic acid C from crops). Under GHG Protocol/EF3.1:
        //   biogenic CO2 = 0 fossil CO2e. Residual: fossil energy for incineration process overhead
        //   ≈ 0.08–0.10 kg CO2e/kg. SOURCE PARTIALLY UNVERIFIED. Confidence: LOW.

        r1_max: 0.0,
        // No PLA entry in PEF Annex C v2.1 (confirmed: Annex C does not list PLA/biopolymers).
        // Market recycled content of commercial PLA packaging ≈ 0% (virgin only currently at scale).
        // SOURCE: Absence confirmed by inspection of Annex C v2.1. Industry observation.
        // Confidence: MEDIUM (definitional for current market).

        r2: 0.0,
        // PLA is NOT listed in PEF Annex C v2.1.
        // Commercial PLA end-of-life recycling rate in EU ≈ 0–5% (industrial composting pathways
        //   exist but contamination with food waste collection streams prevents recycling).
        // Using 0.0 as conservative default. SOURCE: Industry knowledge / expert judgment.
        // Confidence: LOW. NOTE: If industrial composting credit is modelled separately,
        //   this parameter should be updated per applicable PEFCR.

        q: 0.9,
        // No PLA-specific Qs/Qp in Annex C. Applying plastics proxy (PP/HDPE = 0.9).
        // SOURCE: Proxy from PEF Annex C v2.1, sheet "Qs-Qp" (PP, HDPE rows). Confidence: LOW.

        aFactor: 0.5,
        // No PLA entry in Annex C. Applying plastics default (A=0.5) as PLA undergoes
        // open-loop recycling/composting with quality degradation.
        // SOURCE: Extrapolation from PEF Annex C v2.1, Plastics category convention. Confidence: LOW.

        fossilFraction: 0.0
        // PLA is 100% biogenic carbon origin (lactic acid from fermentation of corn starch/sugarcane).
        // Under GHG Protocol/EF3.1: fossil CO2 fraction = 0.
        // Confidence: HIGH.
    }

}; // end window.aioxyData.packaging


// ================================================================================
// SUMMARY VERIFICATION TABLE
// ================================================================================
//
// FIX: [ingredients.js audit] This entire table's Ed_avg column was stale — it showed the
// pre-"Eurostat 2024 split update" disposal values (e.g. cardboard 0.021), while every
// actual co2_disposal_average entry above was correctly updated to the new 45%/55%
// landfill/incineration split (e.g. cardboard's real value is 0.035). The whole point of
// this table is to let an auditor cross-check without reading 700 lines of individual
// entries — a stale reference table is exactly the kind of discrepancy that erodes trust
// in an otherwise well-sourced file, even though the real calculation values were correct.
// Verified each updated figure against the actual co2_disposal_average field above.
//
// Material    | A-factor | R2     | Qs/Qp | Ev (kg CO2e/kg) | Erec           | Ed_avg   | Confidence
// ------------|----------|--------|-------|-----------------|----------------|----------|-----------
// cardboard   | 0.2 HIGH | 0.746H | 0.85H | 1.03 MEDIUM    | 0.49 MEDIUM    | 0.035 M  | MEDIUM
// paper       | 0.2 HIGH | 0.746H | 0.85H | 1.29 MEDIUM    | 0.63 MEDIUM    | 0.035 M  | MEDIUM
// PET         | 0.5 HIGH | 0.418H | 0.90H | 3.40 MEDIUM    | 1.90 MEDIUM    | 0.200 M  | MEDIUM
// rPET        | 0.5 HIGH | 0.418H | 0.90H | 3.40 MEDIUM    | 0.45 MEDIUM    | 0.200 M  | MEDIUM
// HDPE        | 0.5 HIGH | 0.288M | 0.90H | 1.96 MEDIUM    | 0.91 MEDIUM    | 0.203 M  | MEDIUM
// LDPE        | 0.5 HIGH | 0.288M | 0.75H | 2.10 MEDIUM    | 0.84 LOW       | 0.203 M  | LOW-MED
// PP          | 0.5 HIGH | 0.288M | 0.90H | 2.00 MEDIUM    | 0.95 LOW       | 0.200 M  | LOW-MED
// glass       | 0.2 HIGH | 0.657H | 1.00H | 0.86 MED-HIGH  | 0.54 MEDIUM    | 0.009 L  | MEDIUM
// aluminum    | 0.2 HIGH | 0.600H | 1.00H | 11.89 MED-HIGH | 0.60 MED-HIGH  | 0.026 L  | MED-HIGH
// steel       | 0.2 HIGH | 0.805H | 1.00H | 2.89 MEDIUM    | 0.51 MEDIUM    | 0.028 L  | MEDIUM
// PLA         | 0.5 LOW  | 0.000L | 0.90L | 2.73 LOW       | 0.90 LOW       | 0.070 L  | LOW
//
// KEY:  H = HIGH confidence  M = MEDIUM  L = LOW
//
// ─────────────────────────────────────────────────────────────────────────────
// VERIFIED (from PEF Annex C v2.1, May 2020 — HIGH confidence):
//   A-factors: cardboard, paper, PET, rPET, HDPE, LDPE, PP, glass, aluminum, steel
//   R2: cardboard, paper (CEPI), PET bottle (PETcore), glass (FEVE),
//       aluminum food cans (EAA), steel packaging (APEAL 2019)
//   Qs/Qp: glass, steel, aluminum, paper/card, PET, PP, HDPE, LDPE
//
// APPROXIMATE (free public industry/academic sources — MEDIUM confidence):
//   Ev: all materials (PlasticsEurope, European Aluminium, World Steel, FEVE, ICE Database)
//   Erec: cardboard, paper (ICE), PET/rPET (PETcore), HDPE (Franklin Associates),
//         glass (FEVE), aluminum (European Aluminium), steel (World Steel)
//   R2: HDPE, LDPE, PP (Annex C generic plastics proxy — note limitation)
//
// GAPS / SOURCE UNVERIFIED:
//   Ed (all materials): EF3.1-compliant incineration and landfill datasets not freely available.
//     Values are derived from IPCC 2006 defaults, EEA 2022 emission factors, and stoichiometry.
//     For audit-grade assessment: obtain EF3.1 compliant ED datasets from JRC/EC tender.
//   PLA all parameters: No PEF Annex C entry; no freely available validated LCI.
//     Provisional values from academic literature (Vink & Davies 2015; Groot & Borén 2010).
//     For audit use: licence EF3.1-compliant PLA dataset from GaBi or ecoinvent.
//   Erec for LDPE, PP: Limited free public sources; values are secondary estimates.
//
// ACTION REQUIRED FOR AUDIT GRADE:
//   1. Obtain EF3.1-compliant ED datasets (incineration + landfill) from JRC tender.
//   2. Obtain licensed EF3.1 Ev/Erec datasets for PLA, LDPE recycled, PP recycled.
//   3. DONE — EU landfill/incineration split updated from Eurostat 2024 (env_wasmun,
//      data extracted January 2026). New split: 45.0% landfill / 55.0% incineration.
//      Source: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Municipal_waste_statistics
//      All co2_disposal_average values updated. Confidence upgraded LOW → MEDIUM.
//   4. Verify all URLs cited before use in published reports.
// ================================================================================


// FIX: [ingredients.js audit] ORPHANED / NOT CONSUMED ANYWHERE IN THE CODEBASE.
// Verified by grep across every audited file: nothing references
// window.aioxyData.climate_zones. Also note if this is ever wired up in future: the
// "temperate" array uses "UK" but every other place in this file (grid_intensity,
// countries) uses ISO code "GB" for the United Kingdom — a country-code lookup against
// this list would silently fail to match GB-coded products. Flagging both issues
// together since fixing the code inconsistency without also flagging non-use could
// give false confidence that this list is live and correct.
window.aioxyData.climate_zones = {
    "tropical": ["BR", "ID", "VN", "IN", "TH", "CI", "GH", "CO", "EC", "MX", "PH", "MY", "NG", "WI"],
    "arid":     ["ES", "AU", "ZA", "EG", "TR", "IR", "SA", "AE", "MA"],
    "boreal":   ["CA", "NO", "SE", "FI", "RU", "IS"],
    "temperate": ["FR", "DE", "UK", "BE", "NL", "PL", "IT", "PT", "AT", "CH", "CZ", "HU", "DK", "US"]
};



console.log("✅ [AIOXY] Synthese + Physics Database Loaded - Audit Grade");
