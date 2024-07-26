import React from "react";
import { useT } from "@src/i18n/useTranslation";
import { Box } from "@src/common/atoms";
import { AppButton } from "@src/common/buttons/AppButton";
import { SpinnerWrapped } from "../ui/SpinnerWrapped";
import { Modal } from "./Modal";

interface ConfirmationModalProps {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  handleConfirm,
  isLoading,
}: ConfirmationModalProps) => {
  const { t } = useT();
  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <SpinnerWrapped />;
  }

  return (
    <Modal
      width="500px"
      height="300px"
      show={isModalOpen}
      onClose={handleOnClose}
      title={title}
    >
      <Box className="">
        <Box className="mt-10">
          <Box className="mb-4">
            <AppButton
              title={t("common:yes")}
              onPress={handleConfirm}
              style={{
                maxWidth: 210,
              }}
            />
            <AppButton title={t("common:yes")} onClick={handleConfirm} />
          </Box>
          <AppButton
            title={t("common:no")}
            onPress={handleOnClose}
            style={{
              maxWidth: 210,
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};
