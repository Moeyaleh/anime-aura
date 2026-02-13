import { useState } from "react";
import type { ImageData } from "../types";

export function useImageUpload() {
  const [image, setImage] = useState<ImageData | null>(null);

  const uploadImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage({ url });
  };

  return { image, uploadImage };
}
