"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trips = _interopRequireDefault(require("../controllers/trips"));

var _inputValidation = require("../middlewares/inputValidation");

var _userVerification = require("../middlewares/userVerification");

var router = _express["default"].Router();

router.post('/', [_inputValidation.validateTrip, _userVerification.validateToken, _userVerification.checkAdmin], _trips["default"].createTrip);
router.get('/', [_userVerification.validateToken], _trips["default"].findAllTrips);
router.get('/:tripId', [_inputValidation.validateParam, _userVerification.validateToken], _trips["default"].findATrip);
router.patch('/:tripId', [_inputValidation.validateParam, _userVerification.validateToken, _userVerification.checkAdmin], _trips["default"].updateTripStatus);
var _default = router;
exports["default"] = _default;