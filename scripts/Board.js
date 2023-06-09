class Board {
  static ROWS = 8;
  static COLUMNS = 8;
  static SIZE_SQUARE = 50;

  constructor(element, game) {
    this.element = element;
    this._array = [];
    this._currentPiece;
    this._rounds = 0;
    this._piecesKings = [];
    this._pieces = { white: [], black: [] };
    this._arrayMoves = [];
    this.game = game;
    this._soundMove = new Audio("../audio/move-pieza.mp3");
    this._soundJaque = new Audio("../audio/jaque-pieza.mp3");
    this._soundEat = new Audio("../audio/eat-pieza.mp3");
    this.createBoard();
  }

  get pieces() {
    return this._pieces;
  }

  get arrayMoves() {
    return this._arrayMoves;
  }

  get soundMove() {
    return this._soundMove;
  }

  get soundJaque() {
    return this._soundJaque;
  }

  get soundEat() {
    return this._soundEat;
  }

  get piecesKings() {
    return this._piecesKings;
  }

  get currentTurn() {
    return this._currentTurn;
  }

  get ROWS() {
    return Board.ROWS;
  }

  get COLUMNS() {
    return Board.COLUMNS;
  }

  get currentPiece() {
    return this._currentPiece;
  }

  get array() {
    return this._array;
  }

  get rondas() {
    return this._rounds;
  }

  set rondas(value) {
    this._rounds = value;
  }

  set currentPiece(value) {
    this._currentPiece = value;
  }

  set array(value) {
    this._array = value;
  }

  set currentTurn(value) {
    this.currentTurn = value;
  }

  createBoard() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < Board.ROWS; i++) {
      this._array[i] = [];
      for (let j = 0; j < Board.COLUMNS; j++) {
        const colorSquare = this.getColorSquare(i, j);
        const s = new Square(j, i, colorSquare, this, this.game);
        this._array[i][j] = { square: s, piece: null };
        fragment.appendChild(s.element);
      }
    }
    this.element.appendChild(fragment);
    this.element.style.gridTemplateColumns = `repeat(${Board.ROWS}, ${Board.SIZE_SQUARE}px)`;
    this.element.style.gridTemplateRows = `repeat(${Board.ROWS}, ${Board.SIZE_SQUARE}px)`;
    this.addPieces();
  }

  addPieces() {
    for (let i = 0; i < Board.ROWS; i++) {
      for (let j = 0; j < Board.COLUMNS; j++) {
        if (i === 0 || i === 1 || i === 6 || i === 7) {
          const { piece, type } = this.getPiece(i, j);
          const p = new Piece(
            j,
            i,
            Board.SIZE_SQUARE,
            piece,
            this,
            type,
            this.game
          );
          type === "black"
            ? this._pieces.black.push(p)
            : this._pieces.white.push(p);
          if (piece === "k" || piece === "K") this._piecesKings.push(p);
          this._array[i][j].piece = p;
        }
      }
    }
  }

  getColorSquare(i, j) {
    if (i % 2 === 0) {
      if (j % 2 === 0) return "green";
      return "white";
    } else {
      if (j % 2 === 0) return "white";
      return "green";
    }
  }

  getPiece(i, j) {
    const blackPieces = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const whitePieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    if (i === 0) return { piece: blackPieces[j], type: "black" };
    if (i === 1) return { piece: "p", type: "black" };
    if (i === 6) return { piece: "P", type: "white" };
    if (i === 7) return { piece: whitePieces[j], type: "white" };
  }

  clearSquares() {
    this.array.forEach((fila) => {
      fila.forEach((el) => {
        const { square } = el;
        square.element.classList.remove("possible", "possible-piece");
        square.move = false;
      });
    });
  }

  updateMoves(prevX, prevY, nextX, nextY) {
    this.removeClassSquare();
    this.arrayMoves.push({
      prev: { x: prevX, y: prevY },
      next: { x: nextX, y: nextY },
    });
    this.addClassSquare(prevX, prevY, "prev-square");
    this.addClassSquare(nextX, nextY, "next-square");
  }

  removeClassSquare() {
    this.arrayMoves.forEach((move) => {
      const { prev, next } = move;
      const squarePrev = this.array[prev.y][prev.x].square;
      const squareNext = this.array[next.y][next.x].square;
      squarePrev.element.classList.remove("prev-square");
      squareNext.element.classList.remove("next-square");
    });
  }

  addClassSquare(x, y, className) {
    const { square } = this.array[y][x];
    square.element.classList.add(className);
  }
}
