import "../styles/ProductPage.css";
import React, { useContext } from "react";
import { sushiMenu } from "../data/produktLists";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";
import MenuContext from "../components/MenuContext.jsx";
import imageSashimi from "../assets/sashimi.jpg"

const Sashimi = () => {
  const { menuData, error, loading } = useContext(MenuContext);
  const sashimiMenuList = menuData.sashimi;
  const sashimi = sushiMenu[2];
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.baseQuantity || 5,
      baseQuantity: item.baseQuantity || 5,
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
      price: item.extraBitPrice,
      quantity: 1,
      baseQuantity: item.baseQuantity || 5,
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
        <img src={imageSashimi} alt={sashimi.name} className="product-image" />
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
                  Lägg till {item.baseQuantity || 5} bitar
                </button>
                <span className="product-length">
                  {item.name} {item.price}:-
                </span>
                {item.extraBitPrice && (
                  <button
                    className="product-extra-btn"
                    disabled={!isBaseQuantityAdded(item.id, item.baseQuantity || 5)}
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