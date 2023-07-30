import { useState } from "react";
import { Square } from "../components/Square";
import { Piece } from "../components/Piece";
import { blackPieces, whitePieces } from "../utils/constants";
import { BoardCell, CurrentPiece } from "../types";

export function useBoard() {
  const getPiece = (x: number, y: number) => {
    const key = `${x}${y}`;
    let piece = null;
    switch (y) {
      case 0:
        piece = (
          <Piece
            key={key}
            type={1}
            letter={blackPieces[x]}
            xInitial={x}
            yInitial={y}
          />
        );
        break;
      case 1:
        piece = (
          <Piece key={key} type={1} letter="p" xInitial={x} yInitial={y} />
        );
        break;
      case 6:
        piece = (
          <Piece key={key} type={2} letter="P" xInitial={x} yInitial={y} />
        );
        break;
      case 7:
        piece = (
          <Piece
            key={key}
            type={2}
            letter={whitePieces[x]}
            xInitial={x}
            yInitial={y}
          />
        );
        break;
    }
    return { piece };
  };

  const createBoard = () => {
    const matrix: BoardCell[][] = [];
    for (let y = 0; y < 8; y++) {
      matrix[y] = [];
      for (let x = 0; x < 8; x++) {
        const { piece } = getPiece(x, y);
        const key = `${x}${y}`;
        matrix[y][x] = {
          square: <Square key={key} x={x} y={y} />,
          piece,
        };
      }
    }
    return matrix;
  };

  const [board, setBoard] = useState<BoardCell[][]>(createBoard());
  const [sizeCell, setSize] = useState(70);
  const [currentPiece, setCurrentPiece] = useState<CurrentPiece | null>(null);

  return { board, setBoard, sizeCell, currentPiece, setCurrentPiece };
}
