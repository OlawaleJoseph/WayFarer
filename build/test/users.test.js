"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _users = _interopRequireDefault(require("../utils/users.utils"));

var _query = _interopRequireDefault(require("../utils/query"));

/* eslint-disable no-undef */
var assert = _chai["default"].assert;

_chai["default"].use(_chaiHttp["default"]);

describe('Users', function () {
  var user;
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var userObj;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userObj = {
              first_name: 'Mike',
              last_name: 'James',
              email: 'mike@gmail.com',
              password: 'mypassword',
              isAdmin: false
            };
            _context.next = 3;
            return _users["default"].createUser(userObj);

          case 3:
            user = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _query["default"])('DELETE FROM users');

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('Sign Up Users', function () {
    it('Should Create a user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var newUser, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              newUser = {
                first_name: 'Mike',
                last_name: 'Jordan',
                email: 'jordanmike@gmail.com',
                password: 'password'
              };
              _context3.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newUser);

            case 3:
              res = _context3.sent;
              assert.equal(res.status, 201, 'Should return 201 for successful user registration');
              assert.equal(res.body.status, 'success');
              assert.isObject(res.body.data, 'Data should be an object');
              assert.hasAllKeys(res.body.data, ['token', 'is_admin', 'user_id'], 'The reponse should include the user object and token generated');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should Create admin users',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var newUser, res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newUser = {
                first_name: 'John',
                last_name: 'Jordan',
                email: 'johnjordan@wayfarer.com',
                password: 'password'
              };
              _context4.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newUser);

            case 3:
              res = _context4.sent;
              assert.equal(res.status, 201, 'Should return 201 for successful user registration');
              assert.equal(res.body.status, 'success');
              assert.equal(res.body.data.is_admin, true, 'Admin role should be true');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should return an error for missing fields',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var user2, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              user2 = {
                first_name: '',
                last_name: 'Jordan',
                email: 'email1@gmail.com',
                password: 'password'
              };
              _context5.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(user2);

            case 3:
              res = _context5.sent;
              assert.equal(res.status, 400, 'It Should return a 400 status code');
              assert.equal(res.body.status, 'error', 'Response status should be error');
              assert.isNotNull(res.body.message, 'The response message should not be null');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('Should return error for an already registered email',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var newUser, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              newUser = {
                first_name: 'Daniel',
                last_name: 'James',
                email: 'mike@gmail.com',
                password: 'password123'
              };
              _context6.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newUser);

            case 3:
              res = _context6.sent;
              assert.equal(res.status, 409, 'Should return 409 status code');
              assert.equal(res.body.status, 'error', 'Response status should be error');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('signin users', function () {
    it('Should signin users',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var signinData, res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              signinData = {
                email: user.email,
                password: 'mypassword'
              };
              _context7.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(signinData);

            case 3:
              res = _context7.sent;
              assert.equal(res.status, 200, 'Should return 200 status code');
              assert.equal(res.body.status, 'success', 'Response status should be success');
              assert.hasAnyKeys(res.body.data, 'token', 'Should Generate Token');

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('Should return Error for unregistered email',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var wrongData, res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              wrongData = {
                email: 'newemail@gmail.com',
                password: user.password
              };
              _context8.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(wrongData);

            case 3:
              res = _context8.sent;
              assert.equal(res.status, 404, 'Should return 404 status code');
              assert.equal(res.body.status, 'error', 'Response status should be error');
              assert.hasAnyKeys(res.body, 'message', 'Response should contain an error message');

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('Should return Error for wrong password',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var wrongData, res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              wrongData = {
                email: user.email,
                password: 'userpassword'
              };
              _context9.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(wrongData);

            case 3:
              res = _context9.sent;
              assert.equal(res.status, 400, 'Should return 400 status code');
              assert.equal(res.body.status, 'error', 'Response status should be error');
              assert.hasAnyKeys(res.body, 'message', 'Response should contain an error message');

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('Should return Error for missing fields',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10() {
      var wrongData, res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              wrongData = {
                email: user.email,
                password: ''
              };
              _context10.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(wrongData);

            case 3:
              res = _context10.sent;
              assert.equal(res.status, 400, 'Should return 400 status code');
              assert.equal(res.body.status, 'error', 'Response status should be error');
              assert.hasAnyKeys(res.body, 'message', 'Response should contain an error message');

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('Get A User', function () {
    it('Should get User with given id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11() {
      var res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _chai["default"].request(_index["default"]).get("/api/v1/auth/users/".concat(user.user_id)).set('token', "Bearer ".concat(user.token));

            case 2:
              res = _context11.sent;
              assert.equal(res.status, 200, 'Status code should 200 for success');
              assert.equal(res.body.data.user_id, user.user_id, 'The user id given should be equal to the user id in the response object');
              assert.isObject(res.body.data, 'Data should be an object');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('Should return error for invalid user id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12() {
      var res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _chai["default"].request(_index["default"]).get('/api/v1/auth/users/c');

            case 2:
              res = _context12.sent;
              assert.equal(res.status, 400, 'Status code should 400 for error');
              assert.equal(res.body.status, 'error');
              assert.isString(res.body.message, 'Message should be a string');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it("A non admin user can not access another user's infomation",
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13() {
      var user4, createdUser, res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              user4 = {
                first_name: 'Jane',
                last_name: 'Doe',
                email: 'janedoe@gmail.com',
                password: 'janedoe',
                isAdmin: false
              };
              _context13.next = 3;
              return _users["default"].createUser(user4);

            case 3:
              createdUser = _context13.sent;
              _context13.next = 6;
              return _chai["default"].request(_index["default"]).get("/api/v1/auth/users/".concat(createdUser.user_id)).set('token', "Bearer ".concat(user.token));

            case 6:
              res = _context13.sent;
              assert.equal(res.status, 401, 'Status code should 400 for error');
              assert.equal(res.body.status, 'error');
              assert.isString(res.body.message, 'Message should be a string');

            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
});