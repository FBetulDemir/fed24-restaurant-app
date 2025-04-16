import { create } from 'zustand'

export const useMenuStore = create((set) => ({
    menuItems: [],
    setMenuItems: (items) => set({ menuItems: items }),
    addItem: (item) => set((state) => ({ menuItems: [...state.menuItems, item] })),
    removeItem: (id) => set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id)
    }))
}))
  