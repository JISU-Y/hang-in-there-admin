import { any, array, object, string } from 'zod';

export const MAX_FILE_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const FORM_LIMIT = {
  IMAGE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 5,
    MAX_FILE_SIZE: MAX_FILE_SIZE_MB * 1000 * 1000
  },
  PASSWORD: {
    MIN: 3
  },
  NAME: {
    MIN: 3,
    MAX: 20
  }
} as const;

export const FORM_ERROR_TEXT = {
  IMAGE: {
    IS_EMPTY: `이미지는 ${FORM_LIMIT.IMAGE.MIN_LENGTH}개 이상 필요합니다.`,
    IS_OVER_MAX_LENGTH: '아이디 형식이 올바르지 않습니다.',
    IS_DUPLICATED: '이미 사용 중인 아이디입니다.'
  },
  PASSWORD: {
    IS_SHORT: `비밀번호는 ${FORM_LIMIT.PASSWORD.MIN}자 이상이어야 합니다.`
  },
  NAME: {
    IS_SHORT: `이름은 ${FORM_LIMIT.PASSWORD.MIN}자 이상이어야 합니다.`,
    IS_LONG: `이름은 ${FORM_LIMIT.PASSWORD.MIN}자 까지 가능합니다.`
  }
} as const;

export const createBannerFormSchema = object({
  bgImageFile: any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE_MB * 1000 ** 1000,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  eventImageFile: any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE_MB * 1000 ** 1000,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  link: string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  content: string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  startDate: string(),
  endDate: string()
});
