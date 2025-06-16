export default {
  name: "Greenly",
  industry: "Climate Tech / Carbon Management",
  score: 64,
  revenueRisk: "€50 K+ risk per generic claim under EU greenwashing rules if projects aren’t clearly certified",

  leaks: [
    {
      issue: 'Claiming "decarbonize through verified projects" without citing certified standards or project details',
      impact: "Could be interpreted as misleading under CSRD/EU Taxonomy, potentially exposing Greenly and clients to ~€50 K penalties",
      solution: "Include certification references (e.g., Gold Standard, Verra) and transparent project sourcing with links",
      source: {
        label: 'Greenly "Clarity" page',
        url: "https://www.greenly.earth/en/solutions/clarity"  // assertion check
      }
    }
  ],

  strengths: [
    {
      item: "Serves 1,500+ corporate clients in France, UK, US with intuitive carbon tracking",
      source: {
        label: "Greenly press release",
        url: "https://sevenseasmedia.org/greenly-launches-the-worlds-first-app-store-to-lead-the-fight-against-climate-change/"  // verifies client count 1
      }
    },
    {
      item: "Integrates with major standards and tools (GHG Protocol, CSRD, SBTi, SAP/Salesforce APIs)",
      source: {
        label: "Greenly features page",
        url: "https://www.greenly.earth/en-us"  // verifies standards and integrations 2
      }
    }
  ]
};
