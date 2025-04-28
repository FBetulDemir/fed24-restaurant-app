import { NavLink } from "react-router-dom";
import "../styles/AdminStart.css";
import UploadAllMenusButton from "./UploadAllMenusButton";
import MenuResetButton from "./MenuResetButton";


const AdminStart = () => {
  return (
    <div className="sidebar">
        <h2>Välkommen tillbaka!</h2>
        <NavLink to="/admin/add">
            <button className="form-btn">Lägg till ny maträtt</button>
        </NavLink>
        <NavLink to="/pages/EditMenu">
            <button className="form-btn">Redigera/Ta bort meny</button>
        </NavLink>
        <NavLink to="/pages/editmenu">Edit Menu</NavLink>
        
        {/* <UploadAllMenusButton />    Jag testar ändringar
        <MenuResetButton /> */}
        <UploadAllMenusButton />   
        <MenuResetButton />

        <NavLink to="/">
            <button className="form-btn">Logga ut</button>
        </NavLink>
  </div>
  );
}

export default AdminStart;