/**
 * AIOXY PCF Tool - CO₂ + Water Footprint Calculator
 * Updated: TODAY | Verified: Gemini + Manual Review
 * License: Open-source (Credit Aioxy)
 */

// ================== EMISSION FACTORS DATASET ==================
const PCFFactors = {
  materials: {
    'plastic-virgin': { 
      co2: { 'Germany': 2.8, 'UK': 2.75, 'France': 2.6, 'Japan': 2.9, 'US': 3.0, 'China': 3.2, 'global': 2.7 },
      water: 234 // L/kg (Virgin PET)
    },
    'plastic-recycled': { 
      co2: { 'Germany': 0.6, 'UK': 0.55, 'France': 0.5, 'Japan': 0.65, 'US': 0.7, 'China': 0.8, 'global': 0.5 },
      water: 56 // L/kg (Recycled PET)
    },
    'rubber': { 
      co2: { 'Germany': 1.9, 'UK': 1.85, 'France': 1.8, 'Japan': 2.0, 'US': 2.1, 'China': 2.2, 'global': 1.8 },
      water: 2000 // L/kg (Estimate)
    },
    'leather': { 
      co2: { 'Germany': 10.5, 'UK': 10.2, 'France': 9.8, 'Japan': 10.7, 'US': 11.0, 'China': 11.5, 'global': 10.0 },
      water: 17093 // L/kg
    },
    'steel': { 
      co2: { 'Germany': 2.0, 'UK': 2.05, 'France': 1.9, 'Japan': 2.2, 'US': 2.3, 'China': 2.5, 'global': 2.1 },
      water: 100 // L/kg
    },
    'aluminum': { 
      co2: { 'Germany': 10.5, 'UK': 10.8, 'France': 10.0, 'Japan': 11.2, 'US': 11.5, 'China': 12.0, 'global': 11.0 },
      water: 15 // L/kg
    },
    'glass': { 
      co2: { 'Germany': 1.2, 'UK': 1.25, 'France': 1.1, 'Japan': 1.4, 'US': 1.5, 'China': 1.6, 'global': 1.3 },
      water: 28 // L/kg
    },
    'cardboard': { 
      co2: { 'Germany': 0.9, 'UK': 0.95, 'France': 0.85, 'Japan': 1.0, 'US': 1.1, 'China': 1.2, 'global': 0.94 },
      water: 2000 // L/kg
    },
    'nylon-recycled': { 
      co2: { 'Germany': 0.6, 'UK': 0.55, 'France': 0.5, 'Japan': 0.65, 'US': 0.7, 'China': 0.8, 'global': 0.6 },
      water: 71 // L/kg (Polyester proxy)
    },
    'cotton': { 
      co2: { 'Germany': 3.5, 'UK': 3.4, 'France': 3.3, 'Japan': 3.6, 'US': 3.7, 'China': 4.0, 'global': 3.6 },
      water: 8920 // L/kg
    },
    'polyester': { 
      co2: { 'Germany': 4.2, 'UK': 4.1, 'France': 4.0, 'Japan': 4.3, 'US': 4.5, 'China': 4.8, 'global': 4.3 },
      water: 71 // L/kg
    }
  },
  energy: {
    'grid': { 'Germany': 0.362, 'UK': 0.189, 'France': 0.051, 'Japan': 0.395, 'US': 0.352, 'China': 0.573, 'global': 0.475 },
    'solar': { 'Germany': 0.04, 'UK': 0.045, 'France': 0.035, 'Japan': 0.05, 'US': 0.05, 'China': 0.06, 'global': 0.045 },
    'wind': { 'Germany': 0.012, 'UK': 0.015, 'France': 0.01, 'Japan': 0.018, 'US': 0.015, 'China': 0.02, 'global': 0.015 },
    'hydro': { 'Germany': 0.01, 'UK': 0.012, 'France': 0.008, 'Japan': 0.015, 'US': 0.013, 'China': 0.018, 'global': 0.012 },
    'biomass': { 'Germany': 0.05, 'UK': 0.06, 'France': 0.045, 'Japan': 0.07, 'US': 0.08, 'China': 0.09, 'global': 0.06 }
  },
  transport: {
    'road': { 'Germany': 0.115, 'UK': 0.120, 'France': 0.110, 'Japan': 0.125, 'US': 0.130, 'China': 0.140, 'global': 0.120 },
    'air': { 'Germany': 0.560, 'UK': 0.570, 'France': 0.550, 'Japan': 0.580, 'US': 0.590, 'China': 0.600, 'global': 0.570 },
    'sea': { 'Germany': 0.014, 'UK': 0.015, 'France': 0.013, 'Japan': 0.016, 'US': 0.015, 'China': 0.017, 'global': 0.015 },
    'rail': { 'Germany': 0.028, 'UK': 0.030, 'France': 0.025, 'Japan': 0.032, 'US': 0.035, 'China': 0.040, 'global': 0.030 },
    'electric-vehicle': { 'Germany': 0.03, 'UK': 0.035, 'France': 0.025, 'Japan': 0.04, 'US': 0.045, 'China': 0.06, 'global': 0.04 },
    'inland-waterway': { 'Germany': 0.01, 'UK': 0.012, 'France': 0.009, 'Japan': 0.015, 'US': 0.011, 'China': 0.013, 'global': 0.011 }
  }
};

