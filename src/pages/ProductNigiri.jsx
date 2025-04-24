import "../styles/ProductPage.css";
import React, { useState, useEffect } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/uploadAllMenus.jsx";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const NigiriSushi = () => {
  const [nigiriMenuList, setNigiriMenuList] = useState([]);
  const [error, setError] = useState("");
  const nigiriSushi = sushiMenu[1];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const nigiriItems = data.filter((item) => item.category === "nigiri");
          setNigiriMenuList(nigiriItems);
          if (nigiriItems.length === 0) {
            setError("No nigiri items found in the API response.");
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
        <img src={nigiriSushi.image} alt={nigiriSushi.name} className="product-image" />
        <p className="product-sides">{nigiriSushi.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Nigiri Sushi</h2>
        <p className="product-description">{nigiriSushi.description}</p>
        {nigiriMenuList.length > 0 ? (
          nigiriMenuList.map((nigiri, index) => (
            <div key={nigiri.id || index} className="product-price">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till 2 bitar</button>
                <span className="product-length">
                  {nigiri.name} {nigiri.price}:-
                </span>
              </p>
              {nigiri.ingredients && (
                <p className="product-ingredients">{nigiri.ingredients.join(", ")}</p>
              )}
            </div>
          ))
        ) : (
          <p>No nigiri items available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default NigiriSushi;