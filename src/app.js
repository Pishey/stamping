const express = require("express"); 
const app = express();
const path = require ('path');
const methodOverride = require('method-override');


const userRouter = require("./routes/userRouter");
const mainRouter = require("./routes/mainRouter");

const cookieExiste = require("./middlewares/cookieMiddleware");

const session = require("express-session");
const cookie = require("cookie-parser");

app.use(cookie()); 
app.use(session({secret:"Sitio Stamping",resave:false, saveUninitialized:false}));
app.use(cookieExiste);

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