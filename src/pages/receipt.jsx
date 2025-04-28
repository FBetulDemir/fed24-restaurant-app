import React from 'react';
import receiptImg from "../assets/receipt.png";
import "../styles/receipt.css";
import { useNavigate } from 'react-router';
import { saveData } from '../components/Api';

const Receipt = ({ cart }) => {
  const items = Array.isArray(cart) ? cart : [];

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

  const total = items.reduce((sum, item) => sum + getItemTotal(item), 0);

  const navigate = useNavigate();

  const handleNewOrder = async () => {
	await saveData("temporary-test-cart", []);
	localStorage.removeItem("isushi_menu_2025_temporary-test-cart");
	navigate("/pages/menu/menu/");
  };

  return (
    <div className="receipt-layout">
      <div className="receipt-wrapper">
        <img src={receiptImg} alt="receipt" className="receipt-bg" />
        <section className="receipt-container"> 
          <h2>Tack för din beställning!</h2>
          <div className="receipt-divider"></div>
          <div className="receipt-items">
            {items.map((item, index) => (
              <div className="receipt-item" key={index}>
                <p>{item.name}</p>
                <p>{item.quantity} st</p>
                <p>{getItemTotal(item).toFixed(2)} kr</p>
              </div>
            ))}
          </div>
          <div className="receipt-divider"></div>
          <p className="receipt-total">Totalt: {total.toFixed(2)} kr</p>
          <button className="new-order" onClick={handleNewOrder}>Ny beställning</button>
        </section>
      </div>
    </div>
  );
};

export default Receipt;
