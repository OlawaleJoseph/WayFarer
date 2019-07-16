"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bus = _interopRequireDefault(require("../utils/bus.utils"));

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
      _regenerator["default"].mark(function _callee(req, res) {
        var registeredBus, newBus, seats, newBusObj;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _bus["default"].findBusByPlate(req.body.number_plate);

              case 3:
                registeredBus = _context.sent;

                if (registeredBus) {
                  _context.next = 18;
                  break;
                }

                _context.prev = 5;
                _context.next = 8;
                return _bus["default"].createBus(req.body);

              case 8:
                newBus = _context.sent;
                seats = newBus.seats, newBusObj = (0, _objectWithoutProperties2["default"])(newBus, ["seats"]);
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: newBusObj
                }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);
                return _context.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: 'Internal Server Error'
                }));

              case 16:
                _context.next = 19;
                break;

              case 18:
                return _context.abrupt("return", res.status(409).json({
                  status: 'error',
                  message: 'Bus already registered'
                }));

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t1 = _context["catch"](0);
                return _context.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: _context.t1.message
                }));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 21], [5, 13]]);
      }));

      function createBus(_x, _x2) {
        return _createBus.apply(this, arguments);
      }

      return createBus;
    }()
  }, {
    key: "findABus",
    value: function () {
      var _findABus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var bus, seats, busObj;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _bus["default"].findBusById(req.params.busId);

              case 3:
                bus = _context2.sent;
                seats = bus.seats, busObj = (0, _objectWithoutProperties2["default"])(bus, ["seats"]);
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: busObj
                }));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: _context2.t0.message
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function findABus(_x3, _x4) {
        return _findABus.apply(this, arguments);
      }

      return findABus;
    }()
  }, {
    key: "findAllBuses",
    value: function () {
      var _findAllBuses = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var buses, allBuses;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _bus["default"].findAllBuses();

              case 3:
                buses = _context3.sent;
                allBuses = buses.map(function (bus) {
                  var seats = bus.seats,
                      busObj = (0, _objectWithoutProperties2["default"])(bus, ["seats"]);
                  return busObj;
                });
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: allBuses
                }));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: 'Internal server Error'
                }));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function findAllBuses(_x5, _x6) {
        return _findAllBuses.apply(this, arguments);
      }

      return findAllBuses;
    }()
  }]);
  return Bus;
}();

var _default = Bus;
exports["default"] = _default;