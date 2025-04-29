import "../styles/ProductPage.css";
import React, { useContext } from "react";
import { sushiMenu } from "../data/produktLists.js";
import UploadAllMenus from "../components/UploadAllMenusButton.jsx";
import { useCartStore } from "../data/CartStore.js";
import MenuContext from "../components/MenuContext.jsx";
import imageDrinks from "../assets/drinks.jpg"

const DrinksMenu = () => {
  const { menuData, error, loading } = useContext(MenuContext);
  const drinkList = menuData.drinks;
  const drinks = sushiMenu[3];
  const addToCart = useCartStore((state) => state.addToCart);

  console.log("📋 Drycker menydata:", drinkList);

  const handleAddToCart = (drink) => {
    addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      quantity: drink.baseQuantity || 1,
      baseQuantity: drink.baseQuantity || 1,
      ingredients: drink.ingredients || [],
      volume: drink.volume,
      category: "drinks",
    });
  };

  return (
    <section className="product-page">
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img src={imageDrinks} alt={drinks.name} className="product-image" />
        <p className="product-sides">{drinks.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Drycker</h2>
        <p className="product-description">{drinks.description}</p>
        {loading ? (
          <p>Laddar drycker...</p>
        ) : drinkList.length === 0 ? (
          <p>Inga drycker tillgängliga för tillfället.</p>
        ) : (
          drinkList.map((drink, index) => (
            <div key={drink.id || index} className="product-price-drinks-nigiri">
              <p className="product-name">
                <button
                  className="product-buy-btn"
                  onClick={() => handleAddToCart(drink)}
                >
                  Lägg till
                </button>
                {drink.name}{" "}
                <span className="product-space-price">{drink.price}:-</span>
                {drink.volume && (
                  <span className="product-volume"> (volym {drink.volume} l)</span>
                )}
              </p>
              {drink.ingredients && (
                <p className="product-ingredients">
                  {drink.ingredients.join(", ")}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DrinksMenu;