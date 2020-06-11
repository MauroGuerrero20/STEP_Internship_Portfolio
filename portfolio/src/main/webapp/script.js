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

  constructor(jsonObj) {
    this.keyedJSON = jsonObj;
  }

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

function correctAnswerDOM(answerBool) {

  let outputStr;
  let outputClassStr;

  if (answerBool) {
    outputStr = "Correct!";
    outputClassStr = "map_correct";
  }
  else {
    outputStr = "Incorrect";
    outputClassStr = "map_incorrect";
  }

  const correctOuputDOM = document.getElementById("map_output_answer")
    .appendChild(document.createElement("h4")
      .appendChild(document.createTextNode(outputStr)).parentElement);

  correctOuputDOM.parentElement.classList.add(outputClassStr);
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

  fetch("/documents/countries.json").then(resp => resp.json()).then(countriesJsonFile => {

    let countries = new Countries(countriesJsonFile);
    console.log(countries.keyedJSON);
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

          console.log(address);

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
            correctAnswerDOM(true);
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
            correctAnswerDOM(false);

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
      });
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