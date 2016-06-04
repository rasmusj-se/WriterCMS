var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var markdown = require('../etc/markdown');

/* Get all posts */
router.get('/', function(req, res) {
    Post.find({}).sort({ date: -1 }).exec(function(err, posts) {
        if (err) {
            res.status(500).send('Could not get posts. Error: ' + err);
        } else {
            res.json(posts);
        }
    });
});

/* Get post by ID */
router.get('/:id', function(req, res) {
    var ID = req.params.id;
    Post.findOne({_id: ID}, function(err, post) {
        if (err) {
            res.status(500).send('Could not get post. Error: ' + err);
        } else {
            res.json(post);
        }
    });
});

/* Create a new post */
router.post('/', function(req, res) {
    var title = req.body.title;
    
    markdown.compile(req.body.content, function(err, content) {
        if (err) {
            res.status(500).send('Could not compile markdown. Error: ' + err);
        } else {
            Post.create({ title: title, content: content }, function(err, post) {
                if (err) {
                    res.status(500).send('Could not create post. Error: ' + err);
                } else {
                    res.json(post);
                }
            });
        }
    });
});

module.exports = router;