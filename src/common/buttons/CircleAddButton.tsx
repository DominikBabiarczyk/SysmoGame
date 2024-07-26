import { Icon } from "@src/assets/Icon";
import { Box } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import React from "react";

interface CircleAddButtonProps {
  onPress: () => void;
}

export const CircleAddButton = ({ onPress }: CircleAddButtonProps) => {
  const { colors } = useTheme();
  return (
    <Box className="flex-row justify-end py-2">
      <Box onClick={onPress}>
        <Box
          style={{
            width: 26,
            height: 26,
            borderRadius: 10,
          }}
          className="items-center justify-center bg-black"
        >
          <Icon name="plus" color={colors.neutral000} width={30} height={30} />
        </Box>
      </Box>
    </Box>
  );
};
