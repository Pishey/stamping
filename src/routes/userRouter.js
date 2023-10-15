const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const logMiddleware = require("../middlewares/logMiddlware");

const controller = require("../controllers/userController");

const multerDiskStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../../public/image'));
    },
    filename: function(req,file,cb){
        let imageName = "fotoUsuario - " + Date.now() + path.extname(file.originalname);
        cb(null,imageName)
    }
});

const fileUpload = multer({
    storage:multerDiskStorage
})


router.get("/",controller.home)
// detalles de Usuario
router.get("/perfil/:id", logMiddleware,controller.detalle)
router.get("/login",controller.login)
//creado de usuario
router.post("/register",fileUpload.single("fotoRegistro"),controller.processCreate)
router.get("/register",controller.register)
//editar usuario
router.get("/modifUsuario/:id",controller.editUser)
router.put("/modifUsuario/:id",fileUpload.single("fotoRegistro"),controller.editProcess) //doonde viaja la informacion
// borrado de usuario
router.delete("/eliminar/:id",controller.deleteProcess) //borrado logico


module.exports = router