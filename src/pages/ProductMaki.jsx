import '../styles/ProductPage.css';
import React, { useState, useEffect } from 'react';
import { sushiMenu } from '../data/produktLists.js';
import UploadMakiMenu from '../components/uploadMakiMenu.jsx';

const API_URL = 'https://forverkliga.se/JavaScript/api/jsonStore.php';
const API_KEY = 'isushi-menu'; // Alternativ: Använd 'isushi-menu-maki' för separata nycklar

const MakiSushi = () => {
  const [makiMenuList, setMakiMenuList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const makiSushi = sushiMenu[0];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        console.log('API-svar:', data);

        if (Array.isArray(data)) {
          const makiItems = data.filter((item) => item.category === 'maki');
          console.log('Filtrerade maki-rätter:', makiItems); // Logga för felsökning
          setMakiMenuList(makiItems);
          if (makiItems.length === 0) {
            setError('Inga maki-rätter hittades i API-svaret.');
          }
        } else {
          setError('API-svaret är inte en lista med menyobjekt.');
        }
      } catch (err) {
        console.error('Failed to load menu', err);
        setError('Kunde inte ladda menyn.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="product-page">
      <UploadMakiMenu />
      {error && <p className="error">{error}</p>}
      <div className="product-img-sides-container">
        <img src={makiSushi.image} alt={makiSushi.name} className="product-image" />
        <p className="product-sides">{makiSushi.sides}</p>
      </div>

      <div className="product-price-descrip-container">
        <h2 className="product-title">Maki Sushi</h2>
        <p className="product-description">{makiSushi.description}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <p>Laddar meny...</p>
        ) : makiMenuList.length > 0 ? (
          makiMenuList.map((maki, index) => (
            <div key={maki.id || index} className="product-price">
              <p className="product-name">
                <button className="product-buy-btn">Lägg till 8 bitar</button>
                <span className="product-length">
                  {maki.name} {maki.price}:-
                </span>
                {maki.extraBitPrice && (
                  <button className="product-extra-btn">
                    extra bit +{maki.extraBitPrice}:-
                  </button>
                )}
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