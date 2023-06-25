const express = require("express");
const app = express();
var bodyParser = require('body-parser');
let upload = require("express-fileupload");

app.use(upload());
app.use(express.static('public')) 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
   
app.get("/", (req, res)=> {
    res.render('index',{error:''});
});

app.post("/front-post", (req, res)=> {
    console.log(req.body)
    res.status(200).send('Server answer good')
});


app.listen(3000, ()=>console.log("Сервер запущен..."));