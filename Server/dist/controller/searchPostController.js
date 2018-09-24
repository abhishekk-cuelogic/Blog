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

var searchPostController = function () {
    function searchPostController() {
        _classCallCheck(this, searchPostController);
    }

    _createClass(searchPostController, [{
        key: 'getPostByYear',
        value: function getPostByYear(req, res) {
            _postModel2.default.find({}, function (err, posts) {

                if (err) {
                    res.status(500).send('Internal Server Error');
                } else {
                    var yearPosts = posts.filter(function (doc) {
                        var year = doc.date.split(' ')[2];

                        if (year === req.params.year) {
                            return doc;
                        }
                    });
                    res.json(yearPosts);
                }
            });
        }
    }, {
        key: 'getPostByCatagory',
        value: function getPostByCatagory(req, res) {
            _postModel2.default.find({}, function (err, posts) {
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else {
                    var catagoryPosts = posts.filter(function (doc) {
                        var catagory = doc.catagory.toLowerCase();

                        if (catagory === req.params.catagory.toLowerCase()) {

                            return doc;
                        }
                    });

                    res.json(catagoryPosts);
                }
            });
        }
    }, {
        key: 'getRecentPost',
        value: function getRecentPost(req, res) {
            var limit = (0, _moment2.default)().startOf('day').fromNow().split(' ')[0];

            _postModel2.default.find({}, function (err, posts) {
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else {
                    var recentPosts = posts.filter(function (doc) {

                        var date = doc.date;
                        var dateObj = (0, _moment2.default)(date, 'MMMM Do YYYY');
                        var diff = dateObj.fromNow();
                        var string = diff.split(' ');

                        if (string[1] === 'hours') {
                            if (string[0] < 18) {
                                return doc;
                            }
                        }
                    });

                    res.json(recentPosts);
                }
            });
        }
    }]);

    return searchPostController;
}();

exports.default = new searchPostController();