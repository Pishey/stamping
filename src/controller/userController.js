const path = require("path");

const userControllerontroller = {

    user: function(res,req){
        res.sendFile(path.resolve("./views/user.html"));
    }
}

module.exports = userController;