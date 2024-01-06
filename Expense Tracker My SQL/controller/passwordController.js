const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.ForgotPasswordHTML = function (req, res) {
  return res.render("forgot-password");
};

module.exports.ResetPassword = function (req, res) {
  return res.render("resetpassword", {
    userId: req.params.id,
  });
};

module.exports.Forgotpassword = async function (req, res) {
  const { email } = req.body;
  const users = await User.findAll({ where: { email: email } });
  if (users.length != 0) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: "Password Reset Link",
      html: `http://localhost:9000/password/reset-password/${users[0].dataValues.id}`,
    });
    return res.redirect("/password/forgot-password");
  }
  return res.status(400).json({
    message: "user is not found",
  });
};

module.exports.Update = async function (req, res) {
  const { email, password, userId } = req.body;

  let user = await User.findAll({
    where: { email: email, id: userId },
  });
  if (user.length != 0) {
    let hash = await bcrypt.hash(password, 10);
    await User.update(
      { password: hash },
      { where: { email: user[0].dataValues.email } }
    );
    return res.redirect("/users/sign-in");
  }

  return res.status(401).json({
    message: "user not found!!",
  });
};
