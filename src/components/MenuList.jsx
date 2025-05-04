import React, { useState } from 'react';
import { dishSchema } from './formValidation';

const MenuList = ({ menu, onEdit, onDelete, errors }) => {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [localErrors, setLocalErrors] = useState({});

  const handleEditClick = (item) => {
    console.log('Item sent to edit:', item);
    setEditId(item.id);
    const { group, ...itemWithoutGroup } = item;
    setFormData(itemWithoutGroup);
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
    if (validateForms()) {
      if (onEdit) {
        const { id, group, ...formWithoutId } = formData;
        console.log('Updated item sent to onEdit:', formWithoutId);
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

    try {
      const singleFieldSchema = dishSchema.extract(name);
      const { error } = singleFieldSchema.validate(value);
      setLocalErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error ? error.message : undefined,
      }));
    } catch (err) {
    }
  };

  const validateForms = () => {
    const formDataWithStringId = {
      ...formData,
      id: formData.id ? String(formData.id) : undefined,
    };
    console.log('Form data before validation:', formDataWithStringId);
    const { error } = dishSchema.validate(formDataWithStringId, { abortEarly: false });
    if (error) {
      const formErrors = {};
      error.details.forEach((detail) => {
        const field = detail.path[0];
        formErrors[field] = detail.message;
      });
      console.log('Validation errors:', formErrors);
      setLocalErrors(formErrors);
      return false;
    }
    setLocalErrors({});
    return true;
  };

  return (
    <div className="menu-list">
      {menu.map((item) =>
        editId === item.id ? (
          <div key={item.id} className="menu-item edit-mode">
            <div>
              <label>Kategori:</label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
              >
                <option value="">Välj kategori</option>
                <option value="maki">Maki</option>
                <option value="nigiri">Nigiri</option>
                <option value="sashimi">Sashimi</option>
                <option value="drinks">Drycker</option>
              </select>
              {localErrors.category && (
                <p className="error-message">{localErrors.category}</p>
              )}
            </div>
            <div>
              <label>Namn:</label>
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
              <label>Beskrivning:</label>
              <input
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
              />
              {localErrors.description && (
                <p className="error-message">{localErrors.description}</p>
              )}
            </div>
            <div>
              <label>Pris (kr):</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {localErrors.price && (
                <p className="error-message">{localErrors.price}</p>
              )}
            </div>
            {(formData.category === 'maki' || formData.category === 'sashimi') && (
              <div>
                <label>Pris per extra bit (kr):</label>
                <input
                  name="extraBitPrice"
                  value={formData.extraBitPrice || ''}
                  onChange={handleChange}
                />
                {localErrors.extraBitPrice && (
                  <p className="error-message">{localErrors.extraBitPrice}</p>
                )}
              </div>
            )}
            {formData.category === 'drinks' && (
              <div>
                <label>Volym (liter):</label>
                <input
                  name="volume"
                  value={formData.volume || ''}
                  onChange={handleChange}
                />
                {localErrors.volume && (
                  <p className="error-message">{localErrors.volume}</p>
                )}
              </div>
            )}
            <button onClick={handleSaveClick}>Spara</button>
          </div>
        ) : (
          <div key={item.id} className="menu-item">
            <p><strong>{item.name}</strong> ({item.category}) – {item.price} kr</p>
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