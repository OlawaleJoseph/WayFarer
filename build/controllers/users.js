"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _users = _interopRequireDefault(require("../utils/users.utils"));

var _common = require("../utils/common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var User =
/*#__PURE__*/
function () {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
  }

  (0, _createClass2["default"])(User, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var newUser, user_id, is_admin, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _users["default"].createUser(req.body);

              case 3:
                newUser = _context.sent;
                user_id = newUser.user_id, is_admin = newUser.is_admin, token = newUser.token;
                return _context.abrupt("return", res.header('token', newUser.token).status(201).json({
                  status: 'success',
                  data: {
                    user_id: user_id,
                    is_admin: is_admin,
                    token: token
                  }
                }));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(409).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var user, correctPassword, password, date_registered, userObj, payload, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _users["default"].getUserByEmail(req.body.email);

              case 2:
                user = _context2.sent;

                if (user) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'User does not exist'
                }));

              case 5:
                _context2.prev = 5;
                _context2.next = 8;
                return (0, _common.verifyPassword)(req.body.password, user.password);

              case 8:
                correctPassword = _context2.sent;

                if (correctPassword) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'Invalid Password'
                }));

              case 11:
                password = user.password, date_registered = user.date_registered, userObj = (0, _objectWithoutProperties2["default"])(user, ["password", "date_registered"]);
                payload = {
                  userId: user.user_id,
                  isAdmin: user.is_admin,
                  email: user.email
                };
                _context2.next = 15;
                return (0, _common.generateToken)(payload);

              case 15:
                token = _context2.sent;
                return _context2.abrupt("return", res.header('token', token).status(200).json({
                  status: 'success',
                  data: _objectSpread({
                    token: token
                  }, userObj)
                }));

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](5);
                return _context2.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: 'Internal server error'
                }));

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 19]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "findUser",
    value: function () {
      var _findUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var foundUser, _foundUser$, user_id, first_name, last_name, email, is_admin;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _users["default"].getUserById(req.user, req.params.userId);

              case 3:
                foundUser = _context3.sent;

                if (foundUser[0]) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'User not found'
                }));

              case 6:
                _foundUser$ = foundUser[0], user_id = _foundUser$.user_id, first_name = _foundUser$.first_name, last_name = _foundUser$.last_name, email = _foundUser$.email, is_admin = _foundUser$.is_admin;
                return _context3.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: {
                    user_id: user_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    is_admin: is_admin
                  }
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: _context3.t0.message
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function findUser(_x5, _x6) {
        return _findUser.apply(this, arguments);
      }

      return findUser;
    }()
  }]);
  return User;
}();

var _default = User;
exports["default"] = _default;