// 1. The first line of code creates a variable called previous and assigns it the value of the HTML element with the id of previous-button.
// 2. The second line of code creates a variable called next and assigns it the value of the HTML element with the id of next-button.
// 3. The third line of code creates a variable called reset and assigns it the value of the HTML element with the id of reset-button.
// 4. The fourth line of code creates a variable called movements and assigns it an empty array.
// 5. The fifth line of code creates a variable called movement and assigns it an empty array.
// 6. The sixth line of code creates a variable called maxNumClicked and assigns it the value of 0.
// 7. The seventh line of code creates a variable called movements and assigns it an empty array.
// 8. The eighth line of code creates a variable called movement and assigns it an empty array.
// 9. The ninth line of code creates a variable called maxNumClicked and assigns it the value of 0.


const previous = document.getElementById("previous-button");
const next = document.getElementById("next-button");
const reset = document.getElementById("reset-button");

var movements = [];
var movement = [];
let maxNumClicked = 0;

document.querySelector(`.board`).addEventListener(`click`, function(){
  let boxes = document.querySelectorAll(`.cell`)
  let firstLayer = []
  let secondLayer = []
  let thirdLayer = []
  let mark = "";


  boxes.forEach((box, i) => {
    if (box.classList.contains("fire")) {
      mark = "x";
    } else if (box.classList.contains("ice")) {
      mark = "o";
    } else {
      mark = "";
    }
      
      if (i <= 2) {
      firstLayer.push(mark);
    } else if (i > 2 && i < 6) {
      secondLayer.push(mark);
    } else {
      thirdLayer.push(mark);
    }
  });

  movement = [[...firstLayer], [...secondLayer], [...thirdLayer]]
  movements.push(movement)


  numberMoves = [movements.length - 1];

  maxNumClicked++;
})

reset.addEventListener("click", () => {
    location.reload();
})



previous.addEventListener("click", () => {
    
    numberMoves -= 1;
    updateBoardOnClick();

    if (numberMoves < 1) {
      previous.disabled = true;
    }
    
});

next.addEventListener("click", () => {

    numberMoves += 1;
    updateBoardOnClick();
   
    if (numberMoves === maxNumClicked - 1) {
      next.disabled = true; 
    }

});
/* --PREVIOUS MOVE END-- */
  

/* --NEXT MOVE END-- */
  
/* --updateBoard function for previous & next move buttons-- */
const updateBoardOnClick = () => {
    board.innerHTML = "";

// 1. Create a new <div> element.
// 2. Add the class "cell" to the <div> element.
// 3. If the value of the current cell is "x", add the class "fire" to the <div> element.
// 4. If the value of the current cell is "o", add the class "ice" to the <div> element.

    for (let i = 0; i < movements[numberMoves].length; i++) {
      for (let j = 0; j < movements[numberMoves][i].length; j++) {
        let div = document.createElement("div");

        div.classList.add("cell");
  
        if (movements[numberMoves][i][j] === "x") {
          div.classList.add("fire");
        } else if (movements[numberMoves][i][j] === "o") {
          div.classList.add("ice");
        }
        board.append(div);
      }
    }
};
