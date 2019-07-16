"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _query = _interopRequireDefault(require("./query"));

var _trips = _interopRequireDefault(require("./trips.utils"));

var _bus = _interopRequireDefault(require("./bus.utils"));

var _common = require("./common");

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
      _regenerator["default"].mark(function _callee(data, userId) {
        var trip_id, seat_number, tripToBook, pickedSeat, createBookingQuery, newBooking;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                trip_id = data.trip_id, seat_number = data.seat_number;
                _context.prev = 1;
                _context.next = 4;
                return _trips["default"].findTrip(trip_id);

              case 4:
                tripToBook = _context.sent;
                _context.next = 7;
                return _bus["default"].pickSeat(tripToBook.bus_id, seat_number);

              case 7:
                pickedSeat = _context.sent;
                createBookingQuery = 'INSERT INTO bookings(trip_id, user_id, seat_number) VALUES($1, $2, $3) returning *';
                _context.next = 11;
                return (0, _query["default"])(createBookingQuery, [trip_id, userId, pickedSeat]);

              case 11:
                newBooking = _context.sent;
                return _context.abrupt("return", newBooking[0]);

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0.message);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 15]]);
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
      _regenerator["default"].mark(function _callee2(id) {
        var findBookingQuery, _ref, _ref2, foundBooking, email, user_id, bus_id, trip_date, first_name, last_name, seat_number, trip_id, fare, booking;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findBookingQuery = "SELECT * FROM bookings \n        INNER JOIN users ON bookings.user_id = users.user_id \n        INNER JOIN trips ON trips.trip_id=bookings.trip_id \n        WHERE bookings.booking_id=$1";
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _query["default"])(findBookingQuery, [id]);

              case 4:
                _ref = _context2.sent;
                _ref2 = (0, _slicedToArray2["default"])(_ref, 1);
                foundBooking = (0, _extends2["default"])({}, _ref2[0]);

                if (!(Object.keys(foundBooking).length > 0)) {
                  _context2.next = 11;
                  break;
                }

                email = foundBooking.email, user_id = foundBooking.user_id, bus_id = foundBooking.bus_id, trip_date = foundBooking.trip_date, first_name = foundBooking.first_name, last_name = foundBooking.last_name, seat_number = foundBooking.seat_number, trip_id = foundBooking.trip_id, fare = foundBooking.fare;
                booking = {
                  booking_id: id,
                  user_id: user_id,
                  trip_id: trip_id,
                  bus_id: bus_id,
                  trip_date: trip_date,
                  seat_number: seat_number,
                  fare: fare,
                  first_name: first_name,
                  last_name: last_name,
                  email: email
                };
                return _context2.abrupt("return", booking);

              case 11:
                throw new Error('Booking not found');

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);
                throw new Error(_context2.t0.message);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 14]]);
      }));

      function findABooking(_x3) {
        return _findABooking.apply(this, arguments);
      }

      return findABooking;
    }()
  }, {
    key: "findAllBookings",
    value: function () {
      var _findAllBookings = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(user) {
        var findAllBookingsQuery, allBookings;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                findAllBookingsQuery = "SELECT * FROM bookings\n        INNER JOIN users ON bookings.user_id = users.user_id \n        INNER JOIN trips ON trips.trip_id=bookings.trip_id";
                _context3.prev = 1;
                _context3.next = 4;
                return (0, _query["default"])(findAllBookingsQuery);

              case 4:
                allBookings = _context3.sent;

                if (user.isAdmin) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", allBookings.filter(function (booking) {
                  return booking.user_id === user.userId;
                }));

              case 7:
                return _context3.abrupt("return", allBookings);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                throw new Error('Internal Server Error');

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function findAllBookings(_x4) {
        return _findAllBookings.apply(this, arguments);
      }

      return findAllBookings;
    }()
  }, {
    key: "deleteBooking",
    value: function () {
      var _deleteBooking = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(id, user) {
        var bookingToDelete, deleteBookingQuery;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Bookings.findABooking(id);

              case 3:
                bookingToDelete = _context4.sent;

                if (bookingToDelete.booking_id) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", false);

              case 6:
                (0, _common.verifyUser)(user, bookingToDelete.user_id);
                deleteBookingQuery = 'DELETE FROM bookings WHERE booking_id=$1';
                _context4.next = 10;
                return (0, _query["default"])(deleteBookingQuery, [id]);

              case 10:
                return _context4.abrupt("return", true);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](0);
                throw new Error(_context4.t0.message);

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 13]]);
      }));

      function deleteBooking(_x5, _x6) {
        return _deleteBooking.apply(this, arguments);
      }

      return deleteBooking;
    }()
  }, {
    key: "changeSeat",
    value: function () {
      var _changeSeat = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(busId, oldSeat, newSeat, bookingId) {
        var updatedBookingSeat, updateSeatQuery;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _bus["default"].changeBusSeat(busId, newSeat, oldSeat);

              case 3:
                updatedBookingSeat = _context5.sent;
                updateSeatQuery = 'UPDATE bookings SET seat_number=$1 WHERE booking_id=$2 returning *';
                _context5.next = 7;
                return (0, _query["default"])(updateSeatQuery, [updatedBookingSeat, bookingId]);

              case 7:
                return _context5.abrupt("return", _context5.sent);

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      function changeSeat(_x7, _x8, _x9, _x10) {
        return _changeSeat.apply(this, arguments);
      }

      return changeSeat;
    }()
  }]);
  return Bookings;
}();

var _default = Bookings;
exports["default"] = _default;