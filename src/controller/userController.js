const path = require("path");
const fs = require("fs");

const rutaArchivo = path.resolve("./src/database/user.JSON");
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
        let usuario ={
            id: registerNew.length+1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            fotoRegister: req.body.filename,
            contrasenia: req.body.contrasenia,
            confirmarContra: req.body.confirmarContrasenia,
            borrado: false
        }
        fs.writeFileSync(rutaArchivo,JSON.stringify([...registerNew,usuario],null,2),"utf-8")
        return res.redirect("/home")
    },
    editarUser:(req,res) =>{
        res.render("editar")
    }
     


}

module.exports = userController;