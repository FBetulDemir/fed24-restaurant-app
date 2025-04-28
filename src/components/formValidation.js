import Joi from "joi";

export const dishSchema = Joi.object({
  id: Joi.string().optional(), 
  name: Joi.string().min(2).required().messages({
    "string.empty": "Namn är obligatoriskt.",
    "string.min": "Namnet måste vara minst 2 tecken långt.",
    "any.required": "Namn är obligatoriskt.",
  }),
  description: Joi.string().allow("").optional().messages({
    "string.base": "Beskrivningen måste vara en textsträng.",
    "any.invalid": "Beskrivningen är ogiltig.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Pris måste vara ett nummer.",
    "number.positive": "Priset måste vara ett positivt nummer.",
    "any.required": "Pris är obligatoriskt.",
  }),
  ingredients: Joi.array()
    .items(Joi.string().min(1).trim())
    .max(30)
    .optional()
    .messages({
      "array.base": "Ingredienser måste vara en lista.",
      "array.max": "Ingredienser får inte överstiga 30 stycken.",
      "string.base": "Varje ingrediens måste vara en textsträng.",
      "string.empty": "Ingrediens kan inte vara tom.",
    }),
  category: Joi.string()
    .valid("maki", "nigiri", "sashimi", "drinks")
    .required()
    .messages({
      "string.empty": "Kategori är obligatorisk.",
      "any.only": "Ogiltig kategori. Välj mellan maki, nigiri, sashimi eller drinks.",
      "any.required": "Kategori är obligatorisk.",
    }),
  extraBitPrice: Joi.when("category", {
    is: Joi.string().valid("maki", "sashimi"),
    then: Joi.number().positive().required().messages({
      "number.base": "Pris för extra bit måste vara ett nummer.",
      "number.positive": "Pris för extra bit måste vara ett positivt nummer.",
      "any.required": "Pris för extra bit är obligatoriskt för maki och sashimi.",
    }),
    otherwise: Joi.any().forbidden().messages({
      "any.unknown": "Pris för extra bit är inte tillåtet för denna kategori.",
    }),
  }),
  volume: Joi.when("category", {
    is: Joi.string().valid("drinks"),
    then: Joi.string()
      .required()
      .custom((value, helpers) => {
        let normalized = value.replace(".", ",");
        if (!/^\d+(,\d+)?$/.test(normalized)) {
          return helpers.error("string.pattern.base");
        }
        const numericValue = parseFloat(normalized.replace(",", "."));
        if (numericValue < 0.1 || numericValue > 10) {
          return helpers.error("string.outOfRange");
        }
        return normalized;
      })
      .messages({
        "string.base": "Volym måste vara en textsträng.",
        "string.pattern.base": "Volym måste vara ett nummer med komma som decimaltecken (t.ex. 0,5 eller 1,25).",
        "string.outOfRange": "Volym måste vara mellan 0,1 och 10 liter.",
        "any.required": "Volym är obligatoriskt för drycker.",
      }),
    otherwise: Joi.any().forbidden().messages({
      "any.unknown": "Volym är inte tillåtet för denna kategori.",
    }),
  }),
});