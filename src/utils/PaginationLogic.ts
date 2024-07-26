import { Pagination } from "@src/models/pagination";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export namespace PaginationLogic {
  export const handleGetNextParam = <T>(
    lastPage: Pagination<T>,
  ): number | undefined => {
    if (lastPage.meta.current_page < lastPage.meta.last_page) {
      return lastPage.meta.current_page + 1;
    }
    return undefined;
  };

  export const handleCalculateDataLength = <T>(
    data: InfiniteData<Pagination<T>> | undefined,
  ): number => {
    if (data === undefined || !data.pages) {
      return 0;
    }
    let dataLength = data.pages.reduce((accumulator, page) => {
      return accumulator + page.data.length;
    }, 0);
    if (isNaN(dataLength)) {
      dataLength = data.pages[0]?.meta?.total;
    }
    return dataLength;
  };

  export const useDataLength = <T>(
    data: InfiniteData<Pagination<T>> | undefined,
  ): number => {
    const [dataLength, setDataLength] = useState(0);
    useEffect(() => {
      setDataLength(PaginationLogic.handleCalculateDataLength(data));
    }, [data]);

    return dataLength;
  };
}
