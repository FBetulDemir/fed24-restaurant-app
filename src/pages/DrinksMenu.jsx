import { drinksMenuList } from "../data/produktLists";
import "../styles/DrinksMenu.css";

const DrinksMenu = () => {
  return (
    <section className="menu-section">
      <h2>Drycker</h2>
      <ul className="drinks-list">
        {drinksMenuList.map((drink) => (
          <li key={drink.id} className="drink-item">
            <h3>{drink.name}</h3>
            <p>{drink.volume}</p>
            <p>{drink.price} kr</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DrinksMenu;
