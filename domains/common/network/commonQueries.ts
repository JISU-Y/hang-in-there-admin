import { useQuery } from '@tanstack/react-query';
import { ApiDataResponseType, UseQueryOptionsType } from '@models/client';
import { commonQueryKeys } from '../constants/queryKeys';
import { getCommonCodes } from '../network/commonFetchHandler';
import { CommonCodeResponseType } from '@models/index';

export const useFetchCommonCodesQuery = (
  options?: UseQueryOptionsType<
    ApiDataResponseType<CommonCodeResponseType[]>,
    unknown,
    CommonCodeResponseType[]
  >
) => {
  return useQuery<
    ApiDataResponseType<CommonCodeResponseType[]>,
    unknown,
    CommonCodeResponseType[]
  >({
    queryKey: commonQueryKeys.commonCodes(),
    queryFn: async () => await getCommonCodes(),
    staleTime: Infinity,
    ...options,
    select: ({ data }) => data
  });
};

export const useFetchAreaCodesQuery = () => {
  const { data } = useFetchCommonCodesQuery();
  return {
    data: data?.filter((code) => code.type === 'area_cd') || []
  };
};

export const useFetchSigunguCodesQuery = () => {
  const { data } = useFetchCommonCodesQuery();
  return {
    data: data?.filter((code) => code.type === 'sigungu_cd') || []
  };
};

export const useFetchCategoryCodesQuery = () => {
  const { data } = useFetchCommonCodesQuery();
  return {
    data: data?.filter((code) => code.type === 'category') || []
  };
};

export const useFetchSubCategoryCodesQuery = () => {
  const { data } = useFetchCommonCodesQuery();
  return {
    data: data?.filter((code) => code.type === 'sub_category') || []
  };
};

export const useFetchDetailSubCategoryCodesQuery = () => {
  const { data } = useFetchCommonCodesQuery();
  return {
    data: data?.filter((code) => code.type === 'detail_sub_category') || []
  };
};
