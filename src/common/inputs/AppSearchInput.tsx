import { Icon } from "@src/assets/Icon";
import React, { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react";
import { Box } from "../atoms";
import { useTheme } from "@src/theme/theme";

interface AppSearchInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onResetText?: () => void;
  onFiltersPress?: () => void;
  iconRight?: React.JSX.Element | null;
}

export const AppSearchInput = ({
  onChange,
  onResetText,
  onFiltersPress,
  iconRight,
  ...props
}: AppSearchInputProps) => {
  const {colors} = useTheme()
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Box
      style={{
        gap: 8,
      }}
      className="border-app-neutral-400/95 m-auto h-12 max-w-[400px] flex-row items-center rounded-3xl border bg-white pl-4 pr-4 "
    >
      <Box onClick={() => ref.current?.focus()}>
        <Icon color={colors.appNeutral300} name="magnifier" width={20} height={20} />
      </Box>
      <input
        ref={ref}
        style={{
          flex: 1,
          height: 48,
          borderRadius: 15,
          fontSize: 16,
          color: "#00000088",
          background: "transparent",
        }}
        onChange={onChange}
        {...props}
      />
      {iconRight !== undefined ? (
        iconRight
      ) : (
        <Box
          onClick={() => {
            //@ts-ignore
            onChange?.({ target: { value: "" } });
            onResetText?.();
          }}
        >
          {onFiltersPress && (
            <Box className="cursor-pointer" onClick={onFiltersPress}>
              <Icon color={colors.appNeutral300} name="filter" width={20} height={20} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
