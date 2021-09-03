let counter = 0; 
let form = document.getElementById("form");

let playerList = [];

function addInput() {
  counter++
  let input = document.createElement("input")
  input.placeholder = "Player name"
  input.id = "playerInput" + counter
  input.className = "player-input"
  input.addEventListener("keydown", (event) => {           // when a keyDown event is detected
  if (event.key == 'Enter') {                              // and IF that key is 'Enter'
      event.preventDefault();                              // prevent default page reload
      addInput()                                           // run addInput again to add an input below
  }
});
  form.appendChild(input)
  input.focus();
  document.getElementById("start").disabled = false
}

function startGame() {
  let list = form.children
  for (let i = 0; i < list.length; i++) {
    let input = document.getElementById(list[i].id).value
    playerList.push(input)
  }
}

function go() {
  let params = new URLSearchParams();
  params.append("playerList", JSON.stringify(playerList))
  let url = "game.html?" + params.toString();
  location.replace(url)
}
