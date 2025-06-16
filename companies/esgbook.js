export default {
  name: "ESG Book (LEO)",
  industry: "ESG Data & Reporting Platform",
  score: 68,
  revenueRisk: "€100 K+ risk per ambiguous claim under CSRD if statements are misinterpreted",

  leaks: [
    {
      issue: 'Phrases like "simplifies reporting" and "helps businesses focus on what matters" without specifying regulatory frameworks',
      impact: "Could be seen as vague or misleading under CSRD if not backed by regulatory scope—leading to potential €100K+ fines",
      solution: "Specify applicable frameworks (e.g., ISSB, GRI, EU Taxonomy), link to guidance, and add disclaimers to clarify scope",
      source: {
        label: "ESG Book LEO launch page",
        url: "https://www.esgbook.com/solutions/disclosures-regulatory-reporting"  // page where leak was observed
      }
    }
  ],

  strengths: [
    {
      item: "Built in partnership with BCG & Google Cloud—streamlines disclosure for corporates and financial institutions",
      source: {
        label: "ESG Book LEO launch announcement",
        url: "https://www.esgbook.com/insights/press-releases/esg-book-leo-launches-to-transform-sustainability-reporting-for-corporates-and-financial-institutions"  // launch press release 1
      }
    },
    {
      item: "Trusted by institutions like ING, Lloyds and NatWest for risk management and supply-chain resilience",
      source: {
        label: "ESG Today report",
        url: "https://www.esgtoday.com/esg-book-bcg-launch-new-sustainability-reporting-platform-leo/"  // highlights client names 2
      }
    }
  ]
};
