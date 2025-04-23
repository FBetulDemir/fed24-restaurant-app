	import React from 'react';
	import receiptImg from "../assets/receipt.png";
	import "../styles/receipt.css";

	const Receipt = ({ cart }) => {
	const items = Array.isArray(cart) ? cart : [];
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const totalUtanMoms = total;

	return (
		<div className="receipt-layout">
			<div className="receipt-wrapper">
				<img src={receiptImg} alt="receipt" className="receipt-bg" />
				<section className="receipt-container"> 
				<h2>Tack för din beställning!</h2>
				<div className="receipt-divider"></div>
				<p className="order-number">Order nummer: #1235566</p>
				<div className="receipt-items">
					{items.map((item, index) => (
					<div className="receipt-item" key={index}>
						<p>{item.name}</p>
						<p>x{item.quantity}</p>
						<p>{item.price}kr</p>
					</div>
					))}
				</div>
				<div className="receipt-divider"></div>
				<p className="receipt-total">Totalt: {totalUtanMoms.toFixed(2)} kr</p>
				<button className="new-order">Ny beställning</button>
				</section>
			</div>
		</div>
	);
	};

	export default Receipt;
