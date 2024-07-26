import React, { useState } from "react";
import { TFunction } from "@src/i18n/TFunction";
import { z } from "zod";
import { useT } from "@src/i18n/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppInputControlled } from "@src/common/inputs/AppInputControlled";
import { Box, Text } from "@src/common/atoms";
import { useTheme } from "@src/theme/theme";
import { AppCheckboxControlled } from "@src/common/inputs/AppCheckboxControlled";
import { useAuthStore } from "@src/stores/auth-store";
import { emailRegex, phoneRegex } from "@src/utils/validators";
import { AppButton } from "@src/common/buttons/AppButton";

function getSchema(t: TFunction) {
  const schema = z
    .object({
      login: z.string({ required_error: t("auth:error.required") }).refine(
        (val) => {
          const isEmail = emailRegex.test(val);
          const isPhoneNumber = phoneRegex.test(val);
          return isEmail || isPhoneNumber;
        },
        { message: t("auth:error.invalid-login") },
      ),
      password: z
        .string({ required_error: t("auth:error.required") })
        .min(8, t("auth:error.password-min", { length: 8 })),
      confirmPassword: z
        .string({ required_error: t("auth:error.required") })
        .min(8, t("auth:error.password-min", { length: 8 })),
      privacy: z.literal<boolean>(true, {
        errorMap: () => ({ message: t("auth:error.privacy") }),
      }),
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

export type RegisterSchema = z.infer<ReturnType<typeof getSchema>>;

interface RegisterFormProps {
  onSubmit: (data: RegisterSchema) => void;
  loading: boolean;
}

export const RegisterForm = ({ onSubmit, loading }: RegisterFormProps) => {
  const { t } = useT();
  const schema = getSchema(t);
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  type Schema = RegisterSchema;

  const { control, handleSubmit, getValues } = useForm<Schema>({
    mode: "onSubmit",
    defaultValues: {
      login: undefined,
      password: undefined,
      privacy: false,
    },
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = (data: Schema) => {
    useAuthStore.getState().setResetLogin(data.login);
    onSubmit(data);
  };

  // const onError = (e: any) => {
  //   console.log(getValues());
  //   console.error(e);
  // };

  return (
    <Box className="mt-4">
      <Text className="text-center  text-xl font-semibold text-app-neutral-300">
        {t("auth:register-title")}
      </Text>

      <AppInputControlled
        control={control}
        name="login"
        placeholder={t("auth:login-placeholder")}
        autoCapitalize="none"
        autoComplete="email"
        style={{ maxWidth: 320 }}
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
        style={{ maxWidth: 320 }}
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
        style={{ maxWidth: 320 }}
        placeholderTextColor={colors.appNeutral200}
        label={t("auth:confirm-password-placeholder")}
        required
        eyeIcon={{
          showPassword: showConfirmPassword,
          setShowPassword: setShowConfirmPassword,
        }}
      />

      <AppCheckboxControlled
        control={control}
        name="privacy"
        type="variant1"
        label={t("auth:privacy-policy")}
        required
      />

      <Box className="mt-10 items-center">
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
