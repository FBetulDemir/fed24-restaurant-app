import { NavLink } from "react-router";
import { useState } from "react";
import "../styles/Header.css";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-left">
                    <li><NavLink to="/" className="navlink">HEM</NavLink></li>
                    <li><NavLink to='/pages/about' className="navlink">OM</NavLink></li>
                    <li className="dropdown">
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
                            <div className="dropdown-content">
                                <NavLink to="/pages/menu" className="navlink">Sushi</NavLink>
                                <NavLink to="/pages/menu" className="navlink">Sashimi</NavLink>
                                <NavLink to="/pages/menu" className="navlink">Dryckor</NavLink>
                            </div>
                        )}
                    </li>
                </ul>
                <div className="logo">ISUSHI</div>

                <div className="hamburger-button">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </div>
                            
                <ul className="nav-right">
                    <li><button className="btn-dark">BOKA BORD</button></li>
                    <li><button className="btn-dark">BESTÄLL ONLINE</button></li>
                </ul>
            </nav>
        </header>    

    )
}

export default Header