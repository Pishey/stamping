const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const rutaArchivo = path.resolve("./src/database/user.json");
const users = JSON.parse(fs.readFileSync(rutaArchivo));

const {validationResult} = require("express-validator")

const userController = {

    home:(req,res) => {
       return res.render("home")
    },
    login:(req,res) => {
         return res.render("login")
    },
    processLogin:(req,res) => {
        const userEncotrado = users.find((row) => row.email == req.body.loginEmail);
        if(userEncotrado){
            //console.log("usuario encontrado")
            if(userEncotrado.contrasenia == req.body.loginContrasenia){
                delete userEncotrado.contrasenia
                req.session.usuarioLogeado = userEncotrado
                //console.log("contraseña correcta")
                if(req.body.cookie){
                    res.cookie("recordame", req.body.loginEmail, {maxAge: 1000*60*60})//duracion de la cookie
                }
                return res.redirect("/user/perfil")
            }else{
                return res.render("login", {
                    errors:{
                        datosMal:{
                            msg: "datos incorrectos"
                        }
                    }
                })
            }
        }else{
            return res.render("login", {
                errors:{
                    datosMal:{
                        msg: "datos incorrectos"
                    }
                }
            })
        }
    },
    register:(req,res) => {
        return res.render("register")
    },
    processRegister:(req,res) =>{
        let userNuevo ={
            "id": users.length+1,
            "nombre":req.body.nombre,
            "apellido":req.body.apellido,
            "fotoRegistro":req.file.filename,
            "email":req.body.email,
            "contrasenia":bcrypt.hashSync(req.body.contrasenia,10), //encriptado de contraseña
            "borrado": false
        }
        //guarda un objeto literal con propieedades de errores
        const rdoValidacion = validationResult(req); 
        //console.log(rdoValidacion.errors) //indica los errores en el la consola del VIsual

        if(rdoValidacion.errors.length > 0){
            return res.render("register", { errors : rdoValidacion.mapped(), oldData: req.body})
        }

        fs.writeFileSync(rutaArchivo,JSON.stringify([...users,userNuevo],null,2),"utf-8")
        return res.redirect("/user/login");
    },
    perfil: (req,res) => {
        //const userEncotrado = users.find(row => row.id == req.params.id)
        //if(userEncotrado && userEncotrado.borrado != true) return res.render("userFound",{users: userEncotrado})
        //else return res.redirect("/not-found");
        const userEncontrado = req.session.usuarioLogeado;
        return res.render("userFound",{users: userEncontrado })
        
    },
    editUser: (req,res) =>{
        const userEncotrado = users.find((row) => row.id == req.params.id)
        if(userEncotrado) return res.render("modifUsuario",{users: userEncotrado})
        else return res.redirect("/not-found");
    
    },
    editProcess: (req,res) =>{
        const userEncontrado = users.find((row)=> row.id == req.params.id)
        userEncontrado.nombre = req.body.nombre
        userEncontrado.apellido = req.body.apellido
        userEncontrado.fotoRegistro = req.file.filename
        fs.writeFileSync(rutaArchivo,JSON.stringify(users,null,2),"utf-8")
        return res.redirect("/")
    },
    deleteProcess: (req,res)=>{
        const userEncotrado = users.find((row) => row.id == req.params.id)
        userEncotrado.borrado = true
        fs.writeFileSync(rutaArchivo,JSON.stringify(users,null,2),"utf-8")
        return res.redirect("/")
    }

}
module.exports = userController;