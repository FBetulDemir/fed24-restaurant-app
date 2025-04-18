import sushiMenu from "../assets/sushi-menu.png";
import "../styles/LandingMenuSushi.css";
import sashimiMenu from "../assets/sashimi-menu.png";
import { useMenuStore } from "../stores/menuStore.js";
import { NavLink } from "react-router";

const LandingMenuSushi = () => {
    const menuItems = useMenuStore((state) => state.menuItems);

    const categories = {
        sushi: 'Sushi',
        vegetarian: 'Vegetarisk Sushi',
        maki: 'Maki Rolls'
    }

  return (
    <div className="landing-menu-sushi">
        <div className="sushi-section">
            <img src={sushiMenu} alt="Different kind of sushi on a plate with soy souce and chopsticks on the side." />
            <div className="sushi-info">
                <h1>SUSHI MENU</h1>
                <p>Upptäck vår noggrant utvalda sushimeny med klassiska favoriter
                     och moderna smaker. Från delikat nigiri till kreativa makirullar – varje bit är tillagad med färska råvaror och hantverksskicklighet.
                </p>
                <div className="sushi-preview">
                    <h3 className="subtitle-menu-fav">Gästers Favoriter</h3>
                    <ul>
                        <li>Lax Nigiri</li>
                        <li>Spicy Tuna Maki</li>
                        <li>Avokado Maki</li>
                        <li>Tempura Roll</li>
                        <li>Dragon Roll</li>
                    </ul>
                </div>
                <NavLink to="/pages/menu/menu/" className="navlink">
                    <button className="sushi-button">UPPTÄCK HELA MENYN</button>
                </NavLink>
                
            </div>
        </div>
        <div className="sashimi-section">
            <div className="sushi-info">
                <h1>SASHIMI MENU</h1>
                <p>Njut av ren smak och precision med vår sashimi – tunna skivor av färsk fisk serverade med stil. En smakupplevelse för dig som älskar det enkla, eleganta och autentiska i japansk matkonst.
                </p>
                <div className="sushi-preview">
                    <h3 className="subtitle-menu-fav">Gästers Favoriter</h3>
                    <ul>
                        <li>Lax Sashimi</li>
                        <li>Tonfisk Sashimi</li>
                        <li>Hamachi Sashimi</li>
                        <li>Hälleflundra Sashimi</li>
                    </ul>
                </div>
                <NavLink to="/pages/menu/menu/" className="navlink">
                    <button className="sushi-button">UPPTÄCK HELA MENYN</button>
                </NavLink>
            </div>
            <img src={sashimiMenu} alt="Solmon sashimi in a black plate." />
        </div>


    </div>
  );
};

export default LandingMenuSushi;