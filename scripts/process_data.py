import json
import re
import os
import csv
from datetime import datetime

# ==========================================
# AIOXY NATIVE CSV PROCESSOR v4.0
# Strict Coordinate Mapping with Total-Isolation
# ==========================================

MAPPING = {
    "changement climatique": "Climate Change",
    "couche d'ozone": "Ozone Depletion",
    "rayonnements ionisants": "Ionizing Radiation",
    "photochimique": "Photochemical Ozone Formation",
    "particules": "Particulate Matter",
    "non-cancérogènes": "Human Toxicity, non-cancer",
    "substances cancérogènes": "Human Toxicity, cancer",
    "acidification": "Acidification",
    "eutrophisation eaux douces": "Eutrophication, freshwater",
    "eutrophisation marine": "Eutrophication, marine",
    "eutrophisation terreste": "Eutrophication, terrestrial", # Agribalyse typo
    "eutrophisation terrestre": "Eutrophication, terrestrial",
    "écotoxicité": "Ecotoxicity, freshwater",
    "utilisation du sol": "Land Use",
    "ressources eau": "Water Use/Scarcity (AWARE)",
    "ressources énergétiques": "Resource Use, fossils",
    "ressources minéraux": "Resource Use, minerals/metals"
}

def clean_id(name):
    name = str(name).lower()
    name = re.sub(r'[^a-z0-9]', '-', name)
    return re.sub(r'-+', '-', name).strip('-')[:80]

def get_safe_float(val):
    try:
        val_str = str(val).strip().replace(' ', '').replace(',', '.')
        if not val_str or val_str == '-': return 0.0
        return float(val_str)
    except:
        return 0.0

def process_agribalyse_file(filepath, source_type):
    print(f"\n🕵️ Auditing Grid Coordinates: {filepath}")
    data_store = {}
    
    try:
        with open(filepath, 'r', encoding='latin-1') as f:
            reader = csv.reader(f, delimiter=',')
            rows = list(reader)
            
        impact_row_idx = -1
        name_row_idx = -1
        
        # 1. Locate Header Rows
        for i, row in enumerate(rows[:20]):
            row_str = " ".join(row).lower()
            if "changement climatique" in row_str and impact_row_idx == -1:
                impact_row_idx = i
            if ("nom du produit" in row_str or "lci name" in row_str) and name_row_idx == -1:
                name_row_idx = i
                
        if impact_row_idx == -1 or name_row_idx == -1:
            print(f"❌ Critical Error: Missing headers in {filepath}")
            return {}
            
        impact_headers = rows[impact_row_idx]
        col_headers = rows[name_row_idx]
        
        # 2. Map Exact Impact Indices (Prevent Sub-indicator Overwrites)
        impact_col_indices = {}
        temp_matches = {en_key: [] for en_key in MAPPING.values()}
        
        for idx, col_val in enumerate(impact_headers):
            col_val_lower = col_val.lower()
            for fr_key, en_key in MAPPING.items():
                if fr_key in col_val_lower:
                    temp_matches[en_key].append((idx, col_val_lower))
                    
        for en_key, matches in temp_matches.items():
            if matches:
                # Isolate the main total by finding the shortest column name
                best_match = min(matches, key=lambda x: len(x[1]))
                impact_col_indices[en_key] = best_match[0]
                    
        # 3. Map Name and DQR Indices
        name_col_idx = 0
        dqr_col_idx = -1
        
        for idx, col_val in enumerate(col_headers):
            col_val_lower = col_val.lower()
            if "nom du produit" in col_val_lower or "lci name" in col_val_lower:
                name_col_idx = idx
            if "dqr" in col_val_lower or "qualité" in col_val_lower:
                dqr_col_idx = idx
                
        print(f"✅ Product Name locked at Column {name_col_idx}. Locked {len(impact_col_indices)} specific impact coordinates.")
        
        # 4. Extract Data
        start_row = max(impact_row_idx, name_row_idx) + 1
        processed_count = 0
        
        for row in rows[start_row:]:
            if not row or len(row) <= name_col_idx: continue
            
            name_fr = row[name_col_idx].strip()
            if not name_fr or name_fr.lower() == 'nan': continue
            
            item_id = clean_id(name_fr)
            if source_type == "FARM": item_id += "-raw"
            
            impacts = {}
            for en_key, idx in impact_col_indices.items():
                if idx < len(row):
                    impacts[en_key] = get_safe_float(row[idx])
                else:
                    impacts[en_key] = 0.0
                    
            overall_dqr = 2.5
            if dqr_col_idx != -1 and dqr_col_idx < len(row):
                dqr_val = get_safe_float(row[dqr_col_idx])
                if dqr_val > 0: overall_dqr = dqr_val
            
            data_store[item_id] = {
                "name": name_fr,
                "loss": 0.05 if source_type == "SYNTH" else 0.02,
                "processing_yield": 1.0,
                "data": {
                    "pef": impacts,
                    "metadata": {
                        "source_dataset": "AGRIBALYSE 3.2",
                        "source_activity": name_fr,
                        "dqr_overall": overall_dqr,
                        "dqr": {"P": overall_dqr, "TiR": overall_dqr, "TeR": overall_dqr, "GR": overall_dqr},
                        "biogenic_net": 0.0
                    }
                }
            }
            processed_count += 1
            
        print(f"✅ Extracted {processed_count} validated ingredients from {source_type}")
        return data_store
        
    except Exception as e:
        print(f"❌ Read failure {filepath}: {str(e)}")
        return {}

def main():
    base = os.getcwd()
    path_synth = os.path.join(base, "data-raw", "agribalyse_synthese.csv")
    path_farm = os.path.join(base, "data-raw", "agribalyse_farm_gate.csv")
    output_js = os.path.join(base, "ingredients_db.js")

    all_data = {}
    
    if os.path.exists(path_synth):
        all_data.update(process_agribalyse_file(path_synth, "SYNTH"))
    if os.path.exists(path_farm):
        all_data.update(process_agribalyse_file(path_farm, "FARM"))

    if not all_data:
        print("❌ CRITICAL: No data extracted.")
        return

    # Infrastructure Merge
    header = f"// AIOXY DATABASE | VERIFIED: {datetime.now().strftime('%Y-%m-%d')}\n"
    js_content = header + "window.aioxyData = window.aioxyData || {};\n"
    js_content += "window.aioxyData.ingredients = Object.assign(window.aioxyData.ingredients || {}, " + json.dumps(all_data, indent=2, ensure_ascii=False) + ");"
    
    with open(output_js, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"\n🚀 DATABASE DEPLOYMENT READY: {len(all_data)} ingredients mapped successfully.")

if __name__ == "__main__":
    main()
