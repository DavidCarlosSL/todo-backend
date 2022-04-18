import express from 'express';

import { verifyUserJwt } from '../../middlewares/verify-user-jwt.middleware';
import { validateRequestBody } from '../../middlewares/validate-request-body.middleware';

import { taskTagController } from '../../controllers/task_tag/task_tag.controller';

import { JTaskTagInsertBody } from '../../schemas/task_tag/task_tag-insert.schema';
import { JTaskTagDeleteBody } from '../../schemas/task_tag/task_tag-delete.schema';

const router = express.Router();

router.post(
    "/insert",
    verifyUserJwt(),
    validateRequestBody(JTaskTagInsertBody.schema, JTaskTagInsertBody.schemaValidateOptions),
    taskTagController.saveNewTaskTag.bind(taskTagController)
);

router.delete(
    "/delete",
    verifyUserJwt(),
    validateRequestBody(JTaskTagDeleteBody.schema, JTaskTagDeleteBody.schemaValidateOptions),
    taskTagController.deleteTaskTag.bind(taskTagController)
);

export default router;