let colors = ['is-info', 'is-success', 'is-warning', 'is-danger', 'is-link'];
let str_arr = ['j', 'f', 'k', 'd', ' '];

let begin = document.querySelector(".begin"); 
let progress = document.getElementById("prog"); 
let buttons = document.querySelector('.buttons'); 

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}

function drawBoard() {
   for (let index = 0; index < 20; index++) { 
      let rand = getRandomInt(colors.length); 
      buttons.insertAdjacentHTML("afterbegin",
         `<button class='game-buttons button is-large 
      ${colors[rand]}' id='${str_arr[rand]}'>${str_arr[rand]}			
      </button>`);
   }
}

document.addEventListener('keydown', StartGame, {
   once: true
});

function StartGame(e) {
   if (e.key == "Enter") {
      drawBoard();
      begin.style.display = "none"; 
      mainGame();
   }
}

function mainGame() {
   document.addEventListener('keyup', press); 
}

var count_right = 0;
var errors_count = 0;
function press(e) {
   let elements_arr = document.querySelectorAll(".game-buttons"); 
   if (e.key == elements_arr[0].id) { 
      elements_arr[0].remove();
      count_right++; 
   } else {
      errors_count++; 
      progress.value = errors_count;
      if (errors_count > 20) {
         let fail = confirm("Game over! Хотите еще раз поиграть?");
         if (fail) {
            document.location.reload(); 
         } else { 
            document.addEventListener('keyup', press);
         }
      }
   }
   if (count_right == 20) {
      alert("Вы выиграли!");
      let win = confirm("Хотите поиграть еще?");
      if (win) {
         drawBoard();
         begin.style.display = "none"; 
         mainGame(); 
      }
   }
}