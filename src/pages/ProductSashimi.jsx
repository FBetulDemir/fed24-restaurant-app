import '../styles/ProductPage.css';	
import React from 'react';
import { sushiMenu, sashimiMenuList } from '../data/produktLists';

const Sashimi = () => {

    const sashimi = sushiMenu[2];

    return (
        <section className="product-page">
            

            <div className="product-img-sides-container">
                <img src={sashimi.image} alt={sashimi.name} className="product-image" />
                <p className="product-sides">{sashimi.sides}</p>
            </div>
            
            
            <div className="product-price-descrip-container">
                
                <h2 className="product-title">Sashimi</h2>
                <p className="product-description">{sashimi.description}</p>
                {sashimiMenuList.map((sashimi, index) => (
                    <div key={index} className="product-price">
                        <p className="product-name">
                            <button className="product-buy-btn">Lägg till </button> 
                            <span className="product-length">5 bitar {sashimi.name} {sashimi.price}:-</span> 
                            {/* {sashimi.extra && (
                                <>
                                     <button className="product-extra-btn">extra bit +{sashimi.extra}:-</button>
                                </>
                            )} */}
                        </p>
                            {sashimi.ingredients && (
                                <p className="product-ingredients">({sashimi.ingredients.join(", ")})</p>
                        )}
                    </div>
                ))}

            </div>
                
                
        
        </section>
    );
};

export default Sashimi;