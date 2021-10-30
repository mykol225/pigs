/** PIG & PLAYER CLASSES **/

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


/** GLOBAL VARIABLES **/

let round;
let rollScore;
let roundScore;
let tempRoundScore = 0;
let currentPlayer;
let tempPlayerScore = 0;
let selectedPigs = [];
let unselectedPigs = [];
let confirmBtn = document.getElementById("roll-done")
let instructions;
let playerList = [];


let card1 = new Pig("sider", "sider-single.jpg", 0.25, "unselected")
let card2 = new Pig("razorback", "razorback-single.jpg", 5, "unselected")
let card3 = new Pig("trotter", "trotter-single.jpg", 5, "unselected")
let card4 = new Pig("snouter", "snouter-single.jpg", 10, "unselected")
let card5 = new Pig("leaning", "leaning-single.jpg", 15, "unselected")
let card6 = new Pig("pigout", "pigout-single.jpg", 0, "unselected")
let card7 = new Pig("oinker", "oinker-single.jpg", 0, "unselected")

let cards = [card1, card2, card3, card4, card5, card6, card7]


/** ADD PLAYER CONNECTION **/

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
  enableDisableByID("confirmRoll", true)
  let params = new URLSearchParams(window.location.search)  // create an instance of the parameters
  let players = JSON.parse(params.get("playerList"))        // find all playerList params and parse the JSON into an array
  addPlayers(...players)                                    // spread the array out as arguments for 
  resetCards()
}

