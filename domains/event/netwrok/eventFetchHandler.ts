import BaseApi from '@logics/api/baseApi';
import { ApiPaginationDataResponseType } from '@models/client';
import { EventListType } from '@models/index';

const eventApi = new BaseApi('event');

export const getEventList = (
  params: { page: number; size: number },
  tokens?: { accessToken?: string; refreshToken?: string }
) => {
  return eventApi.get<ApiPaginationDataResponseType<EventListType[]>>('', {
    params,
    headers: {
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`
      }),
      ...(tokens?.refreshToken && { refresh: tokens.refreshToken })
    }
  });
};
