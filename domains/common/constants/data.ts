import { NavItem } from '../types';
import { NAVIGATION_ROUTE } from './route';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: NAVIGATION_ROUTE.DASHBOARD.HREF,
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Member',
    href: NAVIGATION_ROUTE.MEMBER.HREF,
    icon: 'user',
    label: 'employee'
  },
  {
    title: 'Event',
    href: '/dashboard/event',
    icon: 'event',
    label: 'event'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: 'product',
    label: 'product'
  },
  {
    title: 'Account',
    icon: 'user',
    label: 'account',
    children: [
      {
        title: 'Profile',
        href: '/dashboard/profile',
        icon: 'userPen',
        label: 'profile'
      },
      {
        title: 'Login',
        href: '/',
        icon: 'login',
        label: 'login'
      }
    ]
  }
];
