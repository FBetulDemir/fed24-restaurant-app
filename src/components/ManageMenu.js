
import { useEffect, useState } from "react";
import { getCurrentMenu, editMenuItem, deleteMenuItem } from "../data/uploadMenu";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});

  // Fetch menu on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const currentMenu = await getCurrentMenu();
        setMenu(currentMenu);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu.");
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Handle edit form submission
  const handleEdit = async (originalItem) => {
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
    } else {
      setError("Failed to update item.");
    }
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      const success = await deleteMenuItem(item);
      if (success) {
        setMenu((prev) =>
          prev.filter(
            (i) => !(i.name === item.name && i.category === item.category)
          )
        );
      } else {
        setError("Failed to delete item.");
      }
    }
  };

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item);
    setUpdatedItem({ ...item });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Manage Menu</h2>
      {menu.length === 0 ? (
        <p>No items in the menu.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
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
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={updatedItem.price || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={updatedItem.description || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(item)}>Save</button>
                      <button onClick={() => setEditingItem(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={() => startEditing(item)}>Edit</button>
                      <button onClick={() => handleDelete(item)}>Delete</button>
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