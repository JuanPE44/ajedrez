import { BoardContextType, CurrentPiece, PieceProps } from "../types";
import { usePiece } from "../hooks/usePiece";
import { useBoardContext } from "../hooks/useBoardContext";
import Image from "next/image";

export function Piece({ type, letter, xInitial, yInitial }: PieceProps) {
  const { x, y, movePiece, getUrlPiece } = usePiece({ xInitial, yInitial });
  const { setCurrentPiece, sizeCell }: BoardContextType = useBoardContext();
  const { url } = getUrlPiece(letter);

  const handleClick = () => {
    const piece: CurrentPiece = {
      xCurrent: x,
      yCurrent: y,
      move: movePiece,
    };
    console.log(`hizo click en la pieza`, { piece });
    setCurrentPiece(piece);
  };
  return (
    <div
      onClick={handleClick}
      className={`absolute bg-center bg-contain transition-all duration-900 cursor-pointer`}
      style={{
        width: `${sizeCell}px`,
        height: `${sizeCell}px`,
        transform: `translate(${x * sizeCell}px, ${y * sizeCell}px)`,
      }}
    >
      <Image
        src={url}
        alt={`pieza ${letter} de ajedrez`}
        width={sizeCell}
        height={sizeCell}
      />
    </div>
  );
}
