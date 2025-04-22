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

const MenuPage = ({ menu, refreshMenu }) => (
  <main className="app-main">
    <h2>Menu</h2>
    <div className="menu-grid">
      {menu.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        menu.map(item => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ฿{item.price}</p>
            <p>Ingredients: {item.ingredients.join(', ')}</p>
          </div>
        ))
      )}
    </div>
    <button onClick={refreshMenu} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
      Refresh Menu
    </button>
  </main>
);

const App = () => {
  const [menu, setMenu] = useState([]);
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจจับการเปลี่ยนหน้า

  const loadMenu = async () => {
    try {
      const data = await loadData('menu');
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
    loadMenu(); // โหลดข้อมูลเมื่อหน้าเปลี่ยน
  }, [location]); // เรียกใช้เมื่อ location เปลี่ยน (เช่น จาก /admin/add กลับมาที่ /menu)

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
