const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MongoDB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error inconnecting MongoDB"));
db.once("open", function () {
  console.log("server is succuessfully connected to MongoDb!!");
});
