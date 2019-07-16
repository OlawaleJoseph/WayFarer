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

var _trips = _interopRequireDefault(require("../utils/trips.utils"));

var Trips =
/*#__PURE__*/
function () {
  function Trips() {
    (0, _classCallCheck2["default"])(this, Trips);
  }

  (0, _createClass2["default"])(Trips, null, [{
    key: "createTrip",
    value: function () {
      var _createTrip = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var createdTrip;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _trips["default"].create(req.body);

              case 3:
                createdTrip = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  data: createdTrip
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(422).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function createTrip(_x, _x2) {
        return _createTrip.apply(this, arguments);
      }

      return createTrip;
    }()
  }, {
    key: "findATrip",
    value: function () {
      var _findATrip = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _ref, trip_completed, foundTrip;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _trips["default"].findTrip(req.params.tripId);

              case 3:
                _ref = _context2.sent;
                trip_completed = _ref.trip_completed;
                foundTrip = (0, _objectWithoutProperties2["default"])(_ref, ["trip_completed"]);
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: foundTrip
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: _context2.t0.message
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function findATrip(_x3, _x4) {
        return _findATrip.apply(this, arguments);
      }

      return findATrip;
    }()
  }, {
    key: "findAllTrips",
    value: function () {
      var _findAllTrips = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var allTrips, trips;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _trips["default"].getAlltrips();

              case 3:
                trips = _context3.sent;

                if (req.user.isAdmin) {
                  allTrips = trips;
                } else {
                  allTrips = trips.filter(function (trip) {
                    return trip.status === 'active';
                  });
                }

                if (Object.keys(req.query).length > 0 && allTrips.length > 0) {
                  allTrips = Trips.filterTrips(req.query, allTrips);
                }

                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: allTrips
                }));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: 'Internal server error'
                }));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function findAllTrips(_x5, _x6) {
        return _findAllTrips.apply(this, arguments);
      }

      return findAllTrips;
    }()
  }, {
    key: "updateTripStatus",
    value: function () {
      var _updateTripStatus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var updatedtrip;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _trips["default"].updateTripStatus(req.params.tripId);

              case 3:
                updatedtrip = _context4.sent;
                return _context4.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: updatedtrip
                }));

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: _context4.t0.message
                }));

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function updateTripStatus(_x7, _x8) {
        return _updateTripStatus.apply(this, arguments);
      }

      return updateTripStatus;
    }()
  }]);
  return Trips;
}();

var _default = Trips;
exports["default"] = _default;