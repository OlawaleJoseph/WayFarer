"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedDb = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _seeder = require("./seeder.data");

var _query = _interopRequireDefault(require("../utils/query"));

var seedDb =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var usersText, busText, tripText, bookingText;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usersText = 'INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES($1, $2, $3, $4, $5) ';
            busText = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity, seats, available) VALUES($1, $2, $3, $4, $5, $6, $7)';
            tripText = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare, status, trip_completed) VALUES($1, $2, $3, $4, $5, $6, $7)';
            bookingText = 'INSERT INTO bookings(trip_id, user_id, seat_number) VALUES($1, $2, $3)';
            _context.prev = 4;
            _context.next = 7;
            return (0, _query["default"])(usersText, _seeder.users[0]);

          case 7:
            _context.next = 9;
            return (0, _query["default"])(usersText, _seeder.users[1]);

          case 9:
            _context.next = 11;
            return (0, _query["default"])(busText, _seeder.buses[0]);

          case 11:
            _context.next = 13;
            return (0, _query["default"])(busText, _seeder.buses[1]);

          case 13:
            _context.next = 15;
            return (0, _query["default"])(tripText, _seeder.trips[0]);

          case 15:
            _context.next = 17;
            return (0, _query["default"])(tripText, _seeder.trips[1]);

          case 17:
            _context.next = 19;
            return (0, _query["default"])(bookingText, _seeder.bookings[0]);

          case 19:
            _context.next = 21;
            return (0, _query["default"])(bookingText, _seeder.bookings[1]);

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](4);
            (0, _debug["default"])('http')(_context.t0);
            process.exit(0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 23]]);
  }));

  return function seedDb() {
    return _ref.apply(this, arguments);
  };
}();

exports.seedDb = seedDb;

require('make-runnable');