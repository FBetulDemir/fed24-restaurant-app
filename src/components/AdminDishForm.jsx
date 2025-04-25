import { useState, useEffect } from "react";
import { dishSchema } from "./formValidation";
import "../styles/AdminDishForm.css";
import AdminStart from "./AdminStart";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const AdminDishForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    ingredients: "",
    extraBitPrice: "",
    volume: "",
  });

  const [menuList, setMenuList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDish = {
      id: crypto.randomUUID(),
      name: formData.name,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients
        ? formData.ingredients.split(",").map((s) => s.trim()).filter((s) => s)
        : [],
      category: formData.category,
      ...(formData.category === "maki" || formData.category === "sashimi"
        ? { extraBitPrice: parseFloat(formData.extraBitPrice) || 0 }
        : {}),
      ...(formData.category === "drinks"
        ? {
            volume: formData.volume ? parseFloat(formData.volume) : null, 
          }
        : {}),
    };

    const { error } = dishSchema.validate(newDish);
    if (error) {
      setError(error.message);
      setSuccess("");
      return;
    }

    const updatedMenu = [...menuList, newDish];

    console.log("Updated Menu:", updatedMenu);

    try {
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

      if (response.ok) {
        setMenuList(updatedMenu);
        setFormData({
          category: "",
          name: "",
          price: "",
          ingredients: "",
          extraBitPrice: "", 
        });
        setSuccess("Maträtten har lagts till!");
        setError("");
      } else {
        setError("Något gick fel vid sparande.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Nätverksfel.");
      setSuccess("");
    }
  };

  return (
    <div className="form-wrapper">
      <AdminStart />
      <div className="form-section">
        <h1>Lägg till en ny maträtt</h1>
        <form className="dish-form" onSubmit={handleSubmit}>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Välj kategori</option>
            <option value="maki">Maki</option>
            <option value="nigiri">Nigiri</option>
            <option value="sashimi">Sashimi</option>
            <option value="drinks">Drycker</option>
          </select>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Namn"
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Pris"
          />
          <input
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredienser (komma-separerat)"
          />
        
          {(formData.category === "maki" || formData.category === "sashimi") && (
            <input
              name="extraBitPrice"
              type="number"
              value={formData.extraBitPrice}
              onChange={handleChange}
              placeholder="Pris för extra bit"
            />
          )}
          
          {formData.category === "drinks" && (
            <input
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              placeholder="Volym (t.ex. 0.33)"
            />
          )}
          <button type="submit" className="form-btn">
            Lägg till
          </button>
        </form>
        {error && (
          <p style={{ color: "red" }} className="message-error">
            {error}
          </p>
        )}
        {success && (
          <p style={{ color: "green" }} className="message-success">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDishForm;