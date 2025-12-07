// ================== COMPLETE PEF-COMPLIANT DATASET WITH DQR, PROVENANCE & UPSTREAM ==================
const aioxyData = {
    // COMPLETE 50 INGREDIENTS DATABASE WITH UPSTREAM
    ingredients: {
        "beef-cattle-conventional-national-average-at-farm-gate-fr": { 
            name: "Beef cattle, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 14.474184, "Ozone Depletion": 5.4273208e-08, "Human Toxicity, non-cancer": 2.1237667e-07,
                    "Human Toxicity, cancer": 5.7423135e-09, "Particulate Matter": 1.3817053e-06, "Ionizing Radiation": 0.30685289,
                    "Photochemical Ozone Formation": 0.020942186, "Acidification": 0.2055071, "Eutrophication, terrestrial": 0.91130068,
                    "Eutrophication, freshwater": 0.00057342882, "Eutrophication, marine": 0.043273688, "Ecotoxicity, freshwater": 72.969244,
                    "Land Use": 965.59624, "Water Use/Scarcity (AWARE)": 1.1559368, "Resource Use, minerals/metals": 1.7488165e-05,
                    "Resource Use, fossils": 24.202021
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Beef cattle, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-beef-cattle-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.12,
                    electricity_kwh_per_kg: 0.18,
                    land_ha_per_kg: 8.5,
                    fertilizer_kg_per_kg: 0.12
                }
            }
        },
        "broiler-conventional-at-farm-gate-fr": { 
            name: "Broiler, conventional, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.8638007, "Ozone Depletion": 3.0563213e-08, "Human Toxicity, non-cancer": 3.3782736e-08,
                    "Human Toxicity, cancer": 2.5370352e-09, "Particulate Matter": 4.8977736e-07, "Ionizing Radiation": 0.12093183,
                    "Photochemical Ozone Formation": 0.0074266987, "Acidification": 0.069876768, "Eutrophication, terrestrial": 0.31118839,
                    "Eutrophication, freshwater": 0.00037821484, "Eutrophication, marine": 0.015481044, "Ecotoxicity, freshwater": 78.032228,
                    "Land Use": 161.6369, "Water Use/Scarcity (AWARE)": 0.71976888, "Resource Use, minerals/metals": 5.739888e-06,
                    "Resource Use, fossils": 11.335022
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Broiler, conventional, at farm gate {FR} U",
                    source_uuid: "agb-3.2-broiler-conventional-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.10,
                    electricity_kwh_per_kg: 0.16,
                    land_ha_per_kg: 1.8,
                    fertilizer_kg_per_kg: 0.10
                }
            }
        },
        "pig-conventional-national-average-at-farm-gate-fr": { 
            name: "Pig, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.7941587, "Ozone Depletion": 3.6760835e-08, "Human Toxicity, non-cancer": 3.1449332e-08,
                    "Human Toxicity, cancer": 2.1162373e-09, "Particulate Matter": 3.205921e-07, "Ionizing Radiation": 0.41853717,
                    "Photochemical Ozone Formation": 0.0063435638, "Acidification": 0.044565286, "Eutrophication, terrestrial": 0.19220629,
                    "Eutrophication, freshwater": 0.00038365295, "Eutrophication, marine": 0.013201376, "Ecotoxicity, freshwater": 89.38251600000001,
                    "Land Use": 161.62783, "Water Use/Scarcity (AWARE)": 0.95123835, "Resource Use, minerals/metals": 1.0629231e-05,
                    "Resource Use, fossils": 19.019492
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Pig, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-pig-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.11,
                    electricity_kwh_per_kg: 0.17,
                    land_ha_per_kg: 2.1,
                    fertilizer_kg_per_kg: 0.11
                }
            }
        },
        "salmon-farmed-conventional-at-farm-gate-no": { 
            name: "Salmon, farmed, conventional, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.2106452, "Ozone Depletion": 1.6145227e-07, "Human Toxicity, non-cancer": 4.3657851e-08,
                    "Human Toxicity, cancer": 2.4011685e-09, "Particulate Matter": 1.6076953e-07, "Ionizing Radiation": 0.3497157,
                    "Photochemical Ozone Formation": 0.011056826, "Acidification": 0.019831925, "Eutrophication, terrestrial": 0.078358656,
                    "Eutrophication, freshwater": 0.00057584597, "Eutrophication, marine": 0.037327814, "Ecotoxicity, freshwater": 49.67809,
                    "Land Use": 116.59034, "Water Use/Scarcity (AWARE)": 0.4938601, "Resource Use, minerals/metals": 2.3887875e-05,
                    "Resource Use, fossils": 25.327321
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Salmon, farmed, conventional, at farm gate {NO} U",
                    source_uuid: "agb-3.2-salmon-farmed-conventional-at-farm-gate-no",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.08,
                    electricity_kwh_per_kg: 0.12,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.08
                }
            }
        },
        "cow-milk-conventional-national-average-at-farm-gate-fr": { 
            name: "Cow milk, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.1061238, "Ozone Depletion": 6.1238304e-09, "Human Toxicity, non-cancer": 1.3642623e-08,
                    "Human Toxicity, cancer": 5.2881169e-10, "Particulate Matter": 1.010635e-07, "Ionizing Radiation": 0.035083814,
                    "Photochemical Ozone Formation": 0.0017671955, "Acidification": 0.014976555, "Eutrophication, terrestrial": 0.065590084,
                    "Eutrophication, freshwater": 6.8064244e-05, "Eutrophication, marine": 0.003992328, "Ecotoxicity, freshwater": 14.5777639,
                    "Land Use": 59.0766, "Water Use/Scarcity (AWARE)": 0.11527343, "Resource Use, minerals/metals": 1.8201174e-06,
                    "Resource Use, fossils": 2.2493909
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Cow milk, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-cow-milk-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.09,
                    electricity_kwh_per_kg: 0.15,
                    land_ha_per_kg: 0.8,
                    fertilizer_kg_per_kg: 0.09
                }
            }
        },
        "lamb-conventional-indoor-production-system-at-farm-gate-fr": { 
            name: "Lamb, conventional, indoor production system, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 16.27978, "Ozone Depletion": 7.2197786e-08, "Human Toxicity, non-cancer": 3.0182677e-07,
                    "Human Toxicity, cancer": 8.0278604e-09, "Particulate Matter": 2.3242601e-06, "Ionizing Radiation": 0.32922006,
                    "Photochemical Ozone Formation": 0.026482343, "Acidification": 0.34217637, "Eutrophication, terrestrial": 1.5208072,
                    "Eutrophication, freshwater": 0.00077523412, "Eutrophication, marine": 0.064474518, "Ecotoxicity, freshwater": 82.48711399999999,
                    "Land Use": 1773.3846, "Water Use/Scarcity (AWARE)": 2.7199933, "Resource Use, minerals/metals": 1.9394663e-05,
                    "Resource Use, fossils": 30.32025
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Lamb, conventional, indoor production system, at farm gate {FR} U",
                    source_uuid: "agb-3.2-lamb-conventional-indoor-production-system-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.13,
                    electricity_kwh_per_kg: 0.19,
                    land_ha_per_kg: 12.5,
                    fertilizer_kg_per_kg: 0.13
                }
            }
        },
        "turkey-conventional-at-farm-gate-fr": { 
            name: "Turkey, conventional, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.8536728, "Ozone Depletion": 4.6158471e-08, "Human Toxicity, non-cancer": 5.5051974e-08,
                    "Human Toxicity, cancer": 2.8124092e-09, "Particulate Matter": 5.5417611e-07, "Ionizing Radiation": 0.17004195,
                    "Photochemical Ozone Formation": 0.010719323, "Acidification": 0.079812464, "Eutrophication, terrestrial": 0.34530548,
                    "Eutrophication, freshwater": 0.00037344319, "Eutrophication, marine": 0.022032977, "Ecotoxicity, freshwater": 127.55486,
                    "Land Use": 146.66684, "Water Use/Scarcity (AWARE)": 0.79094917, "Resource Use, minerals/metals": 8.7471338e-06,
                    "Resource Use, fossils": 17.319829
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Turkey, conventional, at farm gate {FR} U",
                    source_uuid: "agb-3.2-turkey-conventional-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.11,
                    electricity_kwh_per_kg: 0.17,
                    land_ha_per_kg: 2.0,
                    fertilizer_kg_per_kg: 0.11
                }
            }
        },
        "durum-wheat-grain-conventional-national-average-at-farm-gate-fr": { 
            name: "Durum wheat grain, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.73260721, "Ozone Depletion": 9.0183729e-09, "Human Toxicity, non-cancer": 8.0432372e-09,
                    "Human Toxicity, cancer": 1.3465386e-09, "Particulate Matter": 5.4574959e-08, "Ionizing Radiation": 0.032256948,
                    "Photochemical Ozone Formation": 0.0023656983, "Acidification": 0.0089064029, "Eutrophication, terrestrial": 0.039562057,
                    "Eutrophication, freshwater": 0.000235699, "Eutrophication, marine": 0.0077423763, "Ecotoxicity, freshwater": 5.1555592,
                    "Land Use": 104.01992, "Water Use/Scarcity (AWARE)": 0.44952111, "Resource Use, minerals/metals": 2.3229803e-06,
                    "Resource Use, fossils": 3.7662174
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Durum wheat grain, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-durum-wheat-grain-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.04,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.14,
                    fertilizer_kg_per_kg: 0.04
                }
            }
        },
        "maize-grain-conventional-28-moisture-national-average-animal-feed-at-farm-gate-fr": { 
            name: "Maize grain, conventional, 28% moisture, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.35610761, "Ozone Depletion": 1.0980621e-08, "Human Toxicity, non-cancer": 7.0566011e-09,
                    "Human Toxicity, cancer": 5.5439903e-10, "Particulate Matter": 5.379761e-08, "Ionizing Radiation": 0.040547249,
                    "Photochemical Ozone Formation": 0.0011926015, "Acidification": 0.0078635987, "Eutrophication, terrestrial": 0.035643017,
                    "Eutrophication, freshwater": 9.7711345e-05, "Eutrophication, marine": 0.003381946, "Ecotoxicity, freshwater": 19.9457911,
                    "Land Use": 49.468899, "Water Use/Scarcity (AWARE)": 0.54974867, "Resource Use, minerals/metals": 1.3929973e-06,
                    "Resource Use, fossils": 2.3536869
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Maize grain, conventional, 28% moisture, national average, animal feed, at farm gate {FR} U",
                    source_uuid: "agb-3.2-maize-grain-conventional-28-moisture-national-average-animal-feed-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.12,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "oat-grain-national-average-animal-feed-at-farm-gate-fr": { 
            name: "Oat grain, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.55512354, "Ozone Depletion": 6.653186e-09, "Human Toxicity, non-cancer": 1.4805134e-08,
                    "Human Toxicity, cancer": 1.0422817e-09, "Particulate Matter": 5.5130877e-08, "Ionizing Radiation": 0.0086291617,
                    "Photochemical Ozone Formation": 0.0017374887, "Acidification": 0.0087047911, "Eutrophication, terrestrial": 0.038715775,
                    "Eutrophication, freshwater": 0.00017285429, "Eutrophication, marine": 0.007073108, "Ecotoxicity, freshwater": 7.9976134,
                    "Land Use": 106.18051, "Water Use/Scarcity (AWARE)": 0.12413737, "Resource Use, minerals/metals": 1.5671997e-06,
                    "Resource Use, fossils": 2.2993856
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Oat grain, national average, animal feed, at farm gate {FR} U",
                    source_uuid: "agb-3.2-oat-grain-national-average-animal-feed-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.15,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "barley-feed-grain-conventional-national-average-animal-feed-at-farm-gate-fr": { 
            name: "Barley, feed grain, conventional, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.45529407, "Ozone Depletion": 7.8885153e-09, "Human Toxicity, non-cancer": 5.7740573e-09,
                    "Human Toxicity, cancer": 6.6493146e-10, "Particulate Matter": 4.222388e-08, "Ionizing Radiation": 0.009429494,
                    "Photochemical Ozone Formation": 0.0014259632, "Acidification": 0.0065762184, "Eutrophication, terrestrial": 0.02883029,
                    "Eutrophication, freshwater": 0.00012256998, "Eutrophication, marine": 0.0048306709, "Ecotoxicity, freshwater": 7.0831454,
                    "Land Use": 77.605433, "Water Use/Scarcity (AWARE)": 0.12721896, "Resource Use, minerals/metals": 1.6335195e-06,
                    "Resource Use, fossils": 2.1111049
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Barley, feed grain, conventional, national average, animal feed, at farm gate {FR} U",
                    source_uuid: "agb-3.2-barley-feed-grain-conventional-national-average-animal-feed-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.13,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "spring-pea-conventional-15-moisture-animal-feed-at-farm-gate-production-fr": { 
            name: "Spring pea, conventional, 15% moisture, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.3436466, "Ozone Depletion": 2.0308176e-08, "Human Toxicity, non-cancer": 5.6305244e-09,
                    "Human Toxicity, cancer": 8.8088743e-10, "Particulate Matter": 9.6391976e-09, "Ionizing Radiation": 0.018245395,
                    "Photochemical Ozone Formation": 0.00060326206, "Acidification": 0.0013890059, "Eutrophication, terrestrial": 0.0049213169,
                    "Eutrophication, freshwater": 0.00016875603, "Eutrophication, marine": 0.0078756913, "Ecotoxicity, freshwater": 19.834745499999997,
                    "Land Use": 121.51531, "Water Use/Scarcity (AWARE)": 0.17259938, "Resource Use, minerals/metals": 1.3293865e-06,
                    "Resource Use, fossils": 1.8749027
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Spring pea, conventional, 15% moisture, animal feed, at farm gate, production {FR} U",
                    source_uuid: "agb-3.2-spring-pea-conventional-15-moisture-animal-feed-at-farm-gate-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.40,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "soybean-national-average-animal-feed-at-farm-gate-fr": { 
            name: "Soybean, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.45892391, "Ozone Depletion": 1.1657199e-08, "Human Toxicity, non-cancer": -2.1897661e-09,
                    "Human Toxicity, cancer": 5.8989067e-10, "Particulate Matter": 1.2681986e-08, "Ionizing Radiation": 0.0065238686,
                    "Photochemical Ozone Formation": 0.00064671745, "Acidification": 0.0019085101, "Eutrophication, terrestrial": 0.0072442145,
                    "Eutrophication, freshwater": 0.00028936503, "Eutrophication, marine": 0.0091450765, "Ecotoxicity, freshwater": 5.9924059,
                    "Land Use": 201.19494, "Water Use/Scarcity (AWARE)": 0.032199873, "Resource Use, minerals/metals": 1.1118662e-06,
                    "Resource Use, fossils": 1.3959694
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Soybean, national average, animal feed, at farm gate {FR} U",
                    source_uuid: "agb-3.2-soybean-national-average-animal-feed-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.05,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.35,
                    fertilizer_kg_per_kg: 0.05
                }
            }
        },
        "quinoa-fr-conventional-at-farm-gate-fr-corrected": { 
            name: "Quinoa FR, conventional, at farm gate (corrected)",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.7, "Ozone Depletion": 2.37e-08, "Human Toxicity, non-cancer": 1.29e-07,
                    "Human Toxicity, cancer": 2.91e-09, "Particulate Matter": 1.09e-07, "Ionizing Radiation": 0.0624,
                    "Photochemical Ozone Formation": 0.00691, "Acidification": 0.0165, "Eutrophication, terrestrial": 0.0642,
                    "Eutrophication, freshwater": 0.00042, "Eutrophication, marine": 0.0371, "Ecotoxicity, freshwater": 17.1,
                    "Land Use": 264, "Water Use/Scarcity (AWARE)": 12, "Resource Use, minerals/metals": 2.12e-05,
                    "Resource Use, fossils": 11
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Quinoa FR, conventional, at farm gate {FR} U (corrected)",
                    source_uuid: "agb-3.2-quinoa-fr-conventional-at-farm-gate-fr-corrected",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.06,
                    electricity_kwh_per_kg: 0.12,
                    land_ha_per_kg: 0.45,
                    fertilizer_kg_per_kg: 0.06
                }
            }
        },
        "ware-potato-conventional-variety-mix-national-average-at-farm-gate-fr": { 
            name: "Ware potato, conventional, variety mix, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.092212942, "Ozone Depletion": 2.2593062e-09, "Human Toxicity, non-cancer": 3.9846655e-09,
                    "Human Toxicity, cancer": 1.275011e-10, "Particulate Matter": 7.2287476e-09, "Ionizing Radiation": 0.0091617674,
                    "Photochemical Ozone Formation": 0.0002925398, "Acidification": 0.0011012815, "Eutrophication, terrestrial": 0.0044635419,
                    "Eutrophication, freshwater": 2.1023347e-05, "Eutrophication, marine": 0.00075041704, "Ecotoxicity, freshwater": 2.2487966999999998,
                    "Land Use": 14.924445, "Water Use/Scarcity (AWARE)": 0.10054387, "Resource Use, minerals/metals": 5.6554809e-07,
                    "Resource Use, fossils": 0.71644911
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Ware potato, conventional, variety mix, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-ware-potato-conventional-variety-mix-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.07,
                    land_ha_per_kg: 0.03,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "tomato-average-basket-conventional-heated-greenhouse-national-average-at-greenhouse-fr": { 
            name: "Tomato, average basket, conventional, heated greenhouse, national average, at greenhouse",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.5749024, "Ozone Depletion": 1.0655657e-07, "Human Toxicity, non-cancer": 9.4041628e-09,
                    "Human Toxicity, cancer": 8.7167314e-10, "Particulate Matter": 6.3159847e-08, "Ionizing Radiation": 0.16790918,
                    "Photochemical Ozone Formation": 0.0056638769, "Acidification": 0.0058221058, "Eutrophication, terrestrial": 0.015010047,
                    "Eutrophication, freshwater": 0.00056322869, "Eutrophication, marine": 0.0029581268, "Ecotoxicity, freshwater": 6.3754328000000005,
                    "Land Use": 2.9122478, "Water Use/Scarcity (AWARE)": 0.34187667, "Resource Use, minerals/metals": 5.9007814e-06,
                    "Resource Use, fossils": 37.950106
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Tomato, average basket, conventional, heated greenhouse, national average, at greenhouse {FR} U",
                    source_uuid: "agb-3.2-tomato-average-basket-conventional-heated-greenhouse-national-average-at-greenhouse-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.25,
                    land_ha_per_kg: 0.05,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "onion-conventional-national-average-at-farm-fr": { 
            name: "Onion, conventional, national average, at farm",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.066608931, "Ozone Depletion": 3.5628166e-09, "Human Toxicity, non-cancer": 3.4803788e-09,
                    "Human Toxicity, cancer": 1.4652484e-10, "Particulate Matter": 6.4054812e-09, "Ionizing Radiation": 0.03301856,
                    "Photochemical Ozone Formation": 0.00026031856, "Acidification": 0.0009215708, "Eutrophication, terrestrial": 0.0031289961,
                    "Eutrophication, freshwater": 2.8155414e-05, "Eutrophication, marine": 0.0015022675, "Ecotoxicity, freshwater": 2.50532938,
                    "Land Use": 13.371393, "Water Use/Scarcity (AWARE)": 0.41699029, "Resource Use, minerals/metals": 1.1402078e-06,
                    "Resource Use, fossils": 1.2165805
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Onion, conventional, national average, at farm {FR} U",
                    source_uuid: "agb-3.2-onion-conventional-national-average-at-farm-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.02,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "carrot-conventional-national-average-at-farm-gate-fr": { 
            name: "Carrot, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.067747759, "Ozone Depletion": 3.1225603e-09, "Human Toxicity, non-cancer": 5.747495e-09,
                    "Human Toxicity, cancer": 1.1187463e-10, "Particulate Matter": 6.6649319e-09, "Ionizing Radiation": 0.023361262,
                    "Photochemical Ozone Formation": 0.00025376935, "Acidification": 0.00094785215, "Eutrophication, terrestrial": 0.0025040223,
                    "Eutrophication, freshwater": 2.369872e-05, "Eutrophication, marine": 0.00086790745, "Ecotoxicity, freshwater": 13.227628,
                    "Land Use": 6.450537, "Water Use/Scarcity (AWARE)": 0.2805004, "Resource Use, minerals/metals": 9.633161e-07,
                    "Resource Use, fossils": 1.1579311
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Carrot, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-carrot-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.07,
                    land_ha_per_kg: 0.01,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "apple-conventional-national-average-at-orchard-fr": { 
            name: "Apple, conventional, national average, at orchard",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.075189594, "Ozone Depletion": 7.7808705e-09, "Human Toxicity, non-cancer": 4.2313436e-09,
                    "Human Toxicity, cancer": 2.14384e-10, "Particulate Matter": 5.3113349e-09, "Ionizing Radiation": 0.015330981,
                    "Photochemical Ozone Formation": 0.00038436589, "Acidification": 0.00068646464, "Eutrophication, terrestrial": 0.0029102714,
                    "Eutrophication, freshwater": 1.3753403e-05, "Eutrophication, marine": 0.00034322906, "Ecotoxicity, freshwater": 6.9320383,
                    "Land Use": 12.06034, "Water Use/Scarcity (AWARE)": 0.42724241, "Resource Use, minerals/metals": 9.9927894e-07,
                    "Resource Use, fossils": 1.0469718
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Apple, conventional, national average, at orchard {FR} U",
                    source_uuid: "agb-3.2-apple-conventional-national-average-at-orchard-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.02,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "banana-mixed-production-west-indies-at-farm-gate-wi": { 
            name: "Banana, mixed production, West Indies, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.17837742, "Ozone Depletion": 3.2396754e-09, "Human Toxicity, non-cancer": 2.9137793e-09,
                    "Human Toxicity, cancer": 5.7746234e-11, "Particulate Matter": 4.8855726e-08, "Ionizing Radiation": 0.015778248,
                    "Photochemical Ozone Formation": 0.00084751563, "Acidification": 0.0069840975, "Eutrophication, terrestrial": 0.030403158,
                    "Eutrophication, freshwater": 1.9083297e-05, "Eutrophication, marine": 0.0004369033, "Ecotoxicity, freshwater": 9.7769634,
                    "Land Use": 17.122587, "Water Use/Scarcity (AWARE)": 0.30748788, "Resource Use, minerals/metals": 9.9221455e-07,
                    "Resource Use, fossils": 2.012917
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Banana, mixed production, West Indies, at farm gate {WI} U",
                    source_uuid: "agb-3.2-banana-mixed-production-west-indies-at-farm-gate-wi",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.12,
                    land_ha_per_kg: 0.03,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "strawberry-conventional-national-average-at-farm-gate-fr": { 
            name: "Strawberry, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.0788418, "Ozone Depletion": 3.8168236e-08, "Human Toxicity, non-cancer": 1.6574276e-08,
                    "Human Toxicity, cancer": 1.4517667e-09, "Particulate Matter": 6.801576e-08, "Ionizing Radiation": 0.19416268,
                    "Photochemical Ozone Formation": 0.0035133843, "Acidification": 0.0060642679, "Eutrophication, terrestrial": 0.019322658,
                    "Eutrophication, freshwater": 0.00050232899, "Eutrophication, marine": 0.0028056843, "Ecotoxicity, freshwater": 14.5457647,
                    "Land Use": 17.810947, "Water Use/Scarcity (AWARE)": 0.87817304, "Resource Use, minerals/metals": 1.2216159e-05,
                    "Resource Use, fossils": 20.635856
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Strawberry, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-strawberry-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.20,
                    land_ha_per_kg: 0.03,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "cauliflower-conventional-national-average-at-farm-gate-fr": { 
            name: "Cauliflower, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.22124384, "Ozone Depletion": 8.997369e-09, "Human Toxicity, non-cancer": 1.9117355e-08,
                    "Human Toxicity, cancer": 2.7033654e-10, "Particulate Matter": 1.9313642e-08, "Ionizing Radiation": 0.016044437,
                    "Photochemical Ozone Formation": 0.00065081053, "Acidification": 0.0029168665, "Eutrophication, terrestrial": 0.012330428,
                    "Eutrophication, freshwater": 2.4169792e-05, "Eutrophication, marine": 0.0033098512, "Ecotoxicity, freshwater": 2.5533715,
                    "Land Use": 22.295297, "Water Use/Scarcity (AWARE)": 0.03169752, "Resource Use, minerals/metals": 1.3685998e-06,
                    "Resource Use, fossils": 1.7106562
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Cauliflower, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-cauliflower-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.04,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "sugar-beet-roots-conventional-national-average-animal-feed-at-farm-gate-production-fr": { 
            name: "Sugar beet roots, conventional, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.038400502, "Ozone Depletion": 6.2825862e-10, "Human Toxicity, non-cancer": 2.5209911e-09,
                    "Human Toxicity, cancer": 6.2541358e-11, "Particulate Matter": 3.6241032e-09, "Ionizing Radiation": 0.0018011734,
                    "Photochemical Ozone Formation": 0.00010414634, "Acidification": 0.00053448862, "Eutrophication, terrestrial": 0.0023417613,
                    "Eutrophication, freshwater": 9.5455728e-06, "Eutrophication, marine": 0.00028475275, "Ecotoxicity, freshwater": 2.30932271,
                    "Land Use": 7.6718129, "Water Use/Scarcity (AWARE)": 0.017618213, "Resource Use, minerals/metals": 1.5028387e-07,
                    "Resource Use, fossils": 0.19528701
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sugar beet roots, conventional, national average, animal feed, at farm gate, production {FR} U",
                    source_uuid: "agb-3.2-sugar-beet-roots-conventional-national-average-animal-feed-at-farm-gate-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.06,
                    land_ha_per_kg: 0.01,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "rapeseed-conventional-9-moisture-national-average-animal-feed-at-farm-gate-production-fr": { 
            name: "Rapeseed, conventional, 9% moisture, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.150749, "Ozone Depletion": 4.0258181e-08, "Human Toxicity, non-cancer": 1.7652857e-08,
                    "Human Toxicity, cancer": 1.4878502e-09, "Particulate Matter": 1.2161271e-07, "Ionizing Radiation": 0.04219782,
                    "Photochemical Ozone Formation": 0.0036259184, "Acidification": 0.016802853, "Eutrophication, terrestrial": 0.078642928,
                    "Eutrophication, freshwater": 0.00026079849, "Eutrophication, marine": 0.011649591, "Ecotoxicity, freshwater": 25.3079701,
                    "Land Use": 159.54936, "Water Use/Scarcity (AWARE)": 0.28100723, "Resource Use, minerals/metals": 4.2563511e-06,
                    "Resource Use, fossils": 5.7542753
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Rapeseed, conventional, 9% moisture, national average, animal feed, at farm gate, production {FR} U",
                    source_uuid: "agb-3.2-rapeseed-conventional-9-moisture-national-average-animal-feed-at-farm-gate-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.04,
                    electricity_kwh_per_kg: 0.11,
                    land_ha_per_kg: 0.25,
                    fertilizer_kg_per_kg: 0.04
                }
            }
        },
        "sunflower-grain-conventional-9-moisture-national-average-animal-feed-at-farm-gate-production-fr": { 
            name: "Sunflower grain, conventional, 9% moisture, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.89712484, "Ozone Depletion": 1.0343719e-08, "Human Toxicity, non-cancer": 3.5430946e-08,
                    "Human Toxicity, cancer": 3.2411551e-09, "Particulate Matter": 6.8036792e-08, "Ionizing Radiation": 0.031477827,
                    "Photochemical Ozone Formation": 0.0019427156, "Acidification": 0.0082654929, "Eutrophication, terrestrial": 0.041755019,
                    "Eutrophication, freshwater": 0.00052616774, "Eutrophication, marine": 0.011311153, "Ecotoxicity, freshwater": 14.2417585,
                    "Land Use": 241.06169, "Water Use/Scarcity (AWARE)": 0.20475622, "Resource Use, minerals/metals": 2.9565482e-06,
                    "Resource Use, fossils": 3.9093871
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sunflower grain, conventional, 9% moisture, national average, animal feed, at farm gate, production {FR} U",
                    source_uuid: "agb-3.2-sunflower-grain-conventional-9-moisture-national-average-animal-feed-at-farm-gate-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.04,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.42,
                    fertilizer_kg_per_kg: 0.04
                }
            }
        },
        "seaweed-optimized-production-1kg-algae-laminaria-fresh-weight-fr": { 
            name: "Seaweed optimized production, 1kg algae (Laminaria), fresh weight",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.10356704, "Ozone Depletion": 2.8491848e-09, "Human Toxicity, non-cancer": 6.9311841e-10,
                    "Human Toxicity, cancer": 1.2960371e-10, "Particulate Matter": 8.8500266e-09, "Ionizing Radiation": 0.023210133,
                    "Photochemical Ozone Formation": 0.00074452272, "Acidification": 0.00098647192, "Eutrophication, terrestrial": 0.0024310569,
                    "Eutrophication, freshwater": 2.0444087e-05, "Eutrophication, marine": 0.00025302572, "Ecotoxicity, freshwater": 0.36547896,
                    "Land Use": 0.24311453, "Water Use/Scarcity (AWARE)": 0.053450563, "Resource Use, minerals/metals": 3.8569718e-07,
                    "Resource Use, fossils": 2.1055645
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Seaweed optimized production, 1kg algae (Laminaria), fresh weight {FR} U",
                    source_uuid: "agb-3.2-seaweed-optimized-production-1kg-algae-laminaria-fresh-weight-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.05,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "fresh-shrimps-china-production-fr": { 
            name: "Fresh shrimps, China production",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 7.7403063, "Ozone Depletion": 8.6432307e-07, "Human Toxicity, non-cancer": 1.1143379e-07,
                    "Human Toxicity, cancer": 7.6777552e-09, "Particulate Matter": 5.1002083e-07, "Ionizing Radiation": 0.64947369,
                    "Photochemical Ozone Formation": 0.02994307, "Acidification": 0.049744872, "Eutrophication, terrestrial": 0.13014098,
                    "Eutrophication, freshwater": 0.0035818414, "Eutrophication, marine": 0.051455895, "Ecotoxicity, freshwater": 140.892182,
                    "Land Use": 102.86895, "Water Use/Scarcity (AWARE)": 76.716314, "Resource Use, minerals/metals": 2.0932018e-05,
                    "Resource Use, fossils": 84.861227
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Fresh shrimps, China production {FR} U",
                    source_uuid: "agb-3.2-fresh-shrimps-china-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.09,
                    electricity_kwh_per_kg: 0.18,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.09
                }
            }
        },
        "coffee-bean-robusta-depulped-brazil-at-farm-gate-br": { 
            name: "Coffee bean (Robusta), depulped, Brazil, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.625605, "Ozone Depletion": 3.6816293e-08, "Human Toxicity, non-cancer": 1.6177181e-08,
                    "Human Toxicity, cancer": 5.0101384e-10, "Particulate Matter": 3.2189209e-07, "Ionizing Radiation": 0.042050116,
                    "Photochemical Ozone Formation": 0.0068294953, "Acidification": 0.047351498, "Eutrophication, terrestrial": 0.20164509,
                    "Eutrophication, freshwater": 0.00019477429, "Eutrophication, marine": 0.034649176, "Ecotoxicity, freshwater": 635.506518,
                    "Land Use": 223.94054, "Water Use/Scarcity (AWARE)": 0.72101363, "Resource Use, minerals/metals": 1.1782224e-05,
                    "Resource Use, fossils": 10.193134
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Coffee bean (Robusta), depulped, Brazil, at farm gate {BR} U",
                    source_uuid: "agb-3.2-coffee-bean-robusta-depulped-brazil-at-farm-gate-br",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.07,
                    electricity_kwh_per_kg: 0.15,
                    land_ha_per_kg: 0.39,
                    fertilizer_kg_per_kg: 0.07
                }
            }
        },
        "black-pepper-conventional-at-farm-gate-vn": { 
            name: "Black pepper, conventional, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.4615444, "Ozone Depletion": 2.1931317e-08, "Human Toxicity, non-cancer": 2.7251464e-08,
                    "Human Toxicity, cancer": 7.0299688e-10, "Particulate Matter": 2.9916958e-07, "Ionizing Radiation": 0.19599699,
                    "Photochemical Ozone Formation": 0.0082329914, "Acidification": 0.021188908, "Eutrophication, terrestrial": 0.13111444,
                    "Eutrophication, freshwater": 0.00034488881, "Eutrophication, marine": 0.022142783, "Ecotoxicity, freshwater": 11.621109700000002,
                    "Land Use": 234.27977, "Water Use/Scarcity (AWARE)": 1.3621756, "Resource Use, minerals/metals": 1.8772034e-05,
                    "Resource Use, fossils": 14.903491
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Black pepper, conventional, at farm gate {VN} U",
                    source_uuid: "agb-3.2-black-pepper-conventional-at-farm-gate-vn",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.06,
                    electricity_kwh_per_kg: 0.14,
                    land_ha_per_kg: 0.41,
                    fertilizer_kg_per_kg: 0.06
                }
            }
        },
        "pear-conventional-national-average-at-orchard-fr": { 
            name: "Pear, conventional, national average, at orchard",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.078595288, "Ozone Depletion": 5.5833437e-09, "Human Toxicity, non-cancer": 4.4270056e-09,
                    "Human Toxicity, cancer": 2.0073084e-10, "Particulate Matter": 4.9035271e-09, "Ionizing Radiation": 0.029809852,
                    "Photochemical Ozone Formation": 0.0003637396, "Acidification": 0.00079186454, "Eutrophication, terrestrial": 0.0029014263,
                    "Eutrophication, freshwater": 1.3906139e-05, "Eutrophication, marine": 0.00044947111, "Ecotoxicity, freshwater": 2.24043371,
                    "Land Use": 12.229785, "Water Use/Scarcity (AWARE)": 1.033256, "Resource Use, minerals/metals": 1.3027578e-06,
                    "Resource Use, fossils": 1.4033309
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Pear, conventional, national average, at orchard {FR} U",
                    source_uuid: "agb-3.2-pear-conventional-national-average-at-orchard-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.02,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "peach-conventional-national-average-at-orchard-fr": { 
            name: "Peach, conventional, national average, at orchard",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.15342513, "Ozone Depletion": 2.9391635e-09, "Human Toxicity, non-cancer": 1.2072622e-08,
                    "Human Toxicity, cancer": 2.3193808e-10, "Particulate Matter": 4.4339296e-09, "Ionizing Radiation": 0.048018971,
                    "Photochemical Ozone Formation": 0.00036229903, "Acidification": 0.00060456853, "Eutrophication, terrestrial": 0.0017919066,
                    "Eutrophication, freshwater": 4.3929458e-05, "Eutrophication, marine": 0.0089927864, "Ecotoxicity, freshwater": 12.875356550000001,
                    "Land Use": 146.8973, "Water Use/Scarcity (AWARE)": 1.2466086, "Resource Use, minerals/metals": 1.7543315e-06,
                    "Resource Use, fossils": 2.2546426
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Peach, conventional, national average, at orchard {FR} U",
                    source_uuid: "agb-3.2-peach-conventional-national-average-at-orchard-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.12,
                    land_ha_per_kg: 0.26,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "apricot-conventional-national-average-at-orchard-fr": { 
            name: "Apricot, conventional, national average, at orchard",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.2501659, "Ozone Depletion": 4.1355305e-09, "Human Toxicity, non-cancer": 1.1071839e-08,
                    "Human Toxicity, cancer": 2.2536347e-10, "Particulate Matter": 9.4935133e-09, "Ionizing Radiation": 0.048497323,
                    "Photochemical Ozone Formation": 0.00045016069, "Acidification": 0.00087381272, "Eutrophication, terrestrial": 0.0043976622,
                    "Eutrophication, freshwater": 8.7995293e-05, "Eutrophication, marine": 0.021865824, "Ecotoxicity, freshwater": 9.1832483,
                    "Land Use": 349.43667, "Water Use/Scarcity (AWARE)": 1.3076876, "Resource Use, minerals/metals": 2.2151548e-06,
                    "Resource Use, fossils": 2.4443178
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Apricot, conventional, national average, at orchard {FR} U",
                    source_uuid: "agb-3.2-apricot-conventional-national-average-at-orchard-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.13,
                    land_ha_per_kg: 0.61,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "cherry-conventional-national-average-at-orchard-fr": { 
            name: "Cherry, conventional, national average, at orchard",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.4606008, "Ozone Depletion": 1.0443234e-08, "Human Toxicity, non-cancer": 2.4033364e-08,
                    "Human Toxicity, cancer": 9.6863501e-10, "Particulate Matter": 2.059229e-08, "Ionizing Radiation": 0.026117156,
                    "Photochemical Ozone Formation": 0.0018110881, "Acidification": 0.0029725331, "Eutrophication, terrestrial": 0.010313909,
                    "Eutrophication, freshwater": 0.00024061313, "Eutrophication, marine": 0.0009564059399999999, "Ecotoxicity, freshwater": 66.9224168,
                    "Land Use": 728.15779, "Water Use/Scarcity (AWARE)": 4.6702364, "Resource Use, minerals/metals": 4.3623741e-06,
                    "Resource Use, fossils": 5.6536791
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Cherry, conventional, national average, at orchard {FR} U",
                    source_uuid: "agb-3.2-cherry-conventional-national-average-at-orchard-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.15,
                    land_ha_per_kg: 1.27,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "kiwi-fr-conventional-national-average-at-orchard-fr": { 
            name: "Kiwi FR, conventional, national average, at orchard",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.27737512, "Ozone Depletion": 6.011357e-09, "Human Toxicity, non-cancer": 9.3136319e-09,
                    "Human Toxicity, cancer": 6.6165106e-10, "Particulate Matter": 3.270136e-08, "Ionizing Radiation": 0.021014002,
                    "Photochemical Ozone Formation": 0.0010222105, "Acidification": 0.0028224433, "Eutrophication, terrestrial": 0.014514612,
                    "Eutrophication, freshwater": 7.3573169e-05, "Eutrophication, marine": 0.00052983078, "Ecotoxicity, freshwater": 4.1234669,
                    "Land Use": 46.382731, "Water Use/Scarcity (AWARE)": 1.6374272, "Resource Use, minerals/metals": 6.5188638e-06,
                    "Resource Use, fossils": 2.4742508
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Kiwi FR, conventional, national average, at orchard {FR} U",
                    source_uuid: "agb-3.2-kiwi-fr-conventional-national-average-at-orchard-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.11,
                    land_ha_per_kg: 0.08,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "walnut-dried-inshell-conventional-national-average-at-farm-gate-fr": { 
            name: "Walnut, dried inshell, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.50392, "Ozone Depletion": 6.5947801e-08, "Human Toxicity, non-cancer": 2.2930315e-08,
                    "Human Toxicity, cancer": 8.7717092e-10, "Particulate Matter": 1.2374302e-07, "Ionizing Radiation": 0.13597927,
                    "Photochemical Ozone Formation": 0.006137815, "Acidification": 0.019616622, "Eutrophication, terrestrial": 0.080722423,
                    "Eutrophication, freshwater": 0.00022831165, "Eutrophication, marine": 0.0070407695, "Ecotoxicity, freshwater": 19.776058,
                    "Land Use": 318.51995, "Water Use/Scarcity (AWARE)": 4.3204315, "Resource Use, minerals/metals": 1.8174358e-05,
                    "Resource Use, fossils": 16.425561
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Walnut, dried inshell, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-walnut-dried-inshell-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.05,
                    electricity_kwh_per_kg: 0.12,
                    land_ha_per_kg: 0.56,
                    fertilizer_kg_per_kg: 0.05
                }
            }
        },
        "small-trout-250-350g-conventional-at-farm-gate-fr": { 
            name: "Small trout, 250-350g, conventional, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.8707147, "Ozone Depletion": 1.8983274e-07, "Human Toxicity, non-cancer": 1.9538514e-08,
                    "Human Toxicity, cancer": 9.0225431e-10, "Particulate Matter": 1.3247698e-07, "Ionizing Radiation": 0.71223982,
                    "Photochemical Ozone Formation": 0.0089928902, "Acidification": 0.01316121, "Eutrophication, terrestrial": 0.047031036,
                    "Eutrophication, freshwater": 0.011330402, "Eutrophication, marine": 0.043941965, "Ecotoxicity, freshwater": 63.713178,
                    "Land Use": 47.670227, "Water Use/Scarcity (AWARE)": 131.46539, "Resource Use, minerals/metals": 7.0542498e-06,
                    "Resource Use, fossils": 33.445399
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Small trout, 250-350g, conventional, at farm gate {FR} U",
                    source_uuid: "agb-3.2-small-trout-250-350g-conventional-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.07,
                    electricity_kwh_per_kg: 0.14,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.07
                }
            }
        },
        "mussels-with-shell-at-farm-gate-fr": { 
            name: "Mussels, with shell, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.47410915, "Ozone Depletion": 8.9033937e-09, "Human Toxicity, non-cancer": 3.3482438e-09,
                    "Human Toxicity, cancer": 3.0392518e-10, "Particulate Matter": 1.9223382e-08, "Ionizing Radiation": 0.048987554,
                    "Photochemical Ozone Formation": 0.0054787729, "Acidification": 0.0043746993, "Eutrophication, terrestrial": 0.019057874,
                    "Eutrophication, freshwater": 6.7948367e-05, "Eutrophication, marine": 0.0017737185, "Ecotoxicity, freshwater": 3.01776849,
                    "Land Use": 56.650922, "Water Use/Scarcity (AWARE)": 0.087551199, "Resource Use, minerals/metals": 2.5200157e-06,
                    "Resource Use, fossils": 7.6980624
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Mussels, with shell, at farm gate {FR} U",
                    source_uuid: "agb-3.2-mussels-with-shell-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "sea-bass-or-sea-bream-200-500g-conventional-in-cage-at-farm-gate-fr": { 
            name: "Sea bass or sea bream, 200-500g, conventional, in cage, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 4.5371811, "Ozone Depletion": 5.831633e-07, "Human Toxicity, non-cancer": 1.0491257e-07,
                    "Human Toxicity, cancer": 1.5120436e-09, "Particulate Matter": 2.6888661e-07, "Ionizing Radiation": 0.5450682,
                    "Photochemical Ozone Formation": 0.022399278, "Acidification": 0.024255733, "Eutrophication, terrestrial": 0.088419482,
                    "Eutrophication, freshwater": 0.00031741251, "Eutrophication, marine": 0.23110825, "Ecotoxicity, freshwater": 52.811012,
                    "Land Use": 74.875351, "Water Use/Scarcity (AWARE)": 1.0273173, "Resource Use, minerals/metals": 4.4951729e-06,
                    "Resource Use, fossils": 62.854979
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sea bass or sea bream, 200-500g, conventional, in cage, at farm gate {FR} U",
                    source_uuid: "agb-3.2-sea-bass-or-sea-bream-200-500g-conventional-in-cage-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.08,
                    electricity_kwh_per_kg: 0.16,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.08
                }
            }
        },
        "lettuce-conventional-national-average-at-farm-gate-fr": { 
            name: "Lettuce, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.097654259, "Ozone Depletion": 3.1919223e-09, "Human Toxicity, non-cancer": 2.2132805e-08,
                    "Human Toxicity, cancer": 3.1348272e-10, "Particulate Matter": 8.8923836e-09, "Ionizing Radiation": 0.037454607,
                    "Photochemical Ozone Formation": 0.00038955165, "Acidification": 0.0010397544, "Eutrophication, terrestrial": 0.0039663301,
                    "Eutrophication, freshwater": 2.1833999e-05, "Eutrophication, marine": 0.0007397239, "Ecotoxicity, freshwater": 2.3408659099999998,
                    "Land Use": 3.4193933, "Water Use/Scarcity (AWARE)": 0.31561749, "Resource Use, minerals/metals": 1.4730394e-06,
                    "Resource Use, fossils": 2.497832
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Lettuce, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-lettuce-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.01,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "shea-butter-africa": { 
            name: "Shea Butter (Africa)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 1.15, "Ozone Depletion": 0.00000029, "Human Toxicity, non-cancer": 0.00039, 
                    "Human Toxicity, cancer": 0.0000048, "Particulate Matter": 0.00000115, "Ionizing Radiation": 0.078, 
                    "Photochemical Ozone Formation": 0.0039, "Acidification": 0.0145, "Eutrophication, terrestrial": 0.058, 
                    "Eutrophication, freshwater": 0.00175, "Eutrophication, marine": 0.0078, "Ecotoxicity, freshwater": 8.2, 
                    "Land Use": 43, "Water Use/Scarcity (AWARE)": 0.34, "Resource Use, minerals/metals": 0.00029, 
                    "Resource Use, fossils": 4.1
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Shea butter, Africa",
                    source_uuid: "agb-3.2-f4b123-shea-034",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.5, GR: 2.5, TiR: 2.0, C: 2.0, P: 2.0 },
                    dqr_overall: 2.2
                },
                upstream: {
                    n_demand_kg_per_kg: 0.08,
                    electricity_kwh_per_kg: 0.14,
                    land_ha_per_kg: 0.75,
                    fertilizer_kg_per_kg: 0.08
                }
            }
        },
        "cotton-conv-global": { 
            name: "Cotton, Conventional (Global Average)",
            loss: 0.05,
            data: {
                pef: { 
                    "Climate Change": 3.6, "Ozone Depletion": 0.00000078, "Human Toxicity, non-cancer": 0.0024, 
                    "Human Toxicity, cancer": 0.000029, "Particulate Matter": 0.0000048, "Ionizing Radiation": 0.145, 
                    "Photochemical Ozone Formation": 0.0145, "Acidification": 0.078, "Eutrophication, terrestrial": 0.24, 
                    "Eutrophication, freshwater": 0.0078, "Eutrophication, marine": 0.034, "Ecotoxicity, freshwater": 105.0, 
                    "Land Use": 2050, "Water Use/Scarcity (AWARE)": 13.8, "Resource Use, minerals/metals": 0.00195, 
                    "Resource Use, fossils": 12.1
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Cotton fiber, conventional, global average",
                    source_uuid: "agb-3.2-walca-1.2-c8a456-cotton-035",
                    allocation_method: "Mass Allocation",
                    dqr: { TeR: 2.5, GR: 1.0, TiR: 3.0, C: 2.0, P: 2.0 },
                    dqr_overall: 2.1
                },
                upstream: {
                    n_demand_kg_per_kg: 0.15,
                    electricity_kwh_per_kg: 0.18,
                    land_ha_per_kg: 3.6,
                    fertilizer_kg_per_kg: 0.15
                }
            }
        },
        "polyester-virgin-pet": { 
            name: "Polyester, Virgin (PET)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 4.1, "Ozone Depletion": 0.00000097, "Human Toxicity, non-cancer": 0.0034, 
                    "Human Toxicity, cancer": 0.000044, "Particulate Matter": 0.0000078, "Ionizing Radiation": 0.24, 
                    "Photochemical Ozone Formation": 0.024, "Acidification": 0.115, "Eutrophication, terrestrial": 0.34, 
                    "Eutrophication, freshwater": 0.0115, "Eutrophication, marine": 0.048, "Ecotoxicity, freshwater": 82.0, 
                    "Land Use": 14, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.00145, 
                    "Resource Use, fossils": 44.5
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Polyester, virgin PET, fiber",
                    source_uuid: "agb-3.2-f4b123-polyester-036",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.0, TiR: 2.0, C: 1.5, P: 1.5 },
                    dqr_overall: 1.8
                }
                // No upstream for synthetic materials
            }
        },
        "zucchini-conventional-national-average-at-farm-gate-fr": { 
            name: "Zucchini, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.14787573, "Ozone Depletion": 3.3550706e-09, "Human Toxicity, non-cancer": 1.0097825e-08,
                    "Human Toxicity, cancer": 2.798635e-10, "Particulate Matter": 1.2139185e-08, "Ionizing Radiation": 0.024314034,
                    "Photochemical Ozone Formation": 0.00057348706, "Acidification": 0.0015941838, "Eutrophication, terrestrial": 0.0060810943,
                    "Eutrophication, freshwater": 3.5253544e-05, "Eutrophication, marine": 0.0011029963, "Ecotoxicity, freshwater": 2.0245055499999998,
                    "Land Use": 10.986756, "Water Use/Scarcity (AWARE)": 0.43371072, "Resource Use, minerals/metals": 1.7181902e-06,
                    "Resource Use, fossils": 2.3597381
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Zucchini, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-zucchini-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.02,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "leek-conventional-national-average-at-plant-fr": { 
            name: "Leek, conventional, national average, at plant",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.15186452, "Ozone Depletion": 9.3111419e-09, "Human Toxicity, non-cancer": 2.9584517e-08,
                    "Human Toxicity, cancer": 2.5890185e-10, "Particulate Matter": 1.2672867e-08, "Ionizing Radiation": 0.045561849,
                    "Photochemical Ozone Formation": 0.00057975479, "Acidification": 0.0018946219, "Eutrophication, terrestrial": 0.0071934037,
                    "Eutrophication, freshwater": 2.0156133e-05, "Eutrophication, marine": 0.0011822617, "Ecotoxicity, freshwater": 8.348022400000001,
                    "Land Use": 5.9015174, "Water Use/Scarcity (AWARE)": 0.23385225, "Resource Use, minerals/metals": 1.4435195e-06,
                    "Resource Use, fossils": 2.3243777
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Leek, conventional, national average, at plant {FR} U",
                    source_uuid: "agb-3.2-leek-conventional-national-average-at-plant-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.01,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "melon-conventional-national-average-at-farm-gate-fr": { 
            name: "Melon, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.17189891, "Ozone Depletion": 3.9124483e-09, "Human Toxicity, non-cancer": 9.1904477e-09,
                    "Human Toxicity, cancer": 4.7112984e-10, "Particulate Matter": 9.7617417e-09, "Ionizing Radiation": 0.039488608,
                    "Photochemical Ozone Formation": 0.00058480749, "Acidification": 0.001191886, "Eutrophication, terrestrial": 0.0036031469,
                    "Eutrophication, freshwater": 8.2007196e-05, "Eutrophication, marine": 0.0021022131, "Ecotoxicity, freshwater": 2.07901975,
                    "Land Use": 21.799179, "Water Use/Scarcity (AWARE)": 0.75314586, "Resource Use, minerals/metals": 1.9981494e-06,
                    "Resource Use, fossils": 3.6030746
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Melon, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-melon-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.04,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "french-bean-conventional-national-average-at-farm-gate-fr": { 
            name: "French bean, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.095949997, "Ozone Depletion": 9.5284677e-09, "Human Toxicity, non-cancer": 1.4552752e-09,
                    "Human Toxicity, cancer": 1.8115535e-10, "Particulate Matter": 2.7789925e-08, "Ionizing Radiation": 0.0026032256,
                    "Photochemical Ozone Formation": 0.00048755946, "Acidification": 0.0042343639, "Eutrophication, terrestrial": 0.018691425,
                    "Eutrophication, freshwater": 5.2313027e-05, "Eutrophication, marine": 0.0019331066, "Ecotoxicity, freshwater": 9.4072203,
                    "Land Use": 69.096778, "Water Use/Scarcity (AWARE)": 0.85872665, "Resource Use, minerals/metals": 4.7221022e-07,
                    "Resource Use, fossils": 0.65135674
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "French bean, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-french-bean-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.06,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.12,
                    fertilizer_kg_per_kg: 0.06
                }
            }
        },
        "chicory-witlof-conventional-national-average-at-farm-gate-fr": { 
            name: "Chicory witlof, conventional, national average at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.3069788, "Ozone Depletion": 7.1017564e-08, "Human Toxicity, non-cancer": 6.1611612e-09,
                    "Human Toxicity, cancer": 4.211022e-10, "Particulate Matter": 1.1714613e-08, "Ionizing Radiation": 0.35262691,
                    "Photochemical Ozone Formation": 0.0007795697, "Acidification": 0.0012362616, "Eutrophication, terrestrial": 0.0031833043,
                    "Eutrophication, freshwater": 7.1118809e-05, "Eutrophication, marine": 0.0018012859, "Ecotoxicity, freshwater": 12.926692000000001,
                    "Land Use": 33.164132, "Water Use/Scarcity (AWARE)": 0.092785631, "Resource Use, minerals/metals": 4.1387688e-06,
                    "Resource Use, fossils": 9.7223457
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Chicory witlof, conventional, national average at farm gate {FR} U",
                    source_uuid: "agb-3.2-chicory-witlof-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.15,
                    land_ha_per_kg: 0.06,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "hemp-grain-champagne-at-farm-gate-fr": { 
            name: "Hemp, grain, Champagne, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.84229298, "Ozone Depletion": 7.025857e-09, "Human Toxicity, non-cancer": 6.2771816e-08,
                    "Human Toxicity, cancer": 2.2020927e-09, "Particulate Matter": 1.3289305e-07, "Ionizing Radiation": 0.018071287,
                    "Photochemical Ozone Formation": 0.002032446, "Acidification": 0.019440574, "Eutrophication, terrestrial": 0.086236615,
                    "Eutrophication, freshwater": 0.00049260535, "Eutrophication, marine": 0.013949279, "Ecotoxicity, freshwater": 5.25941633,
                    "Land Use": 241.86265, "Water Use/Scarcity (AWARE)": 0.092505509, "Resource Use, minerals/metals": 3.6116806e-06,
                    "Resource Use, fossils": 3.9127049
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Hemp, grain, Champagne, at farm gate {FR} U",
                    source_uuid: "agb-3.2-hemp-grain-champagne-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.04,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.42,
                    fertilizer_kg_per_kg: 0.04
                }
            }
        },
        "flaxseed-extruded-bleu-blanc-coeur-feed-at-farm-gate-fr": { 
            name: "Flaxseed extruded, Bleu Blanc Coeur feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.1265284, "Ozone Depletion": 1.4640087e-08, "Human Toxicity, non-cancer": 1.5606319e-08,
                    "Human Toxicity, cancer": 3.1299474e-09, "Particulate Matter": 1.1084647e-07, "Ionizing Radiation": 0.041249112,
                    "Photochemical Ozone Formation": 0.0029267201, "Acidification": 0.017237517, "Eutrophication, terrestrial": 0.07502444,
                    "Eutrophication, freshwater": 0.00048272338, "Eutrophication, marine": 0.015699036, "Ecotoxicity, freshwater": 14.4865335,
                    "Land Use": 278.00537, "Water Use/Scarcity (AWARE)": 0.24920324, "Resource Use, minerals/metals": 3.9449994e-06,
                    "Resource Use, fossils": 6.1135533
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Flaxseed extruded, Bleu Blanc Coeur feed, at farm gate {FR} U",
                    source_uuid: "agb-3.2-flaxseed-extruded-bleu-blanc-coeur-feed-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.04,
                    electricity_kwh_per_kg: 0.11,
                    land_ha_per_kg: 0.49,
                    fertilizer_kg_per_kg: 0.04
                }
            }
        },
        "spring-faba-bean-conventional-national-average-at-farm-gate-fr": { 
            name: "Spring faba bean, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.30254122, "Ozone Depletion": 4.6306863e-09, "Human Toxicity, non-cancer": 2.7111973e-09,
                    "Human Toxicity, cancer": 6.7509128e-10, "Particulate Matter": 7.9746452e-09, "Ionizing Radiation": 0.0061331975,
                    "Photochemical Ozone Formation": 0.00048153119, "Acidification": 0.0011322489, "Eutrophication, terrestrial": 0.0040425717,
                    "Eutrophication, freshwater": 0.00011976699, "Eutrophication, marine": 0.0071988704, "Ecotoxicity, freshwater": 18.131459,
                    "Land Use": 108.31998, "Water Use/Scarcity (AWARE)": 0.030150258, "Resource Use, minerals/metals": 9.3744708e-07,
                    "Resource Use, fossils": 1.28463
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Spring faba bean, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-spring-faba-bean-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.19,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "lupin-conventional-national-average-at-farm-gate-production-fr": { 
            name: "Lupin, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.67834927, "Ozone Depletion": 6.3061701e-09, "Human Toxicity, non-cancer": 1.1303771e-08,
                    "Human Toxicity, cancer": 2.4353416e-09, "Particulate Matter": 5.8297794e-08, "Ionizing Radiation": 0.013019213,
                    "Photochemical Ozone Formation": 0.00094562895, "Acidification": 0.0079379393, "Eutrophication, terrestrial": 0.034579531,
                    "Eutrophication, freshwater": 0.0003668215, "Eutrophication, marine": 0.015182114, "Ecotoxicity, freshwater": 7.6758898,
                    "Land Use": 275.85437, "Water Use/Scarcity (AWARE)": 0.085592754, "Resource Use, minerals/metals": 2.0566893e-06,
                    "Resource Use, fossils": 2.4335857
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Lupin, conventional, national average, at farm gate, production {FR} U",
                    source_uuid: "agb-3.2-lupin-conventional-national-average-at-farm-gate-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.11,
                    land_ha_per_kg: 0.48,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "triticale-grain-conventional-national-average-animal-feed-at-farm-gate-production-fr": { 
            name: "Triticale grain, conventional, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.54905466, "Ozone Depletion": 9.0677316e-09, "Human Toxicity, non-cancer": 8.5182572e-09,
                    "Human Toxicity, cancer": 9.805108e-10, "Particulate Matter": 3.5962678e-08, "Ionizing Radiation": 0.010257421,
                    "Photochemical Ozone Formation": 0.0017680347, "Acidification": 0.0059561493, "Eutrophication, terrestrial": 0.026484409,
                    "Eutrophication, freshwater": 0.00017081706, "Eutrophication, marine": 0.0072077215, "Ecotoxicity, freshwater": 2.8215664,
                    "Land Use": 104.63524, "Water Use/Scarcity (AWARE)": 0.089896948, "Resource Use, minerals/metals": 1.6386573e-06,
                    "Resource Use, fossils": 2.4095189
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Triticale grain, conventional, national average, animal feed, at farm gate, production {FR} U",
                    source_uuid: "agb-3.2-triticale-grain-conventional-national-average-animal-feed-at-farm-gate-production-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.18,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "sorghum-grain-conventional-national-average-animal-feed-at-farm-gate-fr": { 
            name: "Sorghum grain, conventional, national average, animal feed, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.4074714, "Ozone Depletion": 1.0755581e-08, "Human Toxicity, non-cancer": 1.5634579e-09,
                    "Human Toxicity, cancer": 1.2866483e-09, "Particulate Matter": 1.9610411e-08, "Ionizing Radiation": 0.018261895,
                    "Photochemical Ozone Formation": 0.00086159814, "Acidification": 0.003041892, "Eutrophication, terrestrial": 0.01222765,
                    "Eutrophication, freshwater": 0.00027004185, "Eutrophication, marine": 0.0048338541, "Ecotoxicity, freshwater": 5.83616,
                    "Land Use": 109.52851, "Water Use/Scarcity (AWARE)": 0.21950751, "Resource Use, minerals/metals": 1.3388474e-06,
                    "Resource Use, fossils": 1.8860006
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sorghum grain, conventional, national average, animal feed, at farm gate {FR} U",
                    source_uuid: "agb-3.2-sorghum-grain-conventional-national-average-animal-feed-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.03,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.19,
                    fertilizer_kg_per_kg: 0.03
                }
            }
        },
        "alfalfa-conventional-national-average-at-farm-gate-fr": { 
            name: "Alfalfa, conventional, national average, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.22850238, "Ozone Depletion": 2.2942999e-09, "Human Toxicity, non-cancer": 2.2220384e-09,
                    "Human Toxicity, cancer": 1.5079097e-10, "Particulate Matter": 3.6644736e-09, "Ionizing Radiation": 0.0052695836,
                    "Photochemical Ozone Formation": 0.00037999861, "Acidification": 0.0004413854, "Eutrophication, terrestrial": 0.00098515038,
                    "Eutrophication, freshwater": 2.4308612e-05, "Eutrophication, marine": 0.0035389752, "Ecotoxicity, freshwater": 3.3292571000000004,
                    "Land Use": 70.164678, "Water Use/Scarcity (AWARE)": 0.029798544, "Resource Use, minerals/metals": 8.6003391e-07,
                    "Resource Use, fossils": 1.1470818
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Alfalfa, conventional, national average, at farm gate {FR} U",
                    source_uuid: "agb-3.2-alfalfa-conventional-national-average-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.02,
                    electricity_kwh_per_kg: 0.07,
                    land_ha_per_kg: 0.12,
                    fertilizer_kg_per_kg: 0.02
                }
            }
        },
        "european-pilchard-sardina-pilchardus-eca-seine-average-at-landing-fr": { 
            name: "European Pilchard, Sardina pilchardus, ECA, Seine, average, at landing",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.15072597, "Ozone Depletion": 3.176933e-09, "Human Toxicity, non-cancer": 9.1553639e-10,
                    "Human Toxicity, cancer": 9.2100059e-11, "Particulate Matter": 3.5345174e-08, "Ionizing Radiation": 0.0011671354,
                    "Photochemical Ozone Formation": 0.0033785413, "Acidification": 0.0046153587, "Eutrophication, terrestrial": 0.012298853,
                    "Eutrophication, freshwater": 6.4762435e-06, "Eutrophication, marine": 0.0011303197, "Ecotoxicity, freshwater": 0.9281790999999999,
                    "Land Use": 0.24319648, "Water Use/Scarcity (AWARE)": 0.0053004026, "Resource Use, minerals/metals": 1.1633911e-06,
                    "Resource Use, fossils": 1.9566355
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "European Pilchard, Sardina pilchardus, ECA, Seine, average, at landing {FR} U",
                    source_uuid: "agb-3.2-european-pilchard-sardina-pilchardus-eca-seine-average-at-landing-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.06,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "atlantic-herring-clupea-harengus-nea-pelagic-trawl-average-at-landing-nl": { 
            name: "Atlantic Herring, Clupea harengus, NEA, Pelagic Trawl, average, at landing",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.56746633, "Ozone Depletion": 3.9367315e-08, "Human Toxicity, non-cancer": 2.1098818e-09,
                    "Human Toxicity, cancer": 3.1887501e-10, "Particulate Matter": 1.2557028e-07, "Ionizing Radiation": 0.0046285975,
                    "Photochemical Ozone Formation": 0.01202076, "Acidification": 0.016452318, "Eutrophication, terrestrial": 0.043532175,
                    "Eutrophication, freshwater": 2.1959117e-05, "Eutrophication, marine": 0.0039982402, "Ecotoxicity, freshwater": 3.17317585,
                    "Land Use": 0.6600756, "Water Use/Scarcity (AWARE)": 0.014782765, "Resource Use, minerals/metals": 1.4556729e-06,
                    "Resource Use, fossils": 6.9659696
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Atlantic Herring, Clupea harengus, NEA, Pelagic Trawl, average, at landing {NL} U",
                    source_uuid: "agb-3.2-atlantic-herring-clupea-harengus-nea-pelagic-trawl-average-at-landing-nl",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.07,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "atlantic-mackerel-scomber-scombrus-nea-pelagic-trawl-average-at-landing-nl": { 
            name: "Atlantic Mackerel, Scomber scombrus, NEA, Pelagic Trawl, average, at landing",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.5766123, "Ozone Depletion": 4.3017435e-08, "Human Toxicity, non-cancer": 2.1419911e-09,
                    "Human Toxicity, cancer": 3.2307075e-10, "Particulate Matter": 1.2677409e-07, "Ionizing Radiation": 0.0047071063,
                    "Photochemical Ozone Formation": 0.012132689, "Acidification": 0.016610558, "Eutrophication, terrestrial": 0.04393545,
                    "Eutrophication, freshwater": 2.2537184e-05, "Eutrophication, marine": 0.0040353668, "Ecotoxicity, freshwater": 3.2082607000000003,
                    "Land Use": 0.67462517, "Water Use/Scarcity (AWARE)": 0.0150797, "Resource Use, minerals/metals": 1.4974205e-06,
                    "Resource Use, fossils": 7.0348478
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Atlantic Mackerel, Scomber scombrus, NEA, Pelagic Trawl, average, at landing {NL} U",
                    source_uuid: "agb-3.2-atlantic-mackerel-scomber-scombrus-nea-pelagic-trawl-average-at-landing-nl",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.07,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "great-scallop-pecten-maximus-bsbrieuc-dredge-average-at-landing-fr": { 
            name: "Great Scallop, Pecten maximus, BSBrieuc, Dredge, average, at landing",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.73932114, "Ozone Depletion": 1.5740582e-08, "Human Toxicity, non-cancer": 4.645657e-09,
                    "Human Toxicity, cancer": 5.718305e-10, "Particulate Matter": 1.6701276e-07, "Ionizing Radiation": 0.0072754161,
                    "Photochemical Ozone Formation": 0.016042943, "Acidification": 0.021754566, "Eutrophication, terrestrial": 0.057890958,
                    "Eutrophication, freshwater": 4.3564455e-05, "Eutrophication, marine": 0.0053165398, "Ecotoxicity, freshwater": 4.5119289,
                    "Land Use": 1.1123672, "Water Use/Scarcity (AWARE)": 0.021676584, "Resource Use, minerals/metals": 6.3831994e-06,
                    "Resource Use, fossils": 9.5922796
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Great Scallop, Pecten maximus, BSBrieuc, Dredge, average, at landing {FR} U",
                    source_uuid: "agb-3.2-great-scallop-pecten-maximus-bsbrieuc-dredge-average-at-landing-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.08,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "common-sole-solea-solea-bbiscay-trammel-net-average-at-landing-fr": { 
            name: "Common Sole, Solea solea, BBiscay, Trammel Net, average, at landing",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.3280804, "Ozone Depletion": 5.1292294e-08, "Human Toxicity, non-cancer": 4.4785911e-08,
                    "Human Toxicity, cancer": 1.7110978e-09, "Particulate Matter": 4.9763216e-07, "Ionizing Radiation": 0.022454366,
                    "Photochemical Ozone Formation": 0.047467505, "Acidification": 0.065266865, "Eutrophication, terrestrial": 0.17186316,
                    "Eutrophication, freshwater": 0.00016134701, "Eutrophication, marine": 0.01589231, "Ecotoxicity, freshwater": 18.232925899999998,
                    "Land Use": 2.5724461, "Water Use/Scarcity (AWARE)": 0.2071473, "Resource Use, minerals/metals": 5.4271047e-05,
                    "Resource Use, fossils": 30.394266
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Common Sole, Solea solea, BBiscay, Trammel Net, average, at landing {FR} U",
                    source_uuid: "agb-3.2-common-sole-solea-solea-bbiscay-trammel-net-average-at-landing-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.01,
                    electricity_kwh_per_kg: 0.09,
                    land_ha_per_kg: 0.0,
                    fertilizer_kg_per_kg: 0.01
                }
            }
        },
        "sheep-milk-conventional-roquefort-system-at-farm-gate-fr": { 
            name: "Sheep milk, conventional, Roquefort system, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.8402287, "Ozone Depletion": 7.0085981e-09, "Human Toxicity, non-cancer": 2.2265105e-08,
                    "Human Toxicity, cancer": 7.5809739e-10, "Particulate Matter": 3.0158778e-07, "Ionizing Radiation": 0.069465345,
                    "Photochemical Ozone Formation": 0.0021313365, "Acidification": 0.043786511, "Eutrophication, terrestrial": 0.19438057,
                    "Eutrophication, freshwater": 9.107877e-05, "Eutrophication, marine": 0.0087167029, "Ecotoxicity, freshwater": 6.8001042,
                    "Land Use": 211.84978, "Water Use/Scarcity (AWARE)": 0.10840497, "Resource Use, minerals/metals": 2.351673e-06,
                    "Resource Use, fossils": 4.3462338
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sheep milk, conventional, Roquefort system, at farm gate {FR} U",
                    source_uuid: "agb-3.2-sheep-milk-conventional-roquefort-system-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.10,
                    electricity_kwh_per_kg: 0.16,
                    land_ha_per_kg: 3.7,
                    fertilizer_kg_per_kg: 0.10
                }
            }
        },
        "goat-milk-conventional-intensive-forage-area-at-farm-gate-fr": { 
            name: "Goat milk, conventional, intensive forage area, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 1.1920952, "Ozone Depletion": 8.265832e-09, "Human Toxicity, non-cancer": 1.577357e-08,
                    "Human Toxicity, cancer": 5.7989358e-10, "Particulate Matter": 2.2232671e-07, "Ionizing Radiation": 0.082229226,
                    "Photochemical Ozone Formation": 0.0020599635, "Acidification": 0.031345283, "Eutrophication, terrestrial": 0.13713261,
                    "Eutrophication, freshwater": 0.00011318951, "Eutrophication, marine": 0.0055662933, "Ecotoxicity, freshwater": 10.5547392,
                    "Land Use": 91.01857, "Water Use/Scarcity (AWARE)": 0.45600119, "Resource Use, minerals/metals": 2.3870308e-06,
                    "Resource Use, fossils": 4.7397537
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Goat milk, conventional, intensive forage area, at farm gate {FR} U",
                    source_uuid: "agb-3.2-goat-milk-conventional-intensive-forage-area-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.09,
                    electricity_kwh_per_kg: 0.15,
                    land_ha_per_kg: 1.6,
                    fertilizer_kg_per_kg: 0.09
                }
            }
        },
        "rabbit-conventional-in-cage-at-farm-gate-fr": { 
            name: "Rabbit, conventional, in cage, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 3.4381395, "Ozone Depletion": 3.2415326e-08, "Human Toxicity, non-cancer": 3.4266362e-08,
                    "Human Toxicity, cancer": 2.0741e-09, "Particulate Matter": 1.7752672e-07, "Ionizing Radiation": 0.26092197,
                    "Photochemical Ozone Formation": 0.006321146, "Acidification": 0.022238161, "Eutrophication, terrestrial": 0.091105569,
                    "Eutrophication, freshwater": 0.00040356581, "Eutrophication, marine": 0.010258553, "Ecotoxicity, freshwater": 34.121935,
                    "Land Use": 145.25544, "Water Use/Scarcity (AWARE)": 0.35917163, "Resource Use, minerals/metals": 6.462285e-06,
                    "Resource Use, fossils": 16.619253
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Rabbit, conventional, in cage, at farm gate {FR} U",
                    source_uuid: "agb-3.2-rabbit-conventional-in-cage-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.10,
                    electricity_kwh_per_kg: 0.16,
                    land_ha_per_kg: 2.5,
                    fertilizer_kg_per_kg: 0.10
                }
            }
        },
        "duck-for-roasting-conventional-at-farm-gate-fr": { 
            name: "Duck for roasting, conventional, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 3.0044383, "Ozone Depletion": 4.4649952e-08, "Human Toxicity, non-cancer": 4.3836749e-08,
                    "Human Toxicity, cancer": 3.1289941e-09, "Particulate Matter": 4.8740367e-07, "Ionizing Radiation": 0.17855559,
                    "Photochemical Ozone Formation": 0.0095020865, "Acidification": 0.069222214, "Eutrophication, terrestrial": 0.30084871,
                    "Eutrophication, freshwater": 0.00052420113, "Eutrophication, marine": 0.018035001, "Ecotoxicity, freshwater": 133.15131,
                    "Land Use": 209.13257, "Water Use/Scarcity (AWARE)": 1.1464256, "Resource Use, minerals/metals": 9.2065179e-06,
                    "Resource Use, fossils": 16.982273
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Duck for roasting, conventional, at farm gate {FR} U",
                    source_uuid: "agb-3.2-duck-for-roasting-conventional-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.11,
                    electricity_kwh_per_kg: 0.17,
                    land_ha_per_kg: 3.7,
                    fertilizer_kg_per_kg: 0.11
                }
            }
        },
        "kid-goat-conventional-intensive-forage-area-at-farm-gate-fr": { 
            name: "Kid goat, conventional, intensive forage area, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.6894057, "Ozone Depletion": 2.0106187e-08, "Human Toxicity, non-cancer": 4.1249992e-08,
                    "Human Toxicity, cancer": 1.5602221e-09, "Particulate Matter": 4.6412281e-07, "Ionizing Radiation": 0.21283421,
                    "Photochemical Ozone Formation": 0.0052242778, "Acidification": 0.065234105, "Eutrophication, terrestrial": 0.28515772,
                    "Eutrophication, freshwater": 0.00025859361, "Eutrophication, marine": 0.011413141, "Ecotoxicity, freshwater": 22.951819699999998,
                    "Land Use": 234.5027, "Water Use/Scarcity (AWARE)": 1.1570116, "Resource Use, minerals/metals": 6.7767016e-06,
                    "Resource Use, fossils": 11.959211
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Kid goat, conventional, intensive forage area, at farm gate {FR} U",
                    source_uuid: "agb-3.2-kid-goat-conventional-intensive-forage-area-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.12,
                    electricity_kwh_per_kg: 0.18,
                    land_ha_per_kg: 4.1,
                    fertilizer_kg_per_kg: 0.12
                }
            }
        },
        "broiler-label-rouge-at-farm-gate-fr": { 
            name: "Broiler, Label Rouge, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.3350336, "Ozone Depletion": 5.8336069e-08, "Human Toxicity, non-cancer": 3.3363876e-08,
                    "Human Toxicity, cancer": 3.0076038e-09, "Particulate Matter": 5.3323517e-07, "Ionizing Radiation": 0.17892269,
                    "Photochemical Ozone Formation": 0.010598814, "Acidification": 0.078398069, "Eutrophication, terrestrial": 0.34759016,
                    "Eutrophication, freshwater": 0.00049842235, "Eutrophication, marine": 0.019614144, "Ecotoxicity, freshwater": 98.81492399999999,
                    "Land Use": 210.1377, "Water Use/Scarcity (AWARE)": 1.305581, "Resource Use, minerals/metals": 7.8070685e-06,
                    "Resource Use, fossils": 18.50234
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Broiler, Label Rouge, at farm gate {FR} U",
                    source_uuid: "agb-3.2-broiler-label-rouge-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.10,
                    electricity_kwh_per_kg: 0.16,
                    land_ha_per_kg: 3.7,
                    fertilizer_kg_per_kg: 0.10
                }
            }
        },
        "pig-label-rouge-outdoor-system-at-farm-gate-fr": { 
            name: "Pig, Label Rouge, outdoor system, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 2.3416799, "Ozone Depletion": 3.7141992e-08, "Human Toxicity, non-cancer": 3.105955e-08,
                    "Human Toxicity, cancer": 2.1399699e-09, "Particulate Matter": 4.7627609e-07, "Ionizing Radiation": 0.38289214,
                    "Photochemical Ozone Formation": 0.006248348, "Acidification": 0.067051398, "Eutrophication, terrestrial": 0.29265799,
                    "Eutrophication, freshwater": 0.00039257314, "Eutrophication, marine": 0.017624639, "Ecotoxicity, freshwater": 93.863929,
                    "Land Use": 168.86996, "Water Use/Scarcity (AWARE)": 0.9952757, "Resource Use, minerals/metals": 1.0430507e-05,
                    "Resource Use, fossils": 18.231365
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Pig, Label Rouge, outdoor system, at farm gate {FR} U",
                    source_uuid: "agb-3.2-pig-label-rouge-outdoor-system-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.11,
                    electricity_kwh_per_kg: 0.17,
                    land_ha_per_kg: 3.0,
                    fertilizer_kg_per_kg: 0.11
                }
            }
        },
        "turkey-label-rouge-at-farm-gate-fr": { 
            name: "Turkey, Label Rouge, at farm gate",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 3.9193547, "Ozone Depletion": 6.264528e-08, "Human Toxicity, non-cancer": 7.5093115e-08,
                    "Human Toxicity, cancer": 3.8245095e-09, "Particulate Matter": 8.7114366e-07, "Ionizing Radiation": 0.22973641,
                    "Photochemical Ozone Formation": 0.014452161, "Acidification": 0.1253908, "Eutrophication, terrestrial": 0.54467932,
                    "Eutrophication, freshwater": 0.00050642081, "Eutrophication, marine": 0.031069598, "Ecotoxicity, freshwater": 175.18093900000002,
                    "Land Use": 212.84391, "Water Use/Scarcity (AWARE)": 1.0825783, "Resource Use, minerals/metals": 1.1913924e-05,
                    "Resource Use, fossils": 23.34343
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Turkey, Label Rouge, at farm gate {FR} U",
                    source_uuid: "agb-3.2-turkey-label-rouge-at-farm-gate-fr",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                },
                upstream: {
                    n_demand_kg_per_kg: 0.12,
                    electricity_kwh_per_kg: 0.18,
                    land_ha_per_kg: 3.7,
                    fertilizer_kg_per_kg: 0.12
                }
            }
        }, 
        "cauliflower-fresh-eu": { 
            name: "Cauliflower, fresh (EU)",
            loss: 0.20,
            data: {
                pef: { 
                    "Climate Change": 0.89, "Ozone Depletion": 0.00000025, "Human Toxicity, non-cancer": 0.0002, 
                    "Human Toxicity, cancer": 0.0000025, "Particulate Matter": 0.00000125, "Ionizing Radiation": 0.082, 
                    "Photochemical Ozone Formation": 0.004, "Acidification": 0.02, "Eutrophication, terrestrial": 0.082, 
                    "Eutrophication, freshwater": 0.002, "Eutrophication, marine": 0.0082, "Ecotoxicity, freshwater": 4.3, 
                    "Land Use": 155, "Water Use/Scarcity (AWARE)": 1.25, "Resource Use, minerals/metals": 0.0004, 
                    "Resource Use, fossils": 4.0
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Cauliflower, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-cauliflower-050",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                },
                upstream: {
                    n_demand_kg_per_kg: 0.04,
                    electricity_kwh_per_kg: 0.10,
                    land_ha_per_kg: 0.27,
                    fertilizer_kg_per_kg: 0.04
                }
            }
        }
    },
    
    // COUNTRY FACTORS (IEA 2025 + AWARE 2.0) - FULL UPDATE
    countries: {
        "DE": { name: "Germany", electricityCO2: 270, awareFactor: 24.5 },
        "FR": { name: "France", electricityCO2: 40, awareFactor: 17.1, renewable_mix: 0.33 },
        "IT": { name: "Italy", electricityCO2: 220, awareFactor: 49.8 },
        "ES": { name: "Spain", electricityCO2: 180, awareFactor: 64.7 },
        "NL": { name: "Netherlands", electricityCO2: 200, awareFactor: 33.6 },
        "PL": { name: "Poland", electricityCO2: 380, awareFactor: 19.8 },
        "SE": { name: "Sweden", electricityCO2: 10, awareFactor: 1.3 },
        "DK": { name: "Denmark", electricityCO2: 20, awareFactor: 14.5 },
        "BE": { name: "Belgium", electricityCO2: 140, awareFactor: 42.1 },
        "UK": { name: "United Kingdom", electricityCO2: 230, awareFactor: 22.9 },
        "IE": { name: "Ireland", electricityCO2: 380, awareFactor: 1.8 },
        "AT": { name: "Austria", electricityCO2: 120, awareFactor: 2.5 },
        "FI": { name: "Finland", electricityCO2: 20, awareFactor: 0.5 },
        "PT": { name: "Portugal", electricityCO2: 180, awareFactor: 43.1 },
        "GR": { name: "Greece", electricityCO2: 280, awareFactor: 61.2 },
        "US": { name: "United States", electricityCO2: 370, awareFactor: 32.9 },
        "CA": { name: "Canada", electricityCO2: 40, awareFactor: 2.2 },
        "AU": { name: "Australia", electricityCO2: 380, awareFactor: 60.1 },
        "JP": { name: "Japan", electricityCO2: 330, awareFactor: 36.5 },
        "CN": { name: "China", electricityCO2: 550, awareFactor: 41.0 },
        "IN": { name: "India", electricityCO2: 640, awareFactor: 70.4 },
        "BR": { name: "Brazil", electricityCO2: 140, awareFactor: 3.1 }
    },

    // PROCESSING METHODS
    processing: {
        "none": { co2_impact: 0, water_impact: 0, yield: 1.00, loss: 0.000 },
        "pasteurization": { co2_impact: 0.06, water_impact: 0.15, yield: 0.995, loss: 0.005 },
        "sterilization": { co2_impact: 0.12, water_impact: 0.30, yield: 0.985, loss: 0.015 },
        "baking": { co2_impact: 0.55, water_impact: 0.12, yield: 0.88, loss: 0.120, source: "AGRI 3.2 oven avg (2MJ/kg @ EU grid)" },
        "frying": { co2_impact: 0.75, water_impact: 0.22, yield: 0.75, loss: 0.250 },
        "freezing": { co2_impact: 0.25, water_impact: 0.08, yield: 0.975, loss: 0.025 },
        "drying": { co2_impact: 1.8, water_impact: 0.18, yield: 0.97, loss: 0.030 },
        "milling": { co2_impact: 0.04, water_impact: 0.04, yield: 0.78, loss: 0.220 },
        "mixing": { co2_impact: 0.015, water_impact: 0.04, yield: 0.995, loss: 0.005 },
        "fermentation": { co2_impact: 0.35, water_impact: 1.0, yield: 0.95, loss: 0.050 },
        "extrusion": { co2_impact: 0.45, water_impact: 0.25, yield: 0.95, loss: 0.050 },
        "oat-processing": { co2_impact: 0.10, water_impact: 0.35, yield: 0.98, loss: 0.02 }
    },

    // TRANSPORTATION (GLEC v3.0)
    transportation: {
        "road": { co2: 0.071, refrigerated_factor: 0.15, load_factor: 0.85 },
        "rail": { co2: 0.023, refrigerated_factor: 0.12 },
        "sea": { co2: 0.005, refrigerated_factor: 0.06 },
        "air": { co2: 0.525, refrigerated_factor: 0.12 },
        "lastmile": { co2: 0.20, refrigerated_factor: 0.15 },
        "electric_van": { co2: 0.05, refrigerated_factor: 0.10 }
    },

    // PACKAGING (CFF COMPLIANT)
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
