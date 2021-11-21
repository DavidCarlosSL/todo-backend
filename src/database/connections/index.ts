import { ConnectionOptions } from "typeorm";

export const mysqlConnectionOptions = (): ConnectionOptions => {
    return {
        name: "pgsql",
        type: "postgres",
        host: process.env.APPLICATION_MYSQL_HOST,
        port: parseInt(process.env.APPLICATION_MYSQL_HOST_PORT ? process.env.APPLICATION_MYSQL_HOST_PORT : "3306"),
        username: process.env.APPLICATION_MYSQL_USER,
        password: process.env.APPLICATION_MYSQL_USER_PASSWORD,
        database: process.env.APPLICATION_MYSQL_DATABASE
    }
}