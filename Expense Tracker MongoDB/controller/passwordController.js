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
  const users = await User.findOne({ email: email });
  if (users) {
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
      html: `http://localhost:9000/password/reset-password/${users._id}`,
    });
    return res.redirect("/password/forgot-password");
  }
  return res.status(400).json({
    message: "user is not found",
  });
};

module.exports.Update = async function (req, res) {
  const { email, password, userId } = req.body;
  let user = await User.findOne({ email: email, _id: userId });
  if (user) {
    let hash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hash });
    return res.status(200).json({
      message: "password reset successfully!!",
      reset: true
    });
  }
  return res.status(200).json({
    message: "user not found!!",
    reset: false
  });
}

