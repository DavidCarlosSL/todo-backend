import { ConnectionOptions } from "typeorm";

export const pgsqlConnectionOptions = (): ConnectionOptions => {
    return {
        name: "pgsql",
        type: "postgres",
        host: process.env.APPLICATION_PGSQL_HOST,
        port: parseInt(process.env.APPLICATION_PGSQL_HOST_PORT ? process.env.APPLICATION_PGSQL_HOST_PORT : "3306"),
        username: process.env.APPLICATION_PGSQL_USER,
        password: process.env.APPLICATION_PGSQL_USER_PASSWORD,
        database: process.env.APPLICATION_PGSQL_DATABASE
    }
}