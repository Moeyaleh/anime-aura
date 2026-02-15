import type { Colors } from "../types";
import { type JSX } from "react";
interface colorPaletteProps {
  colors: Colors;
  isLoading?: boolean;
}

export default function colorPalette({
  colors,
  isLoading,
}: colorPaletteProps): JSX.Element {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 md:p-8">
      <h2 className="text-lg md:text-2xl font-semibold text-white mb-4">
        Extracted Colors
      </h2>

      {isLoading ? (
        <div className="text-white text-center py-6 md:py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-3"></div>
          <p className="text-sm md:text-base">Extracting colors...</p>
        </div>
      ) : colors.length === 0 ? (
        <div className="text-white/60 text-center py-6 md:py-8">
          Upload an image to extract colors
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 md:gap-3">
          {colors.map((color: string, index: number) => (
            <div key={index} className="flex-1 min-w-[60px]">
              <div
                className="h-16 md:h-20 rounded-lg shadow-lg mb-2"
                style={{ backgroundColor: color }}
              />
              <p className="text-white text-center text-xs md:text-sm font-mono break-all">
                {color}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
