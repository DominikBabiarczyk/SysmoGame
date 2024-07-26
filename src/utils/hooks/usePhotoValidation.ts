import toast from "react-hot-toast";
import { useTranslation } from "next-i18next";

export const usePhotoValidation = () => {
  const { t } = useTranslation();

  const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop()?.toLowerCase();
  };

  const validatePhoto = (file: File) => {
    if (!file || !file.name || !file.size) {
      return false;
    }
    if (file.size > 5000000) {
      toast.error(t("common:photo-validation:size"));
      return false;
    }
    if (
      !["png", "jpg", "jpeg"].includes(getFileExtension(file?.name) as string)
    ) {
      toast.error(t("common:photo-validation:type"));
      return false;
    }

    return true;
  };

  return { validatePhoto };
};
