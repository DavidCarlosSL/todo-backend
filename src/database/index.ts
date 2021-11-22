import { Connection, createConnections } from "typeorm";

import { pgsqlConnectionOptions } from "./connections";

export const createDatabasesConnections = (): Promise<Connection[]> => {
    return createConnections([pgsqlConnectionOptions()]);
}