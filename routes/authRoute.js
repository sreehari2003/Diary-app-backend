const express = require("express");
const authController = require("../controller/authController");
const diaryControl = require("../controller/diaryController");

const router = express.Router();
router.route("/auth/signup").post(authController.signUp);
router.route("/auth/login").post(authController.login);
router
  .route("/diary/:id")
  .get(authController.protect, diaryControl.getAllDiary)
  .post(authController.protect, diaryControl.createDiary);

module.exports = router;
