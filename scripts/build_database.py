"""
AIOXY PEF 3.1 DATABASE BUILDER
Version: 3 — Final Clean Build
Auditor: Claude (Anthropic)
Builder: SnapfizzIntelligence

Place all 8 source files in the SAME folder as this script, then run:
    python aioxy_pef31_builder.py

Output: aioxy_pef3.1_database.js (ready for browser use)
"""

import pandas as pd
import json
import os
from pathlib import Path
from collections import defaultdict

OUTPUT_FILE = "aioxy_pef3.1_database.js"

def write_js_object(name, data_dict):
    js  = "window.aioxyData = window.aioxyData || {};\n"
    js += f"window.aioxyData.{name} = "
    js += json.dumps(data_dict, indent=2, ensure_ascii=False)
    js += ";\n\n"
    return js


# ================================================================
# DATABASE 1 — PEF Normalization & Weighting Factors
# File : Normalisation_Weighting_Factors_EF_3_1.xlsx
# Sheet: NFs EF3.1  — header row 5, col B = category, col D = NF
# Sheet: WFs        — header row 5, col B = category, col C = WF %
# ================================================================
def build_pef_factors(base_path):
    print("[1/7] Building pef_factors...")
    fp = base_path / "Normalisation_Weighting_Factors_EF_3_1.xlsx"

    df_nf = pd.read_excel(fp, sheet_name="NFs EF3.1", header=4)
    nf_data = {}
    for _, row in df_nf.iterrows():
        cat = row.iloc[1]
        val = row.iloc[3]
        if pd.notna(cat) and pd.notna(val):
            nf_data[str(cat).strip().rstrip("*").strip()] = float(val)

    df_wf = pd.read_excel(fp, sheet_name="WFs", header=4)
    wf_data = {}
    for _, row in df_wf.iterrows():
        cat = row.iloc[1]
        val = row.iloc[2]
        if pd.notna(cat) and pd.notna(val):
            wf_data[str(cat).strip()] = round(float(val) / 100.0, 8)

    assert set(nf_data.keys()) == set(wf_data.keys()), \
        f"NF/WF key mismatch: {set(nf_data.keys()) ^ set(wf_data.keys())}"

    print(f"   ✓ {len(nf_data)} impact categories — NF/WF keys aligned")
    return {
        "normalization_factors": nf_data,
        "weighting_factors":     wf_data,
        "global_population":     6895889018,
        "version":               "EF 3.1",
        "source":                "European Commission Joint Research Centre"
    }


# ================================================================
# DATABASE 2 — ILCD UUID Registry
# File : EF-LCIAMethod_CF_EF-v3_1_.csv
# Header row 1. Col A = UUID, Col B = name.
# Sub-variants (-Biogenic, -Fossil, _organics, _inorganics) skipped.
# Reference units hardcoded from EF 3.1 specification.
# ================================================================
def build_ilcd_registry(base_path):
    print("[2/7] Building ilcd_registry...")
    fp = base_path / "EF-LCIAMethod_CF_EF-v3_1_.csv"
    df = pd.read_csv(fp)

    UNITS = {
        "Acidification":                           "mol H+ eq",
        "Climate change":                          "kg CO2 eq",
        "Ecotoxicity, freshwater":                 "CTUe",
        "EF-particulate matter":                   "disease incidences",
        "Eutrophication, freshwater":              "kg P eq",
        "Eutrophication, marine":                  "kg N eq",
        "Eutrophication, terrestrial":             "mol N eq",
        "Human toxicity, cancer":                  "CTUh",
        "Human toxicity, non-cancer":              "CTUh",
        "Ionising radiation":                      "kBq U-235 eq",
        "Land use":                                "pt",
        "Ozone depletion":                         "kg CFC-11 eq",
        "Photochemical ozone formation":           "kg NMVOC eq",
        "Resource depletion, fossils":             "MJ",
        "Resource depletion, minerals and metals": "kg Sb eq",
        "Water use":                               "m3 world eq",
    }

    # Exact name in CSV → standard PEF 3.1 name
    NAME_MAP = {
        "Acidification":                               "Acidification",
        "Climate change":                              "Climate change",
        "Ecotoxicity, freshwater":                     "Ecotoxicity, freshwater",
        "EF-particulate matter":                       "EF-particulate matter",
        "Eutrophication marine":                       "Eutrophication, marine",
        "Eutrophication, freshwater":                  "Eutrophication, freshwater",
        "Eutrophication, terrestrial":                 "Eutrophication, terrestrial",
        "Human toxicity, cancer":                      "Human toxicity, cancer",
        "Human toxicity, non-cancer":                  "Human toxicity, non-cancer",
        "Ionising radiation, human health":            "Ionising radiation",
        "Land use":                                    "Land use",
        "Ozone depletion":                             "Ozone depletion",
        "Photochemical ozone formation - human health":"Photochemical ozone formation",
        "Resource use, fossils":                       "Resource depletion, fossils",
        "Resource use, minerals and metals":           "Resource depletion, minerals and metals",
        "Water use":                                   "Water use",
    }

    SKIP = ["-Biogenic", "-Fossil", "-Land use", "_inorganics", "_organics"]

    registry = {}
    for _, row in df.iterrows():
        name = str(row.iloc[1]).strip() if pd.notna(row.iloc[1]) else ""
        if any(s in name for s in SKIP):
            continue
        std = NAME_MAP.get(name)
        if not std:
            continue
        registry[std] = {
            "uuid": str(row.iloc[0]).strip(),
            "name": name,
            "unit": UNITS[std],
        }

    assert len(registry) == 16, f"Expected 16 categories, got {len(registry)}"
    print(f"   ✓ 16/16 categories — all UUIDs mapped")
    return registry


