// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const modal = document.getElementById("modal");
modal.classList.add("hidden"); // hide it on page load

// Select all like glyphs (hearts)
const hearts = document.querySelectorAll(".like-glyph");

// Add click event listener to each heart
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        // Successful server response
        if (heart.textContent === EMPTY_HEART) {
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        } else {
          heart.textContent = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        }
      })
      .catch(error => {
        // Failed server response
        modal.classList.remove("hidden"); // show modal
        modal.querySelector("p").textContent = error; // show error message

        // Hide modal after 3 seconds
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 3000);
      });
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
