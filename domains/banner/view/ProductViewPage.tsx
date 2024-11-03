import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import { ScrollArea } from '@domains/common/components/ui/scroll-area';
import React from 'react';
import ProductForm from '../components/ProductForm';
import PageContainer from '@domains/common/components/layout/page-container';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Banner', link: '/dashboard/banner' },
  { title: 'Create', link: '/dashboard/banner/create' }
];

export default function ProductViewPage() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm />
      </div>
    </PageContainer>
  );
}
