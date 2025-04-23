const board = document.getElementById("board");
let selectedCell = null;


const pieces = {
  "e2": "♙", 
  "e7": "♟︎"  
};

function createBoard() {
  board.innerHTML = "";
  for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      const letter = String.fromCharCode(97 + col); 
      const pos = letter + row;
      cell.classList.add("cell");
      const isWhite = (row + col) % 2 === 0;
      cell.classList.add(isWhite ? "white" : "black");
      cell.dataset.position = pos;

      if (pieces[pos]) {
        cell.textContent = pieces[pos];
      }

      cell.addEventListener("click", () => handleCellClick(cell));
      board.appendChild(cell);
    }
  }
}

function handleCellClick(cell) {
  const pos = cell.dataset.position;
  const piece = pieces[pos];

  if (selectedCell) {
    const from = selectedCell.dataset.position;
    const selectedPiece = pieces[from];

    
    const validMoves = {
      "e2": ["e3", "e4"],
      "e7": ["e6", "e5"]
    };

    if (
      selectedPiece &&
      validMoves[from] &&
      validMoves[from].includes(pos) &&
      !pieces[pos]
    ) {
      pieces[pos] = selectedPiece;
      delete pieces[from];
    }

    selectedCell.classList.remove("selected");
    selectedCell = null;
    createBoard();
    return;
  }

  
  if (piece === "♙" || piece === "♟︎") {
    selectedCell = cell;
    cell.classList.add("selected");
  }
}

createBoard();
