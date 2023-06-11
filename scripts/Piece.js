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
      this.board.currentPiece?.currentSquare.unpaintPossible();
      this.currentSquare.select();
      this.board.currentPiece = this;

      if (this.type !== this.game.currentPlayer.data.pieceColor) return;
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
    this.game.currentPlayer.data.eated.push(this.id);
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
    if (!this.game.start) return;
    this._moves++;
    console.log("entro");
    this.game.changeTurn();
  }

  checkJaque() {
    const [king] = this.board.piecesKings.filter(
      (k) => k.type !== this.board.currentTurn
    );
    if (king?.currentSquare.move) alert("rey en jaque");
  }
}
