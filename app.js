var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var albumsRouter = require('./routes/album');

var app = express();

//mongoose connection

var mongoose = require('mongoose');
var mongoUrl = '"mongodb://localhost/projetWebBackEnd"';
mongoose.connect(mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(callback){
    console.log('connected to my base de donnée');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/album', albumsRouter);

module.exports = app;
