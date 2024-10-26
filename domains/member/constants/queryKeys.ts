export const memberQueryKeys = {
  all: ['MEMBER'],
  checkId: (options?: object) => [
    ...memberQueryKeys.all,
    'CHECK_ID',
    { options }
  ],
  memberList: (options?: object) => [
    ...memberQueryKeys.all,
    'MEMBER_LIST',
    { options }
  ]
};
