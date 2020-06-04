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
  var appendElement = document.createElement(newElement);

  element.parentNode.insertBefore(appendElement, element.nextSibling);

  return appendElement;
}

// Fetch comments from DataServlet.java
function getComments() {

  fetch('/comments').then(response => response.json()).then((cmtContainer) => {

    // console.log(cmtContainer.length, typeof cmtContainer.length);

    // if (cmtContainer.length === 0) {
    //   return;
    // }
    // else {
    //   document.getElementById("about_me").classList.remove("col-12");
    //   document.getElementById("about_me").classList.add("col-11");

    //   var comment_div = appendElement("about_me", "div");
    //   comment_div.classList.add("col-1");
    // }

    const commentsArray = Array.from(cmtContainer);

    console.log(commentsArray);

    if (!(commentsArray && commentsArray.length)) return;

    const commentsOutput = document.getElementById("comments-output")
      .appendChild(document.createElement("h2")
        .appendChild(document.createTextNode("Comments")).parentElement);

    const cmtDOM = document.createElement("div");
    let quoteDOM;
    let pDOM;
    let footerDOM;

    commentsArray.forEach(cmt => {

      quoteDOM = document.createElement("blockquote");

      pDOM = document.createElement("p").appendChild(document.createTextNode(cmt.cmtMsg));

      footerDOM = document.createElement("footer").appendChild(document.createTextNode(cmt.name));
      footerDOM.parentElement.classList.add("blockquote-footer");

      quoteDOM.appendChild(pDOM.parentElement);
      quoteDOM.appendChild(footerDOM.parentElement);
      quoteDOM.classList.add("blockquote");

      cmtDOM.appendChild(quoteDOM);
    });

    commentsOutput.parentElement.appendChild(cmtDOM);
    return false;
  });
}

window.addEventListener("DOMContentLoaded", function() {

  randQuote();
  getComments();

  const cmt_form = document.getElementById("cmt_form");
  const cmt_del_form = document.getElementById("cmt_del_form")

  document.getElementById("cmt_button").addEventListener("click", function() {
    cmt_form.submit();
  });

  document.getElementById("cmt_del_button").addEventListener("click", function() {
    cmt_del_form.submit();
  });
});