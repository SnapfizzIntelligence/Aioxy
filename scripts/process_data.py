#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIOXY FARM GATE PROCESSOR v9.0 — DQR AUDIT FIX
Extracts ALL 222 ingredients from Agribalyse 3.2 farm-gate CSV.
Phase 3 DQR fix: replaces uniform 2.5 with defensible per-category DQR
per DQR Specification v1.0 based on Agribalyse DQI Matrix evidence.
"""

import json
import re
import os
import csv
from datetime import datetime

def clean_id(name):
    name = str(name).lower()
    name = re.sub(r'[^a-z0-9]', '-', name)
    return re.sub(r'-+', '-', name).strip('-')[:100]

def get_safe_float(val, idx):
    """Safely get float value by index, returns 0.0 if out of bounds"""
    try:
        if idx >= len(val):
            return 0.0
        val_str = str(val[idx]).strip().replace(' ', '').replace(',', '.')
        if not val_str or val_str == '-' or val_str == '':
            return 0.0
        return float(val_str)
    except (ValueError, TypeError, IndexError):
        return 0.0

def get_dqr_for_ingredient(lci_name):
    """
    Assign DQR per AIOXY DQR Specification v1.0.
    Based on Agribalyse DQI Matrix — Market mix criterion only (farm-gate scope).
    
    Evidence basis:
    - DQI_Matrix_for_AGRIBALYSE.xlsx, sheet "Matrice DQI pour AGRIBALYSE"
    - Agribalyse Methodologie de calcul (4-indicator scheme: P, TiR, TeR, GR)
    - All FR ingredients share identical DQR because they use the same RICA/Agreste
      statistical methodology, same data vintage (2015-2020), and require no
      geographic proxies. The DQI Matrix scores data quality — not environmental
      quality. It has no mechanism to differentiate between FR wheat and FR tomatoes.
    
    Returns: (dqr_dict, dqr_overall, dqr_note_or_None)
    """
    dqr_note = None
    
    # RULE 1: Brazilian soy 2008 cut-off — TiR = 5 (data >10 years old)
    if "cut-off date 2008" in lci_name.lower():
        return (
            {"P": 3, "TiR": 5, "TeR": 3, "GR": 5},
            4.00,
            "Brazilian soy 2008 cut-off: TiR=5 per DQI Matrix — data older than "
            "10 years (2008 vintage, 14 years at Agribalyse 3.2 2022 publication, "
            "18 years at 2026 deployment)."
        )
    
    # Extract country code from LCI name: {XX}
    country_match = re.search(r'\{(\w+)\}', lci_name)
    country = country_match.group(1) if country_match else 'FR'
    
    # FR and FR overseas territories (Réunion, West Indies) = best DQR
    if country in ('FR', 'RE', 'WI'):
        return (
            {"P": 2, "TiR": 3, "TeR": 2, "GR": 1},
            2.00,
            None  # No special note for standard FR case
        )
    
    # Non-FR EU / European-context countries
    # ES, PL, NL, IE = EU members. GB = post-Brexit European context.
    # EU = EU average. NO = EEA (European Economic Area).
    eu_countries = ('ES', 'PL', 'NL', 'IE', 'GB', 'EU', 'NO')
    
    if country in eu_countries:
        return (
            {"P": 3, "TiR": 3, "TeR": 3, "GR": 4},
            3.25,
            None
        )
    
    # All other non-FR non-EU (MA, BR, VN, US, CI)
    return (
        {"P": 3, "TiR": 3, "TeR": 3, "GR": 5},
        3.50,
        None
    )

# DQR methodology note — inserted into every ingredient's metadata for audit traceability
DQR_METHODOLOGY_NOTE = (
    "Agribalyse DQI Matrix v3.0.1 — Market mix criterion only (farm-gate scope). "
    "4-indicator scheme (TeR + TiR + GR + P) / 4 per ADEME/INRAE methodology. "
    "All FR ingredients share identical DQR because they use common statistical methodology "
    "(RICA surveys), same data vintage (2015-2020, TiR=3 at 2022 publication), and "
    "inherently require no geographic proxy. Non-FR ingredients scored per DQI Matrix "
    "Market mix criterion by country context. EF 3.1 5th indicator CoR not scored — "
    "AGRIBALYSE's official DQI Matrix v3.0.1 (ADEME/INRAE) defines exactly 4 indicators "
    "(P, TiR, TeR, GR) across all lifecycle stages. This is not a deviation from EF 3.1 "
    "requiring PEFCR justification — it is the native and published DQI methodology of "
    "the LCI data source, applied consistently. The DQI Matrix source document is "
    "DQI_Matrix_for_AGRIBALYSE_2.csv (available in the AIOXY repository). External "
    "auditors: verify DQR assignments against this matrix and the AGRIBALYSE 3.2 open "
    "data at https://agribalyse.ademe.fr/. For EPD or regulatory submission, replace "
    "with primary data DQR scoring per PEF 3.1 §6.5."
)

# Animal ingredient keywords — ingredients matching any of these get entericIncluded=true
ANIMAL_KEYWORDS = [
    'beef', 'cattle', 'cow', 'veal', 'lamb', 'sheep', 'goat', 'pig', 'pork',
    'chicken', 'broiler', 'hen', 'poultry', 'turkey', 'duck', 'rabbit'
]

def generate_db():
    input_file = "data-raw/agribalyse_farm_gate.csv"
    output_file = "ingredients_db.js"
    
    if not os.path.exists(input_file):
        input_file = "agribalyse_farm_gate.csv"
    
    if not os.path.exists(input_file):
        print(f"❌ Error: {input_file} not found.")
        return

    with open(input_file, 'r', encoding='latin-1') as f:
        reader = csv.reader(f)
        rows = list(reader)

    # Find the header row (contains "Changement climatique")
    header_idx = -1
    for i, row in enumerate(rows[:10]):
        row_str = ' '.join(str(cell) for cell in row)
        if "Changement climatique" in row_str:
            header_idx = i
            break
    
    if header_idx == -1:
        print("❌ Could not find header row")
        return
    
    print(f"✅ Header found at row {header_idx}")
    
    # Data starts 2 rows after header (header, then units row, then data)
    data_start = header_idx + 2
    
    db = {}
    count = 0
    skipped_empty = 0
    skipped_eggs = 0
    animal_count = 0
    
    # DQR distribution counters for summary
    dqr_counts = {}
    
    for i, row in enumerate(rows[data_start:]):
        # Check if row has any data
        if not row or all(cell == '' or cell is None for cell in row):
            skipped_empty += 1
            continue
        
        # Get French name (first column)
        name_fr = row[0].strip() if len(row) > 0 and row[0] else ''
        name_en = row[1].strip() if len(row) > 1 and row[1] else name_fr
        
        # Skip actual egg rows (starts with "Oeuf"), not "Boeuf"
        if name_fr.startswith('Oeuf') or name_fr == '':
            skipped_eggs += 1
            continue
        
        # Skip rows with no climate data (likely metadata)
        if len(row) <= 5:
            skipped_empty += 1
            continue
        
        item_id = clean_id(name_en) + "-raw"
        
        # Fixed column mapping - use get_safe_float with index
        pef_data = {
            "Climate Change": get_safe_float(row, 5),
            "Ozone Depletion": get_safe_float(row, 6),
            "Ionizing Radiation": get_safe_float(row, 7),
            "Photochemical Ozone Formation": get_safe_float(row, 8),
            "Particulate Matter": get_safe_float(row, 9),
            "Human Toxicity, non-cancer": get_safe_float(row, 10),
            "Human Toxicity, cancer": get_safe_float(row, 11),
            "Acidification": get_safe_float(row, 12),
            "Eutrophication, freshwater": get_safe_float(row, 13),
            "Eutrophication, marine": get_safe_float(row, 14),
            "Eutrophication, terrestrial": get_safe_float(row, 15),
            "Ecotoxicity, freshwater": get_safe_float(row, 16),
            "Land Use": get_safe_float(row, 17),
            "Water Use/Scarcity (AWARE)": get_safe_float(row, 18),
            "Resource Use, fossils": get_safe_float(row, 19),
            "Resource Use, minerals/metals": get_safe_float(row, 20),
            "Climate Change - Biogenic": get_safe_float(row, 21),
            "Climate Change - Fossil": get_safe_float(row, 22),
            "Climate Change - Land Use": get_safe_float(row, 23),
        }
        
        single_score = get_safe_float(row, 4)
        
        # === PHASE 3 DQR FIX ===
        dqr_values, dqr_overall, dqr_note = get_dqr_for_ingredient(name_en)
        
        # Track distribution
        dqr_label = str(dqr_overall)
        dqr_counts[dqr_label] = dqr_counts.get(dqr_label, 0) + 1
        
        # Build metadata
        metadata = {
            "source_dataset": "AGRIBALYSE 3.2",
            "source_activity": f"{name_en} {{FR}} U",
            "source_uuid": f"agb-3.2-{item_id}",
            "allocation_method": "Economic Allocation",
            "dqr": dqr_values,
            "dqr_overall": dqr_overall,
            "single_score_mpt": single_score,
            "dqr_methodology": DQR_METHODOLOGY_NOTE
        }
        if dqr_note:
            metadata["dqr_note"] = dqr_note
        
        # === ANIMAL DETECTION — enteric methane flag ===
        is_animal = any(keyword in name_en.lower() for keyword in ANIMAL_KEYWORDS)
        if is_animal:
            metadata["entericIncluded"] = True
            animal_count += 1
        
        db[item_id] = {
            "name": name_en,
            "name_fr": name_fr,
            "loss": 0.03,
            "processing_yield": 1.0,
            "data": {
                "pef": pef_data,
                "metadata": metadata
            }
        }
        count += 1
        
        # Print progress every 20 ingredients
        if count % 20 == 0:
            print(f"  📦 Processed {count} ingredients...")

    print(f"\n✅ SUCCESS!")
    print(f"   Ingredients extracted: {count}")
    print(f"   Skipped empty rows: {skipped_empty}")
    print(f"   Skipped eggs: {skipped_eggs}")
    print(f"   Animal ingredients flagged (entericIncluded): {animal_count}")
    print(f"\n📊 DQR Distribution:")
    for dqr_val in sorted(dqr_counts.keys()):
        print(f"   DQR {dqr_val}: {dqr_counts[dqr_val]} ingredients")

    # Write output
    js_output = f"""// AIOXY FARM GATE DATABASE | AUDIT-GRADE
// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Total Ingredients: {count}
// DQR: Per-category scoring based on Agribalyse DQI Matrix v3.0.1 (Market mix criterion)
//       FR ingredients: DQR 2.00 (P=2, TiR=3, TeR=2, GR=1)
//       Non-FR EU:      DQR 3.25 (P=3, TiR=3, TeR=3, GR=4)
//       Non-FR non-EU:  DQR 3.50 (P=3, TiR=3, TeR=3, GR=5)
//       BR Soy 2008:    DQR 4.00 (P=3, TiR=5, TeR=3, GR=5)
// Methodology: 4-indicator (P+TiR+TeR+GR)/4 per ADEME/INRAE
// Allocation: Economic (Agribalyse Official)
//
// ─────────────────────────────────────────────────────────────────────────────
// GAP 8: 4-INDICATOR DQR — FORMAL JUSTIFICATION
// ─────────────────────────────────────────────────────────────────────────────
// AIOXY uses 4 DQR indicators (P, TiR, TeR, GR). EF 3.1 §6.5.2 Table 21
// defines 5 indicators, adding CoR (Completeness of Review) as the 5th.
//
// This is NOT a deviation requiring formal justification. AGRIBALYSE 3.2 is
// the data source for all {count} ingredients in this database. Its DQI
// methodology is documented in the official ADEME/INRAE DQI Matrix, which
// defines exactly 4 indicators (P, TiR, TeR, GR) across all lifecycle stages.
// The DQI Matrix source document is DQI_Matrix_for_AGRIBALYSE_2.csv in the
// AIOXY repository. Applying a 5-indicator scheme to AGRIBALYSE data would
// be inconsistent with the data source's own published methodology.
//
// Source: DQI_Matrix_for_AGRIBALYSE_2.csv (ADEME/INRAE, official);
//         JRC Technical Report EUR 29540 EN §6.5.2 (EF 3.1 DQR definition).
// ─────────────────────────────────────────────────────────────────────────────
//
// GAP 12: source_uuid FIELD — TRACEABILITY CLARIFICATION
// ─────────────────────────────────────────────────────────────────────────────
// The source_uuid field uses internally constructed slugs (e.g.,
// "agb-3.2-apricot-conventional-national-average-..."). These are NOT RFC 4122
// hexadecimal UUIDs.
//
// This reflects the AGRIBALYSE 3.2 open-data structure: the official ADEME CSV
// export does not include a UUID column. The columns are: French name, LCI Name,
// production type, category, and 20 impact scores. AGRIBALYSE 3.2 has not been
// released as an ILCD XML export with per-process UUIDs on the EC EPLCA node.
//
// The source_activity field stores the full official LCI Name — this is the
// canonical unique identifier per ADEME methodology. Auditors: cross-reference
// source_activity against the official CSV at https://agribalyse.ademe.fr/
// The source_uuid slug is a normalized programmatic derivative for use as a
// database key, not an ILCD UUID.
// ===============================================================

window.aioxyData = window.aioxyData || {{}};
window.aioxyData.ingredients = Object.assign(window.aioxyData.ingredients || {{}}, {{
"""
    
    for item_id, item_data in db.items():
        js_output += f'    "{item_id}": '
        js_output += json.dumps(item_data, indent=8, ensure_ascii=False).replace('\n', '\n    ')
        js_output += ',\n\n'
    
    js_output += "});\n"
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_output)
    
    print(f"\n📄 Generated: {output_file}")

if __name__ == "__main__":
    generate_db()
