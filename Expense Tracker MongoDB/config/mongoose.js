const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MongoDB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in database"));

db.once('open', function () {
  console.log('connected to the database!!');
})


module.exports = db;