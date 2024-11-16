import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import React from 'react';
import BannerForm from '../components/BannerForm';
import PageContainer from '@domains/common/components/layout/page-container';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Banner', link: '/dashboard/banner' },
  { title: 'Create', link: '/dashboard/banner/create' }
];

export default function BannerViewPage() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <BannerForm />
      </div>
    </PageContainer>
  );
}
