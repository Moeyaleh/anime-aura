import { useState } from "react";
import type { Colors } from "../types";
import ColorThief from "colorthief";

export function useColorExtraction(): {
  colors: Colors;
  extractColors: (imageUrl: string, count?: number) => void;
  isExtracting: boolean;
} {
  const [colors, setColors] = useState<Colors>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  const extractColors = (imageUrl: string, count: number = 8): void => {
    setIsExtracting(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, count) as Array<
          [number, number, number]
        >; // dominant colors
        // RGB to HEX
        const hexColors = palette.map(
          (rgb: readonly [number, number, number] | number[]) => {
            const [r, g, b] = rgb;
            return (
              "#" +
              [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
            );
          },
        );

        setColors(hexColors);
      } catch (err) {
        console.error("color extraction didn't work", err);
        setColors([]);
      } finally {
        setIsExtracting(false);
      }
    };

    img.onerror = () => {
      console.error("Failed to load image");
      setColors([]);
      setIsExtracting(false);
    };
  };

  return { colors, extractColors, isExtracting };
}
