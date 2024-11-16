export const bannerQueryKeys = {
  all: ['BANNER'],
  bannerList: (options?: object) => [
    ...bannerQueryKeys.all,
    'BANNER_LIST',
    { options }
  ]
};
