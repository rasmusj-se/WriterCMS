var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

/* Get all comments */
router.get('/', function(req, res) {
    Comment.find({}).sort({ name: 1 }).exec(function(err, comments) {
        if (err) {
            res.status(500).send('Could not get comments. Error: ' + err);
        } else {
            res.json(comments);
        }
    });
});

/* Get comment by ID */
router.get('/:id', function(req, res) {
    var ID = req.params.id;
    Comment.findOne({_id: ID}, function(err, comment) {
        if (err) {
            res.status(500).send('Could not get comment. Error: ' + err);
        } else {
            res.json(comment);
        }
    });
});

/* Create a new comment */
router.post('/', function(req, res) {
    var userName = req.body.userName;
    var content = req.body.content;
    var post = req.body.post;

    Comment.create({ userName: userName, content: content, post: post }, function(err, comment) {
        if (err) {
            res.status(500).send('Could not create comment. Error: ' + err);
        } else {
            res.json(comment);
        }
    });
});

/* Update comment */
router.put('/:id', function(req, res) {
    var ID = req.params.id;
    var userName = req.body.userName;
    var content = req.body.content;

    Comment.update({_id: ID}, { userName: userName, content: content }, function(err, comment) {
        if (err) {
            res.status(500).send('Could not update comment. Error: ' + err);
        } else {
            res.json(comment);
        }
    });
});

/* Delete comment */
router.delete('/:id', function(req, res) {
    var ID = req.params.id;

    Comment.findOne({_id: ID}).remove(function(err) {
        if (err) {
            res.status(500).send('Could not remove comment. Error: ' + err);
        } else {
            res.status(200).send('comment deleted.');
        }
    });
});

module.exports = router;