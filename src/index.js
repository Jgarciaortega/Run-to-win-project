const express = require('express');
const morgan = require('morgan');
const exphdbs = require('express-handlebars');
const path = require('path');
const cors = require("cors");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;
 
/*INITIALIZATIONS*/
const app = express();

/*SETTINGS*/
//Establecemos el puerto
app.set('port',process.env.PORT || 4000);

//indicamos donde esta la carpeta view
app.set('views', path.join(__dirname, 'views'));

//configuramos el motor de handlebars
app.engine('.hbs', exphdbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // helpers:require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

/*MIDDLEWARES*/
//1º Morgan nos visualiza las peticiones que llegan al servidor
app.use(morgan('dev'));
//2º para que solo puedas pasar archivos texto plano a traves de la URL
app.use(express.urlencoded({extended: false}));
//3º no se si hace falta
app.use(express.json());
//4º 
app.use(cors());
//5º
app.use(cookieParser('my secret'));
//6º
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}))
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(function(username,password,done){
    
}))

/*ROURES*/
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/user'));
app.use(require('./routes/api'));

/*PUBLIC */
app.use(express.static(path.join(__dirname, '/public')));

/*STARTING THE SERVER */
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
    
})