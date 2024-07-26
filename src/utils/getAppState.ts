import { UserApi } from "@src/api/user-api";
import { CurrentUser } from "@src/models/user";
import { AppState, useAppStateStore } from "@src/stores/app-state-store";
import { useAuthStore } from "@src/stores/auth-store";
import { useUserStore } from "@src/stores/user-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface GetAppStateOptions {}

export async function getAppState(
  token: string | null,
  getCurrentUser: () => Promise<CurrentUser>,
  _options: GetAppStateOptions,
): Promise<[nextState: AppState, user: CurrentUser | null]> {
  if (!token) {
    return ["NEED_AUTH", null];
  }

  const user = await getCurrentUser();
  if (user.appStatus === "CONFIGURE") {
    return ["CONFIGURE_PROFILE", user];
  }

  if (user.appStatus === "VERIFY") {
    return ["VERIFY", user];
  }

  if (user.appStatus === "WAIT_FOR_ADMIN_APPROVAL") {
    return ["WAIT_FOR_ADMIN_APPROVAL", user];
  }

  return ["AUTHORIZED", user];
}

export async function initApp(
  options: GetAppStateOptions,
): Promise<[AppState, unknown]> {
  try {
    await new Promise((r) => setTimeout(r, 1500));
    const token = localStorage.getItem("jwt") || null;
    useAuthStore.getState().setToken(token);
    const [nextState, user] = await getAppState(
      token,
      UserApi.getCurrentUser,
      options,
    );
    useUserStore.getState().setUser(user);
    useAppStateStore.getState().setAppState(nextState);
    return [nextState, null];
  } catch (e) {
    useAppStateStore.getState().setAppState("NEED_AUTH");
    return ["NEED_AUTH", e];
  }
}

export async function logoutUser() {
  useAppStateStore.getState().setAppState("NEED_AUTH");
  useAuthStore.getState().setToken(null);
}

export async function handleAppStateRedirect(
  state: string,
  componentRole?: string,
) {
  console.log(state, componentRole);
  return;
  if (state === "WAIT_FOR_ADMIN_APPROVAL") {
    if (componentRole && componentRole === "USER") {
      return "/auth/social-verification";
    }
    return;
  }
  if (state === "CONFIGURE_PROFILE") {
    //USER IS ALREADY ON CONFIGURATION SCREENS
    if (componentRole && componentRole === "CONFIGURATION") {
      return;
    }
    return "/auth/role";
  }
  if (state === "AUTHORIZED") {
    //USER IS ALREADY ON USER SCREENS
    if (componentRole && componentRole === "USER") {
      return;
    }
    return "/products/list";
  }
  if (state === "VERIFY") {
    //USER IS ALREADY ON VERIFICATION SCREENS
    if (componentRole && componentRole === "VERIFICATION") {
      return;
    }
    return "/auth/code";
  }
  if (state === "NEED_AUTH") {
    //USER IS ALREADY ON AUTH SCREENS
    if (componentRole && componentRole === "AUTH") {
      return;
    }
    return "/auth/login";
  }
  return "/auth/login";
}

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    logoutUser();
    queryClient.clear();
  };
  return logout;
}
