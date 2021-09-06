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
        this.image = this.name + "-single.jpg"
        document.getElementById(this.name).className = "pig-btn";
        break;
      case "single":
        this.state = "single";
        this.image = this.name + "-single.jpg"
        document.getElementById(this.name).className = "pig-btn single";
        break;
      case "double":
        this.state = "double"
        this.image = this.name + "-double.jpg"
        document.getElementById(this.name).className = "pig-btn double";
        break;
      case "disabled": 
        this.state = "disabled"
        this.image = this.name + "-single.jpg"
        document.getElementById(this.name).className = "pig-btn";
        document.getElementById(this.name).disabled = true;
        break;
      default:
        console.log("default");
        break;
    }
  }
  resetState() {
    this.state = "unselected"
    this.image = this.name + "-single.jpg"
    document.getElementById(this.name).className = "pig-btn";
    document.getElementById(this.name).disabled = false;
  }
}

class Player {
  constructor(name, totalPts) {
    this.name = name;
    this.totalPts = totalPts;
  }
}


let round;
let rollScore;
let roundScore;
let currentPlayer;
let selectedPigs = [];
let unselectedPigs = [];
let confirmBtn = document.getElementById("roll-done")
let instructions;
let playerList = [];


let card1 = new Pig("razorback", "razorback-single.jpg", 5, "unselected")
let card2 = new Pig("trotter", "trotter-single.jpg", 5, "unselected")
let card3 = new Pig("snouter", "snouter-single.jpg", 10, "unselected")
let card4 = new Pig("leaning", "leaning-single.jpg", 15, "unselected")
let card5 = new Pig("pigout", "pigout-single.jpg", 10, "unselected")
let card6 = new Pig("oinker", "oinker-single.jpg", 10, "unselected")

let cards = [card1, card2, card3, card4, card5, card6]


function addPlayers() {
  for (let i = 0; i < arguments.length; i++) {         // for every argument in addPlayers()
    if (arguments[i] != "") {                          // check if empty
      let player = new Player(arguments[i], 0)         // if not, make a new instance of the Player class
      playerList.push(player)                          // add that instance to the playerList array
    }
  }
  currentPlayer = playerList[0]   
  addPlayerUI()

}

function addPlayerUI() {
  let container = document.getElementById('players')

  for (let i = 0; i < (playerList.length); i++) {

    let plrDiv = document.createElement('div')
    plrDiv.setAttribute('id', 'player_' + (i + 1))
    plrDiv.setAttribute('class', 'player-card inactive')
  
    let plrName = document.createElement('p')
    plrName.setAttribute('id', 'player-name_' + (i + 1))
    plrName.setAttribute('class', 'player-name')
    plrName.innerHTML = playerList[i].name
  
    let plrTtl = document.createElement('p')
    plrTtl.setAttribute('id', 'player-total_' + (i + 1))
    plrTtl.setAttribute('class', 'player-total')
    plrTtl.innerHTML = playerList[i].totalPts
  
  
    plrDiv.appendChild(plrName)
    plrDiv.appendChild(plrTtl)
  
    container.appendChild(plrDiv)
  }
  let current = playerList.indexOf(currentPlayer)
  document.getElementById('player_' + (current + 1)).className = "player-card"
}


function newGame() {
  round = 1
  rollScore = 0
  roundScore = 0
  confirmIsDisabled(true)
  let params = new URLSearchParams(window.location.search)  // create an instance of the parameters
  let players = JSON.parse(params.get("playerList"))        // find all playerList params and parse the JSON into an array
  addPlayers(...players)                                    // spread the array out as arguments for 
  resetCards()
}

// function setPlayer() {
//   (round > 1) ? moveToNextPlayer(): null     // if not on first round call

// }

function moveToNextPlayer(){
  if (playerList.indexOf(currentPlayer) < (playerList.length - 1)) {    //if not at end of array 
    let current = playerList.indexOf(currentPlayer)
    current++
    currentPlayer = playerList[current]
    document.getElementById('player_' + (current)).className = "player-card inactive"
    document.getElementById('player_' + (current + 1)).className = "player-card"
    
  } else {
    currentPlayer = playerList[0]
    document.getElementById('player_' + (playerList.length)).className = "player-card inactive"
    document.getElementById('player_' + (1)).className = "player-card"
    newRound()
  }
  document.getElementById
  displayStats()
}

function newRound() {                       
  round++
  roundScore = 0
  rollScore = 0
  confirmIsDisabled(true)
  newRoll()
}


function newRoll() {
  displayStats()
  rollScore = 0
  confirmIsDisabled(true)
  resetCards()
}

function resetCards() {
  selectedPigs = []
  unselectedPigs = [card1.name, card2.name, card3.name, card4.name, card5.name, card6.name]
  card1.resetState()
  card2.resetState()
  card3.resetState()
  card4.resetState()
  card5.resetState()
  card6.resetState()
}


function displayStats() {
  document.getElementById("round-num").innerHTML = "Round " + round
  document.getElementById("round-score").innerHTML = roundScore
  document.getElementById("player-name_1").innerHTML = playerList[0].name
                       
  for (let i = 0; i < playerList.length; i++) {
    document.getElementById("player-total_" + (i + 1)).innerHTML = playerList[i].totalPts
    
  }
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
  picCalc(20, 30)
}

function picCalc(first, second) {
  // SINGLES
    // leaning jowler: 15
    // snouter: 10
    // trotter: 5
    // razorback: 5
    // sider w dot: 1
    // sider no dot: 1
    // oinker (touching): lose game points

  // COMBOS
    // combination of two different singles: add them up
    // double leaning jowler: 60 (4x)
    // double snouter: 40 (4x)
    // double trotter: 20 (4x)
    // double razorback: 10 
    // double sider w dot: 1
    // double sider no dot: 1
    // double sider alternating dots (PIG OUT): lose round points
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
        roundScore = roundScore + rollScore
        newRoll()
        displayStats()
        document.getElementById('bank').disabled = false
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
  if (roundScore > 0) {
    currentPlayer.totalPts = currentPlayer.totalPts + roundScore
    roundScore = 0    // reset round score
    rollScore = 0     // reset roll score
    document.getElementById('bank').disabled = true
    moveToNextPlayer()
    newRoll()
    displayStats()
  } else {
    console.log("no points to bank");
  }
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
// Piggy Back:              Out of game (pigs stacked on top each other

