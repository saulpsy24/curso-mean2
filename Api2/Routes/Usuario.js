'use strict'

var express = require('express');
var UserControl = require('../Controllers/Usuario');

var api = express.Router();

api.get('/controlador',UserControl.pruebas);
api.post('/savecontrolador',UserControl.saveUsuario);

module.exports = api;