process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const http = require('http')
const express = require('express')
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const configs = require('./config')

async function main() {
  const app = express()
  const server = http.createServer(app)
  const io = require('socket.io')(server, { transports: ['polling', 'websocket'] })
  const chat = io.of('/support')

  await rmq.connect()

  await mongoose.connect(configs.mongo.uri, { promiseLibrary: global.Promise })

  require('mongoose-auto-increment').initialize(mongoose.connection)

  require('./src/routes')(app)
  await require('./src/support').start(chat)

  server.listen(configs.server.port, () => {
    console.log('Server listening on http://localhost:%s', configs.server.port)
  })
}

main().catch(error => {
  console.error(error);
  process.exit(0);
})

process.on('uncaughtException', code => {
  console.error(code)
})