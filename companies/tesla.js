export default {
  name: "Tesla",
  industry: "Automotive & Energy",
  score: null, // No verified TCFD/SASB score in 2023 Impact Report; removed unverified 88
  leaks: [
    {
      issue: "Cobalt sourcing from DRC (despite audits)",
      impact: "Reputational risk due to DRC artisanal mining links",
      solution: "Expand Fair Cobalt Alliance funding and blockchain traceability",
      source: "[Tesla 2023 Impact Report, p.117-120](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=117), [UNLOCK Blockchain, 2021](https://www.unlock-bc.com/news/2021-08-17/tesla-to-use-blockchain-for-cobalt-traceability/)" // Added blockchain source
    },
    {
      issue: "Battery recycling efficiency improving but lacks specific recovery rate disclosure",
      impact: "Trailing industry leaders like Redwood Materials in recycling efficiency",
      solution: "Scale in-house hydrometallurgy (p.110-112)",
      source: "[Tesla 2023 Impact Report, p.110-112](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=110), [The Sustainable Innovation, 2025](https://thesustainableinnovation.com)" // Corrected source, adjusted issue/impact
    },
    {
      issue: "Scope 3 emissions up ~24% YoY (48.9M tCO₂e in 2023 vs. 39.4M in 2022)",
      impact: "Increased regulatory risks, such as EU carbon tariffs (CBAM, effective 2026)",
      solution: "Supplier decarbonization pacts (p.107-109)",
      source: "[Tesla 2023 Impact Report, p.147, p.107-109](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=147)" // Clarified percentage, generalized tariff risk
    },
    {
      issue: "Water use in drought-prone Texas (p.47-49)",
      impact: "Potential community concerns due to water stress",
      solution: "Onsite wastewater recycling to reduce freshwater use",
      source: "[Tesla 2023 Impact Report, p.47-49](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=47)" // Adjusted impact and solution
    }
  ],
  strengths: [
    {
      item: "Supercharger network: 100% renewable energy (p.40)",
      source: "[Tesla 2023 Impact Report, p.40](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=40)"
    },
    {
      item: "EVs avoided 20M metric tons CO₂e in 2023 (p.19)",
      source: "[Tesla 2023 Impact Report, p.19](https://www.tesla.com/ns_videos/2023-tesla-impact-report.pdf#page=19)"
    }
  ]
      }
