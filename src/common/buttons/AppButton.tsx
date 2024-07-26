import { Box, Text } from "@src/common/atoms";
import { Spinner } from "@src/common/ui/Spinner";
import { useTheme } from "@src/theme/theme";
import React, { CSSProperties } from "react";
import { Icon } from "@src/assets/Icon";

interface AppButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType?: "default" | "text";
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: {
    name: React.ComponentProps<typeof Icon>["name"];
    fill?: string;
  };
  textStyle?: CSSProperties;
  id?: string;
}

export const AppButton = ({
  buttonType = "default",
  title,
  style,
  onPress,
  loading,
  disabled = false,
  icon,
  textStyle,
  id,
}: AppButtonProps) => {
  const { colors } = useTheme();

  const backgroundColor =
    buttonType === "default" ? colors.primary500 : undefined;
  const textColor =
    buttonType === "default" ? colors.neutral100 : colors.primary500;

  return (
    <button
      id={id}
      disabled={loading || disabled}
      onClick={onPress}
      style={{
        width: "100%",
        borderRadius: 20,
        backgroundColor: backgroundColor,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Box
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon && (
          <Icon name={icon.name} color={icon.fill} width={20} height={20} />
        )}
        {!loading && (
          <Text style={{ color: textColor, ...textStyle }}>{title}</Text>
        )}
        {loading && (
          <Box>
            <Spinner width={15} height={15} />
          </Box>
        )}
      </Box>
    </button>
  );
};
