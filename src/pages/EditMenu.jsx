import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from '../components/MenuList';
import { saveData, loadData } from '../components/Api';
import useAdminStore from '../stores/authorizationStore'; 
import AdminStart from '../components/AdminStart';
import '../styles/Admin.css';

const EditMenu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);

  const fetchMenu = async () => {
    try {
      const data = await loadData('menu');
      if (Array.isArray(data)) {
        const menuWithIds = data.map((item, index) => ({
          id: item.id || index + 1,
          ...item,
        }));
        setMenu(menuWithIds);
      } else {
        setMenu([]);
      }
    } catch (err) {
      console.error('Error loading menu:', err);
      setError('Failed to load menu.');
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login');
    } else {
      fetchMenu();
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    try {
      const updatedMenu = menu.filter((item) => item.id !== id);
      const success = await saveData('menu', updatedMenu.map(({ id, ...rest }) => rest));
      if (success) {
        setMenu(updatedMenu);
      } else {
        setError('Failed to delete item.');
      }
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setError('Failed to delete item.');
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      const updatedMenu = menu.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
      const success = await saveData('menu', updatedMenu.map(({ id, ...rest }) => rest));
      if (success) {
        setMenu(updatedMenu);
      } else {
        setError('Failed to update item.');
      }
    } catch (err) {
      console.error('Error updating menu item:', err);
      setError('Failed to update item.');
    }
  };

  const groups = ['Maki', 'Nigiri', 'Sashimi', 'Drinks'];

  const groupedMenu = menu.reduce((acc, item) => {
    const group = item.group || item.category || 'Övrigt';   // <-- ✨ FIX
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <AdminStart />
      </div>

      <div className="admin-main">
        <h2>Redigera Meny</h2>
        <button onClick={fetchMenu} style={{ marginBottom: '1rem' }}>
          Refresh Menu
        </button>

        {error && <p className="menu-form-error">{error}</p>}

        {menu.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          groups.map((group) => (
            groupedMenu[group] && (
              <div key={group} className="menu-group">
                <h3>{group}</h3>
                <MenuList
                  menu={groupedMenu[group]}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default EditMenu;
