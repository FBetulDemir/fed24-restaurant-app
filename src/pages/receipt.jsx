import React from 'react';
import receiptImg from "../assets/receipt.png";
import "../styles/receipt.css";
import { useParams } from "react-router"

const testCart = [
	{ name: "Maki roll", quantity: 12, price: 45 },
	{ name: "Sushi mega", quantity: 9, price: 50 },
	{ name: "Sushi oma", quantity: 15, price: 68 },
  ];

const total = testCart.reduce((sum, item) => {
	return sum + item.price * item.quantity;
}, 0);

// plocka bort hårdkodad testcart och lägg till den data so mvi skapar tillsammans
// lägga till : <Route path="/kvitto" element={<Receipt />} /> i app.jsx
const moms = total * 0.25;
const totalMedMoms = total + moms;


const Receipt = () => {
	const { receiptId } = useParams()
	return (

    <div className="receipt-layout">
      <div className="receipt-wrapper">
			<img src={receiptImg} alt="receipt" className="receipt-bg" />
			<section className="receipt-container"> 
				<h2> Tack för din beställning! </h2>
				<div className="receipt-divider"></div>
				<p className="order-number">Order nummer: #1235566</p>
				<div className="receipt-items">
					{testCart.map((item, index) => (
					<div className="receipt-item" key={index}>
					<p>{item.name}</p>
					<p>x{item.quantity}</p>
					<p>{item.price}kr</p>
					</div>
					))}
				</div>
				<div className="receipt-divider"></div>
				<p className="receipt-moms">Moms (25%): {moms.toFixed(2)} kr</p>
				<p className="receipt-total-incl">Totalt inkl. moms: {totalMedMoms.toFixed(2)} kr</p>
				<button className="new-order">Ny beställning</button>
			</section>
      </div>
    </div>
  );
};

export default Receipt;
