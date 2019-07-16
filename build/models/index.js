"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _debug = _interopRequireDefault(require("debug"));

var _pg = require("pg");

_dotenv["default"].config();

var connectionString;

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.testDb;
} else {
  connectionString = process.env.devDb;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
pool.on('connect', function () {
  (0, _debug["default"])('http')('Connected to db using debug');
});
var _default = pool;
exports["default"] = _default;