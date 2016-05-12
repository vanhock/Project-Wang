'use strict';
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let Q = require('q');

mongoose.Promise = Q.Promise;

let path = require('path');
let connectDomain = require('connect-domain');

let app = express();

let config;
if (app.get('env') === 'development') {
  config = require('./config');
} else {
  config = require('./config-prod');
}

mongoose.connect(config.database);

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

app.use(connectDomain());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// api secret
app.set('olegSecret', config.token.secret);

app.use("/", express.static(path.join(__dirname, 'public')));

// start server
app.listen(config.port);
logger.info(`Oleg is running on port ${config.port}`);
