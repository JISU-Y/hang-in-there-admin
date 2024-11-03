export const NAVIGATION_ROUTE = {
  HOME: {
    HREF: '/',
    PATHNAME: '/',
    QUERY: {}
  },
  SIGN_IN: {
    HREF: '/auth/signin',
    PATHNAME: '/auth/signin',
    QUERY: {}
  },
  SIGN_UP: {
    HREF: '/auth/signup',
    PATHNAME: '/auth/signup',
    QUERY: {}
  },
  DASHBOARD: {
    HREF: '/dashboard',
    PATHNAME: '/dashboard',
    QUERY: {}
  },
  MEMBER: {
    HREF: '/dashboard/member',
    PATHNAME: '/dashboard/member',
    QUERY: {}
  },
  MEMBER_CREATE: {
    HREF: '/dashboard/member/create',
    PATHNAME: '/dashboard/member/create',
    QUERY: {}
  },
  MEMBER_DETAIL: {
    HREF: '/dashboard/member',
    PATHNAME: '/dashboard/member/[memberId]',
    QUERY: {}
  },
  EVENT: {
    HREF: '/dashboard/event',
    PATHNAME: '/dashboard/event',
    QUERY: {}
  },
  EVENT_DETAIL: {
    HREF: '/dashboard/event',
    PATHNAME: '/dashboard/event/[eventId]',
    QUERY: {}
  },
  BANNER: {
    HREF: '/dashboard/banner',
    PATHNAME: '/dashboard/banner',
    QUERY: {}
  },
  BANNER_DETAIL: {
    HREF: '/dashboard/banner',
    PATHNAME: '/dashboard/banner/[bannerId]',
    QUERY: {}
  }
} as const;