function moveToNextPlayer(){
  if (playerList.indexOf(currentPlayer) < (playerList.length - 1)) {    //if not at end of array 
    let current = playerList.indexOf(currentPlayer)
    current++
    currentPlayer = playerList[current]
    document.getElementById('player_' + (current)).className = "player-card inactive"
    document.getElementById('player_' + (current + 1)).className = "player-card"
    newRound()
    
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
  enableDisableByID("confirmRoll", true)
  newRoll()
}


function newRoll() {
  displayStats()
  rollScore = 0
  sel = []
  enableDisableByID("confirmRoll", true)
  resetCards()
}

function resetCards() {
  selectedPigs = []
  unselectedPigs = [card1.name, card2.name, card3.name, card4.name, card5.name, card6.name, card7.name]
  card1.resetState()
  card2.resetState()
  card3.resetState()
  card4.resetState()
  card5.resetState()
  card6.resetState()
  card7.resetState()
}


function displayStats() {
  document.getElementById("round-num").innerHTML = "Round " + round
  document.getElementById("round-score").innerHTML = roundScore
  document.getElementById("player-name_1").innerHTML = playerList[0].name
                       
  for (let i = 0; i < playerList.length; i++) {
    document.getElementById("player-total_" + (i + 1)).innerHTML = playerList[i].totalPts
    
  }
}

let sel = []

function addPigs(array) {
  let arraySum = array.reduce(( sum,a ) => sum + a, 0)          //adds up each element in array\
  rollScore = Math.floor(arraySum)                                 // sets points to the sum of the array rounded down
}


function pigSelected(card) {
  switch (selectedPigs.length) {
    case 0:                                                   // if no other selected
      card.setState("single")                                     //switchState to single
      shiftArray(card.name, unselectedPigs, selectedPigs)         //shift to selected
      enableDisableByID("oinker", true)                                 //disable oinker
      enableDisableByID("pigout", true)                                 //disable pigout
      sel.push(card.value)
      addPigs(sel)
      document.getElementById("confirmRoll").innerHTML = "Select Another Pig!"
      break;
    case 1:                                                   // if one is already selected
        switch (card.state) {
          case "unselected":                                      //different card as already selected
            card.setState("single")                                 //switchState to single
            shiftArray(card.name, unselectedPigs, selectedPigs)     //shift from unselected to selected array
            enableDisableArray(unselectedPigs, true)                //disable all unselected
            enableDisableByID("confirmRoll", false)
            sel.push(card.value)
            addPigs(sel)
            document.getElementById("confirmRoll").innerHTML = `Confirm: ${rollScore}pts`
            break;
          case "single":                                          //same card as already selected
          card.setState("double")                                   //switchState to double
            enableDisableArray(unselectedPigs, true)                //disable all unselected
            enableDisableByID("confirmRoll", false)                 //enable confirm
            enableDisableByID("confirmRoll", false)
            sel.push(card.value * 3)
            addPigs(sel)
            document.getElementById("confirmRoll").innerHTML = `Confirm: ${rollScore}pts`

            break;
          case "double":
            card.setState("unselected")                                   //switchState to unselected
            shiftArray(card.name, selectedPigs, unselectedPigs)           //shift from selected array to unselected array
            enableDisableArray(unselectedPigs, false)                     //disable all unselected
            enableDisableByID("oinker", false)                             //enable oinker
            enableDisableByID("confirmRoll", true)                        //disable confirm
            sel.push(card.value * -4)
            addPigs(sel)
            document.getElementById("confirmRoll").innerHTML = "Select pigs"
            break;
          default: 
            break;
        }
      break;
    case 2:                                                       //same card already in double; otherwise it would be disabled
      card.setState("unselected")                                   //switchState to unselected
      shiftArray(card.name, selectedPigs, unselectedPigs)           //shift from selected array to unselected array
      enableDisableArray(unselectedPigs, false)                     //disable all unselected
      enableDisableByID("confirmRoll", true)                        //disable confirm
      sel.push(card.value * -1)                                     // need to update confirm roll button to have new rollscore
      document.getElementById("confirmRoll").innerHTML = "Select pigs"
      break;
    default:
      break;

  }
}

function pigOutSelected(card) {
  switch (card.state) {
    case "unselected":
      card.setState("single")                                       //switchState to single
      shiftArray(card.name, unselectedPigs, selectedPigs)           //shift to selected
      enableDisableArray(unselectedPigs, true)                      //disable all unselected
      enableDisableByID("oinker", true)                             //disable oinker
      enableDisableByID("confirmRoll", false)                       //enable confirm
      document.getElementById("confirmRoll").innerHTML = "Confirm: Pig Out?"
      tempRoundScore = 0                                            //set tempRoundScore to 0
      break;
    case "single":
      // console.log(`Card: ${card.name}, Selected: ${selectedPigs}, Unsel: ${unselectedPigs}`);
      card.setState("unselected")                                   //switchState to unselected
      shiftArray(card.name, selectedPigs, unselectedPigs)           //remove from selected
      // console.log(`Card: ${card.name}, Selected: ${selectedPigs}, Unsel: ${unselectedPigs}`);
      enableDisableArray(unselectedPigs, false)                     //enable all unselected
      enableDisableByID("oinker", false)                            //disable oinker
      enableDisableByID("confirmRoll", true)                        //enable confirm
      document.getElementById("confirmRoll").innerHTML = "Select pigs"
      tempRoundScore = 0                                            //set tempRoundScore to roundScore
      break;
    case "double":
      //do nothing
      break;
    default:
      break;
  }
}

function oinkerSelected(card) {
  switch (card.state) {
    case "unselected":
      card.setState("single")                                       //switchState to single
      shiftArray(card.name, unselectedPigs, selectedPigs)           //shift to selected
      enableDisableArray(unselectedPigs, true)                      //disable all unselected
      enableDisableByID("confirmRoll", false)                       //enable confirm
      document.getElementById("confirmRoll").innerHTML = "Confirm: Oinker?"
      tempPlayerScore = 0                                           //set tempPlayerScore to 0
      break;
    case "single":
      card.setState("unselected")                                   //switchState to unselected
      shiftArray(card.name, selectedPigs, unselectedPigs)           //remove from selected
      enableDisableArray(unselectedPigs, false)                     //enable all unselected
      enableDisableByID("confirmRoll", true)                        //disable confirm
      document.getElementById("confirmRoll").innerHTML = "Done"
      tempPlayerScore = tempRoundScore                                //set tempPlayerScore to PlayerScore
      break;
    case "double":
      //do nothing
      break;
    default:
      break;
  }
}


/**
 * Enable or disable an array
 * param array unselected or selected
 * param bool true=disabled, false=enabled
 */

function enableDisableArray(array, bool) {
  for (let i = 0; i < array.length; i++) {
    document.getElementById(array[i]).disabled = bool
  }
}

/**
 * Enable or disable an element by ID
 * param id the elements ID
 * param bool true=disabled, false=enabled
 */

function enableDisableByID(id, bool) {
    document.getElementById(id).disabled = bool
}

function confirmRoll() {
  switch (selectedPigs[0]) {
      case "pigout":
      roundScore = 0
      enableDisableByID('bank', true)
      moveToNextPlayer()
      newRoll()
      break;
      case "oinker":
      currentPlayer.totalPts = 0
      roundScore = 0
      enableDisableByID('bank', true)
      moveToNextPlayer()
      newRoll()
      break;
  
    default:
        document.getElementById("confirmRoll").innerHTML = "Select pigs"
        roundScore = roundScore + rollScore
        enableDisableByID('bank', false)
        newRoll()
      break;
  }
  displayStats()
}

function bank() {
  if (roundScore > 0) {
    currentPlayer.totalPts = currentPlayer.totalPts + roundScore
    enableDisableByID('bank', true)
    moveToNextPlayer()
    newRoll()
    displayStats()
  } else {
    console.log("no points to bank");
  }
}

function shiftArray(pig, fromArray, toArray) {
  let index = fromArray.indexOf(pig)              // find pig name in array
  if (index > -1) {                               // if found run code
    fromArray.splice(index, 1)                    // remove pig from index
    toArray.push(pig)                             // add pig to array 
  }  else {                                       // if not found, don't do anything                 
  }
} 

function closeRules() {
  let modal = document.getElementById('modal')
  let overlay = document.getElementById('overlay')
  modal.classList.remove('isVisible')
  overlay.classList.remove('isVisible')
}

function openRules() {
  let modal = document.getElementById('modal')
  let overlay = document.getElementById('overlay')
  modal.classList.add('isVisible')
  overlay.classList.add('isVisible')
}

newGame()
closeRules()


 /*

RULES

Pig out: lose all turn points; next turn
Sider: 1 point

Trotter: 5 points
Double Trotter: 20 points  (or 4x)

Razorback: 5 points
Double Razorback: 20 points  (or 4x)

Snouter: 10pts
Double snouter: 40pts  (or 4x)

leaning jowler: 15pts
double leaning jowler: 60 points (or 4x)

mixed combo: add single points (unless mixed with sider; then sider is 0)

Oinker (touching pigs): lose all game points; next turn
 */

