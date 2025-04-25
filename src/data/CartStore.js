import { create } from "zustand";
import { saveData, loadData } from "../components/Api";

const CART_KEY = "temporary-test-cart";

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (item) => {
    const existing = get().cart.find(p => p.id === item.id);
    let updatedCart;
    if (existing) {
      updatedCart = get().cart.map(p =>
        p.id === item.id
          ? { ...p, quantity: p.quantity + (item.quantity || 1) }
          : p
      );
    } else {
      updatedCart = [...get().cart, { ...item, quantity: item.quantity || 1 }];
    }
    saveData(CART_KEY, updatedCart);
    set({ cart: updatedCart });
  },
  removeFromCart: (id) => {
    const updatedCart = get().cart.filter(item => item.id !== id);
    saveData(CART_KEY, updatedCart);
    set({ cart: updatedCart });
  },
  clearCart: () => {
    saveData(CART_KEY, []);
    set({ cart: [] });
  },
  initializeCart: () => {
    loadData(CART_KEY).then((storedCart) => {
      if (storedCart) {
        set({ cart: storedCart });
      }
    });
  }
}));
