import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import PageContainer from '@domains/common/components/layout/page-container';
import BannerTable from '../components/BannerTable/BannerTable';
import { buttonVariants } from '@domains/common/components/ui/button';
import { Heading } from '@domains/common/components/ui/heading';
import { Separator } from '@domains/common/components/ui/separator';
import { searchParamsCache } from '@logics/utils/searchParamsHandlers';
import { cn } from '@logics/utils/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { BannerStatusType, StringBooleanType } from '@models/client';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Banner', link: '/dashboard/banner' }
];

export default async function BannerListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');
  const useYn = searchParamsCache.get('useYn') as StringBooleanType;
  const status = searchParamsCache.get('status') as BannerStatusType;

  const filters = {
    page,
    size: pageLimit,
    ...(useYn && { useYn }),
    ...(status && { status })
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title="배너 리스트"
            description="배너 리스트를 수정할 수 있습니다."
          />
          <Link
            href={NAVIGATION_ROUTE.BANNER_NEW.HREF}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <BannerTable filters={filters} />
      </div>
    </PageContainer>
  );
}
