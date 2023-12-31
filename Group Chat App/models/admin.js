const Sequelize = require("sequelize");
const sequelize = require("../config/databse");

const Admin = sequelize.define("admin", {
    admin: Sequelize.STRING,
});

module.exports = Admin;
