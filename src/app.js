const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));


const mainRouter = require("../stamping/src/router/mainRouter");
const productRouter = require("../stamping/src/router/productRouter")


app.listen( 3000,()=>{
    console.log("servidor corriendo en el puerto 3000")
})

app.use("/", mainRouter);
app.use("/products", productRouter);
