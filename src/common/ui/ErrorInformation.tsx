import React from "react";
import { Box, Text } from "../atoms";
import { useT } from "@src/i18n/useTranslation";
import { parseError } from "@src/utils/error";

interface ErrorInformationProps {
  error: unknown;
  onRefresh?: () => void;
  canGoBack?: boolean;
}

export const ErrorInformation = ({
  error,
  onRefresh,
  canGoBack,
}: ErrorInformationProps) => {
  const { t } = useT();
  const message = parseError(error).message;

  return (
    <Box className="m-auto w-fit text-center">
      <Text>{message}</Text>
    </Box>
  );
};
