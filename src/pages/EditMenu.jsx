import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from '../components/MenuList';
import { saveData, loadData } from '../components/Api';
import { clearAndResetMenu } from '../data/uploadMenu';
import useAdminStore from '../stores/authorizationStore';
import AdminStart from '../components/AdminStart';
import '../styles/Admin.css';
import { dishSchema } from '../components/formValidation';
import Joi from 'joi';

const EditMenu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const [menuErrors, setMenuErrors] = useState({});
  const navigate = useNavigate();
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);

  const fetchMenu = async () => {
    try {
      const data = await loadData('menu');
      if (Array.isArray(data)) {
        const menuWithIds = data.map((item, index) => ({
          id: item.id ? String(item.id) : `temp-id-${index}`,
          ...item,
          category: item.category || item.group || 'Övrigt',
          group: undefined,
        }));
        console.log('Fetched menu data:', menuWithIds);
        setMenu(menuWithIds);
        setError('');
      } else {
        setMenu([]);
        setError('No menu items found.');
      }
    } catch (err) {
      console.error('Error loading menu:', err);
      setError('Failed to load menu. API may be unavailable or quota exceeded.');
      setMenu([]);
    }
  };

  const resetMenu = async () => {
    try {
      const success = await clearAndResetMenu();
      if (success) {
        await fetchMenu();
        setError('');
      } else {
        setError('Failed to reset menu. API may be unavailable or quota exceeded.');
      }
    } catch (err) {
      console.error('Error resetting menu:', err);
      setError('Failed to reset menu. Please try again later.');
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login');
    } else {
      fetchMenu();
    }
  }, [isLoggedIn, navigate]);

  const handleDelete = async (id) => {
    try {
      const updatedMenu = menu.filter((item) => item.id !== id);
      const success = await saveData('menu', updatedMenu.map(({ id, ...rest }) => rest));
      if (success) {
        setMenu(updatedMenu);
        setError('');
      } else {
        setError('Failed to delete item. API may be unavailable or quota exceeded.');
      }
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setError('Failed to delete item. Please try again later.');
    }
  };

  const handleCreate = async (newItem) => {
    try {
      const { id: ignoredId, ...itemWithoutId } = newItem;

      const validatedItem = {
        ...itemWithoutId,
        category: newItem.category,
        ingredients: Array.isArray(newItem.ingredients)
          ? newItem.ingredients
          : newItem.ingredients.split(',').map(s => s.trim()).filter(s => s.length > 0),
      };

      console.log('Validated item (create):', validatedItem);

      const { error } = dishSchema.validate(validatedItem, { abortEarly: false });

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message).join(', ');
        setError('Fel i formuläret: ' + errorMessages);
        return;
      }

      const newMenu = [...menu, { ...validatedItem, id: crypto.randomUUID() }];

      const success = await saveData('menu', newMenu.map(({ id, ...rest }) => rest));
      if (success) {
        await fetchMenu();
        setError('');
      } else {
        setError('Misslyckades med att skapa ny rätt. API may be unavailable or quota exceeded.');
      }
    } catch (err) {
      console.error('Error creating menu item:', err);
      setError('Misslyckades med att skapa ny rätt. Please try again later.');
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      console.log('Received updatedItem in handleEdit:', updatedItem);

      const { id: ignoredId, group, ...itemWithoutId } = updatedItem;

      const validatedItem = {
        ...itemWithoutId,
        category: updatedItem.category,
        ingredients: Array.isArray(updatedItem.ingredients)
          ? updatedItem.ingredients
          : updatedItem.ingredients.split(',').map(s => s.trim()).filter(s => s.length > 0),
      };

      console.log('Validated item (edit):', validatedItem);

      const { error } = dishSchema.validate(validatedItem, { abortEarly: false });

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message).join(', ');
        setError('Fel i formuläret: ' + errorMessages);
        return;
      }

      const updatedMenu = menu.map((item) =>
        item.id === id ? { ...item, ...validatedItem } : item
      );

      const success = await saveData('menu', updatedMenu.map(({ id, ...rest }) => rest));
      if (success) {
        await fetchMenu();
        setError('');
      } else {
        setError('Misslyckades med att uppdatera rätt. API may be unavailable or quota exceeded.');
      }
    } catch (err) {
      console.error('Error updating menu item:', err);
      setError('Misslyckades med att uppdatera rätt. Please try again later.');
    }
  };

  const groups = ['maki', 'nigiri', 'sashimi', 'drinks'];

  const groupedMenu = menu.reduce((acc, item) => {
    const category = item.category || 'Övrigt';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  console.log('Grouped menu:', groupedMenu);

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <AdminStart />
      </aside>
      <main className="admin-main">
        <div className="admin-content">
          <h2 className="center-text">Redigera Meny</h2>
          <div className="button-group">
            <button className="custom-button" onClick={fetchMenu}>
              Förnya Menyn
            </button>
            <button className="custom-button" onClick={resetMenu}>
              Reset Menu
            </button>
          </div>
          {error && <p className="menu-form-error">{error}</p>}
          {menu.length === 0 ? (
            <p>No menu items available.</p>
          ) : (
            groups.map((group) => (
              groupedMenu[group] && (
                <div key={group} className="menu-group">
                  <p> </p>
                  <p> </p>
                  <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                  <MenuList
                    menu={groupedMenu[group]}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    errors={menuErrors}
                  />
                </div>
              )
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default EditMenu;