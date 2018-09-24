'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('../model/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secretekey = 'imsecrete';

var userController = function () {
    function userController() {
        _classCallCheck(this, userController);
    }

    _createClass(userController, [{
        key: 'signUp',
        value: function signUp(req, res) {

            var passWord = req.body.password;
            var hash = _bcrypt2.default.hashSync(passWord, 10);

            var userDetail = {
                userName: req.body.username,
                passWord: hash
            };

            var data = new _userModel2.default(userDetail);
            data.save();
            res.send("signUp Successful");
        }
    }, {
        key: 'signIn',
        value: function signIn(req, res) {

            _userModel2.default.findOne({ userName: req.body.username }, function (err, user) {
                if (err) {
                    res.status(500).send("Internal Server Error");
                } else {
                    if (user === null) {
                        res.json({
                            message: 'Not valid UserName'
                        });
                    } else {
                        if (_bcrypt2.default.compareSync(req.body.password, user.passWord)) {

                            var token = _jsonwebtoken2.default.sign({
                                username: req.body.username
                            }, secretekey, {
                                expiresIn: '2h'
                            });

                            res.json({
                                message: 'login successful!!!',
                                token: token,
                                username: req.body.username
                            });
                        } else {
                            res.json({
                                message: 'Wrong Password'
                            });
                        }
                    }
                }
            });
        }
    }]);

    return userController;
}();

exports.default = new userController();