import { User } from 'lucia'
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  setUser: (user: User) => set({ user: user }),
  removeUser: () => set({ user: null })
}))

export { useUserStore }
