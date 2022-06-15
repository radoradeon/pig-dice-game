'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// HOLDING CURRENT SCORES PLAYING PLAYER - DEFAULT 0
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// let currentScore1 = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Starting conditions
const startConditions = function () {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
};
startConditions();

const resetConditions = function () {
  // SET DEFAULT PLAYER TO 0 AGAIN
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 0);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // CURRENT SCORE SET TO 0
  currentScore = 0;
  startConditions();
  document.querySelector('.current-score').textContent = 0;

  // TOTAL SCORE SET TO 0 TO ALL PLAYERS
  for (let i = 0; i < scores.length; i++) {
    scores[i] -= scores[i];
  }

  // REMOVE WINNER PLAYER CLASSES IF ISSET
  document.querySelector(`.player--winner`).classList.remove('player--winner');

  // UNBLOCK  BUTTONS IF ITS NECCESSARY
  playing = true;
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1 if true switch to next player (also add score)
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // There if dice = 1 switch player to another / next
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game if true
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    // If false, switch to thenext player
    switchPlayer();
  }
});

// RESETING THE GAME AFTER CLICK RESET BUTTON (NEW GAME)

btnNew.addEventListener('click', resetConditions);
