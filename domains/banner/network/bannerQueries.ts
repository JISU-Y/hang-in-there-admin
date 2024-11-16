import { useQuery } from '@tanstack/react-query';
import {
  ApiPaginationDataResponseType,
  UseQueryOptionsType
} from '@models/client';
import { BannerType, GetBannerListRequest } from '@models/index';
import { bannerQueryKeys } from '../constants/queryKeys';
import { getBannerList } from './bannerFetchHandler';

export const useFetchBannerListQuery = (
  params: GetBannerListRequest,
  options?: UseQueryOptionsType<ApiPaginationDataResponseType<BannerType[]>>
) => {
  return useQuery({
    queryKey: bannerQueryKeys.bannerList({ params }),
    queryFn: async () => await getBannerList(params),
    ...options
  });
};
