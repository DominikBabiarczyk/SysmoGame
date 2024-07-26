import { create } from "zustand";

interface AuthStore {
  token: string | null;
  setToken: (v: string | null) => void;
  resetLogin:string |null;
  resetPassword:string |null;
  setResetLogin: (v: string | null) => void;
  setResetPassword: (v: string | null) => void;

}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  resetLogin:null,
  resetPassword:null,
  setToken: (value) => {
    if (value) {
      localStorage.setItem("jwt", value);
    } else {
      localStorage.removeItem("jwt");
    }
    set({ token: value });
  },
  setResetLogin: (value) => {
    set({ resetLogin: value });
  },
  setResetPassword: (value) => {
    set({ resetPassword: value });
  },
}));
