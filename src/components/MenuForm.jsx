import React from 'react';
import PropTypes from 'prop-types';

const MenuForm = ({ menuItem, setMenuItem, onSubmit, buttonText }) => {
  console.log('MenuForm received menuItem:', menuItem); // ดีบักข้อมูล menuItem

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...menuItem.ingredients];
    updatedIngredients[index] = value;
    setMenuItem((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setMenuItem((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index) => {
    const updatedIngredients = menuItem.ingredients.filter((_, i) => i !== index);
    setMenuItem((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  return (
    <form className="menu-form" onSubmit={onSubmit}>
      <label>
        Kategori:
        <select name="category" value={menuItem.category || ''} onChange={handleChange}>
          <option value="">Välj kategori</option>
          <option value="maki">Maki</option>
          <option value="nigiri">Nigiri</option>
          <option value="sashimi">Sashimi</option>
          <option value="drinks">Drycker</option>
        </select>
      </label>

      <label>
        Namn:
        <input type="text" name="name" value={menuItem.name} onChange={handleChange} />
      </label>

      <label>
        Beskrivning:
        <textarea name="description" value={menuItem.description} onChange={handleChange} />
      </label>

      <label>
        Pris (kr):
        <input type="number" name="price" value={menuItem.price} onChange={handleChange} />
      </label>

      {(menuItem.category === 'maki' || menuItem.category === 'sashimi') && (
        <label>
          Pris per extra bit (kr):
          <input type="number" name="extraPrice" value={menuItem.extraPrice} onChange={handleChange} />
        </label>
      )}

      {menuItem.category === 'drinks' && (
        <label>
          Volym (liter):
          <input type="text" name="volume" value={menuItem.volume || ''} onChange={handleChange} />
        </label>
      )}

      <label>
        Ingredienser:
        {menuItem.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Ta bort
            </button>
          </div>
        ))}
        <button type="button" className="add-ingredient" onClick={addIngredient}>
          Lägg till ingrediens
        </button>
      </label>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

MenuForm.propTypes = {
  menuItem: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    extraPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    volume: PropTypes.string,
  }).isRequired,
  setMenuItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default MenuForm;
