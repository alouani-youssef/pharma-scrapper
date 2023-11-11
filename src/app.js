var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const BuiltInMiddlewares = require('./midllewares')
const swaggerOptions = require('./swagger');


var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(BuiltInMiddlewares.Global.systemAvailability());
app.use(BuiltInMiddlewares.Global.userRecognition());
app.use(BuiltInMiddlewares.RateLimiter());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/developers', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1.0.0/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.status(500);
  res.json({
    error: 'Internal Error !!'
  });
});

module.exports = app;
