'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
var Schema = _mongoose2.default.Schema;

var followerSchema = new Schema({
    userName: String
});

var followingSchema = new Schema({
    userName: String
});

var profileSchema = new Schema({
    userName: String,
    fullName: String,
    contact: String,
    skills: String,
    passWord: String,
    profileImage: String,
    followers: [followerSchema],
    following: [followingSchema]
});

var profile = _mongoose2.default.model('profile', profileSchema);

module.exports = profile;