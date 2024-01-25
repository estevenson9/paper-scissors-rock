function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3);
  switch (computerChoice) {
    case 0:
      console.log("paper");
      break;
    case 1:
      console.log("rock");
      break;
    case 2:
      console.log("scissors");
      break;
    default:
      console.log("An error ocurred");
      break;
  }
}
for (let index = 0; index < 10; index++) {
  console.log(`${index}` + " input");
  getComputerChoice();
}
