import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { AppSelect, AppSelectProps } from "./AppSelect";

type OmitedProps = Omit<
  AppSelectProps,
  "name" | "id" | "onChange" | "onBlur" | "value"
>;

interface AppSelectControlledProps<T extends FieldValues>
  extends UseControllerProps<T>,
    OmitedProps {
  label: string;
}

export function AppSelectControlled<T extends FieldValues>({
  label,
  ...props
}: AppSelectControlledProps<T>) {
  const { field, fieldState } = useController(props);
  return (
    <AppSelect
      id={field.name}
      value={field.value as any}
      onChange={field.onChange as any}
      onBlur={field.onBlur as any}
      error={fieldState.error?.message}
      label={label}
      {...props}
    />
  );
}
