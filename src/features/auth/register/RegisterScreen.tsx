import React from "react";
import { useRegisterMutation } from "@src/queries/auth.queries";
import { RegisterForm } from "./components/RegisterForm";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const RegisterScreen = () => {
  const router = useRouter();
  const registerMutation = useRegisterMutation({
    onSuccess() {
      toast.success("Verification code sent");
      router.push("/auth/code");
    },
  });
  return (
    <RegisterForm
      onSubmit={(data) => {
        registerMutation.mutate({
          login: data.login!,
          password: data.password!,
          acceptedRegulations: true,
        });
      }}
      loading={registerMutation.isPending}
    />
  );
};
