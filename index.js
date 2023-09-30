const http = require('http')
const express = require('express')

const config = require('./config');
require('./connections');

async function initServer(){
  const app = express();
  const server = http.createServer(app);
  server.listen(config.getPort(), () => {
    console.infoC('Server listening on http://localhost:%s', config.getPort())
  });
};

initServer().catch(error => {
  console.error(error);
  process.exit(0);
})
process.on('uncaughtException', code => {
  console.error(code)
})