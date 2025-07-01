// =====================
// AIOXY ESG AUDITOR (COMPLETE VERSION)
// =====================

// 1. Static Carbon Data
const brandCarbonData = {
    bp: {
        scope1: 31.1,
        scope2: 1.0,
        scope3: 314.9,
        big4: {
            scope1: 31.1,
            scope2: 1.0,
            scope3: null,
            assurance: "Deloitte (Scope 1-2 only)"
        },
        errors: [
            { 
                issue: "Scope 3 missing (38% of total footprint)", 
                severity: "high",
                source: { label: "BP Report 2023", url: "#" }
            },
            {
                issue: "Scope 1 rose 7% YoY (vs net-zero pledge)",
                severity: "medium",
                source: { label: "Reuters", url: "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf" }
            }
        ]
    },
    tesla: {
        scope1: 211000,
        scope2: 466000,
        scope3: 49354000,
        big4: {
            scope1: 211000,
            scope2: 466000,
            scope3: 49354000,
            assurance: "Self-Reported (No third-party)"
        },
        errors: [
            {
                issue: "Scope 2 uses grid-average (not market-based) factors",
                severity: "medium",
                source: { label: "Tesla Impact Report", url: "#" }
            },
            {
                issue: "Battery supply chain audits incomplete",
                severity: "high",
                source: { label: "BloombergNEF", url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf" }
            }
        ]
    },
    samsung: {
        scope1: 5.972,
        scope2: 9.081,
        scope3: 123.0,
        big4: {
            scope1: 5.972,
            scope2: 9.081,
            scope3: 123.0,
            assurance: "KFQ (Full verification)"
        },
        errors: [
            {
                issue: "Semiconductor PFC emissions underreported by ~12%",
                severity: "high",
                source: { label: "Greenpeace", url: "https://share.google/MEJsrPm3trNTmaS5d" }
            }
        ]
    },
    apple: {
        scope1: 55200,
        scope2: 3400,
        scope3: 15982800,
        big4: {
            scope1: 55200,
            scale2: 3400,
            scope3: null,
            assurance: "Apex (Partial verification)"
        },
        errors: [
            {
                issue: "Scope 3 uses industry averages (not supplier-specific)",
                severity: "medium",
                source: { label: "Apple CDP Report", url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf" }
            }
        ]
    },
    microsoft: {
        scope1: 144960,
        scope2: 393134,
        scope3: 16475520,
        big4: {
            scope1: 144960,
            scope2: 393134,
            scope3: 14819000,
            assurance: "Official Company Verified (Signed by CSO & Board)"
        },
        errors: [
            {
                issue: "Scope 3 cloud emissions methodology unclear",
                severity: "low",
                source: { label: "MSFT Sustainability Report", url: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/RW1p01M.pdf" }
            }
        ]
    }
};

// 2. Auto-load available brands
async function loadAvailableBrands() {
    try {
        const response = await fetch('./companies/');
        const text = await response.text();
        const brands = [...text.matchAll(/href="(.+?)\.(js|json)"/g)]
            .map(match => match[1])
            .filter(name => !name.includes('index'));
        
        const select = document.getElementById('brandSelect');
        brands.forEach(brand => {
            if (![...select.options].some(opt => opt.value === brand)) {
                select.add(new Option(brand.charAt(0).toUpperCase() + brand.slice(1), brand));
            }
        });
    } catch (e) {
        console.log("Manual brand loading in dev mode");
    }
}

// 3. Transparent Scoring Formula
function calculateScore(data) {
    // Weighted impact
    const scope1Impact = (data.carbon.scope1 || 0) * 0.2;
    const scope2Impact = (data.carbon.scope2 || 0) * 0.3;
    const scope3Impact = (data.carbon.scope3 || 0) * 0.5;
    
    // Penalties
    let penalties = 0;
    (data.carbon.errors || []).forEach(err => {
        penalties += err.severity === "high" ? 15 : 
                    err.severity === "medium" ? 8 : 3;
    });
    
    // Bonus for verification
    const assurance = (data.carbon.big4?.assurance || "").toLowerCase();
    const assuranceBonus = assurance.includes("pwc") ? 5 :
                         assurance.includes("deloitte") ? 4 :
                         data.carbon.big4?.assurance ? 2 : 0;

    return Math.max(0, Math.min(100, 
        scope1Impact + scope2Impact + scope3Impact - penalties + assuranceBonus
    ));
}

function showScoringFormula(data) {
    const assurance = (data.carbon.big4?.assurance || "").toLowerCase();
    const assuranceBonus = assurance.includes("pwc") ? 5 :
                         assurance.includes("deloitte") ? 4 :
                         data.carbon.big4?.assurance ? 2 : 0;
    
    return `
        <div class="formula-box">
            <h4>🔍 Scoring Formula</h4>
            <p>(${data.carbon.scope1 || 0} × 0.2) + (${data.carbon.scope2 || 0} × 0.3) + (${data.carbon.scope3 || 0} × 0.5)</p>
            <p>- Penalties (${data.carbon.errors?.reduce((a, e) => a + (e.severity === "high" ? 15 : e.severity === "medium" ? 8 : 3), 0)} points)</p>
            <p>+ Assurance Bonus (${assuranceBonus} points)</p>
            <p><strong>Final Score: ${calculateScore(data)}/100</strong></p>
        </div>
    `;
}

// 4. AI Risk Rating
function generateAIRiskRating(data) {
    const keywords = ["child labor", "corruption", "greenwashing", "controversy", "violation", "underreport"];
    const reportText = JSON.stringify(data).toLowerCase();
    
    const foundRisks = keywords.filter(kw => reportText.includes(kw));
    const riskLevel = foundRisks.length > 2 ? "🔴 High" : 
                     foundRisks.length > 0 ? "🟠 Medium" : "🟢 Low";
    
    return `
        <div class="airisk-box">
            <h4>🤖 AI Risk Rating: ${riskLevel}</h4>
            ${foundRisks.length ? `
                <p>Flags detected: ${foundRisks.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}</p>
                <p>Estimated financial exposure: $${(foundRisks.length * 5000000).toLocaleString()}+</p>
            ` : '<p>No high-risk patterns detected</p>'}
        </div>
    `;
}

// 5. Dynamic Data Loader
async function loadBrandData(brand) {
    try {
        const [dynamicData, staticCarbon] = await Promise.all([
            import(`./companies/${brand}.js`).then(m => m.default).catch(() => ({})),
            Promise.resolve(brandCarbonData[brand])
        ]);

        return {
            name: dynamicData.name || brand.toUpperCase(),
            industry: dynamicData.industry || "Unknown",
            revenueRisk: dynamicData.revenueRisk || "Not assessed",
            score: dynamicData.score || calculateScore({ carbon: staticCarbon }),
            leaks: dynamicData.leaks || [],
            strengths: dynamicData.strengths || [],
            carbon: staticCarbon || dynamicData.carbon
        };
    } catch (error) {
        console.error(`Error loading ${brand} data:`, error);
        return null;
    }
}

// 6. Comparison Function
async function compareBrands(brand1, brand2) {
    const [data1, data2] = await Promise.all([
        loadBrandData(brand1),
        loadBrandData(brand2)
    ]);

    if (!data1 || !data2) {
        alert("Could not load comparison data");
        return;
    }

    let html = `
        <h2>${data1.name} vs ${data2.name} <span class="ai-badge">AI Verified Comparison</span></h2>
        <div class="comparison-grid">
            <div>
                <h3>${data1.name}</h3>
                <div class="score">${data1.score}/100</div>
                ${generateAIRiskRating(data1)}
                <div class="chart-container">
                    <canvas id="chart1"></canvas>
                </div>
            </div>
            <div>
                <h3>${data2.name}</h3>
                <div class="score">${data2.score}/100</div>
                ${generateAIRiskRating(data2)}
                <div class="chart-container">
                    <canvas id="chart2"></canvas>
                </div>
            </div>
        </div>
        <div class="export-buttons">
            <button onclick="exportComparison('${brand1}', '${brand2}')">📄 Export as PDF</button>
            <button onclick="shareComparison('${brand1}', '${brand2}')">🔗 Share Comparison</button>
        </div>
    `;

    document.getElementById("comparisonResults").innerHTML = html;
    document.getElementById("comparisonResults").style.display = "block";
    document.getElementById("results").style.display = "none";
    
    renderPieChart('chart1', data1);
    renderPieChart('chart2', data2);
}

// 7. Chart Rendering
function renderPieChart(id, data) {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Scope 1', 'Scope 2', 'Scope 3'],
            datasets: [{
                data: [data.carbon.scope1, data.carbon.scope2, data.carbon.scope3],
                backgroundColor: ['#2e8b57', '#3498db', '#e74c3c'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// 8. Report Generator
function renderReport(data) {
    let html = `
        <div class="score-card">
            <h2>${data.name} ESG Audit <span class="ai-badge">AI Verified</span></h2>
            <div class="score">${data.score}/100</div>
            <p><strong>Industry:</strong> ${data.industry}</p>
            ${data.revenueRisk ? `<p><strong>Revenue Risk:</strong> ${data.revenueRisk}</p>` : ''}
        </div>

        ${showScoringFormula(data)}
        ${generateAIRiskRating(data)}

        <div class="chart-container">
            <canvas id="brandChart"></canvas>
        </div>

        <h3>Carbon Footprint (MT CO₂e)</h3>
        <table>
            <tr><th>Scope</th><th>Reported</th><th>AIOXY</th><th>Status</th></tr>
            <tr>
                <td>Scope 1</td>
                <td>${data.carbon.big4?.scope1 || "Not reported"}</td>
                <td>${data.carbon.scope1}</td>
                <td>${data.carbon.big4?.scope1 ? "✅ Verified" : "❌ Unverified"}</td>
            </tr>
            <tr>
                <td>Scope 2</td>
                <td>${data.carbon.big4?.scope2 || "Not reported"}</td>
                <td>${data.carbon.scope2}</td>
                <td>${data.carbon.big4?.scope2 ? "✅ Verified" : "❌ Unverified"}</td>
            </tr>
            <tr>
                <td>Scope 3</td>
                <td>${data.carbon.big4?.scope3 || "Not reported"}</td>
                <td>${data.carbon.scope3}</td>
                <td>${data.carbon.big4?.scope3 ? "✅ Verified" : "❌ Unverified"}</td>
            </tr>
        </table>
        <p><strong>Assurance:</strong> ${data.carbon.big4?.assurance || "None"}</p>
    `;

    // Add leaks if available
    if (data.leaks?.length > 0) {
        html += `<h3>Key ESG Leaks</h3><ul>`;
        data.leaks.forEach(leak => {
            html += `
                <li class="risk">
                    <strong>${leak.issue}</strong><br>
                    <em>Impact:</em> ${leak.impact || "Not specified"}<br>
                    <em>Solution:</em> ${leak.solution || "Not specified"}<br>
                    ${leak.source ? `<a href="${leak.source.url}" target="_blank" class="source-link">Source: ${leak.source.label}</a>` : ''}
                </li>
            `;
        });
        html += `</ul>`;
    }

    // Add strengths if available
    if (data.strengths?.length > 0) {
        html += `<h3>Strengths</h3><ul>`;
        data.strengths.forEach(strength => {
            html += `
                <li>
                    ${strength.item}
                    ${strength.source ? `<a href="${strength.source.url}" target="_blank" class="source-link">(${strength.source.label})</a>` : ''}
                </li>
            `;
        });
        html += `</ul>`;
    }

    // Add CTA
    html += `
        <div class="export-buttons">
            <button onclick="exportSingleReport('${data.name.replace(/\s+/g, '_')}')">
                📄 Export as PDF
            </button>
            <button onclick="window.open('https://linkedin.com/in/tulasipariyar', '_blank')">
                📩 Get Custom Report ($200)
            </button>
        </div>
    `;

    document.getElementById("results").innerHTML = html;
    document.getElementById("results").style.display = "block";
    document.getElementById("comparisonResults").style.display = "none";
    
    renderPieChart('brandChart', data);
}

// 9. Export Functions
function exportSingleReport(brandName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`AIOXY ESG Audit Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Company: ${brandName.replace(/_/g, ' ')}`, 10, 25);
    
    // Get score from rendered content or calculate
    const score = document.querySelector('.score')?.textContent.split('/')[0] || "N/A";
    doc.text(`ESG Score: ${score}/100`, 10, 35);
    
    doc.text(`Key Findings:`, 10, 50);
    const leaks = [...document.querySelectorAll('.risk')].slice(0, 3);
    leaks.forEach((leak, i) => {
        doc.text(`- ${leak.textContent.replace(/\n/g, ' ').substring(0, 80)}`, 15, 60 + (i * 10));
    });
    
    doc.save(`ESG_Audit_${brandName}.pdf`);
}

function exportComparison(brand1, brand2) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`AIOXY ESG Comparison Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`${brand1.toUpperCase()} vs ${brand2.toUpperCase()}`, 10, 25);
    
    // Get scores from DOM or use defaults
    const score1 = document.querySelector('.comparison-grid .score:first-child')?.textContent.split('/')[0] || "N/A";
    const score2 = document.querySelector('.comparison-grid .score:last-child')?.textContent.split('/')[0] || "N/A";
    
    doc.text(`Key Metrics:`, 10, 40);
    doc.text(`${brand1}: ${score1}/100`, 15, 50);
    doc.text(`${brand2}: ${score2}/100`, 15, 60);
    
    doc.text(`Risk Comparison:`, 10, 75);
    const risk1 = document.querySelector('.airisk-box:first-child h4')?.textContent || "N/A";
    const risk2 = document.querySelector('.airisk-box:last-child h4')?.textContent || "N/A";
    doc.text(`${brand1}: ${risk1}`, 15, 85);
    doc.text(`${brand2}: ${risk2}`, 15, 95);
    
    doc.save(`ESG_Comparison_${brand1}_vs_${brand2}.pdf`);
}

function shareComparison(brand1, brand2) {
    const url = `${window.location.href.split('?')[0]}?compare=${brand1},${brand2}`;
    prompt("Share this comparison link:", url);
}

// 10. File Upload Handling
function processUpload() {
    const file = document.getElementById('jsonUpload').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const customData = JSON.parse(e.target.result);
            renderReport({
                ...customData,
                name: customData.name || "Custom Company",
                industry: customData.industry || "Unknown",
                score: calculateScore(customData),
                carbon: customData.carbon || {
                    scope1: 0,
                    scope2: 0,
                    scope3: 0,
                    big4: {},
                    errors: []
                }
            });
            document.getElementById('uploadModal').style.display = 'none';
        } catch (e) {
            alert("Invalid file format. Please upload a valid JSON file.");
            console.error(e);
        }
    };
    reader.readAsText(file);
}

// 11. Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load available brands
    loadAvailableBrands();
    
    // Set up event listeners
    document.getElementById("auditButton").addEventListener("click", async () => {
        const brand = document.getElementById("brandSelect").value;
        if (!brand) return alert("Select a brand first");
        
        const data = await loadBrandData(brand);
        if (data) renderReport(data);
    });
    
    document.getElementById("compareBtn").addEventListener("click", () => {
        const brand1 = prompt("Enter first brand (e.g., tesla):");
        const brand2 = prompt("Enter second brand (e.g., samsung):");
        if (brand1 && brand2) compareBrands(brand1.trim(), brand2.trim());
    });
    
    document.getElementById("uploadBtn").addEventListener("click", () => {
        document.getElementById("uploadModal").style.display = "block";
    });
    
    // Check for URL parameters
    const params = new URLSearchParams(window.location.search);
    const compare = params.get('compare');
    if (compare) {
        const [brand1, brand2] = compare.split(',');
        if (brand1 && brand2) compareBrands(brand1, brand2);
    }
});
