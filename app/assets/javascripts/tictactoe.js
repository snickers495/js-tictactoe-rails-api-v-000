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
    resetBoard()
  } else if (state.every(ele => ele !== "")) {
    setMessage("Tie game.")
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
  squares.forEach(ele => ele.addEventListener('click', doTurn(ele), false))
}
// $(function(){
//   $("#save").on("click", function(){
//     $.post("/games", function(game){
//
//     })
//   })
// })

// $(".js-more").on("click", function() {
//       var id = $(this).data("id");
//       $.get("/products/" + id + ".json", function(product) {
//           var inventoryText = "<strong>Available</strong>";
//           if(product.inventory <= 0){
//             inventoryText = "<strong>Sold Out</strong>";
//           }
//           var descriptionText = "<p>" + product.description + "</p><p>" + inventoryText + "</p>";
//           $("#product-" + id).html(descriptionText);
//     });
//   });
