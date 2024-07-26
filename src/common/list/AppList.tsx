import { Fragment, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "../atoms";
import { SpinnerWrapped } from "../ui/SpinnerWrapped";

interface AppListProps<T extends { id: string }> {
  estimatedItemSize?: number;
  ListHeaderComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  ListEmptyComponent?: ReactNode;
  onRefresh?: () => void;
  refreshing: boolean;
  data: T[];
  renderItem: (item: { item: T; index: number }) => ReactNode;
  onEndReached?: () => void;
  column?: boolean;
}

export function AppList<T extends { id: string }>({
  data,
  onEndReached,
  onRefresh,
  renderItem,
  ListHeaderComponent,
  ListEmptyComponent,
  ListFooterComponent,
  column,
}: AppListProps<T>) {
  return (
    <Box>
      {ListHeaderComponent}
      <InfiniteScroll
        className={`${
          column
            ? "m-auto flex flex-row flex-wrap items-center justify-center gap-10"
            : ""
        }`}
        dataLength={data.length}
        next={onEndReached || (() => null)}
        hasMore={Boolean(onEndReached)}
        loader={<SpinnerWrapped />}
        // below props only if you need pull down functionality
        refreshFunction={onRefresh}
      >
        {data.length === 0 && ListEmptyComponent}
        {data?.map((item, index) => {
          return (
            <Fragment key={item.id}>{renderItem({ item, index })}</Fragment>
          );
        })}
      </InfiniteScroll>
      {ListFooterComponent}
    </Box>
  );
}
