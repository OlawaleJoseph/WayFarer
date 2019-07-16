"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAdmin = exports.validateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var validateToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var token, realtoken, decodedToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.token;

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              status: 'error',
              message: 'No Token Provided'
            }));

          case 3:
            _context.prev = 3;
            realtoken = token.slice(7);
            _context.next = 7;
            return _jsonwebtoken["default"].verify(realtoken, process.env.jwt_secret);

          case 7:
            decodedToken = _context.sent;
            req.user = decodedToken;
            next();
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(400).json({
              status: 'error',
              message: 'Invalid Token'
            }));

          case 15:
            return _context.abrupt("return", null);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));

  return function validateToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateToken = validateToken;

var checkAdmin = function checkAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }

  return res.status(403).json({
    status: 'error',
    message: 'You are unauthorized'
  });
};

exports.checkAdmin = checkAdmin;