const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const initRoutes = require('./entries/init');
const parser = require('./parser/main');
const socker = require('./socket');
var cors = require('cors')

const app = express();

// enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// use express json
app.use(express.json());

// enable logger
app.use(logger('dev'));

// enable routes
initRoutes(app);

// enable socket
const server = http.createServer(app);
socker.init(server);

// enable parser
// parser.start();              

// handle 404 errors

// handle different errors
const log = require('simple-node-logger').createSimpleFileLogger('project.log');

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node docs)
  log.setLevel('warn');
  log.info('error at ', game.I, ' accepted at ', new Date().toJSON(), " errors: ", err);
})

app.use((err, req, res, next) => {
  if (!err) {
    next();

    return;
  }

  res.status(500);
  res.send('500: Internal server error');
});



module.exports = server;
