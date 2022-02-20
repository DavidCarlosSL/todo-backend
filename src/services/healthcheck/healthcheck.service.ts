import { Connection, getConnection } from "typeorm";

export interface IHealthCheckService {
    testPgsqlDatabaseConnection(): Promise<boolean>
}

export class HealthCheckService implements IHealthCheckService {
    private pgsqlConnection: Connection;
    
    constructor(){ this.pgsqlConnection = getConnection("pgsql"); }

    public async testPgsqlDatabaseConnection(): Promise<boolean> {
        try{
            await this.pgsqlConnection.query("SELECT 1 + 1;");

            return true;
        }catch{

            return false;
        }
    }
}