# ================================================================
# DATABASE 3 — AIB 2024 Residual Mix CO2
# File : 2024_Final__Residual_mix_calculation_results_30052025_v1.xlsx
# Sheet: CO2 — header row 1
# Col A = Country code (2-letter ISO), Col C = Residual mix CO2 [g CO2/kWh]
# ================================================================
def build_residual_mix(base_path):
    print("[3/7] Building residual_mix...")
    matches = list(base_path.glob("*Residual_mix_calculation*.xlsx"))
    if not matches:
        raise FileNotFoundError("Residual mix file not found")

    df = pd.read_excel(matches[0], sheet_name="CO2", header=0)
    co2_factors = {}
    for _, row in df.iterrows():
        country = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else None
        co2     = row.iloc[2]
        if country and country not in ["nan", "Country code", ""] and pd.notna(co2):
            try:
                co2_factors[country] = round(float(co2), 6)
            except (ValueError, TypeError):
                pass

    print(f"   ✓ {len(co2_factors)} European countries")
    return {
        "co2_factors": co2_factors,
        "source":      "AIB 2024 European Residual Mixes",
        "unit":        "g CO2/kWh",
        "year":        2024,
    }


# ================================================================
# DATABASE 4 — LANCA Soil Quality Index
# File : N-379310-1.xlsx
# Sheet: SQI Occupation       — header row 2 (header=1)
# Sheet: SQI Transformation to — header row 2 (header=1)
# Filter: Indicator = "Total", Land Use Type = "unspecified"
# Countries start at column F (index 5)
# ================================================================
def build_lanca_sqi(base_path):
    print("[4/7] Building lanca_sqi...")
    fp = base_path / "N-379310-1.xlsx"

    def parse_sheet(sheet_name):
        df   = pd.read_excel(fp, sheet_name=sheet_name, header=1)
        mask = (df["Indicator"] == "Total") & (df["Land Use Type"] == "unspecified")
        rows = df[mask]
        if len(rows) == 0:
            raise ValueError(f"No Total/unspecified row in sheet '{sheet_name}'")
        row    = rows.iloc[0]
        result = {}
        for i in range(5, len(df.columns)):
            country = str(df.columns[i]).strip()
            value   = row.iloc[i]
            if pd.notna(value) and country not in ["nan", ""]:
                try:
                    result[country] = round(float(value), 6)
                except (ValueError, TypeError):
                    pass
        return result

    occ   = parse_sheet("SQI Occupation")
    trans = parse_sheet("SQI Transformation to")

    print(f"   ✓ Occupation: {len(occ)} countries | Transformation: {len(trans)} countries")
    return {
        "occupation":     occ,
        "transformation": trans,
        "indicator":      "Soil Quality Index — Total, unspecified land use",
        "source":         "LANCA v2.5 — Fraunhofer IBP / European Commission JRC",
        "version":        "EF 3.1",
    }


# ================================================================
# DATABASE 5 — FAOSTAT Crop & Livestock Yields
# File : FAOSTAT_data_en_4-19-2026__3_.csv  (use latest file only)
# Header row 1. Filter: Element IN ['Yield', 'Yield/Carcass Weight']
# 5-year average (2020-2024) per crop per country
# Country names normalized to short standard names
# ================================================================
def build_crop_yields(base_path):
    print("[5/7] Building crop_yields...")

    # Use only the most recent FAOSTAT file (highest suffix number)
    faostat_files = sorted(base_path.glob("FAOSTAT_data_en_*.csv"))
    if not faostat_files:
        raise FileNotFoundError("No FAOSTAT file found")
    fp = faostat_files[-1]          # last = most recent by filename sort
    df = pd.read_csv(fp, encoding="utf-8")
    print(f"   Using: {fp.name} ({len(df)} rows)")

    # Accept both crop and livestock yield elements
    df = df[df["Element"].isin(["Yield", "Yield/Carcass Weight"])].copy()

    # Normalize long FAOSTAT country names → short standard names
    COUNTRY_MAP = {
        "Netherlands (Kingdom of the)":                         "Netherlands",
        "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
        "Türkiye":                                              "Turkey",
        "Iran (Islamic Republic of)":                           "Iran",
        "Republic of Korea":                                    "South Korea",
        "Viet Nam":                                             "Vietnam",
        "United States of America":                             "USA",
        "Russian Federation":                                   "Russia",
        "Czechia":                                              "Czech Republic",
        "Bolivia (Plurinational State of)":                     "Bolivia",
        "Venezuela (Bolivarian Republic of)":                   "Venezuela",
        "Tanzania, United Republic of":                         "Tanzania",
        "Côte d'Ivoire":                                        "Ivory Coast",
        "Congo, Democratic Republic of the":                    "DR Congo",
        "China, mainland":                                      "China",
    }
    df["Area"] = df["Area"].replace(COUNTRY_MAP)

    # Build year-value lists per country-crop
    ybc = defaultdict(lambda: defaultdict(list))
    for _, row in df.iterrows():
        if pd.notna(row["Value"]):
            ybc[str(row["Area"]).strip()][str(row["Item"]).strip().lower()].append(
                (int(row["Year"]), float(row["Value"]))
            )

    # 5-year average (most recent 5 years available per crop)
    avg_yields = {}
    for country, crops in ybc.items():
        avg_yields[country] = {}
        for crop, yv in crops.items():
            yv.sort(key=lambda x: x[0], reverse=True)
            vals = [v for _, v in yv[:5]]
            avg_yields[country][crop] = round(sum(vals) / len(vals), 2)

    total_pairs = sum(len(v) for v in avg_yields.values())
    print(f"   ✓ {len(avg_yields)} countries | {total_pairs} crop-country pairs | 2020-2024")
    return {
        "yields":    avg_yields,
        "source":    "FAOSTAT — Crops and Livestock Products",
        "years":     "2020-2024 (5-year average per crop)",
        "unit":      "kg/ha",
        "elements":  ["Yield", "Yield/Carcass Weight"],
    }


# ================================================================
# DATABASE 6 — AWARE 2.0 Water Scarcity
# File : AWARE20_Countries_and_Regions.xlsx
# Sheet: CFs_agri — header row 1
# Col D (index 3): GLAM_country_name
# Col I (index 8): Annual CF [m3 world eq / m3]
# "NotDefined" values excluded (country has insufficient water data)
# ================================================================
def build_aware(base_path):
    print("[6/7] Building aware_20...")
    fp = base_path / "AWARE20_Countries_and_Regions.xlsx"
    df = pd.read_excel(fp, sheet_name="CFs_agri", header=0)

    aware_data  = {}
    not_defined = 0
    for _, row in df.iterrows():
        country = str(row.iloc[3]).strip() if pd.notna(row.iloc[3]) else None
        cf      = row.iloc[8]
        if not country or country in ["nan", ""]:
            continue
        try:
            aware_data[country] = round(float(cf), 6)
        except (ValueError, TypeError):
            not_defined += 1

    print(f"   ✓ {len(aware_data)} countries | {not_defined} excluded (NotDefined annual CF)")
    return {
        "agricultural": aware_data,
        "source":       "AWARE 2.0 — WULCA consensus model",
        "unit":         "m3 world eq / m3",
        "sheet":        "CFs_agri — annual characterization factors",
    }


