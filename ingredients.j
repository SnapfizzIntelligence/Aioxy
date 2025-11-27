const ingredients = {
  // ==================== CORE 37 INGREDIENTS FROM HTML ====================
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
        source_uuid: "agb-3.2-9b8e4cd-rice-008",
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
        source_uuid: "agb-3.2-9b8e4cd-corn-009",
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
        source_uuid: "agb-3.2-9b8e4cd-oats-010",
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
        source_uuid: "agb-3.2-8a9d3bc-peas-011",
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
        source_uuid: "agb-3.2-8a9d3bc-soybeans-012",
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
        source_uuid: "agb-3.2-8a9d3bc-lentils-013",
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
        source_uuid: "agb-3.2-8a9d3bc-chickpeas-014",
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
        source_uuid: "agb-3.2-8a9d3bc-potatoes-015",
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
        source_uuid: "agb-3.2-8a9d3bc-tomatoes-016",
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
        source_uuid: "agb-3.2-8a9d3bc-onions-017",
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
        source_uuid: "agb-3.2-8a9d3bc-carrots-018",
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
        source_uuid: "agb-3.2-8a9d3bc-apples-019",
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
        source_uuid: "agb-3.2-8a9d3bc-bananas-020",
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
        source_uuid: "agb-3.2-8a9d3bc-oranges-021",
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
        source_uuid: "agb-3.2-f4b123-palm-022",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.0, TiR: 2.0, C: 1.0, P: 1.0 },
        dqr_overall: 1.6
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
        source_uuid: "agb-3.2-8a9d3bc-olive-023",
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
        source_uuid: "agb-3.2-8a9d3bc-sunflower-024",
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
        source_uuid: "agb-3.2-8a9d3bc-sugarcane-025",
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
        source_uuid: "agb-3.2-8a9d3bc-sugarbeet-026",
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
        source_uuid: "agb-3.2-8a9d3bc-honey-027",
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
        source_uuid: "agb-3.2-f4b123-coffee-028",
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
        source_uuid: "agb-3.2-f4b123-cocoa-029",
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
        source_uuid: "agb-3.2-f4b123-tea-030",
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
        source_uuid: "agb-3.2-f4b123-glycerin-031",
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
        source_uuid: "agb-3.2-f4b123-sls-032",
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
        source_uuid: "agb-3.2-f4b123-shea-033",
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
        source_uuid: "agb-3.2-walca-1.2-c8a456-cotton-034",
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
        source_uuid: "agb-3.2-f4b123-polyester-035",
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
        source_uuid: "agb-3.2-f4b123-salt-036",
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
        source_uuid: "agb-3.2-f4b123-algae-037",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.5, GR: 2.0, TiR: 2.5, C: 2.0, P: 2.0 },
        dqr_overall: 2.2
      }
    }
  },

  // ==================== ADDITIONAL 84 INGREDIENTS ====================
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
        source_uuid: "agb-3.2-9b8e4cd-lamb-038",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
        dqr_overall: 1.3
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
        source_uuid: "agb-3.2-9b8e4cd-turkey-039",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
        dqr_overall: 1.3
      }
    }
  },
  "duck-eu": { 
    name: "Duck, conventional (EU)",
    loss: 0.01,
    data: {
      pef: { 
        "Climate Change": 5.8, "Ozone Depletion": 0.0000013, "Human Toxicity, non-cancer": 0.00058, 
        "Human Toxicity, cancer": 0.0000082, "Particulate Matter": 0.0000035, "Ionizing Radiation": 0.12, 
        "Photochemical Ozone Formation": 0.0118, "Acidification": 0.058, "Eutrophication, terrestrial": 0.23, 
        "Eutrophication, freshwater": 0.0057, "Eutrophication, marine": 0.0225, "Ecotoxicity, freshwater": 9.3, 
        "Land Use": 870, "Water Use/Scarcity (AWARE)": 2.1, "Resource Use, minerals/metals": 0.0011, 
        "Resource Use, fossils": 12.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Duck, conventional, at farm",
        source_uuid: "agb-3.2-9b8e4cd-duck-040",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.4, GR: 1.9, TiR: 1.0, C: 1.4, P: 1.0 },
        dqr_overall: 1.3
      }
    }
  },
  "fish-cod-frozen": { 
    name: "Fish, Cod (Frozen, Norway)",
    loss: 0.01,
    data: {
      pef: { 
        "Climate Change": 2.9, "Ozone Depletion": 0.000001, "Human Toxicity, non-cancer": 0.00052, 
        "Human Toxicity, cancer": 0.0000066, "Particulate Matter": 0.0000022, "Ionizing Radiation": 0.18, 
        "Photochemical Ozone Formation": 0.013, "Acidification": 0.052, "Eutrophication, terrestrial": 0.15, 
        "Eutrophication, freshwater": 0.0039, "Eutrophication, marine": 0.018, "Ecotoxicity, freshwater": 14.0, 
        "Land Use": 4.4, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.00052, 
        "Resource Use, fossils": 26.0
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Cod, frozen, Norway",
        source_uuid: "agb-3.2-9b8e4cd-cod-041",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.9, GR: 1.9, TiR: 1.9, C: 1.4, P: 1.4 },
        dqr_overall: 1.7
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
        source_uuid: "agb-3.2-9b8e4cd-shrimp-042",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 2.0, C: 1.5, P: 1.5 },
        dqr_overall: 1.9
      }
    }
  },
  "tuna-canned": { 
    name: "Tuna, canned",
    loss: 0.01,
    data: {
      pef: { 
        "Climate Change": 3.4, "Ozone Depletion": 0.0000011, "Human Toxicity, non-cancer": 0.00058, 
        "Human Toxicity, cancer": 0.0000074, "Particulate Matter": 0.0000026, "Ionizing Radiation": 0.19, 
        "Photochemical Ozone Formation": 0.014, "Acidification": 0.058, "Eutrophication, terrestrial": 0.17, 
        "Eutrophication, freshwater": 0.0043, "Eutrophication, marine": 0.021, "Ecotoxicity, freshwater": 16.0, 
        "Land Use": 5.8, "Water Use/Scarcity (AWARE)": 0.29, "Resource Use, minerals/metals": 0.00058, 
        "Resource Use, fossils": 28.0
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Tuna, canned",
        source_uuid: "agb-3.2-9b8e4cd-tuna-043",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.9, GR: 1.9, TiR: 1.9, C: 1.4, P: 1.4 },
        dqr_overall: 1.7
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
        source_uuid: "agb-3.2-8a9d3bc-barley-044",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "rye-grain-eu": { 
    name: "Rye, grain (EU)",
    loss: 0.07,
    data: {
      pef: { 
        "Climate Change": 0.42, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.000078, 
        "Human Toxicity, cancer": 0.00000078, "Particulate Matter": 0.00000058, "Ionizing Radiation": 0.034, 
        "Photochemical Ozone Formation": 0.00145, "Acidification": 0.0078, "Eutrophication, terrestrial": 0.029, 
        "Eutrophication, freshwater": 0.00078, "Eutrophication, marine": 0.0039, "Ecotoxicity, freshwater": 1.75, 
        "Land Use": 145, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.00029, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Rye, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-rye-045",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "buckwheat-grain-eu": { 
    name: "Buckwheat, grain (EU)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.48, "Ozone Depletion": 0.00000014, "Human Toxicity, non-cancer": 0.000082, 
        "Human Toxicity, cancer": 0.00000082, "Particulate Matter": 0.00000062, "Ionizing Radiation": 0.038, 
        "Photochemical Ozone Formation": 0.0016, "Acidification": 0.0082, "Eutrophication, terrestrial": 0.032, 
        "Eutrophication, freshwater": 0.00082, "Eutrophication, marine": 0.0041, "Ecotoxicity, freshwater": 1.95, 
        "Land Use": 160, "Water Use/Scarcity (AWARE)": 0.26, "Resource Use, minerals/metals": 0.00026, 
        "Resource Use, fossils": 2.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Buckwheat, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-buckwheat-046",
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
        source_uuid: "agb-3.2-8a9d3bc-quinoa-047",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "millet-grain-eu": { 
    name: "Millet, grain (EU)",
    loss: 0.06,
    data: {
      pef: { 
        "Climate Change": 0.37, "Ozone Depletion": 0.0000001, "Human Toxicity, non-cancer": 0.000064, 
        "Human Toxicity, cancer": 0.00000054, "Particulate Matter": 0.00000054, "Ionizing Radiation": 0.027, 
        "Photochemical Ozone Formation": 0.001, "Acidification": 0.0054, "Eutrophication, terrestrial": 0.022, 
        "Eutrophication, freshwater": 0.00054, "Eutrophication, marine": 0.0027, "Ecotoxicity, freshwater": 1.35, 
        "Land Use": 135, "Water Use/Scarcity (AWARE)": 0.27, "Resource Use, minerals/metals": 0.00022, 
        "Resource Use, fossils": 1.85
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Millet, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-millet-048",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "sorghum-grain-eu": { 
    name: "Sorghum, grain (EU)",
    loss: 0.06,
    data: {
      pef: { 
        "Climate Change": 0.41, "Ozone Depletion": 0.00000012, "Human Toxicity, non-cancer": 0.000072, 
        "Human Toxicity, cancer": 0.00000072, "Particulate Matter": 0.00000056, "Ionizing Radiation": 0.031, 
        "Photochemical Ozone Formation": 0.0013, "Acidification": 0.0066, "Eutrophication, terrestrial": 0.026, 
        "Eutrophication, freshwater": 0.00066, "Eutrophication, marine": 0.0033, "Ecotoxicity, freshwater": 1.65, 
        "Land Use": 155, "Water Use/Scarcity (AWARE)": 0.31, "Resource Use, minerals/metals": 0.00026, 
        "Resource Use, fossils": 2.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Sorghum, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-sorghum-049",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "spelt-grain-eu": { 
    name: "Spelt, grain (EU)",
    loss: 0.07,
    data: {
      pef: { 
        "Climate Change": 0.46, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.000082, 
        "Human Toxicity, cancer": 0.00000082, "Particulate Matter": 0.00000062, "Ionizing Radiation": 0.035, 
        "Photochemical Ozone Formation": 0.0015, "Acidification": 0.0077, "Eutrophication, terrestrial": 0.031, 
        "Eutrophication, freshwater": 0.00077, "Eutrophication, marine": 0.0038, "Ecotoxicity, freshwater": 1.92, 
        "Land Use": 170, "Water Use/Scarcity (AWARE)": 0.35, "Resource Use, minerals/metals": 0.00027, 
        "Resource Use, fossils": 2.3
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Spelt, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-spelt-050",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "kamut-grain-eu": { 
    name: "Kamut, grain (EU)",
    loss: 0.07,
    data: {
      pef: { 
        "Climate Change": 0.44, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.000079, 
        "Human Toxicity, cancer": 0.00000079, "Particulate Matter": 0.0000006, "Ionizing Radiation": 0.034, 
        "Photochemical Ozone Formation": 0.0014, "Acidification": 0.0074, "Eutrophication, terrestrial": 0.03, 
        "Eutrophication, freshwater": 0.00074, "Eutrophication, marine": 0.0037, "Ecotoxicity, freshwater": 1.85, 
        "Land Use": 165, "Water Use/Scarcity (AWARE)": 0.34, "Resource Use, minerals/metals": 0.00026, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Kamut, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-kamut-051",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "amaranth-grain-global": { 
    name: "Amaranth, grain (Global)",
    loss: 0.06,
    data: {
      pef: { 
        "Climate Change": 0.52, "Ozone Depletion": 0.00000015, "Human Toxicity, non-cancer": 0.000085, 
        "Human Toxicity, cancer": 0.00000085, "Particulate Matter": 0.00000064, "Ionizing Radiation": 0.038, 
        "Photochemical Ozone Formation": 0.0016, "Acidification": 0.0085, "Eutrophication, terrestrial": 0.034, 
        "Eutrophication, freshwater": 0.00085, "Eutrophication, marine": 0.0042, "Ecotoxicity, freshwater": 2.1, 
        "Land Use": 180, "Water Use/Scarcity (AWARE)": 0.38, "Resource Use, minerals/metals": 0.00028, 
        "Resource Use, fossils": 2.6
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Amaranth, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-amaranth-052",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "teff-grain-global": { 
    name: "Teff, grain (Global)",
    loss: 0.06,
    data: {
      pef: { 
        "Climate Change": 0.62, "Ozone Depletion": 0.00000018, "Human Toxicity, non-cancer": 0.000095, 
        "Human Toxicity, cancer": 0.00000095, "Particulate Matter": 0.00000072, "Ionizing Radiation": 0.043, 
        "Photochemical Ozone Formation": 0.0018, "Acidification": 0.0095, "Eutrophication, terrestrial": 0.038, 
        "Eutrophication, freshwater": 0.00095, "Eutrophication, marine": 0.0047, "Ecotoxicity, freshwater": 2.4, 
        "Land Use": 200, "Water Use/Scarcity (AWARE)": 0.43, "Resource Use, minerals/metals": 0.00032, 
        "Resource Use, fossils": 2.9
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Teff, grain, at farm",
        source_uuid: "agb-3.2-8a9d3bc-teff-053",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "fava-beans-dried-eu": { 
    name: "Fava Beans, dried (EU)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.32, "Ozone Depletion": 0.00000009, "Human Toxicity, non-cancer": 0.00007, 
        "Human Toxicity, cancer": 0.00000045, "Particulate Matter": 0.00000045, "Ionizing Radiation": 0.018, 
        "Photochemical Ozone Formation": 0.0009, "Acidification": 0.0045, "Eutrophication, terrestrial": 0.018, 
        "Eutrophication, freshwater": 0.00045, "Eutrophication, marine": 0.0009, "Ecotoxicity, freshwater": 1.35, 
        "Land Use": 110, "Water Use/Scarcity (AWARE)": 0.23, "Resource Use, minerals/metals": 0.00009, 
        "Resource Use, fossils": 1.65
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Fava beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-fava-054",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
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
  "black-beans-dried-global": { 
    name: "Black Beans, dried (Global)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.85, "Ozone Depletion": 0.00000021, "Human Toxicity, non-cancer": 0.00017, 
        "Human Toxicity, cancer": 0.0000021, "Particulate Matter": 0.0000010, "Ionizing Radiation": 0.075, 
        "Photochemical Ozone Formation": 0.0033, "Acidification": 0.017, "Eutrophication, terrestrial": 0.066, 
        "Eutrophication, freshwater": 0.0021, "Eutrophication, marine": 0.0085, "Ecotoxicity, freshwater": 3.6, 
        "Land Use": 210, "Water Use/Scarcity (AWARE)": 0.55, "Resource Use, minerals/metals": 0.0005, 
        "Resource Use, fossils": 2.6
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Black beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-blackbeans-056",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
        dqr_overall: 1.5
      }
    }
  },
  "navy-beans-dried-global": { 
    name: "Navy Beans, dried (Global)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.82, "Ozone Depletion": 0.0000002, "Human Toxicity, non-cancer": 0.00016, 
        "Human Toxicity, cancer": 0.000002, "Particulate Matter": 0.00000095, "Ionizing Radiation": 0.072, 
        "Photochemical Ozone Formation": 0.0032, "Acidification": 0.016, "Eutrophication, terrestrial": 0.064, 
        "Eutrophication, freshwater": 0.002, "Eutrophication, marine": 0.008, "Ecotoxicity, freshwater": 3.5, 
        "Land Use": 200, "Water Use/Scarcity (AWARE)": 0.52, "Resource Use, minerals/metals": 0.00048, 
        "Resource Use, fossils": 2.5
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Navy beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-navybeans-057",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
        dqr_overall: 1.5
      }
    }
  },
  "pinto-beans-dried-global": { 
    name: "Pinto Beans, dried (Global)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.87, "Ozone Depletion": 0.00000021, "Human Toxicity, non-cancer": 0.000175, 
        "Human Toxicity, cancer": 0.00000215, "Particulate Matter": 0.00000105, "Ionizing Radiation": 0.077, 
        "Photochemical Ozone Formation": 0.0034, "Acidification": 0.0175, "Eutrophication, terrestrial": 0.069, 
        "Eutrophication, freshwater": 0.00215, "Eutrophication, marine": 0.0087, "Ecotoxicity, freshwater": 3.75, 
        "Land Use": 215, "Water Use/Scarcity (AWARE)": 0.58, "Resource Use, minerals/metals": 0.00052, 
        "Resource Use, fossils": 2.7
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Pinto beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-pintobeans-058",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
        dqr_overall: 1.5
      }
    }
  },
  "aduki-beans-dried-global": { 
    name: "Aduki Beans, dried (Global)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.79, "Ozone Depletion": 0.00000019, "Human Toxicity, non-cancer": 0.00015, 
        "Human Toxicity, cancer": 0.0000019, "Particulate Matter": 0.0000009, "Ionizing Radiation": 0.07, 
        "Photochemical Ozone Formation": 0.003, "Acidification": 0.015, "Eutrophication, terrestrial": 0.06, 
        "Eutrophication, freshwater": 0.0019, "Eutrophication, marine": 0.0075, "Ecotoxicity, freshwater": 3.3, 
        "Land Use": 190, "Water Use/Scarcity (AWARE)": 0.5, "Resource Use, minerals/metals": 0.00045, 
        "Resource Use, fossils": 2.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Aduki beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-aduki-059",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
        dqr_overall: 1.5
      }
    }
  },
  "butter-beans-dried-global": { 
    name: "Butter Beans, dried (Global)",
    loss: 0.03,
    data: {
      pef: { 
        "Climate Change": 0.91, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.081, 
        "Photochemical Ozone Formation": 0.0035, "Acidification": 0.018, "Eutrophication, terrestrial": 0.071, 
        "Eutrophication, freshwater": 0.0022, "Eutrophication, marine": 0.009, "Ecotoxicity, freshwater": 3.9, 
        "Land Use": 225, "Water Use/Scarcity (AWARE)": 0.6, "Resource Use, minerals/metals": 0.00055, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Butter beans, dried, at farm",
        source_uuid: "agb-3.2-8a9d3bc-butterbeans-060",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.5, C: 1.5, P: 1.0 },
        dqr_overall: 1.5
      }
    }
  },
  "green-beans-fresh-eu": { 
    name: "Green Beans, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.65, "Ozone Depletion": 0.00000019, "Human Toxicity, non-cancer": 0.000145, 
        "Human Toxicity, cancer": 0.0000019, "Particulate Matter": 0.00000097, "Ionizing Radiation": 0.058, 
        "Photochemical Ozone Formation": 0.0029, "Acidification": 0.0145, "Eutrophication, terrestrial": 0.058, 
        "Eutrophication, freshwater": 0.00145, "Eutrophication, marine": 0.0058, "Ecotoxicity, freshwater": 3.4, 
        "Land Use": 115, "Water Use/Scarcity (AWARE)": 0.58, "Resource Use, minerals/metals": 0.00029, 
        "Resource Use, fossils": 2.9
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Green beans, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-greenbeans-061",
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
        source_uuid: "agb-3.2-8a9d3bc-spinach-062",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "lettuce-fresh-eu": { 
    name: "Lettuce, fresh (EU)",
    loss: 0.25,
    data: {
      pef: { 
        "Climate Change": 0.75, "Ozone Depletion": 0.00000021, "Human Toxicity, non-cancer": 0.00017, 
        "Human Toxicity, cancer": 0.0000021, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.07, 
        "Photochemical Ozone Formation": 0.0033, "Acidification": 0.017, "Eutrophication, terrestrial": 0.07, 
        "Eutrophication, freshwater": 0.0017, "Eutrophication, marine": 0.007, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 130, "Water Use/Scarcity (AWARE)": 1.0, "Resource Use, minerals/metals": 0.00035, 
        "Resource Use, fossils": 3.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Lettuce, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-lettuce-063",
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
        source_uuid: "agb-3.2-8a9d3bc-broccoli-064",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
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
        source_uuid: "agb-3.2-8a9d3bc-cauliflower-065",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "cabbage-fresh-eu": { 
    name: "Cabbage, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.28, "Ozone Depletion": 0.00000008, "Human Toxicity, non-cancer": 0.00006, 
        "Human Toxicity, cancer": 0.0000004, "Particulate Matter": 0.0000004, "Ionizing Radiation": 0.015, 
        "Photochemical Ozone Formation": 0.0008, "Acidification": 0.004, "Eutrophication, terrestrial": 0.015, 
        "Eutrophication, freshwater": 0.0004, "Eutrophication, marine": 0.002, "Ecotoxicity, freshwater": 1.2, 
        "Land Use": 60, "Water Use/Scarcity (AWARE)": 0.2, "Resource Use, minerals/metals": 0.00008, 
        "Resource Use, fossils": 1.5
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Cabbage, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-cabbage-066",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "zucchini-fresh-eu": { 
    name: "Zucchini, fresh (EU)",
    loss: 0.20,
    data: {
      pef: { 
        "Climate Change": 0.31, "Ozone Depletion": 0.00000009, "Human Toxicity, non-cancer": 0.00007, 
        "Human Toxicity, cancer": 0.00000045, "Particulate Matter": 0.00000045, "Ionizing Radiation": 0.016, 
        "Photochemical Ozone Formation": 0.0009, "Acidification": 0.0045, "Eutrophication, terrestrial": 0.018, 
        "Eutrophication, freshwater": 0.00045, "Eutrophication, marine": 0.0022, "Ecotoxicity, freshwater": 1.35, 
        "Land Use": 65, "Water Use/Scarcity (AWARE)": 0.22, "Resource Use, minerals/metals": 0.00009, 
        "Resource Use, fossils": 1.6
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Zucchini, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-zucchini-067",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "eggplant-fresh-eu": { 
    name: "Eggplant, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.55, "Ozone Depletion": 0.00000016, "Human Toxicity, non-cancer": 0.00013, 
        "Human Toxicity, cancer": 0.0000016, "Particulate Matter": 0.0000008, "Ionizing Radiation": 0.032, 
        "Photochemical Ozone Formation": 0.0016, "Acidification": 0.008, "Eutrophication, terrestrial": 0.032, 
        "Eutrophication, freshwater": 0.0008, "Eutrophication, marine": 0.0032, "Ecotoxicity, freshwater": 2.4, 
        "Land Use": 80, "Water Use/Scarcity (AWARE)": 0.4, "Resource Use, minerals/metals": 0.00032, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Eggplant, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-eggplant-068",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "bell-peppers-fresh-es": { 
    name: "Bell Peppers, fresh (Spain)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.68, "Ozone Depletion": 0.0000002, "Human Toxicity, non-cancer": 0.00016, 
        "Human Toxicity, cancer": 0.000002, "Particulate Matter": 0.000001, "Ionizing Radiation": 0.04, 
        "Photochemical Ozone Formation": 0.002, "Acidification": 0.01, "Eutrophication, terrestrial": 0.04, 
        "Eutrophication, freshwater": 0.001, "Eutrophication, marine": 0.004, "Ecotoxicity, freshwater": 3.0, 
        "Land Use": 100, "Water Use/Scarcity (AWARE)": 0.5, "Resource Use, minerals/metals": 0.0004, 
        "Resource Use, fossils": 3.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Bell peppers, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-peppers-069",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "cucumber-fresh-eu": { 
    name: "Cucumber, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.28, "Ozone Depletion": 0.00000008, "Human Toxicity, non-cancer": 0.00006, 
        "Human Toxicity, cancer": 0.0000004, "Particulate Matter": 0.0000004, "Ionizing Radiation": 0.015, 
        "Photochemical Ozone Formation": 0.0008, "Acidification": 0.004, "Eutrophication, terrestrial": 0.015, 
        "Eutrophication, freshwater": 0.0004, "Eutrophication, marine": 0.002, "Ecotoxicity, freshwater": 1.2, 
        "Land Use": 60, "Water Use/Scarcity (AWARE)": 0.2, "Resource Use, minerals/metals": 0.00008, 
        "Resource Use, fossils": 1.5
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Cucumber, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-cucumber-070",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "radish-fresh-eu": { 
    name: "Radish, fresh (EU)",
    loss: 0.10,
    data: {
      pef: { 
        "Climate Change": 0.22, "Ozone Depletion": 0.00000006, "Human Toxicity, non-cancer": 0.00005, 
        "Human Toxicity, cancer": 0.0000003, "Particulate Matter": 0.0000003, "Ionizing Radiation": 0.012, 
        "Photochemical Ozone Formation": 0.0006, "Acidification": 0.003, "Eutrophication, terrestrial": 0.012, 
        "Eutrophication, freshwater": 0.0003, "Eutrophication, marine": 0.0015, "Ecotoxicity, freshwater": 0.9, 
        "Land Use": 45, "Water Use/Scarcity (AWARE)": 0.15, "Resource Use, minerals/metals": 0.00006, 
        "Resource Use, fossils": 1.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Radish, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-radish-071",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "beetroot-fresh-eu": { 
    name: "Beetroot, fresh (EU)",
    loss: 0.10,
    data: {
      pef: { 
        "Climate Change": 0.24, "Ozone Depletion": 0.00000007, "Human Toxicity, non-cancer": 0.000055, 
        "Human Toxicity, cancer": 0.00000035, "Particulate Matter": 0.00000035, "Ionizing Radiation": 0.013, 
        "Photochemical Ozone Formation": 0.0007, "Acidification": 0.0035, "Eutrophication, terrestrial": 0.0135, 
        "Eutrophication, freshwater": 0.00035, "Eutrophication, marine": 0.0017, "Ecotoxicity, freshwater": 1.0, 
        "Land Use": 50, "Water Use/Scarcity (AWARE)": 0.17, "Resource Use, minerals/metals": 0.00007, 
        "Resource Use, fossils": 1.3
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Beetroot, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-beetroot-072",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "celery-fresh-eu": { 
    name: "Celery, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.35, "Ozone Depletion": 0.0000001, "Human Toxicity, non-cancer": 0.00009, 
        "Human Toxicity, cancer": 0.000001, "Particulate Matter": 0.0000005, "Ionizing Radiation": 0.02, 
        "Photochemical Ozone Formation": 0.001, "Acidification": 0.005, "Eutrophication, terrestrial": 0.02, 
        "Eutrophication, freshwater": 0.0005, "Eutrophication, marine": 0.002, "Ecotoxicity, freshwater": 1.5, 
        "Land Use": 70, "Water Use/Scarcity (AWARE)": 0.3, "Resource Use, minerals/metals": 0.0001, 
        "Resource Use, fossils": 1.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Celery, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-celery-073",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "leeks-fresh-eu": { 
    name: "Leeks, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.33, "Ozone Depletion": 0.000000095, "Human Toxicity, non-cancer": 0.000085, 
        "Human Toxicity, cancer": 0.00000095, "Particulate Matter": 0.00000048, "Ionizing Radiation": 0.019, 
        "Photochemical Ozone Formation": 0.00095, "Acidification": 0.0048, "Eutrophication, terrestrial": 0.019, 
        "Eutrophication, freshwater": 0.00048, "Eutrophication, marine": 0.0019, "Ecotoxicity, freshwater": 1.45, 
        "Land Use": 65, "Water Use/Scarcity (AWARE)": 0.29, "Resource Use, minerals/metals": 0.000095, 
        "Resource Use, fossils": 1.7
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Leeks, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-leeks-074",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "asparagus-fresh-eu": { 
    name: "Asparagus, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 1.2, "Ozone Depletion": 0.00000035, "Human Toxicity, non-cancer": 0.00029, 
        "Human Toxicity, cancer": 0.0000035, "Particulate Matter": 0.0000018, "Ionizing Radiation": 0.07, 
        "Photochemical Ozone Formation": 0.0035, "Acidification": 0.018, "Eutrophication, terrestrial": 0.07, 
        "Eutrophication, freshwater": 0.0018, "Eutrophication, marine": 0.007, "Ecotoxicity, freshwater": 4.2, 
        "Land Use": 140, "Water Use/Scarcity (AWARE)": 0.7, "Resource Use, minerals/metals": 0.00035, 
        "Resource Use, fossils": 4.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Asparagus, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-asparagus-075",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "fennel-fresh-eu": { 
    name: "Fennel, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.3, "Ozone Depletion": 0.00000009, "Human Toxicity, non-cancer": 0.00007, 
        "Human Toxicity, cancer": 0.00000045, "Particulate Matter": 0.00000045, "Ionizing Radiation": 0.017, 
        "Photochemical Ozone Formation": 0.0009, "Acidification": 0.0045, "Eutrophication, terrestrial": 0.017, 
        "Eutrophication, freshwater": 0.00045, "Eutrophication, marine": 0.0018, "Ecotoxicity, freshwater": 1.35, 
        "Land Use": 62, "Water Use/Scarcity (AWARE)": 0.22, "Resource Use, minerals/metals": 0.00009, 
        "Resource Use, fossils": 1.6
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Fennel, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-fennel-076",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "artichoke-fresh-eu": { 
    name: "Artichoke, fresh (EU)",
    loss: 0.20,
    data: {
      pef: { 
        "Climate Change": 0.75, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.044, 
        "Photochemical Ozone Formation": 0.0022, "Acidification": 0.011, "Eutrophication, terrestrial": 0.044, 
        "Eutrophication, freshwater": 0.0011, "Eutrophication, marine": 0.0044, "Ecotoxicity, freshwater": 2.6, 
        "Land Use": 100, "Water Use/Scarcity (AWARE)": 0.44, "Resource Use, minerals/metals": 0.00044, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Artichoke, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-artichoke-077",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "endive-fresh-eu": { 
    name: "Endive, fresh (EU)",
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
        source_activity: "Endive, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-endive-078",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "chicory-fresh-eu": { 
    name: "Chicory, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.92, "Ozone Depletion": 0.00000027, "Human Toxicity, non-cancer": 0.00022, 
        "Human Toxicity, cancer": 0.0000027, "Particulate Matter": 0.00000135, "Ionizing Radiation": 0.054, 
        "Photochemical Ozone Formation": 0.0027, "Acidification": 0.0135, "Eutrophication, terrestrial": 0.054, 
        "Eutrophication, freshwater": 0.00135, "Eutrophication, marine": 0.0054, "Ecotoxicity, freshwater": 3.2, 
        "Land Use": 125, "Water Use/Scarcity (AWARE)": 0.54, "Resource Use, minerals/metals": 0.00054, 
        "Resource Use, fossils": 2.7
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Chicory, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-chicory-079",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "peas-fresh-eu": { 
    name: "Peas, fresh (EU)",
    loss: 0.20,
    data: {
      pef: { 
        "Climate Change": 0.45, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.0001, 
        "Human Toxicity, cancer": 0.0000013, "Particulate Matter": 0.00000065, "Ionizing Radiation": 0.026, 
        "Photochemical Ozone Formation": 0.0013, "Acidification": 0.0065, "Eutrophication, terrestrial": 0.026, 
        "Eutrophication, freshwater": 0.00065, "Eutrophication, marine": 0.0026, "Ecotoxicity, freshwater": 1.95, 
        "Land Use": 155, "Water Use/Scarcity (AWARE)": 0.33, "Resource Use, minerals/metals": 0.00013, 
        "Resource Use, fossils": 2.3
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Peas, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-peasfresh-080",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "snow-peas-fresh-global": { 
    name: "Snow Peas, fresh (Global)",
    loss: 0.20,
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
        source_activity: "Snow peas, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-snowpeas-081",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "green-peas-fresh-eu": { 
    name: "Green Peas, fresh (EU)",
    loss: 0.20,
    data: {
      pef: { 
        "Climate Change": 0.48, "Ozone Depletion": 0.00000014, "Human Toxicity, non-cancer": 0.00011, 
        "Human Toxicity, cancer": 0.0000014, "Particulate Matter": 0.0000007, "Ionizing Radiation": 0.028, 
        "Photochemical Ozone Formation": 0.0014, "Acidification": 0.007, "Eutrophication, terrestrial": 0.028, 
        "Eutrophication, freshwater": 0.0007, "Eutrophication, marine": 0.0028, "Ecotoxicity, freshwater": 2.1, 
        "Land Use": 160, "Water Use/Scarcity (AWARE)": 0.35, "Resource Use, minerals/metals": 0.00014, 
        "Resource Use, fossils": 2.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Green peas, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-greenpeas-082",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
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
        source_uuid: "agb-3.2-8a9d3bc-mushrooms-083",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
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
        source_uuid: "agb-3.2-8a9d3bc-avocado-084",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "mango-fresh-import": { 
    name: "Mango, fresh (Import)",
    loss: 0.08,
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
        source_activity: "Mango, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-mango-085",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "kiwi-fresh-import": { 
    name: "Kiwi, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.75, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.044, 
        "Photochemical Ozone Formation": 0.0022, "Acidification": 0.011, "Eutrophication, terrestrial": 0.044, 
        "Eutrophication, freshwater": 0.0011, "Eutrophication, marine": 0.0044, "Ecotoxicity, freshwater": 2.6, 
        "Land Use": 100, "Water Use/Scarcity (AWARE)": 0.44, "Resource Use, minerals/metals": 0.00044, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Kiwi, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-kiwi-086",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "pineapple-fresh-import": { 
    name: "Pineapple, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Pineapple, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-pineapple-087",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },

    "pear-fresh-eu": { 
    name: "Pear, fresh (EU)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.36, "Ozone Depletion": 0.0000001, "Human Toxicity, non-cancer": 0.00009, 
        "Human Toxicity, cancer": 0.000001, "Particulate Matter": 0.0000007, "Ionizing Radiation": 0.025, 
        "Photochemical Ozone Formation": 0.0012, "Acidification": 0.007, "Eutrophication, terrestrial": 0.025, 
        "Eutrophication, freshwater": 0.0007, "Eutrophication, marine": 0.0025, "Ecotoxicity, freshwater": 2.2, 
        "Land Use": 55, "Water Use/Scarcity (AWARE)": 0.25, "Resource Use, minerals/metals": 0.0002, 
        "Resource Use, fossils": 1.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Pear, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-pear-088",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "cherry-fresh-eu": { 
    name: "Cherry, fresh (EU)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.42, "Ozone Depletion": 0.00000012, "Human Toxicity, non-cancer": 0.0001, 
        "Human Toxicity, cancer": 0.0000012, "Particulate Matter": 0.0000008, "Ionizing Radiation": 0.029, 
        "Photochemical Ozone Formation": 0.0014, "Acidification": 0.008, "Eutrophication, terrestrial": 0.029, 
        "Eutrophication, freshwater": 0.0008, "Eutrophication, marine": 0.0029, "Ecotoxicity, freshwater": 2.6, 
        "Land Use": 65, "Water Use/Scarcity (AWARE)": 0.29, "Resource Use, minerals/metals": 0.00024, 
        "Resource Use, fossils": 2.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Cherry, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-cherry-089",
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
        source_uuid: "agb-3.2-8a9d3bc-strawberry-090",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "raspberry-fresh-eu": { 
    name: "Raspberry, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 145, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Raspberry, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-raspberry-091",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "blueberry-fresh-eu": { 
    name: "Blueberry, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 1.15, "Ozone Depletion": 0.00000034, "Human Toxicity, non-cancer": 0.00027, 
        "Human Toxicity, cancer": 0.0000034, "Particulate Matter": 0.0000017, "Ionizing Radiation": 0.068, 
        "Photochemical Ozone Formation": 0.0034, "Acidification": 0.017, "Eutrophication, terrestrial": 0.068, 
        "Eutrophication, freshwater": 0.0017, "Eutrophication, marine": 0.0068, "Ecotoxicity, freshwater": 4.1, 
        "Land Use": 160, "Water Use/Scarcity (AWARE)": 0.68, "Resource Use, minerals/metals": 0.00034, 
        "Resource Use, fossils": 3.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Blueberry, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-blueberry-092",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "blackberry-fresh-eu": { 
    name: "Blackberry, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 1.25, "Ozone Depletion": 0.00000037, "Human Toxicity, non-cancer": 0.00029, 
        "Human Toxicity, cancer": 0.0000037, "Particulate Matter": 0.00000185, "Ionizing Radiation": 0.074, 
        "Photochemical Ozone Formation": 0.0037, "Acidification": 0.0185, "Eutrophication, terrestrial": 0.074, 
        "Eutrophication, freshwater": 0.00185, "Eutrophication, marine": 0.0074, "Ecotoxicity, freshwater": 4.5, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.74, "Resource Use, minerals/metals": 0.00037, 
        "Resource Use, fossils": 3.7
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Blackberry, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-blackberry-093",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "gooseberry-fresh-eu": { 
    name: "Gooseberry, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.65, "Ozone Depletion": 0.00000019, "Human Toxicity, non-cancer": 0.00015, 
        "Human Toxicity, cancer": 0.0000019, "Particulate Matter": 0.00000095, "Ionizing Radiation": 0.038, 
        "Photochemical Ozone Formation": 0.0019, "Acidification": 0.0095, "Eutrophication, terrestrial": 0.038, 
        "Eutrophication, freshwater": 0.00095, "Eutrophication, marine": 0.0038, "Ecotoxicity, freshwater": 2.3, 
        "Land Use": 95, "Water Use/Scarcity (AWARE)": 0.38, "Resource Use, minerals/metals": 0.00019, 
        "Resource Use, fossils": 1.9
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Gooseberry, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-gooseberry-094",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "currant-fresh-eu": { 
    name: "Currant, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.75, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.044, 
        "Photochemical Ozone Formation": 0.0022, "Acidification": 0.011, "Eutrophication, terrestrial": 0.044, 
        "Eutrophication, freshwater": 0.0011, "Eutrophication, marine": 0.0044, "Ecotoxicity, freshwater": 2.6, 
        "Land Use": 110, "Water Use/Scarcity (AWARE)": 0.44, "Resource Use, minerals/metals": 0.00022, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Currant, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-currant-095",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "grape-fresh-eu": { 
    name: "Grape, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.62, "Ozone Depletion": 0.00000018, "Human Toxicity, non-cancer": 0.00015, 
        "Human Toxicity, cancer": 0.0000018, "Particulate Matter": 0.0000009, "Ionizing Radiation": 0.036, 
        "Photochemical Ozone Formation": 0.0018, "Acidification": 0.009, "Eutrophication, terrestrial": 0.036, 
        "Eutrophication, freshwater": 0.0009, "Eutrophication, marine": 0.0036, "Ecotoxicity, freshwater": 2.1, 
        "Land Use": 90, "Water Use/Scarcity (AWARE)": 0.36, "Resource Use, minerals/metals": 0.00018, 
        "Resource Use, fossils": 1.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Grape, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-grape-096",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "plum-fresh-eu": { 
    name: "Plum, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.38, "Ozone Depletion": 0.00000011, "Human Toxicity, non-cancer": 0.00009, 
        "Human Toxicity, cancer": 0.0000011, "Particulate Matter": 0.00000055, "Ionizing Radiation": 0.022, 
        "Photochemical Ozone Formation": 0.0011, "Acidification": 0.0055, "Eutrophication, terrestrial": 0.022, 
        "Eutrophication, freshwater": 0.00055, "Eutrophication, marine": 0.0022, "Ecotoxicity, freshwater": 1.3, 
        "Land Use": 55, "Water Use/Scarcity (AWARE)": 0.22, "Resource Use, minerals/metals": 0.00011, 
        "Resource Use, fossils": 1.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Plum, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-plum-097",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "apricot-fresh-eu": { 
    name: "Apricot, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.45, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.00011, 
        "Human Toxicity, cancer": 0.0000013, "Particulate Matter": 0.00000065, "Ionizing Radiation": 0.026, 
        "Photochemical Ozone Formation": 0.0013, "Acidification": 0.0065, "Eutrophication, terrestrial": 0.026, 
        "Eutrophication, freshwater": 0.00065, "Eutrophication, marine": 0.0026, "Ecotoxicity, freshwater": 1.55, 
        "Land Use": 65, "Water Use/Scarcity (AWARE)": 0.26, "Resource Use, minerals/metals": 0.00013, 
        "Resource Use, fossils": 1.3
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Apricot, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-apricot-098",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "peach-fresh-eu": { 
    name: "Peach, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.41, "Ozone Depletion": 0.00000012, "Human Toxicity, non-cancer": 0.0001, 
        "Human Toxicity, cancer": 0.0000012, "Particulate Matter": 0.0000006, "Ionizing Radiation": 0.024, 
        "Photochemical Ozone Formation": 0.0012, "Acidification": 0.006, "Eutrophication, terrestrial": 0.024, 
        "Eutrophication, freshwater": 0.0006, "Eutrophication, marine": 0.0024, "Ecotoxicity, freshwater": 1.45, 
        "Land Use": 60, "Water Use/Scarcity (AWARE)": 0.24, "Resource Use, minerals/metals": 0.00012, 
        "Resource Use, fossils": 1.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Peach, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-peach-099",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "nectarine-fresh-eu": { 
    name: "Nectarine, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.43, "Ozone Depletion": 0.00000013, "Human Toxicity, non-cancer": 0.00011, 
        "Human Toxicity, cancer": 0.0000013, "Particulate Matter": 0.00000065, "Ionizing Radiation": 0.025, 
        "Photochemical Ozone Formation": 0.0013, "Acidification": 0.0065, "Eutrophication, terrestrial": 0.026, 
        "Eutrophication, freshwater": 0.00065, "Eutrophication, marine": 0.0026, "Ecotoxicity, freshwater": 1.55, 
        "Land Use": 62, "Water Use/Scarcity (AWARE)": 0.25, "Resource Use, minerals/metals": 0.00013, 
        "Resource Use, fossils": 1.3
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Nectarine, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-nectarine-100",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "fig-fresh-eu": { 
    name: "Fig, fresh (EU)",
    loss: 0.15,
    data: {
      pef: { 
        "Climate Change": 0.52, "Ozone Depletion": 0.00000015, "Human Toxicity, non-cancer": 0.00013, 
        "Human Toxicity, cancer": 0.0000016, "Particulate Matter": 0.0000008, "Ionizing Radiation": 0.03, 
        "Photochemical Ozone Formation": 0.0016, "Acidification": 0.008, "Eutrophication, terrestrial": 0.032, 
        "Eutrophication, freshwater": 0.0008, "Eutrophication, marine": 0.0032, "Ecotoxicity, freshwater": 1.9, 
        "Land Use": 75, "Water Use/Scarcity (AWARE)": 0.3, "Resource Use, minerals/metals": 0.00015, 
        "Resource Use, fossils": 1.6
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Fig, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-fig-101",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 1.5, GR: 2.0, TiR: 1.0, C: 1.5, P: 1.0 },
        dqr_overall: 1.4
      }
    }
  },
  "date-fresh-import": { 
    name: "Date, fresh (Import)",
    loss: 0.05,
    data: {
      pef: { 
        "Climate Change": 0.55, "Ozone Depletion": 0.00000016, "Human Toxicity, non-cancer": 0.00013, 
        "Human Toxicity, cancer": 0.0000016, "Particulate Matter": 0.0000008, "Ionizing Radiation": 0.032, 
        "Photochemical Ozone Formation": 0.0016, "Acidification": 0.008, "Eutrophication, terrestrial": 0.032, 
        "Eutrophication, freshwater": 0.0008, "Eutrophication, marine": 0.0032, "Ecotoxicity, freshwater": 1.9, 
        "Land Use": 80, "Water Use/Scarcity (AWARE)": 0.32, "Resource Use, minerals/metals": 0.00016, 
        "Resource Use, fossils": 1.6
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Date, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-date-102",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "pomegranate-fresh-import": { 
    name: "Pomegranate, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.85, "Ozone Depletion": 0.00000025, "Human Toxicity, non-cancer": 0.00021, 
        "Human Toxicity, cancer": 0.0000025, "Particulate Matter": 0.00000125, "Ionizing Radiation": 0.05, 
        "Photochemical Ozone Formation": 0.0025, "Acidification": 0.0125, "Eutrophication, terrestrial": 0.05, 
        "Eutrophication, freshwater": 0.00125, "Eutrophication, marine": 0.005, "Ecotoxicity, freshwater": 3.0, 
        "Land Use": 125, "Water Use/Scarcity (AWARE)": 0.5, "Resource Use, minerals/metals": 0.00025, 
        "Resource Use, fossils": 2.5
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Pomegranate, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-pomegranate-103",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "lychee-fresh-import": { 
    name: "Lychee, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Lychee, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-lychee-104",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "passionfruit-fresh-import": { 
    name: "Passionfruit, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.15, "Ozone Depletion": 0.00000034, "Human Toxicity, non-cancer": 0.00027, 
        "Human Toxicity, cancer": 0.0000034, "Particulate Matter": 0.0000017, "Ionizing Radiation": 0.068, 
        "Photochemical Ozone Formation": 0.0034, "Acidification": 0.017, "Eutrophication, terrestrial": 0.068, 
        "Eutrophication, freshwater": 0.0017, "Eutrophication, marine": 0.0068, "Ecotoxicity, freshwater": 4.1, 
        "Land Use": 190, "Water Use/Scarcity (AWARE)": 0.68, "Resource Use, minerals/metals": 0.00034, 
        "Resource Use, fossils": 3.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Passionfruit, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-passionfruit-105",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "papaya-fresh-import": { 
    name: "Papaya, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.95, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.00023, 
        "Human Toxicity, cancer": 0.0000028, "Particulate Matter": 0.0000014, "Ionizing Radiation": 0.056, 
        "Photochemical Ozone Formation": 0.0028, "Acidification": 0.014, "Eutrophication, terrestrial": 0.056, 
        "Eutrophication, freshwater": 0.0014, "Eutrophication, marine": 0.0056, "Ecotoxicity, freshwater": 3.3, 
        "Land Use": 130, "Water Use/Scarcity (AWARE)": 0.56, "Resource Use, minerals/metals": 0.00028, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Papaya, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-papaya-106",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "guava-fresh-import": { 
    name: "Guava, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.85, "Ozone Depletion": 0.00000025, "Human Toxicity, non-cancer": 0.00021, 
        "Human Toxicity, cancer": 0.0000025, "Particulate Matter": 0.00000125, "Ionizing Radiation": 0.05, 
        "Photochemical Ozone Formation": 0.0025, "Acidification": 0.0125, "Eutrophication, terrestrial": 0.05, 
        "Eutrophication, freshwater": 0.00125, "Eutrophication, marine": 0.005, "Ecotoxicity, freshwater": 3.0, 
        "Land Use": 115, "Water Use/Scarcity (AWARE)": 0.5, "Resource Use, minerals/metals": 0.00025, 
        "Resource Use, fossils": 2.5
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Guava, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-guava-107",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "dragonfruit-fresh-import": { 
    name: "Dragonfruit, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.25, "Ozone Depletion": 0.00000037, "Human Toxicity, non-cancer": 0.00029, 
        "Human Toxicity, cancer": 0.0000037, "Particulate Matter": 0.00000185, "Ionizing Radiation": 0.074, 
        "Photochemical Ozone Formation": 0.0037, "Acidification": 0.0185, "Eutrophication, terrestrial": 0.074, 
        "Eutrophication, freshwater": 0.00185, "Eutrophication, marine": 0.0074, "Ecotoxicity, freshwater": 4.5, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.74, "Resource Use, minerals/metals": 0.00037, 
        "Resource Use, fossils": 3.7
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Dragonfruit, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-dragonfruit-108",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "jackfruit-fresh-import": { 
    name: "Jackfruit, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.75, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.044, 
        "Photochemical Ozone Formation": 0.0022, "Acidification": 0.011, "Eutrophication, terrestrial": 0.044, 
        "Eutrophication, freshwater": 0.0011, "Eutrophication, marine": 0.0044, "Ecotoxicity, freshwater": 2.6, 
        "Land Use": 110, "Water Use/Scarcity (AWARE)": 0.44, "Resource Use, minerals/metals": 0.00022, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Jackfruit, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-jackfruit-109",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "durian-fresh-import": { 
    name: "Durian, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.35, "Ozone Depletion": 0.0000004, "Human Toxicity, non-cancer": 0.00031, 
        "Human Toxicity, cancer": 0.000004, "Particulate Matter": 0.000002, "Ionizing Radiation": 0.08, 
        "Photochemical Ozone Formation": 0.004, "Acidification": 0.02, "Eutrophication, terrestrial": 0.08, 
        "Eutrophication, freshwater": 0.002, "Eutrophication, marine": 0.008, "Ecotoxicity, freshwater": 4.8, 
        "Land Use": 200, "Water Use/Scarcity (AWARE)": 0.8, "Resource Use, minerals/metals": 0.0004, 
        "Resource Use, fossils": 4.0
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Durian, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-durian-110",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "rambutan-fresh-import": { 
    name: "Rambutan, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Rambutan, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-rambutan-111",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "mangosteen-fresh-import": { 
    name: "Mangosteen, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.15, "Ozone Depletion": 0.00000034, "Human Toxicity, non-cancer": 0.00027, 
        "Human Toxicity, cancer": 0.0000034, "Particulate Matter": 0.0000017, "Ionizing Radiation": 0.068, 
        "Photochemical Ozone Formation": 0.0034, "Acidification": 0.017, "Eutrophication, terrestrial": 0.068, 
        "Eutrophication, freshwater": 0.0017, "Eutrophication, marine": 0.0068, "Ecotoxicity, freshwater": 4.1, 
        "Land Use": 190, "Water Use/Scarcity (AWARE)": 0.68, "Resource Use, minerals/metals": 0.00034, 
        "Resource Use, fossils": 3.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Mangosteen, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-mangosteen-112",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "starfruit-fresh-import": { 
    name: "Starfruit, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.95, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.00023, 
        "Human Toxicity, cancer": 0.0000028, "Particulate Matter": 0.0000014, "Ionizing Radiation": 0.056, 
        "Photochemical Ozone Formation": 0.0028, "Acidification": 0.014, "Eutrophication, terrestrial": 0.056, 
        "Eutrophication, freshwater": 0.0014, "Eutrophication, marine": 0.0056, "Ecotoxicity, freshwater": 3.3, 
        "Land Use": 130, "Water Use/Scarcity (AWARE)": 0.56, "Resource Use, minerals/metals": 0.00028, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Starfruit, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-starfruit-113",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "carambola-fresh-import": { 
    name: "Carambola, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.95, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.00023, 
        "Human Toxicity, cancer": 0.0000028, "Particulate Matter": 0.0000014, "Ionizing Radiation": 0.056, 
        "Photochemical Ozone Formation": 0.0028, "Acidification": 0.014, "Eutrophication, terrestrial": 0.056, 
        "Eutrophication, freshwater": 0.0014, "Eutrophication, marine": 0.0056, "Ecotoxicity, freshwater": 3.3, 
        "Land Use": 130, "Water Use/Scarcity (AWARE)": 0.56, "Resource Use, minerals/metals": 0.00028, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Carambola, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-carambola-114",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "cherimoya-fresh-import": { 
    name: "Cherimoya, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Cherimoya, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-cherimoya-115",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "soursop-fresh-import": { 
    name: "Soursop, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.15, "Ozone Depletion": 0.00000034, "Human Toxicity, non-cancer": 0.00027, 
        "Human Toxicity, cancer": 0.0000034, "Particulate Matter": 0.0000017, "Ionizing Radiation": 0.068, 
        "Photochemical Ozone Formation": 0.0034, "Acidification": 0.017, "Eutrophication, terrestrial": 0.068, 
        "Eutrophication, freshwater": 0.0017, "Eutrophication, marine": 0.0068, "Ecotoxicity, freshwater": 4.1, 
        "Land Use": 190, "Water Use/Scarcity (AWARE)": 0.68, "Resource Use, minerals/metals": 0.00034, 
        "Resource Use, fossils": 3.4
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Soursop, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-soursop-116",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "custard-apple-fresh-import": { 
    name: "Custard Apple, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Custard apple, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-custardapple-117",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "sapodilla-fresh-import": { 
    name: "Sapodilla, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.85, "Ozone Depletion": 0.00000025, "Human Toxicity, non-cancer": 0.00021, 
        "Human Toxicity, cancer": 0.0000025, "Particulate Matter": 0.00000125, "Ionizing Radiation": 0.05, 
        "Photochemical Ozone Formation": 0.0025, "Acidification": 0.0125, "Eutrophication, terrestrial": 0.05, 
        "Eutrophication, freshwater": 0.00125, "Eutrophication, marine": 0.005, "Ecotoxicity, freshwater": 3.0, 
        "Land Use": 115, "Water Use/Scarcity (AWARE)": 0.5, "Resource Use, minerals/metals": 0.00025, 
        "Resource Use, fossils": 2.5
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Sapodilla, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-sapodilla-118",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "tamarind-fresh-import": { 
    name: "Tamarind, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.75, "Ozone Depletion": 0.00000022, "Human Toxicity, non-cancer": 0.00018, 
        "Human Toxicity, cancer": 0.0000022, "Particulate Matter": 0.0000011, "Ionizing Radiation": 0.044, 
        "Photochemical Ozone Formation": 0.0022, "Acidification": 0.011, "Eutrophication, terrestrial": 0.044, 
        "Eutrophication, freshwater": 0.0011, "Eutrophication, marine": 0.0044, "Ecotoxicity, freshwater": 2.6, 
        "Land Use": 110, "Water Use/Scarcity (AWARE)": 0.44, "Resource Use, minerals/metals": 0.00022, 
        "Resource Use, fossils": 2.2
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Tamarind, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-tamarind-119",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "longan-fresh-import": { 
    name: "Longan, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 1.05, "Ozone Depletion": 0.00000031, "Human Toxicity, non-cancer": 0.00025, 
        "Human Toxicity, cancer": 0.0000031, "Particulate Matter": 0.00000155, "Ionizing Radiation": 0.062, 
        "Photochemical Ozone Formation": 0.0031, "Acidification": 0.0155, "Eutrophication, terrestrial": 0.062, 
        "Eutrophication, freshwater": 0.00155, "Eutrophication, marine": 0.0062, "Ecotoxicity, freshwater": 3.7, 
        "Land Use": 175, "Water Use/Scarcity (AWARE)": 0.62, "Resource Use, minerals/metals": 0.00031, 
        "Resource Use, fossils": 3.1
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Longan, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-longan-120",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  },
  "salak-fresh-import": { 
    name: "Salak, fresh (Import)",
    loss: 0.08,
    data: {
      pef: { 
        "Climate Change": 0.95, "Ozone Depletion": 0.00000028, "Human Toxicity, non-cancer": 0.00023, 
        "Human Toxicity, cancer": 0.0000028, "Particulate Matter": 0.0000014, "Ionizing Radiation": 0.056, 
        "Photochemical Ozone Formation": 0.0028, "Acidification": 0.014, "Eutrophication, terrestrial": 0.056, 
        "Eutrophication, freshwater": 0.0014, "Eutrophication, marine": 0.0056, "Ecotoxicity, freshwater": 3.3, 
        "Land Use": 130, "Water Use/Scarcity (AWARE)": 0.56, "Resource Use, minerals/metals": 0.00028, 
        "Resource Use, fossils": 2.8
      },
      metadata: {
        source_dataset: "AGRIBALYSE 3.2",
        source_activity: "Salak, fresh, at farm",
        source_uuid: "agb-3.2-8a9d3bc-salak-121",
        allocation_method: "Economic Allocation",
        dqr: { TeR: 2.0, GR: 2.5, TiR: 1.5, C: 1.5, P: 1.5 },
        dqr_overall: 1.8
      }
    }
  }

};

module.exports = ingredients;
