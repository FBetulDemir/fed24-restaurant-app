import React, { useEffect, useState } from "react";
import Receipt from "./receipt"; 
import { loadData } from "../api/api"; 

const ReceiptPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await loadData("temporary-test-cart"); // ändra KEY sen
      if (data) {
        setCart(JSON.parse(data));
      }
    };

    fetchCart();
  }, []);

  if (!cart) return <p>Laddar kvitto...</p>;

  return <Receipt cart={cart} />;
};

export default ReceiptPage;
