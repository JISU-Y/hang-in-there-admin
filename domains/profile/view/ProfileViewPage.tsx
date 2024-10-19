import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import ProfileCreateForm from '../components/ProfileCreateForm';
import PageContainer from '@domains/common/components/layout/page-container';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile', link: '/dashboard/profile' }
];
export default function ProfileViewPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProfileCreateForm categories={[]} initialData={null} />
      </div>
    </PageContainer>
  );
}
