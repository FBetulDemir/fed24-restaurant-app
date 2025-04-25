import "../styles/ProductPage.css";
import React, { useState, useEffect } from "react";
import { sushiMenu } from "../data/produktLists";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const Sashimi = () => {
  const [sashimiMenuList, setSashimiMenuList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const sashimi = sushiMenu[2];

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const sashimiItems = data.filter((item) => item.category === "sashimi");
          setSashimiMenuList(sashimiItems);
          if (sashimiItems.length === 0) {
            setError("Inga sashimi-objekt hittades i API-svaret.");
          }
        } else {
          setError("API-svaret är inte en lista över menyobjekt.");
        }
      } catch (err) {
        console.error("Misslyckades med att ladda menyn", err);
        setError("Kunde inte ladda menyn.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMenu();
  }, []);

  	const handleAddToCart = (sashimi) => {
    addToCart({
      id: sashimi.id,
      name: sashimi.name,
      price: sashimi.price,
      quantity: 5,
      ingredients: sashimi.ingredients || [],
    });
  };
  
  return (
    <section className="product-page">
      {/* <UploadAllMenus /> */}
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img src={sashimi.image} alt={sashimi.name} className="product-image" />
        <p className="product-sides">{sashimi.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Sashimi</h2>
        <p className="product-description">{sashimi.description}</p>
        {loading ? (
          <p>Laddar meny...</p>
        ) : sashimiMenuList.length > 0 ? (
          sashimiMenuList.map((sashimi, index) => (
            <div key={sashimi.id || index} className="product-price">
              <p className="product-name">
			  	<button
                	className="product-buy-btn"
                	onClick={() => handleAddToCart(sashimi)}>
                  	Lägg till 5 bitar
                </button>
                <span className="product-length">
                  {sashimi.name} {sashimi.price}:-
                </span>
                {sashimi.extraBitPrice && (
                  <button className="product-extra-btn">
                    extra bit +{sashimi.extraBitPrice}:-
                  </button>
                )}
              </p>
              {sashimi.ingredients && (
                <p className="product-ingredients">
                  {sashimi.ingredients.join(", ")}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>Inga sashimi-objekt tillgängliga för tillfället.</p>
        )}
      </div>
    </section>
  );
  };
  
  export default Sashimi;