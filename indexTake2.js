

//generates a 3x3 "2d/jagged array" each with a value of " "



const gameBoard = (() => {

    boardArray = [];
    let rows = 3;
    let columns = 3;

    const setBoard = () => {
        for (let i = 0; i < rows; i+=1) {
        boardArray[i] = [];
        for (let j = 0; j < columns; j+=1) {
            boardArray[i][j] = ' ';
        }};
        return boardArray;
    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i+=1) {
            for (let j = 0; j < columns; j+=1) {
                boardArray[i][j] = ' ';
            }};
        return boardArray;
    }

    const setBoardVal = (a, b, marker) => {
        boardArray[a][b] = marker;
        return boardArray;
    }

    setBoard();
    return { setBoard, resetBoard, setBoardVal, boardArray }
})();


//displaycontroller
//1. display the grid squares as HTML elements, give them unique ID

const displayController = (() => {
    const gridContainer = document.getElementById('gridContainer');

    const displayBoard = () => {
        for (let row = 0; row < boardArray.length; row++) {
			for (let col = 0; col < boardArray[row].length; col++) {
				// Create a new cell element for this position on the board
				let gridSquare = document.createElement('button');
                gridSquare.innerText = boardArray[row][col];
				gridSquare.className = 'gridSquare';
				gridSquare.id = 'gridSquare-' + row + '-' + col;

				// Add the cell to the container element
				gridContainer.appendChild(gridSquare);
			}
		}

    }

    const updateBoard = () => {
        gridContainer.replaceChildren();
        displayBoard();
    }

    displayBoard();


  //  gridContainer.addEventListener ('click', ) {
        //fix syntax of this..
        //and make it put an X in any box that is clicked , logic later
        //MUST USE THE ARRAY
  //  }
    
    return { displayBoard, updateBoard };
})();



//gameController
//click event listener, add X or O
//will also need to track whos turn..





