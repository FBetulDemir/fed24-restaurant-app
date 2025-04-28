import { useState } from "react";
import "../styles/AdminDishForm.css";
import { dishSchema } from "./formValidation";

const AdminDishForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    ingredients: [],
    category: "",
    volume: "",
    baseQuantity: "",
    extraBitPrice: "",
  });
  const [ingredientInput, setIngredientInput] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
  const API_KEY = "isushi-menu";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientAdd = () => {
    if (ingredientInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  };

  const handleIngredientRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const dataToValidate = {
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      description: formData.description || "",
      ingredients: formData.ingredients.length > 0 ? formData.ingredients : [],
      category: formData.category,
      ...(formData.category === "drinks" && formData.volume
        ? { volume: parseFloat(formData.volume) }
        : {}),
      ...(["maki", "nigiri", "sashimi"].includes(formData.category) && formData.baseQuantity
        ? { baseQuantity: parseInt(formData.baseQuantity) }
        : {}),
      ...(["maki", "sashimi"].includes(formData.category) && formData.extraBitPrice
        ? { extraBitPrice: parseFloat(formData.extraBitPrice) }
        : {}),
    };

    const { error } = dishSchema.validate(dataToValidate, { abortEarly: false });
    if (error) {
      const fieldErrors = {};
      error.details.forEach((detail) => {
        fieldErrors[detail.path[0]] = detail.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    const dishData = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description || "",
      ingredients: formData.ingredients.length > 0 ? formData.ingredients : [],
      category: formData.category,
      ...(formData.category === "drinks" && formData.volume
        ? { volume: parseFloat(formData.volume) }
        : {}),
      ...(["maki", "nigiri", "sashimi"].includes(formData.category) && formData.baseQuantity
        ? { baseQuantity: parseInt(formData.baseQuantity) }
        : {}),
      ...(["maki", "sashimi"].includes(formData.category) && formData.extraBitPrice
        ? { extraBitPrice: parseFloat(formData.extraBitPrice) }
        : {}),
    };

    console.log("📤 Skickar menyobjekt till API:", dishData);

    try {
      const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
      const currentMenu = response.ok ? await response.json() : [];

      const updatedMenu = Array.isArray(currentMenu)
        ? [...currentMenu, dishData]
        : [dishData];

      const saveResponse = await fetch(`${API_URL}?method=save`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_KEY,
          value: updatedMenu,
        }),
      });

      if (saveResponse.ok) {
        setSuccessMessage("Menyobjektet har lagts till!");
        console.log("✅ Menyobjektet sparades framgångsrikt!");
        setFormData({
          name: "",
          price: "",
          description: "",
          ingredients: [],
          category: "",
          volume: "",
          baseQuantity: "",
          extraBitPrice: "",
        });
        setIngredientInput("");
      } else {
        setErrorMessage("Misslyckades med att spara menyobjektet.");
        console.error("❌ Misslyckades med att spara menyobjektet.");
      }
    } catch (err) {
      setErrorMessage("Ett fel uppstod: " + err.message);
      console.error("❌ Fel vid spara menyobjekt:", err);
    }
  };

  return (
    <div className="admin-dish-form">
      <h2>Lägg till menyobjekt</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Pris (kr):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Beskrivning (valfritt):</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredienser (valfritt):</label>
          <div className="ingredient-input">
            <input
              type="text"
              id="ingredientInput"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
            <button type="button" onClick={handleIngredientAdd}>
              Lägg till
            </button>
          </div>
          {formData.ingredients.length > 0 && (
            <ul className="ingredient-list">
              {formData.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleIngredientRemove(index)}
                  >
                    Ta bort
                  </button>
                </li>
              ))}
            </ul>
          )}
          {errors.ingredients && <p className="error">{errors.ingredients}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Välj kategori</option>
            <option value="drinks">Drycker</option>
            <option value="maki">Maki</option>
            <option value="nigiri">Nigiri</option>
            <option value="sashimi">Sashimi</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {formData.category === "drinks" && (
          <div className="form-group">
            <label htmlFor="volume">Volym (liter, valfritt):</label>
            <input
              type="number"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleInputChange}
            />
            {errors.volume && <p className="error">{errors.volume}</p>}
          </div>
        )}

        {["maki", "nigiri", "sashimi"].includes(formData.category) && (
          <div className="form-group">
            <label htmlFor="baseQuantity">Basantal (valfritt):</label>
            <input
              type="number"
              id="baseQuantity"
              name="baseQuantity"
              value={formData.baseQuantity}
              onChange={handleInputChange}
            />
            {errors.baseQuantity && <p className="error">{errors.baseQuantity}</p>}
          </div>
        )}

        {["maki", "sashimi"].includes(formData.category) && (
          <div className="form-group">
            <label htmlFor="extraBitPrice">Extra bit-pris (kr, valfritt):</label>
            <input
              type="number"
              id="extraBitPrice"
              name="extraBitPrice"
              value={formData.extraBitPrice}
              onChange={handleInputChange}
            />
            {errors.extraBitPrice && <p className="error">{errors.extraBitPrice}</p>}
          </div>
        )}

        <button type="submit" className="form-btn">
          Lägg till
        </button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default AdminDishForm;