'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postModel = require('../model/postModel');

var _postModel2 = _interopRequireDefault(_postModel);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var postController = function () {
    function postController() {
        _classCallCheck(this, postController);
    }

    _createClass(postController, [{
        key: 'savePost',
        value: function savePost(req, res) {

            var postData = {
                userName: req.body.userName,
                title: req.body.title,
                date: (0, _moment2.default)().format('MMMM Do YYYY'),
                authorName: req.body.authorName,
                catagory: req.body.catagory,
                postContent: req.body.postContent,
                image: req.body.image,
                video: req.body.video,
                views: 0,
                likes: 0
            };

            var data = new _postModel2.default(postData);
            data.save();
            res.send("Post saved successfully");
        }
    }, {
        key: 'updatePost',
        value: function updatePost(req, res) {
            _postModel2.default.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true }, function (err, post) {
                if (err) {
                    res.status(500).send("Internal Server Error");
                } else {
                    res.json(post);
                }
            });
        }
    }, {
        key: 'deletePost',
        value: function deletePost(req, res) {
            _postModel2.default.findOneAndRemove({ _id: req.params.postId }, function (err, post) {
                if (err) {
                    res.status(500).send("Internal Server Error");
                } else {
                    res.json("Post Deleted Successfully");
                }
            });
        }
    }, {
        key: 'getAllPost',
        value: function getAllPost(req, res) {
            _postModel2.default.find({}, function (err, posts) {
                res.json(posts);
            });
        }
    }, {
        key: 'increaseViewCounter',
        value: function increaseViewCounter(req, res) {
            _postModel2.default.findOne({ _id: req.params.postId }, function (err, post) {
                post.views = post.views + 1;
                post.save();
                res.send(post);
            });
        }
    }, {
        key: 'increaseLikeCounnter',
        value: function increaseLikeCounnter(req, res) {
            _postModel2.default.findOne({ _id: req.params.postId }, function (err, post) {
                post.likes = post.likes + 1;
                post.save();
                res.send(post);
            });
        }
    }, {
        key: 'addComment',
        value: function addComment(req, res) {
            _postModel2.default.findOne({ _id: req.params.postId }, function (err, post) {
                post.comment.push({ userName: req.body.userName, commentData: req.body.commentData });
                post.save();
                res.send(post);
            });
        }
    }, {
        key: 'addRating',
        value: function addRating(req, res) {
            _postModel2.default.findOne({ _id: req.params.postId }, function (err, post) {
                post.rating.push({ userName: req.body.userName, rating: req.body.ratingData });
                post.save();
                res.send(post);
            });
        }
    }, {
        key: 'getAverageRating',
        value: function getAverageRating(req, res) {
            _postModel2.default.findOne({ _id: req.params.postId }, function (err, post) {
                var sum = 0;
                var ratings = post.rating;

                for (var i = 0; i < ratings.length; i++) {
                    sum = sum + ratings[i].rating;
                }

                var average = sum / ratings.length;
                res.json(average);
            });
        }
    }, {
        key: 'getPopularPost',
        value: function getPopularPost(req, res) {
            _postModel2.default.find({}).sort({ views: -1 }).limit(2).exec(function (err, posts) {
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(posts);
                }
            });
        }
    }]);

    return postController;
}();

exports.default = new postController();