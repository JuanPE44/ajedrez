import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

export const useBoardContext = () => {
  return useContext(BoardContext);
};
