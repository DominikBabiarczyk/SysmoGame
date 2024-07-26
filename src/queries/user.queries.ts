import { UserApi } from "@src/api/user-api";
import { CurrentUser } from "@src/models/user";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { getNextPageParam, useListData } from "./query.utils";

export const userKeys = {
  currentUser: () => "current-user",
  user: (userId: string) => ["user", userId],
  userSocialMedia: (userId: string) => ["user", "social-media", userId],
  usersProducts: (search?: string) =>
    search ? ["user", "products", search] : ["user", "products"],
};

export function useSetCurrentUserQuery() {
  const queryClient = useQueryClient();
  const setter = useCallback(
    (data: CurrentUser) => {
      queryClient.setQueryData(userKeys.user("current"), data);
    },
    [queryClient],
  );
  return setter;
}

export function useCurrentUserQuery() {
  const query = useQuery({
    queryKey: [userKeys.currentUser()],
    queryFn: UserApi.getCurrentUser,
  });
  return query;
}

export function useUserDetailsQuery(userId: string) {
  const query = useQuery({
    queryKey: userKeys.user(userId),
    queryFn: () => UserApi.getUserDetails(userId),
  });
  return query;
}


export function useUsersShopProductsListQuery(options: { search?: string }) {
  const { search } = options;
  const key = userKeys.usersProducts(search);
  const query = useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      UserApi.getUsersShopProducts({
        search: search,
        page: pageParam,
      }),

    getNextPageParam: getNextPageParam,
  });

  const { onRefresh, items } = useListData(query, key);

  return {
    ...query,
    onRefresh,
    items,
  };
}
