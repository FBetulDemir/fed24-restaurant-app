import React from "react";

const LoadCart = ({ saveKey, setCart }) => {
  const handleLoad = async () => {
    try {
		const response = await fetch(`https://forverkliga.se/JavaScript/api/jsonStore.php?method=load&key=${saveKey}`, {
        method: 'GET'
		
      });

      const data = await response.json();

      if (data) {
        setCart(JSON.parse(data));
        alert("Kundvagnen laddades!");
      } else {
        alert("Ingen kundvagn hittades.");
      }
    } catch (err) {
      console.error("Fel vid API-anrop:", err);
    }
  };

  return (
    <button onClick={handleLoad}>📦 Ladda kundvagnen</button>
  );
};

export default LoadCart;