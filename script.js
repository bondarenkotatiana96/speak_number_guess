const msgEl = document.getElementById("msg");

const randomNumber = getRandomNumber();

console.log("Number: " + randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture yser speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  
  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `;
}

// Number validation
function checkNumber(msg) {
  const num = +msg;
  
  // Check if valid number
  if(Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // Check in range
  if(num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100";
    return;
  }

  // Check number
  if(num === randomNumber) {
    document.body.innerHTML = `
    <h2>Congrats! You've guessed the number!
    <br> <br>
    It was ${num}!
    </h2>
    <button class="play-again" id="play-again">Play Again
    </button>`;
  } else if(num > randomNumber) {
    msgEl.innerHTML += "<div>Go lower</div>";
  } else {
    msgEl.innerHTML += "<div>Go higher</div>";
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

// Play again
document.body.addEventListener("click", (e) => {
  if(e.target.id == "play-again") {
    window.location.reload();
  }
});

