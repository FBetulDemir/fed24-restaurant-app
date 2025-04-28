import { NavLink } from "react-router";
import { useState, useRef } from "react";
import "../styles/Header.css";
import { useCartStore } from "../stores/cartStore";
import useOutsideClick from "./useOutsideClick";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.length;
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      if (!prev) setHamburgerOpen(false);
      return !prev;
    });
  };

  const toggleHamburger = () => {
    setHamburgerOpen((prev) => {
      if (!prev) setIsOpen(false);
      return !prev;
    });
  };

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-left">
          {/* <li><NavLink to='/pages/about' className="navlink">OM</NavLink></li> */}
          {/* <li className="dropdown">
                        <button onClick={toggleDropdown} className="dropbtn btn-dark">
                            MENY 
                            <svg
                                className="arrow-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#e6d6b2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginLeft: '0.5rem' }}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        


                        {isOpen && (
                            <div className="dropdown-content" ref={dropdownRef}>
                                <NavLink to="/pages/menu/sushi/:sushiId?" className="navlink" onClick={() => setIsOpen(false)}>Sushi</NavLink>
                                <NavLink to="/pages/menu/sashimi/:sashimiId?" className="navlink" onClick={() => setIsOpen(false)}>Sashimi</NavLink>
                                <NavLink to="/pages/menu/drinks/:drinksId?" className="navlink" onClick={() => setIsOpen(false)}>Drycker</NavLink> 
                            </div>
                        )}
                    </li> */}
          <li>
            <NavLink to="/pages/menu/menu/" className="navlink-footer">
              <button className="dropbtn btn-dark">Meny</button>
            </NavLink>
          </li>
        </ul>
        <div className="logo-container">
          <NavLink to="/" className="logo">
            ISUSHI
          </NavLink>
        </div>

        <ul className="nav-right">
          <li className="cart-icon-wrapper">
            <NavLink to="components/cart/:cartId?" className="navlink">
              <button className="btn-dark cart-button">
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g opacity="0.3">
                    <path
                      d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
