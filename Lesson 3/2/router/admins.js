const express=require('express')
const router=express.Router();
let adminController = require("../controllers/adminController.js");

router.get("/",adminController.adminPanel);

module.exports=router;