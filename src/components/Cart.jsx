import "../styles/Cart.css";
// import Buttons from "./CartFunctions.jsx";
import "./CartFunctions";
import { NavLink } from "react-router";
import { useCart } from "./CartFunctions";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
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
              <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
            </div> 
          </div>
        </section>
      ))}

      <section id="priceOrder">
        <div className="prices">
          <div id="totalPrice">Totalt: {total.toFixed(2)} KR</div>
        </div>

        <div className="orderNr">
          <p id="numbers">ORDERNUMMER# {Math.floor(Math.random() * 1000000)}</p>
          <button id="cancelOrdBtn" onClick={clearCart}>ÅNGRA</button>
        </div>
      </section>

      <NavLink to="/pages/receipt/:receiptId?">
        <button id="processBtn">GÅ VIDARE</button>
      </NavLink>
    </div>
  );
};

export default Cart;
