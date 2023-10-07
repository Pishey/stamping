const path = require ('path')
const express = require("express")
const app = express()

app.use(express.static('public'));

const userRouter = require ('./routes/userRouter');
const methodOverride = require('method-override')

const userApiRouter = require('./routes/api/userApiRouter')

app.use(express.static('public'))
app.use(session({secret:"Sitio Nahif",resave:false, saveUninitialized:false}));
app.use(userLoggedMiddleware)
app.use(userAdminMiddleware)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(cookie());
app.use(cookieMiddleware);


app.set('views', path.join(__dirname, '../views'));
app.set ('view engine', 'ejs')


app.listen(3000, () =>{
    console.log("Servidor corriendo en el puerto 3000")
})

app.use('/user', userRouter);

app.use('/api/user',userApiRouter);