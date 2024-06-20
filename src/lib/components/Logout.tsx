import { redirect } from "next/navigation";
import { invalidateSession } from "@/server/auth"

export const logout = async () => {
  'use server'
  await invalidateSession();
  redirect('/login')
}

export default function Logout() {
  return (
    <div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

