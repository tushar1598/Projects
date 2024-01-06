const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB,
});

module.exports = connection;
