import React, { useCallback, useMemo } from "react";
import {
  useDeleteFileMutation,
  useUploadFileMutation,
} from "@src/queries/cdn.queries";
import { Icon } from "@src/assets/Icon";
import { Box } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import { Spinner } from "../ui/Spinner";
import { useFileUpload } from "@src/utils/hooks/useFileUpload";
import { ApiImage } from "./ApiImage";
import { FieldError } from "../error/FieldError";

interface GalleryPickerProps {
  images: string[];
  maxImages: number;
  error?: string;
  rounded?: boolean;
  onImagesChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export const GalleryPicker = ({
  images,
  maxImages,
  error,
  rounded,
  onImagesChange,
}: GalleryPickerProps) => {
  const { colors } = useTheme();

  const { handleFileUpload } = useFileUpload({
    newImageSelected: (file: File) => {
      mutateUpload(file);
    },
  });
  const { mutate: mutateDelete } = useDeleteFileMutation({
    onMutate: (fileId: string) => {
      onImagesChange((prev) => prev.filter((item) => item !== fileId));
    },
  });

  const { mutate: mutateUpload, isPending: isLoadingUpload } =
    useUploadFileMutation({
      onSuccess: (fileId: string) => {
        onImagesChange((prev) => [...prev, fileId]);
      },
    });

  const carouselData = useMemo(() => {
    if (images.length >= maxImages) {
      return images;
    }
    if (isLoadingUpload) {
      return [...images, "loading", "picker"];
    }
    return [...images, "picker"];
  }, [images, isLoadingUpload, maxImages]);

  return (
    <Box className="items-center">
      <Box>
        {carouselData
          .slice(0, 10)
          .reduce((rows: string[][], image: string, rowIndex: number) => {
            const width = window.innerWidth;
            const divider = width > 550 ? 3 : 2;
            if (rowIndex % divider === 0) {
              rows.push([]);
            }
            rows[rows.length - 1]!.push(image);
            return rows;
          }, [])
          .map((row: string[], rowIndex: number) => (
            <Box key={rowIndex} className="flex-row" style={{ gap: 14 }}>
              {row.map((image, colIndex) => (
                <Box key={colIndex}>
                  {image === "loading" ? (
                    <Spinner />
                  ) : image === "picker" ? (
                    <Box
                      onClick={handleFileUpload}
                      className="relative cursor-pointer"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 150,
                        width: 150,
                        borderWidth: 1,
                        borderColor: colors.appNeutral100,
                        borderRadius: 15,
                        margin: "10px 0",
                      }}
                    >
                      <Icon
                        color={colors.appNeutral300}
                        name="photo"
                        width={24}
                        height={24}
                      />
                      <Box className="absolute bottom-[-5px] right-[-5px] rounded-full bg-app-neutral-300">
                        <Icon
                          color={colors.appNeutral300}
                          name="plus"
                          width={24}
                          height={24}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box className="relative">
                      <ApiImage
                        imageId={image}
                        height={150}
                        width={150}
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: 15,
                          borderWidth: 1,
                          objectFit: "cover",
                          margin: "10px 0",
                          borderColor: colors.appNeutral100,
                        }}
                      />
                      <Box
                        onClick={() => mutateDelete(image)}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: 20,
                          cursor: "pointer",
                        }}
                      >
                        <Icon
                          name="remove"
                          width={15}
                          height={15}
                          color={colors.appNeutral300}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
      </Box>
      {Boolean(error) && <FieldError error={error!} />}
    </Box>
  );
};
