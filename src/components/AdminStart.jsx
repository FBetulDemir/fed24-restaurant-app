import { NavLink } from "react-router-dom";
import "../styles/AdminStart.css";
import UploadAllMenusButton from "./UploadAllMenusButton";
import MenuResetButton from "./MenuResetButton";
import { useNavigate } from "react-router-dom";
import useAdminStore from '../stores/authorizationStore.js';

const AdminStart = () => {
  const navigate = useNavigate();
  const logout = useAdminStore((state) => state.logout);

  return (
    <div className="sidebar">
      <h2>Välkommen tillbaka!</h2>
      <NavLink to="/admin/add">
        <button className="form-btn">Lägg till ny maträtt</button>
      </NavLink>
      <NavLink to="/pages/editMenu">
        <button className="form-btn">Redigera/Ta bort meny</button>
      </NavLink>
      <UploadAllMenusButton />
      <MenuResetButton />
      <NavLink to="/">
        <button className="form-btn">Logga ut</button>
      </NavLink>
    </div>
  );
}

export default AdminStart;