import { ProductApi } from "@src/api/product-api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getNextPageParam, useListData } from "./query.utils";
import { userKeys } from "./user.queries";
import { parseError } from "@src/utils/error";
import { toast } from "@src/utils/toast";

export const productKeys = {
  productList: (filters?: { search?: string; userId?: string }) =>
    filters ? ["product", "list", filters] : ["product", "list"],
  productDetails: (productId: string) => ["product", "details", productId],
};

export function useProductListQuery(options: { search?: string }) {
  const key = productKeys.productList({ search: options.search });
  const query = useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      ProductApi.getMyProducts({
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

export function useProductDetailsQuery(productId: string, enabled?: boolean) {
  const query = useQuery({
    queryFn: () => ProductApi.getProductById(productId),
    queryKey: productKeys.productDetails(productId),
    enabled: enabled ?? true,
  });
  return query;
}

export function useCreateProductMutation(
  userId: string,
  options?: { onSuccess: () => void },
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ProductApi.createProduct,
    onSuccess(res) {
      queryClient.invalidateQueries({ queryKey: productKeys.productList() });
      queryClient.invalidateQueries({ queryKey: userKeys.usersProducts() });
      queryClient.invalidateQueries({
        queryKey: productKeys.productList({ userId }),
      });
      options?.onSuccess();
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}

export function useUpdateProductMutation(
  productId: string,
  options?: { onSuccess: () => void },
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ProductApi.updateProduct,
    onSuccess(res) {
      queryClient.invalidateQueries({ queryKey: productKeys.productList() });
      queryClient.invalidateQueries({
        queryKey: productKeys.productDetails(productId),
      });
      options?.onSuccess();
    },
    onError(e) {
      toast.error(parseError(e).message);
    },
  });
  return mutation;
}
