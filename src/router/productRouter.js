const express = require("express");
const router = express.Router();


const controller = require("../controller/productController")

router.get("/products", controller.producto);

module.exports = router;