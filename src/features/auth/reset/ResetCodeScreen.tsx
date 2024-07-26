import React, { useEffect } from "react";
import { ResetCodeForm, ResetCodeSchema } from "./components/ResetCodeForm";
import {
  useConfirmPasswordResetMutation,
  useRequestPasswordResetMutation,
} from "@src/queries/auth.queries";
import { toast } from "@src/utils/toast";
import { useT } from "@src/i18n/useTranslation";
import { useAuthStore } from "@src/stores/auth-store";
import { useRouter } from "next/router";

export const ResetCodeScreen = () => {
  const router = useRouter();
  const { t } = useT();
  const login = useAuthStore.getState().resetLogin;
  const password = useAuthStore.getState().resetPassword;

  useEffect(() => {
    if (!login || !password) {
      router.back();
    }
  }, []);

  const confirmResetPasswordMutation = useConfirmPasswordResetMutation({
    onSuccess() {
      toast.success(t("auth:reset-success"));
      router.push("/auth/login");
    },
  });

  const requestPasswordResetMutation = useRequestPasswordResetMutation({
    onSuccess() {},
  });
  return (
    <ResetCodeForm
      onResendCode={() => {
        requestPasswordResetMutation.mutate({
          login: login!,
        });
      }}
      onSubmit={(data: ResetCodeSchema) => {
        confirmResetPasswordMutation.mutate({
          login: login!,
          newPassword: password!,
          code: data.code!,
        });
      }}
      loading={confirmResetPasswordMutation.isPending}
    />
  );
};
