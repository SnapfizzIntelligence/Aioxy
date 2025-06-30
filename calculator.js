// =====================
// AIOXY ESG AUDITOR CORE
// =====================

const brandData = {
    tesla: {
        carbon: {
            scope1: 211000,
            scope2: 466000,
            scope3: 49354000,
            big4: {
                scope1: 211000,
                scope2: 466000,
                scope3: 49354000,
                source: "https://www.tesla.com/impact-report/2023",
                assurance: "Company Verified"
            },
            errors: [{
                issue: "Scope 2 uses grid-average factors (potential estimation variance)",
                source: { label: "Tesla 2023 Impact Report", url: "#" }
            }]
        }
    },
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
                source: { label: "Reuters", url: "#" }
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
                source: { label: "Apple Methodology", url: "#" }
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

// =====================
// CORE FUNCTIONS
// =====================

function runAudit() {
    try {
        // Get inputs
        const brand = document.getElementById('brandSelect').value;
        const benchmark = document.getElementById('benchmark').value;
        
        // Validate
        if (!brand) {
            showError("Please select a company");
            return;
        }
        
        if (!brandData[brand]) {
            showError("Data not available for this company");
            return;
        }

        // Get data
        const data = brandData[brand].carbon;
        const reference = data[benchmark];
        
        // Generate results
        let html = `
            <h2>${brand.charAt(0).toUpperCase() + brand.slice(1)} Carbon Audit</h2>
            <div class="assurance-badge">
                ${reference.assurance} | ${new Date().toLocaleDateString()}
            </div>
            
            <table class="proof-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>${benchmark === 'big4' ? reference.assurance : 'Best Practice'}</th>
                        <th>AIOXY Analysis</th>
                        <th>Variance</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateComparisonRow('Scope 1', data, reference)}
                    ${generateComparisonRow('Scope 2', data, reference)}
                    ${generateComparisonRow('Scope 3', data, reference)}
                </tbody>
            </table>
        `;

        // Add findings if exists
        if (data.errors.length > 0) {
            html += `
                <h3>Key Findings</h3>
                <ul class="findings-list">
                    ${data.errors.map(e => `
                        <li>
                            <span class="finding-text">${e.issue}</span>
                            <a href="${e.source.url}" target="_blank" class="source-link">[Source]</a>
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        // Add CTA
        html += `
            <div class="cta-section">
                <p>Identified material risks? Get detailed mitigation analysis:</p>
                <button onclick="bookConsultation()">Request Consultation</button>
            </div>
        `;

        // Display
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'block';

    } catch (error) {
        console.error("Audit failed:", error);
        showError("System error. Please try again.");
    }
}

function generateComparisonRow(metric, data, reference) {
    const value = data[metric.toLowerCase()];
    const refValue = reference[metric.toLowerCase()];
    const unit = metric === 'Scope 3' ? ' MT' : ' tCO₂e';
    
    // Calculate variance
    let variance = 'N/A';
    let varianceClass = '';
    
    if (refValue !== null && refValue !== undefined) {
        const variancePercent = ((value - refValue) / refValue * 100).toFixed(1);
        variance = `${variancePercent}%`;
        varianceClass = variancePercent > 0 ? 'risk-flag' : '';
    }

    return `
        <tr>
            <td>${metric}</td>
            <td>${refValue !== null ? refValue + unit : 'Not assured'}</td>
            <td>${value}${unit}</td>
            <td class="${varianceClass}">${variance}</td>
        </tr>
    `;
}

function showError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e53e3e" width="24px" height="24px">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>${message}</span>
        </div>
    `;
    resultsDiv.style.display = 'block';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log("AIOXY Auditor initialized");
});
