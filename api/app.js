'use strict'
var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
//cargar rutas
var user_routes = require('./routes/cliente');
var space_routes = require('./routes/espacio');
var sala_routes = require('./routes/sala');
var dossiere_routes = require('./routes/dossiere');
var event_routes = require('./routes/event');
var turno_routes = require('./routes/turno');
var asist_routes = require('./routes/asist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json('application/json'));

//configurar cabeceras http
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
    
});
//ruta base

app.use('/api',user_routes);//clientes
app.use('/api',space_routes);//espacios
app.use('/api',sala_routes);//salas
app.use('/api', dossiere_routes);//dossiere
app.use('/api',event_routes);//eventos
app.use('/api',turno_routes);//turnos
app.use('/api',asist_routes);//asistencia

module.exports = app;