import json
import re
import os
import csv
from datetime import datetime

# ==========================================
# AIOXY NATIVE CSV PROCESSOR v4.2
# Exact Engine Mapping & Metadata Preservation
# ==========================================

MAPPING = {
    # Main Indicators
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
    "eutrophisation terrestre": "Eutrophication, terrestrial",
    "eutrophisation terreste": "Eutrophication, terrestrial",
    "écotoxicité": "Ecotoxicity, freshwater",
    "utilisation du sol": "Land Use",
    "ressources eau": "Water Use/Scarcity (AWARE)",
    "ressources énergétiques": "Resource Use, fossils",
    "ressources minéraux": "Resource Use, minerals/metals",
    
    # EXACT String Matches for the AIOXY Engine Logic
    "émissions fossiles": "Climate change - fossil",
    "émissions biogéniques": "Climate change - biogenic",
    "affectation des sols": "Climate change - land use and land use change"
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
        
        # Identify Header Rows
        for i, row in enumerate(rows[:25]):
            row_str = " ".join(row).lower()
            if "changement climatique" in row_str and impact_row_idx == -1:
                impact_row_idx = i
            if ("nom du produit" in row_str or "lci name" in row_str) and name_row_idx == -1:
                name_row_idx = i
                
        if impact_row_idx == -1 or name_row_idx == -1:
            print("❌ Critical Error: Missing headers in CSV.")
            return {}
            
        impact_headers = rows[impact_row_idx]
        col_headers = rows[name_row_idx]
        
        # Map Indices
        impact_col_indices = {}
        for idx, col_val in enumerate(impact_headers):
            col_val_lower = col_val.lower()
            for fr_key, en_key in MAPPING.items():
                if fr_key in col_val_lower:
                    # Logic: Ensure the main total "Climate Change" doesn't get 
                    # overwritten by a sub-indicator column containing the same word
                    if en_key == "Climate Change" and any(x in col_val_lower for x in ["fossiles", "biogéniques", "sols"]):
                        continue
                    impact_col_indices[en_key] = idx
                    
        name_col_idx = 0
        dqr_col_idx = -1
        for idx, col_val in enumerate(col_headers):
            col_val_lower = col_val.lower()
            if "nom du produit" in col_val_lower or "lci name" in col_val_lower: name_col_idx = idx
            if "dqr" in col_val_lower or "qualité" in col_val_lower: dqr_col_idx = idx
                
        # Data Extraction
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
                impacts[en_key] = get_safe_float(row[idx]) if idx < len(row) else 0.0
                    
            overall_dqr = 2.5
            if dqr_col_idx != -1 and dqr_col_idx < len(row):
                dqr_val = get_safe_float(row[dqr_col_idx])
                if dqr_val > 0: overall_dqr = dqr_val
            
            # MANDATORY STRUCTURE FOR UI & ENGINE COMPATIBILITY
            data_store[item_id] = {
                "name": name_fr,
                "loss": 0.02, # Default for Farm Gate
                "processing_yield": 1.0,
                "data": {
                    "pef": impacts,
                    "metadata": {
                        "source_dataset": "AGRIBALYSE 3.2",
                        "source_activity": name_fr,
                        "dqr_overall": overall_dqr,
                        "dqr": {"P": overall_dqr, "TiR": overall_dqr, "TeR": overall_dqr, "GR": overall_dqr}
                    }
                }
            }
            processed_count += 1
            
        print(f"✅ Successfully mapped {processed_count} ingredients.")
        return data_store
        
    except Exception as e:
        print(f"❌ Processing failure: {str(e)}")
        return {}

def main():
    base = os.getcwd()
    # Path setup
    path_farm = os.path.join(base, "data-raw", "agribalyse_farm_gate.csv")
    output_js = os.path.join(base, "ingredients_db.js")

    all_data = {}
    
    if os.path.exists(path_farm):
        all_data.update(process_agribalyse_file(path_farm, "FARM"))
    else:
        print(f"❌ Input file not found: {path_farm}")
        return

    # JS Wrapper with Object.assign for multi-file loading
    header = f"// AIOXY AUTOMATED DATABASE | VERIFIED: {datetime.now().strftime('%Y-%m-%d')}\n"
    js_content = header + "window.aioxyData = window.aioxyData || {};\n"
    js_content += "window.aioxyData.ingredients = Object.assign(window.aioxyData.ingredients || {}, " + json.dumps(all_data, indent=2, ensure_ascii=False) + ");"
    
    with open(output_js, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"🚀 Deployment ready: {output_js} has been updated.")

if __name__ == "__main__":
    main()
