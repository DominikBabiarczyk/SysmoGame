import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuthStore } from "../../../stores/auth-store";

export function useLogout() {
  const queryClient = useQueryClient();

  const setToken = useAuthStore((state) => state.setToken);

  const logout = useCallback(() => {
    setToken(null);
    queryClient.clear();
  }, [queryClient, setToken]);

  return logout;
}
