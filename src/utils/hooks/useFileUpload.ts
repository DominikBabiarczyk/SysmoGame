import { usePhotoValidation } from "@src/utils/hooks/usePhotoValidation";
import { useState } from "react";

interface FileUploadProps {
  newImageSelected: (v: File) => void;
}

export function useFileUpload({ newImageSelected }: FileUploadProps) {
  const { validatePhoto } = usePhotoValidation();

  const [selectedImage, setSelectedImage] = useState<{
    file: File | null;
    preview: string | unknown;
  }>();

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.accept = ".png, .jpg, .jpeg, ";
    input.onchange = async (event: any) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (!validatePhoto(file)) {
        return;
      }
      const reader = new FileReader();
      //@ts-ignore
      const base64 = await toBase64(file);

      setSelectedImage({ file: file, preview: base64 });
      newImageSelected(file);
    };
    input.click();
  };

  return { handleFileUpload, selectedImage, setSelectedImage };
}
