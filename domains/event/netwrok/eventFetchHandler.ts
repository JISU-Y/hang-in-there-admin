import BaseApi from '@logics/api/baseApi';
import { ApiPaginationDataResponseType } from '@models/client';
import { EventListType } from '@models/index';

const eventApi = new BaseApi('event');

export const getEventList = (
  params: { page: number; size: number },
  token?: string
) =>
  eventApi.get<ApiPaginationDataResponseType<EventListType[]>>('', {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
