const express = require("express");
const app = express();
const port = 9000;
const bodyParser = require("body-parser");
const localStrategy = require("./config/passport-local-strategy");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/mongoose")
const MongoStore = require("connect-mongo");


dotenv.config();

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use(express.static("assets"));

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.set("views", "./views");

app.use(
  session({
    name: process.env.Project_Name,
    secret: process.env.Project_Secret,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({
      mongoUrl: process.env.MongoDB_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in creating a server!!!!");
    return;
  }
  console.log(`server is running on port ${port} successfully!!`);
});