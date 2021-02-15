import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser  from 'koa-bodyparser';

import logger from 'koa-logger';

import {configDB} from "./config.js";
import mongoose from 'mongoose';
import {loadFileCSV} from './src/server/DataRegistration/sdk/loadCVSFile.js '

const app = new Koa();
const PORT = 9000;
const filePath = "https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7";

app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));




const server = app.listen(PORT, () => {
    loadFileCSV(filePath);
    console.log(`Server listening on port: ${PORT}`);

});

mongoose.connect(`mongodb+srv://${configDB.userName}:${configDB.password}@${configDB.host}/${configDB.name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.set('debug', true);


export const serverApp = server  ;