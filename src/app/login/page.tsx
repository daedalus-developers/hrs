import Login from '@/lib/components/Login'
import { validateSession } from '@/lib/server/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const { session } = await validateSession()
  if (session) redirect('/home')

  return (
    <div>
      <Login />
    </div>
  )
}

