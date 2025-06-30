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
                source: { label: "BP Report 2023", url: "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf" }
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
                issue: "Scope 2 uses grid-average factors",
                severity: "medium",
                source: { label: "Tesla Impact Report", url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf" }
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
                issue: "Semiconductor PFC emissions underreported",
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
            scope2: 3400,
            scope3: null,
            assurance: "Apex (Partial verification)"
        },
        errors: [
            {
                issue: "Scope 3 uses industry averages",
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
                issue: "Cloud methodology unclear",
                severity: "low",
                source: { label: "MSFT Report", url: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/RW1p01M.pdf" }
            }
        ]
    }
};

// 2. ESG Scoring Algorithm
function calculateScore(data) {
    let score = 100;
    
    // Penalties
    if (!data.carbon.big4.scope3) score -= 25;
    if (!data.carbon.big4.assurance.includes("third-party")) score -= 15;
    
    data.carbon.errors.forEach(err => {
        if (err.severity === "high") score -= 10;
        else if (err.severity === "medium") score -= 5;
        else score -= 2;
    });
    
    return Math.max(0, Math.round(score));
}

// 3. Dynamic Data Loader
async function loadBrandData(brand) {
    try {
        // Load both static and dynamic data
        const [dynamicData, staticCarbon] = await Promise.all([
            import(`./companies/${brand}.js`).then(m => m.default).catch(() => ({})),
            Promise.resolve(brandCarbonData[brand])
        ]);

        // Merge datasets
        return {
            name: dynamicData.name || brand.toUpperCase(),
            industry: dynamicData.industry || "Unknown",
            revenueRisk: dynamicData.revenueRisk || "Not assessed",
            score: dynamicData.score || calculateScore({ carbon: staticCarbon }),
            leaks: dynamicData.leaks || [],
            strengths: dynamicData.strengths || [],
            carbon: staticCarbon
        };
    } catch (error) {
        console.error(`Error loading ${brand} data:`, error);
        return null;
    }
}

// 4. NEW: COMPARISON FUNCTION
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
                <div class="chart-container">
                    <canvas id="chart1"></canvas>
                </div>
                <h4>Key Risks</h4>
                <ul>
                    ${data1.carbon.errors.slice(0, 3).map(err => 
                        `<li class="risk">${err.issue}</li>`
                    ).join('')}
                </ul>
            </div>
            <div>
                <h3>${data2.name}</h3>
                <div class="score">${data2.score}/100</div>
                <div class="chart-container">
                    <canvas id="chart2"></canvas>
                </div>
                <h4>Key Risks</h4>
                <ul>
                    ${data2.carbon.errors.slice(0, 3).map(err => 
                        `<li class="risk">${err.issue}</li>`
                    ).join('')}
                </ul>
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

// 5. NEW: PIE CHART RENDERER
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

// 6. NEW: EXPORT FUNCTIONS
function exportComparison(brand1, brand2) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`AIOXY ESG Comparison Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`${brand1.toUpperCase()} vs ${brand2.toUpperCase()}`, 10, 25);
    
    // Add some sample content (in production, use html2canvas)
    doc.text(`Key Findings:`, 10, 40);
    doc.text(`- ${brand1} ESG Score: ${brandCarbonData[brand1].score || calculateScore({ carbon: brandCarbonData[brand1] })}/100`, 15, 50);
    doc.text(`- ${brand2} ESG Score: ${brandCarbonData[brand2].score || calculateScore({ carbon: brandCarbonData[brand2] })}/100`, 15, 60);
    
    doc.save(`ESG_Comparison_${brand1}_vs_${brand2}.pdf`);
}

function shareComparison(brand1, brand2) {
    const url = `${window.location.href.split('?')[0]}?compare=${brand1},${brand2}`;
    prompt("Share this comparison link:", url);
}

// 7. REPORT GENERATOR (Original Function)
function renderReport(data) {
    let html = `
        <div class="score-card">
            <h2>${data.name} ESG Audit <span class="ai-badge">AI Verified</span></h2>
            <div class="score">${data.score}/100</div>
            <p><strong>Industry:</strong> ${data.industry}</p>
            ${data.revenueRisk ? `<p><strong>Revenue Risk:</strong> ${data.revenueRisk}</p>` : ''}
        </div>

        <div class="chart-container">
            <canvas id="brandChart"></canvas>
        </div>

        <h3>Carbon Footprint (MT CO₂e)</h3>
        <table>
            <tr><th>Scope</th><th>Big 4 Value</th><th>AIOXY Value</th><th>Status</th></tr>
            <tr>
                <td>Scope 1</td>
                <td>${data.carbon.big4.scope1 || "Not reported"}</td>
                <td>${data.carbon.scope1}</td>
                <td>${data.carbon.big4.scope1 ? "✅ Verified" : "❌ Unverified"}</td>
            </tr>
            <tr>
                <td>Scope 2</td>
                <td>${data.carbon.big4.scope2 || "Not reported"}</td>
                <td>${data.carbon.scope2}</td>
                <td>${data.carbon.big4.scope2 ? "✅ Verified" : "❌ Unverified"}</td>
            </tr>
            <tr>
                <td>Scope 3</td>
                <td>${data.carbon.big4.scope3 || "Not reported"}</td>
                <td>${data.carbon.scope3}</td>
                <td>${data.carbon.big4.scope3 ? "✅ Verified" : "❌ Unverified"}</td>
            </tr>
        </table>
        <p><strong>Assurance:</strong> ${data.carbon.big4.assurance}</p>
    `;

    // Add leaks if available
    if (data.leaks.length > 0) {
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
    if (data.strengths.length > 0) {
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
            <button onclick="exportSingleReport('${brandSelect.value}')">
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
    
    // Render chart
    renderPieChart('brandChart', data);
}

// 8. Single Report Export
function exportSingleReport(brand) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`AIOXY ESG Audit Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Company: ${brand.toUpperCase()}`, 10, 25);
    
    // Add some sample content
    const score = brandCarbonData[brand].score || calculateScore({ carbon: brandCarbonData[brand] });
    doc.text(`ESG Score: ${score}/100`, 10, 35);
    
    doc.text(`Key Findings:`, 10, 50);
    brandCarbonData[brand].errors.slice(0, 3).forEach((err, i) => {
        doc.text(`- ${err.issue}`, 15, 60 + (i * 10));
    });
    
    doc.save(`ESG_Audit_${brand}.pdf`);
}

// 9. Initialize Event Listeners
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

// 10. Check for URL comparison parameter
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const compare = params.get('compare');
    if (compare) {
        const [brand1, brand2] = compare.split(',');
        if (brand1 && brand2) compareBrands(brand1, brand2);
    }
});
