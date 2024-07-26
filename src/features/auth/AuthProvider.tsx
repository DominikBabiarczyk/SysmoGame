import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth-store";
import { useSetCurrentUserQuery } from "@src/queries/user.queries";
import { handleAppStateRedirect, initApp } from "@src/utils/getAppState";
import { useAppStateStore } from "@src/stores/app-state-store";
import { SpinnerWrapped } from "@src/common/ui/SpinnerWrapped";

interface AuthProviderProps {
  children: JSX.Element;
  role: PageAuthUserRole;
}

export type PageAuthUserRole =
  | "USER"
  | "ADMIN"
  | "BOTH"
  | "GUEST"
  | "AUTH"
  | "CONFIGURATION"
  | "VERIFICATION";

export function AuthProvider({ children, role }: AuthProviderProps) {
  const stateToken = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
  const appState = useAppStateStore((state) => state.appState);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const updateCurrentUserQuery = useSetCurrentUserQuery();
  useEffect(() => {
    async function checkAuth() {
      const storageToken = localStorage.getItem("jwt");
      if (storageToken) {
        setToken(storageToken);
      }
      if (role === "GUEST") {
        setLoading(false);
        return;
      }
      const token = stateToken || storageToken;

      if (
        !token &&
        !router.pathname.includes("/auth/login") &&
        role !== "AUTH"
      ) {
        return router.push("/auth/login");
      }

      // IF LOGGED IN USER TRIES TO GO TO GUARDED AUTH PAGES LIKE: LOGIN PAGE
      if (token && role === "AUTH") {
        return router.push("/");
      }

      setLoading(false);
    }
    checkAuth();
  }, [role, router, setToken, stateToken, updateCurrentUserQuery, appState]);

  if (loading) {
    return <SpinnerWrapped />;
  }

  return children;
}
