#!/usr/bin/env python3
"""
build_aioxy_derived_db.py
AIOXY LCA Platform — Derived Database Builder
Outputs: aioxy_derived_db.js
Build date: auto

Data sources:
  - CIQUAL 2020 (ANSES, CC BY 4.0)
  - USDA SR Legacy (CC0)
  - World Bank CMO Annual Prices
  - Tacon & Metian (2008), Aquaculture 285:146-158
  - Fry et al. (2018), Environ. Res. Lett. 13:024017
"""

import pandas as pd
import json
import re
import os
from datetime import date

# ─────────────────────────────────────────────────────────────
# PATHS — all relative to repo root, matching GitHub structure:
#   raw_data/
#     Table_Ciqual_2020_FR_2020_07_07.xls
#     food.csv
#     food_nutrient.csv   (tab-separated)
#     nutrient.csv
#     CMO-Historical-Data-Annual.xlsx
#     ingredients_dbjs.txt
#     ingredients.txt
#   aioxy_derived_db.js   (output)
# ─────────────────────────────────────────────────────────────
RAW          = "raw_data"
CIQUAL_XLS   = os.path.join(RAW, "Table_Ciqual_2020_FR_2020_07_07.xls")
FOOD_CSV     = os.path.join(RAW, "food.csv")
NUTRIENT_CSV = os.path.join(RAW, "food_nutrient.csv")
CMO_XLSX     = os.path.join(RAW, "CMO-Historical-Data-Annual.xlsx")
INGR_DB      = os.path.join(RAW, "ingredients_dbjs.txt")
INGR_SYN     = os.path.join(RAW, "ingredients.txt")
OUT_JS       = "aioxy_derived_db.js"

BUILD_DATE = str(date.today())

# ─────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────

def parse_french_float(val):
    """Convert French decimal notation (12,5) or dash (-) to float or None."""
    if val is None:
        return None
    s = str(val).strip()
    if s in ("-", "", "traces", "Traces", "nan", "<0,01", "<0,1", "<0,5"):
        return None
    s = re.sub(r"[<>]", "", s)
    s = s.replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None

def js_val(v):
    """Render Python value as JS literal."""
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v) if isinstance(v, int) else f"{v}"
    escaped = str(v).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'

def word_overlap(a, b):
    """Fraction of words in shorter string that appear in longer string."""
    wa = set(re.findall(r'\w+', a.lower()))
    wb = set(re.findall(r'\w+', b.lower()))
    if not wa or not wb:
        return 0.0
    shorter = wa if len(wa) <= len(wb) else wb
    return len(wa & wb) / len(shorter)

def find_col(df, kw):
    """Fuzzy column finder — returns first column whose name contains kw."""
    for c in df.columns:
        if kw.lower() in c.lower():
            return c
    return None


# ─────────────────────────────────────────────────────────────
# NAMESPACE 1a: CIQUAL nutrition
# Reads the original .xls directly using xlrd (installed in CI)
# ─────────────────────────────────────────────────────────────
print("Loading CIQUAL...")
ciqual_raw = pd.read_excel(CIQUAL_XLS, engine="xlrd")

col_code    = "alim_code"
col_name    = "alim_nom_fr"
col_protein = find_col(ciqual_raw, "Protéines, N x facteur de Jones")
col_fat     = find_col(ciqual_raw, "Lipides")
col_carbs   = find_col(ciqual_raw, "Glucides")

# Energy: prefer "Règlement UE" kcal column
energy_cols = [c for c in ciqual_raw.columns if "kcal" in c.lower()]
col_energy  = energy_cols[0] if energy_cols else find_col(ciqual_raw, "kcal")

print(f"  CIQUAL cols: protein='{col_protein}', energy='{col_energy}', fat='{col_fat}', carbs='{col_carbs}'")

ciqual_nutrition = {}
for _, row in ciqual_raw.iterrows():
    code = row.get(col_code)
    if pd.isna(code):
        continue
    code = str(int(float(code))) if str(code).replace(".0", "").isdigit() else str(code).strip()
    name    = str(row.get(col_name, "")).strip()
    protein = parse_french_float(row.get(col_protein))
    energy  = parse_french_float(row.get(col_energy))
    fat     = parse_french_float(row.get(col_fat))
    carbs   = parse_french_float(row.get(col_carbs))
    key = f"ciqual-{code}"
    ciqual_nutrition[key] = {
        "carbs_g_per_100g":    carbs,
        "energy_kcal_per_100g": energy,
        "fat_g_per_100g":      fat,
        "food_name_fr":        name,
        "protein_g_per_100g":  protein,
        "source":              "CIQUAL 2020, CC BY 4.0"
    }