// ================== CORE FUNCTIONS ==================
let currentQRCode = null;

function addMaterial() {
  const container = document.getElementById('materials-container');
  const newRow = document.createElement('div');
  newRow.className = 'input-row';
  newRow.innerHTML = `
    <select class="material-type">
      <option value="plastic-virgin">Virgin Plastic</option>
      <option value="plastic-recycled">Recycled Plastic</option>
      <option value="rubber">Rubber</option>
      <option value="leather">Leather</option>
      <option value="steel">Steel</option>
      <option value="aluminum">Aluminum</option>
      <option value="glass">Glass</option>
      <option value="cardboard">Cardboard</option>
      <option value="nylon-recycled">Nylon-Recycled</option>
      <option value="cotton">Cotton</option>
      <option value="polyester">Polyester</option>
    </select>
    <input type="number" class="material-weight" placeholder="kg" step="0.01">
    <input type="number" class="material-water" placeholder="Actual water (L)" step="1">
    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(newRow);
}

function addTransport() {
  const container = document.getElementById('transport-container');
  const newRow = document.createElement('div');
  newRow.className = 'input-row';
  newRow.innerHTML = `
    <select class="transport-mode">
      <option value="road">Road Freight</option>
      <option value="air">Air Freight</option>
      <option value="sea">Sea Freight</option>
      <option value="rail">Rail</option>
      <option value="electric-vehicle">Electric-Vehicle</option>
      <option value="inland-waterway">Inland-Waterway</option>
    </select>
    <input type="number" class="transport-distance" placeholder="km" step="1">
    <input type="number" class="transport-weight" placeholder="kg" step="0.01">
    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(newRow);
}

function calculatePCF() {
  const country = document.getElementById('product-country').value;
  
  // 1. Materials Calculation (CO₂ + Water)
  let materialCO2 = 0;
  let totalWaterUsed = 0;
  let totalWaterSaved = 0;
  const materialsLog = [];
  
  document.querySelectorAll('#materials-container .input-row').forEach(row => {
    const type = row.querySelector('.material-type').value;
    const weight = parseFloat(row.querySelector('.material-weight').value) || 0;
    const waterUsed = parseFloat(row.querySelector('.material-water').value) || 0;
    const co2Factor = PCFFactors.materials[type].co2[country] || PCFFactors.materials[type].co2['global'];
    const waterBenchmark = PCFFactors.materials[type].water * weight;
    const waterSaved = waterBenchmark - waterUsed;

    materialCO2 += weight * co2Factor;
    totalWaterUsed += waterUsed;
    totalWaterSaved += waterSaved;

    materialsLog.push({
      name: type.replace('-', ' '),
      weight,
      co2: weight * co2Factor,
      waterUsed,
      waterSaved,
      waterBenchmark,
      co2Factor: co2Factor.toFixed(3)
    });
  });

  // 2. Energy Calculation
  const energyType = document.getElementById('energy-type').value;
  const energyAmount = parseFloat(document.getElementById('energy-amount').value) || 0;
  const energyFactor = PCFFactors.energy[energyType][country] || PCFFactors.energy[energyType]['global'];
  const energyCO2 = energyAmount * energyFactor;

  // 3. Transport Calculation
  let transportCO2 = 0;
  const transportLog = [];
  document.querySelectorAll('#transport-container .input-row').forEach(row => {
    const mode = row.querySelector('.transport-mode').value;
    const distance = parseFloat(row.querySelector('.transport-distance').value) || 0;
    const weight = parseFloat(row.querySelector('.transport-weight').value) || 0;
    const factor = PCFFactors.transport[mode][country] || PCFFactors.transport[mode]['global'];
    const co2 = (weight * distance * factor) / 1000;
    transportCO2 += co2;
    transportLog.push({
      mode,
      distance,
      weight,
      co2,
      factor: factor.toFixed(3)
    });
  });

  // 4. Final Totals
  const totalCO2 = materialCO2 + energyCO2 + transportCO2;
  const benchmark = parseFloat(document.getElementById('benchmark').value) || 6.0;
  const savedCO2 = benchmark - totalCO2;

  showResults(totalCO2, materialCO2, energyCO2, transportCO2, {
    waterUsed: totalWaterUsed,
    waterSaved: totalWaterSaved,
    materials: materialsLog,
    energy: { type: energyType, amount: energyAmount, co2: energyCO2, factor: energyFactor.toFixed(3) },
    transport: transportLog,
    country,
    savedCO2,
    benchmark
  });
}

