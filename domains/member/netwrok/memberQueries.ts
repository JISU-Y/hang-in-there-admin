import BaseApi from '@logics/api/baseApi';
import { useQuery } from '@tanstack/react-query';
import { memberQueryKeys } from '../constants/queryKeys';
import { ApiDataResponseType, UseQueryOptionsType } from '@models/client';

const memberApi = new BaseApi('');

export const useFetchMemberIdCheck = (
  id: string,
  options?: UseQueryOptionsType<ApiDataResponseType>
) => {
  return useQuery({
    queryKey: memberQueryKeys.checkId({ id }),
    queryFn: async () => {
      const data = await memberApi.get<ApiDataResponseType>(
        '/member/id-check',
        { params: { id } }
      );

      return data;
    },
    ...options
  });
};
