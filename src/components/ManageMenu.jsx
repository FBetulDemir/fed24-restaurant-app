import { useEffect, useState, useContext } from "react";
import { editMenuItem, deleteMenuItem } from "../data/uploadMenu";
import MenuContext from "../ payoffs/MenuContext";
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
    setMenu(allMenuItems);
    setLoading(false);
  }, [menuData]);

  // Validera formulärdata
  const validateForm = (item) => {
    const { error } = dishSchema.validate(item, { abortEarly: false });
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

    const success = await editMenuItem(originalItem, updatedItem);
    if (success) {
      setMenu((prev) =>
        prev.map((item) =>
          item.name === originalItem.name && item.category === originalItem.category
            ? { ...updatedItem, category: originalItem.category }
            : item
        )
      );
      setEditingItem(null);
      setUpdatedItem({});
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
        refreshMenu(); // Uppdatera menyn i gränssnittet
      } else {
        setError("Misslyckades med att radera objektet.");
      }
    }
  };

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item);
    setUpdatedItem({ ...item });
    setValidationErrors({});
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
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