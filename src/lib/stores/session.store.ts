import { Session } from 'lucia'
import { create } from 'zustand'

const useSessionStore = create((set) => ({
  session: null,
  setSession: (session: Session) => set({ session: session }),
  removeSession: () => set({ session: null })
}))

export { useSessionStore }
