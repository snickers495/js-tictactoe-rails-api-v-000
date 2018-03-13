// Code your JavaScript / jQuery solution here
var turn = 0
winCombinations = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];
const squares = window.document.querySelectorAll('td');
const messageDiv = window.document.getElementById('message');
const gamesDiv = window.document.getElementById('games');
const saveButton = window.document.getElementById('save');
const previousButton = window.document.getElementById('previous');
const clearButton = window.document.getElementById('clear');
var gameId = 0;
$(document).ready(function(){
  attachListeners()
})
function player(){
  if (turn % 2 === 0) {
    return "X"
  } else {
    return "O"
  }
}

function updateState(ele){
  const token = player()
  ele.innerHTML = token
}

function setMessage(message){
  messageDiv.innerHTML = message
  return message
}

function checkWinner(){
  let state = []
  let winner = ""
  squares.forEach(ele => state.push(ele.innerHTML))
  const won = winCombinations.some(ele => {
    if (state[ele[0]] !== "" && state[ele[1]] === state[ele[0]] && state[ele[1]] === state[ele[2]]) {
      winner = state[ele[0]]
      return true
    }
  })
  if (won) {
    let message = `Player ${winner} Won!`
    setMessage(message)
    return true
  } else {
    return false
  }
}

function doTurn(ele){
  updateState(ele)
  let state = []
  squares.forEach(ele => state.push(ele.innerHTML))
  if (checkWinner()) {
    saveGame()
    resetBoard()
  } else if (state.every(ele => ele !== "")) {
    setMessage("Tie game.")
    saveGame()
    resetBoard()
  } else {
    turn ++
  }
}

function resetBoard(){
  squares.forEach(ele => ele.innerHTML = "")
  turn = 0
}

function attachListeners(){
  $('td').on('click', function() {
   if (!$.text(this) && !checkWinner()) {
     doTurn(this);
    }
  });

  $('#save').on('click', () => saveGame());
  $('#previous').on('click', () => showPreviousGames());
  $('#clear').on('click', () => resetBoard());
}

function showPreviousGames(){
  $('#games').empty();
  $.get('/games', function(previous){
  if (previous.data.length > 0) {
    previous.data.forEach(ele => addButton(ele))
    }
  })
}

function saveGame(){
  let state = []
  squares.forEach(ele => state.push(ele.innerHTML))
  if (gameId > 0) {
    $.ajax({
    type: 'PATCH',
    url: `/games/${gameId}`,
    data: state})
  } else {
    $.post('/games', state, function(game){
      gameId = game.data.id
    })
  }
}

function addButton(game) {
  $('#games').append(`<button id="gameid-${game.id}">${game.id}</button><br>`)
  $(`#gameid-${game.id}`).on('click', reload(game.id))
}

function reload(id) {
  messageDiv.innerHTML = ""
  $.get(`/games/${id}`, (savedGame) => {
    // for (var i =0; i < savedGame.data.length; i++) {
      // let state = JSON.parse(savedGame).data;
    // }
    const board = savedGame.data.attributes.state
    for (var i =0; i < 9; i++) {
      squares[i].innerHTML = board[i]
    }
    gameId = id;
    turn = board.join('').length
  })

}

function resetBoard(){
  squares.forEach(ele => ele.innerHTML = "")
  turn = 0;
  gameId = 0;
}
