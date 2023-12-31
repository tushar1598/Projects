const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const { downloadCSVReport } = require("../controller/reportController");
const passport = require("passport");

router.get(
  "/profile",
  passport.CheckAuthentication,
  userController.User_Profile
);
router.get("/sign-in", userController.Sign_In);
router.get("/sign-up", userController.Sign_UP);

router.post("/create", userController.Create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.CreateSession
);

router.get("/sign-out", userController.Destroy);

router.get("/download", downloadCSVReport);
module.exports = router;
