import dotenv from 'dotenv';
import debug from 'debug';
import { Pool } from 'pg';


dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.testDb;
} else {
  connectionString = process.env.devDb;
}

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  debug('http')('Connected to db using debug');
});
export default pool;
