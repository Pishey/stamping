const path = require('path');
const express = require("express");
const router = express.Router();
//const multer = require('multer');

const controller = require("../controller/userController")

router.get("/login", controller);
router.get("/register", controller);

module.exports = router;
