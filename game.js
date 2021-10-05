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
let tempRoundScore = 0;
let currentPlayer;
let tempPlayerScore = 0;
let selectedPigs = [];
let unselectedPigs = [];
let confirmBtn = document.getElementById("roll-done")
let instructions;
let playerList = [];


let card1 = new Pig("sider", "sider-single.jpg", 1, "unselected")
let card2 = new Pig("razorback", "razorback-single.jpg", 5, "unselected")
let card3 = new Pig("trotter", "trotter-single.jpg", 5, "unselected")
let card4 = new Pig("snouter", "snouter-single.jpg", 10, "unselected")
let card5 = new Pig("leaning", "leaning-single.jpg", 15, "unselected")
let card6 = new Pig("pigout", "pigout-single.jpg", 0, "unselected")
let card7 = new Pig("oinker", "oinker-single.jpg", 0, "unselected")

let cards = [card1, card2, card3, card4, card5, card6, card7]


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

function pigSelected(card) {
  switch (selectedPigs.length) {
    case 0:                                                   // if no other selected
      card.setState("single")                                     //switchState to single
      shiftArray(card.name, unselectedPigs, selectedPigs)         //shift to selected
      rollScore = rollScore + card.value                          //add value to rollScore 
      enableDisableByID("oinker", true)                                 //disable oinker
      enableDisableByID("pigout", true)                                 //disable pigout
      document.getElementById("confirmRoll").innerHTML = "Select Another Pig!"
      console.log(card.name + " single selection for " + rollScore + "pts" );
      break;
    case 1:                                                   // if one is already selected
        switch (card.state) {
          case "unselected":                                      //different card as already selected
            card.setState("single")                                 //switchState to single
            shiftArray(card.name, unselectedPigs, selectedPigs)     //shift from unselected to selected array
            rollScore = rollScore + card.value                      //add to rollScore 
            enableDisableArray(unselectedPigs, true)                //disable all unselected
            enableDisableByID("confirmRoll", false)
            document.getElementById("confirmRoll").innerHTML = "Confirm roll: " + rollScore + "pts"
            console.log(card.name + " second selection for " + rollScore + "pts" );
            break;
          case "single":                                          //same card as already selected
          card.setState("double")                                   //switchState to double
            //add to selected                                       //not needed (already in selected)
            //remove from unselected                                //not needed (already in selected)
            enableDisableArray(unselectedPigs, true)                //disable all unselected
            rollScore = rollScore + (card.value * 3)                //add to rollScore * 4
            enableDisableByID("confirmRoll", false)                 //enable confirm
            enableDisableByID("confirmRoll", false)
            document.getElementById("confirmRoll").innerHTML = "Confirm roll: " + rollScore + "pts"
            console.log(card.name + " is selected twice for " + rollScore + "pts");
            break;
          case "double":
            card.setState("unselected")                                   //switchState to unselected
            shiftArray(card.name, selectedPigs, unselectedPigs)           //shift from selected array to unselected array
            enableDisableArray(unselectedPigs, false)                     //disable all unselected
            rollScore = rollScore - (card.value * 4)                      //subtract rollScore * 4
            enableDisableByID("oinker", false)                             //enable oinker
            enableDisableByID("confirmRoll", true)                        //disable confirm
            console.log(card.name + " has reset score to: " + rollScore + "pts");
            break;
          default: 
            break;
        }
      break;
    case 2:                                                       //same card already in double; otherwise it would be disabled
      card.setState("unselected")                                   //switchState to unselected
      shiftArray(card.name, selectedPigs, unselectedPigs)           //shift from selected array to unselected array
      enableDisableArray(unselectedPigs, false)                     //disable all unselected
      rollScore = rollScore - card.value                      //subtract rollScore * 4
      enableDisableByID("confirmRoll", true)                        //disable confirm
      console.log(card.name + " has resetZ score to: " + rollScore + "pts");

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
      console.log(selectedPigs);
      break;
    case "single":
      card.setState("unselected")                                   //switchState to unselected
      shiftArray(card.name, selectedPigs, unselectedPigs)           //remove from selected
      enableDisableArray(unselectedPigs, false)                     //enable all unselected
      enableDisableByID("oinker", false)                            //disable oinker
      enableDisableByID("confirmRoll", true)                        //enable confirm
      document.getElementById("confirmRoll").innerHTML = "Done"
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
      console.log(selectedPigs);
      console.log(unselectedPigs);
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
 * @param array unselected or selected
 * @param bool true=disabled, false=enabled
 */

function enableDisableArray(array, bool) {
  for (let i = 0; i < array.length; i++) {
    document.getElementById(array[i]).disabled = bool
  }
}

/**
 * Enable or disable an element by ID
 * @param id the elements ID
 * @param bool true=disabled, false=enabled
 */

function enableDisableByID(id, bool) {
    document.getElementById(id).disabled = bool
}

function confirmRoll() {
  switch (selectedPigs[0]) {
      case "pigout":
      console.log("back to zero; next turn");
      roundScore = 0
      enableDisableByID('bank', true)
      moveToNextPlayer()
      newRoll()
      break;
      case "oinker":
      console.log("you lose all points; next turn");
      currentPlayer.totalPts = 0
      roundScore = 0
      enableDisableByID('bank', true)
      moveToNextPlayer()
      newRoll()
      break;
  
    default:
        roundScore = roundScore + rollScore
        enableDisableByID('bank', false)
        newRoll()
      break;
  }
  displayStats()

  console.log(selectedPigs[0] + " roll confirmed");
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