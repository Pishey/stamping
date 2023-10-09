const path = require("path");

const productController = {
    producto: function(req,res){
        res.sendFile(path.resolve("./views/products.html"))
    }
}
module.exports = productController;