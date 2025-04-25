import { NavLink } from "react-router-dom";
import "../styles/AdminStart.css";


const AdminStart = () => {
  return (
    <div className="sidebar">
        <h2>Välkommen tillbaka!</h2>
        <NavLink to="/components/adminNewDish">
            <button className="form-btn">Lägg till ny maträtt</button>
        </NavLink>
        <NavLink to="/pages/EditMenu">
            <button className="form-btn">Redigera/Ta bort meny</button>
        </NavLink>
        <NavLink to="/">
            <button className="form-btn">Logga ut</button>
        </NavLink>
  </div>
  );
}

export default AdminStart;