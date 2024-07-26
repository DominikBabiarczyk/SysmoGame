import { AuthApi } from "@src/api/auth-api";
import { useAuthStore } from "@src/stores/auth-store";
import { parseError } from "@src/utils/error";
import { toast } from "@src/utils/toast";
import { useMutation } from "@tanstack/react-query";

export function useLoginMutation(options: {
  onSuccess: (res: Awaited<ReturnType<typeof AuthApi.login>>) => Promise<void>;
}) {
  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: async (res) => {
      const token = res.accessToken;
      setToken(token);
      useAuthStore.getState().setToken(token);
      await options.onSuccess(res);
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useRegisterMutation(options: { onSuccess: () => void }) {
  const mutation = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: (res) => {
      if (res?.accessToken) {
        const token = res.accessToken;
        localStorage.setItem("jwt", token);
        useAuthStore.getState().setToken(token);
        options.onSuccess();
      } else {
        options.onSuccess();
      }
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useVerifyAccountMutation(options: {
  onSuccess: () => Promise<void>;
}) {
  const mutation = useMutation({
    mutationFn: AuthApi.confirmRegistration,
    onSuccess: async () => {
      await options.onSuccess();
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useSendCodeMutation(options?: { onSuccess: () => void }) {
  const mutation = useMutation({
    mutationFn: AuthApi.sendCode,
    onSuccess(res) {
      options?.onSuccess();
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useRequestPasswordResetMutation(options?: {
  onSuccess: () => void;
}) {
  const mutation = useMutation({
    mutationFn: AuthApi.requestPasswordReset,
    onSuccess(res) {
      toast.success(res.message);
      options?.onSuccess();
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useConfirmPasswordResetMutation(options?: {
  onSuccess: () => void;
}) {
  const mutation = useMutation({
    mutationFn: AuthApi.confirmPasswordReset,
    onSuccess(res) {
      options?.onSuccess();
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}
