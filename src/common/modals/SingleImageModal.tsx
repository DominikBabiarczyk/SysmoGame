import React from "react";
import { Modal } from "./Modal";
import { ApiImage } from "../image/ApiImage";
import { Box } from "../atoms";

interface SingleImageModalProps {
  imageId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const SingleImageModal = ({
  isModalOpen,
  setIsModalOpen,
  imageId,
}: SingleImageModalProps) => {
  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="" width="100%" height="100%" show={isModalOpen} onClose={handleOnClose}>
      <Box className="max-h-[80vh] max-w-[90vw]">
        {imageId && (
          <ApiImage
            imageId={imageId}
            width={350}
            height={350}
            style={{
              width: "100%",
              height: "100%",
              maxWidth:'90vw',
              maxHeight:'80vh',
              minWidth: 350,
              justifyContent: "center",
              objectFit: "contain",
              margin: "auto",
            }}
          />
        )}
      </Box>
    </Modal>
  );
};