print(f"  → {len(ciqual_nutrition)} CIQUAL foods loaded")


# ─────────────────────────────────────────────────────────────
# NAMESPACE 1b: USDA nutrition
# ─────────────────────────────────────────────────────────────
print("Loading USDA...")
food_df = pd.read_csv(FOOD_CSV, usecols=["fdc_id", "description"], low_memory=False)
food_df["fdc_id"] = food_df["fdc_id"].astype(str)

# food_nutrient.csv is TAB-separated
nutrient_df = pd.read_csv(NUTRIENT_CSV, sep="\t", low_memory=False,
                          usecols=["fdc_id", "nutrient_id", "amount"])
nutrient_df["fdc_id"] = nutrient_df["fdc_id"].astype(str)

# nutrient_id 1003 = protein (g/100g)
protein_df = nutrient_df[nutrient_df["nutrient_id"] == 1003][["fdc_id", "amount"]].copy()
protein_df.rename(columns={"amount": "protein_g_per_100g"}, inplace=True)

usda_df = food_df.merge(protein_df, on="fdc_id", how="left")

usda_nutrition = {}
for _, row in usda_df.iterrows():
    fdc = str(row["fdc_id"])
    key = f"usda-{fdc}"
    prot = None if pd.isna(row.get("protein_g_per_100g")) else float(row["protein_g_per_100g"])
    usda_nutrition[key] = {
        "fdc_id":             int(fdc) if fdc.isdigit() else fdc,
        "food_name_en":       str(row["description"]),
        "protein_g_per_100g": prot,
        "source":             "USDA SR Legacy, CC0"
    }

print(f"  → {len(usda_nutrition)} USDA foods loaded")


# ─────────────────────────────────────────────────────────────
# NAMESPACE 1c: Match AIOXY ingredients → CIQUAL / USDA
# ─────────────────────────────────────────────────────────────
print("Matching AIOXY ingredients...")

def parse_ingredient_file(filepath):
    """Extract ingredient keys and name/ciqual_code fields from JS-like text."""
    ingredients = {}
    with open(filepath, encoding="utf-8", errors="replace") as f:
        text = f.read()
    key_pattern    = re.compile(r'"([a-zA-Z0-9_\-\.]+)":\s*\{', re.MULTILINE)
    name_pattern   = re.compile(r'"name"\s*:\s*"([^"]*)"')
    ciqual_pattern = re.compile(r'ciqual[_\-]?(\d{4,5})', re.IGNORECASE)
    keys = list(key_pattern.finditer(text))
    for i, m in enumerate(keys):
        key   = m.group(1)
        start = m.end()
        end   = keys[i + 1].start() if i + 1 < len(keys) else len(text)
        block = text[start:end]
        name_m     = name_pattern.search(block)
        name       = name_m.group(1) if name_m else ""
        ciqual_m   = ciqual_pattern.search(key + block)
        ciqual_code = ciqual_m.group(1) if ciqual_m else None
        ingredients[key] = {"name": name, "ciqual_code": ciqual_code}
    return ingredients

ingr_db  = parse_ingredient_file(INGR_DB)
ingr_syn = parse_ingredient_file(INGR_SYN)
all_ingr = {**ingr_db, **ingr_syn}

# Pre-build USDA description list for fuzzy matching
usda_desc_list = [(k, v["food_name_en"]) for k, v in usda_nutrition.items()]

matched_nutrition = {}
n_matched   = 0
n_unmatched = 0

for ing_key, ing_data in all_ingr.items():
    ciqual_code = ing_data.get("ciqual_code")
    name        = ing_data.get("name", "")

    # 1. Direct CIQUAL match
    if ciqual_code:
        cq_key = f"ciqual-{ciqual_code}"
        if cq_key in ciqual_nutrition:
            entry = dict(ciqual_nutrition[cq_key])
            entry["ingredient_key"]  = ing_key
            entry["ingredient_name"] = name
            matched_nutrition[ing_key] = entry
            n_matched += 1
            continue

    # 2. Fuzzy USDA match
    if name:
        best_score = 0.0
        best_key   = None
        best_desc  = None
        for uk, udesc in usda_desc_list:
            score = word_overlap(name, udesc)
            if score > best_score:
                best_score = score
                best_key   = uk
                best_desc  = udesc

        if best_score > 0.5:
            confidence = "high"
        elif best_score > 0.3:
            confidence = "medium"
        else:
            n_unmatched += 1
            continue

        usda_entry = usda_nutrition[best_key]
        matched_nutrition[ing_key] = {
            "fdc_id":             usda_entry["fdc_id"],
            "food_name_en":       best_desc,
            "ingredient_name":    name,
            "match_confidence":   confidence,
            "protein_g_per_100g": usda_entry["protein_g_per_100g"],
            "source":             "USDA SR Legacy, CC0"
        }
        n_matched += 1
    else:
        n_unmatched += 1

