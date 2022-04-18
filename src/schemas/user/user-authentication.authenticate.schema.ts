import Joi from 'joi';

import { IJoiInput } from '../../interfaces/joi/joi-input.interface';

export const JUserAuthenticateInput: IJoiInput = {
    schema: Joi.object({
        userEmail: Joi.string().required().email().min(5).max(60),
        userPassword: Joi.string().required().min(6).max(40)
    }),
    schemaValidateOptions: {
        abortEarly: false
    }
}