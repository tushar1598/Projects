const Sequelize = require("sequelize");
const sequelize = require("../config/databse");

const Messages = sequelize.define("message", {
    message: Sequelize.STRING,
    sender: Sequelize.STRING,
});

module.exports = Messages;
