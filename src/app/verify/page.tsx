import { validateSession } from '@/lib/server/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const { session } = await validateSession();
  if (!session) redirect('/login')

  return (
    <div>Please verify your account</div>
  )
}

