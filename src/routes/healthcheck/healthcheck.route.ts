import express from 'express';

import { healthCheckController } from '../../controllers/healthcheck/healthcheck.controller';

const router = express.Router();

router.get("/liveness", healthCheckController.getLiveness.bind(healthCheckController));
router.get("/readiness", healthCheckController.getReadiness.bind(healthCheckController));

export default router;