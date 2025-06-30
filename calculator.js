// Brand Data (Verified)
const brandData = {
    bp: {
        carbon: {
            scope1: 31.1,
            scope2: 1.0,
            scope3: 314.9,
            big4: {
                scope1: 31.1,
                scope2: 1.0,
                scope3: null,
                source: "https://www.bp.com",
                assurance: "Deloitte (Scope 1-2)"
            },
            errors: [{
                issue: "Scope 1 emissions rose 7% in 2023 due to new oil projects",
                source: { label: "Reuters", url: "https://reuters.com" }
            }]
        }
    },
    tesla: {
        carbon: {
            scope1: 211000,
            scope2: 466000,
            scope3: 49354000,
            big4: {
                scope1: 211000,
                scope2: 466000,
                scope3: 49354000,
                source: "https://www.tesla.com",
                assurance: "Company Verified"
            },
            errors: [{
                issue: "Scope 2 uses grid-average factors (potential variance)",
                source: { label: "Tesla Report", url: "https://tesla.com" }
            }]
        }
    },
    samsung: {
        carbon: {
            scope1: 5.972,
            scope2: 9.081,
            scope3: 123.0,
            big4: {
                scope1: 5.972,
                scope2: 9.081,
                scope3: 123.0,
                source: "https://www.samsung.com",
                assurance: "KFQ Verified"
            },
            errors: []
        }
    },
    apple: {
        carbon: {
            scope1: 55200,
            scope2: 3400,
            scope3: 15982800,
            big4: {
                scope1: 55200,
                scope2: 3400,
                scope3: null,
                source: "https://www.apple.com",
                assurance: "Apex (Partial)"
            },
            errors: [{
                issue: "Scope 3 uses industry-average data (~15% uncertainty)",
                source: { label: "Apple Report", url: "https://apple.com" }
            }]
        }
    },
    microsoft: {
        carbon: {
            scope1: 144960,
            scope2: 393134,
            scope3: 16475520,
            big4: {
                scope1: 144960,
                scope2: 393134,
                scope3: 14819000,
                source: "https://www.microsoft.com",
                assurance: "Company Verified"
            },
            errors: []
        }
    }
};

// DOM Elements
const brandSelect = document.getElementById('brandSelect');
const auditButton = document.getElementById('auditButton');
const resultsDiv = document.getElementById('results');

// Main Function
function runAudit() {
    const brand = brandSelect.value;
    
    // Validate selection
    if (!brand) {
        alert("Please select a brand");
        return;
    }
    
    // Show loading state
    resultsDiv.innerHTML = "<div class='loading'>Processing audit...</div>";
    resultsDiv.style.display = 'block';
    
    // Simulate processing delay
    setTimeout(() => {
        try {
            const data = brandData[brand].carbon;
            const big4 = data.big4;
            
            // Generate HTML
            let html = `
                <h2>${brand.charAt(0).toUpperCase() + brand.slice(1)} Carbon Audit</h2>
                <p><strong>Data Source:</strong> ${big4.assurance}</p>
                
                <table>
                    <tr>
                        <th>Metric</th>
                        <th>Reported Value</th>
                        <th>AIOXY Value</th>
                    </tr>
                    <tr>
                        <td>Scope 1</td>
                        <td>${big4.scope1 || 'Not assured'} ${big4.scope1 ? 'MT' : ''}</td>
                        <td>${data.scope1} MT</td>
                    </tr>
                    <tr>
                        <td>Scope 2</td>
                        <td>${big4.scope2 || 'Not assured'} ${big4.scope2 ? 'MT' : ''}</td>
                        <td>${data.scope2} MT</td>
                    </tr>
                    <tr>
                        <td>Scope 3</td>
                        <td>${big4.scope3 !== null ? big4.scope3 + ' MT' : 'Not assured'}</td>
                        <td>${data.scope3} MT</td>
                    </tr>
                </table>
            `;
            
            // Add findings if available
            if (data.errors.length > 0) {
                html += `<h3>Key Findings</h3><ul>`;
                data.errors.forEach(error => {
                    html += `<li>${error.issue} <a href="${error.source.url}" class="source-link" target="_blank">[Source]</a></li>`;
                });
                html += `</ul>`;
            }
            
            // Add CTA
            html += `
                <div style="margin-top: 30px; text-align: center;">
                    <button style="padding: 10px 20px;">Get Full Report ($200)</button>
                    <p style="font-size: 0.9em; margin-top: 10px;">Same audit Big 4 charges $100K+</p>
                </div>
            `;
            
            resultsDiv.innerHTML = html;
            
        } catch (error) {
            console.error("Audit failed:", error);
            resultsDiv.innerHTML = `<p class="risk">Error: Could not process audit. Please try again.</p>`;
        }
    }, 800); // Simulate processing delay
}

// Event Listeners
auditButton.addEventListener('click', runAudit);

// Initialize
console.log("AIOXY Auditor initialized");
