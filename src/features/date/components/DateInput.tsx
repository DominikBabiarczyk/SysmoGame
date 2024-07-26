import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Text, Box } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import { FieldError } from "@src/common/error/FieldError";
import { Icon } from "@src/assets/Icon";
import { DatePickerComponent } from "./DatePicker";

function getFormattedDate(date?: Date, placeholder = "") {
  if (!date) {
    return placeholder;
  }
  return dayjs(date).format("YYYY-MM-DD");
}

function getFormattedTime(date?: Date, placeholder = "") {
  if (!date) {
    return placeholder;
  }
  return dayjs(date).format("HH:mm");
}

interface DateInputProps {
  date?: Date;
  onDateChange: (date: Date) => void;
  error?: string;
  placeholder?: string;
  initialDate?: Date;
  mode?: "date" | "time";
  maximumDate?: Date;
  minimunDate?: Date;
  type?: "default" | "curve" | "line";
  label?: string;
  required?: boolean;
}

export const DateInput = ({
  date,
  onDateChange,
  error,
  placeholder,
  initialDate = new Date(),
  mode = "date",
  maximumDate,
  minimunDate,
  type,
  label,
  required,
}: DateInputProps) => {
  const [open, setOpen] = useState(false);
  const text = useMemo(() => {
    if (mode === "date") {
      return getFormattedDate(date, placeholder);
    }

    return getFormattedTime(date, placeholder);
  }, [date, mode, placeholder]);
  function _onDateChange(newDate: Date) {
    setOpen(false);
    onDateChange(newDate);
  }
  function onPressInput() {
    setOpen(true);
  }
  const { colors } = useTheme();
  const isError = Boolean(error);

  const borderColor = isError ? colors.danger500o5 : colors.neutral300;

  const commonStyles = {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: borderColor,
    height: 44,
    paddingHorizontal: 10,
    justifyContent: "center",
  };

  const curveStyles =
    type === "curve"
      ? {
          borderRadius: 15,
          borderBottomRightRadius: 55,
          borderWidth: 1,
          borderColor: colors.appNeutral100,
        }
      : {};

  const finalStyles = {
    ...commonStyles,
    ...curveStyles,
  };
  return (
    <Box className="relative" style={{ marginTop: 16 }}>
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
      <Box style={{ ...finalStyles }} onClick={onPressInput}>
        <Text className={"text-lg text-app-neutral-200"}></Text>
      </Box>
      {isError && type === "curve" && <FieldError error={error!} />}
      {isError && type !== "curve" && <FieldError error={error!} />}
      <Box className="absolute left-[2px] top-[35px] w-full">
        <DatePickerComponent
          value={date || initialDate}
          onChange={onDateChange}
        />
      </Box>
    </Box>
  );
};
