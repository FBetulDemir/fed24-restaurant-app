import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import MenuForm from '../components/MenuForm.jsx';
import MenuList from '../components/MenuList.jsx';
import '../styles/Admin.css';

// Mock Data สำหรับเริ่มต้น
const initialMenu = [
  { id: 1, name: "Sushi Roll", description: "Classic sushi roll with fresh fish", price: 150, ingredients: ["fish", "rice", "seaweed"], image: "https://via.placeholder.com/150" },
  { id: 2, name: "Tempura", description: "Crispy fried shrimp tempura", price: 200, ingredients: ["shrimp", "flour", "oil"], image: "https://via.placeholder.com/150" },
];

const menuSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'ชื่อต้องมีอย่างน้อย 3 ตัวอักษร',
    'any.required': 'ต้องกรอกชื่อ',
  }),
  description: Joi.string().min(10).required().messages({
    'string.min': 'คำอธิบายต้องมีอย่างน้อย 10 ตัวอักษร',
    'any.required': 'ต้องกรอกคำอธิบาย',
  }),
  price: Joi.number().min(0).required().messages({
    'number.min': 'ราคาต้องเป็นจำนวนบวก',
    'any.required': 'ต้องกรอกราคา',
  }),
  ingredients: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.min': 'ต้องมีส่วนผสมอย่างน้อย 1 รายการ',
    'any.required': 'ต้องกรอกส่วนผสม',
  }),
  image: Joi.string().uri().required().messages({
    'string.uri': 'รูปภาพต้องเป็น URL ที่ถูกต้อง',
    'any.required': 'ต้องกรอก URL รูปภาพ',
  }),
});

const Admin = () => {
  const [menu, setMenu] = useState(initialMenu); // ใช้ mock data
  const [error, setError] = useState('');
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    ingredients: [],
    image: '',
  });
  const navigate = useNavigate();

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    const { error } = menuSchema.validate(newMenuItem, { abortEarly: false });
    if (error) {
      setError(error.details.map((err) => err.message).join(', '));
      return;
    }

    // สร้าง ID ใหม่โดยใช้ timestamp หรือเลขลำดับ
    const newId = menu.length > 0 ? Math.max(...menu.map(item => item.id)) + 1 : 1;
    const newItem = { id: newId, ...newMenuItem };
    setMenu([...menu, newItem]);
    setNewMenuItem({ name: '', description: '', price: '', ingredients: [], image: '' });
    setError('');
  };

  const handleDeleteMenuItem = (id) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

  const handleEditMenuItem = (id, updatedItem) => {
    const { error } = menuSchema.validate(updatedItem, { abortEarly: false });
    if (error) {
      setError(error.details.map((err) => err.message).join(', '));
      return;
    }

    setMenu(menu.map((item) => (item.id === id ? { id, ...updatedItem } : item)));
  };

  return (
    <div>
      {/* Header */}
      <header className="admin-header">
        <div className="menu-dropdown">
          <button>
            <span>MENU</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <h1 className="logo">ISUSHI</h1>
        <div className="profile-icon"></div>
      </header>

      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h2>Welcome Employee!</h2>
          <button>NEW MENU</button>
          <button>EDIT/REMOVE MENU</button>
          <button onClick={() => navigate('/')}>SIGN OUT</button>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-content">
            {/* Menu List */}
            <div className="admin-menu-list">
              <MenuList
                menu={menu}
                onDelete={handleDeleteMenuItem}
                onEdit={handleEditMenuItem}
              />
            </div>
            {/* Menu Form */}
            <div className="admin-menu-form">
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

export default Admin;
