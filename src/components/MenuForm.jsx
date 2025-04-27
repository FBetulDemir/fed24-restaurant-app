import React from 'react';

const MenuForm = ({ menuItem, setMenuItem, onSubmit, buttonText }) => {
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...menuItem.ingredients];
    newIngredients[index] = value.trim(); 
    setMenuItem({ ...menuItem, ingredients: newIngredients.filter(ingredient => ingredient.length > 0) });
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

  // ฟังก์ชันสำหรับจัดการการป้อนเฉพาะตัวเลข
  const handleNumberInput = (e, field) => {
    const value = e.target.value;
    // อนุญาตให้เป็นตัวเลขเท่านั้น (รวมถึงช่องว่างเพื่อให้สามารถลบได้)
    if (/^\d*$/.test(value)) {
      setMenuItem({ ...menuItem, [field]: value });
    }
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
          <option value="Drinks">Drycker</option>
        </select>
      </div>
      <div>
        <label>Lägg till titel</label>
        <input
          type="text"
          value={menuItem.name}
          onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
          required
        />
          {errors?.text && <p className="error-message">{errors.text}</p>}

      </div>
      <div>
        <label>Beskrivning</label>
        <textarea
          value={menuItem.description}
          onChange={(e) => setMenuItem({ ...menuItem, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Pris(kr)</label>
        <input
          type="text"
          value={menuItem.price}
          onChange={(e) => handleNumberInput(e, 'price')}
          pattern="\d*"
          required
        />
      </div>
      <div>
        <label>Extra Pris (kr) (optional)</label>
        <input
          type="text"
          value={menuItem.extraPrice || ''}
          onChange={(e) => handleNumberInput(e, 'extraPrice')}
          pattern="\d*"
        />
      </div>
      <div>
        <label>Ingredienser(optional)</label>
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
        <button type="button" onClick={addIngredient} className="add-ingredient">
          Lägg till
        </button>
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default MenuForm;
