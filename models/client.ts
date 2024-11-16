import { UseQueryOptions } from '@tanstack/react-query';

export type StringBooleanType = 'Y' | 'N';

export type BannerStatusType = 'UPCOMING' | 'ACTIVE' | 'EXPIRED';

export interface ApiDataResponseType<T = void> {
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
  statusCode: number;
}

export type UseQueryOptionsType<T = void> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn'
>;
