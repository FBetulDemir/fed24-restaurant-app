import {sashimiMenuList} from '../data/produktLists';

const SashimiMenu = () => {
  return (
    <div className="sashimi-menu">
        <h3>Vår Sashimi</h3>
        {sashimiMenuList.map((item, index) => (
            <div key={index}>
                <h4>{item.name}</h4>
                <p>Innehåll: {item.content}</p>
                <p>Pris: {item.price} kr</p>
            </div>
        ))}
    </div>
  );
}

export default SashimiMenu;