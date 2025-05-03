import { create } from "zustand";
import { saveData, loadData } from "../components/Api";

const CART_KEY = "temporary-test-cart";

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: async (item) => {
    try {
      const existing = get().cart.find(p =>
        p.id === item.id &&
        p.isExtraBit === item.isExtraBit &&
        p.category === item.category &&
        p.name === item.name // เพิ่ม name เพื่อแยกรายการเครื่องดื่ม
      );
      let updatedCart;
      if (existing) {
        updatedCart = get().cart.map(p =>
          p.id === item.id && p.isExtraBit === item.isExtraBit && p.category === item.category && p.name === item.name
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      } else {
        updatedCart = [...get().cart, { ...item, quantity: item.quantity || 1 }];
      }
      const success = await saveData(CART_KEY, updatedCart);
      if (success) {
        set({ cart: updatedCart });
        console.log('Cart updated:', updatedCart);
      } else {
        console.error('Failed to save cart to API.');
        alert('Misslyckades med att spara kundวagnen. Förสök igen senare.');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Ett fel inträffade vid tilläggถึง kundวagnen. Förสök igen senare.');
    }
  },
  removeFromCart: async (id, isExtraBit, category, name) => {
    try {
      const updatedCart = get().cart.filter(item =>
        !(item.id === id && item.isExtraBit === isExtraBit && item.category === category && item.name === name)
      );
      const success = await saveData(CART_KEY, updatedCart);
      if (success) {
        set({ cart: updatedCart });
      } else {
        console.error('Failed to save cart to API.');
        alert('Misslyckades med att spara kundวagnen. Förสök igen senare.');
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      alert('Ett fel inträffade vid borttagningจาก kundวagnen. Förสök igen senare.');
    }
  },
  clearCart: async () => {
    try {
      const success = await saveData(CART_KEY, []);
      if (success) {
        set({ cart: [] });
      } else {
        console.error('Failed to save cart to API.');
        alert('Misslyckades med att spara kundวagnen. Förสök igen senare.');
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Ett fel inträffade vid rensningของ kundวagnen. Förสök igen senare.');
    }
  },
  initializeCart: async () => {
    try {
      const storedCart = await loadData(CART_KEY);
      if (storedCart) {
        set({ cart: storedCart });
      }
    } catch (err) {
      console.error('Error initializing cart:', err);
    }
  },
}));
