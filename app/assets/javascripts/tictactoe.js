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
console.log(turn)
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
  $(ele).text(player());
}

function setMessage(message){
  $('#message').text(message)
}

function checkWinner(){
  let winner = ""
  let state = $("td").map(function() {
    return $(this).html()
  }).toArray();
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
  if (checkWinner()) {
    saveGame()
    resetBoard()
  } else if (turn === 9) {
    setMessage("Tie game.")
    saveGame()
    resetBoard()
  } else {
    turn ++
  }
}

function resetBoard(){
  $('td').empty()
  turn = 0
  gameId=0
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
    previous.data.forEach(ele => {
      $('#games').append(`<button id="gameid-${ele.id}">${ele.id}</button><br>`)
      $(`#gameid-${ele.id}`).on('click', reload(ele.id))
    })
    }
  })
}

function reload(id) {
  $.get(`/games/${id}`, (savedGame) => {
    // if (savedGame.data.attributes) {
      const board = savedGame.data.attributes.state
      $("td").text(function(index) {
            return board[index];
          });
      gameId = id;
      turn = board.join('').length
    // }
  })
}

function saveGame(){
  const stateData = $("td").map(function() {
    return $(this).html()
+  }).toArray();
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

function resetBoard(){
  $('td').empty()
  turn = 0;
  gameId = 0;
}
