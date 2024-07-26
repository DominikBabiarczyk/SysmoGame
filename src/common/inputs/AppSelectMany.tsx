import React from "react";

import Select from "react-select";
import { FieldError } from "../error/FieldError";
import { Box, Text } from "../atoms";
import { colors } from "@src/styles/colors";

type Data = {
  label: string;
  value: string;
};

export interface AppSelectManyProps {
  id: string;
  value?: string[];
  data: Data[];
  onChange: (values: string[]) => void;
  onBlur?: () => void;
  error?: string;
  label: string;
}
export function AppSelectMany({
  id,
  data,
  value = [],
  onChange,
  onBlur,
  error,
  label,
}: AppSelectManyProps) {
  const isError = Boolean(error);
  return (
    <Box className="relative">
      {isError && <FieldError error={error} />}
      <Text
        htmlFor={id}
        as="label"
        className="mb-2 text-sm font-medium text-slate-800"
      >
        {label}
      </Text>
      <Select<Data, true>
        isMulti
        instanceId={id}
        name={id}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: isError ? colors.danger[500] : colors.neutral[300],
          }),
        }}
        value={value.map((id) => {
          const label = data.find((item) => item.value === id)?.label;
          return {
            value: id,
            label: label || "",
          };
        })}
        onChange={(e) => {
          onChange(e.map((item) => item.value));
        }}
        onBlur={onBlur}
        options={data}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </Box>
  );
}
