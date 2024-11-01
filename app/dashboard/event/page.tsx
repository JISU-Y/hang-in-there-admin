import { searchParamsCache } from '@logics/utils/searchParamsHandlers';
import { SearchParams } from 'nuqs/parsers';
import { EventListingPage } from '@domains/event/views';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Events'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <EventListingPage />;
}
