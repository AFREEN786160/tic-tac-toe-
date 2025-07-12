const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = 🎉 Player ${currentPlayer} Wins!;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "😐 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = Player ${currentPlayer}'s turn;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

