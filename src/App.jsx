import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchMenu } from './store/store.js'; // แก้ไขเส้นทางจาก './stores/store.js' เป็น './store/store.js'
import Admin from './pages/Admin.jsx';

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
      <div>
        <h1>Restaurant Menu</h1>
        <ul>
          {menu.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
