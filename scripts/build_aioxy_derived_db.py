#!/usr/bin/env python3
"""
build_aioxy_derived_db.py
AIOXY LCA Platform — Derived Database Builder
Outputs: aioxy_derived_db.js
Build date: 2026-04-30

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
# PATHS
# ─────────────────────────────────────────────────────────────
RAW = "/mnt/user-data/uploads"
CIQUAL_CSV   = "/home/claude/Table_Ciqual_2020_FR_2020_07_07.csv"  # converted from XLS
FOOD_CSV     = os.path.join(RAW, "food.csv")
NUTRIENT_CSV = os.path.join(RAW, "food_nutrient.csv")
CMO_XLSX     = os.path.join(RAW, "CMO-Historical-Data-Annual.xlsx")
INGR_DB      = os.path.join(RAW, "ingredients_dbjs.txt")
INGR_SYN     = os.path.join(RAW, "ingredients.txt")
OUT_JS       = "/mnt/user-data/outputs/aioxy_derived_db.js"

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
    # Remove < > signs, take the number
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
        # avoid -0, format floats nicely
        return str(v) if isinstance(v, int) else f"{v}"
    # string
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


# ─────────────────────────────────────────────────────────────
# NAMESPACE 1a: CIQUAL nutrition
# ─────────────────────────────────────────────────────────────
print("Loading CIQUAL...")
ciqual_raw = pd.read_csv(CIQUAL_CSV, encoding="utf-8", low_memory=False)

# Identify columns (fuzzy)
def find_col(df, kw):
    for c in df.columns:
        if kw.lower() in c.lower():
            return c
    return None

col_code    = "alim_code"
col_name    = "alim_nom_fr"
col_protein = find_col(ciqual_raw, "Protéines, N x facteur de Jones")
col_energy  = find_col(ciqual_raw, "kcal/100 g)")
col_fat     = find_col(ciqual_raw, "Lipides")
col_carbs   = find_col(ciqual_raw, "Glucides")

# Energy: prefer "Règlement UE" kcal column
energy_cols = [c for c in ciqual_raw.columns if "kcal" in c.lower()]
if energy_cols:
    col_energy = energy_cols[0]

print(f"  CIQUAL cols: protein='{col_protein}', energy='{col_energy}', fat='{col_fat}', carbs='{col_carbs}'")

ciqual_nutrition = {}
for _, row in ciqual_raw.iterrows():
    code = row.get(col_code)
    if pd.isna(code):
        continue
    code = str(int(float(code))) if str(code).replace(".0","").isdigit() else str(code).strip()
    name = str(row.get(col_name, "")).strip()
    protein = parse_french_float(row.get(col_protein))
    energy  = parse_french_float(row.get(col_energy))
    fat     = parse_french_float(row.get(col_fat))
    carbs   = parse_french_float(row.get(col_carbs))
    key = f"ciqual-{code}"
    ciqual_nutrition[key] = {
        "protein_g_per_100g":  protein,
        "energy_kcal_per_100g": energy,
        "fat_g_per_100g":      fat,
        "carbs_g_per_100g":    carbs,
        "food_name_fr":        name,
        "source":              "CIQUAL 2020, CC BY 4.0"
    }

print(f"  → {len(ciqual_nutrition)} CIQUAL foods loaded")

# ─────────────────────────────────────────────────────────────
# NAMESPACE 1b: USDA nutrition
# ─────────────────────────────────────────────────────────────
print("Loading USDA...")
food_df = pd.read_csv(FOOD_CSV, usecols=["fdc_id", "description"], low_memory=False)
food_df["fdc_id"] = food_df["fdc_id"].astype(str)

# food_nutrient is TSV
nutrient_df = pd.read_csv(NUTRIENT_CSV, sep="\t", low_memory=False,
                           usecols=["fdc_id", "nutrient_id", "amount"])
nutrient_df["fdc_id"] = nutrient_df["fdc_id"].astype(str)
# nutrient_id 1003 = protein
protein_df = nutrient_df[nutrient_df["nutrient_id"] == 1003][["fdc_id", "amount"]].copy()
protein_df.rename(columns={"amount": "protein_g_per_100g"}, inplace=True)

usda_df = food_df.merge(protein_df, on="fdc_id", how="left")

usda_nutrition = {}
for _, row in usda_df.iterrows():
    fdc = str(row["fdc_id"])
    key = f"usda-{fdc}"
    prot = None if pd.isna(row.get("protein_g_per_100g")) else float(row["protein_g_per_100g"])
    usda_nutrition[key] = {
        "protein_g_per_100g":  prot,
        "food_name_en":        str(row["description"]),
        "fdc_id":              int(fdc) if fdc.isdigit() else fdc,
        "source":              "USDA SR Legacy, CC0"
    }

print(f"  → {len(usda_nutrition)} USDA foods loaded")

# ─────────────────────────────────────────────────────────────
# NAMESPACE 1c: Match AIOXY ingredients
# ─────────────────────────────────────────────────────────────
print("Matching AIOXY ingredients...")

def parse_ingredient_file(filepath):
    """Extract ingredient keys and name fields from JS-like text."""
    ingredients = {}
    with open(filepath, encoding="utf-8", errors="replace") as f:
        text = f.read()
    # Find key: { ... name: "..." ... } blocks
    # Match top-level keys (quoted or unquoted)
    key_pattern = re.compile(r'"([a-zA-Z0-9_\-\.]+)":\s*\{', re.MULTILINE)
    name_pattern = re.compile(r'"name"\s*:\s*"([^"]*)"')
    ciqual_pattern = re.compile(r'ciqual[_\-]?(\d{4,5})', re.IGNORECASE)
    
    # Split into blocks by top-level key
    keys = list(key_pattern.finditer(text))
    for i, m in enumerate(keys):
        key = m.group(1)
        start = m.end()
        end = keys[i+1].start() if i+1 < len(keys) else len(text)
        block = text[start:end]
        
        name_m = name_pattern.search(block)
        name = name_m.group(1) if name_m else ""
        
        ciqual_m = ciqual_pattern.search(key + block)
        ciqual_code = ciqual_m.group(1) if ciqual_m else None
        
        ingredients[key] = {"name": name, "ciqual_code": ciqual_code}
    return ingredients

ingr_db  = parse_ingredient_file(INGR_DB)
ingr_syn = parse_ingredient_file(INGR_SYN)
all_ingr = {**ingr_db, **ingr_syn}

# Build USDA description index for fuzzy matching
usda_desc_list = [(key, row["food_name_en"]) for key, row in usda_nutrition.items()]

matched_nutrition = {}
n_matched   = 0
n_unmatched = 0

for ing_key, ing_data in all_ingr.items():
    ciqual_code = ing_data.get("ciqual_code")
    name = ing_data.get("name", "")
    
    # Direct CIQUAL match
    if ciqual_code:
        cq_key = f"ciqual-{ciqual_code}"
        if cq_key in ciqual_nutrition:
            entry = dict(ciqual_nutrition[cq_key])
            entry["ingredient_key"] = ing_key
            entry["ingredient_name"] = name
            matched_nutrition[ing_key] = entry
            n_matched += 1
            continue
    
    # Fuzzy USDA match
    if name:
        best_score = 0.0
        best_key = None
        best_desc = None
        for uk, udesc in usda_desc_list:
            score = word_overlap(name, udesc)
            if score > best_score:
                best_score = score
                best_key = uk
                best_desc = udesc
        
        if best_score > 0.5:
            confidence = "high"
        elif best_score > 0.3:
            confidence = "medium"
        else:
            n_unmatched += 1
            continue
        
        usda_entry = usda_nutrition[best_key]
        matched_nutrition[ing_key] = {
            "protein_g_per_100g":  usda_entry["protein_g_per_100g"],
            "food_name_en":        best_desc,
            "fdc_id":              usda_entry["fdc_id"],
            "ingredient_name":     name,
            "source":              "USDA SR Legacy, CC0",
            "match_confidence":    confidence
        }
        n_matched += 1
    else:
        n_unmatched += 1

print(f"  → {n_matched} AIOXY ingredients matched, {n_unmatched} unmatched")

# Merge all nutrition
all_nutrition = {}
all_nutrition.update(ciqual_nutrition)
all_nutrition.update(usda_nutrition)
all_nutrition.update(matched_nutrition)


# ─────────────────────────────────────────────────────────────
# NAMESPACE 2: Aquaculture feeds
# ─────────────────────────────────────────────────────────────
# Values extracted from PDFs in Task 1
# FCR from Fry 2018 Table 1 (citing Tacon & Metian 2008)
# fishmeal_pct / fish_oil_pct from Tacon & Metian 2008 Table 3 (global averages, 2006)

aquaculture_feeds = {
    "farmed_fish": {
        "fcr": 1.70,
        "fishmeal_pct": 20.0,
        "fish_oil_pct": 2.0,
        "source": "Default marine fish proxy (Tacon & Metian 2008, Table 3 global avg)"
    },
    "salmon": {
        "fcr": 1.25,
        "fishmeal_pct": 30.0,
        "fish_oil_pct": 20.0,
        "source": "Tacon & Metian 2008, Table 3 (Salmo salar global avg 2006); FCR also Fry 2018, Table 1"
    },
    "sea_bass": {
        "fcr": 2.1,
        "fishmeal_pct": 32.0,
        "fish_oil_pct": 14.0,
        "source": "Tacon & Metian 2008, Table 3 (Dicentrarchus labrax, cross-country mean FR/GR/TR/ES); UNCERTAIN — no single global mean; falls under Marine finfish global avg FCR=1.9, FM=32%, FO=8%"
    },
    "sea_bream": {
        "fcr": 1.9,
        "fishmeal_pct": 27.0,
        "fish_oil_pct": 11.0,
        "source": "Tacon & Metian 2008, Table 3 (Sparus aurata, cross-country mean FR/GR/TR/ES); UNCERTAIN — no single global mean; falls under Marine finfish global avg"
    },
    "shrimp": {
        "fcr": 1.70,
        "fishmeal_pct": 20.0,
        "fish_oil_pct": 2.0,
        "source": "Tacon & Metian 2008, Table 3 (Penaeus spp. global avg 2006); FCR also Fry 2018, Table 1"
    },
    "trout": {
        "fcr": 1.25,
        "fishmeal_pct": 30.0,
        "fish_oil_pct": 15.0,
        "source": "Tacon & Metian 2008, Table 3 (Oncorhynchus mykiss global avg 2006); FCR also Fry 2018, Table 1"
    }
}


# ─────────────────────────────────────────────────────────────
# NAMESPACE 3: Commodity prices
# ─────────────────────────────────────────────────────────────
print("Loading commodity prices...")
cmo = pd.read_excel(CMO_XLSX, sheet_name="Annual Prices (Nominal)", header=6)
cmo_units = cmo.iloc[0]  # units row

row2024 = cmo[cmo.iloc[:, 0].astype(str).str.contains(r"^2024", na=False)].iloc[0]

# Commodity config: name → (column_name, unit, multiply_to_get_per_kg)
COMMODITY_MAP = {
    "wheat":        ("Wheat, US SRW", "$/mt",  1/1000),
    "maize":        ("Maize",          "$/mt",  1/1000),
    "soybeans":     ("Soybeans",       "$/mt",  1/1000),
    "soybean_meal": ("Soybean meal",   "$/mt",  1/1000),
    "palm_oil":     ("Palm oil",       "$/mt",  1/1000),
    "beef":         ("Beef",           "$/kg",  1.0),
    "chicken":      ("Chicken",        "$/kg",  1.0),
    "fish_meal":    ("Fish meal",      "$/mt",  1/1000),
}

EUR_PER_USD = 1 / 1.08  # ECB 2024 average rate

def safe_price(val):
    try:
        v = float(str(val).replace(",","").replace("…","").strip())
        return v if v > 0 else None
    except Exception:
        return None

commodity_prices = {}
for key in sorted(COMMODITY_MAP):
    col, unit, factor = COMMODITY_MAP[key]
    raw_val = row2024.get(col)
    usd_raw = safe_price(raw_val)
    if usd_raw is None:
        commodity_prices[key] = {
            "price_usd_per_kg": None,
            "price_eur_per_kg": None,
            "year": 2024
        }
    else:
        usd_kg = round(usd_raw * factor, 6)
        eur_kg = round(usd_kg * EUR_PER_USD, 6)
        commodity_prices[key] = {
            "price_usd_per_kg": usd_kg,
            "price_eur_per_kg": eur_kg,
            "year": 2024
        }

print(f"  → {len(commodity_prices)} commodity prices extracted")


# ─────────────────────────────────────────────────────────────
# WRITE OUTPUT JS
# ─────────────────────────────────────────────────────────────
print("Writing output JS...")

def dict_to_js(d, indent=2):
    """Render a nested Python dict as a JS object literal, keys sorted."""
    lines = []
    pad = " " * indent
    lines.append("{")
    items = sorted(d.items())
    for i, (k, v) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        if isinstance(v, dict):
            inner = dict_to_js(v, indent + 4)
            lines.append(f'{pad}    "{k}": {inner}{comma}')
        elif isinstance(v, list):
            lines.append(f'{pad}    "{k}": {json.dumps(v)}{comma}')
        else:
            lines.append(f'{pad}    "{k}": {js_val(v)}{comma}')
    lines.append(pad + "}")
    return "\n".join(lines)

os.makedirs(os.path.dirname(OUT_JS), exist_ok=True)

n_ciqual = len(ciqual_nutrition)
n_usda   = len(usda_nutrition)
n_aioxy  = len(matched_nutrition)

with open(OUT_JS, "w", encoding="utf-8") as f:
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

    # ── Nutrition ──
    f.write("// ─── NAMESPACE 1: nutrition ───────────────────────────────────\n")
    f.write("window.aioxyData.nutrition = {\n")
    sorted_nutr = sorted(all_nutrition.items())
    for i, (key, val) in enumerate(sorted_nutr):
        comma = "," if i < len(sorted_nutr) - 1 else ""
        f.write(f'  "{key}": ')
        inner_items = sorted(val.items())
        f.write("{\n")
        for j, (k2, v2) in enumerate(inner_items):
            c2 = "," if j < len(inner_items) - 1 else ""
            f.write(f'    "{k2}": {js_val(v2)}{c2}\n')
        f.write(f'  }}{comma}\n')
    f.write("};\n\n")

    # ── Aquaculture feeds ──
    f.write("// ─── NAMESPACE 2: aquaculture_feeds ──────────────────────────\n")
    f.write("window.aioxyData.aquaculture_feeds = {\n")
    sorted_aq = sorted(aquaculture_feeds.items())
    for i, (key, val) in enumerate(sorted_aq):
        comma = "," if i < len(sorted_aq) - 1 else ""
        f.write(f'  "{key}": ')
        inner_items = sorted(val.items())
        f.write("{\n")
        for j, (k2, v2) in enumerate(inner_items):
            c2 = "," if j < len(inner_items) - 1 else ""
            f.write(f'    "{k2}": {js_val(v2)}{c2}\n')
        f.write(f'  }}{comma}\n')
    f.write("};\n\n")

    # ── Commodity prices ──
    f.write("// ─── NAMESPACE 3: commodity_prices ───────────────────────────\n")
    f.write("window.aioxyData.commodity_prices = {\n")
    sorted_cp = sorted(commodity_prices.items())
    for i, (key, val) in enumerate(sorted_cp):
        comma = "," if i < len(sorted_cp) - 1 else ""
        f.write(f'  "{key}": ')
        inner_items = sorted(val.items())
        f.write("{\n")
        for j, (k2, v2) in enumerate(inner_items):
            c2 = "," if j < len(inner_items) - 1 else ""
            f.write(f'    "{k2}": {js_val(v2)}{c2}\n')
        f.write(f'  }}{comma}\n')
    f.write("};\n")

print(f"\n✓ Output written to {OUT_JS}")
print(f"\nSUMMARY: {n_ciqual} CIQUAL foods, {n_usda} USDA foods, "
      f"{n_aioxy} matched to AIOXY, {n_unmatched} unmatched, "
      f"{len(aquaculture_feeds)} aquaculture species, "
      f"{len(commodity_prices)} commodity prices")
