const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');

const config = require("./config");
const mongoose = require('mongoose');


const dataFromHospital = require('./src/server/DataRegistration/routes/DataFromHospital');
const usersRouter = require('./src/server/CustomerFinder/routes/UserFinder');
const mailingRouter = require('./src/server/EmailSending/routes/EmailSending');


const app = new Koa();
const PORT = 5000;
const filePath = "https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7";
app.use(cors({origin: '*', exposeHeaders: '*'}));
app.use(bodyParser());
app.use(logger());
app.use(dataFromHospital.routes());
app.use(usersRouter.routes());
app.use(usersRouter.routes());
app.use(mailingRouter.routes());

const server = app.listen(PORT, () => {
    // loadFileCSV(filePath);
    console.log(`Server listening on port: ${PORT}`);

});

mongoose.connect(`mongodb+srv://${config.configDB.userName}:${config.configDB.password}@${config.configDB.host}/${config.configDB.name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.set('debug', true);


module.exports = server ;

