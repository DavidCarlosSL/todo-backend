import { Connection, createConnections } from "typeorm";

import { mysqlConnectionOptions } from "./connections";

export const createDatabasesConnections = (): Promise<Connection[]> => {
    return createConnections([mysqlConnectionOptions()]);
}