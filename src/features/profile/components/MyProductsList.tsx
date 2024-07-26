import { Box } from "@src/common/atoms";
import { AppList } from "@src/common/list/AppList";
import { ErrorInformation } from "@src/common/ui/ErrorInformation";
import { NoData } from "@src/common/ui/NoData";
import { useProductListQuery } from "@src/queries/product.queries";
import React, { useCallback } from "react";
import { MyProductsListItem } from "./MyProductsListItem";
import { useT } from "@src/i18n/useTranslation";
import { SpinnerWrapped } from "@src/common/ui/SpinnerWrapped";

interface ProductListProps {
  ListHeader?: JSX.Element;
  userId: string;
}

export const MyProductsList = ({ ListHeader, userId }: ProductListProps) => {
  const { t } = useT();
  const {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    items,
    onRefresh,
  } = useProductListQuery({});

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <MyProductsListItem item={item} />;
  }, []);

  return (
    <Box className="flex flex-1 flex-col ">
      <AppList
        estimatedItemSize={150}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          isError ? (
            <ErrorInformation error={error} />
          ) : isLoading ? (
            <SpinnerWrapped />
          ) : (
            <NoData
              message={t("product:error:no-data")}
              style={{ marginBottom: 30, marginTop: 10 }}
              textClassName="text-app-neutral-300 font-semibold text-center"
            />
          )
        }
        onRefresh={onRefresh}
        refreshing={false}
        data={isError ? [] : items}
        renderItem={renderItem}
        onEndReached={hasNextPage ? fetchNextPage : undefined}
      />
    </Box>
  );
};
