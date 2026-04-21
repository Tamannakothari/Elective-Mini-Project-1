const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const winLine = document.getElementById("win-line");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let scoreX = 0;
let scoreO = 0;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

function handleCellClick() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      showWinLine(condition);
      highlightCells(a, b, c);

      statusText.textContent = `Player ${currentPlayer} wins!`;

      if (currentPlayer === "X") {
        scoreX++;
        document.getElementById("scoreX").textContent = scoreX;
      } else {
        scoreO++;
        document.getElementById("scoreO").textContent = scoreO;
      }

      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightCells(a, b, c) {
  cells[a].style.backgroundColor = "#a5d6a7";
  cells[b].style.backgroundColor = "#a5d6a7";
  cells[c].style.backgroundColor = "#a5d6a7";
}

function showWinLine(condition) {
  const lineStyles = {
    "0,1,2": { top: "50px", left: "0px", width: "320px", rotate: "0deg" },
    "3,4,5": { top: "160px", left: "0px", width: "320px", rotate: "0deg" },
    "6,7,8": { top: "270px", left: "0px", width: "320px", rotate: "0deg" },

    "0,3,6": { top: "0px", left: "50px", width: "320px", rotate: "90deg" },
    "1,4,7": { top: "0px", left: "160px", width: "320px", rotate: "90deg" },
    "2,5,8": { top: "0px", left: "270px", width: "320px", rotate: "90deg" },

    "0,4,8": { top: "0px", left: "0px", width: "450px", rotate: "45deg" },
    "2,4,6": { top: "0px", left: "0px", width: "450px", rotate: "-45deg" }
  };

  const key = condition.toString();
  const style = lineStyles[key];

  winLine.style.top = style.top;
  winLine.style.left = style.left;
  winLine.style.width = style.width;
  winLine.style.transform = `rotate(${style.rotate})`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });

  // Reset win line
  winLine.style.width = "0";
}