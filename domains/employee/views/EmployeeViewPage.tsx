import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import { ScrollArea } from '@domains/common/components/ui/scroll-area';
import EmployeeForm from '../components/EmployeeForm';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' },
  { title: 'Create', link: '/dashboard/employee/create' }
];

export default function EmployeeViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeForm />
      </div>
    </ScrollArea>
  );
}
