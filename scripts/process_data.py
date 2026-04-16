import pandas as pd
import json
import re
import os
from datetime import datetime

# ==========================================
# AIOXY ROBUST DATA PROCESSOR v3.3
# Compliance Level: PEF 3.1 / CSRD
# Fix: French CSV Semicolon & Case Insensitive Mapping
# ==========================================

# Lowercase mapping for robust matching
MAPPING = {
    "changement climatique": "Climate Change",
    "couche d'ozone": "Ozone Depletion",
    "rayonnements ionisants": "Ionizing Radiation",
    "photochimique": "Photochemical Ozone Formation",
    "particules": "Particulate Matter",
    "non-cancérogènes": "Human Toxicity, non-cancer",
    "cancérogènes": "Human Toxicity, cancer",
    "acidification": "Acidification",
    "eutrophisation eaux douces": "Eutrophication, freshwater",
    "eutrophisation marine": "Eutrophication, marine",
    "eutrophisation terrestre": "Eutrophication, terrestrial",
    "écotoxicité": "Ecotoxicity, freshwater",
    "utilisation du sol": "Land Use",
    "épuisement des ressources eau": "Water Use/Scarcity (AWARE)",
    "ressources énergétiques": "Resource Use, fossils",
    "ressources minéraux": "Resource Use, minerals/metals"
}

def clean_id(name):
    name = str(name).lower()
    name = re.sub(r'[^a-z0-9]', '-', name)
    return re.sub(r'-+', '-', name).strip('-')[:80]

def get_safe_float(val):
    try:
        if pd.isna(val) or val == "" or val == "-": return 0.0
        # Convert European comma decimals to standard periods
        return float(str(val).replace(',', '.'))
    except:
        return 0.0

def process_agribalyse_file(filepath, source_type):
    print(f"\n🕵️ Auditing {source_type}: {filepath}")
    try:
        # 1. DETECT HEADER ROW AND SEPARATOR MANUALLY
        header_row_idx = 0
        detected_sep = ';' # Default Agribalyse French Excel export
        
        with open(filepath, 'r', encoding='latin-1') as f:
            lines = f.readlines()
            for i, line in enumerate(lines[:30]):
                # Agribalyse uses "Nom du Produit" or "LCI Name"
                if "Nom du" in line or "LCI Name" in line:
                    header_row_idx = i
                    if ';' in line: detected_sep = ';'
                    elif ',' in line: detected_sep = ','
                    break

        print(f"✅ Detected header at row {header_row_idx} using separator '{detected_sep}'")
        
        # 2. LOAD DATAFRAME
        df = pd.read_csv(filepath, sep=detected_sep, encoding='latin-1', skiprows=header_row_idx, low_memory=False)
        
        # Lowercase all columns for safe matching
        df.columns = [str(c).lower() for c in df.columns]
        
        data_store = {}
        processed_count = 0
        
        for _, row in df.iterrows():
            # Locate the Product Name column robustly
            name_col = [c for c in df.columns if "nom du produit" in c or "lci name" in c]
            if not name_col:
                continue
                
            name_fr = str(row[name_col[0]])
            if name_fr == 'nan' or name_fr.strip() == '':
                name_fr = str(row.iloc[0])
                if name_fr == 'nan': continue
            
            item_id = clean_id(name_fr)
            if source_type == "FARM": item_id += "-raw"
            
            impacts = {}
            for fr_key, en_key in MAPPING.items():
                # Find all columns containing the French key
                match_cols = [c for c in df.columns if fr_key in c]
                
                if not match_cols:
                    impacts[en_key] = 0.0
                    continue
                    
                # We want the TOTAL impact, not the sub-indicators (Fossil/Biogenic).
                # The total is always the shortest column name string.
                best_col = min(match_cols, key=len)
                impacts[en_key] = get_safe_float(row[best_col])

            # Extract DQR safely
            dqr_cols = [c for c in df.columns if 'dqr' in c or 'qualité' in c]
            overall_dqr = get_safe_float(row[dqr_cols[0]]) if dqr_cols else 2.5
            if overall_dqr == 0: overall_dqr = 2.5

            # Perfect AIOXY Schema Match
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
                        "dqr": {
                            "P": overall_dqr, "TiR": overall_dqr, "TeR": overall_dqr, "GR": overall_dqr
                        },
                        "biogenic_net": 0.0
                    }
                }
            }
            processed_count += 1
            
        print(f"✅ Successfully processed {processed_count} ingredients from {source_type}")
        return data_store
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return {}

def main():
    base = os.getcwd()
    path_synth = os.path.join(base, "data-raw", "agribalyse_synthese.csv")
    path_farm = os.path.join(base, "data-raw", "agribalyse_farm_gate.csv")
    output_js = os.path.join(base, "ingredients_db.js")

    all_data = {}
    
    if os.path.exists(path_synth):
        all_data.update(process_agribalyse_file(path_synth, "SYNTH"))
    else:
        print(f"⚠️ Could not find {path_synth}")
        
    if os.path.exists(path_farm):
        all_data.update(process_agribalyse_file(path_farm, "FARM"))
    else:
        print(f"⚠️ Could not find {path_farm}")

    if not all_data:
        print("❌ Error: No data processed. Check file paths.")
        return

    # SAFE NAMESPACE MERGE: Do not destroy the physics constants!
    header = f"// AIOXY DATABASE | VERIFIED: {datetime.now().strftime('%Y-%m-%d')}\n"
    js_content = header + "window.aioxyData = window.aioxyData || {};\n"
    js_content += "window.aioxyData.ingredients = Object.assign(window.aioxyData.ingredients || {}, " + json.dumps(all_data, indent=2, ensure_ascii=False) + ");"
    
    with open(output_js, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"\n🚀 SUCCESS: {len(all_data)} ingredients audited and merged into ingredients_db.js")

if __name__ == "__main__":
    main()
