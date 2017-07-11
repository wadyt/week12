const pg = require('pg');

var config = {
  user: 'wady', //env var: PGUSER
  database: 'recipebookdb', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = function (text, values, callback) {
  return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
  return pool.connect(callback);
};