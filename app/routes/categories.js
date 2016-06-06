var express = require('express');
var router = express.Router();
var Category = require('../models/category');

/* Get all category */
router.get('/', function(req, res) {
    Category.find({}).sort({ name: 1 }).exec(function(err, categories) {
        if (err) {
            res.status(500).send('Could not get categories. Error: ' + err);
        } else {
            res.json(categories);
        }
    });
});

/* Get post by ID */
router.get('/:id', function(req, res) {
    var ID = req.params.id;
    Category.findOne({_id: ID}, function(err, category) {
        if (err) {
            res.status(500).send('Could not get category. Error: ' + err);
        } else {
            res.json(category);
        }
    });
});

/* Create a new post */
router.post('/', function(req, res) {
    if (req.body.name) {
        var name = req.body.name;
        Category.create({ name: name }, function(err, category) {
            if (err) {
                res.status(500).send('Could not create category. Error: ' + err);
            } else {
                res.json(category);
            }
        });
    }
});

module.exports = router;