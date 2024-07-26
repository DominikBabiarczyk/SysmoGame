export interface Pagination<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface RequestPagination {
  page?: number;
  limit?: number;
  sort_by?: string;
  search?: string;
  col?: string;
  additionalQuery?: string;
}
