"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bus = _interopRequireDefault(require("../controllers/bus"));

var _userVerification = require("../middlewares/userVerification");

var _inputValidation = require("../middlewares/inputValidation");

var router = _express["default"].Router();

router.post('/', [_inputValidation.validateBus, _userVerification.validateToken, _userVerification.checkAdmin], _bus["default"].createBus);
router.get('/:busId', [_inputValidation.validateParam, _userVerification.validateToken, _userVerification.checkAdmin], _bus["default"].findABus);
router.get('/', [_userVerification.validateToken, _userVerification.checkAdmin], _bus["default"].findAllBuses);
var _default = router;
exports["default"] = _default;