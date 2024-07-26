import React, { useState } from "react";
import { TFunction } from "@src/i18n/TFunction";
import { z } from "zod";
import { useT } from "@src/i18n/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppInputControlled } from "@src/common/inputs/AppInputControlled";
import { Box, Text } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import { emailRegex, phoneRegex } from "@src/utils/validators";
import { AppButton } from "@src/common/buttons/AppButton";

function getSchema(t: TFunction) {
  const schema = z
    .object({
      password: z
        .string({ required_error: t("auth:error.required") })
        .min(8, t("auth:error.password-min", { length: 8 })),
      confirmPassword: z
        .string({ required_error: t("auth:error.required") })
        .min(8, t("auth:error.password-min", { length: 8 })),
      login: z.string({ required_error: t("auth:error.required") }).refine(
        (val) => {
          const isEmail = emailRegex.test(val);
          const isPhoneNumber = phoneRegex.test(val);
          return isEmail || isPhoneNumber;
        },
        { message: t("auth:error.invalid-login") },
      ),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("auth:error.password-match"),
          path: ["confirmPassword"],
        });
      }
    });

  return schema;
}

export type ResetSchema = z.infer<ReturnType<typeof getSchema>>;

interface ResetFormProps {
  onSubmit: (data: ResetSchema) => void;
  loading: boolean;
}

export const ResetForm = ({ onSubmit, loading }: ResetFormProps) => {
  const { t } = useT();
  const schema = getSchema(t);
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  type Schema = ResetSchema;

  const { control, handleSubmit, getValues } = useForm<Schema>({
    mode: "onSubmit",
    defaultValues: {
      login: undefined,
      password: undefined,
      confirmPassword: undefined,
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
        name="login"
        placeholder={t("auth:login-placeholder")}
        autoCapitalize="none"
        autoComplete="email"
        placeholderTextColor={colors.appNeutral200}
        label={t("auth:login-label")}
        required
      />

      <AppInputControlled
        control={control}
        name="password"
        inputType={showPassword ? "text" : "password"}
        placeholder={t("auth:password-placeholder")}
        autoCapitalize="none"
        placeholderTextColor={colors.appNeutral200}
        label={t("auth:password-placeholder")}
        required
        eyeIcon={{
          showPassword: showPassword,
          setShowPassword: setShowPassword,
        }}
      />

      <AppInputControlled
        control={control}
        name="confirmPassword"
        inputType={showConfirmPassword ? "text" : "password"}
        placeholder={t("auth:confirm-password-placeholder")}
        autoCapitalize="none"
        placeholderTextColor={colors.appNeutral200}
        label={t("auth:confirm-password-placeholder")}
        required
        eyeIcon={{
          showPassword: showConfirmPassword,
          setShowPassword: setShowConfirmPassword,
        }}
      />

      <Box className="flex-end mt-9 items-center">
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
