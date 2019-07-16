"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBooking = exports.validateQuery = exports.validateTrip = exports.validateBus = exports.validateParam = exports.validateLogin = exports.validateSignUp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var email = _joi["default"].string().email({
  minDomainSegments: 2
}).required().error(new Error('Invalid email'));

var password = _joi["default"].string().min(6).required().error(new Error('Password must have minimum of six(6) characters'));

var signUpSchema = _joi["default"].object().keys({
  first_name: _joi["default"].string().required().error(new Error('First name cannot be empty')),
  last_name: _joi["default"].string().required().error(new Error('Last name cannot be empty')),
  email: email,
  password: password,
  is_admin: _joi["default"]["boolean"]().error(new Error('Admin status can either be true or false'))
});

var setAdminStatus = function setAdminStatus(userEmail) {
  return !!userEmail.endsWith('@wayfarer.com');
};

var validateSignUp =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _joi["default"].validate(req.body, signUpSchema);

          case 3:
            req.body.isAdmin = req.body.is_admin || setAdminStatus(req.body.email);
            next();
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(400).json({
              status: 'error',
              message: _context.t0.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function validateSignUp(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateSignUp = validateSignUp;

var loginSchema = _joi["default"].object({
  email: email,
  password: password
});

var validateLogin =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (req.body.email) {
              _context2.next = 3;
              break;
            }

            throw new Error('No email Provided');

          case 3:
            _context2.next = 5;
            return _joi["default"].validate(req.body, loginSchema);

          case 5:
            next();
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              status: 'error',
              message: _context2.t0.message
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function validateLogin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validateLogin = validateLogin;

var errorMessage = function errorMessage(path) {
  var msg = '';

  if (/trip/.test(path)) {
    msg = 'trip';
  } else if (/bus/.test(path)) {
    msg = 'bus';
  } else if (/booking/.test(path)) {
    msg = 'booking';
  } else {
    msg = 'user';
  }

  return msg;
};

var validateParam =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, next) {
    var path;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            path = errorMessage(req.originalUrl);

            if (req.params["".concat(path, "Id")]) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              status: 'error',
              message: "".concat(path, " id not given")
            }));

          case 3:
            if (parseInt(req.params["".concat(path, "Id")], 10)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              status: 'error',
              message: "Invalid ".concat(path, " Id")
            }));

          case 5:
            return _context3.abrupt("return", next());

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validateParam(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.validateParam = validateParam;

var busSchema = _joi["default"].object().keys({
  manufacturer: _joi["default"].string().required().error(new Error('Invalid Manufacturer input')),
  model: _joi["default"].string().required().error(new Error('Invalid Model Input')),
  year: _joi["default"].number().integer().positive().required().error(new Error('Invalid Year')),
  capacity: _joi["default"].number().positive().integer().required().error(new Error('Invalid Bus Capacity')),
  number_plate: _joi["default"].string().regex(/(^([a-z]+)-((\d{3})([a-zA-z]{2})))/i).min(9, 'utf-8').max(9).required().error(new Error('Invalid Number Plate'))
});

var validateBus =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _joi["default"].validate(req.body, busSchema);

          case 3:
            req.body.number_plate = req.body.number_plate.toUpperCase();
            next();
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              status: 'error',
              message: _context4.t0.message
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function validateBus(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.validateBus = validateBus;

var tripSchema = _joi["default"].object().keys({
  origin: _joi["default"].string().regex(/\w+/i).error(new Error('Invalid trip origin')),
  destination: _joi["default"].string().regex(/\w+/i).error(new Error('Invalid Trip destination')),
  fare: _joi["default"].number().integer().positive().error(new Error('Invalid Trip fare')),
  bus_id: _joi["default"].number().integer().positive().error(new Error('Invalid Bus Id')),
  trip_date: _joi["default"].string().error(new Error('Invalid Trip date'))
});

var validateTrip =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res, next) {
    var inputs, i;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            inputs = Object.keys(req.body);
            i = 0;

          case 2:
            if (!(i < inputs.length)) {
              _context5.next = 8;
              break;
            }

            if (req.body[inputs[i]]) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              status: 'error',
              message: "".concat(inputs[i], " is blank")
            }));

          case 5:
            i += 1;
            _context5.next = 2;
            break;

          case 8:
            _context5.prev = 8;
            _context5.next = 11;
            return _joi["default"].validate(req.body, tripSchema);

          case 11:
            return _context5.abrupt("return", next());

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](8);
            return _context5.abrupt("return", res.status(400).json({
              status: 400,
              message: _context5.t0.mesage
            }));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[8, 14]]);
  }));

  return function validateTrip(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.validateTrip = validateTrip;

var querySchema = _joi["default"].object().keys({
  origin: _joi["default"].string().regex(/[a-z]+/i).error(new Error('Invalid Origin')),
  destination: _joi["default"].string().regex(/[a-z]+/i).error(new Error('Invalid destination'))
});

var validateQuery =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res, next) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _joi["default"].validate(req.query, querySchema);

          case 3:
            next();
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json({
              status: 'error',
              message: _context6.t0.message
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));

  return function validateQuery(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.validateQuery = validateQuery;

var bookingSchema = _joi["default"].object().keys({
  trip_id: _joi["default"].number().integer().positive().required().error(new Error('Invalid Trip Id')),
  seat_number: _joi["default"].number().integer().positive().allow('').error(new Error('Invalid seat number'))
});

var validateBooking =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res, next) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            if (req.body.trip_id) {
              _context7.next = 3;
              break;
            }

            throw new Error('No Trip Id given');

          case 3:
            _context7.next = 5;
            return _joi["default"].validate(req.body, bookingSchema);

          case 5:
            next();
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            res.status(400).json({
              status: 'error',
              message: _context7.t0.message
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));

  return function validateBooking(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.validateBooking = validateBooking;