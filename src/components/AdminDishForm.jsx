import { useState, useEffect, useContext } from "react";
import { dishSchema } from "./formValidation";
import "../styles/AdminDishForm.css";
import AdminStart from "./AdminStart";
import MenuContext from "./MenuContext";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const AdminDishForm = () => {
  const { refreshMenu } = useContext(MenuContext);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    ingredients: "",
    extraBitPrice: "",
    volume: "",
    description: "",
  });

  const [menuList, setMenuList] = useState([]);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  // Optional migration script to fix existing "drycker" items
  useEffect(() => {
    const migrateDryckerToDrinks = async () => {
      const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const updatedData = data.map((item) =>
          item.category === "drycker" ? { ...item, category: "drinks" } : item
        );
        await fetch(`${API_URL}?method=save`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: API_KEY,
            value: updatedData,
          }),
        });
        console.log("Migrated drycker to drinks");
      }
    };
    // Uncomment to run migration once
    // migrateDryckerToDrinks();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}?method=load&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMenuList(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load menu", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let normalizedValue = value;
    if (name === "volume") {
      // Normalize: replace period with comma, remove invalid characters
      normalizedValue = value.replace(".", ",").replace(/[^0-9,]/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: normalizedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    const newDish = {
      id: crypto.randomUUID(),
      name: formData.name,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients
        ? formData.ingredients.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
        : [],
      category: formData.category,
      description: formData.description || "",
      ...(formData.category === "maki" || formData.category === "sashimi"
        ? { extraBitPrice: parseFloat(formData.extraBitPrice) || 0 }
        : {}),
      ...(formData.category === "drinks"
        ? {
            volume: formData.volume && /^\d+(,\d+)?$/.test(formData.volume)
              ? formData.volume
              : null,
          }
        : {}),
    };

    const { error } = dishSchema.validate(newDish, { abortEarly: false });
    if (error) {
      const fieldErrors = {};
      error.details.forEach((detail) => {
        const field = detail.path[0];
        fieldErrors[field] = detail.message;
      });
      setError(fieldErrors);
      setSuccess("");
      console.log("Validation errors:", fieldErrors);
      return;
    }

    const updatedMenu = [...menuList, newDish];
    console.log("Updated Menu:", updatedMenu);

    try {
      console.log("Sending data to API:", JSON.stringify({
        key: API_KEY,
        value: updatedMenu,
      }));
      const response = await fetch(`${API_URL}?method=save`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_KEY,
          value: updatedMenu,
        }),
      });

      console.log("API response status:", response.status);
      if (response.ok) {
        setMenuList(updatedMenu);
        setFormData({
          category: "",
          name: "",
          price: "",
          ingredients: "",
          extraBitPrice: "",
          volume: "",
          description: "",
        });
        setSuccess("Maträtten har lagts till!");
        setError({});
        refreshMenu();
      } else {
        const errorText = await response.text();
        console.error("API error:", errorText);
        setError({ api: "Något gick fel vid sparande: " + errorText });
        setSuccess("");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError({ api: "Nätverksfel: Kunde inte ansluta till servern. Försök igen senare." });
      setSuccess("");
    }
  };

  return (
    <div className="form-wrapper">
      <AdminStart />
      <div className="form-section">
        <h1>Lägg till en ny maträtt</h1>
        <form className="dish-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={error.category ? "input-error" : ""}
            >
              <option value="">Välj kategori</option>
              <option value="maki">Maki</option>
              <option value="nigiri">Nigiri</option>
              <option value="sashimi">Sashimi</option>
              <option value="drinks">Drycker</option>
            </select>
            {error.category && <p className="error-admin">{error.category}</p>}
          </div>

          <div className="form-field">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Namn"
              className={error.name ? "input-error" : ""}
            />
            {error.name && <p className="error-admin">{error.name}</p>}
          </div>

          <div className="form-field">
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Beskrivning"
              className={error.description ? "input-error" : ""}
            />
            {error.description && <p className="error-admin">{error.description}</p>}
          </div>

          <div className="form-field">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Pris"
              className={error.price ? "input-error" : ""}
            />
            {error.price && <p className="error-admin">{error.price}</p>}
          </div>

          <div className="form-field">
            <input
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Ingredienser (komma-separerat)"
              className={error.ingredients ? "input-error" : ""}
            />
            {error.ingredients && <p className="error-admin">{error.ingredients}</p>}
          </div>

          {(formData.category === "maki" || formData.category === "sashimi") && (
            <div className="form-field">
              <input
                name="extraBitPrice"
                type="number"
                value={formData.extraBitPrice}
                onChange={handleChange}
                placeholder="Pris för extra bit"
                className={error.extraBitPrice ? "input-error" : ""}
              />
              {error.extraBitPrice && <p className="error-admin">{error.extraBitPrice}</p>}
            </div>
          )}

          {formData.category === "drinks" && (
            <div className="form-field">
              <input
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                placeholder="Volym (t.ex. 0,5)"
                className={error.volume ? "input-error" : ""}
              />
              {error.volume && <p className="error-admin">{error.volume}</p>}
            </div>
          )}

          <button type="submit" className="form-btn">
            Lägg till
          </button>
        </form>

        {success && (
          <p style={{ color: "green" }} className="message-success">
            {success}
          </p>
        )}
        {Object.keys(error).length > 0 && (
          <div className="error-admin">
            <p>Fel vid validering:</p>
            <ul>
              {Object.entries(error).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDishForm;