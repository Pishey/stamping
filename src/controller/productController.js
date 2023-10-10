const path = require("path");

const productController = {
    producto: function(req,res){
        res.sendFile(path.resolve("./views/products.ejs"))
    }
}
module.exports = productController;