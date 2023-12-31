const express = require("express");
const router = express.Router();

const interviewController = require("../controller/interviewController");

router.get("/interview", interviewController.Create);

router.post("/Create", interviewController.CreateInterview);


router.post("/result/:id",interviewController.Result);

module.exports = router;
