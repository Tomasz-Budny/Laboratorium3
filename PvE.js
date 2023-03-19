const statusDisplay = document.querySelector('.status');

let xScoreEl = document.querySelector('.X-score');
let oScoreEl = document.querySelector('.O-score');
let xScore = 0;
let oScore = 0;

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

statusDisplay.innerHTML = `Tura gracza: ${currentPlayer}`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Koniec! Wygrał gracz: ${currentPlayer}!`;
        gameActive = false;

        if(currentPlayer === 'X') {
            xScoreEl.innerHTML = `X: ${++xScore}`;
        }
        else {
            oScoreEl.innerHTML = `O: ${++oScore}`;
        }

        statusDisplay.classList.add(`${currentPlayer}-player`)
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = 'Gra zakończyła się remisem!'
        gameActive = false;
        return;
    }
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    clickedCell.classList.add(`${currentPlayer}-player`);

    handleResultValidation();
    if(gameActive) {
        handleBotChange();
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.classList.remove('X-player');
    statusDisplay.classList.remove('O-player');

    statusDisplay.innerHTML = `Tura gracza: ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('X-player');
        cell.classList.remove('O-player');
    });
}

function handleBotChange() {
    while(true) {
        let randIndex = Math.floor(Math.random() * gameState.length - 1);
        if(gameState[randIndex] === '') {
            gameState[randIndex] = 'O';
            const cell = document.querySelector(`[cell-index="${randIndex}"]`);
            cell.innerHTML = 'O';
            console.log(randIndex);
            console.log(gameState);
            currentPlayer = 'O';
            cell.classList.add(`${currentPlayer}-player`);
            handleResultValidation();
            currentPlayer = 'X';
            break;
        }
    }
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);