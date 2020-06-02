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

function appendElement(currentElement, newElement) {
  var element = document.getElementById(currentElement);
  var appElement = document.createElement(newElement);

  element.parentNode.insertBefore(appElement, element.nextSibling);

  return appElement;
}

// Fetch comments from DataServlet.java
function getComments() {

  console.log("HE");

  fetch('/comments').then(response => response.json()).then((cmtContainer) => {

    if (!cmtContainer) {
      return;
    }
    else {
      document.getElementById("about_me").classList.remove("col-12");
      document.getElementById("about_me").classList.add("col-11");

      var comment_div = appendElement("about_me", "div");
      comment_div.classList.add("col-1");
    }

    var commentsOutput = document.getElementById("comments-output");

    var cmtIntroDOM = document.createElement("h2").appendChild(
      document.createTextNode("Comments"));

    commentsOutput.appendChild(cmtIntroDOM.parentElement);

    var cmtDOM;

    for (var index in cmtContainer) {

      cmtDOM = document.createElement("li").appendChild(
        document.createTextNode(cmtContainer[index])
      );
      commentsOutput.appendChild(cmtDOM.parentElement);
    }
  });
}

window.onload = function() {
  randQuote();
  getComments();

}

// Listens for Comments section button
window.addEventListener("load", function() {
  var cmt_form = document.getElementById("cmt_form");

  document.getElementById("cmt_button").addEventListener("click", function() {
    cmt_form.submit();
  });

  
});