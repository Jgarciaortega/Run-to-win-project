const express = require('express');
const morgan = require('morgan');
const exphdbs = require('express-handlebars');
const path = require('path');
const cors = require("cors");

/*Initializations*/ 
const app = express();

/*Settings*/
app.set('port',process.env.PORT || 4000);
//indicamos donde esta la carpeta view
app.set('views', path.join(__dirname, 'views'));
//configuramos el motor de handlebars
app.engine('.hbs', exphdbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers:require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

/*Middlewares*/
//1º Morgan nos visualiza las peticiones que llegan al servidor
app.use(morgan('dev'));
//2º
app.use(express.urlencoded({extended: false}));
//3º
app.use(express.json());
//4º
app.use(cors());

/*Global Variables*/
app.use((req, res, next) => {

    next();
})

/*Routes*/
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/user'));

/*Public */
app.use(express.static(path.join(__dirname, '/public')));

/*Starting the server */
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
    
})