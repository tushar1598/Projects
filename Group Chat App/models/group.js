const Sequelize = require("sequelize");
const sequelize = require("../config/databse");

const Group = sequelize.define("groups", {
    name: Sequelize.STRING,
});

module.exports = Group;
