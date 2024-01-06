const { Sequelize } = require("sequelize");
let dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_User,
  process.env.DB_Password,
  {
    dialect: "mysql",
    host: process.env.DB_Host,
  }
);

module.exports = sequelize;
