import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import PageContainer from '@domains/common/components/layout/page-container';
import MemberTable from '../components/MemberTable/MemberTable';
import { buttonVariants } from '@domains/common/components/ui/button';
import { Heading } from '@domains/common/components/ui/heading';
import { Separator } from '@domains/common/components/ui/separator';
import { searchParamsCache } from '@logics/utils/searchParamsHandlers';
import { cn } from '@logics/utils/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';

const breadcrumbItems = [
  { title: 'Dashboard', link: NAVIGATION_ROUTE.DASHBOARD.HREF },
  { title: 'Member', link: NAVIGATION_ROUTE.MEMBER.HREF }
];

interface MemberListingPageProps {}

export default async function MemberListingPage({}: MemberListingPageProps) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const size = searchParamsCache.get('limit');
  const search = searchParamsCache.get('q');

  // TODO: memberList에 query 붙으면 사용
  const filters = {
    page,
    limit: size,
    ...(search && { search })
  };

  // const cookieStore = cookies();
  // const accessToken = cookieStore.get(COOKIE_KEY.ACCESS_TOKEN)?.value;
  // const memberListQuery = await getDehydratedQuery({
  //   queryKey: memberQueryKeys.memberList({ page, size }),
  //   queryFn: async () => await getMemberList({ page, size }, accessToken)
  // });

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Member `}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={NAVIGATION_ROUTE.MEMBER_CREATE.HREF}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <MemberTable filters={filters} />
        {/* <Suspense fallback={<div>fallback</div>}>
          <Hydrate
            state={memberListQuery ? { queries: [memberListQuery] } : undefined}
          >
          </Hydrate>
        </Suspense> */}
      </div>
    </PageContainer>
  );
}
