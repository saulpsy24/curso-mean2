'use strict'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../Models/Usuario');

function pruebas (req,res){
    res.status(200).send({
        message: 'Probando controlador'
    });
}

function saveUsuario(req, res){

        var usuario = new Usuario();
        var params = req.body;

        console.log(params);
        // usuario.name = params.name;
        // usuario.surname = params.surname;
        // usuario.description  = params.description
        // usuario.profiles = params.profiles
        // usuario.role = params.role
        // usuario.email = params.email
        // usuario.status = params.status
        // usuario.avatar = params.avatar
}
module.exports = {
    pruebas,
    saveUsuario
};