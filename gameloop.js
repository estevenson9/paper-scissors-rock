"use strict";
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

function playerChoice() {
  let input = prompt("Please input your choice [paper, scissors, rock]");
  let validatedInput = validatePlayerChoice(input);
  return validatedInput;
}

function validatePlayerChoice(input) {
  let inputToCheck = input;
  switch (inputToCheck) {
    case "Paper":
    case "p":
    case "P":
    case "paper":
      return "paper";

    case "Rock":
    case "r":
    case "R":
    case "rock":
      return "rock";

    case "Scissors":
    case "s":
    case "S":
    case "scissors":
      return "scissors";

    default:
      return "Please choose a correct value";
  }
}

function gameplayLogic(playerInput, computerInput) {
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

function gameplayLoop() {
  let playerVal = "";
  let score = [0, 0];
  while (true) {
    while (true) {
      let input = playerChoice();
      if (input === "paper" || input === "rock" || input === "scissors") {
        console.log("Player chose " + `${input}`);
        playerVal = input;
        break;
      }
    }
    let computerVal = getComputerChoice();

    console.log("Computer chose " + `${computerVal}`);
    let results = gameplayLogic(playerVal, computerVal);
    for (let index = 0; index < score.length; index++) {
      score[index] += results[index];
    }
    console.log("Player - " + `${score[0]}` + " Computer - " + `${score[1]}`);
  }
}

gameplayLoop();
