const express = require("express");
const port = 8000;
const app = express();

require("dotenv").config();

// for assets :-
app.use(express.static("assets"));

// for post request:-
app.use(express.urlencoded());

// for ejs tamplate:-
app.set("view engine", "ejs");
app.set("views", "./views");

// for routes:-
app.use("/", require("./routes"));

app.listen(port, function (err) {
  console.log(`server is running successfully on port ${port}`);
});