# ================================================================
# DATABASE 7 — USEtox 2.14 Human Toxicity + Ecotoxicity
# File 1: USEtox_results_organics.csv
#   4 merged header rows → skiprows=4, data from row 5
#   Col B  (index 1):  CAS RN
#   Col Y  (index 24): Cancer CTUh      — cont. agric. soil, Midpoint
#   Col Z  (index 25): Non-cancer CTUh  — cont. agric. soil, Midpoint
# File 2: USEtox_results_organics__1_.csv
#   4 merged header rows → skiprows=4, data from row 5
#   Col B  (index 1):  CAS RN
#   Col K  (index 10): Freshwater Ecotox CTUe — Em.agr.soilC, Midpoint
# ================================================================
def build_usetox(base_path):
    print("[7/7] Building usetox...")

    human_fp = base_path / "USEtox_results_organics.csv"
    eco_fp   = base_path / "USEtox_results_organics__1_.csv"

    # Human toxicity
    df_h = pd.read_csv(human_fp, header=None, skiprows=4)
    print(f"   Cancer non-null:     {df_h.iloc[:,24].notna().sum()}/{len(df_h)}")
    print(f"   Non-cancer non-null: {df_h.iloc[:,25].notna().sum()}/{len(df_h)}")

    human_tox = {}
    for _, row in df_h.iterrows():
        cas = str(row.iloc[1]).strip() if pd.notna(row.iloc[1]) else None
        if not cas or cas in ["nan", "CAS", ""]:
            continue
        human_tox[cas] = {
            "cancer_CTUh_per_kg":    float(row.iloc[24]) if pd.notna(row.iloc[24]) else 0.0,
            "noncancer_CTUh_per_kg": float(row.iloc[25]) if pd.notna(row.iloc[25]) else 0.0,
        }

    # Freshwater ecotoxicity
    df_e = pd.read_csv(eco_fp, header=None, skiprows=4)
    print(f"   Ecotox non-null:     {df_e.iloc[:,10].notna().sum()}/{len(df_e)}")

    ecotox = {}
    for _, row in df_e.iterrows():
        cas = str(row.iloc[1]).strip() if pd.notna(row.iloc[1]) else None
        if not cas or cas in ["nan", "CAS", ""]:
            continue
        ecotox[cas] = float(row.iloc[10]) if pd.notna(row.iloc[10]) else 0.0

    print(f"   ✓ Human tox: {len(human_tox)} | Ecotox: {len(ecotox)} substances")
    return {
        "human_toxicity": human_tox,
        "ecotoxicity":    ecotox,
        "compartment":    "Emission to continental agricultural soil",
        "source":         "USEtox 2.14",
        "version":        "EF 3.1",
    }


# ================================================================
# MAIN
# ================================================================
def main():
    print("=" * 60)
    print("AIOXY PEF 3.1 DATABASE BUILDER — v3 Final")
    print("=" * 60)

    base_path = Path(__file__).parent   # same folder as this script

    all_data = {
        "pef_factors":   build_pef_factors(base_path),
        "ilcd_registry": build_ilcd_registry(base_path),
        "residual_mix":  build_residual_mix(base_path),
        "lanca_sqi":     build_lanca_sqi(base_path),
        "crop_yields":   build_crop_yields(base_path),
        "aware_20":      build_aware(base_path),
        "usetox":        build_usetox(base_path),
    }

    out_path = base_path / OUTPUT_FILE
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("// AIOXY PEF 3.1 DATABASE — ISO 14044 COMPLIANT\n")
        f.write(f"// Built: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("// Sources: EC JRC | AIB 2024 | LANCA v2.5 | FAOSTAT | AWARE 2.0 | USEtox 2.14\n")
        f.write("// Builder: SnapfizzIntelligence | Auditor: Claude\n")
        f.write("// " + "=" * 54 + "\n\n")
        for name, data in all_data.items():
            f.write(write_js_object(name, data))

    size_kb = os.path.getsize(out_path) / 1024
    print(f"\n{'=' * 60}")
    print(f"✅  {OUTPUT_FILE}")
    print(f"    Size    : {size_kb:.1f} KB")
    print(f"    Databases: {len(all_data)}/7")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
