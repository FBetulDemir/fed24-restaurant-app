import "../styles/ProductPage.css";
import React, { useState, useEffect } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/uploadAllMenus.jsx";
import { useCart } from "../components/CartFunctions.jsx";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const MakiSushi = () => {
  const [makiMenuList, setMakiMenuList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const makiSushi = sushiMenu[0];
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const makiItems = data.filter((item) => item.category === "maki");
          setMakiMenuList(makiItems);
          if (makiItems.length === 0) {
            setError("No maki items found in the API response.");
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

// Function to handle adding item to cart
const handleAddToCart = (maki) => {
  addToCart({
    id: maki.id,
    name: maki.name,
    price: maki.price,
    quantity: 8,
    ingredients: maki.ingredients || [],
  });
};


  return (
    <section className="product-page">
      <UploadAllMenus />
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img src={makiSushi.image} alt={makiSushi.name} className="product-image" />
        <p className="product-sides">{makiSushi.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Maki Sushi</h2>
        <p className="product-description">{makiSushi.description}</p>
        {loading ? (
          <p>Loading menu...</p>
        ) : makiMenuList.length > 0 ? (
          makiMenuList.map((maki, index) => (
            <div key={maki.id || index} className="product-price">
              <p className="product-name">
              <button
                  className="product-buy-btn"
                  onClick={() => handleAddToCart(maki)}
                >
                  Lägg till 8 bitar
                </button>
                <span className="product-length">
                  {maki.name} {maki.price}:-
                </span>
                {maki.extraBitPrice && (
                  <button className="product-extra-btn">
                    extra bit +{maki.extraBitPrice}:-
                  </button>
                )}
              </p>
              {maki.ingredients && (
                <p className="product-ingredients">{maki.ingredients.join(", ")}</p>
              )}
            </div>
          ))
        ) : (
          <p>No maki items available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default MakiSushi;