var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, user) {
        if (err) {
            res.status(500).send('Something went wrong. Error: ' + err);
        } else {

            if (!user) {
                res.status(400).send('Could not find user. Error: ' + err);
            }

            var authenticated = passwordHash.verify(password, user.password);
            if (authenticated) {
                // create token that expires in two weeks
                // should be handled more gracefully than requiring server
                var token = jwt.sign(user, require('../../server').get('tokenSecret'));
                res.json({
                    success: true,
                    message: 'User authenticated',
                    token: token,
                    userID: user._id
                });
            } else {
                res.status(401).send('Wrong username and/or password');
            }
        }
    });
});

module.exports = router;