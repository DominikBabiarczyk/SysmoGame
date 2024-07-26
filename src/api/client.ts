import { useAuthStore } from "@src/stores/auth-store";
import axios, { isAxiosError } from "axios";
import { env } from "../../env";
import { LanguageStorage } from "@src/i18n/language-storage";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL + "/api/",
});

api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] =
    LanguageStorage.getLanguage()?.language || "de";
  config.headers["Content-Language"] =
    LanguageStorage.getLanguage()?.language || "de";
  const token = useAuthStore.getState().token ?? localStorage.getItem("jwt");
  if (token) {
    // @ts-ignore
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

api.interceptors.response.use(
  (c) => {
    return c;
  },
  (err) => {
    if (isAxiosError(err)) {
      if (err.response?.status === 401) {
        useAuthStore.getState().setToken(null);
      }
    }
    return Promise.reject(err);
  },
);
