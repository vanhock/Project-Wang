'use strict';
let cluster = require('cluster');
let os = require('os');

if (cluster.isMaster) {
  let workersCount = os.cpus().length;

  for (let i = 0; i < workersCount; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {

  });

  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
  });
} else {
  require('./server');
}
