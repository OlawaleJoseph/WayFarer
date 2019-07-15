import debug from 'debug';
import pool from '../models/index';

const log = debug('http');

const query = async (text, data) => {
  try {
    const { rows } = await pool.query(text, data);
    log('DB Queried');
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

export default query;
