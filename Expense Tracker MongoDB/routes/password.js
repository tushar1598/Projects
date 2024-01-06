const express = require("express");
const router = express.Router();
const passwordController = require("../controller/passwordController");

router.get("/forgot-password", passwordController.ForgotPasswordHTML);
router.post("/forgotpassword", passwordController.Forgotpassword);
router.get("/reset-password/:id", passwordController.ResetPassword);
router.post("/update", passwordController.Update);

module.exports = router;
