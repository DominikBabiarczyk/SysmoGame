import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, Text } from "../atoms";
import { Icon } from "@src/assets/Icon";
import { useTheme } from "@src/theme/theme";

interface ModalProps {
  width: string;
  height: string;
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  show: boolean;
}

export const Modal = ({
  show,
  onClose,
  children,
  title,
  width,
  height,
}: ModalProps) => {
  const { colors } = useTheme();
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <Box
      className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(166,166,166,0.8)]"
      onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
    >
      <Box
        style={{
          width: width,
          maxWidth: "95vw",
          height,
        }}
        className={`p-15 max-h-90vh scrollbar-hide drop-shadow(0px 10px 20px rgba(206, 207, 242, 0.23) relative	 z-10 overflow-y-auto rounded-lg bg-white filter`}
      >
        <Box
          className="mr-5 mt-5 flex items-end text-2xl"
          onClick={handleCloseClick}
        >
          <Icon
            color={colors.appNeutral300}
            name="close"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </Box>
        {title && (
          <Text className="text-primary-1000 mx-auto w-80 text-center text-lg font-bold">
            {title}
          </Text>
        )}
        <Box className="mx-10 pt-2">{children}</Box>
      </Box>
    </Box>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      //@ts-ignore
      modalContent,
      document.getElementById("modal-root") as Element,
    );
  } else {
    return null;
  }
};
