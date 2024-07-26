import { AppTextarea } from "./AppTextarea";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { AppInputProps } from "./AppInput";

type OmitedProps = Omit<AppInputProps, "name" | "defaultValue" | "id">;

interface AppInputControlledProps<T extends FieldValues>
  extends UseControllerProps<T>,
    OmitedProps {
  label?: string;
}

export function AppTextareaControlled<T extends FieldValues>({
  label,
  ...props
}: AppInputControlledProps<T>) {
  const { field, fieldState } = useController(props);
  return (
    <>
      <label className="text-base text-app-neutral-300" htmlFor="">
        {label}
      </label>
      <AppTextarea
        id={field.name}
        //@ts-ignore
        height={100}
        value={field.value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          field.onChange(e.target.value)
        }
        onBlur={field.onBlur}
        error={fieldState.error?.message}
        {...props}
      />
    </>
  );
}
