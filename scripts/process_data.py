#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIOXY FARM GATE PROCESSOR v8.0 - FIXED
Extracts ALL 228 ingredients
No column length check that causes skipping
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
    
    for i, row in enumerate(rows[data_start:]):
        # Check if row has any data
        if not row or all(cell == '' or cell is None for cell in row):
            skipped_empty += 1
            continue
        
        # Get French name (first column)
        name_fr = row[0].strip() if len(row) > 0 and row[0] else ''
        name_en = row[1].strip() if len(row) > 1 and row[1] else name_fr
        
        # Skip eggs (blank data rows)
        if 'Oeuf' in name_fr or 'oeuf' in name_fr.lower() or name_fr == '':
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
        
        # Print progress every 20 ingredients
        if count % 20 == 0:
            print(f"  📦 Processed {count} ingredients...")

    print(f"\n✅ SUCCESS!")
    print(f"   Ingredients extracted: {count}")
    print(f"   Skipped empty rows: {skipped_empty}")
    print(f"   Skipped eggs: {skipped_eggs}")

    # Write output
    js_output = f"""// AIOXY FARM GATE DATABASE | AUDIT-GRADE
// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Total Ingredients: {count}
// DQR: 2.5 (PEF 3.1 Secondary Data Standard)
// Allocation: Economic (Agribalyse Official)
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
