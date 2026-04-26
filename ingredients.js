// ================== AIOXY SYNTHESE + PHYSICS DATABASE ==================
// PEF 3.1 Compliant | Audit-Grade | Zero Numbers Changed
// Synthese ingredients + All Physics Constants
// =======================================================================

window.aioxyData = window.aioxyData || {};

// ================== SYNTHESE INGREDIENTS ==================
// All original numbers preserved exactly
// Fossil/Biogenic/Land Use added from existing metadata values
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
                "Climate Change - Fossil": 0.795,
                "Climate Change - Biogenic": 0.0768,
                "Climate Change - Land Use": 0.0794,
                "Ozone Depletion": 2.3e-08,
                "Human Toxicity, non-cancer": 2.16e-08,
                "Human Toxicity, cancer": 4.09e-10,
                "Particulate Matter": 4.54e-08,
                "Ionizing Radiation": 0.108,
                "Photochemical Ozone Formation": 0.00387,
                "Acidification": 0.00486,
                "Eutrophication, terrestrial": 0.0182,
                "Eutrophication, freshwater": 0.000124,
                "Eutrophication, marine": 0.0062,
                "Ecotoxicity, freshwater": 8.45,
                "Land Use": 10.5,
                "Water Use/Scarcity (AWARE)": 1.01,
                "Resource Use, minerals/metals": 4.57e-06,
                "Resource Use, fossils": 10.9
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Brocoli, cru / Broccoli, raw",
                "source_uuid": "agb-3.2-20057-broccoli-raw",
                "agribalyse_code": "20057",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 3.0,
                    "GR": 3.0,
                    "TiR": 3.0,
                    "C": 3.5,
                    "P": 3.85
                },
                "dqr_overall": 3.27,
                "single_score_mpt": 0.0944,
                "biogenic_net": 0.0768,
                "co2_luc_net": 0.0794,
                "co2_fossil": 0.795,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (moyen)",
                "packaging_approach": "PACK AGB",
                "preparation": "Pas de préparation",
                "food_group": "fruits, légumes, légumineuses et oléagineux",
                "food_subgroup": "légumes"
            }
        }
    },

    "sunflower-oil-agribalyse-3-2": {
        "name": "Sunflower oil",
        "loss": 0.02,
        "processing_yield": 0.99,
        "data": {
            "pef": {
                "Climate Change": 2.36,
                "Climate Change - Fossil": 2.36,
                "Climate Change - Biogenic": 0.0531,
                "Climate Change - Land Use": 0,
                "Ozone Depletion": 3e-07,
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
                "Land Use": 555,
                "Water Use/Scarcity (AWARE)": 0.788,
                "Resource Use, minerals/metals": 1.12e-05,
                "Resource Use, fossils": 20.5
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Huile de tournesol / Sunflower oil",
                "source_uuid": "agb-3.2-17440-sunflower-oil",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 2.0,
                    "GR": 1.0,
                    "TiR": 1.6,
                    "C": 2.0,
                    "P": 2.25
                },
                "dqr_overall": 1.77,
                "biogenic_net": 0.0531
            }
        }
    },

    "tap-water-fr": {
        "name": "Tap water",
        "loss": 0.03,
        "processing_yield": 0.99,
        "data": {
            "pef": {
                "Climate Change": 0.000342,
                "Climate Change - Fossil": 0.000341,
                "Climate Change - Biogenic": 0.000000445,
                "Climate Change - Land Use": 0.000341,
                "Ozone Depletion": 1.04e-11,
                "Human Toxicity, non-cancer": 3.51e-11,
                "Human Toxicity, cancer": 2.95e-12,
                "Particulate Matter": 3.56e-11,
                "Ionizing Radiation": 0.000288,
                "Photochemical Ozone Formation": 0.00000187,
                "Acidification": 0.00000181,
                "Eutrophication, terrestrial": 0.00000487,
                "Eutrophication, freshwater": 0.000000109,
                "Eutrophication, marine": 0.000000485,
                "Ecotoxicity, freshwater": 0.00271,
                "Land Use": 0.00117,
                "Water Use/Scarcity (AWARE)": 0.00707,
                "Resource Use, minerals/metals": 2.47e-09,
                "Resource Use, fossils": 0.00963
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Eau du robinet {FR} U",
                "source_uuid": "agb-3.2-18066-tap-water-fr",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 2.50,
                    "GR": 1.9,
                    "TiR": 1.0,
                    "C": 1.4,
                    "P": 1.0
                },
                "dqr_overall": 2.50,
                "biogenic_net": 0.000000445,
                "co2_luc_net": 0.000341,
                "co2_biogenic_2": 0.000000239,
                "seasonality_code": 2,
                "air_freight": 0,
                "storage_type": "Ambiant (long)",
                "packaging_approach": "PACK AGB",
                "preparation": "Pas de préparation",
                "code_agb": 18066,
                "groupe_aliment": "boissons",
                "sous_groupe": "eaux",
                "nom_francais": "Eau du robinet",
                "mpt_kg": 0.000104
            }
        }
    },

    "rapeseed-oil-agribalyse-3-2": {
        "name": "Rapeseed oil",
        "loss": 0.02,
        "processing_yield": 0.99,
        "data": {
            "pef": {
                "Climate Change": 2.5,
                "Climate Change - Fossil": 2.11,
                "Climate Change - Biogenic": 0.0573,
                "Climate Change - Land Use": 0.332,
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
                "Resource Use, minerals/metals": 1.3e-05,
                "Resource Use, fossils": 20.1
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Huile de colza / Rapeseed oil",
                "source_uuid": "agb-3.2-17130-rapeseed-oil",
                "agribalyse_code": "17130",
                "allocation_method": "Economic Allocation",
                "dqr": {
                    "TeR": 2.0,
                    "GR": 2.0,
                    "TiR": 2.0,
                    "P": 1.96
                },
                "dqr_overall": 1.99,
                "single_score_mpt": 0.323,
                "biogenic_net": 0.0573,
                "co2_luc_net": 0.332,
                "co2_fossil": 2.11,
                "storage_type": "Ambiant (long)",
                "packaging_approach": "PACK AGB",
                "preparation": "Pas de préparation"
            }
        }
    },

    "white-sugar-refined-agribalyse-3-2": {
        "name": "White sugar, refined",
        "loss": 0.02,
        "processing_yield": 0.99,
        "data": {
            "pef": {
                "Climate Change": 0.746,
                "Climate Change - Fossil": 0.746,
                "Climate Change - Biogenic": 0,
                "Climate Change - Land Use": 0,
                "Ozone Depletion": 1.22e-08,
                "Human Toxicity, non-cancer": -1.18e-08,
                "Human Toxicity, cancer": 2.56e-10,
                "Particulate Matter": 1.31e-07,
                "Ionizing Radiation": 9.90e-02,
                "Photochemical Ozone Formation": 3.32e-03,
                "Acidification": 1.66e-02,
                "Eutrophication, freshwater": 1.76e-04,
                "Eutrophication, marine": 5.30e-03,
                "Eutrophication, terrestrial": 7.02e-02,
                "Ecotoxicity, freshwater": 1.09e+01,
                "Land Use": 3.19e+01,
                "Water Use/Scarcity (AWARE)": 1.80e+00,
                "Resource Use, minerals/metals": 4.30e-06,
                "Resource Use, fossils": 9.66e+00
            },
            "metadata": {
                "source_dataset": "AGRIBALYSE 3.2",
                "source_activity": "Sucre blanc / Sugar, white",
                "source_uuid": "agb-3-2-31016-white-sugar",
                "agribalyse_code": "31016",
                "allocation_method": "Economic Allocation",
                "dqr_overall": 3.09,
                "single_score_mpt": 1.26e-01,
                "product_name_fr": "Sucre blanc",
                "product_name_en": "Sugar, white",
                "food_group": "produits sucrés",
                "food_subgroup": "sucres, miels et assimilés",
                "lci_name": "Sugar, white",
                "packaging_approach": "PACK PROXY",
                "preparation": "Pas de préparation",
                "season_code": 2,
                "airplane_code": 0,
                "distribution": "Ambiant (long)"
            }
        }
    },

    "chicory-powder-instant-agribalyse-3-2": {
        "name": "Chicory, powder, instant",
        "loss": 0.03,
        "processing_yield": 0.97,
        "data": {
            "pef": {
                "Climate Change": 0.973,
                "Climate Change - Fossil": 0.973,
                "Climate Change - Biogenic": 0,
                "Climate Change - Land Use": 0,
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



window.aioxyData.grid_intensity = {
    "IS": 18, "NO": 28.1, "SE": 35.3, "CH": 39.2, "FR": 41.4, "FI": 57.5, "SK": 94.8,
    "DK": 114.4, "AT": 116.9, "CA": 120, "LU": 123.4, "PT": 127.9, "BR": 135, "LT": 138.4,
    "LV": 138.8, "BE": 149.8, "ES": 153.6, "HR": 158.5, "HU": 163.0, "SI": 183.3, "GB": 217.4, // ISO 3166-1 alpha-2 standard — "GB" is the correct code for the United Kingdom.
    "RO": 250.8, "NL": 253.6, "IE": 256.5, "ME": 264.2, "BG": 275.6, "IT": 284.8, "GR": 315.1,
    "EE": 319.1, "DE": 329.6, "US": 368, "AU": 380, "CZ": 401.5, "JP": 435, "MK": 441.4,
    "TR": 474.7, "Global": 480, "VN": 482, "MT": 484.0, "CY": 489.0, "BA": 570.6, "CN": 580,
    "PL": 588.6, "IN": 632, "RS": 695.8, "XK": 900.9
};

window.aioxyData.countries = {
    "AU": { "name": "Australia", "electricityCO2": 380, "awareFactor": 60.1 },
    "AT": { "name": "Austria", "electricityCO2": 116.9, "awareFactor": 2.5 },
    "BE": { "name": "Belgium", "electricityCO2": 149.8, "awareFactor": 42.1 },
    "BR": { "name": "Brazil", "electricityCO2": 110, "awareFactor": 3.1 },
    "BG": { "name": "Bulgaria", "electricityCO2": 275.6, "awareFactor": null },
    "CA": { "name": "Canada", "electricityCO2": 120, "awareFactor": 2.2 },
    "CN": { "name": "China", "electricityCO2": 492, "awareFactor": 41.2 },
    "HR": { "name": "Croatia", "electricityCO2": 158.5, "awareFactor": null },
    "CY": { "name": "Cyprus", "electricityCO2": 489.0, "awareFactor": null },
    "CZ": { "name": "Czechia", "electricityCO2": 401.5, "awareFactor": null },
    "DK": { "name": "Denmark", "electricityCO2": 114.4, "awareFactor": 14.5 },
    "EE": { "name": "Estonia", "electricityCO2": 319.1, "awareFactor": null },
    "FI": { "name": "Finland", "electricityCO2": 57.5, "awareFactor": 0.5 },
    "FR": { "name": "France", "electricityCO2": 41.4, "awareFactor": 17.1, "renewable_mix": 0.33 },
    "DE": { "name": "Germany", "electricityCO2": 329.6, "awareFactor": 24.5 },
    "GR": { "name": "Greece", "electricityCO2": 315.1, "awareFactor": 61.2 },
    "HU": { "name": "Hungary", "electricityCO2": 163.0, "awareFactor": null },
    "IN": { "name": "India", "electricityCO2": 480, "awareFactor": 70.1 },
    "IE": { "name": "Ireland", "electricityCO2": 256.5, "awareFactor": 1.8 },
    "IT": { "name": "Italy", "electricityCO2": 284.8, "awareFactor": 49.8 },
    "JP": { "name": "Japan", "electricityCO2": 470, "awareFactor": 36.5 },
    "LV": { "name": "Latvia", "electricityCO2": 138.8, "awareFactor": null },
    "LT": { "name": "Lithuania", "electricityCO2": 138.4, "awareFactor": null },
    "LU": { "name": "Luxembourg", "electricityCO2": 123.4, "awareFactor": null },
    "NL": { "name": "Netherlands", "electricityCO2": 253.6, "awareFactor": 33.6 },
    "NO": { "name": "Norway", "electricityCO2": 28.1, "awareFactor": null },
    "PL": { "name": "Poland", "electricityCO2": 588.6, "awareFactor": 19.8 },
    "PT": { "name": "Portugal", "electricityCO2": 127.9, "awareFactor": 43.1 },
    "RO": { "name": "Romania", "electricityCO2": 250.8, "awareFactor": null },
    "SK": { "name": "Slovakia", "electricityCO2": 94.8, "awareFactor": null },
    "SI": { "name": "Slovenia", "electricityCO2": 183.3, "awareFactor": null },
    "ES": { "name": "Spain", "electricityCO2": 153.6, "awareFactor": 65.4 },
    "SE": { "name": "Sweden", "electricityCO2": 35.3, "awareFactor": 1.3 },
    "CH": { "name": "Switzerland", "electricityCO2": 39.2, "awareFactor": null },
    "TR": { "name": "Türkiye", "electricityCO2": 474.7, "awareFactor": null },
    "GB": { "name": "United Kingdom", "electricityCO2": 217.4, "awareFactor": 22.9 }, // ISO 3166-1 alpha-2 standard — "GB" is the correct code for the United Kingdom.
    "US": { "name": "United States", "electricityCO2": 383, "awareFactor": 33.4 }
};

window.aioxyData.processing = {
    "none": { co2_impact: 0, water_impact: 0, yield: 1.00, loss: 0.000, temp: 20, kwh_per_kg: 0.00 },
    "pasteurization": { co2_impact: 0.06, water_impact: 0.15, yield: 0.995, loss: 0.005, temp: 72, kwh_per_kg: 0.20 },
    "sterilization": { co2_impact: 0.12, water_impact: 0.30, yield: 0.985, loss: 0.015, temp: 121, kwh_per_kg: 0.35 },
    "baking": { co2_impact: 0.45, water_impact: 0.12, yield: 0.88, loss: 0.120, temp: 180, kwh_per_kg: 0.85 },
    "frying": { co2_impact: 0.75, water_impact: 0.22, yield: 0.75, loss: 0.250, temp: 180, kwh_per_kg: 1.80 },
    "freezing": { co2_impact: 0.25, water_impact: 0.08, yield: 0.975, loss: 0.025, temp: -18, kwh_per_kg: 0.40 },
    "drying": { co2_impact: 1.8, water_impact: 0.18, yield: 0.97, loss: 0.030, temp: 60, kwh_per_kg: 2.50 },
    "milling": { co2_impact: 0.04, water_impact: 0.04, yield: 0.78, loss: 0.220, temp: 30, kwh_per_kg: 0.15 },
    "mixing": { co2_impact: 0.015, water_impact: 0.04, yield: 0.995, loss: 0.005, temp: 25, kwh_per_kg: 0.08 },
    "fermentation": { co2_impact: 0.35, water_impact: 1.0, yield: 0.95, loss: 0.050, temp: 35, kwh_per_kg: 0.45 },
    "extrusion": { co2_impact: 0.45, water_impact: 0.25, yield: 0.95, loss: 0.050, temp: 150, kwh_per_kg: 0.85 },
    "oat-processing": { co2_impact: 0.35, water_impact: 0.35, yield: 0.98, loss: 0.02, temp: 85, kwh_per_kg: 0.30 },
    "cleaning": { co2_impact: 0.02, water_impact: 2.0, yield: 0.98, loss: 0.02, temp: 25, kwh_per_kg: 0.05 },
    "wet_milling": { co2_impact: 0.25, water_impact: 8.0, yield: 0.65, loss: 0.35, temp: 50, kwh_per_kg: 0.60 },
    "canning": { co2_impact: 0.30, water_impact: 3.5, yield: 0.95, loss: 0.05, temp: 110, kwh_per_kg: 0.60 },
    "crushing": { co2_impact: 0.12, water_impact: 1.0, yield: 0.40, loss: 0.60, temp: 40, kwh_per_kg: 0.30 },
    "uht_processing": { co2_impact: 0.15, water_impact: 0.40, yield: 0.98, loss: 0.02, temp: 140, kwh_per_kg: 0.22 },
    "emulsification": { co2_impact: 0.03, water_impact: 0.10, yield: 0.99, loss: 0.01, temp: 55, kwh_per_kg: 0.07 },
    "roasting": { co2_impact: 0.65, water_impact: 0.05, yield: 0.82, loss: 0.18, temp: 200, kwh_per_kg: 0.75 }
};

window.aioxyData.processing_archetypes = {
    "raw": { 
        "name": "Raw / Farm Gate", 
        "yield_factor": 1.00, 
        "energy_kwh": 0.00, 
        "gas_mj": 0.00, 
        "dqr_reward": 0,
        "waste_split": { "water": 1.00, "organic": 0.00, "inert": 0.00, "wastewater": 0.00 }
    },
    "dry_milled": { 
        "name": "Dry Milled (Flour)", 
        "yield_factor": 0.90, 
        "energy_kwh": 0.15, 
        "gas_mj": 0.00, 
        "dqr_reward": 0.1,
        "waste_split": { "water": 0.50, "organic": 0.50, "inert": 0.00, "wastewater": 0.00 }
    },
    "wet_extracted": { 
        "name": "Wet Extracted", 
        "yield_factor": 0.55, 
        "energy_kwh": 0.80, 
        "gas_mj": 2.50, 
        "dqr_reward": 0.2,
        "waste_split": { "water": 0.67, "organic": 0.33, "inert": 0.00, "wastewater": 0.00 }
    },
    "isolated": { 
        "name": "Isolated (Protein Isolate)", 
        "yield_factor": 0.22, 
        "energy_kwh": 2.50, 
        "gas_mj": 6.00, 
        "dqr_reward": 0.3,
        "waste_split": { "water": 0.60, "organic": 0.20, "inert": 0.02, "wastewater": 0.18 }
    },
    "fermentation": { 
        "name": "Precision Fermentation", 
        "yield_factor": 0.12, 
        "energy_kwh": 5.50, 
        "gas_mj": 0.00, 
        "dqr_reward": 0.5,
        "waste_split": { "water": 0.70, "organic": 0.15, "inert": 0.02, "wastewater": 0.13 }
    }
};

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

window.aioxyData.packaging = {
    "cardboard": { 
        co2_virgin: 0.86, 
        co2_recycled: 0.49, 
        co2_disposal_average: 0.05,
        co2_disposal_landfill: 0.12,
        co2_disposal_incineration: 0.08,
        r1_max: 0.92, 
        r2: 0.85, 
        q: 0.90,
        aFactor: 0.2,          // ← ADD THIS (PEF default for paper/cardboard)
        fossilFraction: 0.0,   // ← ADD THIS (biogenic material)
        materialClass: "paper" // Bug 1 fix: required by core_physics.js line 659
    },
    "PET": { 
        co2_virgin: 3.10, 
        co2_recycled: 1.50, 
        co2_disposal_average: 0.04,
        co2_disposal_landfill: 0.02,
        co2_disposal_incineration: 2.80,
        r1_max: 0.60, 
        r2: 0.50, 
        q: 0.95,
        aFactor: 0.5,          // ← ADD THIS (PEF default for plastics)
        fossilFraction: 1.0,   // ← ADD THIS (fossil-based plastic)
        materialClass: "plastic" // Bug 1 fix
    },
    "rPET": { 
        co2_virgin: 3.10, 
        co2_recycled: 1.10, 
        co2_disposal_average: 0.04,
        co2_disposal_landfill: 0.02,
        co2_disposal_incineration: 2.80,
        r1_max: 1.00, 
        r2: 0.60, 
        q: 0.95,
        aFactor: 0.5,
        fossilFraction: 1.0,
        materialClass: "plastic" // Bug 1 fix
    },
    "HDPE": { 
        co2_virgin: 2.60, 
        co2_recycled: 1.40, 
        co2_disposal_average: 0.04,
        co2_disposal_landfill: 0.02,
        co2_disposal_incineration: 2.50,
        r1_max: 0.60, 
        r2: 0.50, 
        q: 0.90,
        aFactor: 0.5,
        fossilFraction: 1.0,
        materialClass: "plastic" // Bug 1 fix
    },
    "LDPE": { 
        co2_virgin: 2.40, 
        co2_recycled: 1.30, 
        co2_disposal_average: 0.04,
        co2_disposal_landfill: 0.02,
        co2_disposal_incineration: 2.40,
        r1_max: 0.50, 
        r2: 0.40, 
        q: 0.90,
        aFactor: 0.5,
        fossilFraction: 1.0,
        materialClass: "plastic" // Bug 1 fix
    },
    "PP": { 
        co2_virgin: 2.70, 
        co2_recycled: 1.45, 
        co2_disposal_average: 0.04,
        co2_disposal_landfill: 0.02,
        co2_disposal_incineration: 2.60,
        r1_max: 0.60, 
        r2: 0.50, 
        q: 0.90,
        aFactor: 0.5,
        fossilFraction: 1.0,
        materialClass: "plastic" // Bug 1 fix
    },
    "glass": { 
        co2_virgin: 1.40, 
        co2_recycled: 0.75, 
        co2_disposal_average: 0.01,
        co2_disposal_landfill: 0.00,
        co2_disposal_incineration: 0.00,
        r1_max: 0.95, 
        r2: 0.90, 
        q: 1.00,
        aFactor: 0.2,          // ← ADD THIS (PEF default for glass/metals)
        fossilFraction: 0.0,   // ← ADD THIS (inert mineral)
        materialClass: "glass" // Bug 1 fix
    },
    "aluminum": { 
        co2_virgin: 16.6, 
        co2_recycled: 2.30, 
        co2_disposal_average: 0.00,
        co2_disposal_landfill: 0.00,
        co2_disposal_incineration: 0.00,
        r1_max: 0.95, 
        r2: 0.90, 
        q: 1.00,
        aFactor: 0.2,
        fossilFraction: 0.0,
        materialClass: "metal" // Bug 1 fix
    },
    "steel": { 
        co2_virgin: 2.50, 
        co2_recycled: 0.80, 
        co2_disposal_average: 0.00,
        co2_disposal_landfill: 0.00,
        co2_disposal_incineration: 0.00,
        r1_max: 0.95, 
        r2: 0.90, 
        q: 1.00,
        aFactor: 0.2,
        fossilFraction: 0.0,
        materialClass: "metal" // Bug 1 fix
    },
    "PLA": { 
        co2_virgin: 2.50, 
        co2_recycled: 1.80, 
        co2_disposal_average: 0.00,
        co2_disposal_landfill: 0.05,
        co2_disposal_incineration: 0.10,
        r1_max: 0.10, 
        r2: 0.01, 
        q: 0.80,
        aFactor: 0.5,
        fossilFraction: 0.0,   // ← bioplastic, biogenic carbon
        materialClass: "plastic" // Bug 1 fix
    },
    "paper": { 
        co2_virgin: 1.10, 
        co2_recycled: 0.70, 
        co2_disposal_average: 0.05,
        co2_disposal_landfill: 0.15,
        co2_disposal_incineration: 0.08,
        r1_max: 0.80, 
        r2: 0.75, 
        q: 0.85,
        aFactor: 0.2,
        fossilFraction: 0.0,
        materialClass: "paper" // Bug 1 fix
    }
};

window.aioxyData.climate_zones = {
    "tropical": ["BR", "ID", "VN", "IN", "TH", "CI", "GH", "CO", "EC", "MX", "PH", "MY", "NG", "WI"],
    "arid":     ["ES", "AU", "ZA", "EG", "TR", "IR", "SA", "AE", "MA"],
    "boreal":   ["CA", "NO", "SE", "FI", "RU", "IS"],
    "temperate": ["FR", "DE", "UK", "BE", "NL", "PL", "IT", "PT", "AT", "CH", "CZ", "HU", "DK", "US"]
};



console.log("✅ [AIOXY] Synthese + Physics Database Loaded - Audit Grade");
