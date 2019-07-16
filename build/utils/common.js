"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = exports.verifyPassword = exports.generateToken = exports.hashPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var hashPassword = function hashPassword(password) {
  try {
    return _bcryptjs["default"].hashSync(password, 10);
  } catch (error) {
    throw new Error(error);
  }
};

exports.hashPassword = hashPassword;

var generateToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(payload) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _jsonwebtoken["default"].sign(payload, process.env.jwt_secret, {
              expiresIn: '2h'
            });

          case 3:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function generateToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var verifyPassword =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(password, userPassword) {
    var verifiedPassword;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _bcryptjs["default"].compare(password, userPassword);

          case 3:
            verifiedPassword = _context2.sent;

            if (verifiedPassword) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", false);

          case 6:
            return _context2.abrupt("return", true);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function verifyPassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyPassword = verifyPassword;

var verifyUser = function verifyUser(token_user, id) {
  if (!token_user.isAdmin) {
    if (token_user.userId !== parseInt(id, 10)) {
      throw new Error('You are not authorised to perform this operation');
    }
  }

  return true;
};

exports.verifyUser = verifyUser;