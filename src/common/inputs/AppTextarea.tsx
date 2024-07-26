import { cn } from "@src/styles/cn";
import { FieldError } from "../error/FieldError";
import { Box } from "../atoms";
import { useTheme } from "@src/theme/theme";

interface AppTextareaProps {
  error?: string;
  id?: string;
  placeholder?: string;
  height?: number;
}

export const AppTextarea = ({
  error,
  id,
  height,
  ...props
}: AppTextareaProps) => {
  const { colors } = useTheme();

  const isError = Boolean(error);
  const borderColor = isError ? colors.danger500o5 : colors.appNeutral100;
  return (
    <Box className="relative">
      {isError && <FieldError error={error} />}
      <textarea
        {...props}
        placeholder={props?.placeholder ?? ""}
        id={id}
        style={{
          border: `1px solid ${borderColor}`,
          height: 44,
          padding: "0px 10px",
          color: colors.primary500,
          borderRadius: "10px",
          resize: "none",
          width: "100%",
        }}
        className={cn(
          `relative flex  min-h-[${
            height ?? 70
          }px] w-full items-center justify-center  bg-white  p-2 py-2 pr-8  `,
          {
            "border-danger-500": isError,
          },
        )}
      ></textarea>
    </Box>
  );
};
