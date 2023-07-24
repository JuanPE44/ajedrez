import { Game } from "./Game";
import { Piece } from "./Piece";
import { Square } from "./Square";
import { objectMoves, BoardArray } from "../types";

export class Board {
  ROWS = 8;
  COLUMNS = 8;
  SIZE_SQUARE = 50;
  element;
  array: BoardArray[][];
  currentPiece: Piece | null;
  rounds;
  piecesKing: Piece[];
  arrayMoves: objectMoves[];
  game;

  constructor(element: HTMLElement | null, game: Game) {
    this.element = element;
    this.array = [];
    this.currentPiece = null;
    this.rounds = 0;
    this.piecesKing = [];
    this.arrayMoves = [];
    this.game = game;
    this.createBoard();
  }

  createBoard() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.ROWS; i++) {
      this.array[i] = [];
      for (let j = 0; j < this.COLUMNS; j++) {
        const colorSquare = this.getColorSquare(i, j);
        const s = new Square(j, i, colorSquare, this, this.game);
        this.array[i][j] = { square: s, piece: null };
        fragment.appendChild(s.element);
      }
    }
    this.element!.appendChild(fragment);
    this.element!.style.gridTemplateColumns = `repeat(${this.ROWS}, ${this.SIZE_SQUARE}px)`;
    this.element!.style.gridTemplateRows = `repeat(${this.ROWS}, ${this.SIZE_SQUARE}px)`;
    this.addPieces();
  }

  addPieces() {
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLUMNS; j++) {
        if (i === 0 || i === 1 || i === 6 || i === 7) {
          const { type, piece } = this.getPiece(i, j);
          const p = new Piece(
            j,
            i,
            this.SIZE_SQUARE,
            piece,
            this,
            type,
            this.game
          );
          if (piece === "k" || piece === "K") this.piecesKing.push(p);
          this.array[i][j].piece = p;
        }
      }
    }
  }

  getColorSquare(i: number, j: number) {
    if (i % 2 === 0) {
      if (j % 2 === 0) return "green";
      return "white";
    } else {
      if (j % 2 === 0) return "white";
      return "green";
    }
  }

  getPiece(i: number, j: number): { piece: string; type: string } {
    const blackPieces = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const whitePieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    if (i === 0) return { piece: blackPieces[j], type: "black" };
    if (i === 1) return { piece: "p", type: "black" };
    if (i === 6) return { piece: "P", type: "white" };
    return { piece: whitePieces[j], type: "white" };
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

  updateMoves(prevX: number, prevY: number, nextX: number, nextY: number) {
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

  addClassSquare(x: number, y: number, className: string) {
    const { square } = this.array[y][x];
    square.element.classList.add(className);
  }
}
