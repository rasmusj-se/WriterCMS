var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        name: 'Writer API',
        version: 'v1',
        author: 'Axel Niklasson <info@axelniklasson.se>'
    });
});

module.exports = router;