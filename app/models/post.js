var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String] },
    date: { type: Date, required: true, default: Date.now },
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
    location: { type:  mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Post', PostSchema);