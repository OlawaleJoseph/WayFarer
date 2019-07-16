"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _users = _interopRequireDefault(require("../utils/users.utils"));

var _bus = _interopRequireDefault(require("../utils/bus.utils"));

var _query = _interopRequireDefault(require("../utils/query"));

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var assert = _chai["default"].assert;
describe('Buses', function () {
  var admin;
  var newBus;
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var adminData, busData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            adminData = {
              first_name: 'Oladeji',
              last_name: 'Ayodeji',
              email: 'oladeji@wayfarer.com',
              password: 'oladeji',
              isAdmin: true
            };
            busData = {
              manufacturer: 'Toyota',
              model: 'Hiace',
              year: 2016,
              capacity: 22,
              number_plate: 'EKY-568gh'
            };
            _context.next = 4;
            return _users["default"].createUser(adminData);

          case 4:
            admin = _context.sent;
            _context.next = 7;
            return _bus["default"].createBus(busData);

          case 7:
            newBus = _context.sent;

          case 8:
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
            _context2.next = 4;
            return (0, _query["default"])('DELETE FROM buses');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('Should create new Bus', function () {
    it('Should create new Bus',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var busData2, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              busData2 = {
                model: 'HIACE',
                manufacturer: 'TOYOTA',
                year: '2017',
                capacity: 18,
                number_plate: 'APP-234HK'
              };
              _context3.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/buses').set('token', "Bearer ".concat(admin.token)).send(busData2);

            case 3:
              res = _context3.sent;
              assert.equal(res.status, 201, 'Should respond with 201 status code');
              assert.equal(res.body.status, 'success', 'Json response status should be success');
              assert.hasAllKeys(res.body, ['status', 'data'], 'The response object shold have sttaus and data keys');
              assert.hasAnyKeys(res.body.data, ['bus_id', 'capacity', 'seats'], 'The json response should contain the keys bus_d, capacity, seats');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should return error for already registered bus number plate',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var busData, res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              busData = {
                manufacturer: 'Toyota',
                model: 'Hiace',
                year: 2016,
                capacity: 22,
                number_plate: 'EKY-568gh'
              };
              _context4.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/buses').set('token', "Bearer ".concat(admin.token)).send(busData);

            case 3:
              res = _context4.sent;
              assert.equal(res.status, 409, 'Should respond with 409 status code');
              assert.equal(res.body.status, 'error', 'Json response status should be error');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Error message should be present');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should return error for missing fields',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var busData3, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              busData3 = {
                model: '',
                manufacturer: 'TOYOTA',
                year: '2015',
                capacity: 20,
                number_plate: 'APP-874PK'
              };
              _context5.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/buses').set('token', "Bearer ".concat(admin.token)).send(busData3);

            case 3:
              res = _context5.sent;
              assert.equal(res.status, 400, 'Should respond with 400 status code');
              assert.equal(res.body.status, 'error', 'Json response status should be error');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Error message should be present');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('Should return error for invalid token',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var busData4, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              busData4 = {
                model: 'Hiace',
                manufacturer: 'TOYOTA',
                year: '2015',
                capacity: 20,
                number_plate: 'APP-234kK'
              };
              _context6.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/buses').set('token', 'invalidtoken').send(busData4);

            case 3:
              res = _context6.sent;
              assert.equal(res.status, 400, 'Should respond with 400 status code');
              assert.equal(res.body.status, 'error', 'Json response status should be error');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Error message should be present');

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('Find A Bus', function () {
    it('Should return a bus with the given id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _chai["default"].request(_index["default"]).get("/api/v1/buses/".concat(newBus.bus_id)).set('token', "Bearer ".concat(admin.token));

            case 2:
              res = _context7.sent;
              assert.equal(res.status, 200, 'Should return a status code of 200');
              assert.hasAllKeys(res.body, ['status', 'data'], 'Response body should have status and data keys');
              assert.isObject(res.body.data, 'Data should be an object');
              assert.equal(res.body.data.bus_id, newBus.bus_id, 'The bus object returned should be the same as the specified bus id');

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('Should return an error with invalid bus id',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _chai["default"].request(_index["default"]).get('/api/v1/buses/h').set('token', "Bearer ".concat(admin.token));

            case 2:
              res = _context8.sent;
              assert.equal(res.status, 400, 'Should return a status code of 400');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have status and message keys');

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('Should return an error when the bus_id is not found',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai["default"].request(_index["default"]).get('/api/v1/buses/1000').set('token', "Bearer ".concat(admin.token));

            case 2:
              res = _context9.sent;
              assert.equal(res.status, 404, 'Should return a status code of 404');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have status and message keys');

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('Should return an error with invalid token',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10() {
      var res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _chai["default"].request(_index["default"]).get('/api/v1/buses/g').set('token', 'token');

            case 2:
              res = _context10.sent;
              assert.equal(res.status, 400, 'Should return a status code of 400');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have status and message keys');

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('Find All buses', function () {
    it('Should return all Buses',
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
              return _chai["default"].request(_index["default"]).get('/api/v1/buses').set('token', "Bearer ".concat(admin.token));

            case 2:
              res = _context11.sent;
              assert.equal(res.status, 200, 'Should return status code of 200');
              assert.isArray(res.body.data, 'Should return an array of Buses');
              res.body.data.forEach(function (bus) {
                assert.isObject(bus, 'Should be a bus object');
                assert.hasAnyKeys(bus, 'bus_id', 'Each Object should have bus id');
              });

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('Should return an error for invalid token',
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
              return _chai["default"].request(_index["default"]).get('/api/v1/buses').set('token', 'token');

            case 2:
              res = _context12.sent;
              assert.equal(res.status, 400, 'Should return status code of 400');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should contain status and message');
              assert.equal(res.body.status, 'error', 'Status should be error');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
});