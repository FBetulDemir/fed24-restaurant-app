import '../styles/ProductPage.css';	
import React from 'react';
import { sushiMenu, drinksMenuList } from '../data/produktLists';

const Drinks = () => {

    const drinks = sushiMenu[3];

    return (
        <section className="product-page">
            

            <div className="product-img-sides-container">
                <img src={drinks.image} alt={drinks.name} className="product-image" />
                <p className="product-sides">{drinks.sides}</p>
            </div>
            
            
            <div className="product-price-descrip-container">
                
                <h2 className="product-title">Beverages</h2>
                <p className="product-description">{drinks.description}</p>
                {drinksMenuList.map((drink, index) => (
                    <div key={index} className="product-price-drinks-nigiri">
                        <p className="product-name">
                            <button className="product-buy-btn">Lägg till</button>
                            {drink.name} <span className="product-space-price">{drink.price}:-</span>
                            {drink.volume && (
                                <>
                                <span className="product-volume"> (volym {drink.volume})</span>
                                
                                </>
                            )}
                        </p>
                            {drink.ingredients && (
                        <p className="product-ingredients">({drink.ingredients.join(", ")})</p>
                        )}
                    </div>
                ))}

            </div>
                
                
        
        </section>
    );
};

export default Drinks;