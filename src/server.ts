import "reflect-metadata";

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { loadDatabasesConnections } from "./database";

const server = express();

async function loadServerUtils(): Promise<void> {
    server.use(helmet());
    server.use(cors());

    server.use(express.json());

    if(process.env.NODE_ENV == "development"){
        const dotenv = await import('dotenv');
        dotenv.config();
    }

    await loadDatabasesConnections();

    const routes = await import('./routes/index');
    server.use(routes.default);
}

loadServerUtils().then(() => {
    const serverPort = process.env.APPLICATION_PORT;
    if(serverPort != undefined)
        server.listen(serverPort, () => { console.log(`API is listening on port ${serverPort}`); });
    else{
        console.error("APPLICATION_PORT is undefined");
        process.exitCode = 1;
    }
}).catch((error) => { console.error("Something went wrong while starting application", error); });