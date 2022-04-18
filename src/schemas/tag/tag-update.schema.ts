import Joi from "joi";

import { IJoiInput } from "../../interfaces/joi/joi-input.interface";

import { JDefaultAuthenticatedUserSchema, JDefaultSchemaValidateOptions, JDefaultTagIdSchema } from "../joi/joi-default.schema";

export const JTagsTagUpdateParam: IJoiInput = {
    schema: Joi.object({
        ...JDefaultTagIdSchema
    }),
    schemaValidateOptions: {
        ...JDefaultSchemaValidateOptions,
        convert: true
    }
}

export const JTagsTagUpdateBody: IJoiInput = {
    schema: Joi.object({
        ...JDefaultAuthenticatedUserSchema,
        tagName: Joi.string().required().min(1).max(30),
        tagColor: Joi.string().required().hex().length(6)
    }),
    schemaValidateOptions: JDefaultSchemaValidateOptions
}