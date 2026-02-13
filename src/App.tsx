import ImageUploader from "./components/ImageUploder";
import { useImageUpload } from "./hooks/useImageUpload";

function App() {
  const { image, uploadImage } = useImageUpload();

  const handleUpload = (file: File) => {
    uploadImage(file);
  };
  return (
    <div className="min-h-screen min-w-5xl bg-black">
      <header className="text-center mb-12">
        <h1 className="text-5xl text-white">Anime Aura </h1>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Step 1: Upload */}
        <ImageUploader onUpload={handleUpload} />

        {/* Debug: Show if image uploaded */}
        {image && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <p className="text-white">
              Image uploaded: {image.url.substring(0, 50)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
