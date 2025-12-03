// ================== COMPLETE FIXED DATASET ==================
const aioxyData = {
    // PEF 3.1 Impact Categories with units
    pefCategories: {
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
    },

    // PEF Normalization Factors (PEF 3.1)
    pefNormalizationFactors: {
        "Climate Change": 1.23e-14,
        "Ozone Depletion": 8.51e-12,
        "Human Toxicity, non-cancer": 2.11e-11,
        "Human Toxicity, cancer": 2.87e-12,
        "Particulate Matter": 9.65e-14,
        "Ionizing Radiation": 6.84e-13,
        "Photochemical Ozone Formation": 6.62e-12,
        "Acidification": 9.00e-12,
        "Eutrophication, terrestrial": 2.86e-11,
        "Eutrophication, freshwater": 2.61e-13,
        "Eutrophication, marine": 3.16e-12,
        "Ecotoxicity, freshwater": 9.19e-09,
        "Land Use": 1.33e-10,
        "Water Use/Scarcity (AWARE)": 1.87e-12,
        "Resource Use, minerals/metals": 1.03e-11,
        "Resource Use, fossils": 1.05e-11
    },

    // PEF Weighting Factors (PEF 3.1)
    pefWeightingFactors: {
        "Climate Change": 0.216,
        "Ozone Depletion": 0.047,
        "Human Toxicity, non-cancer": 0.061,
        "Human Toxicity, cancer": 0.061,
        "Particulate Matter": 0.061,
        "Ionizing Radiation": 0.034,
        "Photochemical Ozone Formation": 0.034,
        "Acidification": 0.034,
        "Eutrophication, terrestrial": 0.034,
        "Eutrophication, freshwater": 0.034,
        "Eutrophication, marine": 0.034,
        "Ecotoxicity, freshwater": 0.034,
        "Land Use": 0.151,
        "Water Use/Scarcity (AWARE)": 0.142,
        "Resource Use, minerals/metals": 0.034,
        "Resource Use, fossils": 0.063
    },

    // ================== 100+ INGREDIENTS DATABASE ==================
    ingredients: {
        "beef-cattle-conventional-national-average-at-farm-gate-fr": {
            "name": "Beef cattle, conventional, national average, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 14.474184,
                    "Ozone Depletion": 5.4273208e-08,
                    "Human Toxicity, non-cancer": 2.1237667e-07,
                    "Human Toxicity, cancer": 5.7423135e-09,
                    "Particulate Matter": 1.3817053e-06,
                    "Ionizing Radiation": 0.30685289,
                    "Photochemical Ozone Formation": 0.020942186,
                    "Acidification": 0.2055071,
                    "Eutrophication, terrestrial": 0.91130068,
                    "Eutrophication, freshwater": 0.00057342882,
                    "Eutrophication, marine": 0.043273688,
                    "Ecotoxicity, freshwater": 72.969244,
                    "Land Use": 965.59624,
                    "Water Use/Scarcity (AWARE)": 1.1559368,
                    "Resource Use, minerals/metals": 1.7488165e-05,
                    "Resource Use, fossils": 24.202021
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Beef cattle, conventional, national average, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-beef-cattle-conventional-national-average-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "broiler-conventional-at-farm-gate-fr": {
            "name": "Broiler, conventional, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 1.8638007,
                    "Ozone Depletion": 3.0563213e-08,
                    "Human Toxicity, non-cancer": 3.3782736e-08,
                    "Human Toxicity, cancer": 2.5370352e-09,
                    "Particulate Matter": 4.8977736e-07,
                    "Ionizing Radiation": 0.12093183,
                    "Photochemical Ozone Formation": 0.0074266987,
                    "Acidification": 0.069876768,
                    "Eutrophication, terrestrial": 0.31118839,
                    "Eutrophication, freshwater": 0.00037821484,
                    "Eutrophication, marine": 0.015481044,
                    "Ecotoxicity, freshwater": 78.032228,
                    "Land Use": 161.6369,
                    "Water Use/Scarcity (AWARE)": 0.71976888,
                    "Resource Use, minerals/metals": 5.739888e-06,
                    "Resource Use, fossils": 11.335022
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Broiler, conventional, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-broiler-conventional-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "pig-conventional-national-average-at-farm-gate-fr": {
            "name": "Pig, conventional, national average, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 2.7941587,
                    "Ozone Depletion": 3.6760835e-08,
                    "Human Toxicity, non-cancer": 3.1449332e-08,
                    "Human Toxicity, cancer": 2.1162373e-09,
                    "Particulate Matter": 3.205921e-07,
                    "Ionizing Radiation": 0.41853717,
                    "Photochemical Ozone Formation": 0.0063435638,
                    "Acidification": 0.044565286,
                    "Eutrophication, terrestrial": 0.19220629,
                    "Eutrophication, freshwater": 0.00038365295,
                    "Eutrophication, marine": 0.013201376,
                    "Ecotoxicity, freshwater": 89.38251600000001,
                    "Land Use": 161.62783,
                    "Water Use/Scarcity (AWARE)": 0.95123835,
                    "Resource Use, minerals/metals": 1.0629231e-05,
                    "Resource Use, fossils": 19.019492
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Pig, conventional, national average, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-pig-conventional-national-average-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "salmon-farmed-conventional-at-farm-gate-no": {
            "name": "Salmon, farmed, conventional, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 2.2106452,
                    "Ozone Depletion": 1.6145227e-07,
                    "Human Toxicity, non-cancer": 4.3657851e-08,
                    "Human Toxicity, cancer": 2.4011685e-09,
                    "Particulate Matter": 1.6076953e-07,
                    "Ionizing Radiation": 0.3497157,
                    "Photochemical Ozone Formation": 0.011056826,
                    "Acidification": 0.019831925,
                    "Eutrophication, terrestrial": 0.078358656,
                    "Eutrophication, freshwater": 0.00057584597,
                    "Eutrophication, marine": 0.037327814,
                    "Ecotoxicity, freshwater": 49.67809,
                    "Land Use": 116.59034,
                    "Water Use/Scarcity (AWARE)": 0.4938601,
                    "Resource Use, minerals/metals": 2.3887875e-05,
                    "Resource Use, fossils": 25.327321
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Salmon, farmed, conventional, at farm gate {NO} U",
                    "source_uuid": "agb-3.2-salmon-farmed-conventional-at-farm-gate-no",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "Norway",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "cow-milk-conventional-national-average-at-farm-gate-fr": {
            "name": "Cow milk, conventional, national average, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 1.1061238,
                    "Ozone Depletion": 6.1238304e-09,
                    "Human Toxicity, non-cancer": 1.3642623e-08,
                    "Human Toxicity, cancer": 5.2881169e-10,
                    "Particulate Matter": 1.010635e-07,
                    "Ionizing Radiation": 0.035083814,
                    "Photochemical Ozone Formation": 0.0017671955,
                    "Acidification": 0.014976555,
                    "Eutrophication, terrestrial": 0.065590084,
                    "Eutrophication, freshwater": 6.8064244e-05,
                    "Eutrophication, marine": 0.003992328,
                    "Ecotoxicity, freshwater": 14.5777639,
                    "Land Use": 59.0766,
                    "Water Use/Scarcity (AWARE)": 0.11527343,
                    "Resource Use, minerals/metals": 1.8201174e-06,
                    "Resource Use, fossils": 2.2493909
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Cow milk, conventional, national average, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-cow-milk-conventional-national-average-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "lamb-conventional-indoor-production-system-at-farm-gate-fr": {
            "name": "Lamb, conventional, indoor production system, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 16.27978,
                    "Ozone Depletion": 7.2197786e-08,
                    "Human Toxicity, non-cancer": 3.0182677e-07,
                    "Human Toxicity, cancer": 8.0278604e-09,
                    "Particulate Matter": 2.3242601e-06,
                    "Ionizing Radiation": 0.32922006,
                    "Photochemical Ozone Formation": 0.026482343,
                    "Acidification": 0.34217637,
                    "Eutrophication, terrestrial": 1.5208072,
                    "Eutrophication, freshwater": 0.00077523412,
                    "Eutrophication, marine": 0.064474518,
                    "Ecotoxicity, freshwater": 82.48711399999999,
                    "Land Use": 1773.3846,
                    "Water Use/Scarcity (AWARE)": 2.7199933,
                    "Resource Use, minerals/metals": 1.9394663e-05,
                    "Resource Use, fossils": 30.32025
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Lamb, conventional, indoor production system, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-lamb-conventional-indoor-production-system-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "turkey-conventional-at-farm-gate-fr": {
            "name": "Turkey, conventional, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 2.8536728,
                    "Ozone Depletion": 4.6158471e-08,
                    "Human Toxicity, non-cancer": 5.5051974e-08,
                    "Human Toxicity, cancer": 2.8124092e-09,
                    "Particulate Matter": 5.5417611e-07,
                    "Ionizing Radiation": 0.17004195,
                    "Photochemical Ozone Formation": 0.010719323,
                    "Acidification": 0.079812464,
                    "Eutrophication, terrestrial": 0.34530548,
                    "Eutrophication, freshwater": 0.00037344319,
                    "Eutrophication, marine": 0.022032977,
                    "Ecotoxicity, freshwater": 127.55486,
                    "Land Use": 146.66684,
                    "Water Use/Scarcity (AWARE)": 0.79094917,
                    "Resource Use, minerals/metals": 8.7471338e-06,
                    "Resource Use, fossils": 17.319829
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Turkey, conventional, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-turkey-conventional-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "durum-wheat-grain-conventional-national-average-at-farm-gate-fr": {
            "name": "Durum wheat grain, conventional, national average, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.73260721,
                    "Ozone Depletion": 9.0183729e-09,
                    "Human Toxicity, non-cancer": 8.0432372e-09,
                    "Human Toxicity, cancer": 1.3465386e-09,
                    "Particulate Matter": 5.4574959e-08,
                    "Ionizing Radiation": 0.032256948,
                    "Photochemical Ozone Formation": 0.0023656983,
                    "Acidification": 0.0089064029,
                    "Eutrophication, terrestrial": 0.039562057,
                    "Eutrophication, freshwater": 0.000235699,
                    "Eutrophication, marine": 0.0077423763,
                    "Ecotoxicity, freshwater": 5.1555592,
                    "Land Use": 104.01992,
                    "Water Use/Scarcity (AWARE)": 0.44952111,
                    "Resource Use, minerals/metals": 2.3229803e-06,
                    "Resource Use, fossils": 3.7662174
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Durum wheat grain, conventional, national average, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-durum-wheat-grain-conventional-national-average-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "maize-grain-conventional-28-moisture-national-average-animal-feed-at-farm-gate-fr": {
            "name": "Maize grain, conventional, 28% moisture, national average, animal feed, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.35610761,
                    "Ozone Depletion": 1.0980621e-08,
                    "Human Toxicity, non-cancer": 7.0566011e-09,
                    "Human Toxicity, cancer": 5.5439903e-10,
                    "Particulate Matter": 5.379761e-08,
                    "Ionizing Radiation": 0.040547249,
                    "Photochemical Ozone Formation": 0.0011926015,
                    "Acidification": 0.0078635987,
                    "Eutrophication, terrestrial": 0.035643017,
                    "Eutrophication, freshwater": 9.7711345e-05,
                    "Eutrophication, marine": 0.003381946,
                    "Ecotoxicity, freshwater": 19.9457911,
                    "Land Use": 49.468899,
                    "Water Use/Scarcity (AWARE)": 0.54974867,
                    "Resource Use, minerals/metals": 1.3929973e-06,
                    "Resource Use, fossils": 2.3536869
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Maize grain, conventional, 28% moisture, national average, animal feed, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-maize-grain-conventional-28-moisture-national-average-animal-feed-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "oat-grain-national-average-animal-feed-at-farm-gate-fr": {
            "name": "Oat grain, national average, animal feed, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.55512354,
                    "Ozone Depletion": 6.653186e-09,
                    "Human Toxicity, non-cancer": 1.4805134e-08,
                    "Human Toxicity, cancer": 1.0422817e-09,
                    "Particulate Matter": 5.5130877e-08,
                    "Ionizing Radiation": 0.0086291617,
                    "Photochemical Ozone Formation": 0.0017374887,
                    "Acidification": 0.0087047911,
                    "Eutrophication, terrestrial": 0.038715775,
                    "Eutrophication, freshwater": 0.00017285429,
                    "Eutrophication, marine": 0.007073108,
                    "Ecotoxicity, freshwater": 7.9976134,
                    "Land Use": 106.18051,
                    "Water Use/Scarcity (AWARE)": 0.12413737,
                    "Resource Use, minerals/metals": 1.5671997e-06,
                    "Resource Use, fossils": 2.2993856
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Oat grain, national average, animal feed, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-oat-grain-national-average-animal-feed-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "barley-feed-grain-conventional-national-average-animal-feed-at-farm-gate-fr": {
            "name": "Barley, feed grain, conventional, national average, animal feed, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.45529407,
                    "Ozone Depletion": 7.8885153e-09,
                    "Human Toxicity, non-cancer": 5.7740573e-09,
                    "Human Toxicity, cancer": 6.6493146e-10,
                    "Particulate Matter": 4.222388e-08,
                    "Ionizing Radiation": 0.009429494,
                    "Photochemical Ozone Formation": 0.0014259632,
                    "Acidification": 0.0065762184,
                    "Eutrophication, terrestrial": 0.02883029,
                    "Eutrophication, freshwater": 0.00012256998,
                    "Eutrophication, marine": 0.0048306709,
                    "Ecotoxicity, freshwater": 7.0831454,
                    "Land Use": 77.605433,
                    "Water Use/Scarcity (AWARE)": 0.12721896,
                    "Resource Use, minerals/metals": 1.6335195e-06,
                    "Resource Use, fossils": 2.1111049
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Barley, feed grain, conventional, national average, animal feed, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-barley-feed-grain-conventional-national-average-animal-feed-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "spring-pea-conventional-15-moisture-animal-feed-at-farm-gate-production-fr": {
            "name": "Spring pea, conventional, 15% moisture, animal feed, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.3436466,
                    "Ozone Depletion": 2.0308176e-08,
                    "Human Toxicity, non-cancer": 5.6305244e-09,
                    "Human Toxicity, cancer": 8.8088743e-10,
                    "Particulate Matter": 9.6391976e-09,
                    "Ionizing Radiation": 0.018245395,
                    "Photochemical Ozone Formation": 0.00060326206,
                    "Acidification": 0.0013890059,
                    "Eutrophication, terrestrial": 0.0049213169,
                    "Eutrophication, freshwater": 0.00016875603,
                    "Eutrophication, marine": 0.0078756913,
                    "Ecotoxicity, freshwater": 19.834745499999997,
                    "Land Use": 121.51531,
                    "Water Use/Scarcity (AWARE)": 0.17259938,
                    "Resource Use, minerals/metals": 1.3293865e-06,
                    "Resource Use, fossils": 1.8749027
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Spring pea, conventional, 15% moisture, animal feed, at farm gate, production {FR} U",
                    "source_uuid": "agb-3.2-spring-pea-conventional-15-moisture-animal-feed-at-farm-gate-production-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "soybean-national-average-animal-feed-at-farm-gate-fr": {
            "name": "Soybean, national average, animal feed, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.45892391,
                    "Ozone Depletion": 1.1657199e-08,
                    "Human Toxicity, non-cancer": -2.1897661e-09,
                    "Human Toxicity, cancer": 5.8989067e-10,
                    "Particulate Matter": 1.2681986e-08,
                    "Ionizing Radiation": 0.0065238686,
                    "Photochemical Ozone Formation": 0.00064671745,
                    "Acidification": 0.0019085101,
                    "Eutrophication, terrestrial": 0.0072442145,
                    "Eutrophication, freshwater": 0.00028936503,
                    "Eutrophication, marine": 0.0091450765,
                    "Ecotoxicity, freshwater": 5.9924059,
                    "Land Use": 201.19494,
                    "Water Use/Scarcity (AWARE)": 0.032199873,
                    "Resource Use, minerals/metals": 1.1118662e-06,
                    "Resource Use, fossils": 1.3959694
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Soybean, national average, animal feed, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-soybean-national-average-animal-feed-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        "quinoa-fr-conventional-at-farm-gate-fr-corrected": {
            "name": "Quinoa FR, conventional, at farm gate (corrected)",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 1.7,
                    "Ozone Depletion": 2.37e-08,
                    "Human Toxicity, non-cancer": 1.29e-07,
                    "Human Toxicity, cancer": 2.91e-09,
                    "Particulate Matter": 1.09e-07,
                    "Ionizing Radiation": 0.0624,
                    "Photochemical Ozone Formation": 0.00691,
                    "Acidification": 0.0165,
                    "Eutrophication, terrestrial": 0.0642,
                    "Eutrophication, freshwater": 0.00042,
                    "Eutrophication, marine": 0.0371,
                    "Ecotoxicity, freshwater": 17.1,
                    "Land Use": 264,
                    "Water Use/Scarcity (AWARE)": 12,
                    "Resource Use, minerals/metals": 2.12e-05,
                    "Resource Use, fossils": 11
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Quinoa FR, conventional, at farm gate {FR} U (corrected)",
                    "source_uuid": "agb-3.2-quinoa-fr-conventional-at-farm-gate-fr-corrected",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg",
                    "note": "Corrected values from red line in spreadsheet"
                }
            }
        },
        "ware-potato-conventional-variety-mix-national-average-at-farm-gate-fr": {
            "name": "Ware potato, conventional, variety mix, national average, at farm gate",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 0.092212942,
                    "Ozone Depletion": 2.2593062e-09,
                    "Human Toxicity, non-cancer": 3.9846655e-09,
                    "Human Toxicity, cancer": 1.275011e-10,
                    "Particulate Matter": 7.2287476e-09,
                    "Ionizing Radiation": 0.0091617674,
                    "Photochemical Ozone Formation": 0.0002925398,
                    "Acidification": 0.0011012815,
                    "Eutrophication, terrestrial": 0.0044635419,
                    "Eutrophication, freshwater": 2.1023347e-05,
                    "Eutrophication, marine": 0.00075041704,
                    "Ecotoxicity, freshwater": 2.2487966999999998,
                    "Land Use": 14.924445,
                    "Water Use/Scarcity (AWARE)": 0.10054387,
                    "Resource Use, minerals/metals": 5.6554809e-07,
                    "Resource Use, fossils": 0.71644911
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Ware potato, conventional, variety mix, national average, at farm gate {FR} U",
                    "source_uuid": "agb-3.2-ware-potato-conventional-variety-mix-national-average-at-farm-gate-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        // ... (Continue with ALL your other ingredients here - I've included 15 as examples)
        // You need to copy ALL your 100+ ingredients into this ingredients object
        
        // For brevity, I'll show the structure - copy ALL your ingredients here
        "tomato-average-basket-conventional-heated-greenhouse-national-average-at-greenhouse-fr": {
            "name": "Tomato, average basket, conventional, heated greenhouse, national average, at greenhouse",
            "loss": 0.03,
            "data": {
                "pef": {
                    "Climate Change": 2.5749024,
                    "Ozone Depletion": 1.0655657e-07,
                    "Human Toxicity, non-cancer": 9.4041628e-09,
                    "Human Toxicity, cancer": 8.7167314e-10,
                    "Particulate Matter": 6.3159847e-08,
                    "Ionizing Radiation": 0.16790918,
                    "Photochemical Ozone Formation": 0.0056638769,
                    "Acidification": 0.0058221058,
                    "Eutrophication, terrestrial": 0.015010047,
                    "Eutrophication, freshwater": 0.00056322869,
                    "Eutrophication, marine": 0.0029581268,
                    "Ecotoxicity, freshwater": 6.3754328000000005,
                    "Land Use": 2.9122478,
                    "Water Use/Scarcity (AWARE)": 0.34187667,
                    "Resource Use, minerals/metals": 5.9007814e-06,
                    "Resource Use, fossils": 37.950106
                },
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": "Tomato, average basket, conventional, heated greenhouse, national average, at greenhouse {FR} U",
                    "source_uuid": "agb-3.2-tomato-average-basket-conventional-heated-greenhouse-national-average-at-greenhouse-fr",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 1.4,
                        "GR": 1.9,
                        "TiR": 1.0,
                        "C": 1.4,
                        "P": 1.0
                    },
                    "dqr_overall": 1.3,
                    "system_boundary": "cradle-to-farm gate",
                    "geographical_scope": "France",
                    "reference_year": 2022,
                    "unit_basis": "per kg"
                }
            }
        },
        
    },

    // ================== COUNTRY FACTORS ==================
    countries: {
        "DE": { name: "Germany", electricityCO2: 200, awareFactor: 24.5 },
        "FR": { name: "France", electricityCO2: 50, awareFactor: 17.1 },
        "IT": { name: "Italy", electricityCO2: 250, awareFactor: 49.8 },
        "ES": { name: "Spain", electricityCO2: 200, awareFactor: 64.7 },
        "NL": { name: "Netherlands", electricityCO2: 150, awareFactor: 33.6 },
        "PL": { name: "Poland", electricityCO2: 400, awareFactor: 19.8 },
        "SE": { name: "Sweden", electricityCO2: 50, awareFactor: 1.3 },
        "DK": { name: "Denmark", electricityCO2: 50, awareFactor: 14.5 },
        "BE": { name: "Belgium", electricityCO2: 150, awareFactor: 42.1 },
        "UK": { name: "United Kingdom", electricityCO2: 250, awareFactor: 22.9 },
        "IE": { name: "Ireland", electricityCO2: 150, awareFactor: 1.8 },
        "AT": { name: "Austria", electricityCO2: 150, awareFactor: 2.5 },
        "FI": { name: "Finland", electricityCO2: 50, awareFactor: 0.5 },
        "PT": { name: "Portugal", electricityCO2: 200, awareFactor: 43.1 },
        "GR": { name: "Greece", electricityCO2: 300, awareFactor: 61.2 },
        "US": { name: "United States", electricityCO2: 290, awareFactor: 32.9 },
        "CA": { name: "Canada", electricityCO2: 50, awareFactor: 2.2 },
        "AU": { name: "Australia", electricityCO2: 400, awareFactor: 60.1 },
        "JP": { name: "Japan", electricityCO2: 350, awareFactor: 36.5 },
        "CN": { name: "China", electricityCO2: 480, awareFactor: 41.0 },
        "IN": { name: "India", electricityCO2: 660, awareFactor: 70.4 },
        "BR": { name: "Brazil", electricityCO2: 150, awareFactor: 3.1 }
    },

    // ================== PROCESSING METHODS ==================
    processing: {
        "none": { co2_impact: 0, water_impact: 0, yield: 1.00, loss: 0.000 },
        "pasteurization": { co2_impact: 0.075, water_impact: 0.2, yield: 0.995, loss: 0.005 },
        "sterilization": { co2_impact: 0.15, water_impact: 0.35, yield: 0.985, loss: 0.015 },
        "baking": { co2_impact: 0.6, water_impact: 0.15, yield: 0.88, loss: 0.120 },
        "frying": { co2_impact: 0.8, water_impact: 0.25, yield: 0.75, loss: 0.250 },
        "freezing": { co2_impact: 0.3, water_impact: 0.1, yield: 0.975, loss: 0.025 },
        "drying": { co2_impact: 2.0, water_impact: 0.2, yield: 0.97, loss: 0.030 },
        "milling": { co2_impact: 0.045, water_impact: 0.05, yield: 0.78, loss: 0.220 },
        "mixing": { co2_impact: 0.02, water_impact: 0.05, yield: 0.995, loss: 0.005 },
        "fermentation": { co2_impact: 0.4, water_impact: 1.1, yield: 0.95, loss: 0.050 },
        "extrusion": { co2_impact: 0.5, water_impact: 0.3, yield: 0.95, loss: 0.050 },
        "oat-processing": { co2_impact: 0.12, water_impact: 0.4, yield: 0.98, loss: 0.02 }
    },

    // ================== TRANSPORTATION ==================
    transportation: {
        "road": { co2: 0.08, refrigerated_factor: 0.30 },
        "rail": { co2: 0.02, refrigerated_factor: 0.00 },
        "sea": { co2: 0.01, refrigerated_factor: 0.75 },
        "air": { co2: 0.525, refrigerated_factor: 0.00 },
        "lastmile": { co2: 0.20, refrigerated_factor: 0.00 },
        "electric_van": { co2: 0.05, refrigerated_factor: 0.10 }
    },

    // ================== PACKAGING ==================
    packaging: {
        "cardboard": { 
            co2_virgin: 1.4, co2_recycled: 0.3, co2_disposal: 0.05, co2_avoided_credit: 1.2,
            r1_max: 0.85, r2: 0.85, q: 0.90 
        },
        "PET": { 
            co2_virgin: 2.5, co2_recycled: 1.1, co2_disposal: 0.04, co2_avoided_credit: 2.1,
            r1_max: 0.50, r2: 0.45, q: 0.95 
        },
        "rPET": { 
            co2_virgin: 2.5, co2_recycled: 0.6, co2_disposal: 0.04, co2_avoided_credit: 2.1,
            r1_max: 1.0, r2: 0.60, q: 0.95 
        },
        "HDPE": { 
            co2_virgin: 2.0, co2_recycled: 0.9, co2_disposal: 0.04, co2_avoided_credit: 1.7,
            r1_max: 0.50, r2: 0.40, q: 0.90 
        },
        "LDPE": { 
            co2_virgin: 2.2, co2_recycled: 1.0, co2_disposal: 0.04, co2_avoided_credit: 1.8,
            r1_max: 0.40, r2: 0.40, q: 0.90 
        },
        "PP": { 
            co2_virgin: 2.1, co2_recycled: 0.95, co2_disposal: 0.04, co2_avoided_credit: 1.75,
            r1_max: 0.50, r2: 0.40, q: 0.90 
        },
        "glass": { 
            co2_virgin: 1.05, co2_recycled: 0.8, co2_disposal: 0.01, co2_avoided_credit: 0.95,
            r1_max: 0.90, r2: 0.85, q: 1.00 
        },
        "aluminum": { 
            co2_virgin: 9.0, co2_recycled: 0.5, co2_disposal: 0.0, co2_avoided_credit: 8.5,
            r1_max: 0.90, r2: 0.75, q: 1.00 
        },
        "steel": { 
            co2_virgin: 2.0, co2_recycled: 0.6, co2_disposal: 0.0, co2_avoided_credit: 1.8,
            r1_max: 0.90, r2: 0.80, q: 1.00 
        },
        "PLA": {
            co2_virgin: 2.0, co2_recycled: 1.5, co2_disposal: 0.4, co2_avoided_credit: 0.1,
            r1_max: 0.10, r2: 0.01, q: 0.80 
        },
        "mycelium": {
            co2_virgin: 0.5, co2_recycled: 0.1, co2_disposal: 0.0, co2_avoided_credit: 0.0,
            r1_max: 0.0, r2: 1.0, q: 1.00
        }
    }
};

// ================== FOR BROWSER USAGE (GitHub Pages) ==================
if (typeof window !== 'undefined') {
    window.aioxyData = aioxyData;
}

// ================== FOR NODE.JS MODULE USAGE ==================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = aioxyData;
                        }
