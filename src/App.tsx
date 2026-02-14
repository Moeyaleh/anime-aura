import { useState, useEffect, type JSX } from "react";
import ImageUploader from "./components/ImageUploder";
import ColorPalette from "./components/ColorPalette";
import GradientPreview from "./components/GradientPreview";
import DownloadButton from "./components/DownloadButton";
import { useImageUpload } from "./hooks/useImageUpload";
import { useColorExtraction } from "./hooks/useColorExtraction";

function App(): JSX.Element {
  const { image, uploadImage } = useImageUpload();
  const { colors, extractColors, isExtracting } = useColorExtraction();
  const [error, setError] = useState<string>("");

  useEffect((): (() => void) => {
    return (): void => {
      if (image?.url) URL.revokeObjectURL(image.url);
    };
  }, [image?.url]);

  const handleUpload = (file: File): void => {
    try {
      setError("");
      if (file.size > 10 * 1024 * 1024) {
        setError(" File size should be 10MB or less");
        return;
      }

      uploadImage(file);
      const url = URL.createObjectURL(file);
      extractColors(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-black min-w-5xl pb-8">
      <header className="text-center mb-12 pt-8">
        <h1 className="text-5xl font-bold text-white">Anime Aura</h1>
      </header>

      <div className="max-w-4xl mx-auto space-y-6 px-4">
        <ImageUploader onUpload={handleUpload} />

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
            {error}
          </div>
        )}

        {image?.url && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Photo</h2>
            <div className="flex items-center justify-center bg-black/30 rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt="uploaded image"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <ColorPalette colors={colors} isLoading={isExtracting} />
        )}

        {image && colors.length > 0 && (
          <GradientPreview image={image} colors={colors} />
        )}

        {image && colors.length > 0 && (
          <DownloadButton image={image} colors={colors} />
        )}
      </div>
    </div>
  );
}

export default App;
