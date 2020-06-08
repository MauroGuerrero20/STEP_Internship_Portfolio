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
    fullscreenControl: false
  });

  const NoLabelsStyle = [
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

  map.set('styles', NoLabelsStyle);

  map.addListener('click', function(mapMouseEvent) {
    console.log(mapMouseEvent.latLng.toJSON());

    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({'location': mapMouseEvent.latLng}, function(address, status){

      const addressArray = Array.from(address);

      if (status === "OK"){
        console.log(addressArray[addressArray.length - 1].formatted_address);
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