import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import PageContainer from '@domains/common/components/layout/page-container';
import ProfileUpdateForm from '../components/ProfileUpdateForm';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile', link: '/dashboard/profile' }
];

export default function ProfileViewPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProfileUpdateForm categories={[]} initialData={null} />
      </div>
    </PageContainer>
  );
}
