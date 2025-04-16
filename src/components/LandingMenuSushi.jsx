import sushiMenu from "../assets/sushi-menu.png";
import "../styles/LandingMenuSushi.css";

const LandingMenuSushi = () => {
  return (
    <div className="landing-menu-sushi">
        <img src={sushiMenu} alt="Different kind of sushi on a plate with soja souce and chopsticks on the side." />
        <div className="sushi-info">
            <h1>SUSHI MENU</h1>
            <p>Upptäck vår noggrant utvalda sushimeny med klassiska favoriter och moderna smaker. Från delikat nigiri till kreativa makirullar – 
                varje bit är tillagad med färska råvaror och hantverksskicklighet.
            </p>
            <div className="sushi-preview">
                <ul>
                    <li>Lax Nigiri</li>
                    <li>Spicy Tuna Maki</li>
                    <li>Avokado Maki</li>
                </ul>
            </div>
            <button className="sushi-button">UPPTÄCK HELA MENYN</button>
        </div>

    </div>
  );
}

export default LandingMenuSushi;