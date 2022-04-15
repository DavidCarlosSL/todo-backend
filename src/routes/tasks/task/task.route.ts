import express from 'express';

import { verifyUserJwt } from '../../../middlewares/verify-user-jwt.middleware';
import { validateRequestBody } from '../../../middlewares/validate-request-body.middleware';
import { validateRequestParams } from '../../../middlewares/validate-request-params.middleware';

import { JTasksTaskInsertBody } from '../../../schemas/task/task-insert.schema';
import { JTasksTaskGetParam } from '../../../schemas/task/task-get.schema';
import { JTasksTaskDeleteParam } from '../../../schemas/task/task-delete.schema';
import { 
    JTasksTaskUpdateDateConclusionBody,
    JTasksTaskUpdateDateConclusionParam,
    JTasksTaskUpdateBody,
    JTasksTaskUpdateParam
} from '../../../schemas/task/task-update.schema';

import { taskController } from '../../../controllers/task/task.controller';

const router = express.Router();

router.post(
    "/insert", 
    verifyUserJwt(), 
    validateRequestBody(JTasksTaskInsertBody.schema, JTasksTaskInsertBody.schemaValidateOptions), 
    taskController.saveNewUserTask.bind(taskController)
);

router.get(
    "/get/:taskId", 
    verifyUserJwt(),
    validateRequestParams(JTasksTaskGetParam.schema, JTasksTaskGetParam.schemaValidateOptions),
    taskController.getUserTask.bind(taskController)
);

router.delete(
    "/delete/:taskId",
    verifyUserJwt(),
    validateRequestParams(JTasksTaskDeleteParam.schema, JTasksTaskDeleteParam.schemaValidateOptions),
    taskController.deleteUserTask.bind(taskController)
)

router.put(
    "/update/:taskId",
    verifyUserJwt(),
    validateRequestParams(JTasksTaskUpdateParam.schema, JTasksTaskUpdateParam.schemaValidateOptions),
    validateRequestBody(JTasksTaskUpdateBody.schema, JTasksTaskUpdateBody.schemaValidateOptions),
    taskController.updateUserTask.bind(taskController)
)

router.put(
    "/update/:taskId/date-conclusion",
    verifyUserJwt(),
    validateRequestParams(JTasksTaskUpdateDateConclusionParam.schema, JTasksTaskUpdateDateConclusionParam.schemaValidateOptions),
    validateRequestBody(JTasksTaskUpdateDateConclusionBody.schema, JTasksTaskUpdateDateConclusionBody.schemaValidateOptions),
    taskController.updateUserTaskDateConclusion.bind(taskController)
)

export default router;