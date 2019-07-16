"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _debug = _interopRequireDefault(require("debug"));

var _users = _interopRequireDefault(require("./routes/users"));

var _bus = _interopRequireDefault(require("./routes/bus"));

var _trips = _interopRequireDefault(require("./routes/trips"));

var _bookings = _interopRequireDefault(require("./routes/bookings"));

// initialize app
var app = (0, _express["default"])(); // Setup app to parse json and form data

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // Routes Middlewares

app.use('/api/v1/auth', _users["default"]);
app.use('/api/v1/buses', _bus["default"]);
app.use('/api/v1/trips', _trips["default"]);
app.use('/api/v1/bookings', _bookings["default"]);
var port = 3000; // listen on port

app.listen(port, function () {
  (0, _debug["default"])('http')("App is listening on PORT ".concat(port));
});
var _default = app;
exports["default"] = _default;