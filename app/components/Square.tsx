import { useBoard } from "../hooks/useBoard";
import { useBoardContext } from "../hooks/useBoardContext";
import { useSquare } from "../hooks/useSquare";
import { BoardContextType, SquareProps } from "../types";

export function Square({ x, y }: SquareProps) {
  const { color } = useSquare({ x, y });
  const { sizeCell, currentPiece } = useBoardContext();

  const handleClick = () => {
    if (!currentPiece) return;
    currentPiece.move(x, y);
  };
  return (
    <div
      id="square"
      onClick={handleClick}
      style={{
        background: color,
        width: `${sizeCell}px`,
        height: `${sizeCell}px`,
      }}
    ></div>
  );
}
