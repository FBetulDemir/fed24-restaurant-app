import Joi from "joi"





export const dishSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(2).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().positive().required(),
    ingredients: Joi.array().items(Joi.string()).min(1).required(),
    image: Joi.string().uri().optional()
})