const Sequelize = require("sequelize");
const sequelize = require("../config/databse");

const Member = sequelize.define("members", {
    member: Sequelize.STRING,
    groupname: Sequelize.STRING,
});

module.exports = Member;
