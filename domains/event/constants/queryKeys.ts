export const eventQueryKeys = {
  all: ['EVENT'],
  eventList: (options?: object) => [
    ...eventQueryKeys.all,
    'EVENT_LIST',
    { options }
  ]
};
