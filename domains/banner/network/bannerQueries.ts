import { useQuery } from '@tanstack/react-query';
import {
  ApiPaginationDataResponseType,
  PaginationType,
  UseQueryOptionsType
} from '@models/client';
import { BannerType, GetBannerListRequest } from '@models/index';
import { bannerQueryKeys } from '../constants/queryKeys';
import { getBannerDetail, getBannerList } from './bannerFetchHandler';

export const useFetchBannerListQuery = (
  params: GetBannerListRequest,
  options?: UseQueryOptionsType<
    ApiPaginationDataResponseType<BannerType[]>,
    unknown,
    {
      data: BannerType[];
      pagination: PaginationType;
    }
  >
) => {
  return useQuery<
    ApiPaginationDataResponseType<BannerType[]>,
    unknown,
    {
      data: BannerType[];
      pagination: PaginationType;
    }
  >({
    queryKey: bannerQueryKeys.bannerList({ params }),
    queryFn: async () => await getBannerList(params),
    ...options
  });
};

export const useFetchBannerDetailQuery = (
  { bannerId }: { bannerId: string },
  options?: UseQueryOptionsType<
    ApiPaginationDataResponseType<BannerType>,
    unknown,
    BannerType
  >
) => {
  return useQuery<
    ApiPaginationDataResponseType<BannerType>,
    unknown,
    BannerType
  >({
    queryKey: bannerQueryKeys.bannerDetail({ bannerId }),
    queryFn: async () => await getBannerDetail({ bannerId }),
    select: ({ data }) => data,
    ...options
  });
};
