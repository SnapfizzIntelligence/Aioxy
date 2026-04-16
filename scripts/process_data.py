#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIOXY FARM GATE PROCESSOR - FINAL VERSION
Outputs exact format matching manual verification
Skips eggs (blank data)
Includes both French and English names
"""

import json
import re
import csv
from datetime import datetime

def clean_id(name):
    """Create URL-safe unique identifier"""
    name = str(name).lower()
    name = re.sub(r'[^a-z0-9]', '-', name)
    name = re.sub(r'-+', '-', name)
    return name.strip('-')[:100]

def get_safe_float(val):
    """Convert to float, handling empty/European decimals"""
    try:
        if val is None or val == '' or val == '-':
            return 0.0
        val_str = str(val).strip().replace(' ', '').replace(',', '.')
        if val_str == '' or val_str == '-':
            return 0.0
        return float(val_str)
    except (ValueError, TypeError):
        return 0.0

def generate_farm_gate_db():
    input_file = "data-raw/agribalyse_farm_gate.csv"
    output_file = "farm_gate_ingredients.js"
    
    # Try alternate path
    import os
    if not os.path.exists(input_file):
        input_file = "agribalyse_farm_gate.csv"
    
    if not os.path.exists(input_file):
        print(f"❌ Error: {input_file} not found.")
        return

    db = {}
    
    with open(input_file, 'r', encoding='latin-1') as f:
        reader = csv.reader(f)
        rows = list(reader)

    # Find header row (contains "Changement climatique")
    header_idx = -1
    for i, row in enumerate(rows[:15]):
        row_str = ' '.join(str(cell) for cell in row)
        if "Changement climatique" in row_str:
            header_idx = i
            break
    
    if header_idx == -1:
        print("❌ Could not find header row")
        return
    
    headers = rows[header_idx]
    print(f"✅ Found header at row {header_idx}")
    
    # Map column indices
    col_map = {}
    for i, h in enumerate(headers):
        h_clean = str(h).strip()
        
        if "Score unique" in h_clean:
            col_map["single_score"] = i
        elif "Changement climatique" in h_clean and "fossile" not in h_clean and "biog" not in h_clean and "affectation" not in h_clean:
            col_map["Climate Change"] = i
        elif "fossile" in h_clean.lower():
            col_map["Climate Change - Fossil"] = i
        elif "biog" in h_clean.lower():
            col_map["Climate Change - Biogenic"] = i
        elif "affectation" in h_clean.lower() or "sols" in h_clean.lower():
            col_map["Climate Change - Land Use"] = i
        elif "Appauvrissement" in h_clean:
            col_map["Ozone Depletion"] = i
        elif "Rayonnements" in h_clean:
            col_map["Ionizing Radiation"] = i
        elif "photochimique" in h_clean.lower():
            col_map["Photochemical Ozone Formation"] = i
        elif "Particules" in h_clean:
            col_map["Particulate Matter"] = i
        elif "non-canc" in h_clean.lower():
            col_map["Human Toxicity, non-cancer"] = i
        elif "canc" in h_clean.lower() and "non-" not in h_clean.lower():
            col_map["Human Toxicity, cancer"] = i
        elif "Acidification" in h_clean:
            col_map["Acidification"] = i
        elif "Eutrophisation terre" in h_clean:
            col_map["Eutrophication, terrestrial"] = i
        elif "Eutrophisation eaux douces" in h_clean:
            col_map["Eutrophication, freshwater"] = i
        elif "Eutrophisation marine" in h_clean:
            col_map["Eutrophication, marine"] = i
        elif "cotoxicit" in h_clean.lower():
            col_map["Ecotoxicity, freshwater"] = i
        elif "Utilisation du sol" in h_clean:
            col_map["Land Use"] = i
        elif "ressources eau" in h_clean.lower():
            col_map["Water Use/Scarcity (AWARE)"] = i
        elif "ressources min" in h_clean.lower():
            col_map["Resource Use, minerals/metals"] = i
        elif "ressources énergétique" in h_clean.lower() or ("énergétique" in h_clean.lower() and "ressources" in h_clean.lower()):
            col_map["Resource Use, fossils"] = i

    # Process all rows
    data_start = header_idx + 1
    count = 0
    skipped = 0
    
    for row in rows[data_start:]:
        if not row or len(row) < 5:
            continue
        
        # Get names (Column 0 = French, Column 1 = English LCI Name)
        name_fr = row[0].strip() if row[0] else ''
        name_en = row[1].strip() if len(row) > 1 and row[1] else name_fr
        
        # Skip eggs (blank data) and empty rows
        if not name_fr or 'Oeuf' in name_fr or 'oeuf' in name_fr.lower():
            skipped += 1
            continue
        
        # Skip rows with no climate data
        climate_idx = col_map.get("Climate Change")
        if climate_idx is None or climate_idx >= len(row):
            continue
        
        climate_val = get_safe_float(row[climate_idx])
        if climate_val == 0.0:
            continue
        
        item_id = clean_id(name_en) + "-raw"
        
        # Build PEF data
        pef_data = {}
        
        # Helper to get value
        def get_val(key):
            idx = col_map.get(key)
            return get_safe_float(row[idx]) if idx is not None and idx < len(row) else 0.0
        
        pef_data["Climate Change"] = get_val("Climate Change")
        pef_data["Climate Change - Fossil"] = get_val("Climate Change - Fossil")
        pef_data["Climate Change - Biogenic"] = get_val("Climate Change - Biogenic")
        pef_data["Climate Change - Land Use"] = get_val("Climate Change - Land Use")
        pef_data["Ozone Depletion"] = get_val("Ozone Depletion")
        pef_data["Human Toxicity, non-cancer"] = get_val("Human Toxicity, non-cancer")
        pef_data["Human Toxicity, cancer"] = get_val("Human Toxicity, cancer")
        pef_data["Particulate Matter"] = get_val("Particulate Matter")
        pef_data["Ionizing Radiation"] = get_val("Ionizing Radiation")
        pef_data["Photochemical Ozone Formation"] = get_val("Photochemical Ozone Formation")
        pef_data["Acidification"] = get_val("Acidification")
        pef_data["Eutrophication, terrestrial"] = get_val("Eutrophication, terrestrial")
        pef_data["Eutrophication, freshwater"] = get_val("Eutrophication, freshwater")
        pef_data["Eutrophication, marine"] = get_val("Eutrophication, marine")
        pef_data["Ecotoxicity, freshwater"] = get_val("Ecotoxicity, freshwater")
        pef_data["Land Use"] = get_val("Land Use")
        pef_data["Water Use/Scarcity (AWARE)"] = get_val("Water Use/Scarcity (AWARE)")
        pef_data["Resource Use, minerals/metals"] = get_val("Resource Use, minerals/metals")
        pef_data["Resource Use, fossils"] = get_val("Resource Use, fossils")
        
        single_score = get_val("single_score")
        
        db[item_id] = {
            "name": name_en,
            "name_fr": name_fr,
            "loss": 0.03,
            "processing_yield": 1.0,
            "data": {
                "pef": pef_data,
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": f"{name_en} {{FR}} U",
                    "source_uuid": f"agb-3.2-{item_id}",
                    "allocation_method": "Economic Allocation",
                    "dqr": {
                        "TeR": 3.0,
                        "GR": 2.0,
                        "TiR": 3.0,
                        "P": 2.0
                    },
                    "dqr_overall": 2.5,
                    "single_score_mpt": single_score
                }
            }
        }
        count += 1
        print(f"  ✅ {name_en[:50]}...")

    print(f"\n📊 Processed: {count} ingredients")
    print(f"   Skipped: {skipped} (eggs/empty)")

    # Write output
    js_output = f"""// AIOXY FARM GATE DATABASE | AUDIT-GRADE
// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Total Ingredients: {count}
// DQR: 2.5 (PEF 3.1 Secondary Data Standard)
// Allocation: Economic (Agribalyse Official)
// Source: AGRIBALYSE 3.2 - Official ADEME Database
// ===============================================================

"""
    
    for item_id, item_data in db.items():
        js_output += f'        "{item_id}": '
        js_output += json.dumps(item_data, indent=12, ensure_ascii=False)
        js_output += ",\n\n"
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_output)
    
    print(f"\n✅ Generated: {output_file}")
    print("   Copy the contents between the braces into your Data.txt ingredients section.")

if __name__ == "__main__":
    generate_farm_gate_db()