print(f"  → {n_matched} AIOXY ingredients matched, {n_unmatched} unmatched")

# Merge all nutrition (AIOXY-matched keys override generic CIQUAL/USDA keys)
all_nutrition = {}
all_nutrition.update(ciqual_nutrition)
all_nutrition.update(usda_nutrition)
all_nutrition.update(matched_nutrition)


# ─────────────────────────────────────────────────────────────
# NAMESPACE 2: Aquaculture feeds
# FCR        → Fry et al. 2018, Table 1 (citing Tacon & Metian 2008)
# fishmeal % → Tacon & Metian 2008, Table 3 (global averages, 2006)
# fish oil % → Tacon & Metian 2008, Table 3 (global averages, 2006)
# ─────────────────────────────────────────────────────────────
aquaculture_feeds = {
    "farmed_fish": {
        "fcr":          1.70,
        "fish_oil_pct": 2.0,
        "fishmeal_pct": 20.0,
        "source": "Default marine fish proxy (Tacon & Metian 2008, Table 3 global avg)"
    },
    "salmon": {
        "fcr":          1.25,
        "fish_oil_pct": 20.0,
        "fishmeal_pct": 30.0,
        "source": "Tacon & Metian 2008, Table 3 (Salmo salar global avg 2006); FCR also Fry 2018, Table 1"
    },
    "sea_bass": {
        "fcr":          2.1,
        "fish_oil_pct": 14.0,
        "fishmeal_pct": 32.0,
        "source": "Tacon & Metian 2008, Table 3 (Dicentrarchus labrax cross-country mean FR/GR/TR/ES); UNCERTAIN — no single global mean; Marine finfish global avg FCR=1.9, FM=32%, FO=8%"
    },
    "sea_bream": {
        "fcr":          1.9,
        "fish_oil_pct": 11.0,
        "fishmeal_pct": 27.0,
        "source": "Tacon & Metian 2008, Table 3 (Sparus aurata cross-country mean FR/GR/TR/ES); UNCERTAIN — no single global mean"
    },
    "shrimp": {
        "fcr":          1.70,
        "fish_oil_pct": 2.0,
        "fishmeal_pct": 20.0,
        "source": "Tacon & Metian 2008, Table 3 (Penaeus spp. global avg 2006); FCR also Fry 2018, Table 1"
    },
    "trout": {
        "fcr":          1.25,
        "fish_oil_pct": 15.0,
        "fishmeal_pct": 30.0,
        "source": "Tacon & Metian 2008, Table 3 (Oncorhynchus mykiss global avg 2006); FCR also Fry 2018, Table 1"
    }
}


# ─────────────────────────────────────────────────────────────
# NAMESPACE 3: Commodity prices
# Sheet "Annual Prices (Nominal)", most recent complete year = 2024
# $/mt commodities → $/kg (÷1000) → €/kg (÷1.08, ECB 2024 avg)
# ─────────────────────────────────────────────────────────────
print("Loading commodity prices...")
cmo = pd.read_excel(CMO_XLSX, sheet_name="Annual Prices (Nominal)", header=6)

row2024 = cmo[cmo.iloc[:, 0].astype(str).str.contains(r"^2024", na=False)].iloc[0]

# (column_name_in_sheet, factor_to_get_per_kg)
# $/mt  → factor = 1/1000
# $/kg  → factor = 1.0
COMMODITY_MAP = {
    "beef":         ("Beef",          1.0),
    "chicken":      ("Chicken",       1.0),
    "fish_meal":    ("Fish meal",     1 / 1000),
    "maize":        ("Maize",         1 / 1000),
    "palm_oil":     ("Palm oil",      1 / 1000),
    "soybean_meal": ("Soybean meal",  1 / 1000),
    "soybeans":     ("Soybeans",      1 / 1000),
    "wheat":        ("Wheat, US SRW", 1 / 1000),
}

EUR_PER_USD = 1 / 1.08  # ECB 2024 average

def safe_price(val):
    try:
        v = float(str(val).replace(",", "").replace("\u2026", "").strip())
        return v if v > 0 else None
    except Exception:
        return None

