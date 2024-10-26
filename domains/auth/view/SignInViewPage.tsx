import { Metadata } from 'next';

import SignInForm from '../components/SignInForm';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        로그인
      </h1>
      <SignInForm />
    </div>
  );
}
