import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchMenu } from './store/store.js';
import Admin from './pages/Admin.jsx';
import './App.css'; // เพิ่มไฟล์ CSS สำหรับหน้าแรก

const App = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const loadMenu = async () => {
      const data = await fetchMenu();
      setMenu(data);
    };
    loadMenu();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>ISUSHI Restaurant</h1>
          <Link to="/admin" className="admin-link">Go to Admin</Link>
        </header>
        <main className="app-main">
          <h2>Menu</h2>
          <div className="menu-grid">
            {menu.map(item => (
              <div key={item.id} className="menu-card">
                <img src={item.image} alt={item.name} className="menu-image" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ฿{item.price}</p>
                <p>Ingredients: {item.ingredients.join(', ')}</p>
              </div>
            ))}
          </div>
        </main>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<div />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
