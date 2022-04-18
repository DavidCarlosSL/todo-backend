import Joi from 'joi';

import { IJoiInput } from '../../interfaces/joi/joi-input.interface';

export const JUserEnrollInput: IJoiInput = {
    schema: Joi.object({
        userName: Joi.string().required().min(3).max(50),
        userEmail: Joi.string().required().email().min(5).max(60),
        userPassword: Joi.string().required().min(6).max(40)
    }),
    schemaValidateOptions: {
        abortEarly: false
    }
}