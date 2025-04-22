import "../styles/Cart.css"
import Buttons from "./CartFunctions.jsx";
// import "../styles/cart.css";
// import "./CartFunctions";
// import { decreaseNumber, increaseNumber, numbers } from "./CartFunctions";

import { NavLink } from "react-router";

const Cart = () => {
  return (
    <div>
      <header></header>
      <h1 id="yourOrder">Din Beställning</h1>
      <section className="box">
        <div id="product1">
          <h2 id="title">Sushi 1</h2>
          <div className="desPic">
            <img id="pics" src="-" alt="Bild på sushi" />
            <p id="description"> {"beskrivning"} </p>
          </div>
          <div className="btns">
            <Buttons />
          </div>
        </div>
      </section>

      <section id="priceOrder">
        <div className="prices">
          <div id="price-numbers">{"PRIS EX MOMS"} KR</div>
          <p> 25% {"moms-priset"}</p>
          <div id="totalPrice">Totalt: {"PRIS INK MOMS"} KR</div>
        </div>

        <div className="orderNr">
          <p id="numbers"> ORDERNUMMER# {123456}</p>
          <button id="cancelOrdBtn"> ÅNGRA </button>
        </div>
      </section>

      <NavLink to="/pages/receipt/:receiptId?">
        <button id="processBtn">GÅ VIDARE</button>
      </NavLink>
    </div>
  );
};

export default Cart;
