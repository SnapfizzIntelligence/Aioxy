// AIOXY PEF 3.1 DATABASE — ISO 14044 COMPLIANT
// Built: 2026-04-19 08:48:08
// Sources: EC JRC | AIB 2024 | LANCA v2.5 | FAOSTAT | AWARE 2.0 | USEtox 2.14
// Builder: SnapfizzIntelligence | Auditor: Claude
// ======================================================

window.aioxyData = window.aioxyData || {};
window.aioxyData.pef_factors = {
  "normalization_factors": {
    "Acidification": 55.569541230601935,
    "Climate change": 7553.083162851173,
    "Ecotoxicity, freshwater": 56716.58633705956,
    "EF-particulate matter": 0.0005953668211254782,
    "Eutrophication, freshwater": 1.6068521282881294,
    "Eutrophication, marine": 19.54518155191912,
    "Eutrophication, terrestrial": 176.75499978894175,
    "Human toxicity, cancer": 1.725289765387052e-05,
    "Human toxicity, non-cancer": 0.00012873573500807206,
    "Ionising radiation": 4220.163390149926,
    "Land use": 819498.1829230306,
    "Ozone depletion": 0.0523483833840181,
    "Photochemical ozone formation": 40.85919773477717,
    "Resource depletion, fossils": 65004.259664016536,
    "Resource depletion, minerals and metals": 0.06362261523695466,
    "Water use": 11468.708640759718
  },
  "weighting_factors": {
    "Acidification": 0.00062,
    "Climate change": 0.002106,
    "Ecotoxicity, freshwater": 0.000192,
    "EF-particulate matter": 0.000896,
    "Eutrophication, freshwater": 0.00028,
    "Eutrophication, marine": 0.000296,
    "Eutrophication, terrestrial": 0.000371,
    "Human toxicity, cancer": 0.000213,
    "Human toxicity, non-cancer": 0.000184,
    "Ionising radiation": 0.000501,
    "Land use": 0.000794,
    "Ozone depletion": 0.000631,
    "Photochemical ozone formation": 0.000478,
    "Resource depletion, fossils": 0.000832,
    "Resource depletion, minerals and metals": 0.000755,
    "Water use": 0.000851
  },
  "global_population": 6895889018,
  "version": "EF 3.1",
  "source": "European Commission Joint Research Centre"
};

window.aioxyData = window.aioxyData || {};
window.aioxyData.ilcd_registry = {
  "Acidification": {
    "uuid": "b5c611c6-def3-11e6-bf01-fe55135034f3",
    "name": "Acidification",
    "unit": "mol H+ eq"
  },
  "Climate change": {
    "uuid": "6209b35f-9447-40b5-b68c-a1099e3674a0",
    "name": "Climate change",
    "unit": "kg CO2 eq"
  },
  "Ecotoxicity, freshwater": {
    "uuid": "05316e7a-b254-4bea-9cf0-6bf33eb5c630",
    "name": "Ecotoxicity, freshwater",
    "unit": "CTUe"
  },
  "Eutrophication, marine": {
    "uuid": "b5c619fa-def3-11e6-bf01-fe55135034f3",
    "name": "Eutrophication marine",
    "unit": "kg N eq"
  },
  "Eutrophication, freshwater": {
    "uuid": "b53ec18f-7377-4ad3-86eb-cc3f4f276b2b",
    "name": "Eutrophication, freshwater",
    "unit": "kg P eq"
  },
  "Eutrophication, terrestrial": {
    "uuid": "b5c614d2-def3-11e6-bf01-fe55135034f3",
    "name": "Eutrophication, terrestrial",
    "unit": "mol N eq"
  },
  "Human toxicity, cancer": {
    "uuid": "2299222a-bbd8-474f-9d4f-4dd1f18aea7c",
    "name": "Human toxicity, cancer",
    "unit": "CTUh"
  },
  "Human toxicity, non-cancer": {
    "uuid": "7cfdcfcf-b222-4b26-888a-a55f9fbf7ac8",
    "name": "Human toxicity, non-cancer",
    "unit": "CTUh"
  },
  "Ionising radiation": {
    "uuid": "b5c632be-def3-11e6-bf01-fe55135034f3",
    "name": "Ionising radiation, human health",
    "unit": "kBq U-235 eq"
  },
  "Land use": {
    "uuid": "b2ad6890-c78d-11e6-9d9d-cec0c932ce01",
    "name": "Land use",
    "unit": "pt"
  },
  "Ozone depletion": {
    "uuid": "b5c629d6-def3-11e6-bf01-fe55135034f3",
    "name": "Ozone depletion",
    "unit": "kg CFC-11 eq"
  },
  "EF-particulate matter": {
    "uuid": "b5c602c6-def3-11e6-bf01-fe55135034f3",
    "name": "EF-particulate matter",
    "unit": "disease incidences"
  },
  "Photochemical ozone formation": {
    "uuid": "b5c610fe-def3-11e6-bf01-fe55135034f3",
    "name": "Photochemical ozone formation - human health",
    "unit": "kg NMVOC eq"
  },
  "Resource depletion, fossils": {
    "uuid": "b2ad6110-c78d-11e6-9d9d-cec0c932ce01",
    "name": "Resource use, fossils",
    "unit": "MJ"
  },
  "Resource depletion, minerals and metals": {
    "uuid": "b2ad6494-c78d-11e6-9d9d-cec0c932ce01",
    "name": "Resource use, minerals and metals",
    "unit": "kg Sb eq"
  },
  "Water use": {
    "uuid": "b2ad66ce-c78d-11e6-9d9d-cec0c932ce01",
    "name": "Water use",
    "unit": "m3 world eq"
  }
};

window.aioxyData = window.aioxyData || {};
window.aioxyData.residual_mix = {
  "co2_factors": {
    "AT": 0.0,
    "BA": 777.024118,
    "BE": 131.728501,
    "BG": 379.527297,
    "CH": 0.0,
    "CY": 613.080283,
    "CZ": 584.06937,
    "DE": 724.564186,
    "DK": 421.893499,
    "EE": 611.962362,
    "ES": 292.196398,
    "FI": 405.592457,
    "FR": 23.51959,
    "GB": 420.756652,
    "GR": 367.069949,
    "HR": 573.174293,
    "HU": 318.642851,
    "IE": 365.609631,
    "IS": 505.507145,
    "IT": 441.195347,
    "LT": 567.910192,
    "LU": 213.071819,
    "LV": 504.220834,
    "ME": 622.513041,
    "MT": 398.446938,
    "NL": 382.46539,
    "NO": 534.839654,
    "PL": 808.299506,
    "PT": 501.760952,
    "RO": 233.022226,
    "RS": 895.955152,
    "SE": 85.517039,
    "SI": 429.450018,
    "SK": 334.326272
  },
  "source": "AIB 2024 European Residual Mixes",
  "unit": "g CO2/kWh",
  "year": 2024
};

window.aioxyData = window.aioxyData || {};
window.aioxyData.lanca_sqi = {
  "occupation": {
    "Afghanistan": 54.344596,
    "Albania": 123.745369,
    "Algeria": 34.953751,
    "Andorra": 156.510308,
    "Angola": 99.852587,
    "Anguilla": 83.06267,
    "Antigua and Barbuda": 93.601668,
    "Argentina": 86.770049,
    "Armenia": 49.525714,
    "Aruba": 18.618647,
    "Australia": 26.887404,
    "Austria": 151.056297,
    "Azerbaijan": 46.751249,
    "Bahamas": 81.630929,
    "Bahrain": 5.48106,
    "Bangladesh": 155.492468,
    "Barbados": 99.81879,
    "Belarus": 105.306053,
    "Belgium": 136.924831,
    "Belize": 136.630844,
    "Benin": 102.616658,
    "Bhutan": 57.208272,
    "Bolivia": 93.341298,
    "Bonaire": 18.629388,
    "Bosnia and Herzegovina": 145.585331,
    "Botswana": 53.113199,
    "Brazil": 138.142492,
    "British Virgin Islands": 87.760415,
    "Brunei Darussalam": 192.827499,
    "Bulgaria": 105.061352,
    "Burkina Faso": 77.556197,
    "Burundi": 47.977928,
    "Cambodia": 137.932494,
    "Cameroon": 124.160882,
    "Canada": 37.859342,
    "Canarias": 86.822791,
    "Cayman Islands": 79.848094,
    "Central African Republic": 114.915788,
    "Chad": 58.640235,
    "Chile": 96.758945,
    "China": 91.485391,
    "Colombia": 163.840496,
    "Comoros": 147.374185,
    "Congo": 126.819432,
    "Congo DRC": 118.896478,
    "Costa Rica": 183.834488,
    "Cote d'Ivoire": 115.239744,
    "Croatia": 143.065275,
    "Cuba": 101.86979,
    "Curacao": 33.082332,
    "Cyprus": 103.282184,
    "Czech Republic": 127.284248,
    "Denmark": 106.76521,
    "Djibouti": 8.123792,
    "Dominica": 161.72755,
    "Dominican Republic": 105.599294,
    "Ecuador": 117.585458,
    "Egypt": 28.633625,
    "El Salvador": 140.879731,
    "Equatorial Guinea": 159.316841,
    "Eritrea": 31.292679,
    "Estonia": 104.759535,
    "Ethiopia": 41.981128,
    "Falkland Islands": 94.925633,
    "Faroe Islands": 138.805925,
    "Fiji": 166.955095,
    "Finland": 62.788385,
    "France": 132.224764,
    "French Guiana": 173.534768,
    "Gabon": 138.456597,
    "Gambia": 78.476793,
    "Georgia": 104.772928,
    "Germany": 111.241279,
    "Ghana": 109.7939,
    "Gibraltar": 83.028146,
    "Greece": 101.737989,
    "Greenland": -8.749698,
    "Grenada": 137.02284,
    "Guadeloupe": 129.714935,
    "Guatemala": 131.581294,
    "Guernsey": 114.791973,
    "Guinea": 136.34132,
    "Guinea-Bissau": 127.39911,
    "Guyana": 138.115767,
    "Haiti": 118.347495,
    "Honduras": 128.682607,
    "Hungary": 98.883297,
    "Iceland": 101.577627,
    "India": 84.36978,
    "Indonesia": 180.25782,
    "Iran": 34.494702,
    "Iraq": 12.363782,
    "Ireland": 146.143958,
    "Isle of Man": 125.082064,
    "Israel": 21.386844,
    "Italy": 108.395461,
    "Jamaica": 136.682591,
    "Japan": 134.251174,
    "Jersey": 133.94978,
    "Jordan": 12.080765,
    "Kazakhstan": 18.028963,
    "Kenya": 34.047872,
    "Kuwait": 4.702393,
    "Kyrgyzstan": 94.734892,
    "Laos": 143.808678,
    "Latvia": 105.744342,
    "Lebanon": 101.279412,
    "Lesotho": 40.696271,
    "Liberia": 170.223131,
    "Libya": 28.388519,
    "Liechtenstein": 155.504176,
    "Lithuania": 107.623647,
    "Luxembourg": 121.230322,
    "Madagascar": 79.882023,
    "Madeira": 102.975693,
    "Malawi": 88.187408,
    "Malaysia": 196.727774,
    "Mali": 35.507554,
    "Malta": 112.651412,
    "Martinique": 149.52142,
    "Mauritania": 35.112715,
    "Mayotte": 99.765194,
    "Mexico": 67.252357,
    "Moldova": 88.36173,
    "Mongolia": 39.463876,
    "Montenegro": 157.165362,
    "Montserrat": 121.049652,
    "Morocco": 63.445567,
    "Mozambique": 99.85054,
    "Myanmar": 146.783032,
    "Namibia": 53.294941,
    "Nepal": 97.898166,
    "Netherlands": 106.138428,
    "New Caledonia": 141.337271,
    "New Zealand": 177.985582,
    "Nicaragua": 149.576671,
    "Niger": 39.455463,
    "Nigeria": 101.168594,
    "North Korea": 140.803262,
    "Norway": 76.532007,
    "Oman": 6.464367,
    "Pakistan": 42.698615,
    "Palestinian Territory": 53.646243,
    "Panama": 175.01954,
    "Papua New Guinea": 186.112105,
    "Paraguay": 96.31015,
    "Peru": 114.651443,
    "Philippines": 181.047484,
    "Poland": 104.596219,
    "Portugal": 123.65948,
    "Puerto Rico": 120.571098,
    "Qatar": 5.685329,
    "Romania": 97.947592,
    "Russian Federation": 49.826557,
    "Rwanda": 40.389907,
    "Saba": 87.701763,
    "Saint Barthelemy": 83.037814,
    "Saint Eustatius": 89.556695,
    "Saint Kitts and Nevis": 92.772884,
    "Saint Lucia": 138.012672,
    "Saint Martin": 83.044564,
    "Saint Pierre and Miquelon": 99.346255,
    "Saint Vincent and the Grenadines": 156.273387,
    "San Marino": 103.08586,
    "Sao Tome and Principe": 170.08857,
    "Saudi Arabia": 26.045009,
    "Senegal": 68.909237,
    "Serbia": 129.410089,
    "Sierra Leone": 175.858936,
    "Singapore": 165.576156,
    "Sint Maarten": 83.044564,
    "Slovakia": 135.655864,
    "Slovenia": 156.077053,
    "Solomon Islands": 204.328859,
    "Somalia": 25.477192,
    "South Africa": 63.890144,
    "South Korea": 133.471025,
    "South Sudan": 83.221585,
    "Spain": 89.664089,
    "Sri Lanka": 141.542932,
    "Sudan": 46.423879,
    "Suriname": 149.304685,
    "Swaziland": 87.306817,
    "Sweden": 76.308719,
    "Switzerland": 169.847388,
    "Syria": 36.098417,
    "Tajikistan": 99.526602,
    "Tanzania": 72.047575,
    "Thailand": 136.156639,
    "The Former Yugoslav Republic of Macedonia": 124.6793,
    "Timor-Leste": 122.609556,
    "Togo": 107.986787,
    "Trinidad and Tobago": 132.764973,
    "Tunisia": 54.726535,
    "Turkey": 54.318144,
    "Turkmenistan": 12.721024,
    "Turks and Caicos Islands": 96.407926,
    "Uganda": 96.107024,
    "Ukraine": 75.570875,
    "United Arab Emirates": 4.233028,
    "United Kingdom": 116.086783,
    "United States": 78.215043,
    "Uruguay": 106.600313,
    "US Virgin Islands": 87.931791,
    "Uzbekistan": 25.389468,
    "Vanuatu": 181.75355,
    "Vatican City": 103.065945,
    "Venezuela": 131.518439,
    "Vietnam": 138.800388,
    "Yemen": 35.641373,
    "Zambia": 99.259401,
    "Zimbabwe": 113.931225
  },
  "transformation": {
    "Afghanistan": 2309.645328,
    "Albania": 5259.178162,
    "Algeria": 1485.534421,
    "Andorra": 6651.688082,
    "Angola": 4243.734934,
    "Anguilla": 3530.163479,
    "Antigua and Barbuda": 3978.070907,
    "Argentina": 3687.727075,
    "Armenia": 2104.842836,
    "Aruba": 791.29248,
    "Australia": 1142.714667,
    "Austria": 6419.892642,
    "Azerbaijan": 1986.928067,
    "Bahamas": 3469.314481,
    "Bahrain": 232.945058,
    "Bangladesh": 6608.429889,
    "Barbados": 4242.298587,
    "Belarus": 4475.507264,
    "Belgium": 5819.305317,
    "Belize": 5806.810874,
    "Benin": 4361.207948,
    "Bhutan": 2431.351555,
    "Bolivia": 3967.005186,
    "Bonaire": 791.748991,
    "Bosnia and Herzegovina": 6187.376573,
    "Botswana": 2257.310938,
    "Brazil": 5871.055904,
    "British Virgin Islands": 3729.817638,
    "Brunei Darussalam": 8195.168717,
    "Bulgaria": 4465.107452,
    "Burkina Faso": 3296.138362,
    "Burundi": 2039.061929,
    "Cambodia": 5862.130995,
    "Cameroon": 5276.837471,
    "Canada": 1609.022054,
    "Canarias": 3689.968624,
    "Cayman Islands": 3393.543989,
    "Central African Republic": 4883.92099,
    "Chad": 2492.21,
    "Chile": 4112.255165,
    "China": 3888.129136,
    "Colombia": 6963.221092,
    "Comoros": 6263.402865,
    "Congo": 5389.825867,
    "Congo DRC": 5053.100335,
    "Costa Rica": 7812.965737,
    "Cote d'Ivoire": 4897.689123,
    "Croatia": 6080.274205,
    "Cuba": 4329.466083,
    "Curacao": 1405.9991,
    "Cyprus": 4389.492835,
    "Czech Republic": 5409.580559,
    "Denmark": 4537.521441,
    "Djibouti": 345.26115,
    "Dominica": 6873.420858,
    "Dominican Republic": 4487.969977,
    "Ecuador": 4997.381985,
    "Egypt": 1216.929067,
    "El Salvador": 5987.388557,
    "Equatorial Guinea": 6770.96574,
    "Eritrea": 1329.938874,
    "Estonia": 4452.280236,
    "Ethiopia": 1784.197928,
    "Falkland Islands": 4034.339406,
    "Faroe Islands": 5899.251818,
    "Fiji": 7095.591521,
    "Finland": 2668.506356,
    "France": 5619.552484,
    "French Guiana": 7375.227633,
    "Gabon": 5884.405372,
    "Gambia": 3335.263693,
    "Georgia": 4452.849447,
    "Germany": 4727.754348,
    "Ghana": 4666.240739,
    "Gibraltar": 3528.696207,
    "Greece": 4323.86455,
    "Greenland": -371.862181,
    "Grenada": 5823.470711,
    "Guadeloupe": 5512.884744,
    "Guatemala": 5592.205009,
    "Guernsey": 4878.658868,
    "Guinea": 5794.506087,
    "Guinea-Bissau": 5414.462189,
    "Guyana": 5869.920092,
    "Haiti": 5029.768556,
    "Honduras": 5469.0108,
    "Hungary": 4202.540135,
    "Iceland": 4317.049167,
    "India": 3585.715657,
    "Indonesia": 7660.957336,
    "Iran": 1466.024829,
    "Iraq": 525.46074,
    "Ireland": 6211.118215,
    "Isle of Man": 5315.987738,
    "Israel": 908.940885,
    "Italy": 4606.807074,
    "Jamaica": 5809.010137,
    "Japan": 5705.674877,
    "Jersey": 5692.865634,
    "Jordan": 513.432497,
    "Kazakhstan": 766.230943,
    "Kenya": 1447.034561,
    "Kuwait": 199.851723,
    "Kyrgyzstan": 4026.232913,
    "Laos": 6111.868798,
    "Latvia": 4494.134539,
    "Lebanon": 4304.375023,
    "Lesotho": 1729.591533,
    "Liberia": 7234.483086,
    "Libya": 1206.512044,
    "Liechtenstein": 6608.927484,
    "Lithuania": 4574.004985,
    "Luxembourg": 5152.288669,
    "Madagascar": 3394.98596,
    "Madeira": 4376.466948,
    "Malawi": 3747.964845,
    "Malaysia": 8360.930411,
    "Mali": 1509.071035,
    "Malta": 4787.685024,
    "Martinique": 6354.660364,
    "Mauritania": 1492.290405,
    "Mayotte": 4240.020742,
    "Mexico": 2858.225189,
    "Moldova": 3755.373517,
    "Mongolia": 1677.214709,
    "Montenegro": 6679.527903,
    "Montserrat": 5144.610211,
    "Morocco": 2696.436613,
    "Mozambique": 4243.64796,
    "Myanmar": 6238.278853,
    "Namibia": 2265.03498,
    "Nepal": 4160.672039,
    "Netherlands": 4510.883193,
    "New Caledonia": 6006.83402,
    "New Zealand": 7564.387231,
    "Nicaragua": 6357.008525,
    "Niger": 1676.857195,
    "Nigeria": 4299.665237,
    "North Korea": 5984.138624,
    "Norway": 3252.610279,
    "Oman": 274.735607,
    "Pakistan": 1814.691129,
    "Palestinian Territory": 2279.965346,
    "Panama": 7438.33044,
    "Papua New Guinea": 7909.764453,
    "Paraguay": 4093.181381,
    "Peru": 4872.686332,
    "Philippines": 7694.518054,
    "Poland": 4445.339323,
    "Portugal": 5255.527905,
    "Puerto Rico": 5124.271654,
    "Qatar": 241.626471,
    "Romania": 4162.772665,
    "Russian Federation": 2117.628692,
    "Rwanda": 1716.571063,
    "Saba": 3727.324939,
    "Saint Barthelemy": 3529.107092,
    "Saint Eustatius": 3806.159521,
    "Saint Kitts and Nevis": 3942.847567,
    "Saint Lucia": 5865.538562,
    "Saint Martin": 3529.39396,
    "Saint Pierre and Miquelon": 4222.215821,
    "Saint Vincent and the Grenadines": 6641.618957,
    "San Marino": 4381.149065,
    "Sao Tome and Principe": 7228.764209,
    "Saudi Arabia": 1106.912897,
    "Senegal": 2928.642556,
    "Serbia": 5499.928784,
    "Sierra Leone": 7474.004763,
    "Singapore": 7036.986623,
    "Sint Maarten": 3529.39396,
    "Slovakia": 5765.374227,
    "Slovenia": 6633.274747,
    "Solomon Islands": 8683.97651,
    "Somalia": 1082.780678,
    "South Africa": 2715.331138,
    "South Korea": 5672.518546,
    "South Sudan": 3536.917354,
    "Spain": 3810.723787,
    "Sri Lanka": 6015.574603,
    "Sudan": 1973.014869,
    "Suriname": 6345.449109,
    "Swaziland": 3710.539737,
    "Sweden": 3243.120565,
    "Switzerland": 7218.513998,
    "Syria": 1534.18273,
    "Tajikistan": 4229.880577,
    "Tanzania": 3062.02195,
    "Thailand": 5786.657169,
    "The Former Yugoslav Republic of Macedonia": 5298.870231,
    "Timor-Leste": 5210.90612,
    "Togo": 4589.438436,
    "Trinidad and Tobago": 5642.511364,
    "Tunisia": 2325.877717,
    "Turkey": 2308.521109,
    "Turkmenistan": 540.643518,
    "Turks and Caicos Islands": 4097.336866,
    "Uganda": 4084.548509,
    "Ukraine": 3211.7622,
    "United Arab Emirates": 179.903676,
    "United Kingdom": 4933.68829,
    "United States": 3324.139328,
    "Uruguay": 4530.513289,
    "US Virgin Islands": 3737.101102,
    "Uzbekistan": 1079.052369,
    "Vanuatu": 7724.525868,
    "Vatican City": 4380.30265,
    "Venezuela": 5589.533646,
    "Vietnam": 5899.016481,
    "Yemen": 1514.758344,
    "Zambia": 4218.52454,
    "Zimbabwe": 4842.077064
  },
  "indicator": "Soil Quality Index — Total, unspecified land use",
  "source": "LANCA v2.5 — Fraunhofer IBP / European Commission JRC",
  "version": "EF 3.1"
};

window.aioxyData = window.aioxyData || {};
window.aioxyData.crop_yields = {
  "yields": {
    "Argentina": {
      "almonds, in shell": 1796.86,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 870.9,
      "apples": 28703.9,
      "apricots": 11416.28,
      "artichokes": 19816.08,
      "asparagus": 4056.32,
      "avocados": 7124.18,
      "bananas": 20970.08,
      "barley": 3639.3,
      "beans, dry": 1248.3,
      "broad beans and horse beans, dry": 8953.64,
      "canary seed": 1318.5,
      "cantaloupes and other melons": 15714.28,
      "carrots and turnips": 33447.52,
      "cassava, fresh": 10060.34,
      "cereals n.e.c.": 644.34,
      "cherries": 3286.6,
      "chick peas, dry": 1189.74,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 1152.56,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 23679.68,
      "figs": 3210.44,
      "flax, raw or retted": 907.78,
      "grapes": 9248.96,
      "green garlic": 9827.68,
      "groundnuts, excluding shelled": 3197.58,
      "hen eggs in shell, fresh": 7699.6,
      "hop cones": 1225.82,
      "horse meat, fresh or chilled": 227.4,
      "lemons and limes": 31987.94,
      "lentils, dry": 1000.86,
      "linseed": 1283.74,
      "lupins": 1529.14,
      "maize (corn)": 6681.32,
      "mangoes, guavas and mangosteens": 8063.4,
      "maté leaves": 4101.82,
      "meat of asses, fresh or chilled": 148.6,
      "meat of cattle with the bone, fresh or chilled": 228.4,
      "meat of chickens, fresh or chilled": 3063.4,
      "meat of ducks, fresh or chilled": 2609.8,
      "meat of geese, fresh or chilled": 3000.0,
      "meat of goat, fresh or chilled": 7.0,
      "meat of mules, fresh or chilled": 200.8,
      "meat of pig with the bone, fresh or chilled": 94.0,
      "meat of rabbits and hares, fresh or chilled": 1623.8,
      "meat of sheep, fresh or chilled": 19.0,
      "meat of turkeys, fresh or chilled": 4637.0,
      "millet": 1442.1,
      "oats": 1946.3,
      "olives": 2762.26,
      "onions and shallots, dry (excluding dehydrated)": 36083.06,
      "oranges": 22093.26,
      "other beans, green": 2317.9,
      "other fibre crops, raw, n.e.c.": 1000.3,
      "other stimulant, spice and aromatic crops, n.e.c.": 1182.54,
      "other vegetables, fresh n.e.c.": 14721.36,
      "papayas": 10960.8,
      "peaches and nectarines": 16232.48,
      "pears": 31787.34,
      "peas, dry": 2165.5,
      "peas, green": 1996.38,
      "peppermint, spearmint": 19248.34,
      "pineapples": 18101.5,
      "plums and sloes": 9624.5,
      "pomelos and grapefruits": 26906.84,
      "potatoes": 35428.7,
      "pumpkins, squash and gourds": 15027.92,
      "quinces": 8550.64,
      "rape or colza seed": 1621.04,
      "raw hides and skins of cattle": 37.2,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 5.8,
      "raw milk of cattle": 7482.4,
      "rice": 6756.56,
      "rye": 1812.8,
      "safflower seed": 690.44,
      "seed cotton, unginned": 2240.98,
      "sorghum": 4077.42,
      "soya beans": 2635.66,
      "strawberries": 30010.48,
      "string beans": 7471.74,
      "sugar cane": 34248.34,
      "sunflower seed": 2058.08,
      "sweet potatoes": 12238.82,
      "tangerines, mandarins, clementines": 13338.42,
      "tea leaves": 11301.92,
      "tomatoes": 71723.56,
      "tung nuts": 2476.12,
      "unmanufactured tobacco": 1629.3,
      "walnuts, in shell": 1266.82,
      "watermelons": 13919.02,
      "wheat": 2838.4
    },
    "Australia": {
      "almonds, in shell": 6004.14,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 1160.52,
      "apples": 15895.58,
      "apricots": 1098.98,
      "artichokes": 14927.42,
      "asparagus": 5161.92,
      "avocados": 5594.04,
      "bananas": 28901.2,
      "barley": 2928.66,
      "beans, dry": 1732.96,
      "blueberries": 3902.58,
      "broad beans and horse beans, dry": 2006.58,
      "cabbages": 33026.88,
      "canary seed": 675.64,
      "cantaloupes and other melons": 32906.08,
      "carrots and turnips": 58439.6,
      "cauliflowers and broccoli": 12434.6,
      "cherries": 7154.84,
      "chestnuts, in shell": 2117.85,
      "chick peas, dry": 2109.0,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 21593.82,
      "cucumbers and gherkins": 29710.1,
      "currants": 4725.6,
      "eggplants (aubergines)": 21770.88,
      "figs": 1014.7,
      "ginger, raw": 10893.15,
      "grapes": 11667.5,
      "green corn (maize)": 11699.36,
      "green garlic": 6840.35,
      "groundnuts, excluding shelled": 3086.72,
      "hazelnuts, in shell": 1091.58,
      "hempseed": 3000.0,
      "hen eggs in shell, fresh": 6031.2,
      "hop cones": 2346.8,
      "horse meat, fresh or chilled": 255.6,
      "kiwi fruit": 16900.88,
      "lemons and limes": 23417.8,
      "lentils, dry": 1705.52,
      "lettuce and chicory": 18839.26,
      "linseed": 942.84,
      "lupins": 1618.86,
      "maize (corn)": 6574.02,
      "mangoes, guavas and mangosteens": 3970.92,
      "meat of cattle with the bone, fresh or chilled": 298.0,
      "meat of chickens, fresh or chilled": 1959.0,
      "meat of ducks, fresh or chilled": 2156.8,
      "meat of goat, fresh or chilled": 15.6,
      "meat of pig with the bone, fresh or chilled": 80.0,
      "meat of sheep, fresh or chilled": 24.6,
      "meat of turkeys, fresh or chilled": 3385.4,
      "millet": 1024.08,
      "oats": 1730.68,
      "olives": 2448.32,
      "onions and shallots, dry (excluding dehydrated)": 56665.0,
      "oranges": 19658.86,
      "other beans, green": 5580.74,
      "other berries and fruits of the genus vaccinium n.e.c.": 3345.76,
      "other citrus fruit, n.e.c.": 11100.36,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1762.92,
      "other tropical fruits, n.e.c.": 5816.26,
      "other vegetables, fresh n.e.c.": 34971.84,
      "papayas": 19161.28,
      "peaches and nectarines": 7000.04,
      "pears": 17049.88,
      "peas, dry": 1313.78,
      "peas, green": 4558.34,
      "persimmons": 8556.92,
      "pineapples": 39993.72,
      "pistachios, in shell": 1013.96,
      "plums and sloes": 7106.04,
      "pomelos and grapefruits": 14198.38,
      "potatoes": 40444.82,
      "pumpkins, squash and gourds": 20297.5,
      "rape or colza seed": 1969.12,
      "raspberries": 2722.88,
      "raw hides and skins of cattle": 34.8,
      "raw hides and skins of goats or kids": 4.6,
      "raw hides and skins of sheep or lambs": 5.2,
      "raw milk of cattle": 6493.8,
      "rice": 10379.58,
      "rye": 695.5,
      "safflower seed": 581.28,
      "seed cotton, unginned": 4675.02,
      "sorghum": 3105.72,
      "soya beans": 2242.74,
      "spinach": 6295.08,
      "strawberries": 24000.74,
      "sugar beet": 32039.7,
      "sugar cane": 88034.98,
      "sunflower seed": 1443.44,
      "sweet potatoes": 40905.3,
      "tangerines, mandarins, clementines": 24056.5,
      "tomatoes": 79524.26,
      "triticale": 1650.74,
      "true hemp, raw or retted": 12400.0,
      "vetches": 212.12,
      "walnuts, in shell": 413.66,
      "watermelons": 47623.7,
      "wheat": 2767.76
    },
    "Austria": {
      "apples": 34815.08,
      "apricots": 5757.1,
      "asparagus": 3353.02,
      "barley": 6141.08,
      "blueberries": 8097.28,
      "broad beans and horse beans, dry": 2455.46,
      "broad beans and horse beans, green": 3799.24,
      "cabbages": 47942.94,
      "carrots and turnips": 62648.9,
      "cauliflowers and broccoli": 22031.04,
      "cereals n.e.c.": 2489.98,
      "cherries": 24693.56,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 94493.48,
      "cucumbers and gherkins": 129928.34,
      "currants": 12727.08,
      "eggplants (aubergines)": 158000.0,
      "grapes": 7120.02,
      "green garlic": 5390.3,
      "hen eggs in shell, fresh": 14515.75,
      "hop cones": 1473.28,
      "leeks and other alliaceous vegetables": 43480.4,
      "lettuce and chicory": 30787.0,
      "linseed": 1199.96,
      "lupins": 1596.24,
      "maize (corn)": 10430.1,
      "meat of cattle with the bone, fresh or chilled": 332.8,
      "meat of chickens, fresh or chilled": 1283.0,
      "meat of goat, fresh or chilled": 10.8,
      "meat of pig with the bone, fresh or chilled": 98.0,
      "meat of sheep, fresh or chilled": 20.8,
      "mixed grain": 4790.66,
      "oats": 3873.14,
      "onions and shallots, dry (excluding dehydrated)": 47453.9,
      "other beans, green": 5111.84,
      "other oil seeds, n.e.c.": 710.2,
      "other pome fruits": 21000.0,
      "other pulses n.e.c.": 2099.76,
      "other vegetables, fresh n.e.c.": 18960.72,
      "peaches and nectarines": 10901.28,
      "pears": 83949.6,
      "peas, dry": 2238.2,
      "peas, green": 4550.12,
      "plums and sloes": 60466.66,
      "potatoes": 32624.5,
      "pumpkins, squash and gourds": 31483.68,
      "rape or colza seed": 3149.58,
      "raspberries": 6621.82,
      "raw milk of cattle": 7197.2,
      "raw milk of goats": 420.8,
      "raw milk of sheep": 403.6,
      "rye": 4651.32,
      "sorghum": 7655.5,
      "sour cherries": 30900.0,
      "soya beans": 2925.0,
      "spinach": 21384.8,
      "strawberries": 12408.6,
      "sugar beet": 78756.16,
      "sunflower seed": 2583.84,
      "tomatoes": 290470.0,
      "triticale": 5527.32,
      "true hemp, raw or retted": 4239.0,
      "walnuts, in shell": 17827.48,
      "watermelons": 41316.68,
      "wheat": 5836.64
    },
    "Bangladesh": {
      "areca nuts": 8399.94,
      "bananas": 16650.16,
      "barley": 976.86,
      "beans, dry": 934.34,
      "cabbages": 18612.8,
      "cantaloupes and other melons": 19980.3,
      "carrots and turnips": 10645.58,
      "castor oil seeds": 711.1,
      "cauliflowers and broccoli": 14436.78,
      "chick peas, dry": 1132.4,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 3241.06,
      "coconuts, in shell": 13064.68,
      "cucumbers and gherkins": 9566.08,
      "eggplants (aubergines)": 11731.92,
      "eggs from other birds in shell, fresh, n.e.c.": 1960.2,
      "ginger, raw": 8025.16,
      "green garlic": 7181.16,
      "groundnuts, excluding shelled": 1974.48,
      "hen eggs in shell, fresh": 1584.4,
      "jute, raw or retted": 2605.6,
      "kenaf, and other textile bast fibres, raw or retted": 2766.34,
      "lemons and limes": 1290.98,
      "lentils, dry": 1356.0,
      "linseed": 734.88,
      "maize (corn)": 8898.44,
      "mangoes, guavas and mangosteens": 11033.64,
      "meat of buffalo, fresh or chilled": 80.0,
      "meat of cattle with the bone, fresh or chilled": 73.0,
      "meat of chickens, fresh or chilled": 700.0,
      "meat of ducks, fresh or chilled": 1000.0,
      "meat of goat, fresh or chilled": 17.6,
      "meat of sheep, fresh or chilled": 6.0,
      "millet": 1124.84,
      "natural rubber in primary forms": 100.2,
      "okra": 6591.9,
      "onions and shallots, dry (excluding dehydrated)": 12204.74,
      "oranges": 4128.32,
      "other beans, green": 7647.26,
      "other berries and fruits of the genus vaccinium n.e.c.": 7071.98,
      "other fibre crops, raw, n.e.c.": 199.96,
      "other fruits, n.e.c.": 11627.78,
      "other oil seeds, n.e.c.": 1181.04,
      "other pulses n.e.c.": 1136.9,
      "other stimulant, spice and aromatic crops, n.e.c.": 5033.38,
      "other sugar crops n.e.c.": 13854.72,
      "other tropical fruits, n.e.c.": 26644.32,
      "other vegetables, fresh n.e.c.": 9432.12,
      "papayas": 14468.98,
      "peas, dry": 1098.52,
      "pigeon peas, dry": 1033.06,
      "pineapples": 16598.18,
      "plantains and cooking bananas": 15330.7,
      "pomelos and grapefruits": 12350.56,
      "potatoes": 21975.8,
      "pumpkins, squash and gourds": 12172.74,
      "rape or colza seed": 1281.4,
      "raw hides and skins of buffaloes": 32.0,
      "raw hides and skins of cattle": 12.0,
      "raw hides and skins of goats or kids": 5.0,
      "raw hides and skins of sheep or lambs": 1.0,
      "raw milk of buffalo": 623.4,
      "raw milk of cattle": 1349.0,
      "raw milk of goats": 100.0,
      "raw milk of sheep": 51.0,
      "rice": 5027.7,
      "seed cotton, unginned": 4210.08,
      "sesame seed": 952.34,
      "sorghum": 1218.58,
      "soya beans": 1732.72,
      "spinach": 7140.86,
      "strawberries": 7091.2,
      "sugar cane": 42865.3,
      "sweet potatoes": 10471.06,
      "tea leaves": 7300.64,
      "tomatoes": 15111.3,
      "unmanufactured tobacco": 2258.2,
      "wheat": 3420.46
    },
    "Belgium": {
      "apples": 40022.84,
      "asparagus": 6630.42,
      "barley": 7535.42,
      "blueberries": 6037.88,
      "broad beans and horse beans, dry": 4228.32,
      "cabbages": 30520.32,
      "carrots and turnips": 61038.24,
      "cauliflowers and broccoli": 21710.7,
      "cereals n.e.c.": 3977.66,
      "cherries": 6223.56,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 259845.46,
      "cucumbers and gherkins": 434403.16,
      "currants": 8767.86,
      "eggplants (aubergines)": 452866.66,
      "flax, raw or retted": 4850.58,
      "hen eggs in shell, fresh": 137.5,
      "leeks and other alliaceous vegetables": 39514.9,
      "lettuce and chicory": 44324.78,
      "maize (corn)": 8712.3,
      "meat of cattle with the bone, fresh or chilled": 316.2,
      "meat of chickens, fresh or chilled": 1513.0,
      "meat of ducks, fresh or chilled": 3192.6,
      "meat of goat, fresh or chilled": 17.0,
      "meat of pig with the bone, fresh or chilled": 99.0,
      "meat of sheep, fresh or chilled": 22.0,
      "meat of turkeys, fresh or chilled": 9682.0,
      "oats": 4542.96,
      "onions and shallots, dry (excluding dehydrated)": 36566.94,
      "other beans, green": 11913.26,
      "other berries and fruits of the genus vaccinium n.e.c.": 20533.9,
      "other pulses n.e.c.": 4249.5,
      "pears": 32896.56,
      "peas, dry": 3165.86,
      "peas, green": 6180.24,
      "plums and sloes": 3863.32,
      "potatoes": 40789.96,
      "pumpkins, squash and gourds": 38125.16,
      "rape or colza seed": 3716.7,
      "raspberries": 14453.66,
      "raw milk of cattle": 8492.6,
      "rye": 3770.2,
      "sour cherries": 2979.16,
      "spinach": 26873.32,
      "strawberries": 32610.06,
      "sugar beet": 83239.98,
      "tomatoes": 472009.4,
      "triticale": 6148.26,
      "wheat": 8168.32
    },
    "Brazil": {
      "apples": 33369.14,
      "avocados": 17212.68,
      "bananas": 14946.78,
      "barley": 3633.96,
      "beans, dry": 1130.54,
      "broad beans and horse beans, dry": 348.32,
      "buckwheat": 1357.54,
      "cantaloupes and other melons": 26234.74,
      "cashew nuts, in shell": 315.3,
      "cashewapple": 2507.96,
      "cassava, fresh": 15184.86,
      "castor oil seeds": 834.1,
      "cocoa beans": 485.22,
      "coconuts, in shell": 14628.86,
      "coffee, green": 1756.8,
      "eggs from other birds in shell, fresh, n.e.c.": 1277.2,
      "figs": 9928.44,
      "grapes": 21384.26,
      "green garlic": 13244.26,
      "groundnuts, excluding shelled": 3592.52,
      "hen eggs in shell, fresh": 5428.2,
      "horse meat, fresh or chilled": 131.0,
      "jute, raw or retted": 1235.58,
      "kenaf, and other textile bast fibres, raw or retted": 1435.58,
      "lemons and limes": 26008.04,
      "linseed": 949.78,
      "maize (corn)": 5378.6,
      "mangoes, guavas and mangosteens": 21792.04,
      "maté leaves": 8497.28,
      "meat of cattle with the bone, fresh or chilled": 264.2,
      "meat of chickens, fresh or chilled": 2144.8,
      "meat of ducks, fresh or chilled": 924.8,
      "meat of goat, fresh or chilled": 12.0,
      "meat of pig with the bone, fresh or chilled": 92.0,
      "meat of rabbits and hares, fresh or chilled": 1375.0,
      "meat of sheep, fresh or chilled": 16.0,
      "meat of turkeys, fresh or chilled": 10689.2,
      "natural rubber in primary forms": 1371.98,
      "oats": 2030.12,
      "oil palm fruit": 14501.2,
      "olives": 1464.7,
      "onions and shallots, dry (excluding dehydrated)": 33204.68,
      "oranges": 29094.88,
      "other fibre crops, raw, n.e.c.": 5003.96,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 754.22,
      "other oil seeds, n.e.c.": 1507.56,
      "other stimulant, spice and aromatic crops, n.e.c.": 266.02,
      "other tropical fruits, n.e.c.": 8374.7,
      "other vegetables, fresh n.e.c.": 13139.22,
      "papayas": 43004.82,
      "peaches and nectarines": 12876.46,
      "pears": 15267.86,
      "peas, dry": 3482.36,
      "pepper (piper spp.), raw": 3069.0,
      "persimmons": 21211.22,
      "pineapples": 37499.3,
      "pomelos and grapefruits": 18764.02,
      "potatoes": 33125.62,
      "quinces": 7010.2,
      "rape or colza seed": 1363.9,
      "raw hides and skins of cattle": 26.4,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of cattle": 2319.2,
      "raw milk of goats": 268.4,
      "rice": 6763.46,
      "rye": 1772.56,
      "seed cotton, unginned": 4201.66,
      "sesame seed": 523.5,
      "sisal, raw": 938.74,
      "sorghum": 3019.94,
      "soya beans": 3249.54,
      "strawberries": 39330.44,
      "sugar cane": 74864.84,
      "sunflower seed": 1586.68,
      "sweet potatoes": 14710.46,
      "tangerines, mandarins, clementines": 18950.3,
      "tea leaves": 9723.66,
      "tomatoes": 71351.28,
      "triticale": 2679.3,
      "tung nuts": 5180.68,
      "unmanufactured tobacco": 2037.02,
      "walnuts, in shell": 1270.96,
      "watermelons": 22827.22,
      "wheat": 2733.94,
      "yams": 9765.98
    },
    "Bulgaria": {
      "almonds, in shell": 596.66,
      "apples": 11000.8,
      "apricots": 5780.08,
      "artichokes": 2321.4,
      "asparagus": 2000.0,
      "barley": 5186.36,
      "blueberries": 2355.94,
      "cabbages": 22145.06,
      "cantaloupes and other melons": 10258.8,
      "carrots and turnips": 20899.1,
      "cauliflowers and broccoli": 11288.7,
      "cereals n.e.c.": 1726.26,
      "cherries": 4908.28,
      "chestnuts, in shell": 1750.0,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 20021.3,
      "cucumbers and gherkins": 60289.62,
      "currants": 1290.48,
      "eggplants (aubergines)": 26380.32,
      "figs": 2729.15,
      "flax, raw or retted": 1820.5,
      "grapes": 5505.88,
      "green garlic": 3757.02,
      "hazelnuts, in shell": 508.84,
      "hen eggs in shell, fresh": 161.0,
      "kiwi fruit": 3750.0,
      "leeks and other alliaceous vegetables": 12106.64,
      "lettuce and chicory": 18035.5,
      "linseed": 1388.47,
      "maize (corn)": 4780.54,
      "meat of cattle with the bone, fresh or chilled": 159.6,
      "meat of chickens, fresh or chilled": 1765.0,
      "meat of ducks, fresh or chilled": 3492.25,
      "meat of goat, fresh or chilled": 11.8,
      "meat of pig with the bone, fresh or chilled": 68.2,
      "meat of sheep, fresh or chilled": 13.0,
      "oats": 2367.56,
      "onions and shallots, dry (excluding dehydrated)": 11994.06,
      "other beans, green": 7610.5,
      "other berries and fruits of the genus vaccinium n.e.c.": 1745.98,
      "other oil seeds, n.e.c.": 794.34,
      "other pome fruits": 4420.26,
      "other pulses n.e.c.": 1307.32,
      "other stone fruits": 2250.0,
      "other tropical fruits, n.e.c.": 6000.0,
      "other vegetables, fresh n.e.c.": 6947.02,
      "peaches and nectarines": 7998.4,
      "pears": 5436.32,
      "peas, dry": 1973.34,
      "peas, green": 3261.06,
      "plums and sloes": 6525.86,
      "potatoes": 17978.86,
      "pumpkins, squash and gourds": 11796.82,
      "rape or colza seed": 2522.98,
      "raspberries": 3476.06,
      "raw milk of buffalo": 1172.5,
      "raw milk of cattle": 3644.0,
      "raw milk of goats": 148.4,
      "raw milk of sheep": 74.0,
      "rice": 5475.76,
      "rye": 2035.28,
      "seed cotton, unginned": 697.2,
      "sorghum": 2639.14,
      "sour cherries": 3764.78,
      "soya beans": 1319.72,
      "spinach": 5404.76,
      "strawberries": 6667.62,
      "sunflower seed": 2131.62,
      "tomatoes": 37742.84,
      "triticale": 3218.08,
      "true hemp, raw or retted": 1852.45,
      "unmanufactured tobacco": 1642.06,
      "walnuts, in shell": 552.06,
      "watermelons": 22189.2,
      "wheat": 5403.36
    },
    "Cambodia": {
      "bananas": 4301.36,
      "beans, dry": 1253.06,
      "cassava, fresh": 23412.5,
      "castor oil seeds": 876.08,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 920.78,
      "coconuts, in shell": 5666.82,
      "coffee, green": 794.28,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 11800.62,
      "eggs from other birds in shell, fresh, n.e.c.": 2010.0,
      "groundnuts, excluding shelled": 1164.44,
      "hen eggs in shell, fresh": 1555.2,
      "jute, raw or retted": 895.22,
      "lemons and limes": 9974.26,
      "maize (corn)": 5804.64,
      "mangoes, guavas and mangosteens": 13533.68,
      "meat of buffalo, fresh or chilled": 144.6,
      "meat of cattle with the bone, fresh or chilled": 120.0,
      "meat of chickens, fresh or chilled": 1000.0,
      "meat of ducks, fresh or chilled": 1500.0,
      "meat of pig with the bone, fresh or chilled": 47.2,
      "natural rubber in primary forms": 1355.3,
      "oil palm fruit": 10623.24,
      "oranges": 5624.58,
      "other fibre crops, raw, n.e.c.": 4991.0,
      "other fruits, n.e.c.": 6108.08,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1711.06,
      "other oil seeds, n.e.c.": 2477.58,
      "other vegetables, fresh n.e.c.": 6364.84,
      "pepper (piper spp.), raw": 6679.7,
      "pineapples": 10477.24,
      "pomelos and grapefruits": 10400.72,
      "raw hides and skins of buffaloes": 28.8,
      "raw hides and skins of cattle": 28.0,
      "raw milk of cattle": 199.8,
      "rice": 3525.4,
      "seed cotton, unginned": 1289.44,
      "sesame seed": 770.5,
      "soya beans": 1497.66,
      "sugar cane": 34994.82,
      "sweet potatoes": 7143.44,
      "unmanufactured tobacco": 2254.84
    },
    "Cameroon": {
      "apricots": 5347.78,
      "avocados": 4500.16,
      "bambara beans, dry": 1204.9,
      "bananas": 14423.72,
      "beans, dry": 1274.84,
      "broad beans and horse beans, dry": 1414.6,
      "cabbages": 25943.02,
      "cantaloupes and other melons": 9766.24,
      "cassava, fresh": 13476.8,
      "chestnuts, in shell": 1005.52,
      "chicory roots": 20064.9,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 2664.86,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 2104.2,
      "cocoa beans": 501.52,
      "coconuts, in shell": 2998.14,
      "coffee, green": 529.96,
      "cow peas, dry": 484.14,
      "cucumbers and gherkins": 946.54,
      "dates": 3634.14,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 9066.8,
      "eggplants (aubergines)": 6881.04,
      "figs": 2759.88,
      "ginger, raw": 10034.02,
      "groundnuts, excluding shelled": 1110.16,
      "hazelnuts, in shell": 1118.54,
      "hen eggs in shell, fresh": 2886.4,
      "horse meat, fresh or chilled": 101.6,
      "jute, raw or retted": 365.28,
      "kola nuts": 451.82,
      "leeks and other alliaceous vegetables": 4991.8,
      "maize (corn)": 1782.86,
      "mangoes, guavas and mangosteens": 5917.66,
      "meat of cattle with the bone, fresh or chilled": 153.6,
      "meat of chickens, fresh or chilled": 1187.8,
      "meat of goat, fresh or chilled": 11.8,
      "meat of pig with the bone, fresh or chilled": 31.2,
      "meat of rabbits and hares, fresh or chilled": 1000.0,
      "meat of sheep, fresh or chilled": 14.0,
      "melonseed": 367.58,
      "millet": 1388.9,
      "natural rubber in primary forms": 819.8,
      "oil palm fruit": 12361.98,
      "okra": 2404.62,
      "onions and shallots, dry (excluding dehydrated)": 10162.54,
      "other beans, green": 5608.32,
      "other citrus fruit, n.e.c.": 11255.0,
      "other fruits, n.e.c.": 6365.04,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1000.8,
      "other oil seeds, n.e.c.": 1270.14,
      "other pulses n.e.c.": 1282.48,
      "other stone fruits": 4896.5,
      "other vegetables, fresh n.e.c.": 11317.6,
      "papayas": 15241.2,
      "peaches and nectarines": 6545.38,
      "pepper (piper spp.), raw": 351.04,
      "pineapples": 26288.44,
      "plantains and cooking bananas": 8889.48,
      "plums and sloes": 4908.46,
      "pomelos and grapefruits": 10994.88,
      "potatoes": 10623.54,
      "pumpkins, squash and gourds": 1169.6,
      "raw hides and skins of cattle": 22.4,
      "raw hides and skins of goats or kids": 1.0,
      "raw hides and skins of sheep or lambs": 2.4,
      "raw milk of cattle": 593.6,
      "raw milk of goats": 50.0,
      "raw milk of sheep": 20.8,
      "rice": 2140.04,
      "seed cotton, unginned": 2078.18,
      "sesame seed": 1215.66,
      "sorghum": 1583.94,
      "soya beans": 1704.96,
      "sugar cane": 58998.18,
      "sweet potatoes": 6715.46,
      "taro": 7843.68,
      "tea leaves": 10442.92,
      "tomatoes": 18643.72,
      "unmanufactured tobacco": 1519.46,
      "watermelons": 17046.92,
      "wheat": 1336.94,
      "yams": 7174.44
    },
    "Canada": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 846.8,
      "apples": 24255.26,
      "apricots": 7251.1,
      "asparagus": 4256.76,
      "barley": 3316.8,
      "beans, dry": 2576.6,
      "blueberries": 3718.86,
      "buckwheat": 1029.56,
      "cabbages": 27802.94,
      "canary seed": 1348.32,
      "cantaloupes and other melons": 28063.74,
      "carrots and turnips": 41776.56,
      "cauliflowers and broccoli": 12154.44,
      "cherries": 8324.6,
      "chick peas, dry": 1418.26,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 28397.28,
      "cranberries": 24911.8,
      "cucumbers and gherkins": 25569.78,
      "grapes": 8447.06,
      "green corn (maize)": 11864.14,
      "green garlic": 2201.06,
      "hempseed": 1185.48,
      "hen eggs in shell, fresh": 7281.0,
      "horse meat, fresh or chilled": 178.4,
      "kiwi fruit": 7112.32,
      "leeks and other alliaceous vegetables": 20467.14,
      "lentils, dry": 1332.46,
      "lettuce and chicory": 22149.48,
      "linseed": 1271.32,
      "maize (corn)": 10087.44,
      "meat of cattle with the bone, fresh or chilled": 378.8,
      "meat of chickens, fresh or chilled": 1743.6,
      "meat of ducks, fresh or chilled": 2249.6,
      "meat of geese, fresh or chilled": 5000.2,
      "meat of pig with the bone, fresh or chilled": 103.6,
      "meat of sheep, fresh or chilled": 22.8,
      "meat of turkeys, fresh or chilled": 8020.4,
      "mixed grain": 2522.72,
      "mustard seed": 749.8,
      "oats": 3235.94,
      "onions and shallots, dry (excluding dehydrated)": 45841.68,
      "other beans, green": 6384.02,
      "other fibre crops, raw, n.e.c.": 1295.62,
      "other oil seeds, n.e.c.": 323.52,
      "other vegetables, fresh n.e.c.": 24787.6,
      "peaches and nectarines": 9493.32,
      "pears": 11946.66,
      "peas, dry": 2254.62,
      "peas, green": 4494.94,
      "plums and sloes": 7267.56,
      "potatoes": 40173.0,
      "pumpkins, squash and gourds": 18747.46,
      "rape or colza seed": 2099.7,
      "raspberries": 4664.06,
      "raw hides and skins of cattle": 31.8,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of cattle": 10111.2,
      "rye": 3304.06,
      "sour cherries": 5077.9,
      "soya beans": 3117.82,
      "spinach": 9308.08,
      "strawberries": 8680.0,
      "sugar beet": 78348.06,
      "sunflower seed": 2196.1,
      "tomatoes": 85265.18,
      "triticale": 2387.96,
      "unmanufactured tobacco": 2836.2,
      "watermelons": 45648.2,
      "wheat": 3183.58
    },
    "Chile": {
      "almonds, in shell": 5261.44,
      "apples": 51016.94,
      "apricots": 9663.76,
      "artichokes": 7647.3,
      "asparagus": 5410.42,
      "avocados": 5482.0,
      "barley": 6428.88,
      "beans, dry": 1591.76,
      "blueberries": 6944.88,
      "broad beans and horse beans, green": 8084.48,
      "cabbages": 26640.76,
      "cantaloupes and other melons": 14293.14,
      "carrots and turnips": 40079.44,
      "cauliflowers and broccoli": 19814.54,
      "cherries": 7710.58,
      "chestnuts, in shell": 2407.14,
      "chick peas, dry": 474.34,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 36406.74,
      "cucumbers and gherkins": 21974.52,
      "currants": 5105.28,
      "figs": 1898.96,
      "flax, raw or retted": 1081.44,
      "grapes": 14527.2,
      "green corn (maize)": 15010.34,
      "green garlic": 9599.12,
      "hazelnuts, in shell": 1526.1,
      "hempseed": 664.4,
      "hen eggs in shell, fresh": 7386.2,
      "horse meat, fresh or chilled": 211.0,
      "kenaf, and other textile bast fibres, raw or retted": 848.42,
      "kiwi fruit": 22688.0,
      "lemons and limes": 27236.36,
      "lentils, dry": 467.72,
      "lettuce and chicory": 13834.36,
      "linseed": 531.2,
      "lupins": 2067.24,
      "maize (corn)": 10735.62,
      "meat of cattle with the bone, fresh or chilled": 258.4,
      "meat of chickens, fresh or chilled": 2360.0,
      "meat of goat, fresh or chilled": 18.6,
      "meat of pig with the bone, fresh or chilled": 105.6,
      "meat of sheep, fresh or chilled": 15.8,
      "meat of turkeys, fresh or chilled": 14007.2,
      "oats": 4857.34,
      "olives": 6447.86,
      "onions and shallots, dry (excluding dehydrated)": 48435.68,
      "oranges": 22216.26,
      "other beans, green": 7315.8,
      "other fibre crops, raw, n.e.c.": 4926.64,
      "other fruits, n.e.c.": 5282.02,
      "other vegetables, fresh n.e.c.": 21998.08,
      "papayas": 15884.94,
      "peaches and nectarines": 21899.22,
      "pears": 34545.44,
      "peas, dry": 1014.68,
      "peas, green": 7354.3,
      "persimmons": 5571.32,
      "plums and sloes": 27186.46,
      "pomelos and grapefruits": 4824.66,
      "potatoes": 29640.56,
      "pumpkins, squash and gourds": 22944.16,
      "quinces": 1658.12,
      "rape or colza seed": 3972.22,
      "raspberries": 4174.14,
      "raw hides and skins of cattle": 38.6,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of cattle": 4209.8,
      "raw milk of goats": 34.0,
      "rice": 6112.96,
      "rye": 4731.82,
      "sour cherries": 74185.76,
      "spinach": 17989.9,
      "strawberries": 26565.66,
      "sugar beet": 104947.76,
      "sunflower seed": 1092.26,
      "sweet potatoes": 10808.64,
      "tangerines, mandarins, clementines": 21414.2,
      "tomatoes": 68365.7,
      "triticale": 5420.44,
      "true hemp, raw or retted": 945.22,
      "unmanufactured tobacco": 2982.24,
      "walnuts, in shell": 3797.52,
      "watermelons": 15823.1,
      "wheat": 5966.1
    },
    "China": {
      "almonds, in shell": 4305.14,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 1297.78,
      "apples": 23807.84,
      "apricots": 3189.84,
      "areca nuts": 2454.8,
      "artichokes": 6790.1,
      "asparagus": 5443.3,
      "avocados": 9175.64,
      "bananas": 35780.12,
      "barley": 3655.04,
      "beans, dry": 1792.08,
      "broad beans and horse beans, dry": 2130.92,
      "broad beans and horse beans, green": 13923.86,
      "buckwheat": 807.88,
      "cabbages": 35853.86,
      "cantaloupes and other melons": 34811.6,
      "carrots and turnips": 44834.74,
      "cashew nuts, in shell": 1089.36,
      "cassava, fresh": 16408.78,
      "castor oil seeds": 1877.78,
      "cauliflowers and broccoli": 19389.68,
      "cereals n.e.c.": 2402.82,
      "cherries": 4180.52,
      "chestnuts, in shell": 5697.54,
      "chick peas, dry": 5523.56,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 6629.58,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 22540.0,
      "cinnamon and cinnamon-tree flowers, raw": 1903.74,
      "cloves (whole stems), raw": 1268.12,
      "coconuts, in shell": 10446.9,
      "coffee, green": 3331.1,
      "cow peas, dry": 985.46,
      "cucumbers and gherkins": 53528.76,
      "dates": 13108.26,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 15115.8,
      "eggplants (aubergines)": 43082.54,
      "figs": 5538.94,
      "ginger, raw": 10965.8,
      "grapes": 21498.72,
      "green corn (maize)": 9561.52,
      "green garlic": 25856.1,
      "groundnuts, excluding shelled": 3931.16,
      "hazelnuts, in shell": 2139.18,
      "hen eggs in shell, fresh": 3787.8,
      "hop cones": 2932.82,
      "horse meat, fresh or chilled": 205.6,
      "jute, raw or retted": 4189.52,
      "kenaf, and other textile bast fibres, raw or retted": 6001.72,
      "kiwi fruit": 12090.78,
      "leeks and other alliaceous vegetables": 25411.44,
      "lemons and limes": 22800.16,
      "lentils, dry": 2549.5,
      "lettuce and chicory": 23237.2,
      "linseed": 1297.22,
      "maize (corn)": 6433.62,
      "mangoes, guavas and mangosteens": 10147.76,
      "meat of asses, fresh or chilled": 90.6,
      "meat of buffalo, fresh or chilled": 149.2,
      "meat of camels, fresh or chilled": 248.8,
      "meat of cattle with the bone, fresh or chilled": 149.4,
      "meat of chickens, fresh or chilled": 1303.6,
      "meat of ducks, fresh or chilled": 1646.0,
      "meat of geese, fresh or chilled": 6334.0,
      "meat of goat, fresh or chilled": 16.8,
      "meat of mules, fresh or chilled": 117.2,
      "meat of pig with the bone, fresh or chilled": 79.4,
      "meat of pigeons and other birds n.e.c., fresh, chilled or frozen": 150.0,
      "meat of rabbits and hares, fresh or chilled": 1547.2,
      "meat of sheep, fresh or chilled": 13.2,
      "meat of turkeys, fresh or chilled": 15862.2,
      "melonseed": 1473.22,
      "millet": 3067.5,
      "mustard seed": 812.96,
      "natural rubber in primary forms": 1165.38,
      "oats": 3450.86,
      "oil palm fruit": 13213.8,
      "olives": 8315.76,
      "onions and shallots, dry (excluding dehydrated)": 22039.22,
      "onions and shallots, green": 36518.96,
      "oranges": 18177.16,
      "other beans, green": 27757.6,
      "other berries and fruits of the genus vaccinium n.e.c.": 11040.96,
      "other citrus fruit, n.e.c.": 31752.32,
      "other fibre crops, raw, n.e.c.": 10599.94,
      "other fruits, n.e.c.": 3446.36,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 6193.44,
      "other oil seeds, n.e.c.": 1324.4,
      "other pulses n.e.c.": 2622.84,
      "other stimulant, spice and aromatic crops, n.e.c.": 3291.2,
      "other stone fruits": 8695.28,
      "other tropical fruits, n.e.c.": 3835.78,
      "other vegetables, fresh n.e.c.": 16127.62,
      "papayas": 63760.34,
      "peaches and nectarines": 19441.58,
      "pears": 20737.02,
      "peas, dry": 1551.92,
      "peas, green": 8039.24,
      "pepper (piper spp.), raw": 1887.96,
      "persimmons": 3531.2,
      "pineapples": 31223.14,
      "pistachios, in shell": 2920.02,
      "plums and sloes": 3449.24,
      "pomelos and grapefruits": 46226.48,
      "potatoes": 20364.68,
      "pumpkins, squash and gourds": 18575.42,
      "quinces": 3546.08,
      "ramie, raw or retted": 1878.94,
      "rape or colza seed": 2109.48,
      "raw hides and skins of buffaloes": 43.2,
      "raw hides and skins of cattle": 33.2,
      "raw hides and skins of goats or kids": 3.2,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of buffalo": 499.6,
      "raw milk of camel": 189.4,
      "raw milk of cattle": 2638.4,
      "raw milk of goats": 186.0,
      "raw milk of sheep": 27.2,
      "rice": 7102.06,
      "rye": 3139.02,
      "safflower seed": 1458.18,
      "seed cotton, unginned": 6304.92,
      "sesame seed": 1578.88,
      "sisal, raw": 5390.6,
      "sorghum": 4678.5,
      "soya beans": 1980.3,
      "spinach": 41099.76,
      "strawberries": 26715.96,
      "string beans": 11643.84,
      "sugar beet": 57079.26,
      "sugar cane": 80853.34,
      "sunflower seed": 2927.54,
      "sweet potatoes": 22220.44,
      "tallowtree seeds": 2471.26,
      "tangerines, mandarins, clementines": 10852.06,
      "taro": 19415.96,
      "tea leaves": 4515.48,
      "tomatoes": 56126.7,
      "triticale": 1900.96,
      "true hemp, raw or retted": 5656.64,
      "tung nuts": 2617.66,
      "unmanufactured tobacco": 2123.82,
      "vanilla, raw": 157.8,
      "walnuts, in shell": 3934.26,
      "watermelons": 42219.14,
      "wheat": 5825.4
    },
    "Colombia": {
      "agave fibres, raw, n.e.c.": 764.94,
      "apples": 29319.82,
      "asparagus": 3718.46,
      "avocados": 10281.6,
      "bananas": 24219.6,
      "barley": 2438.4,
      "beans, dry": 1268.1,
      "broad beans and horse beans, dry": 4511.78,
      "broad beans and horse beans, green": 3851.04,
      "cabbages": 33657.94,
      "cantaloupes and other melons": 15124.62,
      "carrots and turnips": 28862.48,
      "cashew nuts, in shell": 6498.22,
      "cassava, fresh": 10546.38,
      "cauliflowers and broccoli": 19735.1,
      "cereals n.e.c.": 2114.2,
      "chick peas, dry": 909.78,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 12417.0,
      "cocoa beans": 334.96,
      "coconuts, in shell": 6529.32,
      "coffee, green": 850.96,
      "cucumbers and gherkins": 15753.12,
      "dates": 6300.0,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 13231.92,
      "eggplants (aubergines)": 11442.12,
      "figs": 23111.4,
      "grapes": 11328.42,
      "green garlic": 13364.68,
      "groundnuts, excluding shelled": 1585.08,
      "hen eggs in shell, fresh": 6114.4,
      "horse meat, fresh or chilled": 125.0,
      "lemons and limes": 12933.68,
      "lentils, dry": 289.74,
      "lettuce and chicory": 24016.86,
      "maize (corn)": 4111.54,
      "mangoes, guavas and mangosteens": 11014.7,
      "meat of buffalo, fresh or chilled": 223.8,
      "meat of cattle with the bone, fresh or chilled": 228.4,
      "meat of chickens, fresh or chilled": 1633.8,
      "meat of goat, fresh or chilled": 16.8,
      "meat of pig with the bone, fresh or chilled": 92.0,
      "meat of rabbits and hares, fresh or chilled": 1290.6,
      "meat of sheep, fresh or chilled": 16.0,
      "natural rubber in primary forms": 886.94,
      "oil palm fruit": 15931.58,
      "onions and shallots, dry (excluding dehydrated)": 24002.64,
      "oranges": 15755.4,
      "other citrus fruit, n.e.c.": 14988.3,
      "other fruits, n.e.c.": 11225.24,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 4498.84,
      "other stimulant, spice and aromatic crops, n.e.c.": 5917.6,
      "other tropical fruits, n.e.c.": 10005.64,
      "other vegetables, fresh n.e.c.": 10704.5,
      "papayas": 22443.26,
      "peaches and nectarines": 13582.5,
      "pears": 20816.78,
      "peas, dry": 1512.74,
      "pigeon peas, dry": 2167.26,
      "pineapples": 39366.18,
      "plantains and cooking bananas": 9017.92,
      "plums and sloes": 13462.16,
      "potatoes": 22076.76,
      "pumpkins, squash and gourds": 10853.12,
      "raw hides and skins of buffaloes": 37.8,
      "raw hides and skins of cattle": 27.6,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of cattle": 1999.4,
      "rice": 4549.44,
      "seed cotton, unginned": 2641.62,
      "sesame seed": 863.84,
      "sorghum": 2796.76,
      "soya beans": 2498.06,
      "spinach": 18156.6,
      "strawberries": 36405.58,
      "sugar beet": 26039.0,
      "sugar cane": 91375.28,
      "tangerines, mandarins, clementines": 14985.04,
      "tea leaves": 2490.9,
      "tomatoes": 50064.9,
      "unmanufactured tobacco": 2048.16,
      "watermelons": 17150.88,
      "wheat": 2790.9,
      "yams": 11869.66
    },
    "Costa Rica": {
      "abaca, manila hemp, raw": 1169.64,
      "artichokes": 4872.38,
      "asparagus": 4226.7,
      "avocados": 4949.86,
      "bananas": 55003.36,
      "beans, dry": 707.1,
      "cabbages": 34385.46,
      "cantaloupes and other melons": 25881.38,
      "carrots and turnips": 28499.68,
      "cassava, fresh": 10712.64,
      "cauliflowers and broccoli": 7128.0,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 3400.56,
      "cocoa beans": 128.92,
      "coconuts, in shell": 12989.5,
      "coffee, green": 914.64,
      "cucumbers and gherkins": 9050.38,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 7837.9,
      "eggplants (aubergines)": 5207.92,
      "ginger, raw": 11681.46,
      "groundnuts, excluding shelled": 1085.6,
      "hen eggs in shell, fresh": 8674.6,
      "leeks and other alliaceous vegetables": 9422.24,
      "lemons and limes": 21320.28,
      "lettuce and chicory": 2787.9,
      "maize (corn)": 1828.74,
      "mangoes, guavas and mangosteens": 7332.14,
      "meat of cattle with the bone, fresh or chilled": 230.2,
      "meat of chickens, fresh or chilled": 1727.0,
      "meat of goat, fresh or chilled": 12.0,
      "meat of pig with the bone, fresh or chilled": 75.4,
      "meat of sheep, fresh or chilled": 15.0,
      "oil palm fruit": 16150.54,
      "onions and shallots, dry (excluding dehydrated)": 30205.98,
      "onions and shallots, green": 6472.74,
      "oranges": 14357.32,
      "other beans, green": 994.36,
      "other berries and fruits of the genus vaccinium n.e.c.": 14600.84,
      "other fruits, n.e.c.": 6537.64,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 369.6,
      "other oil seeds, n.e.c.": 1548.5,
      "other tropical fruits, n.e.c.": 7621.56,
      "other vegetables, fresh n.e.c.": 15687.58,
      "papayas": 55274.92,
      "pepper (piper spp.), raw": 4123.44,
      "pineapples": 66495.16,
      "plantains and cooking bananas": 11184.44,
      "pomelos and grapefruits": 8188.96,
      "potatoes": 24880.62,
      "raw hides and skins of cattle": 38.0,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of cattle": 5883.0,
      "raw milk of goats": 252.6,
      "rice": 4424.46,
      "seed cotton, unginned": 793.62,
      "sesame seed": 591.64,
      "spinach": 5365.1,
      "strawberries": 30092.82,
      "sugar cane": 66947.08,
      "sweet potatoes": 2980.82,
      "tomatoes": 52380.14,
      "unmanufactured tobacco": 2221.78,
      "watermelons": 29224.9,
      "yams": 12232.28,
      "yautia": 10932.78
    },
    "Croatia": {
      "almonds, in shell": 339.56,
      "apples": 15120.94,
      "apricots": 1695.06,
      "asparagus": 3985.14,
      "barley": 4908.3,
      "blueberries": 1817.44,
      "broad beans and horse beans, dry": 1533.36,
      "broad beans and horse beans, green": 4308.33,
      "cabbages": 22540.98,
      "cantaloupes and other melons": 21751.94,
      "carrots and turnips": 29699.02,
      "cauliflowers and broccoli": 13566.22,
      "cereals n.e.c.": 1286.22,
      "cherries": 1191.58,
      "chestnuts, in shell": 211.34,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 15906.84,
      "cucumbers and gherkins": 71882.3,
      "eggplants (aubergines)": 19097.23,
      "figs": 1528.04,
      "grapes": 5331.36,
      "green corn (maize)": 34436.0,
      "green garlic": 6437.6,
      "hazelnuts, in shell": 341.28,
      "hen eggs in shell, fresh": 237.2,
      "leeks and other alliaceous vegetables": 16156.38,
      "lemons and limes": 6405.0,
      "lettuce and chicory": 20009.74,
      "maize (corn)": 7461.26,
      "meat of cattle with the bone, fresh or chilled": 258.0,
      "meat of chickens, fresh or chilled": 1518.2,
      "meat of goat, fresh or chilled": 11.0,
      "meat of pig with the bone, fresh or chilled": 73.0,
      "meat of sheep, fresh or chilled": 12.0,
      "oats": 3163.3,
      "olives": 1798.74,
      "onions and shallots, dry (excluding dehydrated)": 23519.02,
      "oranges": 12166.66,
      "other beans, green": 5867.02,
      "other berries and fruits of the genus vaccinium n.e.c.": 1517.26,
      "other oil seeds, n.e.c.": 911.22,
      "other pome fruits": 916.7,
      "other pulses n.e.c.": 1416.66,
      "other tropical fruits, n.e.c.": 4700.0,
      "other vegetables, fresh n.e.c.": 11695.88,
      "peaches and nectarines": 5017.62,
      "pears": 3433.42,
      "peas, dry": 2124.2,
      "peas, green": 8368.44,
      "plums and sloes": 2395.38,
      "potatoes": 16537.2,
      "pumpkins, squash and gourds": 16370.24,
      "rape or colza seed": 2734.88,
      "raspberries": 1937.6,
      "raw milk of cattle": 6136.2,
      "raw milk of goats": 110.2,
      "raw milk of sheep": 66.4,
      "rye": 3582.72,
      "sour cherries": 2790.82,
      "soya beans": 2626.1,
      "spinach": 7494.43,
      "strawberries": 9006.32,
      "sugar beet": 64725.48,
      "sunflower seed": 2940.98,
      "tangerines, mandarins, clementines": 19909.58,
      "tomatoes": 66567.28,
      "triticale": 4126.08,
      "unmanufactured tobacco": 2055.34,
      "walnuts, in shell": 45.3,
      "watermelons": 28129.82,
      "wheat": 5855.08
    },
    "Cyprus": {
      "almonds, in shell": 189.34,
      "apples": 7246.82,
      "apricots": 4514.24,
      "artichokes": 17920.0,
      "avocados": 6924.74,
      "bananas": 27116.78,
      "barley": 1901.74,
      "broad beans and horse beans, dry": 2900.0,
      "broad beans and horse beans, green": 13713.56,
      "cabbages": 33623.64,
      "cantaloupes and other melons": 41233.32,
      "carrots and turnips": 42786.66,
      "cauliflowers and broccoli": 19346.42,
      "cherries": 1731.05,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 26500.0,
      "cucumbers and gherkins": 39526.98,
      "eggplants (aubergines)": 41116.68,
      "figs": 6296.72,
      "grapes": 3590.12,
      "hazelnuts, in shell": 733.36,
      "hen eggs in shell, fresh": 198.0,
      "kiwi fruit": 13000.0,
      "lemons and limes": 12280.84,
      "lettuce and chicory": 14042.66,
      "meat of cattle with the bone, fresh or chilled": 281.2,
      "meat of chickens, fresh or chilled": 2000.2,
      "meat of goat, fresh or chilled": 20.0,
      "meat of pig with the bone, fresh or chilled": 73.2,
      "meat of sheep, fresh or chilled": 15.6,
      "meat of turkeys, fresh or chilled": 6317.0,
      "oats": 1452.3,
      "olives": 2031.66,
      "onions and shallots, dry (excluding dehydrated)": 31272.76,
      "oranges": 13456.54,
      "other beans, green": 26606.66,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 180.02,
      "other oil seeds, n.e.c.": 7733.34,
      "other pome fruits": 4400.0,
      "other pulses n.e.c.": 1161.62,
      "other stone fruits": 6240.0,
      "other tropical fruits, n.e.c.": 2560.56,
      "other vegetables, fresh n.e.c.": 15900.0,
      "peaches and nectarines": 6745.84,
      "pears": 6460.72,
      "peas, dry": 1683.34,
      "peas, green": 15506.68,
      "plums and sloes": 4006.94,
      "pomelos and grapefruits": 39900.6,
      "potatoes": 23538.36,
      "pumpkins, squash and gourds": 20980.76,
      "raw milk of cattle": 7680.0,
      "raw milk of goats": 212.8,
      "raw milk of sheep": 211.6,
      "spinach": 9778.98,
      "strawberries": 31160.0,
      "tangerines, mandarins, clementines": 18842.74,
      "tomatoes": 53808.26,
      "triticale": 2037.64,
      "walnuts, in shell": 740.16,
      "watermelons": 36704.12,
      "wheat": 2159.76
    },
    "Czech Republic": {
      "apples": 14707.26,
      "apricots": 1084.42,
      "asparagus": 2064.3,
      "barley": 5440.48,
      "blueberries": 10642.85,
      "broad beans and horse beans, dry": 2168.7,
      "broad beans and horse beans, green": 3000.0,
      "cabbages": 36821.64,
      "carrots and turnips": 40095.94,
      "cauliflowers and broccoli": 15940.66,
      "cereals n.e.c.": 1706.28,
      "cherries": 1363.38,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 41931.22,
      "cucumbers and gherkins": 61100.74,
      "currants": 1622.64,
      "grapes": 5148.68,
      "green garlic": 4169.52,
      "hen eggs in shell, fresh": 213.5,
      "hop cones": 1308.88,
      "horse meat, fresh or chilled": 240.6,
      "leeks and other alliaceous vegetables": 27803.34,
      "lettuce and chicory": 24248.14,
      "linseed": 1247.58,
      "lupins": 1293.14,
      "maize (corn)": 8616.74,
      "meat of cattle with the bone, fresh or chilled": 308.0,
      "meat of chickens, fresh or chilled": 1358.6,
      "meat of goat, fresh or chilled": 8.8,
      "meat of pig with the bone, fresh or chilled": 92.8,
      "meat of sheep, fresh or chilled": 23.4,
      "meat of turkeys, fresh or chilled": 10010.4,
      "mixed grain": 2083.96,
      "oats": 3517.76,
      "onions and shallots, dry (excluding dehydrated)": 27594.86,
      "other berries and fruits of the genus vaccinium n.e.c.": 557.7,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1500.0,
      "other oil seeds, n.e.c.": 744.98,
      "other pome fruits": 1500.0,
      "other pulses n.e.c.": 1335.36,
      "other vegetables, fresh n.e.c.": 6688.3,
      "peaches and nectarines": 1228.06,
      "pears": 9639.44,
      "peas, dry": 2413.34,
      "peas, green": 3049.94,
      "plums and sloes": 3718.06,
      "potatoes": 29004.4,
      "pumpkins, squash and gourds": 24500.15,
      "rape or colza seed": 3194.3,
      "raspberries": 2600.0,
      "raw milk of cattle": 9447.8,
      "rye": 5049.24,
      "sour cherries": 3292.38,
      "soya beans": 2447.28,
      "spinach": 11392.82,
      "strawberries": 3992.12,
      "sugar beet": 66721.54,
      "sunflower seed": 2625.94,
      "tomatoes": 117689.76,
      "triticale": 4869.92,
      "true hemp, raw or retted": 790.94,
      "walnuts, in shell": 907.96,
      "watermelons": 42125.0,
      "wheat": 6184.96
    },
    "Denmark": {
      "apples": 17373.68,
      "asparagus": 1538.56,
      "barley": 5733.96,
      "blueberries": 1331.44,
      "broad beans and horse beans, dry": 3832.44,
      "cabbages": 28031.48,
      "carrots and turnips": 38086.76,
      "cauliflowers and broccoli": 9381.92,
      "cherries": 3902.86,
      "cucumbers and gherkins": 291726.66,
      "currants": 3029.52,
      "hen eggs in shell, fresh": 6194.5,
      "leeks and other alliaceous vegetables": 14219.46,
      "lettuce and chicory": 17392.24,
      "maize (corn)": 6575.04,
      "meat of cattle with the bone, fresh or chilled": 268.0,
      "meat of chickens, fresh or chilled": 1568.6,
      "meat of ducks, fresh or chilled": 3189.0,
      "meat of pig with the bone, fresh or chilled": 91.4,
      "meat of sheep, fresh or chilled": 19.0,
      "meat of turkeys, fresh or chilled": 6413.0,
      "mixed grain": 3396.34,
      "oats": 4981.14,
      "onions and shallots, dry (excluding dehydrated)": 38025.1,
      "other berries and fruits of the genus vaccinium n.e.c.": 1637.3,
      "pears": 22996.3,
      "peas, dry": 3560.34,
      "peas, green": 3489.82,
      "plums and sloes": 4035.34,
      "potatoes": 44285.0,
      "pumpkins, squash and gourds": 17071.16,
      "rape or colza seed": 4018.14,
      "raspberries": 6727.28,
      "raw milk of cattle": 10239.0,
      "rye": 5991.14,
      "sour cherries": 3989.3,
      "spinach": 3862.3,
      "strawberries": 6653.5,
      "sugar beet": 75153.14,
      "tomatoes": 364533.36,
      "triticale": 6472.42,
      "wheat": 7662.7
    },
    "Ecuador": {
      "abaca, manila hemp, raw": 1305.22,
      "agave fibres, raw, n.e.c.": 1354.48,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 399.3,
      "apples": 5301.48,
      "apricots": 5031.92,
      "asparagus": 2995.0,
      "avocados": 5664.16,
      "bananas": 38668.48,
      "barley": 1450.64,
      "beans, dry": 666.64,
      "broad beans and horse beans, dry": 751.14,
      "broad beans and horse beans, green": 4059.34,
      "cabbages": 6019.48,
      "cantaloupes and other melons": 10588.72,
      "carrots and turnips": 6291.7,
      "cassava, fresh": 6329.8,
      "castor oil seeds": 1627.72,
      "cauliflowers and broccoli": 16913.9,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 3528.4,
      "cocoa beans": 662.46,
      "coconuts, in shell": 5668.76,
      "coffee, green": 234.78,
      "cucumbers and gherkins": 8171.56,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 2525.88,
      "figs": 1161.42,
      "grapes": 6951.72,
      "green garlic": 1498.86,
      "groundnuts, excluding shelled": 1339.8,
      "hen eggs in shell, fresh": 4147.8,
      "lemons and limes": 5896.48,
      "lentils, dry": 749.46,
      "lettuce and chicory": 7349.7,
      "linseed": 332.22,
      "lupins": 391.66,
      "maize (corn)": 4351.36,
      "mangoes, guavas and mangosteens": 6573.88,
      "meat of cattle with the bone, fresh or chilled": 208.4,
      "meat of chickens, fresh or chilled": 2100.0,
      "meat of ducks, fresh or chilled": 1300.0,
      "meat of geese, fresh or chilled": 1493.0,
      "meat of goat, fresh or chilled": 30.8,
      "meat of pig with the bone, fresh or chilled": 91.2,
      "meat of rabbits and hares, fresh or chilled": 1400.0,
      "meat of sheep, fresh or chilled": 14.0,
      "meat of turkeys, fresh or chilled": 1539.4,
      "natural rubber in primary forms": 1530.76,
      "oats": 749.8,
      "oil palm fruit": 15367.6,
      "onions and shallots, dry (excluding dehydrated)": 3636.52,
      "onions and shallots, green": 8818.14,
      "oranges": 10584.8,
      "other beans, green": 2152.16,
      "other berries and fruits of the genus vaccinium n.e.c.": 1830.86,
      "other citrus fruit, n.e.c.": 2370.54,
      "other fruits, n.e.c.": 11373.48,
      "other stimulant, spice and aromatic crops, n.e.c.": 924.34,
      "other tropical fruits, n.e.c.": 7111.04,
      "other vegetables, fresh n.e.c.": 5003.34,
      "papayas": 12881.28,
      "peaches and nectarines": 3356.8,
      "pears": 3043.62,
      "peas, dry": 534.74,
      "peas, green": 2917.26,
      "pepper (piper spp.), raw": 1982.8,
      "pineapples": 54232.48,
      "plantains and cooking bananas": 7007.12,
      "plums and sloes": 7671.52,
      "pomelos and grapefruits": 10995.52,
      "potatoes": 14795.28,
      "pumpkins, squash and gourds": 3660.46,
      "pyrethrum, dried flowers": 518.14,
      "quinoa": 968.82,
      "raw hides and skins of cattle": 36.2,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 1.0,
      "raw milk of cattle": 2496.6,
      "raw milk of goats": 50.0,
      "raw milk of sheep": 38.6,
      "rice": 3677.78,
      "rye": 629.14,
      "seed cotton, unginned": 1287.42,
      "sesame seed": 804.68,
      "sorghum": 1707.52,
      "soya beans": 1322.96,
      "strawberries": 14438.96,
      "sugar beet": 6373.18,
      "sugar cane": 80264.48,
      "sunflower seed": 1788.54,
      "sweet potatoes": 2003.76,
      "tangerines, mandarins, clementines": 3955.98,
      "tea leaves": 9313.84,
      "tomatoes": 30488.4,
      "unmanufactured tobacco": 1269.94,
      "watermelons": 15104.56,
      "wheat": 1812.72
    },
    "Egypt": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 889.3,
      "apples": 25552.16,
      "apricots": 15101.62,
      "artichokes": 25532.96,
      "avocados": 5006.62,
      "bananas": 40783.96,
      "barley": 4009.6,
      "beans, dry": 3654.66,
      "broad beans and horse beans, dry": 4037.72,
      "broad beans and horse beans, green": 12841.5,
      "cabbages": 28810.16,
      "cantaloupes and other melons": 26332.14,
      "carrots and turnips": 27972.6,
      "cauliflowers and broccoli": 26863.34,
      "chick peas, dry": 2974.96,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 3708.72,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 18341.56,
      "cow peas, dry": 3729.92,
      "cucumbers and gherkins": 24176.36,
      "dates": 25936.06,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 4679.36,
      "eggplants (aubergines)": 29919.76,
      "figs": 7233.28,
      "flax, raw or retted": 898.26,
      "grapes": 19990.08,
      "green garlic": 24186.56,
      "groundnuts, excluding shelled": 3595.14,
      "hen eggs in shell, fresh": 5969.0,
      "jute, raw or retted": 2548.52,
      "lemons and limes": 20630.44,
      "lentils, dry": 2448.7,
      "lettuce and chicory": 20332.42,
      "linseed": 1843.9,
      "lupins": 1974.0,
      "maize (corn)": 7664.28,
      "mangoes, guavas and mangosteens": 10257.42,
      "meat of buffalo, fresh or chilled": 327.6,
      "meat of camels, fresh or chilled": 236.2,
      "meat of cattle with the bone, fresh or chilled": 300.4,
      "meat of chickens, fresh or chilled": 1332.2,
      "meat of ducks, fresh or chilled": 2582.0,
      "meat of geese, fresh or chilled": 3132.0,
      "meat of goat, fresh or chilled": 25.0,
      "meat of pig with the bone, fresh or chilled": 25.0,
      "meat of pigeons and other birds n.e.c., fresh, chilled or frozen": 270.4,
      "meat of rabbits and hares, fresh or chilled": 1216.2,
      "meat of sheep, fresh or chilled": 40.0,
      "meat of turkeys, fresh or chilled": 9480.4,
      "okra": 14162.52,
      "olives": 9851.62,
      "onions and shallots, dry (excluding dehydrated)": 35610.76,
      "oranges": 22900.34,
      "other beans, green": 10557.38,
      "other citrus fruit, n.e.c.": 13178.34,
      "other fruits, n.e.c.": 21185.04,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 2484.5,
      "other pulses n.e.c.": 2228.12,
      "other stone fruits": 7641.48,
      "other tropical fruits, n.e.c.": 7875.24,
      "other vegetables, fresh n.e.c.": 5881.18,
      "papayas": 7303.0,
      "peaches and nectarines": 17823.24,
      "pears": 13869.5,
      "peas, dry": 2795.88,
      "peas, green": 8615.98,
      "plums and sloes": 13988.74,
      "pomelos and grapefruits": 15016.02,
      "potatoes": 29041.44,
      "pumpkins, squash and gourds": 20443.98,
      "quinces": 7115.24,
      "raw hides and skins of buffaloes": 36.8,
      "raw hides and skins of cattle": 31.6,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 5.0,
      "raw milk of buffalo": 1761.8,
      "raw milk of cattle": 2918.8,
      "raw milk of goats": 19.8,
      "raw milk of sheep": 28.4,
      "rice": 9189.4,
      "rye": 1998.3,
      "seed cotton, unginned": 2805.72,
      "sesame seed": 1207.88,
      "sorghum": 5116.78,
      "soya beans": 3006.72,
      "spinach": 16265.12,
      "strawberries": 36911.14,
      "string beans": 6907.28,
      "sugar beet": 55081.2,
      "sugar cane": 101880.64,
      "sunflower seed": 2808.62,
      "sweet potatoes": 34487.9,
      "tangerines, mandarins, clementines": 22567.6,
      "taro": 34834.38,
      "tomatoes": 41887.12,
      "vetches": 3022.0,
      "walnuts, in shell": 5202.26,
      "watermelons": 32059.14,
      "wheat": 6694.06
    },
    "Ethiopia": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 800.02,
      "avocados": 7083.64,
      "bananas": 12382.6,
      "barley": 2254.78,
      "beans, dry": 1519.24,
      "broad beans and horse beans, dry": 2191.14,
      "broad beans and horse beans, green": 7358.68,
      "cabbages": 9911.92,
      "carrots and turnips": 3955.06,
      "castor oil seeds": 1775.12,
      "cereals n.e.c.": 1838.44,
      "chick peas, dry": 2053.54,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 1664.36,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 2128.8,
      "coffee, green": 669.38,
      "cucumbers and gherkins": 21978.62,
      "ginger, raw": 2724.94,
      "grapes": 1984.42,
      "green garlic": 6348.64,
      "groundnuts, excluding shelled": 1584.18,
      "hen eggs in shell, fresh": 1939.4,
      "hop cones": 1261.52,
      "kenaf, and other textile bast fibres, raw or retted": 257.06,
      "leeks and other alliaceous vegetables": 6072.08,
      "lemons and limes": 4343.46,
      "lentils, dry": 1253.6,
      "lettuce and chicory": 10069.62,
      "linseed": 991.42,
      "maize (corn)": 3497.1,
      "mangoes, guavas and mangosteens": 5428.6,
      "meat of camels, fresh or chilled": 203.4,
      "meat of cattle with the bone, fresh or chilled": 108.8,
      "meat of chickens, fresh or chilled": 800.0,
      "meat of goat, fresh or chilled": 8.0,
      "meat of pig with the bone, fresh or chilled": 59.6,
      "meat of sheep, fresh or chilled": 10.0,
      "millet": 2503.42,
      "mustard seed": 623.7,
      "nutmeg, mace, cardamoms, raw": 398.14,
      "oats": 1843.0,
      "onions and shallots, dry (excluding dehydrated)": 7869.96,
      "onions and shallots, green": 12559.04,
      "oranges": 8686.06,
      "other beans, green": 4048.36,
      "other citrus fruit, n.e.c.": 7243.1,
      "other fibre crops, raw, n.e.c.": 65.48,
      "other fruits, n.e.c.": 8922.24,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1075.12,
      "other oil seeds, n.e.c.": 1212.9,
      "other pulses n.e.c.": 1266.82,
      "other stimulant, spice and aromatic crops, n.e.c.": 918.28,
      "other tropical fruits, n.e.c.": 7414.24,
      "other vegetables, fresh n.e.c.": 2762.96,
      "papayas": 12850.42,
      "peaches and nectarines": 5777.66,
      "peas, dry": 1693.0,
      "peas, green": 6115.84,
      "pepper (piper spp.), raw": 635.74,
      "pineapples": 2016.64,
      "potatoes": 12666.14,
      "rape or colza seed": 1473.5,
      "raw hides and skins of cattle": 16.0,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 2.0,
      "raw milk of camel": 866.8,
      "raw milk of cattle": 275.6,
      "raw milk of goats": 34.8,
      "raw milk of sheep": 18.6,
      "rice": 3024.06,
      "safflower seed": 1196.46,
      "seed cotton, unginned": 2093.52,
      "sesame seed": 743.4,
      "sisal, raw": 722.08,
      "sorghum": 2633.64,
      "soya beans": 2510.24,
      "sugar cane": 43136.86,
      "sunflower seed": 1100.84,
      "sweet potatoes": 25956.52,
      "tangerines, mandarins, clementines": 3015.36,
      "taro": 24926.0,
      "tea leaves": 10751.86,
      "tomatoes": 8437.1,
      "unmanufactured tobacco": 673.28,
      "vetches": 2120.58,
      "wheat": 2904.48,
      "yams": 7906.56
    },
    "Fiji": {
      "avocados": 10495.36,
      "bananas": 15200.0,
      "cabbages": 14859.2,
      "cantaloupes and other melons": 12050.82,
      "cassava, fresh": 18365.1,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 12081.88,
      "cocoa beans": 2100.0,
      "coconuts, in shell": 5961.04,
      "coffee, green": 638.66,
      "cucumbers and gherkins": 14387.88,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 2985.76,
      "eggplants (aubergines)": 20459.46,
      "ginger, raw": 25076.8,
      "groundnuts, excluding shelled": 846.52,
      "hen eggs in shell, fresh": 6172.4,
      "maize (corn)": 4135.58,
      "mangoes, guavas and mangosteens": 9332.98,
      "meat of cattle with the bone, fresh or chilled": 204.6,
      "meat of chickens, fresh or chilled": 2751.8,
      "meat of ducks, fresh or chilled": 1626.0,
      "meat of goat, fresh or chilled": 9.0,
      "meat of pig with the bone, fresh or chilled": 45.6,
      "meat of sheep, fresh or chilled": 41.8,
      "meat of turkeys, fresh or chilled": 1500.0,
      "okra": 10440.0,
      "oranges": 19834.24,
      "other fruits, n.e.c.": 3358.36,
      "other pulses n.e.c.": 3219.92,
      "other tropical fruits, n.e.c.": 3726.88,
      "other vegetables, fresh n.e.c.": 7797.58,
      "papayas": 11400.0,
      "pepper (piper spp.), raw": 79.24,
      "pineapples": 20800.0,
      "plantains and cooking bananas": 30799.8,
      "pumpkins, squash and gourds": 6652.46,
      "raw hides and skins of cattle": 30.0,
      "raw hides and skins of goats or kids": 1.6,
      "raw hides and skins of sheep or lambs": 7.6,
      "raw milk of cattle": 349.4,
      "rice": 3741.02,
      "sorghum": 3494.36,
      "sugar cane": 43381.12,
      "sweet potatoes": 8240.0,
      "taro": 16880.0,
      "tomatoes": 10040.0,
      "unmanufactured tobacco": 657.7,
      "watermelons": 13006.48,
      "yams": 19600.0
    },
    "Finland": {
      "apples": 12221.52,
      "asparagus": 950.0,
      "barley": 3390.88,
      "blueberries": 1817.68,
      "broad beans and horse beans, dry": 1778.28,
      "cabbages": 37129.52,
      "carrots and turnips": 44280.14,
      "cauliflowers and broccoli": 7204.16,
      "cereals n.e.c.": 799.7,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 121500.0,
      "cucumbers and gherkins": 255953.02,
      "currants": 997.02,
      "green garlic": 1426.18,
      "hen eggs in shell, fresh": 7935.0,
      "horse meat, fresh or chilled": 286.6,
      "leeks and other alliaceous vegetables": 20199.98,
      "lettuce and chicory": 26158.56,
      "linseed": 887.9,
      "meat of cattle with the bone, fresh or chilled": 327.6,
      "meat of chickens, fresh or chilled": 1719.6,
      "meat of goat, fresh or chilled": 14.0,
      "meat of pig with the bone, fresh or chilled": 91.8,
      "meat of sheep, fresh or chilled": 20.8,
      "meat of turkeys, fresh or chilled": 9888.2,
      "mixed grain": 2677.32,
      "oats": 3446.76,
      "onions and shallots, dry (excluding dehydrated)": 24576.06,
      "other beans, green": 1493.32,
      "other berries and fruits of the genus vaccinium n.e.c.": 552.1,
      "other oil seeds, n.e.c.": 659.43,
      "other stone fruits": 791.65,
      "pears": 8173.34,
      "peas, dry": 2614.2,
      "peas, green": 1675.88,
      "potatoes": 29413.26,
      "pumpkins, squash and gourds": 24626.42,
      "rape or colza seed": 1301.34,
      "raspberries": 4026.94,
      "raw milk of cattle": 9433.4,
      "rye": 3430.1,
      "spinach": 13901.92,
      "strawberries": 3791.42,
      "sugar beet": 40643.92,
      "tomatoes": 409847.24,
      "triticale": 3950.4,
      "wheat": 3467.48
    },
    "France": {
      "almonds, in shell": 942.02,
      "apples": 33496.88,
      "apricots": 8460.1,
      "artichokes": 5554.26,
      "asparagus": 3999.22,
      "avocados": 8186.62,
      "bananas": 19519.62,
      "barley": 5966.04,
      "blueberries": 3642.34,
      "broad beans and horse beans, dry": 2399.78,
      "broad beans and horse beans, green": 5368.88,
      "cabbages": 23248.8,
      "cantaloupes and other melons": 21909.06,
      "carrots and turnips": 41916.96,
      "cauliflowers and broccoli": 14487.6,
      "cereals n.e.c.": 3225.02,
      "cherries": 4186.7,
      "chestnuts, in shell": 1036.24,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 20440.68,
      "cucumbers and gherkins": 107871.64,
      "currants": 4031.1,
      "eggplants (aubergines)": 31400.7,
      "figs": 8415.82,
      "flax, raw or retted": 5397.66,
      "grapes": 7446.4,
      "green corn (maize)": 20087.02,
      "green garlic": 6512.02,
      "hazelnuts, in shell": 1572.34,
      "hen eggs in shell, fresh": 249.75,
      "hop cones": 1552.7,
      "kiwi fruit": 12334.84,
      "leeks and other alliaceous vegetables": 30510.42,
      "lemons and limes": 8367.64,
      "lettuce and chicory": 26546.34,
      "linseed": 1841.82,
      "lupins": 2172.5,
      "maize (corn)": 8856.58,
      "meat of cattle with the bone, fresh or chilled": 321.4,
      "meat of chickens, fresh or chilled": 1527.2,
      "meat of ducks, fresh or chilled": 3128.0,
      "meat of geese, fresh or chilled": 4348.0,
      "meat of goat, fresh or chilled": 9.4,
      "meat of pig with the bone, fresh or chilled": 94.6,
      "meat of rabbits and hares, fresh or chilled": 1463.4,
      "meat of sheep, fresh or chilled": 19.4,
      "meat of turkeys, fresh or chilled": 8375.4,
      "mixed grain": 3810.3,
      "oats": 4094.54,
      "olives": 1611.02,
      "onions and shallots, dry (excluding dehydrated)": 35889.72,
      "oranges": 10779.88,
      "other beans, green": 12012.32,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 289.4,
      "other oil seeds, n.e.c.": 1583.02,
      "other pulses n.e.c.": 2154.62,
      "other tropical fruits, n.e.c.": 11384.6,
      "other vegetables, fresh n.e.c.": 17710.52,
      "peaches and nectarines": 19290.64,
      "pears": 21379.2,
      "peas, dry": 2943.9,
      "peas, green": 6440.56,
      "plums and sloes": 10528.92,
      "pomelos and grapefruits": 23980.52,
      "potatoes": 41194.9,
      "pumpkins, squash and gourds": 29707.48,
      "rape or colza seed": 3230.0,
      "raspberries": 9164.3,
      "raw milk of cattle": 7586.4,
      "raw milk of goats": 619.2,
      "raw milk of sheep": 226.6,
      "rice": 5381.14,
      "rye": 4092.94,
      "sorghum": 4905.04,
      "sour cherries": 3152.92,
      "soya beans": 2426.54,
      "spinach": 18454.58,
      "strawberries": 19411.22,
      "sugar beet": 76882.9,
      "sunflower seed": 2269.14,
      "tangerines, mandarins, clementines": 20288.62,
      "tomatoes": 115031.46,
      "triticale": 4760.3,
      "true hemp, raw or retted": 6472.18,
      "unmanufactured tobacco": 2552.42,
      "walnuts, in shell": 1370.66,
      "watermelons": 26150.34,
      "wheat": 6755.56
    },
    "Georgia": {
      "almonds, in shell": 1011.46,
      "apples": 2935.98,
      "apricots": 989.12,
      "barley": 2106.72,
      "beans, dry": 1244.74,
      "buckwheat": 1082.78,
      "cabbages": 27727.62,
      "cantaloupes and other melons": 14560.32,
      "carrots and turnips": 5380.92,
      "cereals n.e.c.": 3562.16,
      "cherries": 2979.6,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 8518.4,
      "cucumbers and gherkins": 21304.76,
      "eggplants (aubergines)": 2894.74,
      "grapes": 5893.2,
      "green garlic": 3671.42,
      "groundnuts, excluding shelled": 957.06,
      "hazelnuts, in shell": 1819.42,
      "hen eggs in shell, fresh": 6246.6,
      "horse meat, fresh or chilled": 81.4,
      "kiwi fruit": 22760.28,
      "lemons and limes": 2875.8,
      "maize (corn)": 2793.88,
      "meat of cattle with the bone, fresh or chilled": 87.6,
      "meat of chickens, fresh or chilled": 1632.6,
      "meat of ducks, fresh or chilled": 1754.0,
      "meat of pig with the bone, fresh or chilled": 59.0,
      "meat of rabbits and hares, fresh or chilled": 1001.8,
      "meat of sheep, fresh or chilled": 28.8,
      "meat of turkeys, fresh or chilled": 12406.6,
      "oats": 1702.14,
      "onions and shallots, dry (excluding dehydrated)": 7690.32,
      "oranges": 3142.34,
      "other berries and fruits of the genus vaccinium n.e.c.": 1589.3,
      "other fruits, n.e.c.": 4448.5,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 3286.16,
      "other stimulant, spice and aromatic crops, n.e.c.": 2304.5,
      "other stone fruits": 3446.98,
      "other vegetables, fresh n.e.c.": 5075.38,
      "peaches and nectarines": 4948.18,
      "pears": 5343.04,
      "peas, dry": 978.84,
      "plums and sloes": 2885.58,
      "potatoes": 13539.24,
      "pumpkins, squash and gourds": 25349.12,
      "quinces": 5609.08,
      "raspberries": 7047.16,
      "raw hides and skins of cattle": 12.8,
      "raw hides and skins of sheep or lambs": 6.0,
      "raw milk of cattle": 1330.0,
      "raw milk of goats": 96.6,
      "raw milk of sheep": 51.0,
      "rye": 1202.94,
      "soya beans": 3000.0,
      "strawberries": 9545.74,
      "sunflower seed": 809.86,
      "tangerines, mandarins, clementines": 3243.16,
      "tea leaves": 1046.46,
      "tomatoes": 16885.42,
      "unmanufactured tobacco": 174.22,
      "walnuts, in shell": 1426.32,
      "watermelons": 31524.12,
      "wheat": 2648.98
    },
    "Germany": {
      "apples": 29357.96,
      "asparagus": 5350.08,
      "barley": 6703.54,
      "blueberries": 4267.3,
      "broad beans and horse beans, dry": 3691.26,
      "broad beans and horse beans, green": 5987.08,
      "cabbages": 54687.6,
      "carrots and turnips": 60148.0,
      "cauliflowers and broccoli": 21492.82,
      "cherries": 5588.72,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 140022.08,
      "cucumbers and gherkins": 112842.42,
      "currants": 5770.08,
      "grapes": 11403.28,
      "hen eggs in shell, fresh": 6870.8,
      "hop cones": 2107.36,
      "horse meat, fresh or chilled": 425.0,
      "leeks and other alliaceous vegetables": 38563.56,
      "lettuce and chicory": 31172.44,
      "lupins": 1805.06,
      "maize (corn)": 9609.98,
      "meat of cattle with the bone, fresh or chilled": 332.2,
      "meat of chickens, fresh or chilled": 1726.4,
      "meat of ducks, fresh or chilled": 2216.6,
      "meat of geese, fresh or chilled": 7353.6,
      "meat of goat, fresh or chilled": 18.0,
      "meat of pig with the bone, fresh or chilled": 95.6,
      "meat of sheep, fresh or chilled": 21.0,
      "meat of turkeys, fresh or chilled": 13451.0,
      "mixed grain": 3605.34,
      "oats": 4266.66,
      "onions and shallots, dry (excluding dehydrated)": 42160.14,
      "other beans, green": 10660.98,
      "other berries and fruits of the genus vaccinium n.e.c.": 2352.88,
      "other vegetables, fresh n.e.c.": 10548.24,
      "pears": 18067.64,
      "peas, dry": 2968.08,
      "peas, green": 5440.78,
      "plums and sloes": 10246.52,
      "potatoes": 43119.46,
      "pumpkins, squash and gourds": 23230.32,
      "rape or colza seed": 3609.66,
      "raspberries": 7495.04,
      "raw milk of cattle": 8802.6,
      "raw milk of sheep": 523.0,
      "rye": 5187.56,
      "sour cherries": 5933.04,
      "soya beans": 2853.62,
      "spinach": 19642.5,
      "strawberries": 11280.62,
      "sugar beet": 78140.34,
      "sunflower seed": 2324.54,
      "tomatoes": 268438.32,
      "triticale": 5859.48,
      "wheat": 7442.86
    },
    "Ghana": {
      "avocados": 4518.42,
      "bananas": 11894.04,
      "beans, dry": 1333.02,
      "cashew nuts, in shell": 534.08,
      "cassava, fresh": 24420.82,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 7465.36,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 8531.22,
      "cocoa beans": 558.7,
      "coconuts, in shell": 6677.08,
      "coffee, green": 1600.0,
      "cow peas, dry": 1640.14,
      "cucumbers and gherkins": 13973.28,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 5164.42,
      "eggplants (aubergines)": 8283.56,
      "ginger, raw": 1146.42,
      "groundnuts, excluding shelled": 1714.98,
      "hen eggs in shell, fresh": 1103.6,
      "karite nuts (sheanuts)": 1049.6,
      "kola nuts": 284.3,
      "lemons and limes": 6740.7,
      "maize (corn)": 2628.48,
      "mangoes, guavas and mangosteens": 14237.24,
      "meat of cattle with the bone, fresh or chilled": 103.2,
      "meat of chickens, fresh or chilled": 773.2,
      "meat of goat, fresh or chilled": 17.4,
      "meat of pig with the bone, fresh or chilled": 43.0,
      "meat of sheep, fresh or chilled": 22.0,
      "millet": 1532.56,
      "natural rubber in primary forms": 880.14,
      "oats": 880.9,
      "oil palm fruit": 7193.6,
      "okra": 21472.56,
      "onions and shallots, dry (excluding dehydrated)": 18415.04,
      "oranges": 40020.02,
      "other beans, green": 9842.86,
      "other fruits, n.e.c.": 4676.06,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 145.2,
      "other oil seeds, n.e.c.": 1170.58,
      "other pulses n.e.c.": 93.32,
      "other vegetables, fresh n.e.c.": 9893.18,
      "papayas": 3489.8,
      "pepper (piper spp.), raw": 687.58,
      "pineapples": 64529.54,
      "plantains and cooking bananas": 11132.04,
      "raw hides and skins of cattle": 13.0,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of cattle": 130.2,
      "rice": 3359.9,
      "seed cotton, unginned": 1858.66,
      "sorghum": 1220.74,
      "soya beans": 1828.0,
      "sugar cane": 24370.32,
      "sweet potatoes": 1811.7,
      "taro": 7328.54,
      "tomatoes": 7875.04,
      "unmanufactured tobacco": 411.28,
      "yams": 18443.68
    },
    "Greece": {
      "almonds, in shell": 1707.62,
      "apples": 25999.18,
      "apricots": 10699.84,
      "artichokes": 13038.28,
      "asparagus": 6058.3,
      "avocados": 7651.82,
      "bananas": 21002.56,
      "barley": 2849.72,
      "broad beans and horse beans, dry": 2819.16,
      "broad beans and horse beans, green": 9337.74,
      "cabbages": 25619.06,
      "cantaloupes and other melons": 21558.56,
      "carrots and turnips": 24863.44,
      "cauliflowers and broccoli": 18195.46,
      "cereals n.e.c.": 2089.88,
      "cherries": 5804.52,
      "chestnuts, in shell": 3559.74,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 44443.64,
      "cucumbers and gherkins": 71287.04,
      "currants": 2233.42,
      "eggplants (aubergines)": 45938.22,
      "figs": 6097.6,
      "grapes": 8627.86,
      "green garlic": 9145.42,
      "hazelnuts, in shell": 3641.92,
      "hen eggs in shell, fresh": 185.25,
      "kiwi fruit": 24552.96,
      "leeks and other alliaceous vegetables": 22505.06,
      "lemons and limes": 25419.76,
      "lettuce and chicory": 19002.12,
      "linseed": 3266.66,
      "lupins": 1269.58,
      "maize (corn)": 10487.14,
      "meat of cattle with the bone, fresh or chilled": 237.0,
      "meat of chickens, fresh or chilled": 1666.2,
      "meat of ducks, fresh or chilled": 2716.0,
      "meat of goat, fresh or chilled": 11.2,
      "meat of pig with the bone, fresh or chilled": 59.4,
      "meat of sheep, fresh or chilled": 11.4,
      "meat of turkeys, fresh or chilled": 5518.0,
      "mixed grain": 3784.0,
      "oats": 1157.94,
      "olives": 3453.87,
      "onions and shallots, dry (excluding dehydrated)": 34942.14,
      "oranges": 30079.98,
      "other beans, green": 10722.86,
      "other berries and fruits of the genus vaccinium n.e.c.": 5340.9,
      "other citrus fruit, n.e.c.": 16217.26,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1775.72,
      "other oil seeds, n.e.c.": 1228.86,
      "other pulses n.e.c.": 1302.18,
      "other stone fruits": 11885.5,
      "other tropical fruits, n.e.c.": 14289.93,
      "other vegetables, fresh n.e.c.": 6513.9,
      "peaches and nectarines": 19372.2,
      "pears": 16882.86,
      "peas, dry": 1599.54,
      "peas, green": 8255.98,
      "plums and sloes": 11145.98,
      "pomelos and grapefruits": 17143.34,
      "potatoes": 29799.0,
      "pumpkins, squash and gourds": 28709.3,
      "rape or colza seed": 2053.14,
      "raw milk of cattle": 7952.2,
      "raw milk of goats": 162.2,
      "raw milk of sheep": 167.8,
      "rice": 7455.82,
      "rye": 1917.76,
      "seed cotton, unginned": 3147.07,
      "sorghum": 3112.18,
      "sour cherries": 5424.84,
      "soya beans": 1187.34,
      "spinach": 8670.0,
      "strawberries": 45115.02,
      "sugar beet": 44437.38,
      "sunflower seed": 2356.62,
      "tangerines, mandarins, clementines": 20419.2,
      "tomatoes": 71194.24,
      "triticale": 2494.18,
      "true hemp, raw or retted": 1608.46,
      "unmanufactured tobacco": 1826.02,
      "walnuts, in shell": 3340.5,
      "watermelons": 59804.38,
      "wheat": 2988.42
    },
    "Hungary": {
      "almonds, in shell": 715.48,
      "apples": 17729.96,
      "apricots": 3068.14,
      "artichokes": 7000.0,
      "asparagus": 4661.1,
      "barley": 5536.82,
      "blueberries": 1460.0,
      "broad beans and horse beans, dry": 1473.6,
      "cabbages": 24396.3,
      "cantaloupes and other melons": 29013.36,
      "carrots and turnips": 50271.9,
      "cauliflowers and broccoli": 23074.76,
      "cereals n.e.c.": 1493.32,
      "cherries": 3264.04,
      "chestnuts, in shell": 697.42,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 62389.1,
      "cucumbers and gherkins": 60844.58,
      "currants": 3005.22,
      "eggplants (aubergines)": 24223.34,
      "grapes": 7096.22,
      "green garlic": 7170.94,
      "hazelnuts, in shell": 567.18,
      "hen eggs in shell, fresh": 314.0,
      "leeks and other alliaceous vegetables": 17698.58,
      "lettuce and chicory": 35518.74,
      "linseed": 1339.08,
      "lupins": 1335.64,
      "maize (corn)": 6421.06,
      "meat of cattle with the bone, fresh or chilled": 260.6,
      "meat of chickens, fresh or chilled": 1970.0,
      "meat of ducks, fresh or chilled": 2604.0,
      "meat of goat, fresh or chilled": 11.4,
      "meat of pig with the bone, fresh or chilled": 95.0,
      "meat of sheep, fresh or chilled": 17.8,
      "meat of turkeys, fresh or chilled": 11023.8,
      "mixed grain": 2333.3,
      "oats": 2818.64,
      "onions and shallots, dry (excluding dehydrated)": 33447.66,
      "other beans, green": 10017.68,
      "other berries and fruits of the genus vaccinium n.e.c.": 2689.38,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1132.7,
      "other oil seeds, n.e.c.": 721.64,
      "other pome fruits": 3962.32,
      "other pulses n.e.c.": 1270.76,
      "other stone fruits": 1886.48,
      "other vegetables, fresh n.e.c.": 35573.32,
      "peaches and nectarines": 4220.24,
      "pears": 7080.88,
      "peas, dry": 2324.78,
      "peas, green": 4733.04,
      "plums and sloes": 4840.58,
      "potatoes": 27036.56,
      "pumpkins, squash and gourds": 15161.62,
      "rape or colza seed": 2815.52,
      "raspberries": 2349.78,
      "raw milk of cattle": 7671.4,
      "raw milk of goats": 114.4,
      "raw milk of sheep": 89.0,
      "rice": 3793.9,
      "rye": 3157.56,
      "sorghum": 4031.0,
      "sour cherries": 4825.08,
      "soya beans": 2532.28,
      "spinach": 22828.7,
      "strawberries": 6888.76,
      "sugar beet": 55943.5,
      "sunflower seed": 2588.02,
      "tomatoes": 89620.52,
      "triticale": 3972.54,
      "unmanufactured tobacco": 1598.74,
      "walnuts, in shell": 774.68,
      "watermelons": 41685.5,
      "wheat": 5439.44
    },
    "Iceland": {
      "barley": 3069.58,
      "cabbages": 9278.34,
      "carrots and turnips": 56290.08,
      "cauliflowers and broccoli": 9740.0,
      "cucumbers and gherkins": 526056.9,
      "hen eggs in shell, fresh": 9073.6,
      "horse meat, fresh or chilled": 113.4,
      "meat of cattle with the bone, fresh or chilled": 214.8,
      "meat of chickens, fresh or chilled": 1648.4,
      "meat of pig with the bone, fresh or chilled": 85.2,
      "meat of sheep, fresh or chilled": 17.8,
      "meat of turkeys, fresh or chilled": 11279.4,
      "potatoes": 15489.7,
      "raw hides and skins of cattle": 28.4,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of cattle": 6045.0,
      "tomatoes": 321000.0
    },
    "India": {
      "almonds, in shell": 1204.94,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 969.18,
      "apples": 8532.52,
      "apricots": 2825.9,
      "areca nuts": 1745.32,
      "bananas": 36893.8,
      "barley": 2973.58,
      "beans, dry": 670.98,
      "cabbages": 23268.88,
      "cantaloupes and other melons": 21864.2,
      "carrots and turnips": 18733.76,
      "cashew nuts, in shell": 642.82,
      "cassava, fresh": 36085.04,
      "castor oil seeds": 1909.02,
      "cauliflowers and broccoli": 19457.88,
      "cherries": 2968.24,
      "chick peas, dry": 1183.58,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 2978.58,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 11181.02,
      "cocoa beans": 268.1,
      "coconuts, in shell": 6428.82,
      "coffee, green": 742.22,
      "cucumbers and gherkins": 14258.48,
      "eggplants (aubergines)": 18191.32,
      "figs": 2511.38,
      "ginger, raw": 11360.28,
      "grapes": 21520.34,
      "green garlic": 8300.84,
      "groundnuts, excluding shelled": 1965.34,
      "hen eggs in shell, fresh": 4935.4,
      "jute, raw or retted": 2603.5,
      "kenaf, and other textile bast fibres, raw or retted": 1176.88,
      "kiwi fruit": 3329.82,
      "lemons and limes": 11704.96,
      "lentils, dry": 948.62,
      "lettuce and chicory": 6298.34,
      "linseed": 658.44,
      "maize (corn)": 3346.28,
      "mangoes, guavas and mangosteens": 9714.52,
      "meat of buffalo, fresh or chilled": 361.8,
      "meat of chickens, fresh or chilled": 1537.4,
      "meat of ducks, fresh or chilled": 1301.4,
      "meat of goat, fresh or chilled": 11.4,
      "meat of pig with the bone, fresh or chilled": 40.0,
      "meat of sheep, fresh or chilled": 14.0,
      "millet": 1418.38,
      "natural rubber in primary forms": 2231.1,
      "nutmeg, mace, cardamoms, raw": 457.16,
      "okra": 12605.0,
      "onions and shallots, dry (excluding dehydrated)": 16814.86,
      "oranges": 17424.04,
      "other beans, green": 9402.14,
      "other berries and fruits of the genus vaccinium n.e.c.": 6981.64,
      "other citrus fruit, n.e.c.": 7181.18,
      "other fruits, n.e.c.": 11219.5,
      "other oil seeds, n.e.c.": 312.78,
      "other stimulant, spice and aromatic crops, n.e.c.": 1990.88,
      "other stone fruits": 4012.58,
      "other tropical fruits, n.e.c.": 9080.9,
      "other vegetables, fresh n.e.c.": 14681.08,
      "papayas": 37036.98,
      "peaches and nectarines": 6296.44,
      "pears": 7182.72,
      "peas, dry": 1373.36,
      "peas, green": 10563.82,
      "pepper (piper spp.), raw": 397.28,
      "pigeon peas, dry": 850.4,
      "pineapples": 16745.36,
      "plums and sloes": 3678.24,
      "potatoes": 24679.1,
      "pumpkins, squash and gourds": 16032.22,
      "rape or colza seed": 1444.76,
      "raw hides and skins of buffaloes": 79.8,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 2.0,
      "raw milk of buffalo": 2166.6,
      "raw milk of camel": 164.8,
      "raw milk of cattle": 1964.0,
      "raw milk of goats": 172.4,
      "rice": 4225.64,
      "safflower seed": 770.88,
      "seed cotton, unginned": 1274.8,
      "sesame seed": 486.7,
      "sorghum": 1100.48,
      "soya beans": 1069.12,
      "strawberries": 6871.44,
      "sugar cane": 82254.16,
      "sunflower seed": 1020.1,
      "sweet potatoes": 11119.72,
      "tangerines, mandarins, clementines": 13336.94,
      "tea leaves": 9818.44,
      "tomatoes": 24752.6,
      "unmanufactured tobacco": 1759.32,
      "walnuts, in shell": 2911.34,
      "watermelons": 28003.96,
      "wheat": 3515.52,
      "yams": 24210.08
    },
    "Indonesia": {
      "abaca, manila hemp, raw": 803.32,
      "areca nuts": 482.94,
      "avocados": 13594.86,
      "bananas": 60566.78,
      "beans, dry": 1135.84,
      "cabbages": 22242.6,
      "cantaloupes and other melons": 16684.38,
      "carrots and turnips": 18480.94,
      "cashew nuts, in shell": 333.62,
      "cassava, fresh": 26908.22,
      "castor oil seeds": 171.34,
      "cauliflowers and broccoli": 12991.78,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 8921.92,
      "cinnamon and cinnamon-tree flowers, raw": 601.64,
      "cloves (whole stems), raw": 243.1,
      "cocoa beans": 460.66,
      "coconuts, in shell": 6365.06,
      "coffee, green": 614.28,
      "cucumbers and gherkins": 10619.58,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 6060.84,
      "eggplants (aubergines)": 13718.1,
      "eggs from other birds in shell, fresh, n.e.c.": 3403.4,
      "ginger, raw": 25318.24,
      "green corn (maize)": 5186.34,
      "green garlic": 6976.3,
      "groundnuts, excluding shelled": 2427.4,
      "hen eggs in shell, fresh": 6468.6,
      "horse meat, fresh or chilled": 169.4,
      "kapok fruit": 1268.78,
      "kenaf, and other textile bast fibres, raw or retted": 853.76,
      "leeks and other alliaceous vegetables": 10283.24,
      "maize (corn)": 5835.6,
      "mangoes, guavas and mangosteens": 13976.2,
      "meat of buffalo, fresh or chilled": 221.6,
      "meat of cattle with the bone, fresh or chilled": 330.2,
      "meat of chickens, fresh or chilled": 845.0,
      "meat of ducks, fresh or chilled": 930.0,
      "meat of goat, fresh or chilled": 9.4,
      "meat of pig with the bone, fresh or chilled": 49.2,
      "meat of rabbits and hares, fresh or chilled": 1680.0,
      "meat of sheep, fresh or chilled": 10.0,
      "natural rubber in primary forms": 762.88,
      "nutmeg, mace, cardamoms, raw": 149.56,
      "oil palm fruit": 17309.26,
      "onions and shallots, dry (excluding dehydrated)": 10541.32,
      "oranges": 37805.54,
      "other beans, green": 7458.84,
      "other fruits, n.e.c.": 12775.8,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 496.28,
      "other pulses n.e.c.": 594.2,
      "other stimulant, spice and aromatic crops, n.e.c.": 25151.14,
      "other sugar crops n.e.c.": 2846.6,
      "other tropical fruits, n.e.c.": 13238.86,
      "other vegetables, fresh n.e.c.": 9842.54,
      "papayas": 97455.04,
      "pepper (piper spp.), raw": 418.42,
      "pineapples": 130805.52,
      "potatoes": 19312.68,
      "pumpkins, squash and gourds": 62070.74,
      "raw hides and skins of buffaloes": 36.4,
      "raw hides and skins of cattle": 33.2,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 2.0,
      "raw milk of buffalo": 751.8,
      "raw milk of cattle": 1657.6,
      "raw milk of goats": 49.0,
      "raw milk of sheep": 27.0,
      "rice": 5233.42,
      "seed cotton, unginned": 258.8,
      "sisal, raw": 1117.64,
      "soya beans": 1624.32,
      "spinach": 3730.72,
      "sugar cane": 65001.06,
      "sweet potatoes": 21844.94,
      "tea leaves": 6239.98,
      "tomatoes": 18870.16,
      "unmanufactured tobacco": 1223.92,
      "vanilla, raw": 165.76,
      "watermelons": 14131.32
    },
    "Iran": {
      "almonds, in shell": 2259.16,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 8926.74,
      "apples": 19872.16,
      "apricots": 5780.36,
      "artichokes": 19514.34,
      "asparagus": 25557.7,
      "bananas": 31734.24,
      "barley": 2284.64,
      "beans, dry": 1856.22,
      "broad beans and horse beans, dry": 2237.28,
      "cabbages": 41048.04,
      "cantaloupes and other melons": 21419.96,
      "carrots and turnips": 26168.3,
      "castor oil seeds": 1685.8,
      "cauliflowers and broccoli": 32616.18,
      "cherries": 7032.8,
      "chick peas, dry": 402.8,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 2576.8,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 14562.42,
      "cucumbers and gherkins": 27188.72,
      "dates": 8399.62,
      "eggplants (aubergines)": 30013.16,
      "figs": 6289.2,
      "grapes": 12859.98,
      "green garlic": 12161.98,
      "groundnuts, excluding shelled": 4893.36,
      "hazelnuts, in shell": 526.68,
      "hempseed": 1036.1,
      "hen eggs in shell, fresh": 6107.2,
      "kiwi fruit": 29161.68,
      "leeks and other alliaceous vegetables": 31999.6,
      "lemons and limes": 17120.48,
      "lentils, dry": 593.94,
      "lettuce and chicory": 29924.32,
      "maize (corn)": 6526.04,
      "mangoes, guavas and mangosteens": 6007.22,
      "meat of buffalo, fresh or chilled": 190.2,
      "meat of camels, fresh or chilled": 197.2,
      "meat of cattle with the bone, fresh or chilled": 204.0,
      "meat of chickens, fresh or chilled": 1187.4,
      "meat of ducks, fresh or chilled": 1836.0,
      "meat of geese, fresh or chilled": 2500.0,
      "meat of goat, fresh or chilled": 15.0,
      "meat of sheep, fresh or chilled": 19.0,
      "meat of turkeys, fresh or chilled": 3000.0,
      "melonseed": 634.06,
      "millet": 1733.72,
      "mustard seed": 705.82,
      "olives": 3144.72,
      "onions and shallots, dry (excluding dehydrated)": 38009.68,
      "oranges": 37196.52,
      "other beans, green": 7578.82,
      "other berries and fruits of the genus vaccinium n.e.c.": 2823.02,
      "other citrus fruit, n.e.c.": 26742.62,
      "other fruits, n.e.c.": 11219.46,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1684.22,
      "other oil seeds, n.e.c.": 1456.66,
      "other pulses n.e.c.": 1002.12,
      "other stone fruits": 8369.6,
      "other tropical fruits, n.e.c.": 14726.06,
      "other vegetables, fresh n.e.c.": 19144.36,
      "papayas": 10581.36,
      "peaches and nectarines": 18917.3,
      "pears": 26745.76,
      "peas, green": 5779.04,
      "persimmons": 15184.84,
      "pistachios, in shell": 1096.88,
      "plums and sloes": 23184.24,
      "pomelos and grapefruits": 23045.74,
      "potatoes": 30643.64,
      "pumpkins, squash and gourds": 6787.46,
      "quinces": 10443.12,
      "rape or colza seed": 1904.74,
      "raw hides and skins of buffaloes": 32.0,
      "raw hides and skins of cattle": 26.2,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of buffalo": 1573.4,
      "raw milk of cattle": 3630.2,
      "raw milk of goats": 49.2,
      "raw milk of sheep": 32.0,
      "rice": 4700.26,
      "rye": 908.82,
      "safflower seed": 1321.42,
      "seed cotton, unginned": 2460.36,
      "sesame seed": 690.5,
      "sour cherries": 4734.64,
      "soya beans": 2426.02,
      "spinach": 19608.3,
      "strawberries": 14624.7,
      "sugar beet": 57334.92,
      "sugar cane": 94978.42,
      "sunflower seed": 1022.32,
      "tangerines, mandarins, clementines": 54529.02,
      "tea leaves": 6057.84,
      "tomatoes": 44891.06,
      "unmanufactured tobacco": 2011.0,
      "walnuts, in shell": 6482.6,
      "watermelons": 23030.84,
      "wheat": 2413.7
    },
    "Ireland": {
      "apples": 28876.04,
      "barley": 7389.56,
      "broad beans and horse beans, dry": 4924.58,
      "cabbages": 27129.92,
      "carrots and turnips": 67545.42,
      "cauliflowers and broccoli": 12458.54,
      "cucumbers and gherkins": 180000.0,
      "currants": 5000.0,
      "hen eggs in shell, fresh": 244.0,
      "leeks and other alliaceous vegetables": 24363.64,
      "lettuce and chicory": 28317.62,
      "meat of cattle with the bone, fresh or chilled": 326.2,
      "meat of chickens, fresh or chilled": 1500.0,
      "meat of pig with the bone, fresh or chilled": 91.2,
      "meat of sheep, fresh or chilled": 21.4,
      "meat of turkeys, fresh or chilled": 9777.6,
      "oats": 7651.18,
      "onions and shallots, dry (excluding dehydrated)": 36708.72,
      "peas, dry": 4583.3,
      "potatoes": 40317.18,
      "pumpkins, squash and gourds": 8228.56,
      "rape or colza seed": 4427.02,
      "raspberries": 15200.0,
      "raw milk of cattle": 5924.0,
      "spinach": 12702.26,
      "strawberries": 35866.66,
      "sunflower seed": 0.0,
      "tomatoes": 360200.0,
      "wheat": 9014.76
    },
    "Israel": {
      "almonds, in shell": 21671.3,
      "apples": 39347.98,
      "apricots": 11213.2,
      "artichokes": 6009.22,
      "asparagus": 11655.1,
      "avocados": 14045.34,
      "bananas": 56511.64,
      "barley": 1566.44,
      "broad beans and horse beans, green": 10970.8,
      "cabbages": 11855.58,
      "cantaloupes and other melons": 19464.04,
      "carrots and turnips": 73619.56,
      "cauliflowers and broccoli": 8287.76,
      "cherries": 6928.3,
      "chick peas, dry": 3219.98,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 66560.92,
      "cucumbers and gherkins": 92941.94,
      "dates": 12270.86,
      "eggplants (aubergines)": 29194.2,
      "figs": 25689.12,
      "grapes": 7065.98,
      "green corn (maize)": 22470.84,
      "green garlic": 1373.0,
      "groundnuts, excluding shelled": 5805.32,
      "hen eggs in shell, fresh": 6791.8,
      "kiwi fruit": 28534.66,
      "lemons and limes": 27574.56,
      "lentils, dry": 220.72,
      "lettuce and chicory": 6199.6,
      "locust beans (carobs)": 254.16,
      "maize (corn)": 17358.06,
      "mangoes, guavas and mangosteens": 25669.0,
      "meat of camels, fresh or chilled": 160.0,
      "meat of cattle with the bone, fresh or chilled": 326.2,
      "meat of chickens, fresh or chilled": 1961.2,
      "meat of ducks, fresh or chilled": 1618.8,
      "meat of geese, fresh or chilled": 3360.6,
      "meat of goat, fresh or chilled": 10.0,
      "meat of pig with the bone, fresh or chilled": 82.0,
      "meat of sheep, fresh or chilled": 42.6,
      "meat of turkeys, fresh or chilled": 6779.4,
      "oats": 285.96,
      "olives": 2172.12,
      "onions and shallots, dry (excluding dehydrated)": 20939.36,
      "onions and shallots, green": 4539.28,
      "oranges": 22285.72,
      "other beans, green": 13391.28,
      "other berries and fruits of the genus vaccinium n.e.c.": 3060.64,
      "other citrus fruit, n.e.c.": 4625.48,
      "other fruits, n.e.c.": 29216.0,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 55739.0,
      "other oil seeds, n.e.c.": 898.48,
      "other pulses n.e.c.": 1318.3,
      "other tropical fruits, n.e.c.": 99.18,
      "other vegetables, fresh n.e.c.": 3171.28,
      "papayas": 5776.54,
      "peaches and nectarines": 20701.12,
      "pears": 35552.3,
      "peas, dry": 360.2,
      "peas, green": 8232.8,
      "persimmons": 28545.34,
      "pineapples": 43469.6,
      "plums and sloes": 17726.8,
      "pomelos and grapefruits": 90100.86,
      "potatoes": 34964.08,
      "pumpkins, squash and gourds": 25847.64,
      "quinces": 14729.24,
      "raw hides and skins of cattle": 33.2,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 6.6,
      "raw milk of cattle": 13656.4,
      "raw milk of goats": 253.0,
      "raw milk of sheep": 83.4,
      "safflower seed": 790.12,
      "seed cotton, unginned": 4174.7,
      "sesame seed": 2034.38,
      "sorghum": 16578.94,
      "spinach": 1726.42,
      "strawberries": 47168.64,
      "sunflower seed": 3717.52,
      "sweet potatoes": 15406.42,
      "tangerines, mandarins, clementines": 23325.7,
      "tomatoes": 67194.16,
      "unmanufactured tobacco": 360.76,
      "watermelons": 24281.64,
      "wheat": 2351.0
    },
    "Italy": {
      "almonds, in shell": 1417.3,
      "apples": 42861.68,
      "apricots": 11929.36,
      "artichokes": 9869.26,
      "asparagus": 6607.6,
      "barley": 4176.2,
      "blueberries": 7006.9,
      "broad beans and horse beans, dry": 1976.46,
      "broad beans and horse beans, green": 5711.64,
      "cabbages": 18902.72,
      "cantaloupes and other melons": 27170.56,
      "carrots and turnips": 45339.56,
      "cauliflowers and broccoli": 23950.52,
      "cereals n.e.c.": 3046.26,
      "cherries": 3327.8,
      "chestnuts, in shell": 1512.88,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 24884.48,
      "cucumbers and gherkins": 32561.6,
      "currants": 5630.76,
      "eggplants (aubergines)": 33989.72,
      "figs": 6190.28,
      "flax, raw or retted": 1890.42,
      "grapes": 11036.8,
      "green garlic": 8141.28,
      "hazelnuts, in shell": 1290.46,
      "hen eggs in shell, fresh": 10592.33,
      "hop cones": 2089.52,
      "kiwi fruit": 19180.64,
      "leeks and other alliaceous vegetables": 24498.46,
      "lemons and limes": 18843.02,
      "lettuce and chicory": 23352.38,
      "lupins": 1518.52,
      "maize (corn)": 10126.98,
      "meat of cattle with the bone, fresh or chilled": 261.2,
      "meat of chickens, fresh or chilled": 1879.0,
      "meat of ducks, fresh or chilled": 2278.8,
      "meat of goat, fresh or chilled": 14.4,
      "meat of pig with the bone, fresh or chilled": 121.6,
      "meat of sheep, fresh or chilled": 10.8,
      "meat of turkeys, fresh or chilled": 10448.2,
      "mixed grain": 3370.23,
      "oats": 2341.12,
      "olives": 2057.66,
      "onions and shallots, dry (excluding dehydrated)": 32195.0,
      "oranges": 21183.02,
      "other beans, green": 9177.02,
      "other berries and fruits of the genus vaccinium n.e.c.": 7612.16,
      "other citrus fruit, n.e.c.": 17864.78,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1059.72,
      "other oil seeds, n.e.c.": 1526.38,
      "other pome fruits": 9671.08,
      "other pulses n.e.c.": 1545.64,
      "other stone fruits": 13392.16,
      "other tropical fruits, n.e.c.": 17916.28,
      "peaches and nectarines": 19003.72,
      "pears": 17399.22,
      "peas, dry": 2800.34,
      "peas, green": 4946.66,
      "plums and sloes": 13756.26,
      "pomelos and grapefruits": 18280.0,
      "potatoes": 28886.04,
      "pumpkins, squash and gourds": 29311.3,
      "rape or colza seed": 2870.56,
      "raspberries": 7368.38,
      "raw milk of cattle": 7143.6,
      "raw milk of goats": 71.4,
      "raw milk of sheep": 108.0,
      "rice": 6337.32,
      "rye": 3206.86,
      "sorghum": 6125.76,
      "sour cherries": 6017.52,
      "soya beans": 3357.02,
      "spinach": 17301.32,
      "strawberries": 26968.06,
      "sugar beet": 55271.7,
      "sunflower seed": 2474.5,
      "tangerines, mandarins, clementines": 22698.12,
      "tomatoes": 61989.12,
      "triticale": 4630.32,
      "true hemp, raw or retted": 8109.46,
      "unmanufactured tobacco": 2934.18,
      "walnuts, in shell": 2951.24,
      "watermelons": 49316.82,
      "wheat": 3844.2
    },
    "Jamaica": {
      "avocados": 6723.36,
      "bananas": 7617.54,
      "beans, dry": 1048.78,
      "broad beans and horse beans, dry": 1094.04,
      "cabbages": 17657.12,
      "cantaloupes and other melons": 16210.7,
      "carrots and turnips": 15642.7,
      "cassava, fresh": 20575.9,
      "cauliflowers and broccoli": 11202.26,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 14222.96,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 15026.54,
      "cocoa beans": 284.3,
      "coconuts, in shell": 6058.58,
      "coffee, green": 826.18,
      "cow peas, dry": 1124.94,
      "cucumbers and gherkins": 17134.26,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 17359.98,
      "eggplants (aubergines)": 12398.44,
      "ginger, raw": 3393.84,
      "green corn (maize)": 918.86,
      "groundnuts, excluding shelled": 1192.64,
      "hen eggs in shell, fresh": 5393.6,
      "horse meat, fresh or chilled": 150.0,
      "lemons and limes": 16748.42,
      "lettuce and chicory": 13907.76,
      "maize (corn)": 1175.46,
      "mangoes, guavas and mangosteens": 5434.32,
      "meat of cattle with the bone, fresh or chilled": 244.8,
      "meat of chickens, fresh or chilled": 1656.2,
      "meat of goat, fresh or chilled": 15.6,
      "meat of pig with the bone, fresh or chilled": 67.6,
      "meat of sheep, fresh or chilled": 23.6,
      "okra": 9911.32,
      "onions and shallots, dry (excluding dehydrated)": 16832.54,
      "onions and shallots, green": 14429.76,
      "oranges": 9743.18,
      "other fibre crops, raw, n.e.c.": 5010.1,
      "other stimulant, spice and aromatic crops, n.e.c.": 6170.6,
      "other tropical fruits, n.e.c.": 16214.66,
      "other vegetables, fresh n.e.c.": 12113.5,
      "papayas": 21487.5,
      "peas, dry": 1146.8,
      "pigeon peas, dry": 1169.98,
      "pineapples": 18863.68,
      "plantains and cooking bananas": 19341.78,
      "pomelos and grapefruits": 27379.9,
      "potatoes": 14966.62,
      "pumpkins, squash and gourds": 18985.78,
      "raw hides and skins of cattle": 24.4,
      "raw hides and skins of goats or kids": 2.4,
      "raw hides and skins of sheep or lambs": 3.4,
      "raw milk of cattle": 2280.4,
      "raw milk of goats": 356.4,
      "sisal, raw": 759.82,
      "spinach": 16440.48,
      "string beans": 9091.26,
      "sugar cane": 53238.68,
      "sweet potatoes": 16963.8,
      "tangerines, mandarins, clementines": 3275.44,
      "tomatoes": 18563.6,
      "unmanufactured tobacco": 2105.18,
      "watermelons": 22795.74,
      "yams": 17811.26
    },
    "Japan": {
      "apples": 19647.76,
      "apricots": 6202.54,
      "asparagus": 5796.82,
      "bananas": 3332.16,
      "barley": 3475.52,
      "beans, dry": 1591.38,
      "broad beans and horse beans, dry": 1007.56,
      "broad beans and horse beans, green": 8183.52,
      "buckwheat": 604.6,
      "cabbages": 42571.46,
      "cantaloupes and other melons": 24738.72,
      "carrots and turnips": 35520.92,
      "cauliflowers and broccoli": 10624.56,
      "cherries": 3555.96,
      "chestnuts, in shell": 946.68,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 46528.44,
      "cucumbers and gherkins": 55154.28,
      "currants": 2979.18,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 14634.8,
      "eggplants (aubergines)": 36618.38,
      "figs": 13161.56,
      "ginger, raw": 27419.74,
      "grapes": 10020.96,
      "green corn (maize)": 10110.3,
      "green garlic": 8033.14,
      "groundnuts, excluding shelled": 2594.7,
      "hen eggs in shell, fresh": 7789.2,
      "hop cones": 2070.08,
      "horse meat, fresh or chilled": 416.6,
      "kiwi fruit": 11784.14,
      "lemons and limes": 15754.46,
      "lettuce and chicory": 27564.72,
      "maize (corn)": 2686.82,
      "mangoes, guavas and mangosteens": 7455.6,
      "meat of cattle with the bone, fresh or chilled": 450.0,
      "meat of chickens, fresh or chilled": 2890.8,
      "meat of goat, fresh or chilled": 11.6,
      "meat of pig with the bone, fresh or chilled": 78.4,
      "meat of sheep, fresh or chilled": 32.4,
      "meat of turkeys, fresh or chilled": 2767.0,
      "millet": 885.0,
      "oats": 1922.94,
      "onions and shallots, dry (excluding dehydrated)": 46908.8,
      "onions and shallots, green": 20701.96,
      "oranges": 11611.2,
      "other citrus fruit, n.e.c.": 18261.04,
      "other stone fruits": 2763.24,
      "other vegetables, fresh n.e.c.": 22098.0,
      "peaches and nectarines": 11700.38,
      "pears": 17944.2,
      "peas, dry": 2439.88,
      "peas, green": 7177.02,
      "peppermint, spearmint": 17666.48,
      "persimmons": 10654.88,
      "pineapples": 22664.56,
      "plums and sloes": 6652.68,
      "potatoes": 31766.14,
      "pumpkins, squash and gourds": 12067.04,
      "quinces": 6163.9,
      "rape or colza seed": 2004.92,
      "raw hides and skins of cattle": 24.0,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 5.8,
      "raw milk of cattle": 8855.2,
      "rice": 6922.14,
      "sesame seed": 540.58,
      "soya beans": 1631.64,
      "spinach": 10976.46,
      "strawberries": 33247.64,
      "string beans": 7364.44,
      "sugar beet": 68195.28,
      "sugar cane": 55286.94,
      "sweet potatoes": 21686.04,
      "tangerines, mandarins, clementines": 19606.48,
      "taro": 13355.46,
      "tea leaves": 8822.0,
      "tomatoes": 62754.48,
      "true hemp, raw or retted": 878.26,
      "unmanufactured tobacco": 2434.7,
      "watermelons": 34472.86,
      "wheat": 4596.66,
      "yams": 25014.26
    },
    "Kenya": {
      "abaca, manila hemp, raw": 1148.96,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 12758.62,
      "apples": 4827.22,
      "apricots": 4514.52,
      "artichokes": 5403.6,
      "asparagus": 5538.46,
      "avocados": 16941.12,
      "bananas": 26679.72,
      "barley": 2851.74,
      "beans, dry": 659.54,
      "broad beans and horse beans, green": 21660.14,
      "cabbages": 34257.26,
      "carrots and turnips": 16908.06,
      "cashew nuts, in shell": 400.7,
      "cassava, fresh": 14280.66,
      "castor oil seeds": 695.52,
      "cauliflowers and broccoli": 6666.44,
      "chick peas, dry": 348.28,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 1225.0,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 8641.16,
      "cloves (whole stems), raw": 939.54,
      "coconuts, in shell": 1133.88,
      "coffee, green": 394.5,
      "cow peas, dry": 647.38,
      "cucumbers and gherkins": 10607.44,
      "dates": 2231.82,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 7635.46,
      "ginger, raw": 15538.9,
      "green garlic": 13491.84,
      "groundnuts, excluding shelled": 1056.38,
      "hen eggs in shell, fresh": 1768.8,
      "leeks and other alliaceous vegetables": 4573.98,
      "lemons and limes": 12840.12,
      "lentils, dry": 796.02,
      "lettuce and chicory": 18754.72,
      "linseed": 1007.04,
      "maize (corn)": 1637.16,
      "mangoes, guavas and mangosteens": 11732.52,
      "meat of camels, fresh or chilled": 299.0,
      "meat of cattle with the bone, fresh or chilled": 123.2,
      "meat of chickens, fresh or chilled": 1416.2,
      "meat of goat, fresh or chilled": 12.4,
      "meat of pig with the bone, fresh or chilled": 77.4,
      "meat of rabbits and hares, fresh or chilled": 1200.0,
      "meat of sheep, fresh or chilled": 14.8,
      "millet": 712.92,
      "nutmeg, mace, cardamoms, raw": 669.46,
      "oats": 997.24,
      "okra": 12746.38,
      "onions and shallots, dry (excluding dehydrated)": 15518.62,
      "oranges": 10720.96,
      "other beans, green": 10850.68,
      "other berries and fruits of the genus vaccinium n.e.c.": 2744.58,
      "other citrus fruit, n.e.c.": 6990.72,
      "other fruits, n.e.c.": 12113.76,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 5674.7,
      "other oil seeds, n.e.c.": 408.46,
      "other pulses n.e.c.": 586.02,
      "other stimulant, spice and aromatic crops, n.e.c.": 1392.88,
      "other tropical fruits, n.e.c.": 10066.04,
      "other vegetables, fresh n.e.c.": 8137.3,
      "papayas": 13498.08,
      "peaches and nectarines": 8047.48,
      "pears": 8988.06,
      "peas, green": 6719.72,
      "pepper (piper spp.), raw": 997.68,
      "pigeon peas, dry": 726.3,
      "pineapples": 32433.2,
      "plantains and cooking bananas": 12246.78,
      "plums and sloes": 8509.34,
      "pomelos and grapefruits": 10903.86,
      "potatoes": 9514.06,
      "pyrethrum, dried flowers": 377.14,
      "rape or colza seed": 3327.97,
      "raw hides and skins of cattle": 19.8,
      "raw hides and skins of goats or kids": 4.2,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of camel": 658.8,
      "raw milk of cattle": 955.0,
      "raw milk of goats": 52.4,
      "raw milk of sheep": 31.0,
      "rice": 5797.02,
      "seed cotton, unginned": 339.58,
      "sesame seed": 667.48,
      "sisal, raw": 754.12,
      "sorghum": 922.5,
      "soya beans": 1080.52,
      "spinach": 17772.08,
      "strawberries": 12481.76,
      "sugar cane": 74163.92,
      "sunflower seed": 1000.0,
      "sweet potatoes": 12330.48,
      "tangerines, mandarins, clementines": 10499.2,
      "tea leaves": 11242.48,
      "tomatoes": 22377.88,
      "unmanufactured tobacco": 610.74,
      "vanilla, raw": 744.46,
      "watermelons": 19553.58,
      "wheat": 2989.48,
      "yams": 8463.3
    },
    "Malaysia": {
      "areca nuts": 3043.74,
      "avocados": 5833.76,
      "bananas": 14457.78,
      "cabbages": 26481.84,
      "cashew nuts, in shell": 2195.78,
      "cassava, fresh": 17648.52,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 785.02,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 10676.74,
      "cloves (whole stems), raw": 224.06,
      "cocoa beans": 82.18,
      "coconuts, in shell": 8172.84,
      "coffee, green": 2433.88,
      "cucumbers and gherkins": 20596.78,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 41347.98,
      "eggplants (aubergines)": 17695.16,
      "eggs from other birds in shell, fresh, n.e.c.": 5300.2,
      "ginger, raw": 12465.18,
      "groundnuts, excluding shelled": 3000.04,
      "hen eggs in shell, fresh": 3397.0,
      "horse meat, fresh or chilled": 120.0,
      "kenaf, and other textile bast fibres, raw or retted": 3830.34,
      "lemons and limes": 11648.16,
      "lettuce and chicory": 17071.7,
      "maize (corn)": 3292.03,
      "mangoes, guavas and mangosteens": 10383.32,
      "meat of buffalo, fresh or chilled": 446.4,
      "meat of cattle with the bone, fresh or chilled": 294.4,
      "meat of chickens, fresh or chilled": 2440.0,
      "meat of ducks, fresh or chilled": 2997.0,
      "meat of goat, fresh or chilled": 35.0,
      "meat of pig with the bone, fresh or chilled": 106.8,
      "meat of sheep, fresh or chilled": 50.0,
      "mustard seed": 13510.0,
      "natural rubber in primary forms": 368.8,
      "nutmeg, mace, cardamoms, raw": 5335.4,
      "oil palm fruit": 18614.32,
      "okra": 16860.26,
      "oranges": 8582.94,
      "other fruits, n.e.c.": 7952.42,
      "other oil seeds, n.e.c.": 1268.36,
      "other pulses n.e.c.": 14395.04,
      "other stimulant, spice and aromatic crops, n.e.c.": 10199.6,
      "other tropical fruits, n.e.c.": 8521.34,
      "other vegetables, fresh n.e.c.": 19029.56,
      "papayas": 25033.48,
      "pepper (piper spp.), raw": 4149.04,
      "pineapples": 35854.82,
      "pomelos and grapefruits": 18522.6,
      "pumpkins, squash and gourds": 14377.88,
      "raw hides and skins of buffaloes": 60.6,
      "raw hides and skins of cattle": 46.6,
      "raw hides and skins of goats or kids": 11.0,
      "raw hides and skins of sheep or lambs": 13.0,
      "raw milk of buffalo": 1423.6,
      "raw milk of cattle": 941.4,
      "rice": 3616.8,
      "spinach": 11659.96,
      "string beans": 13534.78,
      "sugar cane": 18176.88,
      "sweet potatoes": 17472.88,
      "tea leaves": 6663.74,
      "tomatoes": 93895.16,
      "unmanufactured tobacco": 1134.78,
      "watermelons": 17297.88,
      "yams": 7308.0
    },
    "Mexico": {
      "agave fibres, raw, n.e.c.": 434.84,
      "almonds, in shell": 1427.22,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 14921.72,
      "apples": 13572.82,
      "apricots": 5360.64,
      "artichokes": 13893.46,
      "asparagus": 9476.66,
      "avocados": 10972.18,
      "bananas": 30690.46,
      "barley": 2892.1,
      "beans, dry": 758.44,
      "blueberries": 13051.48,
      "broad beans and horse beans, dry": 1575.26,
      "broad beans and horse beans, green": 6517.56,
      "cabbages": 30920.22,
      "canary seed": 1278.06,
      "cantaloupes and other melons": 31866.4,
      "carrots and turnips": 30035.2,
      "cashew nuts, in shell": 1561.14,
      "cassava, fresh": 12434.28,
      "castor oil seeds": 3614.66,
      "cauliflowers and broccoli": 18307.4,
      "cereals n.e.c.": 1873.72,
      "cherries": 3552.84,
      "chick peas, dry": 1917.66,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 1981.54,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 19394.7,
      "cocoa beans": 536.74,
      "coconuts, in shell": 8794.14,
      "coffee, green": 286.24,
      "cucumbers and gherkins": 59934.04,
      "dates": 7068.32,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 28673.54,
      "eggplants (aubergines)": 60739.44,
      "figs": 6626.18,
      "ginger, raw": 10339.96,
      "grapes": 15521.66,
      "green corn (maize)": 15192.06,
      "green garlic": 12967.42,
      "groundnuts, excluding shelled": 1782.32,
      "hen eggs in shell, fresh": 6025.8,
      "horse meat, fresh or chilled": 129.2,
      "jojoba seeds": 466.36,
      "leeks and other alliaceous vegetables": 17091.46,
      "lemons and limes": 15346.14,
      "lentils, dry": 1193.4,
      "lettuce and chicory": 24094.62,
      "linseed": 746.26,
      "locust beans (carobs)": 4396.14,
      "maize (corn)": 3913.68,
      "mangoes, guavas and mangosteens": 11279.02,
      "meat of cattle with the bone, fresh or chilled": 250.6,
      "meat of chickens, fresh or chilled": 1838.0,
      "meat of goat, fresh or chilled": 17.6,
      "meat of pig with the bone, fresh or chilled": 82.6,
      "meat of rabbits and hares, fresh or chilled": 1000.0,
      "meat of sheep, fresh or chilled": 20.8,
      "meat of turkeys, fresh or chilled": 5761.6,
      "melonseed": 387.34,
      "millet": 13899.72,
      "natural rubber in primary forms": 3079.52,
      "oats": 2164.46,
      "oil palm fruit": 14608.34,
      "okra": 9534.04,
      "olives": 4251.88,
      "onions and shallots, dry (excluding dehydrated)": 31227.28,
      "onions and shallots, green": 11580.62,
      "oranges": 14225.82,
      "other berries and fruits of the genus vaccinium n.e.c.": 22628.18,
      "other citrus fruit, n.e.c.": 4227.86,
      "other fruits, n.e.c.": 6719.44,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1941.9,
      "other pulses n.e.c.": 763.7,
      "other stimulant, spice and aromatic crops, n.e.c.": 7022.24,
      "other tropical fruits, n.e.c.": 9826.94,
      "other vegetables, fresh n.e.c.": 8552.0,
      "papayas": 57666.6,
      "peaches and nectarines": 7371.52,
      "pears": 7319.96,
      "peas, dry": 1337.8,
      "peas, green": 5315.82,
      "pepper (piper spp.), raw": 2839.72,
      "peppermint, spearmint": 12069.68,
      "persimmons": 12869.62,
      "pineapples": 48955.46,
      "pistachios, in shell": 445.62,
      "plums and sloes": 5722.08,
      "pomelos and grapefruits": 23533.52,
      "potatoes": 31934.02,
      "pumpkins, squash and gourds": 21086.64,
      "quinces": 6868.48,
      "rape or colza seed": 766.68,
      "raspberries": 18635.0,
      "raw hides and skins of cattle": 31.0,
      "raw hides and skins of goats or kids": 3.6,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of cattle": 5160.8,
      "raw milk of goats": 225.2,
      "rice": 6593.56,
      "rye": 1796.62,
      "safflower seed": 1758.56,
      "seed cotton, unginned": 4614.1,
      "sesame seed": 727.08,
      "sisal, raw": 1085.74,
      "sorghum": 3459.26,
      "soya beans": 1790.9,
      "spinach": 15688.26,
      "strawberries": 43636.66,
      "string beans": 10181.18,
      "sugar beet": 13157.86,
      "sugar cane": 68907.46,
      "sunflower seed": 1309.16,
      "sweet potatoes": 20181.74,
      "tangerines, mandarins, clementines": 14327.62,
      "tomatoes": 48260.6,
      "triticale": 3388.1,
      "unmanufactured tobacco": 2417.84,
      "vanilla, raw": 612.68,
      "vetches": 12068.36,
      "walnuts, in shell": 1395.12,
      "watermelons": 32776.14,
      "wheat": 5847.5,
      "yautia": 75639.78
    },
    "Morocco": {
      "almonds, in shell": 697.6,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 1084.24,
      "apples": 17162.96,
      "apricots": 7644.62,
      "artichokes": 15582.6,
      "asparagus": 4735.82,
      "avocados": 10177.28,
      "bananas": 38623.56,
      "barley": 989.64,
      "blueberries": 4710.34,
      "broad beans and horse beans, dry": 671.52,
      "broad beans and horse beans, green": 8807.26,
      "cabbages": 29148.88,
      "canary seed": 2719.3,
      "cantaloupes and other melons": 33805.96,
      "carrots and turnips": 28629.9,
      "castor oil seeds": 598.2,
      "cauliflowers and broccoli": 26419.38,
      "cereals n.e.c.": 852.3,
      "cherries": 4109.3,
      "chick peas, dry": 816.88,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 19579.38,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 42193.28,
      "cucumbers and gherkins": 42127.42,
      "dates": 2021.54,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 6653.2,
      "eggplants (aubergines)": 25946.0,
      "figs": 1886.02,
      "grapes": 9012.14,
      "green garlic": 7488.48,
      "groundnuts, excluding shelled": 2697.82,
      "hen eggs in shell, fresh": 7471.2,
      "horse meat, fresh or chilled": 127.8,
      "leeks and other alliaceous vegetables": 41318.64,
      "lemons and limes": 13517.5,
      "lentils, dry": 400.38,
      "lettuce and chicory": 20002.1,
      "locust beans (carobs)": 2116.04,
      "lupins": 668.18,
      "maize (corn)": 422.84,
      "mangoes, guavas and mangosteens": 8654.34,
      "meat of camels, fresh or chilled": 228.6,
      "meat of cattle with the bone, fresh or chilled": 189.4,
      "meat of chickens, fresh or chilled": 900.0,
      "meat of goat, fresh or chilled": 13.4,
      "meat of pig with the bone, fresh or chilled": 50.0,
      "meat of sheep, fresh or chilled": 13.0,
      "meat of turkeys, fresh or chilled": 5148.8,
      "millet": 2099.68,
      "oats": 772.58,
      "olives": 1224.14,
      "onions and shallots, dry (excluding dehydrated)": 30657.26,
      "onions and shallots, green": 22977.84,
      "oranges": 16538.7,
      "other beans, green": 23157.46,
      "other berries and fruits of the genus vaccinium n.e.c.": 7543.54,
      "other citrus fruit, n.e.c.": 8825.88,
      "other fruits, n.e.c.": 7031.32,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 4469.74,
      "other oil seeds, n.e.c.": 1660.9,
      "other pulses n.e.c.": 1543.12,
      "other stimulant, spice and aromatic crops, n.e.c.": 952.22,
      "other stone fruits": 9276.2,
      "other tropical fruits, n.e.c.": 6675.88,
      "other vegetables, fresh n.e.c.": 18257.94,
      "papayas": 42504.88,
      "peaches and nectarines": 13850.26,
      "pears": 10192.32,
      "peas, dry": 639.28,
      "peas, green": 6593.28,
      "peppermint, spearmint": 21343.98,
      "pistachios, in shell": 2857.86,
      "plums and sloes": 11846.78,
      "pomelos and grapefruits": 21077.38,
      "potatoes": 31705.96,
      "pumpkins, squash and gourds": 23868.48,
      "pyrethrum, dried flowers": 258.48,
      "quinces": 15989.42,
      "rape or colza seed": 1800.0,
      "raspberries": 10281.38,
      "raw hides and skins of cattle": 29.6,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 2.0,
      "raw milk of camel": 262.8,
      "raw milk of cattle": 1353.8,
      "raw milk of goats": 28.6,
      "raw milk of sheep": 34.8,
      "rice": 8072.0,
      "rye": 636.56,
      "seed cotton, unginned": 2026.34,
      "sesame seed": 714.08,
      "sisal, raw": 373.46,
      "sorghum": 1709.38,
      "soya beans": 1000.0,
      "strawberries": 48825.42,
      "string beans": 22217.22,
      "sugar beet": 53638.42,
      "sugar cane": 61473.94,
      "sunflower seed": 1423.02,
      "sweet potatoes": 18055.7,
      "tangerines, mandarins, clementines": 19140.02,
      "tomatoes": 95478.74,
      "unmanufactured tobacco": 2727.18,
      "vetches": 3331.0,
      "walnuts, in shell": 1968.66,
      "watermelons": 39234.86,
      "wheat": 1548.4
    },
    "Netherlands": {
      "apples": 37894.96,
      "asparagus": 6086.02,
      "barley": 6695.04,
      "blueberries": 9973.38,
      "broad beans and horse beans, dry": 3518.03,
      "broad beans and horse beans, green": 7479.68,
      "cabbages": 40742.04,
      "carrots and turnips": 62330.32,
      "cauliflowers and broccoli": 14760.14,
      "cherries": 14952.74,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 268570.34,
      "cucumbers and gherkins": 652913.58,
      "currants": 14308.72,
      "eggplants (aubergines)": 504938.46,
      "flax, raw or retted": 5041.08,
      "grapes": 10025.66,
      "green garlic": 13532.66,
      "leeks and other alliaceous vegetables": 38848.28,
      "lettuce and chicory": 29833.44,
      "maize (corn)": 9204.2,
      "meat of cattle with the bone, fresh or chilled": 204.2,
      "meat of chickens, fresh or chilled": 1668.4,
      "meat of goat, fresh or chilled": 13.0,
      "meat of pig with the bone, fresh or chilled": 99.6,
      "meat of sheep, fresh or chilled": 23.6,
      "oats": 4809.8,
      "onions and shallots, dry (excluding dehydrated)": 46604.92,
      "other beans, green": 12743.2,
      "other vegetables, fresh n.e.c.": 9025.02,
      "pears": 35318.02,
      "peas, green": 6282.2,
      "plums and sloes": 25001.98,
      "potatoes": 42151.08,
      "pumpkins, squash and gourds": 22568.46,
      "rape or colza seed": 3574.74,
      "raspberries": 16005.84,
      "raw milk of cattle": 9304.0,
      "raw milk of goats": 818.2,
      "raw milk of sheep": 0.0,
      "rye": 3580.9,
      "sour cherries": 17015.36,
      "spinach": 18291.32,
      "strawberries": 56668.32,
      "sugar beet": 82723.88,
      "tomatoes": 454888.66,
      "triticale": 4633.52,
      "true hemp, raw or retted": 7453.92,
      "wheat": 8281.02
    },
    "New Zealand": {
      "apples": 59144.84,
      "apricots": 7155.72,
      "asparagus": 3317.5,
      "avocados": 8081.96,
      "barley": 7306.24,
      "blueberries": 4869.06,
      "broad beans and horse beans, green": 8436.52,
      "cabbages": 75855.66,
      "cantaloupes and other melons": 14602.4,
      "carrots and turnips": 45578.34,
      "cauliflowers and broccoli": 13796.96,
      "cereals n.e.c.": 5918.82,
      "cherries": 3288.96,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 125654.0,
      "cucumbers and gherkins": 20916.22,
      "currants": 7890.18,
      "eggs from other birds in shell, fresh, n.e.c.": 3369.8,
      "gooseberries": 6020.58,
      "grapes": 12898.32,
      "green corn (maize)": 5811.52,
      "green garlic": 6036.32,
      "hen eggs in shell, fresh": 6633.0,
      "hop cones": 2476.78,
      "kiwi fruit": 44488.32,
      "leeks and other alliaceous vegetables": 43186.4,
      "lemons and limes": 19093.66,
      "lentils, dry": 2468.8,
      "lettuce and chicory": 26754.76,
      "linseed": 1335.38,
      "maize (corn)": 11325.94,
      "meat of cattle with the bone, fresh or chilled": 158.4,
      "meat of chickens, fresh or chilled": 1838.2,
      "meat of ducks, fresh or chilled": 1798.2,
      "meat of geese, fresh or chilled": 4000.0,
      "meat of goat, fresh or chilled": 11.0,
      "meat of pig with the bone, fresh or chilled": 71.4,
      "meat of sheep, fresh or chilled": 20.0,
      "meat of turkeys, fresh or chilled": 5000.0,
      "oats": 5926.1,
      "onions and shallots, green": 45002.1,
      "oranges": 12211.2,
      "other beans, green": 10488.76,
      "other berries and fruits of the genus vaccinium n.e.c.": 11876.24,
      "other citrus fruit, n.e.c.": 9075.72,
      "other fibre crops, raw, n.e.c.": 526.74,
      "other fruits, n.e.c.": 15648.34,
      "other stone fruits": 17636.78,
      "other tropical fruits, n.e.c.": 5265.56,
      "other vegetables, fresh n.e.c.": 31582.78,
      "peaches and nectarines": 175.64,
      "pears": 53676.3,
      "peas, dry": 3517.2,
      "peas, green": 6589.12,
      "persimmons": 15936.82,
      "plums and sloes": 4572.92,
      "pomelos and grapefruits": 24327.34,
      "potatoes": 51009.16,
      "pumpkins, squash and gourds": 19362.62,
      "quinces": 12206.0,
      "rape or colza seed": 2021.5,
      "raspberries": 160.92,
      "raw hides and skins of cattle": 16.0,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of cattle": 4581.2,
      "spinach": 4039.98,
      "strawberries": 14323.36,
      "sweet potatoes": 9780.94,
      "tangerines, mandarins, clementines": 990.78,
      "tomatoes": 118064.38,
      "walnuts, in shell": 1885.86,
      "watermelons": 10471.54,
      "wheat": 9743.52
    },
    "Norway": {
      "apples": 11035.12,
      "barley": 4131.72,
      "blueberries": 1872.12,
      "cabbages": 24161.76,
      "carrots and turnips": 30872.38,
      "cauliflowers and broccoli": 11681.78,
      "cherries": 5189.48,
      "cucumbers and gherkins": 221976.26,
      "currants": 1946.22,
      "green corn (maize)": 5433.28,
      "hen eggs in shell, fresh": 6633.6,
      "horse meat, fresh or chilled": 273.8,
      "leeks and other alliaceous vegetables": 25302.54,
      "lettuce and chicory": 21117.46,
      "meat of cattle with the bone, fresh or chilled": 287.4,
      "meat of chickens, fresh or chilled": 1476.4,
      "meat of ducks, fresh or chilled": 2442.0,
      "meat of geese, fresh or chilled": 4022.75,
      "meat of goat, fresh or chilled": 13.4,
      "meat of pig with the bone, fresh or chilled": 85.4,
      "meat of rabbits and hares, fresh or chilled": 1970.0,
      "meat of sheep, fresh or chilled": 20.0,
      "meat of turkeys, fresh or chilled": 9351.2,
      "oats": 3993.24,
      "onions and shallots, green": 25278.34,
      "other beans, green": 7833.56,
      "other berries and fruits of the genus vaccinium n.e.c.": 2666.98,
      "other vegetables, fresh n.e.c.": 23221.96,
      "pears": 7897.32,
      "peas, dry": 1216.48,
      "peas, green": 5746.44,
      "plums and sloes": 4685.64,
      "potatoes": 30377.64,
      "rape or colza seed": 3024.26,
      "raspberries": 6543.98,
      "raw hides and skins of cattle": 17.6,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 6.0,
      "raw milk of cattle": 7079.6,
      "raw milk of goats": 591.2,
      "rye": 4593.44,
      "strawberries": 6759.12,
      "tomatoes": 363652.28,
      "wheat": 4117.88
    },
    "Pakistan": {
      "almonds, in shell": 2261.16,
      "apples": 10548.9,
      "apricots": 11662.32,
      "bananas": 6117.76,
      "barley": 1024.24,
      "beans, dry": 767.58,
      "cabbages": 23905.72,
      "cantaloupes and other melons": 19122.04,
      "carrots and turnips": 24395.92,
      "castor oil seeds": 868.52,
      "cauliflowers and broccoli": 25144.36,
      "cherries": 3722.48,
      "chick peas, dry": 342.12,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 2356.4,
      "coconuts, in shell": 12269.48,
      "cucumbers and gherkins": 30690.8,
      "dates": 6547.74,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 44961.2,
      "eggplants (aubergines)": 14888.34,
      "eggs from other birds in shell, fresh, n.e.c.": 1236.8,
      "figs": 1904.16,
      "ginger, raw": 710.0,
      "grapes": 7415.14,
      "green garlic": 9031.7,
      "groundnuts, excluding shelled": 893.84,
      "hen eggs in shell, fresh": 3838.2,
      "jute, raw or retted": 1120.4,
      "kenaf, and other textile bast fibres, raw or retted": 605.28,
      "lemons and limes": 7825.02,
      "lentils, dry": 618.78,
      "lettuce and chicory": 1111.62,
      "linseed": 723.28,
      "maize (corn)": 6104.9,
      "mangoes, guavas and mangosteens": 12276.7,
      "meat of buffalo, fresh or chilled": 142.2,
      "meat of camels, fresh or chilled": 94.2,
      "meat of cattle with the bone, fresh or chilled": 120.6,
      "meat of chickens, fresh or chilled": 1177.4,
      "meat of ducks, fresh or chilled": 1300.0,
      "meat of goat, fresh or chilled": 12.0,
      "meat of sheep, fresh or chilled": 16.0,
      "millet": 1031.86,
      "okra": 11489.24,
      "olives": 2734.55,
      "onions and shallots, dry (excluding dehydrated)": 14742.18,
      "oranges": 10391.68,
      "other beans, green": 7169.92,
      "other berries and fruits of the genus vaccinium n.e.c.": 4577.66,
      "other citrus fruit, n.e.c.": 12177.26,
      "other fruits, n.e.c.": 7995.32,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 914.52,
      "other oil seeds, n.e.c.": 799.92,
      "other pulses n.e.c.": 806.98,
      "other stimulant, spice and aromatic crops, n.e.c.": 6280.94,
      "other tropical fruits, n.e.c.": 5050.36,
      "other vegetables, fresh n.e.c.": 14238.82,
      "papayas": 6605.32,
      "peaches and nectarines": 9151.74,
      "pears": 8203.44,
      "peas, dry": 664.5,
      "peas, green": 7716.46,
      "persimmons": 7297.76,
      "pigeon peas, dry": 709.5,
      "pistachios, in shell": 1658.28,
      "plums and sloes": 10955.8,
      "pomelos and grapefruits": 5905.46,
      "potatoes": 24844.22,
      "pumpkins, squash and gourds": 14642.54,
      "rape or colza seed": 1302.64,
      "raw hides and skins of buffaloes": 18.2,
      "raw hides and skins of cattle": 15.8,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of buffalo": 2298.0,
      "raw milk of camel": 2244.4,
      "raw milk of cattle": 1461.0,
      "raw milk of goats": 142.0,
      "raw milk of sheep": 50.2,
      "rice": 3847.32,
      "safflower seed": 2576.9,
      "seed cotton, unginned": 1738.38,
      "sesame seed": 634.06,
      "sorghum": 814.76,
      "soya beans": 772.5,
      "spinach": 12267.16,
      "strawberries": 3899.58,
      "sugar beet": 39178.8,
      "sugar cane": 70288.18,
      "sunflower seed": 1567.3,
      "sweet potatoes": 7896.48,
      "tangerines, mandarins, clementines": 16466.14,
      "tomatoes": 11378.54,
      "unmanufactured tobacco": 3081.12,
      "walnuts, in shell": 8381.8,
      "watermelons": 39006.92,
      "wheat": 3033.72
    },
    "Peru": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 1106.46,
      "apples": 17585.12,
      "apricots": 5705.36,
      "artichokes": 16614.82,
      "asparagus": 11577.86,
      "avocados": 13659.6,
      "bananas": 13568.56,
      "barley": 1812.26,
      "beans, dry": 1321.38,
      "blueberries": 12558.1,
      "broad beans and horse beans, dry": 1650.3,
      "broad beans and horse beans, green": 5806.28,
      "cabbages": 14164.24,
      "cantaloupes and other melons": 17391.58,
      "carrots and turnips": 24391.88,
      "cashew nuts, in shell": 5565.7,
      "cassava, fresh": 12537.42,
      "cauliflowers and broccoli": 13801.72,
      "cereals n.e.c.": 832.36,
      "cherries": 2914.0,
      "chestnuts, in shell": 4519.62,
      "chick peas, dry": 1419.12,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 6041.72,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 17141.22,
      "cocoa beans": 868.1,
      "coconuts, in shell": 14380.46,
      "coffee, green": 845.38,
      "cow peas, dry": 1434.16,
      "cucumbers and gherkins": 19671.14,
      "dates": 3044.88,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 6930.02,
      "eggplants (aubergines)": 12725.86,
      "figs": 6222.0,
      "ginger, raw": 7451.58,
      "grapes": 23547.86,
      "green corn (maize)": 9804.16,
      "green garlic": 11269.72,
      "groundnuts, excluding shelled": 1508.06,
      "hen eggs in shell, fresh": 7435.8,
      "jute, raw or retted": 1437.22,
      "leeks and other alliaceous vegetables": 16230.48,
      "lemons and limes": 12331.6,
      "lentils, dry": 917.82,
      "lettuce and chicory": 12020.54,
      "linseed": 851.66,
      "lupins": 1475.72,
      "maize (corn)": 3530.66,
      "mangoes, guavas and mangosteens": 11621.62,
      "meat of cattle with the bone, fresh or chilled": 147.0,
      "meat of chickens, fresh or chilled": 2257.8,
      "meat of goat, fresh or chilled": 13.0,
      "meat of other domestic camelids, fresh or chilled": 28.0,
      "meat of other domestic rodents, fresh or chilled": 253.0,
      "meat of pig with the bone, fresh or chilled": 52.8,
      "meat of rabbits and hares, fresh or chilled": 1193.6,
      "meat of sheep, fresh or chilled": 13.0,
      "oats": 1496.54,
      "oil palm fruit": 14261.64,
      "olives": 5819.5,
      "onions and shallots, dry (excluding dehydrated)": 38871.08,
      "oranges": 17310.34,
      "other beans, green": 2986.98,
      "other citrus fruit, n.e.c.": 22197.48,
      "other fruits, n.e.c.": 8931.54,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 2330.74,
      "other oil seeds, n.e.c.": 1363.8,
      "other pulses n.e.c.": 1452.64,
      "other stimulant, spice and aromatic crops, n.e.c.": 13592.54,
      "other tropical fruits, n.e.c.": 9376.66,
      "other vegetables, fresh n.e.c.": 14851.36,
      "papayas": 13652.58,
      "peaches and nectarines": 8611.82,
      "pears": 9603.34,
      "peas, dry": 1174.34,
      "peas, green": 3953.32,
      "pepper (piper spp.), raw": 2726.62,
      "pigeon peas, dry": 2918.64,
      "pineapples": 35181.4,
      "plums and sloes": 5851.68,
      "pomelos and grapefruits": 9256.22,
      "potatoes": 17632.96,
      "pumpkins, squash and gourds": 25102.76,
      "quinces": 8222.8,
      "quinoa": 1663.02,
      "raw hides and skins of cattle": 21.0,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 5.0,
      "raw milk of cattle": 2364.2,
      "raw milk of goats": 81.0,
      "rice": 8241.5,
      "rye": 1104.3,
      "seed cotton, unginned": 2696.28,
      "sesame seed": 884.92,
      "sorghum": 4011.4,
      "sour cherries": 6128.2,
      "soya beans": 2235.72,
      "spinach": 20236.56,
      "strawberries": 17554.36,
      "string beans": 3017.9,
      "sugar cane": 102665.9,
      "sweet potatoes": 17934.28,
      "tangerines, mandarins, clementines": 30217.58,
      "tea leaves": 906.26,
      "tomatoes": 42966.68,
      "unmanufactured tobacco": 9609.1,
      "walnuts, in shell": 4437.2,
      "watermelons": 29542.22,
      "wheat": 1726.86,
      "yautia": 9393.76
    },
    "Philippines": {
      "abaca, manila hemp, raw": 514.38,
      "agave fibres, raw, n.e.c.": 975.94,
      "asparagus": 8250.72,
      "avocados": 3667.92,
      "bananas": 31509.28,
      "beans, dry": 880.34,
      "cabbages": 15929.98,
      "cantaloupes and other melons": 6725.22,
      "carrots and turnips": 13077.02,
      "cashew nuts, in shell": 6580.72,
      "cassava, fresh": 11367.64,
      "castor oil seeds": 717.0,
      "cauliflowers and broccoli": 11015.92,
      "chicory roots": 8967.9,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 4863.64,
      "cocoa beans": 318.92,
      "coconuts, in shell": 4018.84,
      "coffee, green": 538.44,
      "cow peas, dry": 1668.52,
      "cucumbers and gherkins": 7138.64,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 1531.48,
      "eggplants (aubergines)": 11113.0,
      "eggs from other birds in shell, fresh, n.e.c.": 2428.2,
      "ginger, raw": 6495.2,
      "grapes": 710.88,
      "green garlic": 2475.76,
      "groundnuts, excluding shelled": 1247.06,
      "hen eggs in shell, fresh": 2273.0,
      "horse meat, fresh or chilled": 87.6,
      "leeks and other alliaceous vegetables": 5100.08,
      "lemons and limes": 2024.12,
      "lettuce and chicory": 7679.68,
      "maize (corn)": 3259.96,
      "mangoes, guavas and mangosteens": 3935.46,
      "meat of buffalo, fresh or chilled": 144.0,
      "meat of cattle with the bone, fresh or chilled": 135.6,
      "meat of chickens, fresh or chilled": 1206.2,
      "meat of ducks, fresh or chilled": 1414.4,
      "meat of geese, fresh or chilled": 1500.0,
      "meat of goat, fresh or chilled": 10.2,
      "meat of pig with the bone, fresh or chilled": 60.0,
      "meat of sheep, fresh or chilled": 13.0,
      "meat of turkeys, fresh or chilled": 4500.0,
      "natural rubber in primary forms": 1717.56,
      "oil palm fruit": 8085.32,
      "okra": 7744.9,
      "onions and shallots, dry (excluding dehydrated)": 11829.1,
      "oranges": 1302.38,
      "other beans, green": 4995.42,
      "other citrus fruit, n.e.c.": 5525.08,
      "other fibre crops, raw, n.e.c.": 2829.3,
      "other fruits, n.e.c.": 1430.78,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 3000.54,
      "other oil seeds, n.e.c.": 716.46,
      "other pulses n.e.c.": 832.22,
      "other tropical fruits, n.e.c.": 8482.02,
      "other vegetables, fresh n.e.c.": 8292.38,
      "papayas": 20557.14,
      "peas, green": 3099.64,
      "pepper (piper spp.), raw": 631.44,
      "pigeon peas, dry": 2058.94,
      "pineapples": 42375.6,
      "plantains and cooking bananas": 11848.52,
      "pomelos and grapefruits": 5127.88,
      "potatoes": 15976.92,
      "pumpkins, squash and gourds": 13381.7,
      "raw hides and skins of buffaloes": 17.2,
      "raw hides and skins of cattle": 13.4,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of cattle": 2269.8,
      "rice": 4125.72,
      "seed cotton, unginned": 1710.42,
      "sorghum": 5806.56,
      "soya beans": 1473.54,
      "spinach": 2296.38,
      "strawberries": 8752.68,
      "string beans": 7856.48,
      "sugar cane": 56240.52,
      "sweet potatoes": 6364.36,
      "tangerines, mandarins, clementines": 1177.78,
      "taro": 7021.4,
      "tomatoes": 14103.18,
      "unmanufactured tobacco": 1761.76,
      "watermelons": 15509.84,
      "yams": 5429.9
    },
    "Poland": {
      "apples": 25063.12,
      "apricots": 3734.12,
      "asparagus": 8520.1,
      "barley": 4295.68,
      "blueberries": 5287.02,
      "broad beans and horse beans, dry": 2718.82,
      "broad beans and horse beans, green": 7359.44,
      "cabbages": 43303.72,
      "carrots and turnips": 37378.2,
      "cauliflowers and broccoli": 20711.92,
      "cereals n.e.c.": 1555.96,
      "cherries": 6259.6,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 93993.26,
      "cucumbers and gherkins": 64055.56,
      "currants": 3067.52,
      "eggplants (aubergines)": 7833.33,
      "flax, raw or retted": 2604.54,
      "grapes": 4472.5,
      "green garlic": 10276.28,
      "hazelnuts, in shell": 1644.44,
      "hen eggs in shell, fresh": 228.6,
      "hop cones": 1888.64,
      "leeks and other alliaceous vegetables": 24489.1,
      "lettuce and chicory": 22280.76,
      "linseed": 1419.16,
      "lupins": 1719.0,
      "maize (corn)": 7152.8,
      "meat of cattle with the bone, fresh or chilled": 300.0,
      "meat of chickens, fresh or chilled": 1865.0,
      "meat of ducks, fresh or chilled": 2282.6,
      "meat of goat, fresh or chilled": 21.75,
      "meat of pig with the bone, fresh or chilled": 94.0,
      "meat of sheep, fresh or chilled": 17.0,
      "meat of turkeys, fresh or chilled": 10113.6,
      "mixed grain": 3322.56,
      "oats": 3137.76,
      "onions and shallots, dry (excluding dehydrated)": 27867.44,
      "other beans, green": 9375.36,
      "other berries and fruits of the genus vaccinium n.e.c.": 3898.56,
      "other oil seeds, n.e.c.": 1515.48,
      "other pome fruits": 5277.77,
      "other pulses n.e.c.": 2335.92,
      "other stone fruits": 4500.0,
      "other vegetables, fresh n.e.c.": 16800.0,
      "peaches and nectarines": 5935.7,
      "pears": 12821.02,
      "peas, dry": 2106.88,
      "peas, green": 5654.7,
      "plums and sloes": 6879.16,
      "potatoes": 31074.22,
      "pumpkins, squash and gourds": 42468.78,
      "rape or colza seed": 3137.5,
      "raspberries": 5087.9,
      "raw milk of cattle": 7366.6,
      "rye": 3441.44,
      "sour cherries": 6203.62,
      "soya beans": 2385.94,
      "spinach": 11640.0,
      "strawberries": 5674.68,
      "sugar beet": 63378.48,
      "sunflower seed": 2234.56,
      "tomatoes": 108816.42,
      "triticale": 4336.98,
      "true hemp, raw or retted": 4784.24,
      "unmanufactured tobacco": 2088.94,
      "walnuts, in shell": 2679.78,
      "watermelons": 27041.67,
      "wheat": 5167.18
    },
    "Portugal": {
      "almonds, in shell": 847.42,
      "apples": 22312.48,
      "apricots": 5770.5,
      "asparagus": 2954.42,
      "avocados": 8382.86,
      "bananas": 24485.26,
      "barley": 2896.28,
      "blueberries": 7311.98,
      "broad beans and horse beans, dry": 646.22,
      "broad beans and horse beans, green": 6478.66,
      "cabbages": 28692.06,
      "cantaloupes and other melons": 29721.3,
      "carrots and turnips": 52804.08,
      "cauliflowers and broccoli": 14367.94,
      "cereals n.e.c.": 1169.88,
      "cherries": 2436.16,
      "chestnuts, in shell": 604.1,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 41846.1,
      "cucumbers and gherkins": 64892.84,
      "currants": 2041.52,
      "eggplants (aubergines)": 67042.22,
      "figs": 1049.0,
      "grapes": 5310.08,
      "green garlic": 15079.14,
      "hazelnuts, in shell": 464.76,
      "hen eggs in shell, fresh": 6801.6,
      "hop cones": 2000.0,
      "horse meat, fresh or chilled": 204.2,
      "kiwi fruit": 13350.56,
      "leeks and other alliaceous vegetables": 26509.44,
      "lemons and limes": 18343.44,
      "lettuce and chicory": 25839.94,
      "maize (corn)": 9744.52,
      "meat of cattle with the bone, fresh or chilled": 248.0,
      "meat of chickens, fresh or chilled": 1458.0,
      "meat of ducks, fresh or chilled": 2482.4,
      "meat of goat, fresh or chilled": 7.0,
      "meat of pig with the bone, fresh or chilled": 65.6,
      "meat of sheep, fresh or chilled": 12.4,
      "meat of turkeys, fresh or chilled": 11701.8,
      "oats": 1171.56,
      "olives": 2858.32,
      "onions and shallots, dry (excluding dehydrated)": 36730.1,
      "oranges": 19934.78,
      "other beans, green": 13400.76,
      "other berries and fruits of the genus vaccinium n.e.c.": 15349.92,
      "other pome fruits": 7055.48,
      "other pulses n.e.c.": 793.2,
      "other stone fruits": 3272.5,
      "other tropical fruits, n.e.c.": 2448.4,
      "other vegetables, fresh n.e.c.": 18062.9,
      "peaches and nectarines": 9523.74,
      "pears": 13423.18,
      "peas, green": 5074.8,
      "plums and sloes": 11099.6,
      "pomelos and grapefruits": 10400.0,
      "potatoes": 22837.0,
      "pumpkins, squash and gourds": 27086.86,
      "raspberries": 19861.0,
      "raw milk of cattle": 8801.2,
      "raw milk of goats": 101.2,
      "raw milk of sheep": 294.6,
      "rice": 5885.36,
      "rye": 1060.24,
      "sour cherries": 1606.66,
      "spinach": 12206.48,
      "strawberries": 32355.76,
      "sunflower seed": 1734.92,
      "tangerines, mandarins, clementines": 13956.92,
      "tomatoes": 95488.74,
      "triticale": 1420.66,
      "walnuts, in shell": 1436.24,
      "watermelons": 37390.1,
      "wheat": 2392.6
    },
    "South Korea": {
      "apples": 14043.46,
      "barley": 2685.32,
      "beans, dry": 1420.78,
      "buckwheat": 916.66,
      "cabbages": 65557.0,
      "cantaloupes and other melons": 43382.52,
      "carrots and turnips": 35857.92,
      "castor oil seeds": 1051.52,
      "cauliflowers and broccoli": 10566.06,
      "cereals n.e.c.": 1987.64,
      "chestnuts, in shell": 1731.16,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 6740.74,
      "cucumbers and gherkins": 70957.78,
      "eggplants (aubergines)": 16893.08,
      "eggs from other birds in shell, fresh, n.e.c.": 3723.2,
      "ginger, raw": 10972.8,
      "grapes": 12801.44,
      "green garlic": 13132.8,
      "groundnuts, excluding shelled": 2570.36,
      "hen eggs in shell, fresh": 4193.2,
      "kiwi fruit": 15596.42,
      "leeks and other alliaceous vegetables": 47174.9,
      "lettuce and chicory": 25599.62,
      "maize (corn)": 5809.48,
      "meat of cattle with the bone, fresh or chilled": 325.8,
      "meat of chickens, fresh or chilled": 881.8,
      "meat of ducks, fresh or chilled": 3442.0,
      "meat of geese, fresh or chilled": 2000.0,
      "meat of goat, fresh or chilled": 14.0,
      "meat of pig with the bone, fresh or chilled": 76.4,
      "meat of rabbits and hares, fresh or chilled": 2326.8,
      "meat of sheep, fresh or chilled": 12.0,
      "millet": 1000.0,
      "onions and shallots, dry (excluding dehydrated)": 72745.44,
      "onions and shallots, green": 27170.28,
      "other citrus fruit, n.e.c.": 5961.52,
      "other fruits, n.e.c.": 4690.16,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 2113.62,
      "other oil seeds, n.e.c.": 1143.56,
      "other pulses n.e.c.": 1807.84,
      "other vegetables, fresh n.e.c.": 47704.9,
      "peaches and nectarines": 9396.52,
      "pears": 20066.54,
      "peas, dry": 1382.26,
      "persimmons": 9305.98,
      "pineapples": 29521.34,
      "plums and sloes": 7371.14,
      "potatoes": 24397.82,
      "pumpkins, squash and gourds": 31444.06,
      "rape or colza seed": 1000.0,
      "raw hides and skins of cattle": 38.2,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 2.6,
      "raw milk of cattle": 10036.8,
      "raw milk of goats": 130.2,
      "rice": 6850.02,
      "rye": 2797.14,
      "sesame seed": 450.0,
      "sorghum": 1764.68,
      "soya beans": 1944.34,
      "spinach": 13162.26,
      "strawberries": 28763.32,
      "sweet potatoes": 15461.92,
      "tangerines, mandarins, clementines": 28732.6,
      "tea leaves": 5423.48,
      "tomatoes": 62194.94,
      "true hemp, raw or retted": 1477.2,
      "unmanufactured tobacco": 2406.62,
      "walnuts, in shell": 1940.7,
      "watermelons": 41157.98,
      "wheat": 4010.26
    },
    "Romania": {
      "apples": 10055.32,
      "apricots": 12518.28,
      "asparagus": 1235.3,
      "barley": 3831.72,
      "blueberries": 3295.6,
      "broad beans and horse beans, dry": 1071.7,
      "broad beans and horse beans, green": 1750.0,
      "cabbages": 22147.16,
      "cantaloupes and other melons": 16087.06,
      "carrots and turnips": 12996.52,
      "cauliflowers and broccoli": 15208.48,
      "cereals n.e.c.": 1734.0,
      "cherries": 10414.64,
      "chestnuts, in shell": 6000.0,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 12523.58,
      "cucumbers and gherkins": 21099.54,
      "currants": 1431.82,
      "eggplants (aubergines)": 16395.22,
      "flax, raw or retted": 2528.44,
      "grapes": 5208.7,
      "green garlic": 4771.9,
      "hazelnuts, in shell": 1519.02,
      "hen eggs in shell, fresh": 149.0,
      "hop cones": 945.08,
      "leeks and other alliaceous vegetables": 12950.0,
      "lettuce and chicory": 16046.68,
      "linseed": 1502.98,
      "lupins": 1252.2,
      "maize (corn)": 3976.76,
      "meat of cattle with the bone, fresh or chilled": 135.0,
      "meat of chickens, fresh or chilled": 1664.25,
      "meat of goat, fresh or chilled": 7.6,
      "meat of pig with the bone, fresh or chilled": 93.0,
      "meat of sheep, fresh or chilled": 10.0,
      "oats": 2130.92,
      "onions and shallots, dry (excluding dehydrated)": 10854.36,
      "other beans, green": 4671.64,
      "other berries and fruits of the genus vaccinium n.e.c.": 1470.58,
      "other oil seeds, n.e.c.": 1047.14,
      "other pome fruits": 20648.58,
      "other pulses n.e.c.": 1153.16,
      "other vegetables, fresh n.e.c.": 8763.64,
      "peaches and nectarines": 9432.98,
      "pears": 13818.22,
      "peas, dry": 1522.34,
      "peas, green": 2068.62,
      "plums and sloes": 10384.74,
      "potatoes": 15561.24,
      "pumpkins, squash and gourds": 14831.04,
      "rape or colza seed": 2581.38,
      "raspberries": 1917.36,
      "raw milk of cattle": 3394.8,
      "raw milk of goats": 191.2,
      "raw milk of sheep": 54.4,
      "rice": 4535.32,
      "rye": 2692.64,
      "sorghum": 3170.96,
      "sour cherries": 11418.3,
      "soya beans": 2197.76,
      "spinach": 11024.24,
      "strawberries": 7059.94,
      "sugar beet": 35165.82,
      "sunflower seed": 1879.44,
      "tomatoes": 20444.16,
      "triticale": 3436.28,
      "true hemp, raw or retted": 3248.48,
      "unmanufactured tobacco": 1142.86,
      "walnuts, in shell": 19877.22,
      "watermelons": 23467.36,
      "wheat": 4002.08
    },
    "Russia": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 905.5,
      "apples": 10126.38,
      "apricots": 5943.18,
      "barley": 2606.82,
      "beans, dry": 1457.08,
      "blueberries": 5390.32,
      "broad beans and horse beans, dry": 1914.66,
      "broad beans and horse beans, green": 1431.38,
      "buckwheat": 1084.72,
      "cabbages": 35902.04,
      "carrots and turnips": 31483.16,
      "castor oil seeds": 427.18,
      "cauliflowers and broccoli": 11052.08,
      "cereals n.e.c.": 397.56,
      "cherries": 4991.94,
      "chick peas, dry": 1093.94,
      "chicory roots": 7556.78,
      "cucumbers and gherkins": 45579.24,
      "currants": 6744.66,
      "flax, raw or retted": 760.18,
      "gooseberries": 4417.48,
      "grapes": 10455.84,
      "green garlic": 9037.18,
      "hempseed": 339.24,
      "hen eggs in shell, fresh": 6617.2,
      "hop cones": 1584.8,
      "horse meat, fresh or chilled": 180.6,
      "kenaf, and other textile bast fibres, raw or retted": 4034.16,
      "lentils, dry": 1044.2,
      "linseed": 868.98,
      "lupins": 1999.9,
      "maize (corn)": 5601.64,
      "meat of camels, fresh or chilled": 242.8,
      "meat of cattle with the bone, fresh or chilled": 216.6,
      "meat of chickens, fresh or chilled": 1988.0,
      "meat of goat, fresh or chilled": 18.0,
      "meat of pig with the bone, fresh or chilled": 94.6,
      "meat of rabbits and hares, fresh or chilled": 2483.8,
      "meat of sheep, fresh or chilled": 18.0,
      "millet": 1383.88,
      "mustard seed": 711.22,
      "oats": 1870.62,
      "onions and shallots, dry (excluding dehydrated)": 31067.16,
      "oranges": 3419.32,
      "other berries and fruits of the genus vaccinium n.e.c.": 4171.08,
      "other fruits, n.e.c.": 737.1,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 4089.68,
      "other oil seeds, n.e.c.": 774.04,
      "other pulses n.e.c.": 1727.46,
      "other vegetables, fresh n.e.c.": 21157.84,
      "peaches and nectarines": 6861.14,
      "pears": 8702.3,
      "peas, dry": 2203.04,
      "peas, green": 4438.06,
      "plums and sloes": 4111.7,
      "potatoes": 17033.08,
      "pumpkins, squash and gourds": 21337.18,
      "quinces": 13084.5,
      "rape or colza seed": 1856.96,
      "raspberries": 6509.24,
      "raw hides and skins of cattle": 26.0,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 2.0,
      "raw milk of camel": 154.2,
      "raw milk of cattle": 5098.8,
      "raw milk of goats": 336.6,
      "raw milk of sheep": 1.8,
      "rice": 5783.5,
      "rye": 2170.06,
      "safflower seed": 673.58,
      "sorghum": 1295.36,
      "sour cherries": 6434.42,
      "soya beans": 1718.98,
      "strawberries": 6497.56,
      "sugar beet": 44448.32,
      "sunflower seed": 1723.44,
      "tea leaves": 486.76,
      "tomatoes": 36869.42,
      "triticale": 2708.34,
      "true hemp, raw or retted": 380.46,
      "unmanufactured tobacco": 1022.38,
      "vetches": 1714.52,
      "watermelons": 17565.36,
      "wheat": 3107.86
    },
    "Slovakia": {
      "apples": 18629.76,
      "apricots": 1760.54,
      "asparagus": 2406.35,
      "barley": 5066.62,
      "blueberries": 2188.56,
      "broad beans and horse beans, dry": 1029.15,
      "cabbages": 26566.5,
      "cantaloupes and other melons": 11666.66,
      "carrots and turnips": 36071.62,
      "cauliflowers and broccoli": 11916.68,
      "cereals n.e.c.": 1062.9,
      "cherries": 4250.0,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 22714.38,
      "cucumbers and gherkins": 206366.66,
      "currants": 1022.24,
      "eggplants (aubergines)": 11000.0,
      "grapes": 5431.5,
      "green garlic": 7122.28,
      "hen eggs in shell, fresh": 262.0,
      "lettuce and chicory": 7000.0,
      "linseed": 978.68,
      "lupins": 952.48,
      "maize (corn)": 7173.82,
      "meat of cattle with the bone, fresh or chilled": 291.0,
      "meat of goat, fresh or chilled": 12.0,
      "meat of pig with the bone, fresh or chilled": 93.6,
      "meat of sheep, fresh or chilled": 14.8,
      "oats": 2414.1,
      "onions and shallots, dry (excluding dehydrated)": 34178.72,
      "other beans, green": 1453.7,
      "other berries and fruits of the genus vaccinium n.e.c.": 1881.52,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 0.0,
      "other oil seeds, n.e.c.": 646.42,
      "other pulses n.e.c.": 1330.06,
      "other vegetables, fresh n.e.c.": 10001.9,
      "peaches and nectarines": 3927.4,
      "pears": 10652.32,
      "peas, dry": 2285.46,
      "peas, green": 2470.68,
      "plums and sloes": 2300.54,
      "potatoes": 24947.52,
      "pumpkins, squash and gourds": 4641.76,
      "rape or colza seed": 3149.9,
      "raspberries": 3000.0,
      "raw milk of cattle": 7769.8,
      "rye": 3507.14,
      "sorghum": 3920.2,
      "sour cherries": 500.0,
      "soya beans": 2309.04,
      "spinach": 5693.2,
      "strawberries": 5855.36,
      "sugar beet": 60371.02,
      "sunflower seed": 2589.2,
      "tomatoes": 79190.52,
      "triticale": 3433.68,
      "true hemp, raw or retted": 1142.9,
      "unmanufactured tobacco": 0.0,
      "walnuts, in shell": 118.3,
      "watermelons": 46341.9,
      "wheat": 5532.8
    },
    "Slovenia": {
      "almonds, in shell": 600.0,
      "apples": 21499.62,
      "apricots": 4666.66,
      "asparagus": 2948.88,
      "barley": 5073.78,
      "blueberries": 5485.72,
      "cabbages": 26360.18,
      "cantaloupes and other melons": 19800.0,
      "carrots and turnips": 20955.24,
      "cauliflowers and broccoli": 13989.6,
      "cereals n.e.c.": 842.54,
      "cherries": 4829.46,
      "chestnuts, in shell": 3125.4,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 19384.64,
      "cucumbers and gherkins": 19213.8,
      "currants": 1800.0,
      "eggplants (aubergines)": 18066.66,
      "figs": 3600.0,
      "grapes": 5677.22,
      "green garlic": 5235.0,
      "hazelnuts, in shell": 1445.36,
      "hen eggs in shell, fresh": 263.8,
      "hop cones": 1534.62,
      "kiwi fruit": 7500.0,
      "leeks and other alliaceous vegetables": 16927.62,
      "lettuce and chicory": 13863.82,
      "maize (corn)": 8971.24,
      "meat of cattle with the bone, fresh or chilled": 301.4,
      "meat of chickens, fresh or chilled": 1685.6,
      "meat of goat, fresh or chilled": 14.4,
      "meat of pig with the bone, fresh or chilled": 95.8,
      "meat of sheep, fresh or chilled": 14.6,
      "meat of turkeys, fresh or chilled": 11257.2,
      "oats": 3200.58,
      "olives": 1491.32,
      "onions and shallots, dry (excluding dehydrated)": 20541.76,
      "other beans, green": 4724.28,
      "other berries and fruits of the genus vaccinium n.e.c.": 3956.66,
      "other oil seeds, n.e.c.": 584.06,
      "other pome fruits": 9750.0,
      "other pulses n.e.c.": 1604.66,
      "other tropical fruits, n.e.c.": 9741.04,
      "other vegetables, fresh n.e.c.": 16193.18,
      "peaches and nectarines": 6790.14,
      "pears": 13184.94,
      "peas, dry": 2350.54,
      "peas, green": 3737.64,
      "plums and sloes": 5948.8,
      "potatoes": 24658.74,
      "pumpkins, squash and gourds": 22786.62,
      "rape or colza seed": 2681.04,
      "raspberries": 5533.34,
      "raw milk of cattle": 6483.4,
      "raw milk of goats": 413.6,
      "raw milk of sheep": 157.0,
      "rye": 3955.04,
      "sorghum": 3187.98,
      "sour cherries": 4000.0,
      "soya beans": 2661.96,
      "spinach": 8183.32,
      "strawberries": 16323.52,
      "sugar beet": 63730.4,
      "sunflower seed": 2354.02,
      "tomatoes": 43568.68,
      "triticale": 4799.52,
      "walnuts, in shell": 1619.6,
      "watermelons": 26100.0,
      "wheat": 5513.38
    },
    "South Africa": {
      "apples": 41813.32,
      "apricots": 8414.9,
      "asparagus": 4357.84,
      "avocados": 5076.3,
      "bananas": 61325.84,
      "barley": 3576.7,
      "beans, dry": 1276.62,
      "buckwheat": 400.48,
      "cabbages": 58592.06,
      "cantaloupes and other melons": 9356.32,
      "carrots and turnips": 29603.3,
      "castor oil seeds": 737.14,
      "cauliflowers and broccoli": 11654.98,
      "cereals n.e.c.": 503.62,
      "cherries": 1621.92,
      "chicory roots": 5631.94,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 2138.68,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 8494.16,
      "cow peas, dry": 436.08,
      "cucumbers and gherkins": 17741.98,
      "figs": 3330.08,
      "grapes": 17706.94,
      "green corn (maize)": 10616.26,
      "groundnuts, excluding shelled": 1415.28,
      "hen eggs in shell, fresh": 4946.4,
      "hop cones": 1149.12,
      "horse meat, fresh or chilled": 183.0,
      "kenaf, and other textile bast fibres, raw or retted": 667.9,
      "lemons and limes": 21557.28,
      "lettuce and chicory": 15423.9,
      "lupins": 1120.0,
      "maize (corn)": 5698.84,
      "mangoes, guavas and mangosteens": 17403.34,
      "meat of cattle with the bone, fresh or chilled": 326.6,
      "meat of chickens, fresh or chilled": 1834.8,
      "meat of ducks, fresh or chilled": 2500.0,
      "meat of geese, fresh or chilled": 3500.0,
      "meat of goat, fresh or chilled": 15.2,
      "meat of pig with the bone, fresh or chilled": 92.6,
      "meat of sheep, fresh or chilled": 31.6,
      "meat of turkeys, fresh or chilled": 8000.0,
      "millet": 489.38,
      "oats": 1539.02,
      "onions and shallots, dry (excluding dehydrated)": 24941.28,
      "oranges": 44729.16,
      "other beans, green": 5092.1,
      "other berries and fruits of the genus vaccinium n.e.c.": 10116.92,
      "other citrus fruit, n.e.c.": 43021.78,
      "other fibre crops, raw, n.e.c.": 746.9,
      "other fruits, n.e.c.": 11973.92,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 3486.58,
      "other oil seeds, n.e.c.": 2759.44,
      "other vegetables, fresh n.e.c.": 10734.76,
      "papayas": 9136.18,
      "peaches and nectarines": 18343.88,
      "pears": 37071.42,
      "peas, dry": 1004.98,
      "peas, green": 2443.26,
      "pineapples": 11255.44,
      "plums and sloes": 7782.72,
      "pomelos and grapefruits": 30999.24,
      "potatoes": 37450.74,
      "pumpkins, squash and gourds": 7692.12,
      "quinces": 12340.6,
      "rape or colza seed": 1890.0,
      "raw hides and skins of cattle": 40.8,
      "raw hides and skins of goats or kids": 1.0,
      "raw hides and skins of sheep or lambs": 4.6,
      "raw milk of cattle": 3821.2,
      "rice": 2873.52,
      "rye": 1097.86,
      "seed cotton, unginned": 2507.82,
      "sisal, raw": 620.12,
      "sorghum": 3192.64,
      "soya beans": 2097.78,
      "strawberries": 12182.36,
      "sugar cane": 70255.2,
      "sunflower seed": 1349.24,
      "sweet potatoes": 2654.44,
      "tangerines, mandarins, clementines": 29495.52,
      "tea leaves": 2059.86,
      "tomatoes": 65410.28,
      "unmanufactured tobacco": 2630.68,
      "watermelons": 16341.54,
      "wheat": 3973.26
    },
    "Spain": {
      "almonds, in shell": 453.06,
      "apples": 18733.42,
      "apricots": 6362.0,
      "artichokes": 14308.84,
      "asparagus": 4043.24,
      "avocados": 5550.36,
      "bananas": 46312.58,
      "barley": 3136.32,
      "blueberries": 12624.66,
      "broad beans and horse beans, dry": 1240.12,
      "broad beans and horse beans, green": 8070.0,
      "cabbages": 22862.5,
      "cantaloupes and other melons": 33088.1,
      "carrots and turnips": 56125.82,
      "cauliflowers and broccoli": 17080.3,
      "cereals n.e.c.": 2617.06,
      "cherries": 3812.6,
      "chestnuts, in shell": 4732.96,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 66664.26,
      "cucumbers and gherkins": 94098.76,
      "currants": 3900.0,
      "eggplants (aubergines)": 76345.78,
      "figs": 3099.64,
      "flax, raw or retted": 1833.33,
      "grapes": 6300.86,
      "green garlic": 9600.46,
      "hazelnuts, in shell": 487.54,
      "hen eggs in shell, fresh": 7143.6,
      "hop cones": 1669.54,
      "horse meat, fresh or chilled": 266.2,
      "kiwi fruit": 16637.56,
      "leeks and other alliaceous vegetables": 26151.72,
      "lemons and limes": 19897.24,
      "lettuce and chicory": 28416.84,
      "linseed": 811.26,
      "lupins": 834.28,
      "maize (corn)": 12089.68,
      "meat of cattle with the bone, fresh or chilled": 283.4,
      "meat of chickens, fresh or chilled": 1966.6,
      "meat of ducks, fresh or chilled": 4350.0,
      "meat of goat, fresh or chilled": 8.4,
      "meat of pig with the bone, fresh or chilled": 90.2,
      "meat of rabbits and hares, fresh or chilled": 1239.2,
      "meat of sheep, fresh or chilled": 12.4,
      "meat of turkeys, fresh or chilled": 8503.6,
      "mixed grain": 2274.26,
      "oats": 2047.58,
      "olives": 2561.86,
      "onions and shallots, dry (excluding dehydrated)": 52967.46,
      "oranges": 21534.28,
      "other beans, green": 18868.52,
      "other berries and fruits of the genus vaccinium n.e.c.": 13409.48,
      "other citrus fruit, n.e.c.": 934.5,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 286.14,
      "other oil seeds, n.e.c.": 1155.74,
      "other pome fruits": 10643.1,
      "other pulses n.e.c.": 952.08,
      "other stone fruits": 3120.92,
      "other tropical fruits, n.e.c.": 15218.38,
      "other vegetables, fresh n.e.c.": 18489.04,
      "peaches and nectarines": 17492.82,
      "pears": 14535.66,
      "peas, dry": 1326.56,
      "peas, green": 6808.02,
      "plums and sloes": 11852.94,
      "pomelos and grapefruits": 26354.08,
      "potatoes": 32016.0,
      "pumpkins, squash and gourds": 46204.3,
      "rape or colza seed": 2219.86,
      "raspberries": 18554.64,
      "raw milk of cattle": 9485.4,
      "raw milk of goats": 275.0,
      "raw milk of sheep": 254.2,
      "rice": 6779.02,
      "rye": 2255.98,
      "seed cotton, unginned": 2780.73,
      "sorghum": 4019.96,
      "sour cherries": 3403.32,
      "soya beans": 3144.76,
      "spinach": 17621.12,
      "strawberries": 44622.48,
      "sugar beet": 82754.02,
      "sunflower seed": 1145.12,
      "tangerines, mandarins, clementines": 19370.18,
      "tomatoes": 81009.1,
      "triticale": 2386.26,
      "true hemp, raw or retted": 2578.78,
      "unmanufactured tobacco": 2979.04,
      "walnuts, in shell": 1403.12,
      "watermelons": 55775.28,
      "wheat": 3399.0
    },
    "Sweden": {
      "apples": 21632.54,
      "asparagus": 1869.66,
      "barley": 4465.04,
      "blueberries": 2130.0,
      "broad beans and horse beans, dry": 2874.38,
      "cabbages": 30155.78,
      "carrots and turnips": 65444.1,
      "cauliflowers and broccoli": 11381.54,
      "cucumbers and gherkins": 173167.76,
      "currants": 833.1,
      "grapes": 1883.32,
      "green garlic": 4400.0,
      "hen eggs in shell, fresh": 5644.25,
      "horse meat, fresh or chilled": 270.4,
      "leeks and other alliaceous vegetables": 30976.4,
      "lettuce and chicory": 14093.62,
      "linseed": 1545.76,
      "maize (corn)": 7390.16,
      "meat of cattle with the bone, fresh or chilled": 324.2,
      "meat of chickens, fresh or chilled": 1575.2,
      "meat of goat, fresh or chilled": 11.6,
      "meat of pig with the bone, fresh or chilled": 94.8,
      "meat of sheep, fresh or chilled": 20.8,
      "meat of turkeys, fresh or chilled": 8998.0,
      "mixed grain": 3247.38,
      "oats": 3904.64,
      "onions and shallots, dry (excluding dehydrated)": 47302.58,
      "other beans, green": 2652.28,
      "other berries and fruits of the genus vaccinium n.e.c.": 964.44,
      "other pulses n.e.c.": 2097.34,
      "other vegetables, fresh n.e.c.": 8341.22,
      "pears": 15583.44,
      "peas, dry": 2848.68,
      "peas, green": 3354.46,
      "plums and sloes": 5710.0,
      "potatoes": 36187.42,
      "pumpkins, squash and gourds": 25630.12,
      "rape or colza seed": 3119.94,
      "raspberries": 4138.9,
      "raw milk of cattle": 9425.8,
      "rye": 5800.92,
      "sour cherries": 3973.34,
      "spinach": 3001.42,
      "strawberries": 8383.48,
      "sugar beet": 67916.0,
      "tomatoes": 401830.0,
      "triticale": 5216.14,
      "wheat": 6418.84
    },
    "Switzerland": {
      "apples": 53816.46,
      "apricots": 8833.78,
      "artichokes": 249.98,
      "asparagus": 1629.12,
      "barley": 6044.52,
      "blueberries": 5753.52,
      "broad beans and horse beans, dry": 2266.9,
      "broad beans and horse beans, green": 2200.74,
      "cabbages": 28549.02,
      "cantaloupes and other melons": 1517.14,
      "carrots and turnips": 27881.28,
      "cauliflowers and broccoli": 8900.1,
      "cereals n.e.c.": 3278.16,
      "cherries": 12301.14,
      "chestnuts, in shell": 1262.34,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 37412.28,
      "cucumbers and gherkins": 129914.0,
      "currants": 8465.2,
      "gooseberries": 8622.08,
      "grapes": 7291.86,
      "green corn (maize)": 1868.44,
      "green garlic": 3635.36,
      "hen eggs in shell, fresh": 7318.6,
      "hop cones": 1775.82,
      "horse meat, fresh or chilled": 246.2,
      "kiwi fruit": 16566.76,
      "leeks and other alliaceous vegetables": 26835.78,
      "lettuce and chicory": 17944.16,
      "linseed": 1950.54,
      "lupins": 2175.96,
      "maize (corn)": 9472.72,
      "meat of cattle with the bone, fresh or chilled": 239.6,
      "meat of chickens, fresh or chilled": 1255.4,
      "meat of goat, fresh or chilled": 12.4,
      "meat of pig with the bone, fresh or chilled": 90.2,
      "meat of rabbits and hares, fresh or chilled": 805.2,
      "meat of sheep, fresh or chilled": 22.0,
      "meat of turkeys, fresh or chilled": 5474.8,
      "millet": 2983.38,
      "mixed grain": 4215.42,
      "oats": 4263.44,
      "onions and shallots, dry (excluding dehydrated)": 33882.92,
      "onions and shallots, green": 13477.28,
      "other beans, green": 7249.54,
      "other berries and fruits of the genus vaccinium n.e.c.": 5040.28,
      "other fruits, n.e.c.": 28536.88,
      "other oil seeds, n.e.c.": 961.68,
      "other vegetables, fresh n.e.c.": 24456.22,
      "peaches and nectarines": 15222.58,
      "pears": 48294.14,
      "peas, dry": 2502.62,
      "peas, green": 4925.22,
      "plums and sloes": 24631.7,
      "potatoes": 36086.22,
      "pumpkins, squash and gourds": 16194.66,
      "quinces": 58822.8,
      "rape or colza seed": 3333.36,
      "raspberries": 20604.08,
      "raw hides and skins of cattle": 30.0,
      "raw hides and skins of goats or kids": 1.0,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of cattle": 7055.2,
      "raw milk of goats": 630.4,
      "raw milk of sheep": 449.8,
      "rye": 4883.36,
      "soya beans": 2371.5,
      "spinach": 16508.18,
      "strawberries": 17425.88,
      "sugar beet": 73695.72,
      "sunflower seed": 2555.28,
      "tomatoes": 204973.02,
      "triticale": 5425.4,
      "unmanufactured tobacco": 2082.86,
      "walnuts, in shell": 1363.88,
      "wheat": 5126.42
    },
    "Thailand": {
      "areca nuts": 1686.06,
      "asparagus": 14209.9,
      "bananas": 22309.72,
      "barley": 2421.82,
      "beans, dry": 762.0,
      "broad beans and horse beans, green": 6781.22,
      "cabbages": 25788.02,
      "canary seed": 398.94,
      "cashew nuts, in shell": 1603.92,
      "cassava, fresh": 20734.1,
      "castor oil seeds": 883.5,
      "cauliflowers and broccoli": 13074.6,
      "cereals n.e.c.": 2516.4,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 3745.2,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 13639.98,
      "cocoa beans": 2853.36,
      "coconuts, in shell": 6920.26,
      "coffee, green": 566.88,
      "cucumbers and gherkins": 9244.14,
      "edible roots and tubers with high starch or inulin content, n.e.c., fresh": 16447.38,
      "eggplants (aubergines)": 28915.48,
      "eggs from other birds in shell, fresh, n.e.c.": 4416.8,
      "ginger, raw": 16836.7,
      "grapes": 16866.24,
      "green corn (maize)": 9725.26,
      "green garlic": 6653.02,
      "groundnuts, excluding shelled": 2260.2,
      "hen eggs in shell, fresh": 3106.8,
      "jute, raw or retted": 1948.92,
      "kapok fruit": 3605.62,
      "kenaf, and other textile bast fibres, raw or retted": 1396.1,
      "lemons and limes": 9939.0,
      "lettuce and chicory": 8595.14,
      "maize (corn)": 4597.98,
      "mangoes, guavas and mangosteens": 8857.86,
      "meat of buffalo, fresh or chilled": 262.4,
      "meat of cattle with the bone, fresh or chilled": 151.4,
      "meat of chickens, fresh or chilled": 1412.0,
      "meat of ducks, fresh or chilled": 2896.6,
      "meat of geese, fresh or chilled": 2358.6,
      "meat of goat, fresh or chilled": 15.0,
      "meat of pig with the bone, fresh or chilled": 75.0,
      "meat of sheep, fresh or chilled": 11.6,
      "natural rubber in primary forms": 1359.9,
      "oil palm fruit": 18087.92,
      "onions and shallots, dry (excluding dehydrated)": 25054.96,
      "onions and shallots, green": 18002.04,
      "oranges": 20889.16,
      "other beans, green": 1720.58,
      "other citrus fruit, n.e.c.": 4682.82,
      "other fibre crops, raw, n.e.c.": 825.84,
      "other fruits, n.e.c.": 17369.6,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1263.34,
      "other pulses n.e.c.": 1170.98,
      "other stimulant, spice and aromatic crops, n.e.c.": 1563.94,
      "other tropical fruits, n.e.c.": 6150.42,
      "other vegetables, fresh n.e.c.": 12055.44,
      "papayas": 39914.62,
      "peas, green": 12962.82,
      "pepper (piper spp.), raw": 3079.16,
      "pineapples": 23401.64,
      "pomelos and grapefruits": 13951.98,
      "potatoes": 18440.2,
      "pumpkins, squash and gourds": 20236.5,
      "raw hides and skins of buffaloes": 31.2,
      "raw hides and skins of cattle": 15.6,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 2.0,
      "raw milk of cattle": 4652.8,
      "rice": 2949.98,
      "seed cotton, unginned": 1653.92,
      "sesame seed": 690.26,
      "sisal, raw": 282.68,
      "sorghum": 1851.9,
      "soya beans": 1642.74,
      "sugar cane": 53934.64,
      "sunflower seed": 821.42,
      "tangerines, mandarins, clementines": 13956.24,
      "taro": 10146.56,
      "tea leaves": 5030.54,
      "tomatoes": 21621.8,
      "unmanufactured tobacco": 3308.54,
      "watermelons": 23408.44,
      "wheat": 1020.06
    },
    "Turkey": {
      "almonds, in shell": 2836.08,
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 739.66,
      "apples": 26837.6,
      "apricots": 6274.76,
      "artichokes": 14302.62,
      "asparagus": 8192.32,
      "avocados": 7657.28,
      "bananas": 68696.14,
      "barley": 2511.52,
      "beans, dry": 2815.84,
      "broad beans and horse beans, dry": 2615.58,
      "broad beans and horse beans, green": 8834.36,
      "cabbages": 40813.74,
      "canary seed": 2710.2,
      "cantaloupes and other melons": 25311.92,
      "carrots and turnips": 57310.24,
      "cauliflowers and broccoli": 24645.2,
      "cherries": 8794.04,
      "chestnuts, in shell": 5492.24,
      "chick peas, dry": 1200.86,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 2342.3,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 38490.14,
      "cucumbers and gherkins": 54635.48,
      "eggplants (aubergines)": 48255.64,
      "figs": 6100.92,
      "flax, raw or retted": 697.62,
      "grapes": 9809.18,
      "green garlic": 19634.04,
      "groundnuts, excluding shelled": 4073.56,
      "hazelnuts, in shell": 937.18,
      "hempseed": 788.46,
      "hen eggs in shell, fresh": 4788.0,
      "horse meat, fresh or chilled": 150.0,
      "kiwi fruit": 22324.92,
      "leeks and other alliaceous vegetables": 31139.02,
      "lemons and limes": 30389.44,
      "lentils, dry": 1364.66,
      "lettuce and chicory": 25954.22,
      "linseed": 1139.38,
      "locust beans (carobs)": 15590.94,
      "maize (corn)": 9459.64,
      "meat of buffalo, fresh or chilled": 216.8,
      "meat of cattle with the bone, fresh or chilled": 285.8,
      "meat of chickens, fresh or chilled": 1810.2,
      "meat of ducks, fresh or chilled": 1300.0,
      "meat of geese, fresh or chilled": 2500.0,
      "meat of goat, fresh or chilled": 19.0,
      "meat of rabbits and hares, fresh or chilled": 1000.0,
      "meat of sheep, fresh or chilled": 22.6,
      "meat of turkeys, fresh or chilled": 10088.2,
      "millet": 3348.0,
      "oats": 2643.08,
      "okra": 6846.26,
      "olives": 2506.24,
      "onions and shallots, dry (excluding dehydrated)": 38579.38,
      "onions and shallots, green": 17872.02,
      "oranges": 33921.72,
      "other beans, green": 13249.38,
      "other berries and fruits of the genus vaccinium n.e.c.": 23491.72,
      "other citrus fruit, n.e.c.": 11197.04,
      "other fruits, n.e.c.": 21126.96,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 2503.36,
      "other pulses n.e.c.": 1160.78,
      "other stimulant, spice and aromatic crops, n.e.c.": 9553.7,
      "other stone fruits": 24413.2,
      "other vegetables, fresh n.e.c.": 16415.18,
      "peaches and nectarines": 19042.46,
      "pears": 23420.6,
      "peas, dry": 2906.78,
      "peas, green": 9809.74,
      "persimmons": 17397.32,
      "pistachios, in shell": 575.44,
      "plums and sloes": 16149.22,
      "pomelos and grapefruits": 44522.48,
      "poppy seed": 480.6,
      "potatoes": 36473.26,
      "pumpkins, squash and gourds": 8016.1,
      "quinces": 24419.76,
      "rape or colza seed": 3548.1,
      "raw hides and skins of buffaloes": 29.6,
      "raw hides and skins of cattle": 32.0,
      "raw hides and skins of goats or kids": 2.0,
      "raw hides and skins of sheep or lambs": 4.0,
      "raw milk of buffalo": 715.0,
      "raw milk of cattle": 3326.6,
      "raw milk of goats": 108.8,
      "raw milk of sheep": 52.4,
      "rice": 7870.78,
      "rye": 2733.26,
      "safflower seed": 1206.1,
      "seed cotton, unginned": 4828.42,
      "sesame seed": 717.62,
      "sorghum": 4480.94,
      "sour cherries": 9818.2,
      "soya beans": 4193.62,
      "spinach": 14810.2,
      "strawberries": 32112.24,
      "string beans": 11140.68,
      "sugar beet": 66536.04,
      "sunflower seed": 2538.32,
      "tangerines, mandarins, clementines": 30656.88,
      "tea leaves": 17498.22,
      "tomatoes": 79400.68,
      "triticale": 3126.02,
      "true hemp, raw or retted": 1000.0,
      "unmanufactured tobacco": 1040.66,
      "vanilla, raw": 199.3,
      "vetches": 1424.74,
      "walnuts, in shell": 2122.46,
      "watermelons": 48715.16,
      "wheat": 2968.94
    },
    "Ukraine": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 1165.2,
      "apples": 14708.92,
      "apricots": 8221.24,
      "barley": 3548.42,
      "beans, dry": 1608.98,
      "blueberries": 2200.0,
      "broad beans and horse beans, dry": 2715.48,
      "broad beans and horse beans, green": 7016.08,
      "buckwheat": 1243.18,
      "cabbages": 25699.4,
      "cantaloupes and other melons": 5832.8,
      "carrots and turnips": 20066.52,
      "cauliflowers and broccoli": 12600.12,
      "cereals n.e.c.": 1694.34,
      "cherries": 7460.38,
      "chestnuts, in shell": 2419.06,
      "chicory roots": 23093.24,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 10996.56,
      "cranberries": 2188.72,
      "cucumbers and gherkins": 18841.22,
      "currants": 7110.46,
      "eggplants (aubergines)": 13363.06,
      "flax, raw or retted": 493.62,
      "gooseberries": 13286.0,
      "grapes": 8488.6,
      "green corn (maize)": 13142.94,
      "green garlic": 9159.12,
      "hazelnuts, in shell": 655.72,
      "hempseed": 502.3,
      "hen eggs in shell, fresh": 3565.4,
      "hop cones": 1343.32,
      "horse meat, fresh or chilled": 219.4,
      "lentils, dry": 1214.62,
      "lettuce and chicory": 16120.0,
      "linseed": 1175.2,
      "locust beans (carobs)": 1994.0,
      "lupins": 1526.28,
      "maize (corn)": 6810.8,
      "meat of cattle with the bone, fresh or chilled": 174.2,
      "meat of chickens, fresh or chilled": 1823.2,
      "meat of ducks, fresh or chilled": 1894.2,
      "meat of geese, fresh or chilled": 1980.0,
      "meat of goat, fresh or chilled": 15.6,
      "meat of pig with the bone, fresh or chilled": 89.4,
      "meat of rabbits and hares, fresh or chilled": 1766.0,
      "meat of sheep, fresh or chilled": 17.8,
      "meat of turkeys, fresh or chilled": 7744.0,
      "millet": 1963.44,
      "mixed grain": 1428.28,
      "mustard seed": 799.28,
      "oats": 2576.08,
      "onions and shallots, dry (excluding dehydrated)": 18765.2,
      "onions and shallots, green": 12737.36,
      "other beans, green": 23141.42,
      "other berries and fruits of the genus vaccinium n.e.c.": 1634.88,
      "other fruits, n.e.c.": 4017.8,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 364.52,
      "other oil seeds, n.e.c.": 969.58,
      "other pome fruits": 2319.16,
      "other pulses n.e.c.": 1284.0,
      "other stone fruits": 7458.84,
      "other vegetables, fresh n.e.c.": 19717.8,
      "peaches and nectarines": 7793.6,
      "pears": 13281.24,
      "peas, dry": 2224.3,
      "peas, green": 4319.5,
      "plums and sloes": 10181.84,
      "potatoes": 16974.2,
      "pumpkins, squash and gourds": 20983.74,
      "quinces": 10757.42,
      "rape or colza seed": 2773.3,
      "raspberries": 6995.74,
      "raw hides and skins of cattle": 24.0,
      "raw hides and skins of goats or kids": 6.2,
      "raw hides and skins of sheep or lambs": 6.6,
      "raw milk of cattle": 5404.0,
      "raw milk of goats": 452.8,
      "raw milk of sheep": 51.4,
      "rice": 4953.52,
      "rye": 3189.46,
      "safflower seed": 515.3,
      "sorghum": 2988.54,
      "sour cherries": 9264.32,
      "soya beans": 2395.34,
      "spinach": 7432.56,
      "strawberries": 7574.86,
      "sugar beet": 49308.6,
      "sunflower seed": 2255.4,
      "tomatoes": 28105.12,
      "triticale": 3599.38,
      "true hemp, raw or retted": 469.88,
      "unmanufactured tobacco": 2279.3,
      "vetches": 2007.94,
      "walnuts, in shell": 8225.08,
      "watermelons": 8932.04,
      "wheat": 4298.06
    },
    "United Kingdom": {
      "apples": 31867.42,
      "asparagus": 2180.02,
      "barley": 6130.64,
      "broad beans and horse beans, dry": 3271.02,
      "broad beans and horse beans, green": 4236.7,
      "cabbages": 24331.94,
      "carrots and turnips": 59426.26,
      "cauliflowers and broccoli": 9057.86,
      "cherries": 6198.66,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 221971.04,
      "cucumbers and gherkins": 510500.0,
      "currants": 4839.98,
      "flax, raw or retted": 1460.92,
      "gooseberries": 8539.26,
      "grapes": 2353.16,
      "hen eggs in shell, fresh": 6039.8,
      "hop cones": 1434.6,
      "horse meat, fresh or chilled": 154.0,
      "leeks and other alliaceous vegetables": 19696.94,
      "lettuce and chicory": 23165.5,
      "linseed": 1748.34,
      "meat of cattle with the bone, fresh or chilled": 328.4,
      "meat of chickens, fresh or chilled": 1583.2,
      "meat of ducks, fresh or chilled": 2369.4,
      "meat of geese, fresh or chilled": 4700.4,
      "meat of pig with the bone, fresh or chilled": 90.0,
      "meat of sheep, fresh or chilled": 20.8,
      "meat of turkeys, fresh or chilled": 11829.8,
      "mixed grain": 4340.62,
      "oats": 5454.58,
      "onions and shallots, dry (excluding dehydrated)": 37147.58,
      "onions and shallots, green": 9850.26,
      "other beans, green": 5499.1,
      "other berries and fruits of the genus vaccinium n.e.c.": 7142.26,
      "other pulses n.e.c.": 2913.52,
      "other vegetables, fresh n.e.c.": 21549.9,
      "pears": 13329.46,
      "peas, dry": 3079.38,
      "peas, green": 4187.24,
      "plums and sloes": 13109.9,
      "potatoes": 40729.74,
      "rape or colza seed": 3114.16,
      "raspberries": 11431.7,
      "raw hides and skins of cattle": 30.4,
      "raw hides and skins of sheep or lambs": 4.4,
      "raw milk of cattle": 8483.8,
      "rye": 3912.06,
      "strawberries": 23948.24,
      "sugar beet": 70672.74,
      "tomatoes": 358242.4,
      "triticale": 3835.08,
      "wheat": 7755.46
    },
    "USA": {
      "almonds, in shell": 3786.74,
      "apples": 39425.92,
      "apricots": 11554.38,
      "artichokes": 18156.22,
      "asparagus": 5338.68,
      "avocados": 7169.22,
      "bananas": 10581.48,
      "barley": 3857.3,
      "beans, dry": 2222.68,
      "blueberries": 6970.76,
      "broad beans and horse beans, green": 2654.52,
      "buckwheat": 1055.32,
      "cabbages": 45107.46,
      "cantaloupes and other melons": 30222.6,
      "carrots and turnips": 48594.72,
      "cauliflowers and broccoli": 17439.68,
      "cherries": 8281.22,
      "chick peas, dry": 1339.12,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 31892.06,
      "coffee, green": 1182.5,
      "cow peas, dry": 1747.28,
      "cranberries": 24089.92,
      "cucumbers and gherkins": 17060.18,
      "dates": 8943.82,
      "eggplants (aubergines)": 37665.76,
      "figs": 10573.24,
      "ginger, raw": 32895.2,
      "grapes": 14490.26,
      "green corn (maize)": 18279.62,
      "green garlic": 16812.9,
      "groundnuts, excluding shelled": 4349.28,
      "hazelnuts, in shell": 2622.32,
      "hempseed": 690.07,
      "hen eggs in shell, fresh": 7040.4,
      "hop cones": 2067.7,
      "kiwi fruit": 16465.12,
      "lemons and limes": 40411.62,
      "lentils, dry": 1133.42,
      "lettuce and chicory": 34467.56,
      "linseed": 1037.52,
      "maize (corn)": 11025.08,
      "mangoes, guavas and mangosteens": 19663.5,
      "meat of cattle with the bone, fresh or chilled": 372.6,
      "meat of chickens, fresh or chilled": 2071.0,
      "meat of ducks, fresh or chilled": 2311.2,
      "meat of goat, fresh or chilled": 15.0,
      "meat of pig with the bone, fresh or chilled": 97.4,
      "meat of sheep, fresh or chilled": 27.8,
      "meat of turkeys, fresh or chilled": 11641.6,
      "millet": 1431.68,
      "mustard seed": 699.34,
      "oats": 2418.02,
      "okra": 7943.78,
      "olives": 6075.88,
      "onions and shallots, dry (excluding dehydrated)": 60661.96,
      "oranges": 18041.58,
      "other beans, green": 3205.14,
      "other berries and fruits of the genus vaccinium n.e.c.": 8331.7,
      "other citrus fruit, n.e.c.": 19796.5,
      "other fruits, n.e.c.": 19424.84,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 817.04,
      "other vegetables, fresh n.e.c.": 61198.16,
      "papayas": 19242.66,
      "peaches and nectarines": 19661.66,
      "pears": 34254.42,
      "peas, dry": 1950.28,
      "peas, green": 4781.72,
      "pineapples": 29412.6,
      "pistachios, in shell": 2951.94,
      "plums and sloes": 14591.22,
      "pomelos and grapefruits": 24755.94,
      "potatoes": 50563.16,
      "pumpkins, squash and gourds": 22640.68,
      "rape or colza seed": 1923.36,
      "raspberries": 12133.58,
      "raw hides and skins of cattle": 34.2,
      "raw hides and skins of goats or kids": 3.0,
      "raw hides and skins of sheep or lambs": 3.0,
      "raw milk of cattle": 10906.6,
      "raw milk of goats": 101.2,
      "rice": 8543.28,
      "rye": 2174.98,
      "safflower seed": 1261.94,
      "seed cotton, unginned": 2803.14,
      "sorghum": 3723.36,
      "sour cherries": 6672.66,
      "soya beans": 3411.72,
      "spinach": 14376.14,
      "strawberries": 58802.64,
      "string beans": 9553.24,
      "sugar beet": 69515.92,
      "sugar cane": 82236.22,
      "sunflower seed": 1912.8,
      "sweet potatoes": 21274.02,
      "tangerines, mandarins, clementines": 29810.04,
      "taro": 11219.5,
      "tomatoes": 97565.98,
      "true hemp, raw or retted": 3628.4,
      "unmanufactured tobacco": 2371.46,
      "walnuts, in shell": 4308.56,
      "watermelons": 39380.62,
      "wheat": 3232.86
    },
    "Uruguay": {
      "apples": 20786.52,
      "barley": 4161.82,
      "beans, dry": 635.46,
      "broad beans and horse beans, dry": 1925.7,
      "cabbages": 9615.14,
      "canary seed": 1067.58,
      "cantaloupes and other melons": 21056.76,
      "carrots and turnips": 22317.8,
      "chillies and peppers, green (capsicum spp. and pimenta spp.)": 64206.0,
      "grapes": 17029.06,
      "green corn (maize)": 6936.38,
      "green garlic": 5180.6,
      "groundnuts, excluding shelled": 539.12,
      "hen eggs in shell, fresh": 8073.2,
      "horse meat, fresh or chilled": 231.2,
      "lemons and limes": 24287.62,
      "linseed": 1255.08,
      "maize (corn)": 4766.64,
      "meat of cattle with the bone, fresh or chilled": 250.0,
      "meat of chickens, fresh or chilled": 2365.8,
      "meat of pig with the bone, fresh or chilled": 68.4,
      "meat of rabbits and hares, fresh or chilled": 1500.0,
      "meat of sheep, fresh or chilled": 19.2,
      "oats": 2181.88,
      "olives": 2350.32,
      "onions and shallots, dry (excluding dehydrated)": 23224.32,
      "oranges": 17670.56,
      "other beans, green": 3215.7,
      "other fruits, n.e.c.": 7665.32,
      "other vegetables, fresh n.e.c.": 19797.74,
      "peaches and nectarines": 11384.84,
      "pears": 18671.8,
      "peas, dry": 2131.76,
      "plums and sloes": 10608.14,
      "pomelos and grapefruits": 14917.18,
      "potatoes": 22886.8,
      "pumpkins, squash and gourds": 12048.88,
      "quinces": 30549.32,
      "rape or colza seed": 1683.18,
      "raw hides and skins of cattle": 33.6,
      "raw hides and skins of sheep or lambs": 4.2,
      "raw milk of cattle": 3143.8,
      "rice": 9178.92,
      "sorghum": 3391.28,
      "soya beans": 2143.48,
      "sugar cane": 71135.52,
      "sunflower seed": 1401.54,
      "sweet potatoes": 9722.74,
      "tangerines, mandarins, clementines": 15982.64,
      "tomatoes": 77767.22,
      "unmanufactured tobacco": 4119.64,
      "watermelons": 17889.98,
      "wheat": 4202.96
    },
    "Vietnam": {
      "anise, badian, coriander, cumin, caraway, fennel and juniper berries, raw": 741.04,
      "avocados": 12130.68,
      "bananas": 17426.6,
      "beans, dry": 1225.5,
      "cabbages": 29480.88,
      "cashew nuts, in shell": 1204.14,
      "cassava, fresh": 20205.34,
      "castor oil seeds": 875.0,
      "cauliflowers and broccoli": 19967.58,
      "chillies and peppers, dry (capsicum spp., pimenta spp.), raw": 1441.28,
      "cinnamon and cinnamon-tree flowers, raw": 356.56,
      "cocoa beans": 477.14,
      "coconuts, in shell": 11468.74,
      "coffee, green": 2894.68,
      "grapes": 23632.56,
      "groundnuts, excluding shelled": 2600.64,
      "hen eggs in shell, fresh": 2284.8,
      "horse meat, fresh or chilled": 151.8,
      "jute, raw or retted": 4359.16,
      "maize (corn)": 4986.28,
      "mangoes, guavas and mangosteens": 12110.94,
      "meat of buffalo, fresh or chilled": 173.2,
      "meat of cattle with the bone, fresh or chilled": 140.6,
      "meat of chickens, fresh or chilled": 2033.2,
      "meat of ducks, fresh or chilled": 1266.4,
      "meat of goat, fresh or chilled": 15.0,
      "meat of pig with the bone, fresh or chilled": 66.2,
      "millet": 1948.36,
      "natural rubber in primary forms": 1755.08,
      "onions and shallots, dry (excluding dehydrated)": 3643.26,
      "oranges": 22432.72,
      "other berries and fruits of the genus vaccinium n.e.c.": 10046.5,
      "other fibre crops, raw, n.e.c.": 7195.08,
      "other fruits, n.e.c.": 11402.88,
      "other nuts (excluding wild edible nuts and groundnuts), in shell, n.e.c.": 1737.72,
      "other pulses n.e.c.": 852.66,
      "other vegetables, fresh n.e.c.": 18211.02,
      "papayas": 14150.94,
      "pepper (piper spp.), raw": 2508.28,
      "pineapples": 18260.06,
      "pomelos and grapefruits": 13140.64,
      "potatoes": 16573.44,
      "raw hides and skins of buffaloes": 32.0,
      "raw hides and skins of cattle": 26.0,
      "raw hides and skins of goats or kids": 3.0,
      "raw milk of buffalo": 1010.0,
      "raw milk of cattle": 3498.0,
      "rice": 6055.68,
      "seed cotton, unginned": 519.14,
      "sesame seed": 846.34,
      "soya beans": 1604.1,
      "sugar cane": 65575.32,
      "sweet potatoes": 12014.52,
      "tea leaves": 9944.7,
      "unmanufactured tobacco": 2514.64,
      "watermelons": 24796.48
    }
  },
  "source": "FAOSTAT — Crops and Livestock Products",
  "years": "2020-2024 (5-year average per crop)",
  "unit": "kg/ha",
  "elements": [
    "Yield",
    "Yield/Carcass Weight"
  ]
};

window.aioxyData = window.aioxyData || {};
window.aioxyData.aware_20 = {
  "agricultural": {
    "Andorra": 80.5,
    "United Arab Emirates": 17.4,
    "Afghanistan": 59.6,
    "Antigua and Barbuda": 9.44,
    "Albania": 59.3,
    "Armenia": 88.6,
    "Angola": 10.4,
    "Argentina": 41.5,
    "Austria": 2.14,
    "Australia": 81.6,
    "NotDefined": 9.16,
    "Azerbaijan": 86.1,
    "Bosnia and Herzegovina": 2.79,
    "Barbados": 60.5,
    "Bangladesh": 8.42,
    "Belgium": 4.77,
    "Burkina Faso": 28.7,
    "Bulgaria": 59.4,
    "Bahrain": 3.52,
    "Burundi": 43.0,
    "Benin": 7.48,
    "Brunei Darussalam": 0.266,
    "Bolivia (Plurinational State of)": 7.32,
    "Brazil": 6.35,
    "Bahamas": 19.3,
    "Bhutan": 4.52,
    "Botswana": 16.3,
    "Belarus": 3.68,
    "Belize": 1.78,
    "Canada": 9.65,
    "Democratic Republic of the Congo": 36.7,
    "Central African Republic": 6.88,
    "Congo": 0.765,
    "Switzerland": 2.07,
    "Côte d'Ivoire": 6.32,
    "Chile": 91.3,
    "Cameroon": 7.07,
    "Colombia": 3.96,
    "Costa Rica": 2.62,
    "Cuba": 4.61,
    "Cabo Verde": 77.9,
    "Czechia": 3.34,
    "Germany": 2.92,
    "Djibouti": 14.3,
    "Denmark": 2.7,
    "Dominica": 41.3,
    "Dominican Republic": 18.6,
    "Algeria": 78.5,
    "Ecuador": 8.66,
    "Estonia": 2.03,
    "Egypt": 88.6,
    "Eritrea": 48.9,
    "Spain": 74.9,
    "Ethiopia": 38.2,
    "Fiji": 2.16,
    "Gabon": 1.01,
    "United Kingdom of Great Britain & Northern Ireland": 14.9,
    "Grenada": 86.3,
    "Georgia": 86.2,
    "Ghana": 21.4,
    "Gambia": 5.59,
    "Guinea": 10.9,
    "Greece": 85.1,
    "Guatemala": 0.79,
    "Guinea-Bissau": 3.33,
    "Guyana": 1.22,
    "Honduras": 1.76,
    "Croatia": 2.68,
    "Haiti": 4.29,
    "Hungary": 2.38,
    "Indonesia": 25.1,
    "Ireland": 2.56,
    "Iraq": 73.7,
    "Iran (Islamic Republic of)": 70.9,
    "Italy": 51.9,
    "Jamaica": 48.1,
    "Jordan": 88.5,
    "Japan": 0.864,
    "Kenya": 16.6,
    "Kyrgyzstan": 83.5,
    "Cambodia": 7.39,
    "Comoros": 1.12,
    "Saint Kitts and Nevis": 64.5,
    "Democratic People's Republic of Korea": 3.78,
    "Republic of Korea": 0.973,
    "Kuwait": 44.0,
    "Kazakhstan": 63.8,
    "Lao People's Democratic Republic": 3.88,
    "Lebanon": 96.9,
    "Saint Lucia": 61.2,
    "Liechtenstein": 1.5,
    "Sri Lanka": 38.5,
    "Liberia": 1.27,
    "Lesotho": 43.9,
    "Lithuania": 2.81,
    "Luxembourg": 1.66,
    "Latvia": 2.23,
    "Libya": 62.2,
    "Morocco": 92.8,
    "Monaco": 7.17,
    "Moldova": 3.04,
    "Montenegro": 1.47,
    "Madagascar": 13.4,
    "North Macedonia": 88.8,
    "Mali": 15.8,
    "Myanmar": 3.19,
    "Mongolia": 22.5,
    "Mauritania": 63.5,
    "Malta": 10.7,
    "Mauritius": 33.5,
    "Malawi": 5.36,
    "Mexico": 41.8,
    "Malaysia": 0.878,
    "Mozambique": 5.21,
    "Namibia": 39.6,
    "Niger": 8.96,
    "Nigeria": 9.77,
    "Nicaragua": 1.51,
    "Norway": 0.713,
    "Nepal": 39.0,
    "New Zealand": 11.2,
    "Oman": 26.3,
    "Panama": 1.35,
    "Peru": 37.6,
    "Philippines": 11.0,
    "Poland": 3.0,
    "Portugal": 45.8,
    "Paraguay": 2.04,
    "Qatar": 31.1,
    "Romania": 6.71,
    "Russian Federation": 16.5,
    "Rwanda": 52.7,
    "Saudi Arabia": 38.1,
    "Seychelles": 26.3,
    "Sudan": 54.1,
    "Sweden": 3.7,
    "Slovenia": 2.02,
    "Slovakia": 2.13,
    "Sierra Leone": 4.07,
    "San Marino": 13.2,
    "Senegal": 52.4,
    "Suriname": 1.37,
    "South Sudan": 96.2,
    "Sao Tome and Principe": 82.3,
    "El Salvador": 1.87,
    "Syrian Arab Republic": 96.6,
    "Eswatini": 2.72,
    "Chad": 10.2,
    "Togo": 14.2,
    "Thailand": 10.9,
    "Tajikistan": 84.3,
    "Timor-Leste": 7.46,
    "Turkmenistan": 74.5,
    "Tunisia": 78.8,
    "Turkey": 70.7,
    "Trinidad and Tobago": 3.02,
    "United Republic of Tanzania": 17.0,
    "Uganda": 80.2,
    "United States of America": 37.4,
    "Uruguay": 0.81,
    "Uzbekistan": 83.8,
    "Holy See": 5.17,
    "Venezuela": 16.0,
    "Viet Nam": 14.0,
    "Yemen": 67.2,
    "South Africa": 68.5,
    "Zambia": 4.74,
    "Zimbabwe": 4.54,
    "China": 25.6,
    "Cyprus": 94.9,
    "Finland": 2.47,
    "France": 15.8,
    "Israel": 93.9,
    "India": 36.1,
    "Netherlands": 2.16,
    "Pakistan": 47.5,
    "Serbia": 7.06,
    "Somalia": 66.2,
    "Ukraine": 31.1,
    "Aksai Chin": 44.2,
    "China/India": 23.8,
    "Gaza": 95.0,
    "Jammu and Kashmir": 9.34,
    "West Bank": 92.2
  },
  "source": "AWARE 2.0 — WULCA consensus model",
  "unit": "m3 world eq / m3",
  "sheet": "CFs_agri — annual characterization factors"
};

window.aioxyData = window.aioxyData || {};
window.aioxyData.usetox = {
  "human_toxicity": {
    "100-00-5": {
      "cancer_CTUh_per_kg": 1.89e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-01-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-41-4": {
      "cancer_CTUh_per_kg": 3.84e-08,
      "noncancer_CTUh_per_kg": 2.5e-08
    },
    "100-42-5": {
      "cancer_CTUh_per_kg": 7.68e-09,
      "noncancer_CTUh_per_kg": 2.97e-09
    },
    "100-44-7": {
      "cancer_CTUh_per_kg": 4.04e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-51-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-52-7": {
      "cancer_CTUh_per_kg": 2.67e-08,
      "noncancer_CTUh_per_kg": 3.47e-08
    },
    "100-97-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-05-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.5e-09
    },
    "101200-48-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.2e-06
    },
    "101-21-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.58e-07
    },
    "1024-57-3": {
      "cancer_CTUh_per_kg": 0.00127,
      "noncancer_CTUh_per_kg": 0.000727
    },
    "10265-92-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.3e-06
    },
    "102-71-6": {
      "cancer_CTUh_per_kg": 4.18e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10311-84-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.81e-05
    },
    "103-23-1": {
      "cancer_CTUh_per_kg": 3.49e-09,
      "noncancer_CTUh_per_kg": 4.96e-09
    },
    "103-33-3": {
      "cancer_CTUh_per_kg": 1.63e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-72-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10380-28-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-85-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10453-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.81e-08
    },
    "104-76-7": {
      "cancer_CTUh_per_kg": 1.17e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-55-5": {
      "cancer_CTUh_per_kg": 3.49e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-60-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.88e-08
    },
    "105-67-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.34e-08
    },
    "10599-90-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.34e-07
    },
    "10605-21-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.24e-07
    },
    "106-46-7": {
      "cancer_CTUh_per_kg": 1.8e-07,
      "noncancer_CTUh_per_kg": 7.06e-08
    },
    "106-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.59e-07
    },
    "106-50-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-51-4": {
      "cancer_CTUh_per_kg": 5.71e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1067-33-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-89-8": {
      "cancer_CTUh_per_kg": 6.83e-06,
      "noncancer_CTUh_per_kg": 9.18e-06
    },
    "106-93-4": {
      "cancer_CTUh_per_kg": 5.19e-05,
      "noncancer_CTUh_per_kg": 3.07e-07
    },
    "107-02-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.26e-05
    },
    "107-05-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.57e-07
    },
    "107-06-2": {
      "cancer_CTUh_per_kg": 1.58e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-18-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.45e-06
    },
    "107-19-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.66e-06
    },
    "107-20-0": {
      "cancer_CTUh_per_kg": 1.18e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-21-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2e-08
    },
    "107-29-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107534-96-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.79e-07
    },
    "107-98-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.68e-08
    },
    "108-10-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.47e-09
    },
    "108-31-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.99e-07
    },
    "108-39-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.31e-08
    },
    "108-45-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.88e-06
    },
    "108-46-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1085-98-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.11e-09
    },
    "108-78-1": {
      "cancer_CTUh_per_kg": 1.23e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-88-3": {
      "cancer_CTUh_per_kg": 2.34e-09,
      "noncancer_CTUh_per_kg": 1.35e-08
    },
    "108-90-7": {
      "cancer_CTUh_per_kg": 6.55e-08,
      "noncancer_CTUh_per_kg": 6.79e-08
    },
    "108-95-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.45e-08
    },
    "109-69-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-86-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.25e-07
    },
    "109-99-9": {
      "cancer_CTUh_per_kg": 5.22e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-00-9": {
      "cancer_CTUh_per_kg": 1.29e-05,
      "noncancer_CTUh_per_kg": 1.44e-06
    },
    "110-44-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-54-3": {
      "cancer_CTUh_per_kg": 1.83e-10,
      "noncancer_CTUh_per_kg": 2.49e-08
    },
    "110-80-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.74e-07
    },
    "110-82-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.85e-09
    },
    "110-86-1": {
      "cancer_CTUh_per_kg": 1.15e-06,
      "noncancer_CTUh_per_kg": 3.51e-06
    },
    "11096-82-5": {
      "cancer_CTUh_per_kg": 2.55e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "11097-69-1": {
      "cancer_CTUh_per_kg": 9.91e-05,
      "noncancer_CTUh_per_kg": 0.0399
    },
    "1113-02-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.58e-05
    },
    "111-30-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-44-4": {
      "cancer_CTUh_per_kg": 3.42e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-46-6": {
      "cancer_CTUh_per_kg": 2.12e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1114-71-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-76-2": {
      "cancer_CTUh_per_kg": 2.5e-08,
      "noncancer_CTUh_per_kg": 2.99e-07
    },
    "112-27-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112410-23-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.66e-07
    },
    "114-26-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.82e-06
    },
    "114369-43-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.14e-06
    },
    "115-09-3": {
      "cancer_CTUh_per_kg": 8.52e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-29-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.3e-06
    },
    "115-32-2": {
      "cancer_CTUh_per_kg": 7.73e-06,
      "noncancer_CTUh_per_kg": 7.2e-05
    },
    "115-90-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.56e-05
    },
    "115-96-8": {
      "cancer_CTUh_per_kg": 7.28e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "116-06-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.08e-06
    },
    "1162-65-8": {
      "cancer_CTUh_per_kg": 0.0396,
      "noncancer_CTUh_per_kg": 0.0
    },
    "116-29-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117-10-2": {
      "cancer_CTUh_per_kg": 4.33e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117-18-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.76e-08
    },
    "117-80-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117-81-7": {
      "cancer_CTUh_per_kg": 6.88e-09,
      "noncancer_CTUh_per_kg": 9.6e-08
    },
    "118-74-1": {
      "cancer_CTUh_per_kg": 0.000258,
      "noncancer_CTUh_per_kg": 8.85e-05
    },
    "118-75-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-96-7": {
      "cancer_CTUh_per_kg": 1.25e-06,
      "noncancer_CTUh_per_kg": 8.7e-05
    },
    "119-34-6": {
      "cancer_CTUh_per_kg": 2.76e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-38-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120068-37-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.31e-05
    },
    "120-12-7": {
      "cancer_CTUh_per_kg": 2.88e-05,
      "noncancer_CTUh_per_kg": 1.78e-08
    },
    "120-61-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.47e-08
    },
    "120-62-7": {
      "cancer_CTUh_per_kg": 1.1e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12071-83-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.79e-07
    },
    "120-72-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-80-9": {
      "cancer_CTUh_per_kg": 5.13e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-82-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.08e-07
    },
    "120-83-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.3e-05
    },
    "120-93-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-14-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.7e-05
    },
    "12122-67-7": {
      "cancer_CTUh_per_kg": 4.04e-09,
      "noncancer_CTUh_per_kg": 1.83e-08
    },
    "121-69-7": {
      "cancer_CTUh_per_kg": 1.81e-07,
      "noncancer_CTUh_per_kg": 1.6e-06
    },
    "121-75-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.85e-09
    },
    "121-79-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-14-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.72e-07
    },
    "122-34-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.63e-05
    },
    "122-39-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.78e-07
    },
    "122-42-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.25e-08
    },
    "122-66-7": {
      "cancer_CTUh_per_kg": 2e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-31-9": {
      "cancer_CTUh_per_kg": 4.97e-07,
      "noncancer_CTUh_per_kg": 7.6e-07
    },
    "123-91-1": {
      "cancer_CTUh_per_kg": 2.88e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12427-38-2": {
      "cancer_CTUh_per_kg": 5.16e-08,
      "noncancer_CTUh_per_kg": 1.8e-07
    },
    "124-48-1": {
      "cancer_CTUh_per_kg": 3.66e-07,
      "noncancer_CTUh_per_kg": 2.96e-07
    },
    "126-72-7": {
      "cancer_CTUh_per_kg": 1.54e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-73-8": {
      "cancer_CTUh_per_kg": 5.1e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12674-11-2": {
      "cancer_CTUh_per_kg": 1.95e-06,
      "noncancer_CTUh_per_kg": 0.00157
    },
    "127-00-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-18-4": {
      "cancer_CTUh_per_kg": 5.79e-07,
      "noncancer_CTUh_per_kg": 1.21e-06
    },
    "128-44-9": {
      "cancer_CTUh_per_kg": 2.42e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "129-00-0": {
      "cancer_CTUh_per_kg": 6.27e-06,
      "noncancer_CTUh_per_kg": 5.18e-07
    },
    "13071-79-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.000333
    },
    "131-17-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13121-70-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.42e-07
    },
    "13171-21-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.69e-05
    },
    "13194-48-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.000428
    },
    "132-27-4": {
      "cancer_CTUh_per_kg": 1.28e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "133-06-2": {
      "cancer_CTUh_per_kg": 3.55e-09,
      "noncancer_CTUh_per_kg": 3.74e-08
    },
    "133-07-3": {
      "cancer_CTUh_per_kg": 3.19e-09,
      "noncancer_CTUh_per_kg": 1.11e-08
    },
    "1330-78-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "134-32-7": {
      "cancer_CTUh_per_kg": 7.78e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13457-18-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.66e-06
    },
    "134-62-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "135-88-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13593-03-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.02e-06
    },
    "13674-87-8": {
      "cancer_CTUh_per_kg": 4.25e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13684-63-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.49e-08
    },
    "137-26-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.12e-08
    },
    "137-29-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-30-4": {
      "cancer_CTUh_per_kg": 3.29e-08,
      "noncancer_CTUh_per_kg": 2.37e-07
    },
    "138261-41-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.99e-06
    },
    "139-40-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.44e-06
    },
    "140-11-4": {
      "cancer_CTUh_per_kg": 2.82e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1401-55-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-56-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-57-8": {
      "cancer_CTUh_per_kg": 6.96e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-79-4": {
      "cancer_CTUh_per_kg": 5.28e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-88-5": {
      "cancer_CTUh_per_kg": 1.12e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-05-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-66-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.27e-05
    },
    "141-78-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.16e-09
    },
    "141-90-2": {
      "cancer_CTUh_per_kg": 5.21e-10,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1420-04-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-59-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14324-55-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143390-89-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.25e-08
    },
    "143-50-0": {
      "cancer_CTUh_per_kg": 0.000241,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1445-75-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.44e-08
    },
    "14484-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.31e-06
    },
    "1453-82-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14698-29-4": {
      "cancer_CTUh_per_kg": 8.82e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14816-18-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.52e-07
    },
    "148-18-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.7e-07
    },
    "148-24-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "148-79-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.56e-06
    },
    "149-30-4": {
      "cancer_CTUh_per_kg": 2.88e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-50-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.77e-07
    },
    "150-68-5": {
      "cancer_CTUh_per_kg": 9.13e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-76-5": {
      "cancer_CTUh_per_kg": 3.1e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15263-53-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.58e-09
    },
    "15299-99-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.04e-07
    },
    "1563-66-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.13e-06
    },
    "156-60-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3e-07
    },
    "1610-18-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.12e-06
    },
    "1634-04-4": {
      "cancer_CTUh_per_kg": 1.49e-08,
      "noncancer_CTUh_per_kg": 8.29e-09
    },
    "1634-78-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16423-68-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16672-87-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.39e-07
    },
    "16752-77-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.79e-06
    },
    "1689-84-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.52e-07
    },
    "1689-99-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.98e-08
    },
    "1694-09-3": {
      "cancer_CTUh_per_kg": 3.44e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17109-49-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.92e-06
    },
    "17804-35-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.87e-08
    },
    "18181-80-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.49e-07
    },
    "1825-21-4": {
      "cancer_CTUh_per_kg": 4.26e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1836-75-5": {
      "cancer_CTUh_per_kg": 8.05e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1861-32-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.74e-06
    },
    "1861-40-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.99e-08
    },
    "1897-45-6": {
      "cancer_CTUh_per_kg": 4.38e-09,
      "noncancer_CTUh_per_kg": 1.32e-07
    },
    "1912-24-9": {
      "cancer_CTUh_per_kg": 8.06e-07,
      "noncancer_CTUh_per_kg": 9.34e-07
    },
    "1918-16-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.44e-08
    },
    "1929-77-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.42e-06
    },
    "1934-21-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1948-33-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "19666-30-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.74e-05
    },
    "2008-41-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.11e-07
    },
    "2032-65-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.37e-07
    },
    "206-44-0": {
      "cancer_CTUh_per_kg": 3.55e-06,
      "noncancer_CTUh_per_kg": 1.76e-07
    },
    "2104-64-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.000167
    },
    "2104-96-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.89e-07
    },
    "21087-64-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.31e-07
    },
    "21609-90-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.1e-06
    },
    "2163-79-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2164-17-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.84e-07
    },
    "21725-46-2": {
      "cancer_CTUh_per_kg": 1.86e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2212-67-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.28e-05
    },
    "2227-13-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2243-62-1": {
      "cancer_CTUh_per_kg": 6e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2275-23-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.89e-07
    },
    "22781-23-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.23e-07
    },
    "2303-16-4": {
      "cancer_CTUh_per_kg": 3.04e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2303-17-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.34e-06
    },
    "2310-17-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.95e-07
    },
    "23103-98-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.77e-07
    },
    "2312-35-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.64e-07
    },
    "23135-22-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.11e-06
    },
    "23564-05-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.11e-09
    },
    "2385-85-5": {
      "cancer_CTUh_per_kg": 0.000156,
      "noncancer_CTUh_per_kg": 0.000201
    },
    "23950-58-5": {
      "cancer_CTUh_per_kg": 1.58e-06,
      "noncancer_CTUh_per_kg": 6.58e-07
    },
    "24017-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.38e-05
    },
    "2425-06-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.08e-07
    },
    "2439-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.09e-06
    },
    "2439-10-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.97e-10
    },
    "2465-27-2": {
      "cancer_CTUh_per_kg": 8.08e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2489-77-2": {
      "cancer_CTUh_per_kg": 4.51e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25013-16-5": {
      "cancer_CTUh_per_kg": 9.54e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25057-89-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.16e-07
    },
    "25168-26-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25311-71-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.000263
    },
    "2540-82-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.22e-06
    },
    "2595-54-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.96e-05
    },
    "2597-03-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.51e-06
    },
    "26002-80-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.08e-10
    },
    "2636-26-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.35e-06
    },
    "26471-62-5": {
      "cancer_CTUh_per_kg": 1.02e-06,
      "noncancer_CTUh_per_kg": 0.00255
    },
    "26628-22-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.2e-06
    },
    "2691-41-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.62e-07
    },
    "2698-41-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27314-13-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.72e-07
    },
    "2764-72-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.06e-05
    },
    "28249-77-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.23e-07
    },
    "28434-01-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.95e-09
    },
    "2921-88-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.81e-06
    },
    "29232-93-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.18e-06
    },
    "297-78-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "298-00-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.98e-07
    },
    "298-02-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5e-05
    },
    "298-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.06e-05
    },
    "29973-13-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.65e-07
    },
    "299-84-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.31e-05
    },
    "299-86-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.38e-07
    },
    "300-76-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.83e-07
    },
    "302-01-2": {
      "cancer_CTUh_per_kg": 6.7e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "302-17-0": {
      "cancer_CTUh_per_kg": 6.04e-07,
      "noncancer_CTUh_per_kg": 6.86e-07
    },
    "302-79-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "30560-19-1": {
      "cancer_CTUh_per_kg": 2.95e-08,
      "noncancer_CTUh_per_kg": 8.21e-05
    },
    "306-83-2": {
      "cancer_CTUh_per_kg": 3.34e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "309-00-2": {
      "cancer_CTUh_per_kg": 6.94e-05,
      "noncancer_CTUh_per_kg": 0.000219
    },
    "315-18-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "319-84-6": {
      "cancer_CTUh_per_kg": 4.32e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "319-85-7": {
      "cancer_CTUh_per_kg": 1.71e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "32809-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.02e-07
    },
    "330-54-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.77e-06
    },
    "330-55-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.53e-06
    },
    "33089-61-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.08e-08
    },
    "333-41-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.12e-05
    },
    "3337-71-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.03e-07
    },
    "3347-22-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.17e-06
    },
    "33820-53-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.69e-07
    },
    "34014-18-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.73e-06
    },
    "35367-38-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1e-08
    },
    "35554-44-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.05e-08
    },
    "36734-19-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.61e-07
    },
    "3689-24-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.88e-06
    },
    "38260-54-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.9e-06
    },
    "3844-45-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39148-24-8": {
      "cancer_CTUh_per_kg": 7.28e-11,
      "noncancer_CTUh_per_kg": 4.25e-11
    },
    "39515-41-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.5e-07
    },
    "404-86-4": {
      "cancer_CTUh_per_kg": 3.54e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "40487-42-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.67e-07
    },
    "40596-69-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.53e-09
    },
    "41083-11-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.67e-06
    },
    "41198-08-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.95e-06
    },
    "42874-03-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.31e-06
    },
    "43121-43-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.76e-07
    },
    "43222-48-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.28e-10
    },
    "452-86-8": {
      "cancer_CTUh_per_kg": 1.03e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "458-37-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "470-82-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "470-90-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.000209
    },
    "4824-78-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.64e-07
    },
    "50-06-6": {
      "cancer_CTUh_per_kg": 1.78e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-28-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-32-8": {
      "cancer_CTUh_per_kg": 0.000282,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-44-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50471-44-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.02e-06
    },
    "505-29-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.97e-07
    },
    "510-15-6": {
      "cancer_CTUh_per_kg": 9.9e-07,
      "noncancer_CTUh_per_kg": 2.89e-06
    },
    "51-03-6": {
      "cancer_CTUh_per_kg": 4.08e-08,
      "noncancer_CTUh_per_kg": 1.66e-08
    },
    "51218-45-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.74e-07
    },
    "51235-04-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.74e-07
    },
    "512-56-1": {
      "cancer_CTUh_per_kg": 2.6e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51-52-5": {
      "cancer_CTUh_per_kg": 5.7e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51630-58-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.7e-06
    },
    "518-75-2": {
      "cancer_CTUh_per_kg": 4.08e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52315-07-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.24e-07
    },
    "5234-68-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.96e-08
    },
    "52645-53-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.03e-08
    },
    "52-68-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.73e-06
    },
    "52918-63-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.01e-07
    },
    "532-27-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.00118
    },
    "532-32-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5392-40-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-96-3": {
      "cancer_CTUh_per_kg": 2.78e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "548-62-9": {
      "cancer_CTUh_per_kg": 2.72e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55179-31-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.56e-07
    },
    "55219-65-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.37e-07
    },
    "55268-74-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55285-14-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.47e-06
    },
    "55-38-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.21e-06
    },
    "55-63-0": {
      "cancer_CTUh_per_kg": 4.62e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5567-15-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5598-13-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.21e-06
    },
    "56-23-5": {
      "cancer_CTUh_per_kg": 1.7e-06,
      "noncancer_CTUh_per_kg": 6.27e-06
    },
    "563-12-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.9e-05
    },
    "563-47-3": {
      "cancer_CTUh_per_kg": 8.5e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-35-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.67e-06
    },
    "56-38-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.71e-06
    },
    "56425-91-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.54e-07
    },
    "56-49-5": {
      "cancer_CTUh_per_kg": 1.3e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-53-1": {
      "cancer_CTUh_per_kg": 0.0032,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-72-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-75-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57018-04-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.47e-07
    },
    "57-06-7": {
      "cancer_CTUh_per_kg": 1.4e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-13-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-43-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-55-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "576-26-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.83e-06
    },
    "57-63-6": {
      "cancer_CTUh_per_kg": 0.000337,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-74-9": {
      "cancer_CTUh_per_kg": 9.31e-05,
      "noncancer_CTUh_per_kg": 0.000158
    },
    "57837-19-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.78e-07
    },
    "58138-08-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.22e-05
    },
    "58-14-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59669-26-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.36e-07
    },
    "5989-27-5": {
      "cancer_CTUh_per_kg": 3.4e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60168-88-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.75e-06
    },
    "60207-90-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.07e-06
    },
    "60-29-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.54e-09
    },
    "60-35-5": {
      "cancer_CTUh_per_kg": 2.75e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-51-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.25e-06
    },
    "60-57-1": {
      "cancer_CTUh_per_kg": 0.00134,
      "noncancer_CTUh_per_kg": 0.00303
    },
    "606-20-2": {
      "cancer_CTUh_per_kg": 0.000225,
      "noncancer_CTUh_per_kg": 0.0
    },
    "608-73-1": {
      "cancer_CTUh_per_kg": 5.18e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "608-93-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.62e-05
    },
    "612-83-9": {
      "cancer_CTUh_per_kg": 1.99e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "613-50-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61-82-5": {
      "cancer_CTUh_per_kg": 2.13e-06,
      "noncancer_CTUh_per_kg": 2.91e-06
    },
    "622-78-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-38-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.00157
    },
    "62-53-3": {
      "cancer_CTUh_per_kg": 2.87e-09,
      "noncancer_CTUh_per_kg": 1.42e-07
    },
    "62-56-6": {
      "cancer_CTUh_per_kg": 4.2e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-73-7": {
      "cancer_CTUh_per_kg": 5.74e-07,
      "noncancer_CTUh_per_kg": 1.68e-06
    },
    "630-20-6": {
      "cancer_CTUh_per_kg": 4.95e-07,
      "noncancer_CTUh_per_kg": 2.51e-07
    },
    "63-25-2": {
      "cancer_CTUh_per_kg": 5.54e-07,
      "noncancer_CTUh_per_kg": 4.1e-07
    },
    "632-99-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "634-93-5": {
      "cancer_CTUh_per_kg": 4.32e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "639-58-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.17e-05
    },
    "640-15-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.32e-06
    },
    "64-17-5": {
      "cancer_CTUh_per_kg": 2.65e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64-75-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64902-72-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.19e-07
    },
    "65195-55-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.15e-06
    },
    "66215-27-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.58e-07
    },
    "66246-88-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.12e-06
    },
    "66332-96-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.86e-07
    },
    "66841-25-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.56e-08
    },
    "67375-30-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.62e-08
    },
    "67-48-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67485-29-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.18e-07
    },
    "67-56-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.03e-08
    },
    "67-63-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-66-3": {
      "cancer_CTUh_per_kg": 3.17e-07,
      "noncancer_CTUh_per_kg": 9.11e-07
    },
    "67-72-1": {
      "cancer_CTUh_per_kg": 1.8e-06,
      "noncancer_CTUh_per_kg": 2.21e-05
    },
    "67747-09-5": {
      "cancer_CTUh_per_kg": 1.02e-06,
      "noncancer_CTUh_per_kg": 1.9e-06
    },
    "68085-85-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.68e-07
    },
    "68-12-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.45e-06
    },
    "68359-37-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.05e-08
    },
    "68515-48-0": {
      "cancer_CTUh_per_kg": 5.47e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "685-91-6": {
      "cancer_CTUh_per_kg": 1.28e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6923-22-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.6e-05
    },
    "69327-76-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.21e-06
    },
    "693-98-1": {
      "cancer_CTUh_per_kg": 1.15e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69409-94-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.69e-08
    },
    "70124-77-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.03e-07
    },
    "709-98-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.89e-08
    },
    "71-36-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.22e-08
    },
    "71-55-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.44e-08
    },
    "72-20-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0024
    },
    "72-43-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.11e-07
    },
    "72-55-9": {
      "cancer_CTUh_per_kg": 6.59e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "72-56-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7287-19-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.45e-07
    },
    "732-11-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.87e-07
    },
    "732-26-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74051-80-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.42e-08
    },
    "74223-64-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.74e-08
    },
    "74-83-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.78e-05
    },
    "75-05-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.52e-08
    },
    "75-15-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.84e-06
    },
    "75-21-8": {
      "cancer_CTUh_per_kg": 2.48e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-25-2": {
      "cancer_CTUh_per_kg": 4.73e-08,
      "noncancer_CTUh_per_kg": 3.8e-07
    },
    "75-27-4": {
      "cancer_CTUh_per_kg": 1.16e-06,
      "noncancer_CTUh_per_kg": 1.36e-06
    },
    "75-35-4": {
      "cancer_CTUh_per_kg": 7.82e-08,
      "noncancer_CTUh_per_kg": 1.54e-07
    },
    "75-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-65-0": {
      "cancer_CTUh_per_kg": 4.91e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "759-94-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.49e-07
    },
    "76-01-7": {
      "cancer_CTUh_per_kg": 2.59e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-06-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-44-8": {
      "cancer_CTUh_per_kg": 8.95e-05,
      "noncancer_CTUh_per_kg": 5.19e-06
    },
    "76578-14-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.99e-06
    },
    "76738-62-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.42e-07
    },
    "77-47-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.59e-05
    },
    "7786-34-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.61e-06
    },
    "78-00-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.00325
    },
    "78-11-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-34-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.31e-06
    },
    "78-42-2": {
      "cancer_CTUh_per_kg": 1.83e-10,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-48-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.77e-05
    },
    "78587-05-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.49e-07
    },
    "78-59-1": {
      "cancer_CTUh_per_kg": 3.62e-08,
      "noncancer_CTUh_per_kg": 2.32e-08
    },
    "786-19-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.29e-05
    },
    "78-83-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.02e-08
    },
    "78-84-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-87-5": {
      "cancer_CTUh_per_kg": 2.46e-07,
      "noncancer_CTUh_per_kg": 3.43e-05
    },
    "79-00-5": {
      "cancer_CTUh_per_kg": 6.96e-07,
      "noncancer_CTUh_per_kg": 2.17e-06
    },
    "79-01-6": {
      "cancer_CTUh_per_kg": 2.61e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-19-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79277-27-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.48e-06
    },
    "79-34-5": {
      "cancer_CTUh_per_kg": 1.95e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-46-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.64e-07
    },
    "8001-35-2": {
      "cancer_CTUh_per_kg": 1.04e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8003-34-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.02e-08
    },
    "80-05-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.4e-07
    },
    "8018-01-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.37e-07
    },
    "80-33-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.42e-06
    },
    "80-62-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.58e-08
    },
    "80844-07-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.65e-08
    },
    "81-07-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-54-9": {
      "cancer_CTUh_per_kg": 6.99e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-81-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.17e-05
    },
    "82097-50-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.59e-06
    },
    "82558-50-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.15e-06
    },
    "82657-04-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.28e-07
    },
    "82-68-8": {
      "cancer_CTUh_per_kg": 2.61e-06,
      "noncancer_CTUh_per_kg": 1.15e-05
    },
    "828-00-2": {
      "cancer_CTUh_per_kg": 6.57e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83055-99-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.21e-07
    },
    "83121-18-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.03e-06
    },
    "83-32-9": {
      "cancer_CTUh_per_kg": 1.14e-06,
      "noncancer_CTUh_per_kg": 4.02e-08
    },
    "83-59-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83-79-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.1e-07
    },
    "84-65-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84-66-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.17e-08
    },
    "84-74-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.78e-08
    },
    "85-44-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.78e-08
    },
    "85-68-7": {
      "cancer_CTUh_per_kg": 2.46e-08,
      "noncancer_CTUh_per_kg": 3.57e-08
    },
    "85-70-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.22e-10
    },
    "86-30-6": {
      "cancer_CTUh_per_kg": 2.99e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-50-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.29e-06
    },
    "86-57-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-73-7": {
      "cancer_CTUh_per_kg": 1.53e-06,
      "noncancer_CTUh_per_kg": 7.56e-08
    },
    "86-74-8": {
      "cancer_CTUh_per_kg": 1.01e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "872-50-4": {
      "cancer_CTUh_per_kg": 2.2e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-56-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-62-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-68-3": {
      "cancer_CTUh_per_kg": 2.11e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-82-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.24e-05
    },
    "88-06-2": {
      "cancer_CTUh_per_kg": 7.96e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-12-0": {
      "cancer_CTUh_per_kg": 3.33e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "886-50-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.5e-05
    },
    "88671-89-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.53e-07
    },
    "88-72-2": {
      "cancer_CTUh_per_kg": 9.31e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-73-3": {
      "cancer_CTUh_per_kg": 5.21e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "9006-42-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.25e-11
    },
    "900-95-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.000123
    },
    "90-12-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-43-7": {
      "cancer_CTUh_per_kg": 8.8e-09,
      "noncancer_CTUh_per_kg": 5.81e-09
    },
    "91-23-6": {
      "cancer_CTUh_per_kg": 4.32e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-53-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.68e-07
    },
    "91-57-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.99e-08
    },
    "91-64-5": {
      "cancer_CTUh_per_kg": 1.13e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-94-1": {
      "cancer_CTUh_per_kg": 6.65e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "919-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.51e-05
    },
    "92-52-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.3e-09
    },
    "92-69-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-87-5": {
      "cancer_CTUh_per_kg": 0.000301,
      "noncancer_CTUh_per_kg": 7.99e-07
    },
    "93-15-2": {
      "cancer_CTUh_per_kg": 3.99e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-11-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "944-22-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.5e-06
    },
    "94-52-0": {
      "cancer_CTUh_per_kg": 6e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-80-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.82e-07
    },
    "950-37-8": {
      "cancer_CTUh_per_kg": 5.06e-06,
      "noncancer_CTUh_per_kg": 4.88e-06
    },
    "95-33-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-48-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.27e-08
    },
    "95-49-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.18e-07
    },
    "95-50-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.21e-08
    },
    "95-57-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.52e-07
    },
    "95-63-6": {
      "cancer_CTUh_per_kg": 3.51e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-65-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.98e-06
    },
    "95737-68-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.02e-08
    },
    "95-74-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "957-51-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.17e-07
    },
    "95-80-7": {
      "cancer_CTUh_per_kg": 2.01e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-94-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.56e-05
    },
    "95-95-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.42e-07
    },
    "96-09-3": {
      "cancer_CTUh_per_kg": 4.33e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "961-11-5": {
      "cancer_CTUh_per_kg": 4.49e-07,
      "noncancer_CTUh_per_kg": 7.32e-07
    },
    "96-24-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-45-7": {
      "cancer_CTUh_per_kg": 5.28e-07,
      "noncancer_CTUh_per_kg": 4.39e-07
    },
    "96-48-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-53-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-74-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-77-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-01-1": {
      "cancer_CTUh_per_kg": 2.98e-08,
      "noncancer_CTUh_per_kg": 3.75e-07
    },
    "98-54-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-82-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.44e-08
    },
    "98-92-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-95-3": {
      "cancer_CTUh_per_kg": 5.69e-07,
      "noncancer_CTUh_per_kg": 2.8e-06
    },
    "99-30-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.04e-07
    },
    "99-35-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.11e-06
    },
    "99-55-8": {
      "cancer_CTUh_per_kg": 1.67e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-56-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-65-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.17e-05
    },
    "999-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-99-0": {
      "cancer_CTUh_per_kg": 1.86e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26148-68-5": {
      "cancer_CTUh_per_kg": 8.23e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "968-81-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18523-69-8": {
      "cancer_CTUh_per_kg": 8.4e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34627-78-6": {
      "cancer_CTUh_per_kg": 1.93e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "520-45-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "114-83-0": {
      "cancer_CTUh_per_kg": 1.36e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4075-79-0": {
      "cancer_CTUh_per_kg": 3.19e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18699-02-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "616-91-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50594-66-6": {
      "cancer_CTUh_per_kg": 5.18e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3054-95-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "628-94-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3688-53-7": {
      "cancer_CTUh_per_kg": 3.55e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1402-68-2": {
      "cancer_CTUh_per_kg": 0.0381,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-59-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2835-39-4": {
      "cancer_CTUh_per_kg": 2.78e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-49-2": {
      "cancer_CTUh_per_kg": 6.77e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17026-81-2": {
      "cancer_CTUh_per_kg": 7.62e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6109-97-3": {
      "cancer_CTUh_per_kg": 2.06e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "82-28-0": {
      "cancer_CTUh_per_kg": 1.07e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "38514-71-5": {
      "cancer_CTUh_per_kg": 7.51e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-88-0": {
      "cancer_CTUh_per_kg": 7.82e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117-79-3": {
      "cancer_CTUh_per_kg": 3.55e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-56-3": {
      "cancer_CTUh_per_kg": 3.18e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-67-1": {
      "cancer_CTUh_per_kg": 2.21e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3693-22-9": {
      "cancer_CTUh_per_kg": 1.26e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60142-96-3": {
      "cancer_CTUh_per_kg": 7.25e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2432-99-7": {
      "cancer_CTUh_per_kg": 1.42e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3012-65-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7177-48-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-46-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4180-23-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15879-93-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "134-29-2": {
      "cancer_CTUh_per_kg": 1.68e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "134-03-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22839-47-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68844-77-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "446-86-6": {
      "cancer_CTUh_per_kg": 2.05e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25843-45-2": {
      "cancer_CTUh_per_kg": 0.00154,
      "noncancer_CTUh_per_kg": 0.0
    },
    "30516-87-1": {
      "cancer_CTUh_per_kg": 3.83e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "531-85-1": {
      "cancer_CTUh_per_kg": 2.45e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-76-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-53-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-78-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-32-1": {
      "cancer_CTUh_per_kg": 7.13e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3012-37-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2185-92-4": {
      "cancer_CTUh_per_kg": 7.7e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6731-36-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23746-34-1": {
      "cancer_CTUh_per_kg": 2.31e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21260-46-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1937-37-7": {
      "cancer_CTUh_per_kg": 0.0048,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2475-45-8": {
      "cancer_CTUh_per_kg": 2.9e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "860-22-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2784-94-3": {
      "cancer_CTUh_per_kg": 9.46e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33229-34-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "540-51-2": {
      "cancer_CTUh_per_kg": 1.05e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16071-86-6": {
      "cancer_CTUh_per_kg": 7.43e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51333-22-3": {
      "cancer_CTUh_per_kg": 0.000438,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-26-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2409-55-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "592-31-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3068-88-0": {
      "cancer_CTUh_per_kg": 2.27e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14239-68-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "331-39-5": {
      "cancer_CTUh_per_kg": 7.68e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-14-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-54-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-59-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7235-40-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2244-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "169590-42-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56980-93-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "474-25-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-28-6": {
      "cancer_CTUh_per_kg": 1.17e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "302-22-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-79-1": {
      "cancer_CTUh_per_kg": 1.41e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "37087-94-8": {
      "cancer_CTUh_per_kg": 6.38e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5131-60-2": {
      "cancer_CTUh_per_kg": 1.12e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-83-0": {
      "cancer_CTUh_per_kg": 9.75e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-79-4": {
      "cancer_CTUh_per_kg": 1.43e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3165-93-3": {
      "cancer_CTUh_per_kg": 3.09e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-88-7": {
      "cancer_CTUh_per_kg": 1.48e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-45-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.7e-09
    },
    "75-00-3": {
      "cancer_CTUh_per_kg": 1.41e-08,
      "noncancer_CTUh_per_kg": 5.24e-10
    },
    "593-70-4": {
      "cancer_CTUh_per_kg": 1.6e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6959-48-4": {
      "cancer_CTUh_per_kg": 4.75e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10473-70-8": {
      "cancer_CTUh_per_kg": 3.84e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "590-21-6": {
      "cancer_CTUh_per_kg": 1.39e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2837-89-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-20-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51481-61-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14371-10-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-29-6": {
      "cancer_CTUh_per_kg": 7.84e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52214-84-3": {
      "cancer_CTUh_per_kg": 0.000458,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22494-47-9": {
      "cancer_CTUh_per_kg": 1.41e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "637-07-0": {
      "cancer_CTUh_per_kg": 2.29e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88107-10-2": {
      "cancer_CTUh_per_kg": 4.85e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-50-1": {
      "cancer_CTUh_per_kg": 4.58e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-71-8": {
      "cancer_CTUh_per_kg": 5.62e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-73-9": {
      "cancer_CTUh_per_kg": 6.1e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "156-62-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12663-46-6": {
      "cancer_CTUh_per_kg": 1.17e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1192-28-5": {
      "cancer_CTUh_per_kg": 7.8e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-18-0": {
      "cancer_CTUh_per_kg": 3.58e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-08-0": {
      "cancer_CTUh_per_kg": 1.93e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-19-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-43-0": {
      "cancer_CTUh_per_kg": 6.33e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "853-23-6": {
      "cancer_CTUh_per_kg": 1.4e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51481-10-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-01-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-02-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "720-69-4": {
      "cancer_CTUh_per_kg": 4.09e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7336-20-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "538-41-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "785-30-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "636-23-7": {
      "cancer_CTUh_per_kg": 2.63e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6369-59-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "439-14-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "262-12-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4106-66-5": {
      "cancer_CTUh_per_kg": 1.21e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56654-52-5": {
      "cancer_CTUh_per_kg": 1.91e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1717-00-6": {
      "cancer_CTUh_per_kg": 3.63e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "609-20-1": {
      "cancer_CTUh_per_kg": 1.35e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7572-29-4": {
      "cancer_CTUh_per_kg": 4.32e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "764-41-0": {
      "cancer_CTUh_per_kg": 6.86e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33857-26-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-71-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.25e-07
    },
    "80-07-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-34-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-16-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1212-29-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-21-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "298-18-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7347-49-1": {
      "cancer_CTUh_per_kg": 5.71e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "617-84-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21626-89-1": {
      "cancer_CTUh_per_kg": 1.93e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-90-6": {
      "cancer_CTUh_per_kg": 2.19e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3276-41-3": {
      "cancer_CTUh_per_kg": 4.72e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-84-6": {
      "cancer_CTUh_per_kg": 9.6e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "695-53-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-93-0": {
      "cancer_CTUh_per_kg": 1.76e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-11-7": {
      "cancer_CTUh_per_kg": 4.89e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "756-79-6": {
      "cancer_CTUh_per_kg": 6.53e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "597-25-1": {
      "cancer_CTUh_per_kg": 8.31e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "551-92-8": {
      "cancer_CTUh_per_kg": 2.8e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1095-90-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "58-15-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24448-94-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-97-6": {
      "cancer_CTUh_per_kg": 0.000237,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1643-20-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26049-69-4": {
      "cancer_CTUh_per_kg": 8.17e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "513-37-1": {
      "cancer_CTUh_per_kg": 5e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55380-34-2": {
      "cancer_CTUh_per_kg": 1.76e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25321-14-6": {
      "cancer_CTUh_per_kg": 7.11e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "971-15-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13256-06-9": {
      "cancer_CTUh_per_kg": 4.12e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74-31-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-29-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-09-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25265-71-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-46-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-38-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "476-66-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "518-82-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13838-16-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8015-30-3": {
      "cancer_CTUh_per_kg": 0.000582,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6381-77-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29975-16-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-67-0": {
      "cancer_CTUh_per_kg": 1.1e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "536-33-4": {
      "cancer_CTUh_per_kg": 9.4e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-69-6": {
      "cancer_CTUh_per_kg": 7.28e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "938-73-8": {
      "cancer_CTUh_per_kg": 1.57e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-83-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "63885-23-4": {
      "cancer_CTUh_per_kg": 4.41e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "759-73-9": {
      "cancer_CTUh_per_kg": 4.76e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20941-65-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-87-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "842-00-2": {
      "cancer_CTUh_per_kg": 6.01e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "41340-25-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98319-26-7": {
      "cancer_CTUh_per_kg": 1.14e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "363-17-7": {
      "cancer_CTUh_per_kg": 5.34e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "324-93-6": {
      "cancer_CTUh_per_kg": 8.01e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "398-32-3": {
      "cancer_CTUh_per_kg": 6.19e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93957-54-1": {
      "cancer_CTUh_per_kg": 2e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "32852-21-4": {
      "cancer_CTUh_per_kg": 2.89e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3570-75-0": {
      "cancer_CTUh_per_kg": 1.61e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54-31-9": {
      "cancer_CTUh_per_kg": 3.24e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25812-30-0": {
      "cancer_CTUh_per_kg": 8.28e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67730-11-4": {
      "cancer_CTUh_per_kg": 1.12e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67730-10-3": {
      "cancer_CTUh_per_kg": 4.29e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2757-90-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "765-34-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.12e-06
    },
    "471-53-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2353-45-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-07-8": {
      "cancer_CTUh_per_kg": 1.66e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "517-28-2": {
      "cancer_CTUh_per_kg": 7.99e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1121-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-83-6": {
      "cancer_CTUh_per_kg": 2.83e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "628-02-4": {
      "cancer_CTUh_per_kg": 5.31e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "136-77-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26049-71-8": {
      "cancer_CTUh_per_kg": 3.53e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26049-68-3": {
      "cancer_CTUh_per_kg": 1.16e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26049-70-7": {
      "cancer_CTUh_per_kg": 9.37e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24589-77-3": {
      "cancer_CTUh_per_kg": 2.38e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "58-93-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-23-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-16-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-95-2": {
      "cancer_CTUh_per_kg": 5.28e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1083-57-4": {
      "cancer_CTUh_per_kg": 1.1e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "129-43-1": {
      "cancer_CTUh_per_kg": 4.54e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51410-44-7": {
      "cancer_CTUh_per_kg": 1.22e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5208-87-7": {
      "cancer_CTUh_per_kg": 2.73e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5634-39-9": {
      "cancer_CTUh_per_kg": 8.4e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-48-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76180-96-6": {
      "cancer_CTUh_per_kg": 0.000147,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-11-7": {
      "cancer_CTUh_per_kg": 3.29e-10,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26675-46-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86315-52-8": {
      "cancer_CTUh_per_kg": 1.81e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-58-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16846-24-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "520-18-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "501-30-4": {
      "cancer_CTUh_per_kg": 1.19e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "303-34-4": {
      "cancer_CTUh_per_kg": 1.58e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "19010-66-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "434-13-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50264-69-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21884-44-6": {
      "cancer_CTUh_per_kg": 7.01e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52-76-6": {
      "cancer_CTUh_per_kg": 4.16e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24382-04-5": {
      "cancer_CTUh_per_kg": 6.18e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69-65-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "71125-38-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "148-82-3": {
      "cancer_CTUh_per_kg": 0.000752,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15356-70-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "155-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "72-33-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-39-6": {
      "cancer_CTUh_per_kg": 1.91e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-98-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.84e-06
    },
    "493-78-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "135-23-9": {
      "cancer_CTUh_per_kg": 1.35e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-56-0": {
      "cancer_CTUh_per_kg": 2e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3544-23-8": {
      "cancer_CTUh_per_kg": 1.69e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5834-17-3": {
      "cancer_CTUh_per_kg": 1.13e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "934-00-9": {
      "cancer_CTUh_per_kg": 6.25e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "298-81-7": {
      "cancer_CTUh_per_kg": 1.37e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-55-0": {
      "cancer_CTUh_per_kg": 6.91e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6294-89-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55-80-1": {
      "cancer_CTUh_per_kg": 5.71e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-63-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "70-25-7": {
      "cancer_CTUh_per_kg": 2.34e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "129-15-7": {
      "cancer_CTUh_per_kg": 5.03e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21638-36-8": {
      "cancer_CTUh_per_kg": 1.52e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16699-10-8": {
      "cancer_CTUh_per_kg": 0.000168,
      "noncancer_CTUh_per_kg": 0.0
    },
    "63412-06-6": {
      "cancer_CTUh_per_kg": 6.55e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14026-03-0": {
      "cancer_CTUh_per_kg": 3.13e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "36702-44-0": {
      "cancer_CTUh_per_kg": 4.83e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "443-72-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-85-1": {
      "cancer_CTUh_per_kg": 4.79e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-14-4": {
      "cancer_CTUh_per_kg": 1.57e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64049-29-2": {
      "cancer_CTUh_per_kg": 2.43e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "838-88-0": {
      "cancer_CTUh_per_kg": 7.67e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-61-1": {
      "cancer_CTUh_per_kg": 8.34e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-47-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13552-44-8": {
      "cancer_CTUh_per_kg": 6.79e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "471-29-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-71-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-57-2": {
      "cancer_CTUh_per_kg": 1.65e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64091-91-4": {
      "cancer_CTUh_per_kg": 0.000734,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-62-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "611-32-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "622-97-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-04-2": {
      "cancer_CTUh_per_kg": 1.51e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-94-8": {
      "cancer_CTUh_per_kg": 1.51e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39801-14-4": {
      "cancer_CTUh_per_kg": 0.000245,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59122-46-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "315-22-0": {
      "cancer_CTUh_per_kg": 4.39e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3031-51-4": {
      "cancer_CTUh_per_kg": 1.12e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55-98-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3771-19-5": {
      "cancer_CTUh_per_kg": 0.000359,
      "noncancer_CTUh_per_kg": 0.0
    },
    "389-08-2": {
      "cancer_CTUh_per_kg": 4.33e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-86-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-46-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-88-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-59-8": {
      "cancer_CTUh_per_kg": 1.14e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-16-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13927-77-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "139-94-6": {
      "cancer_CTUh_per_kg": 6.19e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1777-84-0": {
      "cancer_CTUh_per_kg": 3.5e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-59-2": {
      "cancer_CTUh_per_kg": 4.17e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-55-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2122-86-3": {
      "cancer_CTUh_per_kg": 7.18e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2578-75-8": {
      "cancer_CTUh_per_kg": 1.75e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "531-82-8": {
      "cancer_CTUh_per_kg": 3.85e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24554-26-5": {
      "cancer_CTUh_per_kg": 1.98e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51325-35-0": {
      "cancer_CTUh_per_kg": 7.05e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-19-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5307-14-2": {
      "cancer_CTUh_per_kg": 1.37e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "619-17-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "627-05-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "600-24-8": {
      "cancer_CTUh_per_kg": 3.89e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-20-9": {
      "cancer_CTUh_per_kg": 3.65e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "555-84-0": {
      "cancer_CTUh_per_kg": 1.56e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5522-43-0": {
      "cancer_CTUh_per_kg": 4.56e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "607-35-2": {
      "cancer_CTUh_per_kg": 3.12e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16813-36-8": {
      "cancer_CTUh_per_kg": 0.000423,
      "noncancer_CTUh_per_kg": 0.0
    },
    "760-60-1": {
      "cancer_CTUh_per_kg": 9.05e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "615-53-2": {
      "cancer_CTUh_per_kg": 0.000101,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55556-92-8": {
      "cancer_CTUh_per_kg": 0.000897,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1133-64-8": {
      "cancer_CTUh_per_kg": 5.57e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51542-33-7": {
      "cancer_CTUh_per_kg": 6.63e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "625-89-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "156-10-5": {
      "cancer_CTUh_per_kg": 2.55e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "40580-89-0": {
      "cancer_CTUh_per_kg": 3.79e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "614-00-6": {
      "cancer_CTUh_per_kg": 0.000453,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-89-2": {
      "cancer_CTUh_per_kg": 0.000731,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5632-47-3": {
      "cancer_CTUh_per_kg": 1.19e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "930-55-2": {
      "cancer_CTUh_per_kg": 0.000212,
      "noncancer_CTUh_per_kg": 0.0
    },
    "611-23-4": {
      "cancer_CTUh_per_kg": 2.32e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23282-20-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68-23-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "244-63-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-36-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "303-47-9": {
      "cancer_CTUh_per_kg": 0.0148,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29082-74-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143-19-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "73590-58-6": {
      "cancer_CTUh_per_kg": 6.92e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6373-74-6": {
      "cancer_CTUh_per_kg": 6.23e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1936-15-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "604-75-1": {
      "cancer_CTUh_per_kg": 4.33e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3096-50-2": {
      "cancer_CTUh_per_kg": 6.1e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-80-4": {
      "cancer_CTUh_per_kg": 4.1e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13752-51-7": {
      "cancer_CTUh_per_kg": 9.4e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-77-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "434-07-1": {
      "cancer_CTUh_per_kg": 1.1e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "149-29-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60102-37-6": {
      "cancer_CTUh_per_kg": 4.24e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-44-2": {
      "cancer_CTUh_per_kg": 5.46e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-80-0": {
      "cancer_CTUh_per_kg": 1.59e-08,
      "noncancer_CTUh_per_kg": 1.69e-07
    },
    "136-40-3": {
      "cancer_CTUh_per_kg": 2.88e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-30-7": {
      "cancer_CTUh_per_kg": 4.87e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-09-8": {
      "cancer_CTUh_per_kg": 5.58e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-84-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7227-91-0": {
      "cancer_CTUh_per_kg": 3.33e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-25-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25451-15-4": {
      "cancer_CTUh_per_kg": 7.27e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "842-07-9": {
      "cancer_CTUh_per_kg": 2.19e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-33-9": {
      "cancer_CTUh_per_kg": 5.02e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "541-69-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "615-28-1": {
      "cancer_CTUh_per_kg": 3.94e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "624-18-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61-76-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-96-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7681-93-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "36322-90-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1955-45-9": {
      "cancer_CTUh_per_kg": 1.86e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6673-35-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2955-38-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29069-24-7": {
      "cancer_CTUh_per_kg": 9.76e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-24-8": {
      "cancer_CTUh_per_kg": 0.0001,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-03-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "125-33-7": {
      "cancer_CTUh_per_kg": 5.37e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54-80-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1120-71-4": {
      "cancer_CTUh_per_kg": 1.18e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-57-8": {
      "cancer_CTUh_per_kg": 6.17e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13010-07-6": {
      "cancer_CTUh_per_kg": 2.53e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "816-57-9": {
      "cancer_CTUh_per_kg": 1e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-07-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22760-18-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2611-82-7": {
      "cancer_CTUh_per_kg": 6.07e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-96-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-33-6": {
      "cancer_CTUh_per_kg": 5.41e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117-39-5": {
      "cancer_CTUh_per_kg": 3.28e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-11-3": {
      "cancer_CTUh_per_kg": 1.46e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2425-85-6": {
      "cancer_CTUh_per_kg": 1.9e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6471-49-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3761-53-3": {
      "cancer_CTUh_per_kg": 3.06e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1248-18-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4548-53-2": {
      "cancer_CTUh_per_kg": 1.52e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-55-5": {
      "cancer_CTUh_per_kg": 7.52e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-47-9": {
      "cancer_CTUh_per_kg": 1.05e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "480-54-6": {
      "cancer_CTUh_per_kg": 6.67e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "989-38-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13292-46-1": {
      "cancer_CTUh_per_kg": 9.99e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "569-61-9": {
      "cancer_CTUh_per_kg": 4.03e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "153-18-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6485-34-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-59-7": {
      "cancer_CTUh_per_kg": 1.12e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18559-94-9": {
      "cancer_CTUh_per_kg": 1.49e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "599-79-1": {
      "cancer_CTUh_per_kg": 1.49e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5456-28-0": {
      "cancer_CTUh_per_kg": 0.000272,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-34-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "533-31-3": {
      "cancer_CTUh_per_kg": 1.3e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "959-24-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10048-13-2": {
      "cancer_CTUh_per_kg": 0.000282,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57817-89-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-30-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56038-13-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-50-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-13-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-68-1": {
      "cancer_CTUh_per_kg": 1.45e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-69-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-79-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-46-3": {
      "cancer_CTUh_per_kg": 1.41e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "569-57-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-35-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "846-50-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23031-25-6": {
      "cancer_CTUh_per_kg": 1.99e-10,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2438-88-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "63886-77-1": {
      "cancer_CTUh_per_kg": 2.53e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "811-97-2": {
      "cancer_CTUh_per_kg": 1.08e-08,
      "noncancer_CTUh_per_kg": 3.94e-09
    },
    "116-14-3": {
      "cancer_CTUh_per_kg": 4.95e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "40548-68-3": {
      "cancer_CTUh_per_kg": 1.69e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55566-30-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-79-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15318-45-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-69-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "139-65-1": {
      "cancer_CTUh_per_kg": 7.88e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1271-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10191-41-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1156-19-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64-77-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-19-7": {
      "cancer_CTUh_per_kg": 1.81e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "638-03-9": {
      "cancer_CTUh_per_kg": 2.72e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "636-21-5": {
      "cancer_CTUh_per_kg": 6.88e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "540-23-8": {
      "cancer_CTUh_per_kg": 2.71e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "622-51-5": {
      "cancer_CTUh_per_kg": 1.22e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-25-5": {
      "cancer_CTUh_per_kg": 0.00302,
      "noncancer_CTUh_per_kg": 0.0
    },
    "396-01-0": {
      "cancer_CTUh_per_kg": 7.86e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "538-23-8": {
      "cancer_CTUh_per_kg": 1.96e-10,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-13-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.46e-09
    },
    "75-69-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.24e-08
    },
    "42011-48-3": {
      "cancer_CTUh_per_kg": 7.64e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-48-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-17-7": {
      "cancer_CTUh_per_kg": 5.13e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-15-2": {
      "cancer_CTUh_per_kg": 4.26e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75104-43-7": {
      "cancer_CTUh_per_kg": 0.000178,
      "noncancer_CTUh_per_kg": 0.0
    },
    "72254-58-1": {
      "cancer_CTUh_per_kg": 1.25e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54-12-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "73-22-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34661-75-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "593-60-2": {
      "cancer_CTUh_per_kg": 2.41e-07,
      "noncancer_CTUh_per_kg": 3.38e-07
    },
    "75-01-4": {
      "cancer_CTUh_per_kg": 6.36e-07,
      "noncancer_CTUh_per_kg": 1.57e-06
    },
    "25013-15-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-40-3": {
      "cancer_CTUh_per_kg": 8.24e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-38-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51786-53-9": {
      "cancer_CTUh_per_kg": 3.01e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2832-40-8": {
      "cancer_CTUh_per_kg": 2.98e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6358-85-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5979-28-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "128-66-5": {
      "cancer_CTUh_per_kg": 6.29e-10,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2783-94-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17924-92-4": {
      "cancer_CTUh_per_kg": 2.33e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "136-23-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-63-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-90-2": {
      "cancer_CTUh_per_kg": 8.43e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-88-7": {
      "cancer_CTUh_per_kg": 8.66e-08,
      "noncancer_CTUh_per_kg": 2.32e-06
    },
    "106-92-3": {
      "cancer_CTUh_per_kg": 2.72e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-99-0": {
      "cancer_CTUh_per_kg": 7.63e-08,
      "noncancer_CTUh_per_kg": 1.14e-07
    },
    "107-13-1": {
      "cancer_CTUh_per_kg": 5.17e-06,
      "noncancer_CTUh_per_kg": 6e-06
    },
    "1071-83-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.16e-07
    },
    "108-01-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-03-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-05-4": {
      "cancer_CTUh_per_kg": 6.37e-08,
      "noncancer_CTUh_per_kg": 3.88e-07
    },
    "108-91-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.64e-10
    },
    "108-94-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.05e-09
    },
    "110-97-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-68-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-36-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-44-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.14e-09
    },
    "122-60-1": {
      "cancer_CTUh_per_kg": 7e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-33-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.78e-09
    },
    "126-99-8": {
      "cancer_CTUh_per_kg": 7.48e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-06-0": {
      "cancer_CTUh_per_kg": 2.46e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-19-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "128-37-0": {
      "cancer_CTUh_per_kg": 1.31e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-89-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.74e-05
    },
    "1330-20-7": {
      "cancer_CTUh_per_kg": 4.03e-09,
      "noncancer_CTUh_per_kg": 1.46e-08
    },
    "13356-08-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.36e-08
    },
    "133-90-4": {
      "cancer_CTUh_per_kg": 8.72e-09,
      "noncancer_CTUh_per_kg": 1.35e-06
    },
    "139-05-9": {
      "cancer_CTUh_per_kg": 1.3e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "139-13-9": {
      "cancer_CTUh_per_kg": 2.31e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "145-73-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.33e-07
    },
    "151-56-4": {
      "cancer_CTUh_per_kg": 1.14e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15687-27-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1582-09-8": {
      "cancer_CTUh_per_kg": 3.46e-07,
      "noncancer_CTUh_per_kg": 3.4e-06
    },
    "1596-84-5": {
      "cancer_CTUh_per_kg": 1.28e-09,
      "noncancer_CTUh_per_kg": 1.64e-09
    },
    "1746-01-6": {
      "cancer_CTUh_per_kg": 26.6,
      "noncancer_CTUh_per_kg": 0.0
    },
    "19044-88-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.57e-07
    },
    "1910-42-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.37e-08
    },
    "1918-00-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.51e-07
    },
    "1918-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.79e-07
    },
    "21259-20-1": {
      "cancer_CTUh_per_kg": 0.000132,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22224-92-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1e-06
    },
    "24307-26-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.08e-12
    },
    "24579-73-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.5e-10
    },
    "26644-46-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.73e-07
    },
    "271-89-6": {
      "cancer_CTUh_per_kg": 1.06e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39300-45-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.01e-08
    },
    "443-48-1": {
      "cancer_CTUh_per_kg": 2.98e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4680-78-8": {
      "cancer_CTUh_per_kg": 1.69e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4685-14-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.2e-07
    },
    "50-00-0": {
      "cancer_CTUh_per_kg": 1.36e-07,
      "noncancer_CTUh_per_kg": 1.31e-07
    },
    "50-29-3": {
      "cancer_CTUh_per_kg": 3.69e-05,
      "noncancer_CTUh_per_kg": 2.94e-05
    },
    "51-21-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51-28-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.48e-06
    },
    "5141-20-8": {
      "cancer_CTUh_per_kg": 2.87e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51-79-6": {
      "cancer_CTUh_per_kg": 3.62e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-70-3": {
      "cancer_CTUh_per_kg": 0.00143,
      "noncancer_CTUh_per_kg": 0.0
    },
    "542-75-6": {
      "cancer_CTUh_per_kg": 2.58e-07,
      "noncancer_CTUh_per_kg": 9.95e-06
    },
    "54-85-3": {
      "cancer_CTUh_per_kg": 5.25e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55-18-5": {
      "cancer_CTUh_per_kg": 0.00185,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55-22-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55290-64-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.84e-06
    },
    "556-52-5": {
      "cancer_CTUh_per_kg": 9.71e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "563-41-7": {
      "cancer_CTUh_per_kg": 3.9e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-14-7": {
      "cancer_CTUh_per_kg": 1.67e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-24-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.23e-07
    },
    "58-08-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "58-89-9": {
      "cancer_CTUh_per_kg": 6.57e-06,
      "noncancer_CTUh_per_kg": 7.61e-05
    },
    "58-90-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.28e-05
    },
    "5902-51-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.1e-06
    },
    "59-67-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59756-60-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.65e-07
    },
    "59-87-0": {
      "cancer_CTUh_per_kg": 6.56e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-34-4": {
      "cancer_CTUh_per_kg": 4.77e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6164-98-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.37e-07
    },
    "62-55-5": {
      "cancer_CTUh_per_kg": 6.34e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-75-9": {
      "cancer_CTUh_per_kg": 0.000435,
      "noncancer_CTUh_per_kg": 0.0
    },
    "65-85-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.4e-08
    },
    "67-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 6.71e-09
    },
    "680-31-9": {
      "cancer_CTUh_per_kg": 0.00046,
      "noncancer_CTUh_per_kg": 0.0
    },
    "684-93-5": {
      "cancer_CTUh_per_kg": 0.000495,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7003-89-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.14e-07
    },
    "70-30-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.18e-05
    },
    "71-43-2": {
      "cancer_CTUh_per_kg": 1.79e-07,
      "noncancer_CTUh_per_kg": 4.52e-08
    },
    "72-54-8": {
      "cancer_CTUh_per_kg": 0.000235,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74-87-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.67e-07
    },
    "75-07-0": {
      "cancer_CTUh_per_kg": 1.39e-07,
      "noncancer_CTUh_per_kg": 7.12e-07
    },
    "75-09-2": {
      "cancer_CTUh_per_kg": 4.57e-08,
      "noncancer_CTUh_per_kg": 4.76e-07
    },
    "75-52-5": {
      "cancer_CTUh_per_kg": 5.53e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-56-9": {
      "cancer_CTUh_per_kg": 5.67e-07,
      "noncancer_CTUh_per_kg": 4.9e-06
    },
    "75-60-5": {
      "cancer_CTUh_per_kg": 2.62e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-99-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.36e-07
    },
    "76-03-9": {
      "cancer_CTUh_per_kg": 1.8e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-87-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.46e-05
    },
    "77182-82-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 5.68e-08
    },
    "7773-06-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.84e-08
    },
    "77-92-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-79-5": {
      "cancer_CTUh_per_kg": 1.1e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-93-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.1e-08
    },
    "79-06-1": {
      "cancer_CTUh_per_kg": 6.52e-06,
      "noncancer_CTUh_per_kg": 2.71e-05
    },
    "79-10-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.42e-08
    },
    "79-11-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-43-6": {
      "cancer_CTUh_per_kg": 3.15e-07,
      "noncancer_CTUh_per_kg": 5.36e-07
    },
    "81335-77-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.51e-07
    },
    "85-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.21e-05
    },
    "86-87-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "868-85-9": {
      "cancer_CTUh_per_kg": 2.93e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-51-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-86-5": {
      "cancer_CTUh_per_kg": 4e-05,
      "noncancer_CTUh_per_kg": 8.73e-05
    },
    "88-85-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.52e-05
    },
    "91-20-3": {
      "cancer_CTUh_per_kg": 1.75e-07,
      "noncancer_CTUh_per_kg": 3.74e-08
    },
    "93-72-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.13e-06
    },
    "93-76-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.14e-05
    },
    "94-74-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.46e-05
    },
    "94-75-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.03e-06
    },
    "94-82-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 9.67e-07
    },
    "95-06-7": {
      "cancer_CTUh_per_kg": 1.76e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-12-8": {
      "cancer_CTUh_per_kg": 0.000204,
      "noncancer_CTUh_per_kg": 0.000287
    },
    "96-18-4": {
      "cancer_CTUh_per_kg": 7.91e-06,
      "noncancer_CTUh_per_kg": 1.51e-07
    },
    "96-29-7": {
      "cancer_CTUh_per_kg": 3.29e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-00-0": {
      "cancer_CTUh_per_kg": 4.72e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-07-7": {
      "cancer_CTUh_per_kg": 0.000185,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-86-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 8.08e-09
    },
    "16568-02-8": {
      "cancer_CTUh_per_kg": 1.38e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1078-38-2": {
      "cancer_CTUh_per_kg": 4.02e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22131-79-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3775-55-1": {
      "cancer_CTUh_per_kg": 2.48e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "712-68-5": {
      "cancer_CTUh_per_kg": 0.000124,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-57-0": {
      "cancer_CTUh_per_kg": 9.42e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-66-4": {
      "cancer_CTUh_per_kg": 1.94e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-32-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10589-74-9": {
      "cancer_CTUh_per_kg": 7.93e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-04-1": {
      "cancer_CTUh_per_kg": 1.82e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-92-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61-94-9": {
      "cancer_CTUh_per_kg": 3.8e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-81-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-78-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-02-5": {
      "cancer_CTUh_per_kg": 1.78e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-52-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-14-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 7.57e-07
    },
    "613-94-5": {
      "cancer_CTUh_per_kg": 8.17e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3296-90-0": {
      "cancer_CTUh_per_kg": 4.54e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-60-1": {
      "cancer_CTUh_per_kg": 5.34e-07,
      "noncancer_CTUh_per_kg": 3.15e-07
    },
    "542-88-1": {
      "cancer_CTUh_per_kg": 0.00483,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2602-46-2": {
      "cancer_CTUh_per_kg": 9.66e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2429-74-5": {
      "cancer_CTUh_per_kg": 6.12e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74-96-4": {
      "cancer_CTUh_per_kg": 1.07e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "869-01-2": {
      "cancer_CTUh_per_kg": 9.14e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7422-80-2": {
      "cancer_CTUh_per_kg": 8.84e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56795-65-4": {
      "cancer_CTUh_per_kg": 2.9e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-03-7": {
      "cancer_CTUh_per_kg": 4.54e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "305-03-3": {
      "cancer_CTUh_per_kg": 0.00266,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20265-96-7": {
      "cancer_CTUh_per_kg": 1.07e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-30-2": {
      "cancer_CTUh_per_kg": 4.55e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-57-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "135-20-6": {
      "cancer_CTUh_per_kg": 5.85e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1163-19-5": {
      "cancer_CTUh_per_kg": 1.63e-09,
      "noncancer_CTUh_per_kg": 4.82e-07
    },
    "16338-97-9": {
      "cancer_CTUh_per_kg": 1.55e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39156-41-7": {
      "cancer_CTUh_per_kg": 4.43e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-09-7": {
      "cancer_CTUh_per_kg": 6.08e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "628-36-4": {
      "cancer_CTUh_per_kg": 9.7e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-58-6": {
      "cancer_CTUh_per_kg": 4.56e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20325-40-0": {
      "cancer_CTUh_per_kg": 0.000112,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55738-54-0": {
      "cancer_CTUh_per_kg": 2.11e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "612-82-8": {
      "cancer_CTUh_per_kg": 0.000134,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-44-7": {
      "cancer_CTUh_per_kg": 2.76e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "306-37-6": {
      "cancer_CTUh_per_kg": 0.000763,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4164-28-7": {
      "cancer_CTUh_per_kg": 8.5e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55557-00-1": {
      "cancer_CTUh_per_kg": 0.00181,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-41-0": {
      "cancer_CTUh_per_kg": 1.21e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68-89-3": {
      "cancer_CTUh_per_kg": 2.29e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-40-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22966-79-6": {
      "cancer_CTUh_per_kg": 9.19e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13073-35-3": {
      "cancer_CTUh_per_kg": 9.36e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-21-0": {
      "cancer_CTUh_per_kg": 4.77e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16301-26-1": {
      "cancer_CTUh_per_kg": 0.00267,
      "noncancer_CTUh_per_kg": 0.0
    },
    "38434-77-4": {
      "cancer_CTUh_per_kg": 1.4e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "624-84-0": {
      "cancer_CTUh_per_kg": 2.28e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "149-91-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-06-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-86-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-40-6": {
      "cancer_CTUh_per_kg": 1.33e-09,
      "noncancer_CTUh_per_kg": 0.0
    },
    "531-18-0": {
      "cancer_CTUh_per_kg": 7.88e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10034-93-2": {
      "cancer_CTUh_per_kg": 7.82e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13743-07-2": {
      "cancer_CTUh_per_kg": 0.000209,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-84-2": {
      "cancer_CTUh_per_kg": 4.77e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-86-1": {
      "cancer_CTUh_per_kg": 0.000867,
      "noncancer_CTUh_per_kg": 0.0
    },
    "542-56-3": {
      "cancer_CTUh_per_kg": 1.24e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22071-15-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75330-75-5": {
      "cancer_CTUh_per_kg": 1.4e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-51-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-05-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "758-17-8": {
      "cancer_CTUh_per_kg": 4.25e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66-27-3": {
      "cancer_CTUh_per_kg": 2.65e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "924-42-5": {
      "cancer_CTUh_per_kg": 3.13e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1068-57-1": {
      "cancer_CTUh_per_kg": 8.27e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-58-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "553-53-7": {
      "cancer_CTUh_per_kg": 6.22e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18662-53-8": {
      "cancer_CTUh_per_kg": 9.39e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "36133-88-7": {
      "cancer_CTUh_per_kg": 1.34e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4812-22-0": {
      "cancer_CTUh_per_kg": 6.7e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "602-87-9": {
      "cancer_CTUh_per_kg": 4.9e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-23-7": {
      "cancer_CTUh_per_kg": 3.23e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-24-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1456-28-6": {
      "cancer_CTUh_per_kg": 1.88e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55090-44-3": {
      "cancer_CTUh_per_kg": 7.28e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13256-11-6": {
      "cancer_CTUh_per_kg": 0.00882,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53609-64-6": {
      "cancer_CTUh_per_kg": 6.64e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60599-38-4": {
      "cancer_CTUh_per_kg": 0.000197,
      "noncancer_CTUh_per_kg": 0.0
    },
    "924-16-3": {
      "cancer_CTUh_per_kg": 3.11e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1116-54-7": {
      "cancer_CTUh_per_kg": 1.58e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "621-64-7": {
      "cancer_CTUh_per_kg": 0.000248,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17608-59-2": {
      "cancer_CTUh_per_kg": 8.56e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10595-95-6": {
      "cancer_CTUh_per_kg": 0.00121,
      "noncancer_CTUh_per_kg": 0.0
    },
    "614-95-9": {
      "cancer_CTUh_per_kg": 0.000313,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20917-49-1": {
      "cancer_CTUh_per_kg": 0.00157,
      "noncancer_CTUh_per_kg": 0.0
    },
    "932-83-2": {
      "cancer_CTUh_per_kg": 0.000209,
      "noncancer_CTUh_per_kg": 0.0
    },
    "42579-28-2": {
      "cancer_CTUh_per_kg": 8.61e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-75-4": {
      "cancer_CTUh_per_kg": 8.13e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26541-51-5": {
      "cancer_CTUh_per_kg": 1.53e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27753-52-2": {
      "cancer_CTUh_per_kg": 3.05e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57590-20-2": {
      "cancer_CTUh_per_kg": 1.79e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1119-68-2": {
      "cancer_CTUh_per_kg": 2.97e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "156-51-4": {
      "cancer_CTUh_per_kg": 9.9e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-88-1": {
      "cancer_CTUh_per_kg": 1.22e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-85-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-89-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-66-9": {
      "cancer_CTUh_per_kg": 7.6e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-50-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6459-94-5": {
      "cancer_CTUh_per_kg": 6.28e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "915-67-3": {
      "cancer_CTUh_per_kg": 7.03e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7411-49-6": {
      "cancer_CTUh_per_kg": 7.79e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "509-14-8": {
      "cancer_CTUh_per_kg": 6.84e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "58-55-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-18-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21436-97-5": {
      "cancer_CTUh_per_kg": 1.87e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-20-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66-22-8": {
      "cancer_CTUh_per_kg": 6.6e-08,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-02-5": {
      "cancer_CTUh_per_kg": 7.72e-07,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21436-96-4": {
      "cancer_CTUh_per_kg": 6.37e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-12-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1002-62-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10031-82-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-43-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-48-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-54-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-55-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-68-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-70-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-71-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-79-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1008-88-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1008-89-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10114-58-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-20-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-55-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-82-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-08-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-27-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-81-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-97-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-05-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1031-07-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-74-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-76-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-84-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-13-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-42-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10443-70-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-43-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-51-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-85-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-87-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-90-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-94-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-39-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10540-29-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-46-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1058-92-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-40-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-41-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-63-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-68-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-69-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1067-97-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-94-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-95-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-03-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1070-83-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-12-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-14-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-45-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-47-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-66-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-80-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-87-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-11-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-40-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-44-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-62-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-69-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-84-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-89-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-99-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-01-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-06-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-07-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-09-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-21-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-64-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-65-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-66-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-70-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-75-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-79-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-85-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-87-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-40-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-43-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-49-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-50-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-56-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-62-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-73-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-75-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-77-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-81-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-95-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-98-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-99-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-13-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-18-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-25-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1113-38-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-36-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111381-89-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-47-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-55-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-65-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-78-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-83-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-91-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1119-97-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1120-01-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-12-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1121-60-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-18-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112225-87-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1122-54-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1122-61-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1122-91-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-29-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-36-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-37-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1124-19-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-52-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1126-46-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-70-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-80-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1142-19-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-77-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-44-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-55-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-61-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-32-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-33-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1194-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-93-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12002-48-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12002-53-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-07-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-21-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-51-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-29-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-32-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-46-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-03-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-10-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-79-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-01-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-15-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-25-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-43-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-66-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-96-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-63-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-87-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-81-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-07-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-27-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-52-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-66-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-91-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1300-21-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "130-22-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1302-78-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13150-00-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-79-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-91-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1320-07-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13311-84-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "133-11-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "133-32-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1336-36-3": {
      "cancer_CTUh_per_kg": 7.64e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "135-01-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-19-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-40-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "138-86-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13909-73-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13997-73-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-38-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14062-34-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14064-10-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14088-71-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-89-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-90-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-93-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-03-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-28-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-53-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-91-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-93-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1421-14-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-31-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1423-60-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-87-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-90-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-92-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14315-14-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14548-46-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "148-01-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "148-53-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-19-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-39-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15045-43-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "150-78-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "151-67-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15245-44-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15263-52-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15310-01-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1563-38-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "156-54-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15862-07-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15922-78-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1615-70-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16245-79-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1639-66-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1646-87-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1646-88-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1647-16-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16485-47-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1653-40-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1678-91-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1689-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1689-82-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1695-77-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17372-87-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17584-12-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1761-61-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17754-90-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17849-38-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1820-81-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1835-49-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18368-63-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1846-70-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1871-57-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1918-13-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1928-45-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1929-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1929-88-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "19329-89-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "19335-11-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1945-53-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1962-75-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1966-58-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1982-69-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1984-06-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1984-59-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1984-65-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20056-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2028-63-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20301-63-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2034-22-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2040-96-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2050-68-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "205-43-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2074-50-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20824-56-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2116-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2138-22-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2150-47-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2155-70-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21757-82-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2176-62-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2176-98-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21923-23-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2207-01-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2216-51-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22212-55-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2223-93-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2234-16-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2235-54-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2243-27-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2245-38-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22473-78-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "225-11-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "225-51-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2255-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2257-09-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22726-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2274-67-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22936-86-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23031-36-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2338-12-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23564-06-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2370-63-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24096-53-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2432-12-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24353-61-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2436-93-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2445-07-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24544-04-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2455-24-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2457-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2459-09-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2461-15-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24691-80-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2475-46-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2495-37-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2497-07-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2499-95-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2508-86-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25155-23-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25167-81-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25167-82-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25168-15-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2528-36-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25306-75-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25319-90-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25321-22-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25322-20-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25323-89-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25366-23-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2539-26-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25550-58-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25551-13-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25586-43-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25637-99-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2570-26-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26248-24-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2631-37-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2655-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26787-78-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26952-21-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26972-01-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2703-13-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2703-37-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "271-44-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2720-73-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27304-13-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2741-06-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27458-93-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27541-88-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "279-23-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28108-99-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "281-23-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2814-20-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2845-89-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28519-02-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2859-67-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28652-77-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2866-43-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2867-47-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28680-45-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2869-34-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2905-69-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "291-64-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "292-64-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "294-62-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2961-62-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "297-97-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "298-06-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29812-79-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "30030-25-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "30043-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "301-11-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "302-04-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "304-21-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3073-66-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "309-43-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "31431-39-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3218-02-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3252-43-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3254-66-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3296-50-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33284-50-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3351-05-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33719-74-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3380-34-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3389-71-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33979-03-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34364-42-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3452-97-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34622-58-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3481-20-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3483-12-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34883-43-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "350-46-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3547-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3558-69-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "35597-43-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3567-25-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "35975-00-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "36614-38-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "368-77-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "371-40-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "371-41-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "37248-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3734-48-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3735-01-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "37529-30-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3757-76-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "37680-65-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "37680-73-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3772-94-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "383-63-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "38444-85-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39196-18-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3926-62-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39765-80-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3978-81-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4005-51-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "40321-76-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4044-65-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "40575-34-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4104-14-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4104-75-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4200-95-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "42087-80-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4214-76-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4238-71-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4253-89-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "42835-25-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4301-50-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "434-90-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4403-90-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4412-91-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4455-26-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "447-53-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "447-60-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "454-89-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4593-90-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "459-56-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "459-57-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "462-06-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "462-08-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "464-45-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "464-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4655-34-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "465-73-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4658-28-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "469-61-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "471-25-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "473-55-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4780-79-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "479-27-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4798-44-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "481-42-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "483-65-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4839-46-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "485-49-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "486-25-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4920-77-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "492-37-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "493-09-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "494-99-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "495-54-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "496-11-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "496-16-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "497-37-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "498-66-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "500-22-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "500-99-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "502-39-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "502-56-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50375-10-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "504-20-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "504-29-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "504-63-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "506-96-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "508-32-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5103-71-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5103-74-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51207-31-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "513-48-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "513-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51892-26-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5192-03-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5221-49-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5221-53-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52303-69-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "523-44-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "524-42-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "525-82-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "527-20-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "528-29-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "529-69-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53-16-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "532-02-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "532-55-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5328-01-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5329-14-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "534-13-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "534-22-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "536-60-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5367-28-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "536-75-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "536-90-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5377-20-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "538-68-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5395-75-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5401-94-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "540-38-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "540-59-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "541-28-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54135-80-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "541-85-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54-21-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "542-18-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "542-59-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "542-85-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54406-48-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "544-25-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "544-77-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "547-64-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "551-76-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55-21-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "552-41-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "552-89-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "554-12-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "555-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "555-60-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "555-89-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "556-22-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "556-67-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5581-75-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "558-17-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55-91-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5598-52-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56073-07-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5610-64-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56108-12-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "563-04-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-34-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56348-72-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "563-80-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-55-3": {
      "cancer_CTUh_per_kg": 0.000124,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5663-96-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5673-07-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56803-37-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5683-33-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-93-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56961-20-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "570-24-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57057-83-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-15-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "571-61-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-33-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "573-58-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "575-41-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-62-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57653-85-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "577-11-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "577-19-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "577-33-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "577-85-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57808-65-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "580-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5813-64-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "581-40-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "581-42-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "581-43-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "582-17-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "58-22-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5827-05-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "58-27-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5835-26-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "583-53-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "583-57-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "583-60-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "584-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "584-84-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "585-34-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "586-78-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "586-95-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "586-98-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "587-98-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "588-59-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "589-09-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "589-18-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "589-90-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "590-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5902-95-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "590-66-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "591-21-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "591-78-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "591-80-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5922-60-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "592-46-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "592-76-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "592-82-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "593-08-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "593-57-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "594-20-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "594-27-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "597-43-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-02-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-52-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-74-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "600-07-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "600-36-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-09-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60123-65-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "603-83-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "605-32-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-54-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "606-22-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "607-00-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "607-34-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "607-81-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6089-09-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "609-23-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "609-89-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "610-39-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "611-34-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "613-12-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "613-31-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "613-45-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6146-52-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "614-80-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6153-56-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "615-36-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "615-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "616-73-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "617-51-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6175-49-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "618-85-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6190-65-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "619-15-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "619-24-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "619-50-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "619-72-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "619-80-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "620-88-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "620-95-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "621-08-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "621-42-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "621-77-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "622-40-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "622-45-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-03-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-05-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-12-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-25-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-91-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "625-53-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "625-86-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "626-17-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "626-60-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "626-62-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "626-64-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "627-63-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "628-76-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "628-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "629-04-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "629-19-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "629-40-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "63-05-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "631-61-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "631-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "633-96-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "635-93-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6382-06-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6408-78-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6416-68-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "644-64-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "645-56-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "646-06-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64628-44-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "653-37-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "65-45-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66-25-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66-76-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66-81-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-43-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-47-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68-35-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "683-72-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68608-15-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6876-23-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6921-29-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "693-54-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "693-58-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "693-65-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "693-93-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69-53-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "696-54-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6972-05-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "697-82-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6983-79-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "698-71-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7005-72-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "706-14-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "70-69-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "708-76-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "712-48-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "71-73-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7209-38-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7212-44-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "72-48-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7292-16-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7307-55-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7377-03-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7378-99-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "738-70-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 3.18e-07
    },
    "7398-69-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74-97-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-08-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-18-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-36-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-39-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7542-37-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-57-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-89-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-97-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "760-23-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-29-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "76-38-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "764-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "764-13-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "766-51-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "768-59-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "768-94-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "771-60-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "771-62-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "771-97-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77458-01-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "776-35-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-74-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-78-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7790-94-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "780-11-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-27-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-51-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-62-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-88-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "789-02-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-94-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-57-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-95-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8004-92-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-15-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-38-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8061-51-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8061-53-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "813-78-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81510-83-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-61-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-64-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-77-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "818-08-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-82-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "818-61-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "821-55-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "822-86-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "825-44-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "825-90-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "827-52-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "830-96-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83164-33-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "831-82-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83-34-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83-66-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84-62-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "846-70-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-84-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85918-31-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-40-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86-53-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "868-77-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87130-20-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-17-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "872-31-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "872-85-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "873-63-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "873-75-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "873-76-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-40-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "874-42-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-64-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-72-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "877-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-91-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-04-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-18-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "882-33-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-44-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-68-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-60-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-62-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-63-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-68-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-72-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-82-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-03-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-04-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "9004-70-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-05-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-27-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-59-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-17-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-63-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-88-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "920-66-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "924-41-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-51-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "927-74-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-82-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-83-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "92-88-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "928-96-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-04-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93106-60-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "934-32-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-51-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-71-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "937-20-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-78-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-79-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-91-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "939-23-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94050-52-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "941-98-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-41-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "945-51-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-62-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-67-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-96-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-15-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-16-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-52-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-56-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-68-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-70-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-75-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-84-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-88-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-05-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-17-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "962-58-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-34-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-41-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-11-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-63-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-99-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-05-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-06-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-08-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-09-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-13-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-17-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-88-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-52-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-61-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-71-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-89-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-92-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-93-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "999-61-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-97-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-02-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10004-44-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-17-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-20-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-21-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-25-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-29-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-37-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-46-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-47-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10061-01-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-61-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100-66-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "100784-20-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-02-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101205-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-27-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-42-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1014-69-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1014-70-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-54-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-72-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-77-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-83-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "101-84-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-06-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10222-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-69-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102-82-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "102851-06-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103112-35-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-11-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103361-09-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-65-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-69-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-82-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "103-83-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-40-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-75-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-88-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "104-93-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-37-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-38-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105512-06-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "10552-74-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-53-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-54-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-59-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-75-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-76-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "105-99-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-24-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106325-08-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-42-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-43-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-44-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-48-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "106-49-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1066-45-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1067-14-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-07-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-10-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-11-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-15-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-22-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-27-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-31-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-41-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-64-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1076-46-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-92-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-93-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "107-94-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1081-34-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-18-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-20-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-21-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-24-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-32-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-38-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-42-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-43-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-59-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-67-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-68-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-70-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-80-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-83-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-85-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-86-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-87-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "108-93-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-00-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-46-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-52-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-53-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-55-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-57-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-60-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-73-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-76-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-77-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-83-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-89-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "109-97-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-12-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-15-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-16-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-17-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-19-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-27-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-33-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110488-70-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-58-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-63-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "11067-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-83-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-88-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-91-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-93-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "110-96-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "11104-28-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-14-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-15-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-26-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-27-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-29-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-40-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-41-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "11141-16-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "11141-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-42-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111479-05-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-48-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1115-20-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-69-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-70-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-77-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1118-46-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-86-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-87-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-90-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "111991-09-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-00-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-02-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-05-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-07-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-20-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112226-61-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-24-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-25-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1122-58-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-30-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-34-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-35-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-42-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-53-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-56-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-57-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-60-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1126-34-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1126-79-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-69-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-90-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "112-92-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1129-41-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "113136-77-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1134-23-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1135-99-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "114-07-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "114311-32-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-18-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-19-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-20-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-31-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "115-86-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "116-02-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "116255-48-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117337-19-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117718-60-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "117-84-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-48-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-79-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "118-95-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-12-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1191-50-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119446-68-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1194-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-61-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-64-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "119-65-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1198-55-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-18-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1204-21-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-92-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "120-94-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-21-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-25-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-33-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-34-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1214-39-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-54-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121552-61-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-57-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-73-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-82-4": {
      "cancer_CTUh_per_kg": 4.22e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "121-87-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122836-35-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-88-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122931-48-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "122-99-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-03-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-05-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-07-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-30-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123312-89-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123343-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-38-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-42-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-51-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-54-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-72-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-86-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "123-88-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-02-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-04-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-07-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-09-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-18-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1241-94-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-22-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-30-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-40-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-65-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "124-68-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "125401-92-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-11-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-22-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-30-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-33-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126535-15-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "126-71-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12672-29-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-09-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-20-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-65-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "127-68-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "12771-68-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "128-03-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "128-04-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "128639-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "130-15-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13067-93-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-09-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-11-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131341-86-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131-52-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13181-17-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "131860-33-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1319-77-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1320-18-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1321-94-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "132-64-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "132-65-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13360-45-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13411-16-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "134-20-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13463-41-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "135158-54-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "135-19-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "136-25-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13674-84-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13684-56-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-41-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "137-42-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "138-22-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13826-35-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "13863-31-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "138-93-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1397-94-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-01-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-31-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "140-66-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-10-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141112-29-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-32-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-43-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141776-32-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-82-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "141-97-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1420-06-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1420-07-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-08-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14214-32-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-28-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14235-86-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142459-58-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-62-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-82-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-84-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "142-96-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143-07-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143-08-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14321-27-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143-22-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "143-27-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-21-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14437-17-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-49-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-54-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "144-62-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1461-22-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1461-25-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14816-20-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "14938-35-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "149-57-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "149979-41-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "151-21-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1520-78-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "152-16-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15271-41-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15457-05-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15545-48-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15662-33-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1570-64-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1570-65-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15827-60-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15894-70-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1593-77-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15950-66-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "15972-60-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16022-69-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16079-88-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16090-02-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "161050-58-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16118-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "16484-77-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1663-39-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1689-83-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1698-53-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1698-60-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1702-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17095-24-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1724-39-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "173584-44-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1738-25-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1745-81-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1746-81-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1758-73-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17606-31-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "17796-82-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1787-61-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18181-70-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1821-12-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1836-77-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1843-05-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18467-77-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18479-49-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18530-56-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1854-26-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18691-97-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "18854-01-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1886-81-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1912-26-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1918-18-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1928-43-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1929-73-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1929-82-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1967-16-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1982-47-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1982-49-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "1983-10-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "19937-59-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20030-30-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2008-39-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2008-58-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20120-33-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2016-42-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2016-57-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "20292-08-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2032-59-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2039-46-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2051-60-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2051-61-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2051-62-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2079-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2082-79-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "21564-17-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2163-80-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2164-07-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2164-08-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2186-92-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22042-96-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2215-35-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22248-79-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2227-17-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2234-13-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2235-25-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2270-20-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2275-14-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2279-76-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "22936-75-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "229-87-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "230-27-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2303-25-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2307-68-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2314-09-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23184-66-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23422-53-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23560-59-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2386-53-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "23947-60-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2402-79-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2403-88-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24151-93-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2416-94-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2425-10-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2425-66-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2437-79-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2439-00-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2439-35-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24549-06-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24602-86-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2460-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2463-84-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2464-37-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2492-26-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "24934-91-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2495-39-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25154-52-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25155-30-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25167-83-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25264-93-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25265-77-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25339-17-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25339-53-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25339-56-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "253-52-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25376-45-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25377-83-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2539-17-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2545-59-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2545-60-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25606-41-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25620-58-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2581-34-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25875-51-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2593-15-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "25954-13-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26087-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "260-94-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26140-60-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26172-55-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26225-79-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26258-70-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26259-45-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26264-06-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2631-40-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2634-33-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2642-71-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26444-49-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26489-01-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26530-20-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2668-24-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26761-40-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "26761-45-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2682-20-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2686-99-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2702-72-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27176-87-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27344-41-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27355-22-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27458-92-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "27458-94-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "275-51-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2767-54-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2782-91-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2797-51-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "280-57-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2809-21-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2813-95-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28159-98-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28434-00-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2855-13-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28553-12-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28629-66-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28631-35-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "287-92-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "28804-88-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "288-32-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2893-78-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "2896-70-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29091-05-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29091-21-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29104-30-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29171-20-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "29761-21-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "298-07-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "299-85-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "301-12-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3033-77-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3060-89-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3064-70-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "306-52-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "30899-19-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "311-45-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "31218-83-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "314-40-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "31570-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "319-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3209-22-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3244-90-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "32598-13-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3268-49-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "327-98-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "329-71-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33125-97-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33213-65-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3323-53-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33245-39-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "334-48-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33629-47-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "33693-04-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3383-96-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3397-62-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34123-59-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34256-82-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34643-46-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34681-10-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "34681-23-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3478-94-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "35400-43-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "35575-96-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "35691-65-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "357-57-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "36335-67-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3648-20-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3653-48-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3687-46-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3698-83-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3739-38-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3766-81-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "379-52-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "37971-36-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3811-49-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3813-05-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "385-00-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "38640-62-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "38641-94-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3878-19-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "3942-54-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39515-40-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "39515-51-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4075-81-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4080-31-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4098-71-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "41394-05-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "41483-43-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4170-30-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "41814-78-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "420-04-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "42576-02-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4259-15-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4329-03-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4342-36-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "463-56-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "464-07-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4684-94-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4719-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4726-14-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "475-20-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "481-39-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "482-89-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "485-31-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4901-51-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "4904-61-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "492-22-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "49866-87-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "499-83-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "500-28-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "501-52-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "502-69-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-30-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-31-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "503-74-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "504-24-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50512-35-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "505-32-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50563-36-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "505-65-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5064-31-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "50-65-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "506-93-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51000-52-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51200-87-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51218-49-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5123-63-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51338-27-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "514-10-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "51707-55-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "518-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5208-93-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52-51-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5259-88-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "526-75-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52722-86-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52756-25-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "527-60-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "52888-80-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53112-28-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5324-84-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "533-23-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "533-74-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53445-37-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "534-52-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "53469-21-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "535-80-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "540-88-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54-11-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "541-73-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54593-83-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5464-71-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "54-64-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55283-68-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55335-06-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "554-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55406-53-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "554-84-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "55512-33-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "555-37-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "556-61-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "556-82-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56073-10-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56-36-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "56634-95-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "569-64-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57-09-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57213-69-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "573-56-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57369-32-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5742-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5742-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "576-24-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57646-30-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "578-54-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "57966-95-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5836-29-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "583-78-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "583-91-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "584-79-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "589-16-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-06-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "590-86-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "591-27-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "591-35-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "5915-41-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "592-41-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "593-81-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-50-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "595-37-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59720-42-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "597-64-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-16-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "598-56-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "59-92-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-00-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-12-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "602-01-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60207-31-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "60-24-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "603-86-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6062-26-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "608-31-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "608-71-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "609-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6104-30-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "611-06-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61213-25-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61260-55-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "616-45-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61-73-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "618-62-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "618-87-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61949-76-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "61949-77-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "623-37-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62476-59-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "626-43-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "626-93-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "627-30-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62-76-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "628-63-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "629-11-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "62924-70-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6317-18-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "632-22-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "63284-71-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "634-66-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "634-67-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "634-83-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "634-90-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "636-30-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64-00-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64-02-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64-18-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6419-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64-19-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64359-81-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "645-62-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "646-07-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "64700-56-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6485-55-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "650-51-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6515-38-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "65-30-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "65381-09-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "65732-07-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66063-05-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66230-04-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "66441-23-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6683-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67129-08-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-45-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67564-91-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67-68-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "67989-23-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68-04-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68-11-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68153-01-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "683-18-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68411-30-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68439-50-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68515-42-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68515-43-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68515-47-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68515-49-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68515-51-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68526-86-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68603-15-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68603-87-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6864-37-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68648-87-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68694-11-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "687-47-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68815-67-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "688-73-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "68938-07-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "693-21-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "693-36-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69377-81-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69581-33-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69-72-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "69806-50-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "6988-21-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "700-13-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "700-38-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "70-38-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "70630-17-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "70693-30-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7085-19-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 2.49e-06
    },
    "71-23-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "71283-80-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "71-41-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7149-79-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "71561-11-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7166-19-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "71662-46-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7173-51-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7173-62-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "72178-02-0": {
      "cancer_CTUh_per_kg": 1.23e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7286-84-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "731-27-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "73250-68-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74070-46-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7414-83-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "741-58-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74222-97-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74738-17-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "74-89-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-04-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-12-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-31-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "753-73-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-50-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-64-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "756-80-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-74-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-85-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-86-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-87-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-91-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "75-98-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "763-32-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7646-78-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7664-93-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "767-00-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7696-12-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7700-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "771-61-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7720-78-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "7747-35-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-58-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-71-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77732-09-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-73-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-75-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "779-02-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "77-99-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-30-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-40-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-70-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-90-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-96-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-97-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "78-99-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-08-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-09-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79127-80-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "791-28-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-20-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-21-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79241-46-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-31-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "793-24-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-33-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-41-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79538-32-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79622-59-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-77-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-92-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "79-94-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-00-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8003-19-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8004-87-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-06-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-12-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8022-00-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8027-00-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-46-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8048-52-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "80-56-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "8065-36-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81334-34-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81405-85-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81406-37-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81777-89-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "81-88-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "822-36-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "82560-54-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "826-36-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "82-71-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "830-13-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83261-15-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83-41-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "834-12-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83-42-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "836-30-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83657-22-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "83-89-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84087-01-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "841-06-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84-11-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84-69-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84-75-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "84852-15-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-01-8": {
      "cancer_CTUh_per_kg": 1.06e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-02-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-34-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-41-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-42-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-43-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "85-56-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "86209-51-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87237-48-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87392-12-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87546-18-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-59-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-61-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87-65-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "87674-68-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "877-43-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-09-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88283-41-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-30-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "886-86-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-74-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-75-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-89-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "88-99-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-59-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-61-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-83-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "89-98-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-02-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "9002-93-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "9004-82-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-13-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-15-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-45-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90-47-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "90717-03-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-15-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-22-5": {
      "cancer_CTUh_per_kg": 1.74e-06,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91465-08-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-66-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "91-68-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "928-68-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "929-06-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-08-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "933-75-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "933-78-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "935-92-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "935-95-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93762-80-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "93-89-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-09-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94125-34-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94361-06-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "94-68-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "947-02-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "947-04-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "950-35-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95266-40-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "953-17-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-47-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-51-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-53-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-54-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-64-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-76-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-77-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-82-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-87-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-92-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "95-93-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "959-98-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-13-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96182-53-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-22-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-23-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-31-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-33-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96489-71-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-80-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "96-91-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-02-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-17-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-23-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "973-21-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-61-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-64-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-65-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-86-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97-88-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "97886-45-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-11-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-51-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-52-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-73-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-94-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98967-40-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "98-98-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-06-9": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-08-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-09-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99129-21-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "993-16-8": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-51-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-54-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99607-70-2": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-66-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-87-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "99-96-7": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0
    },
    "41859-67-0": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.64e-06
    },
    "298-46-4": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.66e-06
    },
    "15307-86-5": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 0.0002
    },
    "73334-07-3": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 1.55e-07
    },
    "51384-51-1": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.11e-09
    },
    "723-46-6": {
      "cancer_CTUh_per_kg": 0.0,
      "noncancer_CTUh_per_kg": 4.35e-07
    },
    "191-24-2": {
      "cancer_CTUh_per_kg": 2.93e-05,
      "noncancer_CTUh_per_kg": 0.0
    },
    "193-39-5": {
      "cancer_CTUh_per_kg": 0.000337,
      "noncancer_CTUh_per_kg": 0.0
    },
    "205-99-2": {
      "cancer_CTUh_per_kg": 0.000602,
      "noncancer_CTUh_per_kg": 0.0
    },
    "207-08-9": {
      "cancer_CTUh_per_kg": 0.00167,
      "noncancer_CTUh_per_kg": 0.0
    },
    "218-01-9": {
      "cancer_CTUh_per_kg": 0.000106,
      "noncancer_CTUh_per_kg": 0.0
    },
    "208-96-8": {
      "cancer_CTUh_per_kg": 2.91e-06,
      "noncancer_CTUh_per_kg": 0.0
    }
  },
  "ecotoxicity": {
    "100-00-5": 327.0,
    "100-01-6": 625.0,
    "100-41-4": 1.72,
    "100-42-5": 0.841,
    "100-44-7": 31.2,
    "100-51-6": 39.4,
    "100-52-7": 45.2,
    "100-97-0": 0.371,
    "101-05-3": 53.5,
    "101200-48-0": 22.8,
    "101-21-3": 86.0,
    "1024-57-3": 6120.0,
    "10265-92-6": 713.0,
    "102-71-6": 0.214,
    "10311-84-9": 33.8,
    "103-23-1": 0.0437,
    "103-33-3": 188.0,
    "103-72-0": 103.0,
    "10380-28-6": 257000.0,
    "103-85-5": 49.6,
    "10453-86-8": 306.0,
    "104-76-7": 5.17,
    "105-55-5": 5.53,
    "105-60-2": 2.92,
    "105-67-9": 5.8,
    "10599-90-3": 13700.0,
    "10605-21-7": 17900.0,
    "106-46-7": 17.3,
    "106-47-8": 791.0,
    "106-50-3": 6200.0,
    "106-51-4": 7060.0,
    "1067-33-0": 7500.0,
    "106-89-8": 56.6,
    "106-93-4": 79.7,
    "107-02-8": 4290.0,
    "107-05-1": 2.3,
    "107-06-2": 1.17,
    "107-18-6": 1580.0,
    "107-19-7": 1180.0,
    "107-20-0": 388.0,
    "107-21-1": 0.392,
    "107-29-9": 41.7,
    "107534-96-3": 754.0,
    "107-98-2": 1.21,
    "108-10-1": 0.677,
    "108-31-6": 8.05,
    "108-39-4": 33.5,
    "108-45-2": 144.0,
    "108-46-3": 90.5,
    "1085-98-9": 49.4,
    "108-78-1": 11.9,
    "108-88-3": 0.701,
    "108-90-7": 6.47,
    "108-95-2": 69.0,
    "109-69-3": 0.035,
    "109-86-4": 0.332,
    "109-99-9": 0.294,
    "110-00-9": 1.48,
    "110-44-1": 0.543,
    "110-54-3": 0.0107,
    "110-80-5": 9.32,
    "110-82-7": 0.0564,
    "110-86-1": 6.23,
    "11096-82-5": 2.52,
    "11097-69-1": 319.0,
    "1113-02-6": 108.0,
    "111-30-8": 308.0,
    "111-44-4": 7.56,
    "111-46-6": 0.205,
    "1114-71-2": 5.9,
    "111-76-2": 1.4,
    "112-27-6": 0.13,
    "112410-23-8": 171.0,
    "114-26-1": 1420.0,
    "114369-43-6": 2320.0,
    "115-09-3": 0.0,
    "115-29-7": 1330.0,
    "115-32-2": 2100.0,
    "115-90-2": 2480.0,
    "115-96-8": 115.0,
    "116-06-3": 619.0,
    "1162-65-8": 13700.0,
    "116-29-0": 245.0,
    "117-10-2": 284.0,
    "117-18-0": 15.0,
    "117-80-6": 5730.0,
    "117-81-7": 0.0413,
    "118-74-1": 3510.0,
    "118-75-2": 582.0,
    "118-96-7": 3280.0,
    "119-34-6": 263.0,
    "119-38-0": 5580.0,
    "120068-37-3": 17000.0,
    "120-12-7": 1190.0,
    "120-61-6": 11.6,
    "120-62-7": 77.5,
    "12071-83-9": 58.0,
    "120-72-9": 473.0,
    "120-80-9": 163.0,
    "120-82-1": 31.5,
    "120-83-2": 844.0,
    "120-93-4": 1.11,
    "121-14-2": 2220.0,
    "12122-67-7": 340.0,
    "121-69-7": 20.2,
    "121-75-5": 69.8,
    "121-79-9": 80.6,
    "122-14-5": 327.0,
    "122-34-9": 10300.0,
    "122-39-4": 777.0,
    "122-42-9": 37.3,
    "122-66-7": 100.0,
    "123-31-9": 6040.0,
    "123-91-1": 0.742,
    "12427-38-2": 2330.0,
    "124-48-1": 7.48,
    "126-72-7": 115.0,
    "126-73-8": 2.4,
    "12674-11-2": 83.5,
    "127-00-4": 9.98,
    "127-18-4": 8.74,
    "128-44-9": 0.343,
    "129-00-0": 6810.0,
    "13071-79-9": 10000.0,
    "131-17-9": 59.7,
    "13121-70-5": 58.5,
    "13171-21-6": 13600.0,
    "13194-48-4": 14000.0,
    "132-27-4": 977.0,
    "133-06-2": 400.0,
    "133-07-3": 3370.0,
    "1330-78-5": 0.564,
    "134-32-7": 7.55,
    "13457-18-6": 448.0,
    "134-62-3": 11.4,
    "135-88-6": 914.0,
    "13593-03-8": 71.9,
    "13674-87-8": 1630.0,
    "13684-63-4": 60.2,
    "137-26-8": 3340.0,
    "137-29-1": 5580.0,
    "137-30-4": 1340.0,
    "138261-41-3": 1220.0,
    "139-40-2": 27200.0,
    "140-11-4": 276.0,
    "1401-55-4": 1040.0,
    "140-56-7": 50.4,
    "140-57-8": 589.0,
    "140-79-4": 141.0,
    "140-88-5": 58.6,
    "141-05-9": 69.4,
    "141-66-2": 1450.0,
    "141-78-6": 0.88,
    "141-90-2": 0.0475,
    "1420-04-8": 65500.0,
    "142-59-6": 847.0,
    "14324-55-1": 5310.0,
    "143390-89-0": 955.0,
    "143-50-0": 6380.0,
    "1445-75-6": 1.47,
    "14484-64-1": 114000.0,
    "1453-82-3": 7.08,
    "14698-29-4": 92500.0,
    "14816-18-3": 52.1,
    "148-18-5": 4270.0,
    "148-24-3": 0.79,
    "148-79-8": 3130.0,
    "149-30-4": 145.0,
    "150-50-5": 0.00073,
    "150-68-5": 13400.0,
    "150-76-5": 40.2,
    "15263-53-3": 264.0,
    "15299-99-7": 121.0,
    "1563-66-2": 5860.0,
    "156-60-5": 0.703,
    "1610-18-0": 719.0,
    "1634-04-4": 0.623,
    "1634-78-2": 127000.0,
    "16423-68-0": 63.8,
    "16672-87-0": 102.0,
    "16752-77-5": 1720.0,
    "1689-84-5": 360.0,
    "1689-99-2": 60.0,
    "1694-09-3": 52.0,
    "17109-49-8": 93.9,
    "17804-35-2": 1060.0,
    "18181-80-1": 53.5,
    "1825-21-4": 203.0,
    "1836-75-5": 7.22,
    "1861-32-1": 10.5,
    "1861-40-1": 23.8,
    "1897-45-6": 8260.0,
    "1912-24-9": 3430.0,
    "1918-16-7": 364.0,
    "1929-77-7": 73.3,
    "1934-21-0": 2.88,
    "1948-33-0": 2050.0,
    "19666-30-9": 8560.0,
    "2008-41-5": 17.5,
    "2032-65-7": 7160.0,
    "206-44-0": 313.0,
    "2104-64-5": 1030.0,
    "2104-96-3": 141.0,
    "21087-64-9": 693.0,
    "21609-90-5": 38.6,
    "2163-79-3": 130.0,
    "2164-17-2": 7010.0,
    "21725-46-2": 1760.0,
    "2212-67-1": 190.0,
    "2227-13-6": 0.128,
    "2243-62-1": 358.0,
    "2275-23-2": 0.525,
    "22781-23-3": 1250.0,
    "2303-16-4": 18.7,
    "2303-17-5": 98.8,
    "2310-17-0": 90.4,
    "23103-98-2": 40.1,
    "2312-35-8": 43.5,
    "23135-22-0": 2010.0,
    "23564-05-8": 11.8,
    "2385-85-5": 1.95,
    "23950-58-5": 265.0,
    "24017-47-8": 475.0,
    "2425-06-1": 167.0,
    "2439-01-2": 8340.0,
    "2439-10-3": 6.26,
    "2465-27-2": 1140.0,
    "2489-77-2": 1.53,
    "25013-16-5": 160.0,
    "25057-89-0": 15.5,
    "25168-26-7": 0.827,
    "25311-71-1": 23400.0,
    "2540-82-1": 78.9,
    "2595-54-2": 1340.0,
    "2597-03-7": 2400.0,
    "26002-80-2": 0.0212,
    "2636-26-2": 49.2,
    "26471-62-5": 0.183,
    "26628-22-8": 734.0,
    "2691-41-0": 819.0,
    "2698-41-1": 480.0,
    "27314-13-2": 1510.0,
    "2764-72-9": 4860.0,
    "28249-77-6": 56.2,
    "28434-01-7": 17.0,
    "2921-88-2": 7090.0,
    "29232-93-7": 2710.0,
    "297-78-9": 10500.0,
    "298-00-0": 172.0,
    "298-02-2": 11900.0,
    "298-04-4": 3110.0,
    "29973-13-5": 249.0,
    "299-84-3": 167.0,
    "299-86-5": 114.0,
    "300-76-5": 96.8,
    "302-01-2": 2140.0,
    "302-17-0": 45.0,
    "302-79-4": 343000.0,
    "30560-19-1": 35.1,
    "306-83-2": 2.77,
    "309-00-2": 601.0,
    "315-18-4": 436.0,
    "319-84-6": 643.0,
    "319-85-7": 1820.0,
    "32809-16-8": 27.6,
    "330-54-1": 4640.0,
    "330-55-2": 4760.0,
    "33089-61-1": 0.143,
    "333-41-5": 1570.0,
    "3337-71-1": 11.5,
    "3347-22-6": 1420.0,
    "33820-53-0": 29.0,
    "34014-18-1": 4690.0,
    "35367-38-5": 1490.0,
    "35554-44-0": 5.44,
    "36734-19-7": 2370.0,
    "3689-24-5": 4600.0,
    "38260-54-7": 995.0,
    "3844-45-9": 89.9,
    "39148-24-8": 2.05,
    "39515-41-8": 51300.0,
    "404-86-4": 5.51,
    "40487-42-1": 2210.0,
    "40596-69-8": 0.708,
    "41083-11-8": 330.0,
    "41198-08-7": 27900.0,
    "42874-03-3": 18.3,
    "43121-43-3": 75.1,
    "43222-48-6": 0.499,
    "452-86-8": 57.3,
    "458-37-7": 4.19,
    "470-82-6": 3.67,
    "470-90-6": 5000.0,
    "4824-78-6": 0.793,
    "50-06-6": 14.2,
    "50-28-2": 2340000.0,
    "50-32-8": 8.72,
    "50-44-2": 79.9,
    "50471-44-8": 195.0,
    "505-29-3": 56.2,
    "510-15-6": 61.6,
    "51-03-6": 16.7,
    "51218-45-2": 1220.0,
    "51235-04-2": 26200.0,
    "512-56-1": 0.888,
    "51-52-5": 199.0,
    "51630-58-1": 63800.0,
    "518-75-2": 228000.0,
    "52315-07-8": 13400.0,
    "5234-68-4": 81.2,
    "52645-53-1": 274.0,
    "52-68-6": 12300.0,
    "52918-63-5": 796.0,
    "532-27-4": 5970.0,
    "532-32-1": 49.1,
    "5392-40-5": 11.1,
    "53-96-3": 43.5,
    "548-62-9": 162000.0,
    "55179-31-2": 57.0,
    "55219-65-3": 182.0,
    "55268-74-1": 358.0,
    "55285-14-8": 117.0,
    "55-38-9": 751.0,
    "55-63-0": 1110.0,
    "5567-15-7": 305.0,
    "5598-13-0": 182.0,
    "56-23-5": 0.261,
    "563-12-2": 458.0,
    "563-47-3": 3.51,
    "56-35-9": 4830.0,
    "56-38-2": 19400.0,
    "56425-91-3": 46.4,
    "56-49-5": 11200.0,
    "56-53-1": 511.0,
    "56-72-4": 3320.0,
    "56-75-7": 102.0,
    "56-81-5": 0.0576,
    "57018-04-9": 5.55,
    "57-06-7": 2720.0,
    "57-13-6": 3.05,
    "57-43-2": 51.9,
    "57-55-6": 0.221,
    "576-26-1": 29.7,
    "57-63-6": 77200.0,
    "57-74-9": 502.0,
    "57837-19-1": 169.0,
    "58138-08-2": 13.9,
    "58-14-0": 103.0,
    "59669-26-0": 1190.0,
    "5989-27-5": 0.227,
    "60168-88-9": 1050.0,
    "60207-90-1": 497.0,
    "60-29-7": 0.218,
    "60-35-5": 0.885,
    "60-51-5": 1250.0,
    "60-57-1": 15800.0,
    "606-20-2": 206.0,
    "608-73-1": 9580.0,
    "608-93-5": 336.0,
    "612-83-9": 7400.0,
    "613-50-3": 45.7,
    "61-82-5": 133.0,
    "622-78-6": 3370.0,
    "62-38-4": 146000.0,
    "62-53-3": 6.53,
    "62-56-6": 56.4,
    "62-73-7": 6990.0,
    "630-20-6": 6.11,
    "63-25-2": 731.0,
    "632-99-5": 868.0,
    "634-93-5": 118.0,
    "639-58-7": 118000.0,
    "640-15-3": 6.49,
    "64-17-5": 0.597,
    "64-75-5": 5860.0,
    "64902-72-3": 1390.0,
    "65195-55-3": 136.0,
    "66215-27-8": 34.3,
    "66246-88-6": 149.0,
    "66332-96-5": 346.0,
    "66841-25-6": 35.1,
    "67375-30-8": 4750.0,
    "67-48-1": 2.42,
    "67485-29-4": 1.9,
    "67-56-1": 0.493,
    "67-63-0": 0.565,
    "67-66-3": 2.07,
    "67-72-1": 31.5,
    "67747-09-5": 977.0,
    "68085-85-8": 785.0,
    "68-12-2": 1.01,
    "68359-37-5": 24500.0,
    "68515-48-0": 0.0023,
    "685-91-6": 0.842,
    "6923-22-4": 786.0,
    "69327-76-0": 4.98,
    "693-98-1": 0.148,
    "69409-94-5": 74.2,
    "70124-77-5": 7420.0,
    "709-98-8": 283.0,
    "71-36-3": 0.944,
    "71-55-6": 0.635,
    "72-20-8": 670000.0,
    "72-43-5": 677.0,
    "72-55-9": 12700.0,
    "72-56-0": 28.4,
    "7287-19-6": 8700.0,
    "732-11-6": 10900.0,
    "732-26-3": 503.0,
    "74051-80-2": 25.4,
    "74223-64-6": 772.0,
    "74-83-9": 64.8,
    "75-05-8": 2.09,
    "75-15-0": 2.1,
    "75-21-8": 3.92,
    "75-25-2": 12.6,
    "75-27-4": 1.2,
    "75-35-4": 0.471,
    "75-47-8": 121.0,
    "75-65-0": 0.69,
    "759-94-4": 29.3,
    "76-01-7": 16.7,
    "76-06-2": 573.0,
    "76-44-8": 348.0,
    "76578-14-8": 509.0,
    "76738-62-0": 37.5,
    "77-47-4": 122.0,
    "7786-34-7": 1480.0,
    "78-00-2": 24.5,
    "78-11-5": 0.323,
    "78-34-2": 2590.0,
    "78-42-2": 3.74e-05,
    "78-48-8": 70.8,
    "78587-05-0": 9.45,
    "78-59-1": 19.7,
    "786-19-6": 50.8,
    "78-83-1": 1.71,
    "78-84-2": 6.88,
    "78-87-5": 5.72,
    "79-00-5": 2.81,
    "79-01-6": 1.71,
    "79-19-6": 248.0,
    "79277-27-3": 5310.0,
    "79-34-5": 33.3,
    "79-46-9": 0.918,
    "8001-35-2": 46.2,
    "8003-34-7": 16.6,
    "80-05-7": 198.0,
    "8018-01-7": 4130.0,
    "80-33-1": 472.0,
    "80-62-6": 1.23,
    "80844-07-1": 0.00788,
    "81-07-2": 0.308,
    "81-54-9": 109.0,
    "81-81-2": 7.78,
    "82097-50-5": 1180.0,
    "82558-50-7": 1210.0,
    "82657-04-3": 1380.0,
    "82-68-8": 518.0,
    "828-00-2": 91.0,
    "83055-99-6": 13.6,
    "83121-18-0": 1010.0,
    "83-32-9": 18.7,
    "83-59-0": 844.0,
    "83-79-4": 249.0,
    "84-65-1": 3.28,
    "84-66-2": 34.9,
    "84-74-2": 21.8,
    "85-44-9": 53.3,
    "85-68-7": 9.07,
    "85-70-1": 0.471,
    "86-30-6": 132.0,
    "86-50-0": 7040.0,
    "86-57-7": 125.0,
    "86-73-7": 16.6,
    "86-74-8": 9.9,
    "872-50-4": 2.01,
    "87-56-9": 40.5,
    "87-62-7": 18.5,
    "87-68-3": 59.5,
    "87-82-1": 1.59,
    "88-06-2": 2860.0,
    "88-12-0": 11.4,
    "886-50-0": 1200.0,
    "88671-89-0": 529.0,
    "88-72-2": 61.7,
    "88-73-3": 127.0,
    "9006-42-2": 0.0247,
    "900-95-8": 13900000.0,
    "90-12-0": 3.14,
    "90-43-7": 16.1,
    "91-23-6": 110.0,
    "91-53-2": 99.2,
    "91-57-6": 4.72,
    "91-64-5": 172.0,
    "91-94-1": 25.4,
    "919-86-8": 10.4,
    "92-52-4": 1.21,
    "92-69-3": 41.0,
    "92-87-5": 73.1,
    "93-15-2": 145.0,
    "94-11-1": 783.0,
    "944-22-9": 34200.0,
    "94-52-0": 135.0,
    "94-80-4": 70.9,
    "94-81-5": 37.0,
    "950-37-8": 6580.0,
    "95-33-0": 48.9,
    "95-48-7": 26.0,
    "95-49-8": 1.89,
    "95-50-1": 12.3,
    "95-57-8": 19.3,
    "95-63-6": 4.42,
    "95-65-8": 56.9,
    "95737-68-1": 39.6,
    "95-74-9": 161.0,
    "957-51-7": 21.5,
    "95-80-7": 38.0,
    "95-94-3": 7.32,
    "95-95-4": 1620.0,
    "96-09-3": 81.8,
    "961-11-5": 3150.0,
    "96-24-2": 2.03,
    "96-45-7": 0.585,
    "96-48-0": 50.8,
    "97-00-7": 10400.0,
    "97-53-0": 21.8,
    "97-74-5": 43300.0,
    "97-77-8": 2530.0,
    "98-01-1": 8.9,
    "98-54-4": 106.0,
    "98-82-8": 1.78,
    "98-92-0": 27300.0,
    "98-95-3": 11.6,
    "99-30-9": 81.4,
    "99-35-4": 14200.0,
    "99-55-8": 116.0,
    "99-56-9": 110.0,
    "99-65-0": 3640.0,
    "999-81-5": 28.8,
    "99-99-0": 112.0,
    "26148-68-5": 0.0,
    "968-81-0": 0.0,
    "18523-69-8": 0.0,
    "34627-78-6": 0.0,
    "520-45-6": 0.0,
    "114-83-0": 0.0,
    "4075-79-0": 0.0,
    "18699-02-0": 0.0,
    "616-91-1": 0.0,
    "50594-66-6": 0.0,
    "3054-95-3": 0.0,
    "628-94-4": 0.0,
    "3688-53-7": 0.0,
    "1402-68-2": 0.0,
    "97-59-6": 0.0,
    "2835-39-4": 0.0,
    "81-49-2": 0.0,
    "17026-81-2": 0.0,
    "6109-97-3": 0.0,
    "82-28-0": 0.0,
    "38514-71-5": 0.0,
    "121-88-0": 0.0,
    "117-79-3": 0.0,
    "97-56-3": 0.0,
    "92-67-1": 0.0,
    "3693-22-9": 0.0,
    "60142-96-3": 0.0,
    "2432-99-7": 0.0,
    "3012-65-5": 0.0,
    "7177-48-2": 0.0,
    "104-46-1": 0.0,
    "4180-23-8": 0.0,
    "15879-93-3": 0.0,
    "134-29-2": 0.0,
    "134-03-2": 0.0,
    "22839-47-0": 0.0,
    "68844-77-9": 0.0,
    "446-86-6": 0.0,
    "25843-45-2": 0.0,
    "30516-87-1": 0.0,
    "531-85-1": 0.0,
    "91-76-9": 0.0,
    "119-53-9": 0.0,
    "120-78-5": 0.0,
    "120-32-1": 0.0,
    "3012-37-1": 0.0,
    "2185-92-4": 0.0,
    "6731-36-8": 0.0,
    "23746-34-1": 0.0,
    "21260-46-8": 0.0,
    "1937-37-7": 0.0,
    "2475-45-8": 0.0,
    "860-22-0": 0.0,
    "2784-94-3": 0.0,
    "33229-34-4": 0.0,
    "540-51-2": 0.0,
    "16071-86-6": 0.0,
    "51333-22-3": 0.0,
    "94-26-8": 0.0,
    "2409-55-4": 0.0,
    "592-31-4": 0.0,
    "3068-88-0": 0.0,
    "14239-68-0": 0.0,
    "331-39-5": 0.0,
    "50-14-6": 0.0,
    "62-54-4": 0.0,
    "121-59-5": 0.0,
    "77-65-6": 0.0,
    "7235-40-7": 0.0,
    "2244-16-8": 0.0,
    "169590-42-5": 0.0,
    "56980-93-9": 0.0,
    "474-25-9": 0.0,
    "115-28-6": 0.0,
    "302-22-7": 0.0,
    "101-79-1": 0.0,
    "37087-94-8": 0.0,
    "5131-60-2": 0.0,
    "95-83-0": 0.0,
    "95-79-4": 0.0,
    "3165-93-3": 0.0,
    "75-88-7": 0.0,
    "75-45-6": 0.0,
    "75-00-3": 0.0,
    "593-70-4": 0.0,
    "6959-48-4": 0.0,
    "10473-70-8": 0.0,
    "590-21-6": 0.0,
    "2837-89-0": 0.0,
    "94-20-2": 0.0,
    "51481-61-9": 0.0,
    "14371-10-9": 0.0,
    "87-29-6": 0.0,
    "52214-84-3": 0.0,
    "22494-47-9": 0.0,
    "637-07-0": 0.0,
    "88107-10-2": 0.0,
    "102-50-1": 0.0,
    "120-71-8": 0.0,
    "123-73-9": 0.0,
    "156-62-7": 0.0,
    "12663-46-6": 0.0,
    "1192-28-5": 0.0,
    "50-18-0": 0.0,
    "80-08-0": 0.0,
    "53-19-0": 0.0,
    "53-43-0": 0.0,
    "853-23-6": 0.0,
    "51481-10-8": 0.0,
    "131-01-1": 0.0,
    "50-02-2": 0.0,
    "720-69-4": 0.0,
    "7336-20-1": 0.0,
    "538-41-0": 0.0,
    "785-30-8": 0.0,
    "636-23-7": 0.0,
    "6369-59-1": 0.0,
    "439-14-5": 0.0,
    "262-12-4": 0.0,
    "4106-66-5": 0.0,
    "56654-52-5": 0.0,
    "1717-00-6": 0.0,
    "609-20-1": 0.0,
    "7572-29-4": 0.0,
    "764-41-0": 0.0,
    "33857-26-0": 0.0,
    "75-71-8": 0.0,
    "80-07-9": 0.0,
    "75-34-3": 0.0,
    "97-16-5": 0.0,
    "1212-29-9": 0.0,
    "81-21-0": 0.0,
    "298-18-0": 0.0,
    "7347-49-1": 0.0,
    "617-84-5": 0.0,
    "21626-89-1": 0.0,
    "101-90-6": 0.0,
    "3276-41-3": 0.0,
    "119-84-6": 0.0,
    "695-53-4": 0.0,
    "91-93-0": 0.0,
    "60-11-7": 0.0,
    "756-79-6": 0.0,
    "597-25-1": 0.0,
    "551-92-8": 0.0,
    "1095-90-5": 0.0,
    "58-15-1": 0.0,
    "24448-94-0": 0.0,
    "57-97-6": 0.0,
    "1643-20-5": 0.0,
    "26049-69-4": 0.0,
    "513-37-1": 0.0,
    "55380-34-2": 0.0,
    "25321-14-6": 0.0,
    "971-15-3": 0.0,
    "13256-06-9": 0.0,
    "74-31-7": 0.0,
    "86-29-3": 0.0,
    "102-09-0": 0.0,
    "25265-71-8": 0.0,
    "142-46-1": 0.0,
    "150-38-9": 0.0,
    "476-66-4": 0.0,
    "518-82-1": 0.0,
    "13838-16-9": 0.0,
    "8015-30-3": 0.0,
    "6381-77-7": 0.0,
    "29975-16-4": 0.0,
    "140-67-0": 0.0,
    "536-33-4": 0.0,
    "150-69-6": 0.0,
    "938-73-8": 0.0,
    "77-83-8": 0.0,
    "63885-23-4": 0.0,
    "759-73-9": 0.0,
    "20941-65-5": 0.0,
    "106-87-6": 0.0,
    "90-49-3": 0.0,
    "842-00-2": 0.0,
    "41340-25-4": 0.0,
    "98319-26-7": 0.0,
    "363-17-7": 0.0,
    "324-93-6": 0.0,
    "398-32-3": 0.0,
    "93957-54-1": 0.0,
    "32852-21-4": 0.0,
    "3570-75-0": 0.0,
    "54-31-9": 0.0,
    "25812-30-0": 0.0,
    "67730-11-4": 0.0,
    "67730-10-3": 0.0,
    "2757-90-6": 0.0,
    "765-34-4": 0.0,
    "471-53-4": 0.0,
    "2353-45-9": 0.0,
    "126-07-8": 0.0,
    "517-28-2": 0.0,
    "1121-92-2": 0.0,
    "142-83-6": 0.0,
    "628-02-4": 0.0,
    "136-77-6": 0.0,
    "26049-71-8": 0.0,
    "26049-68-3": 0.0,
    "26049-70-7": 0.0,
    "24589-77-3": 0.0,
    "58-93-5": 0.0,
    "50-23-7": 0.0,
    "103-16-2": 0.0,
    "53-95-2": 0.0,
    "1083-57-4": 0.0,
    "129-43-1": 0.0,
    "51410-44-7": 0.0,
    "5208-87-7": 0.0,
    "5634-39-9": 0.0,
    "144-48-9": 0.0,
    "76180-96-6": 0.0,
    "115-11-7": 0.0,
    "26675-46-7": 0.0,
    "86315-52-8": 0.0,
    "120-58-1": 0.0,
    "16846-24-5": 0.0,
    "520-18-3": 0.0,
    "501-30-4": 0.0,
    "303-34-4": 0.0,
    "19010-66-3": 0.0,
    "434-13-9": 0.0,
    "50264-69-2": 0.0,
    "21884-44-6": 0.0,
    "52-76-6": 0.0,
    "24382-04-5": 0.0,
    "69-65-8": 0.0,
    "71125-38-7": 0.0,
    "148-82-3": 0.0,
    "15356-70-4": 0.0,
    "155-04-4": 0.0,
    "72-33-3": 0.0,
    "57-39-6": 0.0,
    "126-98-7": 0.0,
    "493-78-7": 0.0,
    "135-23-9": 0.0,
    "60-56-0": 0.0,
    "3544-23-8": 0.0,
    "5834-17-3": 0.0,
    "934-00-9": 0.0,
    "298-81-7": 0.0,
    "598-55-0": 0.0,
    "6294-89-9": 0.0,
    "55-80-1": 0.0,
    "112-63-0": 0.0,
    "70-25-7": 0.0,
    "129-15-7": 0.0,
    "21638-36-8": 0.0,
    "16699-10-8": 0.0,
    "63412-06-6": 0.0,
    "14026-03-0": 0.0,
    "36702-44-0": 0.0,
    "443-72-1": 0.0,
    "98-85-1": 0.0,
    "101-14-4": 0.0,
    "64049-29-2": 0.0,
    "838-88-0": 0.0,
    "101-61-1": 0.0,
    "119-47-1": 0.0,
    "13552-44-8": 0.0,
    "471-29-4": 0.0,
    "95-71-6": 0.0,
    "598-57-2": 0.0,
    "64091-91-4": 0.0,
    "91-62-3": 0.0,
    "611-32-5": 0.0,
    "622-97-9": 0.0,
    "56-04-2": 0.0,
    "90-94-8": 0.0,
    "39801-14-4": 0.0,
    "59122-46-2": 0.0,
    "315-22-0": 0.0,
    "3031-51-4": 0.0,
    "55-98-1": 0.0,
    "3771-19-5": 0.0,
    "389-08-2": 0.0,
    "86-86-2": 0.0,
    "93-46-9": 0.0,
    "86-88-4": 0.0,
    "91-59-8": 0.0,
    "81-16-3": 0.0,
    "13927-77-0": 0.0,
    "139-94-6": 0.0,
    "1777-84-0": 0.0,
    "99-59-2": 0.0,
    "92-55-7": 0.0,
    "2122-86-3": 0.0,
    "2578-75-8": 0.0,
    "531-82-8": 0.0,
    "24554-26-5": 0.0,
    "51325-35-0": 0.0,
    "121-19-7": 0.0,
    "5307-14-2": 0.0,
    "619-17-0": 0.0,
    "627-05-4": 0.0,
    "600-24-8": 0.0,
    "67-20-9": 0.0,
    "555-84-0": 0.0,
    "5522-43-0": 0.0,
    "607-35-2": 0.0,
    "16813-36-8": 0.0,
    "760-60-1": 0.0,
    "615-53-2": 0.0,
    "55556-92-8": 0.0,
    "1133-64-8": 0.0,
    "51542-33-7": 0.0,
    "625-89-8": 0.0,
    "156-10-5": 0.0,
    "40580-89-0": 0.0,
    "614-00-6": 0.0,
    "59-89-2": 0.0,
    "5632-47-3": 0.0,
    "930-55-2": 0.0,
    "611-23-4": 0.0,
    "23282-20-4": 0.0,
    "68-23-5": 0.0,
    "244-63-3": 0.0,
    "94-36-0": 0.0,
    "303-47-9": 0.0,
    "29082-74-4": 0.0,
    "143-19-1": 0.0,
    "73590-58-6": 0.0,
    "6373-74-6": 0.0,
    "1936-15-8": 0.0,
    "604-75-1": 0.0,
    "3096-50-2": 0.0,
    "101-80-4": 0.0,
    "13752-51-7": 0.0,
    "102-77-2": 0.0,
    "434-07-1": 0.0,
    "149-29-1": 0.0,
    "60102-37-6": 0.0,
    "62-44-2": 0.0,
    "60-80-0": 4.4,
    "136-40-3": 0.0,
    "57-30-7": 0.0,
    "77-09-8": 0.0,
    "92-84-2": 0.0,
    "7227-91-0": 0.0,
    "89-25-8": 0.0,
    "25451-15-4": 0.0,
    "842-07-9": 0.0,
    "50-33-9": 0.0,
    "541-69-5": 0.0,
    "615-28-1": 0.0,
    "624-18-0": 0.0,
    "61-76-7": 0.0,
    "88-96-0": 0.0,
    "7681-93-8": 0.0,
    "36322-90-4": 0.0,
    "1955-45-9": 0.0,
    "6673-35-4": 0.0,
    "2955-38-6": 0.0,
    "29069-24-7": 0.0,
    "50-24-8": 0.0,
    "53-03-2": 0.0,
    "125-33-7": 0.0,
    "54-80-8": 0.0,
    "1120-71-4": 0.0,
    "57-57-8": 0.0,
    "13010-07-6": 0.0,
    "816-57-9": 0.0,
    "115-07-1": 0.0,
    "22760-18-5": 0.0,
    "2611-82-7": 0.0,
    "98-96-4": 0.0,
    "59-33-6": 0.0,
    "117-39-5": 0.0,
    "105-11-3": 0.0,
    "2425-85-6": 0.0,
    "6471-49-4": 0.0,
    "3761-53-3": 0.0,
    "1248-18-6": 0.0,
    "4548-53-2": 0.0,
    "50-55-5": 0.0,
    "127-47-9": 0.0,
    "480-54-6": 0.0,
    "989-38-8": 0.0,
    "13292-46-1": 0.0,
    "569-61-9": 0.0,
    "153-18-4": 0.0,
    "6485-34-3": 0.0,
    "94-59-7": 0.0,
    "18559-94-9": 0.0,
    "599-79-1": 0.0,
    "5456-28-0": 0.0,
    "144-34-3": 0.0,
    "533-31-3": 0.0,
    "959-24-0": 0.0,
    "10048-13-2": 0.0,
    "57817-89-7": 0.0,
    "108-30-5": 0.0,
    "56038-13-2": 0.0,
    "57-50-1": 0.0,
    "126-13-6": 0.0,
    "57-68-1": 0.0,
    "127-69-5": 0.0,
    "77-79-2": 0.0,
    "77-46-3": 0.0,
    "569-57-3": 0.0,
    "107-35-7": 0.0,
    "846-50-4": 0.0,
    "23031-25-6": 0.0,
    "2438-88-2": 0.0,
    "63886-77-1": 0.0,
    "811-97-2": 0.0,
    "116-14-3": 0.0,
    "40548-68-3": 0.0,
    "124-64-1": 0.0,
    "55566-30-8": 0.0,
    "91-79-2": 0.0,
    "15318-45-3": 0.0,
    "96-69-5": 0.0,
    "139-65-1": 0.0,
    "1271-19-8": 0.0,
    "10191-41-0": 0.0,
    "1156-19-0": 0.0,
    "64-77-7": 0.0,
    "88-19-7": 0.0,
    "638-03-9": 0.0,
    "636-21-5": 0.0,
    "540-23-8": 0.0,
    "622-51-5": 0.0,
    "76-25-5": 0.0,
    "396-01-0": 0.0,
    "538-23-8": 0.0,
    "76-13-1": 0.0,
    "75-69-4": 0.0,
    "42011-48-3": 0.0,
    "127-48-0": 0.0,
    "137-17-7": 0.0,
    "81-15-2": 0.0,
    "75104-43-7": 0.0,
    "72254-58-1": 0.0,
    "54-12-6": 0.0,
    "73-22-3": 0.0,
    "34661-75-1": 0.0,
    "593-60-2": 0.0,
    "75-01-4": 0.0,
    "25013-15-4": 0.0,
    "100-40-3": 0.0,
    "75-38-7": 0.0,
    "51786-53-9": 0.0,
    "2832-40-8": 0.0,
    "6358-85-6": 0.0,
    "5979-28-2": 0.0,
    "128-66-5": 0.0,
    "2783-94-0": 0.0,
    "17924-92-4": 0.0,
    "136-23-2": 0.0,
    "100-63-0": 45.5,
    "103-90-2": 14.9,
    "106-88-7": 3.32,
    "106-92-3": 45.8,
    "106-99-0": 0.0,
    "107-13-1": 55.2,
    "1071-83-6": 71.8,
    "108-01-0": 1.62,
    "108-03-2": 2.79,
    "108-05-4": 10.0,
    "108-91-8": 0.0374,
    "108-94-1": 13.2,
    "110-97-4": 0.111,
    "111-68-2": 0.0933,
    "120-36-5": 11.7,
    "121-44-8": 0.0844,
    "122-60-1": 46.6,
    "123-33-1": 4.95,
    "126-99-8": 0.0697,
    "127-06-0": 6.18,
    "127-19-5": 15.6,
    "128-37-0": 3.6,
    "131-89-5": 14800.0,
    "1330-20-7": 0.862,
    "13356-08-6": 2.45e-05,
    "133-90-4": 17.8,
    "139-05-9": 435000.0,
    "139-13-9": 22.0,
    "145-73-3": 14.6,
    "151-56-4": 3.47,
    "15687-27-1": 15.2,
    "1582-09-8": 308.0,
    "1596-84-5": 0.567,
    "1746-01-6": 361000.0,
    "19044-88-3": 8740.0,
    "1910-42-5": 33.3,
    "1918-00-9": 27.8,
    "1918-02-1": 368.0,
    "21259-20-1": 46000.0,
    "22224-92-6": 750.0,
    "24307-26-4": 0.0301,
    "24579-73-5": 0.0129,
    "26644-46-2": 137.0,
    "271-89-6": 10.7,
    "39300-45-3": 6.25,
    "443-48-1": 55.7,
    "4680-78-8": 24.1,
    "4685-14-7": 5330.0,
    "50-00-0": 33.8,
    "50-29-3": 4300.0,
    "51-21-8": 6900.0,
    "51-28-5": 719.0,
    "5141-20-8": 44.3,
    "51-79-6": 1.87,
    "53-70-3": 9.56,
    "542-75-6": 49.4,
    "54-85-3": 15.7,
    "55-18-5": 8.59,
    "55-22-1": 0.836,
    "55290-64-7": 1090.0,
    "556-52-5": 58.8,
    "563-41-7": 24.8,
    "57-14-7": 45.7,
    "57-24-9": 179.0,
    "58-08-2": 7860.0,
    "58-89-9": 9810.0,
    "58-90-2": 7250.0,
    "5902-51-2": 3130.0,
    "59-67-6": 11.1,
    "59756-60-4": 172.0,
    "59-87-0": 1.6,
    "60-34-4": 162.0,
    "6164-98-3": 0.339,
    "62-55-5": 54.8,
    "62-75-9": 5.85,
    "65-85-0": 5.83,
    "67-64-1": 0.259,
    "680-31-9": 0.281,
    "684-93-5": 47.5,
    "7003-89-6": 0.0,
    "70-30-4": 4330.0,
    "71-43-2": 2.06,
    "72-54-8": 19500.0,
    "74-87-3": 0.316,
    "75-07-0": 8.6,
    "75-09-2": 0.821,
    "75-52-5": 6.07,
    "75-56-9": 5.49,
    "75-60-5": 40.5,
    "75-99-0": 12.8,
    "76-03-9": 6.96,
    "76-87-9": 1240000.0,
    "77182-82-2": 4.1,
    "7773-06-0": 5.46,
    "77-92-9": 2.84,
    "78-79-5": 0.0789,
    "78-93-3": 0.299,
    "79-06-1": 18.3,
    "79-10-7": 16.9,
    "79-11-8": 387.0,
    "79-43-6": 6.2,
    "81335-77-5": 155.0,
    "85-00-7": 73300.0,
    "86-87-3": 15.7,
    "868-85-9": 22.5,
    "87-51-4": 100.0,
    "87-86-5": 8400.0,
    "88-85-7": 6010.0,
    "91-20-3": 1.53,
    "93-72-1": 109.0,
    "93-76-5": 762.0,
    "94-74-6": 125.0,
    "94-75-7": 27.4,
    "94-82-6": 55.7,
    "95-06-7": 413.0,
    "96-12-8": 61.6,
    "96-18-4": 4.5,
    "96-29-7": 6.44,
    "98-00-0": 8.8,
    "98-07-7": 1.18,
    "98-86-2": 5.77,
    "16568-02-8": 0.0,
    "1078-38-2": 0.0,
    "22131-79-9": 0.0,
    "3775-55-1": 0.0,
    "712-68-5": 0.0,
    "99-57-0": 0.0,
    "121-66-4": 0.0,
    "60-32-2": 0.0,
    "10589-74-9": 0.0,
    "142-04-1": 0.0,
    "118-92-3": 0.0,
    "61-94-9": 0.0,
    "50-81-7": 0.0,
    "50-78-2": 0.0,
    "144-02-5": 0.0,
    "67-52-7": 0.0,
    "95-14-7": 32.8,
    "613-94-5": 0.0,
    "3296-90-0": 0.0,
    "108-60-1": 0.0,
    "542-88-1": 0.0,
    "2602-46-2": 0.0,
    "2429-74-5": 0.0,
    "74-96-4": 0.0,
    "869-01-2": 0.0,
    "7422-80-2": 0.0,
    "56795-65-4": 0.0,
    "103-03-7": 0.0,
    "305-03-3": 0.0,
    "20265-96-7": 0.0,
    "107-30-2": 0.0,
    "76-57-3": 0.0,
    "135-20-6": 0.0,
    "1163-19-5": 0.0,
    "16338-97-9": 0.0,
    "39156-41-7": 0.0,
    "137-09-7": 0.0,
    "628-36-4": 0.0,
    "94-58-6": 0.0,
    "20325-40-0": 0.0,
    "55738-54-0": 0.0,
    "612-82-8": 0.0,
    "79-44-7": 0.0,
    "306-37-6": 0.0,
    "4164-28-7": 0.0,
    "55557-00-1": 0.0,
    "57-41-0": 0.0,
    "68-89-3": 0.0,
    "79-40-3": 0.0,
    "22966-79-6": 0.0,
    "13073-35-3": 0.0,
    "67-21-0": 0.0,
    "16301-26-1": 0.0,
    "38434-77-4": 0.0,
    "624-84-0": 0.0,
    "149-91-7": 0.0,
    "77-06-5": 0.0,
    "56-86-0": 0.0,
    "56-40-6": 0.0,
    "531-18-0": 0.0,
    "10034-93-2": 0.0,
    "13743-07-2": 0.0,
    "109-84-2": 0.0,
    "53-86-1": 0.0,
    "542-56-3": 0.0,
    "22071-15-4": 0.0,
    "75330-75-5": 0.0,
    "59-51-8": 0.0,
    "59-05-2": 0.0,
    "758-17-8": 0.0,
    "66-27-3": 0.0,
    "924-42-5": 0.0,
    "1068-57-1": 0.0,
    "124-58-3": 0.0,
    "553-53-7": 0.0,
    "18662-53-8": 0.0,
    "36133-88-7": 0.0,
    "4812-22-0": 0.0,
    "602-87-9": 0.0,
    "62-23-7": 0.0,
    "79-24-3": 0.0,
    "1456-28-6": 0.0,
    "55090-44-3": 0.0,
    "13256-11-6": 0.0,
    "53609-64-6": 0.0,
    "60599-38-4": 0.0,
    "924-16-3": 0.0,
    "1116-54-7": 0.0,
    "621-64-7": 0.0,
    "17608-59-2": 0.0,
    "10595-95-6": 0.0,
    "614-95-9": 0.0,
    "20917-49-1": 0.0,
    "932-83-2": 0.0,
    "42579-28-2": 0.0,
    "100-75-4": 0.0,
    "26541-51-5": 0.0,
    "27753-52-2": 0.0,
    "57590-20-2": 0.0,
    "1119-68-2": 0.0,
    "156-51-4": 0.0,
    "59-88-1": 0.0,
    "110-85-0": 0.0,
    "110-89-4": 0.0,
    "57-66-9": 0.0,
    "99-50-3": 0.0,
    "6459-94-5": 0.0,
    "915-67-3": 0.0,
    "7411-49-6": 0.0,
    "509-14-8": 0.0,
    "58-55-9": 0.0,
    "97-18-7": 0.0,
    "21436-97-5": 0.0,
    "122-20-3": 0.0,
    "66-22-8": 0.0,
    "75-02-5": 0.0,
    "21436-96-4": 0.0,
    "100-12-9": 6.07,
    "1002-62-6": 43.5,
    "10031-82-0": 28.4,
    "100-43-6": 42.9,
    "100-48-1": 7.76,
    "100-54-9": 14.9,
    "100-55-0": 0.618,
    "100-64-1": 13.0,
    "100-68-5": 43.7,
    "100-70-9": 19.0,
    "100-71-0": 2.21,
    "100-79-8": 0.0259,
    "1008-88-4": 31.7,
    "1008-89-5": 15.1,
    "10114-58-6": 58300.0,
    "101-20-2": 7700.0,
    "101-55-3": 4.07,
    "101-81-5": 2.21,
    "101-82-6": 15.1,
    "102-08-9": 39.5,
    "102-27-2": 5.7,
    "102-81-8": 0.0191,
    "102-97-6": 0.139,
    "103-05-9": 27.5,
    "1031-07-8": 14400.0,
    "103-74-2": 157.0,
    "103-76-4": 0.0536,
    "103-84-4": 27.6,
    "104-13-2": 12.9,
    "104-42-7": 10900.0,
    "10443-70-6": 40.9,
    "104-43-8": 0.562,
    "104-51-8": 12.6,
    "104-85-8": 3.41,
    "104-87-0": 4.57,
    "104-90-5": 5.6,
    "104-94-9": 638.0,
    "105-39-5": 582.0,
    "10540-29-1": 2740.0,
    "105-46-4": 1.09,
    "1058-92-0": 24.3,
    "106-40-1": 46.6,
    "106-41-2": 170.0,
    "106-63-8": 66.2,
    "106-68-3": 1.42,
    "106-69-4": 0.225,
    "1067-97-6": 70.7,
    "106-94-5": 1.1,
    "106-95-6": 156.0,
    "107-03-9": 898.0,
    "1070-83-3": 0.697,
    "107-12-0": 0.942,
    "107-14-2": 1670.0,
    "107-45-9": 0.616,
    "107-47-1": 0.83,
    "107-66-4": 19.2,
    "107-80-2": 0.0696,
    "107-87-9": 0.691,
    "108-11-2": 1.51,
    "108-40-7": 34100.0,
    "108-44-1": 252.0,
    "108-62-3": 25.3,
    "108-69-0": 25.1,
    "108-84-9": 0.434,
    "108-89-4": 3.43,
    "108-99-6": 5.22,
    "109-01-3": 0.0976,
    "109-06-8": 1.63,
    "109-07-9": 0.011,
    "109-09-1": 2.06,
    "109-21-7": 3.85,
    "109-64-8": 84.2,
    "109-65-9": 1.02,
    "109-66-0": 0.977,
    "109-70-6": 6.87,
    "109-75-1": 6.39,
    "109-79-5": 0.0167,
    "109-85-3": 0.205,
    "109-87-5": 0.105,
    "110-02-1": 0.409,
    "110-40-7": 12.1,
    "110-43-0": 2.44,
    "110-49-6": 27.2,
    "110-50-9": 317.0,
    "110-56-5": 3.71,
    "110-62-3": 26.3,
    "110-73-6": 0.0267,
    "110-75-8": 0.311,
    "110-77-0": 153.0,
    "110-81-6": 3.45,
    "110-95-2": 0.665,
    "110-98-5": 0.0203,
    "110-99-6": 13.4,
    "111-13-7": 4.6,
    "111-18-2": 2.28,
    "111-25-1": 2.12,
    "1113-38-8": 457.0,
    "111-36-4": 5.64,
    "111381-89-6": 0.124,
    "111-47-7": 1.97,
    "111-55-7": 66.2,
    "111-65-9": 12.9,
    "111-78-4": 1.06,
    "111-83-1": 1.92,
    "111-91-1": 35.0,
    "1119-97-7": 71.3,
    "1120-01-0": 190.0,
    "112-12-9": 0.359,
    "1121-60-4": 8.84,
    "112-18-5": 87.3,
    "112225-87-3": 452.0,
    "1122-54-9": 16.7,
    "1122-61-8": 119.0,
    "1122-91-4": 23.1,
    "112-29-8": 0.483,
    "112-36-7": 0.807,
    "112-37-8": 22.3,
    "1124-19-2": 174000.0,
    "112-52-7": 12.6,
    "1126-46-1": 15.6,
    "112-70-9": 3.73,
    "112-80-1": 0.483,
    "1142-19-4": 0.464,
    "115-77-5": 0.0835,
    "118-44-5": 928.0,
    "118-55-8": 82.0,
    "118-61-6": 7.19,
    "119-32-4": 116.0,
    "119-33-5": 39.7,
    "1194-02-1": 7.52,
    "119-93-7": 577.0,
    "12002-48-1": 21.3,
    "12002-53-8": 0.0981,
    "120-07-0": 1.85,
    "120-21-8": 27.5,
    "120-51-4": 9.22,
    "121-29-9": 24700.0,
    "121-32-4": 15.0,
    "121-46-0": 0.377,
    "121-86-8": 103.0,
    "122-03-2": 2.8,
    "122-10-1": 19200.0,
    "122-79-2": 24.4,
    "123-01-3": 5.94e-06,
    "123-15-9": 13.1,
    "123-25-1": 26.4,
    "123-43-3": 1.47,
    "123-66-0": 8.13,
    "123-92-2": 1.37,
    "123-96-6": 0.809,
    "124-63-0": 88.4,
    "124-87-8": 1040.0,
    "126-81-8": 0.709,
    "127-07-1": 13.5,
    "127-27-5": 6150.0,
    "127-52-6": 35.6,
    "127-66-2": 80.3,
    "127-91-3": 5.76,
    "1300-21-6": 0.708,
    "130-22-3": 79.6,
    "1302-78-9": 0.671,
    "131-16-8": 122.0,
    "13150-00-0": 841.0,
    "131-79-3": 615.0,
    "131-91-9": 3560.0,
    "1320-07-6": 96.2,
    "13311-84-7": 1160.0,
    "133-11-9": 65.2,
    "133-32-4": 16.6,
    "1336-36-3": 29.4,
    "135-01-3": 0.498,
    "137-19-9": 180.0,
    "137-40-6": 0.78,
    "138-86-3": 0.0751,
    "13909-73-4": 47.0,
    "13997-73-4": 1240.0,
    "140-38-5": 79.9,
    "14062-34-1": 1930.0,
    "14064-10-9": 1130.0,
    "14088-71-2": 19.0,
    "140-89-6": 185.0,
    "140-90-9": 1870.0,
    "140-93-2": 223.0,
    "141-03-7": 14.2,
    "141-28-6": 50.3,
    "141-53-7": 0.627,
    "141-91-3": 0.0751,
    "141-93-5": 0.852,
    "1421-14-3": 165.0,
    "142-31-4": 1.55,
    "1423-60-5": 80.4,
    "142-87-0": 25.0,
    "142-90-5": 8.98e-06,
    "142-92-7": 9.66,
    "14315-14-1": 4.05,
    "143-16-8": 0.594,
    "14548-46-0": 15.9,
    "148-01-6": 141.0,
    "148-53-8": 441.0,
    "150-19-6": 49.6,
    "150-39-0": 3.85,
    "15045-43-9": 1.26,
    "150-78-7": 7.91,
    "151-67-7": 1.91,
    "15245-44-0": 5.25,
    "15263-52-2": 12200.0,
    "15310-01-7": 48.1,
    "1563-38-8": 2.3,
    "156-54-7": 1.0,
    "15862-07-4": 14.2,
    "15922-78-8": 76100.0,
    "1615-70-9": 13.9,
    "16245-79-7": 181.0,
    "1639-66-3": 0.464,
    "1646-87-3": 7820.0,
    "1646-88-4": 2390.0,
    "1647-16-1": 2.59,
    "16485-47-5": 2190.0,
    "1653-40-3": 3.99,
    "1678-91-7": 0.199,
    "1689-64-1": 184.0,
    "1689-82-3": 521.0,
    "1695-77-8": 0.567,
    "17372-87-1": 31.3,
    "17584-12-2": 8.33,
    "1761-61-1": 923.0,
    "17754-90-4": 418.0,
    "17849-38-6": 7.49,
    "1820-81-1": 499.0,
    "1835-49-0": 33600.0,
    "18368-63-3": 1.69,
    "1846-70-4": 15.3,
    "1871-57-4": 594.0,
    "1918-13-4": 33.5,
    "1928-45-6": 20.8,
    "1929-86-8": 163.0,
    "1929-88-0": 5.73,
    "19329-89-6": 23.6,
    "19335-11-6": 7.98,
    "1945-53-5": 1560.0,
    "1962-75-0": 1.81,
    "1966-58-1": 360.0,
    "1982-69-0": 271.0,
    "1984-06-1": 3.46,
    "1984-59-4": 91.9,
    "1984-65-2": 80.7,
    "20056-92-2": 2.22,
    "2028-63-9": 316.0,
    "20301-63-7": 912.0,
    "2034-22-2": 1350.0,
    "2040-96-2": 0.373,
    "2050-68-2": 89.1,
    "205-43-6": 274.0,
    "2074-50-2": 261.0,
    "20824-56-0": 1.34,
    "2116-65-6": 41.3,
    "2138-22-9": 755.0,
    "2150-47-2": 21.1,
    "2155-70-6": 133.0,
    "21757-82-4": 729.0,
    "2176-62-7": 523.0,
    "2176-98-9": 0.0344,
    "21923-23-9": 338.0,
    "2207-01-4": 0.402,
    "2216-51-5": 4.89,
    "22212-55-1": 362.0,
    "2223-93-0": 20.1,
    "2234-16-4": 46.9,
    "2235-54-3": 58.8,
    "2243-27-8": 9.74,
    "2245-38-7": 9.5,
    "22473-78-5": 4.44,
    "225-11-6": 7860.0,
    "225-51-4": 94300.0,
    "2255-17-6": 43900.0,
    "2257-09-2": 731.0,
    "22726-00-7": 32.7,
    "2274-67-1": 95.5,
    "22936-86-3": 418.0,
    "23031-36-9": 36800.0,
    "2338-12-7": 216.0,
    "23564-06-9": 20.1,
    "2370-63-0": 34.3,
    "24096-53-5": 208.0,
    "2432-12-4": 19.7,
    "24353-61-5": 192.0,
    "2436-93-3": 179.0,
    "2445-07-0": 1150.0,
    "24544-04-5": 12.7,
    "2455-24-5": 29.8,
    "2457-47-8": 13.8,
    "2459-09-8": 1.1,
    "2461-15-6": 6.09,
    "24691-80-3": 119.0,
    "2475-46-9": 888.0,
    "2495-37-6": 91.3,
    "2497-07-6": 328000.0,
    "2499-95-8": 22.8,
    "2508-86-3": 6390.0,
    "25155-23-1": 0.071,
    "25167-81-1": 242.0,
    "25167-82-2": 275.0,
    "25168-15-4": 0.0139,
    "2528-36-1": 51.9,
    "25306-75-6": 62.6,
    "25319-90-8": 1.48,
    "25321-22-6": 10.6,
    "25322-20-7": 12.5,
    "25323-89-1": 21.0,
    "25366-23-8": 116.0,
    "2539-26-6": 681.0,
    "25550-58-7": 6030.0,
    "25551-13-7": 5.9,
    "25586-43-0": 29.2,
    "25637-99-4": 4.0,
    "2570-26-5": 732.0,
    "26248-24-8": 52.5,
    "2631-37-0": 31.6,
    "2655-19-8": 392.0,
    "26787-78-0": 10700.0,
    "26952-21-6": 3.71,
    "26972-01-0": 149000.0,
    "2703-13-1": 40800.0,
    "2703-37-9": 2320.0,
    "271-44-3": 7.14,
    "2720-73-2": 851.0,
    "27304-13-8": 529.0,
    "2741-06-2": 9.71,
    "27458-93-1": 0.898,
    "27541-88-4": 11700.0,
    "279-23-2": 1.01,
    "28108-99-8": 6.85,
    "281-23-2": 31.5,
    "2814-20-2": 0.00244,
    "2845-89-8": 25.7,
    "28519-02-0": 789.0,
    "2859-67-8": 5.15,
    "28652-77-9": 3.26,
    "2866-43-5": 0.243,
    "2867-47-2": 0.558,
    "28680-45-7": 132.0,
    "2869-34-3": 81.3,
    "2905-69-3": 29.4,
    "291-64-5": 0.00949,
    "292-64-8": 0.0151,
    "294-62-2": 0.0125,
    "2961-62-8": 956.0,
    "297-97-2": 5130.0,
    "298-06-6": 1630.0,
    "29812-79-1": 261.0,
    "30030-25-2": 189.0,
    "30043-49-3": 168.0,
    "301-11-1": 0.399,
    "302-04-5": 329.0,
    "304-21-2": 1.35,
    "3073-66-3": 1.49,
    "309-43-3": 591.0,
    "31431-39-7": 6.12,
    "3218-02-8": 0.0942,
    "3252-43-5": 10300.0,
    "3254-66-8": 2060.0,
    "3296-50-2": 2.33,
    "33284-50-3": 69.0,
    "3351-05-1": 2890.0,
    "33719-74-3": 8.39,
    "3380-34-5": 977.0,
    "3389-71-7": 133.0,
    "33979-03-2": 6.71,
    "34364-42-6": 0.0396,
    "3452-97-9": 6.28,
    "34622-58-7": 271.0,
    "3481-20-7": 1860.0,
    "3483-12-3": 175.0,
    "34883-43-7": 82.2,
    "350-46-9": 20.4,
    "3547-04-4": 259.0,
    "3558-69-8": 1090.0,
    "35597-43-4": 786.0,
    "3567-25-7": 4600.0,
    "35975-00-9": 141.0,
    "36614-38-7": 27.1,
    "368-77-4": 8.97,
    "371-40-4": 80.7,
    "371-41-5": 36.8,
    "37248-47-8": 2.06,
    "3734-48-3": 39.7,
    "3735-01-1": 60.9,
    "37529-30-9": 168.0,
    "3757-76-4": 2580.0,
    "37680-65-2": 435.0,
    "37680-73-2": 488.0,
    "3772-94-9": 0.000701,
    "383-63-1": 0.0335,
    "38444-85-8": 206.0,
    "39196-18-4": 495.0,
    "3926-62-3": 4.72,
    "39765-80-5": 358.0,
    "3978-81-2": 1.94,
    "4005-51-0": 8.95,
    "40321-76-4": 87600000.0,
    "4044-65-9": 258.0,
    "40575-34-6": 41.5,
    "4104-14-7": 1120.0,
    "4104-75-0": 52.1,
    "4200-95-7": 6.73,
    "42087-80-9": 158.0,
    "4214-76-0": 69.6,
    "4238-71-5": 2.97,
    "4253-89-8": 1.79,
    "42835-25-6": 2450.0,
    "4301-50-2": 192.0,
    "434-90-2": 0.26,
    "4403-90-1": 5800.0,
    "4412-91-3": 6.72,
    "4455-26-9": 31.3,
    "447-53-0": 4.42,
    "447-60-9": 13.4,
    "454-89-7": 277.0,
    "4593-90-2": 3.41,
    "459-56-3": 23.5,
    "459-57-4": 14.2,
    "462-06-6": 15.6,
    "462-08-8": 21.4,
    "464-45-9": 11.7,
    "464-49-3": 3.67,
    "4655-34-9": 2.82,
    "465-73-6": 2690.0,
    "4658-28-0": 4.33,
    "469-61-4": 52.6,
    "471-25-0": 0.271,
    "473-55-2": 1.53,
    "4780-79-4": 16.6,
    "479-27-6": 123.0,
    "4798-44-1": 39.2,
    "481-42-5": 36.2,
    "483-65-8": 2.35,
    "4839-46-7": 0.0655,
    "485-49-4": 10100.0,
    "486-25-9": 22.3,
    "4920-77-8": 81.2,
    "492-37-5": 3.65,
    "493-09-4": 27.5,
    "494-99-5": 1.2,
    "495-54-5": 11600.0,
    "496-11-7": 3.72,
    "496-16-2": 4.73,
    "497-37-0": 15.5,
    "498-66-8": 0.752,
    "500-22-1": 35.1,
    "500-99-2": 37.2,
    "502-39-6": 203000.0,
    "502-56-7": 1.65,
    "50375-10-5": 196.0,
    "504-20-1": 2.64,
    "504-29-0": 18.8,
    "504-63-2": 0.395,
    "506-96-7": 28.9,
    "508-32-7": 6.29,
    "5103-71-9": 2350.0,
    "5103-74-2": 311.0,
    "51207-31-9": 36000000.0,
    "513-48-4": 2.15,
    "513-81-5": 1.42,
    "51892-26-3": 42.9,
    "5192-03-0": 7.05,
    "5221-49-8": 146.0,
    "5221-53-4": 0.157,
    "52303-69-2": 87.8,
    "523-44-4": 16.1,
    "524-42-5": 1690.0,
    "525-82-6": 213.0,
    "527-20-8": 921.0,
    "528-29-0": 4220.0,
    "529-69-1": 5490.0,
    "53-16-7": 570.0,
    "532-02-5": 46.8,
    "532-55-8": 1510.0,
    "5328-01-8": 18.8,
    "5329-14-6": 135.0,
    "534-13-4": 135.0,
    "534-22-5": 0.145,
    "536-60-7": 8.57,
    "5367-28-2": 16.0,
    "536-75-4": 6.15,
    "536-90-3": 22700.0,
    "5377-20-8": 124.0,
    "538-68-1": 1.05,
    "5395-75-5": 20.3,
    "5401-94-5": 81.7,
    "540-38-5": 39.5,
    "540-59-0": 1.04,
    "541-28-6": 1.28,
    "54135-80-7": 218.0,
    "541-85-5": 2.48,
    "54-21-7": 3.67,
    "542-18-7": 6.71,
    "542-59-6": 14.2,
    "542-85-8": 960.0,
    "54406-48-3": 126.0,
    "544-25-2": 1.84,
    "544-77-4": 0.0351,
    "547-64-8": 3.73,
    "551-76-8": 472.0,
    "55-21-0": 4.31,
    "552-41-0": 13.8,
    "552-89-6": 364.0,
    "554-12-1": 0.737,
    "555-16-8": 1020.0,
    "555-60-2": 5.45,
    "555-89-5": 0.337,
    "556-22-9": 1.07,
    "556-67-2": 262.0,
    "5581-75-9": 26.0,
    "558-17-8": 68.1,
    "55-91-4": 187.0,
    "5598-52-7": 5690000.0,
    "56073-07-5": 469.0,
    "5610-64-0": 2450.0,
    "56108-12-4": 51.3,
    "563-04-2": 0.287,
    "56-34-8": 4.5,
    "56348-72-2": 78.0,
    "563-80-4": 0.75,
    "56-55-3": 1820.0,
    "5663-96-7": 3.25,
    "5673-07-4": 15.5,
    "56803-37-3": 3.93,
    "5683-33-0": 4.98,
    "56-93-9": 584.0,
    "56961-20-7": 1430.0,
    "570-24-1": 147.0,
    "57057-83-7": 3850.0,
    "57-15-8": 34.7,
    "571-61-9": 4.17,
    "57-33-0": 304.0,
    "573-58-0": 23.7,
    "575-41-7": 13.6,
    "57-62-5": 241.0,
    "57653-85-7": 83600.0,
    "577-11-7": 0.927,
    "577-19-5": 26.0,
    "577-33-3": 38.7,
    "577-85-5": 40.8,
    "57808-65-8": 3.92,
    "580-17-6": 18.3,
    "5813-64-9": 0.00765,
    "581-40-8": 1.41,
    "581-42-0": 65.5,
    "581-43-1": 26.0,
    "582-17-2": 52.7,
    "58-22-0": 402.0,
    "5827-05-4": 461000.0,
    "58-27-5": 4630.0,
    "5835-26-7": 3780.0,
    "583-53-9": 23.0,
    "583-57-3": 0.877,
    "583-60-8": 1.6,
    "584-02-1": 1.61,
    "584-84-9": 0.481,
    "585-34-2": 137.0,
    "586-78-7": 19.4,
    "586-95-8": 0.77,
    "586-98-1": 0.578,
    "587-98-4": 662.0,
    "588-59-0": 0.204,
    "589-09-3": 3.62,
    "589-18-4": 7.74,
    "589-90-2": 0.342,
    "590-01-2": 0.402,
    "5902-95-4": 71.2,
    "590-66-9": 0.569,
    "591-21-9": 0.304,
    "591-78-6": 0.95,
    "591-80-0": 0.748,
    "5922-60-1": 93.6,
    "592-46-1": 0.271,
    "592-76-7": 0.00385,
    "592-82-5": 137.0,
    "593-08-8": 13.4,
    "593-57-7": 70.8,
    "594-20-7": 0.614,
    "594-27-4": 0.0883,
    "597-43-3": 0.853,
    "598-02-7": 37.9,
    "598-52-7": 264.0,
    "598-74-3": 0.0134,
    "600-07-7": 0.245,
    "600-36-2": 2.56,
    "60-09-3": 731.0,
    "60123-65-1": 14.5,
    "603-83-8": 91.8,
    "605-32-3": 32500.0,
    "60-54-8": 76.8,
    "606-22-4": 746.0,
    "607-00-1": 72.1,
    "607-34-1": 37.3,
    "607-81-8": 83.8,
    "6089-09-4": 0.342,
    "609-23-4": 2420.0,
    "609-89-2": 22100.0,
    "610-39-9": 1830.0,
    "611-34-7": 15.5,
    "613-12-7": 72.1,
    "613-31-0": 94.6,
    "613-45-6": 283.0,
    "6146-52-7": 304.0,
    "614-80-2": 63.4,
    "6153-56-6": 0.9,
    "615-36-1": 30.6,
    "615-65-6": 14.0,
    "616-73-9": 2130.0,
    "617-51-6": 4.64,
    "6175-49-1": 10.2,
    "618-85-9": 191.0,
    "6190-65-4": 7100.0,
    "619-15-8": 2260.0,
    "619-24-9": 241.0,
    "619-50-1": 90.3,
    "619-72-7": 377.0,
    "619-80-7": 44.2,
    "620-88-2": 73.6,
    "620-95-1": 30.8,
    "621-08-9": 98.3,
    "621-42-1": 2.38,
    "621-77-2": 0.521,
    "622-40-2": 0.471,
    "622-45-7": 0.398,
    "623-00-7": 25.0,
    "623-03-0": 19.4,
    "623-05-2": 0.345,
    "623-12-1": 44.9,
    "623-25-6": 3940.0,
    "623-91-6": 241.0,
    "625-53-6": 151.0,
    "625-86-5": 1.01,
    "626-17-5": 172.0,
    "626-60-8": 0.857,
    "626-62-0": 3.06,
    "626-64-2": 1.55,
    "627-63-4": 53.9,
    "628-76-2": 3.94,
    "628-92-2": 0.0738,
    "629-04-9": 2.31,
    "629-19-6": 5.1,
    "629-40-3": 27.9,
    "63-05-8": 571.0,
    "631-61-8": 113.0,
    "631-64-1": 23.3,
    "633-96-5": 37.6,
    "635-93-8": 2960.0,
    "6382-06-5": 10.0,
    "6408-78-2": 929.0,
    "6416-68-8": 5.79,
    "644-64-4": 1250000.0,
    "645-56-7": 17.4,
    "646-06-0": 0.201,
    "64628-44-0": 8270.0,
    "653-37-2": 234.0,
    "65-45-2": 15.3,
    "66-25-1": 9.35,
    "66-76-2": 342.0,
    "66-81-9": 7630.0,
    "67-43-6": 7.99,
    "67-47-0": 132.0,
    "68-35-9": 2910.0,
    "683-72-7": 50.4,
    "68608-15-1": 321.0,
    "6876-23-9": 0.393,
    "6921-29-5": 0.112,
    "693-54-9": 4.8,
    "693-58-3": 2.87,
    "693-65-2": 1.61,
    "693-93-6": 0.125,
    "69-53-4": 62.5,
    "696-54-8": 0.386,
    "6972-05-0": 45.1,
    "697-82-5": 1.07,
    "6983-79-5": 4.84,
    "698-71-5": 1.7,
    "7005-72-3": 17.8,
    "706-14-9": 1.01,
    "70-69-9": 25.1,
    "708-76-9": 249.0,
    "712-48-1": 1820.0,
    "71-73-8": 596.0,
    "7209-38-3": 0.439,
    "7212-44-4": 2.07,
    "72-48-0": 1030.0,
    "7292-16-2": 47.0,
    "7307-55-3": 7.85,
    "7377-03-9": 95.4,
    "7378-99-6": 0.355,
    "738-70-5": 38.7,
    "7398-69-8": 5740.0,
    "74-97-5": 4.12,
    "75-08-1": 399.0,
    "75-18-3": 16.4,
    "75-36-5": 25.7,
    "75-39-8": 26.8,
    "7542-37-2": 37000.0,
    "75-57-0": 13.7,
    "75-89-8": 25.2,
    "75-97-8": 10.5,
    "760-23-6": 9.78,
    "76-29-9": 5.02,
    "76-38-0": 4.72,
    "764-01-2": 479.0,
    "764-13-6": 2.05,
    "766-51-8": 54.8,
    "768-59-2": 11.4,
    "768-94-5": 0.474,
    "771-60-8": 23.4,
    "771-62-0": 1480.0,
    "771-97-1": 60.7,
    "77458-01-6": 4690.0,
    "776-35-2": 105.0,
    "77-74-7": 1.66,
    "77-78-1": 360.0,
    "7790-94-5": 80.2,
    "780-11-0": 43.0,
    "78-27-3": 9.19,
    "78-51-3": 1.42,
    "78-62-6": 491.0,
    "78-88-6": 1.07,
    "789-02-6": 150.0,
    "78-94-4": 9550.0,
    "79-57-2": 3090.0,
    "79-95-8": 512.0,
    "8004-92-0": 9.21,
    "80-15-9": 269.0,
    "80-38-6": 109.0,
    "8061-51-6": 121.0,
    "8061-53-8": 6340.0,
    "813-78-5": 157.0,
    "81510-83-0": 5390.0,
    "81-61-8": 43.4,
    "81-64-1": 69.0,
    "81-77-6": 0.00241,
    "818-08-6": 0.553,
    "81-82-3": 8.87,
    "818-61-1": 1270.0,
    "821-55-6": 3.9,
    "822-86-6": 7.23,
    "825-44-5": 351.0,
    "825-90-1": 0.847,
    "827-52-1": 5.97,
    "830-96-6": 142.0,
    "83164-33-4": 25.1,
    "831-82-3": 35.2,
    "83-34-1": 75.3,
    "83-66-9": 725.0,
    "84-62-8": 609.0,
    "846-70-8": 16.4,
    "85-84-7": 721.0,
    "85918-31-6": 994.0,
    "86-40-8": 1340.0,
    "86-53-3": 82.0,
    "868-77-9": 60.3,
    "87130-20-9": 18.9,
    "87-17-2": 655.0,
    "872-31-1": 13.7,
    "872-85-5": 9.53,
    "873-63-2": 40.1,
    "873-75-6": 35.5,
    "873-76-7": 24.9,
    "87-40-1": 422.0,
    "874-42-0": 204.0,
    "87-64-9": 2.15,
    "87-72-9": 0.0816,
    "877-65-6": 6.96,
    "87-91-2": 4.62,
    "88-04-0": 476.0,
    "88-18-6": 108.0,
    "882-33-7": 188.0,
    "88-44-8": 26.1,
    "88-68-6": 17.0,
    "89-60-1": 35.8,
    "89-62-3": 37.1,
    "89-63-4": 893.0,
    "89-68-9": 507.0,
    "89-72-5": 78.4,
    "89-82-7": 3.4,
    "90-03-9": 7470.0,
    "90-04-0": 372.0,
    "9004-70-0": 5.41,
    "90-05-1": 77.9,
    "90-27-7": 2.02,
    "90-59-5": 3290.0,
    "91-17-8": 0.489,
    "91-63-4": 14.4,
    "91-65-6": 1.09,
    "91-88-3": 36.6,
    "920-66-1": 6.22,
    "924-41-4": 31.6,
    "92-51-3": 9.38,
    "927-74-2": 122.0,
    "92-82-0": 3.2,
    "92-83-1": 2.8,
    "92-88-6": 31.3,
    "928-96-1": 2.08,
    "93-04-9": 30.1,
    "93106-60-6": 1110000.0,
    "934-32-7": 0.232,
    "93-51-6": 5.46,
    "93-71-0": 655.0,
    "937-20-2": 271.0,
    "93-78-7": 42.4,
    "93-79-8": 4.63,
    "93-91-4": 1850.0,
    "939-23-1": 59.5,
    "94050-52-9": 22600.0,
    "941-98-0": 63.9,
    "94-41-7": 39.7,
    "945-51-7": 20.7,
    "94-62-2": 28.5,
    "94-67-7": 583.0,
    "94-96-2": 4.8,
    "95-01-2": 108.0,
    "95-15-8": 0.649,
    "95-16-9": 6.41,
    "95-52-3": 3.8,
    "95-56-7": 42.2,
    "95-68-1": 27.4,
    "95-70-5": 363.0,
    "95-75-0": 8.76,
    "95-84-1": 379.0,
    "95-88-5": 28.7,
    "96-05-9": 176.0,
    "96-17-3": 64.7,
    "962-58-3": 7510.0,
    "96-34-4": 22.4,
    "96-41-3": 1.66,
    "97-11-0": 22.8,
    "97-63-2": 0.851,
    "97-99-4": 1.57,
    "98-04-4": 67.6,
    "98-05-5": 3.83,
    "98-06-6": 0.231,
    "98-08-8": 12.9,
    "98-09-9": 54.2,
    "98-13-5": 0.0725,
    "98-17-9": 16.0,
    "98-88-4": 15.8,
    "99-52-5": 27.2,
    "99-61-6": 1470.0,
    "99-71-8": 142.0,
    "99-89-8": 4.4,
    "99-92-3": 1040.0,
    "99-93-4": 8.64,
    "999-61-1": 1700.0,
    "99-97-8": 6.3,
    "100-02-7": 98.1,
    "10004-44-1": 32.4,
    "100-17-4": 156.0,
    "100-20-9": 13.3,
    "100-21-0": 1.24,
    "100-25-4": 5350.0,
    "100-29-8": 146.0,
    "100-37-8": 0.0981,
    "100-46-9": 0.0714,
    "100-47-0": 7.19,
    "10061-01-5": 26.1,
    "100-61-8": 14.8,
    "100-66-3": 3.92,
    "100784-20-1": 11100.0,
    "101-02-0": 0.929,
    "101205-02-1": 1.02,
    "101-27-9": 78.2,
    "101-42-8": 687.0,
    "1014-69-3": 119.0,
    "1014-70-6": 1330.0,
    "101-54-2": 1510.0,
    "101-72-4": 467.0,
    "101-77-9": 126.0,
    "101-83-7": 0.324,
    "101-84-8": 12.1,
    "102-01-2": 11.8,
    "102-06-7": 2.93,
    "10222-01-2": 6260.0,
    "102-69-2": 0.332,
    "102-82-9": 0.117,
    "102851-06-9": 4.39,
    "103112-35-2": 23.5,
    "103-11-7": 0.231,
    "103361-09-7": 14800.0,
    "103-65-1": 3.01,
    "103-69-5": 9.04,
    "103-82-2": 37.3,
    "103-83-3": 1.04,
    "104-40-5": 35.7,
    "104-75-6": 0.371,
    "104-88-1": 199.0,
    "104-93-8": 1.18,
    "105-37-3": 2.77,
    "105-38-4": 5.31,
    "105512-06-9": 3.28,
    "10552-74-6": 52.6,
    "105-53-3": 16.6,
    "105-54-4": 0.704,
    "105-59-9": 1.16,
    "105-75-9": 25.6,
    "105-76-0": 2.59,
    "105-99-7": 0.974,
    "106-24-1": 24.7,
    "106325-08-0": 1090.0,
    "106-42-3": 2.15,
    "106-43-4": 4.63,
    "106-44-5": 16.4,
    "106-48-9": 64.7,
    "106-49-0": 24.2,
    "1066-45-1": 347000.0,
    "1067-14-7": 172.0,
    "107-07-3": 161.0,
    "107-10-8": 0.0094,
    "107-11-9": 0.468,
    "107-15-3": 12.9,
    "107-22-2": 11.9,
    "107-27-7": 1240.0,
    "107-31-3": 2.67,
    "107-41-5": 0.649,
    "107-49-3": 5320.0,
    "107-64-2": 3.87e-06,
    "1076-46-6": 10.4,
    "107-86-8": 46.3,
    "107-92-6": 4.03,
    "107-93-7": 0.413,
    "107-94-8": 6.25,
    "1081-34-1": 1310.0,
    "108-18-9": 0.0137,
    "108-20-3": 0.102,
    "108-21-4": 0.917,
    "108-24-7": 9.62,
    "108-32-7": 6.15,
    "108-38-3": 2.89,
    "108-42-9": 216.0,
    "108-43-0": 39.2,
    "108-59-8": 37.4,
    "108-67-8": 2.24,
    "108-68-9": 6.46,
    "108-70-3": 32.5,
    "108-80-5": 4.68,
    "108-83-8": 1.47,
    "108-85-0": 8.55,
    "108-86-1": 27.9,
    "108-87-2": 0.0559,
    "108-93-0": 4.69,
    "109-00-2": 7.71,
    "109-46-6": 12.5,
    "109-52-4": 7.81,
    "109-53-5": 0.265,
    "109-55-7": 1.65,
    "109-57-9": 1.75,
    "109-60-4": 1.68,
    "109-73-9": 0.0129,
    "109-76-2": 0.158,
    "109-77-3": 3400.0,
    "109-83-1": 1.45,
    "109-89-7": 0.0281,
    "109-92-2": 0.247,
    "109-97-7": 8.14,
    "110-12-3": 0.86,
    "110-15-6": 3.03,
    "110-16-7": 15.5,
    "110-17-8": 7.91,
    "110-19-0": 0.671,
    "110-27-0": 0.000111,
    "110-33-8": 0.0108,
    "110488-70-5": 148.0,
    "110-58-7": 0.0099,
    "110-63-4": 1.96,
    "110-65-6": 25.6,
    "11067-81-5": 0.0273,
    "110-83-8": 0.227,
    "110-88-3": 0.216,
    "110-91-8": 1.18,
    "110-93-0": 2.78,
    "110-96-3": 0.0358,
    "11104-28-2": 29.5,
    "111-14-8": 5.05,
    "111-15-9": 25.0,
    "111-26-2": 0.0474,
    "111-27-3": 4.79,
    "111-29-5": 2.53,
    "111-40-0": 3.57,
    "111-41-1": 2.81,
    "11141-16-5": 35.6,
    "11141-17-6": 223.0,
    "111-42-2": 0.433,
    "111479-05-1": 1190.0,
    "111-48-8": 4.36,
    "1115-20-4": 3.58,
    "111-69-3": 8.43,
    "111-70-6": 13.4,
    "111-77-3": 2.92,
    "1118-46-3": 38700.0,
    "111-86-4": 3.1,
    "111-87-5": 14.9,
    "111-90-0": 0.451,
    "111-92-2": 0.0997,
    "111991-09-4": 63.4,
    "112-00-5": 6430.0,
    "112-02-7": 660.0,
    "112-05-0": 13.1,
    "112-07-2": 6.1,
    "112-20-9": 1.49,
    "112226-61-6": 3410.0,
    "112-24-3": 25.8,
    "112-25-4": 5.69,
    "1122-58-3": 0.0699,
    "112-30-1": 15.5,
    "112-34-5": 0.813,
    "112-35-6": 2.28,
    "112-42-5": 5.75,
    "112-53-8": 9.7,
    "112-56-1": 512.0,
    "112-57-2": 85.8,
    "112-60-7": 3.38,
    "1126-34-7": 4.43,
    "1126-79-0": 8.26,
    "112-69-6": 1.45,
    "112-90-3": 2.54,
    "112-92-5": 1.19e-05,
    "1129-41-5": 347.0,
    "113136-77-9": 2000.0,
    "1134-23-2": 266.0,
    "1135-99-5": 4480000.0,
    "114-07-8": 269.0,
    "114311-32-9": 533.0,
    "115-18-4": 1.73,
    "115-19-5": 1.87,
    "115-20-8": 15.6,
    "115-31-1": 581.0,
    "115-86-6": 76.4,
    "116-02-9": 5.36,
    "116255-48-2": 3960.0,
    "117337-19-6": 4750.0,
    "117718-60-2": 6020.0,
    "117-84-0": 0.0118,
    "118-48-9": 12.4,
    "118-79-6": 4510.0,
    "118-95-6": 8170.0,
    "119-12-0": 189.0,
    "1191-50-0": 340.0,
    "119446-68-3": 1460.0,
    "1194-65-6": 29.5,
    "119-61-9": 93.5,
    "119-64-2": 2.35,
    "119-65-3": 10.1,
    "1198-55-6": 12900.0,
    "120-18-3": 10.0,
    "1204-21-3": 50100.0,
    "120-92-3": 1.46,
    "120-94-5": 0.459,
    "121-21-1": 16.7,
    "121-25-5": 39.2,
    "121-33-5": 52.1,
    "121-34-6": 41.8,
    "1214-39-7": 0.0119,
    "121-54-0": 575.0,
    "121552-61-2": 219.0,
    "121-57-3": 26.8,
    "121-73-3": 269.0,
    "121-82-4": 1910.0,
    "121-87-9": 867.0,
    "122836-35-5": 15500.0,
    "122-88-3": 11.7,
    "122931-48-0": 630.0,
    "122-99-6": 12.5,
    "123-03-5": 11700.0,
    "123-05-7": 5.79,
    "123-07-9": 22.2,
    "123-30-8": 8060.0,
    "123312-89-0": 217.0,
    "123343-16-8": 1390.0,
    "123-38-6": 13.9,
    "123-42-2": 7.02,
    "123-51-3": 3.56,
    "123-54-6": 12.3,
    "123-72-8": 6.42,
    "123-86-4": 1.41,
    "123-88-6": 5680.0,
    "124-02-7": 0.311,
    "124-04-9": 2.2,
    "124-07-2": 3.58,
    "124-09-4": 0.0568,
    "124-18-5": 0.0504,
    "1241-94-7": 3.31,
    "124-22-1": 46.5,
    "124-30-1": 1.93,
    "124-40-3": 0.152,
    "124-65-2": 159.0,
    "124-68-5": 0.254,
    "125401-92-5": 938.0,
    "126-11-4": 43.5,
    "126-22-7": 3660.0,
    "126-30-7": 7.28,
    "126-33-0": 14.6,
    "126535-15-7": 680.0,
    "126-71-6": 1.65,
    "12672-29-6": 215.0,
    "127-09-3": 0.46,
    "127-20-8": 297.0,
    "127-65-1": 1310.0,
    "127-68-4": 13.8,
    "12771-68-5": 75.5,
    "128-03-0": 6770.0,
    "128-04-1": 126000.0,
    "128639-02-1": 46.4,
    "130-15-4": 14500.0,
    "13067-93-1": 162.0,
    "131-09-9": 1.35,
    "131-11-3": 20.8,
    "131341-86-1": 249.0,
    "131-52-2": 52500.0,
    "13181-17-4": 13500.0,
    "131860-33-8": 15600.0,
    "1319-77-3": 41.4,
    "1320-18-9": 188.0,
    "1321-94-4": 4.56,
    "132-64-9": 2.93,
    "132-65-0": 27.9,
    "13360-45-7": 295.0,
    "13411-16-0": 999.0,
    "134-20-3": 23.8,
    "13463-41-7": 478000.0,
    "135158-54-2": 80.7,
    "135-19-3": 97.9,
    "136-25-4": 1.84,
    "13674-84-5": 115.0,
    "13684-56-5": 119.0,
    "137-41-7": 367.0,
    "137-42-8": 9060.0,
    "138-22-7": 7.4,
    "13826-35-2": 29.6,
    "13863-31-5": 316.0,
    "138-93-2": 235.0,
    "1397-94-0": 835000.0,
    "140-01-2": 7.12,
    "140-31-8": 3.17,
    "140-66-9": 78.6,
    "141-10-6": 1.91,
    "141112-29-0": 166.0,
    "141-32-2": 8.16,
    "141-43-5": 0.651,
    "141776-32-1": 1170.0,
    "141-82-2": 5.78,
    "141-97-9": 6.33,
    "1420-06-0": 4880.0,
    "1420-07-1": 7920.0,
    "142-08-5": 0.629,
    "14214-32-5": 213.0,
    "142-28-9": 2.92,
    "14235-86-0": 0.426,
    "142459-58-3": 3570.0,
    "142-62-1": 3.76,
    "142-82-5": 0.000435,
    "142-84-7": 0.139,
    "142-96-1": 0.197,
    "143-07-7": 12.9,
    "143-08-8": 30.4,
    "14321-27-8": 0.0862,
    "143-22-6": 6.54,
    "143-27-1": 523.0,
    "144-21-8": 200.0,
    "14437-17-3": 38200.0,
    "144-49-0": 7.98,
    "144-54-7": 2430.0,
    "144-62-7": 1.7,
    "1461-22-9": 1520.0,
    "1461-25-2": 0.0035,
    "14816-20-7": 12500.0,
    "14938-35-3": 12.9,
    "149-57-5": 4.37,
    "149979-41-9": 27.8,
    "151-21-3": 368.0,
    "1520-78-1": 1510.0,
    "152-16-9": 26.6,
    "15271-41-7": 4630.0,
    "15457-05-3": 946.0,
    "15545-48-9": 186.0,
    "15662-33-6": 2470.0,
    "1570-64-5": 304.0,
    "1570-65-6": 570.0,
    "15827-60-8": 68.4,
    "15894-70-9": 1020.0,
    "1593-77-7": 36.4,
    "15950-66-0": 788.0,
    "15972-60-8": 1380.0,
    "16022-69-8": 1590.0,
    "16079-88-2": 525.0,
    "16090-02-1": 0.173,
    "161050-58-4": 989.0,
    "16118-49-3": 42.0,
    "16484-77-8": 24.4,
    "1663-39-4": 1.53,
    "1689-83-4": 272.0,
    "1698-53-9": 6660.0,
    "1698-60-8": 587.0,
    "1702-17-6": 45.2,
    "17095-24-8": 328.0,
    "1724-39-6": 4.22,
    "173584-44-6": 43.3,
    "1738-25-6": 2.43,
    "1745-81-9": 12.8,
    "1746-81-2": 1860.0,
    "1758-73-2": 27.5,
    "17606-31-4": 3.25,
    "17796-82-6": 363.0,
    "1787-61-7": 3160.0,
    "18181-70-9": 92.8,
    "1821-12-1": 10.8,
    "1836-77-7": 406.0,
    "1843-05-6": 0.00587,
    "18467-77-1": 6.7,
    "18479-49-7": 3.47,
    "18530-56-8": 149.0,
    "1854-26-8": 9.04,
    "18691-97-9": 787.0,
    "18854-01-8": 17.8,
    "1886-81-3": 0.0511,
    "1912-26-1": 372.0,
    "1918-18-9": 123.0,
    "1928-43-4": 1.83,
    "1929-73-3": 114.0,
    "1929-82-4": 45.2,
    "1967-16-4": 173.0,
    "1982-47-4": 458.0,
    "1982-49-6": 1050.0,
    "1983-10-4": 15100.0,
    "19937-59-8": 8.78,
    "20030-30-2": 2.36,
    "2008-39-1": 541.0,
    "2008-58-4": 59.8,
    "20120-33-6": 18.3,
    "2016-42-4": 161.0,
    "2016-57-1": 3.94,
    "20292-08-4": 2.51e-05,
    "2032-59-9": 437.0,
    "2039-46-5": 88.3,
    "2051-60-7": 22.8,
    "2051-61-8": 8.97,
    "2051-62-9": 19.6,
    "2079-00-7": 620.0,
    "2082-79-3": 1.24e-05,
    "21564-17-0": 500.0,
    "2163-80-6": 68.5,
    "2164-07-0": 21.6,
    "2164-08-1": 3800.0,
    "2186-92-7": 34.5,
    "22042-96-2": 46.9,
    "2215-35-2": 0.0629,
    "22248-79-9": 67.7,
    "2227-17-0": 42.9,
    "2234-13-1": 0.000338,
    "2235-25-8": 11400.0,
    "2270-20-4": 13.1,
    "2275-14-1": 3.56,
    "2279-76-7": 229000.0,
    "22936-75-0": 211.0,
    "229-87-8": 117.0,
    "230-27-3": 2.01,
    "2303-25-5": 14.9,
    "2307-68-8": 3.57,
    "2314-09-2": 10.9,
    "23184-66-9": 238.0,
    "23422-53-9": 1170.0,
    "23560-59-0": 259.0,
    "2386-53-0": 132.0,
    "23947-60-6": 0.0366,
    "2402-79-1": 413.0,
    "2403-88-5": 0.0461,
    "24151-93-7": 16.0,
    "2416-94-6": 92.3,
    "2425-10-7": 718.0,
    "2425-66-3": 6580.0,
    "2437-79-8": 15.2,
    "2439-00-1": 510.0,
    "2439-35-2": 3.22,
    "24549-06-2": 20.9,
    "24602-86-6": 30.6,
    "2460-49-3": 308.0,
    "2463-84-5": 3100.0,
    "2464-37-1": 6590.0,
    "2492-26-4": 3530.0,
    "24934-91-6": 141.0,
    "2495-39-8": 5.74,
    "25154-52-3": 8.83,
    "25155-30-0": 333.0,
    "25167-83-3": 32600.0,
    "25264-93-1": 0.0318,
    "25265-77-4": 5.07,
    "25339-17-7": 10.2,
    "25339-53-1": 0.01,
    "25339-56-4": 0.0706,
    "253-52-1": 5.81,
    "25376-45-8": 42.6,
    "25377-83-7": 0.104,
    "2539-17-5": 12400.0,
    "2545-59-7": 120.0,
    "2545-60-0": 484.0,
    "25606-41-1": 1.82,
    "25620-58-0": 0.0494,
    "2581-34-2": 16.8,
    "25875-51-8": 1290.0,
    "2593-15-9": 257.0,
    "25954-13-6": 21.0,
    "26087-47-8": 85.6,
    "260-94-6": 10.2,
    "26140-60-3": 45.2,
    "26172-55-4": 22400.0,
    "26225-79-6": 156.0,
    "26258-70-8": 4670.0,
    "26259-45-0": 98.5,
    "26264-06-2": 1.49e-07,
    "2631-40-5": 156.0,
    "2634-33-5": 1150.0,
    "2642-71-9": 25700.0,
    "26444-49-5": 37.0,
    "26489-01-0": 3.12,
    "26530-20-1": 15400.0,
    "2668-24-8": 1850.0,
    "26761-40-0": 0.000227,
    "26761-45-5": 8.8,
    "2682-20-4": 61500.0,
    "2686-99-9": 420.0,
    "2702-72-9": 145.0,
    "27176-87-0": 205.0,
    "27344-41-8": 273.0,
    "27355-22-2": 3.51,
    "27458-92-0": 4.39,
    "27458-94-2": 15.3,
    "275-51-4": 8.75,
    "2767-54-6": 17800.0,
    "2782-91-4": 13.6,
    "2797-51-5": 1210.0,
    "280-57-9": 0.146,
    "2809-21-4": 140.0,
    "2813-95-8": 34000.0,
    "28159-98-0": 40000.0,
    "28434-00-6": 3200.0,
    "2855-13-2": 0.25,
    "28553-12-0": 0.0017,
    "28629-66-5": 0.00419,
    "28631-35-8": 0.548,
    "287-92-3": 0.064,
    "28804-88-8": 36.4,
    "288-32-4": 2.87,
    "2893-78-9": 22200.0,
    "2896-70-0": 58500.0,
    "29091-05-2": 143.0,
    "29091-21-2": 84.6,
    "29104-30-1": 103.0,
    "29171-20-8": 2.52,
    "29761-21-5": 1.2,
    "298-07-7": 16.5,
    "299-85-4": 6190.0,
    "301-12-2": 392.0,
    "3033-77-0": 13.3,
    "3060-89-7": 80.2,
    "3064-70-8": 26200.0,
    "306-52-5": 885.0,
    "30899-19-5": 3.21,
    "311-45-5": 263000.0,
    "31218-83-4": 487.0,
    "314-40-9": 772.0,
    "31570-04-4": 2.47e-11,
    "319-86-8": 2440.0,
    "3209-22-1": 188.0,
    "3244-90-4": 180.0,
    "32598-13-3": 235.0,
    "3268-49-3": 259.0,
    "327-98-0": 1010.0,
    "329-71-5": 2260.0,
    "33125-97-2": 196.0,
    "33213-65-9": 4090.0,
    "3323-53-3": 7.12,
    "33245-39-5": 4270.0,
    "334-48-5": 21.0,
    "33629-47-9": 608.0,
    "33693-04-8": 276.0,
    "3383-96-8": 1.27,
    "3397-62-4": 730.0,
    "34123-59-6": 1190.0,
    "34256-82-1": 977.0,
    "34643-46-4": 1.29,
    "34681-10-2": 13.8,
    "34681-23-7": 238.0,
    "3478-94-2": 9.34,
    "35400-43-2": 21.6,
    "35575-96-3": 303.0,
    "35691-65-7": 1840.0,
    "357-57-3": 19.9,
    "36335-67-8": 51.2,
    "3648-20-2": 9.54e-06,
    "3653-48-3": 31.3,
    "3687-46-5": 3.19e-08,
    "3698-83-7": 60800.0,
    "3739-38-6": 5.09,
    "3766-81-2": 699.0,
    "379-52-2": 12300.0,
    "37971-36-1": 3.11,
    "3811-49-2": 90.3,
    "3813-05-6": 12.4,
    "385-00-2": 26.6,
    "38640-62-9": 0.00987,
    "38641-94-0": 183.0,
    "3878-19-1": 33.5,
    "3942-54-9": 807.0,
    "39515-40-7": 60.1,
    "39515-51-0": 84.0,
    "4075-81-4": 8.32,
    "4080-31-3": 725.0,
    "4098-71-9": 0.673,
    "41394-05-2": 9.09,
    "41483-43-6": 290.0,
    "4170-30-3": 542.0,
    "41814-78-2": 81.4,
    "420-04-2": 64.7,
    "42576-02-3": 107.0,
    "4259-15-8": 0.00235,
    "4329-03-7": 11.4,
    "4342-36-3": 1200.0,
    "463-56-9": 89.0,
    "464-07-3": 2.41,
    "4684-94-0": 861.0,
    "4719-04-4": 515.0,
    "4726-14-1": 625.0,
    "475-20-7": 3.36,
    "481-39-0": 4490.0,
    "482-89-3": 3.07,
    "485-31-4": 635.0,
    "4901-51-3": 1520.0,
    "4904-61-4": 0.0958,
    "492-22-8": 1590.0,
    "49866-87-7": 607.0,
    "499-83-2": 7.3,
    "500-28-7": 1150.0,
    "501-52-0": 6.3,
    "502-69-2": 0.00458,
    "50-30-6": 125.0,
    "50-31-7": 91.0,
    "503-74-2": 0.432,
    "504-24-5": 46.2,
    "50512-35-1": 17.3,
    "505-32-8": 0.000122,
    "50563-36-5": 130.0,
    "505-65-7": 4.1,
    "5064-31-3": 7.7,
    "50-65-7": 6350.0,
    "506-93-4": 15.4,
    "51000-52-3": 1.52,
    "51200-87-4": 0.983,
    "51218-49-6": 2450.0,
    "5123-63-7": 19.0,
    "51338-27-3": 45.8,
    "514-10-3": 943.0,
    "51707-55-2": 944.0,
    "518-47-8": 9.03,
    "5208-93-5": 3.52,
    "52-51-7": 675.0,
    "5259-88-1": 163.0,
    "526-75-0": 37.3,
    "52722-86-8": 0.672,
    "52756-25-9": 771.0,
    "527-60-6": 48.2,
    "52888-80-9": 11.3,
    "53112-28-0": 45.7,
    "5324-84-5": 0.969,
    "533-23-3": 392.0,
    "533-74-4": 62.0,
    "53445-37-7": 5.72,
    "534-52-1": 1180.0,
    "53469-21-9": 362.0,
    "535-80-8": 116.0,
    "540-88-5": 0.24,
    "54-11-5": 0.367,
    "541-73-1": 8.85,
    "54593-83-8": 3430.0,
    "5464-71-1": 10.7,
    "54-64-8": 634.0,
    "55283-68-6": 838.0,
    "55335-06-3": 434.0,
    "554-00-7": 177.0,
    "55406-53-6": 2390.0,
    "554-84-7": 175.0,
    "55512-33-9": 0.147,
    "555-37-3": 672.0,
    "556-61-6": 1780.0,
    "556-82-1": 13.4,
    "56073-10-0": 6.61,
    "56-36-0": 6760.0,
    "56634-95-8": 4.38,
    "569-64-2": 29500.0,
    "57-09-0": 2950.0,
    "57213-69-1": 355.0,
    "573-56-8": 204.0,
    "57369-32-1": 313.0,
    "5742-17-6": 14.2,
    "5742-19-8": 174.0,
    "576-24-9": 454.0,
    "57646-30-7": 59.7,
    "578-54-1": 39.6,
    "57966-95-7": 81.6,
    "5836-29-3": 30.0,
    "583-78-8": 308.0,
    "583-91-5": 6.45,
    "584-79-2": 1870.0,
    "589-16-2": 63.0,
    "59-06-3": 55.4,
    "590-86-3": 6.69,
    "591-27-5": 2590.0,
    "591-35-5": 441.0,
    "5915-41-3": 12400.0,
    "592-41-6": 0.0164,
    "593-81-7": 447.0,
    "59-50-7": 162.0,
    "595-37-9": 0.823,
    "59720-42-2": 120.0,
    "597-64-8": 4.81,
    "598-16-3": 5.38,
    "598-56-1": 0.186,
    "59-92-7": 15400.0,
    "60-00-4": 17.1,
    "60-12-8": 7.49,
    "602-01-7": 2610.0,
    "60207-31-0": 122.0,
    "60-24-2": 113.0,
    "603-86-1": 5250.0,
    "6062-26-6": 2150.0,
    "608-31-1": 66.8,
    "608-71-9": 223000.0,
    "609-19-8": 1030.0,
    "6104-30-9": 9.53,
    "611-06-3": 77.9,
    "61213-25-0": 328.0,
    "61260-55-7": 3.43,
    "616-45-5": 19.6,
    "61-73-4": 474.0,
    "618-62-2": 339.0,
    "618-87-1": 214.0,
    "61949-76-6": 1340.0,
    "61949-77-7": 681.0,
    "623-37-0": 1.22,
    "62476-59-9": 489.0,
    "626-43-7": 608.0,
    "626-93-7": 0.99,
    "627-30-5": 12.9,
    "62-76-0": 2.08,
    "628-63-7": 0.562,
    "629-11-8": 2.03,
    "62924-70-3": 111.0,
    "6317-18-6": 62700.0,
    "632-22-4": 1.27,
    "63284-71-9": 861.0,
    "634-66-2": 84.8,
    "634-67-3": 1460.0,
    "634-83-3": 2580.0,
    "634-90-2": 26.9,
    "636-30-6": 216.0,
    "64-00-6": 16900.0,
    "64-02-8": 18.2,
    "64-18-6": 0.43,
    "6419-19-8": 78.9,
    "64-19-7": 0.386,
    "64359-81-5": 23300.0,
    "645-62-5": 7.74,
    "646-07-1": 0.932,
    "64700-56-7": 637.0,
    "6485-55-8": 0.161,
    "650-51-1": 615.0,
    "6515-38-4": 1920.0,
    "65-30-5": 2260.0,
    "65381-09-1": 0.00328,
    "65732-07-2": 230000.0,
    "66063-05-6": 6.91,
    "66230-04-4": 41300.0,
    "66441-23-4": 5.71,
    "6683-19-8": 3.23e-08,
    "67129-08-2": 42.3,
    "67-45-8": 33500.0,
    "67564-91-4": 18.5,
    "67-68-5": 0.27,
    "67989-23-5": 2.34e-07,
    "68-04-2": 0.679,
    "68-11-1": 33.7,
    "68153-01-5": 15.9,
    "683-18-1": 1420.0,
    "68411-30-3": 213.0,
    "68439-50-9": 0.0648,
    "68515-42-4": 0.000554,
    "68515-43-5": 2.37e-05,
    "68515-47-9": 5.61e-05,
    "68515-49-1": 0.00229,
    "68515-51-5": 0.0734,
    "68526-86-3": 0.217,
    "68603-15-6": 211.0,
    "68603-87-2": 11.9,
    "6864-37-5": 0.858,
    "68648-87-3": 6.35e-05,
    "68694-11-1": 2050.0,
    "687-47-8": 5.8,
    "68815-67-8": 2.87e-07,
    "688-73-3": 2.37,
    "68938-07-8": 16.4,
    "693-21-0": 18.6,
    "693-36-7": 4.42e-12,
    "69377-81-7": 485.0,
    "69581-33-5": 230.0,
    "69-72-7": 15.1,
    "69806-50-4": 19.9,
    "6988-21-2": 18.8,
    "700-13-0": 446.0,
    "700-38-9": 91.6,
    "70-38-2": 6.02,
    "70630-17-0": 341.0,
    "70693-30-0": 7.38e-05,
    "7085-19-0": 20.9,
    "71-23-8": 0.648,
    "71283-80-2": 0.517,
    "71-41-0": 2.41,
    "7149-79-3": 37.3,
    "71561-11-0": 454.0,
    "7166-19-0": 79900.0,
    "71662-46-9": 0.000186,
    "7173-51-5": 57.0,
    "7173-62-8": 2.83,
    "72178-02-0": 72.9,
    "7286-84-2": 631.0,
    "731-27-1": 321.0,
    "73250-68-7": 394.0,
    "74070-46-5": 5940.0,
    "7414-83-7": 168.0,
    "741-58-2": 1250.0,
    "74222-97-2": 35300.0,
    "74738-17-3": 2460.0,
    "74-89-5": 0.136,
    "75-04-7": 0.0376,
    "75-12-7": 2.19,
    "75-31-0": 0.0674,
    "753-73-1": 550000.0,
    "75-50-3": 0.0405,
    "75-64-9": 0.0993,
    "756-80-9": 81.9,
    "75-74-1": 14.6,
    "75-85-4": 0.475,
    "75-86-5": 23200.0,
    "75-87-6": 97.7,
    "75-91-2": 38.3,
    "75-98-9": 3.55,
    "763-32-6": 4.8,
    "7646-78-8": 478.0,
    "7664-93-9": 54.9,
    "767-00-0": 26.0,
    "7696-12-0": 3.7,
    "7700-17-6": 573.0,
    "771-61-9": 220.0,
    "7720-78-7": 495.0,
    "7747-35-5": 32.0,
    "77-58-7": 0.000128,
    "77-71-4": 0.86,
    "77732-09-3": 59.5,
    "77-73-6": 12.9,
    "77-75-8": 2.14,
    "779-02-2": 84.3,
    "77-99-6": 0.582,
    "78-30-8": 0.638,
    "78-40-0": 4.52,
    "78-70-6": 14.7,
    "78-90-0": 0.115,
    "78-92-2": 1.48,
    "78-96-6": 0.314,
    "78-97-7": 5430.0,
    "78-99-9": 2.42,
    "79-08-3": 161.0,
    "79-09-4": 6.08,
    "79127-80-3": 51.9,
    "791-28-6": 64.2,
    "79-20-9": 2.67,
    "79-21-0": 237.0,
    "79241-46-6": 11.4,
    "79-31-2": 3.09,
    "793-24-8": 495.0,
    "79-33-4": 2.93,
    "79-41-4": 19.7,
    "79538-32-2": 742.0,
    "79622-59-6": 196.0,
    "79-77-6": 14.1,
    "79-92-5": 0.552,
    "79-94-7": 276.0,
    "80-00-2": 343.0,
    "8003-19-8": 78.3,
    "8004-87-3": 292.0,
    "80-06-8": 274.0,
    "80-12-6": 310000.0,
    "8022-00-2": 2470.0,
    "8027-00-7": 6000.0,
    "80-46-6": 296.0,
    "8048-52-0": 716.0,
    "80-56-8": 0.0479,
    "8065-36-9": 27000.0,
    "81334-34-1": 0.817,
    "81405-85-8": 3.44,
    "81406-37-3": 10.1,
    "81777-89-1": 288.0,
    "81-88-9": 145.0,
    "822-36-6": 7.76,
    "82560-54-1": 141.0,
    "826-36-8": 0.777,
    "82-71-3": 8.28,
    "830-13-7": 2.96,
    "83261-15-8": 2.39,
    "83-41-0": 35.4,
    "834-12-8": 1800.0,
    "83-42-1": 25.6,
    "836-30-6": 136.0,
    "83657-22-1": 11.3,
    "83-89-6": 1.67,
    "84087-01-4": 502.0,
    "841-06-5": 127.0,
    "84-11-7": 7940.0,
    "84-69-5": 12.8,
    "84-75-3": 1.07,
    "84852-15-3": 116.0,
    "85-01-8": 29.1,
    "85-02-9": 1.85,
    "85-34-7": 648.0,
    "85-41-6": 8.22,
    "85-42-7": 4.47,
    "85-43-8": 9.99,
    "85-56-3": 41.9,
    "86209-51-0": 17600.0,
    "87237-48-7": 0.839,
    "87392-12-9": 2080.0,
    "87546-18-7": 9.44,
    "87-59-2": 40.0,
    "87-61-6": 83.7,
    "87-65-0": 305.0,
    "87674-68-8": 5740.0,
    "877-43-0": 71.3,
    "88-09-5": 0.196,
    "88283-41-4": 689.0,
    "88-30-2": 727.0,
    "886-86-2": 9.64,
    "88-74-4": 199.0,
    "88-75-5": 45.7,
    "88-89-1": 106.0,
    "88-99-3": 5.22,
    "89-59-8": 48.1,
    "89-61-2": 201.0,
    "89-83-8": 4.53,
    "89-98-5": 170.0,
    "90-02-8": 105.0,
    "9002-93-1": 0.0889,
    "9004-82-4": 3410.0,
    "90-13-1": 30.2,
    "90-15-3": 0.43,
    "90-45-9": 3.3,
    "90-47-1": 5440.0,
    "90717-03-6": 1.25,
    "91-15-6": 26.8,
    "91-22-5": 1.99,
    "91465-08-6": 9290.0,
    "91-66-7": 10.8,
    "91-68-9": 365.0,
    "928-68-7": 2.87,
    "929-06-6": 2.48,
    "93-08-3": 37.4,
    "933-75-5": 1020.0,
    "933-78-8": 191.0,
    "935-92-2": 1060.0,
    "935-95-5": 4870.0,
    "93762-80-2": 5.6e-05,
    "93-89-0": 12.6,
    "94-09-7": 19.5,
    "94125-34-5": 7560.0,
    "94361-06-5": 237.0,
    "94-68-8": 6.58,
    "947-02-4": 494.0,
    "947-04-6": 58.1,
    "950-35-6": 59500.0,
    "95266-40-3": 77.1,
    "953-17-3": 249.0,
    "95-47-6": 2.46,
    "95-51-2": 119.0,
    "95-53-4": 28.0,
    "95-54-5": 1080.0,
    "95-64-7": 63.5,
    "95-76-1": 371.0,
    "95-77-2": 293.0,
    "95-82-9": 111.0,
    "95-87-4": 30.0,
    "95-92-1": 9.24,
    "95-93-2": 3.44,
    "959-98-8": 2540.0,
    "96-13-9": 8.59,
    "96182-53-5": 26900.0,
    "96-22-0": 1.01,
    "96-23-1": 12.0,
    "96-31-1": 1.58,
    "96-33-3": 87.7,
    "96489-71-3": 61.3,
    "96-80-0": 0.0362,
    "96-91-3": 170.0,
    "97-02-9": 2820.0,
    "97-17-6": 0.805,
    "97-23-4": 81.9,
    "973-21-7": 25500.0,
    "97-61-0": 1.3,
    "97-64-3": 6.14,
    "97-65-4": 8.01,
    "97-86-9": 8.08,
    "97-88-1": 0.781,
    "97886-45-8": 3450.0,
    "98-11-3": 0.197,
    "98-16-8": 64.0,
    "98-51-1": 0.575,
    "98-52-2": 2.26,
    "98-73-7": 479.0,
    "98-94-2": 2.83,
    "98967-40-9": 2980.0,
    "98-98-6": 22.0,
    "99-06-9": 25.7,
    "99-08-1": 109.0,
    "99-09-2": 148.0,
    "99129-21-2": 7.09,
    "993-16-8": 110000.0,
    "99-51-4": 79.5,
    "99-54-7": 712.0,
    "99607-70-2": 5.19,
    "99-66-1": 14.3,
    "99-87-6": 0.484,
    "99-96-7": 22.8,
    "41859-67-0": 307.0,
    "298-46-4": 93.3,
    "15307-86-5": 246.0,
    "73334-07-3": 8.94,
    "51384-51-1": 5.23,
    "723-46-6": 1210.0,
    "191-24-2": 0.0,
    "193-39-5": 0.0,
    "205-99-2": 0.0,
    "207-08-9": 0.0,
    "218-01-9": 0.0,
    "208-96-8": 0.0
  },
  "compartment": "Emission to continental agricultural soil",
  "source": "USEtox 2.14",
  "version": "EF 3.1"
};

