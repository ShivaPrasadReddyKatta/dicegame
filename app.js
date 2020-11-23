'use strict';

const btnRoll = document.querySelector('.roll-dice');
const hold = document.querySelector('.hold');
const dice = document.querySelector('.image');
const btnNew = document.querySelector('.new-game');

const score1El = document.querySelector('.p1');
const score2El = document.querySelector('.p2');
const current1El = document.querySelector('.cscore1');
const current2El = document.querySelector('.cscore2');
const player1El = document.querySelector('.player1');
const player2El = document.querySelector('.player2');

let activePlayer, currentScore, scores, playing;

const init = function () {
  playing = true;
  scores = [0, 0];
  activePlayer = 1;
  currentScore = 0;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  dice.classList.add('hidden');
  player1El.classList.add('active');
  player2El.classList.remove('active');
  player1El.classList.remove('winner');
  player2El.classList.remove('winner');
};

init();

const switchPlayer = function () {
  if (activePlayer === 1) {
    player1El.classList.remove('active');
    player2El.classList.add('active');
    activePlayer = 2;
  } else {
    player2El.classList.remove('active');
    player1El.classList.add('active');
    activePlayer = 1;
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const ranDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${ranDice}.png`;
    //   currentScore = ranDice > 1 ? currentScore + ranDice : 0;
    if (ranDice > 1) {
      currentScore += ranDice;
    } else {
      currentScore = 0;
      if (activePlayer === 1) {
        current1El.textContent = currentScore;
      } else {
        current2El.textContent = currentScore;
      }
      switchPlayer();
    }
    dice.classList.remove('hidden');
    if (activePlayer === 1) {
      current1El.textContent = currentScore;
    } else {
      current2El.textContent = currentScore;
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    if (currentScore > 0) {
      if (activePlayer === 1) {
        scores[0] += currentScore;
        score1El.textContent = scores[0];
        current1El.textContent = 0;
        currentScore = 0;
        if (scores[0] >= 100) {
          player1El.classList.add('winner');
          playing = false;
        }
      } else {
        scores[1] += currentScore;
        score2El.textContent = scores[1];
        current2El.textContent = 0;
        currentScore = 0;
        if (scores[1] >= 100) {
          player2El.classList.add('winner');
          playing = false;
        }
      }
    }
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});
