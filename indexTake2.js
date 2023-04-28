//gameboard function sets the board and board array and contains a reset board and set board value function
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
				let gridSquare = document.createElement('button');
                gridSquare.innerText = boardArray[row][col];
				gridSquare.className = 'gridSquare';
				gridSquare.id = 'gridSquare-' + row + '-' + col;
				gridContainer.appendChild(gridSquare);
			}}
    }
    const updateBoard = () => {
        gridContainer.replaceChildren();
        displayBoard();
    }

    const endGamePopup = () => {
        const endPopup =  document.getElementById('endPopup');
        endPopup.style.display = 'flex'
        endPopup.addEventListener('click', (e) => {
            if (e.target.className === 'playAgainButton') {
                endPopup.style.display = 'none';
                gameBoard.resetBoard();
                displayController.updateBoard();
            }
        })}
    
    displayBoard();
    return { displayBoard, updateBoard, endGamePopup };
})();

//gamecontroller
//turncounter sets marker to X or O each turn, called by click event listener

const gameController = (() => {
    let marker = 'X'
    let turnCount = 0;

    const turnCounter = () => {
        if (marker === 'X') {
            marker = 'O';
            turnCount +=1;
            console.log(turnCount);
            return marker, turnCount;
        }
        else {
            marker = 'X';
            turnCount +=1;
            console.log(turnCount);
            return marker, turnCount;
        }
    }

    const resetTurnCounter = () => {
        turnCount = 0;
        return turnCount;
    }

//click event listener collects the clicked button ID, updates the array, updates board display
//checks for winner then calls turncounter

    gridContainer.addEventListener('click', (e) => {
        
        
        if (e.target && e.target.id.startsWith('gridSquare-')) {
            let row = e.target.id.slice(11, 12);
            let col = e.target.id.slice(13, 14);

            if ((boardArray[row][col]) !== (' ')) {
                return;
            } else {     
            boardArray[row][col] = marker;
            displayController.updateBoard();
            turnCounter();

            if (checkWinner(boardArray, marker)) {
                endGame();
            } ;
            if ((!checkWinner(boardArray, marker)) && (turnCount === 9)){
                console.log('it works');
            };

            }
        }
    });

    //checkwinner function loops through array by row and column and checks for a total of 3 same marker
    //in either row or column using a counter for each
    //diagcount is a lazy check using a counter and checking per row

    const checkWinner = (boardArray, marker) => {
            for (let i = 0; i < boardArray.length; i+=1) {
                let rowCount = 0;
                let colCount = 0;
                for (let j = 0; j < boardArray.length; j+=1) {
                    if (boardArray[i][j] === marker) rowCount +=1;
                    if (boardArray[j][i] === marker) colCount +=1;
                }
                if (rowCount === boardArray.length || colCount === boardArray.length) return true;
                rowCount = 0;
                colCount = 0;
            };
            if (boardArray[0][0] === marker 
            && boardArray[1][1] === marker
            && boardArray[2][2] === marker) {
                return true;
            }
            if (boardArray[0][2] === marker 
                && boardArray[1][1] === marker
                && boardArray[2][0] === marker) {
                return true;
                }
    }


    const endGame = () => {
        const winnerTextHolder = document.getElementById('winnerText');
        winnerTextHolder.replaceChildren();
        winnerText = document.createElement('p');
        winnerText.innerText = `${marker} is the winner!`;
        winnerTextHolder.appendChild(winnerText);    
        displayController.endGamePopup();
        resetTurnCounter();
    }
})();


