export interface Pagination<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
