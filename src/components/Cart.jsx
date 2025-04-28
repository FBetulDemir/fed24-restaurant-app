import { useState, useEffect } from "react";
import { loadData, saveData } from "../components/Api";
import "../styles/Cart.css";
import { NavLink } from "react-router";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await loadData("temporary-test-cart");
      if (data) setCart(data);
    };
    fetchCart();
  }, []);

  const increaseQuantity = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    saveData("temporary-test-cart", updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cart
      .map(item => {
        if (item.id !== id) return item;

        const minQuantity =
          item.category === "maki" ? 8 :
          item.category === "sashimi" ? 5 :
          item.category === "nigiri" ? 2 :
          1; // drinks and others

        const newQuantity = item.quantity - 1;

        if (newQuantity < minQuantity) {
          return item.category === "drinks" && newQuantity < 1 ? null : item;
        }

        return { ...item, quantity: newQuantity };
      })
      .filter(item => item !== null && item.quantity > 0);

    setCart(updated);
    saveData("temporary-test-cart", updated);
  };

  const handleClearCart = () => {
    setCart([]);
    saveData("temporary-test-cart", []);
  };

  const getItemTotal = (item) => {
    const quantity = item.quantity || 1;
    const basePrice = item.basePrice || item.price;
    const extraBitPrice = item.extraBitPrice || 0;

    if (item.category === "maki") {
      const extraBits = Math.max(0, quantity - 8);
      return basePrice + extraBits * extraBitPrice;
    }

    if (item.category === "sashimi") {
      const extraBits = Math.max(0, quantity - 5);
      return basePrice + extraBits * extraBitPrice;
    }

    if (item.category === "nigiri") {
      return basePrice * quantity;
    }

    return basePrice * quantity;
  };

  const total = cart.reduce((sum, item) => sum + getItemTotal(item), 0);

  return (
    <div>
      <header></header>
      <h1 id="yourOrder">Din Beställning</h1>

      {cart.map((item, index) => (
        <section className="box" key={item.id || index}>
          <div className="product">
            <h2 id="title">{item.name}</h2>
            <div className="desPic">
              <img id="pics" src="-" alt={`Bild på ${item.name}`} />
              <p id="description">{item.description || ""}</p>
            </div>
            <div className="btns">
              <div className="cart-quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity} st</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <p>{getItemTotal(item).toFixed(2)} kr</p>
            </div>
          </div>
        </section>
      ))}

      <section id="priceOrder">
        <div className="prices">
          <div id="totalPrice">Totalt: {total.toFixed(2)} KR</div>
        </div>

        <div className="orderNr">
          <button id="cancelOrdBtn" onClick={handleClearCart}>ÅNGRA</button>
        </div>
      </section>

      <NavLink to="/pages/receipt/:receiptId?">
        <button id="processBtn">GÅ VIDARE</button>
      </NavLink>
    </div>
  );
};

export default Cart;
