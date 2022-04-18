import express, { Request, Response } from 'express';

import healthCheckRoutes from './healthcheck/healthcheck.route';
import userRoutes from './user/user.route';
import tasksRoutes from './tasks/tasks.route';
import tagsRoutes from './tags/tags.route';
import taskTagRoutes from './task_tag/task_tag.route';

const router = express.Router();

router.get("/", (req: Request, res: Response) => { res.status(200).send({message: "ToDo API Index"}); });

router.use("/healthcheck", healthCheckRoutes);
router.use("/user", userRoutes);
router.use("/tasks", tasksRoutes);
router.use("/tags", tagsRoutes);
router.use("/task-tag", taskTagRoutes);

export default router;