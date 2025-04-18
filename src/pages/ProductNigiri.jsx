import '../styles/ProductPage.css';	
import React from 'react';
import { sushiMenu, nigiriMenuList } from '../data/produktLists';

const NigiriSushi = () => {

    const nigiriSushi = sushiMenu[1];

    return (
        <section className="product-page">
            

            <div className="product-img-sides-container">
                <img src={nigiriSushi.image} alt={nigiriSushi.name} className="product-image" />
                <p className="product-sides">{nigiriSushi.sides}</p>
            </div>
            
            
            <div className="product-price-descrip-container">
                
                <h2 className="product-title">Nigiri Sushi</h2>
                <p className="product-description">{nigiriSushi.description}</p>
                {nigiriMenuList.map((nigiri, index) => (
                    <div key={index} className="product-price-drinks-nigiri">
                        <p className="product-name">
                            <button className="product-buy-btn">Lägg till</button>
                            <span className="product-length">2 bitar {nigiri.name} {nigiri.price}:-</span> 
                            {/* {nigiri.extra && (
                                <>
                                     <button className="product-extra-btn">extra bit +{nigiri.extra}:-</button>
                                </>)} */}
                        </p>
                            {nigiri.ingredients && (
                                <p className="product-ingredients">({nigiri.ingredients.join(", ")})</p>
                        )}
                    </div>
                ))}

            </div>
                
                
        
        </section>
    );
};

export default NigiriSushi;