import Joi from "joi";

export interface IJoiInput {
    schema: Joi.ObjectSchema,
    schemaValidateOptions: Joi.AsyncValidationOptions
}