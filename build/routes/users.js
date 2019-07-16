"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _inputValidation = require("../middlewares/inputValidation");

var _userVerification = require("../middlewares/userVerification");

var router = _express["default"].Router();

router.post('/signup', _inputValidation.validateSignUp, _users["default"].create);
router.post('/signin', _inputValidation.validateLogin, _users["default"].login);
router.get('/users/:userId', [_inputValidation.validateParam, _userVerification.validateToken], _users["default"].findUser);
var _default = router;
exports["default"] = _default;