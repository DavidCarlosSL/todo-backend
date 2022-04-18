import Joi from "joi";

import { IJoiInput } from "../../interfaces/joi/joi-input.interface";

import { JDefaultAuthenticatedUserSchema, JDefaultSchemaValidateOptions, JDefaultTagIdSchema, JDefaultTaskIdSchema } from "../joi/joi-default.schema";

export const JTaskTagInsertBody: IJoiInput = {
    schema: Joi.object({
        ...JDefaultAuthenticatedUserSchema,
        ...JDefaultTaskIdSchema,
        tags: Joi.array().items(Joi.object(JDefaultTagIdSchema).required()).required()
    }),
    schemaValidateOptions: JDefaultSchemaValidateOptions
}