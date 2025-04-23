import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from '../components/MenuList.jsx';
import Header from '../components/Header.jsx';
import { saveData, loadData } from '../api.js';
import '../styles/Admin.css';

const EditMenu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMenu = async () => {
    try {
      const data = await loadData('menu');
      console.log('Loaded menu in EditMenu:', data);
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
      console.error('Error loading menu:', err);
    }
  };

  useEffect(() => {
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
      console.log('Menu after delete:', updatedMenu);
    } catch (err) {
      setError(err.message || 'Failed to delete menu item.');
      console.error('Error deleting menu item:', err);
    }
  };

  const handleEditMenuItem = async (id, updatedItem) => {
    if (!updatedItem.group) {
      setError('Please select a group.');
      return;
    }
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

    try {
      const updatedMenu = menu.map((item) =>
        item.id === id ? { id, ...updatedItem } : item
      );
      const success = await saveData('menu', updatedMenu);
      if (!success) {
        throw new Error('Failed to update menu item.');
      }
      setMenu(updatedMenu);
      console.log('Menu after update:', updatedMenu);
    } catch (err) {
      setError(err.message || 'Failed to update menu item.');
      console.error('Error updating menu item:', err);
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2>Welcome Employee!</h2>
          <button onClick={() => navigate('/admin/add')}>NEW MENU</button>
          <button onClick={() => navigate('/admin/edit')}>EDIT/REMOVE MENU</button>
          <button onClick={() => navigate('/')}>SIGN OUT</button>
        </aside>
        <main className="admin-main">
          <div className="admin-content">
            <div className="admin-menu-list full-width">
              <button
                onClick={fetchMenu}
                style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
              >
                Refresh Menu
              </button>
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
