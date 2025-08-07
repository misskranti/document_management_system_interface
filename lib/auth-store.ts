"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  isAdmin: boolean
  token: string | null
  login: (token: string, isAdmin?: boolean) => void
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isAdmin: false,
      token: null,

      login: (token: string, isAdmin = false) => {
        set({
          isAuthenticated: true,
          isAdmin,
          token,
        })
      },

      logout: () => {
        set({
          isAuthenticated: false,
          isAdmin: false,
          token: null,
        })
      },

      checkAuth: () => {
        const { token } = get()
        if (token) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
