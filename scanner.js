// Initialize Stripe
const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');

// PDF Text Extraction
async function extractTextFromPDF(file) {
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(item => item.str).join(" ");
  }
  return fullText;
}

// AI Analysis
async function analyzeWithAI(text) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are an ESG forensic analyst. Respond in this format: {score:number,risk:string,leak:string}"
      }, {
        role: "user",
        content: `Analyze this ESG report: ${text.substring(0, 10000)}`
      }]
    })
  });
  return JSON.parse((await response.json()).choices[0].message.content);
}

// DOM Events
document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const file = document.getElementById('esgReport').files[0];
  if (!file) return alert("Upload your ESG report first!");
  
  // Show loading
  document.querySelector('.loading-bar').style.width = '100%';
  
  try {
    const text = await extractTextFromPDF(file);
    const analysis = await analyzeWithAI(text);
    
    // Display results
    document.getElementById('score').textContent = analysis.score;
    document.getElementById('riskAmount').textContent = `$${analysis.risk}`;
    document.getElementById('leakDetail').textContent = analysis.leak;
    document.getElementById('results').classList.remove('hidden');
  } catch (error) {
    alert("Analysis failed. Please try again.");
  }
  
  document.querySelector('.loading-bar').style.width = '0%';
});

// Paywall Triggers
document.getElementById('paywallTrigger').addEventListener('click', () => {
  document.getElementById('paywall').classList.remove('hidden');
});

document.getElementById('closePaywall').addEventListener('click', () => {
  document.getElementById('paywall').classList.add('hidden');
});

// Stripe Checkout
document.getElementById('stripeCheckout').addEventListener('click', () => {
  stripe.redirectToCheckout({
    sessionId: 'YOUR_STRIPE_SESSION_ID'
  });
});

// Load Shame List
fetch('https://api.sheets.com/v1/your-sheet-data')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('shameGrid');
    data.slice(0, 3).forEach(company => {
      grid.innerHTML += `
        <div class="shame-card">
          <h3>${company.name}</h3>
          <p>Score: ${company.score}/100</p>
          <p>${company.leak}</p>
        </div>
      `;
    });
  });
