import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api, { clearStoredAuth } from '../services/api'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: ({ user, token }) => set({ user, token }),
      logout: async () => {
        try {
          await api.post('/logout')
        } catch {
          // Ignore logout API failures and clear local state anyway.
        } finally {
          clearStoredAuth()
          set({ user: null, token: null })
        }
      },
    }),
    {
      name: 'pagecraft-auth',
    },
  ),
)

export default useAuthStore
