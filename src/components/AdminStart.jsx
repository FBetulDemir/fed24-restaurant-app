import { NavLink } from "react-router";
import "../styles/AdminStart.css";


const AdminStart = () => {
  return (
    <div className="sidebar">
        <h2>Välkommen tillbaka!</h2>
        <NavLink to="/components/adminNewDish">
            <button className="form-btn">Ny meny</button>
        </NavLink>
        <NavLink to="/components/adminNewDish">
            <button className="form-btn">Redigera/Ta bort meny</button>
        </NavLink>
        <NavLink to="/components/adminNewDish">
            <button className="form-btn">Logga ut</button>
        </NavLink>
  </div>
  );
}

export default AdminStart;