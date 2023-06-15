class Square {
  constructor(x, y, color, board, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.color = color;
    this.board = board;
    this.move = false;
    this.element = document.createElement("div");
    this.handleSquare();
  }

  handleSquare() {
    this.element.classList.add("square", `square-${this.color}`);

    this.element.addEventListener("click", () => {
      if (!this.game.start) return;

      if (this.board.currentPiece && this.move === true) {
        this.board.clearSquares();
        this.board.currentPiece.moveTo(this.x, this.y);
        this.board.soundMove.play();
      }
    });

    this.element.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.element.addEventListener("drop", (e) => {
      this.board.currentPiece.moveTo(this.x, this.y);
    });
  }

  select() {
    this.element.classList.add("selected");
  }

  deselect() {
    this.element.classList.remove("selected");
  }

  getArrayPossible(piece, x, y) {
    // peon negro
    if (piece === "p") {
      return [
        [x, y + 1],
        [x, y + 2],
        [x + 1, y + 1],
        [x - 1, y + 1],
      ];
    }
    //peon blanco
    if (piece === "P") {
      return [
        [x, y - 1],
        [x, y - 2],
        [x + 1, y - 1],
        [x - 1, y - 1],
      ];
    }
    // torre
    if (piece === "r" || piece === "R") {
      const possible = [];
      const col1 = this.getPossible(x, y, "", "-");
      const col2 = this.getPossible(x, y, "", "+");
      const fil1 = this.getPossible(x, y, "+", "");
      const fil2 = this.getPossible(x, y, "-", "");
      possible.push(...col1, ...col2, ...fil1, ...fil2);
      return possible;
    }
    // caballo
    if (piece === "n" || piece === "N") {
      return [
        [x + 1, y - 2],
        [x + 2, y - 1],
        [x + 2, y + 1],
        [x + 1, y + 2],
        [x - 1, y - 2],
        [x - 2, y - 1],
        [x - 1, y + 2],
        [x - 2, y + 1],
      ];
    }
    // alfil
    if (piece === "b" || piece === "B") {
      const possible = [];
      const diag1 = this.getPossible(x, y, "-", "-");
      const diag2 = this.getPossible(x, y, "-", "+");
      const diag3 = this.getPossible(x, y, "+", "+");
      const diag4 = this.getPossible(x, y, "+", "+-");
      possible.push(...diag1, ...diag2, ...diag3, ...diag4);

      return possible;
    }
    // reina
    if (piece === "q" || piece === "Q") {
      const possible = [];
      const diag1 = this.getPossible(x, y, "-", "-");
      const diag2 = this.getPossible(x, y, "-", "+");
      const diag3 = this.getPossible(x, y, "+", "+");
      const diag4 = this.getPossible(x, y, "+", "+-");
      const col1 = this.getPossible(x, y, "", "-");
      const col2 = this.getPossible(x, y, "", "+");
      const fil1 = this.getPossible(x, y, "+", "");
      const fil2 = this.getPossible(x, y, "-", "");
      possible.push(
        ...diag1,
        ...diag2,
        ...diag3,
        ...diag4,
        ...col1,
        ...col2,
        ...fil1,
        ...fil2
      );
      return possible;
    }
    // rey
    if (piece === "k" || piece === "K") {
      return [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ];
    }
  }

  getPossible(x, y, xOp, yOp) {
    // xOp es el operador de x y lo mismo con el y
    let coordinates = [];
    for (let i = 0; i < this.board.ROWS; i++) {
      if (i === 0) continue;

      coordinates.push([
        xOp === "" ? x : xOp === "+" ? x + i : x - i,
        yOp === "" ? y : yOp === "+" ? y + i : y - i,
      ]);
      if (
        this.hasPiece(
          xOp === "" ? x : xOp === "+" ? x + i : x - i,
          yOp === "" ? y : yOp === "+" ? y + i : y - i
        )
      )
        break;
    }
    return coordinates;
  }

  selectPossible({ addClass }) {
    const currentPiece = this.board.currentPiece;
    const possible = this.getArrayPossible(
      currentPiece.id,
      currentPiece.x,
      currentPiece.y
    );

    possible.forEach((pos, index) => {
      const [x, y] = pos;
      if (x > 7 || y > 7 || x < 0 || y < 0) return;
      const piece = this.board.array[y][x].piece;
      const square = this.board.array[y][x].square;
      if (this.isPeon(currentPiece, x, y, index)) return;
      square.move = true;
      if (!addClass) return;
      const squareClass = this.getSquareClass(piece);
      square.element.classList.add(`${squareClass}`);
    });
  }

  getSquareClass(piece) {
    if (piece === null) return "possible";
    const piecePlayer = this.game.currentPlayer.data.pieceColor;
    if (piece.type !== piecePlayer) return "possible-piece";
    return "possible";
  }

  isPeon(currentPiece, x, y, index) {
    const moves = this.board.currentPiece.moves;
    const piece = this.board.array[y][x].piece;
    const isPeon = currentPiece.id === "p" || currentPiece.id === "P";
    if (!isPeon) return false;
    if (moves < 1 && index === 1 && piece === null) return false;
    if (piece !== null && index === 0) return true;
    if (index === 0) return false;
    if (piece !== null && index !== 1) return false;
    return true;
  }

  hasPiece(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) return;
    const piece = this.board.array[y][x]?.piece;
    return piece !== null;
  }
}
