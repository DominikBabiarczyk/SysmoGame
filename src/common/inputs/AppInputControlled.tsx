import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { AppInput, AppInputProps } from "./AppInput";

interface AppInputControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends Omit<AppInputProps, "error"> {
  control: Control<TFieldValues>;
  inputType?: "password" | "text" | "number";
  placeholderTextColor?: string;
  name: TName;
}

export function AppInputControlled<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  control,
  inputType,
  placeholderTextColor,
  name,
  ...inputProps
}: AppInputControlledProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <AppInput
          inputType={inputType}
          placeholderTextColor={placeholderTextColor}
          onBlur={onBlur}
          // @ts-ignore
          onChange={onChange}
          value={value}
          error={error?.message}
          {...inputProps}
        />
      )}
      name={name}
    />
  );
}
