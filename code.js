"use strict";

const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function checkWinner() {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      line.forEach(index => cells[index].classList.add("winner"));
      return board[a];
    }
  }
  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  // Ignore clicks on filled cells or after the game ends.
  if (gameOver || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winner = checkWinner();
  if (winner) {
    statusText.textContent = `Player ${winner} wins!`;
    gameOver = true;
    cells.forEach(button => button.disabled = true);
    return;
  }

  if (board.every(value => value !== "")) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "winner");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
