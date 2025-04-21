import {sashimiMenuList} from '../data/produktLists';
import "../styles/SashimiMenu.css";

const SashimiMenu = () => {
  return (
    <div className="sashimi-menu">
        <h3>Vår Sashimi</h3>
        {sashimiMenuList.map((item, index) => (
            <div key={index} className='sashimi-item'>
                <h4>{item.name}</h4>
                <p>Innehåll: {item.content}</p>
                <p>Pris: {item.price} kr</p>
            </div>
        ))}
    </div>
  );
}

export default SashimiMenu;