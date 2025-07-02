/**
 * AIOXY GLOBAL GHG EMISSION FACTORS (CLIENT-SIDE)
 * Sources: Government agencies (UBA, DEFRA, EPA, ADEME, etc.)
 * Verified: Gemini + Manual Review
 * Updated: TODAY
 * License: Open-source (Credit Aioxy)
 */
const AioxyGHGData = {
  // ================= EUROPE =================
  "Germany": {
    scope1: {
      fuel: {
        petrol: { factor: 2.33, unit: "kgCO2/litre", source: "UBA", source_url: "https://www.umweltbundesamt.de" },
        diesel: { factor: 2.64, unit: "kgCO2/litre", source: "UBA", source_url: "https://www.umweltbundesamt.de" }
      }
    },
    scope2: {
      electricity: { factor: 0.366, unit: "kgCO2e/kWh", source: "UBA 2023", source_url: "https://www.umweltbundesamt.de" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.58, unit: "kgCO2e/litre", source: "UBA GEMIS", source_url: "https://www.umweltbundesamt.de" },
        diesel: { factor: 0.59, unit: "kgCO2e/litre", source: "UBA GEMIS", source_url: "https://www.umweltbundesamt.de" }
      }
    }
  },
  "UK": {
    scope1: {
      fuel: {
        petrol: { factor: 2.308, unit: "kgCO2e/litre", source: "DESNZ 2023", source_url: "https://www.gov.uk" },
        diesel: { factor: 2.673, unit: "kgCO2e/litre", source: "DESNZ 2023", source_url: "https://www.gov.uk" }
      }
    },
    scope2: {
      electricity: { factor: 0.193, unit: "kgCO2e/kWh", source: "DESNZ 2023", source_url: "https://www.gov.uk" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.509, unit: "kgCO2e/litre", source: "DESNZ 2023", source_url: "https://www.gov.uk" },
        diesel: { factor: 0.590, unit: "kgCO2e/litre", source: "DESNZ 2023", source_url: "https://www.gov.uk" }
      }
    }
  },
  "France": {
    scope1: {
      fuel: {
        petrol: { factor: 2.30, unit: "kgCO2/litre", source: "ADEME", source_url: "https://www.ademe.fr" },
        diesel: { factor: 2.60, unit: "kgCO2/litre", source: "ADEME", source_url: "https://www.ademe.fr" }
      }
    },
    scope2: {
      electricity: { factor: 0.052, unit: "kgCO2e/kWh", source: "ADEME 2024", source_url: "https://www.ademe.fr" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.58, unit: "kgCO2e/litre", source: "ADEME", source_url: "https://www.ademe.fr" },
        diesel: { factor: 0.59, unit: "kgCO2e/litre", source: "ADEME", source_url: "https://www.ademe.fr" }
      }
    }
  },
  // ================= ASIA =================
  "Japan": {
    scope1: {
      fuel: {
        petrol: { factor: 2.30, unit: "kgCO2/litre", source: "MOE Japan", source_url: "https://www.env.go.jp" },
        diesel: { factor: 2.65, unit: "kgCO2/litre", source: "MOE Japan", source_url: "https://www.env.go.jp" }
      }
    },
    scope2: {
      electricity: { factor: 0.40, unit: "kgCO2e/kWh", source: "IGES/MOE 2022", source_url: "https://www.iges.or.jp" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.509, unit: "kgCO2e/litre", source: "UK DESNZ (Proxy)", source_url: "https://www.gov.uk" },
        diesel: { factor: 0.590, unit: "kgCO2e/litre", source: "UK DESNZ (Proxy)", source_url: "https://www.gov.uk" }
      }
    }
  },
  "South Korea": {
    scope1: {
      fuel: {
        petrol: { factor: 2.308, unit: "kgCO2/litre", source: "GIR Korea", source_url: "http://www.gir.go.kr" },
        diesel: { factor: 2.673, unit: "kgCO2/litre", source: "GIR Korea", source_url: "http://www.gir.go.kr" }
      }
    },
    scope2: {
      electricity: { factor: 0.404, unit: "kgCO2e/kWh", source: "GIR 2022", source_url: "http://www.gir.go.kr" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.548, unit: "kgCO2e/litre", source: "U.S. EPA (Proxy)", source_url: "https://www.epa.gov" },
        diesel: { factor: 0.648, unit: "kgCO2e/litre", source: "U.S. EPA (Proxy)", source_url: "https://www.epa.gov" }
      }
    }
  },
  "China": {
    scope1: {
      fuel: {
        petrol: { factor: 2.23, unit: "kgCO2/litre", source: "CAEP China", source_url: "https://www.climatiq.io" },
        diesel: { factor: 2.65, unit: "kgCO2/litre", source: "CAEP China", source_url: "https://www.climatiq.io" }
      }
    },
    scope2: {
      electricity: { factor: 0.577, unit: "kgCO2e/kWh", source: "MEE China 2023", source_url: "https://wiki.unece.org" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.49, unit: "kgCO2e/litre", source: "CAEP China", source_url: "https://www.climatiq.io" },
        diesel: { factor: 0.67, unit: "kgCO2e/litre", source: "CAEP China", source_url: "https://www.climatiq.io" }
      }
    }
  },
  // ================= NORTH AMERICA =================
  "US": {
    scope1: {
      fuel: {
        petrol: { factor: 2.308, unit: "kgCO2/litre", source: "U.S. EPA 2024", source_url: "https://www.epa.gov" },
        diesel: { factor: 2.673, unit: "kgCO2/litre", source: "U.S. EPA 2024", source_url: "https://www.epa.gov" }
      }
    },
    scope2: {
      electricity: { factor: 0.354, unit: "kgCO2e/kWh", source: "EPA eGRID 2022", source_url: "https://www.epa.gov" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.548, unit: "kgCO2e/litre", source: "U.S. EPA", source_url: "https://www.epa.gov" },
        diesel: { factor: 0.648, unit: "kgCO2e/litre", source: "U.S. EPA", source_url: "https://www.epa.gov" }
      }
    }
  },
  "Canada": {
    scope1: {
      fuel: {
        petrol: { factor: 2.307, unit: "kgCO2/litre", source: "ECCC 2024", source_url: "https://www.canada.ca" },
        diesel: { factor: 2.681, unit: "kgCO2/litre", source: "ECCC 2024", source_url: "https://www.canada.ca" }
      }
    },
    scope2: {
      electricity: { factor: 0.137, unit: "kgCO2e/kWh", source: "ECCC 2024", source_url: "https://www.canada.ca" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.548, unit: "kgCO2e/litre", source: "U.S. EPA (Proxy)", source_url: "https://www.epa.gov" },
        diesel: { factor: 0.648, unit: "kgCO2e/litre", source: "U.S. EPA (Proxy)", source_url: "https://www.epa.gov" }
      }
    }
  },
  // ================= OCEANIA =================
  "Australia": {
    scope1: {
      fuel: {
        petrol: { factor: 2.32, unit: "kgCO2e/litre", source: "DCCEEW 2024", source_url: "https://www.dcceew.gov.au" },
        diesel: { factor: 2.71, unit: "kgCO2e/litre", source: "DCCEEW 2024", source_url: "https://www.dcceew.gov.au" }
      }
    },
    scope2: {
      electricity: { factor: 0.56, unit: "kgCO2e/kWh", source: "CER 2024", source_url: "https://cer.gov.au" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.574, unit: "kgCO2e/litre", source: "bp Target Neutral", source_url: "https://www.bp.com" },
        diesel: { factor: 0.510, unit: "kgCO2e/litre", source: "bp Target Neutral", source_url: "https://www.bp.com" }
      }
    }
  },
  "New Zealand": {
    scope1: {
      fuel: {
        petrol: { factor: 2.453, unit: "kgCO2e/litre", source: "MfE NZ", source_url: "https://environment.govt.nz" },
        diesel: { factor: 2.766, unit: "kgCO2e/litre", source: "MfE NZ", source_url: "https://environment.govt.nz" }
      }
    },
    scope2: {
      electricity: { factor: 0.074, unit: "kgCO2e/kWh", source: "MfE 2022", source_url: "https://environment.govt.nz" }
    },
    scope3: {
      fuel_wtt: {
        petrol: { factor: 0.574, unit: "kgCO2e/litre", source: "bp Target Neutral", source_url: "https://www.bp.com" },
        diesel: { factor: 0.510, unit: "kgCO2e/litre", source: "bp Target Neutral", source_url: "https://www.bp.com" }
      }
    }
  },

  // ================= UTILITIES =================
  /**
   * Get emission factor with error handling
   * @returns {object} {factor, unit, source, source_url}
   */
  getFactor: function(region, scope, category) {
    try {
      return this[region][scope][category] || 
             { factor: 0, unit: "N/A", source: "Unknown", source_url: "#" };
    } catch (e) {
      console.error(`Missing data for ${region}/${scope}/${category}`);
      return { factor: 0, unit: "N/A", source: "Unknown", source_url: "#" };
    }
  },

  /** List all supported countries */
  getCountries: function() {
    return Object.keys(this).filter(k => typeof this[k] === "object");
  }
};
