const { query } = require('express');
const User = require('../models/users');
const userMainPage = (req, res) => {
    res.render('auth')
}
const saveUser = ('/',(req,res)=>{
    let newUser = new User(
        {
            username: req.body.username,
	        password: req.body.password,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }
        );
    newUser.save()
    res.render('auth',{err:'Save'})
})

const userListPage = async (req, res) => {
    let user = await User.find({});
    res.render('userlist',{userBase: user})
}
const List =('/users', async (req,res) =>{
    let user = await User.find({});
    res.render("userlist",{userBase:user})
});

const editPage = ("/edit", async (req,res)=>{
    let personal = await User.findOne({_id:req.query.id});
    res.render("edit", {edPers:personal});
})
    const edPost = ("/edit", async (req,res)=>{
    await User.findOneAndUpdate({_id: req.query.id},req.body, {returnOriginal: false});
    res.redirect("/users");
})
const edDelete = ("/delete", async (req,res)=>{
await User.findByIdAndDelete({_id: req.query.id});
res.redirect("/users");
})

module.exports = { userMainPage, saveUser, userListPage, List,editPage,edPost,edDelete}
