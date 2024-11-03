import BaseApi from '@logics/api/baseApi';
import { ApiPaginationDataResponseType } from '@models/client';
import { MemberDto } from '@models/index';

const memberApi = new BaseApi('member');

export const getMemberList = (
  params: { page: number; size: number },
  tokens?: { accessToken?: string; refreshToken?: string }
) =>
  memberApi.get<ApiPaginationDataResponseType<MemberDto[]>>('/list', {
    params,
    headers: {
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`
      }),
      ...(tokens?.refreshToken && { refresh: tokens.refreshToken })
    }
  });
