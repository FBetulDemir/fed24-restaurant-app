import "../styles/AdminStart.css";

const AdminStart = () => {
  return (
    <div className="sidebar">
        <h2>Välkommen tillbaka!</h2>
        <button className="form-btn">Ny meny</button>
        <button className="form-btn">Redigera/Ta bort meny</button>
        <button className="form-btn">Logga ut</button>
  </div>
  );
}

export default AdminStart;