import { useState } from "react";
import { colors } from "../utils/constants";

export function useSquare({ x, y }: { x: number; y: number }) {
  const { color1, color2 } = colors;
  const getSquareColor = (x: number, y: number) => {
    if (x % 2 === 0) {
      if (y % 2 === 0) return color1;
      return color2;
    } else {
      if (y % 2 === 0) return color2;
      return color1;
    }
  };

  const [color, setColor] = useState(getSquareColor(x, y));

  return { color };
}
