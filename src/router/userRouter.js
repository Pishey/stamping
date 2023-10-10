const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const controller = require("../controller/userController")

const multerDiskStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"../../public/image"));
    },
    filename: function(req,file,cb){
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null,imageName)
    }
});
const fileUpload = multer({
    storage:multerDiskStorage
})

 router.get("/login",controller.login);
 router.get("/register",controller.register)
 router.get("/user",controller.user)
 router.post("/register",fileUpload.single("fotoRegister"),controller.processRegister);
 //router.put("/products/:id",controllers.editProcess)


module.exports = router;