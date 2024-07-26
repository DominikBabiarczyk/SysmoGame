import { Pagination } from "@src/models/pagination";
import { useDataLength } from "@src/utils/hooks/useDataLength";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import { useCallback } from "react";

export function getNextPageParam<T>(lastPage: Pagination<T>): number | null {
  if (typeof lastPage?.meta?.current_page !== "number") {
    return null;
  }
  if (typeof lastPage?.meta?.last_page !== "number") {
    return null;
  }
  if (lastPage.meta.current_page < lastPage.meta.last_page) {
    return lastPage.meta.current_page + 1;
  }
  return null;
}
export function useListData<T>(
  query: UseInfiniteQueryResult<InfiniteData<Pagination<T>, unknown>, unknown>,
  array: any[],
) {
  const queryClient = useQueryClient();
  const onRefresh = useCallback(() => {
    queryClient.setQueryData<InfiniteData<any>>(array, (oldData) => {
      if (!oldData) {
        return;
      }
      return {
        pages: oldData.pages.slice(0, 1),
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
    query.refetch();
  }, [array, query, queryClient]);
  const dataLength = useDataLength(query.data);
  const items = useFlatten(query.data);
  return {
    items,
    onRefresh,
    dataLength,
  };
}

export function useFlatten<T>(
  data: InfiniteData<Pagination<T>> | undefined,
): T[] {
  if (!data) {
    return [];
  }
  const items = data.pages.reduce<T[]>((acc, val) => {
    acc.push(...val.data);
    return acc;
  }, []);
  return items;
}

export function updateListItem<T extends { id: string }>(
  queryClient: QueryClient,
  key: string[],
  itemId: string,
  fields: Partial<T> | ((oldData: T) => T),
) {
  queryClient.setQueriesData<InfiniteData<Pagination<T>>>(
    {
      queryKey: key,
    },
    (oldData) => {
      if (!oldData) {
        return oldData;
      }
      const newPages = oldData.pages.map((page) => {
        const newData = page.data.map((item) => {
          if (item.id === itemId) {
            if (typeof fields === "function") {
              return fields(item);
            }
            return {
              ...item,
              ...fields,
            };
          }
          return item;
        });
        return { meta: page.meta, data: newData };
      });
      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    },
  );
}
export function deleteListItem<T extends {}>(
  queryClient: QueryClient,
  key: string[],
  filterFn: (item: T) => boolean,
) {
  queryClient.setQueriesData<InfiniteData<Pagination<T>>>(
    { queryKey: key },
    (oldData) => {
      if (!oldData) {
        return oldData;
      }
      const newPages = oldData.pages.map((page) => {
        const newData = page.data.filter(filterFn);
        return { meta: page.meta, data: newData };
      });
      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    },
  );
}

export function addListItem<T extends {}>(
  queryClient: QueryClient,
  key: string[],
  newItem: T,
) {
  queryClient.setQueriesData<InfiniteData<Pagination<T>>>(
    { queryKey: key },
    (oldData) => {
      if (!oldData) {
        return oldData;
      }
      if (oldData.pages.length === 1) {
        if (!oldData.pages[0]) {
          return oldData;
        }
        if (oldData.pages[0]?.data.length === 0) {
          return {
            pages: [
              {
                data: [newItem],
                meta: {
                  current_page: 1,
                  last_page: 1,
                  per_page: 3,
                  total: 1,
                },
              },
            ],

            pageParams: oldData.pageParams,
          };
        }
      }

      const newPages = oldData.pages.map((page, index) => {
        if (index !== 0) {
          return page;
        }
        const newData = page.data.concat(newItem);
        return { meta: page.meta, data: newData };
      });
      return {
        pageParams: oldData.pageParams,
        pages: newPages,
      };
    },
  );
}
