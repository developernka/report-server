var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('../db.config.json');
console.log(config);

require('mongoose')
  .connect(`${config.db_url}/${config.db_name}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('DB Connected');
  });

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/api', require('./routes/api'));

app.use('/**', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   //res.status(404).json({ msg: 'Path Not Found' });
//   //next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
