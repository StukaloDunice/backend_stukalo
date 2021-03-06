const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');

const app = express();

const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use(passport.initialize());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(NOT_FOUND));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || INTERNAL_SERVER_ERROR);
  res.render('error');
});

module.exports = app;
