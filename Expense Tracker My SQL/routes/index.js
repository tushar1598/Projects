const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.Home);

router.use("/users", require("./user"));
router.use("/expenses", require("./expense"));
router.use("/purchase", require("./purchase"));
router.use("/password", require("./password"));

module.exports = router;
