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

  const cart = useCartStore((state) => state.cart);
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

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 5,
      baseQuantity: 5,
      ingredients: item.ingredients || [],
      description: item.description || "",
      extraBitPrice: item.extraBitPrice,
      category: "sashimi",
    });
  };

  const handleAddExtraBit = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      baseQuantity: 5,
      ingredients: item.ingredients || [],
      description: item.description || "",
      extraBitPrice: item.extraBitPrice,
      category: "sashimi",
    });
  };

  const isBaseQuantityAdded = (id, baseQuantity) => {
    const item = cart.find((i) => i.id === id);
    return item && item.quantity >= baseQuantity;
  };

  return (
    <section className="product-page">
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
          sashimiMenuList.map((item, index) => (
            <div key={item.id || index} className="product-price">
              <p className="product-name">
                <button
                  className="product-buy-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Lägg till 5 bitar
                </button>
                <span className="product-length">
                  {item.name} {item.price}:-
                </span>
                {item.extraBitPrice && (
                  <button
                    className="product-extra-btn"
                    disabled={!isBaseQuantityAdded(item.id, 5)}
                    onClick={() => handleAddExtraBit(item)}
                  >
                    extra bit +{item.extraBitPrice}:-
                  </button>
                )}
              </p>
              {item.ingredients && (
                <p className="product-ingredients">{item.ingredients.join(", ")}</p>
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
