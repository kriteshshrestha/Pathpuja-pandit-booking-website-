const express= require("express");
const { registercontroller } = require("../controllers/authcontrollers");

const router=express.Router();

router.post("/register",registercontroller);

module.exports={router};