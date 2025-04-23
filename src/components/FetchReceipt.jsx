import React, { useEffect, useState } from "react";
import Receipt from "./receipt"; 
import { loadData } from "./Api.js";

const testCart = [
  { name: "Maki roll", quantity: 1, price: 45 },
  { name: "Sushi mega", quantity: 1, price: 50 },
  { name: "Sushi oma", quantity: 1, price: 68 },
];

const FetchReceipt = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await loadData("temporary-test-cart");
        if (data) {
          setCart(JSON.parse(data));
        }
      } catch (err) {
        console.error("Kunde inte hämta kundvagnen:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const cartToUse = cart || testCart;
  
  console.log("cart:", cart);
  console.log("cartToUse:", cartToUse);

  if (loading) return <p>Laddar kvitto...</p>;

  return <Receipt cart={cartToUse} />;
};

export default FetchReceipt;
