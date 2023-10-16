const fs = require("fs");
const path = require("path");

const rutaArchivo = path.resolve("./src/database/user.json");
const users = JSON.parse(fs.readFileSync(rutaArchivo));

const cookieExiste = (req,res,next) => {
    if(!req.session.usuarioLogeado && req.cookies.recordame){
        const userEncotrado = users.find((row) => row.email == req.cookies.recordame);
        delete userEncotrado.contrasenia
        req.session.usuarioLogeado = userEncotrado
    }
    next()
}
module.exports = cookieExiste