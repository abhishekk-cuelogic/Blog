'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true });
var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
    userName: String,
    passWord: String
});

var user = _mongoose2.default.model('user', userSchema);

module.exports = user;