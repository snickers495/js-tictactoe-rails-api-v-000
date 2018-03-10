// Code your JavaScript / jQuery solution here
var turn = 0
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

function setMessage(){
  
}

function checkWinner(){

}

function doTurn(){

}

function attachListeners(){

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
