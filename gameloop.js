"use strict";
const scoreCard = document.querySelector(".scoreCard");
const announcement = document.querySelector(".announcements");
const history = document.querySelector(".history");

const toggleBtn = document.querySelector(".toggleHistory");
toggleBtn.addEventListener("click", () => {
  if (toggleBtn.textContent === "Show") {
    toggleBtn.textContent = "Hide";
    history.style.cssText = "visibility: visible";
  } else {
    toggleBtn.textContent = "Show";
    history.style.cssText = "visibility: hidden";
  }
});
const optionBtns = document.querySelectorAll(".options");
optionBtns.forEach((element) => {
  element.addEventListener("click", playRound);
});

let score = [0, 0];
const possibleResults = new Map();
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
  let results = gameplayLogic(playerVal, computerVal);
  for (let index = 0; index < score.length; index++) {
    score[index] += results[index];
  }
  scoreCard.textContent = `Player ${score[0]} - ${score[1]} Computer`;
  switch (results.toString()) {
    case [0, 0].toString():
      announcement.textContent = `It was a tie!`;
      break;
    case [1, 0].toString():
      announcement.textContent = `You beat the Computer!`;
      break;
    case [0, 1].toString():
      announcement.textContent = `The Computer beat you!`;
      break;
  }
  let resultsContainer = document.createElement("div");
  let chosenChoices = document.createElement("p");
  let roundResults = document.createElement("p");
  chosenChoices.textContent = `Player chose ${playerVal}, Computer chose ${computerVal}`;
  roundResults.textContent = `Player ${results[0]} - ${results[1]} Computer`;
  resultsContainer.appendChild(chosenChoices);
  resultsContainer.appendChild(roundResults);
  history.appendChild(resultsContainer);
}
