const gameboardArray = []; // contains ID of square and contents ('empty', X, O)

const gridSquareFactory = (id, contents) => {
  const arrayItem = { id, contents };
  gameboardArray.push(arrayItem);
  return gameboardArray;
};

//  gameboard function
(function () {
  for (let i = 0; i < 9; i += 1) {
    const gridContainer = document.getElementById('gridContainer');
    const gridSquare = document.createElement('div');
    gridSquare.className = 'gridSquare';
    gridSquare.id = (`gridSquare-${i}`);
    gridContainer.appendChild(gridSquare);
    gridSquareFactory(i, 'empty');
  }
}());

console.log(gameboardArray);

const PlayerFactory = (playerName, marker) => ({ playerName, marker });

const playerOne = PlayerFactory('One', 'X');
const playerTwo = PlayerFactory('Two', 'O');

console.log(playerOne, playerTwo);


//gamecontroller MODULE
//define next marker to use (turn)
//check for win/draw
//track total game score
//
