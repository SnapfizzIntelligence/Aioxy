// Emission Factors Dataset
const PCFFactors = {
    materials: {
        'plastic-virgin': { 'Germany': 2.8, 'UK': 2.75, 'France': 2.6, 'Japan': 2.9, 'US': 3.0, 'China': 3.2, 'global': 2.7 },
        'plastic-recycled': { 'Germany': 0.6, 'UK': 0.55, 'France': 0.5, 'Japan': 0.65, 'US': 0.7, 'China': 0.8, 'global': 0.5 },
        'rubber': { 'Germany': 1.9, 'UK': 1.85, 'France': 1.8, 'Japan': 2.0, 'US': 2.1, 'China': 2.2, 'global': 1.8 },
        'leather': { 'Germany': 10.5, 'UK': 10.2, 'France': 9.8, 'Japan': 10.7, 'US': 11.0, 'China': 11.5, 'global': 10.0 },
        'steel': { 'Germany': 2.0, 'UK': 2.05, 'France': 1.9, 'Japan': 2.2, 'US': 2.3, 'China': 2.5, 'global': 2.1 },
        'aluminum': { 'Germany': 10.5, 'UK': 10.8, 'France': 10.0, 'Japan': 11.2, 'US': 11.5, 'China': 12.0, 'global': 11.0 },
        'glass': { 'Germany': 1.2, 'UK': 1.25, 'France': 1.1, 'Japan': 1.4, 'US': 1.5, 'China': 1.6, 'global': 1.3 },
        'cardboard': { 'Germany': 0.9, 'UK': 0.95, 'France': 0.85, 'Japan': 1.0, 'US': 1.1, 'China': 1.2, 'global': 0.94 },
        'nylon-recycled': { 'Germany': 0.6, 'UK': 0.55, 'France': 0.5, 'Japan': 0.65, 'US': 0.7, 'China': 0.8, 'global': 0.6 },
        'cotton': { 'Germany': 3.5, 'UK': 3.4, 'France': 3.3, 'Japan': 3.6, 'US': 3.7, 'China': 4.0, 'global': 3.6 },
        'polyester': { 'Germany': 4.2, 'UK': 4.1, 'France': 4.0, 'Japan': 4.3, 'US': 4.5, 'China': 4.8, 'global': 4.3 }
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

// QR Code Counter
let qrCounter = 1;

// Core Functions
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

function generateQRCode(total, materials, energy, transport, country, details) {
    const qrElement = document.getElementById('qrcode');
    const qrError = document.getElementById('qr-error');
    const downloadBtn = document.getElementById('downloadQR');
    
    qrElement.innerHTML = '';
    qrError.style.display = 'none';
    
    const productName = document.getElementById('product-name').value || 'Product';
    const benchmark = parseFloat(document.getElementById('benchmark').value) || 6.0;
    const savedCO2 = benchmark - total;
    
    // Create QR data
    const qrData = {
        product: productName,
        CO2e: total.toFixed(2),
        saved: savedCO2.toFixed(2),
        material: details.materials.map(m => `${m.name} ${m.weight}kg`).join(', '),
        energy: `${details.energy.amount}kWh`,
        country: country,
        id: `QR-${qrCounter.toString().padStart(3, '0')}`
    };
    
    // Create HTML preview for QR
    const htmlPreview = `
        data:text/html,
        <!DOCTYPE html>
        <html>
        <head>
            <title>AIOXY CO₂ Passport</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; max-width: 300px; margin: 0 auto; }
                h1 { color: #2e8b57; font-size: 24px; }
                p { font-size: 16px; line-height: 1.5; }
            </style>
        </head>
        <body>
            <h1>${qrData.product}</h1>
            <p>CO₂e: ${qrData.CO2e} kg | Saved: ${qrData.saved} kg</p>
            <p>Materials: ${qrData.material}</p>
            <p>Energy: ${qrData.energy} (${qrData.country})</p>
            <p>ID: ${qrData.id}</p>
        </body>
        </html>
    `;
    
    // Generate QR Code
    try {
        new QRCode(qrElement, {
            text: htmlPreview,
            width: 200,
            height: 200,
            colorDark: "#00FF00",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Enable download button after QR is generated
        setTimeout(() => {
            const qrImg = qrElement.querySelector('img');
            if (qrImg) {
                downloadBtn.href = qrImg.src;
                downloadBtn.style.display = 'inline-block';
            }
        }, 100);
        
        qrCounter++;
    } catch (e) {
        qrError.style.display = 'block';
        console.error("QR generation error:", e);
    }
}

function calculatePCF() {
    const country = document.getElementById('product-country').value;
    
    // Materials Calculation
    let materialCO2 = 0;
    const materialsLog = [];
    document.querySelectorAll('#materials-container .input-row').forEach(row => {
        const type = row.querySelector('.material-type').value;
        const weight = parseFloat(row.querySelector('.material-weight').value) || 0;
        const factor = PCFFactors.materials[type][country] || PCFFactors.materials[type]['global'];
        const co2 = weight * factor;
        materialCO2 += co2;
        materialsLog.push({
            name: type.replace('-', ' '),
            weight,
            co2,
            factor: factor.toFixed(3)
        });
    });

    // Energy Calculation
    const energyType = document.getElementById('energy-type').value;
    const energyAmount = parseFloat(document.getElementById('energy-amount').value) || 0;
    const energyFactor = PCFFactors.energy[energyType][country] || PCFFactors.energy[energyType]['global'];
    const energyCO2 = energyAmount * energyFactor;

    // Transport Calculation
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

    const totalCO2 = materialCO2 + energyCO2 + transportCO2;
    showResults(totalCO2, materialCO2, energyCO2, transportCO2, country, {
        materials: materialsLog,
        energy: { type: energyType, amount: energyAmount, co2: energyCO2, factor: energyFactor.toFixed(3) },
        transport: transportLog
    });
}

function showResults(total, materials, energy, transport, country, details) {
    const sources = {
        'Germany': 'UBA 2024',
        'France': 'ADEME 2024',
        'UK': 'DESNZ 2024',
        'US': 'EPA 2024',
        'China': 'CAEP 2024',
        'Japan': 'MOE Japan 2024',
        'global': 'Weighted Global Average'
    };

    const benchmark = parseFloat(document.getElementById('benchmark').value) || 6.0;
    const savedCO2 = benchmark - total;

    // Results Display
    document.getElementById('result-summary').innerHTML = `
        <h3>${document.getElementById('product-name').value || 'Product'}</h3>
        <p>Total CO₂ Footprint: <strong>${total.toFixed(2)} kg</strong></p>
        ${savedCO2 > 0 ? `<p class="savings">♻️ Saved: ${savedCO2.toFixed(2)} kgCO₂e vs. ${benchmark.toFixed(2)} kg benchmark</p>` : ''}
        <div class="detail-section">
            <h4>🧱 Materials (${materials.toFixed(2)} kg)</h4>
            <ul>${details.materials.map(m => 
                `<li>${m.weight} kg ${m.name} = ${m.co2.toFixed(2)} kg (${m.factor} kgCO₂e/kg)</li>`
            ).join('')}</ul>
            
            <h4>⚡ Manufacturing (${energy.toFixed(2)} kg)</h4>
            <p>${details.energy.amount} kWh ${details.energy.type} @ ${details.energy.factor} kg/kWh = ${details.energy.co2.toFixed(2)} kg</p>
            
            <h4>🚚 Transport (${transport.toFixed(2)} kg)</h4>
            <ul>${details.transport.map(t => 
                `<li>${t.weight} kg × ${t.distance} km ${t.mode} @ ${t.factor} kg/ton-km = ${t.co2.toFixed(2)} kg</li>`
            ).join('')}</ul>
        </div>
        <p class="source">Data Sources: ${sources[country]}</p>
    `;

    // Pie Chart
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                `Materials (${((materials/total)*100).toFixed(0)}%)`,
                `Manufacturing (${((energy/total)*100).toFixed(0)}%)`,
                `Transport (${((transport/total)*100).toFixed(0)}%)`
            ],
            datasets: [{
                data: [materials, energy, transport],
                backgroundColor: ['#2e8b57', '#3a86ff', '#ff9f1c'],
                borderWidth: 1
            }]
        }
    });

    // Generate QR Code
    generateQRCode(total, materials, energy, transport, country, details);
    document.getElementById('results').style.display = 'block';
}

// Export Functions
function saveAsPDF() {
    alert("PDF export coming in v1.1 - Use browser print for now!");
}

function copyResults() {
    const text = document.getElementById('result-summary').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("CO₂ Passport copied to clipboard!");
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addMaterial();
    addTransport();
    
    // Set up social share button
    document.getElementById('share').addEventListener('click', () => {
        const product = document.getElementById('product-name').value || 'Product';
        const co2 = document.querySelector('#result-summary p')?.innerText || '';
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check my ${product}'s carbon footprint: ${co2} - Generated with @AIOXY #BeTheFirst`
        )}`);
    });
});
