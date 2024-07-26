import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import Slider, { SliderProps } from "rc-slider";
import "rc-slider/assets/index.css";
import { Box, Text } from "../atoms";
import React from "react";

interface AppSliderControlledProps<T extends FieldValues> extends SliderProps {
  useControlProps: UseControllerProps<T>;
  label?: string;
}

export const AppSliderControlled = <T extends FieldValues>({
  useControlProps,
  label,
  ...props
}: AppSliderControlledProps<T>) => {
  const { field, fieldState } = useController(useControlProps);
  return (
    <Box>
      {label ? <Text>{label}</Text> : null}
      <Slider
        {...props}
        min={0}
        value={field.value}
        max={60}
        onChange={(_newValue) => {
          const newValue = _newValue as number;
          field.onChange(newValue);
        }}
      />
    </Box>
  );
};
