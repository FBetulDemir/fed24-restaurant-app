import React, { useState } from 'react';

const MenuList = ({ menu, onEdit, onDelete, errors }) => {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [localErrors, setLocalErrors] = useState({});

  const handleEditClick = (item) => {
    setEditId(item.id);
    setFormData({ ...item });
    setLocalErrors({}); 
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) formErrors[field] = error;
    });
    setLocalErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSaveClick = () => {
    const { id, ...formWithoutId } = formData; 
    if (validateForm(formWithoutId)) {  
      if (onEdit) {
        onEdit(editId, formWithoutId);  
      }
      setEditId(null); 
    }
  };

  const validateField = (fieldName, value) => {
    if (fieldName === 'id' || fieldName === 'ingredients' || fieldName === 'description' || fieldName === 'group') {
      return '';  
    }
  
    switch (fieldName) {
      case 'name':
        return value.trim() === '' ? 'Namnet är obligatoriskt.' : '';
      case 'price':
        return value.trim() === '' ? 'Pris är obligatoriskt.' : '';
      default:
        return '';  
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  
    const error = validateField(name, value);
    setLocalErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: error };
      if (!updatedFormData.hasOwnProperty(name)) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validateFields = (fieldName, value) => {
    if (fieldName === 'id' || fieldName === 'ingredients' || fieldName === 'description' || fieldName === 'group') {
      return '';  
    }
  
    switch (fieldName) {
      case 'name':
        return value.trim() === '' ? 'Namnet är obligatoriskt.' : '';
      case 'price':
        return value.trim() === '' ? 'Pris är obligatoriskt.' : '';
      default:
        return '';  
    }
  };

  return (
    <div className="menu-list">
      {menu.map((item) =>
        editId === item.id ? (
          <div key={item.id} className="menu-item edit-mode">
            <div>
              <label></label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {localErrors.name && (
                <p className="error-message">{localErrors.name}</p>
              )}
            </div>
            <div>
              <label></label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {localErrors.description && (
                <p className="error-message">{localErrors.description}</p>
              )}
            </div>
            <div>
              <label></label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {localErrors.price && (
                <p className="error-message">{localErrors.price}</p>
              )}
            </div>
            <div>
              <label></label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
              >
                <option value="Maki">Maki</option>
                <option value="Nigiri">Nigiri</option>
                <option value="Sashimi">Sashimi</option>
                <option value="Drinks">Drycker</option>
              </select>
              {localErrors.group && (
                <p className="error-message">{localErrors.group}</p>
              )}
            </div>
            <button onClick={handleSaveClick}>Spara</button>
          </div>
        ) : (
          <div key={item.id} className="menu-item">
            <p><strong>{item.name}</strong> ({item.group}) – {item.price} kr</p>
            <div className="menu-actions">
              <button onClick={() => handleEditClick(item)}>✏️</button>
              <button onClick={() => onDelete(item.id)}>🗑️</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MenuList;