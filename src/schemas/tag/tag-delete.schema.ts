import Joi from "joi";

import { IJoiInput } from "../../interfaces/joi/joi-input.interface";

import { JDefaultSchemaValidateOptions, JDefaultTagIdSchema } from "../joi/joi-default.schema";

export const JTagsTagDeleteParam: IJoiInput = {
    schema: Joi.object({
        ...JDefaultTagIdSchema
    }),
    schemaValidateOptions: {
        ...JDefaultSchemaValidateOptions,
        convert: true
    }
}