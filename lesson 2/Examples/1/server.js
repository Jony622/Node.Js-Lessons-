
// const express = require("express");
// const app = express();
// var bodyParser = require('body-parser');

// //npm i ejs
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }))
   
// app.get("/", (req, res)=> {
//     res.render('index')
// });

// app.listen(3000, ()=>console.log("Сервер запущен..."));






// const express = require("express");
// const app = express();
// var bodyParser = require('body-parser');


// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }))
   
// app.get("/", (req, res)=> {
//     res.render('index')
// });
// app.post("/form", (req, res)=> {
//         if(!req.body) return res.sendStatus(400);
//         console.log(req.body);
//         res.render('hello',{name:req.body.userName,age:req.body.userAge})
// });
   
// app.listen(3000, ()=>console.log("Сервер запущен..."));



// const express = require("express");
// const app = express();
// var bodyParser = require('body-parser');

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }))
   
// let userArray = [{name:'Aloxa',email:'1@gmail.com',password:'123123'},{name:'Oleg',email:'2@gmail.com',password:'123123'},
// {name:'Denis',email:'3@gmail.com',password:'123123'},{name:'Dimon',email:'4@gmail.com',password:'123123'}]

// app.get("/", (req, res)=> {
//     res.render('users',{userList:userArray});
// });

   
// app.listen(3000, ()=>console.log("Сервер запущен..."));






// const express = require("express");
// const app = express();
// var bodyParser = require('body-parser');

// app.use(express.static('public')) ///
// // app.use('/meadia-content', express.static('public'))
// // app.use('/files-content', express.static('files'))
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }))
   
// app.get("/", (req, res)=> {
//     res.render('media');
// });

// app.listen(3000, ()=>console.log("Сервер запущен..."));



// const express = require("express");
// const app = express();
// var bodyParser = require('body-parser');

// app.use(express.static('public')) ///
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }))
   
// app.get("/", (req, res)=> {
//     res.render('frontFiles');
// });

// app.listen(3000, ()=>console.log("Сервер запущен..."));



const express = require("express");
const app = express();
var bodyParser = require('body-parser');
let upload = require("express-fileupload");

app.use(upload());
app.use(express.static('public')) 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
   
app.get("/", (req, res)=> {
    res.render('formFile',{error:''});
});

app.post("/form", (req, res)=> {
    console.log(req.body)
    console.log(req.files);

    // const path = "./loadFiles/" +req.body.userName+'.'+ req.files.file.name.split('.').pop();
    const path = "./loadFiles/" + req.files.file.name;
    req.files.file.mv(path, (err) => {
        if (err) {
           return res.render('formFile',{error:'виникла помилка'});
        }
        return res.render('formFile',{error:'всьо чотко'});
      });
});

app.listen(3000, ()=>console.log("Сервер запущен..."));