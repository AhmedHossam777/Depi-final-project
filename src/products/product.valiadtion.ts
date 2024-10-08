import Joi from 'joi';

export const productCreateValidation = Joi.object({
	title: Joi.string().required(),
	price: Joi.number().required(),
	description: Joi.string().required(),
	imageURL: Joi.string().required(),
});

export const productUpdateValidation = Joi.object({
	title: Joi.string().optional(),
	price: Joi.number().optional(),
	description: Joi.string().optional(),
	imageURL: Joi.string().optional(),
});
