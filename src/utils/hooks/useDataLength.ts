import { Pagination } from "@src/models/pagination";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PaginationLogic } from "../PaginationLogic";

export const useDataLength = <T>(
  data: InfiniteData<Pagination<T>> | undefined,
): number => {
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    setDataLength(PaginationLogic.handleCalculateDataLength(data));
  }, [data]);

  return dataLength;
};
