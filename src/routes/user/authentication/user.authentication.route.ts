import express from 'express';

import { userController } from '../../../controllers/user/user.controller';

import { userAuthenticationInputSchema } from '../../../schemas/user/user-authentication.schema';

import { validateRequestBody } from '../../../middlewares/validate-request-body.middleware';

const router = express.Router();

router.post("/authenticate", validateRequestBody(userAuthenticationInputSchema, {abortEarly: false}), userController.authenticateUser.bind(userController));

export default router;