function showResults(totalCO2, materialsCO2, energyCO2, transportCO2, data) {
  const sources = {
    'Germany': 'UBA 2024',
    'France': 'ADEME 2024',
    'UK': 'DESNZ 2024',
    'US': 'EPA 2024',
    'China': 'CAEP 2024',
    'Japan': 'MOE Japan 2024',
    'global': 'Weighted Global Average'
  };

  // 1. CO₂ Results
  document.getElementById('result-summary').innerHTML = `
    <h3>${document.getElementById('product-name').value || 'Product'}</h3>
    <p>Total CO₂ Footprint: <strong>${totalCO2.toFixed(2)} kg</strong></p>
    ${data.savedCO2 > 0 ? `<p class="savings">♻️ CO₂ Saved: ${data.savedCO2.toFixed(2)} kg vs. ${data.benchmark.toFixed(2)} kg benchmark</p>` : ''}
    
    <div class="detail-section">
      <h4>🧱 Materials (${materialsCO2.toFixed(2)} kg CO₂)</h4>
      <ul>${data.materials.map(m => `
        <li>${m.weight} kg ${m.name} = ${m.co2.toFixed(2)} kg (${m.co2Factor} kgCO₂e/kg)</li>`
      ).join('')}</ul>
      
      <h4>⚡ Manufacturing (${energyCO2.toFixed(2)} kg CO₂)</h4>
      <p>${data.energy.amount} kWh ${data.energy.type} @ ${data.energy.factor} kg/kWh = ${data.energy.co2.toFixed(2)} kg</p>
      
      <h4>🚚 Transport (${transportCO2.toFixed(2)} kg CO₂)</h4>
      <ul>${data.transport.map(t => `
        <li>${t.weight} kg × ${t.distance} km ${t.mode} @ ${t.factor} kg/ton-km = ${t.co2.toFixed(2)} kg</li>`
      ).join('')}</ul>
    </div>

    <!-- WATER RESULTS -->
    <div class="water-results">
      <h4>💧 Water Footprint</h4>
      <p>Actual Used: <strong>${data.waterUsed.toFixed(0)} L</strong></p>
      <p class="water-savings">✅ Saved: ${data.waterSaved.toFixed(0)} L vs. industry avg</p>
      <ul>${data.materials.map(m => `
        <li>${m.weight} kg ${m.name}: Used ${m.waterUsed.toFixed(0)} L | Saved ${m.waterSaved.toFixed(0)} L</li>`
      ).join('')}</ul>
    </div>
    <p class="source">Data Sources: ${sources[data.country]} + Water Footprint Network</p>
  `;

  // 2. Pie Chart (CO₂ Only)
  const ctx = document.getElementById('chart').getContext('2d');
  if (window.myChart) window.myChart.destroy();
  
  window.myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        `Materials (${((materialsCO2/totalCO2)*100).toFixed(0)}%)`,
        `Manufacturing (${((energyCO2/totalCO2)*100).toFixed(0)}%)`,
        `Transport (${((transportCO2/totalCO2)*100).toFixed(0)}%)`
      ],
      datasets: [{
        data: [materialsCO2, energyCO2, transportCO2],
        backgroundColor: ['#2e8b57', '#3a86ff', '#ff9f1c'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'CO₂ Breakdown', font: { size: 16 } }
      }
    }
  });

  // 3. Generate QR Code
  generateQRCode(totalCO2, data.waterSaved, data.country);
  document.getElementById('results').style.display = 'block';
}

function generateQRCode(totalCO2, waterSaved, country) {
  const qrElement = document.getElementById('qrcode');
  qrElement.innerHTML = '';
  document.getElementById('qr-error').style.display = 'none';
  document.getElementById('downloadQR').style.display = 'none';
  
  if (currentQRCode) currentQRCode.clear();

  const productName = document.getElementById('product-name').value || 'Product';
  const qrText = `AIOXY|${productName}|CO2:${totalCO2.toFixed(2)}kg|WaterSaved:${waterSaved.toFixed(0)}L|${country}`;

  try {
    if (typeof QRCode !== 'undefined') {
      currentQRCode = new QRCode(qrElement, {
        text: qrText,
        width: 180,
        height: 180,
        colorDark: "#2e8b57",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      
      setTimeout(() => {
        const qrImg = qrElement.querySelector('img');
        if (qrImg) {
          document.getElementById('downloadQR').href = qrImg.src;
          document.getElementById('downloadQR').style.display = 'inline-block';
        }
      }, 200);
    } else {
      throw new Error("QRCode library not loaded");
    }
  } catch (e) {
    document.getElementById('qr-error').textContent = "QR generation failed";
    document.getElementById('qr-error').style.display = 'block';
  }
}

// ================== UTILITIES ==================
function saveAsPDF() {
  alert("PDF export coming in v1.1 - Use browser print for now!");
}

function copyResults() {
  const text = document.getElementById('result-summary').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("CO₂ & Water Passport copied to clipboard!");
  });
}

// ================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
  addMaterial();
  addTransport();
  
  // Twitter Share
  document.getElementById('share').addEventListener('click', () => {
    const product = document.getElementById('product-name').value || 'Product';
    const co2 = document.querySelector('#result-summary p')?.innerText || '';
    const water = document.querySelector('.water-savings')?.innerText || '';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check my ${product}'s footprint: ${co2} | ${water} - Generated with @AIOXY #Sustainable`
    )}`);
  });
});
