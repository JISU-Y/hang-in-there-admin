import { useQuery } from '@tanstack/react-query';
import { eventQueryKeys } from '../constants/queryKeys';
import {
  ApiDataResponseType,
  ApiPaginationDataResponseType,
  UseQueryOptionsType
} from '@models/client';
import {
  EventDetailType,
  EventListRequestType,
  EventListType
} from '@models/index';
import { getEventDetail, getEventList } from './eventFetchHandler';

export const useFetchEventListQuery = (
  params: EventListRequestType,
  options?: UseQueryOptionsType<ApiPaginationDataResponseType<EventListType[]>>
) => {
  return useQuery({
    queryKey: eventQueryKeys.eventList({ params }),
    queryFn: async () => await getEventList(params),
    ...options,
    select: ({ data, pagination }) => ({ data, pagination })
  });
};

export const useFetchEventDetailQuery = (
  { id }: { id: string },
  options?: UseQueryOptionsType<
    ApiDataResponseType<EventDetailType>,
    unknown,
    EventDetailType
  >
) => {
  return useQuery<
    ApiDataResponseType<EventDetailType>,
    unknown,
    EventDetailType
  >({
    queryKey: eventQueryKeys.eventDetail({ id }),
    queryFn: async () => await getEventDetail({ id: Number(id) }),
    select: ({ data }) => data,
    ...options
  });
};
