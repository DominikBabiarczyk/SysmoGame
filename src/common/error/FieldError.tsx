import { Box, Text } from "../atoms";

interface FieldErrorProps {
  error: string | undefined;
}

export const FieldError = ({ error }: FieldErrorProps) => {
  return (
    <Box className="0 absolute -right-4 top-0 z-10  rounded bg-danger-500/[0.6] p-1 shadow">
      <Text className="font-regular text-sm text-neutral-100">{error}</Text>
    </Box>
  );
};
