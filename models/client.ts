export interface ApiDataResponseType<T> {
  data: T;
  message: string;
  timeStamp: string;
  statusCode: number;
}

export interface ApiErrorDataResponseType {
  message: string;
  timeStamp: string;
  statusCode: number;
}

export interface PaginationType {
  totalItem: number;
  totalPage: number;
  size: number;
  page: number;
}

export interface ApiPaginationDataResponseType<T> {
  data: T;
  pagination: PaginationType;
  message: string;
  timeStamp: string;
}
