import React from 'react';
import { sushiMenu, makiMenuList } from '../data/produktLists';

const MakiSushi = () => {

    const makiSushi = sushiMenu[0];

    return (
        <section className="product-page">
            <h2 className="product-title">Maki Sushi (8 bitar)</h2>
            <div className="product-container">
                <img src={makiSushi.image} alt={makiSushi.name} className="product-image" />
                <p className="product-description">{makiSushi.description}</p>
                {makiMenuList.map((maki, index) => (
                    <div key={index} className="product-price-container">
                        <p className="product-name">
                            <button className="product-buy-btn">Lägg till</button>
                             {maki.name} {maki.price}:- 
                            {maki.extra && (
                                <>
                                     <button className="product-extra-btn">extra bit +{maki.extra}:-</button>
                                </>
                            )}</p>
                            {maki.ingredients && (
                                <p className="product-ingredients">{maki.ingredients.join(", ")}</p>
                        )}
                    </div>
                ))}
                <p className="product-sides">{makiSushi.sides}</p>
            </div>
        </section>
    );
};

export default MakiSushi;