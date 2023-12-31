const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      let user = await User.findOne({ where: { email: email } });
      if (user) {
        let Password = user.dataValues.password;
        let result = await bcrypt.compare(password, Password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  try {
    User.findOne({ where: { id: id } }).then((user) => {
      done(null, user);
    });
  } catch (error) {
    done(error);
  }
});

// check if user is authenticated:-
passport.CheckAuthentication = function (req, res, next) {
  // if the user is sign-in then pass request to the next function which is my controller action:-
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not sign-in:-
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current sign user from the session cookie and we are sending just thel locals for the views:-
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
