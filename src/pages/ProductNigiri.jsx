import "../styles/ProductPage.css";
import React, { useState, useEffect } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const NigiriSushi = () => {
  const [nigiriMenuList, setNigiriMenuList] = useState([]);
  const [error, setError] = useState("");
  const nigiriSushi = sushiMenu[1];

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const nigiriItems = data.filter((item) => item.category === "nigiri");
          setNigiriMenuList(nigiriItems);
          if (nigiriItems.length === 0) {
            setError("Inga nigiri-objekt hittades i API-svaret.");
          }
        } else {
          setError("API-svaret är inte en lista över menyobjekt.");
        }
      } catch (err) {
        console.error("Misslyckades med att ladda menyn", err);
        setError("Kunde inte ladda menyn.");
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (nigiri) => {
    addToCart({
      id: nigiri.id,
      name: nigiri.name,
      price: nigiri.price,
      quantity: 2,
	  category: "nigiri",
	  baseQuantity: 2,
	  description: nigiri.description,	
      ingredients: nigiri.ingredients || [],
	  extraBitPrice: nigiri.extraBitPrice,
    });
  };



  return (
    <section className="product-page">
      {/* <UploadAllMenus /> */}
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
			  <button
                  className="product-buy-btn"
                  onClick={() => handleAddToCart(nigiri)}
                >
                  Lägg till 2 bitar
                </button>
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
          <p>Inga nigiri-objekt tillgängliga för tillfället.</p>
        )}
      </div>
    </section>
  );
};

export default NigiriSushi;