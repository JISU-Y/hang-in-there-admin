export const bannerQueryKeys = {
  all: ['BANNER'],
  bannerList: (options?: object) => [
    ...bannerQueryKeys.all,
    'BANNER_LIST',
    { options }
  ],
  bannerDetail: (options?: object) => [
    ...bannerQueryKeys.all,
    'BANNER_DETAIl',
    { options }
  ]
};
