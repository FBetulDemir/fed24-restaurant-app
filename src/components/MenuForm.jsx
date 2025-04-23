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

  return (
    <form onSubmit={onSubmit} className="menu-form">
      <div>
        <label>Group</label>
        <select
          value={menuItem.group || ''}
          onChange={(e) => setMenuItem({ ...menuItem, group: e.target.value })}
          required
        >
          <option value="" disabled>Select a group</option>
          <option value="Maki">Maki</option>
          <option value="Nigiri">Nigiri</option>
          <option value="Sashimi">Sashimi</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>
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
        <label>Price (kr)</label>
        <input
          type="number"
          value={menuItem.price}
          onChange={(e) => setMenuItem({ ...menuItem, price: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Extra Price (kr) (optional)</label>
        <input
          type="number"
          value={menuItem.extraPrice || ''}
          onChange={(e) => setMenuItem({ ...menuItem, extraPrice: e.target.value })}
        />
      </div>
      <div>
        <label>Ingredients (optional)</label>
        {menuItem.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
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
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default MenuForm;
