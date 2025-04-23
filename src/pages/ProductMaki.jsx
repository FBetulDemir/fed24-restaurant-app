import '../styles/ProductPage.css';	
import React from 'react';
import { sushiMenu } from '../data/produktLists.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UploadMakiMenu from '../components/uploadMakiMenu.jsx';

const API_URL = 'https://forverkliga.se/JavaScript/api/jsonStore.php';
const API_KEY = 'isushi-menu';

const MakiSushi = () => {
  const [makiMenuList, setMakiMenuList] = useState([]);
  const [error, setError] = useState('');
  const makiSushi = sushiMenu[0];

  useEffect(() => {
    fetch(`${API_URL}?method=load&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {

          const makiItems = data.filter((item) => item.category === 'maki');
          setMakiMenuList(makiItems);
        }
      })
      .catch((err) => {
        console.error('Failed to load menu', err);
        setError('Kunde inte ladda menyn.');
      });
  }, []);

//   UploadMakiMenu() //- körs en gång för att lägga till hela meny

  return (
    <section className="product-page">
        <div className="product-img-sides-container">
            <img src={makiSushi.image} alt={makiSushi.name} className="product-image" />
            <p className="product-sides">{makiSushi.sides}</p>
        </div>

      <div className="product-price-descrip-container">
        <h2 className="product-title">Maki Sushi</h2>
        <p className="product-description">{makiSushi.description}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {makiMenuList.length > 0 ? (
          makiMenuList.map((maki, index) => (
            <div key={maki.id || index} className="product-price">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till</button>
                <span className="product-length">8 bitar {maki.name} {maki.price}:-</span>
                {maki.extraBitPrice && (
                     <>
                        <button className="product-extra-btn">extra bit +{maki.extraBitPrice}:-</button>
                    </>)}
              </p>
              {maki.ingredients && (
                <p className="product-ingredients">{maki.ingredients.join(', ')}</p>
              )}
            </div>
          ))
        ) : (
          <p>Inga maki-rätter tillgängliga just nu.</p>
        )}
      </div>
    </section>
  );
};

export default MakiSushi;