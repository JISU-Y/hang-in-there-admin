export const commonQueryKeys = {
  all: ['COMMON'] as const,
  commonCodes: () => [...commonQueryKeys.all, 'CODES'] as const
} as const;
