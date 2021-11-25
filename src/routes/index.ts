import express, { Request, Response } from 'express';

import healthCheckRoutes from './healthcheck/healthcheck.routes';

const router = express.Router();

router.get("/", (req: Request, res: Response) => { res.status(200).send({message: "ToDo API Index"}); });

router.use("/healthcheck", healthCheckRoutes);

export default router;