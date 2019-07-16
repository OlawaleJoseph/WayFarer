"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookings = _interopRequireDefault(require("../controllers/bookings"));

var _inputValidation = require("../middlewares/inputValidation");

var _userVerification = require("../middlewares/userVerification");

var router = (0, _express["default"])();
router.post('/', [_inputValidation.validateBooking, _userVerification.validateToken, _inputValidation.validateBooking], _bookings["default"].createBooking);
router.get('/:bookingId', [_inputValidation.validateParam, _userVerification.validateToken], _bookings["default"].findABooking);
router.get('/', _userVerification.validateToken, _bookings["default"].findAllBookings);
router.patch('/:bookingId', [_inputValidation.validateParam, _userVerification.validateToken], _bookings["default"].updateSeat);
router["delete"]('/:bookingId', [_inputValidation.validateParam, _userVerification.validateToken], _bookings["default"].deleteBooking);
var _default = router;
exports["default"] = _default;