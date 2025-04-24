import "../styles/ProductPage.css";
import React, { useState, useEffect } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/uploadAllMenus.jsx";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const DrinksMenu = () => {
  const [drinkList, setDrinkList] = useState([]);
  const [error, setError] = useState("");
  const drinks = sushiMenu[3];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const drinkItems = data.filter((item) => item.category === "drink");
          setDrinkList(drinkItems);
          if (drinkItems.length === 0) {
            setError("No drinks found in the API response.");
          }
        } else {
          setError("API response is not a list of menu items.");
        }
      } catch (err) {
        console.error("Failed to load menu", err);
        setError("Could not load the menu.");
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="product-page">
      <UploadAllMenus />
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img src={drinks.image} alt={drinks.name} className="product-image" />
        <p className="product-sides">{drinks.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Beverages</h2>
        <p className="product-description">{drinks.description}</p>
        {drinkList.length === 0 && !error ? (
          <p>Loading drinks...</p>
        ) : (
          drinkList.map((drink, index) => (
            <div key={drink.id || index} className="product-price-drinks-nigiri">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till</button>
                {drink.name} <span className="product-space-price">{drink.price}:-</span>
                {drink.volume && (
                  <span className="product-volume"> (volume {drink.volume} l)</span>
                )}
              </p>
              {drink.ingredients && (
                <p className="product-ingredients">
                  {drink.ingredients.join(", ")}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DrinksMenu;