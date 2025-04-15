import React from 'react';
import receiptImg from "../assets/receipt.png";
import "../styles/receipt.css";

const Receipt = () => {
  return (
    <div className="receipt-layout">
      <div className="receipt-wrapper">
        <img src={receiptImg} alt="receipt" className="receipt-bg" />
        <section className="receipt-container"> 
          <h2>Tack för din beställning</h2>
          <p className="order-number">#1235566</p>
          Maki roll x2 45kr<br />
          Sushi mega x2 50kr<br />
          Sushi oma x2 68kr<br />
          <br />
          Totalt 326kr
          <br /><br />
          <button className="new-order">Ny beställning</button>
        </section>
      </div>
    </div>
  );
};

export default Receipt;
