import BaseApi from '@logics/api/baseApi';
import {
  ApiDataResponseType,
  ApiPaginationDataResponseType
} from '@models/client';
import { EventDetailType, EventListType } from '@models/index';

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

export const getEventDetail = (
  params: { id: number },
  tokens?: { accessToken?: string; refreshToken?: string }
) => {
  return eventApi.get<ApiDataResponseType<EventDetailType>>(`/${params.id}`, {
    params,
    headers: {
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`
      }),
      ...(tokens?.refreshToken && { refresh: tokens.refreshToken })
    }
  });
};
