const express = require("express");
const app = express();
var bodyParser = require('body-parser');
let upload = require("express-fileupload");
let mongoose = require('mongoose');

///routes
const userRoute = require('./router/users')
const adminRoute = require('./router/admins')

app.use(upload());
app.use(express.static('public')) 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

// connect routers
app.use(userRoute);
app.use("/admin",adminRoute);

async function start (){
    await mongoose.connect("mongodb+srv://iliapuzdranovskuy:1111@cluster0.c2kniji.mongodb.net/?retryWrites=true&w=majority");
    app.listen(3000, ()=>console.log("Сервер запущен..."));
}
start ()