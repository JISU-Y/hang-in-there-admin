import BaseApi from '@logics/api/baseApi';
import { ApiPaginationDataResponseType } from '@models/client';
import { MemberDto } from '@models/index';

const memberApi = new BaseApi('member');

export const getMemberList = (
  params: { page: number; size: number },
  token?: string
) =>
  memberApi.get<ApiPaginationDataResponseType<MemberDto[]>>('/list', {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
