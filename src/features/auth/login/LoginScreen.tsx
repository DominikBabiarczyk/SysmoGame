import React from "react";
import {
  useLoginMutation,
  useSendCodeMutation,
} from "@src/queries/auth.queries";
import { LoginForm } from "./LoginForm";
import { useRouter } from "next/router";
import { initApp, logoutUser } from "@src/utils/getAppState";

export const LoginScreen = () => {
  const sendCodeMutation = useSendCodeMutation();
  const router = useRouter();
  const loginMutation = useLoginMutation({
    async onSuccess() {
      const currentAppState = await initApp({});
      if (currentAppState[0] === "VERIFY") {
        sendCodeMutation.mutate();
        router.push("/auth/code");
        return;
      }
      if (currentAppState[0] === "WAIT_FOR_ADMIN_APPROVAL") {
        router.push("/auth/social-verification");
        return;
      }
      router.push("/");
    },
  });

  return (
    <LoginForm
      onSubmit={(data) => {
        loginMutation.mutate({
          login: data.login!,
          password: data.password!,
        });
      }}
      loading={loginMutation.isPending}
    />
  );
};
