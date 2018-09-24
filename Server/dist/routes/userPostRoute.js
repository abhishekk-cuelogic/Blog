'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _postController = require('../controller/postController');

var _postController2 = _interopRequireDefault(_postController);

var _searchPostController = require('../controller/searchPostController');

var _searchPostController2 = _interopRequireDefault(_searchPostController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _postController2.default.getAllPost);
router.post('/', _postController2.default.savePost);
router.put('/:postId', _postController2.default.updatePost);
router.delete('/:postId', _postController2.default.deletePost);
router.put('/view/:postId', _postController2.default.increaseViewCounter);
router.put('/like/:postId', _postController2.default.increaseLikeCounnter);
router.put('/comment/:postId', _postController2.default.addComment);
router.put('/rating/:postId', _postController2.default.addRating);
router.get('/rating/:postId', _postController2.default.getAverageRating);
router.get('/popular', _postController2.default.getPopularPost);
router.get('/recent', _searchPostController2.default.getRecentPost);
router.get('/year/:year', _searchPostController2.default.getPostByYear);
router.get('/catagory/:catagory', _searchPostController2.default.getPostByCatagory);

module.exports = router;