import { object, string } from 'zod';

export const FORM_LIMIT = {
  ID: {
    MIN: 3
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
  ID: {
    IS_SHORT: `아이디는 ${FORM_LIMIT.ID.MIN}자 이상이어야 합니다.`,
    IS_INVALID: '아이디 형식이 올바르지 않습니다.',
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

export const memberFormSchema = object({
  id: string().min(FORM_LIMIT.ID.MIN, FORM_ERROR_TEXT.ID.IS_SHORT),
  pw: string().min(FORM_LIMIT.PASSWORD.MIN, FORM_ERROR_TEXT.PASSWORD.IS_SHORT),
  name: string()
    .min(FORM_LIMIT.NAME.MIN, FORM_ERROR_TEXT.NAME.IS_SHORT)
    .max(FORM_LIMIT.NAME.MAX, FORM_ERROR_TEXT.NAME.IS_LONG)
});
