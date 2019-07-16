"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookings = exports.trips = exports.buses = exports.users = void 0;

var _common = require("../utils/common");

var users = [['Bayo', 'Solomon', 'solomike@wayfarer.com', (0, _common.hashPassword)('passsword123'), true], ['Dare', 'Samuel', 'dresam@gmail.com', (0, _common.hashPassword)('passsword'), false]];
exports.users = users;
var buses = [['ABJ-875DT', 'Toyota', 'Hiace', 2016, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], true], ['GWA-328UK', 'Toyota', 'Hiace', 2016, 15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], true]];
exports.buses = buses;
var trips = [[1, 'Lekki', 'CMS', '2019-07-02 15:30:00 +01:00', 200, 'active', false], [2, 'Maryland', 'Yaba', '2019-07-02 11:30:00 +01:00', 150, 'active', false]];
exports.trips = trips;
var bookings = [[1, 1, 2], [2, 2, 13]];
exports.bookings = bookings;