const express=require('express')
const router=express.Router();
let userController = require("../controllers/userController.js");

router.get("/",userController.userMainPage)

router.post("/want-download",userController.download)

module.exports=router;