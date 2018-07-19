'use strict'
var express = require('express');
var respuestaController = require('../controllers/respuesta');
var SpaceController = '';
var ConsultaController="";
var api = express.Router();
var md_auth = require('../middleware/auth')
api.get('/respuesta/:id', md_auth.ensureAuth, respuestaController.getRespuesta);
api.post('/respuesta', md_auth.ensureAuth, respuestaController.saveRespuesta);
module.exports = api;