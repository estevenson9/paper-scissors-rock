"use strict";
const possibleResults = new Map();
const optionBtns = document.querySelectorAll(".options");
const bodyElement = document.querySelector(".body");
let score = [0, 0];
optionBtns.forEach((element) => {
  element.addEventListener("click", playRound);
});

const keys = [
  ["scissors", "rock"],
  ["scissors", "paper"],
  ["rock", "paper"], //ensure these are ordered correctly so map is created with correct key value pairs
  ["rock", "scissors"],
  ["paper", "scissors"],
  ["paper", "rock"],
];
for (let index = 0; index < keys.length; index++) {
  const values = [0, 1];
  if (index % 2) {
    possibleResults.set(keys[index], values.reverse());
  } else {
    possibleResults.set(keys[index], values);
  }
}

function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3);
  switch (computerChoice) {
    case 0:
      return "paper";
    case 1:
      return "rock";
    case 2:
      return "scissors";
    default:
      console.log("An error ocurred");
      break;
  }
}

function gameplayLogic(playerInput, computerInput) {
  if (playerInput === computerInput) {
    return [0, 0];
  } else {
    let choicesChosen = [playerInput, computerInput];
    let checkResult;
    for (let index = 0; index < keys.length; index++) {
      if (
        keys[index][0] === choicesChosen[0] &&
        keys[index][1] === choicesChosen[1]
      ) {
        checkResult = keys[index];
      }
    }
    return possibleResults.get(checkResult);
  }
}
function playRound() {
  return gameplayLoop(this.value);
}
function gameplayLoop(input) {
  let playerVal = input;
  let computerVal = getComputerChoice();
  let resultsContainer = document.createElement("div");
  let chosenChoices = document.createElement("p");
  let roundResults = document.createElement("p");
  chosenChoices.textContent = `Player chose ${playerVal}, Computer chose ${computerVal}`;
  let results = gameplayLogic(playerVal, computerVal);
  for (let index = 0; index < score.length; index++) {
    score[index] += results[index];
  }
  roundResults.textContent = `Player - ${score[0]} Computer - ${score[1]}`;
  resultsContainer.appendChild(chosenChoices);
  resultsContainer.appendChild(roundResults);
  bodyElement.appendChild(resultsContainer);
}
