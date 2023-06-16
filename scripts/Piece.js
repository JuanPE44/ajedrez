class Piece {
  constructor(x, y, size, id, board, type, game) {
    this.board = board;
    this.game = game;
    this.x = x;
    this.y = y;
    this.id = id;
    this.size = size;
    this.type = type;
    this._moves = 0;
    this.currentSquare = board.array[y][x].square;
    this.select = false;
    this.element = document.createElement("div");
    this.container = document.querySelector(".container-pieces");
    this.createPieces();
    this.moveTo(this.x, this.y);
  }

  get moves() {
    return this._moves;
  }

  set moves(value) {
    this._moves = value;
  }

  createPieces() {
    this.element.classList.add("piece", `${this.id}-piece`);
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.draggable = true;
    this.container.appendChild(this.element);

    this.element.addEventListener("click", () => {
      if (!this.game.start) return;

      if (
        this.currentSquare.move === true &&
        this.type !== this.board.currentPiece.type
      ) {
        this.eatPiece();
        return;
      }
      this.board.currentPiece?.currentSquare.deselect();
      this.board.clearSquares();
      this.currentSquare.select();
      this.board.currentPiece = this;

      if (this.type !== this.game.currentPlayer.data.pieceColor) return;
      this.currentSquare.selectPossible({ addClass: true });
    });

    this.element.addEventListener("dragstart", (e) => {
      console.log("drag start");
      this.element.style.transition = "0s";
    });

    this.element.addEventListener("dragend", () => {
      console.log("drag end");
      this.element.style.transition = "";
    });
  }

  eatPiece() {
    this.game.currentPlayer.data.eated.push(this.id);
    this.board.currentPiece?.currentSquare.deselect();
    this.board.clearSquares();
    this.board.currentPiece?.moveTo(this.x, this.y);
    this.board.soundEat.play();
    setTimeout(() => {
      this.container.removeChild(this.element);
    }, 500);
  }

  moveTo(x, y) {
    const [prevX, prevY, nextX, nextY] = [this.x, this.y, x, y];
    this.currentSquare.deselect();
    this.board.array[this.y][this.x].piece = null;
    [this.x, this.y] = [x, y];
    this.updatePiecePosition(x, y);
    if (!this.game.start) return;
    const { black, white } = this.board.pieces;
    this.checkPossible(black);
    this.checkPossible(white);
    this.board.updateMoves(prevX, prevY, nextX, nextY);
    this.game.changeTurn();
    this._moves++;
  }

  updatePiecePosition(x, y) {
    this.element.style.transform = `translate(${this.x * this.size}px, ${
      this.y * this.size
    }px)`;
    this.currentSquare = this.board.array[y][x].square;
    this.board.array[y][x].piece = this;
  }

  checkJaque() {
    const [king] = this.board.piecesKings.filter(
      (k) => k.type !== this.game.currentPlayer.data.pieceColor
    );
    if (king?.currentSquare.move) console.log("jaque");
  }

  checkPossible(pieces) {
    pieces.forEach((piece) => {
      piece.currentSquare.selectPossible({ addClass: false });
    });
    this.checkJaque();
    this.board.clearSquares();
  }
}
