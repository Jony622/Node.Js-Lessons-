const express=require('express')
const router=express.Router();

///connect model
const User = require('../models/users');

let adminController = require("../controllers/adminController.js");

router.get("/",adminController.adminPanel);

router.post('/new-user',(req,res)=>{
    let newUser = new User(
        {
            username: req.body.username,
	        password: req.body.password
        }
        );
    newUser.save()
    res.render('admin',{err:'Save'})
})


router.post('/search',async (req,res)=>{
    let user = await User.findOne({username:req.body.name});
    console.log(req.body)
    res.send(JSON.stringify(user));
    //User.find({});
    //User.findById(id);
    //User.findByIdAndDelete(id);
    //User.findOneAndUpdate({_id: id},{newInfo}, {new: true});
    //https://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
})

module.exports=router;