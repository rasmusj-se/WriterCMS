var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var markdown = require('../etc/markdown');
var fs = require('fs');
var crypto = require('crypto');

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
    if (req.body.images) {
        var images = req.body.images;
        var imageLinks = [];

        for (var i = 0; i < images.length; i++) {
            var base64string = images[i].replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            var hash = crypto.randomBytes(20).toString('hex');
            fs.writeFileSync('public/storage/' + hash + '.png', base64string, 'base64');
            imageLinks[i] = '/storage/' + hash + '.png';
        }

        markdown.compile(req.body.content, function(err, content) {
            if (err) {
                res.status(500).send('Could not compile markdown. Error: ' + err);
            } else {
                Post.create({ content: content, images: imageLinks }, function(err, post) {
                    if (err) {
                        res.status(500).send('Could not create post. Error: ' + err);
                    } else {
                        res.json(post);
                    }
                });
            }
        });
    }

});

module.exports = router;