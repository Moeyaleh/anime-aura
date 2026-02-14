import type { ImageData, Colors } from "../types";
import { type JSX } from "react";

interface GradientPreviewProps {
  image: ImageData;
  colors: Colors;
}

export default function GradientPreview({
  image,
  colors,
}: GradientPreviewProps): JSX.Element {
  const gradient: string =
    colors.length > 0 ? `linear-gradient(45deg, ${colors.join(", ")})` : "gray";

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-white mb-4">
        background + image
      </h2>

      <div
        className="w-full h-96 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: gradient }}
      >
        <img
          src={image.url}
          alt="Character"
          className="max-h-80 object-contain"
        />
      </div>
    </div>
  );
}
