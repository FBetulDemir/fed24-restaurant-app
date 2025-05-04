import Joi from 'joi';

export const dishSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).required().messages({
    'string.min': 'Namn måste vara minst 2 tecken långt.',
    'any.required': 'Namn är obligatoriskt.',
  }),
  description: Joi.string().min(5).optional().messages({
    'string.min': 'Beskrivning måste vara minst 5 tecken långt.',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Pris måste vara ett nummer.',
    'number.positive': 'Pris måste vara ett positivt nummer.',
    'any.required': 'Pris är obligatoriskt.',
  }),
  ingredients: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Ingredienser måste vara en lista.',
  }),
  category: Joi.string().valid("maki", "nigiri", "sashimi", "drinks").required().messages({
    'any.only': 'Kategori måste vara en av följande: maki, nigiri, sashimi, drinks.',
    'any.required': 'Kategori är obligatoriskt.',
  }),
  extraBitPrice: Joi.when("category", {
    is: Joi.string().valid("maki", "sashimi"),
    then: Joi.number().positive().optional().messages({
      'number.base': 'Pris för extra bit måste vara ett nummer.',
      'number.positive': 'Pris för extra bit måste vara ett positivt nummer.',
    }),
    otherwise: Joi.any().forbidden().messages({
      'any.unknown': 'Pris för extra bit är inte tillåtet för denna kategori.',
    }),
  }),
  volume: Joi.when("category", {
    is: "drinks",
    then: Joi.string().optional().messages({
      'string.base': 'Volym måste vara en sträng.',
    }),
    otherwise: Joi.any().forbidden().messages({
      'any.unknown': 'Volym är inte tillåtet för denna kategori.',
    }),
  }),
  baseQuantity: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Bas kvantitet måste vara ett nummer.',
    'number.integer': 'Bas kvantitet måste vara ett heltal.',
    'number.min': 'Bas kvantitet måste vara minst 1.',
  }),
});