const express = require("express");
const router = express.Router();

const homeController = require("../controller/homeController");

router.get("/", homeController.ShowCreateTable);
router.get("/show-create-table", homeController.Home);
router.post("/create-table", homeController.CreateTable);
router.get("/show-table-data/:name",homeController.ShowTablesData)
router.post("/create-table-data/:name",homeController.CreateTableWithData)

module.exports = router;
