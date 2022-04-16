import express from 'express';

import { verifyUserJwt } from '../../middlewares/verify-user-jwt.middleware';

import { taskController } from '../../controllers/task/task.controller';

import taskRoute from './task/task.route';

const router = express.Router();

router.get("/get", verifyUserJwt(), taskController.getTasks.bind(taskController));

router.use("/task", taskRoute)

export default router;