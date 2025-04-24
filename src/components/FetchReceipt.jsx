import React, { useEffect, useState } from "react";
import Receipt from "../pages/receipt.jsx";
import { loadData } from "./Api.js";

const testCart = [];


const FetchReceipt = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await loadData("temporary-test-cart");
        if (data) {
			const parsed = typeof data === "string" ? JSON.parse(data) : data;
			setCart(parsed);
		  }
      } catch (err) {
        console.error("Kunde inte hämta kundvagnen:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

//   const cartToUse = cart || testCart;
	const cartToUse = (Array.isArray(cart) && cart.length > 0) ? cart : testCart;

  if (loading) return <p>Laddar kvitto...</p>;

  return <Receipt cart={cartToUse} />;
};

export default FetchReceipt;
