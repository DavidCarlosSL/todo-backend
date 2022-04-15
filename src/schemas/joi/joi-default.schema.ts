import Joi from "joi";

export const JDefaultSchemaValidateOptions: Joi.AsyncValidationOptions = {
    abortEarly: false
}

export const JDefaultAuthenticatedUserSchema: Joi.PartialSchemaMap = {
    userJwt: Joi.required()
}

export const JDefaultTaskIdSchema: Joi.PartialSchemaMap = {
    taskId: Joi.number().integer().greater(0).less(1000000000).required()
}