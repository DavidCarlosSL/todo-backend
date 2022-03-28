import express from 'express';

import { userController } from '../../../controllers/user/user.controller';

import { JUserAuthenticateInput } from '../../../schemas/user/user-authentication.authenticate.schema';
import { JUserEnrollInput } from '../../../schemas/user/user-authentication.enroll.schema';

import { validateRequestBody } from '../../../middlewares/validate-request-body.middleware';

const router = express.Router();

router.post("/authenticate", validateRequestBody(JUserAuthenticateInput.schema, JUserAuthenticateInput.schemaValidateOptions), userController.authenticateUser.bind(userController));
router.post("/enroll", validateRequestBody(JUserEnrollInput.schema, JUserEnrollInput.schemaValidateOptions), userController.enrollUser.bind(userController));

export default router;