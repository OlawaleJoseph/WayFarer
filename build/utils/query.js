"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _debug = _interopRequireDefault(require("debug"));

var _index = _interopRequireDefault(require("../models/index"));

var log = (0, _debug["default"])('http');

var query =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(text, data) {
    var _ref2, rows;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].query(text, data);

          case 3:
            _ref2 = _context.sent;
            rows = _ref2.rows;
            log('DB Queried');
            return _context.abrupt("return", rows);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function query(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = query;
exports["default"] = _default;