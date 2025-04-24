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

  const groupedMenu = menu.reduce((acc, item) => {
    const group = item.group || 'Other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});

  const groups = ['Maki', 'Nigiri', 'Sashimi', 'Drinks'];

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
        throw new Error('Failed to update menu item. The API may be unavailable or reached its limit.');
      }

      // ดีบั๊ก: โหลดข้อมูลหลังบันทึกเพื่อยืนยัน
      const updatedData = await loadData('menu');
      console.log('Data after updating:', updatedData);

      setMenu(updatedMenu);
      setError(''); // ล้างข้อความ error หากบันทึกสำเร็จ
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
              {menu.length === 0 ? (
                <p className="menu-empty">No menu items available.</p>
              ) : (
                groups.map(group => (
                  groupedMenu[group] && (
                    <div key={group} className="menu-group">
                      <h3>{group}</h3>
                      <MenuList
                        menu={groupedMenu[group]}
                        onDelete={handleDeleteMenuItem}
                        onEdit={handleEditMenuItem}
                      />
                    </div>
                  )
                ))
              )}
              {error && <p className="menu-form-error">{error}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditMenu;
