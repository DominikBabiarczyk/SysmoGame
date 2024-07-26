import React from "react";
import Image from "next/image";
import { Box } from "@src/common/atoms";
interface LanguageButtonProps {
  onPress: () => void;
  isSelected: boolean;
  image: any;
}

export const LanguageButton = ({
  onPress,
  isSelected,
  image,
}: LanguageButtonProps) => {
  return (
    <Box className="cursor-pointer" onClick={onPress}>
      <Image
        src={image}
        alt="Language"
        style={{
          objectFit: "cover",
          cursor: "pointer",
          width: 25,
          height: 25,
          opacity: isSelected ? 1 : 0.2,
          borderRadius: 100,
          borderWidth: 1,
          border: "1px solid",
          borderColor: isSelected ? "#000" : "#c4c4c4",
        }}
      />
    </Box>
  );
};
