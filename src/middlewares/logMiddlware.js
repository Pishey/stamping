const fs = require("fs");
const path = require("path");

const rutaArchivo = path.resolve("./src/database/user.json");
const users = JSON.parse(fs.readFileSync(rutaArchivo));

const logMiddleware= (req,res,next) => {
const usuario = users.find((row) => row.id == req.params.id);
if(usuario.logueado == true){
    next();
}else{
    return res.redirect("/user/login")
}


};

module.exports = logMiddleware;