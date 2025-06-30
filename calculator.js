// =====================
// AIOXY ESG AUDITOR (FULL SOLUTION)
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
                source: { label: "Tesla Impact Report", url: "#" }
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
                source: { label: "Greenpeace", url: "#" }
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
                source: { label: "Apple CDP Report", url: "#" }
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
            assurance: "PwC (Full verification)"
        },
        errors: [
            {
                issue: "Cloud methodology unclear",
                severity: "low",
                source: { label: "MSFT Report", url: "#" }
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
document.getElementById("auditButton").addEventListener("click", async () => {
    const brand = document.getElementById("brandSelect").value;
    if (!brand) return alert("Select a brand first");

    try {
        // Load both static and dynamic data
        const [dynamicData, staticCarbon] = await Promise.all([
            import(`./companies/${brand}.js`).then(m => m.default).catch(() => ({})),
            Promise.resolve(brandCarbonData[brand])
        ]);

        // Merge datasets
        const fullData = {
            name: dynamicData.name || brand.toUpperCase(),
            industry: dynamicData.industry || "Unknown",
            revenueRisk: dynamicData.revenueRisk || "Not assessed",
            score: dynamicData.score || calculateScore({ carbon: staticCarbon }),
            leaks: dynamicData.leaks || [],
            strengths: dynamicData.strengths || [],
            carbon: staticCarbon
        };

        // Render results
        renderReport(fullData);
    } catch (error) {
        console.error("Audit failed:", error);
        alert("Failed to load brand data. Try another.");
    }
});

// 4. Report Generator
function renderReport(data) {
    let html = `
        <div class="score-card">
            <h2>${data.name} ESG Audit</h2>
            <div class="score">${data.score}/100</div>
            <p><strong>Industry:</strong> ${data.industry}</p>
            ${data.revenueRisk ? `<p><strong>Revenue Risk:</strong> ${data.revenueRisk}</p>` : ''}
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
        <div style="margin-top: 30px; text-align: center;">
            <button style="padding: 12px 24px; font-size: 16px;" 
                    onclick="window.open('https://linkedin.com/in/tulasipariyar', '_blank')">
                📩 Get Full Custom Report ($200)
            </button>
            <p style="font-size: 0.9em; margin-top: 10px;">
                Same audit Big 4 charges $100K+
            </p>
        </div>
    `;

    document.getElementById("results").innerHTML = html;
    document.getElementById("results").style.display = "block";
        }
