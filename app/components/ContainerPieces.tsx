import { useBoard } from "../hooks/useBoard";

export function ContainerPieces() {
  const { board } = useBoard();

  return (
    <div className="absolute w-full h-ful flex flex-wrap">
      {board.map((col, x) => {
        return col.map((cell, y) => {
          return cell.piece;
        });
      })}
    </div>
  );
}
