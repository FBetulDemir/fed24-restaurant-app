import "../styles/ProductPage.css";
import React, { useState, useEffect } from "react";
import { sushiMenu } from "../data/produktLists";
import UploadAllMenus from "../components/uploadAllMenus.jsx";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const Sashimi = () => {
  const [sashimiMenuList, setSashimiMenuList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const sashimi = sushiMenu[2];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const sashimiItems = data.filter((item) => item.category === "sashimi");
          setSashimiMenuList(sashimiItems);
          if (sashimiItems.length === 0) {
            setError("No sashimi items found in the API response.");
          }
        } else {
          setError("API response is not a list of menu items.");
        }
      } catch (err) {
        console.error("Failed to load menu", err);
        setError("Could not load the menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="product-page">
      <UploadAllMenus />
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img src={sashimi.image} alt={sashimi.name} className="product-image" />
        <p className="product-sides">{sashimi.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Sashimi</h2>
        <p className="product-description">{sashimi.description}</p>
        {loading ? (
          <p>Loading menu...</p>
        ) : sashimiMenuList.length > 0 ? (
          sashimiMenuList.map((sashimi, index) => (
            <div key={sashimi.id || index} className="product-price">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till 5 bitar</button>
                <span className="product-length">
                  {sashimi.name} {sashimi.price}:-
                </span>
                {sashimi.extraBitPrice && (
                  <button className="product-extra-btn">
                    extra bit +{sashimi.extraBitPrice}:-
                  </button>
                )}
              </p>
              {sashimi.ingredients && 
                <p className="product-ingredients">
                  {sashimi.ingredients.join(", ")}
                </p>
              }
            </div>
          ))
        ) : (
          <p>No sashimi items available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Sashimi;