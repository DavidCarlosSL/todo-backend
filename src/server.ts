import "reflect-metadata";

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes/index';

import { createDatabasesConnections } from "./database";

const server = express();

const loadServerUtils = async (): Promise<void> => {
    server.use(helmet());
    server.use(cors());

    server.use(express.json());

    server.use(routes);
    
    if(process.env.NODE_ENV == "development"){
        const dotenv = await import('dotenv');
        dotenv.config();
    }

    await createDatabasesConnections();
}

loadServerUtils().then(() => {
    const serverPort = process.env.APPLICATION_PORT;
    if(serverPort != undefined)
        server.listen(process.env.APPLICATION_PORT, () => { console.log(`API is listening on port ${process.env.APPLICATION_PORT}`); });
    else{
        console.error("APPLICATION_PORT is undefined");
        process.exitCode = 1;
    }
}).catch((error) => {
    console.error("Something went wrong while starting application", error);
})