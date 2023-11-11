const http = require('http')
const express = require('express')

const config = require('./config');
require('./connections');
const storageHandler = require('./lib');
async function initServer(){
  const app = express();
  const server = http.createServer(app);
  server.listen(config.getPort(), () => {
    console.info('Server listening on http://localhost:%s', config.getPort())
  });
};

initServer().catch(error => {
  console.error(error);
  process.exit(0);
});
storageHandler.initWebTabibDrugs();
process.on('uncaughtException', code => {
  console.error(code)
})