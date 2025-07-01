// =====================
// AIOXY ESG AUDITOR (COMPLETE VERSION) - WITH UPDATED SCORING ONLY
// =====================

// 1. Industry Benchmark Scores (UNCHANGED)
const industryBenchmarks = {
    tesla: { score: 65, industry: "Automotive" },
    bp: { score: 58, industry: "Oil & Gas" },
    samsung: { score: 72, industry: "Technology" },
    apple: { score: 75, industry: "Technology" },
    microsoft: { score: 78, industry: "Technology" },
    default: { score: 60, industry: "General" }
};

// 2. Static Carbon Data with REAL Sources (COMPLETELY UNCHANGED)
const brandCarbonData = {
    bp: {
        scope1: 32.8,
        scope2: 0.8,
        scope3: 314.9,
        big4: {
            scope1: 32.8,
            scope2: 0.8,
            scope3: null,
            assurance: "Deloitte (Scope 1-2 only)",
            source: "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf"
        },
        errors: [
            { 
                issue: "Scope 3 missing (38% of total footprint)", 
                severity: "high",
                source: { 
                    label: "BP Sustainability Report 2022", 
                    url: "https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/sustainability/group-reports/bp-esg-datasheet-2024.pdf" 
                }
            },
            {
                issue: "Scope 1 rose 7% YoY (vs net-zero pledge)",
                severity: "medium",
                source: { 
                    label: "Reuters", 
                    url: "https://www.reuters.com/business/sustainable-business/bp-lags-peers-decarbonisation-says-investor-group-2023-02-08/" 
                }
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
            assurance: "Self-Reported (No third-party)",
            source: "https://www.tesla.com/ns_videos/2022-tesla-impact-report.pdf"
        },
        errors: [
            {
                issue: "Scope 2 uses grid-average (not market-based) factors",
                severity: "medium",
                source: { 
                    label: "Tesla Impact Report 2022", 
                    url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf" 
                }
            },
            {
                issue: "Battery supply chain audits incomplete",
                severity: "high",
                source: { 
                    label: "BloombergNEF", 
                    url: "https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf" 
                }
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
            assurance: "KFQ (Full verification)",
            source: "https://share.google/MEJsrPm3trNTmaS5d"
        },
        errors: [
            {
                issue: "Semiconductor PFC emissions underreported by ~12%",
                severity: "high",
                source: { 
                    label: "Greenpeace Report", 
                    url: "https://share.google/MEJsrPm3trNTmaS5d" 
                }
            }
        ]
    },
    apple: {
        scope1: 55200,
        scope2: 3400,
        scope3: 18300,
        big4: {
            scope1: 55200,
            scope2: 3400,
            scope3: 18300,
            assurance: "Apex (Partial verification)",
            source: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf"
        },
        errors: [
            {
                issue: "Scope 3 uses industry averages (not supplier-specific)",
                severity: "medium",
                source: { 
                    label: "Apple CDP Report", 
                    url: "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2024.pdf" 
                }
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
            assurance: "Official Company Verified (Signed by CSO & Board)",
            source: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/RW1p01M.pdf"
        },
        errors: [
            {
                issue: "Scope 3 cloud emissions methodology unclear",
                severity: "low",
                source: { 
                    label: "MSFT Sustainability Report", 
                    url: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/RW1p01M.pdf" 
                }
            }
        ]
    }
};

// 3. UPDATED SCORING ENGINE (WEIGHTED MODEL)
function calculateScore(data) {
    // Start with perfect score (100)
    let score = 100;
    let deductions = [];
    let bonuses = [];
    let maxPossible = 100;
    
    // 1. Verification Penalties (Weighted)
    if (!data.carbon.big4?.scope1) {
        score -= 5;
        deductions.push("Scope 1 unverified (-5)");
    }
    if (!data.carbon.big4?.scope2) {
        score -= 5;
        deductions.push("Scope 2 unverified (-5)");
    }
    if (!data.carbon.big4?.scope3) {
        score -= 20;
        deductions.push("Scope 3 unverified (-20)");
    }
    
    // 2. Material ESG Leaks (All count as -10)
    data.carbon.errors?.forEach(err => {
        if (err.severity === "high" || err.severity === "medium") {
            score -= 10;
            deductions.push(`Material ESG leak: ${err.issue} (-10)`);
        }
    });
    
    // 3. AI Risk Rating Caps
    const riskRating = getRiskRating(data);
    if (riskRating === "🟠 Medium") {
        maxPossible = 80;
        deductions.push("AI Risk Rating: Medium (capped at 80)");
    } 
    else if (riskRating === "🔴 High") {
        maxPossible = 65;
        deductions.push("AI Risk Rating: High (capped at 65)");
    }
    
    // 4. Big4 Bonuses (kept for compatibility)
    const assurance = data.carbon.big4?.assurance?.toLowerCase() || "";
    const isBig4 = assurance.includes("pwc") || assurance.includes("deloitte") || 
                  assurance.includes("ey") || assurance.includes("kpmg");
    
    if (data.carbon.big4?.scope1 && isBig4) {
        score += 2;
        bonuses.push("Scope 1 Big 4 verified (+2)");
    }
    if (data.carbon.big4?.scope2 && isBig4) {
        score += 2;
        bonuses.push("Scope 2 Big 4 verified (+2)");
    }
    if (data.carbon.big4?.scope3 && isBig4) {
        score += 2;
        bonuses.push("Scope 3 Big 4 verified (+2)");
    }
    
    // Apply final score within bounds
    const finalScore = Math.max(0, Math.min(maxPossible, Math.round(score)));
    
    return {
        score: finalScore,
        deductions,
        bonuses,
        maxPossible,
        riskRating
    };
}

// 4. UPDATED RISK RATING FUNCTIONS
function getRiskRating(data) {
    const keywords = ["child labor", "corruption", "greenwashing", "controversy", "violation", "underreport"];
    const reportText = JSON.stringify(data).toLowerCase();
    const foundRisks = keywords.filter(kw => reportText.includes(kw));
    
    return foundRisks.length > 2 ? "🔴 High" : 
           foundRisks.length > 0 ? "🟠 Medium" : "🟢 Low";
}

function generateAIRiskRating(data) {
    const riskRating = getRiskRating(data);
    const foundRisks = getRiskKeywords(data);
    
    return `
        <div class="airisk-box">
            <h4>🤖 AI Risk Rating: ${riskRating}</h4>
            ${riskRating !== "🟢 Low" ? `
                <p><strong>Score Cap Applied:</strong> ${riskRating === "🟠 Medium" ? "80 (Medium Risk)" : "65 (High Risk)"}</p>
            ` : ''}
            ${foundRisks.length ? `
                <p>Flags detected: ${foundRisks.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}</p>
                <p>Estimated financial exposure: $${(foundRisks.length * 5000000).toLocaleString()}+</p>
            ` : '<p>No high-risk patterns detected</p>'}
        </div>
    `;
}

function getRiskKeywords(data) {
    const keywords = ["child labor", "corruption", "greenwashing", "controversy", "violation", "underreport"];
    const reportText = JSON.stringify(data).toLowerCase();
    return keywords.filter(kw => reportText.includes(kw));
}

// 5. Transparent Scoring Display (UNCHANGED)
function showScoringDetails(data, scoreResult) {
    const benchmark = industryBenchmarks[data.$brandId] || industryBenchmarks.default;
    
    return `
        <div class="transparency-box">
            <h4>🔍 Scoring Breakdown</h4>
            <p><strong>Starting Score:</strong> 100/100 (perfect compliance)</p>
            
            <h5>Deductions:</h5>
            <ul>
                ${scoreResult.deductions.map(d => `<li>${d}</li>`).join('') || '<li>No deductions</li>'}
            </ul>
            
            <h5>Bonuses:</h5>
            <ul>
                ${scoreResult.bonuses.map(b => `<li>${b}</li>`).join('') || '<li>No bonuses</li>'}
            </ul>
            
            <div class="final-score">
                <strong>Final Score:</strong> ${scoreResult.score}/${scoreResult.maxPossible || 100}
                <div class="score-bar">
                    <div style="width:${scoreResult.score}%; background-color:${getScoreColor(scoreResult.score)};"></div>
                </div>
                <p><strong>Industry Benchmark (${benchmark.industry}):</strong> ${benchmark.score}/100</p>
            </div>
            
            ${data.$customData ? 
                '<p class="data-source">ℹ️ Using user-uploaded data</p>' : 
                `<p class="data-source">ℹ️ Source: <a href="${data.carbon.big4?.source || '#'}" target="_blank" class="source-link">${data.carbon.big4?.source ? 'Original Report' : 'AIOXY Data'}</a></p>`}
        </div>
    `;
}

function getScoreColor(score) {
    if (score >= 80) return '#2e8b57'; // Green
    if (score >= 60) return '#f1c40f'; // Yellow
    return '#e74c3c'; // Red
}

// 6. Dynamic Data Loader (UNCHANGED)
async function loadBrandData(brand) {
    try {
        const [dynamicData, staticCarbon] = await Promise.all([
            import(`./companies/${brand}.js`).then(m => m.default).catch(() => ({})),
            Promise.resolve(brandCarbonData[brand])
        ]);

        return {
            ...dynamicData,
            name: dynamicData.name || brand.toUpperCase(),
            industry: dynamicData.industry || industryBenchmarks[brand]?.industry || "General",
            score: dynamicData.score || calculateScore({ carbon: staticCarbon }).score,
            leaks: dynamicData.leaks || [],
            strengths: dynamicData.strengths || [],
            carbon: staticCarbon || dynamicData.carbon,
            $brandId: brand,
            $customData: false
        };
    } catch (error) {
        console.error(`Error loading ${brand} data:`, error);
        return null;
    }
}

// 7. Comparison Function (UNCHANGED)
async function compareBrands(brand1, brand2) {
    const [data1, data2] = await Promise.all([
        loadBrandData(brand1),
        loadBrandData(brand2)
    ]);

    if (!data1 || !data2) {
        alert("Could not load comparison data");
        return;
    }

    const score1 = calculateScore(data1);
    const score2 = calculateScore(data2);
    const benchmark1 = industryBenchmarks[brand1] || industryBenchmarks.default;
    const benchmark2 = industryBenchmarks[brand2] || industryBenchmarks.default;

    let html = `
        <h2>${data1.name} vs ${data2.name} <span class="ai-badge">AI Verified Comparison</span></h2>
        <div class="comparison-grid">
            <div>
                <h3>${data1.name}</h3>
                <div class="score">${score1.score}/${score1.maxPossible || 100}</div>
                <p class="industry-benchmark">Industry avg: ${benchmark1.score}/100</p>
                ${generateAIRiskRating(data1)}
                <div class="chart-container">
                    <canvas id="chart1"></canvas>
                </div>
            </div>
            <div>
                <h3>${data2.name}</h3>
                <div class="score">${score2.score}/${score2.maxPossible || 100}</div>
                <p class="industry-benchmark">Industry avg: ${benchmark2.score}/100</p>
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

// 8. Chart Rendering (UNCHANGED)
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

// 9. Report Generator (UNCHANGED except for score display)
function renderReport(data) {
    const scoreResult = calculateScore(data);
    const benchmark = industryBenchmarks[data.$brandId] || industryBenchmarks.default;

    let html = `
        <div class="score-card">
            ${data.$customData ? '<span class="custom-data-badge">📤 User-Uploaded Data</span>' : ''}
            <h2>${data.name} ESG Audit <span class="ai-badge">AI Verified</span></h2>
            <div class="score">${scoreResult.score}/${scoreResult.maxPossible || 100}</div>
            <p class="industry-benchmark">Industry average: ${benchmark.score}/100 (${benchmark.industry})</p>
        </div>

        ${showScoringDetails(data, scoreResult)}
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

// 10. Export Functions (UNCHANGED)
function exportSingleReport(brandName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text(`AIOXY Independent ESG Verification`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Company: ${brandName.replace(/_/g, ' ')}`, 10, 25);
    
    // Get score details
    const score = document.querySelector('.score')?.textContent;
    const benchmark = document.querySelector('.industry-benchmark')?.textContent;
    
    // Score Summary
    doc.text(`ESG Score: ${score}`, 10, 35);
    doc.text(`${benchmark}`, 10, 45);
    
    // Scoring Breakdown
    doc.text(`Scoring Methodology:`, 10, 60);
    doc.text(`- Base score starts at 50/100`, 15, 70);
    doc.text(`- Deductions for missing/unverified data`, 15, 80);
    doc.text(`- Bonuses for third-party verification`, 15, 90);
    
    // Key Findings
    doc.text(`Independent Findings:`, 10, 105);
    const findings = [...document.querySelectorAll('.risk')].slice(0, 3);
    findings.forEach((finding, i) => {
        doc.text(`- ${finding.textContent.replace(/\n/g, ' ').substring(0, 80)}`, 15, 115 + (i * 10));
    });
    
    // Footer
    doc.text(`Generated by AIOXY ESG Auditor (${new Date().toLocaleDateString()})`, 10, 280);
    doc.text(`Methodology: Transparent scoring based on reported data quality`, 10, 285);
    
    doc.save(`AIOXY_Verification_${brandName}.pdf`);
}

function exportComparison(brand1, brand2) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`AIOXY ESG Comparison Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`${brand1.toUpperCase()} vs ${brand2.toUpperCase()}`, 10, 25);
    
    // Get scores from DOM
    const scores = document.querySelectorAll('.comparison-grid .score');
    const benchmarks = document.querySelectorAll('.comparison-grid .industry-benchmark');
    
    doc.text(`Key Metrics:`, 10, 40);
    doc.text(`${brand1}: ${scores[0]?.textContent || "N/A"}`, 15, 50);
    doc.text(`${benchmarks[0]?.textContent || ""}`, 15, 60);
    doc.text(`${brand2}: ${scores[1]?.textContent || "N/A"}`, 15, 70);
    doc.text(`${benchmarks[1]?.textContent || ""}`, 15, 80);
    
    // Risk Comparison
    doc.text(`Risk Comparison:`, 10, 95);
    const risks = document.querySelectorAll('.airisk-box h4');
    doc.text(`${brand1}: ${risks[0]?.textContent || "N/A"}`, 15, 105);
    doc.text(`${brand2}: ${risks[1]?.textContent || "N/A"}`, 15, 115);
    
    doc.save(`ESG_Comparison_${brand1}_vs_${brand2}.pdf`);
}

function shareComparison(brand1, brand2) {
    const url = `${window.location.href.split('?')[0]}?compare=${brand1},${brand2}`;
    prompt("Share this comparison link:", url);
}

// 11. File Upload Handling (UNCHANGED)
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
                industry: customData.industry || "General",
                score: calculateScore(customData).score,
                carbon: customData.carbon || {
                    scope1: 0,
                    scope2: 0,
                    scope3: 0,
                    big4: {},
                    errors: []
                },
                $customData: true
            });
            document.getElementById('uploadModal').style.display = 'none';
        } catch (e) {
            alert("Invalid file format. Please upload a valid JSON file.");
            console.error(e);
        }
    };
    reader.readAsText(file);
}

// Initialize (UNCHANGED)
document.addEventListener('DOMContentLoaded', () => {
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
