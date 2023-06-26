const express = require("express");
const app = express();
var bodyParser = require("body-parser");
let upload = require("express-fileupload");
const fs = require("fs");
let mongoose = require('mongoose');

const adminRoute = require('./router/adminRouter')
app.use(upload());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRoute);

async function start(){
await mongoose.connect("mongodb+srv://Jony:1111@cluster0.bfzjbye.mongodb.net/?retryWrites=true&w=majority")
app.listen(3000, () => console.log("Сервер запущен..."));
}
start();