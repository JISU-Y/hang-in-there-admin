import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import PageContainer from '@domains/common/components/layout/page-container';
import EventTable from '../components/EventTable/EventTable';
import { buttonVariants } from '@domains/common/components/ui/button';
import { Heading } from '@domains/common/components/ui/heading';
import { Separator } from '@domains/common/components/ui/separator';
import { searchParamsCache } from '@logics/utils/searchParamsHandlers';
import { cn } from '@logics/utils/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';
import { Suspense } from 'react';
import { getDehydratedQuery, Hydrate } from '@logics/utils/reactQuery';
import { eventQueryKeys } from '../constants/queryKeys';
import { getEventList } from '../netwrok/eventFetchHandler';
import { cookies } from 'next/headers';
import { COOKIE_KEY } from '@domains/common/constants/storageKeys';

const breadcrumbItems = [
  { title: 'Dashboard', link: NAVIGATION_ROUTE.DASHBOARD.HREF },
  { title: 'Event', link: NAVIGATION_ROUTE.EVENT.HREF }
];

interface EventListingPageProps {}

export default async function EventListingPage({}: EventListingPageProps) {
  // TODO: event에서는 search query가 중요.
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const gender = searchParamsCache.get('gender');
  const size = searchParamsCache.get('limit');

  // TODO: memberList에 query 붙으면 사용
  const filters = {
    page,
    limit: size,
    ...(search && { search }),
    ...(gender && { genders: gender })
  };

  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_KEY.ACCESS_TOKEN)?.value;

  const eventListQuery = await getDehydratedQuery({
    queryKey: eventQueryKeys.eventList({ page, size }),
    queryFn: async () => await getEventList({ page, size }, accessToken)
  });

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title="Events" description="이벤트를 관리합니다." />

          {/* TODO: event create api가 아직 없음. */}
          {/* <Link
            href={NAVIGATION_ROUTE.MEMBER_CREATE.HREF}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <Suspense fallback={<div>fallback</div>}>
          <Hydrate
            state={eventListQuery ? { queries: [eventListQuery] } : undefined}
          >
            <EventTable
              data={eventListQuery?.state.data?.data || []}
              totalData={eventListQuery?.state.data?.pagination.totalPage || 0}
            />
          </Hydrate>
        </Suspense>
      </div>
    </PageContainer>
  );
}
