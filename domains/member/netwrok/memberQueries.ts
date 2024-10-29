import BaseApi from '@logics/api/baseApi';
import { useQuery } from '@tanstack/react-query';
import { memberQueryKeys } from '../constants/queryKeys';
import {
  ApiDataResponseType,
  ApiPaginationDataResponseType,
  UseQueryOptionsType
} from '@models/client';
import { MemberDto } from '@models/index';
import { getMemberList } from './memberFetchHandler';

const memberApi = new BaseApi('member');

export const useFetchMemberIdCheck = (
  id: string,
  options?: UseQueryOptionsType<ApiDataResponseType>
) => {
  return useQuery({
    queryKey: memberQueryKeys.checkId({ id }),
    queryFn: async () => {
      const data = await memberApi.get<ApiDataResponseType>('/id-check', {
        params: { id }
      });

      return data;
    },
    ...options
  });
};

export const useFetchMemberListQuery = (
  params: { page: number; size: number },
  options?: UseQueryOptionsType<ApiPaginationDataResponseType<MemberDto[]>>
) => {
  return useQuery({
    queryKey: memberQueryKeys.memberList({ params }),
    queryFn: async () => await getMemberList(params),
    ...options
  });
};
