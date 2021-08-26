
class Pig {
  constructor(name, image, value, state) {
    this.name = name;
    this.image = image;
    this.value = value;
    this.state = state;
  }
  setState(state) {
    switch (state) {
      case "unselected":
        this.state = "unselected"
        this.image = "porker-single.jpg"
        document.getElementById(this.name).className = "pig-card";
        break;
      case "single":
        this.state = "single";
        this.image = "porker-single.jpg"
        document.getElementById(this.name).className = "pig-card-single";
        break;
      case "double":
        this.state = "double"
        this.image = "porker-double.jpg"
        document.getElementById(this.name).className = "pig-card-double";
        break;
      case "disabled": 
        this.state = "disabled"
        this.image = "porker-single.jpg"
        document.getElementById(this.name).className = "pig-card";
        document.getElementById(this.name).disabled = true;
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
    document.getElementById(this.name).disabled = false;
  }
}

class Player {
  constructor(name, totalPts) {
    this.name = name;
    this.totalPts = totalPts;
  }
}

let playerList = [];            // how to populate this based on input from previous page?

let round;
let rollScore;
let roundScore;
let currentPlayer;
let selectedPigs = [];
let unselectedPigs = [];
let confirmBtn = document.getElementById("roll-done")


let card1 = new Pig("razorback", "razorback-single.jpg", 5, "unselected")
let card2 = new Pig("trotter", "trotter-single.jpg", 5, "unselected")
let card3 = new Pig("snouter", "snouter-single.jpg", 10, "unselected")
let card4 = new Pig("leaning", "leaning-single.jpg", 15, "unselected")
let card5 = new Pig("pigout", "pigout-single.jpg", 10, "unselected")
let card6 = new Pig("oinker", "oinker-single.jpg", 10, "unselected")

let cards = [card1, card2, card3, card4, card5, card6]

let player1 = new Player("Sarah", 100)

function addPlayers(name1, name2, name3) {
  if (arguments.length == 1)                            // means second parameter is not passed
    {
      playerList = [name1]
      console.log(name1 + " was added to the game");
    }
    if (arguments.length == 2)                          // means third parameter is not passed
    {
      playerList = [name1, name2]
      console.log(name1 + " & " + name2 + " were added to the game");
    }
    if (arguments.length == 3)                          // means all parameters were passed
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
  confirmIsDisabled(true)
  newRound()
}

function newRound() {
  console.log("New round!");
  (round > 0) ? nextPlayer() : null;                    // if not on first round call nextPlayer()
  currentPlayer = playerList[0]
  round++
  roundScore = 0
  rollScore = 0
  confirmBtn.disabled = true
  confirmIsDisabled(true)
  displayStats()
  newRoll()
}

function endRound() {
  console.log("round has ended");
  // [ ] set current player to next player in list
}

function newRoll() {
  console.log("new roll started");
  rollScore = 0
  confirmIsDisabled(true)
  selectedPigs = []
  unselectedPigs = [card1.name, card2.name, card3.name, card4.name, card5.name, card6.name]
  card1.resetState()
  card2.resetState()
  card3.resetState()
  card4.resetState()
  card5.resetState()
  card6.resetState()
}



function nextPlayer() {
  let current = playerList.indexOf(currentPlayer)
  current++
  currentPlayer = playerList[current]
  console.log(currentPlayer + "\'s turn");
}

function displayStats() {
  document.getElementById("stats-players").innerHTML = "Players: " + playerList[0] + ", " + playerList[1] + ", " + playerList[2];
  document.getElementById("stats-rndplayer").innerHTML = "Round player: " + currentPlayer
  document.getElementById("stats-roll").innerHTML = "This roll: " + rollScore
  document.getElementById("stats-round").innerHTML = "This round: " + roundScore
  document.getElementById("stats-total").innerHTML = "Player total: " +   player1.totalPts
}


function pigSelected(pig) {
  switch (selectedPigs.length) {
    case 0:
      pig.setState("single")                                    // change to single state
      shiftArray(pig.name, unselectedPigs, selectedPigs)        // move this pig to selected array; remove from unselected array 
      rollScore = rollScore + pig.value                         // add to score
      break;
    case 1:
        switch (pig.state) {
          case "unselected":
            pig.setState("single")                              // change to single
            shiftArray(pig.name, unselectedPigs, selectedPigs)  // add to selected array; remove from unslected array
            rollScore = rollScore + pig.value                   // add value to score 
            pigIsDisabled(true)                                 // disable all in unselected
            confirmIsDisabled(false)                            // enable confirm
            break;
          case "single":
            pig.setState("double")                              // change to double state
            rollScore = rollScore + pig.value                   // add to score
            shiftArray(pig.name, unselectedPigs, selectedPigs)  // add to selected array; remove from unslected array
            pigIsDisabled(true)                                 // disable all unselected
            confirmIsDisabled(false)                            // enable confirm
            break;
          case "double":
            pig.setState("unselected")                          // change to unselected
            rollScore = rollScore - (pig.value * 2)             // remove double points from score
            shiftArray(pig.name, selectedPigs, unselectedPigs)  // remove from Selected array; add to Unselected array;
            pigIsDisabled(false)                                // enable all unselected
            confirmIsDisabled(true)                             // disable confirm
            break;
          default:
            break;
        }
      break;
    case 2:
      pig.setState("unselected")                                // change to unselected
      shiftArray(pig.name, selectedPigs, unselectedPigs)        // remove from Selected array; add to Unselected array;
      rollScore = rollScore - pig.value                         // remove value from score
      pigIsDisabled(false)                                      // enable all unselected
      confirmIsDisabled(true)                                   // disable confirm
      break;
    default:
      console.log("default");
      break;
  }
  displayStats()
}

function shiftArray(pig, fromArray, toArray) {
  let index = fromArray.indexOf(pig)              // find pig name in array
  if (index > -1) {                               // if found run code
    fromArray.splice(index, 1)                    // remove pig from index
    toArray.push(pig)                             // add pig to array 
  }  else {                                       // if not found, don't do anything                 
  }
} 

function confirmIsDisabled(bool) {
  confirmBtn.disabled = bool
  // if true change text to "Confirm.." otherwise text = "Choose pigs"
  bool ? confirmBtn.innerText = "Choose pigs": confirmBtn.innerText = "Confirm roll for " + rollScore + " points?"
}


function pigIsDisabled(bool) {
  for (let i = 0; i < unselectedPigs.length; i++) {
    document.getElementById(unselectedPigs[i]).disabled = bool
  }
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


// for each pig in unselected change it's state to unselected and enabled

function bank() {
  // roundScore = 0
  // rollScore = 0
  // displayStats()
  newRound()
}

newGame()



// complicated point system

// single Leaning Jowler:   15 pts
// single Trotter:          5 pts
// single Razorback:        5 pts
// single Snouter:          10 pts
// single Sider:            1 pt (in combination with another non-sider? not sure about this)
// double Leaning Jowler:   60 pts
// double Trotter:          20 pts
// double Razorback:        20 pts
// double double Snouter:   40 pts
// double Sider:            1 pts (two pigs both with a dot up, or both with no dot up)
// PigOut:                  Lose all points from this round (two pigs one with dot up other with dot down)
// Oinker:                  Lose all game points (two pigs touching)
// Piggy Back:              Out of game (pigs stacked on top each other)

