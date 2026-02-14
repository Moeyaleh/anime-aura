import { useState } from "react";
import type { ImageData } from "../types";

export function useImageUpload(): {
  image: ImageData | null;
  uploadImage: (file: File) => void;
} {
  const [image, setImage] = useState<ImageData | null>(null);

  const uploadImage = (file: File): void => {
    const url = URL.createObjectURL(file);
    setImage({ url });
  };

  return { image, uploadImage };
}
