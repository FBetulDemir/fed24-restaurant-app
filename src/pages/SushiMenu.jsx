import {makiMenuList, nigiriMenuList} from '../data/produktLists';
import "../styles/SushiMenu.css";

const SushiMenu = () => {
  return (
    <div className="sushi-menu">
        <h2>Vår Sushi</h2>
        {makiMenuList.map((item, index) => (
            <div key={index}>
                <h4>{item.name}</h4>
                <p>Innehåll: {item.content}</p>
                <p>Pris: {item.price} kr</p>
            </div>
        ))}
        <h3>Vår Nigiri</h3>
        {nigiriMenuList.map((item, index) => (
            <div key={index}>
                <h4>{item.name}</h4>
                <p>Innehåll: {item.content}</p>
                <p>Pris: {item.price} kr</p>
            </div>
        ))}
    </div>
  );
}

export default SushiMenu;