
// -- HTML elements --
/*
1. It creates a variable called board and assigns it the value of the HTML element with the id of board.
2. It creates a variable called cells and assigns it the value of all the HTML elements with the data-cell attribute.
3. It creates a variable called currentStatus and assigns it the value of the HTML element with the id of currentStatus.
4. It creates a variable called resetButton and assigns it the value of the HTML element with the id of resetButton.


5. It creates a variable called gameEndOverlay and assigns it the value of the HTML element with the id of gameEndOverlay.


6. It creates a variable called currentBeastStatusImg and assigns it the value of the HTML element with the id of currentBeastImg.
7. It creates a variable called winningMessage and assigns it the value of the HTML element with the id of winningMessage.
8. It creates a variable called winningMessageText and assigns it the value of the HTML element with the id of winningMessage and the child element with the tag name of p.
9. It creates a variable called winningMessageImg and assigns it the value of a new image element.
*/
const board = document.getElementById( 'board' );
const cells = document.querySelectorAll( '[data-cell]' );
const currentStatus = document.getElementById( 'currentStatus' );
const resetButton = document.getElementById( 'resetButton' );
const checkButton = document.getElementById('checkButton');
const gameEndOverlay = document.getElementById( 'gameEndOverlay' );
const currentBeastStatusImg = document.getElementById( 'currentBeastImg' );
const winningMessage = document.querySelector( '[data-winning-message]' );
const winningMessageText = document.querySelector( '[data-winning-message] p' );
const winningMessageImg = document.createElement( 'img' );
const drawImg = document.querySelector('.draw-img');

// -- Game Variables --
let gameIsLive = true;

let fireTurn = true;

let winner = null;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// -- Functions --

/*
1. First, we’re removing the fire and ice classes from the board.
2. Then, we’re checking if the fireTurn variable is true. If it is, we’re adding the fire class to the board. If it’s false, we’re adding the ice class to the board.
3. Finally, we’re setting the board’s hover class to the appropriate class.
*/
const setBoardHoverClass = () => {
  board.classList.remove( 'fire' );
  board.classList.remove( 'ice' );

  if ( fireTurn ) {
    board.classList.add( 'fire' );
  } else {
    board.classList.add( 'ice' );
  }
}

/*
1. It’s creating a function called placeBeastImg.
2. It’s creating a variable called cell and setting it equal to the current cell.
3. It’s creating a variable called currentBeast and setting it equal to the currentBeast.
4. It’s adding the currentBeast class to the cell.
*/
const placeBeastImg = ( cell, currentBeast ) => {
  cell.classList.add( currentBeast );
}



const swapTurns = () => {
  fireTurn = !fireTurn;
}

/*
1. First, we’re checking if the fireTurn variable is true or false.
2. If fireTurn is true, then we’re setting the currentBeastStatusImg to the fire dragon image.
3. If fireTurn is false, then we’re setting the currentBeastStatusImg to the ice dragon image.
4. Lastly, we’re setting the alt attribute of the currentBeastStatusImg to either fire or ice.
*/
const updateCurrentStatus = () => {
  if ( fireTurn ) {
    currentBeastStatusImg.src = './SVG/game of thrones, game, thrones, series, character, avatar, dragon.svg';
    currentBeastStatusImg.alt = 'fire';
  } else {
    currentBeastStatusImg.src = './SVG/game of thrones, game, thrones, series, character, avatar, ice, dragon.svg';
    currentBeastStatusImg.alt = 'ice';
  }
}








/*
It checks if the currentBeast is in the winningCombinations array.
*/
const checkWin = ( currentBeast ) => {
  return winningCombinations.some( combination => {
    return combination.every( i => {
      return cells[i].classList.contains( currentBeast );
    })
  });
}

/*
1. We’re creating a function called isDraw that returns true if every cell in the cells array contains either the fire or ice class.
2. We’re using the every method to check if every cell in the cells array contains either the fire or ice class.
3. We’re using the classList property to check if the cell contains either the fire or ice class.
4. We’re using the contains method to check if the cell contains either the fire or ice class.
*/
const isDraw = () => {
  return [...cells].every( cell => {
    return cell.classList.contains( 'fire' ) || cell.classList.contains( 'ice');
  })
}


/*
1. First, we remove the winning message image from the DOM.
2. Then, we remove the fire and ice classes from all the cells.
3. Then, we remove the click event listener from all the cells.
4. Then, we add a click event listener to all the cells.
5. Finally, we set the board hover class.
*/
const startGame = () => {
  cells.forEach( cell => {
    winningMessageImg.remove();
    cell.classList.remove( 'fire' );
    cell.classList.remove( 'ice' );
    cell.addEventListener( 'click', handleCellClick, { once: true });
  });


  setBoardHoverClass();
  gameEndOverlay.classList.remove( 'show' );
}

/*
It creates a function that will be called when the game is over.
*/
// 1. We’re creating a function called endGame that takes a boolean parameter called draw.
// 2. If the draw parameter is true, we’re setting the winningMessageText innerText to “draw!”.
// 3. If the draw parameter is false, we’re setting the winningMessageImg src to a URL that contains an image of a dragon.
// 4. We’re setting the winningMessageImg alt to the value of the fireTurn variable.
// 5. We’re inserting the winningMessageImg element before the winningMessageText element.
// 6. We’re setting the winningMessageText innerText to “wins ! ! !”.
// 7. We’re adding the show class to the gameEndOverlay element.
const endGame = ( draw ) => {
  if ( draw ) {
    drawImg.classList.remove('hide');
    winningMessageText.innerText = `"when you play the game of thrones, you win or you die."`;
  } else {
    winningMessageImg.src = fireTurn ? './SVG/game of thrones, game, thrones, series, character, avatar, dragon.svg' : './SVG/game of thrones, game, thrones, series, character, avatar, ice, dragon.svg';
    winningMessageImg.alt = fireTurn ? 'fire' : 'ice';
    winningMessage.insertBefore( winningMessageImg, winningMessageText );
    winningMessageText.innerText = fireTurn ? `"the long night is coming and the dead with it"`: `"The night is dark and full of terrors"`;
  }

  gameEndOverlay.classList.add( 'show' );
}


// -- Event Handler --
/*
It starts the game.
*/
/*
1. We’re using the `handleCellClick` function to handle the click event on the board.
2. We’re using the `placeBeastImg` function to place the beast image in the cell.
3. We’re using the `checkWin` function to check if the game is over.
4. We’re using the `swapTurns` function to swap the turns.
5. We’re using the `updateCurrentStatus` function to update the current status.
6. We’re using the `setBoardHoverClass` function to set the hover class on the board.
*/
const handleCellClick = ( e ) => {
  const cell = e.target;
  const currentBeast = fireTurn ? 'fire' : 'ice';

  placeBeastImg( cell, currentBeast );
  if ( checkWin( currentBeast )) {
    endGame( false );
  } else if ( isDraw() ) {
    endGame( true );
  } else {
    swapTurns();
    updateCurrentStatus();
    setBoardHoverClass();
  }
}

// -- Event Listener --
resetButton.addEventListener( 'click', () => {
    startGame();
    previous.classList.add( 'hide' );
    next.classList.add( 'hide' );
});
checkButton.addEventListener( "click", () => {
    gameEndOverlay.classList.remove( 'show' );
    previous.classList.remove( 'hide' );
    next.classList.remove( 'hide' );
});

// -- Start Game --
startGame();






