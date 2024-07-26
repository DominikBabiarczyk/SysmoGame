import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { AppInputProps, VerifyCodeInput } from "./VerifyCodeInput";

type OmitedProps = Omit<AppInputProps, "name" | "defaultValue" | "id">;

interface AppInputControlledProps<T extends FieldValues>
  extends UseControllerProps<T>,
    OmitedProps {
  label?: string;
}

export function VerifyCodeControlled<T extends FieldValues>({
  label,
  ...props
}: AppInputControlledProps<T>) {
  const { field, fieldState } = useController(props);
  return (
    <VerifyCodeInput
      id={field.name}
      //@ts-ignore
      value={field.value}
      //@ts-ignore
      onChange={(e) => field.onChange(e)}
      error={fieldState.error?.message}
      {...props}
    />
  );
}
