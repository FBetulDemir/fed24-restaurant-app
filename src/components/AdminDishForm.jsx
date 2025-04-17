import { useMenuStore } from "../stores/menuStore"
import { dishSchema } from "./formValidation"
import { useState } from "react"
import "../styles/AdminDishForm.css"
import { useParams } from "react-router"

const AdminDishForm = () => {
  const addItem = useMenuStore((state) => state.addItem)

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    ingredients: "",
    image: ""
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validatedData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(",").map((s) => s.trim())
    }

    const { error } = dishSchema.validate(validatedData)
    if (error) {
      setError(error.message)
      return
    }

    addItem(validatedData)
    setFormData({ id: "", name: "", description: "", price: "", ingredients: "", image: "" })
    setError("")
  }

  return (
    <form className="dish-form" onSubmit={handleSubmit}>
      <input name="id" value={formData.id} onChange={handleChange} placeholder="ID" />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Namn" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Beskrivning" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Pris" />
      <input name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredienser (komma-separerat)" />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="Bild URL" />
      <button type="submit">Lägg till</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default AdminDishForm
