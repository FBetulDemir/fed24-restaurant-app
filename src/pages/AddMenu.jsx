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
  const abortController = new AbortController(); // สร้าง AbortController

  // Cleanup function เพื่อยกเลิกคำขอเมื่อคอมโพเนนต์ถูก unmount
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
    if (!newMenuItem.price || newMenuItem.price < 0) {
      setError('Price must be a positive number.');
      return;
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
      navigate('/admin/edit'); // เรียก navigate หลังจาก promise เสร็จสิ้น
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
