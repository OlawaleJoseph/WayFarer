"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _query = _interopRequireDefault(require("./query"));

/* eslint-disable no-param-reassign */
var Bus =
/*#__PURE__*/
function () {
  function Bus() {
    (0, _classCallCheck2["default"])(this, Bus);
  }

  (0, _createClass2["default"])(Bus, null, [{
    key: "createBus",
    value: function () {
      var _createBus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(data) {
        var queryText, number_plate, manufacturer, model, year, capacity, seatsNumberArray, newBus;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryText = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity, seats, available) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
                number_plate = data.number_plate, manufacturer = data.manufacturer, model = data.model, year = data.year, capacity = data.capacity;
                seatsNumberArray = Bus.generateSeats(capacity);
                _context.prev = 3;
                _context.next = 6;
                return (0, _query["default"])(queryText, [number_plate.toUpperCase(), manufacturer, model, year, capacity, seatsNumberArray, true]);

              case 6:
                newBus = _context.sent;
                return _context.abrupt("return", newBus[0]);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                throw new Error(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));

      function createBus(_x) {
        return _createBus.apply(this, arguments);
      }

      return createBus;
    }()
  }, {
    key: "generateSeats",
    value: function generateSeats(busCapacity) {
      var seats = [];

      while (busCapacity) {
        seats.push(busCapacity); // eslint-disable-next-line no-plusplus

        busCapacity--;
      }

      return seats;
    }
  }, {
    key: "findBusByPlate",
    value: function () {
      var _findBusByPlate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(plate) {
        var findBusQuery, foundBus;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findBusQuery = 'SELECT * FROM buses WHERE number_plate = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _query["default"])(findBusQuery, [plate.toUpperCase()]);

              case 4:
                foundBus = _context2.sent;
                return _context2.abrupt("return", foundBus[0]);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                throw new Error('No Bus found');

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function findBusByPlate(_x2) {
        return _findBusByPlate.apply(this, arguments);
      }

      return findBusByPlate;
    }()
  }, {
    key: "findBusById",
    value: function () {
      var _findBusById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(id) {
        var findBusByIdQuery, foundBus;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                findBusByIdQuery = 'SELECT * FROM buses WHERE bus_id = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return (0, _query["default"])(findBusByIdQuery, [id]);

              case 4:
                foundBus = _context3.sent;

                if (foundBus[0]) {
                  _context3.next = 7;
                  break;
                }

                throw new Error('Bus not found');

              case 7:
                return _context3.abrupt("return", foundBus[0]);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                throw new Error(_context3.t0.message);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function findBusById(_x3) {
        return _findBusById.apply(this, arguments);
      }

      return findBusById;
    }()
  }, {
    key: "findAllBuses",
    value: function () {
      var _findAllBuses = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var findAllBusesQuery, buses;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                findAllBusesQuery = 'SELECT * FROM buses';
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _query["default"])(findAllBusesQuery);

              case 4:
                buses = _context4.sent;
                return _context4.abrupt("return", buses);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                throw new Error(_context4.t0.message);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function findAllBuses() {
        return _findAllBuses.apply(this, arguments);
      }

      return findAllBuses;
    }()
  }, {
    key: "updateBusAvailability",
    value: function () {
      var _updateBusAvailability = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(bus) {
        var busSeats, updateBusQuery, updatedBus;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                busSeats = Bus.generateSeats(bus.capacity);
                updateBusQuery = 'UPDATE buses SET available=$1, seats=$2 WHERE bus_id=$3 returning *';
                _context5.prev = 3;
                _context5.next = 6;
                return (0, _query["default"])(updateBusQuery, [!bus.available, busSeats, bus.bus_id]);

              case 6:
                updatedBus = _context5.sent;
                return _context5.abrupt("return", updatedBus);

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](3);
                throw new Error('Could not update Bus');

              case 13:
                _context5.next = 18;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t1 = _context5["catch"](0);
                throw new Error(_context5.t1.message);

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 15], [3, 10]]);
      }));

      function updateBusAvailability(_x4) {
        return _updateBusAvailability.apply(this, arguments);
      }

      return updateBusAvailability;
    }()
  }, {
    key: "pickSeat",
    value: function () {
      var _pickSeat = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(bus_id, seatNumber) {
        var updateQuery, index, boardingBus;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                updateQuery = 'UPDATE buses SET seats=$1 WHERE bus_id=$2 returning *';
                _context6.prev = 1;
                _context6.next = 4;
                return Bus.findBusById(bus_id);

              case 4:
                boardingBus = _context6.sent;

                if (!(boardingBus.seats.length < 1)) {
                  _context6.next = 7;
                  break;
                }

                throw new Error('All seats are filled');

              case 7:
                if (!seatNumber) {
                  _context6.next = 17;
                  break;
                }

                seatNumber = parseInt(seatNumber, 10);

                if (boardingBus.seats.includes(seatNumber)) {
                  _context6.next = 13;
                  break;
                }

                throw new Error('Seat not available. Choose another seat');

              case 13:
                index = boardingBus.seats.indexOf(seatNumber);
                boardingBus.seats.splice(index, 1);

              case 15:
                _context6.next = 18;
                break;

              case 17:
                seatNumber = boardingBus.seats.shift();

              case 18:
                _context6.next = 20;
                return (0, _query["default"])(updateQuery, [boardingBus.seats, bus_id]);

              case 20:
                return _context6.abrupt("return", seatNumber);

              case 23:
                _context6.prev = 23;
                _context6.t0 = _context6["catch"](1);
                throw new Error(_context6.t0.message);

              case 26:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 23]]);
      }));

      function pickSeat(_x5, _x6) {
        return _pickSeat.apply(this, arguments);
      }

      return pickSeat;
    }()
  }, {
    key: "changeBusSeat",
    value: function () {
      var _changeBusSeat = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(id, newSeat, OldSeat) {
        var currentSeat, busToUpdateSeat, newSeats, updateSeatQuery;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return Bus.pickSeat(id, newSeat);

              case 3:
                currentSeat = _context7.sent;
                _context7.next = 6;
                return Bus.findBusById(id);

              case 6:
                busToUpdateSeat = _context7.sent;
                newSeats = busToUpdateSeat.seats.slice();
                newSeats.push(OldSeat);
                updateSeatQuery = 'UPDATE buses SET seats=$2 WHERE bus_id=$1';
                _context7.next = 12;
                return (0, _query["default"])(updateSeatQuery, [id, newSeats]);

              case 12:
                return _context7.abrupt("return", currentSeat);

              case 15:
                _context7.prev = 15;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 15]]);
      }));

      function changeBusSeat(_x7, _x8, _x9) {
        return _changeBusSeat.apply(this, arguments);
      }

      return changeBusSeat;
    }()
  }]);
  return Bus;
}();

var _default = Bus;
exports["default"] = _default;