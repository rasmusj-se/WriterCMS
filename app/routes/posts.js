var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var markdown = require('../etc/markdown');
var fs = require('fs');
var crypto = require('crypto');

/* Get all posts */
router.get('/', function(req, res) {
    Post.find({}).populate('author').populate('categories').sort({ date: -1 }).exec(function(err, posts) {
        if (err) {
            res.status(500).send('Could not get posts. Error: ' + err);
        } else {
            res.json(posts);
        }
    });
});

/* Create a new post */
router.post('/', function(req, res) {
    if (req.body.images) {
        var title = req.body.title;
        var content = req.body.content;
        var images = req.body.images;
        var authorID = req.body.author;
        var categories = req.body.categories;
        var imageLinks = [];

        for (var i = 0; i < images.length; i++) {
            var base64string = images[i].replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            var hash = crypto.randomBytes(20).toString('hex');
            fs.writeFileSync('public/storage/' + hash + '.png', base64string, 'base64');
            imageLinks[i] = '/storage/' + hash + '.png';
        }

        Post.create({ title: title, content: content, images: imageLinks, author: authorID, 
        categories: categories }, function(err, post) {
            if (err) {
                res.status(500).send('Could not create post. Error: ' + err);
            } else {
                res.json(post);
            }
        });
    }

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

/* Update post */
router.put('/:id', function(req, res) {
    var ID = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    var categories = req.body.categories;
    var images = req.body.images;
    Post.update({_id: ID}, { title: title, content: content, categories: categories, 
        images: images }, function(err, post) {
        if (err) {
            res.status(500).send('Could not update post. Error: ' + err);
        } else {
            res.json(post);
        }
    });
});

/* Delete post */
router.delete('/:id', function(req, res) {
    var ID = req.params.id;
    Post.findOne({_id: ID}).remove(function(err) {
        if (err) {
            res.status(500).send('Could not remove post. Error: ' + err);
        } else {
            res.status(200).send('Post deleted.');
        }
    })
});

module.exports = router;