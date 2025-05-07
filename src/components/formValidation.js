import Joi from 'joi';

export const dishSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).required().messages({
    'string.min': 'Namnet måste vara minst 2 tecken långt.',
    'any.required': 'Namnet är obligatoriskt.',
    'string.empty': 'Namnet är obligatoriskt.',
  }),
  description: Joi.string().allow('').optional().messages({
    'string.empty': '',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Priset måste vara ett nummer.',
    'number.positive': 'Priset måste vara ett positivt nummer.',
    'any.required': 'Priset är obligatoriskt.',
  }),
  ingredients: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Ingredienserna måste vara en lista.',
  }),
  category: Joi.string().valid("maki", "nigiri", "sashimi", "drinks").required().messages({
    'any.only': 'Kategorin måste vara en av följande: maki, nigiri, sashimi, drinks.',
    'any.required': 'Kategorin är obligatoriskt.',
    'string.empty': 'Kategorin är obligatoriskt.',
  }),
  extraBitPrice: Joi.when("category", {
    is: Joi.string().valid("maki", "sashimi"),
    then: Joi.number().positive().messages({
      'number.base': 'Priset för extra bit måste vara ett nummer.',
      'number.positive': 'Priset för extra bit måste vara ett positivt nummer.',
    }),
    otherwise: Joi.any().forbidden().messages({
      'any.unknown': 'Priset för extra bit är inte tillåtet för denna kategori.',
    }),
  }),
  volume: Joi.when("category", {
    is: "drinks",
    then: Joi.string().optional().messages({
      'string.base': 'Volymen måste vara en sträng.',
    }),
    otherwise: Joi.any().forbidden().messages({
      'any.unknown': 'Volymen är inte tillåtet för denna kategori.',
    }),
  }),
  baseQuantity: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Bas kvantitet måste vara ett nummer.',
    'number.integer': 'Bas kvantitet måste vara ett heltal.',
    'number.min': 'Bas kvantitet måste vara minst 1.',
  }),
});