import { CircleX } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../shared/Button';
import { IImage } from '../../types/ISuperhero';
interface ImageUploadProps {
  onImagesUpload: (files: File[]) => void;
  uploadedImages: File[];
  existingImages: IImage[];
  onImageDelete: (index: number, isExisting: boolean) => void;
  errors?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesUpload,
  uploadedImages,
  existingImages,
  onImageDelete,
  errors,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImagesUpload(acceptedFiles);
    },
    [onImagesUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    multiple: true,
  });

  return (
    <div className="w-full text-sm">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
          isDragActive ? 'border-green-500' : 'border-gray-500'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          {isDragActive
            ? 'Drop the images here...'
            : 'Drag & drop images here, or click to select files'}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {existingImages.map((image, index) => (
          <div
            key={`existing-${index}`}
            className="relative border rounded-lg w-[200px] h-[200px]"
          >
            <img
              src={image.url}
              alt={`existing-${index}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Button
                icon={<CircleX size={16} />}
                isIconOnly
                variant="destructive"
                onClick={() => onImageDelete(index, true)}
              />
            </div>
          </div>
        ))}
        {uploadedImages.map((image, index) => (
          <div
            key={`uploaded-${index}`}
            className="relative border rounded-lg w-[200px] h-[200px]"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`uploaded-${index}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Button
                icon={<CircleX size={16} />}
                isIconOnly
                variant="destructive"
                onClick={() => onImageDelete(index, false)}
              />
            </div>
          </div>
        ))}
      </div>
      {errors && <p className="text-red-600 text-xs mt-2">{errors}</p>}
    </div>
  );
};

export default ImageUpload;
