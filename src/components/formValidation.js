import Joi from "joi";

export const dishSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).required(),
  price: Joi.number().positive().required(),
  ingredients: Joi.array().items(Joi.string()).max(30).optional(),
  category: Joi.string()
    .valid("maki", "nigiri", "sashimi", "drinks")
    .required(),
  extraBitPrice: Joi.when("category", {
    is: Joi.string().valid("maki", "sashimi"),
    then: Joi.number().positive().required(),
    otherwise: Joi.any().forbidden(),
  }),
  volume: Joi.when("category", {
    is: "drinks",
    then: Joi.number().positive().required(), 
    otherwise: Joi.any().forbidden(),
  }),
});