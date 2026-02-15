import type { ImageData, Colors } from "../types";
import { type JSX } from "react";

interface DownloadButtonProps {
  image: ImageData;
  colors: Colors;
}

export default function DownloadButton({
  image,
  colors,
}: DownloadButtonProps): JSX.Element {
  const downloadWallpaper = (): void => {
    //  canvas

    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw gradient background

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    colors.forEach((color: string, i: number) => {
      const position = i / (colors.length - 1);
      gradient.addColorStop(position, color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image on top

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.url;
    img.onload = () => {
      // Center the image
      const imgHeight = 800;
      const imgWidth = (img.width / img.height) * imgHeight;
      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;

      ctx.drawImage(img, x, y, imgWidth, imgHeight);

      // Convert to file and download

      canvas.toBlob((blob: Blob | null) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "wallpaper.png";
        link.click();

        URL.revokeObjectURL(url);
      });
    };
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 md:p-8">
      <button
        onClick={downloadWallpaper}
        className="w-full cursor-pointer text-white text-base md:text-lg font-semibold py-3 md:py-4 rounded-xl transition-colors hover:bg-white/10 active:bg-white/20"
      >
        Download
      </button>
    </div>
  );
}
