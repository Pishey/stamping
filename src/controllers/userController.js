const fs = require("fs");
const path = require("path");

const rutaArchivo = path.resolve("./src/database/user.json");
const users = JSON.parse(fs.readFileSync(rutaArchivo));

const userController = {

    home:(req,res) => {
       return res.render("home")
    },
    login:(req,res) => {
         return res.render("login")
    },
    register:(req,res) => {
        return res.render("register")
    },
    processCreate:(req,res) =>{
        let userNuevo ={
            "id": users.length+1,
            "nombre":req.body.nombre,
            "apellido":req.body.apellido,
            "domicilio":req.body.domicilio,
            "fotoRegistro":req.file.filename,
            "email":req.body.email,
            "contraseñia":req.body.contrasenia,
            "borrado": false
        }
        fs.writeFileSync(rutaArchivo,JSON.stringify([...users,userNuevo],null,2),"utf-8")
        return res.redirect("/user/login");
    },
    detalle: (req,res) => {
        const userEncotrado = users.find(row => row.id == req.params.id)
        if(userEncotrado && userEncotrado.borrado != true) return res.render("userFound",{users: userEncotrado})
        else return res.redirect("/not-found");
        
    },
    editUser: (req,res) =>{
        const userEncotrado = users.find(row => row.id == req.params.id)
        if(userEncotrado) return res.render("modifUsuario",{users: userEncotrado})
        else return res.redirect("/not-found");
    },
    editProcess: (req,res) =>{
        const userEncontrado = users.find(row => row.id == req.params.id)
        userEncontrado.nombre = req.body.nombre
        userEncontrado.apellido = req.body.apellido
        userEncontrado.domicilio = req.body.domicilio
        userEncontrado.fotoRegistro = req.file.filename
        fs.writeFileSync(rutaArchivo,JSON.stringify(users,null,2),"utf-8")
        return res.redirect("/")
    },
    deleteProcess: (req,res)=>{
        const userEncotrado = users.find(row => row.id == req.params.id)
        userEncotrado.borrado = true
        fs.writeFileSync(rutaArchivo,JSON.stringify(users,null,2),"utf-8")
        return res.redirect("/")
    }

}
module.exports = userController;