
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
        document.getElementById(this.name).className = "pig-card-single";
        break;
      case "single":
        this.state = "double"
        this.image = "porker-double.jpg"
        document.getElementById(this.name).className = "pig-card-double";
        break;
        case "double":
          this.state = "unselected"
          this.image = "porker-single.jpg"
          document.getElementById(this.name).className = "pig-card";
          break;
      default:
        console.log("default");
        break;
    }
  }
  resetState() {
    this.state = "unselected"
    this.image = "porker-single.jpg"
    document.getElementById(this.name).className = "pig-card";
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
      //disable add players button 
    document.getElementById("add-players").disabled = true
    document.getElementById("add-players").innerText = "Players added, round started"
}


function newGame() {
  round = 0
  rollScore = 0
  roundScore = 0
  player1.totalPts = 0
  currentPlayer = playerList[0]
  console.log("Game begins! Enter players.");
  document.getElementById("roll-done").disabled = true
  document.getElementById("roll-done").innerText = "Choose pigs"
}

function nextPlayer() {
  let current = playerList.indexOf(currentPlayer)
  current++
  currentPlayer = playerList[current]
  console.log(currentPlayer + "\'s turn");
}

function newRound() {
  console.log("New round!");
  (round > 0) ? nextPlayer() : null; //if not on first round call nextPlayer()
  currentPlayer = playerList[0]
  round++
  roundScore = 0
  rollScore = 0
  document.getElementById("roll-done").disabled = true
  document.getElementById("roll-done").innerText = "Choose pigs"
  displayStats()
}

function displayStats() {

  document.getElementById("stats-players").innerHTML = "Players: " + playerList[0] + ", " + playerList[1] + ", " + playerList[2];
  document.getElementById("stats-rndplayer").innerHTML = "Round player: " + currentPlayer
  document.getElementById("stats-roll").innerHTML = "This roll: " + rollScore
  document.getElementById("stats-round").innerHTML = "This round: " + roundScore
  document.getElementById("stats-total").innerHTML = "Player total: " +   player1.totalPts
}

function endRound() {
  console.log("round has ended");
  // [ ] set current player to next player in list
}

function newRoll() {
  console.log("new roll started");
  card1.resetState()
  card2.resetState()
  card3.resetState()
  card4.resetState()
  card5.resetState()
  card6.resetState()
  rollScore = 0
  document.getElementById("roll-done").disabled = true
  document.getElementById("roll-done").innerText = "Choose pigs"
}

function pigSelected(pig) {
  switch (pig.state) {
    case "unselected":
      rollScore = rollScore + pig.value
      pig.switchState()
      
      break;
    case "single":
      rollScore = rollScore + pig.value
      pig.switchState()
      document.getElementById("roll-done").disabled = false
      document.getElementById("roll-done").innerText = "Confirm roll for " + rollScore + " points?"
      break;
    case "double":
      rollScore = rollScore - (pig.value * 2)
      pig.switchState()
      document.getElementById("roll-done").disabled = true
      document.getElementById("roll-done").innerText = "Choose pigs"
      break;
    default:
      break;
  }
  //
  displayStats()
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
  newRound()
}

newGame()
