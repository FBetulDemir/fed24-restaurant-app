import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm.jsx';
import AdminStart from '../components/AdminStart';
import { saveData, loadData } from '../components/Api';
import '../styles/Admin.css';

const AddMenu = () => {
  const [error, setError] = useState('');
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: [],
    category: '',
    extraPrice: '',
  });
  const navigate = useNavigate();
  const abortController = new AbortController();

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.category) {
      setError('Please select a category.');
      return;
    }
    if (!newMenuItem.name || newMenuItem.name.length < 3) {
      setError('Name must be at least 3 characters long.');
      return;
    }
    if (!newMenuItem.description || newMenuItem.description.length < 10) {
      setError('Description must be at least 10 characters long.');
      return;
    }
    if (!newMenuItem.price) {
      setError('Price is required.');
      return;
    }
    const priceValue = parseFloat(newMenuItem.price);
    if (isNaN(priceValue) || priceValue < 0) {
      setError('Price must be a valid number greater than or equal to 0.');
      return;
    }
    if (newMenuItem.extraPrice) {
      const extraPriceValue = parseFloat(newMenuItem.extraPrice);
      if (isNaN(extraPriceValue) || extraPriceValue < 0) {
        setError('Extra Price must be a valid number greater than or equal to 0.');
        return;
      }
    }

    try {
      const existingMenu = (await loadData('menu', abortController.signal)) || [];
      console.log('Existing menu before adding:', existingMenu);

      const newItem = { id: crypto.randomUUID(), ...newMenuItem }; // ใช้ crypto.randomUUID() เพื่อสร้าง id
      const updatedMenu = [...existingMenu, newItem];
      console.log('New menu to save:', updatedMenu);

      const success = await saveData('menu', updatedMenu, abortController.signal);
      if (success) {
        setNewMenuItem({ name: '', description: '', price: '', ingredients: [], category: '', extraPrice: '' });
        setError('');
        alert('Menu item added successfully!');
        navigate('/admin/edit');
      } else {
        setError('Failed to add menu item. API may be unavailable or quota exceeded.');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('AddMenu request aborted');
        return;
      }
      setError('Failed to add menu item. Please try again later.');
      console.error('Error adding menu item:', err);
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <AdminStart />
      </aside>
      <main className="admin-main">
        <div className="admin-content">
          <h2>Lägg till ny meny</h2>
          <div className="admin-menu-form full-width">
            <MenuForm
              menuItem={newMenuItem}
              setMenuItem={setNewMenuItem}
              onSubmit={handleAddMenuItem}
              buttonText="Lägg till ny meny"
            />
            {error && <p className="menu-form-error">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMenu;