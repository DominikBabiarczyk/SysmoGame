import React from "react";
import { FieldError } from "../error/FieldError";
import { Icon } from "@src/assets/Icon";
import { Box, Text } from "../atoms";
import { cn } from "@src/styles/cn";
import { useTheme } from "@src/theme/theme";

interface AppCheckBoxProps {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
  type?: string;
  error?: string;
  hint?: string;
  labelClassName?: string;
  required?: boolean;
}

export const AppCheckbox = ({
  value,
  onChange,
  type,
  label,
  error,
  hint,
  labelClassName,
  required,
}: AppCheckBoxProps) => {
  const { colors } = useTheme();
  if (type === "variant1") {
    return (
      <Box onClick={() => onChange(!value)}>
        <Box
          className="mt-3 cursor-pointer flex-row items-center justify-center"
          style={{ gap: 10 }}
        >
          <Box className="flex-row">
            <Text className="text-xs text-app-neutral-300">{label}</Text>
            {required && (
              <Icon
                color={colors.appNeutral300}
                name="asterisk"
                width={6}
                height={6}
              />
            )}
          </Box>
          <Box
            className={cn(
              "h-3 w-3 items-center justify-center rounded-full border border-app-neutral-300/80",
            )}
          >
            {value && (
              <Box className="h-1 w-1 rounded-full bg-app-neutral-300/80" />
            )}
          </Box>
        </Box>
        {Boolean(error) && (
          <Box className="self-center">
            <FieldError error={error!} />
          </Box>
        )}
      </Box>
    );
  } else {
    return (
      <Box
        style={{
          margin: "16px 0px",
          position: "relative",
          padding: "0 4px",
        }}
        onClick={() => onChange(!value)}
      >
        <Box className="flex-row items-center justify-between border-b border-b-app-neutral-300/50 pb-2">
          <Text
            className={cn(
              "select-none text-sm font-semibold text-app-neutral-300",
              labelClassName,
            )}
          >
            {label}
          </Text>
          <Box
            className={cn(
              "h-5 w-5 items-center justify-center rounded-full border border-app-neutral-300/80",
            )}
          >
            {value && (
              <Box className="h-3 w-3 rounded-full bg-app-neutral-300/80" />
            )}
          </Box>
        </Box>
        {Boolean(hint) && (
          <Box className="mt-2 flex-row items-center">
            <Text
              className="text-regular mr-1 text-app-neutral-300"
              style={{ fontSize: 10 }}
            >
              {hint}
            </Text>
            <Icon
              color={colors.appNeutral300}
              name="alert"
              width={30}
              height={30}
            />
          </Box>
        )}
        {Boolean(error) && <FieldError error={error!} />}
      </Box>
    );
  }
};
