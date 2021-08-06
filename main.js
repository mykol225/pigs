
class Pig {
  constructor(name, image, value, state) {
    this.name = name;
    this.image = image;
    this.value = value;
    this.state = state;
  }
  switchState() {
    switch (this.state) {
      case "unselected":
        this.state = "single";
        this.image = "porker-single.jpg"
        break;
      case "single":
        this.state = "double"
        this.image = "porker-double.jpg"
        break;
        case "double":
          this.state = "unselected"
          this.image = "porker-single.jpg"
          break;
      
      default:
        console.log("default");
        break;
    }
  }
}

class Player {
  constructor(name, totalPts) {
    this.name = name;
    this.totalPts = totalPts;
  }
}

const playerList = []; //how to populate this based on input from previous page?

let round;
let rollScore;
let roundScore;
let currentPlayer;

let card1 = new Pig("porker", "porker-single.jpg", 15, "unselected") // card2, card3, card4, etc
let player1 = new Player("Sarah", 100)


function newGame() {
  round = 0
  rollScore = 0
  roundScore = 0
  player1.totalPts = 0
  currentPlayer = playerList[0]
  console.log("Game begins!");
  newRound()
}

function newRound() {
  console.log("New round!");
  // [ ] get current player
  // [ ] display current player
  // [ ] display round value #
  // [ ] display player total 
  // [ ] display all pig cards
  round++
  roundScore = 0
  rollScore = 0
  card1.state = "unselected" //how to do this for all cards?
  displayStats()
}

function displayStats() {
  // can be changed to display or update page
  console.log("  Player: Player 1");
  console.log("  Roll: " + rollScore);
  console.log("  Round: " + roundScore);
  console.log("  Total: " +   player1.totalPts);
}

function endRound() {
  console.log("round has ended");
  // [ ] set current player to next player in list
}

function newRoll() {
  console.log("new roll started");
  card1.state = "unselected" //how to do this for all cards?
  rollScore = 0
}

function pigSelected(name) {
  switch (card1.state) {
    case "unselected":
      rollScore = rollScore + card1.value
      card1.switchState()
      console.log("Confirm roll for " + rollScore + " points?");
      break;
    case "single":
      rollScore = rollScore + card1.value
      card1.switchState()
      console.log("pts: " + card1.value + " for a roll total of " + rollScore);
      console.log("Confirm roll for " + rollScore + " points?");
      break;
    case "double":
      rollScore = rollScore - (card1.value * 2)
      card1.switchState()
      console.log("confirm unselected");
      break;
    default:
      break;
  }
  console.log("  Roll amount: " + rollScore);
  console.log("  State: " + card1.state);
  displayStats()
  // [ ] updateRoundValue()
  console.log(name + " selected");
}

function confirmRoll(confirm) {
  switch (confirm) {
    case "yes":
        console.log("Confirmed for " + rollScore + " pts");
        roundScore = rollScore
        newRoll()
        displayStats()
      break;
      case "no":
        console.log("not confirmed");
        displayStats()
      break;
    default:
      break;
  }
}

newGame()

