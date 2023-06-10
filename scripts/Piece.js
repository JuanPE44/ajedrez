class Piece {
  constructor(x, y, size, id, board, type) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.size = size;
    this.board = board;
    this.type = type;
    this._moves = -1;
    this.currentSquare = board.array[y][x].square;
    this.select = false;
    this.element = document.createElement("div");
    this.container = document.querySelector(".container-pieces");
    this.createPieces();
    this.moveTo(this.x, this.y);
  }

  get moves() {
    console.log("get moves: " + this._moves);
    return this._moves;
  }

  set moves(value) {
    this._moves = value;
  }

  createPieces() {
    this.element.classList.add("piece");
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.draggable = true;
    this.container.appendChild(this.element);
    const urlPiece = this.getUrlPiece(this.id);
    this.element.style.backgroundImage = `url(${urlPiece})`;

    this.element.addEventListener("click", (e) => {
      if (
        this.currentSquare.move === true &&
        this.type !== this.board.currentPiece.type
      ) {
        this.eatPiece();
        return;
      }
      this.board.currentPiece?.currentSquare.deselect();
      this.board.currentPiece?.currentSquare.unpaintPossible();
      this.currentSquare.select();
      this.board.currentPiece = this;
      console.log({
        type: this.type,
        boardCurrentTurn: this.board.currentTurn,
      });
      if (this.type !== this.board.currentTurn) return;
      this.currentSquare.paintPossible();
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
    this.board.currentPiece?.currentSquare.deselect();
    this.board.currentPiece?.currentSquare.unpaintPossible();
    this.board.currentPiece?.moveTo(this.x, this.y);
    this.board.soundMove.play();
    setTimeout(() => {
      this.container.removeChild(this.element);
    }, 500);
  }

  moveTo(x, y) {
    this.currentSquare.deselect();
    this.board.array[this.y][this.x].piece = null;
    this.x = x;
    this.y = y;
    this.element.style.transform = `translate(${this.x * this.size}px, ${
      this.y * this.size
    }px)`;
    this.currentSquare = this.board.array[y][x].square;
    this.board.array[y][x].piece = this;
    this.board.changeTurn();
    this._moves++;
  }

  getUrlPiece(id) {
    if (id === "p")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bp.png";
    if (id === "r")
      return "https://www.chess.com/chess-themes/pieces/neo/150/br.png";
    if (id === "n")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bn.png";
    if (id === "b")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bb.png";
    if (id === "q")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bq.png";
    if (id === "k")
      return "https://www.chess.com/chess-themes/pieces/neo/150/bk.png";
    if (id === "P")
      return "https://www.chess.com/chess-themes/pieces/neo/150/wp.png";
    if (id === "R")
      return "	https://www.chess.com/chess-themes/pieces/neo/150/wr.png";
    if (id === "N")
      return "	https://www.chess.com/chess-themes/pieces/neo/150/wn.png";
    if (id === "B")
      return "https://www.chess.com/chess-themes/pieces/neo/150/wb.png";
    if (id === "Q")
      return "	https://www.chess.com/chess-themes/pieces/neo/150/wq.png";
    if (id === "K")
      return "https://www.chess.com/chess-themes/pieces/neo/150/wk.png";
  }
}
