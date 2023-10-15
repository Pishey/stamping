const express = require("express"); 
const app = express();
const path = require ('path');
const methodOverride = require('method-override');

const userRouter = require("./routes/userRouter");
const mainRouter = require("./routes/mainRouter");

app.use(express.static('public'));
app.set('views', path.join(__dirname, '../views'));
app.set ('view engine', 'ejs')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(process.env.PORT || 3000, () =>{
    console.log("Servidor corriendo en el puerto 3000")
})


app.use("/user", userRouter);
app.use("/",mainRouter);

app.use((req,res,next) => {
    res.status(404).render("not-found")
}); 
