import React from "react";
import { TFunction } from "@src/i18n/TFunction";
import { z } from "zod";
import { useT } from "@src/i18n/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppInputControlled } from "@src/common/inputs/AppInputControlled";
import { Box, Text } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import { AppButton } from "@src/common/buttons/AppButton";

function getSchema(t: TFunction) {
  const schema = z.object({
    code: z.string({ required_error: t("auth:error.required") }),
  });

  return schema;
}

export type ResetCodeSchema = z.infer<ReturnType<typeof getSchema>>;

interface ResetCodeFormProps {
  onResendCode: () => void;
  onSubmit: (data: ResetCodeSchema) => void;
  loading: boolean;
}

export const ResetCodeForm = ({
  onResendCode,
  onSubmit,
  loading,
}: ResetCodeFormProps) => {
  const { t } = useT();
  const schema = getSchema(t);
  const { colors } = useTheme();
  type Schema = ResetCodeSchema;

  const { control, handleSubmit, getValues } = useForm<Schema>({
    mode: "onSubmit",
    defaultValues: {
      code: undefined,
    },
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = (data: Schema) => {
    onSubmit(data);
  };

  // const onError = (e: any) => {
  //   console.log(getValues());
  //   console.error(e);
  // };

  return (
    <Box className="mx-16">
      <Text className="mb-6 mt-10 text-center text-xl font-semibold text-app-neutral-300">
        {t("auth:reset-title")}
      </Text>

      <AppInputControlled
        control={control}
        name="code"
        placeholder={t("auth:code-placeholder")}
        autoCapitalize="none"
        placeholderTextColor={colors.appNeutral200}
        label={t("auth:code-placeholder")}
        required
      />

      <Box onClick={onResendCode}>
        <Text className="mt-2 cursor-pointer self-start text-xs text-app-neutral-300">
          {t("auth:resend")}
        </Text>
      </Box>

      <Box className="mt-40 items-center">
        <AppButton
          title={t("common:btn.continue")}
          onPress={handleSubmit(handleOnSubmit)}
          loading={loading}
          style={{
            maxWidth: 210,
          }}
        />
      </Box>
    </Box>
  );
};
