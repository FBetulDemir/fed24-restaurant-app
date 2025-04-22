import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm.jsx';
import Header from '../components/Header.jsx';
import { saveData, loadData } from '../api.js';
import '../styles/Admin.css';

const AddMenu = () => {
  const [menu, setMenu] = useState([]);
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
      const existingMenu = await loadData('menu') || [];
      const newId = existingMenu.length > 0 ? Math.max(...existingMenu.map(item => item.id)) + 1 : 1;
      const newItem = { id: newId, ...newMenuItem };
      const updatedMenu = [...existingMenu, newItem];
      const success = await saveData('menu', updatedMenu);
      if (!success) {
        throw new Error('Failed to add menu item.');
      }
      setMenu(updatedMenu);
      setNewMenuItem({ name: '', description: '', price: '', ingredients: [], image: '' });
      setError('');
      alert('Menu item added successfully!');
      navigate('/admin/edit'); // นำทางไปยังหน้า Edit/Remove Menu เพื่อให้เห็นเมนูใหม่ทันที
    } catch (err) {
      setError(err.message || 'Failed to add menu item.');
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
            <div className="admin-menu-form full-width">
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

export default AddMenu;
