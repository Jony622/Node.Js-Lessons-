const express = require("express");
const router = express.Router();
let ac = require("../controllers/adminController.js");


router.get("/", ac.userMainPage);
router.post("/", ac.saveUser);
router.get("/users", ac.userListPage);
router.post("/users", ac.List);
router.post("/edit",ac.edPost);
router.get("/edit",ac.editPage);
router.post("/delete",ac.edDelete);
module.exports = router;
