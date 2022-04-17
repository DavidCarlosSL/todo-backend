import Joi from 'joi';

import { IJoiInput } from '../../interfaces/joi/joi-input.interface';

import { JDefaultTaskIdSchema, JDefaultSchemaValidateOptions } from '../joi/joi-default.schema';

export const JTasksTaskGetParam: IJoiInput = {
    schema: Joi.object({
        ...JDefaultTaskIdSchema
    }),
    schemaValidateOptions: {
        ...JDefaultSchemaValidateOptions,
        convert: true
    }
}