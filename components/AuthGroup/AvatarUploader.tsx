import React, { useRef, useState } from "react";
import { X } from "lucide-react";

interface AvatarUploaderProps {
  image: string | null;
  onImageSelect: (file: File | null) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ image, onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onImageSelect(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering file selection
    onImageSelect(null);
  };

  return (
    <div
      className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <>
          <img src={image} alt="Avatar" className="w-full h-full object-cover" />
          {isHovered && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              onClick={handleRemoveImage}
            >
              <X className="text-white w-6 h-6" />
            </div>
          )}
        </>
      ) : (
        <svg
          className="w-full h-full text-gray-400 bg-gray-200 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUploader;
