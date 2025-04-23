import React from 'react';

const MenuForm = ({ menuItem, setMenuItem, onSubmit, buttonText }) => {
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...menuItem.ingredients];
    newIngredients[index] = value;
    setMenuItem({ ...menuItem, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setMenuItem({ ...menuItem, ingredients: [...menuItem.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    setMenuItem({
      ...menuItem,
      ingredients: menuItem.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuItem({ ...menuItem, image: reader.result }); // เก็บ Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit} className="menu-form">
      <div>
        <label>Add Title</label>
        <input
          type="text"
          value={menuItem.name}
          onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={menuItem.description}
          onChange={(e) => setMenuItem({ ...menuItem, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={menuItem.price}
          onChange={(e) => setMenuItem({ ...menuItem, price: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Ingredients</label>
        {menuItem.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="add-ingredient">
          Add Ingredient
        </button>
      </div>
      <div className="image-group">
        <div>
          <label>Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="image-preview">
          {menuItem.image ? (
            <img src={menuItem.image} alt="Preview" />
          ) : (
            <div className="image-placeholder">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default MenuForm;
