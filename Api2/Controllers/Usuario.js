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
        usuario.name = params.name;
        usuario.surname = params.surname;
        usuario.description  = params.description
        usuario.profiles = params.profiles
        usuario.role = params.role
        usuario.email = params.email
        usuario.status = params.status
        usuario.avatar = params.avatar
        if (params.password){
            bcrypt.hash(params.password, null, null,function(err,hash){
                if(usuario.name != null && usuario.surname != null && usuario.email != null){
                    usuario.params = hash;
                    // Guarda el usuario
                    usuario.save((err,userStored)=>{
                        if(err){
                            res.status(500).send({message:'Error al guradar el usuario'});
                        }else{
                            if(!userStored){
                                res.status(404).send({message:'No se ha registrado el usuario'});
                            }else{
                                res.status(200).send({usuario: userStored});
                                // res.status(200).send({message:'bien guardaod'});
                            }

                        }
                    });

                }else{
                    res.status(200).send({message:'Rellena todos los campos'});
                }
            });
        }else{
            res.status(200).send({message:'Introduce tu contraseña'});
        }
}
module.exports = {
    pruebas,
    saveUsuario
};