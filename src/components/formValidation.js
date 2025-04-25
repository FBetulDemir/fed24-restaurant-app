import Joi from "joi";

export const dishSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "ID är obligatoriskt.",
    "any.required": "ID är obligatoriskt.",
  }),
  name: Joi.string().min(2).required().messages({
    "string.empty": "Namn är obligatoriskt.",
    "string.min": "Namnet måste vara minst 2 tecken långt.",
    "any.required": "Namn är obligatoriskt.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Pris måste vara ett nummer.",
    "number.positive": "Pris måste vara ett positivt nummer.",
    "any.required": "Pris är obligatoriskt.",
  }),
  ingredients: Joi.array()
    .items(Joi.string())
    .max(30)
    .optional()
    .messages({
      "array.base": "Ingredienser måste vara en lista.",
      "array.max": "Ingredienser får inte överstiga 30 stycken.",
      "string.base": "Varje ingrediens måste vara en textsträng.",
    }),
  category: Joi.string()
    .valid("maki", "nigiri", "sashimi", "drinks")
    .required()
    .messages({
      "string.empty": "Kategori är obligatorisk.",
      "any.only": "Ogiltig kategori. Välj mellan maki, nigiri, sashimi eller drycker.",
      "any.required": "Kategori är obligatorisk.",
    }),
  extraBitPrice: Joi.when("category", {
    is: Joi.string().valid("maki", "sashimi"),
    then: Joi.number().positive().required().messages({
      "number.base": "Pris för extra bit måste vara ett nummer.",
      "number.positive": "Pris för extra bit måste vara ett positivt nummer.",
      "any.required": "Pris för extra bit är obligatoriskt för maki och sashimi.",
    }),
    otherwise: Joi.any()
      .forbidden()
      .messages({
        "any.unknown": "Pris för extra bit är inte tillåtet för denna kategori.",
      }),
  }),
  volume: Joi.when("category", {
    is: "drinks",
    then: Joi.number().positive().required().messages({
      "number.base": "Volym måste vara ett nummer.",
      "number.positive": "Volym måste vara ett positivt nummer.",
      "any.required": "Volym är obligatoriskt för drycker.",
    }),
    otherwise: Joi.any()
      .forbidden()
      .messages({
        "any.unknown": "Volym är inte tillåtet för denna kategori.",
      }),
  }),
});