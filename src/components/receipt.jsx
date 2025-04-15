import React from 'react';
import receiptImg from "../assets/receipt.png";
import "../styles/receipt.css";

const Receipt = () => {


    return (
		<>
		<img src={receiptImg} alt="receipt" />
		<section className="receipt"> 
			 <h2> Tack för din beställning </h2>
			 <p className="order-number"> #1235566 </p>
			 Maki roll x2 45kr
			 sushi mega x2 50kr
			 sushi oma x2 68kr

			 totalt 326kr
			 <button className="new-order"> Ny beställning </button>

		</section>
		</>
    );
};

export default Receipt