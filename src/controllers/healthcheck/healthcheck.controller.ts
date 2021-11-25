import { Request, Response } from "express";

import { HealthCheckService, IHealthCheckService } from "../../services/healthcheck/healthcheck.service";

class HealthCheckController {
    constructor(private healthCheckService: IHealthCheckService) {}

    public async getLiveness(req: Request, res: Response): Promise<void> {
        try{
            res.status(200).send({message: "Liveness OK. API is up and running"});
        }catch(error){
            console.error(error);
            
            res.status(500).send({message: "Something went wrong. Try again later"});
        }
    }

    public async getReadiness(req: Request, res: Response): Promise<void> {
        try{
            let readinessWarnings = [];

            const testPgsqlDatabaseConnectionResponse = await this.healthCheckService.testPgsqlDatabaseConnection();
            if(testPgsqlDatabaseConnectionResponse == false)
                readinessWarnings.push({pgsqlConnection: testPgsqlDatabaseConnectionResponse});

            res.status(200).send({message: "Readiness OK", readinessWarnings: readinessWarnings});
        }catch(error){
            console.error(error);

            res.status(500).send({message: "Something went wrong. Try again later"});
        }
    }
}

export const healthCheckController = new HealthCheckController(new HealthCheckService());