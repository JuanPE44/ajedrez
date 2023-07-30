"use client";

import { useBoard } from "../hooks/useBoard";
import { BoardProps } from "../types";
import { ContainerPieces } from "./ContainerPieces";

export function Board({}: BoardProps) {
  const { board } = useBoard();

  return (
    <div
      id="board"
      className={`relative board grid grid-cols-8 grid-rows-8 rounded-xl overflow-hidden`}
    >
      <ContainerPieces />
      {board &&
        board.map((col) => {
          return col.map((cell) => {
            return cell.square;
          });
        })}
    </div>
  );
}
