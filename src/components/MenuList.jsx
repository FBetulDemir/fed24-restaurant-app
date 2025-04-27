import React, { useState } from 'react';

const MenuList = ({ menu, onEdit, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (item) => {
    setEditId(item.id);
    setFormData({ ...item });
  };

  const handleSaveClick = () => {
    if (onEdit) {
      onEdit(editId, formData);
    }
    setEditId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="menu-list">
      {menu.map((item) =>
        editId === item.id ? (
          <div key={item.id} className="menu-item edit-mode">
            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="description" value={formData.description} onChange={handleChange} />
            <input name="price" value={formData.price} onChange={handleChange} />
            <select name="group" value={formData.group} onChange={handleChange}>
              <option value="Maki">Maki</option>
              <option value="Nigiri">Nigiri</option>
              <option value="Sashimi">Sashimi</option>
              <option value="Drinks">Drinks</option>
            </select>
            <button onClick={handleSaveClick}>Save</button>
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
