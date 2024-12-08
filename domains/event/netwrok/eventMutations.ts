import BaseApi from '@logics/api/baseApi';
import { ApiDataResponseType } from '@models/client';
import { UpdateEventDto } from '@models/index';
import { useMutation } from '@tanstack/react-query';

const eventApi = new BaseApi('');

export const useUpdateEventDetail = () => {
  return useMutation({
    mutationFn: async (body: UpdateEventDto) => {
      const { data } = await eventApi.put<ApiDataResponseType<UpdateEventDto>>(
        '/event',
        body
      );

      return data;
    }
  });
};
