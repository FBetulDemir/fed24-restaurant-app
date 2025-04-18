import '../styles/ProductPage.css';	
import React from 'react';
import { sushiMenu, makiMenuList } from '../data/produktLists';

const MakiSushi = () => {

    const makiSushi = sushiMenu[0];

    return (
        <section className="product-page">
            

            <div className="product-img-sides-container">
                <img src={makiSushi.image} alt={makiSushi.name} className="product-image" />
                <p className="product-sides">{makiSushi.sides}</p>
            </div>
            
            
            <div className="product-price-descrip-container">
                
                <h2 className="product-title">Maki Sushi</h2>
                <p className="product-description">{makiSushi.description}</p>
                {makiMenuList.map((maki, index) => (
                    <div key={index} className="product-price">
                        <p className="product-name">
                            <button className="product-buy-btn">Lägg till</button>
                             <span className="product-length">8 bitar {maki.name} {maki.price}:-</span> 
                            {maki.extra && (
                                <>
                                     <button className="product-extra-btn">extra bit +{maki.extra}:-</button>
                                </>
                            )}</p>
                            {maki.ingredients && (
                                <p className="product-ingredients">({maki.ingredients.join(", ")})</p>
                        )}
                    </div>
                ))}

            </div>
                
                
        
        </section>
    );
};

export default MakiSushi;