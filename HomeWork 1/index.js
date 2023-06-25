const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log("Сервер запущен.."));

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

app.get("/users", (req, res) => {
  let userListUnder = JSON.parse(fs.readFileSync("./under18.txt", "utf8"));
  let userListUpper = JSON.parse(fs.readFileSync("./upper18.txt", "utf8"));
  let userno18 = "";
  for (let index = 0; index < userListUnder.length; index++) {
    const element = userListUnder[index];
    let userB = new Date(element.userBirth);
    let age = 2023 - userB.getFullYear();
    userno18 += `<tr><td>${element.userName}</td><td>${age}</td></tr>`;
  }
  let userup18 = "";
  for (let index = 0; index < userListUpper.length; index++) {
    const elem = userListUpper[index];
    let userL = new Date(elem.userBirth);
    let age = 2023 - userL.getFullYear();
    userup18 += `<tr><td>${elem.userName}</td><td>${age}</td><td>${elem.drinks}</td></tr>`;
  }
  res.send(
    `<a href='/home'>Home</a>
    <a href='/about'>Info</a>
    <a href='/form'>Form</a>
    <table>
    <tr> Менше 18
    <th>Ім'я</th>
    <th>Вік</th>
    </tr>
    ${userno18}
    </table>
    <table>
    <tr> Більше 18
    <th>Ім'я</th>
    <th>Вік</th>
    <th>Для розгона</th>
    </tr>
    ${userup18}
    </table>`
  );

});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});
let userInfo = [
  {
    userName: "",
    email: "",
    age: "",
    favDrinks: [],
  },
];

app.post("/form", (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  let userListUnder = JSON.parse(fs.readFileSync("./under18.txt", "utf8"));
  let userListUpper = JSON.parse(fs.readFileSync("./upper18.txt", "utf8"));
  let userB = new Date(req.body.userBirth);
  let age = 2023 - userB.getFullYear();
  if (
    age >= 18 &&
    req.body.userName != 0 &&
    req.body.email != 0 &&
    req.body.favDrinks != 0
  ) {
  } else if (age < 18 && req.body.userName != 0 && req.body.email != 0) {
    userListUnder.push(req.body);
    fs.writeFileSync("./under18.txt", JSON.stringify(userListUnder));
  }
  res.send('+ <a href="/users">Натисни сюда  </a>');
});
