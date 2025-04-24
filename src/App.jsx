import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { loadData } from './api.js';
import Admin from './pages/Admin.jsx';
import AddMenu from './pages/AddMenu.jsx';
import EditMenu from './pages/EditMenu.jsx';
import Header from './components/Header.jsx';
import './App.css';

const HomePage = () => (
  <main className="app-main">
    <h2>Welcome to ISUSHI Restaurant!</h2>
    <p>Explore our delicious menu by clicking the "Menu" link above.</p>
  </main>
);

const MenuPage = ({ menu, refreshMenu }) => {
  // จัดกลุ่มเมนูตาม group
  const groupedMenu = menu.reduce((acc, item) => {
    const group = item.group || 'Other'; // หากไม่มี group ให้จัดเป็น "Other"
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});

  // กำหนดหมวดหมู่ที่ต้องการแสดง (เรียงตามที่ต้องการ)
  const groups = ['Maki', 'Nigiri', 'Sashimi', 'Drinks'];

  return (
    <main className="app-main">
      <h2>Menu</h2>
      {menu.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        groups.map(group => (
          groupedMenu[group] && (
            <div key={group} className="menu-group">
              <h3>{group}</h3>
              <div className="menu-grid">
                {groupedMenu[group].map(item => (
                  <div key={item.id} className="menu-card">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Price: {item.price} kr</p>
                    {item.extraPrice && <p>Extra Price: {item.extraPrice} kr</p>}
                    {item.ingredients && item.ingredients.length > 0 && (
                      <p>Ingredients: {item.ingredients.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        ))
      )}
      <button onClick={refreshMenu} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Refresh Menu
      </button>
    </main>
  );
};

const App = () => {
  const [menu, setMenu] = useState([]);
  const location = useLocation();

  const loadMenu = async () => {
    try {
      const data = await loadData('menu');
      console.log('Loaded menu in App:', data);
      if (data) {
        setMenu(data);
      } else {
        setMenu([]);
      }
    } catch (err) {
      console.error('Failed to load menu:', err);
      setMenu([]);
    }
  };

  useEffect(() => {
    loadMenu();
  }, [location]);

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add" element={<AddMenu />} />
        <Route path="/admin/edit" element={<EditMenu />} />
        <Route
          path="/menu"
          element={<MenuPage menu={menu} refreshMenu={loadMenu} />}
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
