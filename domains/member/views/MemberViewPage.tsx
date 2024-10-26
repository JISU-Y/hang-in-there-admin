import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import { ScrollArea } from '@domains/common/components/ui/scroll-area';
import MemberForm from '../components/MemberForm';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';

const breadcrumbItems = [
  { title: 'Dashboard', link: NAVIGATION_ROUTE.DASHBOARD.HREF },
  { title: 'Member', link: NAVIGATION_ROUTE.MEMBER.HREF },
  { title: 'Create', link: NAVIGATION_ROUTE.MEMBER_CREATE.HREF }
];

export default function MemberViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <MemberForm />
      </div>
    </ScrollArea>
  );
}
