//const fs = require("fs");
//const path = require("path");

//const rutaArchivo = path.resolve("./src/database/user.json");
//const users = JSON.parse(fs.readFileSync(rutaArchivo));

const logMiddleware= (req,res,next) => { // verfica si estamos logueado y de acuerdo a la condicion nos redirecciona!
    //const usuario = users.find((row) => row.id == req.params.id);
    if(!req.session.usuarioLogeado){
        return res.redirect("/user/login")
        
    }else{
      next();
    }
    
    
    };
    
    module.exports = logMiddleware;