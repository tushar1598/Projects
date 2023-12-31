const User = require("../models/user");
const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.User_Profile = async function (req, res) {
  // Student.find({}, function (err, student) {
  //   return res.render("user_profile", {
  //     title: "Profile",
  //     student: student,
  //   });
  // });
  try {
    if (req.isAuthenticated()) {
      let students = await Student.find({}).populate("interviews");

      let interviews = await Interview.find({}).populate("students.student");

      return res.render("user_profile", {
        title: "Profile",
        student: students,
        interview: interviews,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.Sign_In = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("sign-in", {
    title: "Login",
  });
};

module.exports.Sign_UP = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("sign-up", {
    title: "Sign-up",
  });
};

module.exports.Create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          if (err) {
            console.log(err);
            return;
          }
          req.flash("success", "You have signed up successfully!!");
          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.CreateSession = (req, res) => {
  req.flash("success", "signed in successfully!!");
  return res.redirect("/users/profile");
};

module.exports.Destroy = function (req, res) {
  req.logout(function (err) {
    req.flash("success", "You have logged out successfully");
    return res.redirect("/users/sign-in");
  });
};
