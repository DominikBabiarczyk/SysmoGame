import React, { useState } from "react";
import { TFunction } from "@src/i18n/TFunction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppInputControlled } from "@src/common/inputs/AppInputControlled";
import { Box, Text } from "@src/common/atoms";
import { AppCheckboxControlled } from "@src/common/inputs/AppCheckboxControlled";
import { useTheme } from "@src/theme/theme";
import { useRouter } from "next/router";
import { emailRegex, phoneRegex } from "@src/utils/validators";
import { useTranslation } from "next-i18next";
import { AppButton } from "@src/common/buttons/AppButton";

function getSchema(t: TFunction) {
  const schema = z.object({
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
      .min(4, t("auth:error.password-min", { length: 4 })),
    privacy: z.literal<boolean>(true, {
      errorMap: () => ({ message: t("auth:error.privacy") }),
    }),
  });

  return schema;
}

export type LoginSchema = z.infer<ReturnType<typeof getSchema>>;

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void;
  loading: boolean;
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const { t } = useTranslation();
  const schema = getSchema(t);
  const router = useRouter();
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  type Schema = LoginSchema;

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
    onSubmit(data);
  };

  // const onError = (e: any) => {
  //   console.log(getValues());
  //   console.error(e);
  // };

  return (
    <Box className="mx-16 my-auto max-h-fit">
      <Text className="mb-10 text-center text-[58px] font-semibold  text-app-neutral-300">
        Template
      </Text>
      <Text className="mb-6 text-center  text-xl font-medium text-app-neutral-300">
        {t("auth:login-title")}
      </Text>

      <AppInputControlled
        control={control}
        name="login"
        placeholder={t("auth:login-placeholder")}
        autoCapitalize="none"
        autoComplete="email"
        label={t("auth:login-label")}
        style={{ maxWidth: 350 }}
        placeholderTextColor={colors.appNeutral200}
        required
      />

      <AppInputControlled
        control={control}
        name="password"
        inputType={showPassword ? "text" : "password"}
        placeholder={t("auth:password-placeholder")}
        autoCapitalize="none"
        label={t("auth:password-placeholder")}
        placeholderTextColor={colors.appNeutral200}
        required
        style={{ maxWidth: 350 }}
        eyeIcon={{
          showPassword,
          setShowPassword,
        }}
      />

      <Box onClick={() => router.push("/auth/reset")}>
        <Text
          className="my-3 cursor-pointer self-end text-app-neutral-300"
          style={{ fontSize: 10 }}
        >
          {t("auth:forgotten-password")}
        </Text>
      </Box>

      <AppCheckboxControlled
        control={control}
        name="privacy"
        type="variant1"
        label={t("auth:privacy-policy")}
        required
      />

      <Box className="mt-3 items-center">
        <AppButton
          title={t("common:btn.login")}
          onPress={handleSubmit(handleOnSubmit)}
          loading={loading}
          style={{
            maxWidth: 210,
          }}
        />
        <Box className="mt-10 flex-row items-center">
          <Box className=" w-[140px] bg-slate-600/30" style={{ height: 1 }} />
          <Text className="px-2">{t("common:or")}</Text>
          <Box className=" w-[140px] bg-slate-600/30" style={{ height: 1 }} />
        </Box>
      </Box>

      <Box className="mt-5 flex-row items-center justify-center font-medium text-app-neutral-200 ">
        <Text>{t("auth:register-text-1")}</Text>
        <Box onClick={() => router.push("/auth/register")}>
          <Text className="ml-2 cursor-pointer text-app-neutral-200 underline">
            {t("auth:register-text-2")}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
