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
    MAX_LENGTH: 15,
    MAX_FILE_SIZE: MAX_FILE_SIZE_MB * 1000 * 1000
  },
  DESCRIPTION: {
    MIN: 10,
    MAX: 1000
  },
  TITLE: {
    MIN: 2,
    MAX: 100
  }
} as const;

export const FORM_ERROR_TEXT = {
  IMAGE: {
    IS_EMPTY: `이미지는 ${FORM_LIMIT.IMAGE.MIN_LENGTH}개 이상 필요합니다.`,
    IS_OVER_MAX_LENGTH: '아이디 형식이 올바르지 않습니다.',
    IS_DUPLICATED: '이미 사용 중인 아이디입니다.'
  },
  DESCRIPTION: {
    IS_SHORT: `상세 설명은 ${FORM_LIMIT.DESCRIPTION.MIN}자 이상이어야 합니다.`,
    IS_LONG: `상세 설명은 ${FORM_LIMIT.DESCRIPTION.MIN}자 까지 가능합니다.`
  }
} as const;

export const updateEventFormSchema = object({
  title: string()
    .min(FORM_LIMIT.TITLE.MIN, {
      message: `제목은 최소 ${FORM_LIMIT.TITLE.MIN}자 이상이어야 합니다.`
    })
    .max(FORM_LIMIT.TITLE.MAX, {
      message: `제목은 최대 ${FORM_LIMIT.TITLE.MAX}자까지 가능합니다.`
    }),
  images: array(
    any().refine((file) => file instanceof File, {
      message: '올바른 파일 형식이 아닙니다.'
    })
  )
    .min(FORM_LIMIT.IMAGE.MIN_LENGTH, {
      message: `이미지는 최소 ${FORM_LIMIT.IMAGE.MIN_LENGTH}개 이상이어야 합니다.`
    })
    .max(FORM_LIMIT.IMAGE.MAX_LENGTH, {
      message: `이미지는 최대 ${FORM_LIMIT.IMAGE.MAX_LENGTH}개까지 가능합니다.`
    }),
  description: string()
    .min(FORM_LIMIT.DESCRIPTION.MIN, {
      message: `설명은 최소 ${FORM_LIMIT.DESCRIPTION.MIN}자 이상이어야 합니다.`
    })
    .max(FORM_LIMIT.DESCRIPTION.MAX, {
      message: `설명은 최대 ${FORM_LIMIT.DESCRIPTION.MAX}자까지 가능합니다.`
    }),
  event_st: string(),
  event_ed: string()
});
