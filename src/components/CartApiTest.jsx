import { useState } from "react";
import { saveData, loadData } from "./Api.js"

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const CART_KEY = "temporary-test-cart";

export default function CartApiTest() {
  const [status, setStatus] = useState(null);
  const [loadedCart, setLoadedCart] = useState(null);

  const testCart = [
    { id: 1, name: "Burger", price: 79, quantity: 2 },
    { id: 2, name: "Pommes", price: 29, quantity: 1 }
  ];

  const saveCart = async () => {
	const success = await saveData(CART_KEY, testCart);
	setStatus(success ? "Cart saved successfully!" : "Failed to save cart.");
  };
  
  const loadCart = async () => {
	const data = await loadData(CART_KEY);
	if (data) {
	  setLoadedCart(data);
	  setStatus("Cart loaded!");
	} else {
	  setStatus("No cart found.");
	}
  };

  return (
    <div>
      <h2>Testa API för kundvagn</h2>
      <button onClick={saveCart}>Spara kundvagn</button>
      <button onClick={loadCart}>Ladda kundvagn</button>
      {status && <p>{status}</p>}
      {loadedCart && (
        <pre>{JSON.stringify(loadedCart, null, 2)}</pre>
      )}
    </div>
  );
}
