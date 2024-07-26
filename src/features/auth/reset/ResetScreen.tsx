import React, { useState } from "react";
import { ResetForm } from "./components/ResetForm";
import { useRequestPasswordResetMutation } from "@src/queries/auth.queries";
import { useAuthStore } from "@src/stores/auth-store";
import { useRouter } from "next/router";

export const ResetScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const requestPasswordResetMutation = useRequestPasswordResetMutation({
    onSuccess() {
      useAuthStore.getState().setResetLogin(login);
      useAuthStore.getState().setResetPassword(password);
      router.push("/auth/reset-code");
    },
  });
  return (
    <ResetForm
      onSubmit={(data) => {
        setLogin(data.login);
        setPassword(data.password);
        requestPasswordResetMutation.mutate({
          login: data.login!,
        });
      }}
      loading={requestPasswordResetMutation.isPending}
    />
  );
};
