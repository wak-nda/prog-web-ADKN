import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import logger from 'koa-logger';

import {configDB} from "./config.js";
import mongoose from 'mongoose';
import {loadFileCSV} from './src/server/DataRegistration/sdk/loadCVSFile.js '

const app = new Koa();
const PORT = 9000;
const filePath = "https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7";

// app.use(bodyParser());
// app.use(logger());
// app.use(cors({origin: '*', exposeHeaders: '*'}));

// (async () => {
//     try {
//         await mongoose.connect(`mongodb+srv://${configDB.userName}:${configDB.password}@${configDB.host}/${configDB.name}?retryWrites=true&w=majority`, {
//             useNewUrlParser: true,
//             useCreateIndex: true
//         });
//         mongoose.set('debug', true);
//
//     } catch (e) {
//     }
// })();

mongoose.connect(`mongodb+srv://${configDB.userName}:${configDB.password}@${configDB.host}/${configDB.name}?retryWrites=true&w=majority`, {poolSize: 10, bufferMaxEntries: 0, reconnectTries: 5000, useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('debug', true);

(async () => {
    try {
        console.log(`Updating`);
        const results = await loadFileCSV(filePath);
        //console.table(results)
    } catch (e) {
        console.error(e);
    }
})();


// start();
