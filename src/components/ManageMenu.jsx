import { useEffect, useState, useContext } from "react";
import { editMenuItem, deleteMenuItem } from "../data/uploadMenu";
import MenuContext from "../components/MenuContext";
import { dishSchema } from "./formValidation";

const ManageMenu = () => {
  const { menuData, refreshMenu } = useContext(MenuContext);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Synkronisera meny från MenuContext
  useEffect(() => {
    const allMenuItems = [
      ...menuData.drinks,
      ...menuData.maki,
      ...menuData.nigiri,
      ...menuData.sashimi,
    ];
    console.log("📋 Uppdaterar meny i ManageMenu:", allMenuItems);
    setMenu(allMenuItems);
    setLoading(false);
  }, [menuData]);

  // Validera formulärdata
  const validateForm = (item) => {
    const dataToValidate = {
      name: item.name,
      price: parseFloat(item.price) || 0,
      description: item.description || "",
      ingredients: item.ingredients || [],
      category: item.category,
      ...(item.category === "drinks" && item.volume
        ? { volume: parseFloat(item.volume) }
        : {}),
      ...(["maki", "nigiri", "sashimi"].includes(item.category) && item.baseQuantity
        ? { baseQuantity: parseInt(item.baseQuantity) }
        : {}),
      ...(["maki", "sashimi"].includes(item.category) && item.extraBitPrice
        ? { extraBitPrice: parseFloat(item.extraBitPrice) }
        : {}),
    };

    const { error } = dishSchema.validate(dataToValidate, { abortEarly: false });
    if (error) {
      const fieldErrors = {};
      error.details.forEach((detail) => {
        const field = detail.path[0];
        fieldErrors[field] = detail.message;
      });
      setValidationErrors(fieldErrors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  // Handle edit form submission
  const handleEdit = async (originalItem) => {
    // Validera innan spara
    const isValid = validateForm(updatedItem);
    if (!isValid) {
      return;
    }

    const updatedData = {
      name: updatedItem.name,
      price: parseFloat(updatedItem.price),
      description: updatedItem.description || "",
      ingredients: updatedItem.ingredients || [],
      category: originalItem.category,
      ...(originalItem.category === "drinks" && updatedItem.volume
        ? { volume: parseFloat(updatedItem.volume) }
        : {}),
      ...(["maki", "nigiri", "sashimi"].includes(originalItem.category) && updatedItem.baseQuantity
        ? { baseQuantity: parseInt(updatedItem.baseQuantity) }
        : {}),
      ...(["maki", "sashimi"].includes(originalItem.category) && updatedItem.extraBitPrice
        ? { extraBitPrice: parseFloat(updatedItem.extraBitPrice) }
        : {}),
    };

    const success = await editMenuItem(originalItem, updatedData);
    if (success) {
      setMenu((prev) =>
        prev.map((item) =>
          item.name === originalItem.name && item.category === originalItem.category
            ? { ...updatedData, category: originalItem.category }
            : item
        )
      );
      setEditingItem(null);
      setUpdatedItem({});
      console.log("✅ Redigering klar, anropar refreshMenu...");
      refreshMenu(); // Uppdatera menyn i gränssnittet
    } else {
      setError("Misslyckades med att uppdatera objektet.");
    }
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (window.confirm(`Är du säker på att du vill radera ${item.name}?`)) {
      const success = await deleteMenuItem(item);
      if (success) {
        setMenu((prev) =>
          prev.filter(
            (i) => !(i.name === item.name && i.category === item.category)
          )
        );
        console.log("✅ Radering klar, anropar refreshMenu...");
        refreshMenu(); // Uppdatera menyn i gränssnittet
      } else {
        setError("Misslyckades med att radera objektet.");
      }
    }
  };

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item);
    setUpdatedItem({
      ...item,
      ingredients: item.ingredients || [],
      price: item.price.toString(),
      volume: item.volume ? item.volume.toString() : "",
      baseQuantity: item.baseQuantity ? item.baseQuantity.toString() : "",
      extraBitPrice: item.extraBitPrice ? item.extraBitPrice.toString() : "",
    });
    setValidationErrors({});
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ingredients input for editing
  const handleIngredientChange = (e) => {
    const ingredients = e.target.value
      ? e.target.value.split(",").map((ing) => ing.trim()).filter((ing) => ing)
      : [];
    setUpdatedItem((prev) => ({ ...prev, ingredients }));
  };

  if (loading) return <div>Laddar...</div>;
  if (error) return <div>Fel: {error}</div>;

  return (
    <div>
      <h2>Hantera meny</h2>
      {menu.length === 0 ? (
        <p>Inga objekt i menyn.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Kategori</th>
              <th>Pris</th>
              <th>Beskrivning</th>
              <th>Ingredienser</th>
              <th>Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={`${item.name}-${item.category}`}>
                {editingItem &&
                editingItem.name === item.name &&
                editingItem.category === item.category ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={updatedItem.name || ""}
                        onChange={handleInputChange}
                      />
                      {validationErrors.name && (
                        <p className="error">{validationErrors.name}</p>
                      )}
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={updatedItem.price || ""}
                        onChange={handleInputChange}
                      />
                      {validationErrors.price && (
                        <p className="error">{validationErrors.price}</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={updatedItem.description || ""}
                        onChange={handleInputChange}
                      />
                      {validationErrors.description && (
                        <p className="error">{validationErrors.description}</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ingredients"
                        value={(updatedItem.ingredients || []).join(", ")}
                        onChange={handleIngredientChange}
                        placeholder="Ingredienser (kommaseparerade, valfritt)"
                      />
                      {validationErrors.ingredients && (
                        <p className="error">{validationErrors.ingredients}</p>
                      )}
                    </td>
                    <td>
                      {item.category === "drinks" && (
                        <div>
                          <input
                            type="number"
                            name="volume"
                            value={updatedItem.volume || ""}
                            onChange={handleInputChange}
                            placeholder="Volym (liter, valfritt)"
                          />
                          {validationErrors.volume && (
                            <p className="error">{validationErrors.volume}</p>
                          )}
                        </div>
                      )}
                      {["maki", "nigiri", "sashimi"].includes(item.category) && (
                        <div>
                          <input
                            type="number"
                            name="baseQuantity"
                            value={updatedItem.baseQuantity || ""}
                            onChange={handleInputChange}
                            placeholder="Basantal (valfritt)"
                          />
                          {validationErrors.baseQuantity && (
                            <p className="error">{validationErrors.baseQuantity}</p>
                          )}
                        </div>
                      )}
                      {["maki", "sashimi"].includes(item.category) && (
                        <div>
                          <input
                            type="number"
                            name="extraBitPrice"
                            value={updatedItem.extraBitPrice || ""}
                            onChange={handleInputChange}
                            placeholder="Extra bit-pris (valfritt)"
                          />
                          {validationErrors.extraBitPrice && (
                            <p className="error">{validationErrors.extraBitPrice}</p>
                          )}
                        </div>
                      )}
                      <button onClick={() => handleEdit(item)}>Spara</button>
                      <button onClick={() => setEditingItem(null)}>Avbryt</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.ingredients ? item.ingredients.join(", ") : "Inga ingredienser"}</td>
                    <td>
                      <button onClick={() => startEditing(item)}>Redigera</button>
                      <button onClick={() => handleDelete(item)}>Radera</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMenu;