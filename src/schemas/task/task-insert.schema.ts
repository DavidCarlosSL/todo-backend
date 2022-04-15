import Joi from 'joi';

import { IJoiInput } from '../../interfaces/joi/joi-input.interface';

import { JDefaultAuthenticatedUserSchema, JDefaultSchemaValidateOptions } from '../joi/joi-default.schema';

import { TaskStatus } from '../../entities/task/task.entity';

export const JTasksTaskInsertBody: IJoiInput = {
    schema: Joi.object({
        ...JDefaultAuthenticatedUserSchema,
        taskTitle: Joi.string().required().min(1).max(60),
        taskDescription: Joi.string().required().min(1).max(300),
        taskStatus: Joi.string().required().min(7).max(9).valid(TaskStatus.concluded, TaskStatus.canceled, TaskStatus.ongoing, TaskStatus.standby)
    }),
    schemaValidateOptions: JDefaultSchemaValidateOptions
}