import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Header /> */}
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h2>Välkommen Tillbaka!</h2>
          <button onClick={() => navigate('/admin/add')}>Ny Meny</button>
          <button onClick={() => navigate('/admin/edit')}>Ändra/Ta bort menu</button>
          <button onClick={() => navigate('/')}>Logga ut</button>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-content">
            <h2>Välkommen till AdminSidan!</h2>
            <p>Var vänlig och välj ett av alternativen i sidomenyn.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;