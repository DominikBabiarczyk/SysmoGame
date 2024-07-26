import { CurrentUser } from "@src/models/user";
import { api } from "./client";

export namespace AuthApi {
  export interface LoginReq {
    login: string;
    password: string;
  }
  export interface LoginRes {
    data: {
      accessToken: string;
      user: CurrentUser;
    };
  }
  export const login = async (data: LoginReq) => {
    const res = await api.post<LoginRes>("auth/signIn", data);
    if (!res.data.data.accessToken) {
      throw new Error("Cannot login");
    }
    return res.data.data;
  };
  export interface RegisterReq {
    login: string;
    password: string;
    acceptedRegulations: true;
  }

  export interface RegisterRes {
    accessToken: string;
    user: CurrentUser;
  }

  export const register = async (data: RegisterReq) => {
    const res = await api.post<RegisterRes>("auth/signUp", data);
    return res.data;
  };

  export interface RequestPasswordResetReq {
    login: string;
  }

  export interface RequestPasswordResetRes {
    message: string;
  }

  export const requestPasswordReset = async (data: RequestPasswordResetReq) => {
    const res = await api.post<RequestPasswordResetRes>(
      "auth/resetPasswordRequest",
      data,
    );
    return res.data;
  };

  export interface ConfirmPasswordResetReq {
    login: string;
    newPassword: string;
    code: string;
  }

  export const confirmPasswordReset = async (data: ConfirmPasswordResetReq) => {
    const res = await api.post("auth/resetPassword", data);
    return res.data;
  };

  export const sendCode = async () => {
    const res = await api.post("auth/register/confirm-code/send");
    return res.data;
  };
  export const confirmRegistration = async (data: {
    login: string;
    code: string;
  }) => {
    const res = await api.post("auth/verifyAccount", data);
    return res.data;
  };
}
