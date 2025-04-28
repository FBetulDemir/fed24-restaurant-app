import "../styles/ProductPage.css";
import React, { useState, useContext } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";
import Toast from "../components/Toast.jsx";
import MenuContext from "../components/MenuContext.jsx";

const MakiSushi = () => {
  const { menuData, error, loading } = useContext(MenuContext);
  const makiMenuList = menuData.maki;
  const makiSushi = sushiMenu[0];
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  console.log("📋 Maki menydata:", makiMenuList);

  const handleAddToCart = (maki) => {
    addToCart({
      id: maki.id,
      name: maki.name,
      price: maki.price,
      quantity: maki.baseQuantity || 8,
      baseQuantity: maki.baseQuantity || 8,
      ingredients: maki.ingredients || [],
      description: maki.description || "",
      extraBitPrice: maki.extraBitPrice,
      category: "maki",
    });
    setToastMessage(`${maki.name} lades till i kundvagnen!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleAddExtraBit = (maki) => {
    addToCart({
      id: maki.id,
      name: maki.name,
      price: maki.extraBitPrice,
      quantity: 1,
      baseQuantity: maki.baseQuantity || 8,
      ingredients: maki.ingredients || [],
      description: maki.description || "",
      extraBitPrice: maki.extraBitPrice,
      category: "maki",
    });
    setToastMessage(`Extra bit av ${maki.name} lades till!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const isExtraBitEnabled = (maki) => {
    const existing = cart.find((item) => item.id === maki.id);
    return existing && existing.quantity >= (maki.baseQuantity || 8);
  };

  return (
    <>
      <section className="product-page">
        {error && <p className="error">{error}</p>}
        <div className="product-img-sides-container">
          <img
            src={makiSushi.image}
            alt={makiSushi.name}
            className="product-image"
          />
          <p className="product-sides">{makiSushi.sides}</p>
        </div>
        <div className="product-price-descrip-container">
          <h2 className="product-title">Maki Sushi</h2>
          <p className="product-description">{makiSushi.description}</p>
          {loading ? (
            <p>Laddar meny...</p>
          ) : makiMenuList.length > 0 ? (
            makiMenuList.map((maki, index) => (
              <div key={maki.id || index} className="product-price">
                <p className="product-name">
                  <button
                    className="product-buy-btn"
                    onClick={() => handleAddToCart(maki)}
                  >
                    Lägg till {maki.baseQuantity || 8} bitar
                  </button>
                  <span className="product-length">
                    {maki.name} {maki.price}:-
                  </span>
                  {maki.extraBitPrice && (
                    <button
                      className="product-extra-btn"
                      disabled={!isExtraBitEnabled(maki)}
                      onClick={() => handleAddExtraBit(maki)}
                    >
                      extra bit +{maki.extraBitPrice}:-
                    </button>
                  )}
                </p>
                {maki.ingredients && maki.ingredients.length > 0 && (
                  <p className="product-ingredients">
                    {maki.ingredients.join(", ")}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>Inga maki-objekt tillgängliga för tillfället.</p>
          )}
        </div>
      </section>
      {showToast && <Toast message={toastMessage} />}
    </>
  );
};

export default MakiSushi;