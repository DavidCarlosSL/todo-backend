import "reflect-metadata";

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { loadDatabasesConnections } from "./database";

import message from './utils/messages/index.json';

const app = express();

let serverPort: string | undefined;

async function loadServerUtils(): Promise<void> {
    app.use(helmet());
    app.use(cors());

    app.use(express.json());

    if(process.env.NODE_ENV == "development"){
        const dotenv = await import('dotenv');
        dotenv.config();
    }

    if(process.env.APPLICATION_PORT == undefined)
        throw new Error(message.application_port_undefined);
        
    serverPort = process.env.APPLICATION_PORT;

    await loadDatabasesConnections();

    const routes = await import('./routes/index');
    app.use(routes.default);
}

loadServerUtils().then(() => { 
    app.listen(serverPort, () => { console.log(`${message.api_listening_on_port} ${serverPort}`); });
}).catch((error) => { 
    console.error(message.something_wrong_starting_application, error); 
});