import React from 'react';
import receiptImg from "../assets/receipt.png";
import "../styles/receipt.css";
import { useNavigate } from 'react-router';
import { saveData } from '../components/Api';

const Receipt = ({ cart }) => {
  const items = Array.isArray(cart) ? cart : [];

  console.log('Cart in Receipt:', items);

  const getItemTotal = (item) => {
    const { quantity = 1, price, baseQuantity = 1, extraBitPrice = 0, isExtraBit = false } = item;
    const parsedPrice = parseFloat(price) || 0;
    const parsedExtraBitPrice = parseFloat(extraBitPrice) || 0;
    if (isExtraBit) {
      return parsedPrice * quantity;
    }
    const extraBits = Math.max(0, quantity - baseQuantity);
    return parsedPrice + extraBits * parsedExtraBitPrice;
  };

  const total = items.reduce((sum, item) => sum + getItemTotal(item), 0);
  console.log('Total in Receipt:', total);

  const navigate = useNavigate();

  const handleNewOrder = async () => {
    try {
      const success = await saveData("temporary-test-cart", []);
      if (success) {
        localStorage.removeItem("isushi_menu_2025_temporary-test-cart");
        navigate("/pages/menu/menu/");
      } else {
        console.error('Failed to clear cart in API.');
        alert('Misslyckades med att rensa kundวagnen. Förสök igen senare.');
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Ett fel inträffade vid rensningของ kundวagnen. Förสök igen senare.');
    }
  };

  return (
    <div className="receipt-layout">
      <div className="receipt-wrapper">
        <img src={receiptImg} alt="receipt" className="receipt-bg" />
        <section className="receipt-container">
          <h2>Tack för din beställning!</h2>
          <div className="receipt-divider"></div>
          <div className="receipt-items">
            {items.map((item, index) => {
              const itemId = item.id || `temp-id-${index}`;
              return (
                <div className="receipt-item" key={`${itemId}-${item.isExtraBit ? 'extra' : 'main'}-${index}`}>
                  <p>{item.name} {item.isExtraBit ? '(Extra bit)' : ''}</p>
                  <p>{item.quantity} st</p>
                  <p>{getItemTotal(item).toFixed(2)} kr</p>
                </div>
              );
            })}
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