import { create } from 'zustand';

const useAdminStore = create((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAdminStore;
