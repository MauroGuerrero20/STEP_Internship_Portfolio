// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random quote to the page.
 */
function addRandomQuote() {
  const randomQuote =
    ['Chaos is Ladder.', 'I am a native Spanish speaker.', 'I enjoy learning about history.',
      'I was born and raised in El Paso, Texas.', 'I like to play video games and enjoy all types of genres.'];

  // Pick a random quote.
  const quote = randomQuote[Math.floor(Math.random() * randomQuote.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

// Apply random quote onclick of button
function randQuote() {
  const btn = document.getElementById("randBtn");
  if (btn) {
    btn.addEventListener("click", addRandomQuote);
  }
}

function addCommentsColumn() {

  document.getElementById("main_body").classList.remove("col-12");
  document.getElementById("main_body").classList.add("col-10");

  document.getElementById("comments_body").classList.remove("col-0");
  document.getElementById("comments_body").classList.add("col-2");
}

function removeCommentsColumn() {
  document.getElementById("main_body").classList.remove("col-10");
  document.getElementById("main_body").classList.add("col-12");

  document.getElementById("comments_body").classList.remove("col-2");
  document.getElementById("comments_body").classList.add("col-0");
}

function createCommentsDOM(commentsArray) {

  const commentsOutput = document.getElementById("comments_body")
    .appendChild(document.createElement("h2")
      .appendChild(document.createTextNode("Comments")).parentElement);

  const cmtDOM = document.createElement("div");

  commentsArray.forEach(cmt => {

    const quoteDOM = document.createElement("blockquote");

    const pDOM = document.createElement("p").appendChild(document.createTextNode(cmt.cmtMsg));

    const footerDOM = document.createElement("footer").appendChild(document.createTextNode(cmt.name + ', ' + cmt.date));
    footerDOM.parentElement.classList.add("blockquote-footer");

    quoteDOM.appendChild(pDOM.parentElement);
    quoteDOM.appendChild(footerDOM.parentElement);
    quoteDOM.classList.add("blockquote");

    cmtDOM.appendChild(quoteDOM);
  });

  commentsOutput.parentElement.appendChild(cmtDOM);

}

// Fetch comments from DataServlet.java
function getComments() {

  fetch('/comments').then(response => response.json()).then((cmtContainer) => {

    const commentsArray = Array.from(cmtContainer);

    if (!(commentsArray && commentsArray.length)) {
      removeCommentsColumn();
      return;
    }

    addCommentsColumn();

    createCommentsDOM(commentsArray);
  });
}

class Countries {
  keyedJSON = {
    "AW": {
      "country": "Aruba",
      "continent": "NA"
    },
    "AF": {
      "country": "Afghanistan",
      "continent": "AS"
    },
    "AO": {
      "country": "Angola",
      "continent": "AF"
    },
    "AI": {
      "country": "Anguilla",
      "continent": "NA"
    },
    "AX": {
      "country": "Åland",
      "continent": "EU"
    },
    "AL": {
      "country": "Albania",
      "continent": "EU"
    },
    "AD": {
      "country": "Andorra",
      "continent": "EU"
    },
    "AE": {
      "country": "United Arab Emirates",
      "continent": "AS"
    },
    "AR": {
      "country": "Argentina",
      "continent": "SA"
    },
    "AM": {
      "country": "Armenia",
      "continent": "AS"
    },
    "AS": {
      "country": "American Samoa",
      "continent": "OC"
    },
    "AQ": {
      "country": "Antarctica",
      "continent": "AN"
    },
    "TF": {
      "country": "French Southern Territories",
      "continent": "AN"
    },
    "AG": {
      "country": "Antigua and Barbuda",
      "continent": "NA"
    },
    "AU": {
      "country": "Australia",
      "continent": "OC"
    },
    "AT": {
      "country": "Austria",
      "continent": "EU"
    },
    "AZ": {
      "country": "Azerbaijan",
      "continent": "AS"
    },
    "BI": {
      "country": "Burundi",
      "continent": "AF"
    },
    "BE": {
      "country": "Belgium",
      "continent": "EU"
    },
    "BJ": {
      "country": "Benin",
      "continent": "AF"
    },
    "BQ": {
      "country": "Caribbean Netherlands",
      "continent": "NA"
    },
    "BF": {
      "country": "Burkina Faso",
      "continent": "AF"
    },
    "BD": {
      "country": "Bangladesh",
      "continent": "AS"
    },
    "BG": {
      "country": "Bulgaria",
      "continent": "EU"
    },
    "BH": {
      "country": "Bahrain",
      "continent": "AS"
    },
    "BS": {
      "country": "Bahamas",
      "continent": "NA"
    },
    "BA": {
      "country": "Bosnia and Herzegovina",
      "continent": "EU"
    },
    "BY": {
      "country": "Belarus",
      "continent": "EU"
    },
    "BZ": {
      "country": "Belize",
      "continent": "NA"
    },
    "BM": {
      "country": "Bermuda",
      "continent": "NA"
    },
    "BO": {
      "country": "Bolivia",
      "continent": "SA"
    },
    "BR": {
      "country": "Brazil",
      "continent": "SA"
    },
    "BB": {
      "country": "Barbados",
      "continent": "NA"
    },
    "BN": {
      "country": "Brunei",
      "continent": "AS"
    },
    "BT": {
      "country": "Bhutan",
      "continent": "AS"
    },
    "BW": {
      "country": "Botswana",
      "continent": "AF"
    },
    "CF": {
      "country": "Central African Republic",
      "continent": "AF"
    },
    "CA": {
      "country": "Canada",
      "continent": "NA"
    },
    "CH": {
      "country": "Switzerland",
      "continent": "EU"
    },
    "CL": {
      "country": "Chile",
      "continent": "SA"
    },
    "CN": {
      "country": "China",
      "continent": "AS"
    },
    "CI": {
      "country": "Ivory Coast",
      "continent": "AF"
    },
    "CM": {
      "country": "Cameroon",
      "continent": "AF"
    },
    "CD": {
      "country": "DR Congo",
      "continent": "AF"
    },
    "CG": {
      "country": "Congo Republic",
      "continent": "AF"
    },
    "CO": {
      "country": "Colombia",
      "continent": "SA"
    },
    "KM": {
      "country": "Comoros",
      "continent": "AF"
    },
    "CV": {
      "country": "Cabo Verde",
      "continent": "AF"
    },
    "CR": {
      "country": "Costa Rica",
      "continent": "NA"
    },
    "CU": {
      "country": "Cuba",
      "continent": "NA"
    },
    "CW": {
      "country": "Curaçao",
      "continent": "NA"
    },
    "CX": {
      "country": "Christmas Island",
      "continent": "OC"
    },
    "KY": {
      "country": "Cayman Islands",
      "continent": "NA"
    },
    "CY": {
      "country": "Cyprus",
      "continent": "EU"
    },
    "CZ": {
      "country": "Czechia",
      "continent": "EU"
    },
    "DE": {
      "country": "Germany",
      "continent": "EU"
    },
    "DJ": {
      "country": "Djibouti",
      "continent": "AF"
    },
    "DM": {
      "country": "Dominica",
      "continent": "NA"
    },
    "DK": {
      "country": "Denmark",
      "continent": "EU"
    },
    "DO": {
      "country": "Dominican Republic",
      "continent": "NA"
    },
    "DZ": {
      "country": "Algeria",
      "continent": "AF"
    },
    "EC": {
      "country": "Ecuador",
      "continent": "SA"
    },
    "EG": {
      "country": "Egypt",
      "continent": "AF"
    },
    "ER": {
      "country": "Eritrea",
      "continent": "AF"
    },
    "ES": {
      "country": "Spain",
      "continent": "EU"
    },
    "EE": {
      "country": "Estonia",
      "continent": "EU"
    },
    "ET": {
      "country": "Ethiopia",
      "continent": "AF"
    },
    "FI": {
      "country": "Finland",
      "continent": "EU"
    },
    "FJ": {
      "country": "Fiji",
      "continent": "OC"
    },
    "FK": {
      "country": "Falkland Islands",
      "continent": "SA"
    },
    "FR": {
      "country": "France",
      "continent": "EU"
    },
    "FO": {
      "country": "Faroe Islands",
      "continent": "EU"
    },
    "GA": {
      "country": "Gabon",
      "continent": "AF"
    },
    "GB": {
      "country": "United Kingdom",
      "continent": "EU"
    },
    "GE": {
      "country": "Georgia",
      "continent": "AS"
    },
    "GG": {
      "country": "Guernsey",
      "continent": "EU"
    },
    "GH": {
      "country": "Ghana",
      "continent": "AF"
    },
    "GI": {
      "country": "Gibraltar",
      "continent": "EU"
    },
    "GN": {
      "country": "Guinea",
      "continent": "AF"
    },
    "GP": {
      "country": "Guadeloupe",
      "continent": "NA"
    },
    "GM": {
      "country": "Gambia",
      "continent": "AF"
    },
    "GW": {
      "country": "Guinea-Bissau",
      "continent": "AF"
    },
    "GQ": {
      "country": "Equatorial Guinea",
      "continent": "AF"
    },
    "GR": {
      "country": "Greece",
      "continent": "EU"
    },
    "GD": {
      "country": "Grenada",
      "continent": "NA"
    },
    "GL": {
      "country": "Greenland",
      "continent": "NA"
    },
    "GT": {
      "country": "Guatemala",
      "continent": "NA"
    },
    "GF": {
      "country": "French Guiana",
      "continent": "SA"
    },
    "GU": {
      "country": "Guam",
      "continent": "OC"
    },
    "GY": {
      "country": "Guyana",
      "continent": "SA"
    },
    "HK": {
      "country": "Hong Kong",
      "continent": "AS"
    },
    "HM": {
      "country": "Heard Island and McDonald Islands",
      "continent": "AN"
    },
    "HN": {
      "country": "Honduras",
      "continent": "NA"
    },
    "HR": {
      "country": "Croatia",
      "continent": "EU"
    },
    "HT": {
      "country": "Haiti",
      "continent": "NA"
    },
    "HU": {
      "country": "Hungary",
      "continent": "EU"
    },
    "ID": {
      "country": "Indonesia",
      "continent": "AS"
    },
    "IM": {
      "country": "Isle of Man",
      "continent": "EU"
    },
    "IN": {
      "country": "India",
      "continent": "AS"
    },
    "IE": {
      "country": "Ireland",
      "continent": "EU"
    },
    "IR": {
      "country": "Iran",
      "continent": "AS"
    },
    "IQ": {
      "country": "Iraq",
      "continent": "AS"
    },
    "IS": {
      "country": "Iceland",
      "continent": "EU"
    },
    "IL": {
      "country": "Israel",
      "continent": "AS"
    },
    "IT": {
      "country": "Italy",
      "continent": "EU"
    },
    "JM": {
      "country": "Jamaica",
      "continent": "NA"
    },
    "JE": {
      "country": "Jersey",
      "continent": "EU"
    },
    "JO": {
      "country": "Jordan",
      "continent": "AS"
    },
    "JP": {
      "country": "Japan",
      "continent": "AS"
    },
    "KZ": {
      "country": "Kazakhstan",
      "continent": "AS"
    },
    "KE": {
      "country": "Kenya",
      "continent": "AF"
    },
    "KG": {
      "country": "Kyrgyzstan",
      "continent": "AS"
    },
    "KH": {
      "country": "Cambodia",
      "continent": "AS"
    },
    "KN": {
      "country": "St Kitts and Nevis",
      "continent": "NA"
    },
    "KR": {
      "country": "South Korea",
      "continent": "AS"
    },
    "KW": {
      "country": "Kuwait",
      "continent": "AS"
    },
    "LA": {
      "country": "Laos",
      "continent": "AS"
    },
    "LB": {
      "country": "Lebanon",
      "continent": "AS"
    },
    "LR": {
      "country": "Liberia",
      "continent": "AF"
    },
    "LY": {
      "country": "Libya",
      "continent": "AF"
    },
    "LC": {
      "country": "Saint Lucia",
      "continent": "NA"
    },
    "LI": {
      "country": "Liechtenstein",
      "continent": "EU"
    },
    "LK": {
      "country": "Sri Lanka",
      "continent": "AS"
    },
    "LS": {
      "country": "Lesotho",
      "continent": "AF"
    },
    "LT": {
      "country": "Lithuania",
      "continent": "EU"
    },
    "LU": {
      "country": "Luxembourg",
      "continent": "EU"
    },
    "LV": {
      "country": "Latvia",
      "continent": "EU"
    },
    "MO": {
      "country": "Macao",
      "continent": "AS"
    },
    "MA": {
      "country": "Morocco",
      "continent": "AF"
    },
    "MC": {
      "country": "Monaco",
      "continent": "EU"
    },
    "MD": {
      "country": "Moldova",
      "continent": "EU"
    },
    "MG": {
      "country": "Madagascar",
      "continent": "AF"
    },
    "MX": {
      "country": "Mexico",
      "continent": "NA"
    },
    "MK": {
      "country": "North Macedonia",
      "continent": "EU"
    },
    "ML": {
      "country": "Mali",
      "continent": "AF"
    },
    "MT": {
      "country": "Malta",
      "continent": "EU"
    },
    "MM": {
      "country": "Myanmar",
      "continent": "AS"
    },
    "ME": {
      "country": "Montenegro",
      "continent": "EU"
    },
    "MN": {
      "country": "Mongolia",
      "continent": "AS"
    },
    "MZ": {
      "country": "Mozambique",
      "continent": "AF"
    },
    "MR": {
      "country": "Mauritania",
      "continent": "AF"
    },
    "MS": {
      "country": "Montserrat",
      "continent": "NA"
    },
    "MQ": {
      "country": "Martinique",
      "continent": "NA"
    },
    "MU": {
      "country": "Mauritius",
      "continent": "AF"
    },
    "MW": {
      "country": "Malawi",
      "continent": "AF"
    },
    "MY": {
      "country": "Malaysia",
      "continent": "AS"
    },
    "YT": {
      "country": "Mayotte",
      "continent": "AF"
    },
    "NA": {
      "country": "Namibia",
      "continent": "AF"
    },
    "NC": {
      "country": "New Caledonia",
      "continent": "OC"
    },
    "NE": {
      "country": "Niger",
      "continent": "AF"
    },
    "NG": {
      "country": "Nigeria",
      "continent": "AF"
    },
    "NI": {
      "country": "Nicaragua",
      "continent": "NA"
    },
    "NL": {
      "country": "Netherlands",
      "continent": "EU"
    },
    "NO": {
      "country": "Norway",
      "continent": "EU"
    },
    "NP": {
      "country": "Nepal",
      "continent": "AS"
    },
    "NZ": {
      "country": "New Zealand",
      "continent": "OC"
    },
    "OM": {
      "country": "Oman",
      "continent": "AS"
    },
    "PK": {
      "country": "Pakistan",
      "continent": "AS"
    },
    "PA": {
      "country": "Panama",
      "continent": "NA"
    },
    "PE": {
      "country": "Peru",
      "continent": "SA"
    },
    "PH": {
      "country": "Philippines",
      "continent": "AS"
    },
    "PG": {
      "country": "Papua New Guinea",
      "continent": "OC"
    },
    "PL": {
      "country": "Poland",
      "continent": "EU"
    },
    "PR": {
      "country": "Puerto Rico",
      "continent": "NA"
    },
    "KP": {
      "country": "North Korea",
      "continent": "AS"
    },
    "PT": {
      "country": "Portugal",
      "continent": "EU"
    },
    "PY": {
      "country": "Paraguay",
      "continent": "SA"
    },
    "QA": {
      "country": "Qatar",
      "continent": "AS"
    },
    "RE": {
      "country": "Réunion",
      "continent": "AF"
    },
    "RO": {
      "country": "Romania",
      "continent": "EU"
    },
    "RU": {
      "country": "Russia",
      "continent": "EU"
    },
    "RW": {
      "country": "Rwanda",
      "continent": "AF"
    },
    "SA": {
      "country": "Saudi Arabia",
      "continent": "AS"
    },
    "CS": {
      "country": "Serbia and Montenegro",
      "continent": "EU"
    },
    "SD": {
      "country": "Sudan",
      "continent": "AF"
    },
    "SN": {
      "country": "Senegal",
      "continent": "AF"
    },
    "SG": {
      "country": "Singapore",
      "continent": "AS"
    },
    "GS": {
      "country": "South Georgia and South Sandwich Islands",
      "continent": "AN"
    },
    "SH": {
      "country": "Saint Helena",
      "continent": "AF"
    },
    "SJ": {
      "country": "Svalbard and Jan Mayen",
      "continent": "EU"
    },
    "SB": {
      "country": "Solomon Islands",
      "continent": "OC"
    },
    "SL": {
      "country": "Sierra Leone",
      "continent": "AF"
    },
    "SV": {
      "country": "El Salvador",
      "continent": "NA"
    },
    "SM": {
      "country": "San Marino",
      "continent": "EU"
    },
    "SO": {
      "country": "Somalia",
      "continent": "AF"
    },
    "PM": {
      "country": "Saint Pierre and Miquelon",
      "continent": "NA"
    },
    "RS": {
      "country": "Serbia",
      "continent": "EU"
    },
    "SS": {
      "country": "South Sudan",
      "continent": "AF"
    },
    "ST": {
      "country": "São Tomé and Príncipe",
      "continent": "AF"
    },
    "SR": {
      "country": "Suriname",
      "continent": "SA"
    },
    "SK": {
      "country": "Slovakia",
      "continent": "EU"
    },
    "SI": {
      "country": "Slovenia",
      "continent": "EU"
    },
    "SE": {
      "country": "Sweden",
      "continent": "EU"
    },
    "SZ": {
      "country": "Eswatini",
      "continent": "AF"
    },
    "SC": {
      "country": "Seychelles",
      "continent": "AF"
    },
    "SY": {
      "country": "Syria",
      "continent": "AS"
    },
    "TC": {
      "country": "Turks and Caicos Islands",
      "continent": "NA"
    },
    "TD": {
      "country": "Chad",
      "continent": "AF"
    },
    "TG": {
      "country": "Togo",
      "continent": "AF"
    },
    "TH": {
      "country": "Thailand",
      "continent": "AS"
    },
    "TJ": {
      "country": "Tajikistan",
      "continent": "AS"
    },
    "TM": {
      "country": "Turkmenistan",
      "continent": "AS"
    },
    "TL": {
      "country": "Timor-Leste",
      "continent": "OC"
    },
    "TT": {
      "country": "Trinidad and Tobago",
      "continent": "NA"
    },
    "TN": {
      "country": "Tunisia",
      "continent": "AF"
    },
    "TR": {
      "country": "Turkey",
      "continent": "AS"
    },
    "TW": {
      "country": "Taiwan",
      "continent": "AS"
    },
    "TZ": {
      "country": "Tanzania",
      "continent": "AF"
    },
    "UG": {
      "country": "Uganda",
      "continent": "AF"
    },
    "UA": {
      "country": "Ukraine",
      "continent": "EU"
    },
    "UY": {
      "country": "Uruguay",
      "continent": "SA"
    },
    "US": {
      "country": "United States",
      "continent": "NA"
    },
    "UZ": {
      "country": "Uzbekistan",
      "continent": "AS"
    },
    "VA": {
      "country": "Vatican City",
      "continent": "EU"
    },
    "VC": {
      "country": "St Vincent and Grenadines",
      "continent": "NA"
    },
    "VE": {
      "country": "Venezuela",
      "continent": "SA"
    },
    "VG": {
      "country": "British Virgin Islands",
      "continent": "NA"
    },
    "VI": {
      "country": "U.S. Virgin Islands",
      "continent": "NA"
    },
    "VN": {
      "country": "Vietnam",
      "continent": "AS"
    },
    "VU": {
      "country": "Vanuatu",
      "continent": "OC"
    },
    "WS": {
      "country": "Samoa",
      "continent": "OC"
    },
    "XK": {
      "country": "Kosovo",
      "continent": "EU"
    },
    "YE": {
      "country": "Yemen",
      "continent": "AS"
    },
    "ZA": {
      "country": "South Africa",
      "continent": "AF"
    },
    "ZM": {
      "country": "Zambia",
      "continent": "AF"
    },
    "ZW": {
      "country": "Zimbabwe",
      "continent": "AF"
    }
  };

  getRandCountryCode() {
    return Object.keys(this.keyedJSON)[Math.floor(Math.random() * Object.keys(this.keyedJSON).length)];
  }

  removeCountry(countryCode) {
    delete this.keyedJSON[countryCode];
  }

  empty() {
    return Object.keys(this.keyedJSON).length === 0;
  }
}

function createRandCountryDOM(countriesObj) {

  if (countriesObj.empty()) return;

  const randCountryCodeStr = countriesObj.getRandCountryCode();
  const randCountry = countriesObj.keyedJSON[randCountryCodeStr].country;

  const randCountryDOM = document.createElement("b")
    .appendChild(document.createTextNode(randCountry));

  const randCountryOutput = document.getElementById("rand_country")
    .appendChild(document.createElement("h4")
      .appendChild(document.createTextNode("Click where you think ")).parentElement
      .appendChild(randCountryDOM.parentElement).parentElement
      .appendChild(document.createTextNode(" is.")).parentElement);

  return randCountryCodeStr;
}

function deleteElementContentsById(elementId) {

  const elementDOM = document.getElementById(elementId);

  let child = elementDOM.lastElementChild;
  while (child) {
    elementDOM.removeChild(child);
    child = elementDOM.lastElementChild;
  }
}

function correctDOM() {

  const correctOuputDOM = document.getElementById("map_output_answer")
    .appendChild(document.createElement("h4")
      .appendChild(document.createTextNode("Correct!")).parentElement);

  correctOuputDOM.parentElement.classList.add("map_correct");
}

function incorrectDOM() {

  const incorrectOuputDOM = document.getElementById("map_output_answer")
    .appendChild(document.createElement("h4")
      .appendChild(document.createTextNode("Incorrect")).parentElement);

  incorrectOuputDOM.parentElement.classList.add("map_incorrect");
}

function deleteAnswerDOM() {
  document.getElementById("map_output_answer").classList.remove("map_correct");
  document.getElementById("map_output_answer").classList.remove("map_incorrect");

  deleteElementContentsById("map_output_answer");
}

function selectedCountryDOM(selectedCountry) {

  const countryDOM = document.createElement("b")
    .appendChild(document.createTextNode(selectedCountry));

  document.getElementById("selected_country")
    .appendChild(document.createElement("h3")
      .appendChild(document.createTextNode("You clicked on ")).parentElement
      .appendChild(countryDOM.parentElement).parentElement);
}

function noCountriesLeftDOM() {

  document.getElementById("rand_country")
    .appendChild(document.createElement("h4")
      .appendChild(document.createTextNode("There are no more contries left!")).parentElement);

  document.getElementById("selected_country")
    .appendChild(document.createElement("h3")
      .appendChild(document.createTextNode("Congratulations. You Win!!!")).parentElement);

  document.getElementById("skip_btn").remove();
}

function initMap() {

  const map = new google.maps.Map(
    document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 4,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: false,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },

      {
        featureType: "road",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]
  });


  let countries = new Countries();
  let randCountryCodeStr = createRandCountryDOM(countries);
  let incorrectMarkersArray = [];

  document.getElementById("skip_btn").addEventListener("click", function() {

    if (countries.empty()) {
      deleteElementContentsById("rand_country");
      deleteAnswerDOM();
      deleteElementContentsById("selected_country");
      noCountriesLeftDOM();

      return;
    }

    deleteElementContentsById("rand_country");
    randCountryCodeStr = createRandCountryDOM(countries);
  });

  map.addListener('click', function(mapMouseEvent) {

    if (countries.empty()) {
      deleteElementContentsById("rand_country");
      deleteAnswerDOM();
      deleteElementContentsById("selected_country");
      noCountriesLeftDOM();

      return;
    }

    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': mapMouseEvent.latLng }, function(address, status) {

      if (status === "OK") {

        deleteAnswerDOM();
        deleteElementContentsById("selected_country");

        const addressArray = Array.from(address);
        const addressComps = addressArray[addressArray.length - 1].address_components

        let countryCodeStr;
        let countryNameStr;

        for (let comp of addressComps) {

          if (comp.short_name.length === 2) {
            countryCodeStr = comp.short_name;
            countryNameStr = comp.long_name;
            break;
          }
          if (comp.short_name.includes("Ocean") || comp.long_name.includes("Ocean")) {
            countryCodeStr = comp.short_name;
            countryNameStr = comp.long_name;
          }
        }

        selectedCountryDOM(countryNameStr);

        if (countryCodeStr === randCountryCodeStr) {
          correctDOM();
          deleteElementContentsById("rand_country");
          countries.removeCountry(randCountryCodeStr);
          randCountryCodeStr = createRandCountryDOM(countries);

          let checkmark_marker = new google.maps.Marker({
            position: mapMouseEvent.latLng,
            map: map,
            icon: "images/checkmark_icon.png",
            animation: google.maps.Animation.DROP,
          });

          let infowindow = new google.maps.InfoWindow({
            content: "<h5>" + countryNameStr + "</h5>"
          });

          checkmark_marker.addListener('click', function() {
            infowindow.open(map, checkmark_marker);
          });

          // Remove Incorrect Markers
          incorrectMarkersArray.forEach(mrk => {
            mrk.setMap(null);
          });
        }
        else {
          incorrectDOM();

          let cross_mark_marker = new google.maps.Marker({
            position: mapMouseEvent.latLng,
            map: map,
            icon: "images/cross_mark_icon.png",
            animation: google.maps.Animation.DROP,
          });

          let infowindow = new google.maps.InfoWindow({
            content: "<h5>" + countryNameStr + "</h5>"
          });

          cross_mark_marker.addListener('click', function() {
            infowindow.open(map, cross_mark_marker);
          });

          incorrectMarkersArray.push(cross_mark_marker);
        }
      }
      else {
        console.log("Geocoder fail due to ", status);
      }
    });
  });
}

function renderPage() {
  getComments();
  initMap();
}


window.addEventListener("DOMContentLoaded", function() {

  randQuote();
  renderPage();

  const cmt_form = document.getElementById("cmt_form");
  const cmt_del_form = document.getElementById("cmt_del_form")

  document.getElementById("cmt_button").addEventListener("click", function() {
    cmt_form.submit();
  });

  document.getElementById("cmt_del_button").addEventListener("click", function() {
    cmt_del_form.submit();
  });
});