interface ITodoBackendResponse<T> {
  message: string;
  data: T;
}
interface IPaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
interface Pagination {
  total: number;
  hasNextPage: boolean;
}
export type { ITodoBackendResponse, IPaginatedResponse, Pagination };
