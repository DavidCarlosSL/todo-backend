import Joi from 'joi';

export const userAuthenticationInputSchema = Joi.object({
    userEmail: Joi.string().required().email().min(5).max(60),
    userPassword: Joi.string().required().min(5).max(40)
})