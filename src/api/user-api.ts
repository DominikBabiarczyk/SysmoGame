import { CurrentUser, UserDetails, UserRole } from "@src/models/user";
import { api } from "./client";
import { PaginationParams, Pagination } from "@src/models/pagination";
import { UserProducts } from "@src/models/product";

export namespace UserApi {
  export const getCurrentUser = async () => {
    const res = await api.get<CurrentUser>("users/current");
    return res.data;
  };

  interface GetUsersShopProductsParams extends PaginationParams {
    search?: string;
  }

  export const getUsersShopProducts = async (
    params: GetUsersShopProductsParams,
  ) => {
    const res = await api.get<Pagination<UserProducts>>("shopProducts", {
      params,
    });
    console.log(res);
    return res.data;
  };

  export const getUserDetails = async (userId: string) => {
    if (!userId) return;
    const res = await api.get<UserDetails>(`users/${userId}`);
    return res.data;
  };
}
