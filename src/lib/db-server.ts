'use server';

import mysql from 'mysql2/promise';

// It's recommended to use a connection pool for better performance
// and connection management. This will create one connection and reuse it.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { pool };
