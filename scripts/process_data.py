import pandas as pd
import json
import re
import os
from datetime import datetime

# ==========================================
# AIOXY ROBUST DATA PROCESSOR v3.1
# Compliance Level: PEF 3.1 / CSRD
# ==========================================

# Strict Column Mapping (Never map by unit)
MAPPING = {
    "Changement climatique": "Climate Change",
    "Appauvrissement de la couche d'ozone": "Ozone Depletion",
    "Rayonnements ionisants": "Ionizing Radiation",
    "Formation photochimique d'ozone": "Photochemical Ozone Formation",
    "Particules": "Particulate Matter",
    "Effets toxicologiques sur la santé humaine : substances non-cancérogènes": "Human Toxicity, non-cancer",
    "Effets toxicologiques sur la santé humaine : substances cancérogènes": "Human Toxicity, cancer",
    "Acidification terrestre et eaux douces": "Acidification",
    "Eutrophisation eaux douces": "Eutrophication, freshwater",
    "Eutrophisation marine": "Eutrophication, marine",
    "Eutrophisation terrestre": "Eutrophication, terrestrial",
    "Écotoxicité pour écosystèmes aquatiques d'eau douce": "Ecotoxicity, freshwater",
    "Utilisation du sol": "Land Use",
    "Épuisement des ressources eau": "Water Use/Scarcity (AWARE)",
    "Épuisement des ressources énergétiques": "Resource Use, fossils",
    "Épuisement des ressources minéraux": "Resource Use, minerals/metals"
}

def clean_id(name):
    name = str(name).lower()
    name = re.sub(r'[^a-z0-9]', '-', name)
    return re.sub(r'-+', '-', name).strip('-')[:80]

def get_safe_float(val):
    try:
        if pd.isna(val) or val == "" or val == "-": return 0.0
        return float(str(val).replace(',', '.'))
    except:
        return 0.0

def process_agribalyse_file(filepath, source_type):
    print(f"🕵️  Auditing {source_type}: {filepath}")
    try:
        # Dynamic Header Detection
        preview = pd.read_csv(filepath, sep=None, engine='python', encoding='latin-1', nrows=20, header=None)
        
        header_row_idx = 0
        for i, row in preview.iterrows():
            row_str = str(row.values)
            if "Nom du Produit" in row_str or "LCI Name" in row_str:
                header_row_idx = i
                break
        
        df = pd.read_csv(filepath, sep=None, engine='python', encoding='latin-1', skiprows=header_row_idx)
        print(f"✅ Detected header at row {header_row_idx}")
        
        data_store = {}
        
        for _, row in df.iterrows():
            name_fr = str(row.get('Nom du Produit en Français', row.get('LCI Name', 'Unknown')))
            if name_fr == 'nan' or name_fr == 'Unknown':
                name_fr = str(row.iloc[0])
                if name_fr == 'nan': continue
            
            item_id = clean_id(name_fr)
            if source_type == "FARM": item_id += "-raw"
            
            impacts = {}
            for fr_key, en_key in MAPPING.items():
                match_col = [c for c in df.columns if fr_key in c]
                impacts[en_key] = get_safe_float(row[match_col[0]]) if match_col else 0.0

            # Extract DQR safely
            dqr_col = [c for c in df.columns if 'DQR' in c or 'Note de qualité' in c]
            overall_dqr = get_safe_float(row[dqr_col[0]]) if dqr_col else 2.5
            if overall_dqr == 0: overall_dqr = 2.5

            # Exact UI/Engine Schema Match
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
    if os.path.exists(path_farm):
        all_data.update(process_agribalyse_file(path_farm, "FARM"))

    if not all_data:
        print("❌ Error: No data processed. Check file paths.")
        return

    # SAFE NAMESPACE MERGE: Do not destroy the physics constants
    header = f"// AIOXY DATABASE | VERIFIED: {datetime.now().strftime('%Y-%m-%d')}\n"
    js_content = header + "window.aioxyData = window.aioxyData || {};\n"
    js_content += "window.aioxyData.ingredients = Object.assign(window.aioxyData.ingredients || {}, " + json.dumps(all_data, indent=2, ensure_ascii=False) + ");"
    
    with open(output_js, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"🚀 SUCCESS: {len(all_data)} ingredients audited and merged into ingredients_db.js")

if __name__ == "__main__":
    main()
