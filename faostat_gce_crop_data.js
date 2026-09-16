// FAOSTAT GCE (Emissions from Crops) + QCL (Production) derived factors
// Source files (both attached to AIOXY project, re-downloadable from FAOSTAT):
//   faostat_gce_europe_merged.csv  — domain GCE, FAO TIER 1, 2023
//   FAOSTAT_data_en_9-14-2026__1_.csv — domain QCL, Production element, 2023
// GWP100 AR6: N2O=273, CH4(biogenic)=27 — same constants as CONSTANTS.IPCC_AR6_PEF31.
//
// ROW-LEVEL TRACEABILITY: every factor below carries source_rows — the exact
// Domain Code, Area Code (M49), Element Code, Item Code, and Year for each raw
// FAOSTAT row that contributed to it. An auditor can filter either source CSV on
// these exact fields and land on the precise row, no reconstruction or judgment
// call required. Formula: intensity = ((crop_residues_n2o + burning_n2o) * 1e6 *
// GWP_N2O + (burning_ch4 + rice_ch4) * 1e6 * GWP_CH4_BIOGENIC) / (production_t * 1000)
//
// SCOPE: covers crop-residue decomposition, residue burning, and (rice only)
// paddy methane ONLY. Does NOT include synthetic fertilizer N2O or on-farm
// fuel/machinery — see calculation_engine.js STEP C2 header for full explanation.
window.aioxyData = window.aioxyData || {};
window.aioxyData.faostat_gce_crop = {
    source: 'FAOSTAT domain GCE (Crop Residues + Burning + Rice Cultivation elements) and QCL (Production), FAO TIER 1, 2023',
    unit: 'kg CO2e per kg product (partial — residues/burning/rice only, see header)',
    gwp_basis: 'IPCC AR6 GWP100 (N2O=273, CH4 biogenic=27)',
    fertilizer_included: false,
    crops: {
            "barley": {
                    "AT": {
                            "intensity": 0.060319,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.1706",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "772120",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BE": {
                            "intensity": 0.059345,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0856",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "393780",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.06116,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.1786",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "797220",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.062898,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0676",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "293410",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CY": {
                            "intensity": 0.074492,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0054",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "19790",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.061,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.3942",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1764210",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DK": {
                            "intensity": 0.062106,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.5782",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "2541600",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "EE": {
                            "intensity": 0.065515,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0796",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "331690",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FI": {
                            "intensity": 0.06484,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.2562",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1078700",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.060058,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "2.6715",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "12143490",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.059974,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "2.4165",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "10999900",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.066119,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0878",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "362520",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.061113,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.4969",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "2219720",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IS": {
                            "intensity": 0.067548,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "352",
                                            "area": "Iceland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0019",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "352",
                                            "area": "Iceland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "7679",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IE": {
                            "intensity": 0.059698,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.2677",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1224200",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.062743,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.2744",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1193930",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LV": {
                            "intensity": 0.066111,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0564",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "232900",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.063858,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.1326",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "566880",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NL": {
                            "intensity": 0.060164,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0508",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "230510",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NO": {
                            "intensity": 0.065857,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0977",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "405000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.062292,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.6505",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "2850870",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 0.070505,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0068",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "26330",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.062919,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.4604",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1997620",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.061208,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.1352",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "603020",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.062138,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.023",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "101050",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.073685,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1.0142",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "3757570",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SE": {
                            "intensity": 0.064492,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.2021",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "855500",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.060374,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "0.0364",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "164594",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GB": {
                            "intensity": 0.060454,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0115",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "1.5419",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "44",
                                            "item": "Barley",
                                            "year": "2023",
                                            "value": "6963000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "maize": {
                    "AT": {
                            "intensity": 0.050644,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.3191",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0148",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.5724",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "2105060",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BE": {
                            "intensity": 0.050784,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0785",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0037",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.1422",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "517490",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.064088,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.3947",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0374",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1.4435",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "2448780",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.054572,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.3074",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0188",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.7265",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1991270",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.053622,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.078",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0045",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.1738",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "507540",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DK": {
                            "intensity": 0.060243,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0065",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0005",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0203",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "40820",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.050847,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1.9474",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.092",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "3.5496",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "12834600",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.050987,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.6831",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0326",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1.2593",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "4498900",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.049672,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.2138",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0091",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.3525",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1416690",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.05325,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.9579",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0539",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "2.0809",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "6242410",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.04979,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.8075",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0349",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1.3458",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "5348700",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.053227,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.014",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0008",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0304",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "91330",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NL": {
                            "intensity": 0.050234,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.023",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.001",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.04",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "151930",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.055117,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1.3902",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0879",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "3.3902",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "8981890",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 0.050364,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.1161",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0053",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.2036",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "767210",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.067839,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1.4327",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.1537",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "5.9295",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "8744000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.053449,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.1698",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0097",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.3738",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "1105660",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.052153,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0594",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0031",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.1195",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "389030",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.048812,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.4261",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0168",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.6477",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "2835360",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SE": {
                            "intensity": 0.052586,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0024",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0001",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0053",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "15700",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.052423,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0207",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0011",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0112",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "0.0423",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "56",
                                            "item": "Maize (corn)",
                                            "year": "2023",
                                            "value": "135314",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "millet": {
                    "CH": {
                            "intensity": 0.049013,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0118",
                                            "item": "Millet",
                                            "year": "2023",
                                            "value": "0.0002",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "79",
                                            "item": "Millet",
                                            "year": "2023",
                                            "value": "1114",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "oats": {
                    "AT": {
                            "intensity": 0.055161,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0122",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "60380",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BE": {
                            "intensity": 0.054886,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0023",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "11440",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.059845,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0068",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "31020",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.058426,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0073",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "34110",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CY": {
                            "intensity": 0.0546,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0001",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "500",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.057781,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0251",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "118590",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DK": {
                            "intensity": 0.05418,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0413",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "208100",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "EE": {
                            "intensity": 0.0609,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.018",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "80690",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FI": {
                            "intensity": 0.054909,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.2051",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "1019720",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.052926,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0654",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "337340",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.055808,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0924",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "452000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.078519,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0199",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "69190",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.058133,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0129",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "60580",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IE": {
                            "intensity": 0.046032,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0329",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "195120",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.060986,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0517",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "231430",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LV": {
                            "intensity": 0.062151,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0456",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "200300",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.062125,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0443",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "194670",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NL": {
                            "intensity": 0.05554,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0013",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "6390",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NO": {
                            "intensity": 0.058718,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0385",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "179000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.056672,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.3121",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "1503440",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 0.0971,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0052",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "14620",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.062973,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0358",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "155200",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.061771,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0046",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "20330",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.054382,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0005",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "2510",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.082816,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.1408",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "464140",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SE": {
                            "intensity": 0.056988,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0859",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "411500",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.052911,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.0025",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "12899",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GB": {
                            "intensity": 0.05164,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0117",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "0.157",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "75",
                                            "item": "Oats",
                                            "year": "2023",
                                            "value": "830000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "potatoes": {
                    "AT": {
                            "intensity": 0.009191,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.02",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "594040",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BE": {
                            "intensity": 0.007955,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.1172",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "4021930",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.011905,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0052",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "119240",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.011674,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0054",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "126280",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CY": {
                            "intensity": 0.01124,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0033",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "80150",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.009373,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0197",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "573770",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DK": {
                            "intensity": 0.007773,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0785",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "2757200",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "EE": {
                            "intensity": 0.009639,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0028",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "79300",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FI": {
                            "intensity": 0.008989,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0164",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "498100",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.007946,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.2505",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "8606490",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.007844,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.3335",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "11607300",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.009272,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0105",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "309140",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.009362,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0072",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "209950",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IS": {
                            "intensity": 0.011222,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "352",
                                            "area": "Iceland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0003",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "352",
                                            "area": "Iceland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "7298",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IE": {
                            "intensity": 0.008134,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0096",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "322200",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.00932,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0432",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "1265450",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LV": {
                            "intensity": 0.01129,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0061",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "147500",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.011438,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0112",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "267330",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NL": {
                            "intensity": 0.007969,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.1895",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "6491890",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NO": {
                            "intensity": 0.009405,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0108",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "313500",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.009064,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.1856",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "5590030",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 0.010245,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0122",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "325080",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.012803,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0555",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "1183470",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.009851,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0049",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "135790",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.009952,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0025",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "68580",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.00875,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0616",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "1921850",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SE": {
                            "intensity": 0.008392,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0249",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "810000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.008653,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.0114",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "359654",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GB": {
                            "intensity": 0.008033,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "01510",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "0.1384",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "116",
                                            "item": "Potatoes",
                                            "year": "2023",
                                            "value": "4703724",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "rice": {
                    "BG": {
                            "intensity": 1.386682,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0137",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0004",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0166",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "3.136",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "64160",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 2.483343,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0146",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0005",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.018",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "6.1085",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "68270",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 2.034754,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0385",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0011",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.041",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "13.9104",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "190440",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 2.207143,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0021",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0001",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0035",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.6552",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "8330",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 2.138914,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.2828",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0081",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.3122",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "105.961",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "1378640",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 2.190366,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0369",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0011",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0415",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "14.0818",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "178830",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 1.593405,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0027",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0001",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0036",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.6804",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "12070",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 2.310672,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0701",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0021",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "0.0819",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72255",
                                            "element": "Rice cultivation (Emissions CH4)",
                                            "item_code_cpc": "0113",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "27.7805",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "27",
                                            "item": "Rice",
                                            "year": "2023",
                                            "value": "334100",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "rye": {
                    "AT": {
                            "intensity": 0.05376,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0348",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "176720",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BE": {
                            "intensity": 0.054194,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0008",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "4030",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.063315,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0034",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "14660",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.058424,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0011",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "5140",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.053092,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0243",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "124950",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DK": {
                            "intensity": 0.052545,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.1157",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "601130",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "EE": {
                            "intensity": 0.055651,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0126",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "61810",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FI": {
                            "intensity": 0.055805,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0188",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "91970",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.054175,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0334",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "168310",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.053172,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.6085",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "3124200",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.062919,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0036",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "15620",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.056839,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0196",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "94140",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.05729,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0023",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "10960",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LV": {
                            "intensity": 0.056744,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0217",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "104400",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.060548,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0147",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "66280",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NL": {
                            "intensity": 0.05579,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0015",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "7340",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NO": {
                            "intensity": 0.056483,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.006",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "29000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.056007,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.5197",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "2533220",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 0.083857,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0036",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "11720",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.058124,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0063",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "29590",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.056568,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0073",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "35230",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.052071,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0007",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "3670",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.069162,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0309",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "121970",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SE": {
                            "intensity": 0.052877,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.027",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "139400",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.052789,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.002",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "10343",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GB": {
                            "intensity": 0.054438,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0116",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "0.0366",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "71",
                                            "item": "Rye",
                                            "year": "2023",
                                            "value": "183543",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "sorghum": {
                    "AT": {
                            "intensity": 0.044444,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0061",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "37470",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.05881,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0019",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "8820",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.046789,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0521",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "303990",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.054095,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0015",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "7570",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.047937,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0281",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "160030",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.046056,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0417",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "247180",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.055178,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0042",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "20780",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.050077,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0031",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "16900",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.0,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "80",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.048719,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0114",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "0.0056",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "83",
                                            "item": "Sorghum",
                                            "year": "2023",
                                            "value": "31380",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "soybean": {
                    "AT": {
                            "intensity": 0.065629,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0661",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "274960",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.085453,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0019",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "6070",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.068051,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0531",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "213020",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.071491,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0166",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "63390",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.070886,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.1007",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "387820",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.067298,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0318",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "129000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.215526,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0006",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "760",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.066474,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0422",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "173310",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.063247,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.2539",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "1095940",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.095789,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0006",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "1710",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.069658,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.012",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "47030",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.073101,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0859",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "320800",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.069067,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0336",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "132810",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.069289,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.002",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "7880",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.064068,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0018",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "7670",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.074644,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0141",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "0.0019",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": null,
                                    "burning_ch4": null,
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "236",
                                            "item": "Soya beans",
                                            "year": "2023",
                                            "value": "6949",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            },
            "wheat": {
                    "AT": {
                            "intensity": 0.070865,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.4149",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0079",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.3045",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "040",
                                            "area": "Austria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1744820",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BE": {
                            "intensity": 0.06842,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.4202",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.006",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.2296",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "056",
                                            "area": "Belgium",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1791170",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "BG": {
                            "intensity": 0.071807,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.6384",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0342",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.3186",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "100",
                                            "area": "Bulgaria",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "6854760",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HR": {
                            "intensity": 0.073456,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.2012",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0048",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1867",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "191",
                                            "area": "Croatia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "834230",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CY": {
                            "intensity": 0.086538,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0072",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0004",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0137",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "196",
                                            "area": "Cyprus",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "28250",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CZ": {
                            "intensity": 0.07051,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.2489",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0229",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.8832",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "203",
                                            "area": "Czechia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "5262360",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DK": {
                            "intensity": 0.069491,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.8393",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0137",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.5281",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "208",
                                            "area": "Denmark",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "3556260",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "EE": {
                            "intensity": 0.075925,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1696",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0049",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1875",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "233",
                                            "area": "Estonia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "694120",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FI": {
                            "intensity": 0.079082,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1861",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0064",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.2475",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "246",
                                            "area": "Finland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "749030",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "FR": {
                            "intensity": 0.069566,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "8.4985",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.14",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "5.3981",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "250",
                                            "area": "France",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "35995570",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "DE": {
                            "intensity": 0.069319,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "5.0777",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0811",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "3.1296",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "276",
                                            "area": "Germany",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "21535900",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GR": {
                            "intensity": 0.0812,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.3289",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0126",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.4843",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "300",
                                            "area": "Greece",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1309180",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "HU": {
                            "intensity": 0.071755,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.4198",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0295",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.1374",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "348",
                                            "area": "Hungary",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "5941990",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IE": {
                            "intensity": 0.06835,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1134",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0016",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0602",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "372",
                                            "area": "Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "483110",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "IT": {
                            "intensity": 0.077103,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.6954",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0523",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2.017",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "380",
                                            "area": "Italy",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "6894470",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LV": {
                            "intensity": 0.07567,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.5215",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0147",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.567",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "428",
                                            "area": "Latvia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2136800",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "LT": {
                            "intensity": 0.073684,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.0758",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0263",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.0155",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "440",
                                            "area": "Lithuania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "4455390",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NL": {
                            "intensity": 0.068382,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.2573",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0036",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1399",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "528",
                                            "area": "Netherlands (Kingdom of the)",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1096820",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "NO": {
                            "intensity": 0.082985,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0436",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0018",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0696",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "578",
                                            "area": "Norway",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "172000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PL": {
                            "intensity": 0.072451,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "3.1019",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0686",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2.6453",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "616",
                                            "area": "Poland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "12932390",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "PT": {
                            "intensity": 0.102685,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0097",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0007",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0267",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "620",
                                            "area": "Portugal",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "34670",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "RO": {
                            "intensity": 0.075385,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2.3451",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0649",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2.5031",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "642",
                                            "area": "Romania",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "9624070",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SK": {
                            "intensity": 0.070968,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.5926",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0114",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.4393",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "703",
                                            "area": "Slovakia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2490600",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SI": {
                            "intensity": 0.072964,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.035",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0008",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.031",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "705",
                                            "area": "Slovenia",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "145420",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "ES": {
                            "intensity": 0.089239,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.0597",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0548",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2.1144",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "724",
                                            "area": "Spain",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "4049230",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "SE": {
                            "intensity": 0.072102,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.6627",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0142",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.5481",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "752",
                                            "area": "Sweden",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "2768200",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "CH": {
                            "intensity": 0.072725,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.1075",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0024",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.094",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "756",
                                            "area": "Switzerland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "447449",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    },
                    "GB": {
                            "intensity": 0.068662,
                            "source_rows": {
                                    "crop_residues_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72302",
                                            "element": "Crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "3.2842",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_n2o": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72307",
                                            "element": "Burning crop residues (Emissions N2O)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "0.0482",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "burning_ch4": {
                                            "file": "faostat_gce_europe_merged.csv",
                                            "domain_code": "GCE",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "72257",
                                            "element": "Burning crop residues (Emissions CH4)",
                                            "item_code_cpc": "0111",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "1.8576",
                                            "unit": "kt",
                                            "flag": "E"
                                    },
                                    "rice_ch4": null,
                                    "production": {
                                            "file": "FAOSTAT_data_en_9-14-2026__1_.csv",
                                            "domain_code": "QCL",
                                            "area_code_m49": "826",
                                            "area": "United Kingdom of Great Britain and Northern Ireland",
                                            "element_code": "5510",
                                            "element": "Production",
                                            "item_code_fao": "15",
                                            "item": "Wheat",
                                            "year": "2023",
                                            "value": "13980000",
                                            "unit": "t",
                                            "flag": "A"
                                    }
                            }
                    }
            }
    }
};