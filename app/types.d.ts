type Props = { children: JSX.Element };
type BoardCell = {
  square: null | JSX.Element;
  piece: null | JSX.Element;
};
type BoardContextType =
  | {
      sizeCell: number;
      board: BoardCell[][];
      currentPiece: CurrentPiece;
      setCurrentPiece: () => void;
    }
  | {};
type BoardProps = {};
type SquareProps = {
  x: number;
  y: number;
};
type PieceProps = {
  type: number;
  letter: PieceLetter;
  xInitial: number;
  yInitial: number;
};
type CurrentPiece = {
  xCurrent: number;
  yCurrent: number;
  move: (x: number, y: number) => void;
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
