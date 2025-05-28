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
        label: "Accenture DEI Report 2023, p.8",
        url: "https://www.accenture.com/content/dam/accenture/final/a-com-migration/us-en/about/accenture-inclusion-diversity-research-2023.pdf#page=8"
      }
    },
    {
      issue: "Scope 3 emissions up 18% YoY (2023)",
      impact: "Missed 2025 Science-Based Target reduction trajectory",
      solution: "Supplier carbon pricing program (like Microsoft’s internal carbon fee)",
      source: {
        label: "Accenture CDP 2023 Filing, p.14",
        url: "https://www.accenture.com/content/dam/accenture/final/accenture-com/document/Accenture-2023-CDP-Climate-Change-Response.pdf#page=14"
      }
    },
    {
      issue: "ESG revenue bundled under 'Strategy & Consulting' ($19B)",
      impact: "Greenwashing concerns noted by BloombergNEF",
      solution: "Break out sustainability services revenue (like Deloitte’s Climate practice)",
      source: {
        label: "Accenture Annual Report 2023, p.42",
        url: "https://www.accenture.com/content/dam/accenture/final/accenture-com/document/Annual-Report/Accenture-2023-Annual-Report.pdf#page=42"
      }
    }
  ],

  strengths: [
    {
      item: "Achieved 50/50 gender parity globally (2023)",
      source: {
        label: "Accenture DEI Report 2023, p.5",
        url: "https://www.accenture.com/content/dam/accenture/final/a-com-migration/us-en/about/accenture-inclusion-diversity-research-2023.pdf#page=5"
      }
    },
    {
      item: "100% renewable electricity in offices (2023)",
      source: {
        label: "Accenture CDP 2023 Filing, p.9",
        url: "https://www.accenture.com/content/dam/accenture/final/accenture-com/document/Accenture-2023-CDP-Climate-Change-Response.pdf#page=9"
      }
    }
  ]
    }
