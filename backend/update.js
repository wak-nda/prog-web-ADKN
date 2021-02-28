const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');

const config = require("./config");
const mongoose = require('mongoose');
const loadFileCSV = require('./src/server/DataRegistration/sdk/loadCVSFile');
const loadFileCSVTauxIncidence = require('./src/server/TauxDincidence/sdk/loadCSVTauxIncidence');

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

mongoose.connect(`mongodb+srv://${config.configDB.userName}:${config.configDB.password}@${config.configDB.host}/${config.configDB.name}?retryWrites=true&w=majority`, {poolSize: 10, bufferMaxEntries: 0, reconnectTries: 5000, useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('debug', true);

(async () => {
    try {
        console.log(`Updating`);
        const results = await loadFileCSV(filePath);
        const resultsTauxIncidence = await loadFileCSVTauxIncidence.loadFile(filePath);
        //console.table(results)
    } catch (e) {
        console.error(e);
    }
})();


// start();
