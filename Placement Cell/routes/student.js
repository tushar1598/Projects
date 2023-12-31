const express = require("express");
const router = express.Router();

const studentController = require("../controller/studentsController");

router.get("/student", studentController.Create);

router.post("/Create", studentController.CreateStudent);

router.get("/delete/:id", studentController.Delete);

router.get("/update/:id", studentController.Update);

router.post("/edit/:id",studentController.Edit);

module.exports = router;
