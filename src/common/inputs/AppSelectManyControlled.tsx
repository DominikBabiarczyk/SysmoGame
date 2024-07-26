import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { AppSelectMany, AppSelectManyProps } from "./AppSelectMany";

type OmitedProps = Omit<
  AppSelectManyProps,
  "name" | "id" | "onChange" | "onBlur" | "value" | "defaultValue"
>;

interface AppSelectManyControlledProps<T extends FieldValues>
  extends UseControllerProps<T>,
    OmitedProps {
  label: string;
}

export function AppSelectManyControlled<T extends FieldValues>({
  label,
  ...props
}: AppSelectManyControlledProps<T>) {
  const { field, fieldState } = useController(props);
  return (
    <AppSelectMany
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
