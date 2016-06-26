var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var markdown = require('../etc/markdown');
var fs = require('fs');
var crypto = require('crypto');
var gcloud = require('gcloud');
var google = require('googleapis');
var config = require('../../config/gcloud.js');
var stream = require('stream');
var CLOUD_BUCKET = config.GCLOUD_BUCKET;

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

    google.auth.getApplicationDefault(function (err, authClient) {
        if (err) {
            console.log(err);
        } else {
            if (authClient.createScopedRequired &&
                authClient.createScopedRequired()) {
              authClient = authClient.createScoped(
                  ['https://www.googleapis.com/auth/devstorage.read_write']);
            }

            var storage = gcloud.storage({
              projectId: config.GCLOUD_PROJECT,
              auth: authClient
            });
            var bucket = storage.bucket(CLOUD_BUCKET);

            var title = req.body.title;
            var content = req.body.content;
            var images = req.body.images;
            var authorID = req.body.author;
            var categories = req.body.categories;
            var location = req.body.location;
            var imageLinks = [];

            for (var i = 0; i < images.length; i++) {
                var base64string = images[i];
                var imageBytes = images[i].split(',')[1];
                var imageType = images[i].split(';')[0];
                imageType = imageType.split(':')[1];
                var extension = imageType.split('/')[1];

                var imageString = new Buffer(imageBytes, 'base64').toString('binary');

                var hash = crypto.randomBytes(16).toString('hex');
                var fileName = hash + '.' + extension;
                var tempStorage = './public/storage/';
                fs.writeFileSync(tempStorage + fileName, imageBytes, 'base64');
                imageLinks[i] = 'https://storage.googleapis.com/writer-images/' + fileName;

                var file = bucket.file(fileName);
                var stream = file.createWriteStream({
                    metadata: {
                        contentType: imageType,
                        predefinedAcl: 'publicRead',
                        metadata: {
                            custom: 'metadata'
                        }
                    }
                });

                var file = fs.readFileSync(tempStorage + fileName);

                stream.on('error', function(err) {
                    fs.unlink(tempStorage + fileName);
                });

                stream.on('finish', function() {
                    fs.unlink(tempStorage + fileName);
                });

                stream.end(file);
            }

            Post.create({ title: title, content: content, images: imageLinks, author: authorID, 
            categories: categories, location: location }, function(err, post) {
                if (err) {
                    res.status(500).send('Could not create post. Error: ' + err);
                } else {
                    res.json(post);
                }
            });
        }
    });

});

/* Get post by ID */
router.get('/:id', function(req, res) {
    var ID = req.params.id;
    Post.findOne({_id: ID}).populate('author').populate('categories').exec(function(err, post) {
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

    Post.findOne({_id: ID}, function(err, post) {
        post.update({ title: title, content: content, categories: categories, 
            images: images }, function(err, post) {
            if (err) {
                res.status(500).send('Could not update post. Error: ' + err);
            } else {
                res.json(post);
            }
        });
    });
});

/* Delete post */
router.delete('/:id', function(req, res) {
    var ID = req.params.id;

    Post.findOne({_id: ID}, function(err, post) {
        post.remove(function(err) {
            if (err) {
                res.status(500).send('Could not remove post. Error: ' + err);
            } else {
                res.status(200).send('Post deleted.');
            }
        });
    });
});

module.exports = router;