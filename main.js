
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

let playerList = []; //how to populate this based on input from previous page?

let round;
let rollScore;
let roundScore;
let currentPlayer;


let card1 = new Pig("razorback", "razorback-single.jpg", 5, "unselected")
let card2 = new Pig("trotter", "trotter-single.jpg", 5, "unselected")
let card3 = new Pig("snouter", "snouter-single.jpg", 10, "unselected")
let card4 = new Pig("leaning", "leaning-single.jpg", 15, "unselected")
let card5 = new Pig("pigout", "pigout-single.jpg", 0, "unselected")
let card6 = new Pig("oinker", "oinker-single.jpg", 0, "unselected")

let player1 = new Player("Sarah", 100)

function addPlayers(name1, name2, name3) {
  if (arguments.length == 1) // Means second parameter is not passed
    {
      playerList = [name1]
      console.log(name1 + " was added to the game");
    }
    if (arguments.length == 2) // Means third parameter is not passed
    {
      playerList = [name1, name2]
      console.log(name1 + " & " + name2 + " were added to the game");
    }
    if (arguments.length == 3) // Means all parameters were passed
    {
      playerList = [name1, name2, name3]
      console.log(name1 + ", " + name2 + " & " + name3 + " were added to the game");
    }
    currentPlayer = playerList[0]
    newRound()
}


function newGame() {
  round = 0
  rollScore = 0
  roundScore = 0
  player1.totalPts = 0
  currentPlayer = playerList[0]
  console.log("Game begins! Enter players.");
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
  card2.state = "unselected"
  card3.state = "unselected"
  card4.state = "unselected"
  card5.state = "unselected"
  card6.state = "unselected" 
  displayStats()
}

function displayStats() {
  // can be changed to display or update page
  console.log("  Player: " + currentPlayer);
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
  card2.state = "unselected"
  card3.state = "unselected"
  card4.state = "unselected"
  card5.state = "unselected"
  card6.state = "unselected" 
  rollScore = 0
}

function pigSelected(pig) {
  switch (pig.state) {
    case "unselected":
      rollScore = rollScore + pig.value
      pig.switchState()
      console.log("Confirm roll for " + rollScore + " points?");
      break;
    case "single":
      rollScore = rollScore + pig.value
      pig.switchState()
      console.log("pts: " + pig.value + " for a roll total of " + rollScore);
      console.log("Confirm roll for " + rollScore + " points?");
      break;
    case "double":
      rollScore = rollScore - (pig.value * 2)
      pig.switchState()
      console.log("confirm unselected");
      break;
    default:
      break;
  }
  console.log("  Roll amount: " + rollScore);
  console.log("  State: " + pig.state);
  displayStats()
  // [ ] updateRoundValue()
  console.log(pig.name + " selected");
}

function confirmRoll(confirm) {
  switch (confirm) {
    case "yes":
        console.log("Confirmed for " + rollScore + " pts");
        roundScore = roundScore + rollScore
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

function bank() {
  // roundScore = 0
  // rollScore = 0

  // displayStats()
}

newGame()

//languge 

// Rolls (pig choice) 
//
// Bank adds to player total 


/*
Roll: select pigs, add points to roll
Add roll to round
Round: mulitple rolls before bank or PigOIut
Bank to add round points to player total 
Player total 


*/