'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _userSignupRoute = require('./routes/userSignupRoute');

var _userSignupRoute2 = _interopRequireDefault(_userSignupRoute);

var _userSigninRoute = require('./routes/userSigninRoute');

var _userSigninRoute2 = _interopRequireDefault(_userSigninRoute);

var _userProfileRoute = require('./routes/userProfileRoute');

var _userProfileRoute2 = _interopRequireDefault(_userProfileRoute);

var _userPostRoute = require('./routes/userPostRoute');

var _userPostRoute2 = _interopRequireDefault(_userPostRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', _userSignupRoute2.default);
app.use('/signin', _userSigninRoute2.default);
app.use('/profile', _userProfileRoute2.default);
app.use('/post', _userPostRoute2.default);

app.listen(2700);

console.log('Server started on port 2700');