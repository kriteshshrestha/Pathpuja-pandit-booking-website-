const express=require("express");
//const authmiddlewares = require("../middlewares/authmiddlewares");
const { createpuja, getpuja, getpujabyid } = require("../controllers/pujacontroller");

const router=express.Router();

router.post("/createpuja",createpuja);
router.get("/getpuja",getpuja);
router.get("/getpuja/:id",getpujabyid);

module.exports=router;