import { KanbanViewPage } from '@domains/kanban/view';

export const metadata = {
  title: 'Dashboard : Kanban view'
};

export default function page() {
  return <KanbanViewPage />;
}
