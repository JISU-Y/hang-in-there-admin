import { Breadcrumbs } from '@domains/common/components/BreadcrumbLinks';
import { ScrollArea } from '@domains/common/components/ui/scroll-area';
import { NAVIGATION_ROUTE } from '@domains/common/constants/route';
import EventForm from '../components/EventForm';

const breadcrumbItems = [
  { title: 'Dashboard', link: NAVIGATION_ROUTE.DASHBOARD.HREF },
  { title: 'Event', link: NAVIGATION_ROUTE.EVENT.HREF },
  { title: 'Update', link: NAVIGATION_ROUTE.EVENT_DETAIL.HREF }
];

export default function EventViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <EventForm />
      </div>
    </ScrollArea>
  );
}
