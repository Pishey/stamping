const express = require("express");
const router = express.Router();

const controller = require("../controller/mainController")

router.get("/", controller.home)


module.exports = router;
