const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
app.use(express.static("public"));


const mainRouter = require("./src/router/mainRouter");
const productRouter = require("./src/router/productRouter");
const userRouter = require("./src/router/userRouter");

app.set('views', path.join(__dirname, "./views"));

app.set ('view engine', 'ejs')
app.use(methodOverride('_method'));

app.listen( 3000,()=>{
    console.log("servidor corriendo en el puerto 3000")
})

app.use("/", mainRouter);
app.use("/", productRouter);
app.use("/", userRouter);

app.use((req,res) => {
    res.status(404).render("not-found")
})