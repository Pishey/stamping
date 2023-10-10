const path = require("path");
const fs = require("fs");

const rutaArchivo = path.resolve("./src/database/user.json");
const registerNew = JSON.parse(fs.readFileSync(rutaArchivo));

const userController = {
    login:(req,res)=>{
        res.render("login")
    },
    user:(req,res)=>{
        res.render("user")
    },
    register:(req,res)=>{
        res.render("register")
    },
    processRegister:(req,res) =>{
        let userNuevo ={
            id: registerNew.length+1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            fotoRegister: req.body.filename,
            contrasenia: req.body.contrasenia,
            confirmarContra: req.body.confirmarContrasenia,
            borrado: false
        }
        fs.writeFileSync(rutaArchivo,JSON.stringify([...registerNew,userNuevo],null,2),"utf-8")
        return res.redirect("/home")
    },
    editarUser:(req,res) =>{

    }
     


}

module.exports = userController;