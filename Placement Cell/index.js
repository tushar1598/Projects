const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const passport = require("passport");
const LocalStrategy = require("./config/LocalStrategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Flash = require("connect-flash");
const Middleware = require("./config/middleware");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.urlencoded());

app.use(express.static("assets"));

app.set("view engine", "ejs");
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

app.use(passport.SetAuthenticationUser);

app.use(Flash());
app.use(Middleware.SetFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in connecting server");
    return;
  }
  console.log(`server is running on port:- ${port}`);
});
