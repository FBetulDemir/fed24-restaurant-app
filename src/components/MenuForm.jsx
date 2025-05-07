import React, { useState } from 'react';
import { dishSchema } from './formValidation';

const MenuForm = ({ menuItem, setMenuItem, onSubmit, buttonText }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedMenuItem = { ...menuItem, [name]: value };
    setMenuItem(updatedMenuItem);

    try {
      const singleFieldSchema = dishSchema.extract(name);
      const { error } = singleFieldSchema.validate(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error ? error.message : undefined,
      }));
    } catch (err) {
    }
  };

  const validateField = (fieldName, value) => {
    // ให้ Joi จัดการข้อความคำเตือนทั้งหมด
    try {
      const singleFieldSchema = dishSchema.extract(fieldName);
      const { error } = singleFieldSchema.validate(value);
      return error ? error.message : '';
    } catch (err) {
      return '';
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(menuItem).forEach((field) => {
      const error = validateField(field, menuItem[field]);
      if (error) formErrors[field] = error;
    });

    const { error } = dishSchema.validate(menuItem, { abortEarly: false });
    if (error) {
      error.details.forEach((detail) => {
        const field = detail.path[0];
        formErrors[field] = detail.message;
      });
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="menu-form">
      <div>
        <label>Kategori:</label>
        <select
          name="category"
          value={menuItem.category}
          onChange={handleChange}
        >
          <option value="">Välj kategori</option>
          <option value="maki">Maki</option>
          <option value="nigiri">Nigiri</option>
          <option value="sashimi">Sashimi</option>
          <option value="drinks">Drycker</option>
        </select>
        {errors.category && <p className="error-message">{errors.category}</p>}
      </div>
      <div>
        <label>Namn:</label>
        <input
          name="name"
          value={menuItem.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div>
        <label>Beskrivning (valfritt):</label>
        <input
          name="description"
          value={menuItem.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>
      <div>
        <label>Pris (kr):</label>
        <input
          name="price"
          value={menuItem.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>
      {(menuItem.category === 'maki' || menuItem.category === 'sashimi') && (
        <div>
          <label>Pris per extra bit (kr):</label>
          <input
            name="extraBitPrice"
            value={menuItem.extraBitPrice || ''}
            onChange={handleChange}
          />
          {errors.extraBitPrice && <p className="error-message">{errors.extraBitPrice}</p>}
        </div>
      )}
      {menuItem.category === 'drinks' && (
        <div>
          <label>Volym (liter):</label>
          <input
            name="volume"
            value={menuItem.volume || ''}
            onChange={handleChange}
          />
          {errors.volume && <p className="error-message">{errors.volume}</p>}
        </div>
      )}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default MenuForm;