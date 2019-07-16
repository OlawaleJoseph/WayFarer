"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bookings = _interopRequireDefault(require("../utils/bookings.utils"));

var _trips = _interopRequireDefault(require("../utils/trips.utils"));

var _common = require("../utils/common");

var Bookings =
/*#__PURE__*/
function () {
  function Bookings() {
    (0, _classCallCheck2["default"])(this, Bookings);
  }

  (0, _createClass2["default"])(Bookings, null, [{
    key: "createBooking",
    value: function () {
      var _createBooking = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var tripToBook, booking, savedBooking;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _trips["default"].findTrip(parseInt(req.body.trip_id, 10));

              case 3:
                tripToBook = _context.sent;

                if (!(tripToBook.status !== 'active')) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(422).json({
                  status: 'error',
                  message: 'This Trip has been cancelled'
                }));

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 11:
                _context.prev = 11;
                _context.next = 14;
                return _bookings["default"].createBooking(req.body, req.user.userId);

              case 14:
                booking = _context.sent;
                _context.next = 17;
                return _bookings["default"].findABooking(booking.booking_id);

              case 17:
                savedBooking = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: savedBooking
                }));

              case 21:
                _context.prev = 21;
                _context.t1 = _context["catch"](11);
                return _context.abrupt("return", res.status(422).json({
                  status: 'error',
                  message: _context.t1.message
                }));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8], [11, 21]]);
      }));

      function createBooking(_x, _x2) {
        return _createBooking.apply(this, arguments);
      }

      return createBooking;
    }()
  }, {
    key: "findABooking",
    value: function () {
      var _findABooking = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var foundBooking;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _bookings["default"].findABooking(req.params.bookingId);

              case 3:
                foundBooking = _context2.sent;
                _context2.prev = 4;
                (0, _common.verifyUser)(req.user, foundBooking.user_id);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", res.status(403).json({
                  status: 'error',
                  message: _context2.t0.message
                }));

              case 11:
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: foundBooking
                }));

              case 14:
                _context2.prev = 14;
                _context2.t1 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: _context2.t1.message
                }));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 14], [4, 8]]);
      }));

      function findABooking(_x3, _x4) {
        return _findABooking.apply(this, arguments);
      }

      return findABooking;
    }()
  }, {
    key: "findAllBookings",
    value: function () {
      var _findAllBookings = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var allBookings;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _bookings["default"].findAllBookings(req.user);

              case 3:
                allBookings = _context3.sent;
                allBookings = allBookings.map(function (booking) {
                  var password = booking.password,
                      trip_completed = booking.trip_completed,
                      status = booking.status,
                      created_on = booking.created_on,
                      date_registered = booking.date_registered,
                      is_admin = booking.is_admin,
                      bookingObj = (0, _objectWithoutProperties2["default"])(booking, ["password", "trip_completed", "status", "created_on", "date_registered", "is_admin"]);
                  return bookingObj;
                });
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: allBookings
                }));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context3.t0.message
                }));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function findAllBookings(_x5, _x6) {
        return _findAllBookings.apply(this, arguments);
      }

      return findAllBookings;
    }()
  }, {
    key: "deleteBooking",
    value: function () {
      var _deleteBooking = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var booking;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _bookings["default"].deleteBooking(req.params.bookingId, req.user);

              case 3:
                booking = _context4.sent;

                if (booking) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'Booking not found'
                }));

              case 6:
                return _context4.abrupt("return", res.status(204).json({
                  status: 'success',
                  data: {}
                }));

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(403).json({
                  status: 'error',
                  message: _context4.t0.message
                }));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }));

      function deleteBooking(_x7, _x8) {
        return _deleteBooking.apply(this, arguments);
      }

      return deleteBooking;
    }()
  }, {
    key: "updateSeat",
    value: function () {
      var _updateSeat = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var bookingToUpdate, oldSeat, busId, updatedBooking;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (parseInt(req.body.seat_number, 10)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'Invalid Booking Number'
                }));

              case 2:
                _context5.next = 4;
                return _bookings["default"].findABooking(req.params.bookingId);

              case 4:
                bookingToUpdate = _context5.sent;

                if (bookingToUpdate.booking_id) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'Booking not found'
                }));

              case 7:
                oldSeat = bookingToUpdate.seat_number;

                if (!(oldSeat === parseInt(req.body.seatNumber, 10))) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", res.status(422).json({
                  status: 'error',
                  message: 'You have already booked this seat'
                }));

              case 10:
                _context5.prev = 10;
                (0, _common.verifyUser)(req.user, bookingToUpdate.user_id);
                busId = bookingToUpdate.bus_id;
                _context5.next = 15;
                return _bookings["default"].changeSeat(busId, oldSeat, req.body.seatNumber, bookingToUpdate.booking_id);

              case 15:
                _context5.next = 17;
                return _bookings["default"].findABooking(req.params.bookingId);

              case 17:
                updatedBooking = _context5.sent;
                return _context5.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: updatedBooking
                }));

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](10);
                return _context5.abrupt("return", res.status(403).json({
                  status: 'error',
                  message: _context5.t0.message
                }));

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[10, 21]]);
      }));

      function updateSeat(_x9, _x10) {
        return _updateSeat.apply(this, arguments);
      }

      return updateSeat;
    }()
  }]);
  return Bookings;
}();

var _default = Bookings;
exports["default"] = _default;