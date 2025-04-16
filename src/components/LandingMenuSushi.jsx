import sushiMenu from "../assets/sushi-menu.png";
import "../styles/LandingMenuSushi.css";
import { useMenuStore } from '../stores/menuStore.js'

const LandingMenuSushi = () => {
    const menuItems = useMenuStore((state) => state.menuItems);

    const categories = {
        sushi: 'Sushi',
        vegetarian: 'Vegetarisk Sushi',
        maki: 'Maki Rolls'
    }

  return (
    <div className="landing-menu-sushi">
        <img 
            src={sushiMenu} 
            alt="Different kind of sushi on a plate with soja souce and chopsticks on the side." 
        />
        <div className="right-content-sushi">
            <h1>SUSHI MENU</h1>
            <p>Upptäck vår noggrant utvalda sushimeny med klassiska favoriter och moderna smaker. Från delikat nigiri till kreativa makirullar – 
                varje bit är tillagad med färska råvaror och hantverksskicklighet.
            </p>

            <div className="sushi-preview">
                {Object.entries(categories).map(([key, label]) => {
                const filtered = menuItems.filter((item) => item.category === key);
                return (
                    <div key={key} className="category-block">
                    <h4>{label}</h4>
                    <ul>
                        {filtered.map((item) => (
                        <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                    </div>
                );
                })}
            </div>

            <button className="cta-button">UPPTÄCK HELA MENYN</button>
        </div>

    </div>
  );
};

export default LandingMenuSushi;