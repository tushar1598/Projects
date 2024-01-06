const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.HomeEJS);
router.post("/create-table/", homeController.CreateTable);
router.post("/create-table-data/:tableName", homeController.CreateTableData);
router.get("/delete-data/:tableName/:id",homeController.DeleteData)

module.exports = router;
