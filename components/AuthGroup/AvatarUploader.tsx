"use client";

import React, { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { X, Pencil } from "lucide-react";
import CameraUploader from "@/public/assets/signup/camera-uploader.svg";
import Image from "next/image";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AvatarUploaderProps {
  onImageSelect: (img: string | null) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const [localImage, setLocalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setLocalImage(imageUrl);
      setCroppedImage(imageUrl);
      onImageSelect(imageUrl);
    }
  };

  // Open file selector
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Crop the image and save
  const handleCrop = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedDataUrl = croppedCanvas.toDataURL();
        setCroppedImage(croppedDataUrl);
        onImageSelect(croppedDataUrl);
        setIsCropping(false);
      }
    }
  };

  // Delete the image
  const handleDelete = () => {
    setLocalImage(null);
    setCroppedImage(null);
    onImageSelect(null);
    setIsCropping(false);

    // Reset file input value to allow re-uploading the same image
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      {/* Placeholder or Cropped Image */}
      {localImage && croppedImage ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative group">
            <Image
              src={croppedImage}
              width={64}
              height={64}
              className="w-16 h-16 object-cover overflow-hidden rounded-full"
              alt="upload image"
            />

            <Dialog open={isCropping} onOpenChange={setIsCropping}>
              <DialogTrigger asChild>
                <button className="absolute cursor-pointer top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
                  <Pencil size={16} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="flex flex-col items-center justify-center">
                  <DialogTitle>Adjust Your Profile Picture</DialogTitle>
                  <DialogDescription></DialogDescription>
                  <Cropper
                    ref={cropperRef}
                    src={localImage}
                    aspectRatio={1}
                    viewMode={1}
                    autoCropArea={1}
                    background={true}
                  />
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={handleDelete}>
                    Remove
                  </Button>
                  <Button variant="default" onClick={handleCrop}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src={CameraUploader}
            width={64}
            height={64}
            alt="upload image"
            className="w-16 h-16 cursor-pointer"
            onClick={handleUploadClick}
          />
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUploader;
