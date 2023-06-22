const express = require("express");
const app = express();
var bodyParser = require("body-parser");
let upload = require("express-fileupload");
const fs = require("fs");

app.use(upload());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log("Сервер запущен..."));

app.get("/", (req, res) => {
  res.render("reges", { error: "" });
});

app.get("/auth", (req, res) => {
  res.render("auth", { error: "" });
});

// app.get("/cab", (req, res) => {
//   res.render("cab", { error: "" });
// });

app.post("/reg", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  let newUser = {
    imageName: "",
    status: "Enter status",
    login: req.body.login,
    password: req.body.password,
  };
  let userData = JSON.parse(fs.readFileSync("./users.txt", "utf8"));
  for (let i = 0; i < userData.length; i++) {
    const el = userData[i];
    if (req.body.login == el.login)
      return res.render("reges", { error: "виникла помилка" });
  }
  userData.push(newUser);
  fs.writeFileSync("./users.txt", JSON.stringify(userData));
  res.redirect("/auth");
});

app.post("/auth", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  let userData = JSON.parse(fs.readFileSync("./users.txt", "utf8"));

  for (let i = 0; i < userData.length; i++) {
    const el = userData[i];
    if (req.body.login == el.login) {
      if (req.body.password == el.password) {
        return res.render("cab", { info: el, error: "" });
      } else {
        return res.render("auth", { error: "password invalid" });
      }
    }
  }
  return res.render("auth", { error: "login invalid" });
});

app.post(
  "/cab",
  (req, res) => {
    let userData = JSON.parse(fs.readFileSync("./users.txt", "utf8"));
    console.log(req.body);
    console.log(req.files);
    console.log(req.query);
    //   console.log(info);
    //   const path = "./loadimg/" +req.body.status+'.'+ req.files.file.name.split('.').pop();
    const path =
      "./public/loadimg/" +
      req.query.login +
      "." +
      req.files.file.name.split(".").pop();

    for (let i = 0; i < userData.length; i++) {
      const el = userData[i];
      if (req.query.login == el.login) {
        userData[i].status = req.body.status;
        userData[i].imageName =
          req.query.login + "." + req.files.file.name.split(".").pop();
        fs.writeFileSync("./users.txt", JSON.stringify(userData));
        req.files.file.mv(path, (error) => {
          if (error) {
            console.log(error);
            return res.render("cab", {
              info: userData[i],
              error: "виникла помилка",
            });
          }
          return res.render("cab", { info: userData[i], error: "всьо чотко" });
        });
      }
    }
  }

  // userData.status.push(req.body.status);
  // userData.imageName.push(req.files.file.name.split(".").pop());
  // fs.writeFileSync("./users.txt", JSON.stringify(userData));
);
