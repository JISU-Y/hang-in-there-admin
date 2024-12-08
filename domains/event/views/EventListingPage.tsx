import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import PageContainer from '@domains/common/components/layout/page-container';
import EventTable from '../components/EventTable/EventTable';
import { Heading } from '@domains/common/components/ui/heading';
import { Separator } from '@domains/common/components/ui/separator';
import { searchParamsCache } from '@logics/utils/searchParamsHandlers';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';

const breadcrumbItems = [
  { title: 'Dashboard', link: NAVIGATION_ROUTE.DASHBOARD.HREF },
  { title: 'Event', link: NAVIGATION_ROUTE.EVENT.HREF }
];

interface EventListingPageProps {}

export default function EventListingPage({}: EventListingPageProps) {
  // TODO: event에서는 search query가 중요.
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const size = searchParamsCache.get('limit');
  const search = searchParamsCache.get('q');
  const status = searchParamsCache.get('status');

  // TODO: memberList에 query 붙으면 사용
  const filters = {
    page,
    limit: size,
    search,
    status
  };

  // TODO: server 요청과 client 요청을 나누어야 할 듯.
  // 혹은 client에서 요청하는 것도 server를 거치게 해서 middleware에서 판단한다든가.
  // const accessToken = getAccessToken({ cookies });
  // const refreshToken = getRefreshToken({ cookies });
  // const eventListQuery = await getDehydratedQuery({
  //   queryKey: eventQueryKeys.eventList({ page, size }),
  //   queryFn: async () =>
  //     await getEventList({ page, size }, { accessToken, refreshToken })
  // });

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
        <EventTable filters={filters} />

        {/* <Suspense fallback={<div>fallback</div>}>
          <Hydrate
            state={eventListQuery ? { queries: [eventListQuery] } : undefined}
          >
            <EventTable
              data={eventListQuery?.state.data?.data || []}
              totalData={eventListQuery?.state.data?.pagination.totalPage || 0}
            />
          </Hydrate>
        </Suspense> */}
      </div>
    </PageContainer>
  );
}
