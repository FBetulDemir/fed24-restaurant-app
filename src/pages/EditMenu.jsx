import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from '../components/MenuList';
import { saveData, loadData } from '../components/Api';
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

const handleCreate = async (newItem) => {
  try {
    const { id: ignoredId, ...itemWithoutId } = newItem;

    const validatedItem = {
      ...itemWithoutId,
      ingredients: Array.isArray(newItem.ingredients)
        ? newItem.ingredients
        : newItem.ingredients.split(',').map(s => s.trim()).filter(s => s.length > 0),
    };

    const { error } = dishSchema.validate(validatedItem, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(', ');
      setError('Fel i formuläret: ' + errorMessages);
      return;
    }

    const newMenu = [...menu, { ...validatedItem, id: menu.length + 1 }]; 

    const success = await saveData('menu', newMenu.map(({ id, ...rest }) => rest));
    if (success) {
      setMenu(newMenu);
      setError('');
    } else {
      setError('Misslyckades med att skapa ny rätt.');
    }
  } catch (err) {
    console.error('Error creating menu item:', err);
    setError('Misslyckades med att skapa ny rätt.');
  }
};

const handleEdit = async (id, updatedItem) => {
  try {
    const { id: ignoredId, ...itemWithoutId } = updatedItem;

    const validatedItem = {
      ...itemWithoutId,
      ingredients: Array.isArray(updatedItem.ingredients)
        ? updatedItem.ingredients
        : updatedItem.ingredients.split(',').map(s => s.trim()).filter(s => s.length > 0),
    };

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
      setMenu(updatedMenu);
      setError('');
    } else {
      setError('Misslyckades med att uppdatera rätt.');
    }
  } catch (err) {
    console.error('Error updating menu item:', err);
    setError('Misslyckades med att uppdatera rätt.');
  }
};

  const groups = ['Maki', 'Nigiri', 'Sashimi', 'Drinks'];

  const groupedMenu = menu.reduce((acc, item) => {
    const group = item.group || item.category || 'Övrigt';  
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
          Förnya Menyn
        </button>

        {/* {error && <p className="menu-form-error">{error}</p>} */}

        {menu.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          groups.map((group) => (
            groupedMenu[group] && (
              <div key={group} className="menu-group">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <h3>{group}</h3>
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
    </div>
  );
};

export default EditMenu;
