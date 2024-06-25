import { SelectUser } from '@types'
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  setUser: (user: SelectUser) => set({ user: user }),
  removeUser: () => set({ user: null })
}))

export { useUserStore }
