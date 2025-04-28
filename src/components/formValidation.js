import Joi from "joi";

export const dishSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Namn är obligatoriskt",
    "string.min": "Namnet måste vara minst 3 tecken långt",
    "string.max": "Namnet får inte vara längre än 50 tecken",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Pris måste vara ett nummer",
    "number.min": "Priset kan inte vara negativt",
    "any.required": "Pris är obligatoriskt",
  }),
  description: Joi.string().allow("").optional().messages({
    "string.base": "Beskrivning måste vara en text",
  }),
  ingredients: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Ingredienser måste vara en lista",
    "string.base": "Varje ingrediens måste vara en text",
  }),
  category: Joi.string()
    .valid("drinks", "maki", "nigiri", "sashimi")
    .required()
    .messages({
      "any.only": "Kategori måste vara drinks, maki, nigiri eller sashimi",
      "any.required": "Kategori är obligatoriskt",
    }),
  volume: Joi.number()
    .min(0)
    .when("category", {
      is: "drinks",
      then: Joi.number().min(0).optional(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": "Volym måste vara ett nummer",
      "number.min": "Volymen kan inte vara negativ",
      "any.unknown": "Volym är inte tillåtet för denna kategori",
    }),
  baseQuantity: Joi.number()
    .min(1)
    .when("category", {
      is: Joi.string().valid("maki", "nigiri", "sashimi"),
      then: Joi.number().min(1).optional(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": "Basantal måste vara ett nummer",
      "number.min": "Basantalet måste vara minst 1",
      "any.unknown": "Basantal är inte tillåtet för denna kategori",
    }),
  extraBitPrice: Joi.number()
    .min(0)
    .when("category", {
      is: Joi.string().valid("maki", "sashimi"),
      then: Joi.number().min(0).optional(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": "Extra bit-pris måste vara ett nummer",
      "number.min": "Extra bit-priset kan inte vara negativt",
      "any.unknown": "Extra bit-pris är inte tillåtet för denna kategori",
    }),
});