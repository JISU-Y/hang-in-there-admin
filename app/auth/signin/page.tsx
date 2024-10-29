import { SignInViewPage } from '@domains/auth/view';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <SignInViewPage />
    </Suspense>
  );
}
