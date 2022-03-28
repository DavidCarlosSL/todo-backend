import { Request, Response } from "express";

import { HealthCheckService, IHealthCheckService } from "../../services/healthcheck/healthcheck.service";

import message from '../../utils/messages/index.json';
import messageHealthCheck from '../../utils/messages/healthcheck/healthcheck.messages.json';

class HealthCheckController {
    constructor(private healthCheckService: IHealthCheckService) {}

    public async getLiveness(req: Request, res: Response): Promise<void> {
        try{
            res.status(200).send({message: messageHealthCheck.liveness_ok});
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }

    public async getReadiness(req: Request, res: Response): Promise<void> {
        try{
            const readinessWarnings = [];

            const testPgsqlDatabaseConnectionResponse = await this.healthCheckService.testPgsqlDatabaseConnection();
            if(testPgsqlDatabaseConnectionResponse == false)
                readinessWarnings.push({pgsqlConnection: testPgsqlDatabaseConnectionResponse});

            res.status(200).send({message: messageHealthCheck.readiness_ok, readinessWarnings: readinessWarnings});
        }catch{
            res.status(500).send({message: message.error.something_wrong_try_again_later});
        }
    }
}

export const healthCheckController = new HealthCheckController(new HealthCheckService());