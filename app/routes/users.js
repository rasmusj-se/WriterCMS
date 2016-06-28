var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* Get all users */
router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).send('Could not get users. Error: ' + err);
        } else {
            res.json(users);
        }
    });
});

/* Get post by ID */
router.get('/:id', function(req, res) {
    var ID = req.params.id;
    User.findOne({_id: ID}, function(err, user) {
        if (err) {
            res.status(500).send('Could not get user. Error: ' + err);
        } else {
            res.json(user);
        }
    });
});

/* Create a new post */
router.post('/', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var username = req.body.username;
    var password = req.body.password;

    User.create({ firstName: firstName, lastName: lastName, username: username, password: password }, function(err, user) {
        if (err) {
            res.status(500).send('Could not create user. Error: ' + err);
        } else {
            res.json(user);
        }
    });
});

/* Update user */
router.put('/:id', function(req, res) {
    var ID = req.params.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var username = req.body.username;

    User.findOne({_id: ID}, function(err, user) {
        user.update({ firstName: firstName, lastName: lastName, username: username }, function(err, user) {
            if (err) {
                res.status(500).send('Could not update user. Error: ' + err);
            } else {
                res.json(user);
            }
        });
    });
});

/* Delete user */
router.delete('/:id', function(req, res) {
    var ID = req.params.id;

    User.findOne({_id: ID}, function(err, user) {
        user.remove(function(err) {
            if (err) {
                res.status(500).send('Could not delete user. Error: ' + err);
            } else {
                res.status(200).send('User deleted.');
            }
        });
    });
});

module.exports = router;