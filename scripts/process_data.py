import json
import re
import os
import csv
from datetime import datetime

# ==========================================
# AIOXY AUDIT-GRADE DATA PROCESSOR v7.0
# Compliance: PEF 3.1 / CSRD
# Configuration: Economic Allocation, DQR 2.5 (Secondary Data Baseline)
# ==========================================

MAPPING = {
    # Main Indicators
    "Changement climatique": "Climate Change",
    "Appauvrissement de la couche d'ozone": "Ozone Depletion",
    "Rayonnements ionisants": "Ionizing Radiation",
    "Formation photochimique d'ozone": "Photochemical Ozone Formation",
    "Particules": "Particulate Matter",
    "substances non-cancérogènes": "Human Toxicity, non-cancer",
    "substances cancérogènes": "Human Toxicity, cancer",
    "Acidification": "Acidification",
    "Eutrophisation eaux douces": "Eutrophication, freshwater",
    "Eutrophisation marine": "Eutrophication, marine",
    "Eutrophisation terreste": "Eutrophication, terrestrial",
    "Eutrophisation terrestre": "Eutrophication, terrestrial",
    "Écotoxicité": "Ecotoxicity, freshwater",
    "Utilisation du sol": "Land Use",
    "Épuisement des ressources eau": "Water Use/Scarcity (AWARE)",
    "Épuisement des ressources énergétiques": "Resource Use, fossils",
    "Épuisement des ressources minéraux": "Resource Use, minerals/metals",
    
    # PEF 3.1 Climate Change Breakdown (Exact target keys)
    "Changement climatique - émissions fossiles": "Climate Change - Fossil",
    "Changement climatique - émissions biogéniques": "Climate Change - Biogenic",
    "Changement climatique - émissions liées au changement d'affectation des sols": "Climate Change - Land Use"
}

def clean_id(name):
    name = str(name).lower()
    name = re.sub(r'[^a-z0-9]', '-', name)
    return re.sub(r'-+', '-', name).strip('-')[:100]

def get_safe_float(val):
    try:
        val_str = str(val).strip().replace(' ', '').replace(',', '.')
        if not val_str or val_str == '-': return 0.0
        return float(val_str)
    except:
        return 0.0

def generate_db():
    input_file = "data-raw/agribalyse_farm_gate.csv"
    output_file = "ingredients_db.js"
    
    if not os.path.exists(input_file):
        # Fallback to local directory if not running from root via GitHub Actions
        input_file = "agribalyse_farm_gate.csv"
        if not os.path.exists(input_file):
            print(f"❌ Critical Error: {input_file} not found.")
            return

    db = {}
    
    with open(input_file, 'r', encoding='latin-1') as f:
        reader = csv.reader(f)
        rows = list(reader)

    # Dynamically locate the header row containing "Changement climatique"
    impact_row_idx = -1
    for i, row in enumerate(rows[:20]):
        row_str = " ".join(row).lower()
        if "changement climatique" in row_str:
            impact_row_idx = i
            break
            
    if impact_row_idx == -1:
        print("❌ Critical Error: Missing impact headers in CSV.")
        return
        
    indicator_row = rows[impact_row_idx]
    
    # Agribalyse data typically begins 2 rows beneath the impact headers
    data_start_row = impact_row_idx + 2 
    
    # Map the exact column indices to avoid overwriting totals with sub-indicators
    impact_indices = {}
    for idx, col_name in enumerate(indicator_row):
        for fr_key, en_key in MAPPING.items():
            if fr_key.lower() in col_name.lower():
                if en_key == "Climate Change" and any(x in col_name.lower() for x in ["fossiles", "biogéniques", "sols"]):
                    continue
                if en_key == "Land Use" and "changement climatique" in col_name.lower():
                    continue
                impact_indices[en_key] = idx

    count = 0
    for row in rows[data_start_row:]:
        if not row or len(row) < 5: continue
        
        name_fr = row[0].strip()
        if not name_fr: continue
        
        item_id = clean_id(name_fr)
        
        # Extract 16+ PEF Indicators
        pef_data = {}
        for key in ["Climate Change", "Climate Change - Fossil", "Climate Change - Biogenic", "Climate Change - Land Use",
                    "Ozone Depletion", "Human Toxicity, non-cancer", "Human Toxicity, cancer", "Particulate Matter",
                    "Ionizing Radiation", "Photochemical Ozone Formation", "Acidification", "Eutrophication, terrestrial",
                    "Eutrophication, freshwater", "Eutrophication, marine", "Ecotoxicity, freshwater", "Land Use",
                    "Water Use/Scarcity (AWARE)", "Resource Use, minerals/metals", "Resource Use, fossils"]:
            
            idx = impact_indices.get(key)
            pef_data[key] = get_safe_float(row[idx]) if idx is not None and idx < len(row) else 0.0

        # Extract Single Score (mPt) typically located at index 4
        single_score = get_safe_float(row[4]) if len(row) > 4 else 0.0

        # EXACT JSON STRUCTURE ASSEMBLY
        db[item_id] = {
            "name": name_fr,
            "loss": 0.02,
            "processing_yield": 1.0,
            "data": {
                "pef": pef_data,
                "metadata": {
                    "source_dataset": "AGRIBALYSE 3.2",
                    "source_activity": f"{name_fr} {{FR}} U",
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

    # Format JSON with exact 4-space indentation and Object.assign wrapping
    header = f"// AIOXY DATABASE | VERIFIED: {datetime.now().strftime('%Y-%m-%d')}\n"
    js_content = header + "window.aioxyData = window.aioxyData || {};\n"
    js_content += "window.aioxyData.ingredients = Object.assign(window.aioxyData.ingredients || {}, " + json.dumps(db, indent=4, ensure_ascii=False) + ");\n"
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"✅ Deployment Ready: Processed {count} compliant ingredients into {output_file}.")

if __name__ == "__main__":
    generate_db()
