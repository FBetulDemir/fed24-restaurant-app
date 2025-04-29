import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm.jsx';
import Header from '../components/Header.jsx';
import { saveData, loadData } from '../api.js';
import '../styles/Admin.css';

const AddMenu = () => {
  const [error, setError] = useState('');
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: [],
    group: '',
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
    if (!newMenuItem.group) {
      setError('Please select a group.');
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
    // ตรวจสอบว่า price เป็นตัวเลขที่ถูกต้องและมากกว่าหรือเท่ากับ 0
    const priceValue = parseFloat(newMenuItem.price);
    if (isNaN(priceValue) || priceValue < 0) {
      setError('Price must be a valid number greater than or equal to 0.');
      return;
    }
    // ตรวจสอบ extraPrice ถ้ามีค่า
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

      const newId = existingMenu.length > 0 ? Math.max(...existingMenu.map(item => item.id)) + 1 : 1;
      const newItem = { id: newId, ...newMenuItem };
      const updatedMenu = [...existingMenu, newItem];
      console.log('New menu to save:', updatedMenu);

      const success = await saveData('menu', updatedMenu, abortController.signal);
      if (!success) {
        throw new Error('Failed to add menu item. The API may be unavailable or reached its limit.');
      }

      const updatedData = await loadData('menu', abortController.signal);
      console.log('Data after saving:', updatedData);

      setNewMenuItem({ name: '', description: '', price: '', ingredients: [], group: '', extraPrice: '' });
      setError('');
      alert('Menu item added successfully!');
      navigate('/admin/edit');
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('AddMenu request aborted');
        return;
      }
      setError(err.message || 'Failed to add menu item.');
      console.error('Error adding menu item:', err);
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2>Welcome Employee!</h2>
          <button onClick={() => navigate('/admin/add')}>Ny Meny</button>
          <button onClick={() => navigate('/admin/edit')}>Redigera</button>
          <button onClick={() => navigate('/')}>Logga ut</button>
        </aside>
        <main className="admin-main">
          <div className="admin-content">
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
    </div>
  );
};

export default AddMenu;
