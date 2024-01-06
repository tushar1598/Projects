const express = require("express");
const router = express.Router();
const purchaseController = require("../controller/purchaseController");
const passport = require("passport");

router.post(
  "/purchase-premium",
  passport.CheckAuthentication,
  purchaseController.CreateOrder
);
router.get("/premium", purchaseController.Premium);
router.get("/all-order", purchaseController.PremiumUser);

module.exports = router;
