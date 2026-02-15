import React from "react";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 md:p-8">
      <h2 className="text-lg md:text-2xl font-semibold text-white mb-4">
        Upload Your Character
      </h2>

      <div className="border-2 border-black rounded-xl p-6 md:p-12 text-center hover:border-white/50 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-white text-lg mb-4">
            Click to upload an image
          </div>
          <div className="text-white/60 text-sm">PNG, JPG, WebP up to 10MB</div>
        </label>
      </div>
    </div>
  );
}
