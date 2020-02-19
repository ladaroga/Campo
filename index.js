/*accede a variables necesarias*/
const express = require('express');

const routes = require('./routes/api');
const lawyer = require('./routes/lawyer');
const client = require('./routes/client');
const caseCourt = require('./routes/case');
const document = require('./routes/document');
const court = require('./routes/court');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const app = express();


//-----------------------------------Static-----------------------------------
/*define la dirección de la aplicacion*/
app.use(express.static(__dirname + '/public'));
//-----------------------------------Body-Parser-----------------------------------
/*define el formato de los datos de la aplicacion como archivo Json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//-----------------------------------Mongoose-----------------------------------
/*define la conexion con la base de datos donde se almacena la informacion y por la que se accede segun la url*/
mongoose.connect(process.env.MONGODB_URI||'mongodb://localHost/clowyer');
mongoose.Promise = global.Promise;
//-----------------------------------Session-----------------------------------
/*se establece la sesion a la que accedera cada usuario(abogado)*/
app.use(session({secret:'njaksdnkjas89as98dasdn899asuidna898627ajdb', resave: false,
 saveUninitialized: true
}));
//-----------------------------------Cooki-Parser-----------------------------------
/*permite almacenar las sesiones creadas en una base de datos, para el caso mongodb*/
app.use(cookieParser());
//-----------------------------------Views-----------------------------------
/*modifica la vista segun la ruta correspondiente*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//-----------------------------------Helmet-----------------------------------
app.use(helmet());
app.disable('x-powered-by');
//-----------------------------------Rutas-----------------------------------
/*definicion de las posibles rutas a las que se tendrá acceso en la aplicacion*/
app.use(routes);
app.use(lawyer);
app.use(client);
app.use(caseCourt);
app.use(document);
app.use(court);
//-----------------------------------Error-----------------------------------
/*creacion de alertas de error*/
app.use(function(err, req, res, next){
	console.log({error: err.message});
	res.send({
		error: err.message
	});
});
//-----------------------------------Listen-Port-----------------------------------
/*llamada al puerto a traves de una peticion */
app.listen(process.env.PORT || 4000, function(){
	console.log('Esperando por request puerto 4000');
});