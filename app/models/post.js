var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    images: { type: [String] },
    date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);