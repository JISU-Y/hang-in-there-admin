import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin : register'
};

export default function page() {
  redirect('/auth/signin');
}
