import "../styles/ProductPage.css";
import React, { useContext } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";
import MenuContext from "../components/MenuContext.jsx";

const NigiriSushi = () => {
  const { menuData, error, loading } = useContext(MenuContext);
  const nigiriMenuList = menuData.nigiri;
  const nigiriSushi = sushiMenu[1];
  const addToCart = useCartStore((state) => state.addToCart);

  console.log("📋 Nigiri menydata:", nigiriMenuList);

  const handleAddToCart = (nigiri) => {
    addToCart({
      id: nigiri.id,
      name: nigiri.name,
      price: nigiri.price,
      quantity: nigiri.baseQuantity || 2,
      baseQuantity: nigiri.baseQuantity || 2,
      ingredients: nigiri.ingredients || [],
      description: nigiri.description || "",
      extraBitPrice: nigiri.extraBitPrice,
      category: "nigiri",
    });
  };

  return (
    <section className="product-page">
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img
          src={nigiriSushi.image}
          alt={nigiriSushi.name}
          className="product-image"
        />
        <p className="product-sides">{nigiriSushi.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Nigiri Sushi</h2>
        <p className="product-description">{nigiriSushi.description}</p>
        {loading ? (
          <p>Laddar meny...</p>
        ) : nigiriMenuList.length > 0 ? (
          nigiriMenuList.map((nigiri, index) => (
            <div key={nigiri.id || index} className="product-price">
              <p className="product-name">
                <button
                  className="product-buy-btn"
                  onClick={() => handleAddToCart(nigiri)}
                >
                  Lägg till {nigiri.baseQuantity || 2} bitar
                </button>
                <span className="product-length">
                  {nigiri.name} {nigiri.price}:-
                </span>
              </p>
              {nigiri.ingredients && nigiri.ingredients.length > 0 && (
                <p className="product-ingredients">
                  {nigiri.ingredients.join(", ")}
                </p>
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