commodity_prices = {}
for key in sorted(COMMODITY_MAP):
    col, factor = COMMODITY_MAP[key]
    usd_raw = safe_price(row2024.get(col))
    if usd_raw is None:
        commodity_prices[key] = {
            "price_eur_per_kg": None,
            "price_usd_per_kg": None,
            "year": 2024
        }
    else:
        usd_kg = round(usd_raw * factor, 6)
        eur_kg = round(usd_kg * EUR_PER_USD, 6)
        commodity_prices[key] = {
            "price_eur_per_kg": eur_kg,
            "price_usd_per_kg": usd_kg,
            "year": 2024
        }

print(f"  → {len(commodity_prices)} commodity prices extracted")


# ─────────────────────────────────────────────────────────────
# WRITE OUTPUT JS
# ─────────────────────────────────────────────────────────────
print("Writing output JS...")

n_ciqual = len(ciqual_nutrition)
n_usda   = len(usda_nutrition)
n_aioxy  = len(matched_nutrition)

# Ensure output directory exists (handles both repo-root and nested output paths)
out_dir = os.path.dirname(OUT_JS)
if out_dir:
    os.makedirs(out_dir, exist_ok=True)

with open(OUT_JS, "w", encoding="utf-8") as f:

    # ── Header comment ──
    f.write(f"""/**
 * aioxy_derived_db.js
 * AIOXY LCA Platform — Auto-generated derived database
 * Build date: {BUILD_DATE}
 *
 * Sources:
 *   nutrition.ciqual  → ANSES CIQUAL 2020, CC BY 4.0
 *   nutrition.usda    → USDA SR Legacy, CC0
 *   aquaculture_feeds → Tacon & Metian (2008) Aquaculture 285:146-158
 *                       Fry et al. (2018) Environ. Res. Lett. 13:024017
 *   commodity_prices  → World Bank CMO Annual Prices (Nominal), 2024
 *
 * Summary: {n_ciqual} CIQUAL foods, {n_usda} USDA foods,
 *          {n_aioxy} matched to AIOXY, {n_unmatched} unmatched,
 *          {len(aquaculture_feeds)} aquaculture species/categories,
 *          {len(commodity_prices)} commodity prices
 */

window.aioxyData = window.aioxyData || {{}};

""")

    # ── Namespace 1: nutrition ──
    f.write("// ─── NAMESPACE 1: nutrition ───────────────────────────────────\n")
    f.write("window.aioxyData.nutrition = {\n")
    sorted_nutr = sorted(all_nutrition.items())
    for i, (key, val) in enumerate(sorted_nutr):
        comma = "," if i < len(sorted_nutr) - 1 else ""
        f.write(f'  "{key}": {{\n')
        inner = sorted(val.items())
        for j, (k2, v2) in enumerate(inner):
            c2 = "," if j < len(inner) - 1 else ""
            f.write(f'    "{k2}": {js_val(v2)}{c2}\n')
        f.write(f'  }}{comma}\n')
    f.write("};\n\n")

    # ── Namespace 2: aquaculture_feeds ──
    f.write("// ─── NAMESPACE 2: aquaculture_feeds ──────────────────────────\n")
    f.write("window.aioxyData.aquaculture_feeds = {\n")
    sorted_aq = sorted(aquaculture_feeds.items())
    for i, (key, val) in enumerate(sorted_aq):
        comma = "," if i < len(sorted_aq) - 1 else ""
        f.write(f'  "{key}": {{\n')
        inner = sorted(val.items())
        for j, (k2, v2) in enumerate(inner):
            c2 = "," if j < len(inner) - 1 else ""
            f.write(f'    "{k2}": {js_val(v2)}{c2}\n')
        f.write(f'  }}{comma}\n')
    f.write("};\n\n")

    # ── Namespace 3: commodity_prices ──
    f.write("// ─── NAMESPACE 3: commodity_prices ───────────────────────────\n")
    f.write("window.aioxyData.commodity_prices = {\n")
    sorted_cp = sorted(commodity_prices.items())
    for i, (key, val) in enumerate(sorted_cp):
        comma = "," if i < len(sorted_cp) - 1 else ""
        f.write(f'  "{key}": {{\n')
        inner = sorted(val.items())
        for j, (k2, v2) in enumerate(inner):
            c2 = "," if j < len(inner) - 1 else ""
            f.write(f'    "{k2}": {js_val(v2)}{c2}\n')
        f.write(f'  }}{comma}\n')
    f.write("};\n")

print(f"\n✓ Output written to {OUT_JS}")
print(f"\nSUMMARY: {n_ciqual} CIQUAL foods, {n_usda} USDA foods, "
      f"{n_aioxy} matched to AIOXY, {n_unmatched} unmatched, "
      f"{len(aquaculture_feeds)} aquaculture species, "
      f"{len(commodity_prices)} commodity prices")
