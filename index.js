

//all shit start again
const gameController = (function() {
  const gameboardArray = []; // contains ID of square and contents ('empty', X, O)
  let xNext = undefined;

  const gridSquareFactory = (id, contents) => {
    const arrayItem = { id, contents };
    gameboardArray.push(arrayItem);
    return arrayItem;
  };

  // initialise gameboard
  for (let i = 0; i < 9; i += 1) {
    const gridContainer = document.getElementById('gridContainer');
    const gridSquare = document.createElement('div');
    gridSquare.className = 'gridSquare';
    gridSquare.id = (`gridSquare-${i}`);
    gridContainer.appendChild(gridSquare);
    gridSquareFactory(i, 'empty');
  }

  //creates player objects with a name and a marker X/O
  const PlayerFactory = (playerName, marker) => ({ playerName, marker });

  const playerOne = PlayerFactory('One', 'X');
  const playerTwo = PlayerFactory('Two', 'O');

  
  const currentPlayer = () => {
    return (xNext === true) ? playerOne : playerTwo;
  };

  const playMove = (id) => {
    const currentPlayerObject = currentPlayer();
    const square = gameboardArray.find(item => item.id === id);
    if (square.contents !== 'empty') {
      return; // if square is not empty, do nothing
    }
    square.contents = currentPlayerObject.marker;
    const gridSquare = document.getElementById(`gridSquare-${id}`);
    gridSquare.textContent = square.contents;
    xNext = !xNext;
  };

  const nextMarker = () => {
    if ((xNext === false) || (xNext === undefined)) {
      xNext = true;
    } else {
      xNext = false;
    }
  };
  
  return {
    nextMarker,
    currentPlayer,
    playMove
  };
})();



document.querySelectorAll('.gridSquare').forEach((square, index) => {
  square.addEventListener('click', () => {
    gameController.playMove(index);
  });
});
