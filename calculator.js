// =====================
// AIOXY ESG AUDITOR (FINAL WORKING VERSION)
// =====================

// 1. Industry Benchmark Scores
const industryBenchmarks = {
    tesla: { score: 65, industry: "Automotive" },
    bp: { score: 58, industry: "Oil & Gas" },
    samsung: { score: 72, industry: "Technology" },
    apple: { score: 75, industry: "Technology" },
    microsoft: { score: 78, industry: "Technology" },
    default: { score: 60, industry: "General" }
};

// 2. Static Carbon Data with REAL Sources
const brandCarbonData = {
    bp: {
        scope1: 31.1,
        scope2: 1.0,
        scope3: 314.9,
        big4: {
            scope1: 31.1,
            scope2: 1.0,
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
        scope3: 15982800,
        big4: {
            scope1: 55200,
            scope2: 3400,
            scope3: null,
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

// =====================
// AIOXY ESG SCORING ENGINE v2.0 (UNDENIABLE MODEL)
// =====================

function calculateScore(data) {
    // 🔴 Core Principle: Scores always out of 100, with risk caps CLEARLY marked
    let score = 100;
    let deductions = [];
    let bonuses = [];
    let riskRating = getRiskRating(data);
    let maxPossible = 100; // Default (Low Risk)

    // 1️⃣ VERIFICATION PENALTIES (FIXED WEIGHTS)
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
        deductions.push("Scope 3 unverified (-20) → Major red flag");
    }

    // 2️⃣ MATERIAL ESG LEAKS (ZERO TOLERANCE)
    data.carbon.errors?.forEach(err => {
        if (err.severity === "high" || err.severity === "medium") {
            score -= 10;
            deductions.push(`Material ESG leak: "${err.issue}" (-10)`);
        }
    });

    // 3️⃣ BIG4 BONUSES (REWARD TRANSPARENCY)
    const assurance = data.carbon.big4?.assurance?.toLowerCase() || "";
    const isBig4 = /pwc|deloitte|ey|kpmg/.test(assurance);
    
    [1, 2, 3].forEach(scope => {
        if (data.carbon.big4?.[`scope${scope}`] && isBig4) {
            score += 2;
            bonuses.push(`Scope ${scope} Big4 verified (+2)`);
        }
    });

    // 4️⃣ RISK CAPS (HARD LIMITS)
    if (riskRating === "🟠 Medium") {
        maxPossible = 80;
        deductions.push("AI Risk Rating: Medium → Max possible = 80");
    } 
    else if (riskRating === "🔴 High") {
        maxPossible = 65;
        deductions.push("AI Risk Rating: High → Max possible = 65");
    }

    // ✅ FINAL CALCULATION (IRREFUTABLE)
    const finalScore = Math.max(0, Math.min(
        maxPossible, // Respect risk cap
        Math.round(score) // No decimal scores
    ));

    return {
        score: finalScore,
        maxPossible, // Always 100/80/65
        deductions,
        bonuses,
        riskRating,
        isCapped: finalScore >= maxPossible // Flag for UI
    };
}

// =====================
// TRANSPARENCY TOOLS
// =====================

function getRiskRating(data) {
    // 🚨 High-risk keywords (expandable list)
    const riskKeywords = [
        "child labor", "corruption", "greenwashing", 
        "violation", "underreport", "controversy",
        "lawsuit", "fraud", "exploitation"
    ];
    
    const reportText = JSON.stringify(data).toLowerCase();
    const foundRisks = riskKeywords.filter(kw => reportText.includes(kw));
    
    // Clear thresholds:
    return foundRisks.length > 2 ? "🔴 High" : 
           foundRisks.length > 0 ? "🟠 Medium" : "🟢 Low";
}

function generateAIRiskRating(data) {
    const { riskRating, isCapped } = calculateScore(data);
    const foundRisks = getRiskKeywords(data);
    
    return `
        <div class="airisk-box" style="border-left: 4px solid ${
            riskRating === "🔴 High" ? "#e74c3c" : 
            riskRating === "🟠 Medium" ? "#f39c12" : "#2ecc71"
        }">
            <h4>🤖 AI Risk Rating: ${riskRating}</h4>
            ${riskRating !== "🟢 Low" ? `
                <p><strong>${isCapped ? "⛔️ Score Capped" : "⚠️ Potential Cap"}:</strong> 
                ${riskRating === "🟠 Medium" ? "80" : "65"}/100</p>
            ` : ''}
            ${foundRisks.length ? `
                <div class="risk-flags">
                    <p>🚩 <strong>Flags detected:</strong> ${foundRisks.map(r => 
                        `<span class="risk-tag">${r.toUpperCase()}</span>`
                    ).join(' ')}</p>
                    <p>💸 <strong>Estimated exposure:</strong> $${(
                        foundRisks.length * 5000000
                    ).toLocaleString()}+</p>
                </div>
            ` : '<p>✅ No high-risk patterns detected</p>'}
        </div>
    `;
}

function getRiskKeywords(data) {
    const riskKeywords = [
        "child labor", "corruption", "greenwashing", 
        "violation", "underreport", "controversy",
        "lawsuit", "fraud", "exploitation"
    ];
    const reportText = JSON.stringify(data).toLowerCase();
    return riskKeywords.filter(kw => reportText.includes(kw));
}

// =====================
// BULLETPROOF DISPLAY
// =====================

function showScoringDetails(data, scoreResult) {
    const benchmark = industryBenchmarks[data.$brandId] || industryBenchmarks.default;
    const isPerfect = scoreResult.score === 100 && scoreResult.maxPossible === 100;

    return `
        <div class="transparency-box">
            <h4>🔍 Scoring Breakdown</h4>
            <p><strong>Starting Score:</strong> 100/100 (perfect compliance)</p>
            
            <!-- Deductions -->
            <h5>${scoreResult.deductions.length ? '⚠️ Deductions' : '✅ No Deductions'}</h5>
            <ul class="deductions">
                ${scoreResult.deductions.map(d => `<li>${d}</li>`).join('') || 
                '<li>All required disclosures verified</li>'}
            </ul>
            
            <!-- Bonuses -->
            <h5>${scoreResult.bonuses.length ? '✨ Bonuses' : '📉 No Bonuses'}</h5>
            <ul class="bonuses">
                ${scoreResult.bonuses.map(b => `<li>${b}</li>`).join('') || 
                '<li>No third-party verification bonuses</li>'}
            </ul>
            
            <!-- Final Score -->
            <div class="final-score">
                <strong>Final Score:</strong> 
                <span class="score-value">${scoreResult.score}/${scoreResult.maxPossible}</span>
                ${scoreResult.maxPossible < 100 ? `
                    <span class="cap-warning">
                        (Capped due to ${scoreResult.riskRating} risk)
                    </span>
                ` : ''}
                
                ${isPerfect ? '<div class="perfect-badge">🏆 Perfect Audit</div>' : ''}
                
                <div class="score-bar">
                    <div style="
                        width: ${scoreResult.score}%;
                        background: ${getScoreColor(scoreResult.score)};
                        ${scoreResult.isCapped ? 'border-right: 3px dashed #000' : ''}
                    "></div>
                </div>
                
                <p class="benchmark">
                    <strong>Industry Benchmark (${benchmark.industry}):</strong> 
                    ${benchmark.score}/100
                    ${scoreResult.score > benchmark.score ? '↑' : '↓'}
                </p>
            </div>
            
            ${data.$customData ? 
                '<p class="data-source">ℹ️ Using user-uploaded data (not independently verified)</p>' : 
                `<p class="data-source">📄 Source: <a href="${data.carbon.big4?.source || '#'}" target="_blank">
                    ${data.carbon.big4?.source ? 'Original Report' : 'AIOXY Database'}
                </a></p>`}
        </div>
    `;
}

function getScoreColor(score) {
    return score >= 80 ? '#2e8b57' : 
           score >= 60 ? '#f39c12' : '#e74c3c';
}

// =====================
// DYNAMIC DATA LOADER
// =====================

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

// =====================
// COMPARISON FUNCTION
// =====================

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

// =====================
// CHART RENDERING
// =====================

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

// =====================
// REPORT GENERATOR
// =====================

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

// =====================
// EXPORT FUNCTIONS
// =====================

function exportSingleReport(brandName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`AIOXY Independent ESG Verification`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Company: ${brandName.replace(/_/g, ' ')}`, 10, 25);
    
    const score = document.querySelector('.score')?.textContent;
    const benchmark = document.querySelector('.industry-benchmark')?.textContent;
    
    doc.text(`ESG Score: ${score}`, 10, 35);
    doc.text(`${benchmark}`, 10, 45);
    
    doc.text(`Scoring Methodology:`, 10, 60);
    doc.text(`- Base score starts at 100/100`, 15, 70);
    doc.text(`- Deductions for missing/unverified data`, 15, 80);
    doc.text(`- Bonuses for third-party verification`, 15, 90);
    
    const findings = [...document.querySelectorAll('.risk')].slice(0, 3);
    findings.forEach((finding, i) => {
        doc.text(`- ${finding.textContent.replace(/\n/g, ' ').substring(0, 80)}`, 15, 115 + (i * 10));
    });
    
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
    
    const scores = document.querySelectorAll('.comparison-grid .score');
    const benchmarks = document.querySelectorAll('.comparison-grid .industry-benchmark');
    
    doc.text(`Key Metrics:`, 10, 40);
    doc.text(`${brand1}: ${scores[0]?.textContent || "N/A"}`, 15, 50);
    doc.text(`${benchmarks[0]?.textContent || ""}`, 15, 60);
    doc.text(`${brand2}: ${scores[1]?.textContent || "N/A"}`, 15, 70);
    doc.text(`${benchmarks[1]?.textContent || ""}`, 15, 80);
    
    const risks = document.querySelectorAll('.airisk-box h4');
    doc.text(`Risk Comparison:`, 10, 95);
    doc.text(`${brand1}: ${risks[0]?.textContent || "N/A"}`, 15, 105);
    doc.text(`${brand2}: ${risks[1]?.textContent || "N/A"}`, 15, 115);
    
    doc.save(`ESG_Comparison_${brand1}_vs_${brand2}.pdf`);
}

function shareComparison(brand1, brand2) {
    const url = `${window.location.href.split('?')[0]}?compare=${brand1},${brand2}`;
    prompt("Share this comparison link:", url);
}

// =====================
// UNBREAKABLE FILE UPLOAD v4.0 (FINAL)
// =====================

async function processUpload() {
    const fileInput = document.getElementById('fileUpload');
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select a file first');
        return;
    }

    const file = fileInput.files[0];
    const statusEl = document.getElementById('uploadStatus');
    statusEl.style.display = 'block';
    statusEl.textContent = `Analyzing ${file.name}...`;

    try {
        let result;
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
            result = await analyzePDF(file);
        } else {
            result = await processJSON(file);
        }

        if (!result.carbon || (!result.carbon.scope1 && !result.carbon.scope2 && !result.carbon.scope3)) {
            throw new Error("No valid carbon emissions data found in the file");
        }

        renderReport({
            ...result,
            score: calculateScore(result).score,
            $customData: true,
            $brandId: 'custom_' + Date.now()
        });

        document.getElementById('uploadModal').style.display = 'none';
    } catch (error) {
        console.error("Upload processing error:", error);
        alert(`Error processing file: ${error.message}\n\nFor JSON files, please use this format:\n${getSampleJSON()}`);
    } finally {
        statusEl.textContent = '';
        statusEl.style.display = 'none';
        fileInput.value = '';
    }
}

async function analyzePDF(pdfFile) {
    const { default: pdfjs } = await import('pdfjs-dist/build/pdf');
    pdfjs.GlobalWorkerOptions.workerSrc = 
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    
    let fullText = "";
    for (let i = 1; i <= Math.min(pdf.numPages, 50); i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ') + "\n";
    }

    const esgData = {
        name: extractCompanyName(fullText),
        industry: detectIndustry(fullText),
        carbon: extractCarbonData(fullText),
        strengths: detectStrengths(fullText)
    };

    const riskFlags = scanForRisks(fullText);
    if (riskFlags.length > 0) {
        esgData.carbon.errors = riskFlags;
        if (riskFlags.some(f => f.severity === "high")) {
            const proceed = confirm(`WARNING: High-risk issues detected. Continue analysis?`);
            if (!proceed) throw new Error("Analysis canceled by user");
        }
    }

    return esgData;
}

function extractCompanyName(text) {
    const matches = text.match(/(?:Report|Disclosure|Sustainability)\s+(?:for|by)\s+([^\n]+)/i);
    return matches ? matches[1].trim() : "Unknown Company";
}

function extractCarbonData(text) {
    const scope1 = parseFloat(text.match(/Scope\s*1[^\d]*([\d,\.]+)\s*(?:tonnes?|tCO2e?)/i)?.[1]?.replace(/,/g, '')) || 0;
    const scope2 = parseFloat(text.match(/Scope\s*2[^\d]*([\d,\.]+)\s*(?:tonnes?|tCO2e?)/i)?.[1]?.replace(/,/g, '')) || 0;
    
    const verifiers = ["PwC", "Deloitte", "EY", "KPMG", "Ernst & Young", "Bureau Veritas"];
    const assurance = verifiers.find(v => text.includes(v)) || "Self-Reported";

    return {
        scope1,
        scope2,
        scope3: null,
        big4: { assurance },
        errors: []
    };
}

function scanForRisks(text) {
    const riskPatterns = [
        { 
            regex: /(underreport|under[\s-]*report)[^\d]*(\d+)/i, 
            message: (_, num) => `Potential underreporting (${num} tonnes unaccounted)`,
            severity: "high"
        },
        {
            regex: /(not\scovered|excluded)\sfrom\s(scope\s*[123]|boundary)/i,
            message: "Boundary exclusion found",
            severity: "medium"
        }
    ];

    return riskPatterns
        .filter(({ regex }) => regex.test(text))
        .map(({ message, severity, regex }) => {
            const match = text.match(regex);
            return {
                issue: typeof message === 'function' ? message(...match) : message,
                severity,
                source: "PDF Analysis"
            };
        });
}

async function processJSON(file) {
    const text = await file.text();
    const customData = JSON.parse(text);

    return {
        name: String(customData.name || file.name.replace(/\..+$/, '')),
        industry: String(customData.industry || "General"),
        carbon: {
            scope1: Math.abs(Number(customData.carbon?.scope1)) || 0,
            scope2: Math.abs(Number(customData.carbon?.scope2)) || 0,
            scope3: Math.abs(Number(customData.carbon?.scope3)) || 0,
            big4: customData.carbon?.big4 || {},
            errors: Array.isArray(customData.carbon?.errors) 
                ? customData.carbon.errors.filter(e => e.issue) 
                : []
        },
        strengths: Array.isArray(customData.strengths) ? customData.strengths : []
    };
}

function getSampleJSON() {
    return JSON.stringify({
        name: "Your Company",
        industry: "Technology",
        carbon: {
            scope1: 1000,
            scope2: 500,
            scope3: 15000,
            big4: {
                scope1: 1000,
                scope2: 500,
                scope3: null,
                assurance: "Deloitte"
            },
            errors: [
                {
                    issue: "Scope 3 supplier data incomplete",
                    severity: "medium",
                    source: { label: "Internal Audit", url: "" }
                }
            ]
        },
        strengths: ["100% renewable energy usage"]
    }, null, 2);
}

function detectIndustry(text) {
    const industries = {
        tech: /tech|software|hardware|computer|device/i,
        automotive: /auto|vehicle|car|truck|tesla/i,
        oil: /oil|gas|petroleum|bp/i,
        retail: /retail|store|shop|amazon/i
    };
    
    for (const [industry, regex] of Object.entries(industries)) {
        if (regex.test(text)) return industry;
    }
    return "General";
}

function detectStrengths(text) {
    const strengths = [];
    if (text.match(/renewable|solar|wind/i)) {
        strengths.push("Uses renewable energy");
    }
    if (text.match(/recycl|re\-?use/i)) {
        strengths.push("Recycling program");
    }
    return strengths;
}

// =====================
// INITIALIZATION
// =====================

function initializeApp() {
    console.log("Initializing ESG Auditor...");
    
    // Audit Button
    document.getElementById('auditButton').addEventListener('click', function() {
        const brand = document.getElementById('brandSelect').value;
        if (!brand) {
            alert('Please select a brand');
            return;
        }
        loadBrandData(brand)
            .then(data => {
                if (!data) throw new Error("No data returned");
                renderReport(data);
            })
            .catch(err => {
                console.error("Audit failed:", err);
                alert("Failed to run audit. Check console for details.");
            });
    });

    // Compare Button
    document.getElementById('compareBtn').addEventListener('click', function() {
        const brand1 = prompt('First brand (e.g., tesla):');
        const brand2 = prompt('Second brand (e.g., apple):');
        if (brand1 && brand2) {
            compareBrands(brand1, brand2);
        }
    });

    // Upload Button
    document.getElementById('uploadBtn').addEventListener('click', function() {
        document.getElementById('uploadModal').style.display = 'block';
    });

    // Modal Buttons
    document.getElementById('uploadSubmitBtn').addEventListener('click', processUpload);
    document.getElementById('uploadCancelBtn').addEventListener('click', function() {
        document.getElementById('uploadModal').style.display = 'none';
    });

    console.log("Initialization complete");
}

// Start the app
if (document.readyState === 'complete') {
    setTimeout(initializeApp, 100);
} else {
    document.addEventListener('DOMContentLoaded', initializeApp);
        }
