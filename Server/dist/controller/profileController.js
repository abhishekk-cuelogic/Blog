"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _profileModel = require("../model/profileModel");

var _profileModel2 = _interopRequireDefault(_profileModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var profileController = function () {
    function profileController() {
        _classCallCheck(this, profileController);
    }

    _createClass(profileController, [{
        key: "saveProfile",
        value: function saveProfile(req, res) {

            var userProfile = {
                userName: req.body.userName,
                fullName: req.body.fullName,
                contact: req.body.contact,
                skills: req.body.skills,
                password: req.body.password,
                profileImage: req.body.profileImage
            };

            var data = new _profileModel2.default(userProfile);
            data.save();
            res.send("Profile Saved Successfully");
        }
    }, {
        key: "getProfile",
        value: function getProfile(req, res) {
            console.log(req.params.user);

            _profileModel2.default.findOne({ userName: req.params.user }, function (err, profile) {
                res.json(profile);
            });
        }
    }, {
        key: "addFollower",
        value: function addFollower(req, res) {

            _profileModel2.default.findOne({ userName: req.params.user }, function (err, user) {

                if (err) {
                    res.status(500).send("Internal Server Error");
                }

                user.followers.push({ userName: req.body.userName });
                user.save();
            });

            _profileModel2.default.findOne({ userName: req.body.userName }, function (err, user) {

                if (err) {
                    res.status(500).send("Internal Server Error");
                }

                user.following.push({ userName: req.params.user });
                user.save();
            });

            res.send("following");
        }
    }, {
        key: "getFollowers",
        value: function getFollowers(req, res) {

            _profileModel2.default.findOne({ userName: req.params.user }, function (err, user) {
                if (err) {
                    res.status(500).send("Internal Server Error");
                }

                res.json(user.followers);
            });
        }
    }, {
        key: "getFollowings",
        value: function getFollowings(req, res) {

            _profileModel2.default.findOne({ userName: req.params.user }, function (err, user) {
                if (err) {
                    res.status(500).send("Internal Server Error");
                }

                res.json(user.following);
            });
        }
    }]);

    return profileController;
}();

exports.default = new profileController();