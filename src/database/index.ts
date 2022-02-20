import { Connection, createConnection } from "typeorm";

import { pgsqlConnectionOptions } from "./connections/databasesConnectionsOptions";

async function createPgsqlDatabaseConnection(): Promise<Connection> { return createConnection(pgsqlConnectionOptions()); }

export async function loadDatabasesConnections(): Promise<void> {
    try{
        await createPgsqlDatabaseConnection();
        
    }catch(error){
        
    }
}