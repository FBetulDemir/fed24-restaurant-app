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
                        <button onClick={toggleDropdown} className="dropbtn">MENY</button>
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

                <ul className="nav-right">
                    <li><button className="btn-dark">BOKA BORD</button></li>
                    <li><button className="btn-dark">BESTÄLL ONLINE</button></li>
                </ul>
            </nav>
        </header>    

    )
}

export default Header