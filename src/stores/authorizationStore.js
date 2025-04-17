import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  login: (password) => set({ isLoggedIn: password === "mums" }),
  logout: () => set({ isLoggedIn: false })
}))
