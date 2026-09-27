const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const {
  createbookingcontroller,
  getbookingcontroller,
  getbookingbyidcontroller,
  cancelbookingcontroller,
} = require("../controllers/bookingcontroller");

const router = express.Router();

router.post("/createbooking", authmiddlewares, createbookingcontroller);
router.get("/getbooking", authmiddlewares, getbookingcontroller);
router.get("/getbooking/:id", authmiddlewares, getbookingbyidcontroller);
router.patch("/cancelbooking/:id", authmiddlewares, cancelbookingcontroller);

module.exports = router;
