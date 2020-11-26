"use strict";

// selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

// Starting point
let scores, currentScore, activePlayer, playing, winCondition;

const init = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  winCondition = 20;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const win = function () {
  diceEl.classList.add("hidden");
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  alert("🎉Yeah! You win the game!");
};

// rolling dice
rollBtn.addEventListener("click", function () {
  if (playing) {
    // generating a random dice roll
    let randomDice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${randomDice}.png`;

    // check for rolled 1: if true, switch to next player
    if (randomDice === 1) {
      switchPlayer();
    } else {
      // add the dice to the current score
      currentScore += randomDice;
      if (currentScore >= winCondition) {
        win();
      }
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
});

// holding the score
holdBtn.addEventListener("click", function () {
  if (playing) {
    // add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player's score is 100
    if (scores[activePlayer] >= winCondition) {
      win();
    } else {
      // switch player
      switchPlayer();
    }
  }
});

newBtn.addEventListener("click", function () {
  init();
});
