import { useState } from "react";
import { PieceLetter } from "../types";
import { piecesUrl } from "../utils/constants";

export function usePiece({
  xInitial,
  yInitial,
}: {
  xInitial: number;
  yInitial: number;
}) {
  const [x, setX] = useState(xInitial);
  const [y, setY] = useState(yInitial);

  const movePiece = (x: number, y: number) => {
    console.log("move piece");
    setX(x);
    setY(y);
  };

  const getUrlPiece = (letter: PieceLetter) => {
    const url = piecesUrl.filter((piece) => piece.letter === letter)[0];
    console.log(url);
    return url;
  };

  return { x, y, movePiece, getUrlPiece };
}
