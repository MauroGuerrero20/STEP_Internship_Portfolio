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
    "AD": {
      "country": "Andorra"
    },
    "AE": {
      "country": "United Arab Emirates"
    },
    "AF": {
      "country": "Afghanistan"
    },
    "AG": {
      "country": "Antigua and Barbuda"
    },
    "AI": {
      "country": "Anguilla"
    },
    "AL": {
      "country": "Albania"
    },
    "AM": {
      "country": "Armenia"
    },
    "AN": {
      "country": "Netherlands Antilles"
    },
    "AO": {
      "country": "Angola"
    },
    "AQ": {
      "country": "Antarctica"
    },
    "AR": {
      "country": "Argentina"
    },
    "AS": {
      "country": "American Samoa"
    },
    "AT": {
      "country": "Austria"
    },
    "AU": {
      "country": "Australia"
    },
    "AW": {
      "country": "Aruba"
    },
    "AZ": {
      "country": "Azerbaijan"
    },
    "BA": {
      "country": "Bosnia and Herzegovina"
    },
    "BB": {
      "country": "Barbados"
    },
    "BD": {
      "country": "Bangladesh"
    },
    "BE": {
      "country": "Belgium"
    },
    "BF": {
      "country": "Burkina Faso"
    },
    "BG": {
      "country": "Bulgaria"
    },
    "BH": {
      "country": "Bahrain"
    },
    "BI": {
      "country": "Burundi"
    },
    "BJ": {
      "country": "Benin"
    },
    "BM": {
      "country": "Bermuda"
    },
    "BN": {
      "country": "Brunei"
    },
    "BO": {
      "country": "Bolivia"
    },
    "BR": {
      "country": "Brazil"
    },
    "BS": {
      "country": "Bahamas"
    },
    "BT": {
      "country": "Bhutan"
    },
    "BV": {
      "country": "Bouvet Island"
    },
    "BW": {
      "country": "Botswana"
    },
    "BY": {
      "country": "Belarus"
    },
    "BZ": {
      "country": "Belize"
    },
    "CA": {
      "country": "Canada"
    },
    "CC": {
      "country": "Cocos [Keeling] Islands"
    },
    "CD": {
      "country": "Congo [DRC]"
    },
    "CF": {
      "country": "Central African Republic"
    },
    "CG": {
      "country": "Congo [Republic]"
    },
    "CH": {
      "country": "Switzerland"
    },
    "CI": {
      "country": "Côte d'Ivoire"
    },
    "CK": {
      "country": "Cook Islands"
    },
    "CL": {
      "country": "Chile"
    },
    "CM": {
      "country": "Cameroon"
    },
    "CN": {
      "country": "China"
    },
    "CO": {
      "country": "Colombia"
    },
    "CR": {
      "country": "Costa Rica"
    },
    "CU": {
      "country": "Cuba"
    },
    "CV": {
      "country": "Cape Verde"
    },
    "CX": {
      "country": "Christmas Island"
    },
    "CY": {
      "country": "Cyprus"
    },
    "CZ": {
      "country": "Czech Republic"
    },
    "DE": {
      "country": "Germany"
    },
    "DJ": {
      "country": "Djibouti"
    },
    "DK": {
      "country": "Denmark"
    },
    "DM": {
      "country": "Dominica"
    },
    "DO": {
      "country": "Dominican Republic"
    },
    "DZ": {
      "country": "Algeria"
    },
    "EC": {
      "country": "Ecuador"
    },
    "EE": {
      "country": "Estonia"
    },
    "EG": {
      "country": "Egypt"
    },
    "EH": {
      "country": "Western Sahara"
    },
    "ER": {
      "country": "Eritrea"
    },
    "ES": {
      "country": "Spain"
    },
    "ET": {
      "country": "Ethiopia"
    },
    "FI": {
      "country": "Finland"
    },
    "FJ": {
      "country": "Fiji"
    },
    "FK": {
      "country": "Falkland Islands [Islas Malvinas]"
    },
    "FM": {
      "country": "Micronesia"
    },
    "FO": {
      "country": "Faroe Islands"
    },
    "FR": {
      "country": "France"
    },
    "GA": {
      "country": "Gabon"
    },
    "GB": {
      "country": "United Kingdom"
    },
    "GD": {
      "country": "Grenada"
    },
    "GE": {
      "country": "Georgia"
    },
    "GF": {
      "country": "French Guiana"
    },
    "GG": {
      "country": "Guernsey"
    },
    "GH": {
      "country": "Ghana"
    },
    "GI": {
      "country": "Gibraltar"
    },
    "GL": {
      "country": "Greenland"
    },
    "GM": {
      "country": "Gambia"
    },
    "GN": {
      "country": "Guinea"
    },
    "GP": {
      "country": "Guadeloupe"
    },
    "GQ": {
      "country": "Equatorial Guinea"
    },
    "GR": {
      "country": "Greece"
    },
    "GS": {
      "country": "South Georgia and the South Sandwich Islands"
    },
    "GT": {
      "country": "Guatemala"
    },
    "GU": {
      "country": "Guam"
    },
    "GW": {
      "country": "Guinea-Bissau"
    },
    "GY": {
      "country": "Guyana"
    },
    "GZ": {
      "country": "Gaza Strip"
    },
    "HK": {
      "country": "Hong Kong"
    },
    "HM": {
      "country": "Heard Island and McDonald Islands"
    },
    "HN": {
      "country": "Honduras"
    },
    "HR": {
      "country": "Croatia"
    },
    "HT": {
      "country": "Haiti"
    },
    "HU": {
      "country": "Hungary"
    },
    "ID": {
      "country": "Indonesia"
    },
    "IE": {
      "country": "Ireland"
    },
    "IL": {
      "country": "Israel"
    },
    "IM": {
      "country": "Isle of Man"
    },
    "IN": {
      "country": "India"
    },
    "IO": {
      "country": "British Indian Ocean Territory"
    },
    "IQ": {
      "country": "Iraq"
    },
    "IR": {
      "country": "Iran"
    },
    "IS": {
      "country": "Iceland"
    },
    "IT": {
      "country": "Italy"
    },
    "JE": {
      "country": "Jersey"
    },
    "JM": {
      "country": "Jamaica"
    },
    "JO": {
      "country": "Jordan"
    },
    "JP": {
      "country": "Japan"
    },
    "KE": {
      "country": "Kenya"
    },
    "KG": {
      "country": "Kyrgyzstan"
    },
    "KH": {
      "country": "Cambodia"
    },
    "KI": {
      "country": "Kiribati"
    },
    "KM": {
      "country": "Comoros"
    },
    "KN": {
      "country": "Saint Kitts and Nevis"
    },
    "KP": {
      "country": "North Korea"
    },
    "KR": {
      "country": "South Korea"
    },
    "KW": {
      "country": "Kuwait"
    },
    "KY": {
      "country": "Cayman Islands"
    },
    "KZ": {
      "country": "Kazakhstan"
    },
    "LA": {
      "country": "Laos"
    },
    "LB": {
      "country": "Lebanon"
    },
    "LC": {
      "country": "Saint Lucia"
    },
    "LI": {
      "country": "Liechtenstein"
    },
    "LK": {
      "country": "Sri Lanka"
    },
    "LR": {
      "country": "Liberia"
    },
    "LS": {
      "country": "Lesotho"
    },
    "LT": {
      "country": "Lithuania"
    },
    "LU": {
      "country": "Luxembourg"
    },
    "LV": {
      "country": "Latvia"
    },
    "LY": {
      "country": "Libya"
    },
    "MA": {
      "country": "Morocco"
    },
    "MC": {
      "country": "Monaco"
    },
    "MD": {
      "country": "Moldova"
    },
    "ME": {
      "country": "Montenegro"
    },
    "MG": {
      "country": "Madagascar"
    },
    "MH": {
      "country": "Marshall Islands"
    },
    "MK": {
      "country": "Macedonia [FYROM]"
    },
    "ML": {
      "country": "Mali"
    },
    "MM": {
      "country": "Myanmar [Burma]"
    },
    "MN": {
      "country": "Mongolia"
    },
    "MO": {
      "country": "Macau"
    },
    "MP": {
      "country": "Northern Mariana Islands"
    },
    "MQ": {
      "country": "Martinique"
    },
    "MR": {
      "country": "Mauritania"
    },
    "MS": {
      "country": "Montserrat"
    },
    "MT": {
      "country": "Malta"
    },
    "MU": {
      "country": "Mauritius"
    },
    "MV": {
      "country": "Maldives"
    },
    "MW": {
      "country": "Malawi"
    },
    "MX": {
      "country": "Mexico"
    },
    "MY": {
      "country": "Malaysia"
    },
    "MZ": {
      "country": "Mozambique"
    },
    "NA": {
      "country": "Namibia"
    },
    "NC": {
      "country": "New Caledonia"
    },
    "NE": {
      "country": "Niger"
    },
    "NF": {
      "country": "Norfolk Island"
    },
    "NG": {
      "country": "Nigeria"
    },
    "NI": {
      "country": "Nicaragua"
    },
    "NL": {
      "country": "Netherlands"
    },
    "NO": {
      "country": "Norway"
    },
    "NP": {
      "country": "Nepal"
    },
    "NR": {
      "country": "Nauru"
    },
    "NU": {
      "country": "Niue"
    },
    "NZ": {
      "country": "New Zealand"
    },
    "OM": {
      "country": "Oman"
    },
    "PA": {
      "country": "Panama"
    },
    "PE": {
      "country": "Peru"
    },
    "PF": {
      "country": "French Polynesia"
    },
    "PG": {
      "country": "Papua New Guinea"
    },
    "PH": {
      "country": "Philippines"
    },
    "PK": {
      "country": "Pakistan"
    },
    "PL": {
      "country": "Poland"
    },
    "PM": {
      "country": "Saint Pierre and Miquelon"
    },
    "PN": {
      "country": "Pitcairn Islands"
    },
    "PR": {
      "country": "Puerto Rico"
    },
    "PS": {
      "country": "Palestinian Territories"
    },
    "PT": {
      "country": "Portugal"
    },
    "PW": {
      "country": "Palau"
    },
    "PY": {
      "country": "Paraguay"
    },
    "QA": {
      "country": "Qatar"
    },
    "RE": {
      "country": "Réunion"
    },
    "RO": {
      "country": "Romania"
    },
    "RS": {
      "country": "Serbia"
    },
    "RU": {
      "country": "Russia"
    },
    "RW": {
      "country": "Rwanda"
    },
    "SA": {
      "country": "Saudi Arabia"
    },
    "SB": {
      "country": "Solomon Islands"
    },
    "SC": {
      "country": "Seychelles"
    },
    "SD": {
      "country": "Sudan"
    },
    "SE": {
      "country": "Sweden"
    },
    "SG": {
      "country": "Singapore"
    },
    "SH": {
      "country": "Saint Helena"
    },
    "SI": {
      "country": "Slovenia"
    },
    "SJ": {
      "country": "Svalbard and Jan Mayen"
    },
    "SK": {
      "country": "Slovakia"
    },
    "SL": {
      "country": "Sierra Leone"
    },
    "SM": {
      "country": "San Marino"
    },
    "SN": {
      "country": "Senegal"
    },
    "SO": {
      "country": "Somalia"
    },
    "SR": {
      "country": "Suriname"
    },
    "ST": {
      "country": "São Tomé and Príncipe"
    },
    "SV": {
      "country": "El Salvador"
    },
    "SY": {
      "country": "Syria"
    },
    "SZ": {
      "country": "Swaziland"
    },
    "TC": {
      "country": "Turks and Caicos Islands"
    },
    "TD": {
      "country": "Chad"
    },
    "TF": {
      "country": "French Southern Territories"
    },
    "TG": {
      "country": "Togo"
    },
    "TH": {
      "country": "Thailand"
    },
    "TJ": {
      "country": "Tajikistan"
    },
    "TK": {
      "country": "Tokelau"
    },
    "TL": {
      "country": "Timor-Leste"
    },
    "TM": {
      "country": "Turkmenistan"
    },
    "TN": {
      "country": "Tunisia"
    },
    "TO": {
      "country": "Tonga"
    },
    "TR": {
      "country": "Turkey"
    },
    "TT": {
      "country": "Trinidad and Tobago"
    },
    "TV": {
      "country": "Tuvalu"
    },
    "TW": {
      "country": "Taiwan"
    },
    "TZ": {
      "country": "Tanzania"
    },
    "UA": {
      "country": "Ukraine"
    },
    "UG": {
      "country": "Uganda"
    },
    "UM": {
      "country": "U.S. Minor Outlying Islands"
    },
    "US": {
      "country": "United States"
    },
    "UY": {
      "country": "Uruguay"
    },
    "UZ": {
      "country": "Uzbekistan"
    },
    "VA": {
      "country": "Vatican City"
    },
    "VC": {
      "country": "Saint Vincent and the Grenadines"
    },
    "VE": {
      "country": "Venezuela"
    },
    "VG": {
      "country": "British Virgin Islands"
    },
    "VI": {
      "country": "U.S. Virgin Islands"
    },
    "VN": {
      "country": "Vietnam"
    },
    "VU": {
      "country": "Vanuatu"
    },
    "WF": {
      "country": "Wallis and Futuna"
    },
    "WS": {
      "country": "Samoa"
    },
    "XK": {
      "country": "Kosovo"
    },
    "YE": {
      "country": "Yemen"
    },
    "YT": {
      "country": "Mayotte"
    },
    "ZA": {
      "country": "South Africa"
    },
    "ZM": {
      "country": "Zambia"
    },
    "ZW": {
      "country": "Zimbabwe"
    }
  };

  getRandCountryCode() {
    const countryCodeArray = Object.keys(this.keyedJSON);
    return countryCodeArray[Math.floor(Math.random() * countryCodeArray.length)];
  }

  removeCountry(countryCode) {
    delete this.keyedJSON[countryCode];
  }

  empty() {
    if (Object.keys(this.keyedJSON).length === 0) {
      return true;
    }
    else {
      return false;
    }
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

function deleteRandCountryDOM() {

  const randCountryDOM = document.getElementById("rand_country")

  let child = randCountryDOM.lastElementChild;
  while (child) {
    randCountryDOM.removeChild(child);
    child = randCountryDOM.lastElementChild;
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

  const outputDOM = document.getElementById("map_output_answer");

  document.getElementById("map_output_answer").classList.remove("map_correct");
  document.getElementById("map_output_answer").classList.remove("map_incorrect");

  let child = outputDOM.lastElementChild;
  while (child) {
    outputDOM.removeChild(child);
    child = outputDOM.lastElementChild;
  }
}

function selectedCountryDOM(selectedCountry) {

  const countryDOM = document.createElement("b")
    .appendChild(document.createTextNode(selectedCountry));

  document.getElementById("skip_btn").remove();

  document.getElementById("selected_country")
    .appendChild(document.createElement("h3")
      .appendChild(document.createTextNode("You clicked on ")).parentElement
      .appendChild(countryDOM.parentElement).parentElement);
}

function deleteSelectedCountryDOM() {

  const outputDOM = document.getElementById("selected_country");

  let child = outputDOM.lastElementChild;
  while (child) {
    outputDOM.removeChild(child);
    child = outputDOM.lastElementChild;
  }
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

  console.log(Object.keys(countries.keyedJSON).length);

  document.getElementById("skip_btn").addEventListener("click", function() {

    if (countries.empty()) {
      deleteRandCountryDOM();
      deleteAnswerDOM();
      deleteSelectedCountryDOM();
      noCountriesLeftDOM();

      return;
    }

    deleteRandCountryDOM();
    // countries.removeCountry(randCountryCodeStr);
    randCountryCodeStr = createRandCountryDOM(countries);
  });

  map.addListener('click', function(mapMouseEvent) {

    console.log(Object.keys(countries.keyedJSON).length);

    if (countries.empty()) {
      deleteRandCountryDOM();
      deleteAnswerDOM();
      deleteSelectedCountryDOM();
      noCountriesLeftDOM();

      return;
    }

    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': mapMouseEvent.latLng }, function(address, status) {

      if (status === "OK") {

        deleteAnswerDOM();
        deleteSelectedCountryDOM();

        const addressArray = Array.from(address);

        console.log(addressArray);

        const countryCodeStr = addressArray[addressArray.length - 1].address_components[0].short_name;
        const countryNameStr = addressArray[addressArray.length - 1].address_components[0].long_name;

        selectedCountryDOM(countryNameStr);

        if (countryCodeStr === randCountryCodeStr) {
          correctDOM();
          deleteRandCountryDOM();
          countries.removeCountry(randCountryCodeStr);
          randCountryCodeStr = createRandCountryDOM(countries);

          var checkmark_marker = new google.maps.Marker({
            position: mapMouseEvent.latLng,
            map: map,
            icon: "images/checkmark_icon.png",
            animation: google.maps.Animation.DROP,
          });

          // Remove Incorrect Markers
          incorrectMarkersArray.forEach(mrk => {
            console.log(mrk);
            mrk.setMap(null);
          });
        }
        else {
          incorrectDOM();

          var cross_mark_marker = new google.maps.Marker({
            position: mapMouseEvent.latLng,
            map: map,
            icon: "images/cross_mark_icon.png",
            animation: google.maps.Animation.DROP,
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