import { NAVIGATION_ROUTE } from '@domains/common/constants/route';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(NAVIGATION_ROUTE.DASHBOARD.HREF);
}
