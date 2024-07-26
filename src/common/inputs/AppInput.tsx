import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Box, Text } from "../atoms";
import { Icon } from "@src/assets/Icon";
import { useTheme } from "@src/theme/theme";
import { FieldError } from "../error/FieldError";

export interface AppInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  type?: "default" | "line";
  inputType?: "password" | "text" | "number";
  placeholderTextColor?: string;
  rightText?: string;
  required?: boolean;
  eyeIcon?: {
    setShowPassword: (show: boolean) => void;
    showPassword: boolean;
  };
}

export const AppInput = ({
  rightText,
  type = "default",
  label,
  style,
  error,
  inputType,
  required,
  eyeIcon,
  placeholderTextColor,
  ...rest
}: AppInputProps) => {
  const { colors } = useTheme();
  const isError = Boolean(error);
  const borderColor = isError ? colors.danger500o5 : colors.appNeutral100;

  const commonStyles = {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: borderColor,
    height: 44,
    padding: "0px 10px",
    color: colors.primary500,
  };

  const lineStyles =
    type === "line"
      ? {
          borderWidth: "unset",
          borderColor: "unset",
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomColor: colors.appNeutral100,
          fontSize: 12,
          borderRadius: 0,
          paddingHorizontal: "unset",
        }
      : {};

  const finalStyles = {
    ...commonStyles,
    ...lineStyles,
  };

  const placeholderStyles = {
    "::placeholder": {
      color: placeholderTextColor ?? "#2F354C",
    },
  };
  return (
    <Box
      style={{
        position: "relative",
        marginTop: 16,
        width: "100%",
        maxWidth: "100%",
        ...style,
      }}
    >
      {label && type !== "line" && (
        <Box className="flex-row items-start">
          <Text
            className="text-base text-app-neutral-300"
            style={{ marginBottom: 4 }}
          >
            {label}
          </Text>
          {required && (
            <Icon
              color={colors.appNeutral300}
              name="asterisk"
              width={8}
              height={8}
              className="mt-2"
            />
          )}
        </Box>
      )}
      <Box>
        <input
          style={{
            ...finalStyles,
            ...placeholderStyles,
            opacity: rest.disabled ? "0.4" : 1,
          }}
          disabled={rest.disabled ?? false}
          type={inputType ?? "text"}
          placeholder={type === "line" ? label : undefined}
          {...rest}
        />
        {eyeIcon && (
          <Box
            onClick={() => eyeIcon.setShowPassword(!eyeIcon.showPassword)}
            style={{
              position: "absolute",
              right: 20,
              bottom: 12,
            }}
          >
            <Icon
              name={eyeIcon.showPassword ? "visibilityoff" : "visibilityon"}
              width={20}
              height={20}
              color={colors.appNeutral300}
              className="cursor-pointer"
            />
          </Box>
        )}
      </Box>
      {isError && type === "line" && <FieldError error={error!} />}

      {Boolean(rightText) && (
        <Box className="absolute right-2 top-2">
          <Text className="text-base text-[#3D5467]">{rightText}</Text>
        </Box>
      )}
    </Box>
  );
};
