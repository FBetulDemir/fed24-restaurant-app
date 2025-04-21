import React from "react";

const SaveCart = ({ cart, saveKey }) => {
  const handleSave = async () => {
    try {
		const response = await fetch("https://forverkliga.se/JavaScript/api/jsonStore.php?method=save", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: saveKey,
          value: JSON.stringify(cart)
        })
      });

      if (response.ok) {
        alert("Kundvagnen sparades!");
      } else {
        alert("Något gick fel vid sparandet.");
      }
    } catch (err) {
      console.error("Fel vid API-anrop:", err);
    }
  };

  return (
    <button onClick={handleSave}> Spara kundvagnen </button>
  );
};

export default SaveCart;