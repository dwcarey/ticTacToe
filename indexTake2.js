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
    const updateTurn = () => {
        const turnText = document.getElementById('nextPlayer');
        turnText.innerText = `${currentPlayer.name}'s turn! (${currentPlayer.marker})`
    }


    const endGamePopup = () => {
        const endPopup =  document.getElementById('endPopup');
        const scoreText = document.getElementById('winnerImage');
        endPopup.style.display = 'flex'
        scoreText.innerText = `${player1.name} (${player1.marker}) score is: ${player1.score}
            
        ${player2.name} (${player2.marker}) score is: ${player2.score}`;
        endPopup.addEventListener('click', (e) => {
            if (e.target.className === 'playAgainButton') {
                endPopup.style.display = 'none';
                gameBoard.resetBoard();
                displayController.updateBoard();
            }
        })}
    
    displayBoard();
    return { displayBoard, updateBoard, endGamePopup, updateTurn };
})();

//gamecontroller
//turncounter sets marker to X or O each turn, called by click event listener

let player1 = {
    name: "Player 1",
    marker: "X",
    score: 0
};
let player2 = {
    name: "Player 2",
    marker: "O",
    score: 0
};
let currentPlayer = player1;

const gameController = (() => {
    displayController.updateTurn();
        
        let turnCount = 0;
    
        const turnCounter = () => {
            if (currentPlayer === player1) {
                currentPlayer = player2;
                turnCount += 1;
            } else {
                currentPlayer = player1;
                turnCount += 1;
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
        } 
                        
        boardArray[row][col] = currentPlayer.marker;
        displayController.updateBoard();

        
        if (checkWinner(boardArray, currentPlayer.marker)) {
            endGame(currentPlayer);
            return;
        };
        turnCounter();

        if (turnCount === 9) {
            currentPlayer = null;
            endGame(currentPlayer);
            return;
        };            
    }displayController.updateTurn(); 
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


    const endGame = (winner) => {

        if (winner !== null) {
            const winnerTextHolder = document.getElementById('winnerText');
            const scoreHolder = document.getElementById('scoreHolder');
            currentPlayer.score += 1;
            winnerTextHolder.innerText = `${winner.name} wins!`;
            scoreHolder.innerText = `
            ${player1.name} (${player1.marker}) score is: ${player1.score}
            ${player2.name} (${player2.marker}) score is: ${player2.score}`
            resetTurnCounter();
        } else {
            const winnerTextHolder = document.getElementById('winnerText');
            winnerTextHolder.innerText = "It's a tie!";
            resetTurnCounter();
            currentPlayer = player1;
        }
        displayController.endGamePopup();
    }
})();


