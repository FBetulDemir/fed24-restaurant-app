import '../styles/ProductPage.css';
import React from 'react';
import { sushiMenu } from '../data/produktLists.js';
import { useState, useEffect } from 'react';
import UploadDrinkMenu from '../components/uploadDrinkMenu.jsx';

const API_URL = 'https://forverkliga.se/JavaScript/api/jsonStore.php';
const API_KEY = 'isushi-menu';

const DrinksMenu = () => {
  const [drinkList, setDrinkList] = useState([]);
  const [error, setError] = useState('');
  const drinks = sushiMenu[3];

  useEffect(() => {
    fetch(`${API_URL}?method=load&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {

          const drinkItems = data.filter((item) => item.category === 'drink');
          setDrinkList(drinkItems);
        }
      })
      .catch((err) => {
        console.error('Failed to load menu', err);
        setError('Kunde inte ladda menyn.');
      });
  }, []);

  return (
    <section className="product-page">
      <UploadDrinkMenu />
      {error && <p className="error">{error}</p>}
     
      <div className="product-img-sides-container">
        <img src={drinks.image} alt={drinks.name} className="product-image" />
        <p className="product-sides">{drinks.sides}</p>
      </div>
      <div className="product-price-descrip-container">
        <h2 className="product-title">Beverages</h2>
        <p className="product-description">{drinks.description}</p>
        {drinkList.length === 0 && !error ? (
          <p>Laddar drycker...</p>
        ) : (
          drinkList.map((drink, index) => (
            <div key={index} className="product-price-drinks-nigiri">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till</button>
                {drink.name} <span className="product-space-price">{drink.price}:-</span>
                {drink.volume && (
                  <span className="product-volume"> (volym {drink.volume} l)</span>
                )}
              </p>
              {drink.ingredients && (
                <p className="product-ingredients">({drink.ingredients.join(', ')})</p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DrinksMenu;