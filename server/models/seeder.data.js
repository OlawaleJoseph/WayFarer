import { hashPassword } from '../utils/common';

export const users = [
  [
    'Bayo',
    'Solomon',
    'solomike@wayfarer.com',
    hashPassword('passsword123'),
    true,
  ],
  ['Dare',
    'Samuel',
    'dresam@gmail.com',
    hashPassword('passsword'),
    false,
  ],
];

export const buses = [
  [
    'ABJ-875DT',
    'Toyota',
    'Hiace',
    2016,
    10,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    true,
  ],
  [
    'GWA-328UK',
    'Toyota',
    'Hiace',
    2016,
    15,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    true,
  ],
];

export const trips = [
  [
    1,
    'Lekki',
    'CMS',
    '2019-07-02 15:30:00 +01:00',
    200,
    'active',
    false,
  ],
  [
    2,
    'Maryland',
    'Yaba',
    '2019-07-02 11:30:00 +01:00',
    150,
    'active',
    false,
  ],
];

export const bookings = [
  [
    1,
    1,
    2,
  ],
  [
    2,
    2,
    13,
  ],
];
