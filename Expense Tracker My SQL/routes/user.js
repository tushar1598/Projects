const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const passport = require("passport");

router.get("/sign-up", userController.SignUP);
router.get("/sign-in", userController.SignIN);
router.get("/profile", passport.CheckAuthentication, userController.Profile);
router.post("/create-user", userController.CreateUser);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.CreateSession
);

router.get("/destroy", userController.Destroy);

module.exports = router;
