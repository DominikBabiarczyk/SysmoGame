import React from "react";

import Select from "react-select";
import { FieldError } from "../error/FieldError";
import { Box, Text } from "../atoms";
import { colors } from "@src/styles/colors";

type Data = {
  label: string;
  value: string;
};

export interface AppSelectProps {
  id: string;
  value?: string;
  data: Data[];
  onChange: (values: string) => void;
  onBlur?: () => void;
  error?: string;
  label: string;
  placeholder: string;
}
export function AppSelect({
  id,
  data,
  value = undefined,
  onChange,
  onBlur,
  error,
  label,
  placeholder,
}: AppSelectProps) {
  const isError = Boolean(error);
  return (
    <Box className="relative">
      {isError && <FieldError error={error} />}
      <Text
        htmlFor={id}
        as="label"
        className="text-base text-app-neutral-300"
        style={{ marginBottom: 4 }}
      >
        {label}
      </Text>
      <Select<Data, false>
        name={id}
        instanceId={id}
        placeholder={placeholder}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: isError ? colors.danger[500] : "#979797",
            borderRadius: 10,
            height: 44,
            opacity: 1,
          }),
          option: (base, { isSelected, isFocused }) => ({
            ...base,
            backgroundColor: isSelected
              ? "#3D5467"
              : isFocused
              ? "#E5E5E5"
              : "white",
            color: isSelected ? "white" : "black",
          }),
          menu: (base) => ({
            ...base,
            marginTop: 0,
            width: "97%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }),
        }}
        value={data.find((item) => item.value === value)}
        onChange={(e) => {
          if (e?.value) {
            onChange(e.value);
          }
        }}
        onBlur={onBlur}
        options={data}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </Box>
  );
}
