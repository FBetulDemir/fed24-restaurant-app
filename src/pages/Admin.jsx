import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm.jsx';
import { saveData } from '../api.js';
import '../styles/Admin.css';

const Admin = () => {
  const [error, setError] = useState('');
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: [],
    image: '',
  });
  const navigate = useNavigate();

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
      const success = await saveData('menu', [newMenuItem]);
      if (!success) {
        throw new Error('Failed to add menu item.');
      }
      setNewMenuItem({ name: '', description: '', price: '', ingredients: [], image: '' });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to add menu item.');
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
            {/* Menu Form */}
            <div className="admin-menu-form-centered">
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
