import "../styles/ProductPage.css";
import React, { useState, useContext } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";
import Toast from "../components/Toast.jsx";
import MenuContext from "../components/MenuContext.jsx";
import imageNigiri from "../assets/nigiri_sushi.jpg";

const NigiriSushi = () => {
  const { menuData, error, loading } = useContext(MenuContext);
  const nigiriMenuList = menuData.nigiri;
  const nigiriSushi = sushiMenu[1];
  const addToCart = useCartStore((state) => state.addToCart);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = async (nigiri) => {
    const cartItem = {
      id: nigiri.id || crypto.randomUUID(),
      name: nigiri.name,
      price: parseFloat(nigiri.price) || 0,
      quantity: nigiri.baseQuantity || 2,
      baseQuantity: nigiri.baseQuantity || 2,
      ingredients: nigiri.ingredients || [],
      description: nigiri.description || "",
      extraBitPrice: parseFloat(nigiri.extraBitPrice) || 0,
      category: "nigiri",
      isExtraBit: false,
    };
    console.log('Adding to cart:', cartItem);
    await addToCart(cartItem);
    setToastMessage(`${nigiri.name} lades till i kundvagnen!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <section className="product-page">
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img
          src={imageNigiri}
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
              {nigiri.ingredients && (
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