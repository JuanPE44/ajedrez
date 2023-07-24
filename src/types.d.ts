import { Square, Piece } from "./classes/Square";

export type PlayerData = {
  id: number;
  name: string;
  pieceType: "white" | "black";
};

export type objectMoves = {
  prev: { x: number; y: number };
  next: { x: number; y: number };
};

export type PieceLetter =
  | "p"
  | "r"
  | "n"
  | "b"
  | "q"
  | "k"
  | "b"
  | "n"
  | "r"
  | "P"
  | "R"
  | "N"
  | "B"
  | "Q"
  | "K"
  | "B"
  | "N"
  | "R";

export type BoardArray = { square: Square; piece: Piece | null };
