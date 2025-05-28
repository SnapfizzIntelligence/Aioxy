export default {
  name: "Accenture",
  industry: "Professional Services",
  score: 83, // Based on full Scope 3 disclosure, DEI data coverage, and CDP transparency

  leaks: [
    {
      issue: "Limited DEI granularity (no regional breakdowns)",
      impact: "JUST Capital ranked Accenture #12/20 on DEI transparency (2023)",
      solution: "Adopt IBM-style geo-specific disclosures (e.g., US promotion rates by race)",
      source: {
        label: "Environmental and Inclusion & Diversity Metrics 2023, p.8",
        url: "https://www.accenture.com/content/dam/accenture/final/corporate/corporate-initiatives/sustainability/document/Accenture-Environmental-and-Inclusion-Diversity-Metrics-2023.pdf#page=8"
      }
    },
    {
      issue: "Scope 3 emissions up 18% YoY (2023)",
      impact: "Missed 2025 Science-Based Target reduction trajectory",
      solution: "Supplier carbon pricing program (like Microsoft’s internal carbon fee)",
      source: {
        label: "2023 CDP Climate Response Report, p.14",
        url: "https://www.accenture.com/content/dam/accenture/final/markets/north-america/document/Accenture-CDP-Climate-Response-2023.pdf#page=14"
      }
    },
    {
      issue: "ESG revenue bundled under 'Strategy & Consulting' ($19B)",
      impact: "Greenwashing concerns noted by BloombergNEF",
      solution: "Break out sustainability services revenue (like Deloitte’s Climate practice)",
      source: {
        label: "Accenture 2023 10-K Report, p.42",
        url: "https://www.accenture.com/content/dam/accenture/final/capabilities/corporate-functions/marketing-and-communications/marketing---communications/document/Accenture-2023-10-K.pdf#page=42"
      }
    }
  ],

  strengths: [
    {
      item: "Achieved 50/50 gender parity globally (2023)",
      source: {
        label: "Environmental and Inclusion & Diversity Metrics 2023, p.5",
        url: "https://www.accenture.com/content/dam/accenture/final/corporate/corporate-initiatives/sustainability/document/Accenture-Environmental-and-Inclusion-Diversity-Metrics-2023.pdf#page=5"
      }
    },
    {
      item: "100% renewable electricity in offices (2023)",
      source: {
        label: "2023 CDP Climate Response Report, p.9",
        url: "https://www.accenture.com/content/dam/accenture/final/markets/north-america/document/Accenture-CDP-Climate-Response-2023.pdf#page=9"
      }
    }
  ]
}
