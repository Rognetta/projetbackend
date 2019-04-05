var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var albumsRouter = require('./routes/album.js');

var artistRouter = require('./routes/artist.js');

var trackRouter = require('./routes/track.js');

var app = express();

//mongoose connection

var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost/projetWebBackEnd';
mongoose.connect(mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(callback){
    console.log('connected to projetWebBackEnd');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/album', albumsRouter);
app.use('/track', trackRouter);
app.use('/artist', artistRouter);

module.exports = app;
