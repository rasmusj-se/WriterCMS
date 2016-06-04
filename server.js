var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

/* DB connection */
var db = require('./config/db.js');
mongoose.connect(db, { server: { reconnectTries: Number.MAX_VALUE } });

/* Express application setup */
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Routing */
app.use('/auth', require('./app/routes/auth'));
app.use('/posts', require('./app/routes/posts'));

/* Serving SPA */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.listen(3000);