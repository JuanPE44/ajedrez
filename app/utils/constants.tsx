import { PieceLetter } from "../types";

export const colors = { color1: "#dadada", color2: "#ef8686" };

export const blackPieces: PieceLetter[] = [
  "r",
  "n",
  "b",
  "q",
  "k",
  "b",
  "n",
  "r",
];
export const whitePieces: PieceLetter[] = [
  "R",
  "N",
  "B",
  "Q",
  "K",
  "B",
  "N",
  "R",
];

const BASE_PIECES_URL = "https://www.chess.com/chess-themes/pieces/neo/150/";
const blackPiecesUrl = blackPieces.map((piece) => {
  return { letter: piece, url: `${BASE_PIECES_URL}b${piece}.png` };
});
const whitePiecesUrl = whitePieces.map((piece) => {
  return {
    letter: piece,
    url: `${BASE_PIECES_URL}w${piece.toLocaleLowerCase()}.png`,
  };
});

export const piecesUrl = [
  ...blackPiecesUrl,
  ...whitePiecesUrl,
  { letter: "p", url: `${BASE_PIECES_URL}bp.png` },
  { letter: "P", url: `${BASE_PIECES_URL}wp.png` },
];
