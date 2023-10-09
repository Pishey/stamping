const path = require("path");

const mainController = {
    home: function(req,res){
        res.sendFile(path.resolve("./views/home.html"))
    }
}
module.exports = mainController;