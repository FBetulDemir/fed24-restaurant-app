import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from '../components/MenuList.jsx';
import Header from '../components/Header.jsx'; // เพิ่ม Header
import { saveData, loadData } from '../api.js';
import '../styles/Admin.css';

const EditMenu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await loadData('menu');
        if (data) {
          const menuWithIds = data.map((item, index) => ({
            id: item.id || index + 1,
            ...item,
          }));
          setMenu(menuWithIds);
        } else {
          setMenu([]);
        }
      } catch (err) {
        setError('Failed to load menu data.');
      }
    };
    fetchMenu();
  }, []);

  const handleDeleteMenuItem = async (id) => {
    try {
      const updatedMenu = menu.filter((item) => item.id !== id);
      const success = await saveData('menu', updatedMenu);
      if (!success) {
        throw new Error('Failed to delete menu item.');
      }
      setMenu(updatedMenu);
    } catch (err) {
      setError(err.message || 'Failed to delete menu item.');
    }
  };

  const handleEditMenuItem = async (id, updatedItem) => {
    if (!updatedItem.name || updatedItem.name.length < 3) {
      setError('Name must be at least 3 characters long.');
      return;
    }
    if (!updatedItem.description || updatedItem.description.length < 10) {
      setError('Description must be at least 10 characters long.');
      return;
    }
    if (!updatedItem.price || updatedItem.price < 0) {
      setError('Price must be a positive number.');
      return;
    }
    if (!updatedItem.ingredients || updatedItem.ingredients.length === 0) {
      setError('At least one ingredient is required.');
      return;
    }
    if (!updatedItem.image) {
      setError('An image is required.');
      return;
    }

    try {
      const updatedMenu = menu.map((item) =>
        item.id === id ? { id, ...updatedItem } : item
      );
      const success = await saveData('menu', updatedMenu);
      if (!success) {
        throw new Error('Failed to update menu item.');
      }
      setMenu(updatedMenu);
    } catch (err) {
      setError(err.message || 'Failed to update menu item.');
    }
  };

  return (
    <div>
      <Header /> {/* เพิ่ม Header */}
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h2>Welcome Employee!</h2>
          <button onClick={() => navigate('/admin/add')}>NEW MENU</button>
          <button onClick={() => navigate('/admin/edit')}>EDIT/REMOVE MENU</button>
          <button onClick={() => navigate('/')}>SIGN OUT</button>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-content">
            <div className="admin-menu-list full-width">
              <MenuList
                menu={menu}
                onDelete={handleDeleteMenuItem}
                onEdit={handleEditMenuItem}
              />
              {error && <p className="menu-form-error">{error}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditMenu;
