
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');

const config = require("./config");
const mongoose = require('mongoose');

const app = new Koa();
const PORT = 9000;

app.use(bodyParser());
app.use(logger());
app.use(cors({origin: '*', exposeHeaders: '*'}));



const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

mongoose.connect(`mongodb+srv://${config.configDB.userName}:${config.configDB.password}@${config.configDB.host}/${config.configDB.name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.set('debug', true);


module.exports = server ;