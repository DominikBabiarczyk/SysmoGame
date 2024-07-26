import React, { ReactNode } from "react";
import { Box } from "../atoms";
import { Modal } from "./Modal";
import { Icon } from "@src/assets/Icon";
import { useTheme } from "@src/theme/theme";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  content: ReactNode;
  title?: string;
}

export const AppModal = ({
  visible,
  onClose,
  content,
  title,
}: AppModalProps) => {
  const { colors } = useTheme();
  return (
    <Modal
      width={"500px"}
      height="300px"
      show={visible}
      title={title as string}
      onClose={onClose}
    >
      <Box
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className="px-10  py-8"
          style={{
            borderRadius: 16,
            backgroundColor: "white",
            width: "90%",
          }}
        >
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Box onClick={onClose}>
              <Icon
                name="close"
                width={18}
                height={18}
                color={colors.appNeutral300}
              />
            </Box>
          </Box>

          {content}
        </Box>
      </Box>
    </Modal>
  );
};
