"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetTables = exports.createBookingsTable = exports.createTripsTable = exports.createBusesTable = exports.createUsersTable = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _index = _interopRequireDefault(require("./index"));

var createUsersTable =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var userQueryText;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userQueryText = "CREATE TABLE IF NOT EXISTS \n    users(\n        user_id          SERIAL PRIMARY KEY,\n        first_name  VARCHAR(120) NOT NULL,\n        last_name   VARCHAR(120) NOT NULL,\n        email       VARCHAR(120) NOT NULL UNIQUE,\n        password    VARCHAR(120) NOT NULL,\n        is_admin   BOOLEAN NOT NULL,\n        date_registered  TIMESTAMP DEFAULT NOW()\n    )";
            _context.prev = 1;
            _context.next = 4;
            return _index["default"].query(userQueryText);

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            (0, _debug["default"])('http')(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));

  return function createUsersTable() {
    return _ref.apply(this, arguments);
  };
}();

exports.createUsersTable = createUsersTable;

var createBusesTable =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var busTableQuery;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            busTableQuery = "CREATE TABLE IF NOT EXISTS buses(\n        bus_id SERIAL  PRIMARY KEY,\n        number_plate  VARCHAR(9) NOT NULL,\n        manufacturer   TEXT NOT NULL,\n        model     VARCHAR NOT NULL,\n        year   TEXT NOT NULL,\n        capacity  INT NOT NULL,\n        seats     INT[] NOT NULL,\n        available  BOOLEAN\n    )";
            _context2.prev = 1;
            _context2.next = 4;
            return _index["default"].query(busTableQuery);

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            (0, _debug["default"])('http')(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));

  return function createBusesTable() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createBusesTable = createBusesTable;

var createTripsTable =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var tripTableQuery;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tripTableQuery = "CREATE TABLE IF NOT EXISTS trips(\n        trip_id SERIAL  PRIMARY KEY,\n        bus_id  INT REFERENCES buses(bus_id) ON DELETE CASCADE NOT NULL,\n        origin   TEXT NOT NULL,\n        destination     TEXT NOT NULL,\n        fare   FLOAT NOT NULL,\n        trip_date  TIMESTAMP NOT NULL,\n        status text NOT NULL,\n        trip_completed BOOLEAN NOT NULL\n    )";
            _context3.prev = 1;
            _context3.next = 4;
            return _index["default"].query(tripTableQuery);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            (0, _debug["default"])('http')(_context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 6]]);
  }));

  return function createTripsTable() {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTripsTable = createTripsTable;

var createBookingsTable =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var bookingTableQuery;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            bookingTableQuery = "CREATE TABLE IF NOT EXISTS bookings(\n        booking_id      SERIAL PRIMARY KEY,\n        trip_id  INT REFERENCES trips(trip_id) ON DELETE CASCADE NOT NULL,\n        user_id    INT REFERENCES users(user_id)ON DELETE CASCADE NOT NULL,\n        seat_number INT NOT NULL,\n        created_on  TIMESTAMP DEFAULT NOW()\n    )";
            _context4.prev = 1;
            _context4.next = 4;
            return _index["default"].query(bookingTableQuery);

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](1);
            (0, _debug["default"])('http')(_context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 6]]);
  }));

  return function createBookingsTable() {
    return _ref4.apply(this, arguments);
  };
}();

exports.createBookingsTable = createBookingsTable;

var dropTables =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var dropTablesQuery;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            dropTablesQuery = 'DROP TABLE IF EXISTS users, buses, trips, bookings CASCADE';
            _context5.prev = 1;
            _context5.next = 4;
            return _index["default"].query(dropTablesQuery);

          case 4:
            (0, _debug["default"])('http')('Tables Dropped');
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            (0, _debug["default"])('http')(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function dropTables() {
    return _ref5.apply(this, arguments);
  };
}();

var resetTables =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return dropTables();

          case 3:
            _context6.next = 5;
            return createUsersTable();

          case 5:
            _context6.next = 7;
            return createBusesTable();

          case 7:
            _context6.next = 9;
            return createTripsTable();

          case 9:
            _context6.next = 11;
            return createBookingsTable();

          case 11:
            _context6.next = 16;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](0);
            (0, _debug["default"])('http')(_context6.t0);

          case 16:
            _context6.prev = 16;

            _index["default"].end();

            process.exit(0);
            return _context6.finish(16);

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 13, 16, 20]]);
  }));

  return function resetTables() {
    return _ref6.apply(this, arguments);
  };
}();

exports.resetTables = resetTables;

require('make-runnable');