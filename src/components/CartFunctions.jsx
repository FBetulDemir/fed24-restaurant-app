import { useEffect, useState } from "react";
import { saveData, loadData } from "./Api";

const CART_KEY = "temporary-test-cart";

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await loadData(CART_KEY);
      if (data) {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setCart(parsed);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    saveData(CART_KEY, cart);
  }, [cart]);

  const addToCart = (item) => {
	setCart(prev => {
	  const existing = prev.find(p => p.id === item.id);
	  const qtyToAdd = item.quantity || 1;
  
	  if (existing) {
		return prev.map(p => p.id === item.id
		  ? { ...p, quantity: p.quantity + qtyToAdd }
		  : p);
	  }
  
	  return [...prev, { ...item, quantity: qtyToAdd }];
	});
  };
  

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, clearCart };
}
