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

function runAudit() {
    const brand = document.getElementById("brandSelect").value;
    if (!brand) return alert("Select a brand first!");

    const data = brandData[brand].carbon;

    let html = `<h2>${brand.toUpperCase()} Audit</h2>
                <p><strong>Data Source:</strong> ${data.big4.assurance}</p>
                <table>
                    <tr><th>Metric</th><th>Reported (Big 4)</th><th>AIOXY Value</th><th>Variance</th></tr>`;

    ['scope1', 'scope2', 'scope3'].forEach(scope => {
        const big4Val = data.big4[scope];
        const aioxyVal = data[scope];
        const variance = (big4Val !== null && big4Val !== undefined)
            ? (aioxyVal - big4Val).toFixed(2)
            : "N/A";

        html += `<tr>
                    <td>${scope.replace('scope', 'Scope ')}</td>
                    <td>${big4Val !== null && big4Val !== undefined ? big4Val + ' MT' : 'Not reported'}</td>
                    <td>${aioxyVal} MT</td>
                    <td class="${variance !== 'N/A' && variance != 0 ? 'risk' : ''}">
                        ${variance !== 'N/A' ? (variance >= 0 ? '+' : '') + variance : 'N/A'}
                    </td>
                 </tr>`;
    });

    html += `</table>`;

    if (data.errors.length > 0) {
        html += `<h3>Key Risks Found:</h3><ul>`;
        data.errors.forEach(err => {
            html += `<li class="risk">${err.issue} 
                     <a href="${err.source.url}" class="source-link" target="_blank">[Source]</a></li>`;
        });
        html += `</ul>`;
    }

    html += `<button onclick="alert('Redirecting to booking...')">Book $200 Full Audit</button>`;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = html;
    resultsDiv.style.display = "block";
}
