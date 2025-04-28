import { useState, useEffect } from "react";
import { loadData, saveData } from "../components/Api";
import "../styles/Cart.css";
import { NavLink } from "react-router";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCart = async () => {
      const data = await loadData("temporary-test-cart");
      if (data) setCart(data);
      else setCart([]);
    };
    fetchCart();
  }, [location]);

  const increaseQuantity = (id) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          quantity: item.quantity + 1
        };
        return updatedItem;
      }
      return item;
    });
    setCart(updated);
    saveData("temporary-test-cart", updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cart
      .map(item => {
        if (item.id === id) {
          const min = item.baseQuantity ?? 1;
          const isDrink = item.category === "drinks";
          const newQuantity = item.quantity - 1;

          if (isDrink && newQuantity <= 0) return null;
          if (!isDrink && newQuantity < min) return null;

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCart(updated);
    saveData("temporary-test-cart", updated);
  };

  const handleClearCart = () => {
    setCart([]);
    saveData("temporary-test-cart", []);
  };

  const getItemTotal = (item) => {
    const {
      quantity = 1,
      price,
      baseQuantity = 1,
      extraBitPrice = 0,
    } = item;

    if (!extraBitPrice) {
      return price * quantity;
    }

    const extraBits = Math.max(0, quantity - baseQuantity);
    return price + extraBits * extraBitPrice;
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
              {/* <img id="pics" src="-" alt={`Bild på ${item.name}`} /> */}
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
