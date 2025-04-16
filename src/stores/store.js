import { create } from 'zustand';

export const store = create((set) => ({
  menuItems: [
    { id: 1, name: 'Menu 1' },
    { id: 2, name: 'Menu 2' },
    { id: 3, name: 'Menu 3' },
  ], // ข้อมูลจำลองเริ่มต้น
  fetchMenu: async () => {
    try {
      // ใช้ API ถ้าใช้งานได้
      const response = await fetch('https://forverkliga.se/JavaScript/api/jsonStore.php');
      const data = await response.json();
      set({ menuItems: data });
    } catch (error) {
      console.error('Error fetching menu from API, using mock data:', error);
      // ถ้า API ล้มเหลว ใช้ mock data
      set({
        menuItems: [
          { id: 1, name: 'Menu 1' },
          { id: 2, name: 'Menu 2' },
          { id: 3, name: 'Menu 3' },
        ],
      });
    }
  },
  deleteMenu: async (id) => {
    try {
      // ส่งคำขอ DELETE ไปยัง API (ถ้าใช้งานได้)
      await fetch(`https://forverkliga.se/JavaScript/api/jsonStore.php?id=${id}`, {
        method: 'DELETE',
      });
      // อัปเดต state โดยกรองเมนูที่ถูกลบออก
      set((state) => ({
        menuItems: state.menuItems.filter((menu) => menu.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw error;
    }
  },
}));
