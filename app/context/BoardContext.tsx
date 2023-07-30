"use client";

import { createContext } from "react";
import { useBoard } from "../hooks/useBoard";
import { BoardContextType } from "../types";

export const BoardContext = createContext<BoardContextType>({});

export const BoardContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { currentPiece, setCurrentPiece, board, setBoard, sizeCell } =
    useBoard();
  return (
    <BoardContext.Provider
      value={{ board, setBoard, sizeCell, currentPiece, setCurrentPiece }}
    >
      {children}
    </BoardContext.Provider>
  );
};
