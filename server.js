var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var favicon = require('serve-favicon');
var cors = require('cors');

/* DB connection */
var db = require('./config/db.js');
mongoose.connect(db, { server: { reconnectTries: Number.MAX_VALUE } });

/* Express application setup */
var app = express();
app.use('/storage', express.static('public/storage'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

/* Enabling CORS */
app.use(cors());
app.set('tokenSecret', require('./config/token.js'));

app.use(function(req, res, next) {
    req.static = express.static('public');
    next();
});

app.use(function(req, res, next) {
    if (req.path !== '/auth/login') {
        if (req.method === 'GET') {
            next();
        } else {
            var token = req.body.token || req.query.token || req.headers['token'];
            if (token) {
                jwt.verify(token, app.get('tokenSecret'), function(err, decoded) {
                    if (err) {
                        return res.status(401).send('Invalid token.');
                    } else {
                        next();
                    }
                });
            } else {
                return res.status(400).send('No token provided.');
            }
        }
    } else {
        next();
    }
});

/* Routing */
app.use('/auth', require('./app/routes/auth'));
app.use('/categories', require('./app/routes/categories'));
app.use('/posts', require('./app/routes/posts'));
app.use('/status', require('./app/routes/status'));
app.use('/users', require('./app/routes/users'));

app.listen(3000);

module.exports = app;
