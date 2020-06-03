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

// Fetch comments from DataServlet.java
function getComments() {

  fetch('/comments').then(response => response.json()).then((cmtContainer) => {

    console.log(cmtContainer);

    if (!cmtContainer) return;

    const commentsOutput = document.getElementById("comments-output")
      .appendChild(document.createElement("h2")
        .appendChild(document.createTextNode("Comments")).parentElement);

    const cmtDOM = document.createElement("ul");

    const commentsArray = Array.from(cmtContainer);

    commentsArray.forEach(cmt => {
      cmtDOM.appendChild(document.createElement("li").appendChild(
        document.createTextNode(cmt)).parentElement);
    });

    commentsOutput.appendChild(cmtDOM);
  });
}

window.onload = function() {
  randQuote();
  getComments();
}

// Listens for Comments section buttons
window.addEventListener("load", function() {
  var cmt_form = document.getElementById("cmt_form");
  // var cmt_del_form = document.getElementById("cmt_del_form")

  document.getElementById("cmt_button").addEventListener("click", function() {
    cmt_form.submit();
  });

  // document.getElementById("cmt_del_button").addEventListener("click", function() {
  //   cmt_del_form.submit();
  // });
});