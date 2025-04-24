import '../styles/ProductPage.css';	
import React from 'react';
import { sushiMenu } from '../data/produktLists.js';
import { useState, useEffect } from 'react';
import UploadNigiriMenu from '../components/uploadNigiriMenu.jsx';


const API_URL = 'https://forverkliga.se/JavaScript/api/jsonStore.php';
const API_KEY = 'isushi-menu';

const NigiriSushi = () => {
  const [nigiriMenuList, setNigiriMenuList] = useState([]);
  const [error, setError] = useState('');
  const nigiriSushi = sushiMenu[1];

  useEffect(() => {
    fetch(`${API_URL}?method=load&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {

          const nigiriItems = data.filter((item) => item.category === 'nigiri');
          setNigiriMenuList(nigiriItems);
        }
      })
      .catch((err) => {
        console.error('Failed to load menu', err);
        setError('Kunde inte ladda menyn.');
      });
  }, []);


  return (
    <section className="product-page">
      {/* <UploadNigiriMenu />
            {error && <p className="error">{error}</p>} */}
        <div className="product-img-sides-container">
            <img src={nigiriSushi.image} alt={nigiriSushi.name} className="product-image" />
            <p className="product-sides">{nigiriSushi.sides}</p>
        </div>

      <div className="product-price-descrip-container">
        <h2 className="product-title">Nigiri Sushi</h2>
        <p className="product-description">{nigiriSushi.description}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {nigiriMenuList.length > 0 ? (
          nigiriMenuList.map((nigiri, index) => (
            <div key={nigiri.id || index} className="product-price">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till 2 bitar</button>
                <span className="product-length"> {nigiri.name} {nigiri.price}:-</span>
                {/* {nigiri.extraBitPrice && (
                     <>
                        <button className="product-extra-btn">extra bit +{nigiri.extraBitPrice}:-</button>
                    </>)} */}
              </p>
              {nigiri.ingredients && (
                <p className="product-ingredients">{nigiri.ingredients.join(', ')}</p>
              )}
            </div>
          ))
        ) : (
          <p>Inga nigiri-rätter tillgängliga just nu.</p>
        )}
      </div>
    </section>
  );
};

export default NigiriSushi;