import React, { useState } from 'react';
import MenuForm from './MenuForm.jsx';

const MenuList = ({ menu, onDelete, onEdit }) => {
  const [editingItem, setEditingItem] = useState(null);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editingItem.id, editingItem);
    setEditingItem(null);
  };

  return (
    <div>
      {menu.length === 0 && <p className="menu-empty">No menu items available.</p>}
      {menu.map((item, index) => (
        <div key={item.id} className="menu-item">
          {editingItem && editingItem.id === item.id ? (
            <div>
              <MenuForm
                menuItem={editingItem}
                setMenuItem={setEditingItem}
                onSubmit={handleEditSubmit}
                buttonText="UPDATE MENU"
              />
            </div>
          ) : (
            <div className="menu-item-content">
              <div className="menu-item-details">
                <span>Menu {index + 1}: {item.name}</span>
              </div>
              <div className="actions">
                <button onClick={() => setEditingItem(item)}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button onClick={() => onDelete(item.id)}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v1h8V5a2 2 0 00-2-2zm-2 4h8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
