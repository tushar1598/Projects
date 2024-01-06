const express = require("express");
const port = 9000;
const app = express();

require("dotenv").config();

app.use(express.static("assets"));

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in creating server!!");
    return;
  }
  console.log(`Server is running on port ${port} successfully!!`);
});
