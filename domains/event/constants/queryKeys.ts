export const eventQueryKeys = {
  all: ['EVENT'],
  eventList: (options?: object) => [
    ...eventQueryKeys.all,
    'EVENT_LIST',
    { options }
  ],
  eventDetail: (options?: object) => [
    ...eventQueryKeys.all,
    'EVENT_DETAIL',
    { options }
  ]
};
