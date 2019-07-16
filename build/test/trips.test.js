"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _bus = _interopRequireDefault(require("../utils/bus.utils"));

var _users = _interopRequireDefault(require("../utils/users.utils"));

var _trips = _interopRequireDefault(require("../utils/trips.utils"));

var _query = _interopRequireDefault(require("../utils/query"));

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

var assert = _chai["default"].assert;
describe('trips', function () {
  var user;
  var admin;
  var bus;
  var tripObj;
  var trip2Obj;
  var bus2;
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var userObj, adminObj, busObj, bus2Obj;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userObj = {
              first_name: 'Dele',
              last_name: 'Sesan',
              email: 'delesesan@yahoo.com',
              password: 'password123',
              isAdmin: false
            };
            adminObj = {
              first_name: 'Wale',
              last_name: 'Deko',
              email: 'waledeko@wayfarer.com',
              password: 'password123',
              isAdmin: true
            };
            busObj = {
              manufacturer: 'Toyota',
              year: 2016,
              model: 'Hiace',
              capacity: 42,
              number_plate: 'APP-248HK'
            };
            bus2Obj = {
              manufacturer: 'Toyota',
              year: 2016,
              model: 'Hiace',
              capacity: 42,
              number_plate: 'APP-879HH'
            };
            _context.next = 6;
            return _users["default"].createUser(userObj);

          case 6:
            user = _context.sent;
            _context.next = 9;
            return _users["default"].createUser(adminObj);

          case 9:
            admin = _context.sent;
            _context.next = 12;
            return _bus["default"].createBus(busObj);

          case 12:
            bus = _context.sent;
            _context.next = 15;
            return _bus["default"].createBus(bus2Obj);

          case 15:
            bus2 = _context.sent;
            tripObj = {
              origin: 'Lekki',
              destination: 'CMS',
              fare: 200,
              trip_date: '2019-07-02 15:30:00 +01:00',
              bus_id: bus.bus_id
            };
            trip2Obj = {
              origin: 'Yaba',
              destination: 'Maryland',
              fare: 100,
              trip_date: '2019-07-13 12:30:00 +01:00',
              bus_id: bus2.bus_id
            };

          case 18:
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
            _context2.next = 6;
            return (0, _query["default"])('DELETE FROM trips');

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe('Create Trips', function () {
    it('Should create a trip with valid inputs',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai["default"].request(_index["default"]).post('/api/v1/trips').set('token', "Bearer ".concat(admin.token)).send(tripObj);

            case 2:
              res = _context3.sent;
              assert.equal(res.status, 201, 'Should return 201 status code for success');
              assert.hasAllKeys(res.body, ['status', 'data'], 'Response body should have succes and data keys');
              assert.hasAllKeys(res.body.data, ['trip_id', 'bus_id', 'origin', 'destination', 'fare', 'trip_date', 'status']);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should return 403 error for a non admin user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai["default"].request(_index["default"]).post('/api/v1/trips').set('token', "Bearer ".concat(user.token)).send(tripObj);

            case 2:
              res = _context4.sent;
              assert.equal(res.status, 403, 'Should return 403 status code for non admin users');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have error and message keys');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should return 422 error if bus is already on another trip',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var tripObj2, res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _trips["default"].create(tripObj);

            case 2:
              tripObj2 = {
                origin: 'MaryLand',
                destination: 'Yaba',
                fare: 100,
                trip_date: '19/07/2019 12:30:00',
                bus_id: bus.bus_id
              };
              _context5.next = 5;
              return _chai["default"].request(_index["default"]).post('/api/v1/trips').set('token', "Bearer ".concat(admin.token)).send(tripObj2);

            case 5:
              res = _context5.sent;
              assert.equal(res.status, 422, 'Should return 422 status code if bus is already on another trip');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have error and message keys');

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('Should return error status 400  for missing fields',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var tripObj1, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              tripObj1 = {
                origin: '',
                destination: 'CMS',
                fare: 200,
                trip_date: '12/07/2019 15:30:00',
                bus_id: bus.bus_id
              };
              _context6.next = 3;
              return _chai["default"].request(_index["default"]).post('/api/v1/trips').set('token', "Bearer ".concat(admin.token)).send(tripObj1);

            case 3:
              res = _context6.sent;
              assert.equal(res.status, 400, 'Should return 400 status code for non admin users');
              assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have error and message keys');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('Get A Trip',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            it('Should get an trip with the given id',
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee7() {
              var trip, res;
              return _regenerator["default"].wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return _trips["default"].create(tripObj);

                    case 2:
                      trip = _context7.sent;
                      _context7.next = 5;
                      return _chai["default"].request(_index["default"]).get("/api/v1/trips/".concat(trip.trip_id)).set('token', "Bearer ".concat(user.token));

                    case 5:
                      res = _context7.sent;
                      assert.equal(res.status, 200, 'Should return 200 for success');
                      assert.equal(trip.trip_id, res.body.data.trip_id, 'Trip id retrieved should match the one sent on success');
                      assert.hasAnyKeys(res.body.data, ['origin', 'destination', 'fare', 'trip_date', 'trip_id', 'bus_id']);

                    case 9:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            })));
            it('Should return a 400 error with an invalid trip id',
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
                      return _chai["default"].request(_index["default"]).get('/api/v1/trips/h').set('token', "Bearer ".concat(user.token));

                    case 2:
                      res = _context8.sent;
                      assert.equal(res.status, 400, 'Should return 400 for invalid trip id');
                      assert.hasAllKeys(res.body, ['status', 'message'], 'response should have status and message keys');
                      assert.equal(res.body.status, 'error', 'Response status should be error for invalid trip id');

                    case 6:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            })));
            it('Should return a 404 error if trip does not exist',
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
                      return _chai["default"].request(_index["default"]).get('/api/v1/trips/900').set('token', "Bearer ".concat(user.token));

                    case 2:
                      res = _context9.sent;
                      assert.equal(res.status, 404, 'Should return 404 if trip does not exist');
                      assert.hasAllKeys(res.body, ['status', 'message'], 'response should have status and message keys');
                      assert.equal(res.body.status, 'error', 'Response status should be error for non existent trip');

                    case 6:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9);
            })));

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  describe('Get All Trips', function () {
    it('Should get all Trips',
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
              return _chai["default"].request(_index["default"]).get('/api/v1/trips').set('token', "Bearer ".concat(user.token));

            case 2:
              res = _context11.sent;
              assert.equal(res.status, 200);
              assert.isArray(res.body.data);
              res.body.data.forEach(function (trip) {
                assert.equal(trip.status, 'active', 'Users should only see active trips');
              });

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('Should get all trips based on the query search',
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
              return _trips["default"].create(tripObj);

            case 2:
              _context12.next = 4;
              return _trips["default"].create(trip2Obj);

            case 4:
              _context12.next = 6;
              return _chai["default"].request(_index["default"]).get('/api/v1/trips/?origin=yaba').set('token', "Bearer ".concat(user.token));

            case 6:
              res = _context12.sent;
              assert.equal(res.status, 200);
              assert.isArray(res.body.data);
              res.body.data.forEach(function (trip) {
                assert.include(trip, {
                  origin: 'YABA'
                }, 'It should return the trip(s) that matches the query');
              });

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('Cancel A Trip',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17() {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            it('Should cancel a trip',
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee13() {
              var newTrip, res;
              return _regenerator["default"].wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.next = 2;
                      return _trips["default"].create(tripObj);

                    case 2:
                      newTrip = _context13.sent;
                      _context13.next = 5;
                      return _chai["default"].request(_index["default"]).patch("/api/v1/trips/".concat(newTrip.trip_id)).set('token', "Bearer ".concat(admin.token));

                    case 5:
                      res = _context13.sent;
                      assert.equal(res.status, 200, 'Success status should be 200');
                      assert.equal(res.body.data.status, 'cancelled', 'Trip status should be changed from active to cancelled');
                      assert.hasAnyKeys(res.body.data, ['trip_id', 'bus_id', 'trip_date'], 'The response object should conatin trip id, date, bus id');

                    case 9:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13);
            })));
            it('Should return a 403 for a non admin user',
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee14() {
              var newTrip, res;
              return _regenerator["default"].wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return _trips["default"].create(tripObj);

                    case 2:
                      newTrip = _context14.sent;
                      _context14.next = 5;
                      return _chai["default"].request(_index["default"]).patch("/api/v1/trips/".concat(newTrip.trip_id)).set('token', "Bearer ".concat(user.token));

                    case 5:
                      res = _context14.sent;
                      assert.equal(res.status, 403, 'Should return 403 status code for non admin users');
                      assert.hasAllKeys(res.body, ['status', 'message'], 'Response should have status and message keys');
                      assert.equal(res.body.status, 'error');

                    case 9:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, _callee14);
            })));
            it('Should return a 400 for invalid trip id',
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee15() {
              var res;
              return _regenerator["default"].wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return _trips["default"].create(tripObj);

                    case 2:
                      _context15.next = 4;
                      return _chai["default"].request(_index["default"]).patch('/api/v1/trips/l').set('token', "Bearer ".concat(admin.token));

                    case 4:
                      res = _context15.sent;
                      assert.equal(res.status, 400, 'Should return 400 for invalid trip id');
                      assert.hasAllKeys(res.body, ['status', 'message'], 'Response should have status and message keys');
                      assert.equal(res.body.status, 'error');

                    case 8:
                    case "end":
                      return _context15.stop();
                  }
                }
              }, _callee15);
            })));
            it('Should return a 404 for non existent trip',
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee16() {
              var res;
              return _regenerator["default"].wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.next = 2;
                      return _chai["default"].request(_index["default"]).patch('/api/v1/trips/9000').set('token', "Bearer ".concat(admin.token));

                    case 2:
                      res = _context16.sent;
                      assert.equal(res.status, 404, 'Should return 400 for non existent trip');
                      assert.hasAllKeys(res.body, ['status', 'message'], 'Response should have status and message keys');
                      assert.equal(res.body.status, 'error');

                    case 6:
                    case "end":
                      return _context16.stop();
                  }
                }
              }, _callee16);
            })));

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
});