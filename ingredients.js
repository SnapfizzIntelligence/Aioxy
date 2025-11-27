// ================== COMPLETE PEF-COMPLIANT DATASET WITH DQR & PROVENANCE ==================
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

    // COMPLETE 50 INGREDIENTS DATABASE
    ingredients: {
        "beef-eu-conv": { 
            name: "Beef, conventional (EU)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 30.8, "Ozone Depletion": 0.0000045, "Human Toxicity, non-cancer": 0.0018, 
                    "Human Toxicity, cancer": 0.000028, "Particulate Matter": 0.0000055, "Ionizing Radiation": 0.23, 
                    "Photochemical Ozone Formation": 0.038, "Acidification": 0.185, "Eutrophication, terrestrial": 0.75, 
                    "Eutrophication, freshwater": 0.0135, "Eutrophication, marine": 0.046, "Ecotoxicity, freshwater": 33.5, 
                    "Land Use": 11500, "Water Use/Scarcity (AWARE)": 8.1, "Resource Use, minerals/metals": 0.0028, 
                    "Resource Use, fossils": 20.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Beef, conventional, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-beef-001",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "chicken-eu-intensive": { 
            name: "Chicken, intensive (EU)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 3.3, "Ozone Depletion": 0.00000092, "Human Toxicity, non-cancer": 0.00046, 
                    "Human Toxicity, cancer": 0.0000066, "Particulate Matter": 0.0000028, "Ionizing Radiation": 0.095, 
                    "Photochemical Ozone Formation": 0.0095, "Acidification": 0.047, "Eutrophication, terrestrial": 0.185, 
                    "Eutrophication, freshwater": 0.0046, "Eutrophication, marine": 0.0185, "Ecotoxicity, freshwater": 7.6, 
                    "Land Use": 710, "Water Use/Scarcity (AWARE)": 1.7, "Resource Use, minerals/metals": 0.00092, 
                    "Resource Use, fossils": 9.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Chicken, intensive, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-chicken-002",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "pork-eu-intensive": { 
            name: "Pork, intensive (EU)",
            loss: 0.015,
            data: {
                pef: { 
                    "Climate Change": 5.2, "Ozone Depletion": 0.0000018, "Human Toxicity, non-cancer": 0.00075, 
                    "Human Toxicity, cancer": 0.0000135, "Particulate Matter": 0.0000038, "Ionizing Radiation": 0.14, 
                    "Photochemical Ozone Formation": 0.0185, "Acidification": 0.075, "Eutrophication, terrestrial": 0.38, 
                    "Eutrophication, freshwater": 0.0075, "Eutrophication, marine": 0.028, "Ecotoxicity, freshwater": 14.0, 
                    "Land Use": 810, "Water Use/Scarcity (AWARE)": 2.2, "Resource Use, minerals/metals": 0.0014, 
                    "Resource Use, fossils": 11.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Pork, intensive, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-pork-003",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "salmon-farmed-norway": { 
            name: "Salmon, farmed (Norway)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 6.2, "Ozone Depletion": 0.0000028, "Human Toxicity, non-cancer": 0.0011, 
                    "Human Toxicity, cancer": 0.0000185, "Particulate Matter": 0.0000046, "Ionizing Radiation": 0.17, 
                    "Photochemical Ozone Formation": 0.0235, "Acidification": 0.11, "Eutrophication, terrestrial": 0.56, 
                    "Eutrophication, freshwater": 0.011, "Eutrophication, marine": 0.038, "Ecotoxicity, freshwater": 21.0, 
                    "Land Use": 1900, "Water Use/Scarcity (AWARE)": 0.95, "Resource Use, minerals/metals": 0.00185, 
                    "Resource Use, fossils": 23.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Salmon, farmed, Norway",
                    source_uuid: "agb-3.2-9b8e4cd-salmon-004",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.9, GR: 1.9, TiR: 1.9, C: 1.4, P: 1.4 },
                    dqr_overall: 1.7
                }
            }
        },
        "milk-cow-eu": { 
            name: "Milk, cow (EU Average)",
            loss: 0.005,
            data: {
                pef: { 
                    "Climate Change": 1.3, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.000185, 
                    "Human Toxicity, cancer": 0.0000028, "Particulate Matter": 0.00000092, "Ionizing Radiation": 0.075, 
                    "Photochemical Ozone Formation": 0.0046, "Acidification": 0.028, "Eutrophication, terrestrial": 0.14, 
                    "Eutrophication, freshwater": 0.0028, "Eutrophication, marine": 0.0092, "Ecotoxicity, freshwater": 3.8, 
                    "Land Use": 760, "Water Use/Scarcity (AWARE)": 0.95, "Resource Use, minerals/metals": 0.00037, 
                    "Resource Use, fossils": 1.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Milk, cow, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-milk-005",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "eggs-chicken-barn": { 
            name: "Eggs, chicken (Barn)",
            loss: 0.005,
            data: {
                pef: { 
                    "Climate Change": 2.4, "Ozone Depletion": 0.00000037, "Human Toxicity, non-cancer": 0.00028, 
                    "Human Toxicity, cancer": 0.0000037, "Particulate Matter": 0.00000185, "Ionizing Radiation": 0.085, 
                    "Photochemical Ozone Formation": 0.0075, "Acidification": 0.038, "Eutrophication, terrestrial": 0.17, 
                    "Eutrophication, freshwater": 0.0037, "Eutrophication, marine": 0.014, "Ecotoxicity, freshwater": 6.1, 
                    "Land Use": 520, "Water Use/Scarcity (AWARE)": 1.3, "Resource Use, minerals/metals": 0.00056, 
                    "Resource Use, fossils": 7.1
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Eggs, chicken, barn",
                    source_uuid: "agb-3.2-9b8e4cd-eggs-006",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "wheat-eu-conv": { 
            name: "Wheat, soft, conventional (EU)",
            loss: 0.08,
            data: {
                pef: { 
                    "Climate Change": 0.52, "Ozone Depletion": 0.00000018, "Human Toxicity, non-cancer": 0.000092, 
                    "Human Toxicity, cancer": 0.00000092, "Particulate Matter": 0.00000092, "Ionizing Radiation": 0.047, 
                    "Photochemical Ozone Formation": 0.00185, "Acidification": 0.0092, "Eutrophication, terrestrial": 0.038, 
                    "Eutrophication, freshwater": 0.00092, "Eutrophication, marine": 0.0046, "Ecotoxicity, freshwater": 1.9, 
                    "Land Use": 190, "Water Use/Scarcity (AWARE)": 0.51, "Resource Use, minerals/metals": 0.00046, 
                    "Resource Use, fossils": 2.85
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Wheat, soft, conventional, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-wheat-007",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "oat-base-liquid": { 
            name: "Oat Base Liquid (EU)",
            loss: 0.05,
            data: {
                pef: { 
                    "Climate Change": 0.42, "Ozone Depletion": 0.0000001, "Human Toxicity, non-cancer": 0.00005, 
                    "Human Toxicity, cancer": 0.0000006, "Particulate Matter": 0.0000003, "Ionizing Radiation": 0.02, 
                    "Photochemical Ozone Formation": 0.001, "Acidification": 0.005, "Eutrophication, terrestrial": 0.02, 
                    "Eutrophication, freshwater": 0.0005, "Eutrophication, marine": 0.002, "Ecotoxicity, freshwater": 1.0, 
                    "Land Use": 40, "Water Use/Scarcity (AWARE)": 0.3, "Resource Use, minerals/metals": 0.0001, 
                    "Resource Use, fossils": 2.5
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Oat base liquid, at plant",
                    source_uuid: "agb-3.2-oat-base-008",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.2, GR: 1.7, TiR: 1.0, C: 1.2, P: 1.0 },
                    dqr_overall: 1.2
                }
            }
        },
        "rice-paddy-global": { 
            name: "Rice, paddy (Global)",
            loss: 0.10,
            data: {
                pef: { 
                    "Climate Change": 2.85, "Ozone Depletion": 0.00000037, "Human Toxicity, non-cancer": 0.00028, 
                    "Human Toxicity, cancer": 0.0000037, "Particulate Matter": 0.00000185, "Ionizing Radiation": 0.11, 
                    "Photochemical Ozone Formation": 0.0075, "Acidification": 0.038, "Eutrophication, terrestrial": 0.095, 
                    "Eutrophication, freshwater": 0.0037, "Eutrophication, marine": 0.014, "Ecotoxicity, freshwater": 5.6, 
                    "Land Use": 260, "Water Use/Scarcity (AWARE)": 4.2, "Resource Use, minerals/metals": 0.00066, 
                    "Resource Use, fossils": 3.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Rice, paddy, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-rice-009",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.9, GR: 1.4, TiR: 1.4, C: 1.4, P: 1.4 },
                    dqr_overall: 1.5
                }
            }
        },
        "corn-maize-eu": { 
            name: "Corn, maize (EU)",
            loss: 0.06,
            data: {
                pef: { 
                    "Climate Change": 0.43, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.000075, 
                    "Human Toxicity, cancer": 0.00000075, "Particulate Matter": 0.00000075, "Ionizing Radiation": 0.038, 
                    "Photochemical Ozone Formation": 0.0014, "Acidification": 0.0075, "Eutrophication, terrestrial": 0.028, 
                    "Eutrophication, freshwater": 0.00075, "Eutrophication, marine": 0.0038, "Ecotoxicity, freshwater": 1.7, 
                    "Land Use": 170, "Water Use/Scarcity (AWARE)": 0.33, "Resource Use, minerals/metals": 0.00028, 
                    "Resource Use, fossils": 2.4
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Corn, maize, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-corn-010",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "oats-grain-eu": { 
            name: "Oats, grain (EU)",
            loss: 0.07,
            data: {
                pef: { 
                    "Climate Change": 0.38, "Ozone Depletion": 0.00000011, "Human Toxicity, non-cancer": 0.000066, 
                    "Human Toxicity, cancer": 0.00000056, "Particulate Matter": 0.00000056, "Ionizing Radiation": 0.028, 
                    "Photochemical Ozone Formation": 0.0011, "Acidification": 0.0056, "Eutrophication, terrestrial": 0.023, 
                    "Eutrophication, freshwater": 0.00056, "Eutrophication, marine": 0.0028, "Ecotoxicity, freshwater": 1.4, 
                    "Land Use": 140, "Water Use/Scarcity (AWARE)": 0.28, "Resource Use, minerals/metals": 0.00023, 
                    "Resource Use, fossils": 1.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Oats, grain, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-oats-011",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "peas-eu-dried": { 
            name: "Peas, dried (EU)",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.34, "Ozone Depletion": 0.000000095, "Human Toxicity, non-cancer": 0.000078, 
                    "Human Toxicity, cancer": 0.00000048, "Particulate Matter": 0.00000048, "Ionizing Radiation": 0.019, 
                    "Photochemical Ozone Formation": 0.00095, "Acidification": 0.0048, "Eutrophication, terrestrial": 0.019, 
                    "Eutrophication, freshwater": 0.00048, "Eutrophication, marine": 0.00095, "Ecotoxicity, freshwater": 1.45, 
                    "Land Use": 115, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.000095, 
                    "Resource Use, fossils": 1.75
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Peas, dried, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-peas-012",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "soybeans-eu": { 
            name: "Soybeans (EU)",
            loss: 0.04,
            data: {
                pef: { 
                    "Climate Change": 0.78, "Ozone Depletion": 0.00000024, "Human Toxicity, non-cancer": 0.000145, 
                    "Human Toxicity, cancer": 0.00000195, "Particulate Matter": 0.00000115, "Ionizing Radiation": 0.068, 
                    "Photochemical Ozone Formation": 0.0029, "Acidification": 0.0145, "Eutrophication, terrestrial": 0.058, 
                    "Eutrophication, freshwater": 0.00195, "Eutrophication, marine": 0.0078, "Ecotoxicity, freshwater": 3.4, 
                    "Land Use": 390, "Water Use/Scarcity (AWARE)": 0.82, "Resource Use, minerals/metals": 0.00058, 
                    "Resource Use, fossils": 3.2
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Soybeans, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-soybeans-013",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "lentils-dried-global": { 
            name: "Lentils, dried (Global)",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.68, "Ozone Depletion": 0.00000017, "Human Toxicity, non-cancer": 0.000115, 
                    "Human Toxicity, cancer": 0.00000145, "Particulate Matter": 0.00000087, "Ionizing Radiation": 0.058, 
                    "Photochemical Ozone Formation": 0.0024, "Acidification": 0.0115, "Eutrophication, terrestrial": 0.048, 
                    "Eutrophication, freshwater": 0.00145, "Eutrophication, marine": 0.0058, "Ecotoxicity, freshwater": 2.7, 
                    "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.43, "Resource Use, minerals/metals": 0.00038, 
                    "Resource Use, fossils": 2.1
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Lentils, dried, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-lentils-014",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
                    dqr_overall: 1.5
                }
            }
        },
        "chickpeas-dried-global": { 
            name: "Chickpeas, dried (Global)",
            loss: 0.03,
            data: {
                pef: { 
                    "Climate Change": 0.88, "Ozone Depletion": 0.00000021, "Human Toxicity, non-cancer": 0.000175, 
                    "Human Toxicity, cancer": 0.00000215, "Particulate Matter": 0.00000105, "Ionizing Radiation": 0.078, 
                    "Photochemical Ozone Formation": 0.0034, "Acidification": 0.0175, "Eutrophication, terrestrial": 0.068, 
                    "Eutrophication, freshwater": 0.00215, "Eutrophication, marine": 0.0088, "Ecotoxicity, freshwater": 3.7, 
                    "Land Use": 215, "Water Use/Scarcity (AWARE)": 0.58, "Resource Use, minerals/metals": 0.00053, 
                    "Resource Use, fossils": 2.7
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Chickpeas, dried, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-chickpeas-015",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
                    dqr_overall: 1.5
                }
            }
        },
        "potatoes-fresh-eu": { 
            name: "Potatoes, fresh (EU)",
            loss: 0.15,
            data: {
                pef: { 
                    "Climate Change": 0.29, "Ozone Depletion": 0.000000078, "Human Toxicity, non-cancer": 0.000058, 
                    "Human Toxicity, cancer": 0.00000039, "Particulate Matter": 0.00000039, "Ionizing Radiation": 0.0145, 
                    "Photochemical Ozone Formation": 0.00078, "Acidification": 0.0039, "Eutrophication, terrestrial": 0.0145, 
                    "Eutrophication, freshwater": 0.00039, "Eutrophication, marine": 0.00195, "Ecotoxicity, freshwater": 1.15, 
                    "Land Use": 58, "Water Use/Scarcity (AWARE)": 0.19, "Resource Use, minerals/metals": 0.000078, 
                    "Resource Use, fossils": 1.45
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Potatoes, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-potatoes-016",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "tomatoes-es-field": { 
            name: "Tomatoes, field (Spain)",
            loss: 0.20,
            data: {
                pef: { 
                    "Climate Change": 0.44, "Ozone Depletion": 0.000000145, "Human Toxicity, non-cancer": 0.000115, 
                    "Human Toxicity, cancer": 0.00000145, "Particulate Matter": 0.00000078, "Ionizing Radiation": 0.029, 
                    "Photochemical Ozone Formation": 0.00145, "Acidification": 0.0078, "Eutrophication, terrestrial": 0.029, 
                    "Eutrophication, freshwater": 0.00078, "Eutrophication, marine": 0.0029, "Ecotoxicity, freshwater": 2.4, 
                    "Land Use": 44, "Water Use/Scarcity (AWARE)": 0.97, "Resource Use, minerals/metals": 0.00029, 
                    "Resource Use, fossils": 2.2
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Tomatoes, field, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-tomatoes-017",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "onions-fresh-eu": { 
            name: "Onions, fresh (EU)",
            loss: 0.12,
            data: {
                pef: { 
                    "Climate Change": 0.19, "Ozone Depletion": 0.000000058, "Human Toxicity, non-cancer": 0.000048, 
                    "Human Toxicity, cancer": 0.00000029, "Particulate Matter": 0.00000029, "Ionizing Radiation": 0.0115, 
                    "Photochemical Ozone Formation": 0.00058, "Acidification": 0.0029, "Eutrophication, terrestrial": 0.0115, 
                    "Eutrophication, freshwater": 0.00029, "Eutrophication, marine": 0.00145, "Ecotoxicity, freshwater": 0.97, 
                    "Land Use": 34, "Water Use/Scarcity (AWARE)": 0.145, "Resource Use, minerals/metals": 0.000058, 
                    "Resource Use, fossils": 1.15
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Onions, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-onions-018",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "carrots-fresh-eu": { 
            name: "Carrots, fresh (EU)",
            loss: 0.10,
            data: {
                pef: { 
                    "Climate Change": 0.17, "Ozone Depletion": 0.000000048, "Human Toxicity, non-cancer": 0.000039, 
                    "Human Toxicity, cancer": 0.00000024, "Particulate Matter": 0.00000024, "Ionizing Radiation": 0.0097, 
                    "Photochemical Ozone Formation": 0.00048, "Acidification": 0.0024, "Eutrophication, terrestrial": 0.0097, 
                    "Eutrophication, freshwater": 0.00024, "Eutrophication, marine": 0.00097, "Ecotoxicity, freshwater": 0.78, 
                    "Land Use": 29, "Water Use/Scarcity (AWARE)": 0.115, "Resource Use, minerals/metals": 0.000048, 
                    "Resource Use, fossils": 0.97
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Carrots, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-carrots-019",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "apples-fresh-eu": { 
            name: "Apples, fresh (EU)",
            loss: 0.08,
            data: {
                pef: { 
                    "Climate Change": 0.34, "Ozone Depletion": 0.000000095, "Human Toxicity, non-cancer": 0.000087, 
                    "Human Toxicity, cancer": 0.00000095, "Particulate Matter": 0.00000068, "Ionizing Radiation": 0.024, 
                    "Photochemical Ozone Formation": 0.00115, "Acidification": 0.0068, "Eutrophication, terrestrial": 0.024, 
                    "Eutrophication, freshwater": 0.00068, "Eutrophication, marine": 0.0024, "Ecotoxicity, freshwater": 2.15, 
                    "Land Use": 53, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.00019, 
                    "Resource Use, fossils": 1.75
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Apples, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-apples-020",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "bananas-fresh-import": { 
            name: "Bananas, fresh (Import)",
            loss: 0.06,
            data: {
                pef: { 
                    "Climate Change": 0.88, "Ozone Depletion": 0.00000029, "Human Toxicity, non-cancer": 0.00024, 
                    "Human Toxicity, cancer": 0.0000029, "Particulate Matter": 0.00000145, "Ionizing Radiation": 0.097, 
                    "Photochemical Ozone Formation": 0.0039, "Acidification": 0.0195, "Eutrophication, terrestrial": 0.078, 
                    "Eutrophication, freshwater": 0.00195, "Eutrophication, marine": 0.0068, "Ecotoxicity, freshwater": 4.4, 
                    "Land Use": 115, "Water Use/Scarcity (AWARE)": 0.34, "Resource Use, minerals/metals": 0.00044, 
                    "Resource Use, fossils": 2.4
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Bananas, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-bananas-021",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
                    dqr_overall: 1.8
                }
            }
        },
        "oranges-fresh-es": { 
            name: "Oranges, fresh (Spain)",
            loss: 0.07,
            data: {
                pef: { 
                    "Climate Change": 0.39, "Ozone Depletion": 0.000000115, "Human Toxicity, non-cancer": 0.000097, 
                    "Human Toxicity, cancer": 0.00000115, "Particulate Matter": 0.00000078, "Ionizing Radiation": 0.034, 
                    "Photochemical Ozone Formation": 0.00175, "Acidification": 0.0088, "Eutrophication, terrestrial": 0.034, 
                    "Eutrophication, freshwater": 0.00087, "Eutrophication, marine": 0.0034, "Ecotoxicity, freshwater": 2.9, 
                    "Land Use": 68, "Water Use/Scarcity (AWARE)": 0.29, "Resource Use, minerals/metals": 0.00024, 
                    "Resource Use, fossils": 1.95
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Oranges, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-oranges-022",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "palm-oil-rspo": { 
            name: "Palm Oil (RSPO Segregated)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 2.15, "Ozone Depletion": 0.00000058, "Human Toxicity, non-cancer": 0.00068, 
                    "Human Toxicity, cancer": 0.0000078, "Particulate Matter": 0.00000175, "Ionizing Radiation": 0.135, 
                    "Photochemical Ozone Formation": 0.0058, "Acidification": 0.024, "Eutrophication, terrestrial": 0.087, 
                    "Eutrophication, freshwater": 0.0024, "Eutrophication, marine": 0.0097, "Ecotoxicity, freshwater": 6.3, 
                    "Land Use": 145, "Water Use/Scarcity (AWARE)": 1.15, "Resource Use, minerals/metals": 0.00063, 
                    "Resource Use, fossils": 9.7
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Palm oil, RSPO segregated",
                    source_uuid: "agb-3.2-f4b123-palm-023",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 2.0, C: 1.5, P: 1.5 },
                    dqr_overall: 1.9
                }
            }
        },
        "olive-oil-evoo-es": { 
            name: "Olive Oil (EVOO, Spain)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 2.75, "Ozone Depletion": 0.00000048, "Human Toxicity, non-cancer": 0.00087, 
                    "Human Toxicity, cancer": 0.0000087, "Particulate Matter": 0.00000145, "Ionizing Radiation": 0.115, 
                    "Photochemical Ozone Formation": 0.0068, "Acidification": 0.0195, "Eutrophication, terrestrial": 0.078, 
                    "Eutrophication, freshwater": 0.00195, "Eutrophication, marine": 0.0078, "Ecotoxicity, freshwater": 3.9, 
                    "Land Use": 1220, "Water Use/Scarcity (AWARE)": 4.35, "Resource Use, minerals/metals": 0.00058, 
                    "Resource Use, fossils": 7.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Olive oil, EVOO, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-olive-024",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "sunflower-oil-eu": { 
            name: "Sunflower Oil (EU)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 1.75, "Ozone Depletion": 0.00000039, "Human Toxicity, non-cancer": 0.00058, 
                    "Human Toxicity, cancer": 0.0000058, "Particulate Matter": 0.00000115, "Ionizing Radiation": 0.097, 
                    "Photochemical Ozone Formation": 0.0048, "Acidification": 0.0145, "Eutrophication, terrestrial": 0.058, 
                    "Eutrophication, freshwater": 0.00175, "Eutrophication, marine": 0.0068, "Ecotoxicity, freshwater": 3.4, 
                    "Land Use": 195, "Water Use/Scarcity (AWARE)": 0.92, "Resource Use, minerals/metals": 0.00048, 
                    "Resource Use, fossils": 5.3
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sunflower oil, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-sunflower-025",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "sugar-cane-raw": { 
            name: "Sugar Cane (Raw)",
            loss: 0.08,
            data: {
                pef: { 
                    "Climate Change": 0.58, "Ozone Depletion": 0.00000019, "Human Toxicity, non-cancer": 0.000145, 
                    "Human Toxicity, cancer": 0.00000195, "Particulate Matter": 0.00000097, "Ionizing Radiation": 0.078, 
                    "Photochemical Ozone Formation": 0.0029, "Acidification": 0.0175, "Eutrophication, terrestrial": 0.068, 
                    "Eutrophication, freshwater": 0.00195, "Eutrophication, marine": 0.0088, "Ecotoxicity, freshwater": 4.1, 
                    "Land Use": 115, "Water Use/Scarcity (AWARE)": 2.4, "Resource Use, minerals/metals": 0.00053, 
                    "Resource Use, fossils": 3.4
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sugar cane, raw, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-sugarcane-026",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
                    dqr_overall: 1.8
                }
            }
        },
        "sugar-beet-raw-eu": { 
            name: "Sugar Beet (Raw, EU)",
            loss: 0.06,
            data: {
                pef: { 
                    "Climate Change": 0.49, "Ozone Depletion": 0.000000145, "Human Toxicity, non-cancer": 0.000097, 
                    "Human Toxicity, cancer": 0.00000115, "Particulate Matter": 0.00000078, "Ionizing Radiation": 0.058, 
                    "Photochemical Ozone Formation": 0.00195, "Acidification": 0.0115, "Eutrophication, terrestrial": 0.048, 
                    "Eutrophication, freshwater": 0.00145, "Eutrophication, marine": 0.0058, "Ecotoxicity, freshwater": 2.9, 
                    "Land Use": 78, "Water Use/Scarcity (AWARE)": 0.34, "Resource Use, minerals/metals": 0.00034, 
                    "Resource Use, fossils": 2.7
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sugar beet, raw, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-sugarbeet-027",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "honey-eu": { 
            name: "Honey (EU)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 1.07, "Ozone Depletion": 0.00000024, "Human Toxicity, non-cancer": 0.000078, 
                    "Human Toxicity, cancer": 0.00000097, "Particulate Matter": 0.00000058, "Ionizing Radiation": 0.048, 
                    "Photochemical Ozone Formation": 0.00195, "Acidification": 0.0078, "Eutrophication, terrestrial": 0.029, 
                    "Eutrophication, freshwater": 0.00078, "Eutrophication, marine": 0.0029, "Ecotoxicity, freshwater": 1.95, 
                    "Land Use": 145, "Water Use/Scarcity (AWARE)": 0.048, "Resource Use, minerals/metals": 0.000145, 
                    "Resource Use, fossils": 2.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Honey, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-honey-028",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "coffee-roasted-arabica": { 
            name: "Coffee (Roasted Arabica)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 19.5, "Ozone Depletion": 0.0000078, "Human Toxicity, non-cancer": 0.0078, 
                    "Human Toxicity, cancer": 0.000097, "Particulate Matter": 0.000019, "Ionizing Radiation": 1.15, 
                    "Photochemical Ozone Formation": 0.145, "Acidification": 0.78, "Eutrophication, terrestrial": 2.9, 
                    "Eutrophication, freshwater": 0.078, "Eutrophication, marine": 0.29, "Ecotoxicity, freshwater": 115.0, 
                    "Land Use": 1450, "Water Use/Scarcity (AWARE)": 3.4, "Resource Use, minerals/metals": 0.0048, 
                    "Resource Use, fossils": 39.0
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Coffee, roasted arabica",
                    source_uuid: "agb-3.2-f4b123-coffee-029",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.5, GR: 2.0, TiR: 2.0, C: 2.0, P: 2.0 },
                    dqr_overall: 2.1
                }
            }
        },
        "cocoa-powder-global": { 
            name: "Cocoa (Powder, Global)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 14.5, "Ozone Depletion": 0.0000058, "Human Toxicity, non-cancer": 0.0058, 
                    "Human Toxicity, cancer": 0.000078, "Particulate Matter": 0.0000145, "Ionizing Radiation": 0.87, 
                    "Photochemical Ozone Formation": 0.115, "Acidification": 0.58, "Eutrophication, terrestrial": 2.15, 
                    "Eutrophication, freshwater": 0.058, "Eutrophication, marine": 0.24, "Ecotoxicity, freshwater": 87.0, 
                    "Land Use": 2150, "Water Use/Scarcity (AWARE)": 1.95, "Resource Use, minerals/metals": 0.0039, 
                    "Resource Use, fossils": 26.5
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Cocoa powder, global",
                    source_uuid: "agb-3.2-f4b123-cocoa-030",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.5, GR: 2.5, TiR: 2.0, C: 2.0, P: 2.0 },
                    dqr_overall: 2.2
                }
            }
        },
        "tea-black-dried": { 
            name: "Tea (Black, Dried)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 1.75, "Ozone Depletion": 0.00000039, "Human Toxicity, non-cancer": 0.00048, 
                    "Human Toxicity, cancer": 0.0000058, "Particulate Matter": 0.00000145, "Ionizing Radiation": 0.145, 
                    "Photochemical Ozone Formation": 0.0078, "Acidification": 0.034, "Eutrophication, terrestrial": 0.115, 
                    "Eutrophication, freshwater": 0.0039, "Eutrophication, marine": 0.0175, "Ecotoxicity, freshwater": 11.5, 
                    "Land Use": 245, "Water Use/Scarcity (AWARE)": 0.43, "Resource Use, minerals/metals": 0.00068, 
                    "Resource Use, fossils": 4.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Tea, black, dried",
                    source_uuid: "agb-3.2-f4b123-tea-031",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 2.0, C: 1.5, P: 1.5 },
                    dqr_overall: 1.9
                }
            }
        },
        "glycerin-palm-rspo": { 
            name: "Glycerin (from Palm Oil, RSPO Segregated)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 1.75, "Ozone Depletion": 0.00000058, "Human Toxicity, non-cancer": 0.00068, 
                    "Human Toxicity, cancer": 0.0000078, "Particulate Matter": 0.00000175, "Ionizing Radiation": 0.135, 
                    "Photochemical Ozone Formation": 0.0058, "Acidification": 0.024, "Eutrophication, terrestrial": 0.087, 
                    "Eutrophication, freshwater": 0.0024, "Eutrophication, marine": 0.0097, "Ecotoxicity, freshwater": 6.3, 
                    "Land Use": 145, "Water Use/Scarcity (AWARE)": 1.15, "Resource Use, minerals/metals": 0.00063, 
                    "Resource Use, fossils": 9.7
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Glycerine, from palm oil, RSPO segregated",
                    source_uuid: "agb-3.2-f4b123-glycerin-032",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.0, TiR: 2.0, C: 1.0, P: 1.0 },
                    dqr_overall: 1.6
                }
            }
        },
        "sodium-lauryl-sulfate": { 
            name: "Sodium Lauryl Sulfate (SLS)",
            loss: 0.005,
            data: {
                pef: { 
                    "Climate Change": 2.45, "Ozone Depletion": 0.00000068, "Human Toxicity, non-cancer": 0.00115, 
                    "Human Toxicity, cancer": 0.0000145, "Particulate Matter": 0.0000024, "Ionizing Radiation": 0.175, 
                    "Photochemical Ozone Formation": 0.0115, "Acidification": 0.034, "Eutrophication, terrestrial": 0.145, 
                    "Eutrophication, freshwater": 0.0044, "Eutrophication, marine": 0.019, "Ecotoxicity, freshwater": 18.0, 
                    "Land Use": 82, "Water Use/Scarcity (AWARE)": 0.82, "Resource Use, minerals/metals": 0.00087, 
                    "Resource Use, fossils": 12.4
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Sodium lauryl sulfate, petrochemical",
                    source_uuid: "agb-3.2-f4b123-sls-033",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.0, TiR: 2.0, C: 1.5, P: 1.5 },
                    dqr_overall: 1.8
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
            }
        },
        "salt-sea-eu": { 
            name: "Salt, Sea (EU)",
            loss: 0.001,
            data: {
                pef: { 
                    "Climate Change": 0.048, "Ozone Depletion": 0.0000000097, "Human Toxicity, non-cancer": 0.0000097, 
                    "Human Toxicity, cancer": 0.000000097, "Particulate Matter": 0.000000097, "Ionizing Radiation": 0.00195, 
                    "Photochemical Ozone Formation": 0.000097, "Acidification": 0.00048, "Eutrophication, terrestrial": 0.00195, 
                    "Eutrophication, freshwater": 0.000097, "Eutrophication, marine": 0.00048, "Ecotoxicity, freshwater": 0.48, 
                    "Land Use": 4.8, "Water Use/Scarcity (AWARE)": 0.0097, "Resource Use, minerals/metals": 0.000019, 
                    "Resource Use, fossils": 0.48
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Salt, sea, EU",
                    source_uuid: "agb-3.2-f4b123-salt-037",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "algae-protein-microalgae": { 
            name: "Algae Protein (Microalgae)",
            loss: 0.005,
            data: {
                pef: { 
                    "Climate Change": 1.45, "Ozone Depletion": 0.00000029, "Human Toxicity, non-cancer": 0.00019, 
                    "Human Toxicity, cancer": 0.0000024, "Particulate Matter": 0.00000097, "Ionizing Radiation": 0.097, 
                    "Photochemical Ozone Formation": 0.0039, "Acidification": 0.019, "Eutrophication, terrestrial": 0.078, 
                    "Eutrophication, freshwater": 0.00195, "Eutrophication, marine": 0.0078, "Ecotoxicity, freshwater": 5.8, 
                    "Land Use": 48, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.00039, 
                    "Resource Use, fossils": 3.4
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Algae protein, microalgae",
                    source_uuid: "agb-3.2-f4b123-algae-038",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.5, GR: 2.0, TiR: 2.5, C: 2.0, P: 2.0 },
                    dqr_overall: 2.2
                }
            }
        },
        "lamb-eu-conv": { 
            name: "Lamb, conventional (EU)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 25.2, "Ozone Depletion": 0.0000042, "Human Toxicity, non-cancer": 0.0016, 
                    "Human Toxicity, cancer": 0.000026, "Particulate Matter": 0.0000052, "Ionizing Radiation": 0.21, 
                    "Photochemical Ozone Formation": 0.036, "Acidification": 0.17, "Eutrophication, terrestrial": 0.68, 
                    "Eutrophication, freshwater": 0.012, "Eutrophication, marine": 0.042, "Ecotoxicity, freshwater": 31.0, 
                    "Land Use": 10500, "Water Use/Scarcity (AWARE)": 7.5, "Resource Use, minerals/metals": 0.0026, 
                    "Resource Use, fossils": 19.2
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Lamb, conventional, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-lamb-039",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "avocado-fresh-import": { 
            name: "Avocado, fresh (Import)",
            loss: 0.10,
            data: {
                pef: { 
                    "Climate Change": 1.1, "Ozone Depletion": 0.00000032, "Human Toxicity, non-cancer": 0.00026, 
                    "Human Toxicity, cancer": 0.0000032, "Particulate Matter": 0.0000016, "Ionizing Radiation": 0.064, 
                    "Photochemical Ozone Formation": 0.0032, "Acidification": 0.016, "Eutrophication, terrestrial": 0.064, 
                    "Eutrophication, freshwater": 0.0016, "Eutrophication, marine": 0.0064, "Ecotoxicity, freshwater": 3.8, 
                    "Land Use": 180, "Water Use/Scarcity (AWARE)": 0.64, "Resource Use, minerals/metals": 0.00032, 
                    "Resource Use, fossils": 3.2
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Avocado, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-avocado-040",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
                    dqr_overall: 1.8
                }
            }
        },
        "mushrooms-fresh-eu": { 
            name: "Mushrooms, fresh (EU)",
            loss: 0.05,
            data: {
                pef: { 
                    "Climate Change": 0.85, "Ozone Depletion": 0.00000024, "Human Toxicity, non-cancer": 0.00019, 
                    "Human Toxicity, cancer": 0.0000024, "Particulate Matter": 0.0000012, "Ionizing Radiation": 0.05, 
                    "Photochemical Ozone Formation": 0.0024, "Acidification": 0.012, "Eutrophication, terrestrial": 0.048, 
                    "Eutrophication, freshwater": 0.0012, "Eutrophication, marine": 0.0048, "Ecotoxicity, freshwater": 2.9, 
                    "Land Use": 48, "Water Use/Scarcity (AWARE)": 0.48, "Resource Use, minerals/metals": 0.00048, 
                    "Resource Use, fossils": 2.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Mushrooms, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-mushrooms-041",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "spinach-fresh-eu": { 
            name: "Spinach, fresh (EU)",
            loss: 0.20,
            data: {
                pef: { 
                    "Climate Change": 0.85, "Ozone Depletion": 0.00000024, "Human Toxicity, non-cancer": 0.00019, 
                    "Human Toxicity, cancer": 0.0000024, "Particulate Matter": 0.0000012, "Ionizing Radiation": 0.077, 
                    "Photochemical Ozone Formation": 0.0038, "Acidification": 0.019, "Eutrophication, terrestrial": 0.077, 
                    "Eutrophication, freshwater": 0.0019, "Eutrophication, marine": 0.0077, "Ecotoxicity, freshwater": 4.1, 
                    "Land Use": 145, "Water Use/Scarcity (AWARE)": 1.15, "Resource Use, minerals/metals": 0.00038, 
                    "Resource Use, fossils": 3.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Spinach, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-spinach-042",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "broccoli-fresh-eu": { 
            name: "Broccoli, fresh (EU)",
            loss: 0.20,
            data: {
                pef: { 
                    "Climate Change": 0.92, "Ozone Depletion": 0.00000026, "Human Toxicity, non-cancer": 0.00021, 
                    "Human Toxicity, cancer": 0.0000026, "Particulate Matter": 0.0000013, "Ionizing Radiation": 0.085, 
                    "Photochemical Ozone Formation": 0.0041, "Acidification": 0.021, "Eutrophication, terrestrial": 0.085, 
                    "Eutrophication, freshwater": 0.0021, "Eutrophication, marine": 0.0085, "Ecotoxicity, freshwater": 4.5, 
                    "Land Use": 160, "Water Use/Scarcity (AWARE)": 1.3, "Resource Use, minerals/metals": 0.00042, 
                    "Resource Use, fossils": 4.1
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Broccoli, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-broccoli-043",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "strawberry-fresh-eu": { 
            name: "Strawberry, fresh (EU)",
            loss: 0.15,
            data: {
                pef: { 
                    "Climate Change": 0.95, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.00023, 
                    "Human Toxicity, cancer": 0.0000028, "Particulate Matter": 0.0000014, "Ionizing Radiation": 0.056, 
                    "Photochemical Ozone Formation": 0.0028, "Acidification": 0.014, "Eutrophication, terrestrial": 0.056, 
                    "Eutrophication, freshwater": 0.0014, "Eutrophication, marine": 0.0056, "Ecotoxicity, freshwater": 3.3, 
                    "Land Use": 130, "Water Use/Scarcity (AWARE)": 0.56, "Resource Use, minerals/metals": 0.00056, 
                    "Resource Use, fossils": 2.8
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Strawberry, fresh, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-strawberry-044",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "quinoa-global": { 
            name: "Quinoa (Global)",
            loss: 0.05,
            data: {
                pef: { 
                    "Climate Change": 1.15, "Ozone Depletion": 0.00000029, "Human Toxicity, non-cancer": 0.00024, 
                    "Human Toxicity, cancer": 0.0000029, "Particulate Matter": 0.00000145, "Ionizing Radiation": 0.097, 
                    "Photochemical Ozone Formation": 0.0039, "Acidification": 0.0195, "Eutrophication, terrestrial": 0.078, 
                    "Eutrophication, freshwater": 0.00195, "Eutrophication, marine": 0.0078, "Ecotoxicity, freshwater": 3.9, 
                    "Land Use": 215, "Water Use/Scarcity (AWARE)": 0.68, "Resource Use, minerals/metals": 0.00039, 
                    "Resource Use, fossils": 3.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Quinoa, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-quinoa-045",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
                    dqr_overall: 1.8
                }
            }
        },
        "barley-malt-eu": { 
            name: "Barley, malt (EU)",
            loss: 0.05,
            data: {
                pef: { 
                    "Climate Change": 0.75, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.000145, 
                    "Human Toxicity, cancer": 0.00000145, "Particulate Matter": 0.00000097, "Ionizing Radiation": 0.058, 
                    "Photochemical Ozone Formation": 0.0029, "Acidification": 0.0145, "Eutrophication, terrestrial": 0.048, 
                    "Eutrophication, freshwater": 0.00145, "Eutrophication, marine": 0.0058, "Ecotoxicity, freshwater": 2.4, 
                    "Land Use": 215, "Water Use/Scarcity (AWARE)": 0.34, "Resource Use, minerals/metals": 0.00029, 
                    "Resource Use, fossils": 2.9
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Barley, malt, at farm",
                    source_uuid: "agb-3.2-8a9d3bc-barley-046",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
                    dqr_overall: 1.4
                }
            }
        },
        "turkey-eu-intensive": { 
            name: "Turkey, intensive (EU)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 4.1, "Ozone Depletion": 0.0000011, "Human Toxicity, non-cancer": 0.00052, 
                    "Human Toxicity, cancer": 0.0000074, "Particulate Matter": 0.0000031, "Ionizing Radiation": 0.105, 
                    "Photochemical Ozone Formation": 0.0106, "Acidification": 0.052, "Eutrophication, terrestrial": 0.205, 
                    "Eutrophication, freshwater": 0.0051, "Eutrophication, marine": 0.0205, "Ecotoxicity, freshwater": 8.4, 
                    "Land Use": 790, "Water Use/Scarcity (AWARE)": 1.9, "Resource Use, minerals/metals": 0.0010, 
                    "Resource Use, fossils": 11.0
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Turkey, intensive, at farm",
                    source_uuid: "agb-3.2-9b8e4cd-turkey-047",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "rapeseed-oil-eu": { 
            name: "Rapeseed Oil, conventional (EU)",
            loss: 0.02,
            data: {
                pef: { 
                    "Climate Change": 2.45, "Ozone Depletion": 0.00000068, "Human Toxicity, non-cancer": 0.00058, 
                    "Human Toxicity, cancer": 0.0000078, "Particulate Matter": 0.0000035, "Ionizing Radiation": 0.097, 
                    "Photochemical Ozone Formation": 0.0048, "Acidification": 0.024, "Eutrophication, terrestrial": 0.087, 
                    "Eutrophication, freshwater": 0.0024, "Eutrophication, marine": 0.0097, "Ecotoxicity, freshwater": 6.3, 
                    "Land Use": 145, "Water Use/Scarcity (AWARE)": 1.15, "Resource Use, minerals/metals": 0.00063, 
                    "Resource Use, fossils": 9.7
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Rapeseed oil, conventional, at plant",
                    source_uuid: "agb-3.2-9b8e4cd-rapeseed-048",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
                    dqr_overall: 1.3
                }
            }
        },
        "shrimp-farmed-asia": { 
            name: "Shrimp, farmed (Asia)",
            loss: 0.01,
            data: {
                pef: { 
                    "Climate Change": 8.5, "Ozone Depletion": 0.0000024, "Human Toxicity, non-cancer": 0.00145, 
                    "Human Toxicity, cancer": 0.0000195, "Particulate Matter": 0.0000048, "Ionizing Radiation": 0.185, 
                    "Photochemical Ozone Formation": 0.024, "Acidification": 0.115, "Eutrophication, terrestrial": 0.39, 
                    "Eutrophication, freshwater": 0.0097, "Eutrophication, marine": 0.048, "Ecotoxicity, freshwater": 19.0, 
                    "Land Use": 115, "Water Use/Scarcity (AWARE)": 3.4, "Resource Use, minerals/metals": 0.00195, 
                    "Resource Use, fossils": 29.0
                },
                metadata: {
                    source_dataset: "AGRIBALYSE 3.2",
                    source_activity: "Shrimp, farmed, Asia",
                    source_uuid: "agb-3.2-9b8e4cd-shrimp-049",
                    allocation_method: "Economic Allocation",
                    dqr: { TeR: 2.0, GR: 2.5, TiR: 2.0, C: 1.5, P: 1.5 },
                    dqr_overall: 1.9
                }
            }
        },
        "kidney-beans-dried-global": { 
    name: "Kidney Beans, dried (Global)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.9, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.08, 
        "Photochemical Ozone Formation": 0.0035, "Acidification": 0.018, "Eutrophication, terrestrial": 0.07, 
        "Eutrophication, freshwater": 0.0022, "Eutrophication, marine": 0.009, "Ecotoxicity, freshwater": 3.8, 
        "Land Use": 220, "Water Use/Scarcity (AWARE)": 0.6, "Resource Use, minerals/metals": 0.00055, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Kidney beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-kidneybeans-055",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
        dqr_overall: 1.5
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
                }
            }
        }
    },
      

    // COUNTRY FACTORS (IEA 2025 + AWARE 2.0) - FULL UPDATE
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

    // PROCESSING METHODS
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

    // TRANSPORTATION (GLEC v3.0)
    transportation: {
        "road": { co2: 0.08, refrigerated_factor: 0.30 },
        "rail": { co2: 0.02, refrigerated_factor: 0.00 },
        "sea": { co2: 0.01, refrigerated_factor: 0.75 },
        "air": { co2: 0.525, refrigerated_factor: 0.00 },
        "lastmile": { co2: 0.20, refrigerated_factor: 0.00 },
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
