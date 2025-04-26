import { ConnectionOptions } from "typeorm";

import { pgsqlConnectionEntities } from "../../entities";

export function pgsqlConnectionOptions(): ConnectionOptions {
    return {
        name: "pgsql",
        type: "postgres",
        host: process.env.APPLICATION_PGSQL_HOST,
        port: parseInt(process.env.APPLICATION_PGSQL_HOST_PORT ? process.env.APPLICATION_PGSQL_HOST_PORT : "5432"),
        username: process.env.APPLICATION_PGSQL_USER,
        password: process.env.APPLICATION_PGSQL_USER_PASSWORD,
        database: process.env.APPLICATION_PGSQL_DATABASE,
        entities: pgsqlConnectionEntities,
        logging: process.env.NODE_ENV == 'development' ? "all" : false,
        logger: "advanced-console",
        ssl: { rejectUnauthorized: false }
    }
}