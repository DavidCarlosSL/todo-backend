import { Connection, createConnection } from "typeorm";

import { pgsqlConnectionOptions } from "./connections/databasesConnectionsOptions";

async function createPgsqlDatabaseConnection(): Promise<Connection> { return createConnection(pgsqlConnectionOptions()); }

export async function loadDatabasesConnections(): Promise<boolean> {
    let sucessfullyLoaded: boolean = false;
    try{
        await Promise.all([createPgsqlDatabaseConnection()]);
        
        sucessfullyLoaded = true;
    }catch{
        sucessfullyLoaded = false;
    }finally{
        return sucessfullyLoaded;
    }
}