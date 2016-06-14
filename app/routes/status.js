var express = require('express');
var router = express.Router();
var Category = require('../models/category');
var Post = require('../models/post');

/* Get all users */
router.get('/', function(req, res) {

    Post.count({}, function(err, posts) {
        if (err) {
            res.status(500).send('Could not count posts. Error: ' + err);
        } else {
            Category.count({}, function(err, categories) {
                if (err) {
                    res.status(500).send('Could not count categories. Error: ' + err);
                } else {
                    res.json({ posts: posts, categories: categories, comments: 0, views: 0 });
                }
            });
        }
    });
});

module.exports = router;
