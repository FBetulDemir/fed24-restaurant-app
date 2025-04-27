import { useState, useEffect } from "react";
import { loadData } from "../components/Api";
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

  const increaseQuantity = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    saveData("temporary-test-cart", updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updated);
    saveData("temporary-test-cart", updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
			  <button className="quantity-control" onClick={() => decreaseQuantity(item.id)}>-</button>
			  <span>{item.quantity} st</span>
			  <button className="quantity-control" onClick={() => increaseQuantity(item.id)}>+</button>
			</div>
			<p>{item.price.toFixed(2)} kr</p>
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
