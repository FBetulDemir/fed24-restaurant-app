import { NavLink } from "react-router";
import "../styles/Header.css";

const Header = () => {
    return (
        <nav className="nav">
            <ul className="nav-left">
                <li><NavLink to="/" className="navlink">HEM</NavLink></li>
                <li><NavLink to='/pages/about' className="navlink">OM</NavLink></li>
                <li className="dropdown">
                    <NavLink to="/pages/menu" className="navlink">MENY</NavLink>
                    {/* <div className="dropdown-content">
                        <NavLink to="/pages/menu" className="navlink">Se meny</NavLink>
                    </div> */}
                </li>
            </ul>
            <div className="logo">ISUSHI</div>

            <ul className="nav-right">
                <li><button className="btn-dark">BOKA BORD</button></li>
                <li><button className="btn-dark">BESTÄLL ONLINE</button></li>
            </ul>
            
        </nav>
    )
}

export default Header