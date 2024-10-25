import * as z from 'zod';

export const FORM_LIMIT = {
  ID: {
    MIN: 3
  },
  PASSWORD: {
    MIN: 3
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
  }
} as const;

export const signinFormSchema = z.object({
  id: z.string().min(FORM_LIMIT.ID.MIN, FORM_ERROR_TEXT.ID.IS_SHORT),
  pw: z.string().min(FORM_LIMIT.PASSWORD.MIN, FORM_ERROR_TEXT.PASSWORD.IS_SHORT)
});
