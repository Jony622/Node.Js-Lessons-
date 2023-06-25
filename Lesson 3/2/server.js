const express = require("express");
const app = express();
var bodyParser = require('body-parser');
let upload = require("express-fileupload");

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


app.listen(3000, ()=>console.log("Сервер запущен..."));