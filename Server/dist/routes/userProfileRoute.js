'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _profileController = require('../controller/profileController');

var _profileController2 = _interopRequireDefault(_profileController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:user', _profileController2.default.getProfile);
router.post('/', _profileController2.default.saveProfile);
router.get('/follower/:user', _profileController2.default.getFollowers);
router.put('/follower/:user', _profileController2.default.addFollower);
router.get('/following/:user', _profileController2.default.getFollowings);

module.exports = router;