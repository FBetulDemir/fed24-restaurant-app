import { useState, useEffect } from "react";
import { loadData } from "../components/Api"; // justera sökväg
import "../styles/Cart.css";
import { NavLink } from "react-router";
import { saveData } from "../components/Api";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await loadData("temporary-test-cart");
      if (data) setCart(data);
    };
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <header></header>
      <h1 id="yourOrder">Din Beställning</h1>

      {cart.map((item, index) => (
        <section className="box" key={item.id || index}>
          <div id={`product-${index}`}>
            <h2 id="title">{item.name}</h2>
            <div className="desPic">
              <img id="pics" src="-" alt={`Bild på ${item.name}`} />
              <p id="description">{"beskrivning"}</p>
            </div>
            <div className="btns">
              <p>x{item.quantity}</p>
              <p>{item.price} kr</p>
            </div>
          </div>
        </section>
      ))}

      <section id="priceOrder">
        <div className="prices">
          <div id="totalPrice">Totalt: {total.toFixed(2)} KR</div>
        </div>

        <div className="orderNr">
		<button
  			id="cancelOrdBtn"
  			onClick={() => {
    		setCart([]);
    		saveData("temporary-test-cart", []);
  			}}>
  			ÅNGRA
		</button>
        </div>
      </section>

      <NavLink to="/pages/receipt/:receiptId?">
        <button id="processBtn">GÅ VIDARE</button>
      </NavLink>
    </div>
  );
};

export default Cart;
