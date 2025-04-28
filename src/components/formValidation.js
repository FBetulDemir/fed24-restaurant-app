import Joi from "joi";

export const dishSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Namn är obligatoriskt.",
    "string.min": "Namnet måste vara minst 2 tecken långt.",
    "any.required": "Namn är obligatoriskt.",
  }),
  description: Joi.string().min(5).required().messages({
    "string.empty": "Beskrivning är obligatoriskt.",
    "string.min": "Beskrivningen måste vara minst 5 tecken lång.",
    "any.required": "Beskrivning är obligatoriskt.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Pris är obligatoriskt.",
    "number.positive": "Pris måste vara ett positivt nummer.",
    "any.required": "Pris är obligatoriskt.",
  }),
  ingredients: Joi.array()
  .items(Joi.string().min(1).trim().required()) 
  .min(1)
  .max(30)
  .required()
  .messages({
    "array.base": "Ingredienser måste vara en lista.",
    "array.max": "Ingredienser får inte överstiga 30 stycken.",
    "string.base": "Varje ingrediens måste vara en textsträng.",
    "string.empty": "Ingrediens kan inte vara tom.",
    "any.required": "Ingredienser är obligatoriska.",
    "array.min": "Ingredienser är obligatoriskt.", 
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
      "number.base": "Pris för extra bit är obligatoriskt.",
      "number.positive": "Pris för extra bit är obligatoriskt.",
      "any.required": "Pris för extra bit är obligatoriskt för maki och sashimi.",
    }),
    otherwise: Joi.any()
      .forbidden()
      .messages({
        "any.unknown": "Pris för extra bit är inte tillåtet för denna kategori.",
      }),
  }),
  volume: Joi.when("category", {
    is: "drycker",
    then: Joi.string()
      .pattern(/^\d+(,\d+)?$/)
      .required()
      .custom((value, helpers) => {
        const numericValue = parseFloat(value.replace(",", "."));
        if (numericValue < 0.1 || numericValue > 10) {
          return helpers.error("string.outOfRange");
        }
        return value;
      })
      .messages({
        "string.base": "Volym är obligatoriskt för drycker.",
        "string.pattern.base": "Volym måste vara ett nummer med komma som decimaltecken (t.ex. 0,1 eller 1,25).",
        "string.outOfRange": "Volym måste vara mellan 0,1 och 10.",
        "any.required": "Volym är obligatoriskt för drycker.",
      }),
    otherwise: Joi.any()
      .forbidden()
      .messages({
        "any.unknown": "Volym är inte tillåtet för denna kategori.",
      }),
  }),
});