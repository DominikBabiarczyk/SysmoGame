import React, { useState } from "react";
import { Box, Text } from "@src/common/atoms";
import {
  useSendCodeMutation,
  useVerifyAccountMutation,
} from "@src/queries/auth.queries";
import { useT } from "@src/i18n/useTranslation";
import { toast } from "@src/utils/toast";
import { VerifyCodeInput } from "./components/VerifyCodeInput";
import { initApp } from "@src/utils/getAppState";
import { useAuthStore } from "@src/stores/auth-store";
import { useRouter } from "next/router";
import { AppButton } from "@src/common/buttons/AppButton";

export const CodeScreen = () => {
  const { t } = useT();
  const [code, setCode] = useState("");
  const router = useRouter();
  const verifyMutation = useVerifyAccountMutation({
    async onSuccess() {
      await initApp({});
      toast.success(t("auth:verify-success"));
      router.push("/auth/login");
    },
  });

  const sendCodeMutation = useSendCodeMutation({
    onSuccess() {
      toast.success(t("auth:sent-success"));
      router.push("/auth/login");
    },
  });

  return (
    <Box>
      <Text className="mb-20 text-center text-[56px]  font-semibold  text-app-neutral-300">
        Template
      </Text>
      <Text className="mb-5 text-center text-xl text-app-neutral-300">
        {t("auth:code-title")}
      </Text>

      <VerifyCodeInput value={code} onChange={setCode} />

      {/* <Box onClick={() => sendCodeMutation.mutate()}>
        <Text className="ml-1 mt-2 cursor-pointer self-start text-xs text-app-neutral-300">
          {t("auth:resend")}
        </Text>
      </Box> */}

      <Box className="mt-16 items-center">
        <AppButton
          title={t("common:btn.continue")}
          loading={verifyMutation.isPending}
          onPress={() =>
            verifyMutation.mutate({
              code: code,
              login: useAuthStore.getState().resetLogin ?? "",
            })
          }
          style={{
            maxWidth: 210,
          }}
        />
      </Box>
    </Box>
  );
};
