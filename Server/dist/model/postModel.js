'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
var Schema = _mongoose2.default.Schema;

var commentSchema = new Schema({
    userName: String,
    commentData: String
});

var ratingSchema = new Schema({
    userName: String,
    rating: Number
});

var postSchema = new Schema({
    userName: String,
    title: String,
    date: String,
    authorName: String,
    catagory: String,
    postContent: String,
    image: String,
    video: String,
    views: Number,
    likes: Number,
    comment: [commentSchema],
    rating: [ratingSchema]
});

var post = _mongoose2.default.model('post', postSchema);

module.exports = post;