import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm.jsx';
import MenuList from '../components/MenuList.jsx';
import { saveData, loadData } from '../api.js';
import '../styles/Admin.css';

const Admin = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: [],
    image: '', // จะเก็บ Base64 string ของรูปภาพ
  });
  const navigate = useNavigate();

  // Fetch menu data from API on page load
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

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.name || newMenuItem.name.length < 3) {
      setError('Name must be at least 3 characters long.');
      return;
    }
    if (!newMenuItem.description || newMenuItem.description.length < 10) {
      setError('Description must be at least 10 characters long.');
      return;
    }
    if (!newMenuItem.price || newMenuItem.price < 0) {
      setError('Price must be a positive number.');
      return;
    }
    if (!newMenuItem.ingredients || newMenuItem.ingredients.length === 0) {
      setError('At least one ingredient is required.');
      return;
    }
    if (!newMenuItem.image) {
      setError('An image is required.');
      return;
    }

    try {
      const newId = menu.length > 0 ? Math.max(...menu.map(item => item.id)) + 1 : 1;
      const newItem = { id: newId, ...newMenuItem };
      const updatedMenu = [...menu, newItem];
      const success = await saveData('menu', updatedMenu);
      if (!success) {
        throw new Error('Failed to add menu item.');
      }
      setMenu(updatedMenu);
      setNewMenuItem({ name: '', description: '', price: '', ingredients: [], image: '' });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to add menu item.');
    }
  };

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
      {/* Header */}
      <header className="admin-header">
        <div className="menu-dropdown">
          <button>
            <span>MENU</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <h1 className="logo">ISUSHI</h1>
      </header>

      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h2>Welcome Employee!</h2>
          <button>NEW MENU</button>
          <button>EDIT/REMOVE MENU</button>
          <button onClick={() => navigate('/')}>SIGN OUT</button>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-content">
            {/* Menu List */}
            <div className="admin-menu-list">
              <MenuList
                menu={menu}
                onDelete={handleDeleteMenuItem}
                onEdit={handleEditMenuItem}
              />
            </div>
            {/* Menu Form */}
            <div className="admin-menu-form">
              <MenuForm
                menuItem={newMenuItem}
                setMenuItem={setNewMenuItem}
                onSubmit={handleAddMenuItem}
                buttonText="ADD NEW MENU"
              />
              {error && <p className="menu-form-error">{error}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
