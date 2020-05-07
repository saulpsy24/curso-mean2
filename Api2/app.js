'use strict'

var expres = require ('express');
var bodyparser = require ('body-parser');

var app = expres();

//Cargar rutas
var user_route = require  ('./Routes/Usuario');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Configuerar cabeceras http


//Ruta base
app.use('/api',user_route);

module.exports = app;


