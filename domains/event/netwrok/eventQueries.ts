import { useQuery } from '@tanstack/react-query';
import { eventQueryKeys } from '../constants/queryKeys';
import {
  ApiPaginationDataResponseType,
  UseQueryOptionsType
} from '@models/client';
import { EventListType } from '@models/index';
import { getEventList } from './eventFetchHandler';

export const useFetchEventListQuery = (
  params: { page: number; size: number },
  options?: UseQueryOptionsType<ApiPaginationDataResponseType<EventListType[]>>
) => {
  return useQuery({
    queryKey: eventQueryKeys.eventList({ params }),
    queryFn: async () => await getEventList(params),
    ...options
  });
};
